/* ========================================
   四大名著 · Language Toggle Component
   ======================================== */

class LanguageToggle {
  constructor() {
    this.currentLang = localStorage.getItem('novels-lang') || 'en';
    this.init();
  }
  
  init() {
    // Set data-lang attribute
    document.documentElement.setAttribute('data-lang', this.currentLang);
    
    // Set initial button state
    this.updateButtons();
    
    // Bind click events
    this.bindEvents();
    
    // Update page title
    this.updateTitle();
  }
  
  bindEvents() {
    const toggle = document.querySelector('.lang-toggle');
    if (!toggle) return;
    
    toggle.querySelectorAll('.lang-option').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        this.setLanguage(lang);
      });
    });
  }
  
  setLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('novels-lang', lang);
    document.documentElement.setAttribute('data-lang', lang);
    this.updateButtons();
    this.updateTitle();
  }
  
  updateButtons() {
    document.querySelectorAll('.lang-option').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === this.currentLang);
    });
  }
  
  updateTitle() {
    const path = window.location.pathname;
    const titles = {
      'en': {
        'index': 'Four Great Chinese Novels',
        'three-kingdoms': 'Romance of the Three Kingdoms',
        'water-margin': 'Water Margin',
        'journey-west': 'Journey to the West',
        'red-chamber': 'Dream of the Red Chamber'
      },
      'zh': {
        'index': '四大名著',
        'three-kingdoms': '三国演义',
        'water-margin': '水浒传',
        'journey-west': '西游记',
        'red-chamber': '红楼梦'
      }
    };
    
    let page = 'index';
    if (path.includes('three-kingdoms')) page = 'three-kingdoms';
    else if (path.includes('water-margin')) page = 'water-margin';
    else if (path.includes('journey-west')) page = 'journey-west';
    else if (path.includes('red-chamber')) page = 'red-chamber';
    
    document.title = titles[this.currentLang][page] || titles[this.currentLang]['index'];
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.lang-toggle');
  
  if (toggle) {
    // Landing page - create toggle instance
    window.langToggle = new LanguageToggle();
  } else {
    // Story page - just apply saved language for title
    const savedLang = localStorage.getItem('novels-lang');
    if (savedLang === 'zh') {
      const titles = {
        'three-kingdoms': '三国演义',
        'water-margin': '水浒传',
        'journey-west': '西游记',
        'red-chamber': '红楼梦'
      };
      const path = window.location.pathname;
      for (const [key, title] of Object.entries(titles)) {
        if (path.includes(key)) {
          document.title = title;
          break;
        }
      }
    }
  }
});
