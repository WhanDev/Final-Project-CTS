const Subject = require("../Models/Model_Subject");

//เพิ่มข้อมูลรายวิชา
exports.create = async (req, res) => {
  try {
    const {
      structure_id,
      group_id,
      subject_id,
      subject_nameTh,
      subject_nameEn,
      description,
      theory_credits,
      practical_credits,
    } = req.body;
    if (
      !structure_id ||
      !group_id ||
      !subject_id ||
      !subject_nameTh ||
      !subject_nameEn ||
      (isNaN(theory_credits) && theory_credits !== "") ||
      (isNaN(practical_credits) && practical_credits !== "")
    ) {
      return res.status(400).send("กรุณากรอกข้อมูลให้ครบ");
    }
    const existingSubjectId = await Subject.findOne({ subject_id: subject_id });
    if (existingSubjectId) {
      return res.status(409).send("รหัสรายวิชาซ้ำ");
    }
    const existingSubject = await Subject.findOne({
      subject_id,
      structure_id,
      group_id,
    });
    if (existingSubject) {
      return res.status(409).send("รหัสกลุ่มวิชาและรหัสวิชาซ้ำกัน");
    }
    const total_credits = theory_credits + practical_credits;
    const createSubject = await Subject({
      structure_id,
      group_id,
      subject_id,
      subject_nameTh,
      subject_nameEn,
      description,
      theory_credits,
      practical_credits,
      total_credits,
    }).save();
    res
      .status(201)
      .json({ message: "เพิ่มข้อมูลสำเร็จ!", data: createSubject });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ!", error: err.message });
  }
};

//ดูข้อมูลรายวิชาทั้งหมด
exports.list = async (req, res) => {
  try {
    const listSubject = await Subject.find({}).exec();
    res.json(listSubject);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

//ดูข้อมูลรายวิชาตาม _id ของโครงสร้างหลักสูตร
exports.listByStructure = async (req, res) => {
  try {
    const structure_id = req.params.structure_id;
    const listSubject = await Subject.find({
      structure_id: structure_id,
    })
      .sort({
        structure_id: 1,
      })
      .exec();
    res.json(listSubject);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

//ดูข้อมูลรายวิชาตาม _id
exports.read = async (req, res) => {
  try {
    const _id = req.params._id;
    const readSubject = await Subject.findOne({ _id: _id }).exec();
    res.json(readSubject);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

exports.readSubject_id = async (req, res) => {
  try {
    const subject_id = req.params.subject_id;
    const readSubject = await Subject.findOne({
      subject_id: subject_id,
    }).exec();
    res.json(readSubject);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

//แก้ไขข้อมูลรายวิชา
exports.update = async (req, res) => {
  try {
    const _id = req.params._id;
    var newData = req.body;

    const totalCredits = newData.theory_credits + newData.practical_credits;

    newData.total_credits = totalCredits;

    const updatedSubject = await Subject.findOneAndUpdate(
      { _id: _id },
      newData,
      {
        new: true,
      }
    ).exec();
    res.json({ message: "แก้ไขข้อมูลสำเร็จ!", data: updatedSubject });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

const MachSubjectList = require("../Models/Model_MachSubjectList");
const MachSubject = require("../Models/Model_MatchSubject");

//ลบข้อมูลรายวิชา
exports.remove = async (req, res) => {
  try {
    // code
    const _id = req.params._id;

    const subject = await Subject.findById(_id).exec();

    if (!Subject) {
      return res.status(404).json({ message: "ไม่พบข้อมูลที่ต้องการลบ" });
    }

    const relatedMachSubject = await MachSubject.find({
      subject_id: subject.subject_id,
    }).exec();

    const strcurriculum = subject.structure_id;
    const curriculum = strcurriculum.replace("CS-", "");

    const relatedMachSubjectList = await MachSubjectList.find({
      machSubject_id: "MS" + curriculum + "-" + subject.subject_id,
    }).exec();

    if (relatedMachSubjectList.length > 0 || relatedMachSubject.length > 0) {
      return res.status(403).json({
        message: "ไม่สามารถลบรายวิชานี้ได้ เนื่องจากรายวิชาอยู่ในคู่เทียบโอน",
        relatedMachSubject,
        relatedMachSubjectList,
      });
    }

    const removedSubject = await Subject.findOneAndDelete({
      _id: _id,
    }).exec();

    res.json({
      message: "ลบข้อมูลรายวิชาสำเร็จ!",
      removedSubject,
      relatedMachSubject,
      relatedMachSubjectList,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};
