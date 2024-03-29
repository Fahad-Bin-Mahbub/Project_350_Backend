const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const blacklistSchema = new Schema(
	{
		token: {
			type: String,
			required: true,
			ref: "User",
		},
	},
	{ timestamps: true }
);

const Blacklist = mongoose.model("Blacklist", blacklistSchema);
Blacklist.syncIndexes();

module.exports = Blacklist;