/**
 * Audio Manager for Game Dev Quest
 * Uses sounds from the sounds/ folder
 */

class GameAudio {
  constructor() {
    this.sounds = {};
    this.basePath = '../../sounds/';
    this.initialized = false;
    this.init();
  }
  
  init() {
    const soundFiles = {
      'success': 'correct.wav',
      'error': 'losetrumpet.wav',
      'achievement': 'Win sound.wav',
      'gameover': 'game_over.wav',
      'chill': 'chill.mp3'
    };
    
    Object.entries(soundFiles).forEach(([name, file]) => {
      this.sounds[name] = new Audio(this.basePath + file);
      this.sounds[name].preload = 'auto';
    });
    
    this.initialized = true;
    console.log('GameAudio initialized with sounds:', Object.keys(this.sounds));
  }
  
  play(soundName, volume = 0.5) {
    if (!this.initialized || !this.sounds[soundName]) {
      console.warn('Sound not found:', soundName);
      return;
    }
    
    const sound = this.sounds[soundName];
    sound.volume = volume;
    sound.currentTime = 0;
    
    const playPromise = sound.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log('Audio play failed (user interaction needed first):', error);
      });
    }
  }
  
  playSuccess() {
    this.play('success', 0.6);
  }
  
  playError() {
    this.play('error', 0.5);
  }
  
  playAchievement() {
    this.play('achievement', 0.7);
  }
  
  playGameOver() {
    this.play('gameover', 0.6);
  }
}

const gameAudio = new GameAudio();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GameAudio, gameAudio };
}
