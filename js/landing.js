/* ========================================
   四大名著 · Four Great Novels
   Landing Page JavaScript
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
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    observer.observe(el);
  });

  // Timeline animation
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.3 });

  timelineItems.forEach(item => {
    timelineObserver.observe(item);
  });

  // Navigation scroll effect
  const nav = document.querySelector('.main-nav');
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
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');

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

  // Card hover effects
  document.querySelectorAll('.novel-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const element = card.querySelector('.card-element');
      if (element) {
        element.style.transform = 'scale(1.2)';
        element.style.opacity = '0.8';
      }
    });

    card.addEventListener('mouseleave', () => {
      const element = card.querySelector('.card-element');
      if (element) {
        element.style.transform = 'scale(1)';
        element.style.opacity = '0.6';
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
