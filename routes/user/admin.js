const express = require("express");
const router = express.Router();

const controller = require("../../controllers/user/admin");

const { adminProtect, multiProtect } = require("../../middlewares/authProtect");

router.post("/create", controller.createAdmin);
router.post("/login", controller.adminLogin);
router.post("/logout", controller.adminLogout);
router.post("/create-department", adminProtect, controller.createDepartment);
router.get(
	"/get-department-id/:name",
	adminProtect,
	controller.getDepartmentId
);
router.get(
	"/get-all-teachers",
	multiProtect(["admin", "department_head", "ci"]),
	controller.getAllTeachers
);
router.get("/get-all-departments", adminProtect, controller.getAllDepartments);
router.get(
	"/teachers/:departmentId",
	multiProtect(["admin", "department_head", "ci", "teacher"]),
	controller.getAllByDepartment
);
router.put("/make-head/:userId", adminProtect, controller.makeHead);
router.put("/remove-head/:userId", adminProtect, controller.removeHead);
module.exports = router;
