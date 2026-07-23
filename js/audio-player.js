/* ========================================
   四大名著 · Four Great Novels
   Audio Player with Tone.js MIDI Synth
   ======================================== */

class AudioPlayer {
  constructor(config) {
    this.src = config.src;
    this.title = config.title;
    this.subtitle = config.subtitle;
    this.isPlaying = false;
    this.container = null;
    this.synth = null;
    this.midiPart = null;
    this.initialized = false;
    
    this.createUI();
  }
  
  createUI() {
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
    
    this.bindEvents();
    document.body.appendChild(this.container);
  }
  
  bindEvents() {
    const playBtn = this.container.querySelector('.audio-play-btn');
    const volumeBtn = this.container.querySelector('.audio-volume-btn');
    const iconPlay = this.container.querySelector('.icon-play');
    const iconPause = this.container.querySelector('.icon-pause');
    const iconVolume = this.container.querySelector('.icon-volume');
    const iconMute = this.container.querySelector('.icon-mute');
    const waves = this.container.querySelector('.audio-waves');
    
    playBtn.addEventListener('click', async () => {
      if (!this.initialized) {
        await this.initTone();
      }
      
      if (this.isPlaying) {
        this.pause();
      } else {
        this.play();
      }
    });
    
    volumeBtn.addEventListener('click', () => {
      if (this.synth) {
        if (this.synth.volume.value === -Infinity) {
          this.synth.volume.value = -12;
          iconVolume.style.display = '';
          iconMute.style.display = 'none';
        } else {
          this.synth.volume.value = -Infinity;
          iconVolume.style.display = 'none';
          iconMute.style.display = '';
        }
      }
    });
  }
  
  async initTone() {
    // Wait for Tone.js to be available
    if (typeof Tone === 'undefined') {
      console.error('Tone.js not loaded');
      return;
    }
    
    await Tone.start();
    
    // Create synth with Chinese instrument-like sound
    this.synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: 'sine'
      },
      envelope: {
        attack: 0.02,
        decay: 0.3,
        sustain: 0.3,
        release: 0.8
      },
      volume: -12
    }).toDestination();
    
    // Fetch and parse MIDI
    await this.loadMIDI();
    this.initialized = true;
  }
  
  async loadMIDI() {
    try {
      const response = await fetch(this.src);
      const arrayBuffer = await response.arrayBuffer();
      const midi = new Tone.Midi(arrayBuffer);
      
      // Get all tracks
      const notes = [];
      midi.tracks.forEach(track => {
        track.notes.forEach(note => {
          notes.push({
            time: note.time,
            note: note.name,
            duration: note.duration,
            velocity: note.velocity
          });
        });
      });
      
      // Sort by time
      notes.sort((a, b) => a.time - b.time);
      
      // Create looping sequence
      const duration = midi.duration;
      
      this.midiPart = new Tone.Part((time, note) => {
        this.synth.triggerAttackRelease(
          note.note,
          note.duration,
          time,
          note.velocity
        );
      }, notes);
      
      this.midiPart.loop = true;
      this.midiPart.loopEnd = duration;
      
    } catch (err) {
      console.error('Failed to load MIDI:', err);
      // Fallback: generate notes programmatically
      this.generateFallbackNotes();
    }
  }
  
  generateFallbackNotes() {
    // Generate pentatonic notes based on page
    const path = window.location.pathname;
    let scale = ['C4', 'D4', 'E4', 'G4', 'A4', 'C5', 'D5', 'E5', 'G5', 'A5'];
    
    if (path.includes('three-kingdoms')) {
      scale = ['G3', 'A3', 'B3', 'D4', 'E4', 'G4', 'A4', 'B4', 'D5', 'E5'];
    } else if (path.includes('water-margin')) {
      scale = ['D4', 'E4', 'G4', 'A4', 'B4', 'D5', 'E5', 'G5', 'A5', 'B5'];
    } else if (path.includes('journey-west')) {
      scale = ['C4', 'D4', 'E4', 'G4', 'A4', 'C5', 'D5', 'E5', 'G5', 'A5'];
    } else if (path.includes('red-chamber')) {
      scale = ['A3', 'C4', 'D4', 'E4', 'G4', 'A4', 'C5', 'D5', 'E5', 'G5'];
    }
    
    const notes = [];
    const duration = 16;
    
    // Create a simple looping melody
    for (let i = 0; i < 32; i++) {
      const time = i * 0.5;
      const noteIndex = Math.floor(Math.random() * scale.length);
      const note = scale[noteIndex];
      
      notes.push({
        time: time,
        note: note,
        duration: '8n',
        velocity: 0.5 + Math.random() * 0.3
      });
    }
    
    this.midiPart = new Tone.Part((time, note) => {
      this.synth.triggerAttackRelease(
        note.note,
        note.duration,
        time,
        note.velocity
      );
    }, notes);
    
    this.midiPart.loop = true;
    this.midiPart.loopEnd = duration;
  }
  
  play() {
    if (this.midiPart) {
      this.midiPart.start(0);
      Tone.Transport.start();
      this.isPlaying = true;
      this.updateUI(true);
    }
  }
  
  pause() {
    Tone.Transport.stop();
    if (this.midiPart) {
      this.midiPart.stop();
    }
    this.isPlaying = false;
    this.updateUI(false);
  }
  
  updateUI(playing) {
    const iconPlay = this.container.querySelector('.icon-play');
    const iconPause = this.container.querySelector('.icon-pause');
    const waves = this.container.querySelector('.audio-waves');
    
    if (playing) {
      iconPlay.style.display = 'none';
      iconPause.style.display = '';
      waves.classList.add('playing');
    } else {
      iconPlay.style.display = '';
      iconPause.style.display = 'none';
      waves.classList.remove('playing');
    }
  }
}

// Initialize audio player based on page
function initAudioPlayer() {
  const path = window.location.pathname;
  let config = null;
  
  // Determine base path for GitHub Pages
  const isGitHubPages = window.location.hostname.includes('github.io');
  const basePath = isGitHubPages ? '/four-great-chinese-novels' : '';
  
  if (path.includes('three-kingdoms')) {
    config = {
      src: basePath + '/audio/three-kingdoms.mp3',
      title: '三国演义',
      subtitle: 'Water Element · 水'
    };
  } else if (path.includes('water-margin')) {
    config = {
      src: basePath + '/audio/water-margin.mp3',
      title: '水浒传',
      subtitle: 'Earth Element · 土'
    };
  } else if (path.includes('journey-west')) {
    config = {
      src: basePath + '/audio/journey-west.mp3',
      title: '西游记',
      subtitle: 'Fire Element · 火'
    };
  } else if (path.includes('red-chamber')) {
    config = {
      src: basePath + '/audio/red-chamber.mp3',
      title: '红楼梦',
      subtitle: 'Wood Element · 木'
    };
  } else {
    // Landing page
    config = {
      src: basePath + '/audio/landing.mp3',
      title: '四大名著',
      subtitle: 'The Four Great Novels'
    };
  }
  
  if (config) {
    new AudioPlayer(config);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initAudioPlayer);
