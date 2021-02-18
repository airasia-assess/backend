const roleServices = require("../services/role-service");

/**
 * create new role
 * @param {create role} req 
 * @param {role string or err} res 
 */
exports.regRole = async function (req, res) {
  try {
    let createdRole = await roleServices.registerRole(req.body);
    res.status(200).json({
      success: true,
      role: createdRole,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      errMsg: err,
    });
  }
};