/**
 * Data Quest - Player Module
 * Handles player movement, abilities, and progression
 */

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
    this.speed = 5;
    this.baseSpeed = 5;
    this.color = '#00d4ff';
    this.glow = 20;
    
    // Abilities
    this.abilities = {
      speedBoost: false,
      shield: false,
      hintVision: false
    };
    
    // Progress
    this.experience = 0;
    this.level = 1;
    this.title = "Data Novice";
    
    // Trail effect
    this.trail = [];
    this.maxTrailLength = 10;
  }
  
  move(dx, dy) {
    // Store position for trail
    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > this.maxTrailLength) {
      this.trail.shift();
    }
    
    // Apply speed boost if active
    const speed = this.abilities.speedBoost ? this.speed * 1.5 : this.speed;
    
    this.x += dx * speed;
    this.y += dy * speed;
    
    // Keep in bounds
    this.x = Math.max(20, Math.min(780 - this.width, this.x));
    this.y = Math.max(20, Math.min(580 - this.height, this.y));
  }
  
  draw(ctx) {
    // Draw trail
    this.trail.forEach((pos, i) => {
      const alpha = (i / this.trail.length) * 0.3;
      ctx.fillStyle = `rgba(0, 212, 255, ${alpha})`;
      ctx.beginPath();
      ctx.arc(pos.x + this.width/2, pos.y + this.height/2, this.width/3, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Draw shield if active
    if (this.abilities.shield) {
      ctx.strokeStyle = '#7c3aed';
      ctx.lineWidth = 3;
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#7c3aed';
      ctx.beginPath();
      ctx.arc(this.x + this.width/2, this.y + this.height/2, this.width/2 + 10, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
    
    // Draw player body
    ctx.fillStyle = this.color;
    ctx.shadowBlur = this.glow;
    ctx.shadowColor = this.color;
    
    ctx.beginPath();
    ctx.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.shadowBlur = 0;
    
    // Inner core
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(this.x + this.width/2, this.y + this.height/2, this.width/4, 0, Math.PI * 2);
    ctx.fill();
    
    // Direction indicator
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x + this.width/2, this.y + this.height/2 - 8, 4, 0, Math.PI * 2);
    ctx.fill();
  }
  
  gainExperience(points) {
    this.experience += points;
    
    // Level up check
    const requiredXP = this.level * 1000;
    if (this.experience >= requiredXP) {
      this.levelUp();
    }
  }
  
  levelUp() {
    this.level++;
    this.experience = 0;
    
    // Update title based on level
    const titles = [
      "Data Novice",
      "Data Explorer",
      "Data Analyst",
      "ML Apprentice",
      "ML Engineer",
      "AI Specialist",
      "AI Researcher",
      "Deep Learning Expert",
      "Neural Architect",
      "Data Master"
    ];
    
    this.title = titles[Math.min(this.level - 1, titles.length - 1)];
    
    // Visual effect
    this.color = this.getLevelColor();
    
    return this.title;
  }
  
  getLevelColor() {
    const colors = [
      '#00d4ff', // Level 1: Cyan
      '#1D9E75', // Level 2: Green
      '#f59e0b', // Level 3: Orange
      '#8b5cf6', // Level 4: Purple
      '#ef4444', // Level 5: Red
      '#ec4899', // Level 6: Pink
      '#eab308', // Level 7: Yellow
      '#3b82f6', // Level 8: Blue
      '#6366f1', // Level 9: Indigo
      '#ffd700'  // Level 10: Gold
    ];
    return colors[Math.min(this.level - 1, colors.length - 1)];
  }
  
  activateAbility(ability) {
    if (this.abilities.hasOwnProperty(ability)) {
      this.abilities[ability] = true;
      
      // Deactivate after duration
      setTimeout(() => {
        this.abilities[ability] = false;
      }, 10000); // 10 seconds
    }
  }
  
  checkCollision(object) {
    const shieldOffset = this.abilities.shield ? 10 : 0;
    
    return (
      this.x < object.x + object.width + shieldOffset &&
      this.x + this.width + shieldOffset > object.x &&
      this.y < object.y + object.height + shieldOffset &&
      this.y + this.height + shieldOffset > object.y
    );
  }
  
  reset(x, y) {
    this.x = x || 100;
    this.y = y || 300;
    this.trail = [];
    this.abilities = {
      speedBoost: false,
      shield: false,
      hintVision: false
    };
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Player };
}
