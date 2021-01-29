const authServices = require("../services/auth-services");

exports.signup = async function (req, res) {
  try {
    let newToken = await authServices.signup(req.body);
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

exports.login = async function (req, res) {
  try {
    const user = await authServices.login(req);
    res.cookie('auth', user.token).status(200).json({
      success: true,
      id: user._id,
      username: user.username,
      email: user.email
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      errMsg: err,
    });
  }
};
