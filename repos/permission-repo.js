const enums = require("../enums");
const Permission = require("../schemas/permission");

/**
 * find duplicated permission code
 * @param {permission entity} req
 */
exports.findExistPermission = async (req) => {
  // req = {
  //   ...req,
  //   dateCreated: new Date(),
  //   active: true,
  // };
  const permission = new Permission(req);

  const response = await Permission.findOne({
    code: permission.code,
  });

  if (response) {
    throw enums.errs.PERMISSION_EXIST;
  }

  return permission;
};

/**
 * create permission
 * @param {new permission entity} req
 */
exports.createPermission = async (req) => {
  const response = await req.save();
  return `${response.code}: ${response.name}`;
};

/**
 * get permissions full list
 */
exports.getAllPermissions = async () => {
  const response = await Permission.find({});
  return response;
};
