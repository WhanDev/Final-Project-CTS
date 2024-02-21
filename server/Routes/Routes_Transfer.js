const express = require("express");
const router = express.Router();

const {
  create,
  list,
  read,
  update,
  remove,
} = require("../Controllers/Contr_Transfer");

//http://localhost:5000/api/transfer
router.post("/transfer", create);
router.get("/transfer", list);
router.get("/transfer/:_id", read);
router.put("/transfer/:_id", update);
router.delete("/transfer/:_id", remove);

module.exports = router;
