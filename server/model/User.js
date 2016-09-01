var DB = require("../../db/index")
var config = require("../../db/config")

module.exports = {
  createUser: createUser
}


function createUser(username, password, profile, cb) {
  console.log("debug: creating user")
  DB.connect(function (conn) {
    if (!DB.isConnected(conn, cb)) {
      return
    }
    getUser(conn, username, function (err, result) {
      if (err) {
        console.log("warn: failed getting users from DB")
        cb(err)
        return
      }
      if (result) {
        console.log("debug: user exists for username: ", username)
        cb({error: "User already exists!"}, null)
        return
      }
      var hash = hashPassword(password)
      insertUser(conn, username, hash, cb)
    })
  })
}

function getUser(conn, username, cb) {
  if (!DB.isConnected(conn, cb)) {
      return
  }
  DB.Users()
    .getAll(username, {index: "username"})
    .run(conn, function (err, cursor) {
      if (err) {
        cb(err, null)
        return
      }
      cursor.toArray(function (result) {
        console.log("debug: results are: ", result)
        cb(null, result)
      })
    })
}

function insertUser(conn, username, password, cb) {
  if (!DB.isConnected(conn, cb)) {
      return
  }
  DB.Users()
    .insert({
      username: username,
      password: password
    })
    .run(conn, function (err, result) {
      console.log("debug: inserting user", err, result)
      cb(err, result)
    })
}

function hashPassword(password) {
  // todo: hash it
  console.log("debug: hashing password")
  return password
}