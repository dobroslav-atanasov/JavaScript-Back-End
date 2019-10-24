const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    articleAuthor: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    creationDate: {
        type: Date,
        required: true
    }
});

module.exports = new mongoose.model('Article', articleSchema);