/**
 * Created by m_tsymbal on 12/28/15.
 */

var gulp     = require('gulp');
var iconfont = require('gulp-iconfont');
var path     = require('path');
var srcIcons = require('../config.json').srcIcons;
require('string.fromcodepoint');
var src = [];

function getUnicode(unicode) {
    return String.fromCodePoint(parseInt(unicode, 16));
}

module.exports = function (fontName, data){
    for (var key in data){
        src.push(srcIcons + key);
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
        });
};