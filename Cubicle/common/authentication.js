const jwt = require('../common/jwt');

function checkForAuthentication(req, res) {
    let auth = false;
    if (req.cookies['auth-token'] !== undefined) {
        auth = true;
    }

    return auth;
}

function checkForAuthorization(req, res, cube) {
    let auth = false;
    const creatorId = jwt.verifyToken(req.cookies['auth-token']).id;
    if (cube.creatorId === creatorId) {
        auth = true;
    }

    return auth;
}

module.exports = {
    checkForAuthentication,
    checkForAuthorization
};