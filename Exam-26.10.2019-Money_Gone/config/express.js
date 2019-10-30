const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

module.exports = (app) => {
    app.use(cookieParser());
    app.engine('.hbs', handlebars({
        extname: '.hbs', defaultLayout: false, partialsDir: __basedir + '/views/partials', helpers: {
            toDate: function (date) { 
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            },
            toFullDate: function (date) { 
                return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
            },
        }
    }));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static(path.resolve(__basedir, 'static')));
    app.set('views', path.resolve(__basedir, 'views'));
};