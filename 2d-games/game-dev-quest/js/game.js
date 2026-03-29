/**
 * Game Dev Quest - Game Engine
 * Retro pixel art themed game
 */

class GameDevQuestGame {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    
    this.currentLevel = 1;
    this.currentSection = 'basic';
    this.currentQuestion = 0;
    this.score = 0;
    this.gameProgress = 0;
    this.fragments = { basic: false, intermediate: false, advanced: false };
    
    this.player = {
      x: 100,
      y: 300,
      width: 32,
      height: 32,
      speed: 4,
      color: '#00ff00',
      glow: 15
    };
    
    this.nodes = [];
    this.obstacles = [];
    this.particles = [];
    
    this.keysPressed = {};
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.generateLevel();
    this.createPixelParticles();
    this.gameLoop();
    this.updateUI();
  }
  
  setupEventListeners() {
    document.addEventListener('keydown', (e) => {
      this.keysPressed[e.key.toLowerCase()] = true;
      
      if (['w', 'arrowup'].includes(e.key.toLowerCase())) this.player.y -= this.player.speed;
      if (['s', 'arrowdown'].includes(e.key.toLowerCase())) this.player.y += this.player.speed;
      if (['a', 'arrowleft'].includes(e.key.toLowerCase())) this.player.x -= this.player.speed;
      if (['d', 'arrowright'].includes(e.key.toLowerCase())) this.player.x += this.player.speed;
      
      this.player.x = Math.max(16, Math.min(this.canvas.width - 16 - this.player.width, this.player.x));
      this.player.y = Math.max(16, Math.min(this.canvas.height - 16 - this.player.height, this.player.y));
    });
    
    document.addEventListener('keyup', (e) => {
      this.keysPressed[e.key.toLowerCase()] = false;
    });
  }
  
  generateLevel() {
    this.nodes = [];
    this.obstacles = [];
    
    const questions = this.getCurrentQuestions();
    const nodeCount = questions.length;
    
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 180;
      const centerX = this.canvas.width / 2;
      const centerY = this.canvas.height / 2;
      
      this.nodes.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        width: 32,
        height: 32,
        color: this.getSectionColor(),
        questionIndex: i,
        answered: false,
        pulse: 0
      });
    }
    
    this.generateObstacles();
  }
  
  generateObstacles() {
    const section = this.currentSection;
    
    if (section === 'basic') {
      for (let i = 0; i < 4; i++) {
        this.obstacles.push({
          x: 180 + i * 160,
          y: 140 + (i % 2) * 280,
          width: 32,
          height: 32,
          type: 'static',
          color: '#ff0000',
          symbol: '👾'
        });
      }
    } else if (section === 'intermediate') {
      for (let i = 0; i < 5; i++) {
        this.obstacles.push({
          x: 140 + i * 130,
          y: 80,
          width: 28,
          height: 28,
          type: 'moving',
          color: '#ff6600',
          speedX: 1.5,
          speedY: 1,
          range: 80,
          symbol: '🔥'
        });
      }
    } else {
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        this.obstacles.push({
          x: this.canvas.width / 2 + Math.cos(angle) * 130,
          y: this.canvas.height / 2 + Math.sin(angle) * 130,
          width: 24,
          height: 24,
          type: 'rotating',
          color: '#ffff00',
          angle: angle,
          radius: 130,
          speed: 0.025,
          symbol: '⚡'
        });
      }
    }
  }
  
  getSectionColor() {
    switch(this.currentSection) {
      case 'basic': return '#ff00ff';
      case 'intermediate': return '#00ffff';
      case 'advanced': return '#00ff00';
      default: return '#ff00ff';
    }
  }
  
  getCurrentQuestions() {
    const levelData = GAME_QUESTIONS[this.currentLevel];
    if (!levelData) return [];
    return levelData.sections[this.currentSection] || [];
  }
  
  createPixelParticles() {
    for (let i = 0; i < 60; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        size: 2 + Math.random() * 2,
        color: ['#ff00ff', '#00ffff', '#00ff00', '#ffff00'][Math.floor(Math.random() * 4)],
        alpha: Math.random() * 0.6 + 0.2,
        pulse: Math.random() * Math.PI * 2
      });
    }
  }
  
  gameLoop() {
    this.update();
    this.render();
    requestAnimationFrame(() => this.gameLoop());
  }
  
  update() {
    this.nodes.forEach((node, i) => {
      node.pulse += 0.08;
      
      const dx = this.player.x + this.player.width/2 - (node.x + node.width/2);
      const dy = this.player.y + this.player.height/2 - (node.y + node.height/2);
      const distance = Math.sqrt(dx*dx + dy*dy);
      
      if (distance < 30 && !node.answered) {
        this.showQuiz(node.questionIndex);
      }
    });
    
    this.obstacles.forEach(obs => {
      if (obs.type === 'moving') {
        obs.x += obs.speedX;
        obs.y += obs.speedY;
        
        if (Math.abs(obs.x - 140) > obs.range) obs.speedX *= -1;
        if (Math.abs(obs.y - 80) > obs.range) obs.speedY *= -1;
      } else if (obs.type === 'rotating') {
        obs.angle += obs.speed;
        obs.x = this.canvas.width/2 + Math.cos(obs.angle) * obs.radius;
        obs.y = this.canvas.height/2 + Math.sin(obs.angle) * obs.radius;
      }
      
      if (this.checkCollision(this.player, obs)) {
        this.player.x -= (this.player.x - obs.x) * 0.15;
        this.player.y -= (this.player.y - obs.y) * 0.15;
      }
    });
    
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += 0.03;
      
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
    this.ctx.fillStyle = '#0d0221';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.drawPixelGrid();
    this.drawParticles();
    
    this.obstacles.forEach(obs => {
      this.ctx.fillStyle = obs.color;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = obs.color;
      this.ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
      this.ctx.shadowBlur = 0;
      
      this.ctx.font = '16px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(obs.symbol, obs.x + obs.width/2, obs.y + obs.height/2 + 5);
    });
    
    this.nodes.forEach(node => {
      const pulse = Math.sin(node.pulse) * 3;
      this.ctx.shadowBlur = 15 + pulse;
      this.ctx.shadowColor = node.color;
      
      this.ctx.fillStyle = node.answered ? '#00ff00' : node.color;
      this.ctx.fillRect(node.x, node.y, node.width, node.height);
      
      this.ctx.shadowBlur = 0;
      
      // Pixel art border
      this.ctx.strokeStyle = '#fff';
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(node.x, node.y, node.width, node.height);
      
      this.ctx.fillStyle = '#fff';
      this.ctx.font = 'bold 12px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(node.answered ? '✓' : '?', node.x + node.width/2, node.y + node.height/2);
    });
    
    this.drawPlayer();
    this.drawSectionIndicator();
  }
  
  drawPixelGrid() {
    this.ctx.strokeStyle = 'rgba(255, 0, 255, 0.1)';
    this.ctx.lineWidth = 1;
    
    const gridSize = 20;
    
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
  
  drawParticles() {
    this.particles.forEach(p => {
      const pulse = Math.sin(p.pulse) * 0.3 + 0.7;
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.alpha * pulse;
      this.ctx.fillRect(p.x, p.y, p.size, p.size);
      this.ctx.globalAlpha = 1;
    });
  }
  
  drawPlayer() {
    const { x, y, width, height, color, glow } = this.player;
    
    this.ctx.shadowBlur = glow;
    this.ctx.shadowColor = color;
    
    // Draw pixelated player
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
    
    // Inner detail
    this.ctx.fillStyle = '#fff';
    this.ctx.fillRect(x + 8, y + 8, width - 16, height - 16);
    
    this.ctx.shadowBlur = 0;
    
    // Pixel eyes
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(x + 10, y + 10, 4, 4);
    this.ctx.fillRect(x + 18, y + 10, 4, 4);
  }
  
  drawSectionIndicator() {
    const sectionNames = {
      'basic': 'DESIGN',
      'intermediate': 'CODE',
      'advanced': 'POLISH'
    };
    
    this.ctx.fillStyle = this.getSectionColor();
    this.ctx.font = '12px Arial';
    this.ctx.textAlign = 'left';
    this.ctx.fillText(`MODE: ${sectionNames[this.currentSection]}`, 20, 30);
  }
  
  showQuiz(questionIndex) {
    const questions = this.getCurrentQuestions();
    if (!questions[questionIndex]) return;
    
    const question = questions[questionIndex];
    this.currentQuestion = questionIndex;
    
    const modal = document.getElementById('quizModal');
    const sectionBadge = document.getElementById('sectionBadge');
    const questionCounter = document.getElementById('questionCounter');
    const hintBox = document.getElementById('hintBox');
    const hintText = document.getElementById('hintText');
    const questionText = document.getElementById('questionText');
    const optionsGrid = document.getElementById('optionsGrid');
    
    const sectionNames = {
      'basic': 'Design',
      'intermediate': 'Code',
      'advanced': 'Polish'
    };
    
    sectionBadge.textContent = sectionNames[this.currentSection];
    sectionBadge.style.background = this.getSectionColor();
    questionCounter.textContent = `${questionIndex + 1}/${questions.length}`;
    
    if (questionIndex > 0) {
      const prevQuestion = questions[questionIndex - 1];
      if (this.nodes[questionIndex - 1].answered) {
        hintText.textContent = prevQuestion.nextHint;
        hintBox.style.borderColor = '#00ff00';
      }
    } else {
      hintText.textContent = question.hint;
      hintBox.style.borderColor = '#00ffff';
    }
    
    questionText.textContent = question.question;
    
    optionsGrid.innerHTML = '';
    question.options.forEach((option, i) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = option;
      btn.onclick = () => this.checkAnswer(i, question.correct);
      optionsGrid.appendChild(btn);
    });
    
    modal.style.display = 'block';
    this.gamePaused = true;
  }
  
  checkAnswer(selected, correct) {
    const buttons = document.querySelectorAll('.option-btn');
    
    if (selected === correct) {
      buttons[selected].classList.add('correct');
      this.score += 100;
      this.gameProgress += 10;
      this.nodes[this.currentQuestion].answered = true;
      this.playSound('success');
      
      setTimeout(() => {
        this.closeQuiz();
        this.checkSectionComplete();
      }, 1000);
    } else {
      buttons[selected].classList.add('wrong');
      buttons[correct].classList.add('correct');
      this.score = Math.max(0, this.score - 25);
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
      this.fragments[this.currentSection] = true;
      
      const modal = document.getElementById('levelModal');
      const text = document.getElementById('levelCompleteText');
      
      text.textContent = `Level Complete! ${this.getSectionName()} mastered.`;
      
      modal.style.display = 'block';
      this.playSound('achievement');
      this.updateUI();
    }
  }
  
  getSectionName() {
    const names = {
      'basic': 'Design',
      'intermediate': 'Code',
      'advanced': 'Polish'
    };
    return names[this.currentSection];
  }
  
  nextSection() {
    document.getElementById('levelModal').style.display = 'none';
    
    const sections = ['basic', 'intermediate', 'advanced'];
    const currentIndex = sections.indexOf(this.currentSection);
    
    if (currentIndex < 2) {
      this.currentSection = sections[currentIndex + 1];
      this.generateLevel();
    } else {
      if (this.currentLevel < 10) {
        this.currentLevel++;
        this.currentSection = 'basic';
        this.fragments = { basic: false, intermediate: false, advanced: false };
        this.gameProgress = 0;
        this.generateLevel();
      } else {
        alert('CONGRATULATIONS! You completed Game Dev Quest!');
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
    document.getElementById('hintBox').style.borderColor = '#00ffff';
    
    this.score = Math.max(0, this.score - 25);
    this.updateUI();
  }
  
  playSound(type) {
    if (typeof gameAudio !== 'undefined') {
      if (type === 'success') gameAudio.playSuccess();
      else if (type === 'error') gameAudio.playError();
      else if (type === 'achievement') gameAudio.playAchievement();
      else if (type === 'gameover') gameAudio.playGameOver();
    }
  }
  
  updateUI() {
    document.getElementById('levelDisplay').textContent = this.currentLevel;
    document.getElementById('scoreDisplay').textContent = this.score;
    
    const totalFragments = Object.values(this.fragments).filter(f => f).length;
    document.getElementById('keysDisplay').textContent = `${totalFragments}/3`;
    
    const questions = this.getCurrentQuestions();
    const answeredCount = this.nodes.filter(n => n.answered).length;
    const progress = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;
    
    document.getElementById(`${this.currentSection}Progress`).style.width = `${progress}%`;
    document.getElementById(`${this.currentSection}Status`).textContent = this.fragments[this.currentSection] ? '✅' : '⚪';
  }
}

function toggleMenu() {
  const menu = document.getElementById('gameMenu');
  menu.style.display = menu.style.display === 'none' ? 'flex' : 'none';
}

function resumeGame() {
  document.getElementById('gameMenu').style.display = 'none';
}

function restartLevel() {
  if (confirm('Restart level? Progress will reset.')) {
    game.currentQuestion = 0;
    game.nodes.forEach(n => n.answered = false);
    game.gameProgress = 0;
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

// Global wrapper functions for HTML onclick handlers
function skipQuestion() {
  if (game) game.skipQuestion();
}

function showExtraHint() {
  if (game) game.showExtraHint();
}

function nextSection() {
  if (game) game.nextSection();
}

let game;
document.addEventListener('DOMContentLoaded', () => {
  game = new GameDevQuestGame();
});
