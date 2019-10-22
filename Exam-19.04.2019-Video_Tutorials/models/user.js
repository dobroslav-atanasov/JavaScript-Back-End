const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Username should be at least 5 symbols!'],
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
        minlength: [5, 'Password should be at least 5 symbols!'],
        validate: [
            {
                validator: (v) => {
                    return /^[a-zA-Z0-9]+$/.test(v);
                },
                message: props => `The password is not valid!`
            }
        ]
    },
    enrolledCourses: [{
        type: mongoose.Types.ObjectId,
        ref: 'Course'
    }]
});

userSchema.methods = {
    matchPassword: function (password) {
        return password === this.password;
    }
}

module.exports = mongoose.model('User', userSchema);