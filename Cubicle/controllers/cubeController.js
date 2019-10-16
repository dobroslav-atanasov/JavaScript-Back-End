const cubeSchema = require('../models/cube');
const jwt = require('../common/jwt');
const authentication = require('../common/authentication');

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

    const auth = authentication.checkForAuthentication(req, res);
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
    const creatorId = jwt.verifyToken(req.cookies['auth-token']).id;
    const { name, imageUrl, description, difficultyLevel } = req.body;
    cubeSchema.create({ name, imageUrl, description, difficultyLevel, creatorId }).then(cube => {
        console.log(cube);
        res.redirect('/');
    }).catch(err => {
        console.log(err);
    });
}

function about(req, res) {
    const auth = authentication.checkForAuthentication(req, res);
    res.render('about.hbs', { auth });
}

function notFound(req, res) {
    const auth = authentication.checkForAuthentication(req, res);
    res.render('notFound.hbs', { auth });
}

module.exports = {
    index,
    notFound,
    about,
    getCreateCube,
    postCreateCube,
    details
}