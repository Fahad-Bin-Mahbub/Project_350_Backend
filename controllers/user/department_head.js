const asyncHandler = require("../../middlewares/asyncHandler");
const ErrorResponse = require("../../utils/errorResponse");
const User = require("../../models/user");
const Ci = require("../../models/user/ci");
const Department = require("../../models/department");

exports.createCi = asyncHandler(async (req, res, next) => {
	const { session, id } = req.body;
	try {
		console.log(id);
		let user = await User.findById(id);
		if (!user) {
			return next(new ErrorResponse("No user with this email", 500));
		}
		if (!user.roles.includes("ci")) {
			user.roles.push("ci");
			await user.save();
		}
		await Ci.create({
			_id: user.id,
			user: user.id,
			session: session,
		});
		return res.status(200).json({
			success: true,
			message: "Ci added",
		});
	} catch (error) {
		console.log(error);
		return next(new ErrorResponse("Ci not added", 500));
	}
});

exports.updateCi = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	try {
		const ci = await Ci.findByIdAndUpdate(id, req.body);
		if (!ci) {
			return next(new ErrorResponse("Ci not found", 404));
		}
		return res.status(200).json({
			success: true,
			message: "Ci updated",
			data: ci,
		});
	} catch (error) {
		console.log(error);
		return next(new ErrorResponse("Ci not updated", 500));
	}
});

exports.getAllCi = asyncHandler(async (req, res, next) => {
	try {
		const cis = await Ci.find();
		return res.status(200).json({
			success: true,
			data: cis,
		});
	} catch (error) {
		console.log(error);
		return next(new ErrorResponse("Could not fetch Ci", 500));
	}
});

exports.getDept = asyncHandler(async (req, res, next) => {
	try {
		const { id } = req.params;
		const dept = await Department.findById(id);
		return res.status(200).json({
			success: true,
			data: dept,
		});
	} catch (error) {
		console.log(error);
		return next(new ErrorResponse("Could not fetch dept", 500));
	}
});
