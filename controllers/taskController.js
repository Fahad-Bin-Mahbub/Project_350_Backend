const asyncHandler = require("../middlewares/asyncHandler");
const Task = require("../models/task");
const Exam = require("../models/exam");
const ErrorResponse = require("../utils/errorResponse");

exports.createTask = asyncHandler(async (req, res, next) => {
    let task;
    try{
        const userId = req.user.id;
        const taskData = {...req.body, createdBy: userId};
        task = await Task.create(taskData);
        console.log("Task created now assigning to exam");
        const examId = req.body.examId;
        console.log(examId)
        if(examId){
            console.log("Assigning to exam")
            const exam =await Exam.findById(examId);
            console.log(exam);
            if(!exam) return next(new ErrorResponse("Exam not found", 404));
            exam.tasks.push(task.id);
            await exam.save();
        }
        return res.status(201).json({
            success: true,
            message: "Task created successfully",
        });
    } catch (error) {
        await Task.findByIdAndDelete(task.id);
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
		const tasks = await Task.find();

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
		const tasks = await Task.find({ teacher: teacherId });

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
		const Id = req.user.id;
		const tasks = await Task.find({ createdBy: Id });

		return res.status(200).json({
			success: true,
			message: "Tasks found",
			data: tasks,
		});
	} catch (error) {
		return next(new ErrorResponse("Tasks not found", 500));
	}
});



