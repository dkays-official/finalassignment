window.onload = function(){
  localStorage.setItem('isLoggedIn', 'false')
}
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const pass = document.getElementById("psw");
const singUpForm = document.getElementById("regForm");


singUpForm.addEventListener("submit", function (e) {
  e.preventDefault();
  registration();
});

function registration() {

  if (localStorage) {

    if (regCheck()) {

      const user = {
        fname: fname.value,
        lname: lname.value,
        email: email.value,
        password: pass.value,
      };

      localStorage.setItem(user.email, JSON.stringify(user));


      window.location.href = "./pages/loginPage.html";
    }
  } 
}

function regCheck() {
  let isValid = true;
  document.querySelectorAll("small").forEach((errorElement) => {
    errorElement.textContent = "";
  });
  document.querySelectorAll(".form-group").forEach((group) => {
    group.classList.remove("errClass");
  });

  const fnameRegex = /^[A-Za-z. ]{3,20}$/;
  const lnameRegex = /^[A-Za-z. ]{3,20}$/;
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9@#$%^&*]{8,15}$/;

  // Validate first name
  if (!fname.value.trim()) {
    document.getElementById("fnameerror").textContent = "*First name is required";
    fname.className = "errClass";
    isValid = false;
  } else if (!fnameRegex.test(fname.value)) {
    document.getElementById("fnameerror").textContent = "First name should only contain letters, spaces, and periods";
    fname.className = "errClass";
    isValid = false;
  }

  // Validate last name
  if (!lname.value.trim()) {
    document.getElementById("lnameerror").textContent = "*Last name is required";
    lname.className = "errClass";
    isValid = false;
  } else if (!lnameRegex.test(lname.value)) {
    document.getElementById("lnameerror").textContent = "Last name should only contain letters, spaces, and periods";
    lname.className = "errClass";
    isValid = false;
  }

  // Validate email
  if (!email.value.trim()) {
    document.getElementById("emailerror").textContent = "*Email is required";
    email.className = "errClass";
    isValid = false;
  }
  if (!emailRegex.test(email.value)) {
    document.getElementById("emailerror").textContent = "*Invalid email address";
    email.className = "errClass";
    isValid = false;
  }

  if (!pass.value.trim()) {
    document.getElementById("passerror").textContent = "*Password is required";
    pass.className = "errClass";
    isValid = false;
  } else if (!passRegex.test(pass.value)) {
    document.getElementById("passerror").textContent = "Password must be 8-15 characters with at least one number, one special character, and one uppercase letter";
    pass.className = "errClass";
    isValid = false;
  }
  const existingEmail = JSON.parse(localStorage.getItem(email.value));
  if (existingEmail && existingEmail.email === email.value) {
    document.getElementById("emailerror").textContent = "*Email already exists";
    email.className = "errClass";
    isValid = false;
  }
  return isValid;
}

let exploreBtn = document.getElementById('explore')
exploreBtn.addEventListener('click', ()=>{
  localStorage.setItem('isLoggedIn', 'false')
})