const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, `Username should be at least 5 symbols long!`],
        validate: {
            validator: function (v) {
                return /[a-zA-Z0-9]+/.test(v);
            },
            message: props => `${props.value} is not a valid username!`
        }
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