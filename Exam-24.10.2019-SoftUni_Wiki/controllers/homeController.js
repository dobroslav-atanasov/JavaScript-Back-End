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

    res.render('home.hbs');
    return;
}

module.exports = {
    index
}