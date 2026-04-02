// SeekhoWithRua Gaming Site Authentication Handler
// Handles cross-domain login from main app (app.seekhowithrua.com)

const TOKEN_KEY = 'cosmos_auth_token';
const USER_KEY = 'cosmos_user';
const GAME_RECORDS_KEY = 'cosmos_game_records';

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

// Get user's display name
function getUserDisplayName() {
  const user = getCurrentUser();
  if (!user) return null;
  
  return user.first_name || user.username || user.name || user.email?.split('@')[0] || 'User';
}

// Get user's avatar URL
function getUserAvatar() {
  const user = getCurrentUser();
  if (!user) return null;
  
  if (user.profile_picture || user.picture || user.avatar) {
    return user.profile_picture || user.picture || user.avatar;
  }
  
  // Generate avatar from email
  const email = user.email || 'user';
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(email)}&background=7c3aed&color=fff`;
}

// Show visual lock overlay (matching LMS style)
function showLoginRequiredModal(message = 'Please login to continue playing') {
  // Remove existing modal
  const existingModal = document.getElementById('loginRequiredModal');
  if (existingModal) existingModal.remove();
  
  const modal = document.createElement('div');
  modal.id = 'loginRequiredModal';
  modal.innerHTML = `
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(4, 4, 15, 0.95);
      backdrop-filter: blur(10px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      font-family: 'Orbitron', sans-serif;
    ">
      <div style="
        width: 120px;
        height: 120px;
        border: 3px solid #7c3aed;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 60px;
        margin-bottom: 30px;
        animation: pulse 2s infinite;
      ">🎮</div>
      <h2 style="
        color: #fff;
        font-size: 28px;
        margin-bottom: 15px;
        text-align: center;
      ">Gaming Zone Locked</h2>
      <p style="
        color: rgba(255,255,255,0.6);
        font-size: 14px;
        margin-bottom: 30px;
        text-align: center;
        max-width: 400px;
      ">${message}</p>
      <button onclick="window.gamingAuth.redirectToLogin()" style="
        padding: 15px 40px;
        background: linear-gradient(135deg, #7c3aed, #00d4ff);
        color: #fff;
        border: none;
        border-radius: 8px;
        font-weight: 700;
        font-size: 16px;
        cursor: pointer;
        transition: transform 0.2s;
      " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
        🔐 Login to Play
      </button>
    </div>
    <style>
      @keyframes pulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.4); }
        50% { box-shadow: 0 0 0 20px rgba(124, 58, 237, 0); }
      }
    </style>
  `;
  document.body.appendChild(modal);
}

// Close login modal
function closeLoginModal() {
  const modal = document.getElementById('loginRequiredModal');
  if (modal) modal.remove();
}
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
  const userSection = document.getElementById('userSection');
  
  if (!userSection) return;
  
  if (isLoggedIn) {
    const user = getCurrentUser();
    const displayName = getUserDisplayName();
    const avatar = getUserAvatar();
    
    userSection.innerHTML = `
      <div class="user-info" style="
        display: flex;
        align-items: center;
        gap: 10px;
        background: rgba(124, 58, 237, 0.1);
        border: 1px solid rgba(124, 58, 237, 0.3);
        padding: 8px 15px;
        border-radius: 25px;
      ">
        <img src="${avatar}" alt="User" style="
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #7c3aed;
        ">
        <span style="
          font-size: 13px;
          color: #fff;
          font-weight: 500;
        ">${displayName}</span>
        <button onclick="window.gamingAuth.logout()" style="
          background: rgba(239, 68, 68, 0.2);
          border: none;
          color: #ef4444;
          padding: 6px 12px;
          border-radius: 15px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.3s;
        ">Logout</button>
      </div>
    `;
  } else {
    userSection.innerHTML = `
      <button onclick="window.gamingAuth.redirectToLogin()" style="
        background: linear-gradient(135deg, #7c3aed, #00d4ff);
        border: none;
        color: #fff;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        gap: 6px;
        white-space: nowrap;
      ">
        <svg style="width: 16px; height: 16px;" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
        Sign in
      </button>
    `;
  }
}

// Initialize auth on page load
document.addEventListener('DOMContentLoaded', function() {
  updateAuthUI();
});

// Game Records Management
// Save a game record
function saveGameRecord(gameData) {
  if (!checkAuth()) {
    console.warn('User not logged in - game record not saved');
    return false;
  }
  
  const user = getCurrentUser();
  const records = JSON.parse(localStorage.getItem(GAME_RECORDS_KEY) || '[]');
  
  const record = {
    id: Date.now(),
    userId: user.id || user.email,
    userName: getUserDisplayName(),
    gameType: gameData.gameType || 'memory',
    difficulty: gameData.difficulty || '20x',
    score: gameData.score || 0,
    accuracy: gameData.accuracy || 0,
    timeTaken: gameData.timeTaken || 0, // in seconds
    totalItems: gameData.totalItems || 0,
    correctItems: gameData.correctItems || 0,
    completedAt: new Date().toISOString(),
    sessionDuration: gameData.sessionDuration || 0 // total time in game
  };
  
  records.push(record);
  localStorage.setItem(GAME_RECORDS_KEY, JSON.stringify(records));
  
  console.log('Game record saved:', record);
  return record;
}

// Get user's game records
function getUserGameRecords() {
  if (!checkAuth()) return [];
  
  const user = getCurrentUser();
  const records = JSON.parse(localStorage.getItem(GAME_RECORDS_KEY) || '[]');
  
  return records.filter(r => r.userId === (user.id || user.email));
}

// Get game statistics for current user
function getGameStats() {
  const records = getUserGameRecords();
  
  if (records.length === 0) {
    return {
      totalGames: 0,
      totalTime: 0,
      averageAccuracy: 0,
      bestScore: 0,
      gamesByDifficulty: {}
    };
  }
  
  const totalGames = records.length;
  const totalTime = records.reduce((sum, r) => sum + (r.sessionDuration || 0), 0);
  const averageAccuracy = records.reduce((sum, r) => sum + (r.accuracy || 0), 0) / totalGames;
  const bestScore = Math.max(...records.map(r => r.score || 0));
  
  const gamesByDifficulty = records.reduce((acc, r) => {
    const diff = r.difficulty || 'unknown';
    acc[diff] = (acc[diff] || 0) + 1;
    return acc;
  }, {});
  
  return {
    totalGames,
    totalTime,
    averageAccuracy: Math.round(averageAccuracy * 100) / 100,
    bestScore,
    gamesByDifficulty
  };
}

// Format time duration (seconds to readable)
function formatDuration(seconds) {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  }
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${mins}m`;
}

// Export for use in other scripts
window.gamingAuth = {
  checkAuth,
  getCurrentUser,
  getToken,
  getUserDisplayName,
  getUserAvatar,
  logout,
  redirectToLogin,
  showLoginRequiredModal,
  closeLoginModal,
  updateAuthUI,
  saveGameRecord,
  getUserGameRecords,
  getGameStats,
  formatDuration,
  checkUrlForToken
};
