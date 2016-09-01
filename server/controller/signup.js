module.exports = SignUp

function SignUp(req, res) {
  // TODO:
  // do this async
  // init/connect to DB
  // parse body for username/password/profile
  var username = "username"
  var password = "password"
  var profile = {}
  var DB = {}
  var user = getUser(DB, username)
  if (user) {
    res.status(403).send({error: "User exists"})
    return
  }
  if(!validateProfile(profile)) {
    res.status(400).send({error: "Bad request"})
    return
  }
  var err = createUser(DB, username, password, profile)
  if (err) {
    res.status(500).send({error: "Sorry, please try again later"})
    return
  }
  res.status(200).send({message: "Success!"})
}

function createUser(DB, username, password, profile) {
  return false
}

function getUser(DB, username) {
  return true
}

function validateProfile(profile) {
  return false
}

function validatePreference() {
  return false
}