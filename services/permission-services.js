const permissionRepo = require("../repos/permission-repo");

/**
 * create new permission
 * @param {creating permission} req 
 */
exports.registerPermission = async (req) => {
  const permissionObj = await permissionRepo.findExistPermission(req);
  const createdPermission = await permissionRepo.createPermission(permissionObj);
  return createdPermission;
};

/**
 * get all permissions
 */
exports.getPermissions = async () => {
  const permissions = await permissionRepo.getAllPermissions();
  return permissions;
};