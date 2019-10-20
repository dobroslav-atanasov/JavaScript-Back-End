const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    teams: [{
        type: mongoose.Types.ObjectId,
        ref: 'Team'
    }],
    profilePicture: {
        type: String,
        default: 'https://www.ibts.org/wp-content/uploads/2017/08/iStock-476085198.jpg'
    },
    roles: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User'
    }
});

userSchema.methods = {
    matchPassword: function (password) {
        return password === this.password;
    }
}

module.exports = mongoose.model('User', userSchema);