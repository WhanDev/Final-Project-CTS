const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Whanjaii:Miss0967454821@fianl-cit-bis.uiuctsl.mongodb.net/db_ctb"
    );
    console.log("DB Connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
