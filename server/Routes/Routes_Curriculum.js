const express = require("express");
const router = express.Router();

const {
  read,
  list,
  create,
  update,
  remove,
} = require("../Controllers/Contr_Curriculum");
// middleware

//http://localhost:5000/api/curriculum
router.post("/curriculum", create);
router.get("/curriculum", list);
router.get("/curriculum/:_id", read);
router.put("/curriculum/:_id", update);
router.delete("/curriculum/:_id", remove);

module.exports = router;
