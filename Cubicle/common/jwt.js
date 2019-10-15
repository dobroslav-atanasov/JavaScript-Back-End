const jwt = require('jsonwebtoken');
const secret = 'secret';

function create(payloads) {
    return jwt.sign(payloads, secret);
}

function verifyToken(token) {
    return jwt.verify(token, secret);

}

module.exports = {
    create,
    verifyToken
}