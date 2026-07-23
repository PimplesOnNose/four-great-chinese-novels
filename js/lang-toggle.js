/* ========================================
   四大名著 · Language Toggle Component
   ======================================== */

class LanguageToggle {
  constructor() {
    this.currentLang = localStorage.getItem('novels-lang') || 'en';
    this.init();
  }
  
  init() {
    // Set initial language
    document.documentElement.setAttribute('data-lang', this.currentLang);
    
    // Bind events to existing toggle
    this.bindEvents();
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
    
    // Update toggle state
    document.querySelectorAll('.lang-option').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // Update page title
    this.updateTitle();
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
  // Check if this is a story page (no toggle, but respect saved language)
  const hasToggle = document.querySelector('.lang-toggle') || 
                    document.querySelector('[data-lang]');
  
  if (!hasToggle) {
    // Story page - just apply saved language
    const savedLang = localStorage.getItem('novels-lang');
    if (savedLang === 'zh') {
      // Story pages don't have bilingual content, but we can at least
      // set the document language for consistency
      document.documentElement.lang = 'zh';
    }
  } else {
    window.langToggle = new LanguageToggle();
  }
});
