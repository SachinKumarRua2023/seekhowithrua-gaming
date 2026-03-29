/**
 * Mobile Dev Mission - Mobile Development Questions
 */

const GAME_QUESTIONS = {
  1: {
    name: "React Native",
    sections: {
      basic: [
        {
          question: "What does React Native use to build native apps?",
          options: ["WebView", "Native components", "Flash", "Java Applets"],
          correct: 1,
          hint: "It uses actual platform UI elements",
          nextHint: "React Native uses native platform components, not WebViews"
        },
        {
          question: "Which component is the basic building block in React Native?",
          options: ["<div>", "<View>", "<Container>", "<Box>"],
          correct: 1,
          hint: "Similar to div but for mobile",
          nextHint: "<View> is the basic container component in React Native"
        }
      ],
      intermediate: [
        {
          question: "How do you handle navigation in React Native?",
          options: ["window.location", "React Navigation", "<a> tags", "Browser router"],
          correct: 1,
          hint: "Popular library for screen navigation",
          nextHint: "React Navigation is the standard solution for routing"
        }
      ],
      advanced: [
        {
          question: "What is AsyncStorage used for?",
          options: ["Database queries", "Local key-value storage", "Network requests", "Image caching"],
          correct: 1,
          hint: "Simple persistent storage",
          nextHint: "AsyncStorage stores data locally on device"
        }
      ]
    }
  }
};

const GAME_LEVELS = {
  1: { name: "React Native", description: "Cross-platform mobile", accent: "#61dafb" },
  2: { name: "Flutter", description: "Dart framework", accent: "#02569b" },
  3: { name: "iOS Swift", description: "Apple development", accent: "#f05138" },
  4: { name: "Android Kotlin", description: "Google platform", accent: "#7f52ff" },
  5: { name: "UI Design", description: "Mobile UX", accent: "#ff69b4" },
  6: { name: "APIs", description: "Backend integration", accent: "#ff6c37" },
  7: { name: "Push Notifications", description: "Engagement", accent: "#ff9500" },
  8: { name: "Offline Mode", description: "Data persistence", accent: "#34c759" },
  9: { name: "App Store", description: "Publishing", accent: "#007aff" },
  10: { name: "Analytics", description: "User tracking", accent: "#af52de" }
};

const SECTION_CONFIG = {
  basic: { name: "UI Components", color: "#61dafb", icon: "🎨" },
  intermediate: { name: "State Management", color: "#ff9500", icon: "⚡" },
  advanced: { name: "Native Modules", color: "#34c759", icon: "🔧" }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GAME_QUESTIONS, GAME_LEVELS, SECTION_CONFIG };
}
