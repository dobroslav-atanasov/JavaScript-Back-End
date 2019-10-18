const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, `Username should be at least 5 symbols long!`]
    },
    hashPassword: {
        type: String,
        required: true,
        minlength: [4, `Password should be at least 4 symbols long!`]
    }
});

userSchema.methods = {
    matchPassword: function (password) {
        return bcrypt.compare(password, this.hashPassword);
    }
};

module.exports = mongoose.model('User', userSchema);