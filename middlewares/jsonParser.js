const express = require("express");

const jsonParser = (req, res, next) => {
	switch (req.originalUrl) {
		case "/api/v1/payment/webhook/stripe":
			// express.raw({ type: "application/json" })(req, res, next);
			express.json()(req, res, next);
			break;
		default:
			express.json()(req, res, next);
			break;
	}
};

module.exports = jsonParser;
