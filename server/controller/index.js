var SignUp = require("./signup")
var Login = require("./login")
var Profile = require("./profile")
var Preference = require("./preference")
var auth = require("./auth")
module.exports = {
  SignUp: SignUp,
  Login: Login,
  Profile: Profile,
  Preference: Preference,
  Auth: auth.Auth
}