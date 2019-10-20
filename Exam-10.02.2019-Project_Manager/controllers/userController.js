const userModel = require('../models/user');
const jwt = require('../common/jwt');
const authentication = require('../common/authentication');

function getRegister(req, res) {
    const userId = authentication.checkForAuthentication(req, res);
    userModel.findById(userId).then(user => {
        console.log(user);
        res.render('register.hbs', { user });
    });
    //res.render('register.hbs');
}

function postRegister(req, res) {
    const { username, password, firstName, lastName, profilePicture } = req.body;
    if (profilePicture !== '') {
        userModel.create({ username, password, firstName, lastName, profilePicture }).then(user => {
            res.redirect('/login');
        }).catch(err => {
            console.log(err);
        });
    } else {
        userModel.create({ username, password, firstName, lastName }).then(user => {
            res.redirect('/login');
        }).catch(err => {
            console.log(err);
        });
    }
}

function getLogin(req, res) {
    res.render('login.hbs');
}

function postLogin(req, res) {
    const { username, password } = req.body;
    userModel.findOne({ username })
        .then(user => Promise.all([user, user.matchPassword(password)]))
        .then(([user, isMatch]) => {
            if (!isMatch) {
                res.render('login.hbs', {
                    error: {
                        loginError: 'Invalid username or password!'
                    }
                });
                return;
            }

            const jwtToken = jwt.create({ id: user.id });
            res.cookie('auth-token', jwtToken);
            res.redirect('/');
        }).catch(err => {
            res.render('login.hbs', {
                error: {
                    loginError: 'Invalid username or password!'
                }
            });
            return;
        });
}

function logout(req, res) {
    res.clearCookie('auth-token');
    res.redirect('/');
}

function profile(req, res) {
    const userId = authentication.checkForAuthentication(req, res);
    userModel.findById(userId).then(user => {
        if (user !== null && user.roles === 'Admin') {
            const isAdmin = true;
            res.render('profile.hbs', { user, isAdmin });
            return;
        }
        res.render('profile.hbs', { user });
    });
}

module.exports = {
    getRegister,
    postRegister,
    getLogin,
    postLogin,
    logout,
    profile
}