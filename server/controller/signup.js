var User = require("../model/User")
module.exports = SignUp

// Signup is the handler for the signup route
function SignUp(req, res) {
  var username = req.body.username
  var password = req.body.password
  var profile = req.body.profile
  if(!User.validateProfile(profile)) {
    res.status(400).send({error: "Bad request"})
    return
  }
  profile = User.Profile(profile)
  User.createUser(username, password, profile, function (err, result) {
    if (err) {
      res.status(500).send({error: "Sorry, please try again later"})
      return
    }
    console.log("debug: success!")
    res.status(200).send({message: "Success!"})  
  })
}