const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get(
	"/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
	"/google/callback",
	passport.authenticate("google", { failureRedirect: "https://exam-paper-track.up.railway.app" }),
	(req, res) => {
		 const responseData = {
				success: true,
				message: "User logged in",
				userData: req.user, // User data from req.user
			};
		return res.status(200).json(responseData);
	}
);

router.get("/logout", (req, res, next) => {
	req.session.destroy(function (err) {
		if (err) {
			return next(err);
		}
		res.clearCookie("connect.sid");
		return res.status(200).json({
			success: true,
			message: "User logged out",
		});
	});
});

module.exports = router; 
