window.onload = function() {
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

    let orders = JSON.parse(localStorage.getItem("orders"));  
    if (orders && orders.length > 0) {
      let container = document.querySelector(".container");
      orders.reverse();  
      orders.forEach((order) => {
        let card = document.createElement("article");
        card.className = "card";
        card.innerHTML = `
          <div class="card-body">
           <span> <h6>Order ID: ${order.orderId}</h6></span>  </span>  <span>Date: ${order.orderDate}</span> <span>Time:${order.orderTime}</span>
            <hr>
            <ul class="row">
              ${order.items.map(item => `
                <li class="col-md-4">
                  <figure class="itemside mb-3">
                    <div class="aside"><img src="${item.image}" class="img-sm border"></div>
                    <figcaption class="info align-self-center">
                      <p class="title">${item.title}</p>
                      <span class="text-muted">&#8377; ${item.price} x 3</span>
                    </figcaption>
                  </figure>
                </li>
              `).join('')}
            </ul>
            <hr>
            <h5>Total Amount Paid : &#8377; ${order.totalAmount}</h5> <p>Delivery Address: ${order.address}</p>
          </div>
        `;
  
        container.appendChild(card);
      });
    } else {
      window.location.href = "."
    }
  };
  