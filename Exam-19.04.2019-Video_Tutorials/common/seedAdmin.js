const userModel = require('../models/user');

function addAdmin() {
    userModel.findOne({username: 'Admin'}).then(user => {
        if (user === null) {
            userModel.create({
                username: 'Admin',
                password: 'admin',
                roles: 'Admin'
            });
        }
    }).catch(err => {
        console.log(err);
    });
}

module.exports = {
    addAdmin
}