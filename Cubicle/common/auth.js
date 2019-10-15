const jwt = require('../common/jwt');
const userSchema = require('../models/user');

function auth(redirectUnauthenticated = true) {
    return function (req, res, next) {
        const token = req.cookies['auth-token'] || '';
        Promise.all([
            jwt.verifyToken(token)
        ]).then(data => {
            userSchema.findById(data.id).then(user => {
                req.user = user;
                next();
            });
        }).catch(err => {
            next(err);
        });
    };
}

module.exports = { 
    auth 
};