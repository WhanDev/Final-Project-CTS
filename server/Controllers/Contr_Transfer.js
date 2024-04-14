const MatchSubject = require("../Models/Model_MatchSubject");
const MatchSubjectList = require("../Models/Model_MachSubjectList");
const Subject = require("../Models/Model_Subject");

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
    
    let unsuccess = []
    let ResultFound = [];
    const success = [];

    for (const extraSubject of extraSubjects) {
      if (extraSubject.grade >= 2.5) {
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
            note: "ไม่พบในคู่เทียบโอน ไม่สามารถนำมาเทียบโอนได้",
          });
        }
      } else {
        unsuccess.push({
          extra_id: extraSubject.id,
          note: "เกรดน้อยกว่า 2.5 ไม่สามารถนำมาเทียบโอนได้",
        });
      }
    }

    let machSubjectCount = {};
    const machSubjectIdsInResultFound = [];

    ResultFound.forEach((result) => {
      const { id, machSubject_id, subject_id } = result;
      if (machSubjectCount[machSubject_id]) {
        machSubjectCount[machSubject_id]++;
      } else {
        machSubjectCount[machSubject_id] = 1;
      }

      machSubjectIdsInResultFound.push({ id, machSubject_id, subject_id });
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
                success.push({
                  id: machSubjectId,
                  extra_id: extraSubjectId.extraSubject_id,
                  subject_id: foundMatch.subject_id,
                  note: "สามารถนำมาเทียบโอนได้",
                });
              } else {
                unsuccess.push({
                  extra_id: foundMatch.id,
                  note: "พบในคู่เทียบโอน แต่ไม่ตรงถามเงื่อนไข ไม่สามารถนำมาเทียบโอนได้",
                });
              }
            }
          })
        );
      })
    );
    

    res.status(200).json({
      message: "ผ่าน",
      //res เกรดน้อยกว่า 2.5 ไม่สามารถนำมาเทียบโอนได้
      // gradeFail,
      //res ไม่พบในคู่เทียบโอน ไม่สามารถนำมาเทียบโอนได้
      // notFound,
      //res พบในคู่เทียบโอน แต่ไม่ตรงถ9ามเงื่อนไข ไม่สามารถนำมาเทียบโอนได้
      // countFail,
      //res สามารถนำมาเทียบโอนได้
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