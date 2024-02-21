const express = require("express");
const router = express.Router();

const {
  create,
  list,
  listByCurriculum,
  read,
  update,
  remove,
} = require("../Controllers/Contr_MatchSubject");

//http://localhost:5000/api/machsubject
router.post("/machsubject", create);
router.get("/machsubject", list);
router.get("/curriculum/machsubject/:curriculum", listByCurriculum);
router.get("/machsubject/:_id", read);
router.put("/machsubject/:_id", update);
router.delete("/machsubject/:_id", remove);

module.exports = router;
