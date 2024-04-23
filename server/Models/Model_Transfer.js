const mongoose = require("mongoose");

const TransferSchema = mongoose.Schema({
  _id: { type: String, ref: "Student" },
  lecturer_id: { type: String, ref: "Admin" },
  result: String,
  date: String,
});

const TransferOrderSchema = mongoose.Schema({
  _id: String,
  student_id: { type: String, ref: "Student" },
});

const TransferListSchema = mongoose.Schema({
  transferOrder_id: { type: String, ref: "TransferOrder" },
  mach_id: { type: String, ref: "MachSubject" },
  subject_id: { type: String, ref: "Subject" },
  machlist_id: { type: String, ref: "MachSubjectList" },
  extraSubject_id: { type: [String], ref: "ExtraSubject" },
  grade: Number,
});

module.exports = {
  Transfer: mongoose.model("Transfer", TransferSchema),
  TransferOrder: mongoose.model("TransferOrder", TransferOrderSchema),
  TransferList: mongoose.model("TransferList", TransferListSchema),
};
