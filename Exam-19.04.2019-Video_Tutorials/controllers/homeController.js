const authentication = require('../common/authentication');
const userModel = require('../models/user');

function index(req, res) {
    const userId = authentication.checkForAuthentication(req, res);
    userModel.findById(userId).then(user => {
        if (user !== null && user.roles === 'Admin') {
            const isAdmin = true;
            res.render('home.hbs', { user, isAdmin });
            return;
        }
        res.render('home.hbs', { user });
    });
}

module.exports = {
    index
}