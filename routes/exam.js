const express = require("express");
const { adminProtect } = require("../middlewares/authProtect");
const router = express.Router();
const controller = require("../controllers/examController");
router.post("/create", adminProtect,controller.createExam);
router.put("/update/:id", adminProtect,controller.updateExam);
router.get("/get-all-exams", adminProtect,controller.getAllExams);
router.get("/get-head-exams", adminProtect,controller.findExamsByCreator);
module.exports = router;
