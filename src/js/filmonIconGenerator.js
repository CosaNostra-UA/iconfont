/**
 * Created by m_tsymbal on 12/28/15.
 */

var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
/*var fs = require('fs');*/
var path = require('path');
require('string.fromcodepoint');
var src = [];

function getUnicode(unicode){
    return unicode.map(function(code) {
        return String.fromCodePoint(parseInt(code.substr(1), 16));
    }).join('');
}

module.exports = function (fontName, data){
    for (var key in data){
        src.push('icons-library/' + key);
    }

    return gulp.src(src)
        .pipe(iconfont({
            fontName: fontName, // required
            formats: ['ttf', 'eot', 'woff', 'svg'],
            metadataProvider: function (filepath, cb) {
                var f = data[path.basename(filepath)];

                setImmediate( function() {
                    cb.call(null, null, {
                        path: filepath,
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