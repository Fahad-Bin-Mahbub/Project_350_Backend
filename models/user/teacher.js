const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teacherSchema = new Schema(
	{
		_id: Schema.Types.ObjectId,
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Staff = mongoose.model("Teacher", teacherSchema);

Staff.syncIndexes();

module.exports = Staff;