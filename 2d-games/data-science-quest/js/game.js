/**
 * Data Quest - Main Game Engine
 * 2D Adventure + Quiz Game for Data Science Learning
 */

class DataQuestGame {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    
    // Game state
    this.currentLevel = 1;
    this.currentSection = 'basic'; // basic, intermediate, advanced
    this.currentQuestion = 0;
    this.score = 0;
    this.keys = { bronze: 0, silver: 0, gold: 0 };
    this.fragments = { basic: false, intermediate: false, advanced: false };
    
    // Player
    this.player = {
      x: 100,
      y: 300,
      width: 40,
      height: 40,
      speed: 5,
      color: '#00d4ff',
      glow: 20
    };
    
    // Game objects
    this.nodes = []; // Question nodes
    this.obstacles = []; // Hurdles/obstacles
    this.particles = [];
    
    // Input
    this.keysPressed = {};
    
    // Initialize
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.generateLevel();
    this.createBackgroundParticles();
    this.gameLoop();
    this.updateUI();
  }
  
  setupEventListeners() {
    // Keyboard controls
    document.addEventListener('keydown', (e) => {
      this.keysPressed[e.key.toLowerCase()] = true;
      
      // WASD or Arrow keys
      if (['w', 'arrowup'].includes(e.key.toLowerCase())) this.player.y -= this.player.speed;
      if (['s', 'arrowdown'].includes(e.key.toLowerCase())) this.player.y += this.player.speed;
      if (['a', 'arrowleft'].includes(e.key.toLowerCase())) this.player.x -= this.player.speed;
      if (['d', 'arrowright'].includes(e.key.toLowerCase())) this.player.x += this.player.speed;
      
      // Keep player in bounds
      this.player.x = Math.max(20, Math.min(this.canvas.width - 20 - this.player.width, this.player.x));
      this.player.y = Math.max(20, Math.min(this.canvas.height - 20 - this.player.height, this.player.y));
    });
    
    document.addEventListener('keyup', (e) => {
      this.keysPressed[e.key.toLowerCase()] = false;
    });
    
    // Touch controls for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    
    this.canvas.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    });
    
    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      
      const dx = touchX - touchStartX;
      const dy = touchY - touchStartY;
      
      this.player.x += dx * 0.1;
      this.player.y += dy * 0.1;
      
      // Keep in bounds
      this.player.x = Math.max(20, Math.min(this.canvas.width - 20 - this.player.width, this.player.x));
      this.player.y = Math.max(20, Math.min(this.canvas.height - 20 - this.player.height, this.player.y));
      
      touchStartX = touchX;
      touchStartY = touchY;
    });
  }
  
  generateLevel() {
    this.nodes = [];
    this.obstacles = [];
    
    const questions = this.getCurrentQuestions();
    const nodeCount = questions.length;
    
    // Generate question nodes in a path pattern
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 200;
      const centerX = this.canvas.width / 2;
      const centerY = this.canvas.height / 2;
      
      this.nodes.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        radius: 25,
        color: this.getSectionColor(),
        questionIndex: i,
        answered: false,
        pulse: 0
      });
    }
    
    // Generate obstacles based on section
    this.generateObstacles();
  }
  
  generateObstacles() {
    const section = this.currentSection;
    
    if (section === 'basic') {
      // Simple static obstacles
      for (let i = 0; i < 3; i++) {
        this.obstacles.push({
          x: 200 + i * 200,
          y: 150 + (i % 2) * 300,
          width: 60,
          height: 60,
          type: 'static',
          color: '#ef4444'
        });
      }
    } else if (section === 'intermediate') {
      // Moving obstacles
      for (let i = 0; i < 4; i++) {
        this.obstacles.push({
          x: 150 + i * 180,
          y: 100,
          width: 50,
          height: 50,
          type: 'moving',
          color: '#f59e0b',
          speedX: 2,
          speedY: 1.5,
          range: 100
        });
      }
    } else {
      // Advanced - rotating obstacles + boss
      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        this.obstacles.push({
          x: this.canvas.width / 2 + Math.cos(angle) * 150,
          y: this.canvas.height / 2 + Math.sin(angle) * 150,
          width: 40,
          height: 40,
          type: 'rotating',
          color: '#8b5cf6',
          angle: angle,
          radius: 150,
          speed: 0.02
        });
      }
    }
  }
  
  getSectionColor() {
    switch(this.currentSection) {
      case 'basic': return '#1D9E75';
      case 'intermediate': return '#f59e0b';
      case 'advanced': return '#8b5cf6';
      default: return '#00d4ff';
    }
  }
  
  getCurrentQuestions() {
    const levelData = GAME_QUESTIONS[this.currentLevel];
    if (!levelData) return [];
    return levelData.sections[this.currentSection] || [];
  }
  
  createBackgroundParticles() {
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2,
        alpha: Math.random() * 0.5
      });
    }
  }
  
  gameLoop() {
    this.update();
    this.render();
    requestAnimationFrame(() => this.gameLoop());
  }
  
  update() {
    // Update node pulse animation
    this.nodes.forEach((node, i) => {
      node.pulse += 0.05;
      
      // Check collision with player
      const dx = this.player.x + this.player.width/2 - node.x;
      const dy = this.player.y + this.player.height/2 - node.y;
      const distance = Math.sqrt(dx*dx + dy*dy);
      
      if (distance < node.radius + this.player.width/2 && !node.answered) {
        this.showQuiz(node.questionIndex);
      }
    });
    
    // Update obstacles
    this.obstacles.forEach(obs => {
      if (obs.type === 'moving') {
        obs.x += obs.speedX;
        obs.y += obs.speedY;
        
        // Bounce within range
        if (Math.abs(obs.x - 150) > obs.range) obs.speedX *= -1;
        if (Math.abs(obs.y - 100) > obs.range) obs.speedY *= -1;
      } else if (obs.type === 'rotating') {
        obs.angle += obs.speed;
        obs.x = this.canvas.width/2 + Math.cos(obs.angle) * obs.radius;
        obs.y = this.canvas.height/2 + Math.sin(obs.angle) * obs.radius;
      }
      
      // Check collision with player
      if (this.checkCollision(this.player, obs)) {
        // Push player back
        this.player.x -= (this.player.x - obs.x) * 0.1;
        this.player.y -= (this.player.y - obs.y) * 0.1;
      }
    });
    
    // Update particles
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      
      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;
    });
  }
  
  checkCollision(player, obstacle) {
    return player.x < obstacle.x + obstacle.width &&
           player.x + player.width > obstacle.x &&
           player.y < obstacle.y + obstacle.height &&
           player.y + player.height > obstacle.y;
  }
  
  render() {
    // Clear canvas
    this.ctx.fillStyle = '#0d0d2a';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw grid
    this.drawGrid();
    
    // Draw particles
    this.particles.forEach(p => {
      this.ctx.fillStyle = `rgba(0, 212, 255, ${p.alpha})`;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
    
    // Draw path between nodes
    this.ctx.strokeStyle = 'rgba(124, 58, 237, 0.3)';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.nodes.forEach((node, i) => {
      if (i === 0) {
        this.ctx.moveTo(node.x, node.y);
      } else {
        this.ctx.lineTo(node.x, node.y);
      }
    });
    this.ctx.closePath();
    this.ctx.stroke();
    
    // Draw obstacles
    this.obstacles.forEach(obs => {
      this.ctx.fillStyle = obs.color;
      this.ctx.shadowBlur = 15;
      this.ctx.shadowColor = obs.color;
      this.ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
      this.ctx.shadowBlur = 0;
      
      // Draw warning symbol
      this.ctx.fillStyle = '#fff';
      this.ctx.font = '20px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('⚠', obs.x + obs.width/2, obs.y + obs.height/2 + 7);
    });
    
    // Draw nodes
    this.nodes.forEach(node => {
      // Glow effect
      const pulse = Math.sin(node.pulse) * 5;
      this.ctx.shadowBlur = 20 + pulse;
      this.ctx.shadowColor = node.color;
      
      // Node circle
      this.ctx.fillStyle = node.answered ? '#1D9E75' : node.color;
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      this.ctx.fill();
      
      this.ctx.shadowBlur = 0;
      
      // Inner circle
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.radius * 0.6, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Question mark or checkmark
      this.ctx.fillStyle = '#fff';
      this.ctx.font = 'bold 20px Orbitron';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(node.answered ? '✓' : '?', node.x, node.y);
    });
    
    // Draw player
    this.drawPlayer();
    
    // Draw section indicator
    this.drawSectionIndicator();
  }
  
  drawGrid() {
    this.ctx.strokeStyle = 'rgba(124, 58, 237, 0.1)';
    this.ctx.lineWidth = 1;
    
    const gridSize = 40;
    
    for (let x = 0; x <= this.canvas.width; x += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
      this.ctx.stroke();
    }
    
    for (let y = 0; y <= this.canvas.height; y += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
      this.ctx.stroke();
    }
  }
  
  drawPlayer() {
    const { x, y, width, height, color, glow } = this.player;
    
    // Glow
    this.ctx.shadowBlur = glow;
    this.ctx.shadowColor = color;
    
    // Body
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x + width/2, y + height/2, width/2, 0, Math.PI * 2);
    this.ctx.fill();
    
    this.ctx.shadowBlur = 0;
    
    // Inner core
    this.ctx.fillStyle = '#fff';
    this.ctx.beginPath();
    this.ctx.arc(x + width/2, y + height/2, width/4, 0, Math.PI * 2);
    this.ctx.fill();
    
    // Direction indicator based on movement
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x + width/2 + (this.keysPressed['d'] ? 8 : this.keysPressed['a'] ? -8 : 0), 
                 y + height/2 + (this.keysPressed['s'] ? 8 : this.keysPressed['w'] ? -8 : 0), 
                 4, 0, Math.PI * 2);
    this.ctx.fill();
  }
  
  drawSectionIndicator() {
    const sectionColors = {
      'basic': '#1D9E75',
      'intermediate': '#f59e0b',
      'advanced': '#8b5cf6'
    };
    
    this.ctx.fillStyle = sectionColors[this.currentSection];
    this.ctx.font = '14px Orbitron';
    this.ctx.textAlign = 'left';
    this.ctx.fillText(`SECTION: ${this.currentSection.toUpperCase()}`, 20, 30);
  }
  
  showQuiz(questionIndex) {
    const questions = this.getCurrentQuestions();
    if (!questions[questionIndex]) return;
    
    const question = questions[questionIndex];
    this.currentQuestion = questionIndex;
    
    // Show quiz modal
    const modal = document.getElementById('quizModal');
    const sectionBadge = document.getElementById('sectionBadge');
    const questionCounter = document.getElementById('questionCounter');
    const hintBox = document.getElementById('hintBox');
    const hintText = document.getElementById('hintText');
    const questionText = document.getElementById('questionText');
    const optionsGrid = document.getElementById('optionsGrid');
    
    sectionBadge.textContent = this.currentSection;
    sectionBadge.style.background = `linear-gradient(135deg, ${this.getSectionColor()}, #00d4ff)`;
    questionCounter.textContent = `${questionIndex + 1}/${questions.length}`;
    
    // Show hint from previous question (if any)
    if (questionIndex > 0) {
      const prevQuestion = questions[questionIndex - 1];
      if (this.nodes[questionIndex - 1].answered) {
        hintText.textContent = prevQuestion.nextHint;
        hintBox.style.borderColor = '#1D9E75';
      } else {
        hintText.textContent = "Answer the previous question to unlock this hint!";
        hintBox.style.borderColor = '#f59e0b';
      }
    } else {
      hintText.textContent = question.hint;
      hintBox.style.borderColor = '#00d4ff';
    }
    
    questionText.textContent = question.question;
    
    // Generate options
    optionsGrid.innerHTML = '';
    question.options.forEach((option, i) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = option;
      btn.onclick = () => this.checkAnswer(i, question.correct);
      optionsGrid.appendChild(btn);
    });
    
    modal.style.display = 'block';
    
    // Pause game
    this.gamePaused = true;
  }
  
  checkAnswer(selected, correct) {
    const buttons = document.querySelectorAll('.option-btn');
    
    if (selected === correct) {
      // Correct answer
      buttons[selected].classList.add('correct');
      this.score += 100;
      this.nodes[this.currentQuestion].answered = true;
      
      // Play success sound
      this.playSound('success');
      
      setTimeout(() => {
        this.closeQuiz();
        this.checkSectionComplete();
      }, 1000);
    } else {
      // Wrong answer
      buttons[selected].classList.add('wrong');
      buttons[correct].classList.add('correct');
      this.score = Math.max(0, this.score - 25);
      
      // Play error sound
      this.playSound('error');
      
      setTimeout(() => {
        this.closeQuiz();
      }, 1500);
    }
    
    this.updateUI();
  }
  
  closeQuiz() {
    document.getElementById('quizModal').style.display = 'none';
    this.gamePaused = false;
  }
  
  checkSectionComplete() {
    const questions = this.getCurrentQuestions();
    const answeredCount = this.nodes.filter(n => n.answered).length;
    
    if (answeredCount === questions.length) {
      // Section complete
      this.fragments[this.currentSection] = true;
      
      // Show level complete modal
      const modal = document.getElementById('levelModal');
      const text = document.getElementById('levelCompleteText');
      const fragmentsDisplay = document.getElementById('fragmentsDisplay');
      
      const fragmentNames = { basic: 'Bronze', intermediate: 'Silver', advanced: 'Gold' };
      const fragmentEmojis = { basic: '🥉', intermediate: '🥈', advanced: '🥇' };
      
      text.textContent = `You've earned a ${fragmentNames[this.currentSection]} Key Fragment!`;
      
      // Update fragments display
      fragmentsDisplay.innerHTML = Object.entries(this.fragments)
        .map(([section, earned]) => earned ? `<span class="fragment ${section === 'basic' ? 'bronze' : section === 'intermediate' ? 'silver' : 'gold'}">${fragmentEmojis[section]}</span>` : '')
        .join('');
      
      modal.style.display = 'block';
      
      // Play achievement sound
      this.playSound('achievement');
      
      this.updateUI();
    }
  }
  
  nextSection() {
    document.getElementById('levelModal').style.display = 'none';
    
    const sections = ['basic', 'intermediate', 'advanced'];
    const currentIndex = sections.indexOf(this.currentSection);
    
    if (currentIndex < 2) {
      // Move to next section
      this.currentSection = sections[currentIndex + 1];
      this.generateLevel();
    } else {
      // Level complete - check if all levels done
      if (this.currentLevel < 10) {
        this.currentLevel++;
        this.currentSection = 'basic';
        this.fragments = { basic: false, intermediate: false, advanced: false };
        this.generateLevel();
      } else {
        // Game complete!
        alert('Congratulations! You\'ve completed Data Quest!');
      }
    }
    
    this.updateUI();
  }
  
  skipQuestion() {
    this.score = Math.max(0, this.score - 50);
    this.closeQuiz();
    this.updateUI();
  }
  
  showExtraHint() {
    const questions = this.getCurrentQuestions();
    const question = questions[this.currentQuestion];
    
    document.getElementById('hintText').textContent = question.hint;
    document.getElementById('hintBox').style.borderColor = '#00d4ff';
    
    this.score = Math.max(0, this.score - 25);
    this.updateUI();
  }
  
  playSound(type) {
    // Use existing sound system from memory game
    if (typeof AudioManager !== 'undefined') {
      AudioManager.play(type);
    }
  }
  
  updateUI() {
    document.getElementById('levelDisplay').textContent = this.currentLevel;
    document.getElementById('scoreDisplay').textContent = this.score;
    
    const totalFragments = Object.values(this.fragments).filter(f => f).length;
    document.getElementById('keysDisplay').textContent = `${totalFragments}/3`;
    
    // Update progress bars
    const questions = this.getCurrentQuestions();
    const answeredCount = this.nodes.filter(n => n.answered).length;
    const progress = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;
    
    document.getElementById(`${this.currentSection}Progress`).style.width = `${progress}%`;
    document.getElementById(`${this.currentSection}Status`).textContent = this.fragments[this.currentSection] ? '✅' : '⚪';
  }
}

// Menu functions
function toggleMenu() {
  const menu = document.getElementById('gameMenu');
  menu.style.display = menu.style.display === 'none' ? 'flex' : 'none';
}

function resumeGame() {
  document.getElementById('gameMenu').style.display = 'none';
}

function restartLevel() {
  if (confirm('Restart current level? Progress will be reset.')) {
    game.currentQuestion = 0;
    game.nodes.forEach(n => n.answered = false);
    game.generateLevel();
    document.getElementById('gameMenu').style.display = 'none';
  }
}

function showInstructions() {
  document.getElementById('instructions').style.display = 'flex';
  document.getElementById('gameMenu').style.display = 'none';
}

function hideInstructions() {
  document.getElementById('instructions').style.display = 'none';
}

function returnToHub() {
  window.location.href = '../../index.html';
}

// Initialize game when page loads
let game;
document.addEventListener('DOMContentLoaded', () => {
  game = new DataQuestGame();
});
