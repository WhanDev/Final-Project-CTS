const mongoose = require("mongoose");

const MachSubjectListSchema = mongoose.Schema({
  machSubject_id: { type: String, ref: "MachSubject" },
  extraSubject_id: { type: [String], ref: "ExtraSubject" },
});

module.exports = mongoose.model("MachSubjectList", MachSubjectListSchema);
