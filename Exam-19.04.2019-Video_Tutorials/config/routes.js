const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');
const courseController = require('../controllers/courseController');

module.exports = (app) => {
    // Courses
    app.get('/create-course', courseController.getCreateCourse);

    // Logout User
    app.get('/logout', userController.logout);
    
    // Register User
    app.get('/register', userController.getRegister);
    app.post('/register', userController.postRegister);

    // Login User
    app.get('/login', userController.getLogin);
    app.post('/login', userController.postLogin);

    // Home page
    app.get('/', homeController.index);
};