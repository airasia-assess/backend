const enums = require("../enums");
const User = require("../schemas/user");

/**
 * find duplicated username or email
 * @param {new user entity} req
 */
exports.findExistUser = async (req) => {
  const user = new User(req);

  const response = await User.findOne({
    username: user.username,
    email: user.email,
  });

  if (response) {
    throw enums.errs.USER_EXIST;
  }

  return user;
};

/**
 * user signup
 * @param {new user full entity} req
 */
exports.signup = async (req) => {
  // const newData = {
  //   dateCreated: new Date(),
  //   active: true,
  // };
  // let user = User(req); //Object.assign({}, req, newData);
  const user = {
    ...req,
    dateCreated: new Date(),
    active: true,
  };
  const response = await user.save();
  return response.token;
};

/**
 * find current logging in
 * @param {user token} req
 */
exports.alreadyLoggedin = async (req) => {
  const response = await User.findByToken(req);
  return response;
};

/**
 * compare entered pass with existing pass in db
 * @param {user entity} req
 */
exports.compareEnteredPass = async (req) => {
  if (!req) {
    return {
      success: false,
      errMsg: "Auth failed ,email not found",
    };
  }

  const response = user.comparepassword(req.pass);
  return response;
};
