const authentication = require('../common/authentication');
const userModel = require('../models/user');
const courseModel = require('../models/course');
const { validationResult } = require('express-validator');

function getCreateCourse(req, res) {
    const userId = authentication.checkForAuthentication(req, res);
    userModel.findById(userId).then(user => {
        res.render('create.hbs', { user });
    });
}

function postCreateCourse(req, res) {
    const { title, description, imageUrl, isPublic } = req.body;

    courseModel.findOne({ title: title }).then(courseInDb => {
        if (courseInDb !== null) {
            res.render('create.hbs', {
                message: `${courseInDb.title} course  already exist!`,
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

        courseModel.create({ title, description, imageUrl, isPublic: isPublic !== undefined ? true : false }).then(course => {
            res.redirect('/');
        });
    });
}

module.exports = {
    getCreateCourse,
    postCreateCourse
}