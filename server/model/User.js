var DB = require("../../db/index")
var config = require("../../db/config")

// Schema
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

// User model contains methods for interacting with a User
module.exports = {
  Profile: Profile,
  Preference: Preference,

  createUser: createUser,
  getUser: getUser,
  getMatches: getMatches,
  updateUser: updateUser,
  validateProfile: validateProfile,
  validatePreference, validatePreference
}

// createUser creates a user in the db if it doesn't already exist
function createUser(username, password, profile, cb) {
  console.log("debug: creating user", username)
  DB.connect(function (conn) {
    if (!DB.isConnected(conn, cb)) {
      return
    }
    getUser(username, function (err, result) {
      if (err) {
        console.log("warn: failed getting users from DB", err)
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

// getUser gets a user from the db bu the username
function getUser(username, cb) {
  console.log("debug: fetching user ", username)
  if (!username) {
    console.log("debug: username not provided")
    cb({error: "must provide a username"})
    return
  }
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

// insertUser inserts a user into the db
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

// updateUser updates a user record in the db
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

// getMatches gets a set of users that match a given user's preferences
function getMatches(id, cb) {
  console.log("debug: fetching matches for user", id)
  DB.connect(function (conn) {
    if (!DB.isConnected(conn, cb)) {
      return
    }
    DB.Users()
      .get(id)
      .run(conn, function (err, result) {
        if (err) {
          console.log("warn: failed to get a user's preferences")
          cb(err, null)
          return
        }
        // ugh... can't think right now. will refactor
        var p = result.preference
        DB.Users()
          .filter(function (user) {
            // T _ T
            return filterByPreferences(p, user)
          })
          .getField("profile")
          .run(conn, function (err, cursor) {
            if (err) {
              console.log("debug: failed to get results", err)
              cb(err, null)
              return
            }
            cursor.toArray(function (err, result) {
              if (err) {
                console.log("debug: failed to coerce cursor into array", err)
                cb(err, null)
                return
              }
              console.log("debug: returning matches for user", id, result)
              cb(null, result)
            })
          })
      })
  })
}

function filterByPreferences(p, user) {
  //gender
  return (user("profile")("gender").eq(p.gender))
  //age >= minAge
  .and(user("profile")("age").eq(p.minAge).or(user("profile")("age").gt(p.minAge)))
  //TODO: location within distance
  .and(user("profile")("location").eq(p.location))
  //age <= maxAge
  .and(user("profile")("age").eq(p.maxAge).or(user("profile")("age").lt(p.maxAge)))
  //height >= minHeight
  .and(user("profile")("height").eq(p.minHeight).or(user("profile")("height").gt(p.minHeight)))
  //height <= maxHeight
  .and(user("profile")("height").eq(p.maxHeight).or(user("profile")("height").lt(p.maxHeight)))
  

}

// hashPassword hashes a password
function hashPassword(password) {
  // todo: actually hash it with something like bcrypt
  console.log("debug: hashing password")
  return password
}

// Profile creates a Profile 'struct' based on the data provided
function Profile(data) {
  var profile = {}
  for (var key in data) {
    if (ProfileSchema[key]) {
      profile[key] = data[key]
    }
  }
  return profile
}

// Preference creates a Preference 'struct' based on the data provided
function Preference(data) {
  var preference = {}
  for (var key in data) {
    if (PreferenceSchema[key]) {
      preference[key] = data[key]
    }
  }
  return preference
}

// validateProfile validates a users profile
function validateProfile(profile) {
  for (var key in ProfileSchema) {
    // for now a simple check to see if it exists
    if (!profile[key]) {
      return false
    }
  }
  return true
}

// validatePreference validates a users preference
function validatePreference(preference) {
  for (var key in PreferenceSchema) {
    // for now a simple check to see if it exists
    if (!preference[key]) {
      return false
    }
  }
  return true
}