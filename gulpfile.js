
var gulp            = require('gulp');
var args            = require('yargs').argv;
var jade            = require('gulp-jade');
var rename          = require('gulp-rename');



var iconfont        = require('./src/js/filmonIconGenerator.js');
var basefont        = require('./src/js/fontGenerator.js');
var inputData       = require('./src/inputData.json');
var baseData        = require('./src/baseData.json');



var browserSync     = require('browser-sync').create();
var uglify          = require('gulp-uglify');
var browserify      = require('gulp-browserify');
var concat          = require('gulp-concat');



var fs = require("fs");
var fontData = args.env || 'fonts/,filmon-iconfont,filmon-icon';
require('gulp-stats')(gulp);
require('gulp-task-list')(gulp);



fontData = fontData.split(',');
var baseFontIconPath = fontData[0];
var className = fontData[1];
var fontName = fontData[2];



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
gulp.task('build', ['basefont', 'scripts', 'html']);

// Generate font
gulp.task('iconfont', function(){
    iconfont(baseFontIconPath, className, fontName, inputData);
});

// Generate baseFont
gulp.task('basefont', function(){
    basefont('basefont', baseData)
        .pipe(gulp.dest('public/fonts/'));
});

// Generate HTML
gulp.task('generateHtml', ['basefont'], function() {
    var data = {};
    fs.readdir('./icons-library', function(err, items) {
        items.forEach(function(elem){
            data[elem] = {};
        });
        for (var key in baseData) {
            var k = key.split('/');
            data[k[0]][key] = baseData[key];
        }

        gulp.src('./src/html.jade')
            .pipe(jade({
                locals: data,
                pretty: true
            }))
            .pipe(rename('index.html'))
            .pipe(gulp.dest('./src/'));
    });
});


// Generate baseData.json from the contents of icons-library/
var baseFileGenerator = require('./src/js/basedataGenerator.js');
gulp.task('basedata', function(){
    baseFileGenerator();
});
