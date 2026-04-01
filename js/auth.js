// Gaming Site Authentication Handler
// Handles cross-domain login from main app

const TOKEN_KEY = 'cosmos_auth_token';
const USER_KEY = 'cosmos_user';

// Check URL for token from main app login
function checkUrlForToken() {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const userData = urlParams.get('user');
  
  if (token && userData) {
    try {
      const user = JSON.parse(decodeURIComponent(userData));
      
      // Save to localStorage
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
      
      console.log('Gaming site: Logged in via cross-domain token');
      return true;
    } catch (err) {
      console.error('Failed to parse user data:', err);
    }
  }
  return false;
}

// Check if user is authenticated
function checkAuth() {
  // First check URL for token
  if (checkUrlForToken()) {
    return true;
  }
  
  // Then check localStorage
  const token = localStorage.getItem(TOKEN_KEY);
  const user = localStorage.getItem(USER_KEY);
  
  if (token && user) {
    try {
      const userData = JSON.parse(user);
      return true;
    } catch (err) {
      console.error('Invalid user data in storage');
      logout();
    }
  }
  return false;
}

// Get current user
function getCurrentUser() {
  const user = localStorage.getItem(USER_KEY);
  if (user) {
    try {
      return JSON.parse(user);
    } catch (err) {
      return null;
    }
  }
  return null;
}

// Get auth token
function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

// Logout
function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  window.location.reload();
}

// Redirect to main app login
function redirectToLogin() {
  const currentUrl = encodeURIComponent(window.location.href);
  window.location.href = `https://app.seekhowithrua.com/login?redirect=${currentUrl}`;
}

// Update UI based on auth state
function updateAuthUI() {
  const isLoggedIn = checkAuth();
  const user = getCurrentUser();
  
  const authContainer = document.getElementById('authContainer');
  if (!authContainer) return;
  
  if (isLoggedIn && user) {
    authContainer.innerHTML = `
      <div class="user-info">
        <span class="user-name">${user.first_name || user.username}</span>
        <span class="user-role">${user.profile?.role || user.role}</span>
        <button onclick="logout()" class="logout-btn">Logout</button>
      </div>
    `;
  } else {
    authContainer.innerHTML = `
      <button onclick="redirectToLogin()" class="login-btn">Login / Sign Up</button>
    `;
  }
}

// Initialize auth on page load
document.addEventListener('DOMContentLoaded', function() {
  updateAuthUI();
});

// Export for use in other scripts
window.gamingAuth = {
  checkAuth,
  getCurrentUser,
  getToken,
  logout,
  redirectToLogin,
  checkUrlForToken
};
