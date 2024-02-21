const mongoose = require("mongoose");

const ExtraSubjectSchema = mongoose.Schema({
  extraSubject_id: String,
  extraSubject_nameTh: String,
  extraSubject_nameEn: String,
  description: String,
  theory_credits: Number,
  practical_credits: Number,
  total_credits: Number,
});

module.exports = mongoose.model("ExtraSubject", ExtraSubjectSchema);
