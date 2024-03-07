const mongoose = require("mongoose");
const bycrypt = require("bcrypt");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
	firstName: String,
	lastName: String,
	email: {
		type: String,
		required: [true, "Please add an email"],
		unique: true,
		match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Please add a valid email"],
	},
	roles: [
		{
			type: String,
			enum: ["admin", "teacher", "department_head"],
			default: "teacher",
		},
	],
	photo: String,

	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const User = mongoose.model("User", userSchema);

User.syncIndexes();

module.exports = User;
