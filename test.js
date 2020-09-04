'use strict';

const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');
const mongoose = require('mongoose');
const config = require(__dirname+'/public/js/config.js')

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/tweetsDB', {useNewUrlParser: true, useUnifiedTopology: true});

// from config file
// const token = config.bearer_token; 


// var options = {
//   'method': 'GET',
//   'url': 'https://api.twitter.com/2/tweets/search/recent?max_results=15&tweet.fields=created_at&expansions=author_id&query=%23MAGA',
//   'headers': {
//     'Authorization': 'Bearer '+token,
//   }
// };

// request(options, function (error, response) {
//   if (error) throw new Error(error);
//   console.log(response.body);
// });

const fs = require('fs');


let rawdata = fs.readFileSync('maga.json');
let student = JSON.parse(rawdata);



const tweetSchema = new mongoose.Schema({
  tweet_id: String,
  body_text: String,
  date: String,
  author_id: String,
  name: String,
  username: String

});

const Tweet = mongoose.model("Tweet",tweetSchema);


function importFromDB(){
  for (var i = 0; i<student.data.length; i++){
    const tweet = new Tweet({
      tweet_id: student.data[i].id,
      body_text: student.data[i].text,
      date: student.data[i].created_at,
      author_id: student.data[i].author_id,
      name: student.includes.users[i].name,
      username: student.includes.users[i].username
    });
    tweet.save();
  }
}

// See if the DB is empty
Tweet.find(function (err, tweets) {
  if (err) return console.error(err);
  if (tweets.length == 0){
    importFromDB();
  }

})

app.get("/",function(req,res){
  Tweet.find(function(err,tweets){
    res.render("main",{tweets:tweets});
  });
});

// Check that port 3000 is connected 

app.listen(3000, function () {
  console.log("Server started on port 3000");
});

