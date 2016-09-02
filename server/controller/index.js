var SignUp = require("./signup")
var Login = require("./login")
var Profile = require("./profile")
var auth = require("./auth")
module.exports = {
  SignUp: SignUp,
  Login: Login,
  Profile: Profile,
  Auth: auth.Auth
}