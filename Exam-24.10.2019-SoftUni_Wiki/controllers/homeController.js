const authentication = require('../common/authentication');
const userModel = require('../models/user');
const articleModel = require('../models/article');

function index(req, res) {
    const userId = authentication.checkForAuthentication(req, res);

    articleModel.find({}).sort({ creationDate: -1 }).limit(3).then(articles => {
        userModel.findById(userId).then(user => {
            res.render('home.hbs', { user, articles });
        });
    });
}

module.exports = {
    index
}