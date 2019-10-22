const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: [4, 'Title should be at least 5 symbols long!']
    },
    description: {
        type: String,
        required: true,
        minlength: [20, 'Description should be at least 20 symbols long!'],
        maxlength: [50, 'Description is more than 50 symbols!']
    },
    imageUrl: {
        type: String,
        required: true,
        validate: [
            {
                validator: (v) => {
                    return v.startsWith('http://') || v.startsWith('https://');
                },
                message: props => `Image url should be start with http or https!`
            }
        ]
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    createAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    usersEnrolled: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Course', courseSchema);