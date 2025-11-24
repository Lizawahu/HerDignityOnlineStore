

// Products page filtering and rendering
function initializeProductsPage() {
  const productList = document.getElementById('product-list');
  if (!productList) return;

  function filterProducts() {
      const searchTerm = document.getElementById('search').value.toLowerCase();
      const category = document.getElementById('category-filter').value;
      const priceRange = document.getElementById('price-filter').value;
      const sortBy = document.getElementById('sort-filter').value;
      
      let filteredProducts = products.filter(product => {
          const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                               product.description.toLowerCase().includes(searchTerm);
          const matchesCategory = !category || product.category === category;
          
          let matchesPrice = true;
          if (priceRange === "under-1000") {
              matchesPrice = product.price < 1000;
          } else if (priceRange === "1000-2000") {
              matchesPrice = product.price >= 1000 && product.price <= 2000;
          } else if (priceRange === "over-2000") {
              matchesPrice = product.price > 2000;
          }
          
          return matchesSearch && matchesCategory && matchesPrice;
      });
      
      // Sort products
      if (sortBy === "price-asc") {
          filteredProducts.sort((a, b) => a.price - b.price);
      } else if (sortBy === "price-desc") {
          filteredProducts.sort((a, b) => b.price - a.price);
      } else if (sortBy === "name-asc") {
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortBy === "name-desc") {
          filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
      }
      
      updateFilterSummary(filteredProducts.length);
      renderProducts(filteredProducts);
  }
  
  function renderProducts(productArray) {
      const productList = document.getElementById("product-list");
      productList.innerHTML = "";

      if (productArray.length === 0) {
          productList.innerHTML = `
              <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-light);">
                  <h3>No products found</h3>
                  <p>Try adjusting your filters or search terms</p>
              </div>
          `;
          return;
      }

      productArray.forEach(product => {
          const item = document.createElement("div");
          item.classList.add("product-item");

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

          productList.appendChild(item);
      });
  }
  
  function updateFilterSummary(count) {
      const summary = document.getElementById("filter-summary");
      if (!summary) return;
      
      let summaryText = `Showing ${count} product${count !== 1 ? 's' : ''}`;
      
      const searchTerm = document.getElementById("search").value;
      const category = document.getElementById("category-filter").value;
      const priceRange = document.getElementById("price-filter").value;
      
      if (searchTerm || category || priceRange) {
          summaryText += " (filtered)";
      }
      
      summary.textContent = summaryText;
  }

  // Event listeners for products page
  const searchInput = document.getElementById('search');
  const categoryFilter = document.getElementById('category-filter');
  const priceFilter = document.getElementById('price-filter');
  const sortFilter = document.getElementById('sort-filter');
  const clearFilters = document.getElementById('clear-filters');
  const toggleFilters = document.getElementById('toggle-filters');

  if (searchInput) searchInput.addEventListener('input', filterProducts);
  if (categoryFilter) categoryFilter.addEventListener('change', filterProducts);
  if (priceFilter) priceFilter.addEventListener('change', filterProducts);
  if (sortFilter) sortFilter.addEventListener('change', filterProducts);
  
  if (clearFilters) {
      clearFilters.addEventListener('click', function() {
          document.getElementById('search').value = "";
          document.getElementById('category-filter').value = "";
          document.getElementById('price-filter').value = "";
          document.getElementById('sort-filter').value = "";
          filterProducts();
      });
  }

  if (toggleFilters) {
      toggleFilters.addEventListener('click', function() {
          const filtersPanel = document.getElementById('filters-panel');
          if (filtersPanel) {
              filtersPanel.classList.toggle('show');
              this.textContent = filtersPanel.classList.contains('show') ? "Filters ▴" : "Filters ▾";
          }
      });
  }

  // Initial render
  renderProducts(products);
  updateFilterSummary(products.length);
}

// Initialize products page when DOM loads
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('product-list')) {
      initializeProductsPage();
  }
});