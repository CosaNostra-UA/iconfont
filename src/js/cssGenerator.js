/**
 * Created by m_tsymbal on 1/14/16.
 */
'use strict';
var fs = require('fs');
var path = require('path');
var Stream = require('readable-stream');
var gutil = require('gulp-util');

function cssFileContent(fontName, inputData) {
    var content = '@font-face { \n' +
        'font-family: "' + fontName + '"; \n' +
        'src:url("fonts/' + fontName + '.eot?coxx6d"); \n' +
        'src:url("fonts/' + fontName + '.eot?coxx6d#iefix") format("embedded-opentype"), \n' +
        'url("fonts/' + fontName + '.ttf?coxx6d") format("truetype"), \n' +
        'url("fonts/' + fontName + '.woff?coxx6d") format("woff"), \n' +
        'url("fonts/' + fontName + '.svg?coxx6d#' + fontName + '") format("svg"); \n' +
        'font-weight: normal; \n' +
        'font-style: normal; \n' +
        '} \n \n' +
        '[class^="icon-"], [class*=" icon-"] { \n' +
        '/!* use !important to prevent issues with browser extensions that change fonts *!/ \n' +
        'font-family: "' + fontName + '" !important; \n' +
        'speak: none; \n' +
        'font-style: normal; \n' +
        'font-weight: normal; \n' +
        'font-variant: normal; \n' +
        'text-transform: none; \n' +
        'line-height: 1; \n \n' +
        '/!* Better Font Rendering =========== *!/ \n' +
        '-webkit-font-smoothing: antialiased; \n' +
        '-moz-osx-font-smoothing: grayscale; \n' +
        '} \n \n';

    for ( var key in inputData ) {
        var icon = (inputData[key].name).substr(0, 5) === 'icon-' ? '.' : '.icon-';
        content = content + icon + inputData[key].name +
            ':before { \n' +
            'content: "' +
            (inputData[key].unicode).map(function(char) {
                return '\\' + char.toString().replace(/\s+/g,'') + ';';
            }).join('') + '"  \n } \n';
    }
    return content;
}

module.exports  = function (options) {
    var stream = new Stream.Transform({objectMode: true});

    options = options || {};

    if( !options.fontName ){
        throw new gutil.PluginError('cssGenerator', 'Missing options.fontName');
    }

    if( !options.inputData ){
        throw new gutil.PluginError('cssGenerator', 'Missing options.inputData');
    }

    stream._transform = function (file, unused, done) {

        // When null just pass through
        if(file.isNull()) {
            stream.push(file); done();
            return;
        }

        if('.svg' === path.extname(file.path)) {
            stream.push(file.clone());
            file.contents = new Buffer(cssFileContent(options.fontName, options.inputData));
        }
        else {
            stream.push(file);
            done();
            return;
        }

        file.path = gutil.replaceExtension(file.path, '.css');
        stream.push(file);
        done();
    };

    return stream;
};