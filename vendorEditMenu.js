function addTextField(x) {
	x.style.display = "none";
	x.parentNode.childNodes[7].style.display = "block";
	
	let menuItem = x.parentNode.parentNode;
		
	for (let i = 0; i < menuItem.childNodes.length; i++) {
		menuItem.childNodes[1].childNodes[i+1].innerHTML = "<input type = 'text' value = " + menuItem.childNodes[1].childNodes[i+1].innerText + ">";
	}   
}

function addSection(button) {
	let position = button.parentNode.parentNode;
	
	//adding <div class = "menuEditor">
	position.appendChild(document.createElement("div"));
	position = position.lastChild;
	position.className = "menuEditor";
	
	//adding <div class = "itemContainer">
	position.appendChild(document.createElement("div"));
	position = position.lastChild;
	position.className = "itemContainer";
	
	//--------------------------------------------top left menu item-------------------------------------------------------//
	//adding <div class = "leftMenuItem">
	position.appendChild(document.createElement("div"));
	position = position.lastChild;
	position.className = "leftMenuItem";
	
	//adding <div class = "menuItemImage">
	position.appendChild(document.createElement("div"));
	position = position.lastChild;
	position.className = "menuItemImage";
	position.innerHTML = "Food photo goes here";
	
	//adding <div class = "menuItemInfo">
	position = position.parentNode;
	position.appendChild(document.createElement("div"));
	position = position.lastChild;
	position.className = "menuItemInfo";
	
	//adding <div class = "itemInfo">
	position.appendChild(document.createElement("div"));
	position = position.lastChild;
	position.className = "itemInfo";
	
	//adding <div class = "itemButtonContainer">
	position = position.parentNode;
	position.appendChild(document.createElement("div"));
	position = position.lastChild;
	position.className = "itemButtonContainer";
	
	//--------------------------------------------top right menu item-------------------------------------------------------//
	position = position.parentNode.parentNode.parentNode;
	
	//adding <div class = "rightMenuItem">
	position.appendChild(document.createElement("div"));
	position = position.lastChild;
	position.className = "rightMenuItem";
	
	//adding <div class = "menuItemImage">
	position.appendChild(document.createElement("div"));
	position = position.lastChild;
	position.className = "menuItemImage";
	position.innerHTML = "Food photo goes here";
	
	//adding <div class = "menuItemInfo">
	position = position.parentNode;
	position.appendChild(document.createElement("div"));
	position = position.lastChild;
	position.className = "menuItemInfo";
	
	//adding <div class = "itemInfo">
	position.appendChild(document.createElement("div"));
	position = position.lastChild;
	position.className = "itemInfo";
	
	//adding <div class = "itemButtonContainer">
	position = position.parentNode;
	position.appendChild(document.createElement("div"));
	position = position.lastChild;
	position.className = "itemButtonContainer";
	
	//--------------------------------------------top left menu item-------------------------------------------------------//
	
	position = position.parentNode.parentNode.parentNode.parentNode;
	//adding <div class = "leftMenuItem">
	position.appendChild(document.createElement("div"));
	position = position.lastChild;
	position.className = "leftMenuItem";
	
	//adding <div class = "menuItemImage">
	position.appendChild(document.createElement("div"));
	position = position.lastChild;
	position.className = "menuItemImage";
	position.innerHTML = "Food photo goes here";
	
	//adding <div class = "menuItemInfo">
	position = position.parentNode;
	position.appendChild(document.createElement("div"));
	position = position.lastChild;
	position.className = "menuItemInfo";
	
	//adding <div class = "itemInfo">
	position.appendChild(document.createElement("div"));
	position = position.lastChild;
	position.className = "itemInfo";
	
	//adding <div class = "itemButtonContainer">
	position = position.parentNode;
	position.appendChild(document.createElement("div"));
	position = position.lastChild;
	position.className = "itemButtonContainer";
	
	//--------------------------------------------top right menu item-------------------------------------------------------//
	position = position.parentNode.parentNode.parentNode;
	
	//adding <div class = "rightMenuItem">
	position.appendChild(document.createElement("div"));
	position = position.lastChild;
	position.className = "rightMenuItem";
	
	//adding <div class = "menuItemImage">
	position.appendChild(document.createElement("div"));
	position = position.lastChild;
	position.className = "menuItemImage";
	position.innerHTML = "Food photo goes here";
	
	//adding <div class = "menuItemInfo">
	position = position.parentNode;
	position.appendChild(document.createElement("div"));
	position = position.lastChild;
	position.className = "menuItemInfo";
	
	//adding <div class = "itemInfo">
	position.appendChild(document.createElement("div"));
	position = position.lastChild;
	position.className = "itemInfo";
	
	//adding <div class = "itemButtonContainer">
	position = position.parentNode;
	position.appendChild(document.createElement("div"));
	position = position.lastChild;
	position.className = "itemButtonContainer";
	
	//--------------------Adding section header----------------------------------------------------------//
	//adding <div class = "vendorMenu">
	position = position.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
	position.appendChild(document.createElement("div"));
	position = position.lastChild;
	position.className = "vendorMenu";
	
	//adding <div class = "sectionHeader">
	position = position.parentNode;
	position.appendChild(document.createElement("div"));
	position = position.lastChild;
	position.className = "sectionHeader";
	
	//adding <div class = "sectionTitle">
	position = position.parentNode;
	position.appendChild(document.createElement("div"));
	position = position.lastChild;
	position.className = "sectionTitle";
	position.innerHTML = "Section Title";
	
	//adding <div class = "sectionButtonContainer">
	position = position.parentNode;
	position.appendChild(document.createElement("div"));
	position = position.lastChild;
	position.className = "sectionButtonContainer";
	
	//adding <div class = "sectionButton">
	position.appendChild(document.createElement("button"));
	position = position.lastChild;
	position.className = "sectionButton";
	//position.onclick = addSection(this);
	position.innerHTML = "Add Section";
	
	//adding <div class = "sectionButtonContainer">
	position = position.parentNode.parentNode;
	position.appendChild(document.createElement("div"));
	position = position.lastChild;
	position.className = "sectionBar";
	position.innerHTML = ".";
}
