var ctrl = require("./controller/index")

function route(app) {
  app.route("/signup")
    .post(ctrl.SignUp)

  app.route("/login")
    .post(ctrl.Login)

  app.route("/profile")
    .put(ctrl.Authenticate, ctrl.Authorize, ctrl.Profile)

  app.route("/preference")
    .put(ctrl.Authenticate, ctrl.Authorize, ctrl.Preference)

  app.route("/match")
    .post(ctrl.Authenticate, ctrl.Authorize, ctrl.Match)

  app.route("/")
    .get(ctrl.Authenticate, sendOK)
  return app
}

function sendOK(req, res) {
  res.status(200).end()
}

function sendErr(req, res) {
  res.status(500).end()
}

module.exports = route