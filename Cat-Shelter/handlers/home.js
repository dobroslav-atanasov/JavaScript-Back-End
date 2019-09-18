const url = require('url');
const fs = require('fs');
const path = require('path');
const cats = require('../da/cats');
const breeds = require('../data/breeds');

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    if (pathname === '/' && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '../views/home/index.html'));
    } else {
        return true;
    }
}