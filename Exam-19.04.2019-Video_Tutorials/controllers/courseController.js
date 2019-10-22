const authentication = require('../common/authentication');
const userModel = require('../models/user');
const courseModel = require('../models/course');

function getCreateCourse(req, res) {
    const userId = authentication.checkForAuthentication(req, res);
    userModel.findById(userId).then(user => {
        res.render('create-course.hbs', { user });
    }); 
}

module.exports = {
    getCreateCourse
}