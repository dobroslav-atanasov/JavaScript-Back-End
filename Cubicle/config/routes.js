const cubeController = require('../controllers/cubeController');
const accessoryController = require('../controllers/accessoryController');

module.exports = (app) => {
    app.get('/details/:id', cubeController.details);
    app.get('/create/accessory', accessoryController.getCreateAccessory);
    app.post('/create/accessory', accessoryController.postCreateAccessory);
    app.get('/create', cubeController.getCreateCube);
    app.post('/create', cubeController.postCreateCube);
    app.get('/about', cubeController.about);
    app.get('/', cubeController.index);
    app.get('*', cubeController.notFound);
};