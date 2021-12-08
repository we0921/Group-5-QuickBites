// SHOPPING CART!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
  for (let i = 4; i < fullUrl.length; i++) {
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
// SHOPPING CART!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
