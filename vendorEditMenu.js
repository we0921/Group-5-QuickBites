//jshint esversion:6
// import mongoose from 'mongoose';
// const mongoose = require('mongoose');
// //
// // // connect to or create the quickbites database
// mongoose.connect("mongodb://localhost:27017/quickbitesDB", {useNewUrlParser: true});
// const Active = mongoose.model("Active", activeSchema);
// const Profile = mongoose.model("Profile", profileSchema);
// console.log("INSIDE HERE");

function addTextField(x) {
	const mongoose = require('mongoose');
	//
	// // connect to or create the quickbites database
	mongoose.connect("mongodb://localhost:27017/quickbitesDB", {useNewUrlParser: true});
	const Active = mongoose.model("Active", activeSchema);
	const Profile = mongoose.model("Profile", profileSchema);
	console.log("INSIDE HERE");
	Active.find(function(err, actives){
		actives.forEach(function(active){
			console.log(active.email);
		});
	});
	console.log("AYYY WHATUP");
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
