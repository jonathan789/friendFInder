//dependencies
// Series of npm packages that we will use to give our server useful functionality.

var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var apiRoutes = require("./app/routing/apiRoutes.js");
var htmlRoutes = require("./app/routing/htmlRoutes.js");


// tells node to create an 'express' server. 
var app = express();

//selects the port for express.
var PORT = 7000;
// var PORT = process.env.PORT || 7000;
// Sets up the Express app to handle data parsing.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



//points our sever to 'route' files.
//these routes tell our sever how to respond when users visit or request data from various URL's.


app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
});

