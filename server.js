// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

//Timestamp endpoint
app.route("/api/timestamp/:date_string?").get((req, res) => {
  let timestamp =
    req.params.date_string == null
      ? new Date(Date.now())
      : /^[0-9]*$/g.test(req.params.date_string)
      ? new Date(parseInt(req.params.date_string, 10))
      : new Date(req.params.date_string);
  let unixTime = timestamp.getTime();
  res.json(
    Number.isNaN(unixTime)
      ? { error: "Invalid Date" }
      : { unix: unixTime, utc: timestamp.toUTCString() }
  );
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
