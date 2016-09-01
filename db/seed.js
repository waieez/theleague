r = require('rethinkdb');
var _ = require('./index')
var config = require("./config")
var testData = require("./testdata")
var connection = null;

// still figuring this out... looks messy but i'll leave it for now
r.connect( {host: config.HOST, port: config.PORT}, function(err, conn) {
    if (err) throw err;
    connection = conn;

    // drop DB
    r.dbDrop(config.DB)
    .run(conn, function (err, result) {
      // create DB
      r.dbCreate(config.DB)
      .run(conn, function (err, result) {
        log(err, result)

        // create users table
        _.DB().tableCreate(config.USERS)
        .run(connection, function(err, result) {
            log(err, result)
            // create index on userName. ugh I should've used postgres
            _.Users().indexCreate("username")
            .run(conn, function (err, result) {
              log(err, result)

              // insert users
              var insertConfig = {durability: "hard", returnChanges: false, conflict: "error"}
              console.log("debug: testData are:", testData)
              _.Users().insert(testData.users, insertConfig)
              .run(conn, function (err, result) {
                console.log("debug: Inserting test data...", testData)
                log(err, result)
              })

            })

            
        })

        // create other tables
        // PROFILE
        // PREFERENCES
        // MATCHES
      });
    })

})

function log(err, result) {
  if (err) throw err;
  console.log(JSON.stringify(result, null, 2));
}