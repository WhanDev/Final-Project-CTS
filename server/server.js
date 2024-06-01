const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParse = require("body-parser");
const connectDB = require("./Config/db");
const { readdirSync } = require("fs");
const app = express();
const path = require("path");
const { createAdmin } = require("./Controllers/Contr_Admin");

connectDB();
createAdmin();

app.get("/api/pdf/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../server/uploads", filename);

  res.sendFile(filePath);
});

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParse.json({ limit: "10mb" }));

readdirSync("./Routes").map((r) => app.use("/api", require("./Routes/" + r)));

app.listen(5000, () => console.log("Server is Running 5000"));
