const asyncHandler = require("../../middlewares/asyncHandler");
const Admin = require("../../models/user/admin");
const User = require("../../models/user");
const ErrorResponse = require("../../utils/errorResponse");
const sendTokenResponse = require("../../utils/tokenResponse");
const Department = require("../../models/department");
const Blacklist = require("../../models/user/blacklist");
exports.createAdmin = asyncHandler(async (req, res, next) => {
	const { email } = req.body;
	let user = await User.findOne({ email });
	try {
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
	} catch (error) {
		if(user) await User.findByIdAndDelete(user.id);
		return next(new ErrorResponse(`Admin creation failed - ${error.message}`, 500));
	}
});

exports.adminLogin = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email) return next(new ErrorResponse("Please input Email!", 500));

	if (!password) return next(new ErrorResponse("Please input Password!", 500));
	let user = await User.findOne({ email });
	
	if(!user)
		return next(new ErrorResponse("No User found with this email", 404));

	let admin = await Admin.findOne({ _id: user._id }).select("+password");

	if (!admin)
		return next(new ErrorResponse("No Admin found with this email", 404));

	const isMatch = await admin.matchPassword(password);

	if (!isMatch) return next(new ErrorResponse("Invalid Password", 400));

	sendTokenResponse(user, res);
});

exports.adminLogout = asyncHandler(async (req, res, next) => {
	try {
		const accesstoken = req.headers.authorization.split(" ")[1];
		const checkBlacklisted = await Blacklist.findOne({ token: accesstoken });
		if (checkBlacklisted)
			return next(new ErrorResponse("User already logged out", 400));
		
			await Blacklist.create({ token:accesstoken });
		res.setHeader("Clear-Site-Data", '"cookies"');
		return res.status(200).json({
			success: true,
			message: "Logged out successfully",
		});
	} catch (error) {
		return next(new ErrorResponse("Failed to logout", 500));
	}
});


exports.getAllTeachers = asyncHandler(async (req, res, next) => {
  try {
    const teachers = await User.find({ roles: 'teacher' }); 
    return res.status(200).json({
      success: true,
      message: "All teachers retrieved",
      data: teachers,
    });
  } catch (error) {
    return next(new ErrorResponse("Failed to retrieve teachers", 500));
  }
});

exports.getAllDepartments = asyncHandler(async (req, res, next) => {
	try {
	  const departments = await Department.find(); 
	  return res.status(200).json({
		success: true,
		message: "All departments retrieved",
		data: departments,
	  });
	} catch (error) {
	  return next(new ErrorResponse("Failed to retrieve teachers", 500));
	}
  });

exports.getAllByDepartment = asyncHandler(async (req, res, next) => {
  const { departmentId } = req.params;
  try {
    const users = await User.find({ department: departmentId }); 
    return res.status(200).json({
      success: true,
      message: `All users in department ${departmentId} retrieved`,
      data: users,
    });
  } catch (error) {
    return next(new ErrorResponse("Failed to retrieve users by department", 500));
  }
});

exports.createDepartment = asyncHandler(async (req, res, next) => {
	try {
		const { name } = req.body;
		let department = await Department.findOne({ name });
		if (department)
			return next(new ErrorResponse("Department already existst", 500));
		await Department.create({
			name: req.body.name,
		});

		return res.status(200).json({
			success: true,
			message: "Department created successfully",
		});
	} catch (error) {
		return next(new ErrorResponse("Department not created", 500));
	}
});

exports.getDepartmentId = asyncHandler(async (req, res, next) => {
	try{
		const { name } = req.params;
		console.log(name);
		let department = await Department.findOne({ name });
		if(department){
			return res.status(200).json({
				success: true,
				id: department.id
			});
		}
		else return next(new ErrorResponse("Department not found", 500));
	} catch (error) {
		return next(new ErrorResponse("Department not found", 500));
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
