const { body } = require('express-validator');

module.exports = [
    body('merchant', 'Merchant should be at least 4 symbols long!')
        .isLength({ min: 4 }),
    body('description', 'Description should be at least 10 symbols long!')
        .isLength({ min: 10 }),
    body('description', 'Description is more than 50 symbols!')
        .isLength({ max: 50 }),
    body('total')
        .custom((value) => {
            if (isNaN(value)) {
                throw new Error('Total should be a number!');
            }
            return true;
        }),
    body('total')
        .custom((value) => {
            if (value <= 0) {
                throw new Error('Total should be positive number!');
            }
            return true;
        }),
    body('category')
        .custom((value) => {
            if (value === undefined) {
                throw new Error('You should be select category!');
            }
            return true;
        })
]