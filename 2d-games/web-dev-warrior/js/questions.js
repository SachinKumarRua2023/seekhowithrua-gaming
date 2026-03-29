/**
 * Web Dev Warrior - Full Stack Web Development Questions
 */

const GAME_QUESTIONS = {
  1: {
    name: "HTML & CSS",
    sections: {
      basic: [
        {
          question: "What does HTML stand for?",
          options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Make Link", "Home Tool Markup Language"],
          correct: 0,
          hint: "It's the structure language of the web",
          nextHint: "HyperText Markup Language - structures web content"
        },
        {
          question: "Which tag creates the largest heading?",
          options: ["<h6>", "<heading>", "<h1>", "<head>"],
          correct: 2,
          hint: "Lower numbers mean larger headings",
          nextHint: "h1 is the main heading, h6 is the smallest"
        },
        {
          question: "What CSS property changes text color?",
          options: ["text-color", "font-color", "color", "text-style"],
          correct: 2,
          hint: "Simplest property name for color",
          nextHint: "Just 'color' sets the text color in CSS"
        },
        {
          question: "Which selector targets an element by ID?",
          options: [".id", "#id", "id", "*id"],
          correct: 1,
          hint: "Uses the hash/pound symbol",
          nextHint: "#elementId targets an element with that ID"
        }
      ],
      intermediate: [
        {
          question: "What is the CSS Box Model?",
          options: ["A 3D shape", "Content, padding, border, margin", "A layout grid", "A JavaScript framework"],
          correct: 1,
          hint: "Layers around an element from inside to outside",
          nextHint: "Content → Padding → Border → Margin"
        },
        {
          question: "What does 'display: flex' do?",
          options: ["Hides element", "Creates flexible layout", "Makes element inline", "Adds animation"],
          correct: 1,
          hint: "Enables flexible box layout for responsive design",
          nextHint: "Flexbox allows easy alignment and distribution of space"
        }
      ],
      advanced: [
        {
          question: "What is CSS Grid used for?",
          options: ["Drawing shapes", "2D layout system", "Text formatting", "Image processing"],
          correct: 1,
          hint: "Powerful layout system for rows AND columns",
          nextHint: "Grid allows complex 2D layouts with rows and columns"
        }
      ]
    }
  },
  2: {
    name: "JavaScript Basics",
    sections: {
      basic: [
        {
          question: "How do you declare a variable in JavaScript?",
          options: ["var", "let", "const", "All of the above"],
          correct: 3,
          hint: "Multiple ways exist in modern JavaScript",
          nextHint: "var (old), let (changeable), const (constant)"
        }
      ],
      intermediate: [
        {
          question: "What is a Promise in JavaScript?",
          options: ["A guarantee", "Async operation handler", "A function", "An error"],
          correct: 1,
          hint: "Handles asynchronous operations",
          nextHint: "Promises handle async operations with .then() and .catch()"
        }
      ],
      advanced: [
        {
          question: "What is the event loop?",
          options: ["A for loop", "Handles async callbacks", "A timer", "An animation"],
          correct: 1,
          hint: "Manages the call stack and callback queue",
          nextHint: "The event loop manages async code execution"
        }
      ]
    }
  }
};

const GAME_LEVELS = {
  1: { name: "HTML & CSS", description: "Structure and styling", accent: "#e34c26" },
  2: { name: "JavaScript", description: "Interactivity", accent: "#f7df1e" },
  3: { name: "React", description: "Component library", accent: "#61dafb" },
  4: { name: "Node.js", description: "Backend JavaScript", accent: "#339933" },
  5: { name: "Databases", description: "Data storage", accent: "#00758f" },
  6: { name: "APIs", description: "Communication", accent: "#ff6c37" },
  7: { name: "Authentication", description: "Security", accent: "#000000" },
  8: { name: "Testing", description: "Quality assurance", accent: "#8d6748" },
  9: { name: "Deployment", description: "Going live", accent: "#7952b3" },
  10: { name: "Full Stack", description: "Complete apps", accent: "#6cc24a" }
};

const SECTION_CONFIG = {
  basic: { name: "Frontend", color: "#e34c26", icon: "🎨" },
  intermediate: { name: "Backend", color: "#339933", icon: "⚙️" },
  advanced: { name: "Database", color: "#00758f", icon: "🗄️" }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GAME_QUESTIONS, GAME_LEVELS, SECTION_CONFIG };
}
