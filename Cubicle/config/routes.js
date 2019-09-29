// TODO: Require Controllers...
const cubeController = require('../controllers/cubeController');

module.exports = (app) => {
    // TODO...
    app.get('/create', cubeController.create);
    app.get('/about', cubeController.about);
    app.get('/', cubeController.index);
};