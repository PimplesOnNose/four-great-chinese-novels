/* ========================================
   四大名著 · Four Great Novels
   Audio Player Component
   ======================================== */

class AudioPlayer {
  constructor(config) {
    this.src = config.src;
    this.title = config.title;
    this.subtitle = config.subtitle;
    this.isPlaying = false;
    this.audio = null;
    this.container = null;
    
    this.init();
  }
  
  init() {
    // Create audio element
    this.audio = new Audio(this.src);
    this.audio.loop = true;
    this.audio.volume = 0.5;
    
    // Create player UI
    this.container = document.createElement('div');
    this.container.className = 'audio-player';
    this.container.innerHTML = `
      <button class="audio-play-btn" aria-label="Play music">
        <svg class="icon-play" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z"/>
        </svg>
        <svg class="icon-pause" viewBox="0 0 24 24" fill="currentColor" style="display:none">
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
        </svg>
      </button>
      <div class="audio-waves">
        <div class="audio-wave"></div>
        <div class="audio-wave"></div>
        <div class="audio-wave"></div>
        <div class="audio-wave"></div>
        <div class="audio-wave"></div>
      </div>
      <div class="audio-info">
        <span class="audio-title">${this.title}</span>
        <span class="audio-subtitle">${this.subtitle}</span>
      </div>
      <div class="audio-volume">
        <button class="audio-volume-btn" aria-label="Toggle mute">
          <svg class="icon-volume" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
          </svg>
          <svg class="icon-mute" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <line x1="23" y1="9" x2="17" y2="15"/>
            <line x1="17" y1="9" x2="23" y2="15"/>
          </svg>
        </button>
      </div>
    `;
    
    // Bind events
    this.bindEvents();
    
    // Add to DOM
    document.body.appendChild(this.container);
  }
  
  bindEvents() {
    const playBtn = this.container.querySelector('.audio-play-btn');
    const volumeBtn = this.container.querySelector('.audio-volume-btn');
    const waves = this.container.querySelector('.audio-waves');
    const iconPlay = this.container.querySelector('.icon-play');
    const iconPause = this.container.querySelector('.icon-pause');
    const iconVolume = this.container.querySelector('.icon-volume');
    const iconMute = this.container.querySelector('.icon-mute');
    
    // Play/Pause
    playBtn.addEventListener('click', () => {
      if (this.isPlaying) {
        this.pause();
      } else {
        this.play();
      }
    });
    
    // Volume toggle
    volumeBtn.addEventListener('click', () => {
      if (this.audio.muted) {
        this.audio.muted = false;
        iconVolume.style.display = '';
        iconMute.style.display = 'none';
      } else {
        this.audio.muted = true;
        iconVolume.style.display = 'none';
        iconMute.style.display = '';
      }
    });
    
    // Audio events
    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      iconPlay.style.display = 'none';
      iconPause.style.display = '';
      waves.classList.add('playing');
    });
    
    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      iconPlay.style.display = '';
      iconPause.style.display = 'none';
      waves.classList.remove('playing');
    });
    
    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;
      iconPlay.style.display = '';
      iconPause.style.display = 'none';
      waves.classList.remove('playing');
    });
  }
  
  play() {
    this.audio.play().catch(err => {
      console.log('Audio play failed:', err);
    });
  }
  
  pause() {
    this.audio.pause();
  }
  
  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }
}

// Initialize audio player based on page
function initAudioPlayer() {
  const path = window.location.pathname;
  let config = null;
  
  if (path.includes('three-kingdoms')) {
    config = {
      src: 'audio/three-kingdoms.mp3',
      title: '三国演义',
      subtitle: 'Water Element · 水'
    };
  } else if (path.includes('water-margin')) {
    config = {
      src: 'audio/water-margin.mp3',
      title: '水浒传',
      subtitle: 'Earth Element · 土'
    };
  } else if (path.includes('journey-west')) {
    config = {
      src: 'audio/journey-west.mp3',
      title: '西游记',
      subtitle: 'Fire Element · 火'
    };
  } else if (path.includes('red-chamber')) {
    config = {
      src: 'audio/red-chamber.mp3',
      title: '红楼梦',
      subtitle: 'Wood Element · 木'
    };
  } else if (path.includes('index') || path.endsWith('/') || path.endsWith('/four-great-chinese-novels/')) {
    config = {
      src: 'audio/landing.mp3',
      title: '四大名著',
      subtitle: 'The Four Great Novels'
    };
  }
  
  if (config) {
    // Handle relative paths for GitHub Pages
    const isGitHubPages = window.location.hostname.includes('github.io');
    if (isGitHubPages) {
      config.src = window.location.pathname.split('/')[1] 
        ? '/' + window.location.pathname.split('/')[1] + '/' + config.src
        : '/' + config.src;
    }
    
    new AudioPlayer(config);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initAudioPlayer);
