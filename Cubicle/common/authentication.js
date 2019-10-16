function checkForAuthentication(req, res) {
    let auth = false;
    if (req.cookies['auth-token'] !== undefined) {
        auth = true;
    }

    return auth;
}

module.exports = {
    checkForAuthentication
};