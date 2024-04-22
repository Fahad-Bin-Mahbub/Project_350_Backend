const express = require("express");
const {
	adminProtect,
	teacherProtect,
	multiProtect,
} = require("../middlewares/authProtect");
const router = express.Router();
const controller = require("../controllers/taskController");

router.post("/create", multiProtect(["admin", "ci"]), controller.createTask);
router.put(
	"/update/:id",
	multiProtect(["admin", "ci", "teacher"]),
	controller.updateTask
);
router.get(
	"/get-all-tasks",
	multiProtect(["admin", "department_head"]),
	controller.getAllTasks
);
router.get(
	"/get-teacher-tasks",
	multiProtect(["admin", "department_head", "ci", "teacher"]),
	controller.getTasksByUser
);

router.get(
	"/get-creator-tasks",
	multiProtect(["admin", "ci"]),
	controller.getTasksByCreator
);

router.get(
	"/get-unique-task",
	multiProtect(["admin", "ci", "teacher"]),
	controller.getUniqueTask
);
module.exports = router;
