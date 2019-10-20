const authentication = require('../common/authentication');
const userModel = require('../models/user');
const projectModel = require('../models/project');
const teamModel = require('../models/team');

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
            teamModel.find({}).then(teams => {
                projectModel.find({}).then(projects => {
                    res.render('projects-admin.hbs', { user, isAdmin, teams, projects });
                });
            });
            return;
        }
        res.render('projects-user.hbs', { user });
    });
}

function postProjects(req, res) {
    // TODO
}

module.exports = {
    getCreateProject,
    postCreateProject,
    getProjects,
    postProjects
}