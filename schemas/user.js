var mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const configs = require("../configs");
const confiq = configs.get(process.env.NODE_ENV);
const salt = 10;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 150,
  },
  username: {
    type: String,
    required: true,
    maxlength: 15,
    unique: true,
  },
  pass: {
    type: String,
    required: true,
    maxlength: 60,
    minlength: 6,
  },
  email: {
    type: String,
    required: true,
    maxlength: 60,
    unique: true,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  token: String,
  data: String,
});

/** convert password to hash */
userSchema.pre("save", function (next) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), confiq.SECRET);
  user.token = token;

  if (user.isModified("pass")) {
    bcrypt.genSalt(salt, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(user.pass, salt, (err, hash) => {
        if (err) return next(err);
        user.pass = hash;
        next();
      });
    });
  } else {
    next();
  }
});

/** compare login pass and db pass */
userSchema.methods.comparepassword = async (passes) => {
  const isMatch = await bcrypt.compare(passes.loginPass, passes.dbPass);
  return isMatch;
};

/** generate user token */
userSchema.methods.generateToken = async function () {
  var user = this;
  const hex = user._id.toHexString();
  var token = jwt.sign({ hex }, confiq.SECRET, {
    expiresIn: "6h",
  });

  user.token = token;
  const dbUser = await user.save();
  return dbUser;
};

/** find a particular logged in token in db */
userSchema.statics.findByToken = async function (token) {
  if (!token) {
    return null;
  }
  var user = this;

  const decode = await jwt.verify(token, confiq.SECRET);
  const dbUser = await user.findOne({ _id: decode, token: token });
  return dbUser;
};

/** delete token on user logout */
userSchema.methods.deleteToken = function (token, cb) {
  var user = this;

  user.updateOne({ $unset: { token: 1 } }, function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

module.exports = mongoose.model("User", userSchema);
