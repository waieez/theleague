var uuid = require("node-uuid")

module.exports = {Auth: Auth, CreateSession: CreateSession}

function Auth(req, res, next) {
  console.log("debug: checking auth")
  if (!req.user) {
    LoadSession(req)
  }
  if (!req.user || !req.session || !req.session.user) {
    res.status(403).send({error: "Please log in"})
    return
  }
  next()
};

// don't like the contract here, but whatever..
function CreateSession(req, user) {
  req.session.user = req.session.user || user;
  req.user = req.session.user;
}

function LoadSession(req) {
  if (!req.session.user) {
    return
  }
  req.session.user = req.session.user
  req.user = req.session.user; 
}