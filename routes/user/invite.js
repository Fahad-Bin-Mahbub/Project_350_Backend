const express = require("express");
const router = express.Router();

const controller = require("../../controllers/user/invite");
const {adminProtect,inviteProtect} = require("../../middlewares/authProtect");
router.post("/register", inviteProtect, controller.acceptInvite);
router.get("/get-by-token/:token", inviteProtect, controller.getInviteByToken);
//Admin Routes
router.post("/", adminProtect, controller.createInvite);

router.get("/get-all", adminProtect, controller.getAllInvites);

router.delete("/:id", adminProtect, controller.deleteInvite);
module.exports = router;