const authentication = require('../common/authentication');
const userModel = require('../models/user');
const expenseModel = require('../models/expense');

function index(req, res) {
    const userId = authentication.checkForAuthentication(req, res);
    if (userId === undefined) {
        userModel.findById(userId).then(user => {
            res.render('home.hbs', { user });
        });
    } else {
        Promise.all([
            userModel.findById(userId),
            expenseModel.find({}).where('user').equals(userId)
        ]).then(([user, expenses]) => {
            res.render('expenses.hbs', { user, expenses });
        });
    }
}

function notFound(req, res) {
    const userId = authentication.checkForAuthentication(req, res);
    userModel.findById(userId).then(user => {
        res.render('404.hbs', { user });
    });
}

module.exports = {
    index,
    notFound
}