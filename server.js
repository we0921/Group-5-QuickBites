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
  approved: Boolean,
  address: String
});

const itemSchema = new mongoose.Schema({
  name: String,
  calories: Number,
  price: Number,
  image: String,
  availability: Boolean,
  quantity: Number
});

const sectionSchema = new mongoose.Schema({
  title: String,
  items: [itemSchema]
});

const menuSchema = new mongoose.Schema({
  vendorEmail: String,
  sections: [sectionSchema]
});

const orderSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  vendorName: String,
  vendorEmail: String,
  items: [itemSchema],
  status: Boolean,
  image: String,
  specialRequest: String
});

const ticketSchema = new mongoose.Schema({
  ownerName: String,
  ownerEmail: String,
  receiverName: String,
  receiverEmail: String,
  title: String,
  body: String,
  type: String,
  status: Boolean
});

// create and/or put schemas into collection
const Menu = mongoose.model("Menu", menuSchema);
const Order = mongoose.model("Order", orderSchema);
const Ticket = mongoose.model("Ticket", ticketSchema);

// email global variable
let emailKey;

// create and/or put schema into collection
const Profile = mongoose.model("Profile", profileSchema);


const userList = new Map();
userList.set("test@gmail.com", "password");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public/"));

// user login/register page
app.get("/", function(request, response) {
  response.render("userLogin");
});

app.post("/", function(req, res){
  login_register(req, res, "user");
});

//User Account page
app.get("/userAccount", function(req, res){
  let obj;
  res.render("userAccountInfo", { data:JSON.stringify(obj) });
});

// vendor login/register page
app.get("/vendorLogin", function(request, response) {
  response.render("vendorLogin");
});

app.post("/vendorLogin", function(req, res) {
  login_register(req, res, "vendor");
});

// serve the vendor edit menu page
app.get("/vendorEditMenu", function(req, res) {
  Menu.find({email: emailKey}, function(err, menuItems){
    if (err) console.log(err);
    else {
      let vendorMenu = menuItems[0].sections;
      console.log(menuItems[0]);
      console.log(menuItems[0].sections);
      res.render("vendorEditMenu", {menu: vendorMenu});
    }
  });
});

// serve js files when needed
app.get("/vendorEditMenu.js", function(req, res) {
  res.sendFile(__dirname + "/vendorEditMenu2.js");
});
app.get("/require.js", function(req, res) {
  res.sendFile(__dirname + "/require.js");
});

// serve the user account page
app.get("/userAccountInfo", function(req, res) {

  let profile, order, ticket;

  // grab the user profile
  Profile.find({email: emailKey}, function(err, profiles){
    if (err) console.log(err);
    else profile = profiles[0];

    // grab the user orders
    Order.find({userEmail: emailKey}, function(err, orders){
      if (err) console.log(err);
      else order = orders;

      // grab the user tickets
      Ticket.find({ownerEmail: emailKey}, function(err, tickets){
        if (err) console.log(err);
        else ticket = tickets;

        // create an object to store all objects
        const userProfile = {};
        userProfile.p = profile;
        userProfile.o = order;
        userProfile.t = ticket;
        console.log(userProfile);
        console.log(userProfile.o[0]);
        console.log(userProfile.o[1]);

        res.render("userLogin");
      });
    });
  });
});

app.post("/userAccount", function(req, res) {
  console.log("im in post!");
  let email = req.body.email;
  let name = req.body.name;
  let password = req.body.password;
  let address = req.body.address;

  console.log(email);
  console.log(name);
  console.log(password);
  console.log(address);
});

app.listen(3000, function() {
  console.log("server is running");
});

function login_register(req, res, type){
  // check what got sent
  console.log(req.body);
  console.log(Object.keys(req.body));

  // grab email and password, from BOTH forms
  let loginEmail = req.body.userEmail;
  let registerEmail = req.body.registerEmail;
  let loginPassword = req.body.userPassword;

  // did the person login?
  if (Object.keys(req.body).includes("loginBtn")){

    // does this person already exist?
    Profile.find({email: loginEmail, password: loginPassword},function(err, profiles){
      if (err) console.log(err);

      // person exists
      else if (profiles.length != 0){
        emailKey = profiles[0].email;

        // check if profile type matches the one of the login attempt
        if (type === "vendor" && profiles[0].type === "vendor") res.redirect("/vendorEditMenu");
        else if (type === "user" && profiles[0].type === "user") res.redirect("/userAccountInfo");
        else if (type === "admin" && profiles[0].type === "admin") res.redirect("/adminHome");
        else {
          if (type === "vendor") res.render("vendorLogin");
          else if (type === "user") res.render("userLogin");
          else res.render("adminLogin");
        }
      }
      // otherwise this person doesnt exist and we can send them back to the login
      else{
        if (type === "vendor") res.render("vendorLogin");
        else res.render("userLogin");
      }
    });
  }
  // did the person register?
  else if (Object.keys(req.body).includes("registerBtn")){

    // does the person already exist?
    Profile.find({email: registerEmail}, function(err, profiles){
      if (err) console.log(err);

      // if they do, send them back to the login screen
      else if (profiles.length != 0){
        if (type === "vendor") res.render("vendorLogin");
        else res.render("userLogin");
      }
      // otherwise let them register
      else {
        // check who is registering
        if (type === "vendor"){
          //put info into model
          const profile = new Profile({
            type: "vendor",
            first: req.body.registerFirstName,
            last: req.body.registerLastName,
            email: req.body.registerEmail,
            password: req.body.registerPassword,
            restaurant: req.body.registerRestaurantName,
            approved: 0,
            address: ""
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
                    availability: 1,
                    quantity: 1
                  },
                  {
                    name: "Food Name2",
                    calories: 456,
                    price: 9.99,
                    image: "https://media.istockphoto.com/vectors/hot-dog-with-mustard-hand-drawing-vector-id1146404440?k=20&m=1146404440&s=612x612&w=0&h=qx-qtPEiMs7TAiqnHqQU0MB2bJsP9sUWgynwoQAAjyg=",
                    availability: 1,
                    quantity: 1
                  },
                  {
                    name: "Food Name3",
                    calories: 789,
                    price: 9.99,
                    image: "https://fortheloveofcooking.net/wp-content/uploads/2017/02/sandwich-clipart-burger_sandwich_PNG4138.png",
                    availability: 1,
                    quantity: 1
                  },
                  {
                    name: "Food Name4",
                    calories: 100,
                    price: 9.99,
                    image: "https://lh3.googleusercontent.com/proxy/W3dC4wHDJvj8FhEaZcz8vVWrKhAol3zZytHT1w_0ASMjXFSQurdU9hnNt02GwWCi4UXRupacs_cdKRhHk8H7UehXM6QF34JQ",
                    availability: 0,
                    quantity: 1
                  }
                ]
              },
              {
                title: "Section2",
                items: [{
                  name: "Food Name5",
                  calories: 100,
                  price: 9.99,
                  image: "https://lh3.googleusercontent.com/proxy/W3dC4wHDJvj8FhEaZcz8vVWrKhAol3zZytHT1w_0ASMjXFSQurdU9hnNt02GwWCi4UXRupacs_cdKRhHk8H7UehXM6QF34JQ",
                  availability: 0,
                  quantity: 0
                }]
              }
            ]
          });
          //insert into database
          menu.save();
          res.render("vendorLogin");
        }
        // otherwise a user is trying to register
        else {
          //put info into model
          const profile = new Profile({
            type: "user",
            first: req.body.registerFirstName,
            last: req.body.registerLastName,
            email: req.body.registerEmail,
            password: req.body.registerPassword,
            restaurant: "",
            approved: 0,
            address: req.body.registerAddress
          });
          // insert record into profile table
          profile.save();

          // create default orders and tickets
          const order = new Order({
            userName: req.body.registerFirstName,
            userEmail: req.body.registerEmail,
            vendorName: "McRonalds",
            vendorEmail: "McRonalds@gmail.com",
            items: [
              {
                name: "McFries",
                calories: 345,
                price: 9.99,
                image: "",
                availability: 1,
                quantity: 5
              },
              {
                name: "McShake",
                calories: 789,
                price: 5.99,
                image: "",
                availability: 1,
                quantity: 2
              },
              {
                name: "McPatty",
                calories: 420,
                price: 6.09,
                image: "",
                availability: 1,
                quantity: 3
              }
            ],
            status: 1,
            image: "",
            specialRequest: "Make sure to put my McFries DIRECTLY INTO MY MCSHAKE. Then slather the amalgamation ALL OVER my McPatty."
          });
          const order2 = new Order({
            userName: req.body.registerFirstName,
            userEmail: req.body.registerEmail,
            vendorName: "Burger God",
            vendorEmail: "burgerGod@gmail.com",
            items: [
              {
                name: "McFries",
                calories: 345,
                price: 9.99,
                image: "",
                availability: 1,
                quantity: 5
              }
            ],
            status: 0,
            image: "",
            specialRequest: "Please give me EXACTLY ONE FRY!!!"
          });
          order.save();
          order2.save();

          // create sample tickets
          const ticket = new Ticket({
            ownerName: req.body.registerFirstName,
            ownerEmail: req.body.registerEmail,
            receiverName: "McRonald",
            receiverEmail: "McRonalds@gmail.com",
            title: "BEST PLACE EVAAAA!!!!",
            body: "OH MY GOD THIS PLACE IS SO GGUUUUUDDDD UGHHHHHHHHH XDDD",
            type: "user",
            status: 1
          });
          const ticket2 = new Ticket({
            ownerName: req.body.registerFirstName,
            ownerEmail: req.body.registerEmail,
            receiverName: "BurgerGod",
            receiverEmail: "burgerGod@gmail.com",
            title: "this place suxxxxxxx :P",
            body: "I would rate this place 1/17 brownie points. Not my mug of eggnog",
            type: "user",
            status: 0
          });
          ticket.save();
          ticket2.save();
      
          res.render("userLogin");
        }
      }
    });
  }
}
