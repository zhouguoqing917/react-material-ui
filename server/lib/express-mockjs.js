const fs = require('fs');
const path = require('path');

const Mock = require('mockjs');
const walkdir = require('./walkdir');
const Random = Mock.Random;

const template = fs.readFileSync(path.join(__dirname, 'doc.html'), 'utf8');
const RE = /^\s*\/\*[*\s]+?([^\r\n]+)[\s\S]+?@url\s+([^\n]+)[\s\S]+?\*\//im;
const RP = /^\s*\/\*\*(.|\s)*?\*\//im;

function mock(dir) {
    const routes = {}; // routes list
    walkdir(dir, /\.js(on)?$/i, function (filepath) {
        // console.log(`mock walkdir ==> ${filepath}`);
        let content = String(fs.readFileSync(filepath, 'utf8')).trim() || '{}';
        let url = filepath;
        let describe = 'no description';
        let comment = '';

        let m = content.match(RE);
        let rp = content.match(RP);

        if (m) {
            url = m[2].trim();
            describe = m[1].replace(/(^[\s*]+|[\s*]+$)/g, '');
        }
        if(rp){
           comment = rp[0];
           comment = comment.replace(/(\r\n|\n)/g, '');
           let cr  = comment.split('*');

           let ncr=[];
           cr.forEach((v,i)=>{
               let c=v.trim();
               if(c && c.length>1){
                     ncr.push(`<p>${c}</p>`);
               }
           });
           comment = ncr.join('');

        }

        if (url[0] !== '/') { // fix url path
            url = '/' + url;
        }

        let pathname = url;
        if (pathname.indexOf('?') > -1) {
            pathname = pathname.split('?')[0];
        }

        if (mock.debug && routes[pathname]) {
            console.warn('[Mock Warn]: [' + filepath + ': ' + pathname + '] already exists and has been covered with new data.');
        }

        routes[pathname] = {
            url: url,
            filepath: filepath,
            describe: describe,
            comment:  comment,
        };

        if (/\.js$/.test(filepath)) {
            routes[pathname].data = require(filepath);
        } else {
            try {
                routes[pathname].data = new Function('return (' + content + ')')();
            } catch (e) {
                delete routes[pathname];
                mock.debug && console.warn('[Mock Warn]:', e);
            }
        }
    });


    return function (req, res, next) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE,PATCH');

        let allowedHeaders = req.headers['access-control-request-headers'];
        if (allowedHeaders) {
            res.set('Access-Control-Allow-Headers', allowedHeaders);
        }

        if (req.method === 'OPTIONS') {
            return res.send('');
        }

        let url = req.url.split('?')[0];

        if (url === '/') { // api document page
            let host = req.protocol + '://' + req.headers.host + req.baseUrl;
            console.log(host);
            let list = Object.keys(routes).sort().map(function (path) {
                let route = routes[path];
                return {
                    title: route.describe,
                    url: host + route.url,
                    file: route.filepath,
                    comment :route.comment,
                };
            });

            return res.end(template.replace('@menuList', JSON.stringify(list)));
        }

        let data = (routes[url] || 0).data;

        if (data) {
            if (typeof data === 'function') {
                data = data(req, Mock, Random);
            }
            res.json(Mock.mock(data));
        } else {
            next();
        }
    };
}

mock.debug = true;
module.exports = mock;
