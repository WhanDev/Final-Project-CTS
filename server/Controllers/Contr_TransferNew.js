const MatchSubject = require("../Models/Model_MatchSubject");
const MatchSubjectList = require("../Models/Model_MachSubjectList");
const Subject = require("../Models/Model_Subject");
const Student = require("../Models/Model_Student");

exports.TestTransferNew = async (req, res) => {
  try {
    const { structure_id, extraSubjects } = req.body;
    const [, curriculum_id] = structure_id.split("-");

    const FindMatch = await MatchSubject.find({ curriculum: curriculum_id });

    const groupMatch = [];
    for (const match of FindMatch) {
      const id = match.id;
      const subject_id = match.subject_id;

      let extra_id = [];
      let extra_count = 0;

      const FindMatchlList = await MatchSubjectList.findOne({
        machSubject_id: id,
      });

      if (FindMatchlList) {
        extra_id = FindMatchlList.extraSubject_id.map((item) => item);
      }

      for (let i = 0; i < extra_id.length; i++) {
        ++extra_count;
      }

      const FindSubject = await Subject.findOne({
        subject_id: subject_id,
        structure_id: structure_id,
      });

      groupMatch.push({
        machSubject_id: id,
        subject_id: FindSubject.subject_id,
        extra_count,
        extraSubject_id: extra_id,
      });
    }

    const unsuccess = [];
    const success = []

    for (const extraSubject of extraSubjects) {
      const grade = extraSubject.grade;
      const id = extraSubject.id;
      const gradeTrue = ["A", "B+", "B", "C+", "C"];
      let statusFound = false;
      const found = [];
      const unfound = [];
      if (grade >= 2 || gradeTrue.includes(grade)) {
        console.log("Y grade");
        //find id includes groupMatch.extraSubject_id
        for (const group of groupMatch) {
          const extraSubject_id = group.extraSubject_id;
          if (extraSubject_id.includes(id)) {
            success.push({
              machSubject_id:group.machSubject_id,
              subject_id:group.subject_id,
              extraSubject_id:group.extraSubject_id,
              id:id,
              grade:grade,
              note:'เทียบโอนได้'
            });
            statusFound = true;
          }
        }

        if (!statusFound) {
          unsuccess.push({
            extraSubject_id: id,
            grade: grade,
            note: 'ไม่มีรายวิชานี้อยู่ในคู่เทียบโอน'
          });
        }
      } else {
        unsuccess.push({
          extraSubject_id: id,
          grade: grade,
          note: 'ผลการเรียนน้อยกว่ากำหนด'
        });
      }
    }

    res.status(200).json({
      message: "ดีค่าบ",
      curriculum_id,
      unsuccess,
      success
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};
