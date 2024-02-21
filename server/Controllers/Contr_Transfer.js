const Transfer = require("../Models/Model_Transfer");

exports.create = async (req, res) => {
  try {
    const { _id, admin_id } = req.body;

    if (!_id || !admin_id) {
      return res.status(400).send("กรุณากรอกข้อมูลให้ครบ");
    }

    // Check if Transfer_id is duplicated
    const existingTransferId = await Transfer.findOne({ _id: _id });

    if (existingTransferId) {
      return res.status(409).send("รหัสการเทียบโอนซ้ำ");
    }

    const transfer_date = new Date();

    const createTransfer = await Transfer({
      _id,
      transfer_date,
      admin_id,
    }).save();

    res
      .status(201)
      .json({ message: "เพิ่มข้อมูลสำเร็จ!", data: createTransfer });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ!", error: err.message });
  }
};

exports.list = async (req, res) => {
  try {
    const listTransfer = await Transfer.find({}).exec();
    res.json(listTransfer);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

exports.read = async (req, res) => {
  try {
    const id = req.params._id;
    const readTransfer = await Transfer.findOne({ _id: id }).exec();
    res.json(readTransfer);
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

    const updatedTransfer = await Transfer.findOneAndUpdate(
      { _id: _id },
      newData,
      {
        new: true,
      }
    ).exec();
    res.json({ message: "แก้ไขข้อมูลสำเร็จ!", data: updatedTransfer });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    // code
    const id = req.params._id;
    const removedTransfer = await Transfer.findOneAndDelete({
      _id: id,
    }).exec();
    res.json({ message: "ลบผู้ใช้งานระบบสำร็จ!", data: removedTransfer });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};
