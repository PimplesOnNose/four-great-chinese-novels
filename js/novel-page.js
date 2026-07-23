/* ========================================
   四大名著 · Four Great Novels
   Novel Page JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Scroll Reveal Animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  // Observe elements for scroll reveal
  document.querySelectorAll('.novel-section, .novel-info-card, .novel-content-block, .novel-character-card, .novel-quote-block').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });

  // Navigation scroll effect
  const nav = document.querySelector('.novel-back');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      nav.style.background = 'rgba(8, 10, 16, 0.95)';
      nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
      nav.style.background = 'rgba(8, 10, 16, 0.8)';
      nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
  });

  // Parallax effect for hero
  const hero = document.querySelector('.novel-hero');
  const heroContent = document.querySelector('.novel-hero-content');

  if (hero && heroContent) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const heroHeight = hero.offsetHeight;
      
      if (scrolled < heroHeight) {
        const opacity = 1 - (scrolled / heroHeight) * 0.5;
        const translateY = scrolled * 0.3;
        
        heroContent.style.opacity = opacity;
        heroContent.style.transform = `translateY(${translateY}px)`;
      }
    });
  }

  // Card hover effects
  document.querySelectorAll('.novel-character-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('.novel-character-icon');
      if (icon) {
        icon.style.transform = 'scale(1.1) rotate(5deg)';
      }
    });

    card.addEventListener('mouseleave', () => {
      const icon = card.querySelector('.novel-character-icon');
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
      }
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add loading animation
  document.body.classList.add('loaded');
});

// Add loaded class to body
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});
