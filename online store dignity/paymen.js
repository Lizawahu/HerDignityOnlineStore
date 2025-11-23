const paymentForm = document.getElementById("payment-form");

if (paymentForm) {
  paymentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const address = document.getElementById("address").value.trim();
    const city = document.getElementById("city").value.trim();
    const zip = document.getElementById("zip").value.trim();
    const cardName = document.getElementById("card-name").value.trim();
    const cardNumber = document.getElementById("card-number").value.trim();
    const expiry = document.getElementById("expiry").value.trim();
    const cvv = document.getElementById("cvv").value.trim();

    if (!name || !address || !city || !zip || !cardName || !cardNumber || !expiry || !cvv) {
      alert("Please fill in all fields.");
      return;
    }

    if (cardNumber.length !== 16 || isNaN(cardNumber)) {
      alert("Card number must be 16 digits.");
      return;
    }

    if (cvv.length !== 3 || isNaN(cvv)) {
      alert("CVV must be 3 digits.");
      return;
    }

    // Simulate payment success
    alert("Payment successful!");
    localStorage.removeItem("cart");
    window.location.href = "confirmation.html";
  });
}