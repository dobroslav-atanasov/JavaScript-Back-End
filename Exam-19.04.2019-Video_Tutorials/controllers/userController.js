const userModel = require('../models/user');
const jwt = require('../common/jwt');
const authentication = require('../common/authentication');

function getRegister(req, res) {
    const userId = authentication.checkForAuthentication(req, res);
    userModel.findById(userId).then(user => {
        res.render('register.hbs', { user });
    });
}

function postRegister(req, res) {
    const { username, password, repeatPassword } = req.body;
    if (password !== repeatPassword) {
        res.render('register.hbs', {
            error: {
                repeatPassword: 'Your password and confirmation password do not match.'
            }
        });
        return;
    }

    userModel.findOne({ username: username }).then(userInDb => {
        if (userInDb !== null) {
            res.render('register.hbs', {
                error: {
                    usernameExist: `${userInDb.username} username  already exist!`
                }
            });
            return;
        }

        userModel.create({ username, password }).then(user => {
            res.redirect('/login');
        }).catch(err => {
            if (err.name === 'ValidationError') {
                res.render('register.hbs', {
                    error: err.errors
                });
            }
        });
    });
}

function getLogin(req, res) {
    const userId = authentication.checkForAuthentication(req, res);
    userModel.findById(userId).then(user => {
        res.render('login.hbs', { user });
    });
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
            if (!isMatch) {
                res.render('login.hbs', {
                    error: {
                        loginError: 'Invalid username or password!'
                    }
                });
                return;
            }
        });
}

function logout(req, res) {
    res.clearCookie('auth-token');
    res.redirect('/');
}

module.exports = {
    getRegister,
    postRegister,
    getLogin,
    postLogin,
    logout
}