const fs = require('fs');
const join = require('path').join;
const matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;


module.exports = function(path, type, callback) {
    if (typeof type === 'function') {
        callback = type;
    } else {
        if (typeof type === 'string') {
            type = RegExp(escapeRegexp(type) + '$', 'i');
        } else if (type instanceof Array) {
            type = '(?:' + type.map(escapeRegexp).join('|') + ')$';
            type = RegExp(type, 'i');
        }
    }

    if (!(type instanceof RegExp)) {
        type = /./;
    }

    walkdir(path, function(file, stat) {
        if (type.test(file)) {
            callback && callback(file, stat);
        }
    });
};


function escapeRegexp(str) {
    return str.replace(matchOperatorsRe, '\\$&');
}


function walkdir(path, callback) {
    fs.readdir(path, function(err, files) {
        if (err) {
            throw new Error(err);
        }

        files.forEach(function(name) {
            let filePath = join(path, name);
            fs.stat(filePath, function(err, stat) {
                if (err) {
                    throw new Error(err);
                }
                if (stat.isFile()) {
                    callback(filePath, stat);
                } else if (stat.isDirectory()) {
                    walkdir(filePath, callback);
                }
            });
        });

    });
}
