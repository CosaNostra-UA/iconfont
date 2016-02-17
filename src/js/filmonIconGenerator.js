/**
 * Created by m_tsymbal on 1/21/16.
 */
var gulp       = require('gulp');
var font       = require('./fontGenerator.js');
var css        = require('./cssGenerator.js');
var zip        = require('gulp-zip');

module.exports = function (config, inputData) {
    return font(config.fontFamily, inputData)
        .pipe(css({
            config: config,
            inputData: inputData
        }))
        .pipe(zip(config.fontFamily + '.zip'))
        .pipe(gulp.dest('public/fonts/' + config.fontFamily));
};