/**
 * Mobile Dev Mission - Levels Configuration
 */

const GAME_LEVELS = {
  1: { name: "React Native", description: "Cross-platform mobile development", accent: "#61dafb" },
  2: { name: "Flutter", description: "Dart framework by Google", accent: "#02569b" },
  3: { name: "iOS Swift", description: "Apple native development", accent: "#f05138" },
  4: { name: "Android Kotlin", description: "Google platform development", accent: "#7f52ff" },
  5: { name: "UI/UX Design", description: "Mobile user experience", accent: "#ff69b4" },
  6: { name: "API Integration", description: "Backend connectivity", accent: "#ff6c37" },
  7: { name: "Push Notifications", description: "User engagement", accent: "#ff9500" },
  8: { name: "Offline Storage", description: "Data persistence", accent: "#34c759" },
  9: { name: "App Store Deploy", description: "Publishing apps", accent: "#007aff" },
  10: { name: "Analytics", description: "User behavior tracking", accent: "#af52de" }
};

const SECTION_CONFIG = {
  basic: { name: "UI Components", color: "#61dafb", icon: "🎨" },
  intermediate: { name: "State Management", color: "#ff9500", icon: "⚡" },
  advanced: { name: "Native Modules", color: "#34c759", icon: "🔧" }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GAME_LEVELS, SECTION_CONFIG };
}
