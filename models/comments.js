const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema(
	{
		task: {
			type: Schema.Types.ObjectId,
			ref: "Task",
			required: true,
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		content: String,
	},
	{
		timestamps: true,
	}
);

commentSchema.pre("find", function () {
	this.populate({
		path: "author",
		select: "firstName lastName photo",
	})
});

const Comment = mongoose.model("Comment", commentSchema);

//recreate indexes
Comment.syncIndexes();

module.exports = Comment;
