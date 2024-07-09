const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Whanjaii:Miss0967454821@fianl-cit-bis.uiuctsl.mongodb.net/db_ctb",
      { useNewUrlParser: true, useUnifiedTopology: true } // These options are often necessary
    );
    // Dynamically import chalk
    const chalk = await import('chalk');
    console.log(chalk.default.bgGreen("DB Connected"));
  } catch (err) {
    // Dynamically import chalk in case of an error
    const chalk = await import('chalk');
    console.log(chalk.default.bgRed(err.message));
  }
};

module.exports = connectDB;
