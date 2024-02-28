const mongoose = require("mongoose");

const config = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	autoIndex: true,
};

mongoose
	.connect(process.env.MONGODB_URI, config)
	.then(() => console.log(`Database is connected`.green))
	.catch((e) => console.log(`${e.message}`.red.bold));
