const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, "TransferOrder-" + req.body.student_id + ext);
  },
});

exports.upload = multer({ storage: storage }).single("file");
