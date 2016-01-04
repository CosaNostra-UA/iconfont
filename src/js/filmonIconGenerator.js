/**
 * Created by m_tsymbal on 12/28/15.
 */

var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var fs = require('fs');
var data = require('../inputData.json');
require('string.fromcodepoint');
var src = [];

function getFileProperties(data, file){
    file = file.replace(/^.*[\\\/]/, '');
    for (var key in data){
        if(key === file){
            return data[key];
        }
    }
}

function getUnicode(unicode){
    return unicode.map(function(code) {
        return String.fromCodePoint(parseInt(code.substr(1), 16));
    }).join('');
}

module.exports = function (fontName){
    for (var key in data){
        src.push('icons-library/' + key);
    }

    return gulp.src(src)
        .pipe(iconfont({
            fontName: fontName, // required
            formats: ['ttf', 'eot', 'woff', 'svg'],
            metadataProvider: function (file, cb) {
                var f = getFileProperties(data, file);

                setImmediate( function() {
                    cb.call(null, null, {
                        path: file,
                        name: f.name,
                        unicode: [getUnicode(f.unicode)],
                        renamed: false
                    });
                });
            }
        }))
        .on('glyphs', function(glyphs, options) {
            // CSS templating, e.g.
            console.log(glyphs, options);
        })
        .pipe(gulp.dest('public/fonts/'));
};