var ctrl = require("./controller/index")

function route(app) {
  app.route("/signup")
    .post(ctrl.SignUp)

  app.route("/login")
    .post(ctrl.Login)

  app.route("/profile")
    .put(ctrl.Auth, ctrl.Profile)

  app.route("/preference")
    .put(ctrl.Auth, ctrl.Preference)

  app.route("/match")
    .get(ctrl.Auth, ctrl.Match)

  app.route("/")
    .get(ctrl.Auth, sendOK)
  return app
}

function sendOK(req, res) {
  res.status(200).end()
}

function sendErr(req, res) {
  res.status(500).end()
}

module.exports = route