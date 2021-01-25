const authServices = require("../services/auth-services");

exports.signup = async function (req, res) {
  try {
    let userObj = await authServices.findExistUser(req.body);

    if (!userObj.success) {
      throw userObj.errMsg;
    }

    let newToken = await authServices.signup(userObj.newuser);
    res.status(200).json({
      success: true,
      token: newToken,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      errMsg: err,
    });
  }
};
