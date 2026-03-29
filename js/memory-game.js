/**
 * Memory Training Game
 * SeekhoWithRua Gaming
 * 
 * Features:
 * - 4 Modes: Objects (emoji), Numbers, Words, Images
 * - 4 Levels: 20, 50, 100, 200 items
 * - Timer options: 1, 3, 5, 10 minutes
 * - Sound hooks: correct.wav, incorrect.wav, tick.wav, success.wav
 */

// Sound Configuration
// Place your .wav files in the sounds/ folder
const SOUNDS = {
  correct: 'sounds/correct.wav',
  incorrect: 'sounds/incorrect.wav',
  tick: 'sounds/tick.wav',
  success: 'sounds/success.wav'
};

// Sound player
function playSound(soundName) {
  try {
    const audio = new Audio(SOUNDS[soundName]);
    audio.volume = 0.5;
    audio.play().catch(() => {});
  } catch (e) {
    console.log('Sound not found:', soundName);
  }
}

// Data Sets
const DATA_SETS = {
  objects: [
    '🍎','🍊','🍋','🍌','🍉','🍇','🍓','🫐','🍈','🍒','🍑','🍍',
    '🥝','🥑','🍆','🥕','🌽','🌶️','🫑','🥒','🥬','🥦','🧄','🧅',
    '🍄','🥜','🌰','🍞','🥐','🥖','🥨','🥯','🥞','🧇','🧀','🍖',
    '🍗','🥩','🥓','🍔','🍟','🍕','🌭','🥪','🌮','🌯','🫔','🥙',
    '🧆','🥚','🍳','🥘','🍲','🫕','🥣','🥗','🍿','🧈','🧂','🥫',
    '🍱','🍘','🍙','🍚','🍛','🍜','🍝','🍠','🍢','🍣','🍤','🍥',
    '🥮','🍡','🥟','🥠','🥡','🦀','🦞','🦐','🦑','🦪','🍦','🍧',
    '🍨','🍩','🍪','🎂','🍰','🧁','🥧','🍫','🍬','🍭','🍮','🍯',
    '🍼','🥛','☕','🫖','🍵','🍶','🍾','🍷','🍸','🍹','🍺','🍻',
    '🥂','🥃','🥤','🧃','🧉','🧊','🥢','🍽️','🍴','🥄','🔪','🧊',
    '🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮',
    '🐷','🐸','🐵','🐔','🐧','🐦','🐤','🦆','🦅','🦉','🦇','🐺',
    '🐗','🐴','🦄','🐝','🐛','🦋','🐌','🐞','🐜','🦟','🦗','🕷️',
    '🦂','🐢','🐍','🦎','🦖','🦕','🐙','🦑','🦐','🦞','🦀','🐡',
    '🐠','🐟','🐬','🐳','🐋','🦈','🐊','🐅','🐆','🦓','🦍','🦧',
    '🐘','🦛','🦏','🐪','🐫','🦒','🦘','🐃','🐂','🐄','🐎','🐖',
    '🐏','🐑','🦙','🐐','🦌','🐕','🐩','🦮','🐕‍🦺','🐈','🐈‍⬛',
    '🐓','🦃','🦚','🦜','🦢','🦩','🕊️','🐇','🦝','🦨','🦡','🦦'
  ],
  
  words: [
    'APPLE','BEACH','CLOUD','DANCE','EAGLE','FLAME','GRAPE','HOUSE','IGLOO',
    'JUICE','KNIFE','LEMON','MUSIC','NIGHT','OCEAN','PIANO','QUEEN','RIVER',
    'SNAKE','TABLE','UNCLE','VIDEO','WATER','XYLO','YACHT','ZEBRA','ANGEL',
    'BREAD','CHAIR','DREAM','EARTH','FLUTE','GLASS','HEART','IMAGE','JEWEL',
    'KOALA','LAMP','MOON','NURSE','OLIVE','PEARL','QUIET','ROBOT','SHIRT',
    'TIGER','UMBRA','VIOLET','WHALE','YELLOW','ZEBRA','ARROW','BLOOM','CRANE',
    'DOLPH','EMBER','FROST','GLOBE','HONEY','ISLAND','JUNGLE','KING','LIGHT',
    'MANGO','NOBLE','ORBIT','PEACH','QUILT','RAINBOW','SILVER','TOWER','UNION',
    'VALLEY','WINTER','ZOOM','BLOSS','CANDLE','DINNER','FRIEND','GARDEN','HAPPY',
    'INSECT','JACKET','KITE','LION','MAGIC','NATURE','ORANGE','PEACE','QUEEN',
    'RABBIT','SUMMER','TURTLE','VOICE','WISDOM','ACTION','BALANCE','CIRCLE',
    'DESIGN','ENERGY','FAMILY','GOLDEN','HONOR','INSIDE','JOURNEY','KEY','LUCKY',
    'MASTER','NORTHER','ORBITAL','PEACEFUL','QUALITY','RADIANT','SHADOW','TEMPLE',
    'UNICORN','VICTORY','WONDER','YOUNG','ZENITH','BUTTER','CRYSTAL','DIAMOND',
    'EMERALD','FOREST','GALAXY','HARMONY','ICEBERG','JASMINE','KINDNESS',
    'LEGEND','MIRACLE','NATURAL','OPAL','PLANET','QUARTZ','RUBY','SAPPHIRE',
    'TREASURE','UNIVERSE','VIOLET','WILLOW','MYSTERY','LEGACY','BLOSSOM',
    'CASCADE','DUSK','ETERNAL','FLARE','GENTLE','HORIZON','INFINITY','JOY',
    'KINETIC','LUMEN','MIST','NOVA','OBSIDIAN','PRISM','QUANTUM','RIPPLE',
    'SOLSTICE','TWILIGHT','VORTEX','ZEN','AURORA','BLAZE','COMET','DRIFT'
  ],
  
  numbers: null // Generated dynamically
};

// Game State
const gameState = {
  mode: 'objects',     // objects, numbers, words, images
  level: 20,           // 20, 50, 100, 200
  timerMinutes: 3,     // 1, 3, 5, 10
  items: [],           // Current items to memorize
  userAnswers: [],     // User's recalled answers
  phase: 'setup',      // setup, memorize, recall, results
  startTime: null,
  endTime: null,
  score: 0,
  correctCount: 0
};

// DOM Elements container
let elements = {};

// Initialize Game
function initGame() {
  createGameStructure();
  bindElements();
  showSetupScreen();
}

// Create HTML Structure
function createGameStructure() {
  const container = document.getElementById('game-container');
  
  container.innerHTML = `
    <header class="game-header">
      <h1>🧠 Memory Training</h1>
      <p>Train your brain. Improve your memory power.</p>
    </header>
    
    <main id="game-main">
      <!-- Setup Screen -->
      <div id="setup-screen" class="panel">
        <div class="panel-title">Choose Your Challenge</div>
        <div class="panel-subtitle">Select mode, difficulty, and time</div>
        
        <div class="instructions">
          <h3>How to Play</h3>
          <ul>
            <li>Memorize items in order with their index numbers</li>
            <li>Recall phase: Fill in what you remember</li>
            <li>Score based on accuracy and speed</li>
            <li>Level up as you improve!</li>
          </ul>
        </div>
        
        <div class="section-title">1. Select Mode</div>
        <div class="mode-grid">
          <button class="mode-btn active" data-mode="objects">
            <span class="mode-icon">🎯</span>
            Objects
          </button>
          <button class="mode-btn" data-mode="numbers">
            <span class="mode-icon">🔢</span>
            Numbers
          </button>
          <button class="mode-btn" data-mode="words">
            <span class="mode-icon">📝</span>
            Words
          </button>
          <button class="mode-btn" data-mode="images">
            <span class="mode-icon">🖼️</span>
            Images
          </button>
        </div>
        
        <div class="section-title">2. Select Level</div>
        <div class="level-grid">
          <button class="level-btn active" data-level="20">
            <div class="level-number">20</div>
            <div class="level-label">Beginner</div>
          </button>
          <button class="level-btn" data-level="50">
            <div class="level-number">50</div>
            <div class="level-label">Intermediate</div>
          </button>
          <button class="level-btn" data-level="100">
            <div class="level-number">100</div>
            <div class="level-label">Advanced</div>
          </button>
          <button class="level-btn" data-level="200">
            <div class="level-number">200</div>
            <div class="level-label">Expert</div>
          </button>
        </div>
        
        <div class="section-title">3. Select Time</div>
        <div class="timer-grid">
          <button class="timer-btn" data-time="1">1 min</button>
          <button class="timer-btn active" data-time="3">3 min</button>
          <button class="timer-btn" data-time="5">5 min</button>
          <button class="timer-btn" data-time="10">10 min</button>
        </div>
        
        <button id="start-btn" class="action-btn">Start Training</button>
      </div>
      
      <!-- Memorize Screen -->
      <div id="memorize-screen" class="panel hidden">
        <div class="phase-indicator">
          <div class="phase-dot completed"></div>
          <div class="phase-dot active"></div>
          <div class="phase-dot"></div>
        </div>
        
        <div class="panel-title">Memorize Phase</div>
        <div class="panel-subtitle">Remember the items with their numbers</div>
        
        <div class="timer-display" id="memorize-timer">03:00</div>
        <div class="progress-bar">
          <div class="progress-fill" id="memorize-progress" style="width: 100%"></div>
        </div>
        
        <div id="memorize-grid" class="memorize-grid"></div>
        
        <button id="ready-btn" class="action-btn">I'm Ready! (Start Recall)</button>
      </div>
      
      <!-- Recall Screen -->
      <div id="recall-screen" class="panel hidden">
        <div class="phase-indicator">
          <div class="phase-dot completed"></div>
          <div class="phase-dot completed"></div>
          <div class="phase-dot active"></div>
        </div>
        
        <div class="panel-title">Recall Phase</div>
        <div class="panel-subtitle">Fill in what you remember</div>
        
        <div class="timer-display" id="recall-timer">--:--</div>
        
        <div id="recall-grid" class="recall-grid"></div>
        
        <button id="submit-btn" class="action-btn">Submit Answers</button>
      </div>
      
      <!-- Results Screen -->
      <div id="results-screen" class="panel results-panel hidden">
        <div class="phase-indicator">
          <div class="phase-dot completed"></div>
          <div class="phase-dot completed"></div>
          <div class="phase-dot completed"></div>
        </div>
        
        <div class="panel-title">Results</div>
        
        <div id="score-display" class="score-display">0%</div>
        <div id="accuracy-text" class="accuracy-text">Accuracy</div>
        
        <div class="stats-grid">
          <div class="stat-box">
            <div id="stat-correct" class="stat-value">0</div>
            <div class="stat-label">Correct</div>
          </div>
          <div class="stat-box">
            <div id="stat-total" class="stat-value">0</div>
            <div class="stat-label">Total</div>
          </div>
          <div class="stat-box">
            <div id="stat-time" class="stat-value">0:00</div>
            <div class="stat-label">Time</div>
          </div>
        </div>
        
        <div id="feedback-text" style="margin-bottom: 24px; font-size: 1.1rem;"></div>
        
        <div class="btn-row">
          <button id="retry-btn" class="btn">Try Again</button>
          <button id="next-level-btn" class="btn btn-primary hidden">Next Level</button>
          <button id="home-btn" class="btn">Main Menu</button>
        </div>
      </div>
    </main>
    
    <footer class="game-footer">
      <p>Part of <a href="https://seekhowithrua.com">SeekhoWithRua</a> | Train Your Brain</p>
    </footer>
  `;
}

// Bind DOM Elements
function bindElements() {
  elements = {
    setupScreen: document.getElementById('setup-screen'),
    memorizeScreen: document.getElementById('memorize-screen'),
    recallScreen: document.getElementById('recall-screen'),
    resultsScreen: document.getElementById('results-screen'),
    memorizeGrid: document.getElementById('memorize-grid'),
    recallGrid: document.getElementById('recall-grid'),
    memorizeTimer: document.getElementById('memorize-timer'),
    recallTimer: document.getElementById('recall-timer'),
    memorizeProgress: document.getElementById('memorize-progress'),
    scoreDisplay: document.getElementById('score-display'),
    accuracyText: document.getElementById('accuracy-text'),
    statCorrect: document.getElementById('stat-correct'),
    statTotal: document.getElementById('stat-total'),
    statTime: document.getElementById('stat-time'),
    feedbackText: document.getElementById('feedback-text'),
    nextLevelBtn: document.getElementById('next-level-btn')
  };
  
  // Mode buttons
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      gameState.mode = btn.dataset.mode;
      playSound('tick');
    });
  });
  
  // Level buttons
  document.querySelectorAll('.level-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      gameState.level = parseInt(btn.dataset.level);
      playSound('tick');
    });
  });
  
  // Timer buttons
  document.querySelectorAll('.timer-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.timer-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      gameState.timerMinutes = parseInt(btn.dataset.time);
      playSound('tick');
    });
  });
  
  // Action buttons
  document.getElementById('start-btn').addEventListener('click', startGame);
  document.getElementById('ready-btn').addEventListener('click', startRecall);
  document.getElementById('submit-btn').addEventListener('click', submitAnswers);
  document.getElementById('retry-btn').addEventListener('click', retryLevel);
  document.getElementById('next-level-btn').addEventListener('click', nextLevel);
  document.getElementById('home-btn').addEventListener('click', showSetupScreen);
}

// Generate Items
function generateItems(mode, count) {
  const items = [];
  
  if (mode === 'numbers') {
    // Generate random numbers (2-4 digits)
    for (let i = 0; i < count; i++) {
      const digits = Math.random() > 0.5 ? 2 : 3;
      const num = Math.floor(Math.random() * (Math.pow(10, digits) - Math.pow(10, digits-1))) + Math.pow(10, digits-1);
      items.push(num.toString());
    }
  } else if (mode === 'words') {
    // Shuffle and pick words
    const shuffled = [...DATA_SETS.words].sort(() => Math.random() - 0.5);
    items.push(...shuffled.slice(0, count));
  } else if (mode === 'objects') {
    // Shuffle and pick emojis
    const shuffled = [...DATA_SETS.objects].sort(() => Math.random() - 0.5);
    items.push(...shuffled.slice(0, count));
  } else {
    // Images mode - fallback to objects for now
    const shuffled = [...DATA_SETS.objects].sort(() => Math.random() - 0.5);
    items.push(...shuffled.slice(0, count));
  }
  
  return items;
}

// Start Game
function startGame() {
  playSound('success');
  
  // Generate items
  gameState.items = generateItems(gameState.mode, gameState.level);
  gameState.userAnswers = new Array(gameState.level).fill('');
  gameState.phase = 'memorize';
  gameState.startTime = Date.now();
  
  // Show memorize screen
  showScreen('memorize');
  renderMemorizeGrid();
  
  // Start timer
  startMemorizeTimer();
}

// Render Memorize Grid
function renderMemorizeGrid() {
  elements.memorizeGrid.innerHTML = gameState.items.map((item, index) => `
    <div class="item-card">
      <span class="item-index">${index + 1}</span>
      <span class="item-content ${gameState.mode === 'words' ? 'small' : ''}">${item}</span>
    </div>
  `).join('');
}

// Memorize Timer
let memorizeTimerInterval;
function startMemorizeTimer() {
  let secondsLeft = gameState.timerMinutes * 60;
  const totalSeconds = secondsLeft;
  
  updateTimerDisplay(secondsLeft);
  
  memorizeTimerInterval = setInterval(() => {
    secondsLeft--;
    updateTimerDisplay(secondsLeft);
    
    // Update progress bar
    const progress = (secondsLeft / totalSeconds) * 100;
    elements.memorizeProgress.style.width = `${progress}%`;
    
    // Play tick sound every 10 seconds when time is running low
    if (secondsLeft <= 10 && secondsLeft > 0) {
      playSound('tick');
      elements.memorizeTimer.classList.add('danger');
    } else if (secondsLeft <= 30) {
      elements.memorizeTimer.classList.add('warning');
    }
    
    if (secondsLeft <= 0) {
      clearInterval(memorizeTimerInterval);
      startRecall();
    }
  }, 1000);
}

// Update Timer Display
function updateTimerDisplay(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  elements.memorizeTimer.textContent = 
    `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Start Recall Phase
function startRecall() {
  clearInterval(memorizeTimerInterval);
  playSound('tick');
  
  gameState.phase = 'recall';
  showScreen('recall');
  renderRecallGrid();
  
  // Start recall timer (no limit, just tracking)
  startRecallTimer();
}

// Render Recall Grid
function renderRecallGrid() {
  elements.recallGrid.innerHTML = gameState.items.map((item, index) => `
    <div>
      <div class="input-label">#${index + 1}</div>
      <input type="text" 
             class="recall-input" 
             data-index="${index}" 
             placeholder="?"
             autocomplete="off">
    </div>
  `).join('');
  
  // Focus first input
  setTimeout(() => {
    const firstInput = elements.recallGrid.querySelector('.recall-input');
    if (firstInput) firstInput.focus();
  }, 100);
}

// Recall Timer (tracking only)
let recallTimerInterval;
function startRecallTimer() {
  let seconds = 0;
  
  recallTimerInterval = setInterval(() => {
    seconds++;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    elements.recallTimer.textContent = 
      `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, 1000);
}

// Submit Answers
function submitAnswers() {
  clearInterval(recallTimerInterval);
  playSound('success');
  
  // Collect answers
  const inputs = elements.recallGrid.querySelectorAll('.recall-input');
  inputs.forEach(input => {
    const index = parseInt(input.dataset.index);
    gameState.userAnswers[index] = input.value.trim();
  });
  
  // Calculate score
  calculateResults();
}

// Calculate Results
function calculateResults() {
  let correct = 0;
  
  gameState.items.forEach((item, index) => {
    const userAnswer = gameState.userAnswers[index].toUpperCase().trim();
    const correctAnswer = item.toString().toUpperCase().trim();
    
    if (userAnswer === correctAnswer) {
      correct++;
    }
  });
  
  gameState.correctCount = correct;
  gameState.score = Math.round((correct / gameState.level) * 100);
  gameState.endTime = Date.now();
  
  // Show results
  showResults();
}

// Show Results
function showResults() {
  gameState.phase = 'results';
  showScreen('results');
  
  // Update score display
  const scoreEl = elements.scoreDisplay;
  scoreEl.textContent = `${gameState.score}%`;
  
  // Color code score
  scoreEl.className = 'score-display';
  if (gameState.score >= 90) {
    scoreEl.classList.add('excellent');
    elements.accuracyText.textContent = 'Excellent! 🌟';
    playSound('success');
  } else if (gameState.score >= 70) {
    scoreEl.classList.add('good');
    elements.accuracyText.textContent = 'Good job! 👍';
  } else if (gameState.score >= 50) {
    scoreEl.classList.add('ok');
    elements.accuracyText.textContent = 'Keep practicing! 💪';
  } else {
    scoreEl.classList.add('poor');
    elements.accuracyText.textContent = 'Need more practice 📚';
    playSound('incorrect');
  }
  
  // Update stats
  elements.statCorrect.textContent = gameState.correctCount;
  elements.statTotal.textContent = gameState.level;
  
  const timeSpent = Math.floor((gameState.endTime - gameState.startTime) / 1000);
  const mins = Math.floor(timeSpent / 60);
  const secs = timeSpent % 60;
  elements.statTime.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
  
  // Feedback text
  const feedbacks = {
    excellent: `Amazing! You remembered ${gameState.correctCount} out of ${gameState.level} items. Your memory is sharp!`,
    good: `Great work! You got ${gameState.correctCount} correct. Keep training to reach 100%!`,
    ok: `Not bad! You remembered ${gameState.correctCount} items. Practice makes perfect!`,
    poor: `Keep practicing! You got ${gameState.correctCount} correct. Try a shorter level first.`
  };
  
  let feedbackKey = 'poor';
  if (gameState.score >= 90) feedbackKey = 'excellent';
  else if (gameState.score >= 70) feedbackKey = 'good';
  else if (gameState.score >= 50) feedbackKey = 'ok';
  
  elements.feedbackText.textContent = feedbacks[feedbackKey];
  
  // Show next level button if score is good
  if (gameState.score >= 70 && gameState.level < 200) {
    elements.nextLevelBtn.classList.remove('hidden');
  } else {
    elements.nextLevelBtn.classList.add('hidden');
  }
}

// Show Specific Screen
function showScreen(screenName) {
  elements.setupScreen.classList.add('hidden');
  elements.memorizeScreen.classList.add('hidden');
  elements.recallScreen.classList.add('hidden');
  elements.resultsScreen.classList.add('hidden');
  
  switch(screenName) {
    case 'setup':
      elements.setupScreen.classList.remove('hidden');
      break;
    case 'memorize':
      elements.memorizeScreen.classList.remove('hidden');
      break;
    case 'recall':
      elements.recallScreen.classList.remove('hidden');
      break;
    case 'results':
      elements.resultsScreen.classList.remove('hidden');
      break;
  }
  
  // Scroll to top
  window.scrollTo(0, 0);
}

// Show Setup Screen
function showSetupScreen() {
  clearInterval(memorizeTimerInterval);
  clearInterval(recallTimerInterval);
  elements.memorizeTimer.classList.remove('warning', 'danger');
  elements.memorizeProgress.style.width = '100%';
  
  // Check for default level from entry point config
  if (window.GAME_CONFIG && window.GAME_CONFIG.defaultLevel) {
    gameState.level = window.GAME_CONFIG.defaultLevel;
    
    // Update UI to reflect default level
    document.querySelectorAll('.level-btn').forEach(btn => {
      btn.classList.remove('active');
      if (parseInt(btn.dataset.level) === gameState.level) {
        btn.classList.add('active');
      }
    });
  }
  
  showScreen('setup');
}

// Retry Same Level
function retryLevel() {
  startGame();
}

// Next Level
function nextLevel() {
  const levels = [20, 50, 100, 200];
  const currentIndex = levels.indexOf(gameState.level);
  
  if (currentIndex < levels.length - 1) {
    gameState.level = levels[currentIndex + 1];
    
    // Update UI to show new level
    document.querySelectorAll('.level-btn').forEach(btn => {
      btn.classList.remove('active');
      if (parseInt(btn.dataset.level) === gameState.level) {
        btn.classList.add('active');
      }
    });
    
    startGame();
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initGame);
