var SignUp = require("./signup")
var Login = require("./login")
var Profile = require("./profile")
var Preference = require("./preference")
var Match = require("./match")
var auth = require("./auth")

// index of all controllers ("handlers")
module.exports = {
  SignUp: SignUp,
  Login: Login,
  Match: Match,
  Profile: Profile,
  Preference: Preference,
  Authenticate: auth.Authenticate,
  Authorize: auth.Authorize
}