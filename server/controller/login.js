var User = require("../model/User")
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
    var match = result[0]
    if (!authenticate(password, match.password)) {
      res.status(400).send({error: "Sorry, please try again"})
      return
    }
    res.status(200).send({message: "Welcome back!"})  
  })
}

function authenticate(password, hash) {
  console.log("debug: authenticating user...", password == hash)
  return password == hash
}