var SignUp = require("./signup")
var Login = require("./login")
var auth = require("./auth")
module.exports = {
  SignUp: SignUp,
  Login: Login,
  Auth: auth.Auth,
}