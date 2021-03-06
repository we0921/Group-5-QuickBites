//jshint esversion:6

/********************************************************************************************/
/* buildOrderCard2 will build the order card and add it to the bottom of the order list      */
/* when you call it.                                                                        */
/*                                                                                          */
/* @todo inserting photo of food has not been implemented                                   */
/* @todo fix height sizing of rows in cards                                                 */
/*                                                                                          */
/* String userName  name of the user                                            */
/* String dish1Name 	  name of the first dish from the order                             */
/* int    dish1Amount     the amount of dish1 ordered                                       */
/* String dish2Name       name of the second dish from the order                            */
/* int    dish2Amount     the amount of dish2 ordered                                       */
/* float  total           the total cost of the order                                       */
/********************************************************************************************/
function buildOrderCard2(userName, dish1Name, dish1Amount, dish2Name, dish2Amount, total, image) {
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

	//adding <div class = "carduserName">
	newCard.appendChild(document.createElement("div"));
	newCard = newCard.lastChild;
	newCard.className = "carduserName";
	newCard.innerHTML = userName;

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
/* String userName  name of the user                                           */
/* String dish1Name 	  name of the first dish from the order                             */
/* int    dish1Amount     the amount of dish1 ordered                                       */
/* String dish2Name       name of the second dish from the order                            */
/* int    dish2Amount     the amount of dish2 ordered                                       */
/* float  total           the total cost of the order                                       */
/********************************************************************************************/
function buildOrderCard1(userName, dish1Name, dish1Amount, total, image) {
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
	// newCard = newCard.lastElementChild;
	newCard.appendChild(document.createElement("img"));
	newCard.children[0].src = image;
	// newCard = newCard.parentNode;

	//adding <div class = "cardInfoContainer">
	newCard = newCard.parentNode;
	newCard.appendChild(document.createElement("div"));
	newCard = newCard.lastChild;
	newCard.className = "cardInfoContainer";

	//adding <div class = "carduserName">
	newCard.appendChild(document.createElement("div"));
	newCard = newCard.lastChild;
	newCard.className = "carduserName";
	newCard.innerHTML = userName;

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

	//adding <div class = "user">
	supportTicket.appendChild(document.createElement("div"));
	supportTicket.lastChild.className = "user";
	supportTicket.lastChild.innerHTML = "User:" + name;

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
