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

SubjectSchema.index(
  { structure_id: 1, group_id: 1, subject_id: 1 },
  { unique: true }
);

module.exports = mongoose.model("Subject", SubjectSchema);
