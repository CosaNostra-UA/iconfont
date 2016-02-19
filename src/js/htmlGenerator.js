/**
 * Created by m_tsymbal on 2/18/16.
 */

var gulp       = require('gulp');
var jade       = require('gulp-jade');
var baseData   = require('./../baseData.json');

module.exports = function () {
    var data = {};
    var dataSort = {};

    for (var key in baseData) {
        var k = key.split('/');

        if ( typeof data[k[0]] === 'undefined' ){
            data[k[0]] = {};
        }

        data[k[0]][key] = baseData[key];
    }

    Object.keys(data).sort().forEach(function(e){
        dataSort[e] = data[e];
    });

    return gulp.src(__dirname + '/../index.jade')
        .pipe(jade({
            locals: dataSort,
            pretty: true
        }))
        .pipe(gulp.dest(__dirname + '/../../public'));
};