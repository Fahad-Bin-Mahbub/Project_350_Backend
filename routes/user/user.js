const express = require("express");
const router = express.Router();

const controller = require("../../controllers/user/user");

router.get("/get-user/:id", controller.getUserByID);

module.exports = router;