const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 255
    },
    imageUrl: {
        type: String,
        required: true
    },
    difficultyLevel: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    accessories: {
        type: mongoose.Types.ObjectId,
        ref: 'Accessories'
    }
});

module.exports = mongoose.model('Cube', cubeSchema);