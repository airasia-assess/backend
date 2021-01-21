var mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 150
    },
    username: {
        type: String,
        required: true,
        maxlength: 15,
        unique: 1
    },
    pass: {
        type: String,
        required: true,
        maxlength: 60
    },
    email: {
        type: String,
        required: true,
        maxlength: 60,
        unique: 1
    },
    dateCreated: {
        type: Date,
        required: true,
    },
    active: {
        type: Boolean,
        required: true
    },
    data: {
        type: String
    }
});

module.exports = mongoose.model('User', userSchema);