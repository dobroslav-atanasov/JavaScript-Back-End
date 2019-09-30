const cube = require('../models/cube');

function index(req, res) {
    res.render('index.hbs');
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
    cube.add(cubeModel).then(() =>{
        res.redirect('/');
    });
}

function details(req, res) {
    let id = req.params.id;

    const cube = {
        id: 1,
        name: 'cube1',
        description: 'cube 1 description',
        imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/41IpdljUeKL.jpg',
        difficultyLevel: 1
    }

    res.render('details.hbs', cube);
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