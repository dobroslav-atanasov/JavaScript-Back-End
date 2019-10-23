const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');
const courseController = require('../controllers/courseController');
const courseValidator = require('../common/courseValidator');
const userValidator = require('../common/userValidator');

module.exports = (app) => {
    // Courses
    app.get('/course/create', courseController.getCreateCourse);
    app.post('/course/create', courseValidator, courseController.postCreateCourse);

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
};