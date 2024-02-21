const mongoose = require("mongoose");

const TransferSchema = mongoose.Schema({
  _id: {
    type: String,
    ref: "Student",
  },
  transfer_date: Date,
  transfer_results: {
    type: String,
    default: "ยังไม่เทียบโอน",
  },
  admin_id: {
    type: String,
    ref: "Admin",
  },
});

module.exports = mongoose.model("Transfer", TransferSchema);
