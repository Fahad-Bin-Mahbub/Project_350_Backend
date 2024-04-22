const asyncHandler = require("../middlewares/asyncHandler");
const Task = require("../models/task");
const Exam = require("../models/exam");
const ErrorResponse = require("../utils/errorResponse");

exports.createTask = asyncHandler(async (req, res, next) => {
	let task = null; // Initialize task to null

	try {
		const userId = req.user.id;
		const taskData = { ...req.body, createdBy: userId};
		task = await Task.create(taskData);

		return res.status(201).json({
			success: true,
			message: "Task created successfully",
			data: task
		});
	} catch (error) {
		// Check if task is defined before attempting to delete
		if (task) {
			await Task.findByIdAndDelete(task._id);
		}
		console.log(error);
		return next(new ErrorResponse("Task not created", 500));
	}
});


exports.updateTask = asyncHandler(async (req, res, next) => {
	try {
		const { id } = req.params;
		const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
			new: true,
		});

		if (!updatedTask) {
			return next(new ErrorResponse(`Task not found with id ${id}`, 404));
		}

		return res.status(200).json({
			success: true,
			message: "Task updated successfully",
			data: updatedTask,
		});
	} catch (error) {
		return next(new ErrorResponse("Task not updated", 500));
	}
});

exports.getAllTasks = asyncHandler(async (req, res, next) => {
	try {
		const tasks = await Task.find()
			.populate("comments")
			.populate("teacher")
			.populate("createdBy");

		return res.status(200).json({
			success: true,
			message: "All tasks retrieved",
			data: tasks,
		});
	} catch (error) {
		return next(new ErrorResponse("Tasks not found", 500));
	}
});

exports.getTasksByUser = asyncHandler(async (req, res, next) => {
	try {
		const teacherId = req.user.id;
		const tasks = await Task.find({ teacher: teacherId }).populate("comments").populate("teacher").populate("createdBy");

		return res.status(200).json({
			success: true,
			message: "Tasks found",
			data: tasks,
		});
	} catch (error) {
		return next(new ErrorResponse("Tasks not found", 500));
	}
});

exports.getTasksByCreator = asyncHandler(async (req, res, next) => {
	try {
		const creatorId  = req.user.id;

		const tasks = await Task.find({ createdBy: creatorId }).populate("teacher").populate("comments").populate("createdBy")	;


		return res.status(200).json({
			success: true,
			message: "Tasks found",
			data: tasks,
		});
	} catch (error) {
		return next(new ErrorResponse("Tasks not found", 500));
	}
});

exports.getUniqueTask = asyncHandler(async (req, res, next) => {
	try {
		const { courseCode,part,session }  = req.query;
		console.log(courseCode,part,session);
		const task = await Task.find({ courseCode:courseCode,part:part,session:session });

		if(task.length > 0){
			return res.status(200).json({
				success: true,
				message: "Task found",
				data: task[0],
			});
		}
		else{
			return res.status(204).json({
				success: true,
			});
		}
	} catch (error) {
		return next(new ErrorResponse("Tasks not found", 500));
	}
});
