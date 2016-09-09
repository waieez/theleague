module.exports = {
  createRandomUser: createRandomUser
}

// createRandomUser creates a random user, primarily used for testing purposes
function createRandomUser() {
  var name = "random_user" + Math.round((Math.random() * 1000))
  var pass = "random_pass" + Math.round((Math.random() * 1000))
    // ... /shrug
  var age = Math.round(Math.random() * (100 - 18) + 18)
  var gender = Math.round(Math.random() * 1) === 0 ? "F" : "M"
  var height = (Math.random() * (7 - 4)) + 4
  var profile = {
    "name": name,
    "gender": gender,
    "age": age,
    "height": height,
    "religion": "whatever",
    "location": "something"
  }
  return {
    username: name,
    password: pass,
    profile: profile
  } 
}