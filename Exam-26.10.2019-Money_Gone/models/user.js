const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        default: 0
    },
    expenses: [{
        type: mongoose.Types.ObjectId,
        ref: 'Expense'
    }]
});

userSchema.methods = {
    matchPassword: function (password) {
        return password === this.password;
    }
}

module.exports = mongoose.model('User', userSchema);