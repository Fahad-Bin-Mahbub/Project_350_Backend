const express = require("express");
const router = express.Router();

const adminRoutes = require("./user/admin");
const inviteRoutes = require("./user/invite")
const examRoutes = require("./exam");
const taskRoutes = require("./task");
router.use("/admin",adminRoutes);    
router.use("/invite",inviteRoutes);
router.use("/task",taskRoutes);
router.use("/exam",examRoutes);
module.exports = router;