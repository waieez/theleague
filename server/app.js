var express = require('express');
var app = express();
var route = require('./route')

module.exports = route(app)