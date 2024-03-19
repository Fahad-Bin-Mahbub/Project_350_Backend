const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const examSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	tasks: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Task",
		},
	],
	creationDate: {
		type: Date,
		default: Date.now,
	},
	createdBy: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});

const Exam = mongoose.model("Exam", examSchema);
Exam.syncIndexes();

module.exports = Exam;
