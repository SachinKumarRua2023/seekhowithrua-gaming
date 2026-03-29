/**
 * Game Dev Quest - Levels Configuration
 */

const GAME_LEVELS = {
  1: { name: "Game Design", description: "Core game concepts and mechanics", accent: "#ff00ff" },
  2: { name: "Unity Engine", description: "Popular game engine", accent: "#00ffff" },
  3: { name: "Unreal Engine", description: "AAA game engine", accent: "#ff6600" },
  4: { name: "2D Physics", description: "Physics simulation", accent: "#00ff00" },
  5: { name: "3D Graphics", description: "Rendering systems", accent: "#ff00ff" },
  6: { name: "Game AI", description: "NPC intelligence", accent: "#ffff00" },
  7: { name: "Audio Design", description: "Sound systems", accent: "#ff69b4" },
  8: { name: "UI/UX", description: "User interface", accent: "#00ffff" },
  9: { name: "Multiplayer", description: "Networking", accent: "#ff6600" },
  10: { name: "Release", description: "Publishing games", accent: "#00ff00" }
};

const SECTION_CONFIG = {
  basic: { name: "Design", color: "#ff00ff", icon: "🎮" },
  intermediate: { name: "Code", color: "#00ffff", icon: "💻" },
  advanced: { name: "Polish", color: "#00ff00", icon: "✨" }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GAME_LEVELS, SECTION_CONFIG };
}
