var express = require("express");
const roleController = require("../controllers/role-controller");

var router = express.Router();
router.post("/roles", roleController.regRole);
// router.get("/roles", roleController);

module.exports = router;