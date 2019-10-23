const authentication = require('../common/authentication');
const userModel = require('../models/user');

function index(req, res) {
    const userId = authentication.checkForAuthentication(req, res);
    // courseModel.find({}).then(courses => {
    userModel.findById(userId).then(user => {
        res.render('home.hbs', { user });
    });
    // });
}

module.exports = {
    index
}