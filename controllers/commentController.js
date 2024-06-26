const asyncHandler = require("../middlewares/asyncHandler");
const Comment = require("../models/comments");
const Task = require("../models/task");
const ErrorResponse = require("../utils/errorResponse");

exports.createComment = asyncHandler(async (req, res, next) => {
	try {
		const task_id = req.params.id;
		console.log(task_id);
		const data = {
			task: task_id,
			author: req.user.id,
			...req.body,
		};
		const comment = await Comment.create(data);
		console.log("the comment is", comment);
		await Task.findByIdAndUpdate(task_id, { $push: { comments: comment.id } });
		return res.status(201).json({
			success: true,
			message: "Comment created successfully",
			data: comment,
		});
	} catch (error) {
		return next(new ErrorResponse("Comment not created", 500));
	}
});

exports.getCommentsByTask = asyncHandler(async (req, res, next) => {
	const task_id = req.params.id;
	const comments = await Comment.find({ task: task_id });
	console.log("onek gula comments holo ", comments);
	return res.status(200).json({
		success: true,
		message: "Comments found",
		data: comments,
	});
});
