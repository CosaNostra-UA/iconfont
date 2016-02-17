
var gulp                = require('gulp');
var fs                  = require("fs");
var jade                = require('gulp-jade');
var rename              = require('gulp-rename');



var generateCss         = require('./src/js/cssGenerator.js');
var generateFont        = require('./src/js/fontGenerator.js');
var inputData           = require('./src/inputData.json');
var baseData            = require('./src/baseData.json');



var browserSync         = require('browser-sync').create();
var uglify              = require('gulp-uglify');
var browserify          = require('gulp-browserify');
var concat              = require('gulp-concat');



require('gulp-stats')(gulp);
require('gulp-task-list')(gulp);



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
    generateFont(inputData.config.fontFamily, inputData.iconslist)
        .pipe(generateCss({
            config: inputData.config,
            inputData: inputData.iconslist
        }))
        .pipe(gulp.dest('public/fonts/' + inputData.config.fontFamily));
});

// Generate baseFont
gulp.task('basefont', function(){
    generateFont('basefont', baseData)
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
