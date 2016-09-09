var uuid = require("node-uuid")

module.exports = {
  Authenticate: Authenticate,
  Authorize: Authorize,
  CreateSession: CreateSession,
}

// Authenticate checks if the user is logged in via express-sessions stored in redis
function Authenticate(req, res, next) {
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

// Authorize checks if the user has privledges to acces the request resource via express-sessions stored in redis
function Authorize(req, res, next) {
  var username = req.body.username
  // assume can't change username
  if (req.user.username !== username) {
    res.status(403).send({error: "You shall not pass!"})
    return
  }
  next()
}

// Helper functions for creating/loading a session

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