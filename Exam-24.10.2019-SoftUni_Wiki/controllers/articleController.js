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

        articleModel.create({ title, description, articleAuthor: userId, creationDate: Date.now() }).then(article => {
            res.redirect('/');
        });
    });
}

function getArticle(req, res) {
    const articleId = req.params.id;
    const userId = authentication.checkForAuthentication(req, res);

    Promise.all([
        userModel.findById(userId),
        articleModel.findById(articleId)
    ]).then(([user, article]) => {
        const isCreator = userId === article.articleAuthor;
        res.render('article.hbs', { user, article, isCreator });
    });
}

function getAllArticles(req, res) {
    const userId = authentication.checkForAuthentication(req, res);

    Promise.all([
        userModel.findById(userId),
        articleModel.find({})
    ]).then(([user, articles]) => {
        res.render('all-articles.hbs', { user, articles });
    });
}

function getEdit(req, res) {
    const userId = authentication.checkForAuthentication(req, res);
    const articleId = req.params.id;

    Promise.all([
        userModel.findById(userId),
        articleModel.findById(articleId)
    ]).then(([user, article]) => {
        res.render('edit.hbs', { user, article });
    });
}

function postEdit(req, res) {
    const { description } = req.body;
    const articleId = req.params.id;
    const userId = authentication.checkForAuthentication(req, res);

    Promise.all([
        userModel.findById(userId),
        articleModel.findByIdAndUpdate(articleId, { description })
    ]).then(([user, article]) => {
        res.redirect(`/article/${articleId}`);
    });
}

function getDelete(req, res) {
    const articleId = req.params.id;
    articleModel.findById(articleId).remove().then(() => {
        res.redirect(`/`);
    });
}

function search(req, res) {
    const { search } = req.query;
    const userId = authentication.checkForAuthentication(req, res);

    let query = {};

    if (search) {
        query = { ...query, title: { $regex: search } };
    }

    Promise.all([
        userModel.findById(userId),
        articleModel.find(query)
    ]).then(([user, articles]) => {
        res.render('search.hbs', { user, articles, search });
    });
}

module.exports = {
    getCreate,
    postCreate,
    getArticle,
    getAllArticles,
    getEdit,
    postEdit,
    getDelete,
    search
}