// Load cart count on page load
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart-count").textContent = cart.length;
}

// Add product to cart
function addToCart(productId) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Product added to cart!");
}

// Toggle navigation menu
function toggleNav() {
  const nav = document.getElementById("main-nav");
  nav.classList.toggle("show");
}

// Run on page load
window.onload = () => {
  updateCartCount();
};
