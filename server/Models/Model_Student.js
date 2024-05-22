const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
  _id: {
    type: String,
    minlength: 13,
    maxlength: 13,
  },
  fullname: String,
  password: String,
  curriculum: { type: String, ref: "Curriculum" },
  year: String,
  institution: String,
  branch: String,
  status: {
    type: String,
    default: "ยังไม่ดำเนินการเทียบโอนเบื้องต้น",
  },
  role: {
    type: String,
    default: "นักศึกษา",
  },
});

module.exports = mongoose.model("Student", StudentSchema);
