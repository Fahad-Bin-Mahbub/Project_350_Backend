const jwt = require('jsonwebtoken');
const asyncHandler = require("./asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/user");

exports.adminProtect = asyncHandler(async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		req.user = await User.findById(decoded.id);

		if (!req.user || !req.user.roles.includes("admin")) {
			return next(new ErrorResponse("Not authorized", 401));
		}

		next();
	} catch (error) {
		return next(new ErrorResponse("Not authorized", 401));
	}
});
