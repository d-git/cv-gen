var path = require('path');
var express = require('express');
var fs = require('fs');
var ejs = require('ejs');
var pdf = require('html-pdf');
var app = express();

// You probably want to change 'dist/' to '../dist/' for production
app.use('/', express.static(path.join(__dirname, 'dist/')));

var server = app.listen(9000, function () {
    var template = fs.readFileSync('./cv.ejs', 'utf8');
    var data = { title: 'My CV', experties: ['C++', 'Java'], experience: ['node.js'] };
    var html = ejs.render(template, data);
    var options = {filename: './cv.pdf', format: 'Letter'};

    pdf.create(html, options).toFile(function (err, res) {
        if (err) return console.log(err);
        console.log(res);
    });
});



