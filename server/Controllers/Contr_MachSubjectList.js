const MachSubjectList = require("../Models/Model_MachSubjectList");
const MachSubject = require("../Models/Model_MatchSubject");

exports.create = async (req, res) => {
  try {
    const { curriculum, subject_id, machSubject_id, extraSubject_id } =
      req.body;

    const _id = "MS" + curriculum + "-" + subject_id;

    const checkMachSubject = await MachSubject.findOne({ _id });

    if (checkMachSubject) {
      const createMachSubjectList = await MachSubjectList.create({
        machSubject_id,
        extraSubject_id,
      });

      res
        .status(201)
        .json({ message: "เพิ่มข้อมูลสำเร็จ!", data: createMachSubjectList });
    } else {
      const createMachSubject = await MachSubject.create({
        _id,
        curriculum,
        subject_id,
      });

      const createMachSubjectList = await MachSubjectList.create({
        machSubject_id,
        extraSubject_id,
      });

      res.status(201).json({
        message: "เพิ่มข้อมูลสำเร็จ!",
        data: { createMachSubject, createMachSubjectList },
      });
    }
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

const { TransferList } = require("../Models/Model_Transfer");

exports.remove = async (req, res) => {
  try {
    const _id = req.params._id;

    const machList = await MachSubjectList.findById(_id).exec();

    if (!machList) {
      return res.status(404).json({ message: "ไม่พบข้อมูลที่ต้องการลบ" });
    }

    const relatedTransferList = await TransferList.find({
      "success.machlist_id": machList._id,
    }).exec();

    if (relatedTransferList.length > 0) {
      return res.status(403).json({
        message: "ไม่สามารถลบข้อมูลที่มีความสัมพันธ์กับข้อมูลอื่นได้",
        relatedTransferList,
      });
    }
    const removedTransferList = await MachSubjectList.findOneAndDelete({
      _id: _id,
    }).exec();

    res.json({
      message: "ลบข้อมูลสำเร็จ!",
      removedTransferList,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};
