let dropDownMenu = document.getElementById("shoppingCartIcon");
let object = JSON.parse(document.getElementById("serverData").innerHTML);


dropDownMenu.addEventListener("mouseenter", displayShoppingCart());
function search() {

  clearResults();
  let obj = object;
  let entry = document.getElementById("searchStyle").value;

  if (entry != "") {
    for (let i = 0; i < obj.menu.length; i++) {
            // console.log(obj.menu[i].vendorName);
      if (obj.menu[i].vendorName.toLowerCase().includes(entry.toLowerCase())) {

        displayRestaurant(obj.menu[i]);
      }
    }
  }
  else {
    clearResults();
  }
}

function displayRestaurant(menu) {
  let list = document.getElementById("restaurantResults");
  list.appendChild(document.createElement("div"));
  list.lastChild.className = "resultsContainer";
  list.lastChild.innerHTML = menu.vendorName;
  var att = document.createAttribute("onclick");

  att.value = "submitItem("+ "'" + menu.vendorEmail +"'" + ");";
  list.lastChild.setAttributeNode(att);
  // list.lastChild.onclick = "submitItem(this)";
}
function submitItem(email){
  console.log("AYYA BOIH");
  document.getElementById("post1").children[0].value = email;
  console.log(document.getElementById("post1").children[0].value);
  document.getElementById("post1").submit();
}
function displayItem(item, quantity, price) {
  // console.log(item +", " + quantity + ", " + price);
}
function clearResults() {
  let restaurantList = document.getElementById("restaurantResults");
  let result = restaurantList.lastChild;
  while (result) {
      restaurantList.removeChild(result);
      result = restaurantList.lastChild;
  }
  restaurantList.appendChild(document.createElement("h3"));
  restaurantList.lastChild.innerHTML = "Restaurant Results";

  let itemList = document.getElementById("itemResults");
  result = itemList.lastChild;
  while (result) {
      itemList.removeChild(result);
      result = itemList.lastChild;
  }
  itemList.appendChild(document.createElement("h3"));
  itemList.lastChild.innerHTML = "Item Results";
}
function displayShoppingCart() {
  //@TODO implement list of shopping cart using addItemToShoppingCart functionality
  //cannot implement this until shoppingcart data is properly stored in database
  //we need to talk about this before implementing!
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

  menu = menu.lastChild;
  menu.appendChild(document.createElement("td"))
  menu.lastChild.className = "itemListName";
  menu.lastChild.innerHTML = item;

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
function buildVendorCard(name, image, email) {
  let post = document.getElementById("post1");
  let advertise = document.getElementById("advertisementContainer");
  advertise.appendChild(document.createElement("div"));
  advertise.lastChild.className = "vendorCard";

  advertise = advertise.lastChild;
  advertise.appendChild(document.createElement("div"));
  advertise.lastChild.className = "itemPhoto";
  advertise.lastChild.appendChild(document.createElement("img"));
  advertise.lastChild.lastChild.className = "imageStyle";
  advertise.lastChild.lastChild.src = image;

  advertise.appendChild(document.createElement("div"));
  advertise.lastChild.className = "restaurantName";
  advertise.lastChild.innerHTML = name;

  advertise.appendChild(document.createElement("div"));
  advertise.lastChild.innerHTML = email;
  advertise.appendChild(document.createElement("button"));
  advertise.lastChild.className = "btn btn-outline-primary";
  advertise.lastChild.innerHTML = "See Menu";

  // advertise.appendChild(document.createElement("a"));
  // advertise.lastChild.className = "btn btn-primary";
  //    advertise.lastChild.href = "/" + email;

  advertise.lastChild.setAttribute("onclick", "submitForm(this)");

  // console.log(post.children[0].value);
  // advertise.lastChild.addEventListener("click", submitForm(this));
}
function submitForm(button){
  console.log("******************************");
  console.log(button.previousElementSibling.innerHTML);
    console.log("******************************");

  document.getElementById("post1").children[0].value = button.previousElementSibling.innerHTML.trim();
  console.log(document.getElementById("post1").children[0].value);
  document.getElementById("post1").submit();
}
