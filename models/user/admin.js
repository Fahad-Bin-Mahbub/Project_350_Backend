const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const adminSchema = new Schema(
	{
		_id: Schema.Types.ObjectId,
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		password: {
			type: String,
			required: [true, "Please add a password"],
			minlength: 6,
			select: false,
		},
	},
	{
		timestamps: true,
	}
);
adminSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}

	this.password = await bcrypt.hash(this.password, 12);
});
adminSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};
const Admin = mongoose.model("Admin", adminSchema);

Admin.syncIndexes();

module.exports = Admin;