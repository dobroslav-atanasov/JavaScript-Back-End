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
    if (isPublic !== undefined) {
        courseModel.create({title, description, imageUrl, isPublic: true}).then(course => {
            res.redirect('/');
        }).catch(err => {
            console.log(err);
        });
    }    
}

module.exports = {
    getCreateCourse,
    postCreateCourse
}