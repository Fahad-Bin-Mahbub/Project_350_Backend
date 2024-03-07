const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const path = require("path");
const rateLimit = require("express-rate-limit");
const jsonParser = require("./middlewares/jsonParser");
const apiRoutes = require("./routes")
require("./config/db");
require("colors");

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
app.use(jsonParser);
app.use("/api",apiRoutes);

app.get("/", (req, res) => {
	res.send("Server is up and running");
});


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
	console.log(`Server has started on port ${PORT}`.green)
);
