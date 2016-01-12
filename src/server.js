#!/usr/bin/node
'use strict';

var express = require('express');
var app = express();

var gulp = require('gulp');
var generator = require('src/js/filmonIconGenerator.js');



app.post('/generate-font', function(req, res) {

    generator(req.params.fontName, req.params.inputData)
        .pipe(gulp.dest(uniqueDirPath))
        .done( function() {


        res.send(204);
    });
    // 1. generate unique dirname
    // 2. generate font using request.params.inputData // not sure about this
    // 3. zip it
    // 4.

});


app.use('/', express.static('public'));

app.listen(3002, function () {
    console.log('Example app listening on port 3002!');
});
