const authentication = require('../common/authentication');
const userModel = require('../models/user');
const teamModel = require('../models/team');

function getCreateTeam(req, res) {
    const userId = authentication.checkForAuthentication(req, res);
    userModel.findById(userId).then(user => {
        if (user !== null && user.roles === 'Admin') {
            const isAdmin = true;
            res.render('createTeam.hbs', { user, isAdmin });
            return;
        }
        res.render('createTeam.hbs', { user });
    });
}

function postCreateTeam(req, res) {
    const { name } = req.body;
    teamModel.create({ name }).then(team => {
        console.log(team);
        res.redirect('/');
    });
}

function getTeams(req, res) {
    const userId = authentication.checkForAuthentication(req, res);
    userModel.findById(userId).then(user => {
        if (user !== null && user.roles === 'Admin') {
            const isAdmin = true;
            res.render('teams-admin.hbs', { user, isAdmin });
            return;
        }
        res.render('teams-user.hbs', { user });
    });
}

module.exports = {
    getCreateTeam,
    postCreateTeam,
    getTeams
}