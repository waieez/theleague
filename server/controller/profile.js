var User = require("../model/User")

module.exports = Profile

// Profile is the handler for the profile route
function Profile(req, res) {
  var id = req.user.id
  // ugh..
  var data = {profile: User.Profile(req.body)}
  User.updateUser(id, data, function (err, result) {
    if (err) {
      res.status(500).send({error: "Sorry! Please try again later"})
      return
    }
    console.log("debug: success!", id)
    res.status(200).send({message: "success!"})
  })
}