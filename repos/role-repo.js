const enums = require("../enums");
const Role = require("../schemas/role");

/**
 * find duplicated role code
 * @param {role entity} req
 */
exports.findExistRole = async (req) => {
  const role = new Role(req);

  const response = await Role.findOne({
    code: role.code,
  });

  if (response) {
    throw enums.errs.ROLE_EXIST;
  }

  return role;
};

/**
 * create role
 * @param {new role entity} req
 */
exports.createRole = async (req) => {
  const response = await req.save();
  return `${response.code}: ${response.name}`;
};