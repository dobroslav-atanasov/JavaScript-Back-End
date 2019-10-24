const authentication = require('../common/authentication');
const userModel = require('../models/user');
const courseModel = require('../models/course');

function index(req, res) {
    const userId = authentication.checkForAuthentication(req, res);

    const { search } = req.query;
    let query = {};

    if (search) {
        query = { ...query, title: { $regex: search } };
    }

    userModel.findById(userId).then(user => {
        res.render('home.hbs', { user });
    });
}

module.exports = {
    index
}