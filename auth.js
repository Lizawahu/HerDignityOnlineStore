// Authentication functionality
class Auth {
  constructor() {
      this.currentUser = this.loadUser();
      this.init();
  }

  init() {
      this.updateUI();
  }

  loadUser() {
      const saved = localStorage.getItem('herDignityUser');
      return saved ? JSON.parse(saved) : null;
  }

  saveUser(user) {
      localStorage.setItem('herDignityUser', JSON.stringify(user));
      this.currentUser = user;
      this.updateUI();
  }

  logout() {
      localStorage.removeItem('herDignityUser');
      this.currentUser = null;
      this.updateUI();
      window.location.href = 'index.html';
  }

  login(email, password) {
      // In a real app, this would be an API call
      const users = JSON.parse(localStorage.getItem('herDignityUsers') || '[]');
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
          this.saveUser(user);
          return { success: true, user };
      } else {
          return { success: false, error: 'Invalid email or password' };
      }
  }

  register(userData) {
      const users = JSON.parse(localStorage.getItem('herDignityUsers') || '[]');
      
      // Check if user already exists
      if (users.find(u => u.email === userData.email)) {
          return { success: false, error: 'User already exists with this email' };
      }

      // Create new user
      const newUser = {
          id: Date.now(),
          ...userData,
          joinDate: new Date().toISOString(),
          orders: []
      };

      users.push(newUser);
      localStorage.setItem('herDignityUsers', JSON.stringify(users));
      this.saveUser(newUser);

      return { success: true, user: newUser };
  }

  updateUI() {
      const loginBtn = document.querySelector('.login-btn');
      if (loginBtn) {
          if (this.currentUser) {
              loginBtn.innerHTML = `Account`;
              loginBtn.onclick = () => window.location.href = 'account.html';
          } else {
              loginBtn.innerHTML = `Login`;
              loginBtn.onclick = openLoginModal;
          }
      }
  }

  isLoggedIn() {
      return this.currentUser !== null;
  }
}

// Initialize auth
const auth = new Auth();

// Modal functions
function openLoginModal() {
  const modal = document.getElementById('auth-modal');
  if (modal) {
      modal.classList.add('active');
      switchTab('login');
  }
}

function closeModal() {
  const modal = document.getElementById('auth-modal');
  if (modal) {
      modal.classList.remove('active');
      clearForms();
  }
}

function switchTab(tabName) {
  // Update tabs
  document.querySelectorAll('.auth-tab').forEach(tab => {
      tab.classList.remove('active');
  });
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

  // Update forms
  document.querySelectorAll('.auth-form').forEach(form => {
      form.classList.remove('active');
  });
  document.getElementById(`${tabName}-form`).classList.add('active');

  // Clear errors
  document.querySelectorAll('.form-error').forEach(error => {
      error.style.display = 'none';
  });
}

function clearForms() {
  document.querySelectorAll('.auth-form input').forEach(input => {
      input.value = '';
  });
  document.querySelectorAll('.form-error').forEach(error => {
      error.style.display = 'none';
  });
}

function showError(formId, message) {
  const errorElement = document.querySelector(`#${formId} .form-error`);
  if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
  }
}

function hideError(formId) {
  const errorElement = document.querySelector(`#${formId} .form-error`);
  if (errorElement) {
      errorElement.style.display = 'none';
  }
}

// Form handlers
function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  hideError('login-form');

  if (!email || !password) {
      showError('login-form', 'Please fill in all fields');
      return;
  }

  const result = auth.login(email, password);
  if (result.success) {
      closeModal();
      // Show success message or redirect
      console.log('Login successful:', result.user);
  } else {
      showError('login-form', result.error);
  }
}

function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('register-confirm-password').value;

  hideError('register-form');

  if (!name || !email || !password || !confirmPassword) {
      showError('register-form', 'Please fill in all fields');
      return;
  }

  if (password !== confirmPassword) {
      showError('register-form', 'Passwords do not match');
      return;
  }

  if (password.length < 6) {
      showError('register-form', 'Password must be at least 6 characters');
      return;
  }

  const result = auth.register({ name, email, password });
  if (result.success) {
      closeModal();
      // Show success message or redirect
      console.log('Registration successful:', result.user);
  } else {
      showError('register-form', result.error);
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Close modal when clicking outside
  const modal = document.getElementById('auth-modal');
  if (modal) {
      modal.addEventListener('click', function(e) {
          if (e.target === modal) {
              closeModal();
          }
      });
  }

  // Add some demo users for testing
  if (!localStorage.getItem('herDignityUsers')) {
      const demoUsers = [
          {
              id: 1,
              name: 'Demo User',
              email: 'demo@herdignity.com',
              password: 'password123',
              joinDate: new Date().toISOString(),
              orders: []
          }
      ];
      localStorage.setItem('herDignityUsers', JSON.stringify(demoUsers));
  }
});

// Make functions global
window.openLoginModal = openLoginModal;
window.closeModal = closeModal;
window.switchTab = switchTab;
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;