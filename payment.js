// Payment page functionality
document.addEventListener('DOMContentLoaded', function() {
  initializePaymentPage();
});

function initializePaymentPage() {
  renderPaymentCartItems();
  setupPaymentMethodToggle();
  setupFormValidation();
  updatePayButtonAmount();
}

function renderPaymentCartItems() {
  const container = document.getElementById('payment-cart-items');
  
  if (cart.items.length === 0) {
      container.innerHTML = `
          <div class="empty-payment-cart">
              <p>Your cart is empty</p>
              <a href="products.html" class="continue-shopping-btn">Continue Shopping</a>
          </div>
      `;
      return;
  }

  container.innerHTML = cart.items.map(item => `
      <div class="payment-cart-item">
          <img src="${item.image}" alt="${item.name}">
          <div class="payment-cart-details">
              <h4>${item.name}</h4>
              <p class="quantity">Qty: ${item.quantity}</p>
          </div>
          <div class="payment-cart-price">
              KES ${(item.price * item.quantity).toLocaleString()}
          </div>
      </div>
  `).join('');

  updatePaymentSummary();
}

function updatePaymentSummary() {
  const subtotal = cart.getTotal();
  const shipping = 200;
  const total = subtotal + shipping;

  document.getElementById('payment-subtotal').textContent = `KES ${subtotal.toLocaleString()}`;
  document.getElementById('payment-shipping').textContent = `KES ${shipping.toLocaleString()}`;
  document.getElementById('payment-total').textContent = `KES ${total.toLocaleString()}`;
}

function updatePayButtonAmount() {
  const total = cart.getTotal() + 200;
  document.getElementById('pay-amount').textContent = total.toLocaleString();
}

function setupPaymentMethodToggle() {
  const cardRadio = document.getElementById('card');
  const mpesaRadio = document.getElementById('mpesa');
  const cardPayment = document.getElementById('card-payment');
  const mpesaPayment = document.getElementById('mpesa-payment');

  function togglePaymentMethods() {
      if (cardRadio.checked) {
          cardPayment.style.display = 'block';
          mpesaPayment.style.display = 'none';
      } else {
          cardPayment.style.display = 'none';
          mpesaPayment.style.display = 'block';
      }
  }

  cardRadio.addEventListener('change', togglePaymentMethods);
  mpesaRadio.addEventListener('change', togglePaymentMethods);
}

function setupFormValidation() {
  const form = document.getElementById('payment-form');
  const payButton = form.querySelector('.pay-now-btn');

  form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (cart.items.length === 0) {
          alert('Your cart is empty. Please add items to your cart before proceeding.');
          return;
      }

      if (validateForm()) {
          processPayment();
      }
  });

  // Real-time validation
  const inputs = form.querySelectorAll('input[required]');
  inputs.forEach(input => {
      input.addEventListener('blur', function() {
          validateField(this);
      });
      
      input.addEventListener('input', function() {
          clearFieldError(this);
      });
  });

  // Format card number
  const cardNumberInput = document.getElementById('card-number');
  if (cardNumberInput) {
      cardNumberInput.addEventListener('input', function(e) {
          let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
          let formattedValue = value.match(/.{1,4}/g)?.join(' ');
          e.target.value = formattedValue || value;
      });
  }

  // Format expiry date
  const expiryInput = document.getElementById('expiry');
  if (expiryInput) {
      expiryInput.addEventListener('input', function(e) {
          let value = e.target.value.replace(/[^0-9]/g, '');
          if (value.length >= 2) {
              value = value.substring(0, 2) + '/' + value.substring(2, 4);
          }
          e.target.value = value;
      });
  }
}

function validateForm() {
  let isValid = true;
  const form = document.getElementById('payment-form');
  const inputs = form.querySelectorAll('input[required]');

  inputs.forEach(input => {
      if (!validateField(input)) {
          isValid = false;
      }
  });

  return isValid;
}

function validateField(field) {
  const value = field.value.trim();
  let isValid = true;
  let errorMessage = '';

  clearFieldError(field);

  switch(field.id) {
      case 'card-number':
          const cardNumber = value.replace(/\s+/g, '');
          if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
              errorMessage = 'Please enter a valid 16-digit card number';
              isValid = false;
          }
          break;
      case 'expiry':
          if (!/^\d{2}\/\d{2}$/.test(value)) {
              errorMessage = 'Please enter a valid expiry date (MM/YY)';
              isValid = false;
          }
          break;
      case 'cvv':
          if (!/^\d{3}$/.test(value)) {
              errorMessage = 'Please enter a valid 3-digit CVV';
              isValid = false;
          }
          break;
      case 'phone':
      case 'mpesa-phone':
          const phone = value.replace(/\s+/g, '');
          if (!/^07\d{8}$/.test(phone)) {
              errorMessage = 'Please enter a valid Kenyan phone number (07XX XXX XXX)';
              isValid = false;
          }
          break;
      case 'email':
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
              errorMessage = 'Please enter a valid email address';
              isValid = false;
          }
          break;
      default:
          if (!value) {
              errorMessage = 'This field is required';
              isValid = false;
          }
  }

  if (!isValid) {
      showFieldError(field, errorMessage);
  }

  return isValid;
}

function showFieldError(field, message) {
  field.style.borderColor = '#ff4757';
  const errorElement = document.createElement('div');
  errorElement.className = 'field-error';
  errorElement.style.color = '#ff4757';
  errorElement.style.fontSize = '0.85em';
  errorElement.style.marginTop = '5px';
  errorElement.textContent = message;
  field.parentNode.appendChild(errorElement);
}

function clearFieldError(field) {
  field.style.borderColor = '';
  const existingError = field.parentNode.querySelector('.field-error');
  if (existingError) {
      existingError.remove();
  }
}

function processPayment() {
  const payButton = document.querySelector('.pay-now-btn');
  const btnText = payButton.querySelector('.btn-text');
  const btnLoading = payButton.querySelector('.btn-loading');
  
  // Show loading state
  payButton.disabled = true;
  btnText.style.display = 'none';
  btnLoading.style.display = 'inline-block';
  
  // Simulate payment processing
  setTimeout(() => {
      // In a real application, you would send the payment data to your server here
      const orderData = {
          items: cart.items,
          total: cart.getTotal() + 200,
          shipping: getFormData(),
          paymentMethod: document.querySelector('input[name="payment-method"]:checked').value,
          timestamp: new Date().toISOString(),
          orderId: 'HD' + Date.now()
      };
      
      // Save order data (in a real app, send to server)
      localStorage.setItem('lastOrder', JSON.stringify(orderData));
      
      // Clear cart and redirect to confirmation
      cart.clearCart();
      window.location.href = 'confirmation.html';
  }, 2000);
}

function getFormData() {
  return {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      address: document.getElementById('address').value,
      city: document.getElementById('city').value,
      zip: document.getElementById('zip').value
  };
}