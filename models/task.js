const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
	status: {
		type: String,
		required: true,
	},
	courseCode: {
		type: String,
		required: true,
	},
	semester: {
		type: String,
		required: true,
	},
	part: {
		type: String,
		required: true,
	},
	teacher: {
		type: Schema.Types.ObjectId,
        ref: "Teacher",
		required: true,
	},
	creationDate: {
		type: Date,
		default: Date.now,
	},
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
	dueDate: {
		type: Date,
		required: true,
	},
});

const Task = mongoose.model("Task", taskSchema);
Task.syncIndexes();

module.exports = Task;