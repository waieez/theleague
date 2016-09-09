var User = require("../model/User")

module.exports = Match

function Match(req, res) {
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