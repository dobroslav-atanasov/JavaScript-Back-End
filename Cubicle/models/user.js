const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    hashPassword: {
        type: String,
        required: true
    }
});

userSchema.methods = {
    matchPassword: function (password) {
        return bcrypt.compare(password, this.hashPassword);
    }
};

module.exports = mongoose.model('User', userSchema);