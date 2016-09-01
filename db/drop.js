r = require('rethinkdb');
var config = require("./config")
var connection = null;

// still figuring this out... looks messy but i'll leave it for now
r.connect( {host: config.HOST, port: config.PORT}, function(err, conn) {
    if (err) throw err;
    connection = conn;

    // drop DB
    r.dbDrop(config.DB)
    .run(conn, function (err, result) {
      console.log("DROPPING DB")
    })

})

function log(err, result) {
  if (err) throw err;
  console.log(JSON.stringify(result, null, 2));
}