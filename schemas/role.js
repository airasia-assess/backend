var mongoose = require("mongoose");

const roleSchema = mongoose.Schema({
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
  permissions: {
    type: [String],
    required: true
  },
  dateCreated: {
    type: Date,
    required: true,
    default: new Date()
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  },
  data: String,
});

module.exports = mongoose.model("Role", roleSchema);
