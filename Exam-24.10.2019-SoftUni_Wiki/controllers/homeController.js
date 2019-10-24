const authentication = require('../common/authentication');
const userModel = require('../models/user');
const articleModel = require('../models/article');

function index(req, res) {
    const userId = authentication.checkForAuthentication(req, res);

    const { search } = req.query;
    let query = {};

    if (search) {
        query = { ...query, title: { $regex: search } };
    }

    articleModel.find(query).sort({ creationDate: -1 }).then(articles => {
        userModel.findById(userId).then(user => {
            res.render('home.hbs', { user, articles });
        });
    });
}

module.exports = {
    index
}