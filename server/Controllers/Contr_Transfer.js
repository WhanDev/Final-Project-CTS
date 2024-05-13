const MatchSubject = require("../Models/Model_MatchSubject");
const MatchSubjectList = require("../Models/Model_MachSubjectList");
const Subject = require("../Models/Model_Subject");
const Student = require("../Models/Model_Student");

exports.TestTransfer = async (req, res) => {
  try {
    const structure_id = req.body.structure_id;

    const SubjectByCurriculum = await Subject.find({
      structure_id: structure_id,
    });

    let AllSubjectByCurriculum = [];

    if (SubjectByCurriculum.length > 0) {
      SubjectByCurriculum.forEach((subject) => {
        AllSubjectByCurriculum.push({
          subject_id: subject.subject_id,
          subject_nameTh: subject.subject_nameTh,
          subject_nameEn: subject.subject_nameEn,
        });
      });
    } else {
      return res.status(404).json({ message: "ไม่พบรายวิชาในหลักสูตร" });
    }

    const [, structureIdNumber] = structure_id.split("-");

    let AllMatchSubject = [];

    for (let i = 0; i < AllSubjectByCurriculum.length; i++) {
      const MatchSubjectBySubjectId = await MatchSubject.find({
        _id:
          "MS" + structureIdNumber + "-" + AllSubjectByCurriculum[i].subject_id,
      });

      if (MatchSubjectBySubjectId.length > 0) {
        const MachSubjectList = await MatchSubjectList.find({
          machSubject_id: MatchSubjectBySubjectId[0]._id,
        });

        const extraSubjectIds = MachSubjectList.map((listItem) => {
          return {
            id: listItem._id,
            count: listItem.extraSubject_id.length,
            list: listItem.extraSubject_id,
          };
        });

        AllMatchSubject.push({
          subject_id: MatchSubjectBySubjectId[0].subject_id,
          machSubject_id: MatchSubjectBySubjectId[0]._id,
          extraSubject_id: extraSubjectIds,
        });
      }
    }

    if (AllMatchSubject.length === 0) {
      return res.status(404).json({ message: "ไม่พบคู่เทียบโอนในหลักสูตรนี้" });
    }

    let extraSubjects = req.body.extraSubjects;

    let ungrade = [];
    let unsuccess = [];
    let ResultFound = [];
    let success = [];
    let perSuccess = [];

    for (const extraSubject of extraSubjects) {
      const validGrades = ["A", "B+", "B", "C+", "C"]; // รายการเกรดที่ถือว่าถูกต้อง
      if (extraSubject.grade >= 2 || validGrades.includes(extraSubject.grade)) {
        const extraSubjectId = extraSubject.id;
        let found = false;

        for (const matchSubject of AllMatchSubject) {
          for (const extraSubjectItem of matchSubject.extraSubject_id) {
            if (extraSubjectItem.list.includes(extraSubjectId)) {
              ResultFound.push({
                id: extraSubject.id,
                grade: extraSubject.grade,
                machSubject_id: extraSubjectItem.id,
                subject_id: matchSubject.subject_id,
                result: "พบในรายการคู่เทียบโอน",
              });
              found = true;
            }
          }
        }

        if (!found) {
          unsuccess.push({
            extra_id: extraSubject.id,
            grade: extraSubject.grade,
            note: "ไม่พบในคู่เทียบโอน ไม่สามารถนำมาเทียบโอนได้",
          });
        }
      } else {
        ungrade.push({
          extra_id: extraSubject.id,
          grade: extraSubject.grade,
          note: "เกรดน้อยกว่า 2, C ไม่สามารถนำมาเทียบโอนได้",
        });
      }
    }

    let machSubjectCount = {};
    const machSubjectIdsInResultFound = [];

    ResultFound.forEach((result) => {
      const { id, grade, machSubject_id, subject_id } = result;
      if (machSubjectCount[machSubject_id]) {
        machSubjectCount[machSubject_id]++;
      } else {
        machSubjectCount[machSubject_id] = 1;
      }

      machSubjectIdsInResultFound.push({
        id,
        grade,
        machSubject_id,
        subject_id,
      });
    });

    await Promise.all(
      AllMatchSubject.map(async (matchSubject) => {
        await Promise.all(
          matchSubject.extraSubject_id.map(async (extraSubjectItem) => {
            const machSubjectId = extraSubjectItem.id;
            const foundMatch = machSubjectIdsInResultFound.find(
              (item) => item.machSubject_id === machSubjectId
            );
            if (foundMatch) {
              const machSubjectCountInResultFound =
                machSubjectCount[machSubjectId] || 0;
              if (machSubjectCountInResultFound === extraSubjectItem.count) {
                const extraSubjectId = await MatchSubjectList.findOne({
                  _id: machSubjectId,
                });
                perSuccess.push({
                  curriculum_id: structureIdNumber,
                  mach_id: matchSubject.machSubject_id,
                  subject_id: foundMatch.subject_id,
                  machlist_id: machSubjectId,
                  extra_id: extraSubjectId.extraSubject_id.map((id, index) => ({
                    id: id,
                    grade: extraSubjects.find((extra) => extra.id === id).grade,
                  })),
                  note: "สามารถนำมาเทียบโอนได้",
                });
              } else {
                unsuccess.push({
                  extra_id: foundMatch.id,
                  grade: foundMatch.grade,
                  note: "พบในคู่เทียบโอน แต่ขาดรายวิชาร่วม",
                });
              }
            }
          })
        );
      })
    );

    // Create an object to store duplicate mach_ids and their corresponding entries
    const duplicateMachIds = {};

    // Iterate through perSuccess array to find duplicates
    perSuccess.forEach((entry) => {
      if (duplicateMachIds[entry.mach_id]) {
        duplicateMachIds[entry.mach_id].push(entry);
      } else {
        duplicateMachIds[entry.mach_id] = [entry];
      }
    });

    // Iterate through duplicateMachIds and compare the number of extra_ids
    for (const machId in duplicateMachIds) {
      const entries = duplicateMachIds[machId];
      const extraIdCounts = entries.map((entry) => entry.extra_id.length);
      const maxExtraIdCount = Math.min(...extraIdCounts);

      entries.forEach((entry) => {
        if (entry.extra_id.length > maxExtraIdCount) {
          entry.extra_id.map((extra) => {
            unsuccess.push({
              extra_id: extra.id,
              grade: extra.grade,
              note: `รายวิชาที่สามารถเทียบได้ซ้ำกัน`,
            });
          });
        } else {
          success.push(entry);
        }
      });
    }

    for (let i = unsuccess.length - 1; i >= 0; i--) {
      const unsuccessEntry = unsuccess[i];
      let foundInSuccess = false;

      for (const successEntry of success) {
        if (
          successEntry.extra_id.some(
            (successExtra) => successExtra.id === unsuccessEntry.extra_id
          )
        ) {
          foundInSuccess = true;
          break;
        }
      }

      if (foundInSuccess) {
        unsuccess.splice(i, 1);
      }
    }

    res.status(200).json({
      message: "ผ่าน",
      ungrade,
      unsuccess,
      success,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

const {
  Transfer,
  TransferOrder,
  TransferList,
} = require("../Models/Model_Transfer");

exports.Transfer = async (req, res) => {
  try {
    const { student_id } = req.body;

    if (!student_id) {
      return res.status(400).send("กรุณากรอกข้อมูลให้ครบ!");
    }

    const order_id = "TS-" + student_id;

    const createTransferOrder = await TransferOrder.findOne({ _id: order_id });
    if (createTransferOrder) {
      return res.status(400).send("นักศึกษาเคยทำการเทียบโอนไปแล้ว!");
    }

    const newTransferOrder = new TransferOrder({
      _id: order_id,
      student_id,
    });
    await newTransferOrder.save();

    const { success, unsuccess } = req.body;

    const newTransferList = new TransferList({
      transferOrder_id: order_id,
      success: success.map((item) => ({
        mach_id: item.mach_id,
        subject_id: item.subject_id,
        machlist_id: item.machlist_id,
        extraSubject: item.extra_id.map((extra) => ({
          id: extra.id,
          grade: extra.grade,
        })),
      })),
      unsuccess: unsuccess.map((item) => ({
        extraSubject: item.extra_id,
        grade: item.grade,
        note: item.note,
      })),
    });

    await newTransferList.save();

    const student = await Student.findOne({ _id: student_id });
    if (student) {
      await Student.updateOne(
        { _id: student_id },
        { $set: { status: "รอการอนุมัติเทียบโอนผลการเรียน" } }
      );
    }

    const date = new Date();

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

    const newTransfer = new Transfer({
      _id: student_id,
      lecturer_id: "---",
      result: "รอการอนุมัติเทียบโอนผลการเรียน",
      date: formattedDateTime,
    });
    await newTransfer.save();

    res.status(201).json({
      message: "เพิ่มข้อมูลสำเร็จ!",
      newTransferOrder,
      newTransferList,
      newTransfer,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

exports.TransferUpload = async (req, res) => {
  try {
    var data = req.body;
    if (req.file) {
      data.file = req.file.filename;
    }
    const order_id = "TS-" + data.student_id;

    const updatedFile = await TransferOrder.findOneAndUpdate(
      { _id: order_id },
      { file: data.file },
      { new: true } // เพื่อให้ส่งค่าข้อมูลที่ถูกอัปเดตกลับมา
    );

    res.json({ message: "อัปโหลดไฟล์สำเร็จ", data: updatedFile });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

exports.TransferListAdmin = async (req, res) => {
  try {
    const TransferListAdmin = await Transfer.find({}).exec();
    res.json(TransferListAdmin);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

exports.TransferRead = async (req, res) => {
  try {
    const Transfer_id = req.params._id;
    const TransferOrder_id = "TS-" + Transfer_id;

    const readTransfer = await Transfer.findOne({ _id: Transfer_id }).exec();
    const readTransferOrder = await TransferOrder.findOne({
      _id: TransferOrder_id,
    }).exec();
    const transferList = await TransferList.find({
      transferOrder_id: TransferOrder_id,
    }).exec();

    const responseData = {
      readTransfer: readTransfer,
      readTransferOrder: readTransferOrder,
      transferList: transferList,
    };

    res.json(responseData);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};
