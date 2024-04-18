const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get(
	"/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
	"/google/callback",
	passport.authenticate("google", {
		failureRedirect: "https://exam-paper-track.up.railway.app",
	}),
	(req, res) => {
		const userId = req.user.id;
		res.redirect(`https://exam-paper-track.up.railway.app/${userId}`);
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
