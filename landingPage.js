// Featured products for homepage (show first 6 products)
function renderFeaturedProducts() {
  const featuredContainer = document.getElementById('featured-products');
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

// Initialize homepage
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('featured-products')) {
    renderFeaturedProducts();
  }
});