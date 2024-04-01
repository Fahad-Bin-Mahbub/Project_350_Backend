const mongoose = require("mongoose");
const session = require("express-session")
const MongoStore = require("connect-mongo")
const config = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	autoIndex: true,
};

mongoose
	.connect(process.env.MONGODB_URI, config)
	.then(() => console.log(`Database is connected`.green))
	.catch((e) => console.log(`${e.message}`.red.bold));
console.log(process.env.MONGODB_URI);
const store = MongoStore.create({ mongoUrl: process.env.MONGODB_URI });

module.exports = store;