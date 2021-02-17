const User = require("./schemas/user");

let auth = (req, res, next) => {
  User.findByToken(req, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        error: true,
      });

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
