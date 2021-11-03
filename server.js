//jshint esversion:6
const userList = new Map();
userList.set("test@gmail.com", "password");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(request, response){
  response.sendFile(__dirname + "/index.html");
});

app.get("/ay", function(req, res){
  res.send("<h1>test<h1/>");
});

// app.get("/delItem", function(req, res){
//   console.log(res.body);
//   console.log(req.body);
// })

// login/register form has been submitted
app.post("/", function(req, res){
  // check what got sent
  console.log(req.body);
  console.log(Object.keys(req.body));

  // did the user login?
  if (Object.keys(req.body).includes("loginBtn")){
    // grab the user email + password
    let email = req.body["userEmail"];
    let password = req.body["userPassword"];
    console.log("user is logging in");
    // does this user exist?
    if (userList.has(email)) {
      // does the password match?
      if (userList.get(email) === password) {
        console.log("User/Password exist, logging in...");
      }
      else {
        console.log("User exists but incorrect password");
      }
    }
    else console.log("User doesn't exist");
  }
  // did the user register?
  else if (Object.keys(req.body).includes("registerBtn")){
    console.log("user is registering");
    console.log("old list");
    console.log(userList.entries());
    let email = req.body["registerEmail"];
    let password = req.body["registerPassword"];
    // check if the user exists already
    if (userList.has(email)){
      console.log("User already exists");
    }
    else {
      userList.set(email, password);
      console.log("new list");
      console.log(userList.entries());
    }
  }
  // this shouldn't ever trigger
  else {
    console.log("how did you make this error?");
  }
  res.sendFile(__dirname + "/index.html");
});

// app.post("/delItem", function(req, res){
//   console.log(req.body);
// })

app.listen(3000, function(){
  console.log("server is running");
});
