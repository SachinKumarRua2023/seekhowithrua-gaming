/**
 * Game Dev Quest - Game Development Questions
 */

const GAME_QUESTIONS = {
  1: {
    name: "Game Design",
    sections: {
      basic: [
        {
          question: "What is a game loop?",
          options: ["A physical loop", "The cycle of update and render", "A sound loop", "A story loop"],
          correct: 1,
          hint: "Core cycle that runs every frame",
          nextHint: "Game loop updates state and renders frames continuously"
        },
        {
          question: "What does FPS stand for?",
          options: ["First Person Shooter", "Frames Per Second", "Fast Processing Speed", "Final Product Status"],
          correct: 1,
          hint: "Measure of how smooth a game runs",
          nextHint: "Frames Per Second - higher is smoother"
        }
      ],
      intermediate: [
        {
          question: "What is collision detection?",
          options: ["Finding bugs", "Detecting when objects touch", "Error handling", "Network issues"],
          correct: 1,
          hint: "Checking if game objects intersect",
          nextHint: "Collision detection checks object boundaries overlap"
        }
      ],
      advanced: [
        {
          question: "What is a quadtree used for?",
          options: ["Tree graphics", "Spatial partitioning", "Inventory system", "Dialogue trees"],
          correct: 1,
          hint: "Optimizes collision detection",
          nextHint: "Quadtrees divide space to reduce collision checks"
        }
      ]
    }
  }
};

const GAME_LEVELS = {
  1: { name: "Game Design", description: "Core concepts", accent: "#ff00ff" },
  2: { name: "Unity", description: "Popular engine", accent: "#00ffff" },
  3: { name: "Unreal", description: "AAA engine", accent: "#ff6600" },
  4: { name: "2D Physics", description: "Movement & forces", accent: "#00ff00" },
  5: { name: "3D Graphics", description: "Rendering", accent: "#ff00ff" },
  6: { name: "AI", description: "Game intelligence", accent: "#ffff00" },
  7: { name: "Audio", description: "Sound design", accent: "#ff69b4" },
  8: { name: "UI/UX", description: "Interface design", accent: "#00ffff" },
  9: { name: "Multiplayer", description: "Networking", accent: "#ff6600" },
  10: { name: "Publishing", description: "Release game", accent: "#00ff00" }
};

const SECTION_CONFIG = {
  basic: { name: "Design", color: "#ff00ff", icon: "🎮" },
  intermediate: { name: "Code", color: "#00ffff", icon: "💻" },
  advanced: { name: "Polish", color: "#00ff00", icon: "✨" }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GAME_QUESTIONS, GAME_LEVELS, SECTION_CONFIG };
}
