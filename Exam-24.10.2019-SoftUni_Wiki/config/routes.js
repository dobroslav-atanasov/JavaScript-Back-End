const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');
const articleController = require('../controllers/articleController');
const userValidator = require('../common/userValidator');
const articleValidator = require('../common/articleValidator');

module.exports = (app) => {
    // Articles
    app.get('/search', articleController.search);
    app.get('/delete/:id', articleController.getDelete);
    app.post('/edit/:id', articleValidator, articleController.postEdit);
    app.get('/edit/:id', articleController.getEdit);
    app.get('/article/:id', articleController.getArticle);
    app.post('/create', articleValidator, articleController.postCreate);
    app.get('/create', articleController.getCreate);
    app.get('/all-articles', articleController.getAllArticles);

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