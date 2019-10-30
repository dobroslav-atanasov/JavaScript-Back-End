const authentication = require('../common/authentication');
const userModel = require('../models/user');
const expenseModel = require('../models/expense');
const { validationResult } = require('express-validator');

function getCreateExpense(req, res) {
    const userId = authentication.checkForAuthentication(req, res);
    userModel.findById(userId).then(user => {
        res.render('new-expense.hbs', { user });
    });
}

function postCreateExpense(req, res) {
    const userId = authentication.checkForAuthentication(req, res);
    const { merchant, total, category, description, report } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('new-expense.hbs', {
            message: errors.array()[0].msg,
            oldBody: req.body
        });
    }

    expenseModel.create({ merchant, total, category, description, user: userId, date: Date.now(), report: report !== undefined ? true : false }).then(expense => {
        res.redirect('/');
    });
}

function getReport(req, res) {
    const userId = authentication.checkForAuthentication(req, res);
    const expenseId = req.params.id;

    Promise.all([
        userModel.findById(userId),
        expenseModel.findById(expenseId)
    ]).then(([user, expense]) => {
        res.render('report.hbs', { user, expense });
    });
}

function getDelete(req, res) {
    const expenseId = req.params.id;

    expenseModel.findById(expenseId).remove().then(() => {
        res.redirect(`/`);
    });
}

module.exports = {
    getCreateExpense,
    postCreateExpense,
    getReport,
    getDelete
}