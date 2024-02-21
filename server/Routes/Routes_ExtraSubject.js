const express = require("express");
const router = express.Router();

const {
  read,
  list,
  create,
  update,
  remove
} = require("../Controllers/Contr_ExtraSubject");

//http://localhost:5000/api/extrasubject
router.post("/extrasubject", create);
router.get("/extrasubject", list);
router.get("/extrasubject/:_id", read);
router.put("/extrasubject/:_id", update);
router.delete("/extrasubject/:_id", remove);

module.exports = router;