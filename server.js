//jshint esversion:6
const mongoose = require('mongoose');
const ejsLint = require('ejs-lint');

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
  vendorName: String,
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
const ejs = require("ejs");
let temp = ejsLint('<!DOCTYPE html>\n'+
'<html lang="en" dir="ltr">\n'+
'  <head>\n'+
'    <meta charset="utf-8">\n'+
'    <title></title>\n'+
'  </head>\n'+
'  <body>\n'+
'      <%-include("partials/vendorLoginHeader")-%>\n'+
'      <div id = "backgroundStockImage">\n'+
'        stock image goes here\n'+
'      </div>\n'+
'\n'+
'      <h1 class="display-1"><%=metrics.menu.vendorName + " Metrics Page"%></h1>\n'+
'      <%console.log(metrics);%>\n'+
'      <!-- this table will display the number of times each individual item was ordered -->\n'+
'      <%const h = new HashTable();  %>\n'+
'      <%# for each section %>\n'+
'      <% metrics.menu.section.forEach(function(section){ %>\n'+
'        <%# for each item in every section  %>\n'+
'          <%section.items.forEach(function(item){ %>\n'+
'            <%# add all items to the map %>\n'+
'            <%h.set(item.name, null)%>\n'+
'          <%});%>\n'+
'      <%});%>\n'+
'\n'+
'      <%# for each order belonging to the vendor %>\n'+
'      <% metrics.orders.forEach(function(order){ %>\n'+
'        <%# for each item within each order %>\n'+
'          <% order.items.forEach(function(item){ %>\n'+
'            <%#add the quantity ordered to our map%>\n'+
'            <% h.set(item.name, h.get(item.name) + item.quantity) %>\n'+
'          <%});%>\n'+
'      <%});%>\n'+
'\n'+
'      <table class="table">\n'+
'        <thead>\n'+
'          <tr>\n'+
'            <th scope="col"># of times ordered</th>\n'+
'            <th scope="col">Item Name</th>\n'+
'            <th scope="col">Item Price</th>\n'+
'            <th scope="col">Item Calories</th>\n'+
'          </tr>\n'+
'        </thead>\n'+
'        <tbody>\n'+
'          <%# for each section %>\n'+
'          <% metrics.menu.section.forEach(function(section){ %>\n'+
'            <%# for each item in every section  %>\n'+
'              <%section.items.forEach(function(item){ %>\n'+
'                <tr>\n'+
'                  <th scope="row"><%=h.get(item.name)%></th>\n'+
'                  <td><%=item.name%></td>\n'+
'                  <td><%=item.price%></td>\n'+
'                  <td><%=item.calories%></td>\n'+
'                </tr>\n'+
'              <%});%>\n'+
'          <%});%>\n'+
'        </tbody>\n'+
'      </table>\n'+
'  </body>\n'+
'</html>');
console.log(temp);


// user login/register page
app.get("/", function(request, response) {
  response.render("userLogin");
});

app.post("/", function(req, res){
  login_register(req, res, "user");
});

// vendor login/register page
app.get("/vendorLogin", function(request, response) {
  response.render("vendorLogin");
});

app.post("/vendorLogin", function(req, res) {
  login_register(req, res, "vendor");
});

// serve the vendor home page
app.get("/vendorHome", function(req, res){

    // Profile.find({type: "vendor"}, function(err, vendors){
    //   if (err) console.log(err);
    //   else console.log(vendors);
    // });

    let order, ticket;

      // grab the vendor orders
      Order.find({vendorEmail: emailKey}, function(err, orders){
        if (err) console.log(err);
        else order = orders;

        // grab the vendor tickets
        Ticket.find({ownerEmail: emailKey}, function(err, tickets){
          if (err) console.log(err);
          else ticket = tickets;

          // create an object to store all objects
          const vendorHome = {};
          vendorHome.o = order;
          vendorHome.t = ticket;
          // console.log(vendorHome);
          // console.log(vendorHome.o[0]);
          // console.log(vendorHome.o[1]);

          res.render("vendorHome", {home: JSON.stringify(vendorHome)});
        });
      });
  });
app.get("/vendorHome.js", function(req, res){
  res.sendFile(__dirname + "/vendorHome.js");
});



// serve the vendor edit menu page
app.get("/vendorEditMenu", function(req, res) {
  Menu.find({email: emailKey}, function(err, menuItems){
    if (err) console.log(err);
    else {
      let vendorMenu = menuItems[0].sections;

      res.render("vendorEditMenu2", {menu: vendorMenu});
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


// serve the user home page
app.get("/userHome", function(req, res){
res.redirect("/menuPage/" + "61aa8ff80d52e7fbb488d870");
  // grab current order
  Order.find({userEmail: emailKey, status: false}, function(err, userOrder){
    if (err) console.log(err);
    else {

      // grab all approved vendors
      Menu.find({approved: 1}, function(err, vendorMenus){
        if (err) console.log(err);
        else {
          const menuAndOrder = {
            menu: vendorMenus,
            order: userOrder[0]
          };

          res.render("userHome", {menuAndOrder: menuAndOrder});
        }
      });
    }
  });
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

// adding an item to user cart
app.post("/userAddItem", function(req, res){
  console.log(req.body);
  let itemName = req.body.name;
  let itemPrice = req.body.price;
  let itemCalories = req.body.calories;
  let itemQuantity = req.body.quantity;
  let itemImage = req.body.image;
  let venEmail = req.body.venEmail;
  let venName = req.body.venName;

  // find their order, if it exists
  Order.find({userEmail: emailKey, status: 0}, function(err, userOrder){
    if (err) console.log(err);
    // if this is the first item in an order
    if (userOrder.length === 0){

      // find their profile
      Profile.find({email: emailKey}, function(err, user){
        // create a new unfilled order
        const order = new Order({
          userName: user[0].name,
          userEmail: user[0].email,
          vendorName: venName,
          vendorEmail: venEmail,
          items: [
            {
              name: itemName,
              calories: itemCalories,
              price: itemPrice,
              image: itemImage,
              availability: 1,
              quantity: itemQuantity
            }
          ],
          status: 0,
          image: "",
          specialRequest: ""
        });
        order.save();
      });
    }
    else {
      // create new item
      let item = {
        name: itemName,
        calories: itemCalories,
        price: itemPrice,
        image: itemImage,
        availability: 1,
        quantity: itemQuantity
      };

      let itemAdded = false;

      userOrder[0].items.forEach(function(addedItem){
        if (addedItem.name == itemName) itemAdded = true;
      });

      if (itemAdded) {

        // update the order by increasing the item quantity
        Order.findOneAndUpdate({userEmail: emailKey, status: false, items: {$elemMatch: {name: itemName}}}, {$inc: {'items.$.quantity': itemQuantity}}, {'new': true, 'safe': true, 'upsert': true},  function(err, updateOrder){
          if (err) console.log(err);
          else {
            Profile.find({email: venEmail}, function(err, ven){
              if (err) console.log(err);
              else res.redirect("/menuPage/" + ven[0].id);
            });
          }
        });
      } else {
        // update the order by adding the item
        Order.update({userEmail: emailKey, status: false}, {$push: {items: item}}, function(err, updatedOrder){
          if (err) console.log(err);
          else {
            Profile.find({email: venEmail}, function(err, ven){
              if (err) console.log(err);
              else res.redirect("/menuPage/" + ven[0].id);
            });
          }
        });
      }
    }
  });
});


// user clicks link to see a vendor's menu
app.get("/menuPage/:vendorID", function(req, res){
  // save the vendorID
  const vendorID = req.url.split("/menuPage/")[1];

  // get the appropriate vendor menu
  Profile.findById(vendorID, function(err, vendorProfile){

    if (err) console.log(err);
    else {
      Menu.find({vendorEmail: vendorProfile.email}, function(err, vendorMenu){

        if (err) console.log(err);
        else {
          // get the user's order for shopping cart
          Order.find({userEmail: emailKey, status: 0}, function(err, userOrder){
            const menuAndOrder = {
              menu: vendorMenu[0],
              order: userOrder[0]
            };
            res.render("userMenu", {menuAndOrder: menuAndOrder});
          });
        }
      });
    }
  });
});


app.get("/vendorMetrics", function(req, res){
  // get the vendor's menu
  Menu.findOne({vendorEmail: emailKey}, function(err, vendorMenu){
    if (err) console.log(err);
    else {
      // get the vendor's orders
      Order.find({vendorEmail: emailKey, status: 1}, function(err, vendorOrders){
        if (err) console.log(err);
        else {
          let metrics = {
            menu: vendorMenu,
            orders: vendorOrders
          };
          res.render("vendorMetrics", {metrics: metrics});
        }
      });
    }
  });
});



// admin home page
app.get("/adminHome", function(req, res){

  let vendorProfiles, vendorTickets, userTickets;

  // grab the vendor profiles
  Profile.find({type: "vendor"}, function(err, vendorProfile){
    if (err) console.log(err);
    else {
      vendorProfiles = vendorProfile;

      // grab the vendor tickets
      Ticket.find({type: "vendor"}, function(err, vendorTicket){
        if (err) console.log(err);
        else {
          vendorTickets = vendorTicket;

          // grab the user tickets
          Ticket.find({type: "user"}, function(err, userTicket){
            if (err) console.log(err);
            else {
              userTickets = userTicket;

              let adminInfo = {};
              adminInfo.vProfile = vendorProfiles;
              adminInfo.vTicket = vendorTickets;
              adminInfo.uTicket = userTickets;
              console.log(adminInfo);
              res.render("adminHome", {adminInfoList: adminInfo});
            }
          });
        }
      });
    }
  });
});

// admin metrics Page
app.get("/adminMetrics", function(req, res){

  // grab all orders
  Order.find(function(err, orders){
    if (err) console.log(err);
    else res.render("adminMetrics", {metrics: orders});
  });
});

// approving a restaurant
app.post("/adminApprove", function(req, res){
  Profile.update({email: req.body.vendorEmail}, {approved: true}, function(err, vendor){
    if (err) console.log(err);
    else res.redirect("/adminHome");
  });
});

// deleting a restaurant
app.post("/adminRemove", function(req, res){

  // delete their profile
  Profile.remove({email: req.body.vendorEmail}, function(err, vendor){
    if (err) console.log(err);
    else {
      // delete their menu
      Menu.remove({email: req.body.vendorEmail}, function(err, vendor){
        if (err) console.log(err);
        else {
          // delete all their tickets
          Ticket.deleteMany({email: req.body.vendorEmail}, function(err, vendor){
            if (err) console.log(err);
            else res.redirect("/adminHome");
          });
        }
      });
    }
  });
});


// closing a vendor ticket
app.post("/adminCloseVendorTicket", function(req, res){
  Ticket.update({ownerEmail: req.body.vendorEmail}, {status: true}, function(err, ticket){
    if (err) console.log(err);
    else res.redirect("/adminHome");
  });
});

// closing a user ticket
app.post("/adminCloseUserTicket", function(req, res){
  Ticket.update({ownerEmail: req.body.userEmail}, {status: true}, function(err, ticket){
    if (err) console.log(err);
    else res.redirect("/adminHome");
  });
});



app.listen(3000, function() {
  console.log("server is running");
});

function login_register(req, res, type){
  // check what got sent
  // console.log(req.body);
  // console.log(Object.keys(req.body));

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
        if (type === "vendor" && profiles[0].type === "vendor") res.redirect("/vendorHome");
        else if (type === "user" && profiles[0].type === "user") res.redirect("/userHome");
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
            vendorName: req.body.registerRestaurantName,
            vendorEmail: req.body.registerEmail,
            sections: [{
                title: "Food",
                items: [{
                    name: "Ogre Fries",
                    calories: 123,
                    price: 9.99,
                    image: "https://media.istockphoto.com/vectors/slice-of-melted-cheese-pepperoni-pizza-vector-id901501348",
                    availability: 1,
                    quantity: 1
                  },
                  {
                    name: "Onion",
                    calories: 456,
                    price: 7.99,
                    image: "https://media.istockphoto.com/vectors/hot-dog-with-mustard-hand-drawing-vector-id1146404440?k=20&m=1146404440&s=612x612&w=0&h=qx-qtPEiMs7TAiqnHqQU0MB2bJsP9sUWgynwoQAAjyg=",
                    availability: 1,
                    quantity: 1
                  },
                  {
                    name: "Good Grubs",
                    calories: 789,
                    price: 4.99,
                    image: "https://fortheloveofcooking.net/wp-content/uploads/2017/02/sandwich-clipart-burger_sandwich_PNG4138.png",
                    availability: 1,
                    quantity: 1
                  },
                  {
                    name: "Mud Burger",
                    calories: 100,
                    price: 11.99,
                    image: "https://lh3.googleusercontent.com/proxy/W3dC4wHDJvj8FhEaZcz8vVWrKhAol3zZytHT1w_0ASMjXFSQurdU9hnNt02GwWCi4UXRupacs_cdKRhHk8H7UehXM6QF34JQ",
                    availability: 0,
                    quantity: 1
                  }
                ]
              },
              {
                title: "Drank",
                items: [{
                  name: "Swamp Shake",
                  calories: 420,
                  price: 3.99,
                  image: "https://lh3.googleusercontent.com/proxy/W3dC4wHDJvj8FhEaZcz8vVWrKhAol3zZytHT1w_0ASMjXFSQurdU9hnNt02GwWCi4UXRupacs_cdKRhHk8H7UehXM6QF34JQ",
                  availability: 0,
                  quantity: 0
                }]
              }
            ]
          });
          //insert into database
          menu.save();

          // create default orders and tickets
          const order = new Order({
            userName: "John Wick",
            userEmail: "john.wick@yahoo.com",
            vendorName: req.body.registerRestaurantName,
            vendorEmail: req.body.registerEmail,
            items: [
              {
                name: "Ogre Fries",
                calories: 123,
                price: 9.99,
                image: "",
                availability: 1,
                quantity: 10
              },
              {
                name: "Onion",
                calories: 456,
                price: 7.99,
                image: "",
                availability: 1,
                quantity: 2
              },
              {
                name: "Swamp Shake",
                calories: 420,
                price: 3.99,
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
            userName: "Shrek",
            userEmail: "onions@gmail.com",
            vendorName: req.body.registerRestaurantName,
            vendorEmail: req.body.registerEmail,
            items: [
              {
                name: "Ogre Fries",
                calories: 123,
                price: 9.99,
                image: "",
                availability: 1,
                quantity: 20
              },
              {
                name: "Swamp Shake",
                calories: 420,
                price: 3.99,
                image: "",
                availability: 1,
                quantity: 3
              }
            ],
            status: 1,
            image: "",
            specialRequest: "Please give me EXACTLY ONE FRY!!!"
          });
          order.save();
          order2.save();

          // create sample tickets
          const ticket = new Ticket({
            ownerName: req.body.registerRestaurantName,
            ownerEmail: req.body.registerEmail,
            receiverName: "Donkey",
            receiverEmail: "dragons@gmail.com",
            title: "WORST CUSTOMER EVER!!!!",
            body: "GRRRRRRRRRRRRRRRRRRRRR I HATE DONKEYYYYY",
            type: "vendor",
            status: 0
          });
          const ticket2 = new Ticket({
            ownerName: req.body.registerRestaurantName,
            ownerEmail: req.body.registerEmail,
            receiverName: "Tony the Tiger",
            receiverEmail: "greattt@gmail.com",
            title: "God this customer is the best oh my oh wow",
            body: "Man I have never had such a good customer holy god this guy is amazing oh wow, can we get him an award or somethig please holy moly",
            type: "vendor",
            status: 0
          });
          ticket.save();
          ticket2.save();


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
                name: "GodFries",
                calories: 345,
                price: 9.99,
                image: "",
                availability: 1,
                quantity: 5
              }
            ],
            status: 1,
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
            status: 0
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
