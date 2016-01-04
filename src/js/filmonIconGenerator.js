/**
 * Created by m_tsymbal on 12/28/15.
 */

var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var fs = require('fs');
var args = require('yargs').argv;
require('string.fromcodepoint');

function getFileProperties(data, file){
    var fileName = file.replace(/^.*[\\\/]/, '');

    return data.find(function(el){
        if( el.name + '.svg' === fileName ){
            return el;
        }
    });
}

function getUnicode(unicode){
   return String.fromCodePoint(parseInt(unicode.substr(1), 16));
}

module.exports =  function(){
    var fontName = args.env || 'myfont';
    var data = JSON.parse(fs.readFileSync('src/inputData.json', 'utf8'));

    var src = data.map(function (file) {
        return 'icons-library/' + file.name + '.svg';
    });

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