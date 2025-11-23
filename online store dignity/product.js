// PRODUCTS DATA
const products = [
  { id:1, name:"Elegant Floral Dress", price:3200, category:"clothing", image:"assets/products/dress1.jpg", description:"A beautiful floral dress perfect for casual outings and sunny days." },
  { id:2, name:"Classic Denim Jacket", price:4500, category:"clothing", image:"assets/products/denim_jacket.jpg", description:"Timeless denim jacket designed to elevate your wardrobe." },
  { id:3, name:"Women’s Cotton T-Shirt", price:900, category:"clothing", image:"assets/products/tshirt1.jpg", description:"Soft and breathable cotton t-shirt available in multiple colors." },
  { id:4, name:"African Print Skirt", price:2500, category:"clothing", image:"assets/products/skirt1.jpg", description:"Stylish African print skirt representing culture and elegance." },
  { id:5, name:"Leather Handbag", price:3800, category:"accessories", image:"assets/products/bag1.jpg", description:"Premium leather handbag designed for durability and elegance." },
  { id:6, name:"Beaded Necklace", price:800, category:"accessories", image:"assets/products/necklace1.jpg", description:"Handcrafted beaded necklace with a cultural touch." },
  { id:7, name:"Ladies Bracelet Set", price:650, category:"accessories", image:"assets/products/bracelet1.jpg", description:"Beautiful bracelet set suitable for any occasion." },
  { id:8, name:"Stylish Sunglasses", price:1200, category:"accessories", image:"assets/products/sunglasses1.jpg", description:"UV-protection sunglasses with a modern, trendy design." },
  { id:9, name:"Motivational Book: Rise Above", price:1500, category:"books", image:"assets/products/book1.jpg", description:"An inspiring book encouraging women to rise above challenges." },
  { id:10, name:"Self-Love Journal", price:900, category:"books", image:"assets/products/journal1.jpg", description:"A guided journal to encourage mindfulness and self-reflection." },
  { id:11, name:"Fitness Leggings", price:1600, category:"clothing", image:"assets/products/leggings1.jpg", description:"Comfortable and flexible leggings perfect for workouts." },
  { id:12, name:"Women’s Hoodie", price:2300, category:"clothing", image:"assets/products/hoodie1.jpg", description:"Cozy hoodie made from soft fleece material." },
  { id:13, name:"Elegant Earrings", price:500, category:"accessories", image:"assets/products/earrings1.jpg", description:"Simple yet elegant earrings that add a classy touch." },
  { id:14, name:"Leather Wallet", price:1100, category:"accessories", image:"assets/products/wallet1.jpg", description:"Compact leather wallet designed for everyday use." },
  { id:15, name:"Women Empowerment Book", price:1800, category:"books", image:"assets/products/book2.jpg", description:"A powerful book centered on empowering women around the world." },
  { id:16, name:"Casual Sneakers", price:3500, category:"clothing", image:"assets/products/sneakers1.jpg", description:"Comfortable and stylish sneakers perfect for daily wear." },
  { id:17, name:"Women's Sandals", price:1700, category:"clothing", image:"assets/products/sandals1.jpg", description:"Lightweight sandals designed for comfort and elegance." },
  { id:18, name:"Hair Accessory Set", price:450, category:"accessories", image:"assets/products/hairset1.jpg", description:"A set of hair accessories suitable for all styles." },
  { id:19, name:"Daily Planner Book", price:1300, category:"books", image:"assets/products/planner1.jpg", description:"Daily planner designed to help you stay organized." },
  { id:20, name:"Luxury Perfume", price:5200, category:"accessories", image:"assets/products/perfume1.jpg", description:"Long-lasting luxury fragrance with a soft floral scent." }
];

// RENDER PRODUCTS
function renderProducts(productArray) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  productArray.forEach(product => {
    const item = document.createElement("div");
    item.classList.add("product-item");

    item.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p class="description">${product.description}</p>
      <p class="price">KES ${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;

    productList.appendChild(item);
  });
}

// Initial Load
renderProducts(products);
