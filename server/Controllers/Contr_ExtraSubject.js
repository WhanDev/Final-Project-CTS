const ExtraSubject = require("../Models/Model_ExtraSubject");

//เพิ่มข้อมูลรายวิชา
exports.create = async (req, res) => {
  try {
    const {
      extraSubject_id,
      extraSubject_nameTh,
      extraSubject_nameEn,
      description,
      theory_credits,
      practical_credits,
      createBy,
    } = req.body;

    if (
      !extraSubject_id ||
      !extraSubject_nameTh ||
      !extraSubject_nameEn ||
      (isNaN(theory_credits) && theory_credits !== "") ||
      (isNaN(practical_credits) && practical_credits !== "") ||
      !createBy
    ) {
      return res.status(400).send("กรุณากรอกข้อมูลให้ครบ");
    }

    const total_credits = theory_credits + practical_credits;

    const createExtraSubject = await ExtraSubject({
      extraSubject_id,
      extraSubject_nameTh,
      extraSubject_nameEn,
      description,
      theory_credits,
      practical_credits,
      total_credits,
      createBy,
    }).save();
    res
      .status(201)
      .json({ message: "เพิ่มข้อมูลสำเร็จ!", data: createExtraSubject });
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
    const listExtraSubject = await ExtraSubject.find()
      .sort({
        extraSubject_id: 1,
      })
      .exec();
    res.json(listExtraSubject);
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
    const readExtraSubject = await ExtraSubject.findOne({ _id: _id }).exec();
    res.json(readExtraSubject);
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

    const updatedSubject = await ExtraSubject.findOneAndUpdate(
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

//ลบข้อมูลรายวิชา
exports.remove = async (req, res) => {
  try {
    // code
    const _id = req.params._id;

    const extraSubject = await ExtraSubject.findById(_id).exec();

    if (!extraSubject) {
      return res.status(404).json({ message: "ไม่พบข้อมูลที่ต้องการลบ" });
    }

    const relatedMachSubjectList = await MachSubjectList.find({
      extraSubject_id: extraSubject.extraSubject_id,
    }).exec();

    if (relatedMachSubjectList.length > 0) {
      return res.status(403).json({
        message: "ไม่สามารถลบรายวิชานี้ได้ เนื่องจากรายวิชาอยู่ในคู่เทียบโอน",
        data: relatedMachSubjectList,
      });
    }

    const removedExtraSubject = await ExtraSubject.findOneAndDelete({
      _id: _id,
    }).exec();

    res.json({ message: "ลบข้อมูลสำเร็จ!", data: removedExtraSubject,extraSubject });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};
