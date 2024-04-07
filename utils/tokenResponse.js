var jwt = require("jsonwebtoken");

const sendTokenResponse = (user, res) => {
	const options = {
		expiresIn: process.env.JWT_EXPIRE_TIME,
	};
	const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, options);

	res.status(200).json({
		success: true,
		token,
		user,
	});
};

module.exports = sendTokenResponse;
