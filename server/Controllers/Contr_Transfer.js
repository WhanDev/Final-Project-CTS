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

    if (SubjectByCurriculum.length === 0) {
      return res.status(404).json({ message: "ไม่พบรายวิชาในหลักสูตร" });
    }

    let AllSubjectByCurriculum = SubjectByCurriculum.map((subject) => ({
      subject_id: subject.subject_id,
      subject_nameTh: subject.subject_nameTh,
      subject_nameEn: subject.subject_nameEn,
      group_id: subject.group_id,
    }));

    const [, structureIdNumber] = structure_id.split("-");

    let AllMatchSubject = [];

    for (let subject of AllSubjectByCurriculum) {
      const matchSubject = await MatchSubject.find({
        _id: "MS" + structureIdNumber + "-" + subject.subject_id,
      });

      if (matchSubject.length > 0) {
        const machSubjectList = await MatchSubjectList.find({
          machSubject_id: matchSubject[0]._id,
        });

        const extraSubjectIds = machSubjectList.map((listItem) => ({
          id: listItem._id,
          count: listItem.extraSubject_id.length,
          list: listItem.extraSubject_id,
        }));

        AllMatchSubject.push({
          subject_id: matchSubject[0].subject_id,
          group_id: matchSubject[0].group_id,
          machSubject_id: matchSubject[0]._id,
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
    let perSuccess = [];
    let perFinalSuccess = [];

    for (let extraSubject of extraSubjects) {
      const validGrades = ["A", "B+", "B", "C+", "C"];
      if (extraSubject.grade >= 2 || validGrades.includes(extraSubject.grade)) {
        const extraSubjectId = extraSubject.id;
        let found = false;

        for (let matchSubject of AllMatchSubject) {
          for (let extraSubjectItem of matchSubject.extraSubject_id) {
            if (extraSubjectItem.list.includes(extraSubjectId)) {
              ResultFound.push({
                id: extraSubject.id,
                grade: extraSubject.grade,
                machSubject_id: extraSubjectItem.id,
                subject_id: matchSubject.subject_id,
                group_id: matchSubject.group_id,
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
      const { id, grade, machSubject_id, subject_id, group_id } = result;
      machSubjectCount[machSubject_id] =
        (machSubjectCount[machSubject_id] || 0) + 1;
      machSubjectIdsInResultFound.push({
        id,
        grade,
        machSubject_id,
        subject_id,
        group_id,
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
                  group_id: foundMatch.group_id,
                  machlist_id: machSubjectId,
                  extra_id: extraSubjectId.extraSubject_id.map((id) => ({
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

    const duplicateMachIds = {};

    perSuccess.forEach((entry) => {
      if (duplicateMachIds[entry.mach_id]) {
        duplicateMachIds[entry.mach_id].push(entry);
      } else {
        duplicateMachIds[entry.mach_id] = [entry];
      }
    });

    let unsuccessNew = [];

    for (let machId in duplicateMachIds) {
      const entries = duplicateMachIds[machId];
      const extraIdCounts = entries.map((entry) => entry.extra_id.length);
      const maxExtraIdCount = Math.min(...extraIdCounts);

      entries.forEach((entry) => {
        if (entry.extra_id.length > maxExtraIdCount) {
          entry.extra_id.forEach((extra) => {
            unsuccessNew.push({
              extra_id: extra.id,
              grade: extra.grade,
              note: `รายวิชาที่สามารถเทียบได้ซ้ำกัน`,
            });
          });
        } else {
          perFinalSuccess.push(entry);
        }
      });
    }

    let duplicate = [];
    let unDuplicate = [];

    const findDuplicateMachIds = (perFinalSuccess) => {
      const duplicateMachIds = {};

      perFinalSuccess.forEach((entry) => {
        if (duplicateMachIds[entry.mach_id]) {
          duplicateMachIds[entry.mach_id].push(entry);
        } else {
          duplicateMachIds[entry.mach_id] = [entry];
        }
      });

      for (let machId in duplicateMachIds) {
        const entries = duplicateMachIds[machId];
        if (entries.length > 1) {
          entries.forEach((entry) => {
            duplicate.push(entry);
          });
        } else {
          unDuplicate.push(entries[0]);
        }
      }
    };

    findDuplicateMachIds(perFinalSuccess);

    const findDuplicateExtraIds = (duplicate, unDuplicate) => {
      const extractExtraIds = (entries) =>
        entries.flatMap((entry) => entry.extra_id.map((extra) => extra.id));

      const duplicateExtraIds = extractExtraIds(duplicate);
      const unDuplicateExtraIds = extractExtraIds(unDuplicate);

      const duplicateIds = duplicateExtraIds.filter((extraId) =>
        unDuplicateExtraIds.includes(extraId)
      );

      if (duplicateIds.length > 0) {
        duplicate.forEach((entry, index) => {
          entry.extra_id.forEach((extra) => {
            if (duplicateIds.includes(extra.id)) {
              duplicate.splice(index, 1);
            }
          });
        });
      }
    };

    findDuplicateExtraIds(duplicate, unDuplicate);

    let FinalPerSuccess = duplicate.concat(unDuplicate);

    let FinalSuccess = FinalPerSuccess.sort((a, b) =>
      a.mach_id < b.mach_id ? -1 : a.mach_id > b.mach_id ? 1 : 0
    );

    let FinalUnsuccess = [];

    const updatedUnsuccess = (FinalSuccess) => {
      const updatedUnsuccess = unsuccess.filter(
        (un) =>
          !FinalSuccess.some((fs) =>
            fs.extra_id.some((extra) => extra.id === un.extra_id)
          )
      );

      const distinctItems = updatedUnsuccess.filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.extra_id === item.extra_id)
      );

      FinalUnsuccess = distinctItems;
    };

    updatedUnsuccess(FinalSuccess);

    let FinalUnsuccessNew = [];

    const updatedUnsuccessNew = (FinalSuccess) => {
      const updatedUnsuccess = unsuccessNew.filter(
        (un) =>
          !FinalSuccess.some((fs) =>
            fs.extra_id.some((extra) => extra.id === un.extra_id)
          )
      );

      const distinctItems = updatedUnsuccess.filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.extra_id === item.extra_id)
      );

      FinalUnsuccessNew = distinctItems;
    };

    updatedUnsuccessNew(FinalSuccess);

    let AllUnsuccess = [];

    const distinct = (FinalUnsuccess, FinalUnsuccessNew) => {
      FinalUnsuccess.forEach((un) => {
        if (
          !FinalUnsuccessNew.some((unNew) => unNew.extra_id === un.extra_id)
        ) {
          AllUnsuccess.push(un);
        }
      });

      FinalUnsuccessNew.forEach((unNew) => {
        AllUnsuccess.push(unNew);
      });
    };

    distinct(FinalUnsuccess, FinalUnsuccessNew);

    const perSuccessLast = [];
    let perUnsuccessLast = [];

    const findDuplicate = async (
      finalSuccess,
      allMatchSubject,
      allUnsuccess
    ) => {
      const extraIdMap = new Map();

      finalSuccess.forEach((entry) => {
        entry.extra_id.forEach((extra) => {
          if (!extraIdMap.has(extra.id)) {
            extraIdMap.set(extra.id, []);
          }
          extraIdMap.get(extra.id).push(entry);
        });
      });

      extraIdMap.forEach((entries) => {
        if (entries.length > 1) {
          for (let i = 1; i < entries.length; i++) {
            const index = finalSuccess.findIndex(
              (entry) => entry === entries[i]
            );
            if (index !== -1) {
              finalSuccess.splice(index, 1);
            }
          }
        }
      });

      const ResultFoundNew = [];

      for (let extraSubject of allUnsuccess) {
        const extraSubjectId = extraSubject.extra_id;

        for (let matchSubject of allMatchSubject) {
          for (let extraSubjectItem of matchSubject.extraSubject_id) {
            if (extraSubjectItem.list.includes(extraSubjectId)) {
              ResultFoundNew.push({
                id: extraSubjectId,
                grade: extraSubject.grade,
                machSubject_id: extraSubjectItem.id,
                subject_id: matchSubject.subject_id,
                result: "พบในรายการคู่เทียบโอน",
              });
            }
          }
        }
      }

      let machSubjectCountNew = {};
      const machSubjectIdsInResultFoundNew = [];

      ResultFoundNew.forEach((result) => {
        const { id, grade, machSubject_id, subject_id } = result;
        machSubjectCountNew[machSubject_id] =
          (machSubjectCountNew[machSubject_id] || 0) + 1;
        machSubjectIdsInResultFoundNew.push({
          id,
          grade,
          machSubject_id,
          subject_id,
        });
      });

      await Promise.all(
        allMatchSubject.map(async (matchSubject) => {
          await Promise.all(
            matchSubject.extraSubject_id.map(async (extraSubjectItem) => {
              const machSubjectId = extraSubjectItem.id;
              const foundMatch = machSubjectIdsInResultFoundNew.find(
                (item) => item.machSubject_id === machSubjectId
              );
              if (foundMatch) {
                const machSubjectCountInResultFound =
                  machSubjectCountNew[machSubjectId] || 0;
                if (machSubjectCountInResultFound === extraSubjectItem.count) {
                  const extraSubjectId = await MatchSubjectList.findOne({
                    _id: machSubjectId,
                  });
                  perSuccessLast.push({
                    curriculum_id: structureIdNumber,
                    mach_id: matchSubject.machSubject_id,
                    subject_id: foundMatch.subject_id,
                    machlist_id: machSubjectId,
                    extra_id: extraSubjectId.extraSubject_id.map((id) => ({
                      id: id,
                      grade: extraSubjects.find((extra) => extra.id === id)
                        .grade,
                    })),
                    note: "สามารถนำมาเทียบโอนได้",
                  });
                }
              }
            })
          );
        })
      );

      const filteredUnsuccess = allUnsuccess.filter(
        (unsuccessItem) =>
          !perSuccessLast.some((successItem) =>
            successItem.extra_id.some(
              (extra) => extra.id === unsuccessItem.extra_id
            )
          )
      );

      perUnsuccessLast = filteredUnsuccess;
    };

    await findDuplicate(FinalSuccess, AllMatchSubject, AllUnsuccess);

    const LastSuccess = FinalSuccess.concat(perSuccessLast);

    res.status(200).json({
      ungrade,
      unsuccess: perUnsuccessLast,
      success: LastSuccess,
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
        { $set: { status: "รอการยืนยันการเทียบโอนเบื้องต้น" } }
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
      checkBy: "",
      approveBy: "",
      status: "รอการยืนยันการเทียบโอนเบื้องต้น",
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

const Structure = require("../Models/Model_Structure");

exports.CutStructure = async (req, res) => {
  try {
    let curriculum = req.params.curriculum;

    const listStructure = await Structure.find({
      curriculum: curriculum,
    })
      .sort({
        sort: 1,
        group_id: 1,
      })
      .select("sort group_id group_name credit")
      .exec();

    const structure_id = "CS-" + curriculum;
    let cutStructure = [];

    for (let i = 0; i < listStructure.length; i++) {
      const subject = await Subject.find({
        structure_id: structure_id,
        group_id: listStructure[i].group_id,
      }).select("subject_id total_credits");

      if (subject.length > 0) {
        cutStructure.push({
          structure: listStructure[i],
          subject: subject,
        });
      }
    }

    res.json(cutStructure);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

exports.TransferUpdate = async (req, res) => {
  try {
    const { _id } = req.params;
    const { unsuccess, success } = req.body;

    const order_id = "TS-" + _id;

    await TransferList.updateOne(
      { transferOrder_id: order_id },
      { unsuccess: unsuccess }
    );

    await TransferList.updateOne(
      { transferOrder_id: order_id },
      { success: success }
    );

    res.json({
      message: "อัปเดตข้อมูลการเทียบโอนเรียบร้อยแล้ว",
      unsuccess,
      success,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "เกิดข้อผิดพลาดในการอัปเดตข้อมูลการเทียบโอน",
      error: error.message,
    });
  }
};

exports.TransferListEdit = async (req, res) => {
  try {
    const student_id = req.params._id;
    const student = await Student.findOne({ _id: student_id });
    const structure_id = "CS-" + student.curriculum;

    const SubjectByCurriculum = await Subject.find({
      structure_id: structure_id,
    });

    res.json({ SubjectByCurriculum: SubjectByCurriculum });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

exports.TransferConfirmPath1 = async (req, res) => {
  try {
    const student_id = req.params._id;
    const checkBy_id = req.body.checkBy;
    const updatedStatusTransfer = await Transfer.findOneAndUpdate(
      { _id: student_id },
      {
        $set: {
          checkBy: checkBy_id,
          status: "รอการยืนยันการเทียบโอน โดยอาจารย์ประจำหลักสูตร",
        },
      },
      { new: true }
    );
    const updatedStatusStudent = await Student.findOneAndUpdate(
      { _id: student_id },
      {
        $set: { status: "รอการยืนยันการเทียบโอน โดยอาจารย์ประจำหลักสูตร" },
      },
      { new: true }
    );
    if (!updatedStatusTransfer || !updatedStatusStudent) {
      return res.status(404).json({ message: "ไม่พบข้อมูลนักศึกษา" });
    }
    res.json({
      message: "อัปโหลดสถานะสำเร็จ",
      updatedStatusTransfer,
      updatedStatusStudent,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

exports.TransferConfirmPath2 = async (req, res) => {
  try {
    const student_id = req.params._id;
    const approve_id = req.body.approveBy;

    const updatedStatusTransfer = await Transfer.findOneAndUpdate(
      { _id: student_id },
      { $set: { approveBy: approve_id, status: "ยืนยันการเทียบโอนถูกต้อง" } },
      { new: true } // This option returns the updated document
    );

    const updatedStatusStudent = await Student.findOneAndUpdate(
      { _id: student_id },
      { $set: { status: "ยืนยันการเทียบโอนถูกต้อง" } },
      { new: true } // This option returns the updated document
    );

    if (!updatedStatusTransfer || !updatedStatusStudent) {
      return res
        .status(404)
        .json({ message: "ไม่พบข้อมูลนักเรียนหรือการโอนย้าย" });
    }

    res.json({
      message: "อัปโหลดสถานะสำเร็จ",
      updatedStatusTransfer,
      updatedStatusStudent,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

const fs = require("fs");
const path = require("path");

exports.TransferDelete = async (req, res) => {
  try {
    const Transfer_id = req.params._id;
    const TransferOrder_id = "TS-" + Transfer_id;

    const removedStudent = await Student.findOneAndUpdate(
      { _id: Transfer_id },
      { $set: { status: "ยังไม่ดำเนินการเทียบโอนเบื้องต้น" } },
      { new: true }
    );

    const removedTransfer = await Transfer.findOneAndDelete({
      _id: Transfer_id,
    }).exec();
    const removedTransferOrder = await TransferOrder.findOneAndDelete({
      _id: TransferOrder_id,
    }).exec();

    if (removedTransferOrder && removedTransferOrder.file) {
      const fileName = "TransferOrder-" + Transfer_id + ".pdf";
      const filePath = path.join(__dirname, "../uploads", fileName);

      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          console.error("ไม่พบไฟล์", filePath);
        } else {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error("เกิดข้อผิดพลาด", filePath);
            } else {
              console.log("ลบไฟล์สำเร็จ", filePath);
            }
          });
        }
      });
    }

    const removedTransferList = await TransferList.findOneAndDelete({
      transferOrder_id: TransferOrder_id,
    }).exec();

    res.json({
      message: "รายการเทียบโอนถูกลบเรียบร้อยแล้ว",
      removedStudent,
      removedTransfer,
      removedTransferOrder,
      removedTransferList,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

//TransferRevert
exports.TransferRevert = async (req, res) => {
  try {
    const student_id = req.params._id;
    const approve_id = "";

    const updatedStatusTransfer = await Transfer.findOneAndUpdate(
      { _id: student_id },
      {
        $set: {
          approveBy: approve_id,
          status: "รอการยืนยันการเทียบโอน โดยอาจารย์ประจำหลักสูตร",
        },
      },
      { new: true } // This option returns the updated document
    );

    const updatedStatusStudent = await Student.findOneAndUpdate(
      { _id: student_id },
      { $set: { status: "รอการยืนยันการเทียบโอน โดยอาจารย์ประจำหลักสูตร" } },
      { new: true } // This option returns the updated document
    );

    if (!updatedStatusTransfer || !updatedStatusStudent) {
      return res
        .status(404)
        .json({ message: "ไม่พบข้อมูลนักเรียนหรือการโอนย้าย" });
    }

    res.json({
      message: "อัปโหลดสถานะสำเร็จ",
      updatedStatusTransfer,
      updatedStatusStudent,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};
