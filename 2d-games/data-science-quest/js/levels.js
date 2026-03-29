/**
 * Data Quest - Level Configuration
 * Defines all 10 levels with their properties
 */

const GAME_LEVELS = {
  1: {
    name: "Python Basics",
    description: "Master Python fundamentals for Data Science",
    module: "Introduction to Python",
    theme: "cyber-green",
    background: "#0a1a0a",
    accent: "#1D9E75"
  },
  2: {
    name: "Pandas Mastery",
    description: "Data manipulation with Pandas",
    module: "Data Manipulation",
    theme: "cyber-orange",
    background: "#1a100a",
    accent: "#f59e0b"
  },
  3: {
    name: "Data Visualization",
    description: "Create stunning visualizations with Matplotlib & Seaborn",
    module: "Visualization",
    theme: "cyber-purple",
    background: "#0f0a1a",
    accent: "#8b5cf6"
  },
  4: {
    name: "Statistics & Probability",
    description: "Statistical analysis and probability theory",
    module: "Statistics",
    theme: "cyber-red",
    background: "#1a0a0a",
    accent: "#ef4444"
  },
  5: {
    name: "Machine Learning Basics",
    description: "Introduction to ML algorithms",
    module: "ML Fundamentals",
    theme: "cyber-cyan",
    background: "#0a151a",
    accent: "#06b6d4"
  },
  6: {
    name: "Supervised Learning",
    description: "Classification and Regression techniques",
    module: "Supervised ML",
    theme: "cyber-pink",
    background: "#1a0a15",
    accent: "#ec4899"
  },
  7: {
    name: "Unsupervised Learning",
    description: "Clustering and Dimensionality Reduction",
    module: "Unsupervised ML",
    theme: "cyber-yellow",
    background: "#1a1a0a",
    accent: "#eab308"
  },
  8: {
    name: "Deep Learning",
    description: "Neural Networks and Deep Learning basics",
    module: "Deep Learning",
    theme: "cyber-blue",
    background: "#0a0a1a",
    accent: "#3b82f6"
  },
  9: {
    name: "Neural Networks",
    description: "Advanced Neural Network architectures",
    module: "Neural Networks",
    theme: "cyber-indigo",
    background: "#0d0a1a",
    accent: "#6366f1"
  },
  10: {
    name: "AI Master",
    description: "Real-world AI applications and projects",
    module: "AI Applications",
    theme: "cyber-gold",
    background: "#1a150a",
    accent: "#ffd700"
  }
};

const SECTION_CONFIG = {
  basic: {
    name: "Basic",
    color: "#1D9E75",
    icon: "🔰",
    obstacles: 3,
    obstacleType: "static",
    description: "Learn the fundamentals"
  },
  intermediate: {
    name: "Intermediate", 
    color: "#f59e0b",
    icon: "⚡",
    obstacles: 4,
    obstacleType: "moving",
    description: "Apply your knowledge"
  },
  advanced: {
    name: "Advanced",
    color: "#8b5cf6",
    icon: "👑",
    obstacles: 5,
    obstacleType: "rotating",
    description: "Master the concepts"
  }
};

// Achievement definitions
const ACHIEVEMENTS = {
  first_key: {
    title: "Key Seeker",
    description: "Earned your first key fragment",
    icon: "🗝️"
  },
  level_master: {
    title: "Level Master",
    description: "Completed all 3 sections of a level",
    icon: "🏆"
  },
  perfect_section: {
    title: "Perfect Score",
    description: "Answered all questions correctly in a section",
    icon: "⭐"
  },
  speed_runner: {
    title: "Speed Runner",
    description: "Completed a section in under 5 minutes",
    icon: "⚡"
  },
  no_hints: {
    title: "Memory Master",
    description: "Completed a section without using hints",
    icon: "🧠"
  },
  data_novice: {
    title: "Data Novice",
    description: "Completed Level 1",
    icon: "📊"
  },
  data_explorer: {
    title: "Data Explorer",
    description: "Completed Levels 1-3",
    icon: "🔍"
  },
  ml_apprentice: {
    title: "ML Apprentice",
    description: "Completed Levels 4-6",
    icon: "🤖"
  },
  ai_specialist: {
    title: "AI Specialist",
    description: "Completed Levels 7-9",
    icon: "🧬"
  },
  data_master: {
    title: "Data Master",
    description: "Completed all 10 levels",
    icon: "👑"
  }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GAME_LEVELS, SECTION_CONFIG, ACHIEVEMENTS };
}
