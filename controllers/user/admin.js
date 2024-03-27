const asyncHandler = require("../../middlewares/asyncHandler");
const Admin = require("../../models/user/admin");
const User = require("../../models/user");
const ErrorResponse = require("../../utils/errorResponse");
const sendTokenResponse = require("../../utils/tokenResponse");
const Department = require("../../models/department");

exports.createAdmin = asyncHandler(async (req, res, next) => {
	const { email } = req.body;
	console.log(req.body);
	let user = await User.findOne({ email });
	console.log(user);
	if (user) {
		if (user.roles.includes("admin")) {
			return next(new ErrorResponse("User is already an admin", 400));
		}
		user.roles.push("admin");
		await user.save();
	} else {
		user = await User.create({ ...req.body, roles: ["admin"] });
	}
	await Admin.create({
		_id: user.id,
		user: user.id,
		password: req.body.password,
	});
	sendTokenResponse(user, res);
});

exports.adminLogin = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email) return next(new ErrorResponse("Please input Email!", 500));

	if (!password) return next(new ErrorResponse("Please input Password!", 500));
	let user = await User.findOne({ email });
	console.log(user);
	let admin = await Admin.findOne({ _id: user._id }).select("+password");

	if (!admin)
		return next(new ErrorResponse("No Admin found with this email", 404));

	const isMatch = await admin.matchPassword(password);

	if (!isMatch) return next(new ErrorResponse("Invalid Password", 400));

	sendTokenResponse(user, res);
});

exports.getAll = asyncHandler(async (req, res, next) => {
	try {
		const teachers = await Teacher.find().populate;

		return res.status(200).json({
			success: true,
			message: "All teacher retrieved",
			data: tasks,
		});
	} catch (error) {
		return next(new ErrorResponse("Tasks not found", 500));
	}
});

exports.createDepartment = asyncHandler(async (req, res, next) => {
	try {
		const { name } = req.body;
		console.log("name is "+name)
		let department =await Department.findOne({ name });
		console.log("Deptt is " + department)
		if (department)
			return next(new ErrorResponse("Department already existst", 500));
		await Department.create({
			name: req.body.name,
		});

		return res.statis(200).json({
			success: true,
			message: "Department created successfully",
		});
	} catch (error) {
		return next(new ErrorResponse("Department not created", 500));
	}
});


exports.makeHead = asyncHandler(async (req, res, next) => {
	const { userId } = req.params;

	try {
		const user = await User.findById(userId);

		if (!user) {
			return next(new ErrorResponse("User not found", 404));
		}

		if (user.roles.includes("department_head")) {
			return next(new ErrorResponse("User is already a department head", 400));
		}

		await User.updateOne(
			{ _id: userId },
			{ $push: { roles: "department_head" } }
		);
		const updatedUser = await User.findById(userId);

		return res.status(200).json({
			success: true,
			message: "Department head role added successfully",
			user: updatedUser,
		});
	} catch (error) {
		return next(new ErrorResponse("Failed to add department head role", 500));
	}
});

exports.removeHead = asyncHandler(async (req, res, next) => {
	const { userId } = req.params;

	try {
		const user = await User.findById(userId);

		if (!user) {
			return next(new ErrorResponse("User not found", 404));
		}

		if (!user.roles.includes("department_head")) {
			return next(new ErrorResponse("User is not a department head", 400));
		}

		// Remove department_head role from the user
		await User.updateOne(
			{ _id: userId },
			{ $pull: { roles: "department_head" } }
		);

		const updatedUser = await User.findById(userId);

		return res.status(200).json({
			success: true,
			message: "Department head role removed successfully",
			user: updatedUser,
		});
	} catch (error) {
		return next(
			new ErrorResponse("Failed to remove department head role", 500)
		);
	}
});
