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
const session = require("express-session");
const { teacherProtect, adminProtect } = require("./middlewares/authProtect");
const store = require("./config/db");
require("colors");
require("./config/passport")
const limiter = rateLimit({
	validate:{
		validationConfig: false,
		default: true,
	},
	windowMs: 60 * 60 * 1000, // 60 minutes
	max: 20000, // Limit each IP to 20k requests per 60 mins
	message: "Too many requests from this IP, please try again in an hour!",
});

const app = express();
app.use(cors({ credentials: true, origin: "https://exam-paper-track.up.railway.app"}));
// app.use(cors({ credentials: true, origin: "http://localhost:5173"}));
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
	res.send('Hello');
});
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT,'0.0.0.0', () =>
	console.log(`Server has started on port ${PORT}`.green)
);
