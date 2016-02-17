#!/usr/bin/node
'use strict';

var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();

var generator  = require('./js/filmonIconGenerator.js');

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/generate-font', function(req, res) {
    var baseFontIconPath = req.body.baseFontIconPath;
    var className = req.body.className;
    var fontName = req.body.fontName;
    var inputData = req.body.inputData;
    var destdir = 'fonts/' + fontName;

    generator(baseFontIconPath, className, fontName, inputData)
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
