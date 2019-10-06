const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 255
    },
    cubes: {
        type: mongoose.Types.ObjectId,
        ref: 'Cubes'
    }
});

module.exports = mongoose.model('Accessory', accessorySchema);