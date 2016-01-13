#!/usr/bin/node
'use strict';

var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();

var gulp       = require('gulp');
var zip        = require('gulp-zip');
var generator  = require('./js/filmonIconGenerator.js');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/generate-font', function(req, res) {
    var fontName = req.body.fontName;

    generator(fontName, req.body.inputData)
        .pipe(zip(fontName + '.zip'))
        .pipe(gulp.dest('public/fonts/'))
        .on('end', function() {
            res.sendStatus(204);
        });
      /*  .pipe(gulp.dest(uniqueDirPath)) */

    // 1. generate unique dirname
    // 2. generate font using request.body.inputData
    // 3. zip it
    // 4.

});


app.use('/', express.static('public'));

app.listen(3002, function () {
    console.log('Example app listening on port 3002!');
});
