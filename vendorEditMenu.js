// Adds text entry for menu item attributes (name, price, calories)
function addTextField(x) {
	x.style.display = "none";
	x.parentNode.childNodes[7].style.display = "block";
	
	let menuItem = x.parentNode.parentNode;
		
	for (let i = 0; i < menuItem.childNodes.length; i++) {
		menuItem.childNodes[1].childNodes[i+1].innerHTML = "<input type = 'text' value = " + menuItem.childNodes[1].childNodes[i+1].innerText + ">";
	}   
}

// Adds a new section to the menu
// Craig's terrible version of Daniel's implementation
// DO NOT USE IN FINAL VERSION - GOOD ENOUGH FOR DEMONSTRATION
function addSection(button) {
	let position = button.parentNode.parentNode;
	
	// New menu section HTML is set to template
	position.outerHTML = "<div class = \"sectionHeader\"><div class = \"sectionTitle\">Section Title</div><div class = \"sectionButtonContainer\"><button class = \"sectionButton\"> Rename Section </button><button class = \"sectionButton\" onclick=\"deleteSection(this);\"> Delete Section </button></div><div class = \"sectionBar\"> . </div><div class = \"menuEditor\"><div class = \"itemContainer\"><div class = \"leftMenuItem\"><div class = \"menuItemImage\">Food photo goes here</div><div class = \"menuItemInfo\"><div class = \"itemInfo\"><div class = \"itemName\"> Food Name </div><div class = \"itemCalories\"> Calories </div><div class = \"itemPrice\"> Price </div></div><div class = \"itemButtonContainer\"><button class = \"itemButton\" onclick = \"addTextField(this);\"> Edit Item </button><button class = \"itemButton\" > Delete Item </button><button class = \"redButton\" > Mark Unavailable </button><button hidden class = \"itemButton\" onclick=\"saveChanges(this);\"> Save Changes </button></div></div></div><div class = \"rightMenuItem\"><div class = \"menuItemImage\">Food photo goes here</div><div class = \"menuItemInfo\"><div class = \"itemInfo\"><div class = \"itemName\"> Food Name </div><div class = \"itemCalories\"> Calories </div><div class = \"itemPrice\"> Price </div></div><div class = \"itemButtonContainer\"><button class = \"itemButton\"> Edit Item </button><button class = \"itemButton\"> Delete Item </button><button class = \"redButton\"> Mark Unavailable </button></div></div></div></div><div class = \"itemContainer\"><div class = \"leftMenuItem\"><div class = \"menuItemImage\">Food photo goes here</div><div class = \"menuItemInfo\"><div class = \"itemInfo\"><div class = \"itemName\"> Food Name </div><div class = \"itemCalories\"> Calories </div><div class = \"itemPrice\"> Price </div></div><div class = \"itemButtonContainer\"><button class = \"itemButton\"> Edit Item </button><button class = \"itemButton\"> Delete Item </button><button class = \"redButton\"> Mark Unavailable </button></div></div></div><div class = \"rightMenuItem\"><div class = \"menuItemImage\">Food photo goes here</div><div class = \"menuItemInfo\"><div class = \"itemInfo\"><div class = \"itemName\"> Food Name </div><div class = \"itemCalories\"> Calories </div><div class = \"itemPrice\"> Price </div></div><div class = \"itemButtonContainer\"><button class = \"itemButton\"> Edit Item </button><button class = \"itemButton\"> Delete Item </button><button class = \"redButton\"> Mark Unavailable </button></div></div></div></div></div></div>";
	
	// Append the header for a new section
	document.body.appendChild(document.createElement("div"));
	console.log(position.outerHTML);
	position = document.body.lastChild;
	console.log(position.outerHTML);
	position.outerHTML = "<div class = \"vendorMenu\"><div class = \"sectionHeader\"><div class = \"sectionTitle\">Section Title</div><div class = \"sectionButtonContainer\"><button class = \"sectionButton\" onclick = \"addSection(this);\"> Add Section </button></div><div class = \"sectionBar\"> . </div></div></div>";
}

// Function to "delete" a section
function deleteSection(button) {
	let position = button.parentNode.parentNode.parentNode;
	
	// Nuclear option - completely wipes the HTML.
	//position.outerHTML = "";
	
	// Less aggressive option - hides the section.
	position.style.display = "none";
}