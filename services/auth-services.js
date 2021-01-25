const enums = require("../enums");
const User = require("../schemas/user");

/**
 * find duplicated username or email
 * @param {new user entity} req
 */
exports.findExistUser = async (req) => {
  const user = {
    ...req,
    dateCreated: new Date(),
    active: true,
  };
  const newuser = new User(user);

  const response = await User.findOne({
    username: newuser.username,
    email: newuser.email,
  });

  if (response) {
    return {
      success: false,
      errMsg: enums.errs.USER_EXIST,
    };
  }

  return {
    success: true,
    newuser,
  };
};

/**
 * user signup
 * @param {new user full entity} req
 */
exports.signup = async (req) => {
  const response = await req.save();
  return response.token;
};
