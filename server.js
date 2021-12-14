//jshint esversion:6
const mongoose = require('mongoose');
// const ejsLint = require('ejs-lint');




// connect to or create the quickbites database
mongoose.connect("mongodb+srv://user:user@quickbitescluster.oajos.mongodb.net/quickbitesDB", {
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
  sections: [sectionSchema],
  approved: Boolean
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
// let temp = ejsLint();
// console.log(temp);

// user login/register page
app.get("/", function(request, response) {
  let login_reg_status = {
    status: "fine"
  };
  response.render("userLogin", {status: JSON.stringify(login_reg_status)});
});

app.post("/", function(req, res){
  login_register(req, res, "user");
});

// vendor login/register page
app.get("/vendorLogin", function(request, response) {
  response.render("vendorLogin", {status: "fine"});
});

app.post("/vendorLogin", function(req, res) {
  login_register(req, res, "vendor");
});

// serve the vendor home page
app.get("/vendorHome", function(req, res){

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



app.post("/userDeleteItem", (req, res) =>{

  let removedItem = JSON.parse(req.body.item);
  console.log(req.body.url);

  // find the current active order
  Order.findOneAndDelete({userEmail: emailKey, status: 0}, (err, currentOrder) => {
    if (err) console.log(err);
    else {
      // dynamically create items
      let items = [];

      currentOrder.items.forEach((item) =>{
        if (item.name.trim() == removedItem.name.trim() && item.quantity == parseInt(removedItem.quantity)) {}
        else {
          let obj = {
            name: item.name,
            calories: item.calories,
            price: item.price,
            image: item.image,
            availability: item.availability,
            quantity: item.quantity
          };
          items.push(obj);
        }
      });

      const updatedOrder = new Order({
        userName: currentOrder.userName,
        userEmail: currentOrder.userEmail,
        vendorName: currentOrder.vendorName,
        vendorEmail: currentOrder.vendorEmail,
        items: items,
        status: 0,
        image: currentOrder.image,
        specialRequest: currentOrder.specialRequest
      });
      updatedOrder.save();

      // redirect to correct page
      let s = "61b10f129e9f1826b7ed0562";
      let idLength = s.length;
      if (req.body.url.length == idLength) res.redirect("/menuPage/" + req.body.url);
      else res.redirect("/" + req.body.url);
    }
  });
});

// serve js files when needed
app.use(express.static(__dirname + "/public"));

// serve the user home page
app.get("/userHome", function(req, res){

  // grab current order
  Order.find({userEmail: emailKey, status: false}, function(err, userOrder){
    console.log(userOrder);
    if (err) console.log(err);
    else {

      // grab all approved vendors
      Menu.find({approved: 1}, function(err, vendorMenus){
        if (err) console.log(err);
        else {
          const menuAndOrder = {
            menu: vendorMenus,
            order: userOrder
          };


          res.render("userHome", {menuAndOrder: JSON.stringify(menuAndOrder)});
        }
      });
    }
  });
});

app.post("/userHome", function(req, res){

  let vendorEmail = req.body.email;

  Profile.findOne({email: vendorEmail}, function(err, vendor){
    if (err) console.log(err);
    else {

      res.redirect("/menuPage/" + vendor.id);
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
      // console.log("*******************************************");
      // console.log(orders);
      // console.log("*******************************************");

      // grab the user tickets
      Ticket.find({ownerEmail: emailKey}, function(err, tickets){
        if (err) console.log(err);
        else ticket = tickets;

        // create an object to store all objects
        const userProfile = {};
        userProfile.p = profile;
        userProfile.o = order;
        userProfile.t = ticket;


        res.render("userAccountInfo", {data: JSON.stringify(userProfile)});
      });
    });
  });
});

app.post("/userAccountInfo", function(req, res){
  Profile.findOneAndUpdate({email: emailKey}, {$set:{first: req.body.name, password: req.body.password, address: req.body.address}}, function(err, profile){
    if (err) console.log(err);
    else res.redirect("/userAccountInfo");
  });
});

// adding an item to user cart
app.post("/userAddItem", function(req, res){

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
          image: itemImage,
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
              order: userOrder
            };

            res.render("userMenu", {menuAndOrder: menuAndOrder});
          });
        }
      });
    }
  });
});

app.get("/userCheckout", (req, res) => {
  Order.findOne({email: emailKey, status: 0}, (err, order) =>{
    if (err) console.log(err);
    else res.render("userCheckout", {menuAndOrder: JSON.stringify(order)});
  });
});

app.post("/userCheckout", (req,res) => {
  console.log(JSON.parse(req.body.order));
  Order.findOneAndDelete({email: emailKey, status: 0}, (err, order) =>{
    if (err) console.log(err);
    else {
      const newOrder = new Order(JSON.parse(req.body.order));
      newOrder.save();
      res.redirect("/userHome");
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

// serve the vendor edit menu page
app.get("/vendorEditMenu", function(req, res) {

  Menu.find({vendorEmail: emailKey}, function(err, menuItems){

    if (err) console.log(err);
    else {
      let vendorMenu = menuItems[0].sections;

      res.render("vendorEditMenu", {menu: vendorMenu});
    }
  });
});

// save changes to the vendor edit menu
app.post("/vendorEditMenu", function(req, res){



  Profile.findOne({email: emailKey}, function(err, vendor){
    let menuSections = [];
    if (err) console.log(err);
    else {
      let vendorMenu = JSON.parse(req.body.menu);

      vendorMenu.forEach(function(section){
        let obj = {};
        obj.title = section.title;
        let itemArr = [];

        section.items.forEach(function(item){

          let itemObj = {};

          itemObj.name = item.Name;
          itemObj.calories = parseInt(item.Calories);
          itemObj.price = parseFloat(item.Price);
          itemObj.image = item.image;
          itemObj.availability = item.availability;
          itemObj.quantity = 1;
          itemArr.push(itemObj);
        });
        // console.log(itemObj);
        obj.items = itemArr;
        menuSections.push(obj);
      });

      Menu.remove({vendorEmail: emailKey}, function(err, thing){
        if (err) console.log(err);
        else {

        const menu = new Menu({
        vendorName: vendor.restaurant,
        vendorEmail: vendor.email,
        sections: menuSections,
        approved: vendor.approved
        });

        menu.save(function(err, thing){
          if (err) console.log(err);
          else {
        res.redirect("/vendorEditMenu");
          }
        });

        }
      });


    }

  });

});

// user submit ticket
app.get("/userTicket", (req, res) => {
  Order.find({userEmail: emailKey}, (err, orders) => {
    if (err) console.log(err);
    else res.render("userTicket", {orders: orders});
  });
});

app.post("/userTicket", (req, res) => {
  // finds the user's name
  Profile.findOne({email: emailKey}, (err, prof) => {
    if (err) console.log(err);
    else {
      // find the vendors name
      Profile.findOne({email: req.body.vendorEmail}, (err, vendor) => {
        if (err) console.log(err);
        else {
          const ticket = new Ticket({
            ownerName: prof.name + " " + prof.last,
            ownerEmail: emailKey,
            receiverName: vendor.restaurant,
            receiverEmail: req.body.vendorEmail,
            title: req.body.title,
            body: req.body.body,
            type: "user",
            status: 0
          });
          ticket.save();
          res.redirect("/userAccountInfo");
        }
      });
    }
  });
});
// vendor submit ticket
app.get("/vendorTicket", (req, res) => {
  Order.find({vendorEmail: emailKey}, (err, orders) => {
    if (err) console.log(err);
    else res.render("vendorTicket", {orders: orders});
  });
});

app.post("/vendorTicket", (req, res) => {
  Profile.findOne({email: emailKey}, (err, prof) => {
    if (err) console.log(err);
    else {
      Profile.findOne({email: req.body.userEmail}, (err, user) => {
        if (err) console.log(err);
        else {
          const ticket = new Ticket({
            ownerName: prof.restaurant,
            ownerEmail: emailKey,
            receiverName: user.first + " " + user.last,
            receiverEmail: req.body.userEmail,
            title: req.body.title,
            body: req.body.body,
            type: "vendor",
            status: 0
          });
          ticket.save();
          res.redirect("/vendorHome");
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


// added server port
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server has started on port 3000");
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
      let login_reg_status = {
        status: "login-fail"
      };
      if (err) console.log(err);

      // person exists
      else if (profiles.length != 0){
        emailKey = profiles[0].email;

        // check if profile type matches the one of the login attempt
        if (type === "vendor" && profiles[0].type === "vendor") res.redirect("/vendorHome");
        else if (type === "user" && profiles[0].type === "user") res.redirect("/userHome");
        else if (type === "admin" && profiles[0].type === "admin") res.redirect("/adminHome");
        else {
          if (type === "vendor") res.render("vendorLogin", {status: JSON.stringify(login_reg_status)});
          else if (type === "user") res.render("userLogin", {status: JSON.stringify(login_reg_status)});
          else res.render("adminLogin");
        }
      }
      // otherwise this person doesnt exist and we can send them back to the login
      else{
        if (type === "vendor") res.render("vendorLogin", {status: JSON.stringify(login_reg_status)});
        else res.render("userLogin", {status: JSON.stringify(login_reg_status)});
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
        let login_reg_status = {
          status: "register-fail"
        };
        if (type === "vendor") res.render("vendorLogin", {status: JSON.stringify(login_reg_status)});
        else res.render("userLogin", {status: JSON.stringify(login_reg_status)});
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
            approved: 1,
            address: ""
          });
          // insert record into profile table
          profile.save();

          //create a sample menu page
          // const menu = new Menu({
          //   vendorName: req.body.registerRestaurantName,
          //   vendorEmail: req.body.registerEmail,
          //   sections: [{
          //       title: "Food",
          //       items: [{
          //           name: "Ogre Fries",
          //           calories: 123,
          //           price: 9.99,
          //           image: "https://media.istockphoto.com/vectors/slice-of-melted-cheese-pepperoni-pizza-vector-id901501348",
          //           availability: 1,
          //           quantity: 1
          //         },
          //         {
          //           name: "Onion",
          //           calories: 456,
          //           price: 7.99,
          //           image: "https://media.istockphoto.com/vectors/hot-dog-with-mustard-hand-drawing-vector-id1146404440?k=20&m=1146404440&s=612x612&w=0&h=qx-qtPEiMs7TAiqnHqQU0MB2bJsP9sUWgynwoQAAjyg=",
          //           availability: 1,
          //           quantity: 1
          //         },
          //         {
          //           name: "Good Grubs",
          //           calories: 789,
          //           price: 4.99,
          //           image: "https://fortheloveofcooking.net/wp-content/uploads/2017/02/sandwich-clipart-burger_sandwich_PNG4138.png",
          //           availability: 1,
          //           quantity: 1
          //         },
          //         {
          //           name: "Mud Burger",
          //           calories: 100,
          //           price: 11.99,
          //           image: "https://lh3.googleusercontent.com/proxy/W3dC4wHDJvj8FhEaZcz8vVWrKhAol3zZytHT1w_0ASMjXFSQurdU9hnNt02GwWCi4UXRupacs_cdKRhHk8H7UehXM6QF34JQ",
          //           availability: 0,
          //           quantity: 1
          //         }
          //       ]
          //     },
          //     {
          //       title: "Drank",
          //       items: [{
          //         name: "Swamp Shake",
          //         calories: 420,
          //         price: 3.99,
          //         image: "https://lh3.googleusercontent.com/proxy/W3dC4wHDJvj8FhEaZcz8vVWrKhAol3zZytHT1w_0ASMjXFSQurdU9hnNt02GwWCi4UXRupacs_cdKRhHk8H7UehXM6QF34JQ",
          //         availability: 0,
          //         quantity: 0
          //       }]
          //     }
          //   ],
          //   approved: true
          // });
          // //insert into database
          // menu.save();

          // // create default orders and tickets
          // const order = new Order({
          //   userName: "John Wick",
          //   userEmail: "john.wick@yahoo.com",
          //   vendorName: req.body.registerRestaurantName,
          //   vendorEmail: req.body.registerEmail,
          //   items: [
          //     {
          //       name: "Ogre Fries",
          //       calories: 123,
          //       price: 9.99,
          //       image: "",
          //       availability: 1,
          //       quantity: 10
          //     },
          //     {
          //       name: "Onion",
          //       calories: 456,
          //       price: 7.99,
          //       image: "",
          //       availability: 1,
          //       quantity: 2
          //     },
          //     {
          //       name: "Swamp Shake",
          //       calories: 420,
          //       price: 3.99,
          //       image: "",
          //       availability: 1,
          //       quantity: 3
          //     }
          //   ],
          //   status: 1,
          //   image: "https://media.istockphoto.com/vectors/ice-cream-cone-with-chocolate-and-decor-vector-illustration-clipart-vector-id948444318",
          //   specialRequest: "Make sure to put my McFries DIRECTLY INTO MY MCSHAKE. Then slather the amalgamation ALL OVER my McPatty."
          // });
          // const order2 = new Order({
          //   userName: "Shrek",
          //   userEmail: "onions@gmail.com",
          //   vendorName: req.body.registerRestaurantName,
          //   vendorEmail: req.body.registerEmail,
          //   items: [
          //     {
          //       name: "Ogre Fries",
          //       calories: 123,
          //       price: 9.99,
          //       image: "",
          //       availability: 1,
          //       quantity: 20
          //     },
          //     {
          //       name: "Swamp Shake",
          //       calories: 420,
          //       price: 3.99,
          //       image: "",
          //       availability: 1,
          //       quantity: 3
          //     }
          //   ],
          //   status: 1,
          //   image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/shrek-forever-after-1587549453.jpg?crop=0.676xw:0.901xh;0.0969xw,0&resize=980:*",
          //   specialRequest: "Please give me EXACTLY ONE FRY!!!"
          // });
          // order.save();
          // order2.save();

          // // create sample tickets
          // const ticket = new Ticket({
          //   ownerName: req.body.registerRestaurantName,
          //   ownerEmail: req.body.registerEmail,
          //   receiverName: "Donkey",
          //   receiverEmail: "dragons@gmail.com",
          //   title: "WORST CUSTOMER EVER!!!!",
          //   body: "GRRRRRRRRRRRRRRRRRRRRR I HATE DONKEYYYYY",
          //   type: "vendor",
          //   status: 0
          // });
          // const ticket2 = new Ticket({
          //   ownerName: req.body.registerRestaurantName,
          //   ownerEmail: req.body.registerEmail,
          //   receiverName: "Tony the Tiger",
          //   receiverEmail: "greattt@gmail.com",
          //   title: "God this customer is the best oh my oh wow",
          //   body: "Man I have never had such a good customer holy god this guy is amazing oh wow, can we get him an award or somethig please holy moly",
          //   type: "vendor",
          //   status: 0
          // });
          // ticket.save();
          // ticket2.save();
          let login_reg_status = {
            status: "register-success"
          };

          res.render("vendorLogin", {status: JSON.stringify(login_reg_status)});
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
          // const order = new Order({
          //   userName: req.body.registerFirstName,
          //   userEmail: req.body.registerEmail,
          //   vendorName: "McRonalds",
          //   vendorEmail: "McRonalds@gmail.com",
          //   items: [
          //     {
          //       name: "McFries",
          //       calories: 345,
          //       price: 9.99,
          //       image: "",
          //       availability: 1,
          //       quantity: 5
          //     },
          //     {
          //       name: "McShake",
          //       calories: 789,
          //       price: 5.99,
          //       image: "",
          //       availability: 1,
          //       quantity: 2
          //     },
          //     {
          //       name: "McPatty",
          //       calories: 420,
          //       price: 6.09,
          //       image: "",
          //       availability: 1,
          //       quantity: 3
          //     }
          //   ],
          //   status: 0,
          //   image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/shrek-forever-after-1587549453.jpg?crop=0.676xw:0.901xh;0.0969xw,0&resize=980:*",
          //   specialRequest: "Make sure to put my McFries DIRECTLY INTO MY MCSHAKE. Then slather the amalgamation ALL OVER my McPatty."
          // });
          // const order2 = new Order({
          //   userName: req.body.registerFirstName,
          //   userEmail: req.body.registerEmail,
          //   vendorName: "Burger God",
          //   vendorEmail: "burgerGod@gmail.com",
          //   items: [
          //     {
          //       name: "GodFries",
          //       calories: 345,
          //       price: 9.99,
          //       image: "",
          //       availability: 1,
          //       quantity: 5
          //     }
          //   ],
          //   status: 1,
          //   image: "https://media.istockphoto.com/vectors/ice-cream-cone-with-chocolate-and-decor-vector-illustration-clipart-vector-id948444318",
          //   specialRequest: "Please give me EXACTLY ONE FRY!!!"
          // });
          // order.save();
          // order2.save();

          // create sample tickets
          // const ticket = new Ticket({
          //   ownerName: req.body.registerFirstName,
          //   ownerEmail: req.body.registerEmail,
          //   receiverName: "McRonald",
          //   receiverEmail: "McRonalds@gmail.com",
          //   title: "BEST PLACE EVAAAA!!!!",
          //   body: "OH MY GOD THIS PLACE IS SO GGUUUUUDDDD UGHHHHHHHHH XDDD",
          //   type: "user",
          //   status: 0
          // });
          // const ticket2 = new Ticket({
          //   ownerName: req.body.registerFirstName,
          //   ownerEmail: req.body.registerEmail,
          //   receiverName: "BurgerGod",
          //   receiverEmail: "burgerGod@gmail.com",
          //   title: "this place suxxxxxxx :P",
          //   body: "I would rate this place 1/17 brownie points. Not my mug of eggnog",
          //   type: "user",
          //   status: 0
          // });
          // ticket.save();
          // ticket2.save();
          let login_reg_status = {
            status: "register-success"
          };
          res.render("userLogin", {status: JSON.stringify(login_reg_status)});
        }
      }
    });
  }
}
