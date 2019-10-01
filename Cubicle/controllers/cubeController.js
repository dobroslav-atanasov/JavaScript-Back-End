const cube = require('../models/cube');

function index(req, res) {
    const cubes = cube.getAllCubes();

    res.render('index.hbs', {cubes});
}

function about(req, res) {
    res.render('about.hbs');
}

function getCreate(req, res) {
    res.render('create.hbs');
}

function postCreate(req, res) {
    const { name, imageUrl, description, difficultyLevel } = req.body;
    const cubeModel = cube.create(name, imageUrl, description, difficultyLevel);

    cube.add(cubeModel).then(() => {
        res.redirect('/');
    });
}

function details(req, res) {
    let id = +req.params.id;
    const searchedCube = cube.getCubeById(id);

    res.render('details.hbs', searchedCube);
}

function error(req, res) {
    res.render('404.hbs');
}

module.exports = {
    index,
    about,
    getCreate,
    postCreate,
    details,
    error
};