const authentication = require('../common/authentication');
const userModel = require('../models/user');
const courseModel = require('../models/course');

function index(req, res) {
    const userId = authentication.checkForAuthentication(req, res);
    courseModel.find({}).then(courses => {
        userModel.findById(userId).then(user => {
            if (user !== null && user.roles === 'Admin') {
                const isAdmin = true;
                res.render('home-admin.hbs', { user, isAdmin, courses });
                return;
            }
            res.render('home.hbs', { user });
        });
    });
}

module.exports = {
    index
}