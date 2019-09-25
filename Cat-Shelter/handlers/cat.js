const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable');
const breeds = require('../data/breeds');
const cats = require('../data/cats');

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    if (pathname === '/cats/add-cat' && req.method === 'GET') {
        let filePath = path.normalize(path.join(__filename, '../../views/addCat.html'));

        const index = fs.createReadStream(filePath);

        index.on('data', (data) => {
            let catBreedPlaceholder = breeds.map((breed) => `<option value="${breed}">${breed}</option>`)
            let modifiedData = data.toString().replace('{{catBreeds}}', catBreedPlaceholder);

            res.write(modifiedData);
        });

        index.on('end', () => {
            res.end();
        });

        index.on('error', (err) => {
            console.log(err);
        });

    } else if (pathname === '/cats/add-breed' && req.method === 'GET') {
        let filePath = path.normalize(path.join(__filename, '../../views/addBreed.html'));

        const index = fs.createReadStream(filePath);

        index.on('data', (data) => {
            res.write(data);
        });

        index.on('end', () => {
            res.end();
        });

        index.on('error', (err) => {
            console.log(err);
        });
    } else if (pathname === '/cats/add-cat' && req.method === 'POST') {
        let form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
            if (err) {
                console.log(err);
                throw err;
            }

            let oldpath = files.upload.path + '/' + files.upload.name;
            let newPath = path.normalize(path.join(__dirname, './content/images/' + files.upload.name));

            fs.rename(oldpath, newPath, function (err) {
                console.log('Files was uploaded successfully!');
            });

            fs.readFile('./data/cats.json', 'utf-8', (err, data) => {
                if (err) {
                    console.log(err);
                    throw err;
                }

                let allCats = JSON.parse(data);
                allCats.push({ id: allCats.length + 1, ...fields, image: files.upload.name });
                let json = JSON.stringify(allCats);

                fs.writeFile('./data/cats.json', json, () => {
                    res.writeHead(200, { location: '/' });
                    res.end();
                });
            });
        });

    } else if (pathname === '/cats/add-breed' && req.method === 'POST') {
        let formData = '';

        req.on('data', (data) => {
            formData += data;
        });

        req.on('end', () => {
            let body = qs.parse(formData);

            fs.readFile('./data/breeds.json', (err, data) => {
                if (err) {
                    console.log(err);
                    throw err;
                }

                let breeds = JSON.parse(data);
                breeds.push(body.breed);
                let json = JSON.stringify(breeds);

                fs.writeFile('./data/breeds.json', json, 'utf-8', () => {
                    console.log('The breed was added successfully!');
                });
            });

            res.writeHead(200, { location: '/' });
            res.end();
        });
    } else if (pathname.includes('/cats-edit') && req.method === 'GET') {
        let filePath = path.normalize(path.join(__filename, '../../views/editCat.html'));

        const index = fs.createReadStream(filePath);

        index.on('data', (data) => {
            let lastSlashIndex = pathname.lastIndexOf('/');
            let catId = parseInt(pathname.substr(lastSlashIndex + 1));
            let currentCat = cats.find(x => x.id === catId);
            let modifiedData = data.toString().replace('{{id}}', catId);
            modifiedData = modifiedData.replace('{{name}}', currentCat.name);
            modifiedData = modifiedData.replace('{{description}}', currentCat.description);

            const breedsAsOptions = breeds.map((breed) => `<option value="${breed}">${breed}</option>`);
            modifiedData = modifiedData.replace('{{catBreeds}}', breedsAsOptions.join('/'));

            res.write(modifiedData);
        });

        index.on('end', () => {
            res.end();
        });

        index.on('error', (err) => {
            console.log(err);
        });
    } else if (pathname.includes('/cats-find-new-home') && req.method === 'GET') {
        let filePath = path.normalize(path.join(__filename, '../../views/catShelter.html'));

        const index = fs.createReadStream(filePath);

        index.on('data', (data) => {
            let lastSlashIndex = pathname.lastIndexOf('/');
            let catId = parseInt(pathname.substr(lastSlashIndex + 1));
            console.log(catId);
            let currentCat = cats.find(x => x.id === catId);
            let modifiedData = data.toString().replace('{{id}}', catId);
            modifiedData = modifiedData.replace('{{name}}', currentCat.name);
            modifiedData = modifiedData.replace('{{description}}', currentCat.description);
            modifiedData = modifiedData.replace('{{breed}}', `<option value="${currentCat.breed}">${currentCat.breed}</option>`);

            res.write(modifiedData);
        });

        index.on('end', () => {
            res.end();
        });

        index.on('error', (err) => {
            console.log(err);
        });
    } else if (pathname.includes('/cats-edit') && req.method === 'POST') {

    } else if (pathname.includes('/cats-find-new-home') && req.method === 'POST') {

    } else {
        return true;
    }
};