const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get(
	"/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
	"/google/callback",
	passport.authenticate("google", { failureRedirect: "http://localhost:5173" }),
	(req, res) => {
		res.redirect("http://localhost:5173/dashboard");
	}
);

router.get("/logout", (req, res, next) => {
	req.session.destroy(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect("http://localhost:5173");
	});
});

module.exports = router;
