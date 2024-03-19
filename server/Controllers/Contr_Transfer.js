const MatchSubject = require("../Models/Model_MatchSubject");
const MatchSubjectList = require("../Models/Model_MachSubjectList");

exports.TestTransfer = async (req, res) => {
  try {
    const curriculum = req.body.curriculum;
    let extraSubjects = req.body.extraSubjects;

    if (!Array.isArray(extraSubjects)) {
      return res
        .status(400)
        .json({ message: "extraSubjects ต้องเป็นอาร์เรย์" });
    }

    const matchSubjectAll = await MatchSubject.find({
      curriculum: curriculum,
    }).exec();

    const matchesListAll = await MatchSubjectList.find({}).exec();
    const matchesList = matchesListAll
      .slice()
      .sort((a, b) => a.extraSubject_id.length - b.extraSubject_id.length);

    let dataList = [];

    for (const match of matchesList) {
      const { machSubject_id } = match;

      const matchSubject = matchSubjectAll.find(
        (subject) => subject._id.toString() === machSubject_id
      );

      if (matchSubject) {
        const matchListId = await MatchSubjectList.findOne({
          machSubject_id: matchSubject._id,
        }).exec();

        dataList.push({
          subject_id: matchSubject.subject_id,
          extraSubject: matchListId.extraSubject_id,
        });
      }
    }

    let results = [];

    for (const extraSubject of extraSubjects) {
      let { extraSubject_id, grade } = extraSubject;

      if (grade >= 2.5) {
        result = "เกรดผ่าน";
      } else {
        result = "เกรดไม่ผ่าน";
      }

      results.push({ extraSubject_id, grade, result });
    }

    res.status(200).json({
      message: "ผ่าน",
      curriculum: curriculum,
      data: dataList,
      results: results,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};
