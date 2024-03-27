const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const path = require("path");
const rateLimit = require("express-rate-limit");
const jsonParser = require("./middlewares/jsonParser");
const apiRoutes = require("./routes");
const passport = require("passport");
const sgMail = require("@sendgrid/mail");
const session = require("express-session");
const { teacherProtect, adminProtect } = require("./middlewares/authProtect");
const store = require("./config/db");
require("colors");
require("./config/passport")
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const limiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 60 minutes
	max: 20000, // Limit each IP to 20k requests per 60 mins
	message: "Too many requests from this IP, please try again in an hour!",
});

const app = express();
app.use(cors());
app.use(limiter);
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
	session({
		secret: "cats",
		resave: false,
		saveUninitialized: false,
		store: store, 
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(jsonParser);
app.use("/api", apiRoutes);
app.use('/auth',require('./routes/auth'))
// function isLoggedIn(req, res, next) {
// 	req.user ? next() : res.sendStatus(401);
// }

app.get("/", (req, res) => {
	res.send('<a href="/auth/google">Authenticate with google</a>');
});
// app.get(
// 	"/auth/google",
// 	passport.authenticate("google", { scope: ["profile", "email"] })
// );

// app.get(
// 	"/google/callback",
// 	passport.authenticate("google", {
// 		successRedirect: "/loggedin",
// 		failureRedirect: "/auth/failure",
// 	})
// );
// app.get("/loggedin", teacherProtect, (req, res) => {
// 	console.log(req);
// 	res.send(req.user ? `Welcome ${req.user.firstName}` : "Not logged in");
// });

// app.get("/auth/failure", (req, res) => {
// 	res.send("Failed to log in");
// });
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
	console.log(`Server has started on port ${PORT}`.green)
);
