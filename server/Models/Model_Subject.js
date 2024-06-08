const mongoose = require("mongoose");

const SubjectSchema = mongoose.Schema({
  subject_id: String,
  subject_nameTh: String,
  subject_nameEn: String,
  description: String,
  theory_credits: Number,
  practical_credits: Number,
  total_credits: Number,
  structure_id: { type: String, ref: "Structure" },
  group_id: { type: String, ref: "Structure" },
});

module.exports = mongoose.model("Subject", SubjectSchema);
