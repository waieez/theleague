var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var route = require('./route');
var config = require('./config');
var sessions = require('./middleware/sessions');

app.use(cookieParser());
app.use(sessions(config.redisURL, config.cookieSecret));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

module.exports = route(app);