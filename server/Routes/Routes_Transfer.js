const express = require("express");
const router = express.Router();
const {
  TestTransfer,
  Transfer,
  TransferUpload,
  TransferListAdmin,
  TransferRead,
  TransferUpdate,
  TransferListEdit,
  TransferConfirmPath1,
  TransferConfirmPath2,
  TransferDelete,
} = require("../Controllers/Contr_Transfer");
const { upload } = require("../Middleware/upload");

//http://localhost:5000/api/transfer
router.post("/transfer/test", TestTransfer);
router.post("/transfer", Transfer);
router.post("/transfer/upload", upload, TransferUpload);
router.get("/transfer", TransferListAdmin);
router.get("/transfer/:_id", TransferRead);
router.put("/transfer/:_id", TransferUpdate);
router.get("/transfer/edit/:_id", TransferListEdit);
router.post("/transfer/stutusPath1/:_id", TransferConfirmPath1);
router.post("/transfer/stutusPath2/:_id", TransferConfirmPath2);
router.delete("/transfer/:_id", TransferDelete);

module.exports = router;
