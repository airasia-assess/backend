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
    unique: 1,
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
    unique: 1,
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
userSchema.methods.comparepassword = function (password, cb) {
  bcrypt.compare(password, this.pass, (err, isMatch) => {
    if (err) return cb(next);
    cb(null, isMatch);
  });
};

/** generate user token */
userSchema.methods.generateToken = function (cb) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), confiq.SECRET);

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

/** find a particular logged in token in db */
userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  jwt.verify(token, confiq.SECRET, function (err, decode) {
    user.findOne({ _id: decode, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
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
