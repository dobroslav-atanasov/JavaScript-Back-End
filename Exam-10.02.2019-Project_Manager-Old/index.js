const env = process.env.NODE_ENV || 'development';
const databaseConnector = require('./config/database');
const seedAdmin = require('./common/seedAdmin');

global.__basedir = __dirname;

databaseConnector().then(() => {
    const config = require('./config/config')[env];
    const app = require('express')();
    
    require('./config/express')(app);
    require('./config/routes')(app);

    seedAdmin.addAdmin();
    app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));
}).catch(err => {
    console.log(err);
});