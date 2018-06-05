
var express = require("express");
var app = express.Router();
var path = require("path");
var friends = require("../data/friends.js")



app.get("/friends", function(req, res) {
  console.log("friends hit")
  return res.json(friends);
});

// Displays a single character, or returns false
app.get("/friends/:myfriend", function(req, res) {
  var chosen = req.params.myfriend;

  console.log(chosen);

  for (var i = 0; i < friends.length; i++) {
    if (chosen === friends[i].routeName) {
      return res.json(friends[i]);
    }
  }

  return res.json(false);
});

// // Create New Characters - takes in JSON input
// app.post("/friends", function(req, res) {
//   // req.body hosts is equal to the JSON post sent from the user
//   // This works because of our body-parser middleware
//   var newFriend = req.body;

//   // Using a RegEx Pattern to remove spaces from newCharacter
//   // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
//   newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowerCase();

//   console.log(newFriend);

//   friends.push(newFriend);

//   res.json(newFriend);
// });

app.post("/friends", function(req, res) {
  // Note the code here. Our "server" will respond to a user"s survey result
  // Then compare those results against every user in the database.
  // It will then calculate the difference between each of the numbers and the user"s numbers.
  // It will then choose the user with the least differences as the "best friend match."
  // In the case of multiple users with the same result it will choose the first match.
  // After the test, it will push the user to the database.

  // We will use this object to hold the "best match". We will constantly update it as we
  // loop through all of the options
  var bestMatch = {
    name: "",
    photo: "",
    friendDifference: Infinity
  };

  // Here we take the result of the user"s survey POST and parse it.
  var userData = req.body;
  var userScores = userData.scores;

  // This variable will calculate the difference between the user"s scores and the scores of
  // each user in the database
  var totalDifference;

  // Here we loop through all the friend possibilities in the database.
  for (var i = 0; i < friends.length; i++) {
    var currentFriend = friends[i];
    totalDifference = 0;

    console.log(currentFriend.name);

    // We then loop through all the scores of each friend
    for (var j = 0; j < currentFriend.scores.length; j++) {
      var currentFriendScore = currentFriend.scores[j];
      var currentUserScore = userScores[j];

      // We calculate the difference between the scores and sum them into the totalDifference
      totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
    }

    // If the sum of differences is less then the differences of the current "best match"
    if (totalDifference <= bestMatch.friendDifference) {
      // Reset the bestMatch to be the new friend.
      bestMatch.name = currentFriend.name;
      bestMatch.photo = currentFriend.photo;
      bestMatch.friendDifference = totalDifference;
    }
  }

  // Finally save the user's data to the database (this has to happen AFTER the check. otherwise,
  // the database will always return that the user is the user's best friend).
  friends.push(userData);

  // Return a JSON with the user's bestMatch. This will be used by the HTML in the next page
  return res.json(bestMatch);
});


module.exports = app;