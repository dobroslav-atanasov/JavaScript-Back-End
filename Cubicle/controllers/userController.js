function getRegister(req, res) {
    res.render('registerPage.hbs');
}

function postRegister(req, res) {
    
}

function getLogin(req, res) {
    res.render('loginPage.hbs');
}

function postLogin(req, res) {
    
}

function logout(req, res) {
    
}

module.exports = {
    getRegister,
    postRegister,
    getLogin,
    postLogin,
    logout
}