const express = require("express");
const {
	adminProtect,
	teacherProtect,
	multiProtect,
} = require("../middlewares/authProtect");
const router = express.Router();
const controller = require("../controllers/commentController");
router.post(
	"/create/:id",
	multiProtect(["admin", "department_head","teacher"]),
	controller.createComment
);
router.get(
	"/get-task-comment/:id",
	multiProtect(["admin", "department_head", "teacher"]),
	controller.getCommentsByTask
);

module.exports = router;
