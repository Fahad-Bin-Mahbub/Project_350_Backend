const asyncHandler = require("../../middlewares/asyncHandler");

const User = require("../../models/user");
const Ci = require("../../models/user/ci");

exports.createCi = asyncHandler(async (req, res, next) => {
    const { session, email } = req.body;
    try{
        let user = await User.findOne({ email });
        if(!user){
            return next(new ErrorResponse("No user with this email", 500));
        }
        if(!user.roles.includes('ci')){
            user.roles.push('ci');
            await user.save();
        }
        await Ci.create({
            _id: user.id,
            user: user.id,
            session: session
        });
        return res.status(200).json({
            success: true,
            message: "Ci added",
        });
    }catch(error){
        return next(new ErrorResponse("Ci not added", 500));
    }
});