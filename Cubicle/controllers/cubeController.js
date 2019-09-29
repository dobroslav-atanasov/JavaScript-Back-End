function index(req, res) {
    res.render('index.hbs');
}

function about(req, res) {
    res.render('about.hbs');
}

function create(req, res) {
    res.render('create.hbs');
}

module.exports = {
    index,
    about,
    create
};