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

            Promise.all([
                userModel.find({}),
                teamModel.find({})
            ]).then(([users, teams]) => {
                res.render('teams-admin.hbs', { user, isAdmin, users, teams });
            });
            return;
        }

        const { search } = req.query;
        let query = {};

        if (search) {
            query = { ...query, name: { $regex: search } };
        }

        teamModel.find(query).populate('projects').populate('members').then(teams => {
            res.render('teams-user.hbs', { user, teams });
        });
    });
}

function postTeams(req, res) {
    const { userId, teamId } = req.body;

    Promise.all([
        teamModel.updateOne({ _id: teamId }, { $push: { members: userId } }),
        userModel.updateOne({ _id: userId }, { $push: { teams: teamId } }),
    ]).then(() => {
        res.redirect('/');
    }).catch(err => {
        console.log(err);
    });
}

function leaveTeam(req, res) {
    const userId = authentication.checkForAuthentication(req, res);
    const teamId = req.params.id;

    Promise.all([
        teamModel.findByIdAndUpdate(teamId, { $pull: { 'members': userId } }),
        userModel.findByIdAndUpdate(userId, { $pull: { 'teams': teamId } })
    ]).then(() => {
        res.redirect('/profile');
    });
}

module.exports = {
    getCreateTeam,
    postCreateTeam,
    getTeams,
    postTeams,
    leaveTeam
}