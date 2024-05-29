const express = require("express");
const router = express.Router();

const {
  read,
  list,
  listYear,
  listCurriculumAndYear,
  create,
  update,
  updatedStudent,
  remove,
  downloadTemplate,
  uploadExcel,
  changePassword,
  dataDashboard,
} = require("../Controllers/Contr_Student");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//http://localhost:5000/api/student
router.post("/student", create);
router.get("/student", list);
router.get("/student/year", listYear);
router.get("/student/year", listYear);
router.get("/student/curriculum/:curriculum/year/:year", listCurriculumAndYear);
router.get("/student/:_id", read);
router.put("/student/:_id", update);
router.put("/student/", updatedStudent);
router.delete("/student/:_id", remove);
router.post("/student/template", downloadTemplate);
router.post("/student/upload", uploadExcel);
router.post("/student/:_id/changePassword", changePassword);
router.get("/student/data/dashboard/:_id", dataDashboard)
module.exports = router;
