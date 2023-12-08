    let cartTotal = 0;
    let cartGst = 0;
    let deliverCharges = 40;
    window.onload = function () {
      function billCalc() {
        let cartItems = JSON.parse(localStorage.getItem("cart"));
        cartItems.forEach((product) => {
          cartTotal += product["price"]*3;
        });
      }
      billCalc();
      cartGst = eval((Number(cartTotal) / 100) * 10);
      let container = document.querySelector(".window");
      container.innerHTML = `<div class='order-info'>
      <div class='order-info-content' id='cartItems'>
        <h2>Order Summary</h2>
        <div class='line'></div>
        <table class='order-table'>
          <tbody> 
            
          </tbody>
        </table>
        <div class='line'></div>
      </div>
      </div>
      <div class='orderDetails'>
      <div class='billingDetails'>
        <div class="customerDetails">
          <h3 id="billHeading"><b> Billing Details</b></h3>
          <br>
          Order Id : #12342
          <p>Name on the bill : ${user.fname} ${user.lname} </p>
          <label for="address">Delivery Address</label>
          <textarea class="form-control" id="addressField" placeholder="e.g 123 abc city, xyz State" maxlength="50"></textarea>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
              Set as Default
            </label>
          </div>
          <div class="savedAddress" id="savedAddress"><b>Select from saved addresses<b></div>
        </div>
        <div class='total'>
          <span style='float:left;'>
            <div class='thin dense'>GST 10%</div>
            <div class='thin dense'>Delivery</div>
            TOTAL
          </span>
          <span style='float:right; text-align:right;'>
            <div class='thin dense'>&#8377;${cartGst.toFixed(2)}</div>
            <div class='thin dense'>&#8377;${deliverCharges}</div>
            &#8377;${(cartTotal).toFixed(2)}
          </span>
        </div>
        <button class='pay-btn' id="checkoutBtn" onclick ="checkOut()" data-bs-toggle="modal" data-bs-target="#checkoutModal">Place Order</button>
      </div>
      </div>`;
      document.querySelector("tbody").remove();
      let cartItems = JSON.parse(localStorage.getItem("cart"));
      for (let i = 0; i < cartItems.length; i++) {
        cartTotal += cartItems[i].price*3;
        let item = document.createElement("tbody");
        item.innerHTML = `<tr><td><img src='${cartItems[i].image}' class='full-width'></img></td>
      <td>  <br> <span class='thin'>${cartItems[i].title} </span>
        <br>${cartItems[i].category}<br> <span class='thin small'> Delivery within 2-3 days<br></span><br>
        <small><span><label for="quantity">Quantity</label>
        <input type="number" id="quantity" name="quantity" min="3" max="10" placeholder="3"></span><small>
        <td><span><img class='delBtn' src ='../assets/images/delete.png' height='20px' width='20px'></img></span></td>
      
        <td>
        <div class='itemPrice'>&#8377;${cartItems[i].price * 3}</div>
      </td>
      </td>
    </tr>`;
        let itemsTable = document.querySelector("table");
        itemsTable.append(item);
      }
      savedAddress();
    };

    let buyNowProduct = JSON.parse(localStorage.getItem("buyNowProduct"));
    let loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    let user = JSON.parse(localStorage.getItem(loggedInUserEmail));
    if (!user.address) {
      user["address"] = [];
    }

    //Saved Address Function
    function savedAddress() {
      let savedAddresses = user["address"];
      let defaultAddress = user.defaultAddress;
    
      if (savedAddresses) {
        for (let i = 0; i < savedAddresses.length; i++) {
          let addressElement = document.createElement("div");
          addressElement.className = "form-check";
          addressElement.innerHTML = `<input class="form-check-input" type="radio" name="flexRadioDefault" id="address${i}">
          <label class="form-check-label" for="address${i}">
            ${savedAddresses[i]}
          </label>`;
          if (savedAddresses[i] === defaultAddress) {
            addressElement.querySelector('input').setAttribute('checked', 'checked');
          }        
          let savedAddress = document.getElementById("savedAddress");
          savedAddress.append(addressElement);
        }
      }
    }


    // Checkout Button
    function checkOut() {
      let add = document.getElementById("addressField").value.trim();
      if (add === "") {
        let selectedAddress = getSelectedAddress();
        if (selectedAddress) {
          add = selectedAddress;
        } else {
          alert("Please provide an address");
          return;   
        }
      }
      if (add !== "") {
        if (user.address.length < 4 && !user.address.includes(add)) {
          user.address.push(add);
          localStorage.setItem(loggedInUserEmail, JSON.stringify(user));
        } else if (user.address.length >= 4) {
          return;
        } else if (!user.address.includes(add)) {
          user.address.push(add); 
          localStorage.setItem(loggedInUserEmail, JSON.stringify(user));
        }
      }

      let order = {
        orderId: billGenerator(), 
        items: JSON.parse(localStorage.getItem("cart")),
        totalAmount: cartTotal,
        gst: cartGst,
        deliveryCharges: deliverCharges,
        address: add,
        orderDate: new Date().toLocaleDateString(),
        orderTime: new Date().toLocaleTimeString(),
      };
      let orders = JSON.parse(localStorage.getItem("orders")) || [];
      orders.push(order); 
      localStorage.setItem("orders", JSON.stringify(orders));

      let billModal = document.createElement('div');
      billModal.classList.add("modal", "fade");
      
      billModal.setAttribute("id", "checkoutModal");
      billModal.setAttribute("tabindex", "-1");
      billModal.setAttribute("aria-labelledby", "modal-center-title");
      billModal.setAttribute("aria-hidden", "true");
      billModal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modal-center-title">Order Placed Successfully!</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" class="popClose"></button>
            </div>
            <div class="modal-body">
              Thank you for shopping with Us! 
              <p></p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary btn-success" data-bs-dismiss="modal" onclick="popClose()">Continue Shopping</button>          
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(billModal);
      let checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
      checkoutModal.show();  
      localStorage.setItem('cart', JSON.stringify([]));
    }


    //Address Selector 
    function getSelectedAddress() {
      let selectedAddress = null;
      let radioButtons = document.querySelectorAll("input[type='radio']");
      for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
          selectedAddress = radioButtons[i].nextElementSibling.textContent.trim();
          break;
        }
      }
      return selectedAddress;
    } 

    //Bill Generator
    function billGenerator() {
      return Math.floor(Math.random() * 1000000);
    }

    //Pop Close 
    function popClose(){
      window.location.href = "../pages/productlist.html"
    }


    //Delete Product
    document.addEventListener("click", function (event) {
      if (event.target && event.target.classList.contains("delBtn")) {
        let index = Array.from(document.querySelectorAll(".delBtn")).indexOf(
          event.target
        );
        let cartItems = JSON.parse(localStorage.getItem("cart"));
        if (index > -1 && cartItems && cartItems.length > index) {
          cartItems.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(cartItems));
          event.target.closest("tbody").remove();
          cartTotal = 0;
          cartItems.forEach((product) => {
            cartTotal += product["price"];
          });
          window.location.reload();
          let total = document.querySelector(".total span:last-child");
          if (totalElement) {
            let gst = (cartTotal / 100) * 10;
            total.innerHTML = `&#8377;${cartTotal.toFixed(2)}`;
          }
        }
      }
    });
