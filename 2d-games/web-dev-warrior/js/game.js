/**
 * Web Dev Warrior - Game Engine
 * Matrix-style theme with code elements
 */

class WebDevWarriorGame {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    
    this.currentLevel = 1;
    this.currentSection = 'basic';
    this.currentQuestion = 0;
    this.score = 0;
    this.buildProgress = 0;
    this.fragments = { basic: false, intermediate: false, advanced: false };
    
    this.player = {
      x: 100,
      y: 300,
      width: 40,
      height: 40,
      speed: 5,
      color: '#238636',
      glow: 20
    };
    
    this.nodes = [];
    this.obstacles = [];
    this.particles = [];
    this.matrixChars = [];
    
    this.keysPressed = {};
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.generateLevel();
    this.createMatrixParticles();
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
      
      this.player.x = Math.max(20, Math.min(this.canvas.width - 20 - this.player.width, this.player.x));
      this.player.y = Math.max(20, Math.min(this.canvas.height - 20 - this.player.height, this.player.y));
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
    
    this.generateObstacles();
  }
  
  generateObstacles() {
    const section = this.currentSection;
    
    if (section === 'basic') {
      // Syntax errors (bugs)
      for (let i = 0; i < 3; i++) {
        this.obstacles.push({
          x: 200 + i * 200,
          y: 150 + (i % 2) * 300,
          width: 60,
          height: 60,
          type: 'static',
          color: '#f85149',
          symbol: '🐛'
        });
      }
    } else if (section === 'intermediate') {
      // Moving bugs
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
          range: 100,
          symbol: '⚠️'
        });
      }
    } else {
      // Advanced - circular rotation
      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        this.obstacles.push({
          x: this.canvas.width / 2 + Math.cos(angle) * 150,
          y: this.canvas.height / 2 + Math.sin(angle) * 150,
          width: 40,
          height: 40,
          type: 'rotating',
          color: '#8b949e',
          angle: angle,
          radius: 150,
          speed: 0.02,
          symbol: '🔒'
        });
      }
    }
  }
  
  getSectionColor() {
    switch(this.currentSection) {
      case 'basic': return '#e34c26'; // HTML/CSS - Orange
      case 'intermediate': return '#f7df1e'; // JS - Yellow
      case 'advanced': return '#00758f'; // Database - Blue
      default: return '#238636';
    }
  }
  
  getCurrentQuestions() {
    const levelData = GAME_QUESTIONS[this.currentLevel];
    if (!levelData) return [];
    return levelData.sections[this.currentSection] || [];
  }
  
  createMatrixParticles() {
    for (let i = 0; i < 40; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: 0,
        vy: Math.random() * 2 + 0.5,
        char: String.fromCharCode(0x30A0 + Math.random() * 96),
        size: 10 + Math.random() * 6,
        alpha: Math.random() * 0.5,
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
      node.pulse += 0.05;
      
      const dx = this.player.x + this.player.width/2 - node.x;
      const dy = this.player.y + this.player.height/2 - node.y;
      const distance = Math.sqrt(dx*dx + dy*dy);
      
      if (distance < node.radius + this.player.width/2 && !node.answered) {
        this.showQuiz(node.questionIndex);
      }
    });
    
    this.obstacles.forEach(obs => {
      if (obs.type === 'moving') {
        obs.x += obs.speedX;
        obs.y += obs.speedY;
        
        if (Math.abs(obs.x - 150) > obs.range) obs.speedX *= -1;
        if (Math.abs(obs.y - 100) > obs.range) obs.speedY *= -1;
      } else if (obs.type === 'rotating') {
        obs.angle += obs.speed;
        obs.x = this.canvas.width/2 + Math.cos(obs.angle) * obs.radius;
        obs.y = this.canvas.height/2 + Math.sin(obs.angle) * obs.radius;
      }
      
      if (this.checkCollision(this.player, obs)) {
        this.player.x -= (this.player.x - obs.x) * 0.1;
        this.player.y -= (this.player.y - obs.y) * 0.1;
      }
    });
    
    this.particles.forEach(p => {
      p.y += p.vy;
      p.pulse += 0.02;
      
      if (p.y > this.canvas.height) {
        p.y = -20;
        p.x = Math.random() * this.canvas.width;
        p.char = String.fromCharCode(0x30A0 + Math.random() * 96);
      }
    });
  }
  
  checkCollision(player, obstacle) {
    return player.x < obstacle.x + obstacle.width &&
           player.x + player.width > obstacle.x &&
           player.y < obstacle.y + obstacle.height &&
           player.y + player.height > obstacle.y;
  }
  
  render() {
    this.ctx.fillStyle = '#0d1117';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw matrix rain effect
    this.particles.forEach(p => {
      const pulse = Math.sin(p.pulse) * 0.3 + 0.7;
      this.ctx.fillStyle = `rgba(35, 134, 54, ${p.alpha * pulse})`;
      this.ctx.font = `${p.size}px monospace`;
      this.ctx.fillText(p.char, p.x, p.y);
    });
    
    // Draw grid
    this.drawCodeGrid();
    
    // Draw obstacles (bugs/errors)
    this.obstacles.forEach(obs => {
      this.ctx.fillStyle = obs.color;
      this.ctx.shadowBlur = 15;
      this.ctx.shadowColor = obs.color;
      this.ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
      this.ctx.shadowBlur = 0;
      
      this.ctx.font = '20px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(obs.symbol, obs.x + obs.width/2, obs.y + obs.height/2 + 7);
    });
    
    // Draw nodes (code files)
    this.nodes.forEach(node => {
      const pulse = Math.sin(node.pulse) * 5;
      this.ctx.shadowBlur = 20 + pulse;
      this.ctx.shadowColor = node.color;
      
      this.ctx.fillStyle = node.answered ? '#238636' : node.color;
      this.ctx.beginPath();
      this.ctx.roundRect(node.x - 30, node.y - 20, 60, 40, 8);
      this.ctx.fill();
      
      this.ctx.shadowBlur = 0;
      
      this.ctx.fillStyle = '#fff';
      this.ctx.font = 'bold 14px Fira Code';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(node.answered ? '✓' : '.js', node.x, node.y);
    });
    
    this.drawPlayer();
    this.drawSectionIndicator();
  }
  
  drawCodeGrid() {
    this.ctx.strokeStyle = 'rgba(48, 54, 61, 0.3)';
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
    
    this.ctx.shadowBlur = glow;
    this.ctx.shadowColor = color;
    
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x + width/2, y + height/2, width/2, 0, Math.PI * 2);
    this.ctx.fill();
    
    this.ctx.shadowBlur = 0;
    
    this.ctx.fillStyle = '#fff';
    this.ctx.beginPath();
    this.ctx.arc(x + width/2, y + height/2, width/4, 0, Math.PI * 2);
    this.ctx.fill();
    
    // Draw code braces
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '16px Fira Code';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('{ }', x + width/2, y + height/2 + 5);
  }
  
  drawSectionIndicator() {
    const sectionNames = {
      'basic': 'FRONTEND',
      'intermediate': 'BACKEND',
      'advanced': 'DATABASE'
    };
    
    this.ctx.fillStyle = this.getSectionColor();
    this.ctx.font = '14px Fira Code';
    this.ctx.textAlign = 'left';
    this.ctx.fillText(`STACK: ${sectionNames[this.currentSection]}`, 20, 30);
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
      'basic': 'Frontend',
      'intermediate': 'Backend',
      'advanced': 'Database'
    };
    
    sectionBadge.textContent = sectionNames[this.currentSection];
    questionCounter.textContent = `${questionIndex + 1}/${questions.length}`;
    
    if (questionIndex > 0) {
      const prevQuestion = questions[questionIndex - 1];
      if (this.nodes[questionIndex - 1].answered) {
        hintText.textContent = prevQuestion.nextHint;
        hintBox.style.borderColor = '#238636';
      }
    } else {
      hintText.textContent = question.hint;
      hintBox.style.borderColor = '#58a6ff';
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
      this.buildProgress += 10;
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
      const buildValue = document.getElementById('buildValue');
      const deployValue = document.getElementById('deployValue');
      
      text.textContent = `Build successful! ${this.getSectionName()} deployed.`;
      buildValue.textContent = `${Math.min(100, this.buildProgress)}%`;
      deployValue.textContent = 'Ready';
      
      modal.style.display = 'block';
      this.playSound('achievement');
      this.updateUI();
    }
  }
  
  getSectionName() {
    const names = {
      'basic': 'Frontend',
      'intermediate': 'Backend',
      'advanced': 'Database'
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
        this.buildProgress = 0;
        this.generateLevel();
      } else {
        alert('Full Stack Complete! You are a Web Dev Warrior!');
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
    document.getElementById('hintBox').style.borderColor = '#58a6ff';
    
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
  if (confirm('Restart build? Progress will be reset.')) {
    game.currentQuestion = 0;
    game.nodes.forEach(n => n.answered = false);
    game.buildProgress = 0;
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
  game = new WebDevWarriorGame();
});
