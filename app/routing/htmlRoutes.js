//path package must be included to get the correct file path for our html. express package required also
var express = require("express");
var app = express.Router();
var path = require("path");


// module.exports = function(app) {

//get route to survey
app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "/../public/survey.html"));
});


//catch all route to return to home page.
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/../public/home.html"));
});

// };

module.exports = app;