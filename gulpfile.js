var gulp            = require('gulp');
var args            = require('yargs').argv;
var iconfont        = require('./src/js/filmonIconGenerator.js');
var inputData       = require('./src/inputData.json');



var fontName = args.env || 'filmon-iconfont';
require('gulp-stats')(gulp);
require('gulp-task-list')(gulp);



var browserSync     = require('browser-sync').create();
var uglify          = require('gulp-uglify');
var browserify      = require('gulp-browserify');
var concat          = require('gulp-concat');


/// Browser-Sync task for development.
gulp.task('serve', ['build'] ,
    function() {
        browserSync.init({
           server : "public/",
           open: true
        });

        gulp.watch(["src/*.html"], ['watch:html']);
        gulp.watch(["src/*/*.js"], ['watch:js']);
    }
);


// compile JS scripts.
gulp.task("scripts", function() {
    gulp.src('src/js/*.js')
        .pipe(browserify()) // require()
        .pipe(uglify()) //
        .pipe(gulp.dest('public/js'));
});


// preprocess HTML
gulp.task("html", function() {
    gulp.src('src/*.html')
        .pipe(gulp.dest('public/'));
});


// helper task to be sure that js builded before browserSync reload browser.
gulp.task("watch:js", ['scripts'], browserSync.reload);
// helper task to be sure that html builded before browserSync reload browser.
gulp.task("watch:html", ['html'], browserSync.reload);

// Choose your side.
gulp.task('default', ['task-list']);

// Build world
gulp.task('build', ['scripts', 'html']);

// Generate font
gulp.task('iconfont', function(){
    iconfont(fontName, inputData);
});