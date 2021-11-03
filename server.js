//jshint esversion:6
const userList = new Map();
userList.set("test@gmail.com", "password");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(request, response){
  response.sendFile(__dirname + "/index.html");
  // response.sendFile(__dirname + "/userAccountInfo.html");
});

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
        console.log("serving up restaurant edit page");
        res.redirect("/userAccountInfo");
      }
      else {
        console.log("User exists but incorrect password");
      }
    }
    else {
      console.log("User doesn't exist");
    }
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

app.get("/userAccountInfo", function(req, res){
  res.sendFile(__dirname + "/userAccountInfo.html")
});

app.post("/userAccountInfo", function(req, res){
  console.log(req.body);
  let food = req.body["food"];
  let cal = req.body["cal"];
  let price = req.body["price"];


  res.sendFile(__dirname + "/userAccountInfo.html")
});


// app.post("/delItem", function(req, res){
//   console.log(req.body);
// })

app.listen(3000, function(){
  console.log("server is running");
});

// Other Javascript
function addTextField(x) {
	x.style.display = "none";
	x.parentNode.childNodes[7].style.display = "block";

	let menuItem = x.parentNode.parentNode;

	console.log(menuItem.childNodes[1].outerHTML);

	for (let i = 0; i < menuItem.childNodes.length; i += 2) {
		menuItem.childNodes[1].childNodes[i+1].outerHTML = "<input type = \"text\" value = \"" + menuItem.childNodes[1].childNodes[i+1].innerText + "\" name = \"test" + (i+1) + "\">";
	}

	console.log(menuItem.childNodes[1].outerHTML);
}


// DOES NOT WORK ENTIRELY
function saveChanges(x) {
	// Hide the Edit Item button and display the Save Changes button
	x.style.display = "none";
	x.parentNode.childNodes[1].style.display = "block";

	// Define variables
	let menuItem = x.parentNode.parentNode;
	const names = [];

	// Debugging output. Show the HTML for the menu object.
	console.log(menuItem.outerHTML);

	// Strip the item names from the text boxes and store them in names[]
	for (let i = 1; i < 6; i += 2) {
		let string = menuItem.childNodes[1].childNodes[i].outerHTML;
		console.log(string);
		let beginning = string.indexOf("value=") + 7;
		let substr = string.substring(beginning, string.length);
		let end = beginning + substr.indexOf("\"");
		let name = string.substring(beginning, end);
		console.log(name);
		names[(i - 1)/2] = name;
	}

	// Overwrite the text boxes with the text they had contained. (Save the changes)
	menuItem.childNodes[1].childNodes[1].outerHTML = "<div class = \"itemName\">" + names[0] + "</div>";
  menuItem.childNodes[1].childNodes[3].outerHTML = "<div class = \"itemCalories\">" + names[1] + "</div>";
	menuItem.childNodes[1].childNodes[5].outerHTML = "<div class = \"itemPrice\">" + names[2] + "</div>";

	// Debugging output
	//for (let i = 0; i < 6; i++) {
	//	console.log(i + menuItem.childNodes[1].childNodes[i].outerHTML);
	//}

	// Debugging output. Show the HTML for the menu object.
	console.log(menuItem.outerHTML);
}
