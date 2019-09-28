// TODO: Require Controllers...
const cubeController = require('../controllers/cubeController');

module.exports = (app) => {
    // TODO...
    app.get('/', cubeController.index);
};