const cubeController = require('../controllers/cubeController');

module.exports = (app) => {
    app.get('/details/:id', cubeController.details);
    app.get('/create', cubeController.getCreateCube);
    app.post('/create', cubeController.postCreateCube);
    app.get('/about', cubeController.about);
    app.get('/', cubeController.index);
    app.get('*', cubeController.notFound);
};