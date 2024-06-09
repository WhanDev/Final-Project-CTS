const Admin = require("../Models/Model_Admin");
const Student = require("../Models/Model_Student");
const bcrypt = require("bcryptjs");

exports.createAdmin = async (req, res) => {
  const adminCount = await Admin.countDocuments({ role: "แอดมิน" });

  if (adminCount > 0) {
    await Admin.findOneAndDelete({ _id: "0000000000000" });
    return null;
  } else {
    const fullname = "ผู้ดูแลระบบ";
    const password = "admin123456";
    const curriculum = "0000000";
    const role = "แอดมิน";

    const createAdmin = await Admin.findOne({ _id: "0000000000000" });
    if (createAdmin) {
      return null;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      _id: "0000000000000",
      fullname,
      password: hashedPassword,
      curriculum,
      role,
    });
    await newAdmin.save();

    try {
      return null;
    } catch (error) {
      return null;
    }
  }
};

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

exports.updatedById = async (req, res) => {
  try {
    const { _id, fullname } = req.body;

    const updatedAdmin = await Admin.findOneAndUpdate(
      { _id: _id },
      { fullname: fullname },
      { new: true }
    ).exec();

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({ message: "แก้ไขข้อมูลสำเร็จ!", data: updatedAdmin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};


exports.changePassword = async (req, res) => {
  try {
    const id = req.params._id;
    const { oldPassword, newPassword, confirmPassword } = req.body;
    var AdminUser = await Admin.findOne({ _id: id });
    if (AdminUser) {
      const isMatch = await bcrypt.compare(oldPassword, AdminUser.password);
      if (isMatch) {
        if (newPassword === confirmPassword) {
          const hashNewPass = await bcrypt.hash(newPassword, 10);
          const updatedAdmin = await Admin.findOneAndUpdate(
            { _id: id },
            { password: hashNewPass },
            { new: true }
          ).exec();
          return res
            .status(200)
            .json({ message: "เปลี่ยนรหัสผ่านสำเร็จ", data: hashNewPass });
        } else {
          return res
            .status(400)
            .json({ message: "รหัสผ่านใหม่ไม่ตรงกัน โปรดตรวจสอบ" });
        }
      } else {
        return res.status(400).json({ message: "รหัสผ่านเดิมไม่ถูกต้อง" });
      }
    } else {
      return res.status(400).json({ message: "ไม่พบข้อมูลนักศึกษา" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

const { Transfer } = require("../Models/Model_Transfer");

exports.remove = async (req, res) => {
  try {
    // code
    const id = req.params._id;

    const relatedCheckBy = await Transfer.find({ checkBy: id }).exec();
    const relatedApproveBy = await Transfer.find({ approveBy: id }).exec();

    if (relatedCheckBy.length > 0 || relatedApproveBy.length > 0) {
      return res.status(403).json({
        message:
          "ไม่สามารถลบผู้ใช้งานนี้ได้ เนื่องจากมีข้อมูลอยู่ในการตรวจสอบเทียบโอนแล้ว",
      });
    }
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
          $match: { status: status },
        },
        {
          $count: "count",
        },
      ]).exec();

      const count = Counts.length > 0 ? Counts[0].count : 0;

      statusCounts.push({
        status: status,
        count: count,
      });
    }

    res.json({ message: "พบข้อมูล", data: statusCounts });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};
