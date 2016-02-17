/**
 * Created by m_tsymbal on 1/14/16.
 */
'use strict';
var fs = require('fs');
var path = require('path');
var Stream = require('readable-stream');
var gutil = require('gulp-util');

function cssFileContent(baseFontIconPath, className, fontName, inputData) {
    var content = '@font-face { \n' +
        'font-family: "' + className + '"; \n' +
        'src:url("' + baseFontIconPath + className + '/' + fontName + '.eot"); \n' +
        'src:url("' + baseFontIconPath + className + '/' + fontName + '.eot?#iefix") format("eot"), \n' +
        'url("' + baseFontIconPath + className + '/' + fontName + '.ttf") format("truetype"), \n' +
        'url("' + baseFontIconPath + className + '/' + fontName + '.woff") format("woff"), \n' +
        'url("' + baseFontIconPath + className + '/' + fontName + '.woff2") format("woff2"), \n' +
        'url("' + baseFontIconPath + className + '/' + fontName + '.svg#' + fontName + '") format("svg"); \n' +
        'font-weight: normal; \n' +
        'font-style: normal; \n' +
        '} \n \n' +
        '.' + className + ' { \n' +
        'font-family: "' + className + '"; \n' +
        'speak: none; \n' +
        'font-style: normal; \n' +
        'font-weight: normal; \n' +
        'font-variant: normal; \n' +
        'text-transform: none; \n' +
        'line-height: 1; \n' +
        '-webkit-font-smoothing: antialiased; \n' +
        '-moz-osx-font-smoothing: grayscale; \n' +
        '} \n \n';

    for ( var key in inputData ) {
        content = content + '.' + className + '.' + inputData[key].name +
            ':before { \n' +
            'content: "' +
            '\\' + (inputData[key].unicode).toString(16).toUpperCase() + ';"  \n } \n';
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
            file.contents = new Buffer(cssFileContent(options.baseFontIconPath, options.className, options.fontName, options.inputData));
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