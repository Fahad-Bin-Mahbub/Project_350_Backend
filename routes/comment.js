const express = require("express");
const {
	adminProtect,
	teacherProtect,
	multiProtect,
} = require("../middlewares/authProtect");
const router = express.Router();
const controller = require("../controllers/examController");
router.post(
	"/create",
	multiProtect(["admin", "department_head"]),
	controller.createExam
);
router.put(
	"/update/:id",
	multiProtect(["admin", "department_head"]),
	controller.updateExam
);
router.get(
	"/get-all-exams",
	multiProtect(["admin", "department_head"]),
	controller.getAllExams
);
router.get(
	"/get-head-exams",
	multiProtect(["admin", "department_head"]),
	controller.findExamsByCreator
);
module.exports = router;
