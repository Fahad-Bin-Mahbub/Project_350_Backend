const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get(
	"/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
	"/google/callback",
	passport.authenticate("google", { failureRedirect: "/" }),
	(req, res) => {
		console.log("Hello");
		res.redirect("/");
	}
);

router.get("/logout", (req, res, next) => {
    console.log(req.session);
	req.session.destroy(function (err) {
		if (err) {
			return next(err);
		}
        console.log(req.session);
		res.redirect("/");
	});
});

module.exports = router;
