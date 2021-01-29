const authServices = require("../services/auth-services");

exports.signup = async function (req, res) {
  try {
    let newToken = await authServices.signup(req);
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
