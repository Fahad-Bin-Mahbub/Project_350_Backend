const express = require("express");
const router = express.Router();
const controller = require("../../controllers/user/department_head");

const { headProtect } = require("../../middlewares/authProtect");

router.post("/create-ci",headProtect,controller.createCi);
router.get("/get-all-ci",headProtect,controller.getAllCi);
router.get("/get-dept/:id",headProtect,controller.getDept);

module.exports = router;