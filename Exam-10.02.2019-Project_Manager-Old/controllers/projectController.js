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

            Promise.all([
                teamModel.find({}),
                projectModel.find({ 'teams': { $size: 0 } })
            ]).then(([teams, projects]) => {
                res.render('projects-admin.hbs', { user, isAdmin, teams, projects });
            });
            return;
        }

        const { search } = req.query;
        let query = {};

        if (search) {
            query = { ...query, name: { $regex: search } };
        }

        projectModel.find(query).populate('teams').then(projects => {
            res.render('projects-user.hbs', { user, projects });
        });
    });
}

function postProjects(req, res) {
    const { teamId, projectId } = req.body;

    Promise.all([
        teamModel.updateOne({ _id: teamId }, { $push: { projects: projectId } }),
        projectModel.updateOne({ _id: projectId }, { $push: { teams: teamId } })
    ]).then(() => {
        res.redirect('/');
    }).catch(err => {
        console.log(err);
    });
}

module.exports = {
    getCreateProject,
    postCreateProject,
    getProjects,
    postProjects
}