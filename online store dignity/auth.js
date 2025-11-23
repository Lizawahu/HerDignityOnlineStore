// Login Form Validation
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    // Simulate login success
    alert("Login successful!");
    window.location.href = "products.html";
  });
}

// Signup Form Validation
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();

    if (!name || !email || password.length < 6) {
      alert("Please fill all fields and use a password with at least 6 characters.");
      return;
    }

    // Simulate signup success
    alert("Account created successfully!");
    window.location.href = "login.html";
  });
}