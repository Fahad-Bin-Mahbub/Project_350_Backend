const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ciSchema = new Schema(
	{
		_id: Schema.Types.ObjectId,
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		session: {
			type: String,
			required: true,
		},
	},
);

const Ci = mongoose.model("Ci", ciSchema);

Ci.syncIndexes();

module.exports = Ci;