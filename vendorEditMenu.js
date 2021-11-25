let lastItemIsRight = true;	//keeps track of if the last menu item is in the right or left position

// Adds text entry for menu item attributes (name, price, calories)
function addTextField(position) {
	//Making save changes button visible
	position = position.parentNode.childNodes[7];
	position.style.display = 'block';
	
	//Making edit menu button invisible
	position = position.parentNode.childNodes[1];
	position.style.display = 'none';
	
	
	//setting the position of current node to parent of all text fields
	position = position.parentNode.parentNode.childNodes[1];
	
	//displaying all hidden textfields
	console.log(position.children);
	position.childNodes[1].style.display = 'block';
	position.childNodes[3].style.display = 'block';
	position.childNodes[5].style.display = 'block';
}

// Adds a new section to the menu
// Craig's terrible version of Daniel's implementation
// DO NOT USE IN FINAL VERSION - GOOD ENOUGH FOR DEMONSTRATION
function addSection(button) {
	let position = button.parentNode.parentNode;
	
	// New menu section HTML is set to template
	position.outerHTML = "<div class = \"sectionHeader\"><div class = \"sectionTitle\">Section Title</div><div class = \"sectionButtonContainer\"><button class = \"sectionButton\"> Rename Section </button><button class = \"sectionButton\" onclick=\"deleteSection(this);\"> Delete Section </button></div><div class = \"sectionBar\"> . </div><div class = \"menuEditor\"><div class = \"itemContainer\"><div class = \"leftMenuItem\"><div class = \"menuItemImage\">Food photo goes here</div><div class = \"menuItemInfo\"><div class = \"itemInfo\"><input hidden> <div class = \"itemName\"> Food Name </div><input hidden> <div class = \"itemCalories\"> Calories </div><input hidden> <div class = \"itemPrice\"> Price </div></div><div class = \"itemButtonContainer\"><button class = \"itemButton\" onclick = \"addTextField(this);\"> Edit Item </button><button class = \"itemButton\" onclick=\"deleteMenuItem(this);\"> Delete Item </button><button class = \"redButton\" > Mark Unavailable </button><button hidden class = \"itemButton\" onclick=\"saveChanges(this);\"> Save Changes </button></div></div></div><div class = \"rightMenuItem\"><div class = \"menuItemImage\">Food photo goes here</div><div class = \"menuItemInfo\"><div class = \"itemInfo\"><input hidden> <div class = \"itemName\"> Food Name </div><input hidden> <div class = \"itemCalories\"> Calories </div><input hidden> <div class = \"itemPrice\"> Price </div></div><div class = \"itemButtonContainer\"><button class = \"itemButton\" onclick = \"addTextField(this);\"> Edit Item </button><button class = \"itemButton\" onclick=\"deleteMenuItem(this);\"> Delete Item </button><button class = \"redButton\" > Mark Unavailable </button><button hidden class = \"itemButton\" onclick=\"saveChanges(this);\"> Save Changes </button></div></div></div></div><div class = \"itemContainer\"><div class = \"leftMenuItem\"><div class = \"menuItemImage\">Food photo goes here</div><div class = \"menuItemInfo\"><div class = \"itemInfo\"><input hidden> <div class = \"itemName\"> Food Name </div><input hidden> <div class = \"itemCalories\"> Calories </div><input hidden> <div class = \"itemPrice\"> Price </div></div><div class = \"itemButtonContainer\"><button class = \"itemButton\" onclick = \"addTextField(this);\"> Edit Item </button><button class = \"itemButton\" onclick=\"deleteMenuItem(this);\"> Delete Item </button><button class = \"redButton\" > Mark Unavailable </button><button hidden class = \"itemButton\" onclick=\"saveChanges(this);\"> Save Changes </button></div></div></div><div class = \"rightMenuItem\"><div class = \"menuItemImage\">Food photo goes here</div><div class = \"menuItemInfo\"><div class = \"itemInfo\"><input hidden> <div class = \"itemName\"> Food Name</div><input hidden> <div class = \"itemCalories\"> Calories</div><input hidden> <div class = \"itemPrice\"> Price</div></div><div class = \"itemButtonContainer\"><button class = \"itemButton\" onclick = \"addTextField(this);\"> Edit Item </button><button class = \"itemButton\" onclick=\"deleteMenuItem(this);\"> Delete Item </button><button class = \"redButton\" > Mark Unavailable </button><button hidden class = \"itemButton\" onclick=\"saveChanges(this);\"> Save Changes </button></div></div></div></div></div><div class = \"addItemContainer\"><button class = \"itemButton\" onclick=\"addMenuItem(this);\"> Add Item</button></div></div>";
	
	// Append the header for a new section
	document.body.appendChild(document.createElement("div"));
	console.log(position.outerHTML);
	position = document.body.lastChild;
	console.log(position.outerHTML);
	position.outerHTML = "<div class = \"vendorMenu\"><div class = \"sectionHeader\"><div class = \"sectionTitle\">Section Title</div><div class = \"sectionButtonContainer\"><button class = \"sectionButton\" onclick = \"addSection(this);\"> Add Section </button></div><div class = \"sectionBar\"> . </div></div></div>";
}

//this function works the first time, but every subsequent case does not
function saveChanges(position) {
	//setting position of node to "itemInfo"
	position = position.parentNode.parentNode.childNodes[1];
	
	let nameStr = position.childNodes[1].value;
	let caloriesStr = position.childNodes[5].value;
	let priceStr = position.childNodes[9].value;
	
	//destroying <div class = "itemInfo">
	position = position.parentNode;
	position.childNodes[1].remove();
	
	console.log(position);
	//adding <div class = "itemInfo">
	position.insertBefore(document.createElement("div"), position.firstChild);
	position = position.firstChild;
	position.className = "itemInfo";
	
	console.log(position);
	//adding <input hidden>
	position.appendChild(document.createElement("input"));
	position = position.lastChild;
	position.style.display = 'none';
	console.log(position);
	
	//adding <div class = "itemName">
	position = position.parentNode;
	position.appendChild(document.createElement("div"));
	position = position.lastChild;
	position.className = "itemName";
	position.innerHTML = nameStr;
	console.log(position);
	
	//adding <input hidden>
	position = position.parentNode;
	position.appendChild(document.createElement("input"));
	position = position.lastChild;
	position.style.display = 'none';
	console.log(position);
	
	//adding <div class = "itemCalories">
	position = position.parentNode;
	position.appendChild(document.createElement("div"));
	position = position.lastChild;
	position.className = "itemCalories";
	position.innerHTML = caloriesStr;
	console.log(position);
	
	//adding <input hidden>
	position = position.parentNode;
	position.appendChild(document.createElement("input"));
	position = position.lastChild;
	position.style.display = 'none';
	
	//adding <div class = "itemPrice">
	position = position.parentNode;
	position.appendChild(document.createElement("div"));
	position = position.lastChild;
	position.className = "itemPrice";
	position.innerHTML = priceStr;
	
	//fixing buttons
	position = position.parentNode.parentNode.childNodes[3];
	position.childNodes[1].style.display = 'block';
	position.childNodes[7].style.display = 'none';
	
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
	
	// Gets the last itemContainer in the menu section.
	let prevItemContainer = button.parentNode.previousSibling.previousSibling.lastElementChild;
	let menuEditor = button.parentNode.parentNode.children[3];
	
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
	
	position.id = "MenuItem_" + sectionNum + "_" + length;
	console.log(position.id);
		
	position.innerHTML = "<div class = \"menuItemImage\">Food photo goes here</div><div class = \"menuItemInfo\"><div class = \"itemInfo\"><div class = \"itemName\"> Food Name </div><div class = \"itemCalories\"> Calories </div><div class = \"itemPrice\"> Price </div></div><div class = \"itemButtonContainer\"><button class = \"itemButton\"> Edit Item </button><button class = \"itemButton\"> Delete Item </button><button class = \"redButton\"> Mark Unavailable </button></div></div>";
	
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


