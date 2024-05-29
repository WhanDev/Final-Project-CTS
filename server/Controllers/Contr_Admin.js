const Admin = require("../Models/Model_Admin");
const Student = require("../Models/Model_Student");
const bcrypt = require("bcryptjs");

//เพิ่มข้อมูลผู้ดูแล
exports.create = async (req, res) => {
  try {
    const { _id, fullname, password, curriculum, role } = req.body;

    if (!_id || !fullname || !password || !curriculum || !role) {
      return res.status(400).send("กรุณากรอกข้อมูลให้ครบ!");
    }

    const createAdmin = await Admin.findOne({ _id });
    if (createAdmin) {
      return res.status(400).send("รหัสประจำตัวซ้ำ!");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      _id,
      fullname,
      password: hashedPassword,
      curriculum,
      role,
    });
    await newAdmin.save();

    res
      .status(201)
      .json({ message: "เพิ่มข้อมูลผู้ดูแลระบบสำเร็จ!", data: newAdmin });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ!", error: err.message });
  }
};

//ดูข้อมูลผู้ดูแลทั้งหมด
exports.list = async (req, res) => {
  try {
    const listAdmin = await Admin.find({}).select("-password").exec();
    res.json(listAdmin);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

//ดูข้อมูลผู้ดูแลตาม _id
exports.read = async (req, res) => {
  try {
    const id = req.params._id;
    const readAdmin = await Admin.findOne({ _id: id }).exec();
    res.json(readAdmin);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

//แก้ไขข้อมูลผู้ดูแล
exports.update = async (req, res) => {
  try {
    const _id = req.params._id;
    var newData = req.body;

    const hash = await bcrypt.hash(newData.password, 10);
    newData.password = hash;

    const updatedAdmin = await Admin.findOneAndUpdate({ _id: _id }, newData, {
      new: true,
    }).exec();
    res.json({ message: "แก้ไขข้อมูลสำเร็จ!", data: updatedAdmin });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

//ลบข้อมูลผู้ดูแล
exports.remove = async (req, res) => {
  try {
    // code
    const id = req.params._id;
    const removedAdmin = await Admin.findOneAndDelete({
      _id: id,
    }).exec();
    res.json({ message: "ลบผู้ใช้งานระบบสำร็จ!", data: removedAdmin });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

exports.dataDashboard = async (req, res) => {
  try {
    const statusTransfer = [
      "ยังไม่ดำเนินการเทียบโอนเบื้องต้น",
      "รอการยืนยันการเทียบโอนเบื้องต้น",
      "รอการยืนยันการเทียบโอน โดยอาจารย์ประจำหลักสูตร",
      "ยืนยันการเทียบโอนถูกต้อง",
    ];

    let statusCounts = [];

    for (const status of statusTransfer) {
      const Counts = await Student.aggregate([
        {
          $match: { status: status }
        },
        {
          $count: "count"
        }
      ]).exec();

      const count = (Counts.length > 0) ? Counts[0].count : 0;

      statusCounts.push({
        status: status,
        count: count
      });
    }

    res.json({ message: "กูเจอละไอ้ควาย", data: statusCounts });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};
