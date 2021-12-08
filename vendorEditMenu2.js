//jshint esversion:6

// Adds text entry for menu item attributes (name, price, calories)
function addTextFields(button) {
	// Let position be the itemButtonContainer
	let position = button.parentNode;

	// Hide the Edit Item Button
	position.children[0].style.display = "none";

	// Show the Save Changes button
	position.children[3].style.display = "block";

	// Navigate to itemInfo div
	position = position.parentNode.children[0];

	// Make the current values hidden and display the input fields
	// Makes input fields have the value of the current values
	for (let i = 0; i < position.children.length; i++) {
		if (i % 2 == 0) {
			position.children[i].value = position.children[i+1].innerText;
			position.children[i].style.display = 'block';
		}
		else {
			position.children[i].style.display = 'none';
		}
	}
}

// Adds a new section to the menu
// Slightly less terrible Craig version
function addSection(button) {
	// Navigates to the sectionNew vendorMenu
	let position = button.parentNode.parentNode.parentNode;

	// Destroy the new section
	let newSection = position.outerHTML;
	position.outerHTML = "";

	// Account for header, banner, backgroundStockImage, and script
	let sectionCount = document.body.children.length - 4;

	//Increase by one, since we're adding a new section
	sectionCount++;

	// Create a new div
	document.body.appendChild(document.createElement("div"));

	// Move position to the new div
	position = document.body.children[document.body.children.length - 1];

	position.className = "vendorMenu";
	position.id = "Section_" + sectionCount;

	// Set the div to be an empty new section
	position.innerHTML = "<div class = \"sectionHeader\"><div class = \"sectionTitle\">Section Title</div><div class = \"sectionButtonContainer\"><button class = \"sectionButton\"> Rename Section </button><button class = \"sectionButton\" onclick=\"deleteSection(this);\"> Delete Section </button></div><div class = \"sectionBar\"></div><div class = \"menuEditor\"></div><div class = \"addItemContainer\"><button class = \"itemButton\" onclick=\"addItemToThisSection(this);\"> Add Item</button></div></div>";

	// Append the header for a new section
	document.body.appendChild(document.createElement("div"));
	position = document.body.lastChild;
	position.outerHTML = newSection;
}

// Saves the changes made after editing an item
function saveChanges(button) {
	// Let position be the itemButtonContainer
	let position = button.parentNode;

	// Hide the Save Changes button
	position.children[3].style.display = "none";

	// Show the Edit Item Button
	position.children[0].style.display = "block";

	// Navigate to itemInfo div
	position = position.parentNode.children[0];

	// Saves the values from the input fields
	// and makes the input fields no longer visible
	for (let i = 0; i < position.children.length; i++) {
		if (i % 2 == 0) {
			position.children[i].style.display = 'none';
		}
		else {
			position.children[i].innerText = position.children[i-1].value;
			position.children[i].style.display = 'block';
		}
	}
}

// Function to "delete" a menu item
function deleteMenuItem(button) {
	let targetItem = button.parentNode.parentNode.parentNode;
	let itemContainer = button.parentNode.parentNode.parentNode.parentNode;

	// If the left menu item is deleted, copy the right's info into the left
	if (targetItem.className == "leftMenuItem") {
		console.log("IN");
		targetItem.innerHTML = itemContainer.children[1].innerHTML;
		itemContainer.children[1].outerHTML = "";
	}
	// Otherwise delete the item.
	else {
		targetItem.outerHTML = "";
	}
}

// Function to "delete" a section
function deleteSection(button) {
	let position = button.parentNode.parentNode.parentNode;

	// Nuclear option - completely wipes the HTML.
	position.outerHTML = "";

	// Less aggressive option - hides the section.
	//position.style.display = "none";
}

// Function to add an item to an existing menu section.
function addItemToThisSection(button) {

	let menuEditor = button.parentNode.parentNode.children[3];
	let itemContainerCount = menuEditor.children.length;
	let prevItemContainer;

	// Gets the last itemContainer in the menu section.
	if (itemContainerCount > 0) {
		prevItemContainer = menuEditor.children[menuEditor.children.length - 1];
	}

	let sectionID = menuEditor.parentNode.parentNode.id;
	let sectionNum = sectionID.substring(8, sectionID.length);

	let position;

	// Used for setting item ID.
	let length = 1;

	// Iterate through the itemContainers to count how many items exist.
	for (let i = 0; i < menuEditor.children.length; i++) {
		length += menuEditor.children[i].children.length;
	}

	// If the itemContainer is full, add a new one with a single item.
	if (itemContainerCount == 0 || prevItemContainer.children.length == 2)
	{
		// Add a new itemContainer div to the menuEditor
		menuEditor.appendChild(document.createElement("div"));

		// Move position to the newly added div
		position = menuEditor.children[menuEditor.children.length - 1];

		// Set the div to an itemContainer
		position.className = "itemContainer";

		// Create a leftMenuItem
		position.appendChild(document.createElement("div"));

		// Move position to the newly added div
		position = position.children[0];
		position.className = "leftMenuItem";
	}
	// Otherwise add an item to the itemContainer
	else {
		// Move position to the last div in the menuEditor
		position = menuEditor.children[menuEditor.children.length - 1];

		// Add a div to the current itemContainer
		position.appendChild(document.createElement("div"));

		// Move position to the newly added div
		position = position.children[position.children.length - 1];

		// Create a rightMenuItem
		position.className = "rightMenuItem";
	}

	position.id = "MenuItem_" + sectionNum + "_" + length;
	console.log(position.id);

	position.innerHTML = "<div class = \"menuItemImage\">Food photo goes here</div><div class = \"menuItemInfo\"><div class = \"itemInfo\"><input class = \"nameInput\"> <div class = \"itemName\"> Food Name </div><input class = \"calInput\"> <div class = \"itemCalories\"> Calories </div><input class = \"priceInput\"> <div class = \"itemPrice\"> Price </div></div><div class = \"itemButtonContainer\"><button class = \"itemButton\" onclick = \"addTextFields(this);\"> Edit Item </button><button class = \"itemButton\" onclick=\"deleteMenuItem(this);\"> Delete Item </button><button class = \"redButton\" > Mark Unavailable </button><button hidden class = \"itemButton\" onclick=\"saveChanges(this);\">Save Changes </button></div></div>";

	console.log("ITEM ADDED");
}

// Function to add an item
function addMenuItem(sectionNumber, itemNumber, foodName, calories, price) {

	let section = document.getElementById("Section_" + sectionNumber);
	let menuEditor = section.children[0].children[3];

	// Gets the last itemContainer in the menu section.
	let prevItemContainer = menuEditor.children[menuEditor.children.length - 1];

	let position;

	// If the itemContainer is full, add a new one with a single item.
	if (prevItemContainer.children.length == 2)
	{
		// Add a new itemContainer div to the menuEditor
		menuEditor.appendChild(document.createElement("div"));

		// Move position to the newly added div
		position = menuEditor.children[menuEditor.children.length - 1];

		// Set the div to an itemContainer
		position.className = "itemContainer";

		// Create a leftMenuItem
		position.appendChild(document.createElement("div"));

		// Move position to the newly added div
		position = position.children[0];
		position.className = "leftMenuItem";
	}
	// Otherwise add an item to the itemContainer
	else {
		// Move position to the last div in the menuEditor
		position = menuEditor.children[menuEditor.children.length - 1];

		// Add a div to the current itemContainer
		position.appendChild(document.createElement("div"));

		// Move position to the newly added div
		position = position.children[position.children.length - 1];

		// Create a rightMenuItem
		position.className = "rightMenuItem";
	}

	position.id = "MenuItem_" + sectionNumber + "_" + itemNumber;

	position.appendChild(document.createElement("div"));
	position.children[0].className = "menuItemImage";
	position.children[0].value = "Food photo goes here";

	position.appendChild(document.createElement("div"));
	position.children[1].className = "menuItemInfo";

	// Move to menuItemInfo div
	position = posiition.children[1];
	position.appendChild(document.createElement("div"));
	position.children[0].className = "itemInfo";
	position.appendChild(document.createElement("div"));
	position.children[1].className = "itemButtonContainer";

	// Set the new item's values to that of the arguments
	position.children[0].innerHTML = "<input hidden> <div class = \"itemName\">" +foodName + "</div><input hidden> <div class = \"itemCalories\">" + calories + "</div><input hidden> <div class = \"itemPrice\">" + price + "</div>";

	// Add the buttons
	position.children[1].innerHTML = "<button class = \"itemButton\"> Edit Item </button><button class = \"itemButton\"> Delete Item </button><button class = \"redButton\"> Mark Unavailable </button></div>";

	console.log("ITEM ADDED");
}
