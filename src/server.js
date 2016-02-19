#!/usr/bin/node
'use strict';

var express         = require('express');
var bodyParser      = require('body-parser');
var app             = express();

var gulp            = require('gulp');
var zip             = require('gulp-zip');
var generator       = require('./js/filmonIconGenerator.js');
var generateHtml    = require('./js/htmlGenerator.js');
var generateFont    = require('./js/fontGenerator.js');
var baseData        = require('./baseData.json');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    generateHtml()
        .on('end', function() {
            var options = {
                root : __dirname + '/../public/'
            };
            res.sendFile('index.html', options);
        });
});

app.get('/icons', function(req, res) {
    generateFont('basefont', baseData)
        .pipe(gulp.dest('public/fonts/'))
        .on('error', function(err) {
            console.log(err);
            res.sendStatus(500);
        })
        .on('end', function() {
            res.sendStatus(204);
        });
});

app.post('/generate-font', function(req, res) {
    var config = req.body.config;
    var inputData = req.body.inputData;
    var destdir = 'fonts/' + config.fontFamily;
    
    generator(config, inputData)
        .pipe(zip(config.fontFamily + '.zip'))
        .pipe(gulp.dest(destdir))
        .on('error', function(err) {
            console.log(err);
            res.sendStatus(500);
        })
        .on('end', function() {
            res.location(destdir).sendStatus(204);
        });
});

app.use('/', express.static('public'));

app.listen(3002, function () {
    console.log('Open your browser at "http://localhost:3002/" and enjoy the show!');
});
