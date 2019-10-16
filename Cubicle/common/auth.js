function checkForAuthentication(req, res) {
    return function (req, res, next) {
        const token = req.cookies['auth-token'] || '';
        jwt.verifyToken(token).then(data => {
            userSchema.findById(data.id).then(user => {
                req.user = user;
            });
        }).catch(err => {
            console.log(err);
        });
    };
}

module.exports = { auth };