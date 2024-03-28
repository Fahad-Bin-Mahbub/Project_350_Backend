const asyncHandler = require("../middlewares/asyncHandler");

const Exam = require("../models/exam"); 
const ErrorResponse = require("../utils/errorResponse");

exports.createExam = asyncHandler(async (req, res, next) => {
    try {
        const userId = req.user.id;
        const examData = { ...req.body, createdBy: userId };
        const exam = await Exam.create(examData);
        return res.status(201).json({
            success: true,
            message: "Exam created successfully",
			data: exam
        });
    } catch (error) {
        return next(new ErrorResponse("Exam not created", 500));
    }
});

exports.updateExam = asyncHandler(async (req, res, next) => {
	try {
		const { id } = req.params;
		const exam = await Exam.findByIdAndUpdate(id, req.body, { new: true });

		if (!exam) {
			return next(new ErrorResponse(`Exam not found with id ${id}`, 404));
		}

		return res.status(200).json({
			success: true,
			message: "Exam updated successfully",
			data: exam,
		});
	} catch (error) {
		return next(new ErrorResponse("Exam not updated", 500));
	}
});

exports.getAllExams = asyncHandler(async (req, res, next) => {
	const exams = await Exam.find();

	res.status(200).json({
		success: true,
		data: exams,
	});
});

exports.findExamsByCreator = asyncHandler(async (req, res, next) => {
	try {
		const Id = req.user.id;
		const exams = await Exam.find({ createdBy: Id });

		return res.status(200).json({
			success: true,
			message: "Exams found",
			data: exams,
		});
	} catch (error) {
		return next(new ErrorResponse("Exams not found", 500));
	}
});

exports.findExamsByHead = asyncHandler(async (req, res, next) => {
	try {
		const { headId } = req.params;
		const exams = await Exam.find({ createdBy: headId });

		return res.status(200).json({
			success: true,
			message: "Exams found",
			data: exams,
		});
	} catch (error) {
		return next(new ErrorResponse("Exams not found", 500));
	}
});
