/**
 * Created by m_tsymbal on 12/28/15.
 */

var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var fs = require('fs');

var i = 1000;
require('string.fromcodepoint');

function getFileName(file){
    return file.replace(/^.*[\\\/]/, '');
}

module.exports =  function(){
    var content = JSON.parse(fs.readFileSync('src/inputData.json', 'utf8'));

    var src = content.map(function (file) {
        return 'icons-library/' + file.name + '.svg';
    });

    return gulp.src(src)
        .pipe(iconfont({
            fontName: 'myfont', // required
            formats: ['ttf', 'eot', 'woff', 'svg'],
            metadataProvider: function (file, cb) {
                setImmediate( function() {
                    cb.call(null, null, {
                        path: file,
                        name: getFileName(file),
                        unicode: [String.fromCodePoint(i++)],
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