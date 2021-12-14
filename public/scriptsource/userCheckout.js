//******************************************************
// FUNCTIONS FOR DROPDOWN SHOPPING CART
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
  //document.getElementById("removeItem").submit();
  console.log("item removed!");
}
function addCheckoutButton() {
  let menu = document.getElementById("shoppingCartIcon");
  menu = menu.children[menu.children.length - 1];
  menu.appendChild(document.createElement("button"));
  menu.lastElementChild.className = "shopButton";
  menu.lastElementChild.innerHTML = "Checkout";
  menu.lastElementChild.addEventListener("click", function(){});
}
function removeCheckoutButton() {
  let menu = document.getElementById("shoppingCartIcon");
  menu = menu.children[menu.children.length - 1];
  menu.lastChild.remove();
}
// END FUNCTIONS FOR DROPDOWN SHOPPING CART
//******************************************************


function addItemToCheckoutTable(item, quantity, price) {

  // Select the table
  let orderTable = document.getElementById("checkoutTable").children[0];
  var row;
  var entry;

  // Append a new row to the table
  row = orderTable.appendChild(document.createElement("tr"));

  // Create and append the item name
  entry = row.appendChild(document.createElement("td"));
  entry.className = "tableItem";
  entry.innerHTML = item;

  //adding button to name container
  var att = document.createAttribute("onclick");
  att.value = "removeItem(this)";
  row.lastChild.setAttributeNode(att);

  // Create and append the item quantity
  entry = row.appendChild(document.createElement("td"));
  entry.className = "tableItem";
  entry.innerHTML = quantity;

  // Create and append the item price
  entry = row.appendChild(document.createElement("td"));
  entry.className = "tableItem";
  entry.innerHTML = "$" + price;
}

function addTotal() {
  // Select the table.
  let orderTable = document.getElementById("checkoutTable").children[0];
  var total = Number(0);

  // Append a new row.
  orderTable.appendChild(document.createElement("tr"));

  // Navigate to the new row.
  let row = orderTable.lastChild;

  // Define entry and append the first two elements in the row
  // The first element says "Total:"
  // The second element is blank.
  var entry = row.appendChild(document.createElement("th"));
  entry.innerHTML = "Total:";
  row.appendChild(document.createElement("th"));
  row.appendChild(document.createElement("th"));

  // Iterate through the order to calculate the total price.
  for (var i = 1; i < orderTable.children.length - 1; i++) {
    row = orderTable.children[i];
    entry = row.children[2];
    let quantity = Number(row.children[1].innerHTML);
    var price = entry.innerHTML.toString().substr(1, entry.innerHTML.toString().length);

    total = total + (Number(price) * Number(quantity));
  }

  // Navigate to the final row and element. Set its value to be the order's total price.
  row = orderTable.lastChild;
  entry = row.lastChild;
  entry.innerHTML = "$" + total.toFixed(2);
}

function submitOrder() {
  // Grab and parse the menu and order
  let menuAndOrder = JSON.parse(document.getElementById("serverData").innerHTML);

  // Specifically use the order
  let order = menuAndOrder;

  // Add the special request
  menuAndOrder.specialRequest = document.getElementById("specialRequests").value;
  menuAndOrder.status = true;

  // Send it
  document.getElementById("postForm").children[0].value = JSON.stringify(menuAndOrder);
  console.log(menuAndOrder);
  document.getElementById("postForm").submit();
}
