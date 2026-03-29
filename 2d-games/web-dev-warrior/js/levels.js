/**
 * Web Dev Warrior - Levels Configuration
 */

const GAME_LEVELS = {
  1: { name: "HTML & CSS", description: "Master web structure and styling", accent: "#e34c26" },
  2: { name: "JavaScript Basics", description: "Learn programming fundamentals", accent: "#f7df1e" },
  3: { name: "DOM Manipulation", description: "Control webpage elements", accent: "#3178c6" },
  4: { name: "React Components", description: "Build reusable UI components", accent: "#61dafb" },
  5: { name: "Node.js Backend", description: "Server-side JavaScript", accent: "#339933" },
  6: { name: "Express & APIs", description: "Create RESTful endpoints", accent: "#000000" },
  7: { name: "Database Design", description: "SQL and data modeling", accent: "#00758f" },
  8: { name: "Authentication", description: "JWT and user security", accent: "#8b5cf6" },
  9: { name: "Testing", description: "Unit and integration tests", accent: "#8d6748" },
  10: { name: "Full Stack Deploy", description: "Production deployment", accent: "#6cc24a" }
};

const SECTION_CONFIG = {
  basic: { name: "Frontend", color: "#e34c26", icon: "🎨" },
  intermediate: { name: "Backend", color: "#339933", icon: "⚙️" },
  advanced: { name: "Database", color: "#00758f", icon: "🗄️" }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GAME_LEVELS, SECTION_CONFIG };
}
