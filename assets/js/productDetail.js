window.addEventListener("load", function () {
  let selectedProduct = JSON.parse(localStorage.getItem("id"));
  let cart = JSON.parse(localStorage.getItem("cart"));
  console.log(cart);
  let card = document.createElement('div');
  card.className = "card";
  card.innerHTML= `<nav>
  <a href="./productList.html">
    <svg class="arrow" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon points="352,115.4 331.3,96 160,256 331.3,416 352,396.7 201.5,256 " stroke="#727272"/></svg>
    Back to all Products
  </a>  
  <svg class="heart" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" stroke="#727272" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M340.8,98.4c50.7,0,91.9,41.3,91.9,92.3c0,26.2-10.9,49.8-28.3,66.6L256,407.1L105,254.6c-15.8-16.6-25.6-39.1-25.6-63.9  c0-51,41.1-92.3,91.9-92.3c38.2,0,70.9,23.4,84.8,56.8C269.8,121.9,302.6,98.4,340.8,98.4 M340.8,83C307,83,276,98.8,256,124.8  c-20-26-51-41.8-84.8-41.8C112.1,83,64,131.3,64,190.7c0,27.9,10.6,54.4,29.9,74.6L245.1,418l10.9,11l10.9-11l148.3-149.8  c21-20.3,32.8-47.9,32.8-77.5C448,131.3,399.9,83,340.8,83L340.8,83z" stroke="#727272"/></svg>
</nav>
<div class="photo">
  <img src="${selectedProduct.image}">
</div>  
<div class="description">
  <h2>${selectedProduct.title}</h2>
  <h4>${selectedProduct.category}</h4>
  <h1>&#8377 ${selectedProduct.price}</h1>
  <p>${selectedProduct.description}</p>
  <button onclick="addToCart()">Add to Cart</button>
  <button>Wishlist</button>
</div>`;
this.document.querySelector('body').append(card);
});
let selectedProduct = JSON.parse(localStorage.getItem("id"));
let cart = JSON.parse(localStorage.getItem('cart')) || [];
function addToCart(){
  if(!localStorage.getItem('cart')){
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  else{
    let cart = JSON.parse(localStorage.getItem('cart'))
    let product = selectedProduct;
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart))
  }
  console.log(JSON.parse(localStorage.getItem('cart')));
}
function addToCart() {
  let product = selectedProduct;
  if (!cart.some(item => item.id === product.id)) { 
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  console.log(JSON.parse(localStorage.getItem('cart')));
}

let cartBtn = document.getElementById('cartBtn')
cartBtn.addEventListener('click', ()=>{
  if(localStorage.getItem('isLoggedIn') == 'true')
  {
    window.location.href = '../pages/checkoutPage.html'
  }
  else{
    alert("Please login to see the cart Items")
  }
})

