const products = [
  { id: 1, name: "Empower Tee", category: "clothing", price: 1200, image: "assets/tee.jpg" },
  { id: 2, name: "Dignity Bracelet", category: "accessories", price: 800, image: "assets/bracelet.jpg" },
  { id: 3, name: "Her Story Book", category: "books", price: 1500, image: "assets/book.jpg" },
  { id: 4, name: "Hope Hoodie", category: "clothing", price: 2200, image: "assets/hoodie.jpg" }
];

let filteredProducts = [...products];

function displayProducts(list = filteredProducts) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";
  list.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.dataset.category = p.category;
    div.dataset.price = p.price;
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>KES ${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    container.appendChild(div);
  });
}

function filterProducts() {
  const keyword = document.getElementById("search").value.toLowerCase();
  const category = document.getElementById("category-filter").value;
  const price = document.getElementById("price-filter").value;

  filteredProducts = products.filter(p => {
    const matchKeyword = p.name.toLowerCase().includes(keyword);
    const matchCategory = !category || p.category === category;
    const matchPrice =
      !price ||
      (price === "under-1000" && p.price < 1000) ||
      (price === "1000-2000" && p.price >= 1000 && p.price <= 2000) ||
      (price === "over-2000" && p.price > 2000);

    return matchKeyword && matchCategory && matchPrice;
  });

  updateFilterSummary();
  sortProducts();
}

function sortProducts() {
  const sort = document.getElementById("sort-filter").value;

  if (sort === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sort === "name-asc") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "name-desc") {
    filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
  }

  displayProducts();
}

function updateFilterSummary() {
  const keyword = document.getElementById("search").value.trim();
  const category = document.getElementById("category-filter").value;
  const price = document.getElementById("price-filter").value;

  let summary = "Showing ";

  if (filteredProducts.length === 0) {
    summary = "No products match your filters.";
  } else {
    summary += `${filteredProducts.length} product${filteredProducts.length > 1 ? "s" : ""}`;
    if (keyword) summary += ` for "${keyword}"`;
    if (category) summary += ` in category "${category}"`;
    if (price) {
      if (price === "under-1000") summary += ` under KES 1000`;
      if (price === "1000-2000") summary += ` between KES 1000–2000`;
      if (price === "over-2000") summary += ` over KES 2000`;
    }
  }

  document.getElementById("filter-summary").textContent = summary;
}

// Event Listeners
document.getElementById("search").addEventListener("input", filterProducts);
document.getElementById("category-filter").addEventListener("change", filterProducts);
document.getElementById("price-filter").addEventListener("change", filterProducts);
document.getElementById("sort-filter").addEventListener("change", sortProducts);
document.getElementById("toggle-filters").addEventListener("click", () => {
  document.getElementById("filters-panel").classList.toggle("show");
});
document.getElementById("clear-filters").addEventListener("click", () => {
  document.getElementById("search").value = "";
  document.getElementById("category-filter").value = "";
  document.getElementById("price-filter").value = "";
  document.getElementById("sort-filter").value = "";
  filterProducts();
});

// Initialize
window.onload = () => {
  displayProducts(products);
  updateCartCount();
};