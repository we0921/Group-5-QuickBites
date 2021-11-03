function addTextField(x) {
	x.style.display = "none";
	x.parentNode.childNodes[7].style.display = "block";
	
	let menuItem = x.parentNode.parentNode;
		
	for (let i = 0; i < menuItem.childNodes.length; i++) {
		menuItem.childNodes[1].childNodes[i+1].innerHTML = "<input type = 'text' value = " + menuItem.childNodes[1].childNodes[i+1].innerText + ">";
	}   
}

function