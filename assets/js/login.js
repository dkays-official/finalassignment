// window.onload = function(){
//   localStorage.setItem('isLoggedIn', 'false')
// }
function login() {
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let email = document.getElementById("lemail").value;
    let password = document.getElementById("lpsw").value;
    let user = JSON.parse(localStorage.getItem(email));

    if (user && user.password === password) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("loggedInUserEmail", email);      
      window.location.href = "../pages/productList.html";
    } else {
      alert("Invalid email or password");
    }
  });
}

  