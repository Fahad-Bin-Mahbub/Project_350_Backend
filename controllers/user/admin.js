const asyncHandler = require("../../middlewares/asyncHandler");
const Admin = require("../../models/user/admin");
const User = require("../../models/user");
const ErrorResponse = require("../../utils/errorResponse");
const sendTokenResponse = require("../../utils/tokenResponse");

exports.createAdmin = asyncHandler(async (req, res, next) => {
	const { email } = req.body;
	console.log(req.body);
	let user = await User.findOne({ email });
	console.log(user);

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
		await User.findByIdAndDelete(user.id);
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

	console.log(user);
	let admin = await Admin.findOne({ _id: user._id }).select("+password");

	if (!admin)
		return next(new ErrorResponse("No Admin found with this email", 404));

	const isMatch = await admin.matchPassword(password);

	if (!isMatch) return next(new ErrorResponse("Invalid Password", 400));

	sendTokenResponse(user, res);
});
