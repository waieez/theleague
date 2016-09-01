var User = require("../model/User")
module.exports = SignUp

function SignUp(req, res) {
  var username = req.body.username
  var password = req.body.password
  var profile = req.body.profile
  if(!validateProfile(profile)) {
    res.status(400).send({error: "Bad request"})
    return
  }
  User.createUser(username, password, profile, function (err, result) {
    if (err) {
      res.status(500).send({error: "Sorry, please try again later"})
      return
    }
    console.log("success!")
    res.status(200).send({message: "Success!"})  
  })
}

// Plug for a schema
var ProfileSchema = {
  "name": "string",
  "gender": "string",
  "age": "number",
  "height": "number",
  "religion": "string",
  "location": "lat/long"
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

function validatePreference() {
  return false
}