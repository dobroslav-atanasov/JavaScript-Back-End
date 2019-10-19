const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Username should be at least 5 symbols long!'],
        validate: [
            {
                validator: (v) => {
                    return /^[a-zA-Z0-9]+$/.test(v);
                },
                message: props => `${props.value} is not a valid username!`
            }
        ]
    },
    password: {
        type: String,
        required: true,
        minlength: [3, 'Password should be at least 3 symbols long!'],
        validate: [
            {
                validator: (v) => {
                    return /^[a-zA-Z0-9]+$/.test(v);
                },
                message: props => `Password should consist only english letters and digits!`
            }
        ]
    }
});

userSchema.methods = {
    // matchPassword: function (password) {
    //     return bcrypt.compare(password, password);
    // }
    matchPassword: function (password) {
        return password === this.password;
    }
};

module.exports = mongoose.model('User', userSchema);