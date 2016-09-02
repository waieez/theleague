var SignUp = require("./signup")
var Login = require("./login")
var Profile = require("./profile")
var Preference = require("./preference")
var Match = require("./match")
var auth = require("./auth")

module.exports = {
  SignUp: SignUp,
  Login: Login,
  Match: Match,
  Profile: Profile,
  Preference: Preference,
  Auth: auth.Auth
}