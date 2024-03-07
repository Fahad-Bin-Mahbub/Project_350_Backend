const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

const inviteSchema = new Schema(
	{
		firstName: String,
		lastName: String,
		email: {
			type: String,
			required: [true, "Please add an email"],
			unique: true,
			match: [
				/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
				"Please add a valid email",
			],
		},
		role: {
			type: String,
			enum: ["admin", "teacher", "department_head"],
		},
		invitedBy: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		token: String,
		status: {
			type: String,
			enum: ["pending", "accepted"],
			default: "pending",
		},
	},
	{
		timestamps: true,
	}
);

inviteSchema.pre("save", async function (next) {
	const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});
	this.token = token;
	next();
});

module.exports = mongoose.model("Invite", inviteSchema);