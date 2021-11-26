//jshint esversion:6
const mongoose = require('mongoose');

// connect to or create the quickbites database
mongoose.connect("mongodb://localhost:27017/quickbitesDB", {
  useNewUrlParser: true
});

const profileSchema = new mongoose.Schema({
  type: String,
  first: String,
  last: String,
  email: String,
  password: String,
  restaurant: String,
  approved: Boolean
});

// const activeSchema = new mongoose.Schema({
//   type: String,
//   email: String
// });

const itemSchema = new mongoose.Schema({
  name: String,
  calories: Number,
  price: Number,
  image: String,
  availability: Boolean
});

const sectionSchema = new mongoose.Schema({
  title: String,
  items: [itemSchema]
});

const menuSchema = new mongoose.Schema({
  vendorEmail: String,
  sections: [sectionSchema]
});

// create and/or put schema into collection
const Menu = mongoose.model("Menu", menuSchema);

// create and/or put schema into collection
// const Active = mongoose.model("Active", activeSchema);

let emailKey;

// create and/or put schema into collection
const Profile = mongoose.model("Profile", profileSchema);



const userList = new Map();
userList.set("test@gmail.com", "password");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + "/public/"));
app.get("/", function(request, response) {
  // response.sendFile(__dirname + "/index.html");
  response.render("index");
  // response.sendFile(__dirname + "/userAccountInfo.html");
});

// login/register form has been submitted
app.post("/", function(req, res) {
  // check what got sent
  console.log(req.body);
  console.log(Object.keys(req.body));

  // did the user login?
  if (Object.keys(req.body).includes("loginBtn")) {
    // grab the user email + password
    let email = req.body.userEmail;
    let password = req.body.userPassword;
    console.log("user is logging in");
    // does this user exist?
    // scan all profiles
    let userExists = false;
    let passwordMatch = false;
    console.log("up here");
    Profile.find(function(err, profiles) {
      console.log("here");
      if (err) {
        console.log(err);
      } else {
        profiles.forEach(function(profile) {
          console.log(profile.email);
          // if this is a vendor account
          if (profile.type === "vendor") {
            // if the email and password match what was given
            if (profile.email === req.body.userEmail && profile.password === req.body.userPassword) {
              console.log("User/Password exist, logging in...");
              console.log("serving up restaurant edit page");
              emailKey = profile.email;
              // console.log(profileID);
              res.redirect("/userAccountInfo");
            }
          }
        });
      }
    });
  }

  // did the user register?
  else if (Object.keys(req.body).includes("registerBtn")) {
    console.log("user is registering");
    console.log("old list");
    console.log(userList.entries());
    let email = req.body.registerEmail;
    let password = req.body.registerPassword;


    // check if the user exists already
    if (userList.has(email)) {
      console.log("User already exists");
    } else {
      userList.set(email, password);
      console.log("new list");
      console.log(userList.entries());

      //put info into model
      const profile = new Profile({
        type: "vendor",
        first: req.body.registerFirstName,
        last: req.body.registerLastName,
        email: req.body.registerEmail,
        password: req.body.registerPassword,
        restaurant: req.body.registerRestaurantName,
        approved: 0
      });
      // insert record into profile table
      profile.save();

      //create a sample menu page
      const menu = new Menu({
        vendorEmail: req.body.registerEmail,
        sections: [{
            title: "Section1",
            items: [{
                name: "Food Name1",
                calories: 123,
                price: 9.99,
                image: "https://media.istockphoto.com/vectors/slice-of-melted-cheese-pepperoni-pizza-vector-id901501348",
                availability: 1
              },
              {
                name: "Food Name2",
                calories: 456,
                price: 9.99,
                image: "https://media.istockphoto.com/vectors/hot-dog-with-mustard-hand-drawing-vector-id1146404440?k=20&m=1146404440&s=612x612&w=0&h=qx-qtPEiMs7TAiqnHqQU0MB2bJsP9sUWgynwoQAAjyg=",
                availability: 1
              },
              {
                name: "Food Name3",
                calories: 789,
                price: 9.99,
                image: "https://fortheloveofcooking.net/wp-content/uploads/2017/02/sandwich-clipart-burger_sandwich_PNG4138.png",
                availability: 1
              },
              {
                name: "Food Name4",
                calories: 100,
                price: 9.99,
                image: "https://lh3.googleusercontent.com/proxy/W3dC4wHDJvj8FhEaZcz8vVWrKhAol3zZytHT1w_0ASMjXFSQurdU9hnNt02GwWCi4UXRupacs_cdKRhHk8H7UehXM6QF34JQ",
                availability: 0
              }
            ]
          },
          {
            title: "Section2",
            items: [{
              name: "Food Name4",
              calories: 100,
              price: 9.99,
              image: "https://lh3.googleusercontent.com/proxy/W3dC4wHDJvj8FhEaZcz8vVWrKhAol3zZytHT1w_0ASMjXFSQurdU9hnNt02GwWCi4UXRupacs_cdKRhHk8H7UehXM6QF34JQ",
              availability: 0
            }]
          }
        ]
      });
      //insert into database
      menu.save();
    }
  }
  // this shouldn't ever trigger
  else {
    console.log("how did you make this error?");
  }
  res.sendFile(__dirname + "/index.html");
});

app.get("/userAccountInfo", function(req, res) {
  // delete any active user
  // Active.deleteOne({
  //   type: "vendor"
  // }, function(err) {});
  // const active = new Active({
  //   type: "vendor",
  //   email: emailKey
  // });
  // active.save();
  // mongoose.connection.close();
  Menu.find({email: emailKey}, function(err, menuItems){
    let vendorMenu = menuItems[0].sections;
    console.log(menuItems[0]);
    console.log(menuItems[0].sections);
    res.render("vendorEditMenu", {menu: vendorMenu});
  });
  // res.sendFile(__dirname + "/vendorEditMenu2.html");

});

app.get("/vendorEditMenu.js", function(req, res) {
  res.sendFile(__dirname + "/vendorEditMenu2.js");
});
app.get("/require.js", function(req, res) {
  res.sendFile(__dirname + "/require.js");
});

// app.get("/views/userAccountInfo.css", function(req, res){
//   res.sendFile(__dirname + "/views/userAccountInfo.css");
// });

app.post("/userAccountInfo", function(req, res) {
  console.log(req.body);
  // let food = req.body["food"];
  // let cal = req.body["cal"];
  // let price = req.body["price"];


  res.sendFile(__dirname + "/userAccountInfo.html");
});


// app.post("/delItem", function(req, res){
//   console.log(req.body);
// })

app.listen(3000, function() {
  console.log("server is running");
});
