/**
 * Created by m_tsymbal on 1/21/16.
 */
var gulp       = require('gulp');
var font       = require('./fontGenerator.js');
var css        = require('./cssGenerator.js');
var zip        = require('gulp-zip');

module.exports = function (fontName, inputData) {
    return font(fontName, inputData)
        .pipe(css({fontName: fontName, inputData: inputData}))
        .pipe(zip(fontName + '.zip'))
        .pipe(gulp.dest('public/fonts/' + fontName));
};