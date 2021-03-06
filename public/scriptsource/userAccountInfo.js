document.getElementById("editButtonID").addEventListener("click", editInfo);
function displayAccountInfo(email, name, password, address) {
	document.getElementById("userEmail").childNodes[1].innerHTML = email;
	document.getElementById("userName").childNodes[1].innerHTML = name;
	document.getElementById("userPassword").childNodes[1].innerHTML = password;
	document.getElementById("userAddress").childNodes[1].innerHTML = address;
}
/********************************************************************************************/
/* Replaces current user information rows with textfields and a save changes button         */
/*                                                                                          */
/* NOTE: breaks formatting of "Your Account" when called                                    */
/* @todo fix where node is replaced when inserting textfield                                */
/********************************************************************************************/
function editInfo() {
	console.log("in editInfo");
	// /**************************************Email textfield***********************************/
	// //getting parent of node containing user's email
	// let p = document.getElementById("userEmail");
  //
	// //getting user's Email
	// let text = document.getElementById("userEmail").textContent;
  //
	// //creating input node
	// let newEmailNode = document.createElement("input");
	// newEmailNode.className = "accountInfoFormat";
	// newEmailNode.value = text.trim();
  //
	// //removing all children and appending new node.
	// p.innerHTML = "";
	// p.appendChild(newEmailNode);
  //
	// console.log(document.getElementById("userEmail").lastChild.value);

	/***************************************Name textfield***********************************/
	//getting parent of node containing user's name
	p = document.getElementById("userName");

	//getting user's name
	text = document.getElementById("userName").textContent;

	//creating input node
	let newNameNode = document.createElement("input");
	newNameNode.className = "accountInfoFormat";
	newNameNode.value = text.trim();

	//removing all children and appending new node.
	p.innerHTML = "";
	p.appendChild(newNameNode);

	/***************************************Password textfield***********************************/
	//getting parent of node containing user's password

	p = document.getElementById("userPassword");

	//getting user's password
	text = document.getElementById("userPassword").textContent;

	//creating input node
	let newPasswordNode = document.createElement("input");
	newPasswordNode.className = "accountInfoFormat";
	newPasswordNode.value = text.trim();

	//removing all children and appending new node.
	p.innerHTML = "";
	p.appendChild(newPasswordNode);

	/***************************************Address textfield***********************************/
	//getting parent of node containing user's address

	p = document.getElementById("userAddress");

	//getting user's name
	text = document.getElementById("userAddress").textContent;

	//creating input node
	let newAddressNode = document.createElement("input");
	newAddressNode.className = "accountInfoFormat";
	newAddressNode.value = text.trim();

	//removing all children and appending new node.
	p.innerHTML = "";
	p.appendChild(newAddressNode);

	/***************************************Save Changes Button***********************************/
	document.getElementById("editButtonID").removeEventListener("click", editInfo);
	let button = document.getElementById("editButtonID");
	button.setAttribute("id", "saveChangesID");
	button.lastChild.textContent = "Save Changes";
	document.getElementById("saveChangesID").addEventListener("click", saveChanges);
}
/********************************************************************************************/
/* Replaces textfields in "Your Account" with information in textfield and changes button   */
/*                                                                                          */
/* @todo Implement function                                                                 */
/********************************************************************************************/
function saveChanges() {
	/**************************************Email textfield***********************************/
    //getting parent of node containing user's email
    // let p = document.getElementById("userEmail");
    //
    // //getting user's Email
    // let text = document.getElementById("userEmail").lastChild.value;
    //
    // //creating input node
    // let newEmailNode = document.createElement("div");
    // newEmailNode.className = "accountInfoFormat";
    // newEmailNode.innerHTML = text.trim();
    //
    // //removing all children and appending new node.
    // p.innerHTML = "";
    // p.appendChild(newEmailNode);

	/**************************************Name textfield***********************************/
    //getting parent of node containing user's email
    p = document.getElementById("userName");

    //getting user's Name
    text = document.getElementById("userName").lastChild.value;

    //creating div node
    let newNameNode = document.createElement("div");
    newNameNode.className = "accountInfoFormat";
    newNameNode.innerHTML = text.trim();

    //removing all children and appending new node.
    p.innerHTML = "";
    p.appendChild(newNameNode);

	/**************************************Password textfield***********************************/
    //getting parent of node containing user's Password
    p = document.getElementById("userPassword");

    //getting user's Password
    text = document.getElementById("userPassword").lastChild.value;

    //creating div node
    let newPasswordNode = document.createElement("div");
    newPasswordNode.className = "accountInfoFormat";
    newPasswordNode.innerHTML = text.trim();

    //removing all children and appending new node.
    p.innerHTML = "";
    p.appendChild(newPasswordNode);

	/**************************************Address textfield***********************************/
    //getting parent of node containing user's address
    p = document.getElementById("userAddress");

    //getting user's Address
    text = document.getElementById("userAddress").lastChild.value;

    //creating div node
    let newAddressNode = document.createElement("div");
    newAddressNode.className = "accountInfoFormat";
    newAddressNode.innerHTML = text.trim();

    //removing all children and appending new node.
    p.innerHTML = "";
    p.appendChild(newAddressNode);

    /***************************************Save Changes Button***********************************/
    let button = document.getElementById("saveChangesID");
    button.id = "editButtonID";
    button.lastChild.textContent = "Edit Information";
    document.getElementById("editButtonID").addEventListener("click", editInfo);

		//submitting information to Server
		document.getElementById("post1").children[0].value = document.getElementById("userEmail").children[0].innerHTML;
		document.getElementById("post1").children[1].value = document.getElementById("userName").children[0].innerHTML;
		document.getElementById("post1").children[2].value = document.getElementById("userPassword").children[0].innerHTML;
		document.getElementById("post1").children[3].value = document.getElementById("userAddress").children[0].innerHTML;
    console.log(document.getElementById("userEmail").children[0].innerHTML);

		document.getElementById("post1").submit();
}
function addSupportButton(){

}
function removeSupportButton(){
	// let supportTicket = document.getElementById("supportTicketsContainer");
	// while (supportTicket){
	//
	// }

}
function buildSupportTicket(name, status, message) {
	//creating input node
    let supportTicket = document.getElementById("supportTicketsContainer");

	//adding <div class = "cardSupportTicket">
	supportTicket.appendChild(document.createElement("div"));
	supportTicket = supportTicket.lastChild;
	supportTicket.className = "cardSupportTicket";

	//adding <div class = "cardSupportTicketHead">
	supportTicket.appendChild(document.createElement("div"));
	supportTicket = supportTicket.lastChild;
	supportTicket.className = "cardSupportTicketHead";

	//adding <div class = "status">
	supportTicket.appendChild(document.createElement("div"));
	supportTicket.lastChild.className = "status";

	//adding <div class = "restaurant">
	supportTicket.appendChild(document.createElement("div"));
	supportTicket.lastChild.className = "restaurant";
	supportTicket.lastChild.innerHTML = "Restaurant:" + name;

	//adding <div class = "cardSupportTicketBody">
	supportTicket = supportTicket.parentNode;
	supportTicket.appendChild(document.createElement("div"));
	supportTicket.lastChild.className = "cardSupportTicketBody";
	supportTicket.lastChild.innerHTML = message;

	if (!status) {
		supportTicket.firstChild.firstChild.innerHTML = "Status: Active";
		supportTicket.firstChild.style.backgroundColor = "#FFD580";
		supportTicket.lastChild.style.backgroundColor = "#FFD580";
		supportTicket.style.backgroundColor = "#FFD580";
	}
	else {
		supportTicket.firstChild.firstChild.innerHTML = "Status: Resolved";
	}
}
/********************************************************************************************/
/* buildOrderCard2 will build the order card and add it to the bottom of the order list      */
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
function buildOrderCard2(restaurantName, dish1Name, dish1Amount, dish2Name, dish2Amount, total, image) {
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

	//adding image
	console.log(image);
	console.log(newCard);
	// newCard = newCard.lastElementChild;
	newCard.appendChild(document.createElement("img"));
	newCard.children[0].src = image;
	// newCard = newCard.parentNode;
	newCard.children[0].style.maxHeight = "100%";

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
	newCard.lastChild.innerHTML = "Total:";

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

/********************************************************************************************/
/* buildOrderCard2 will build the order card and add it to the bottom of the order list      */
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
function buildOrderCard1(restaurantName, dish1Name, dish1Amount, total, image) {
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

	//adding image
	console.log(image);
	console.log(newCard);
	// newCard = newCard.lastElementChild;
	newCard.appendChild(document.createElement("img"));
	newCard.children[0].src = image;
	// newCard = newCard.parentNode;
	newCard.children[0].style.maxHeight = "100%";

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
	newCard.lastChild.innerHTML = "Total:";

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
}
function addItemToShoppingCart(item, quantity, price) {
  removeCheckoutButton();
  //creating itemList table
  let menu = document.getElementById("shoppingCartIcon");
  menu = menu.children[1];
  menu.appendChild(document.createElement("table"));
  menu.lastChild.className = "itemListContainer";

  //creating a new row
  menu = document.getElementById("shoppingCartTable");
  menu.appendChild(document.createElement("tr"));

  //creating name container
  menu = menu.lastChild;
  menu.appendChild(document.createElement("td"))
  menu.lastChild.className = "itemListName";
  menu.lastChild.innerHTML = item;

  //adding button to name container
  var att = document.createAttribute("onclick");
  att.value = "removeItem(this)";
  menu.lastChild.setAttributeNode(att);
    menu.lastChild.style.cursor = "pointer";
  //creating quantity container
  menu = document.getElementById("shoppingCartTable");
  menu = menu.lastChild;
  menu.appendChild(document.createElement("td"));
  menu.lastChild.className = "itemListQuantity";
  menu.lastChild.innerHTML = quantity;

  //creating price container
  menu = document.getElementById("shoppingCartTable");
  menu = menu.lastChild;
  menu.appendChild(document.createElement("td"));
  menu.lastChild.className = "itemListPrice";
  menu.lastChild.innerHTML = "$" + price;

  addCheckoutButton();
}
function removeItem(nameNode) {
  //getting all information related to item in shopping cart and putting
  //it in an object
  let itemInfo = {};
  itemInfo.name = nameNode.innerHTML;
  itemInfo.quantity = nameNode.parentNode.children[1].textContent;
  itemInfo.price = nameNode.parentNode.children[2].textContent;

  let fullUrl = document.URL.split("/");
  let url = "";
  for (let i = 3; i < fullUrl.length; i++) {
    url += fullUrl[i];
  }

  submitRemoval(itemInfo, url);
}

function submitRemoval(item, url) {
  document.getElementById("removeItem").children[0].value = JSON.stringify(item);
  document.getElementById("removeItem").children[1].value = url;
  document.getElementById("removeItem").submit();
  console.log("item removed!");
}
function addCheckoutButton() {
  let menu = document.getElementById("shoppingCartIcon");
  menu = menu.children[menu.children.length - 1];
  menu.appendChild(document.createElement("button"));
  menu.lastElementChild.className = "shopButton";
  menu.lastElementChild.innerHTML = "Checkout";
  menu.lastElementChild.addEventListener("click", function(){
		  window.location.href = "/userCheckout";
	});
}
function removeCheckoutButton() {
  let menu = document.getElementById("shoppingCartIcon");
  menu = menu.children[menu.children.length - 1];
  menu.lastChild.remove();
}
