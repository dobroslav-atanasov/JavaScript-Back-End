const accessorySchema = require('../models/accessory');
const cubeSchema = require('../models/cube');

function getCreateAccessory(req, res) {
    res.render('createAccessory.hbs');
}

function postCreateAccessory(req, res) {
    const {name, imageUrl, description} = req.body;

    accessorySchema.create({name, imageUrl, description})
        .then(accessory => {
            console.log(accessory);
            res.redirect('/');
        }).catch(err => {
            console.log(err);
        });
}

function getAttachAccessory(req, res) {
    const cubeId = req.params.id;

    cubeSchema.findById(cubeId).then(cube => {
            accessorySchema.find().then(accessories => {
                res.render('attachAccessory.hbs', { cube, accessories: accessories.length > 0 ? accessories : null });
            }).catch(err => {
                console.log(err);
            });
        }).catch(err => {
            console.log(err);
        });
}

module.exports = {
    getCreateAccessory,
    postCreateAccessory,
    getAttachAccessory
}