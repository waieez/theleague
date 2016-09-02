var expressSession = require('express-session');
var RedisStore = require('connect-redis')(expressSession);
var oneDay = 24 * 60 * 60 * 1000
module.exports = Sessions

function Sessions(url, secret) {
  var store = new RedisStore({ url: url });
  return expressSession({
    secret: secret,
    store: store,
    resave: true,
    duration: oneDay,
    saveUninitialized: true
  });
};