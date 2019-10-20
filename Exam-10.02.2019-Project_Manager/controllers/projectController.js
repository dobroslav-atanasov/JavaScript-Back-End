const authentication = require('../common/authentication');
const userModel = require('../models/user');
const projectModel = require('../models/project');

function getCreateProject(req, res) {
    const userId = authentication.checkForAuthentication(req, res);
    userModel.findById(userId).then(user => {
        if (user !== null && user.roles === 'Admin') {
            const isAdmin = true;
            res.render('createProject.hbs', { user, isAdmin });
            return;
        }
        res.render('createProject.hbs', { user });
    });
}

function postCreateProject(req, res) {
    const { name, description } = req.body;
    projectModel.create({ name, description }).then(project => {
        console.log(project);
        res.redirect('/');
    });
}

function getProjects(req, res) {
    const userId = authentication.checkForAuthentication(req, res);
    userModel.findById(userId).then(user => {
        if (user !== null && user.roles === 'Admin') {
            const isAdmin = true;
            res.render('projects-admin.hbs', { user, isAdmin });
            return;
        }
        res.render('projects-user.hbs', { user });
    });
}

module.exports = {
    getCreateProject,
    postCreateProject,
    getProjects
}