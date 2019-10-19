const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [5, 'Accessory name should be at least 5 symbols long!'],
        validate: [
            {
                validator: (v) => {
                    return /[^[a-zA-Z0-9\s]+$]/;
                },
                message: props => `${props.value} is not valid name!`
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
    cubes: [{
        type: mongoose.Types.ObjectId,
        ref: 'Cube'
    }]
});

module.exports = mongoose.model('Accessory', accessorySchema);