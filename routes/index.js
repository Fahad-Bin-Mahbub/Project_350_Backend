const express = require("express");
const router = express.Router();

const adminRoutes = require("./user/admin");
const headRoutes = require("./user/department_head");
const inviteRoutes = require("./user/invite")
const examRoutes = require("./exam");
const taskRoutes = require("./task");
const commentRoutes = require("./comment");
const { teacherProtect, ensureGuest, adminProtect } = require("../middlewares/authProtect");
router.use("/admin",adminRoutes);  
router.use("/head",headRoutes);  
router.use("/invite",inviteRoutes);
router.use("/task",taskRoutes);
router.use("/exam",examRoutes);
router.use("/comment",commentRoutes);
module.exports = router;