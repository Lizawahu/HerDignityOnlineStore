// Global products array (shared across all pages)
// PRODUCTS DATA
const products = [
  { id:1, name:"Elegant Floral Dress", price:3200, category:"clothing", image:"assets/products/dress1.jpg", description:"A beautiful floral dress perfect for casual outings and sunny days." },
  { id:2, name:"Classic Denim Jacket", price:4500, category:"clothing", image:"assets/products/denim_jacket.jpg", description:"Timeless denim jacket designed to elevate your wardrobe." },
  { id:3, name:"Women's Cotton T-Shirt", price:900, category:"clothing", image:"assets/products/tshirt1.jpg", description:"Soft and breathable cotton t-shirt available in multiple colors." },
  { id:4, name:"African Print Skirt", price:2500, category:"clothing", image:"assets/products/skirt1.jpg", description:"Stylish African print skirt representing culture and elegance." },
  { id:5, name:"Leather Handbag", price:3800, category:"accessories", image:"assets/products/bag1.jpg", description:"Premium leather handbag designed for durability and elegance." },
  { id:6, name:"Beaded Necklace", price:800, category:"accessories", image:"assets/products/necklace1.jpg", description:"Handcrafted beaded necklace with a cultural touch." },
  { id:7, name:"Ladies Bracelet Set", price:650, category:"accessories", image:"assets/products/bracelet1.jpg", description:"Beautiful bracelet set suitable for any occasion." },
  { id:8, name:"Stylish Sunglasses", price:1200, category:"accessories", image:"assets/products/sunglasses1.jpg", description:"UV-protection sunglasses with a modern, trendy design." },
  { id:9, name:"Motivational Book: Rise Above", price:1500, category:"books", image:"assets/products/book1.jpg", description:"An inspiring book encouraging women to rise above challenges." },
  { id:10, name:"Self-Love Journal", price:900, category:"books", image:"assets/products/journal1.jpg", description:"A guided journal to encourage mindfulness and self-reflection." },
  { id:11, name:"Fitness Leggings", price:1600, category:"clothing", image:"assets/products/leggings1.jpg", description:"Comfortable and flexible leggings perfect for workouts." },
  { id:12, name:"Women's Hoodie", price:2300, category:"clothing", image:"assets/products/hoodie1.jpg", description:"Cozy hoodie made from soft fleece material." },
  { id:13, name:"Elegant Earrings", price:500, category:"accessories", image:"assets/products/earrings1.jpg", description:"Simple yet elegant earrings that add a classy touch." },
  { id:14, name:"Leather Wallet", price:1100, category:"accessories", image:"assets/products/wallet1.jpg", description:"Compact leather wallet designed for everyday use." },
  { id:15, name:"Women Empowerment Book", price:1800, category:"books", image:"assets/products/book2.jpg", description:"A powerful book centered on empowering women around the world." },
  { id:16, name:"Casual Sneakers", price:3500, category:"clothing", image:"assets/products/sneakers1.jpg", description:"Comfortable and stylish sneakers perfect for daily wear." },
  { id:17, name:"Women's Sandals", price:1700, category:"clothing", image:"assets/products/sandals1.jpg", description:"Lightweight sandals designed for comfort and elegance." },
  { id:18, name:"Hair Accessory Set", price:450, category:"accessories", image:"assets/products/hairset1.jpg", description:"A set of hair accessories suitable for all styles." },
  { id:19, name:"Daily Planner Book", price:1300, category:"books", image:"assets/products/planner1.jpg", description:"Daily planner designed to help you stay organized." },
  { id:20, name:"Luxury Perfume", price:5200, category:"accessories", image:"assets/products/perfume1.jpg", description:"Long-lasting luxury fragrance with a soft floral scent." }
];

// Cart Management (shared across all pages)
// Cart Management (shared across all pages)
class Cart {
  constructor() {
      this.items = this.loadCart();
  }

  loadCart() {
      const saved = localStorage.getItem('herDignityCart');
      return saved ? JSON.parse(saved) : [];
  }

  saveCart() {
      localStorage.setItem('herDignityCart', JSON.stringify(this.items));
  }

  addItem(product, quantity = 1) {
      const existingItem = this.items.find(item => item.id === product.id);
      
      if (existingItem) {
          existingItem.quantity += quantity;
      } else {
          this.items.push({
              ...product,
              quantity: quantity
          });
      }
      
      this.saveCart();
      this.updateCartCount();
      return true;
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
      } else {
          this.items = this.items.filter(item => item.id !== productId);
          this.saveCart();
          this.updateCartCount();
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

  getItemCount() {
      return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  getTotal() {
      return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  updateCartCount() {
      const countElements = document.querySelectorAll('#cart-count');
      const count = this.getItemCount();
      countElements.forEach(element => {
          element.textContent = count;
      });
  }

  renderCart() {
      const container = document.getElementById('cart-items');
      if (!container) return;

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
                          <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                          <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                                 onchange="cart.updateQuantity(${item.id}, parseInt(this.value))">
                          <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                      </div>
                      <button class="remove-btn" onclick="cart.removeItem(${item.id})">Remove</button>
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

  clearCart() {
      this.items = [];
      this.saveCart();
      this.updateCartCount();
      this.renderCart();
  }
}

// Initialize global cart instance
const cart = new Cart();


// Global add to cart function
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
      cart.addItem(product);
      
      // Show quick confirmation
      if (event && event.target) {
          const button = event.target;
          const originalText = button.textContent;
          button.textContent = "Added!";
          button.style.background = "var(--secondary)";
          
          setTimeout(() => {
              button.textContent = originalText;
              button.style.background = "";
          }, 1500);
      }
      
      return true;
  }
  return false;
}

// Navigation toggle function
function toggleNav() {
  const nav = document.getElementById('main-nav');
  if (nav) {
      nav.classList.toggle('show');
  }
}

// Featured products for homepage ONLY
function renderFeaturedProducts() {
  const featuredContainer = document.getElementById('featured-products');
  if (!featuredContainer) return;
  
  const featuredProducts = products.slice(0, 6);
  
  featuredProducts.forEach(product => {
      const item = document.createElement('div');
      item.classList.add('product-item');
      
      item.innerHTML = `
          <img src="${product.image}" alt="${product.name}" />
          <div class="product-info">
              <span class="category-tag">${product.category}</span>
              <h3>${product.name}</h3>
              <p class="description">${product.description}</p>
              <p class="price">KES ${product.price.toLocaleString()}</p>
              <button onclick="addToCart(${product.id})">Add to Cart</button>
          </div>
      `;
      
      featuredContainer.appendChild(item);
  });
}

// Initialize page based on current page
document.addEventListener('DOMContentLoaded', function() {
  // Update cart count on all pages
  cart.updateCartCount();
  
  // Initialize homepage ONLY
  if (document.getElementById('featured-products')) {
      renderFeaturedProducts();
  }
  
  // Set active navigation link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPage) {
          link.classList.add('active');
      }
  });
});

// Make global functions available
window.toggleNav = toggleNav;
window.addToCart = addToCart;
window.cart = cart;
window.products = products;