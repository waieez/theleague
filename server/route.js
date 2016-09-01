var ctrl = require("./controller/index")

function route(app) {
  app.route("/signup")
    .post(ctrl.SignUp)

  app.route("/login")
    .post(sendErr)

  app.route("/")
    .get(sendOK) 
  return app
}

function sendOK(req, res) {
  res.status(200).end()
}

function sendErr(req, res) {
  res.status(500).end()
}

module.exports = route