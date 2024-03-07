const express = require("express");
const router = express.Router();

const controller = require("../../controllers/user/admin");

const { adminProtect } = require("../../middlewares/authProtect");

router.post("/create",controller.createAdmin);
router.post("/login",controller.adminLogin);
module.exports = router;
