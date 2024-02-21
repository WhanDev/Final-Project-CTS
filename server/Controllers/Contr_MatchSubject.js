const MachSubject = require("../Models/Model_MatchSubject");

exports.create = async (req, res) => {
  try {
    const { curriculum, subject_id } = req.body;

    if (!curriculum || !subject_id) {
      return res.status(400).send("กรุณากรอกข้อมูลให้ครบ");
    }

    const existingSubjectId = await MachSubject.findOne({
      subject_id: subject_id,
    });

    if (existingSubjectId) {
      return res.status(409).send("รหัสรายวิชาซ้ำ");
    }

    const _id = "MS" + curriculum + "-" + subject_id;

    const createMachSubject = await MachSubject({
      _id,
      curriculum,
      subject_id,
    }).save();

    res
      .status(201)
      .json({ message: "เพิ่มข้อมูลสำเร็จ!", data: createMachSubject });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ!", error: err.message });
  }
};

exports.list = async (req, res) => {
  try {
    const listMachSubject = await MachSubject.find({})
      .sort({
        _id: 1,
      })
      .exec();
    res.json(listMachSubject);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

exports.listByCurriculum = async (req, res) => {
  try {
    const curriculum = req.params.curriculum;
    const listCurriculum = await MachSubject.find({
      curriculum: curriculum,
    })
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

exports.read = async (req, res) => {
  try {
    const _id = req.params._id;
    const readMachSubject = await MachSubject.findOne({ _id: _id }).exec();
    res.json(readMachSubject);
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

    const updatedSubject = await MachSubject.findOneAndUpdate(
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
    const removedMachSubject = await MachSubject.findOneAndDelete({
      _id: _id,
    }).exec();
    res.json({ message: "ลบข้อมูลสำเร็จ!", data: removedMachSubject });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};
