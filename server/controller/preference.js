var User = require("../model/User")

module.exports = Preference

// Preference is the handler for the preference route
function Preference(req, res) {
  var id = req.user.id
  var preference = User.Preference(req.body)
  // ensure we have enough data to do a query with
  if (!User.validatePreference(preference)) {
    res.status(400).send({error: "Bad request"})
    return
  }
  var data = {preference: preference}
  User.updateUser(id, data, function (err, result) {
    if (err) {
      res.status(500).send({error: "Sorry! Please try again later"})
      return
    }
    console.log("debug: success!", id)
    res.status(200).send({message: "success!"})
  })
}