/**
 * Created by m_tsymbal on 12/28/15.
 */

var gulp = require('gulp');

module.exports =  function(){
    return gulp.src(['icons-library/*.svg'])
        .pipe(iconfont({
            fontName: 'myfont', // required
            appendUnicode: true, // recommended option
            formats: ['ttf', 'eot', 'woff', 'svg']
        }))
        .on('glyphs', function(glyphs, options) {
            // CSS templating, e.g.
            console.log(glyphs, options);
        })
        .pipe(gulp.dest('public/fonts/'));
};