const cubeSchema = require('../models/cube');
const jwt = require('../common/jwt');
const userSchema = require('../models/user');

// 1 all pages view menu
// 2 authorization

function index(req, res) {
    const { search, from, to } = req.query;
    let query = {};

    if (search) {
        query = { ...query, name: { $regex: search } };
    }

    if (to) {
        query = { ...query, difficultyLevel: { $lte: +to } };
    }

    if (from) {
        query = { ...query, difficultyLevel: { ...query.difficultyLevel, $gte: +from } };
    }

    let auth = false;
    if (req.cookies['auth-token'] !== undefined) {
        auth = true;
    }

    cubeSchema.find(query).then(cubes => {
        res.render('index.hbs', { cubes, search, from, to, auth });
    }).catch(err => {
        console.log(err);
    });
}

function details(req, res) {
    const cubeId = req.params.id;

    cubeSchema.findById(cubeId).populate('accessories').then(cube => {
        res.render('details.hbs', { cube });
    }).catch(err => {
        console.log(err);
    });
}

function getCreateCube(req, res) {
    res.render('create.hbs');
}

function postCreateCube(req, res) {
    const { name, imageUrl, description, difficultyLevel } = req.body;
    cubeSchema.create({ name, imageUrl, description, difficultyLevel }).then(cube => {
        console.log(cube);
        res.redirect('/');
    }).catch(err => {
        console.log(err);
    });
}

function about(req, res) {
    res.render('about.hbs');
}

function notFound(req, res) {
    res.render('notFound.hbs');
}

module.exports = {
    index,
    notFound,
    about,
    getCreateCube,
    postCreateCube,
    details
}