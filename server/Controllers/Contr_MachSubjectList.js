const MachSubjectList = require("../Models/Model_MachSubjectList");

exports.create = async (req, res) => {
  try {
    const { machSubject_id, extraSubject_id } = req.body;

    if (!machSubject_id || !extraSubject_id) {
      return res.status(400).send("กรุณากรอกข้อมูลให้ครบ");
    }

    const createMachSubjectList = await MachSubjectList.create({
      machSubject_id,
      extraSubject_id,
    });

    res
      .status(201)
      .json({ message: "เพิ่มข้อมูลสำเร็จ!", data: createMachSubjectList });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ!", error: err.message });
  }
};

exports.list = async (req, res) => {
  try {
    const listMachSubjectList = await MachSubjectList.find({})
      .sort({
        machSubject_id: 1,
      })
      .exec();
    res.json(listMachSubjectList);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

exports.read = async (req, res) => {
  try {
    const _id = req.params._id;
    const readMachSubjectList = await MachSubjectList.findOne({
      _id: _id,
    }).exec();
    res.json(readMachSubjectList);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const _id = req.params._id;
    var newData = req.body;

    const updatedSubject = await MachSubjectList.findOneAndUpdate(
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

exports.remove = async (req, res) => {
  try {
    const _id = req.params._id;
    const removedMachSubjectList = await MachSubjectList.findOneAndDelete({
      _id: _id,
    }).exec();
    res.json({ message: "ลบข้อมูลสำเร็จ!", data: removedMachSubjectList });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};
