#!/usr/bin/node
'use strict';

var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();

var gulp       = require('gulp');
var zip        = require('gulp-zip');
var generator  = require('./js/filmonIconGenerator.js');


app.use(bodyParser.urlencoded({ extended: true }));

app.post('/generate-font', function(req, res) {
    var fontName = req.body.fontName;
    var destdir = 'fonts/' + fontName;

    generator(fontName, req.body.inputData)
        .pipe(zip(fontName + '.zip'))
        .pipe(gulp.dest('public/' + destdir))
        .on('end', function() {
            res.location(destdir).sendStatus(204);
        });
});


app.use('/', express.static('public'));

app.listen(3002, function () {
    console.log('Example app listening on port 3002!');
});
