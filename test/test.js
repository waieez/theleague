var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');

var app = require('../server/app');
var util = require('../util/random')

// TODO: some setup

describe("Login", function (done) {

  it("Should handle '/login'", function (done) {

    var user = {username: "test_user", password: "test_pass"}
    request(app)
      .post("/login")
      .send(user)
      .expect(200)
      //.expect("set-cookie", "whatever")
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
    // shitty tests
    var user = util.createRandomUser()
    request(app)
      .post("/signup")
      // send data
      .send(user)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        done()
      })
  })
})

describe("Auth", function () {
  it("Should reject users with invalid sessions", function (done) {
    request(app)
      .get("/")
      .set('Cookie', "connect.sid=dummycookie")
      .expect(403)
      .end(function (err, res) {
        if (err) {
          return done(err)
        }
        done()
      })
  })
  it("Should accept users with valid sessions", function (done) {
    var user = {username: "test_user", password: "test_pass"}
    request(app)
      .post("/login")
      .send(user)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err)
        }
        var cookieVal = res.header['set-cookie']
        request(app)
          .get("/")
          .set("Cookie", cookieVal)
          .expect(200)
          .end(function (err, res) {
            if (err) {
              return done(err)
            }
            done()
          })
      })
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