const asyncHandler = require("../../middlewares/asyncHandler");
const ErrorResponse = require("../../utils/errorResponse");
const User = require("../../models/user");

exports.getUserByID = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorResponse("User not found", 404));
    }
    return res.status(200).json({
        success: true,
        data: user,
    });
});