const authentication = require('../common/authentication');
const userModel = require('../models/user');
const articleModel = require('../models/article');
const { validationResult } = require('express-validator');

function getCreate(req, res) {
    const userId = authentication.checkForAuthentication(req, res);
    userModel.findById(userId).then(user => {
        res.render('create.hbs', { user });
    });
}

function postCreate(req, res) {
    const { title, description } = req.body;
    const userId = authentication.checkForAuthentication(req, res);

    articleModel.findOne({ title: title }).then(articleInDb => {
        if (articleInDb !== null) {
            res.render('create.hbs', {
                message: `${articleInDb.title} article  already exist!`,
                oldBody: req.body
            });
            return;
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('create.hbs', {
                message: errors.array()[0].msg,
                oldBody: req.body
            });
        }

        articleModel.create({ title, description, articleAuthor: userId, creationDate: Date.now()}).then(article => {
            res.redirect('/');
        });
    });
}

function getArticle(req, res) {
    res.render('article.hbs');   
}

module.exports = {
    getCreate,
    postCreate,
    getArticle
}