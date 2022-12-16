let barsIcon = document.querySelector(".mobile .bars");
let xmarkIcon = document.querySelector(".mobile .xmark");
let mobNavList = document.querySelector(".mobile .mob-list ul");

barsIcon.addEventListener("click", showMobList);
function showMobList() {
  mobNavList.style.left = "0px";
  mobNavList.style.transition = ".3s";
  xmarkIcon.style.display = "flex";
  barsIcon.style.display = "none";
};

xmarkIcon.addEventListener("click", closeMobList);
function closeMobList() {
  mobNavList.style.left = "-200%";
  mobNavList.style.transition = ".8s";
  xmarkIcon.style.display = "none";
  barsIcon.style.display = "flex";
};

// Start Shopping Cart
let cartIcon = document.querySelectorAll(".cart");
let shoppingCart = document.querySelector(".shopping-cart");
let xmark = document.querySelector(".shopping-cart .xmark");

cartIcon.forEach((e) => {
  e.addEventListener("click", showCart);
})

function showCart() {
  shoppingCart.style.opacity = `1`;
  shoppingCart.style.visibility = `visible`;
  shoppingCart.style.transition = `.3s`;
};

xmark.addEventListener("click", closeCart);
function closeCart() {
  shoppingCart.style.opacity = `0`;
  shoppingCart.style.visibility = `hidden`;
  shoppingCart.style.transition = `.5s`;
};

// 

let trashIcon = document.querySelectorAll(".shopping-cart .trash-icon");
for (let i = 0; i < trashIcon.length; i++ ) {
  let button = trashIcon[i];
  button.addEventListener("click", removeFromCart);
};
function removeFromCart(event) {
  let button = event.target;
  button.parentElement.parentElement.remove();
  updateCartTotal();
};

let quantityInputs = document.querySelectorAll(".cart-box .quantity");
for (let i = 0; i < quantityInputs.length; i++) {
  let input = quantityInputs[i];
  input.addEventListener("change", updateCartTotal);
};
function updateCartTotal() {
  let cartItemContainer = document.querySelector(".shopping-cart");
  let cartBoxes = document.querySelectorAll(".cart-box");
  let total = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let quantityElement = cartBox.querySelector(".cart-box .quantity");
    let priceElement = cartBox.querySelector(".cart-price");
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    let quantity = quantityElement.value;
    total = total + (price * quantity);
  }
  document.querySelector(".shopping-cart .total-cart-price").innerText = "$" + total;
};


// 


let productBoxes = document.querySelectorAll(".products .product-boxes .box");

let addBtns = document.querySelectorAll(".add-cart-icon");

for (let i = 0; i < addBtns.length; i++) {
  let addBtn = addBtns[i];
  addBtn.addEventListener("click", addNewCartBox);
};

function addNewCartBox(event) {
  let addBtn = event.target;
  let productBox = addBtn.parentElement.parentElement.parentElement;
  console.log(productBox);
  let imageSrc = productBox.querySelector("img").src;
  let title = productBox.querySelector(".text h4").innerText;
  let price = productBox.querySelector(".text .product-price").innerText;
  addProductsToCart(imageSrc, title, price);
  updateCartTotal();
  showCart();
};
function addProductsToCart(imageSrc, title, price) {
  let productTitles = document.querySelectorAll(".cart-name");
  for (let i = 0; i < productTitles.length; i++) {
    if (productTitles[i].innerText === title) {
      let quantityInputs = document.querySelectorAll(".cart-box .quantity");
      quantityInputs[i].value++;
      return
    }
  }
  let newBox = document.createElement("div");
  newBox.classList.add("cart-box");
  let shoppingCartCont = document.querySelector(".shopping-cart .cart-boxes");
  shoppingCartCont.prepend(newBox);
  let newBoxContent = `
  <img src="${imageSrc}" alt="">
  <div class="text">
    <div class="cart-name">${title}</div>
    <div class="cart-price">${price}</div>
  </div>
  <div class="row">
    <input type="number" min="1" value="1" class="quantity">
    <i class="fa-solid fa-trash trash-icon"></i>
  </div>
  `
  newBox.innerHTML = newBoxContent;
  newBox.querySelector(".cart-box .trash-icon").addEventListener("click", removeFromCart);
  newBox.querySelector(".cart-box .quantity").addEventListener("change", updateCartTotal);
}

