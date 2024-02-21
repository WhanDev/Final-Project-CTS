const mongoose = require("mongoose");

const StructureSchema = mongoose.Schema(
  {
    structure_id: String,
    sort: {
      type: String,
      enum: [
        "1. หมวดวิชาศึกษาทั่วไป",
        "2. หมวดวิชาเฉพาะ",
        "3. หมวดวิชาเลือกเสรี",
      ],
    },
    group_id: String,
    group_name: String,
    credit: Number,
    curriculum: { type: String, ref: "Curriculum" },
  }
);

StructureSchema.index({ structure_id: 1, sort: 1, group_id: 1 }, { unique: true });

module.exports = mongoose.model("Structure", StructureSchema);
