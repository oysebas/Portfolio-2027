// ==========================================================================
// Portfolio 2027, Interactive Script
// Multi-Page Liquid Glass Navbar, Smooth Scroll, and Active State Observer
// ==========================================================================

// Optional Custom Elements: <site-header> and <site-footer>
// Allows any page to include the standardized header/nav and footer
// without code duplication, while also supporting static HTML.
if (typeof customElements !== 'undefined') {
  if (!customElements.get('site-header')) {
    customElements.define('site-header', class extends HTMLElement {
      connectedCallback() {
        if (!this.innerHTML.trim()) {
          this.innerHTML = `
<header class="site-header" role="banner">
  <div class="nav-container">
    <a href="index.html" class="nav-brand" aria-label="OYS Creative Home">
      <img src="src/assets/logos/oys-logo-mark.svg" alt="OYS Creative Mark" class="brand-logo-img">
    </a>
    <nav class="nav-glass-capsule" role="navigation" aria-label="Main Navigation">
      <ul class="nav-links-list">
        <li><a href="projects.html" class="nav-link">Projects</a></li>
        <li><a href="about.html" class="nav-link">About Me</a></li>
        <li><a href="contact.html" class="nav-link">Contact</a></li>
      </ul>
    </nav>
    <div class="nav-actions">
      <a href="projects.html" class="btn-coral-gradient nav-cta-btn">
        <span>VIEW PORTFOLIO</span>
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 8h10M9 4l4 4-4 4"/>
        </svg>
      </a>
      <button id="mobileToggle" class="mobile-toggle-btn" aria-label="Open Navigation Menu" aria-expanded="false">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </div>
</header>
<div id="mobileDrawer" class="mobile-drawer" role="dialog" aria-modal="true">
  <a href="projects.html" class="nav-link">Projects</a>
  <a href="about.html" class="nav-link">About Me</a>
  <a href="contact.html" class="nav-link">Contact</a>
  <a href="projects.html" class="btn-coral-gradient">VIEW PORTFOLIO</a>
</div>
`;
        }
      }
    });
  }

  if (!customElements.get('site-footer')) {
    customElements.define('site-footer', class extends HTMLElement {
      connectedCallback() {
        if (!this.innerHTML.trim()) {
          this.innerHTML = `
<footer class="site-footer" role="contentinfo">
  <div class="footer-container">
    <h3 class="footer-title">Sebastian's Portfolio</h3>
    <div class="footer-social-links" aria-label="Social media links">
      <a href="https://www.instagram.com/oyssebas/" target="_blank" rel="noopener noreferrer" class="footer-social-circle" aria-label="Instagram">
        <img src="public/assets/icons/InstagramLogo-Icon.svg" alt="Instagram" class="footer-social-icon" width="38" height="38">
      </a>
      <a href="https://www.linkedin.com/in/sebastian-cueto-9898b11aa/" target="_blank" rel="noopener noreferrer" class="footer-social-circle" aria-label="LinkedIn">
        <img src="public/assets/icons/LinkedInLogo-Icon.svg" alt="LinkedIn" class="footer-social-icon" width="38" height="38">
      </a>
      <a href="https://www.threads.net/@oy_sebas" target="_blank" rel="noopener noreferrer" class="footer-social-circle" aria-label="Threads">
        <img src="public/assets/icons/ThreadsLogo-Icon.svg" alt="Threads" class="footer-social-icon" width="38" height="38">
      </a>
      <a href="https://www.tiktok.com/@oyssebas" target="_blank" rel="noopener noreferrer" class="footer-social-circle" aria-label="TikTok">
        <img src="public/assets/icons/TikTokLogo-Icon.svg" alt="TikTok" class="footer-social-icon" width="38" height="38">
      </a>
    </div>
    <p class="footer-copy">© 2026 by <a href="#" class="footer-author-link">Sebastian Cueto</a></p>
  </div>
</footer>
`;
        }
      }
    });
  }
}

// ==========================================================================
// Smooth Inertia Momentum Scroll Engine
// Replicates high-end editorial inertia scrolling with fluid deceleration
// ==========================================================================
class SmoothInertiaScroll {
  constructor(options = {}) {
    // Respect user preference for reduced motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Preserve native gesture compositor on small mobile phone screens
    const isMobilePhone = window.matchMedia && window.matchMedia('(max-width: 768px) and (pointer: coarse)').matches;
    if (isMobilePhone) {
      return;
    }

    this.options = Object.assign({
      ease: 0.082,             // Deceleration lerp factor (0.075 - 0.09 for silky glide)
      wheelMultiplier: 1.05,   // Multiplier for stepped mouse wheels
      trackpadMultiplier: 0.88,// Multiplier for high-frequency trackpad streams
      keyStep: 120,            // Pixels per arrow key press
      pageStepRatio: 0.82      // Fraction of viewport for PageUp/PageDown
    }, options);

    this.currentY = window.scrollY || window.pageYOffset || 0;
    this.targetY = this.currentY;
    this.lastTime = performance.now();
    this.lastProgrammaticTime = 0;
    this.isTicking = false;

    // Remove CSS smooth-scroll fighting so requestAnimationFrame coordinates immediately
    if (document.documentElement) {
      document.documentElement.style.scrollBehavior = 'auto';
    }

    this.init();
  }

  getMaxScroll() {
    return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  }

  isScrollableElement(el, deltaY) {
    while (el && el !== document.body && el !== document.documentElement) {
      const style = window.getComputedStyle(el);
      const overflowY = style.overflowY;
      if ((overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight) {
        const canScrollDown = deltaY > 0 && el.scrollTop + el.clientHeight < el.scrollHeight - 1;
        const canScrollUp = deltaY < 0 && el.scrollTop > 1;
        if (canScrollDown || canScrollUp) {
          return true;
        }
      }
      el = el.parentElement;
    }
    return false;
  }

  onWheel(e) {
    // Allow browser zoom (Ctrl+wheel / Cmd+wheel)
    if (e.ctrlKey || e.metaKey) return;

    // Allow native scrolling inside nested scroll containers (drawers, code blocks, etc.)
    if (this.isScrollableElement(e.target, e.deltaY)) {
      return;
    }

    let delta = e.deltaY;

    // Normalize deltaMode
    if (e.deltaMode === 1) {
      delta *= 24; // DOM_DELTA_LINE
    } else if (e.deltaMode === 2) {
      delta *= window.innerHeight; // DOM_DELTA_PAGE
    }

    // Distinguish between stepped physical mouse wheels and continuous trackpad events
    const isSteppedWheel = Math.abs(delta) >= 36 && Number.isInteger(delta);
    const multiplier = isSteppedWheel ? this.options.wheelMultiplier : this.options.trackpadMultiplier;

    // Apply delta to target scroll position
    this.targetY += delta * multiplier;

    // Constrain forward momentum distance so extreme flicks remain controllable
    const maxDiff = window.innerHeight * 1.35;
    if (this.targetY - this.currentY > maxDiff) {
      this.targetY = this.currentY + maxDiff;
    } else if (this.currentY - this.targetY > maxDiff) {
      this.targetY = this.currentY - maxDiff;
    }

    this.clampTarget();

    // Prevent raw native abrupt stepping
    e.preventDefault();

    this.startTicking();
  }

  onKeyDown(e) {
    const activeEl = document.activeElement;
    if (activeEl && (
      activeEl.tagName === 'INPUT' || 
      activeEl.tagName === 'TEXTAREA' || 
      activeEl.isContentEditable || 
      activeEl.tagName === 'SELECT'
    )) {
      return;
    }

    let step = 0;
    const maxScroll = this.getMaxScroll();

    switch (e.key) {
      case 'ArrowDown':
        step = this.options.keyStep;
        break;
      case 'ArrowUp':
        step = -this.options.keyStep;
        break;
      case 'PageDown':
        step = window.innerHeight * this.options.pageStepRatio;
        break;
      case 'PageUp':
        step = -window.innerHeight * this.options.pageStepRatio;
        break;
      case 'Space':
      case ' ':
        step = e.shiftKey ? -window.innerHeight * this.options.pageStepRatio : window.innerHeight * this.options.pageStepRatio;
        break;
      case 'Home':
        this.targetY = 0;
        e.preventDefault();
        this.startTicking();
        return;
      case 'End':
        this.targetY = maxScroll;
        e.preventDefault();
        this.startTicking();
        return;
      default:
        return;
    }

    if (step !== 0) {
      e.preventDefault();
      this.targetY += step;
      this.clampTarget();
      this.startTicking();
    }
  }

  clampTarget() {
    const max = this.getMaxScroll();
    this.targetY = Math.max(0, Math.min(this.targetY, max));
  }

  onNativeScroll() {
    const now = performance.now();
    // If a programmatic update was executed within 50ms, this event belongs to our RAF loop
    if (now - this.lastProgrammaticTime < 50) {
      return;
    }

    const currentScroll = window.scrollY || window.pageYOffset || 0;
    if (Math.abs(currentScroll - this.currentY) > 2) {
      this.currentY = currentScroll;
      this.targetY = currentScroll;
    }
  }

  scrollTo(target, options = {}) {
    let destY = 0;
    if (typeof target === 'number') {
      destY = target;
    } else if (target instanceof HTMLElement) {
      const offset = options.offset || 0;
      destY = target.getBoundingClientRect().top + window.scrollY - offset;
    }

    const max = this.getMaxScroll();
    this.targetY = Math.max(0, Math.min(destY, max));

    if (options.immediate) {
      this.currentY = this.targetY;
      this.lastProgrammaticTime = performance.now();
      window.scrollTo(0, this.currentY);
    } else {
      this.startTicking();
    }
  }

  startTicking() {
    if (!this.isTicking) {
      this.isTicking = true;
      this.lastTime = performance.now();
      requestAnimationFrame(this.tick.bind(this));
    }
  }

  tick(now) {
    const dt = Math.min((now - this.lastTime) / 1000, 0.1);
    this.lastTime = now;

    const diff = this.targetY - this.currentY;

    // Frame-rate independent exponential smoothing
    const factor = 1 - Math.pow(1 - this.options.ease, dt * 60);

    if (Math.abs(diff) > 0.25) {
      this.currentY += diff * factor;
      this.lastProgrammaticTime = performance.now();
      window.scrollTo(0, this.currentY);
      requestAnimationFrame(this.tick.bind(this));
    } else {
      // Come to a complete soft rest
      this.currentY = this.targetY;
      this.lastProgrammaticTime = performance.now();
      window.scrollTo(0, this.currentY);
      this.isTicking = false;
    }
  }

  init() {
    window.addEventListener('wheel', this.onWheel.bind(this), { passive: false });
    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('scroll', this.onNativeScroll.bind(this), { passive: true });
    window.addEventListener('resize', () => {
      this.clampTarget();
    }, { passive: true });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Smooth Inertia Momentum Scroll
  window.smoothScrollInstance = new SmoothInertiaScroll();
  window.smoothScroll = window.smoothScrollInstance;

  const header = document.querySelector('.site-header');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // 1. Scroll-Aware Navbar Compression
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 2. Mobile Menu Toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      
      // Update hamburger icon
      const icon = mobileToggle.querySelector('svg');
      if (isOpen) {
        icon.innerHTML = '<path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
      } else {
        icon.innerHTML = '<path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
      }
    });

    // Close drawer on link click
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.querySelector('svg').innerHTML = '<path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
      });
    });
  }

  // 3. Active Nav Link via Multi-Page URL Matching
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const isHomePage = currentPath === '' || currentPath === 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkFile = href.split('#')[0].split('?')[0].split('/').pop();
    if (!isHomePage && linkFile && linkFile === currentPath) {
      link.classList.add('active');
    } else if (isHomePage && (href === 'index.html' || href === './')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // 4. Smooth Inertia Scrolling for In-Page and Cross-Page Links
  document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href) return;

      const [path, hash] = href.split('#');
      if (!hash) return;

      const targetElement = document.getElementById(hash);
      const isTargetOnCurrentPage = (!path || path === '' || path === currentPath || (isHomePage && path === 'index.html'));

      if (isTargetOnCurrentPage && targetElement) {
        e.preventDefault();
        if (window.smoothScrollInstance) {
          window.smoothScrollInstance.scrollTo(targetElement, { offset: 90 });
        } else {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
        history.pushState(null, '', `#${hash}`);
      }
    });
  });

  // Smooth scroll to top when clicking brand logo if already on home
  document.querySelectorAll('.nav-brand').forEach(logo => {
    logo.addEventListener('click', (e) => {
      if (isHomePage) {
        e.preventDefault();
        if (window.smoothScrollInstance) {
          window.smoothScrollInstance.scrollTo(0);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        if (window.location.hash) {
          history.pushState(null, '', window.location.pathname);
        }
      }
    });
  });

  // 4. Monumental Headline Typewriter Animation
  const initTypewriter = () => {
    const title = document.querySelector('.hero-title');
    if (!title) return;

    // Respect reduced-motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const line1El = title.querySelector('.type-line-1');
    const line2El = title.querySelector('.type-line-2');
    if (!line1El || !line2El) return;

    const line1Text = "HI, I'M";
    const line2Text = "SEBASTIAN";

    // Clear initial fallback text
    line1El.textContent = '';
    line2El.textContent = '';

    // Create glowing coral cursor
    const cursor = document.createElement('span');
    cursor.className = 'type-cursor';
    cursor.setAttribute('aria-hidden', 'true');

    // Attach cursor to line 1 initially
    line1El.appendChild(cursor);

    const typeSpeed = 70; // ms per character
    const punctuationDelay = 180; // ms pause on comma / apostrophe
    const lineTransitionDelay = 350; // ms pause between line 1 and 2

    let i = 0;
    let j = 0;

    const typeLine1 = () => {
      if (i < line1Text.length) {
        const char = line1Text[i];
        const textNode = document.createTextNode(char);
        line1El.insertBefore(textNode, cursor);
        i++;

        let delay = typeSpeed + (Math.random() * 20 - 10);
        if (char === ',' || char === "'") {
          delay += punctuationDelay;
        }
        setTimeout(typeLine1, delay);
      } else {
        // Line 1 complete, move cursor to line 2
        setTimeout(() => {
          cursor.remove();
          line2El.appendChild(cursor);
          setTimeout(typeLine2, 120);
        }, lineTransitionDelay);
      }
    };

    const typeLine2 = () => {
      if (j < line2Text.length) {
        const char = line2Text[j];
        const textNode = document.createTextNode(char);
        line2El.insertBefore(textNode, cursor);
        j++;

        const delay = typeSpeed + (Math.random() * 20 - 10);
        setTimeout(typeLine2, delay);
      } else {
        // Typing complete!
        // Allow cursor to softly blink for 2.5 seconds, then gracefully fade out
        setTimeout(() => {
          cursor.classList.add('fade-out');
        }, 2500);
      }
    };

    // Initial brief delay after page load before starting typing
    setTimeout(typeLine1, 350);
  };

  initTypewriter();

  // 5. Concept B: Scroll-Spy Auto-Expanding Capabilities Accordion
  const initServicesScrollSpy = () => {
    const wrapper = document.querySelector('.services-scroll-wrapper');
    const cards = document.querySelectorAll('.service-card');
    const progressBar = document.getElementById('servicesProgressBar');
    const stepCounter = document.getElementById('servicesStepCounter');
    if (!wrapper || !cards.length) return;

    const totalCards = cards.length;
    let currentActiveIndex = 0;
    let isClickScrolling = false;
    let clickScrollTimeout = null;

    const isDesktopMode = () => {
      return (
        window.innerWidth > 768 &&
        window.innerHeight > 640 &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      );
    };

    const setActiveCard = (index) => {
      if (index < 0 || index >= totalCards) return;
      if (currentActiveIndex === index && cards[index].classList.contains('active')) return;

      currentActiveIndex = index;

      cards.forEach((card, i) => {
        const isActive = i === index;
        card.classList.toggle('active', isActive);
        const headerBtn = card.querySelector('.service-card-header');
        if (headerBtn) {
          headerBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        }
      });

      if (stepCounter) {
        stepCounter.textContent = `0${index + 1} / 0${totalCards}`;
      }
    };

    const handleScroll = () => {
      if (!isDesktopMode()) return;
      if (isClickScrolling) return;

      const rect = wrapper.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      if (scrollableDistance <= 0) return;

      // Scrolled distance within the pinned runway
      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);

      // Progress bar fill width (at least 15% when at the start so it is always visible)
      if (progressBar) {
        const barWidth = 15 + progress * 85;
        progressBar.style.width = `${barWidth}%`;
      }

      // Map progress to card index [0..totalCards - 1]
      let targetIndex = Math.floor(progress * totalCards);
      if (targetIndex >= totalCards) targetIndex = totalCards - 1;

      setActiveCard(targetIndex);
    };

    // Click navigation for service cards to designated project filters
    cards.forEach((card) => {
      card.addEventListener('click', (e) => {
        const link = card.querySelector('.service-card-header');
        const targetHref = (link && link.getAttribute('href')) || card.getAttribute('data-href');
        if (targetHref) {
          window.location.href = targetHref;
        }
      });
    });

    // Throttled scroll listener via requestAnimationFrame
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    // Handle resize
    window.addEventListener('resize', () => {
      handleScroll();
    }, { passive: true });

    // Initial sync
    setActiveCard(0);
    handleScroll();
  };

  initServicesScrollSpy();

  // 6. Scroll Reveal Observer & Interactive Spotlight
  const initScrollReveals = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-revealed'));
      return;
    }

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (!revealElements.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));

    // Interactive Card Spotlight Hover Glow
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      });
    });
  };

  initScrollReveals();

  // 7. Atmospheric Background Canvas (Concept 1: Botanical Motes / Spores)
  const initBotanicalMotesBackground = () => {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animId = null;
    let particles = [];
    let isPaused = false;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Mouse tracking for subtle interactive deflection
    const mouse = { x: -9999, y: -9999, active: false };
    let mouseTimeout = null;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.resetTransform();
      ctx.scale(dpr, dpr);
    };

    const createParticles = () => {
      particles = [];
      // Elegant density: ~24 on mobile, ~38-44 on desktop
      const count = Math.min(46, Math.max(22, Math.floor(width / 34)));

      for (let i = 0; i < count; i++) {
        // Color distribution: 75% Sage (#7DBA6F), 15% Verdant Light (#94D187), 10% Warm Ember Coral (#E76F51)
        const rand = Math.random();
        let rgb;
        if (rand < 0.75) {
          rgb = { r: 125, g: 186, b: 111 }; // Sage
        } else if (rand < 0.90) {
          rgb = { r: 148, g: 209, b: 135 }; // Verdant Light
        } else {
          rgb = { r: 231, g: 111, b: 81 };  // Coral Ember
        }

        const radius = 1.3 + Math.random() * 2.4; // 1.3px to 3.7px
        const baseAlpha = 0.10 + Math.random() * 0.18; // 0.10 to 0.28 (whisper quiet)

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          baseX: Math.random() * width,
          radius,
          color: rgb,
          baseAlpha,
          speedY: -(0.12 + Math.random() * 0.24), // Slow upward drift
          swayAmp: 14 + Math.random() * 22,       // Horizontal sway amplitude
          swayFreq: 0.006 + Math.random() * 0.01, // Frequency of sway
          phase: Math.random() * Math.PI * 2,
          vx: 0,
          vy: -(0.12 + Math.random() * 0.24)
        });
      }
    };

    let tick = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      tick++;

      particles.forEach(p => {
        if (!reducedMotion) {
          // Organic upward drift + sinusoidal horizontal sway
          p.phase += p.swayFreq;
          const swayOffset = Math.sin(p.phase) * p.swayAmp;

          // Interactive mouse deflection
          if (mouse.active) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.hypot(dx, dy);
            const maxDist = 110;

            if (dist < maxDist && dist > 0) {
              const force = (1 - dist / maxDist) * 0.55;
              p.vx += (dx / dist) * force;
              p.vy += (dy / dist) * force;
            }
          }

          // Dampen velocity back to calm drift
          p.vx *= 0.94;
          p.vy = p.vy * 0.94 + p.speedY * 0.06;

          p.x += p.vx + (Math.cos(p.phase) * 0.18);
          p.y += p.vy;

          // Screen wrapping
          if (p.y < -30) {
            p.y = height + 20;
            p.x = Math.random() * width;
            p.baseX = p.x;
          } else if (p.y > height + 30) {
            p.y = -20;
          }

          if (p.x < -40) p.x = width + 30;
          else if (p.x > width + 40) p.x = -30;
        }

        // Breathing alpha cycle
        const pulse = Math.sin(tick * 0.015 + p.phase) * 0.04;
        const currentAlpha = Math.max(0.06, Math.min(0.36, p.baseAlpha + pulse));

        // Tactile atmospheric mote
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!reducedMotion && !isPaused) {
        animId = requestAnimationFrame(draw);
      }
    };

    // Passive mouse tracker
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;

      if (mouseTimeout) clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        mouse.active = false;
      }, 1200);
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      mouse.active = false;
    });

    // Resize handling
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resizeCanvas();
        createParticles();
        if (reducedMotion) draw();
      }, 150);
    }, { passive: true });

    // Battery & CPU optimization: pause when tab hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        isPaused = true;
        if (animId) cancelAnimationFrame(animId);
      } else {
        isPaused = false;
        if (!reducedMotion) {
          animId = requestAnimationFrame(draw);
        }
      }
    });

    // Initialize
    resizeCanvas();
    createParticles();
    draw();
  };

  initBotanicalMotesBackground();

  // 8. Contact Form Handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const nextInput = document.getElementById('formSubmitNext');
    if (nextInput) {
      nextInput.value = window.location.origin + window.location.pathname + '?success=true';
    }

    // Check for ?success=true after FormSubmit redirect
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
      const statusEl = document.getElementById('contactStatus');
      if (statusEl) {
        statusEl.innerHTML = '<strong>Thank you!</strong> Your message has been sent successfully. I will get back to you shortly.';
        statusEl.className = 'contact-form-status success';
        statusEl.style.display = 'block';
      }
      history.replaceState(null, '', window.location.pathname);
    }

    contactForm.addEventListener('submit', (e) => {
      const statusEl = document.getElementById('contactStatus');
      const submitBtn = document.getElementById('contactSubmitBtn');
      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const messageInput = document.getElementById('contactMessage');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        e.preventDefault();
        if (statusEl) {
          statusEl.textContent = 'Please fill out all fields before submitting.';
          statusEl.className = 'contact-form-status error';
          statusEl.style.display = 'block';
        }
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        e.preventDefault();
        if (statusEl) {
          statusEl.textContent = 'Please enter a valid email address.';
          statusEl.className = 'contact-form-status error';
          statusEl.style.display = 'block';
        }
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span>';
      }

      // Native browser form submission proceeds to https://formsubmit.co/dc1ecc9b580c2d05d0783a7e15205d6c
    });
  }

  // 9. Dynamic Projects Category Filter System
  const filterBtns = document.querySelectorAll('.projects-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    const applyFilter = (category, updateHash = false) => {
      // 1. Update active tab states
      filterBtns.forEach(btn => {
        const btnFilter = btn.getAttribute('data-filter');
        const isActive = btnFilter === category;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      // 2. Filter project cards directly and cleanly
      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const matches = category === 'all' || cardCategory === category;
        card.classList.toggle('is-hidden', !matches);
      });

      // 3. Optional URL hash sync for deep-linking
      if (updateHash) {
        if (category === 'all') {
          history.replaceState(null, '', window.location.pathname);
        } else {
          history.replaceState(null, '', `#${category}`);
        }
      }
    };

    // Tab click listeners
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter') || 'all';
        applyFilter(filter, true);
      });
    });

    // Check for URL hash on load (e.g. projects.html#branding)
    const checkHashFilter = () => {
      let hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'ux-ui' || hash === 'uxui' || hash === 'ui-ux' || hash === 'ux-ui-design' || hash === 'ux') {
        hash = 'web-design';
      }
      const validCategories = ['all', 'branding', 'ad-design', 'web-design', 'email-design'];
      if (validCategories.includes(hash)) {
        applyFilter(hash, false);
      }
    };

    checkHashFilter();
    window.addEventListener('hashchange', checkHashFilter);
  }

  // ==========================================================================
  // 10. Editorial Exhibition Suite: Scroll Progress Filament, Floating Chapter HUD & Parallax
  // ==========================================================================
  const initCaseStudyScrollSuite = () => {
    const pageWrapper = document.querySelector('.case-study-page-wrapper');
    if (!pageWrapper) return;

    const filament = document.getElementById('scrollProgressFilament');
    const hud = document.getElementById('caseStudyNavHud');
    const hudPill = document.getElementById('navHudPill');
    const hudDrawer = document.getElementById('navHudDrawer');
    const chapterNumEl = document.getElementById('navHudChapterNum');
    const chapterNameEl = document.getElementById('navHudChapterName');
    const hudItems = document.querySelectorAll('.nav-hud-item');
    const heroImg = document.querySelector('.case-study-hero-img');
    const frames = document.querySelectorAll('.case-study-frame');

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Toggle drawer on pill click
    if (hudPill && hud) {
      hudPill.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = hud.classList.toggle('drawer-open');
        hudPill.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });

      // Close drawer on outside click
      document.addEventListener('click', (e) => {
        if (hud.classList.contains('drawer-open') && !hud.contains(e.target)) {
          hud.classList.remove('drawer-open');
          hudPill.setAttribute('aria-expanded', 'false');
        }
      });

      // Close drawer on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && hud.classList.contains('drawer-open')) {
          hud.classList.remove('drawer-open');
          hudPill.setAttribute('aria-expanded', 'false');
          hudPill.focus();
        }
      });
    }

    // Smooth scroll from drawer items
    hudItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const targetId = item.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            if (hud) hud.classList.remove('drawer-open');
            if (hudPill) hudPill.setAttribute('aria-expanded', 'false');

            const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - 110;
            if (window.smoothScrollInstance) {
              window.smoothScrollInstance.scrollTo(targetPos);
            } else {
              window.scrollTo({
                top: targetPos,
                behavior: 'smooth'
              });
            }
          }
        }
      });
    });

    // Collect trackable sections dynamically from drawer items
    let trackedSections = [];
    if (hudItems.length > 0) {
      hudItems.forEach((item, idx) => {
        const href = item.getAttribute('href');
        if (href && href.startsWith('#')) {
          const el = document.querySelector(href);
          if (el) {
            const num = item.querySelector('.item-num')?.textContent.trim() || (idx < 10 ? `0${idx}` : `${idx}`);
            const name = item.querySelector('.item-label')?.textContent.trim() || item.textContent.trim();
            trackedSections.push({ id: href.replace('#', ''), num, name, el });
          }
        }
      });
    }

    if (trackedSections.length === 0) {
      const fallbackSections = document.querySelectorAll('[id^="chapter-"], #overview');
      fallbackSections.forEach((el, idx) => {
        const titleEl = el.querySelector('.chapter-title, .lookbook-title, h1, h2');
        const name = titleEl ? titleEl.textContent.trim() : `Chapter ${idx + 1}`;
        const num = idx < 10 ? `0${idx}` : `${idx}`;
        trackedSections.push({ id: el.id, num, name, el });
      });
    }

    let isTicking = false;

    const onScroll = () => {
      if (!isTicking) {
        window.requestAnimationFrame(() => {
          updateScrollState();
          isTicking = false;
        });
        isTicking = true;
      }
    };

    const updateScrollState = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;

      // 1. Update Filament Bar (Fallback only if browser doesn't natively support scroll-driven timeline)
      if (filament && !window.CSS?.supports?.('animation-timeline', 'scroll()')) {
        filament.style.width = `${(progress * 100).toFixed(2)}%`;
      }

      // 2. HUD Visibility
      if (hud) {
        if (scrollY > 180) {
          hud.classList.add('is-visible');
        } else {
          hud.classList.remove('is-visible');
          hud.classList.remove('drawer-open');
        }
      }

      // 3. Active Chapter Detection
      const viewportCenter = window.innerHeight * 0.38;
      let activeSection = trackedSections[0];

      for (let i = 0; i < trackedSections.length; i++) {
        const rect = trackedSections[i].el.getBoundingClientRect();
        if (rect.top <= viewportCenter) {
          activeSection = trackedSections[i];
        }
      }

      if (activeSection) {
        if (chapterNumEl && chapterNumEl.textContent !== activeSection.num) {
          chapterNumEl.textContent = activeSection.num;
        }
        if (chapterNameEl && chapterNameEl.textContent !== activeSection.name) {
          chapterNameEl.textContent = activeSection.name;
        }

        // Update drawer active links
        hudItems.forEach(item => {
          if (item.getAttribute('href') === `#${activeSection.id}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }

      // 4. Parallax Image Depth (Hardware-accelerated translate3d, skip if reduced motion)
      if (!prefersReducedMotion) {
        // Hero image subtle zoom & drift
        if (heroImg && heroImg.parentElement) {
          const heroRect = heroImg.parentElement.getBoundingClientRect();
          if (heroRect.bottom > 0 && heroRect.top < window.innerHeight) {
            const heroRatio = Math.max(0, Math.min(1, -heroRect.top / (heroRect.height || 1)));
            const scale = (1.05 - (heroRatio * 0.05)).toFixed(3);
            const translateY = (heroRatio * 18).toFixed(1);
            heroImg.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
          }
        }

        // Showcase frames subtle multi-plane drift
        frames.forEach(frame => {
          const rect = frame.getBoundingClientRect();
          if (rect.bottom > 0 && rect.top < window.innerHeight) {
            const frameImg = frame.querySelector('.case-study-frame-img');
            if (frameImg) {
              const delta = (rect.top + rect.height / 2) - (window.innerHeight / 2);
              const driftY = (delta * -0.035).toFixed(1);
              frameImg.style.transform = `translate3d(0, ${driftY}px, 0)`;
            }
          }
        });

        // Phone Mockup parallax drift for Ad Case Studies
        const phoneMockup = document.querySelector('.ad-feed-mockup-wrapper');
        if (phoneMockup && phoneMockup.closest('.is-revealed') && !phoneMockup.dataset.isHovered) {
          const pRect = phoneMockup.parentElement.getBoundingClientRect();
          if (pRect.bottom > 0 && pRect.top < window.innerHeight) {
            const pDelta = (pRect.top + pRect.height / 2) - (window.innerHeight / 2);
            const pDriftY = (pDelta * -0.05).toFixed(1);
            phoneMockup.style.transform = `perspective(1200px) translateY(${pDriftY}px)`;
          }
        }
      }
    };

    // 5. Interactive 3D Phone Tilt on Mouse Move
    const phoneMockup = document.querySelector('.ad-feed-mockup-wrapper');
    if (phoneMockup && !prefersReducedMotion) {
      phoneMockup.addEventListener('mousemove', (e) => {
        phoneMockup.dataset.isHovered = 'true';
        const rect = phoneMockup.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        phoneMockup.style.transform = `perspective(1000px) rotateY(${(x * 12).toFixed(1)}deg) rotateX(${(-y * 10).toFixed(1)}deg) scale(1.02)`;
        phoneMockup.style.borderColor = 'rgba(231, 111, 81, 0.45)';
      });

      phoneMockup.addEventListener('mouseleave', () => {
        delete phoneMockup.dataset.isHovered;
        phoneMockup.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg) translateY(0) scale(1)';
        phoneMockup.style.borderColor = '';
      });
    }

    // 6. Interactive Card Mouse Glow Tracking
    const interactiveAdCards = document.querySelectorAll('.ad-strategy-card, .ad-breakdown-card, .ad-ab-card, .ad-feed-insight-card');
    interactiveAdCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--card-mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--card-mouse-y', `${e.clientY - rect.top}px`);
      });
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateScrollState();
  };

  initCaseStudyScrollSuite();

  // 7. Interactive Ad Anatomy Blueprint Hotspots
  const blueprintPins = document.querySelectorAll('.ad-hotspot-pin');
  const breakdownCards = document.querySelectorAll('.ad-breakdown-card');
  const blueprintCanvas = document.getElementById('adBlueprint');

  if (blueprintPins.length && breakdownCards.length) {
    const activateHotspot = (id) => {
      blueprintPins.forEach(pin => {
        const isMatch = pin.dataset.hotspot === id;
        pin.classList.toggle('is-active', isMatch);
        pin.setAttribute('aria-expanded', isMatch ? 'true' : 'false');
      });
      breakdownCards.forEach(card => {
        card.classList.toggle('is-active', card.dataset.hotspot === id);
      });
    };

    const clearHotspot = () => {
      blueprintPins.forEach(pin => {
        pin.classList.remove('is-active');
        pin.setAttribute('aria-expanded', 'false');
      });
      breakdownCards.forEach(card => card.classList.remove('is-active'));
    };

    blueprintPins.forEach(pin => {
      pin.addEventListener('mouseenter', () => activateHotspot(pin.dataset.hotspot));
      pin.addEventListener('click', (e) => {
        e.preventDefault();
        const isActive = pin.classList.contains('is-active');
        if (isActive) {
          clearHotspot();
        } else {
          activateHotspot(pin.dataset.hotspot);
        }
      });
    });

    breakdownCards.forEach(card => {
      card.addEventListener('mouseenter', () => activateHotspot(card.dataset.hotspot));
      card.addEventListener('click', () => {
        const isActive = card.classList.contains('is-active');
        if (isActive) {
          clearHotspot();
        } else {
          activateHotspot(card.dataset.hotspot);
        }
      });
    });

    if (blueprintCanvas) {
      blueprintCanvas.addEventListener('mouseleave', clearHotspot);
    }
  }

  // 8. Interactive A/B Variant Switcher (Hardware vs Lifestyle)
  const abSwitcherTabs = document.querySelectorAll('.ab-tab-btn');
  const abCards = document.querySelectorAll('.ad-ab-card');

  if (abSwitcherTabs.length && abCards.length) {
    const setVariant = (variantKey) => {
      abSwitcherTabs.forEach(tab => {
        const isMatch = tab.dataset.variant === variantKey;
        tab.classList.toggle('active', isMatch);
        tab.setAttribute('aria-selected', isMatch ? 'true' : 'false');
      });

      abCards.forEach(card => {
        const isMatch = card.dataset.variant === variantKey;
        card.classList.toggle('is-active', isMatch);
        if (window.innerWidth > 768) {
          card.classList.toggle('is-spotlighted', isMatch);
        }
      });
    };

    abSwitcherTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        setVariant(tab.dataset.variant);
      });
    });

    const activeTab = document.querySelector('.ab-tab-btn.active');
    if (activeTab) {
      setVariant(activeTab.dataset.variant);
    }
  }

  // 9. Two-Column Email Story Scrolling Engine
  const initEmailTimelineScrolly = () => {
    const showcaseSection = document.querySelector('.email-showcase-section');
    const cards = document.querySelectorAll('.email-story-card');

    if (!showcaseSection || !cards.length) return;

    let ticking = false;

    const updateActiveCardOnScroll = () => {
      const windowHeight = window.innerHeight;
      const focalLine = windowHeight * 0.48; // Active reading line on screen

      let closestIdx = -1;
      let minDistance = Infinity;

      cards.forEach((card, idx) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const dist = Math.abs(cardCenter - focalLine);

        // Check if card is in the active reading zone
        if (rect.top < windowHeight * 0.85 && rect.bottom > windowHeight * 0.15) {
          if (dist < minDistance) {
            minDistance = dist;
            closestIdx = idx;
          }
        }
      });

      // Update active state on cards
      cards.forEach((card, idx) => {
        const isActive = idx === closestIdx;
        card.classList.toggle('is-active', isActive);
      });

      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateActiveCardOnScroll);
        ticking = true;
      }
    };

    // Sync column heights so both sides reach the bottom evenly
    const syncHeights = () => {
      const fullImg = document.querySelector('.email-full-image');
      const cardsStream = document.querySelector('.email-cards-stream');
      if (!fullImg || !cardsStream) return;

      if (window.innerWidth <= 960) {
        cardsStream.style.height = 'auto';
        return;
      }

      const imgHeight = fullImg.offsetHeight;
      if (imgHeight > 300) {
        cardsStream.style.height = `${imgHeight}px`;
      }
    };

    const fullImg = document.querySelector('.email-full-image');
    if (fullImg) {
      if (fullImg.complete) {
        syncHeights();
      } else {
        fullImg.addEventListener('load', syncHeights);
      }
    }

    const onResize = () => {
      requestTick();
      syncHeights();
    };

    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    // Smooth scroll into focus on click
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        const rect = card.getBoundingClientRect();
        const targetScroll = window.scrollY + rect.top - (window.innerHeight * 0.28);
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });
      });
    });

    // Run initial pass
    requestAnimationFrame(updateActiveCardOnScroll);
    syncHeights();
  };

  initEmailTimelineScrolly();
});



