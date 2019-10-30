const { body } = require('express-validator');

module.exports = [
    body('username', 'Username should be at least 4 symbols!')
        .isLength({ min: 4 }),
    body('username', 'Username should contain only letters and digits!')
        .isAlphanumeric(),
    body('password', 'Password should be at least 8 symbols!')
        .isLength({ min: 8 }),
    body('password', 'Password should contain only letters and digits!')
        .isAlphanumeric(),
    body('amount')
        .custom((value) => {
            if (+value < 0) {
                throw new Error('Amount should be more than 0!');
            }
            return true;
        })
]