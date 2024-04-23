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
	multiProtect(["admin", "department_head", "teacher", "ci"]),
	controller.createComment
);
router.get(
	"/get-task-comment/:id",
	multiProtect(["admin", "department_head", "teacher", "ci"]),
	controller.getCommentsByTask
);

module.exports = router;
