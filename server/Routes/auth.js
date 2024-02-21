const express = require("express");
const router = express.Router();

const {
  loginStudent,
  loginAdmin,
  currentUser,
} = require("../Controllers/auth");
const {
  auth,
  adminCheck,
  officerCheck,
  lecturerCheck,
  StudentCheck
} = require("../Middleware/auth");

// http://localhost:5000/api/
router.post("/student/login", loginStudent);
router.post("/admin/login", loginAdmin);

router.post("/current-user", auth, currentUser);

router.post("/current-admin", auth, adminCheck, currentUser);
router.post("/current-officer", auth, officerCheck, currentUser);
router.post("/current-lecturer", auth, lecturerCheck, currentUser);
router.post("/current-student", auth, StudentCheck, currentUser);

module.exports = router;
