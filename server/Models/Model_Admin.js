const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
  _id: {
    type: String,
    minlength: 13,
    maxlength: 13,
  },
  fullname: String,
  password: String,
  curriculum: { type: String, ref: "Curriculum" },
  role: {
    type: String,
    enum: ["แอดมิน", "เจ้าหน้าที่", "อาจารย์"],
  },
});

module.exports = mongoose.model("Admin", AdminSchema);