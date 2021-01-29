const authRepos = require("../repos/auth-repo");

/**
 * 
 * @param {*} req 
 */
exports.signup = async (req) => {
  const userObj = await authRepos.findExistUser(req.body);
  const newToken = await authRepos.signup(userObj);
  return newToken;
};
