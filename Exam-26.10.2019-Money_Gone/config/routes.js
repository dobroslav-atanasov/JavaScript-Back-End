const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');
const expenseController = require('../controllers/expenseController');
const userValidator = require('../common/userValidator');
const expenseValidator = require('../common/expenseValidator');
const refillValidator = require('../common/refillValidator');

module.exports = (app) => {
    // Expenses
    app.get('/delete/:id', expenseController.getDelete);
    app.get('/report/:id', expenseController.getReport);
    app.get('/new-expense', expenseController.getCreateExpense);
    app.post('/new-expense', expenseValidator, expenseController.postCreateExpense);

    // Account Info
    app.get('/account-info', userController.getAccountInfo);

    // Refill
    app.post('/refill', refillValidator, userController.refill);

    // Logout User
    app.get('/logout', userController.logout);
    
    // Register User
    app.get('/register', userController.getRegister);
    app.post('/register', userValidator, userController.postRegister);

    // Login User
    app.get('/login', userController.getLogin);
    app.post('/login', userController.postLogin);

    // Home page
    app.get('/', homeController.index);

    // Not found page
    app.get('*', homeController.notFound);
};