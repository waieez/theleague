var DB = require("../../db/index")
var config = require("../../db/config")

module.exports = {
  createUser: createUser,
  getUser: getUser
}


function createUser(username, password, profile, cb) {
  console.log("debug: creating user", username)
  DB.connect(function (conn) {
    if (!DB.isConnected(conn, cb)) {
      return
    }
    getUser(username, function (err, result) {
      if (err) {
        console.log("warn: failed getting users from DB")
        cb(err)
        return
      }
      if (result.length) {
        console.log("debug: user exists for username: ", username, result)
        cb({error: "User already exists!"}, null)
        return
      }
      var hash = hashPassword(password)
      insertUser(conn, username, hash, cb)
    })
  })
}

function getUser(username, cb) {
  console.log("debug: fetching user ", username)
  DB.connect(function (conn) {
    if (!DB.isConnected(conn, cb)) {
      return
    }
    DB.Users()
     .filter({username: username})
      .run(conn, function (err, cursor) {
        if (err) {
          cb(err, null)
          return
        }
        cursor.toArray(function (err, result) {
          if (err) {
            cb(err, null)
            return
          }
          cb(null, result)
        })
      })
  })
}

function insertUser(conn, username, password, cb) {
  console.log("debug: inserting user ", username)
  DB.connect(function (conn) {
    if (!DB.isConnected(conn, cb)) {
      return
    }
    DB.Users()
      .insert({
        username: username,
        password: password
      })
      .run(conn, function (err, result) {
        console.log("debug: done inserting user", err, result)
        cb(err, result)
      })  
  })
  
}

function hashPassword(password) {
  // todo: hash it
  console.log("debug: hashing password")
  return password
}