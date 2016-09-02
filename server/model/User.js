var DB = require("../../db/index")
var config = require("../../db/config")

// TODO: use an actual schema and acutually do validation
var ProfileSchema = {
  "name": "string",
  "gender": "string",
  "age": "number",
  "height": "number",
  "religion": "string",
  "location": "lat/long"
}

var PreferenceSchema = {
  "gender": "string",
  "minAge": "number",
  "maxAge": "number",
  "minHeight": "number",
  "maxHeight": "number",
  "location": "string"
}

module.exports = {
  Profile: Profile,
  Preference: Preference,

  createUser: createUser,
  getUser: getUser,
  updateUser: updateUser,
  validateProfile: validateProfile,
  validatePreference, validatePreference
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
      insertUser(username, hash, cb)
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

function insertUser(username, password, cb) {
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

function updateUser(id, data, cb) {
  console.log("debug: updating user ", id)
  DB.connect(function (conn) {
    if (!DB.isConnected(conn, cb)) {
      return
    }
    DB.Users()
      .get(id)
      .update(data)
      .run(conn, function (err, result) {
        console.log("debug: done updating user", err, result)
        cb(err, result)
      })  
  }) 
}

function hashPassword(password) {
  // todo: hash it
  console.log("debug: hashing password")
  return password
}

function Profile(data) {
  var profile = {}
  for (var key in data) {
    if (ProfileSchema[key]) {
      profile[key] = data[key]
    }
  }
  return profile
}

function Preference(data) {
  var preference = {}
  for (var key in data) {
    if (PreferenceSchema[key]) {
      preference[key] = data[key]
    }
  }
  return preference
}

function validateProfile(profile) {
  for (var key in ProfileSchema) {
    // for now a simple check to see if it exists
    if (!profile[key]) {
      return false
    }
  }
  return true
}

function validatePreference(preference) {
  for (var key in PreferenceSchema) {
    // for now a simple check to see if it exists
    if (!preference[key]) {
      return false
    }
  }
  return true
}