const userSchema = require('../models/user');

function getRegister(req, res) {
    res.render('register.hbs');
}

function postRegister(req, res) {
    const { username, password, repeatPassword } = req.body;
    if (password !== repeatPassword) {
        res.render('register.hbs', {
            errors: {
                repeatPassword: 'Passwords don\'t match!'
            }
        });
        return;
    }

    userSchema.create({ username, password }).then(() => {
        res.redirect('/login');
    }).catch(err => {
        res.render('register.hbs', {
            errors: {
                username: 'Username already exist!'
            }
        });
    });
}

function getLogin(req, res) {
    res.render('login.hbs');
}

function postLogin(req, res) {

}

function logout(req, res) {

}

module.exports = {
    getRegister,
    postRegister,
    getLogin,
    postLogin,
    logout
}