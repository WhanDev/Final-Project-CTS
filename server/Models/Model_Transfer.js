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
  file: {
    type: String,
  },
});

const TransferListSchema = mongoose.Schema({
  transferOrder_id: { type: String, ref: "TransferOrder" },
  success: [
    {
      mach_id: { type: String, ref: "MachSubject" },
      subject_id: { type: String, ref: "Subject" },
      machlist_id: { type: String, ref: "MachSubjectList" },
      extraSubject: [
        {
          id: String,
          grade: String,
        },
      ],
    },
  ],
  unsuccess: [
    {
      extraSubject: { type: String },
      grade: { type: String },
      note: { type: String },
    },
  ],
});

module.exports = {
  Transfer: mongoose.model("Transfer", TransferSchema),
  TransferOrder: mongoose.model("TransferOrder", TransferOrderSchema),
  TransferList: mongoose.model("TransferList", TransferListSchema),
};
