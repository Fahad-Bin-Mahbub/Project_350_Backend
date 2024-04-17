const jwt = require('jsonwebtoken');
const asyncHandler = require("./asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/user");
const Blacklist = require("../models/user/blacklist");

exports.adminProtect = asyncHandler(async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const checkBlacklisted = await Blacklist.findOne({ token: token });
		if (checkBlacklisted)
			return next(new ErrorResponse("Token is expired already", 400));
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

exports.inviteProtect = asyncHandler(async (req, res, next) => {
	try {
		const token = req.body.token || req.params.token;
		jwt.verify(token, process.env.JWT_SECRET);

		next();
	} catch (error) {
		return next(new ErrorResponse("Invite token expired", 401));
	}
});

exports.teacherProtect = asyncHandler(async (req, res, next) => {
	try {
		if (!req.isAuthenticated() || !req.user.roles.includes("teacher")) {
			return next(new ErrorResponse("Not authorized", 401));
		}
		next();
	} catch (error) {
		return next(new ErrorResponse("Not authorized", 401));
	}
});

exports.headProtect = asyncHandler(async (req, res, next) => {
	try {
		if (!req.isAuthenticated() || !req.user.roles.includes("department_head")) {
			return next(new ErrorResponse("Not authorized", 401));
		}
		next();
	} catch (error) {
		return next(new ErrorResponse("Not authorized", 401));
	}
});

exports.guestProtect = asyncHandler(async (req, res, next) => {
	try {
		if (!req.isAuthenticated()) {
			return next(new ErrorResponse("Not authorized", 401));
		}
		next();
	} catch (error) {
		return next(new ErrorResponse("Not authorized", 401));
	}
});

exports.multiProtect = (roles) =>
	asyncHandler(async (req, res, next) => {
		try {
			if(!req.user)
			{
				const token = req.headers.authorization.split(" ")[1];
				const checkBlacklisted = await Blacklist.findOne({ token: token });
				if (checkBlacklisted)
					return next(new ErrorResponse("Token is expired already", 400));
		
				const decoded = jwt.verify(token, process.env.JWT_SECRET);

				req.user = await User.findById(decoded.id);
			}
			//check if user has any of the roles
			if (!req.user || !roles.some((role) => req.user.roles.includes(role))) {
				return next(new ErrorResponse("Not authorized", 401));
			}

			next();
		} catch (error) {
			return next(new ErrorResponse("Not authorized", 401));
		}
	});
