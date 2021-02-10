var mongoose = require("mongoose");

const permissionSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
    maxlength: 6,
    minlength: 2,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 60,
    minlength: 6
  },
  dateCreated: {
    type: Date,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  data: String,
});

permissionSchema.pre("validate", function (next) {
  var permission = this;
  permission.dateCreated = new Date();
  permission.active = true;
  next();
});

module.exports = mongoose.model("Permission", permissionSchema);
