const jwt = require('jsonwebtoken');
const secret = 'secret';

function create(payloads) {
    const options = { expiresIn: '10m' };
    const token = jwt.sign(payloads, secret, options);

    return token;
}

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(toString, secret, (err, payloads) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(payloads);
        });
    });
}

module.exports = {
    create,
    verifyToken
}