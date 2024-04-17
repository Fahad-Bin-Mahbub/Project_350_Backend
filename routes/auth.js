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
		req.session.save(() => {
			res.redirect("https://exam-paper-track.up.railway.app/dashboard");
		});
	}
);

router.get("/logout", (req, res, next) => {
	req.session.destroy(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect("https://exam-paper-track.up.railway.app");
	});
});

module.exports = router;
