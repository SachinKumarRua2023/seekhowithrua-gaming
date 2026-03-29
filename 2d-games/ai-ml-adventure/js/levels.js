/**
 * Neural Navigator - Level Configuration
 */

const GAME_LEVELS = {
  1: { name: "Neural Foundations", description: "Learn the basics of neural networks", theme: "neural-purple", accent: "#8b5cf6" },
  2: { name: "Deep Learning", description: "Explore deep neural architectures", theme: "deep-blue", accent: "#3b82f6" },
  3: { name: "CNN Mastery", description: "Convolutional Neural Networks", theme: "vision-green", accent: "#10b981" },
  4: { name: "RNN & LSTM", description: "Sequential data processing", theme: "sequence-orange", accent: "#f59e0b" },
  5: { name: "Autoencoders", description: "Unsupervised feature learning", theme: "encoder-pink", accent: "#ec4899" },
  6: { name: "GANs", description: "Generative Adversarial Networks", theme: "gan-purple", accent: "#a855f7" },
  7: { name: "Reinforcement Learning", description: "Learning through interaction", theme: "rl-red", accent: "#ef4444" },
  8: { name: "Transfer Learning", description: "Leveraging pre-trained models", theme: "transfer-cyan", accent: "#06b6d4" },
  9: { name: "Model Optimization", description: "Speed and efficiency", theme: "optimize-yellow", accent: "#eab308" },
  10: { name: "AI Master", description: "Real-world AI applications", theme: "master-gold", accent: "#ffd700" }
};

const SECTION_CONFIG = {
  basic: { name: "Input Layer", color: "#1D9E75", icon: "📥", obstacles: 3, obstacleType: "static" },
  intermediate: { name: "Hidden Layer", color: "#f59e0b", icon: "🧠", obstacles: 4, obstacleType: "moving" },
  advanced: { name: "Output Layer", color: "#8b5cf6", icon: "📤", obstacles: 5, obstacleType: "rotating" }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GAME_LEVELS, SECTION_CONFIG };
}
