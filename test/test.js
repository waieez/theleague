var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');

var app = require('../server/app');

describe("Login", function (done) {

  it("Should handle '/login'", function (done) {
    request(app)
      .post("/login")
      // send data
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err)
        }
        done()
      })
  })
})

describe("Signup", function (done) {

  it("Should handle '/signup'", function (done) {
    request(app)
      .post("/signup")
      // send data
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        done()
      })
  })
})