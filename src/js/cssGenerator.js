/**
 * Created by m_tsymbal on 1/14/16.
 */
'use strict';
var fs = require('fs');
var path = require('path');
var Stream = require('readable-stream');//stream').Duplex;
var gutil = require('gulp-util');

//var PLUGIN_NAME = 'cssGenerator';

function css(fontName, inputData) {
    console.log(inputData);
    var content = '@font-face { \n' +
        'font-family: "' + fontName + '"; \n' +
        'src:url("fonts/' + fontName + '.eot?coxx6d"); \n' +
        'src:url("fonts/' + fontName + '.eot?coxx6d#iefix") format("embedded-opentype"), \n' +
        'url("fonts/' + fontName + '.ttf?coxx6d") format("truetype"), \n' +
        'url("fonts/' + fontName + '.woff?coxx6d") format("woff"), \n' +
        'url("fonts/' + fontName + '.svg?coxx6d#' + fontName + '") format("svg"); \n' +
        'font-weight: normal; \n' +
        'font-style: normal; \n' +
        '} \n' +
        '[class^="icon-"], [class*=" icon-"] { \n' +
        '/!* use !important to prevent issues with browser extensions that change fonts *!/ \n' +
        'font-family: "' + fontName + '" !important; \n' +
        'speak: none; \n' +
        'font-style: normal; \n' +
        'font-weight: normal; \n' +
        'font-variant: normal; \n' +
        'text-transform: none; \n' +
        'line-height: 1; \n' +
        '/!* Better Font Rendering =========== *!/ \n' +
        '-webkit-font-smoothing: antialiased; \n' +
        '-moz-osx-font-smoothing: grayscale; \n' +
        '} \n';

    for ( var key in inputData ) {
        var icon = (inputData[key].name).substr(0, 5) === 'icon-' ? '.' : '.icon-';
        content = content + icon + inputData[key].name +
            ':before { \n' +
            'content: "\\' + (inputData[key].unicode).forEach(function(e){console.log(e.substr(1)); return e.substr(1) + ';'}) + '"; } \n';
    }
    return content;
}

module.exports  = function (options) {
    var stream = new Stream.Transform({objectMode: true});

    options = options || {};
    options.clone = options.clone || false;
//throw new gutil.PluginError('svgicons2svgfont', 'Missing options.fontName');
    stream._transform = function (file, unused, done) {
        var currentStream;
        var newFile;

        // When null just pass through
        if(file.isNull()) {
            stream.push(file); done();
            return;
        }

        // If the ext doesn't match, pass it through
        if('.svg' !== path.extname(file.path)) {
            stream.push(file); done();
            return;
        }

        if(options.clone) {
            if(file.isBuffer()) {
                stream.push(file.clone());
            } else {
                currentStream = file.contents;
                file.contents = null;
                newFile = file.clone();
                file.contents = currentStream.pipe(new Stream.PassThrough());
                newFile.contents = currentStream.pipe(new Stream.PassThrough());
                stream.push(newFile);
            }
        }

        file.path = gutil.replaceExtension(file.path, '.css');

        // Buffers
        if(file.isBuffer()) {
            try {
                file.contents = new Buffer(css(options.fontName, options.inputData));
            } catch(err) {
                stream.emit('error', new gutil.PluginError(PLUGIN_NAME, err, {
                    showStack: true
                }));
            }
            // Streams
        } else {
            //file.contents = file.contents.pipe(new BufferStreams());
        }

        stream.push(file);
        done();
    };

    return stream;
};