module.exports = {
    development: {
        port: process.env.PORT || 5555,
        connectionString: 'mongodb://localhost:27017/cubicle'
    },
    production: {}
};