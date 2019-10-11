const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // username

    // password
});

module.exports = mongoose.model('User', userSchema);