document.addEventListener("DOMContentLoaded", function() {
	displayAccountInfo();
	
	/*@todo functions to be implemented
	displayOrderHistory();
	displaySupportTickets();*/
	
	//test code for buildOrderCard
	buildOrderCard("testRestaurant", "testdish1", 1, "testdish2", 5, 25.99);
	
	//test code for buildOrderCard
	buildOrderCard("Mcdonalds", "testdish1", 1, "testdish2", 5, 25.99);
});

function displayAccountInfo() {
	document.getElementById("userEmail").childNodes[1].innerHTML = "Email from backend goes here";
	document.getElementById("userName").childNodes[1].innerHTML = "Name from backend goes here";
	document.getElementById("userPassword").childNodes[1].innerHTML = "Password from backend goes here";
	document.getElementById("userAddress").childNodes[1].innerHTML = "Address from backend goes here";
}
/********************************************************************************************/
/* Replaces current user information rows with textfields and a save changes button         */  
/*                                                                                          */
/* NOTE: breaks formatting of "Your Account" when called                                    */  
/* @todo fix where node is replaced when inserting textfield                                */
/********************************************************************************************/
function editInfo() {
	/**************************************Email textfield***********************************/
	//getting parent of node containing user's email
	let p = document.getElementById("userEmail");
	
	//getting user's Email
	let text = document.getElementById("userEmail").textContext;
	
	//creating input node
	let newEmailNode = document.createElement("input");
	newEmailNode.class = "accountInfoFormat";
	newEmailNode.value = text;
	
	p.replaceChild(newEmailNode, p.firstChild);
	
	/***************************************Name textfield***********************************/
	//getting parent of node containing user's email
	p = document.getElementById("userName").parentNode;
	
	//getting user's Email
	text = document.getElementById("userName").textContent;
	
	//getting node containing user's email
	let oldNameNode = document.getElementById("userName");
	
	//creating input node
	let newNameNode = document.createElement("input");
	
	//setting textfield text
	newNameNode.value = text.trim();
	
	//replacing old text with textfield node
	p.replaceChild(newNameNode, oldNameNode);
	
	/***************************************Password textfield***********************************/
	//getting parent of node containing user's email
	p = document.getElementById("userPassword").parentNode;
	
	//getting user's Email
	text = document.getElementById("userPassword").textContent;
	
	//getting node containing user's email
	let oldPasswordNode = document.getElementById("userPassword");
	
	//creating input node
	let newPasswordNode = document.createElement("input");
	
	//setting textfield text
	newPasswordNode.value = text.trim();
	
	//replacing old text with textfield node
	p.replaceChild(newPasswordNode, oldPasswordNode);
	
	/***************************************Address textfield***********************************/
	//getting parent of node containing user's email
	p = document.getElementById("userAddress").parentNode;
	
	//getting user's Email
	text = document.getElementById("userAddress").textContent;
	
	//getting node containing user's email
	let oldAddressNode = document.getElementById("userAddress");
	
	//creating input node
	let newAddressNode = document.createElement("input");
	
	//setting textfield text
	newAddressNode.value = text.trim();
	
	//replacing old text with textfield node
	p.replaceChild(newAddressNode, oldAddressNode);
	
	/***************************************Save Changes Button***********************************/
	let button = document.getElementById("editButtonID").lastChild;
	button.textContent = "Save Changes";
	button.onclick = "saveChanges();";
}
/********************************************************************************************/
/* Replaces textfields in "Your Account" with information in textfield and changes button   */  
/*                                                                                          */
/* @todo Implement function                                                                 */
/********************************************************************************************/
function saveChanges() {
	
}
/********************************************************************************************/
/* buildOrderCard will build the order card and add it to the bottom of the order list      */
/* when you call it.                                                                        */
/*                                                                                          */
/* @todo inserting photo of food has not been implemented                                   */
/* @todo fix height sizing of rows in cards                                                 */ 
/*                                                                                          */
/* String restaurantName  name of the restaurant                                            */
/* String dish1Name 	  name of the first dish from the order                             */
/* int    dish1Amount     the amount of dish1 ordered                                       */
/* String dish2Name       name of the second dish from the order                            */
/* int    dish2Amount     the amount of dish2 ordered                                       */
/* float  total           the total cost of the order                                       */
/********************************************************************************************/
function buildOrderCard(restaurantName, dish1Name, dish1Amount, dish2Name, dish2Amount, total) {
	//getting node of order history list
	let newCard = document.getElementById('orderHistoryContainer');
	
	//adding <div class = "orderCardContainer">
	newCard.appendChild(document.createElement("div"));
	newCard = newCard.lastChild;
	newCard.className = "orderCardContainer";
	
	//adding <div class = "orderCardPhoto">
	newCard.appendChild(document.createElement("div"));
	newCard = newCard.lastChild;
	newCard.className = "orderCardPhoto";
	newCard.innerHTML = "This card was built by buildOrderCard(). Check javascript file for more info";
	
	//adding <div class = "cardInfoContainer">
	newCard = newCard.parentNode;
	newCard.appendChild(document.createElement("div"));
	newCard = newCard.lastChild;
	newCard.className = "cardInfoContainer";
	
	//adding <div class = "cardRestaurantName">
	newCard.appendChild(document.createElement("div"));
	newCard = newCard.lastChild;
	newCard.className = "cardRestaurantName";
	newCard.innerHTML = restaurantName;
	
	//adding FIRST <div class = "cardRow">
	newCard = newCard.parentNode;
	newCard.appendChild(document.createElement("div"));
	newCard = newCard.lastChild;
	newCard.className = "cardRow";
	
	//adding <div class = "totalText">
	newCard.appendChild(document.createElement("div"));
	newCard.lastChild.className = "totalText";
	newCard.lastChild.innerHTML = "Total:"
	
	//adding <div class = "total">
	newCard.appendChild(document.createElement("div"));
	newCard.lastChild.className = "total";
	newCard.lastChild.innerHTML = "$" + total;
	
	//adding SECOND <div class = "cardRow">
	newCard = newCard.parentNode;
	newCard.appendChild(document.createElement("div"));
	newCard = newCard.lastChild;
	newCard.className = "cardRow";
	
	//adding <div class = "dishAmount">
	newCard.appendChild(document.createElement("div"));
	newCard.lastChild.className = "dishAmount";
	newCard.lastChild.innerHTML = dish1Amount;
	
	//adding <div class = "dishName">
	newCard.appendChild(document.createElement("div"));
	newCard.lastChild.className = "dishName";
	newCard.lastChild.innerHTML = dish1Name;
	
	//adding Third <div class = "cardRow">
	newCard = newCard.parentNode;
	newCard.appendChild(document.createElement("div"));
	newCard = newCard.lastChild;
	newCard.className = "cardRow";
	
	//adding <div class = "dishAmount">
	newCard.appendChild(document.createElement("div"));
	newCard.lastChild.className = "dishAmount";
	newCard.lastChild.innerHTML = dish2Amount;
	
	//adding <div class = "dishName">
	newCard.appendChild(document.createElement("div"));
	newCard.lastChild.className = "dishName";
	newCard.lastChild.innerHTML = dish2Name;
}
