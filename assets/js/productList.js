  window.onload = function () {
    let loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    let user = JSON.parse(localStorage.getItem(loggedInUserEmail));
    let isLoggedIn = localStorage.getItem('isLoggedIn');
    if(isLoggedIn == 'false') {    
    let userNameBtn= document.getElementById(
        "userName"
      );
      userNameBtn.innerHTML = `<i class="fa fa-user"></i> Login`;
      let logoutBtn = document.getElementById("logout");
      let myOrderBtn = document.getElementById("orders");
      myOrderBtn.remove(); 
      logoutBtn.remove(); 
    }  
    else if (user) {
      document.getElementById(
        "userName"
      ).innerHTML = `<i class="fa fa-user"></i>  ${user.fname}`;
    }

  };

function cartUpdation() {
  let myCart = JSON.parse(localStorage.getItem("myCart"));
  let cartLength = myCart.length;
  let cartValue = document.getElementById("cart");
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn == "true") {
    cartValue.innerHTML = `Cart (${cartLength})`;
  }
}
let productList;
fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((data) => {
    productList = data.map((product) => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
        rating: product.rating,
      };
    });
    let listContainer = document.getElementById("listContainer");
    for (let product of productList) {
      let item = document.createElement("div");
      item.classList.add(
        "row",
        "p-2",
        "bg-white",
        "border",
        "rounded",
        "listItem"
      );
      item.innerHTML = `
  <div class="col-md-3 mt-1"><img class="img-fluid img-responsive rounded product-image"
          src="${product.image}">
          <label for="quantity">Quantity (between 3 and 10)</label>
  <input type="number" id="quantity" name="quantity" min="3" max="10" placeholder="3">
  </div>
  <div class="col-md-6 mt-1">
      <h5>${product.title}</h5>
      <div class="d-flex flex-row">
          <div class="ratings mr-2"><i class="fa fa-star"></i><i class="fa fa-star"></i><i
                  class="fa fa-star"></i><i class="fa fa-star"></i></div>
          <span>${product.rating["count"]}</span>
      </div>
      <div class="mt-1 mb-1 spec-1"><span>${product.category}</span>
          <p class="text-justify text-truncate para mb-0">${product.description}<br><br></p>
      </div>
      <div class="col-md-3 align-items-center align-content-center border-left mt-1">
          <div class="d-flex flex-row align-items-center">
              <h4 class="mr-1">&#8377; ${product.price}</h4>
          </div>
          <h6 class="text-success">Free shipping</h6>
          <div class="d-flex flex-column mt-4">
          <button class="details btn btn-primary btn-sm" type="button">Details</button>
            <button class="buyNow btn btn-outline-primary btn-sm mt-2"
            type="button">Buy Now</button>
            </div>            
                       
      </div>
  </div>
`;
      listContainer.append(item);
    }

    let searchBtn = document
      .getElementById("search")
      .addEventListener("click", function (e) {
        e.preventDefault();
        let searchValue = document.getElementById("searchInput").value;
        listContainer.innerHTML = "";
        let filteredProducts = productList.filter((product) =>
          product.title.toLowerCase().includes(searchValue.toLowerCase())
        );
        for (let product of filteredProducts) {
          let item = document.createElement("div");

          item.classList.add(
            "row",
            "p-2",
            "bg-white",
            "border",
            "rounded",
            "listItem"
          );
          item.innerHTML = `
      <div class="col-md-3 mt-1">
      <img class="img-fluid img-responsive rounded product-image"
        src="${product.image}">        
        </div>        
      <div class="col-md-6 mt-1">
        <h5>${product.title}</h5>
        <div class="d-flex flex-row">
          <div class="ratings mr-2"><i class="fa fa-star"></i><i class="fa fa-star"></i><i
            class="fa fa-star"></i><i class="fa fa-star"></i></div>
          <span>${product.rating["count"]}</span>
        </div>
        <div class="mt-1 mb-1 spec-1"><span>${product.category}</span>
          <p class="text-justify text-truncate para mb-0">${product.description}<br><br></p>
        </div>
        <div class="col-md-3 align-items-center align-content-center border-left mt-1">
          <div class="d-flex flex-row align-items-center">
            <h4 class="mr-1">&#8377; ${product.price}</h4>
          </div>
          <h6 class="text-success">Free shipping</h6>
          <div class="d-flex flex-column mt-4">
          <button class="details btn btn-primary btn-sm" type="button">Details</button>
            <button class="btn btn-outline-primary btn-sm mt-2 buyNow"
            type="button">Buy Now</button>
            <button class="btn btn-outline-primary btn-sm mt-2 addToCart"
            type="button">Add to Cart</button>
            </div>

        </div>
      </div>
    `;
          listContainer.append(item);
        }
      });

    let detailBtns = document.querySelectorAll(".details");
    detailBtns.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        let pTitle =
          item.parentElement.parentElement.parentElement.children[0].innerText;
        let selectedProduct = productList.filter(
          (product) => product.title.trim() == pTitle.trim()
        );
        localStorage.setItem("id", JSON.stringify(selectedProduct[0]));
        goTo();
      });
    });
    function goTo() {
      window.location.href = "./productDetail.html";
    }

    //BuyNow Starts
    let buyNowBtn = document.querySelectorAll(".buyNow");
buyNowBtn.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    let pTitle =
      item.parentElement.parentElement.parentElement.children[0].innerText;
    let buyNowProduct = productList.filter(
      (product) => product.title.trim() == pTitle.trim()
    );
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(buyNowProduct[0]);
    localStorage.setItem("cart", JSON.stringify(cart));
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn == "true") {
      window.location = "./checkoutPage.html";
    } else {
      window.location.href = "./loginPage.html";
    }
  });
});
    // Buy Now End

    //Cart Button
    let cartBtn = document.getElementById('cartBtn')
    cartBtn.addEventListener('click', ()=>{
      let isLoggedIn = localStorage.getItem('isLoggedIn')
      if(isLoggedIn != 'true'){
        alert('Please Login to see the cart items')
      }
      else{
          window.location.href = '../pages/checkoutPage.html'        
      }
    })
    
    LoginBtn =  document.getElementById('userName').addEventListener('click', ()=>{
      if(localStorage.getItem('isLoggedIn') == 'false')
      window.location.href = '../pages/loginPage.html'
    })
        
    //Logout Btn
    let logoutBtn = document.getElementById("logout");
    logoutBtn.addEventListener("click", () => {
      localStorage.setItem('isLoggedIn', 'false') 
      let isLoggedIn = localStorage.getItem('isLoggedIn')
      if(isLoggedIn == 'false')     
      window.location.href = "../pages/login.html";
    });


  })
  .catch((err) => console.error(err));
