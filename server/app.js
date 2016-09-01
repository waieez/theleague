var express = require('express');
var app = express();
var route = require('./route')
var bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

module.exports = route(app)