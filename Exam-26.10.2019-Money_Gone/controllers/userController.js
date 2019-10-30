const userModel = require('../models/user');
const jwt = require('../common/jwt');
const authentication = require('../common/authentication');
const { validationResult } = require('express-validator');
const expenseModel = require('../models/expense');

function getRegister(req, res) {
    const userId = authentication.checkForAuthentication(req, res);
    userModel.findById(userId).then(user => {
        res.render('register.hbs', { user });
    });
}

function postRegister(req, res) {
    const { username, password, repeatPassword, amount } = req.body;
    if (password !== repeatPassword) {
        res.render('register.hbs', {
            message: 'Your password and confirmation password do not match.',
            oldBody: req.body
        });
        return;
    }

    userModel.findOne({ username: username }).then(userInDb => {
        if (userInDb !== null) {
            res.render('register.hbs', {
                message: `${userInDb.username} username  already exist!`,
                oldBody: req.body
            });
            return;
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('register.hbs', {
                message: errors.array()[0].msg,
                oldBody: req.body
            });
        }

        userModel.create({ username, password, amount }).then(user => {
            res.redirect('/login');
        });
    });
}

function getLogin(req, res) {
    const userId = authentication.checkForAuthentication(req, res);
    userModel.findById(userId).then(user => {
        res.render('login.hbs', { user });
    });
}

function postLogin(req, res) {
    const { username, password } = req.body;
    userModel.findOne({ username }).then(user => {
        if (user === null) {
            res.render('login.hbs', {
                message: 'Invalid username or password!'
            });
            return;
        } else {
            const isMatch = user.matchPassword(password);
            if (!isMatch) {
                res.render('login.hbs', {
                    message: 'Invalid username or password!'
                });
                return;
            }

            const jwtToken = jwt.create({ id: user.id });
            res.cookie('auth-token', jwtToken);
            res.redirect('/');
        }
    });
}

function logout(req, res) {
    res.clearCookie('auth-token');
    res.redirect('/');
}

function refill(req, res) {
    const userId = authentication.checkForAuthentication(req, res);
    const { refill } = req.body;

    Promise.all([
        userModel.findById(userId),
        expenseModel.find({}).where('user').equals(userId)
    ]).then(([user, expenses]) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('expenses.hbs', {
                message: errors.array()[0].msg,
                user,
                expenses
            });
        }

        userModel.findByIdAndUpdate(userId, { amount: user.amount + +refill }).then(() => {
            res.redirect('/');
        })
    });
}

function getAccountInfo(req, res) {
    const userId = authentication.checkForAuthentication(req, res);

    Promise.all([
        userModel.findById(userId),
        expenseModel.find({}).where('user').equals(userId)
    ]).then(([user, expenses]) => {
        res.render('account-info.hbs', {
            user,
            total: expenses.reduce(function (a, b) { return a + b.total; }, 0),
            count: expenses.length,
            amount: user.amount
        });
    });
}

module.exports = {
    getRegister,
    postRegister,
    getLogin,
    postLogin,
    logout,
    refill,
    getAccountInfo
}