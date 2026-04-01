// Gaming Site API Integration
// Handles score submission and analytics tracking

const API_URL = 'https://django-react-ml-app.onrender.com/api';

// Get auth token from localStorage
function getAuthToken() {
  return localStorage.getItem('cosmos_auth_token');
}

// Submit gaming score to backend
async function submitGamingScore(gameData) {
  const token = getAuthToken();
  if (!token) {
    console.error('No auth token found');
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/gaming/submit/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify({
        game_name: gameData.gameType || 'memory',
        game_subtype: gameData.difficulty || '',
        score: gameData.score,
        level: gameData.level || 1,
        time_taken: gameData.timeTaken || 0,
        accuracy: gameData.accuracy || 0,
        metadata: gameData.metadata || {}
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    // Show achievement notification if personal best
    if (result.is_personal_best) {
      showNotification('🎉 Personal Best!', `New high score: ${result.score.score.score}`);
    }
    
    return result;
  } catch (error) {
    console.error('Failed to submit score:', error);
    return null;
  }
}

// Get user's gaming scores
async function getGamingScores(gameType = null) {
  const token = getAuthToken();
  if (!token) return null;

  try {
    let url = `${API_URL}/gaming/scores/`;
    if (gameType) {
      url += `?game_name=${gameType}`;
    }

    const response = await fetch(url, {
      headers: {
        'Authorization': `Token ${token}`
      }
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get scores:', error);
    return null;
  }
}

// Get leaderboard
async function getLeaderboard(difficulty = null, limit = 10) {
  try {
    let url = `${API_URL}/scores/leaderboard/?limit=${limit}`;
    if (difficulty) {
      url += `&difficulty=${difficulty}`;
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get leaderboard:', error);
    return null;
  }
}

// Get student analytics
async function getStudentAnalytics() {
  const token = getAuthToken();
  if (!token) return null;

  try {
    const response = await fetch(`${API_URL}/analytics/`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get analytics:', error);
    return null;
  }
}

// Submit quiz result
async function submitQuizResult(quizData) {
  const token = getAuthToken();
  if (!token) {
    console.error('No auth token found');
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/quiz/submit/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify({
        quiz_name: quizData.quizName,
        course_name: quizData.courseName || '',
        score: quizData.score,
        total_questions: quizData.totalQuestions,
        correct_answers: quizData.correctAnswers,
        time_taken: quizData.timeTaken,
        answers: quizData.answers || [],
        passed: quizData.passed
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to submit quiz:', error);
    return null;
  }
}

// Show notification
function showNotification(title, message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-title">${title}</div>
    <div class="notification-message">${message}</div>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

// Export API functions
window.gamingAPI = {
  submitGamingScore,
  getGamingScores,
  getLeaderboard,
  getStudentAnalytics,
  submitQuizResult,
  showNotification
};
