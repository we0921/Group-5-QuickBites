let dropDownMenu = document.getElementById("shoppingCartIcon");
dropDownMenu.addEventListener("mouseenter", displayShoppingCart());
function search() {
  clearResults();
  let obj = [
    {
      //_id: new ObjectId("61a6ddcda69228ffb85256a4"),
      type: 'vendor',
      first: 'John',
      last: 'Smith',
      email: '1@2.com',
      password: '123',
      restaurant: 'Blue Lobster',
      approved: false,
      address: '',
      __v: 0
    },
    {
      //_id: new ObjectId("61a6fcd7311aa0af88945e68"),
      type: 'vendor',
      first: 'asdf',
      last: 'fdas',
      email: 'asdf@sadf.com',
      password: '123',
      restaurant: 'Red Robingsss',
      approved: false,
      address: '',
      __v: 0
    }
  ]
  let entry = document.getElementById("searchStyle").value;
  console.log(entry);
  if (entry != "") {
    for (let i = 0; i < obj.length; i++) {
      if (obj[i].restaurant.toLowerCase().includes(entry.toLowerCase())) {
        displayRestaurant(obj[i].restaurant);
      }
    }
  }
  else {
    clearResults();
  }
}

function displayRestaurant(restaurant) {
  let list = document.getElementById("restaurantResults");
  list.appendChild(document.createElement("div"));
  list.lastChild.className = "resultsContainer";
  list.lastChild.innerHTML = restaurant;
}
function displayItem(item, quantity, price) {
  console.log(item +", " + quantity + ", " + price);
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
  //creating itemList container
  let menu = document.getElementById("shoppingCartIcon");
  menu = menu.children[1];
  menu.appendChild(document.createElement("div"));
  menu.lastChild.className = "itemListContainer";

  //creating quantity container
  menu = menu.lastChild;
  menu.appendChild(document.createElement("div"));
  menu.lastChild.className = "itemListName";
  menu.lastChild.innerHTML = item;

  //creating quantity container
  menu.appendChild(document.createElement("div"));
  menu.lastChild.className = "itemListQuantity";
  menu.lastChild.innerHTML = quantity;

  //creating price container
  menu.appendChild(document.createElement("div"));
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
function buildVendorCard(name, image) {
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

  advertise.appendChild(document.createElement("button"));
  advertise.lastChild.innerHTML = "menu";
}
