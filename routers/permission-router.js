var express = require("express");
const permissionController = require("../controllers/permission-controller");

var router = express.Router();
router.post("/permissions", permissionController.regPermission);
router.get("/permissions", permissionController.getAllPermissions);

module.exports = router;