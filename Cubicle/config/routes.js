const cubeController = require('../controllers/cubeController');
const accessoryController = require('../controllers/accessoryController');
const userController = require('../controllers/userController');
const auth = require('../common/auth');

module.exports = (app) => {
    app.get('/logout', userController.logout);
    app.post('/login', userController.postLogin);
    app.get('/login', userController.getLogin);
    app.post('/register', userController.postRegister);
    app.get('/register', userController.getRegister);
    app.get('/attach/accessory/:id', accessoryController.getAttachAccessory);
    app.post('/attach/accessory/:id', accessoryController.postAttachAccessory);
    app.get('/details/:id', cubeController.details);
    app.get('/create/accessory', accessoryController.getCreateAccessory);
    app.post('/create/accessory', accessoryController.postCreateAccessory);
    app.get('/create', cubeController.getCreateCube);
    app.post('/create', cubeController.postCreateCube);
    app.get('/about', cubeController.about);
    app.get('/', auth.auth(), cubeController.index);
    app.get('*', cubeController.notFound);
};