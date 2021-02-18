const permissionServices = require("../services/permission-services");

/**
 * create new permission
 * @param {create permission} req 
 * @param {permission string or err} res 
 */
exports.regPermission = async function (req, res) {
  try {
    let createdPermission = await permissionServices.registerPermission(req.body);
    res.status(200).json({
      success: true,
      permission: createdPermission,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      errMsg: err,
    });
  }
};

/**
 * 
 * @param {nothing} req 
 * @param {list of permissions or err} res 
 */
exports.getAllPermissions = async function (req, res) {
  try {
    let permissions = await permissionServices.getPermissions();
    res.status(200).json({
      success: true,
      permissions,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      errMsg: err,
    });
  }
};