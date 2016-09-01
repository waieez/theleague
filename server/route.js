function route(app) {
  app.route("/signup")
    .post(sendOK)

  app.route("/login")
    .post(sendOK)

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