const express = require("express");
const { adminProtect } = require("../middlewares/authProtect");
const router = express.Router();
const controller = require("../controllers/taskController");

router.post("/create",adminProtect,controller.createTask);
router.put("/update/:id",adminProtect,controller.updateTask);
router.get("/get-all-tasks",adminProtect,controller.getAllTasks);
router.get("/get-teacher-tasks",adminProtect,controller.getTasksByUser);
module.exports = router;
