const mongoose = require("mongoose");

const MachSubjectSchema = mongoose.Schema({
  _id: { type: String },
  curriculum: { type: String, ref: "Curriculum" },
  subject_id: { type: String, ref: "Subject" },
});

module.exports = mongoose.model("MachSubject", MachSubjectSchema);
