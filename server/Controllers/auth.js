const Student = require("../Models/Model_Student");
const Admin = require("../Models/Model_Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

//กลุ่มนักศึกษาเข้าสู่ระบบ
exports.loginStudent = async (req, res) => {
  try {
    const { _id, password } = req.body;
    var user = await Student.findOneAndUpdate({ _id }, { new: true });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).send("รหัสนักศึกษาหรือรหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง!");
      }

      var payload = {
        user: {
          _id: user._id,
          fullname: user.fullname,
          role: user.role,
        },
      };

      jwt.sign(payload, "jwtsecret", { expiresIn: "1d" }, (err, token) => {
        if (err) throw err;
        res.json({ token, payload });
      });
    } else {
      return res.status(400).send("ไม่มีนักศึกษานี้อยู่ในระบบ!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

//กลุ่มผู้ดูแลเข้าสู่ระบบ
exports.loginAdmin = async (req, res) => {
  try {
    const { _id, password } = req.body;
    var user = await Admin.findOneAndUpdate({ _id }, { new: true });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send("รหัสประจำตัวหรือรหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง!");
      }
      var payload = {
        user: {
          _id: user._id,
          fullname: user.fullname,
          role: user.role,
        },
      };
      jwt.sign(payload, "jwtsecret", { expiresIn: "1d" }, (err, token) => {
        if (err) throw err;
        res.json({ token, payload });
      });
    } else {
      return res.status(400).send("ไม่มีผู้ใช้งานนี้อยู่ในระบบ!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

//ตรวจสอบ role ผู้ใช้ทั้งหมด
exports.currentUser = async (req, res) => {
  try {
    if (req.user.role === "นักศึกษา") {
      const user = await Student.findOne({ _id: req.user._id })
        .select("-password")
        .exec();
      res.send(user);
    } else {
      const user = await Admin.findOne({ _id: req.user._id })
        .select("-password")
        .exec();
      res.send(user);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

//ตรวจสอบ role เฉพาะของผู้ดูแล
exports.currentAdmin = async (req, res) => {
  try {
    const user = await Admin.findOne({ _id: req.user._id })
      .select("-password")
      .exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};
