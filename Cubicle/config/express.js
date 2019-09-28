const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

module.exports = (app) => {
    //TODO: Setup the view engine
    app.engine('.hbs', handlebars({ extname: '.hbs', defaultLayout: false }));

    //TODO: Setup the body parser
    app.use(bodyParser.urlencoded({ extended: false }));

    //TODO: Setup the static files
    app.use(express.static(path.resolve(__basedir, 'static')));

    // Set views
    app.set('views', path.resolve(__basedir, 'views'));
};