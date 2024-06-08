const Curriculum = require("../Models/Model_Curriculum");
const Admin = require("../Models/Model_Admin");
const Student = require("../Models/Model_Student");
const Structure = require("../Models/Model_Structure");
const Subject = require("../Models/Model_Subject");

//เพิ่มข้อมูลหลักสูตร
exports.create = async (req, res) => {
  try {
    const { _id, name, level, year, time } = req.body;

    if (!_id || !name || !level || !year || !time) {
      return res.status(400).send("กรุณากรอกข้อมูลให้ครบ");
    }

    const existingCurriculum = await Curriculum.findById(_id);
    if (existingCurriculum) {
      return res.status(400).json({ message: "รหัสหลักสูตรซ้ำ!" });
    }

    const createCurriculum = await Curriculum({
      _id,
      name,
      level,
      year,
      time,
    }).save();
    res
      .status(201)
      .json({ message: "เพิ่มข้อมูลสำเร็จ!", data: createCurriculum });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ!", error: err.message });
  }
};

//ดูข้อมูลหลักสูตรทั้งหมด
exports.list = async (req, res) => {
  try {
    const listCurriculum = await Curriculum.find({ _id: { $ne: "0000000" } })
      .sort({
        _id: 1,
      })
      .exec();
    res.json(listCurriculum);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

//ดูข้อมูลหลักสูตรตาม _id
exports.read = async (req, res) => {
  try {
    const _id = req.params._id;
    const readCurriculum = await Curriculum.findOne({ _id: _id }).exec();
    res.json(readCurriculum);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

//แก้ไขข้อมูลหลักสูตร
exports.update = async (req, res) => {
  try {
    const _id = req.params._id;
    var newData = req.body;

    const updatedCurriculum = await Curriculum.findOneAndUpdate(
      { _id: _id },
      newData,
      {
        new: true,
      }
    ).exec();
    res.json({ message: "แก้ไขข้อมูลสำเร็จ!", data: updatedCurriculum });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

//ลบข้อมูลหลักสูตร
exports.remove = async (req, res) => {
  try {
    const id = req.params._id;

    const curriculum = await Curriculum.findById(id).exec();

    if (!curriculum) {
      return res.status(404).json({ message: "ไม่พบข้อมูลที่ต้องการลบ" });
    }

    const relatedAdmin = await Admin.find({ curriculum: id }).exec();
    const relatedStudent = await Student.find({ curriculum: id }).exec();
    const relatedStructure = await Structure.find({ curriculum: id }).exec();

    if (relatedAdmin.length > 0 || relatedStudent.length > 0 || relatedStructure.length > 0) {
      return res.status(403).json({
        message: "ไม่สามารถลบข้อมูลหลักสูตรนี้ได้ เนื่องจากมีผู้ใช้ระบบและรายวิชาในหลักสูตร",
      });
    }

    const removedCurriculum = await Curriculum.findOneAndDelete({
      _id: id,
    }).exec();

    res.json({ message: "ลบข้อมูลสำเร็จ!", data: removedCurriculum });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

