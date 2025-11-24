// Extended Cart class for cart page functionality
class CartPage extends Cart {
  constructor() {
      super();
  }

  removeItem(productId) {
      const itemElement = document.querySelector(`[data-product-id="${productId}"]`);
      if (itemElement) {
          itemElement.classList.add('removing');
          setTimeout(() => {
              this.items = this.items.filter(item => item.id !== productId);
              this.saveCart();
              this.renderCart();
              this.updateCartCount();
          }, 300);
      }
  }

  updateQuantity(productId, newQuantity) {
      if (newQuantity < 1) {
          this.removeItem(productId);
          return;
      }

      const item = this.items.find(item => item.id === productId);
      if (item) {
          item.quantity = newQuantity;
          this.saveCart();
          this.renderCart();
          this.updateCartCount();
      }
  }

  renderCart() {
      const container = document.getElementById('cart-items');
      const emptyCart = document.getElementById('empty-cart');
      const checkoutBtn = document.getElementById('checkout-btn');

      if (this.items.length === 0) {
          container.innerHTML = '';
          if (emptyCart) emptyCart.style.display = 'block';
          if (checkoutBtn) checkoutBtn.disabled = true;
          return;
      }

      if (emptyCart) emptyCart.style.display = 'none';
      if (checkoutBtn) checkoutBtn.disabled = false;

      container.innerHTML = this.items.map(item => `
          <div class="cart-item" data-product-id="${item.id}">
              <img src="${item.image}" alt="${item.name}" class="cart-item-image">
              <div class="cart-item-details">
                  <div class="cart-item-header">
                      <div>
                          <h4 class="cart-item-name">${item.name}</h4>
                          <span class="cart-item-category">${item.category}</span>
                      </div>
                      <div class="cart-item-price">KES ${(item.price * item.quantity).toLocaleString()}</div>
                  </div>
                  <p class="cart-item-description">${item.description}</p>
                  <div class="cart-item-actions">
                      <div class="quantity-controls">
                          <button class="quantity-btn" onclick="cartPage.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                          <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                                 onchange="cartPage.updateQuantity(${item.id}, parseInt(this.value))">
                          <button class="quantity-btn" onclick="cartPage.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                      </div>
                      <button class="remove-btn" onclick="cartPage.removeItem(${item.id})">Remove</button>
                  </div>
              </div>
          </div>
      `).join('');
      
      this.updateSummary();
  }

  updateSummary() {
      const subtotal = this.getTotal();
      const shipping = 200;
      const total = subtotal + shipping;

      const subtotalEl = document.getElementById('subtotal');
      const shippingEl = document.getElementById('shipping');
      const totalEl = document.getElementById('cart-total');

      if (subtotalEl) subtotalEl.textContent = `KES ${subtotal.toLocaleString()}`;
      if (shippingEl) shippingEl.textContent = `KES ${shipping.toLocaleString()}`;
      if (totalEl) totalEl.textContent = `KES ${total.toLocaleString()}`;
  }

  attachEventListeners() {
      const checkoutBtn = document.getElementById('checkout-btn');
      if (checkoutBtn) {
          checkoutBtn.addEventListener('click', () => {
              if (this.items.length > 0) {
                  window.location.href = 'payment.html';
              }
          });
      }
  }
}

// Initialize cart page
const cartPage = new CartPage();

// Initialize cart page when DOM loads
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('cart-items')) {
      cartPage.renderCart();
      cartPage.attachEventListeners();
  }
});