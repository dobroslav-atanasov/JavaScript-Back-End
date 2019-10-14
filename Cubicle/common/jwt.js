const jwt = require('jsonwebtoken');
const secret = 'secret';

function create(payloads) {
    const options = { expiresIn: '10m' };
    const token = jwt.sign(payloads, secret, options);

    return token;
}

function verifyToken(token) {
    const data = jwt.verify(token, secret);

    return data;
    
}

module.exports = {
    create,
    verifyToken
}