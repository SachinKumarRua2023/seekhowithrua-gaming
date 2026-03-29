/**
 * SeekhoWithRua Memory Game API Client
 * 
 * This file handles:
 * - Google OAuth authentication
 * - Score submission to backend
 * - Leaderboard retrieval
 * - Achievement tracking
 * 
 * Base URL: https://django-react-ml-app.onrender.com/api/auth
 */

class MemoryGameAPI {
    constructor() {
        this.baseURL = 'https://django-react-ml-app.onrender.com/api/auth';
        this.token = localStorage.getItem('memory_game_token');
        this.user = JSON.parse(localStorage.getItem('memory_game_user') || 'null');
    }

    /**
     * Get authentication headers
     */
    getHeaders() {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (this.token) {
            headers['Authorization'] = `Token ${this.token}`;
        }
        return headers;
    }

    /**
     * Check if user is logged in
     */
    isLoggedIn() {
        return !!this.token && !!this.user;
    }

    /**
     * Handle Google OAuth login
     * @param {Object} googleData - Data from Google OAuth (token, email, name, googleId, picture)
     */
    async googleLogin(googleData) {
        try {
            const response = await fetch(`${this.baseURL}/google/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token: googleData.token,
                    email: googleData.email,
                    name: googleData.name,
                    google_id: googleData.googleId,
                    picture: googleData.picture || ''
                })
            });

            const data = await response.json();

            if (response.ok) {
                this.token = data.token;
                this.user = data.user;
                localStorage.setItem('memory_game_token', this.token);
                localStorage.setItem('memory_game_user', JSON.stringify(this.user));
                return { success: true, user: data.user };
            } else {
                return { success: false, error: data.error || 'Login failed' };
            }
        } catch (error) {
            console.error('Google login error:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Logout user
     */
    logout() {
        this.token = null;
        this.user = null;
        localStorage.removeItem('memory_game_token');
        localStorage.removeItem('memory_game_user');
    }

    /**
     * Submit a game score
     * @param {Object} scoreData - { difficulty, score, totalItems, timeTaken, accuracy }
     */
    async submitScore(scoreData) {
        if (!this.isLoggedIn()) {
            return { success: false, error: 'Please login to save scores' };
        }

        try {
            const response = await fetch(`${this.baseURL}/scores/submit/`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({
                    difficulty: scoreData.difficulty,
                    score: scoreData.score,
                    total_items: scoreData.totalItems,
                    time_taken: scoreData.timeTaken,
                    accuracy: scoreData.accuracy
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Show achievement notifications if any
                if (data.new_achievements && data.new_achievements.length > 0) {
                    this.showAchievementNotification(data.new_achievements);
                }
                return { success: true, data };
            } else {
                return { success: false, error: data.error || 'Failed to submit score' };
            }
        } catch (error) {
            console.error('Submit score error:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Get user's scores and personal bests
     */
    async getUserScores() {
        if (!this.isLoggedIn()) {
            return { success: false, error: 'Please login to view scores' };
        }

        try {
            const response = await fetch(`${this.baseURL}/scores/`, {
                headers: this.getHeaders()
            });

            const data = await response.json();

            if (response.ok) {
                return { success: true, data };
            } else {
                return { success: false, error: data.error || 'Failed to get scores' };
            }
        } catch (error) {
            console.error('Get scores error:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Get global leaderboard
     * @param {string} difficulty - Optional difficulty filter
     * @param {number} limit - Number of results to return
     */
    async getLeaderboard(difficulty = null, limit = 10) {
        try {
            let url = `${this.baseURL}/scores/leaderboard/?limit=${limit}`;
            if (difficulty) {
                url += `&difficulty=${difficulty}`;
            }

            const response = await fetch(url);
            const data = await response.json();

            if (response.ok) {
                return { success: true, data: data.leaderboard };
            } else {
                return { success: false, error: data.error || 'Failed to get leaderboard' };
            }
        } catch (error) {
            console.error('Get leaderboard error:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Get user's achievements
     */
    async getUserAchievements() {
        if (!this.isLoggedIn()) {
            return { success: false, error: 'Please login to view achievements' };
        }

        try {
            const response = await fetch(`${this.baseURL}/achievements/`, {
                headers: this.getHeaders()
            });

            const data = await response.json();

            if (response.ok) {
                return { success: true, data };
            } else {
                return { success: false, error: data.error || 'Failed to get achievements' };
            }
        } catch (error) {
            console.error('Get achievements error:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Show achievement notification popup
     */
    showAchievementNotification(achievements) {
        achievements.forEach(achievement => {
            // Create notification element
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #7c3aed, #00d4ff);
                color: white;
                padding: 20px 30px;
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(124, 58, 237, 0.4);
                z-index: 10000;
                font-family: 'Orbitron', sans-serif;
                animation: achievementSlideIn 0.5s ease;
            `;
            notification.innerHTML = `
                <div style="display: flex; align-items: center; gap: 15px;">
                    <span style="font-size: 40px;">🏆</span>
                    <div>
                        <div style="font-size: 14px; opacity: 0.9;">Achievement Unlocked!</div>
                        <div style="font-size: 18px; font-weight: bold;">${achievement.title}</div>
                        <div style="font-size: 12px; opacity: 0.8;">${achievement.description}</div>
                    </div>
                </div>
            `;
            document.body.appendChild(notification);

            // Remove after 5 seconds
            setTimeout(() => {
                notification.style.animation = 'achievementSlideOut 0.5s ease';
                setTimeout(() => notification.remove(), 500);
            }, 5000);
        });

        // Add animations if not already added
        if (!document.getElementById('achievement-styles')) {
            const style = document.createElement('style');
            style.id = 'achievement-styles';
            style.textContent = `
                @keyframes achievementSlideIn {
                    from { transform: translateX(400px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes achievementSlideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(400px); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    /**
     * Get current user info
     */
    getCurrentUser() {
        return this.user;
    }

    /**
     * Format difficulty for display
     */
    formatDifficulty(difficulty) {
        const formats = {
            '20x': '20 Items - Beginner',
            '50x': '50 Items - Intermediate',
            '100x': '100 Items - Advanced',
            '200x': '200 Items - Expert'
        };
        return formats[difficulty] || difficulty;
    }
}

// Create global instance
const memoryGameAPI = new MemoryGameAPI();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MemoryGameAPI, memoryGameAPI };
}
