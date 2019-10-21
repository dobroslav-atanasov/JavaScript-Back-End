const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');
const teamController = require('../controllers/teamController');
const projectController = require('../controllers/projectController');

module.exports = (app) => {
    app.post('/leave/:id', teamController.leaveTeam);

    // Project
    app.post('/projects', projectController.postProjects);
    app.get('/projects', projectController.getProjects);
    app.post('/create-project', projectController.postCreateProject);
    app.get('/create-project', projectController.getCreateProject);

    // Team
    app.post('/teams', teamController.postTeams);
    app.get('/teams', teamController.getTeams);
    app.post('/create-team', teamController.postCreateTeam);
    app.get('/create-team', teamController.getCreateTeam);

    app.get('/profile', userController.profile);
    // Logout User
    app.get('/logout', userController.logout);

    // Register User
    app.post('/register', userController.postRegister);
    app.get('/register', userController.getRegister);
    
    // Login User
    app.get('/login', userController.getLogin);
    app.post('/login', userController.postLogin);
    
    // Home page
    app.get('/', homeController.index);
};