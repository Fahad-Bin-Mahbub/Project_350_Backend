const asyncHandler = require("../../middlewares/asyncHandler");
const ErrorResponse = require("../../utils/errorResponse");
const Ci = require("../../models/user/ci");

exports.getSession = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    try {
      const ci = await Ci.find({ user: id }); 
      return res.status(200).json({
        success: true,
        data: ci[0].session,
      });
    } catch (error) {
      return next(new ErrorResponse("Failed to retrieve users by department", 500));
    }
});