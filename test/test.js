var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');

var app = require('../server/app');

// TODO: some setup

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

describe("Signup", function () {

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

xdescribe("Auth", function () {
  xit("Should reject users with invalid sessions", function (done) {

  })
  xit("Should create a session for a auth user", function (done) {

  })

})

xdescribe("Profile", function () {
  xit("Auth users should be able to edit their profiles", function (done) {

  })
})

xdescribe("Preferences", function () {
  xit("Auth users should be able to edit their preferences", function (done) {

  })
})

xdescribe("Matches", function () {
  xit("Auth users should be able to get a set of matches based on their preferences", function (done) {

  })
})

xdescribe("Votes", function () {
  xit("Auth users should be bale to like match", function (done) {

  })
})