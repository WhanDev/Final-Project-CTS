const Structure = require("../Models/Model_Structure");
const Subject = require("../Models/Model_Subject");

//เพิ่มข้อมูลโครงสร้างหลักสูตร
exports.create = async (req, res) => {
  try {
    const { structure_id, sort, group_id, group_name, credit, curriculum } =
      req.body;

    if (
      !structure_id ||
      !sort ||
      !group_id ||
      !group_name ||
      !credit ||
      !curriculum
    ) {
      return res.status(400).send("กรุณากรอกข้อมูลให้ครบ");
    }

    const existingStructure = await Structure.findOne({
      structure_id,
      sort,
      group_id,
    });

    if (existingStructure) {
      return res.status(409).send("รหัสกลุ่มวิชาซ้ำ");
    }

    const createStructure = await Structure({
      structure_id,
      sort,
      group_id,
      group_name,
      credit,
      curriculum,
    }).save();
    res
      .status(201)
      .json({ message: "เพิ่มข้อมูลสำเร็จ!", data: createStructure });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ!", error: err.message });
  }
};

//ดูข้อมูลโครงสร้างหลักสูตรทั้งหมด
exports.list = async (req, res) => {
  try {
    const listStructure = await Structure.find({}).exec();
    res.json(listStructure);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

//ดูข้อมูลโครงสร้างหลักสูตรตาม _id ของหลักสูตร
exports.listByCurriculm = async (req, res) => {
  try {
    const curriculum = req.params.curriculum;
    const listStructure = await Structure.find({
      curriculum: curriculum,
    })
      .sort({
        group_id: 1,
      })
      .exec();
    res.json(listStructure);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

//ดูข้อมูลโครงสร้างหลักสูตรตาม _id
exports.read = async (req, res) => {
  try {
    const _id = req.params._id;
    const readStructure = await Structure.findOne({ _id: _id }).exec();
    res.json(readStructure);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

exports.readBygroup = async (req, res) => {
  try {
    const group_id = req.params.group_id;
    const listStructure = await Structure.findOne({
      group_id: group_id,
    }).exec();
    res.json(listStructure);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

//แก้ไขข้อมูลโครงสร้างหลักสูตร
exports.update = async (req, res) => {
  try {
    const _id = req.params._id;
    var newData = req.body;

    const updatedStructure = await Structure.findOneAndUpdate(
      { _id: _id },
      newData,
      {
        new: true,
      }
    ).exec();
    res.json({ message: "แก้ไขข้อมูลสำเร็จ!", data: updatedStructure });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

//ลบข้อมูลโครงสร้างหลักสูตร
exports.remove = async (req, res) => {
  try {
    const _id = req.params._id;
    const structure = await Structure.findOne({ _id: _id }).exec();

    const structure_id = structure.structure_id;
    const group_id = structure.group_id;

    if (!structure) {
      return res.status(404).json({ message: "ไม่พบข้อมูลที่ต้องการลบ" });
    }

    const relatedSubject = await Subject.find({
      structure_id: structure_id,
      group_id: group_id,
    }).exec();

    if (relatedSubject.length > 0) {
      return res.status(403).json({
        message: "ไม่สามารถลบข้อมูลที่มีความสัมพันธ์กับ Collection อื่นได้",
      });
    }

    const removedStructure = await Structure.findOneAndDelete({
      _id: _id,
    }).exec();
    res.json({ message: "ลบข้อมูลสำเร็จ!", data: removedStructure });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};
