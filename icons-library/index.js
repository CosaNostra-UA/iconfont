/**
 * Created by Mikhail Drakus on 18.02.16.
 * @returns {Object}
 *
 * {
 *   FOLDER_NAME: {
 *     ICON_NAME: '/full/path/to/icon-name.svg',
 *     ANOTHER_ICON: '/full/path/to/another_icon.svg',
 *     COOLICON: '/full/path/to/coolicon.svg'
 *   },
 *   ANOTHER_FOLDER: {}
 * }
 */
var fs = require('fs');

var ICONS = {};
var svgRE = new RegExp(/\.svg/i);

var walk = function(dir) {
    var results = [];
    var list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) results = results.concat(walk(file));
        else results.push(file)
    });
    return results;
};

walk(__dirname)
    .filter(function(path) {
        return svgRE.test(path);
    }).forEach(function(filePath) {
        var obj = ICONS;
        filePath
            .replace(__dirname, '')
            .replace('/', '')
            .replace(/-/g, '_')
            .toUpperCase()
            .split('/')
            .forEach(function(path, index, array) {
                path = path.replace(svgRE, '');
                obj[path] = obj[path] || {};

                if (array.length - 1 === index) {
                    obj[path] = filePath;
                }

                obj = obj[path];
            });
    });

module.exports = ICONS;
