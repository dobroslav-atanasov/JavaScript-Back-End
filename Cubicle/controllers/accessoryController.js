const accessorySchema = require('../models/accessory');

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

module.exports = {
    getCreateAccessory,
    postCreateAccessory
}