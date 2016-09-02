var User = require("../model/User")

module.exports = Match

function Match(req, res) {
  var username = req.body.username
  // assume can't change username
  if (req.user.username !== username) {
    res.status(403).send({error: "You shall not pass!"})
    return
  }
  var id = req.user.id
  User.getMatches(id, function (err, result) {
    if (err) {
      res.status(500).send({error: "Sorry! Please try again later"})
      return
    }
    console.log("debug: success!", id)
    res.status(200).send({data: result})
  })
}