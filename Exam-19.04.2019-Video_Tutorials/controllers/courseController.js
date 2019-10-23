const authentication = require('../common/authentication');
const userModel = require('../models/user');
const courseModel = require('../models/course');

function getCreateCourse(req, res) {
    const userId = authentication.checkForAuthentication(req, res);
    userModel.findById(userId).then(user => {
        res.render('create.hbs', { user });
    });
}

function postCreateCourse(req, res) {
    const { title, description, imageUrl, isPublic } = req.body;

    courseModel.findOne({title: title}).then(courseInDb => {
        if (courseInDb !== null) {
            res.render('create.hbs', {
                error: {
                    courseExist: `${courseInDb.title} course  already exist!`
                }
            });
            return;
        }

        if (isPublic !== undefined) {
            courseModel.create({title, description, imageUrl, isPublic: true}).then(course => {
                res.redirect('/');
            }).catch(err => {
                if (err.name === 'ValidationError') {
                    res.render('create.hbs', {
                        error: err.errors
                    });
                }
            });
        } else {
            courseModel.create({title, description, imageUrl, isPublic}).then(course => {
                res.redirect('/');
            }).catch(err => {
                if (err.name === 'ValidationError') {
                    res.render('create.hbs', {
                        error: err.errors
                    });
                }
            });
        }
    });    
}

module.exports = {
    getCreateCourse,
    postCreateCourse
}