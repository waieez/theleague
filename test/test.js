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
    var user = util.createRandomUser()
    request(app)
      .post("/signup")
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

describe("Profile", function () {
  it ("Auth users should be able to edit a profile", function (done) {
    var user = {username: "test_user", password: "test_pass"}
    var update = {username: "test_user", location: "Los Angeles"}
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
          .put("/profile")
          .send(update)
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

  it ("Users should not be able to edit another user's profile", function (done) {
    var user = {username: "test_user1", password: "test_pass"}
    var update = {username: "test_user", location: "Los Angeles"}
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
          .put("/profile")
          .send(update)
          .set("Cookie", cookieVal)
          .expect(403)
          .end(function (err, res) {
            if (err) {
              return done(err)
            }
            done()
          })
      })
  })

})

describe("Preferences", function () {
  it ("Auth users should be able to edit their preferences", function (done) {
    var user = {username: "test_user1", password: "test_pass"}
    var update = {username: "test_user1", gender: "M", minAge: 20, maxAge: 40, minHeight: 5, maxHeight: 6, location: "San Francisco"}
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
          .put("/preference")
          .send(update)
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

  it ("Users should not be able to edit another user's preferences", function (done) {
    var user = {username: "test_user1", password: "test_pass"}
    var update = {username: "test_user", gender: "M", minAge: 20, maxAge: 40, minHeight: 5, maxHeight: 6, location: "San Francisco"}
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
          .put("/preference")
          .send(update)
          .set("Cookie", cookieVal)
          .expect(403)
          .end(function (err, res) {
            if (err) {
              return done(err)
            }
            done()
          })
      })
  })
})

describe("Matches", function () {
  it ("Auth users should be able to get a list of their matches", function (done) {
    var user = {username: "test_user", password: "test_pass"}
    // ughh...
    // login
    request(app)
      .post("/login")
      .send(user)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err)
        }
        var cookieVal = res.header['set-cookie']

        // get matches
        request(app)
          .get("/match")
          .send({username: user.username})
          .set("Cookie", cookieVal)
          .expect(200)
          .end(function (err, res) {
            if (err) {
              return done(err)
            }
            expect(res.body.data).not.empty
            done()
          })
      })
  })
})

xdescribe("Votes", function () {
  xit("Auth users should be bale to like match", function (done) {

  })
})