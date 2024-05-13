const express = require("express");
const router = express.Router();
const {
  TestTransfer,
  Transfer,
  TransferUpload,
  TransferListAdmin,
  TransferRead,
} = require("../Controllers/Contr_Transfer");
const { upload } = require("../Middleware/upload");

//http://localhost:5000/api/transfer
router.post("/transfer/test", TestTransfer);
router.post("/transfer", Transfer);
router.post("/transfer/upload", upload, TransferUpload);
router.get("/transfer", TransferListAdmin);
router.get("/transfer/:_id", TransferRead);

module.exports = router;