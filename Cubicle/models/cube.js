const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [5, 'Cube name should be at least 5 symbols long!'],
        validate: [
            {
                validator: (v) => {
                    return /[^[a-zA-Z0-9\s]+$]/;
                },
                message: props => `${props.value} is not valid name!`
            }
        ]
    },
    description: {
        type: String,
        required: true,
        minlength: [20, 'Description should be at least 20 symbols long!'],        
        maxlength: 255,
        validate: [
            {
                validator: (v) => {
                    return /[^[a-zA-Z0-9\s]+$]/;
                },
                message: props => `Description containts invalid symbols!`
            }
        ]
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
    difficultyLevel: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    creatorId: {
        type: String
    },
    accessories: [{
        type: mongoose.Types.ObjectId,
        ref: 'Accessory'
    }]
});

module.exports = mongoose.model('Cube', cubeSchema);