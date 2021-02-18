const roleRepo = require("../repos/role-repo");

/**
 * create new role
 * @param {creating role} req 
 */
exports.registerRole = async (req) => {
  const roleObj = await roleRepo.findExistRole(req);
  const createdRole = await roleRepo.createRole(roleObj);
  return createdRole;
};