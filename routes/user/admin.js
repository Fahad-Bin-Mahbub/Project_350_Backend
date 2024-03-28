const express = require("express");
const router = express.Router();

const controller = require("../../controllers/user/admin");

const { adminProtect } = require("../../middlewares/authProtect");

router.post("/create",controller.createAdmin);
router.post("/login",controller.adminLogin);
router.post("/create-department",adminProtect,controller.createDepartment)
router.put("/make-head/:userId",adminProtect,controller.makeHead)
router.put("/remove-head/:userId",adminProtect, controller.removeHead);
module.exports = router;
