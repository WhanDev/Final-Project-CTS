const Model_Admin = require("../Models/Model_Admin");
const Model_Student = require("../Models/Model_Student");
const jwt = require("jsonwebtoken");

//ตรวจสอบ token
exports.auth = async (req, res, next) => {
  try {
    const token = req.headers["authtoken"];

    if (!token) {
      return res.status(401).send("No token");
    }

    const secret = "jwtsecret";
    const decoded = jwt.verify(token, secret);

    req.user = decoded.user;

    next();
  } catch (err) {
    console.error("Token verification error:", err.message);
    res.status(401).send("Token Invalid");
  }
};

//ตรวจสอบแอดมิน
exports.adminCheck = async (req, res, next) => {
  try {
    console.log(req.user);
    const user = await Model_Admin.findOne({ _id: req.user._id })
      .select("-password")
      .exec();
    console.log("adminCheck: " + user.role);

    if ((user.role = "แอดมิน")) {
      next();
    } else {
      res.status(403).send("คุณไม่มีสิทธิเข้าถึง!");
    }
  } catch (err) {
    console.log(err);
    res.status(403).send("คุณไม่มีสิทธิเข้าถึง!");
  }
};

//ตรวจสอบเจ้าหน้าที่
exports.officerCheck = async (req, res, next) => {
  try {
    console.log(req.user);
    const user = await Model_Admin.findOne({ _id: req.user._id })
      .select("-password")
      .exec();
    console.log("officerCheck: " + user.role);

    if ((user.role = "เจ้าหน้าที่")) {
      next();
    } else {
      res.status(403).send("คุณไม่มีสิทธิเข้าถึง!");
    }
  } catch (err) {
    console.log(err);
    res.status(403).send("คุณไม่มีสิทธิเข้าถึง!");
  }
};

//ตรวจสอบอาจารย์
exports.lecturerCheck = async (req, res, next) => {
  try {
    console.log(req.user);
    const user = await Model_Admin.findOne({ _id: req.user._id })
      .select("-password")
      .exec();
    console.log("lecturerCheck: " + user.role);

    if ((user.role = "อาจารย์")) {
      next();
    } else {
      res.status(403).send("คุณไม่มีสิทธิเข้าถึง!");
    }
  } catch (err) {
    console.log(err);
    res.status(403).send("คุณไม่มีสิทธิเข้าถึง!");
  }
};

//ตรวจสอบนักศึกษา
exports.StudentCheck = async (req, res, next) => {
  try {
    console.log(req.user);
    const user = await Model_Student.findOne({ _id: req.user._id })
      .select("-password")
      .exec();
    console.log("StudentCheck: " + user.role);

    if ((user.role = "นักศึกษา")) {
      next();
    } else {
      res.status(403).send("คุณไม่มีสิทธิเข้าถึง!");
    }
  } catch (err) {
    console.log(err);
    res.status(403).send("คุณไม่มีสิทธิเข้าถึง!");
  }
};
