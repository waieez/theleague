var User = require("../model/User")
var auth = require("./auth")
module.exports = Login

function Login(req, res) {
  var username = req.body.username
  var password = req.body.password
  User.getUser(username, function (err, result) {
    if (err) {
      res.status(500).send({error: "Sorry, please try again later"})
      return
    }
    if (!result) {
      res.status(400).send({error: "Sorry, that user doesn't exist"})
      return
    }
    var user = result[0]
    if (!authenticate(password, user.password)) {
      res.status(400).send({error: "Sorry, please try again"})
      return
    }
    delete user.password
    auth.CreateSession(req, user)
    res.status(200).send({message: "Welcome back!"})
  })
}

function authenticate(password, hash) {
  console.log("debug: authenticating user...", password == hash)
  return password == hash
}

