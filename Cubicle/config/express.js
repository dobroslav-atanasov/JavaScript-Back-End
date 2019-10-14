const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');

module.exports = (app) => {
    // Setup cookie parser
    app.use(cookieParser());

    // Setup the view engine
    app.engine('.hbs', handlebars({ extname: '.hbs', defaultLayout: false }));

    // Setup the body parser
    app.use(bodyParser.urlencoded({ extended: false }));

    // Setup the static files
    app.use(express.static(path.resolve(__basedir, 'static')));

    // Set views
    app.set('views', path.resolve(__basedir, 'views'));
};