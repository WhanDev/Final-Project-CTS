const mongoose = require("mongoose");

const CurriculumSchema = mongoose.Schema({
  _id: {
    type: String,
    minlength: 7,
    maxlength: 7,
  },
  name: String,
  level: String,
  year: String,
  time: String,
  // credit: Number,
});

module.exports = mongoose.model("Curriculum", CurriculumSchema);
