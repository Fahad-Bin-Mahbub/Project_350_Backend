const express = require("express");
const router = express.Router();

const controller = require("../../controllers/user/ci");
const { ciProtect } = require("../../middlewares/authProtect");

router.get("/get-session/:id",ciProtect,controller.getSession);

module.exports = router;