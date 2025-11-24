// Account page functionality
document.addEventListener('DOMContentLoaded', function() {
    if (!auth.isLoggedIn()) {
        window.location.href = 'index.html';
        return;
    }
    
    initializeAccountPage();
});

function initializeAccountPage() {
    loadUserData();
    setupTabNavigation();
    loadOrders();
    loadAddresses();
    loadWishlist();
}

function loadUserData() {
    const user = auth.currentUser;
    if (user) {
        document.getElementById('user-name').textContent = user.name;
        document.getElementById('user-email').textContent = user.email;
        document.getElementById('user-avatar').textContent = getAvatarInitials(user.name);
        
        // Format join date
        const joinDate = new Date(user.joinDate);
        document.getElementById('join-date').textContent = joinDate.toLocaleDateString();
        
        // Populate profile form
        document.getElementById('profile-name').value = user.name;
        document.getElementById('profile-email').value = user.email;
        document.getElementById('profile-phone').value = user.phone || '';
        document.getElementById('profile-dob').value = user.dob || '';
    }
}

function getAvatarInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function setupTabNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const tabs = document.querySelectorAll('.account-tab');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab');
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding tab
            tabs.forEach(tab => tab.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
}

function updateProfile(e) {
    e.preventDefault();
    
    const user = auth.currentUser;
    if (user) {
        user.name = document.getElementById('profile-name').value;
        user.email = document.getElementById('profile-email').value;
        user.phone = document.getElementById('profile-phone').value;
        user.dob = document.getElementById('profile-dob').value;
        
        auth.saveUser(user);
        
        // Update UI
        loadUserData();
        
        // Show success message
        alert('Profile updated successfully!');
    }
}

function loadOrders() {
    const ordersList = document.getElementById('orders-list');
    const user = auth.currentUser;
    
    if (!user.orders || user.orders.length === 0) {
        ordersList.innerHTML = `
            <div class="empty-state">
                <p>You haven't placed any orders yet.</p>
                <a href="products.html" class="shop-now-btn">Start Shopping</a>
            </div>
        `;
        return;
    }
    
    ordersList.innerHTML = user.orders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <div>
                    <div class="order-id">Order #${order.id}</div>
                    <div class="order-date">${new Date(order.date).toLocaleDateString()}</div>
                </div>
                <div class="order-status">${order.status}</div>
            </div>
            <div class="order-details">
                <div class="order-items">${order.items.length} item(s)</div>
                <div class="order-total">KES ${order.total.toLocaleString()}</div>
                <div class="order-actions">
                    <button class="view-order-btn">View Details</button>
                </div>
            </div>
        </div>
    `).join('');
}

function loadAddresses() {
    const addressesList = document.getElementById('addresses-list');
    const user = auth.currentUser;
    
    if (!user.addresses || user.addresses.length === 0) {
        addressesList.innerHTML = `
            <div class="empty-state">
                <p>No saved addresses yet.</p>
            </div>
        `;
        return;
    }
    
    addressesList.innerHTML = user.addresses.map((address, index) => `
        <div class="address-card ${address.default ? 'default' : ''}">
            <div class="address-header">
                <div class="address-name">${address.name}</div>
                ${address.default ? '<span class="default-badge">Default</span>' : ''}
            </div>
            <div class="address-details">
                ${address.street}<br>
                ${address.city}, ${address.zip}<br>
                ${address.country}
            </div>
            <div class="address-actions">
                <button class="address-action" onclick="setDefaultAddress(${index})">
                    ${address.default ? 'Default' : 'Set as Default'}
                </button>
                <button class="address-action delete" onclick="deleteAddress(${index})">
                    Delete
                </button>
            </div>
        </div>
    `).join('');
}

function loadWishlist() {
    const wishlistGrid = document.getElementById('wishlist-grid');
    const user = auth.currentUser;
    
    if (!user.wishlist || user.wishlist.length === 0) {
        wishlistGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <p>Your wishlist is empty.</p>
                <a href="products.html" class="shop-now-btn">Browse Products</a>
            </div>
        `;
        return;
    }
    
    wishlistGrid.innerHTML = user.wishlist.map(itemId => {
        const product = products.find(p => p.id === itemId);
        if (!product) return '';
        
        return `
            <div class="wishlist-item">
                <button class="remove-wishlist" onclick="removeFromWishlist(${itemId})">×</button>
                <img src="${product.image}" alt="${product.name}">
                <h4>${product.name}</h4>
                <div class="price">KES ${product.price.toLocaleString()}</div>
                <button class="view-order-btn" onclick="addToCart(${itemId})">Add to Cart</button>
            </div>
        `;
    }).join('');
}

function openAddressModal() {
    document.getElementById('address-modal').classList.add('active');
}

function closeAddressModal() {
    document.getElementById('address-modal').classList.remove('active');
    document.getElementById('address-form').reset();
}

function saveAddress(e) {
    e.preventDefault();
    
    const user = auth.currentUser;
    const address = {
        name: document.getElementById('address-name').value,
        street: document.getElementById('address-street').value,
        city: document.getElementById('address-city').value,
        zip: document.getElementById('address-zip').value,
        country: document.getElementById('address-country').value,
        default: !user.addresses || user.addresses.length === 0
    };
    
    if (!user.addresses) {
        user.addresses = [];
    }
    
    user.addresses.push(address);
    auth.saveUser(user);
    
    closeAddressModal();
    loadAddresses();
}

function setDefaultAddress(index) {
    const user = auth.currentUser;
    user.addresses.forEach((addr, i) => {
        addr.default = i === index;
    });
    
    auth.saveUser(user);
    loadAddresses();
}

function deleteAddress(index) {
    if (confirm('Are you sure you want to delete this address?')) {
        const user = auth.currentUser;
        user.addresses.splice(index, 1);
        auth.saveUser(user);
        loadAddresses();
    }
}

function removeFromWishlist(productId) {
    const user = auth.currentUser;
    if (user.wishlist) {
        user.wishlist = user.wishlist.filter(id => id !== productId);
        auth.saveUser(user);
        loadWishlist();
    }
}

// Add sample data for demonstration
function addSampleData() {
    const user = auth.currentUser;
    
    // Sample orders
    if (!user.orders) {
        user.orders = [
            {
                id: 'HD123456',
                date: new Date('2024-01-15').toISOString(),
                status: 'Delivered',
                items: [
                    { name: 'Elegant Floral Dress', quantity: 1, price: 3200 },
                    { name: 'Beaded Necklace', quantity: 2, price: 800 }
                ],
                total: 4800
            },
            {
                id: 'HD123457',
                date: new Date('2024-02-01').toISOString(),
                status: 'Processing',
                items: [
                    { name: 'Women Empowerment Book', quantity: 1, price: 1800 }
                ],
                total: 1800
            }
        ];
    }
    
    // Sample addresses
    if (!user.addresses) {
        user.addresses = [
            {
                name: 'Home',
                street: '123 Main Street',
                city: 'Nairobi',
                zip: '00100',
                country: 'Kenya',
                default: true
            }
        ];
    }
    
    // Sample wishlist
    if (!user.wishlist) {
        user.wishlist = [1, 5, 9]; // Product IDs
    }
    
    auth.saveUser(user);
}

// Call this function once to add sample data (remove in production)
addSampleData();