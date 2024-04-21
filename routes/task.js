const express = require("express");
const { adminProtect, teacherProtect, multiProtect } = require("../middlewares/authProtect");
const router = express.Router();
const controller = require("../controllers/taskController");

router.post(
	"/create",
	multiProtect(["admin", "department_head"]),
	controller.createTask
);
router.put(
	"/update/:id",
	multiProtect(["admin", "department_head"]),
	controller.updateTask
);
router.get(
	"/get-all-tasks",
	multiProtect(["admin", "department_head"]),
	controller.getAllTasks
);
router.get(
	"/get-teacher-tasks",
	multiProtect(["admin", "department_head", "teacher"]),
	controller.getTasksByUser
);

router.get(
	"/get-creator-tasks/",
	multiProtect(["admin","department_head"]),
	controller.getTasksByCreator
); 
module.exports = router;
 