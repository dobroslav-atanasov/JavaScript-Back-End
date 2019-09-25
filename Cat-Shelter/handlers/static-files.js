const url = require('url');
const fs = require('fs');

function getContentType(currentUrl) {
    if (currentUrl.endsWith('css')) {
        return 'text/css';
    } else if (currentUrl.endsWith('js')) {
        return 'application/javascript';
    } else if (currentUrl.endsWith('png')) {
        return 'image/png';
    } else if (currentUrl.endsWith('html')) {
        return 'text/html';
    } else if (currentUrl.endsWith('ico')) {
        return 'image/png';
    } else if (currentUrl.endsWith('jpg')) {
        return 'image/png';
    }
}

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    if (pathname.startsWith('/content') && req.method === 'GET') {
        if (pathname.endsWith('png') || pathname.endsWith('jpeg') || pathname.endsWith('jpg') && req.method === 'GET') {
            fs.readFile(`./${pathname}`, (err, data) => {
                if (err) {
                    console.log(err);
    
                    res.writeHead(404, {
                        'Content-Type': 'text/plain'
                    });
    
                    res.write('Error was found');
                    res.end();
                    return;
                }
    
                console.log(pathname);
                res.writeHead(200, {
                    'Content-Type': getContentType(pathname)
                });
    
                res.write(data);
                res.end();
            });
        } else {
            fs.readFile(`.${pathname}`, 'utf-8', (err, data) => {
                if (err) {
                    console.log(err);
    
                    res.writeHead(404, {
                        'Content-Type': 'text/plain'
                    });
    
                    res.write('Error was found');
                    res.end();
                    return;
                }
    
                console.log(pathname);
                res.writeHead(200, {
                    'Content-Type': getContentType(pathname)
                });
    
                res.write(data);
                res.end();
            });
        }
    } else {
        return true;
    }
};