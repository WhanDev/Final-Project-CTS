require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoURL = process.env.MONGO_URL;

  if (!mongoURL) {
    console.error("MongoDB connection URL is not defined.");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const chalk = await import("chalk");
    console.log(chalk.default.bgGreen("DB Connected"));
  } catch (err) {
    const chalk = await import("chalk");
    console.error(chalk.default.bgRed(`DB Connection Error: ${err.message}`));
  }
};

module.exports = connectDB;
