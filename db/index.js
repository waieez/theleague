r = require('rethinkdb');
var config = require("./config")
var connection = null;

module.exports = {
  connect: connect,
  isConnected: isConnected,
  DB, DB,
  Users: Users,
  Profiles, Profiles
}

function connect (cb) {
  if (connection) {
    return cb(connection)
  }
  r.connect( {host: config.HOST, port: config.PORT}, function(err, conn) {
    if (err) throw err;
    connection = conn;
    return cb(connection)
  })
}

function isConnected(conn, cb) {
  if (!conn) {
    var err = {error: "Failed to connect to DB"}
    cb (err, null)
    return false
  }
  return true
}

function DB() {
  return r.db(config.DB)
}

function Users() {
  return DB().table(config.USERS)
}

function Profiles() {
  return DB().table(config.PROFILES)
}