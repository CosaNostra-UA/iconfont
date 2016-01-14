/**
 * Created by m_tsymbal on 1/14/16.
 */
var fs = require('fs');

module.exports = function(fontName, inputData){
    var content = '@font-face {' +
    'font-family: "' + fontName + '";' +
    'src:url("fonts/' + fontName + '.eot?coxx6d");' +
    'src:url("fonts/' + fontName + '.eot?coxx6d#iefix") format("embedded-opentype"),' +
        'url("fonts/' + fontName + '.ttf?coxx6d") format("truetype"),' +
        'url("fonts/' + fontName + '.woff?coxx6d") format("woff"),' +
        'url("fonts/' + fontName + '.svg?coxx6d#' + fontName +'") format("svg");' +
    'font-weight: normal;' +
    'font-style: normal;' +
    '}' +
    '[class^="icon-"], [class*=" icon-"] {' +
        '/!* use !important to prevent issues with browser extensions that change fonts *!/' +
        'font-family: "' + fontName + '" !important;' +
        'speak: none;' +
        'font-style: normal;' +
        'font-weight: normal;' +
        'font-variant: normal;' +
        'text-transform: none;' +
        'line-height: 1;' +
        '/!* Better Font Rendering =========== *!/' +
        '-webkit-font-smoothing: antialiased;' +
        '-moz-osx-font-smoothing: grayscale;' +
    '}';

    for (var key in inputData) {
        var icon = (inputData[key].name).substr(0, 5) === 'icon-' ? '.' : '.icon-';
        content = content + icon + inputData[key].name +
                ':before { \n' +
                'content: "\\' + (inputData[key].unicode).substr(1) + '"; } \n';
    }

    fs.writeFile('public/fonts/' + fontName + '/' + fontName + '.css', content);
};