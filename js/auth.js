// SeekhoWithRua Gaming Site Authentication Handler
// Uses shared COSMOS_AUTH from cosmos-auth.js

const TOKEN_KEY = COSMOS_AUTH.TOKEN_KEY;
const USER_KEY = COSMOS_AUTH.USER_KEY;
const GAME_RECORDS_KEY = 'cosmos_game_records';

// Handle token from URL (when redirected back from app login)
function checkUrlForToken() {
  return COSMOS_AUTH.checkUrlForToken();
}

// Check if user is authenticated
function checkAuth() {
  return COSMOS_AUTH.isAuthenticated();
}

// Get current user
function getCurrentUser() {
  return COSMOS_AUTH.getUser();
}

// Get auth token
function getToken() {
  return COSMOS_AUTH.getToken();
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
  const email = user.email || 'user';
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(email)}&background=7c3aed&color=fff`;
}

// Show visual lock overlay
function showLoginRequiredModal(message = 'Please login to continue playing') {
  const existingModal = document.getElementById('loginRequiredModal');
  if (existingModal) existingModal.remove();

  const modal = document.createElement('div');
  modal.id = 'loginRequiredModal';
  modal.innerHTML = `
    <div style="
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(4, 4, 15, 0.96);
      backdrop-filter: blur(12px);
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      z-index: 9999;
      font-family: 'Orbitron', sans-serif;
    ">
      <div style="
        width: 110px; height: 110px;
        border: 3px solid #7c3aed; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-size: 56px; margin-bottom: 28px;
        animation: lockPulse 2s ease-in-out infinite;
      ">🎮</div>
      <h2 style="color:#fff;font-size:24px;margin:0 0 12px;text-align:center;">Gaming Zone Locked</h2>
      <p style="color:rgba(255,255,255,0.55);font-size:14px;margin:0 0 28px;text-align:center;max-width:380px;line-height:1.6;">
        ${message}
      </p>
      <a href="https://app.seekhowithrua.com/login?redirect=${encodeURIComponent(window.location.href)}"
         style="padding:14px 40px;background:linear-gradient(135deg,#7c3aed,#00d4ff);
                color:#fff;text-decoration:none;border-radius:30px;font-weight:700;font-size:15px;
                box-shadow:0 8px 30px rgba(124,58,237,0.5);">
        🔐 Login to Play
      </a>
      <button onclick="closeLoginModal()"
         style="margin-top:16px;color:rgba(255,255,255,0.4);font-size:13px;
                background:none;border:none;cursor:pointer;font-family:'Inter',sans-serif;">
        ✕ Close
      </button>
      <style>
        @keyframes lockPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(124,58,237,0.5); }
          50%      { box-shadow: 0 0 0 18px rgba(124,58,237,0); }
        }
      </style>
    </div>
  `;
  document.body.appendChild(modal);
}

// Close login modal
function closeLoginModal() {
  const modal = document.getElementById('loginRequiredModal');
  if (modal) modal.remove();
}

// Logout
function logout() {
  COSMOS_AUTH.logout();
}

// Redirect to main app login
function redirectToLogin() {
  COSMOS_AUTH.redirectToLogin(window.location.href);
}

// Update UI based on auth state
function updateAuthUI() {
  const isLoggedIn = checkAuth();
  const userSection = document.getElementById('userSection');
  if (!userSection) return;

  if (isLoggedIn) {
    const displayName = getUserDisplayName();
    const avatar = getUserAvatar();
    userSection.innerHTML = `
      <div class="user-info" style="
        display: flex; align-items: center; gap: 10px;
        background: rgba(124,58,237,0.1);
        border: 1px solid rgba(124,58,237,0.3);
        padding: 8px 15px; border-radius: 25px;
      ">
        <img src="${avatar}" alt="User" style="
          width:32px;height:32px;border-radius:50%;
          object-fit:cover;border:2px solid #7c3aed;">
        <span style="font-size:13px;color:#fff;font-weight:500;">👋 ${displayName}</span>
        <button onclick="window.gamingAuth.logout()" style="
          background:rgba(239,68,68,0.2);border:none;color:#ef4444;
          padding:6px 12px;border-radius:15px;font-size:12px;cursor:pointer;">
          Logout
        </button>
      </div>
    `;
  } else {
    userSection.innerHTML = `
      <a href="https://app.seekhowithrua.com/login?redirect=${encodeURIComponent(window.location.href)}"
         style="background:linear-gradient(135deg,#7c3aed,#00d4ff);color:#fff;
                padding:8px 20px;border-radius:20px;text-decoration:none;
                font-size:13px;font-weight:600;white-space:nowrap;">
        🔐 Login
      </a>
    `;
  }
}

// Initialize auth on page load
document.addEventListener('DOMContentLoaded', function() {
  // checkUrlForToken is called inside COSMOS_AUTH.init() automatically
  // but we call updateAuthUI after a tiny delay to let init complete
  setTimeout(updateAuthUI, 50);

  // Listen for auth changes
  COSMOS_AUTH.onAuthChange(() => {
    updateAuthUI();
  });
});

// ── Game Records Management ───────────────────────────────────────

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
    timeTaken: gameData.timeTaken || 0,
    totalItems: gameData.totalItems || 0,
    correctItems: gameData.correctItems || 0,
    completedAt: new Date().toISOString(),
    sessionDuration: gameData.sessionDuration || 0
  };
  records.push(record);
  localStorage.setItem(GAME_RECORDS_KEY, JSON.stringify(records));
  return record;
}

function getUserGameRecords() {
  if (!checkAuth()) return [];
  const user = getCurrentUser();
  const records = JSON.parse(localStorage.getItem(GAME_RECORDS_KEY) || '[]');
  return records.filter(r => r.userId === (user.id || user.email));
}

function getGameStats() {
  const records = getUserGameRecords();
  if (records.length === 0) {
    return { totalGames: 0, totalTime: 0, averageAccuracy: 0, bestScore: 0, gamesByDifficulty: {} };
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
    totalGames, totalTime,
    averageAccuracy: Math.round(averageAccuracy * 100) / 100,
    bestScore, gamesByDifficulty
  };
}

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

// Export
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
  checkUrlForToken,
};