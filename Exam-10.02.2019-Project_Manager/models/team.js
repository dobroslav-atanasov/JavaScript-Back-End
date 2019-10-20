const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    projects: [{
        type: mongoose.Types.ObjectId,
        ref: 'Project'
    }],
    members: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Team', teamSchema);