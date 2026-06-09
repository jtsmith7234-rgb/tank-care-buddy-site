/* ============================================================
   Tank Care Buddy — Shared header / footer injection + utils
   ============================================================ */

(function () {
  // ── LOGO IMAGE ──────────────────────────────────────────────────
  // Use absolute URL so the icon loads correctly from every page on the site
  const _iconSrc = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'header-icon.png'
    : 'https://tankcarebuddy.com/header-icon.png';
  const LOGO_SVG = `<span class="site-logo-wrap" aria-hidden="true"><img class="site-logo-mark" src="${_iconSrc}" width="22" height="22" alt="" loading="eager" decoding="async" draggable="false"></span>`;

  // ── DETECT CURRENT PAGE ───────────────────────────────────────
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const navItems = [
    { href: 'index.html',   label: 'Home'    },
    { href: 'support.html', label: 'Support' },
    { href: 'faq.html',     label: 'FAQ'     },
    { href: 'privacy.html', label: 'Privacy' },
  ];

  // ── BUILD HEADER ──────────────────────────────────────────────
  const navLinks = navItems.map(n =>
    `<a href="${n.href}" class="${path === n.href ? 'active' : ''}">${n.label}</a>`
  ).join('');

  const headerHTML = `
    <header class="site-header" id="site-header">
      <div class="container">
        <div class="header-inner">
          <a href="index.html" class="site-logo" aria-label="Tank Care Buddy — Home">
            ${LOGO_SVG}
            <span class="site-logo-text">Tank Care Buddy</span>
          </a>
          <nav class="site-nav" id="site-nav" aria-label="Main navigation">
            ${navLinks}
          </nav>
          <div class="header-actions">
            <button class="theme-toggle" data-theme-toggle aria-label="Switch theme">
              <!-- filled by JS -->
            </button>
            <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </div>
    </header>`;

  // ── BUILD FOOTER ──────────────────────────────────────────────
  const year = new Date().getFullYear();
  const footerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-inner">
          <div class="footer-brand">
            <a href="index.html" class="site-logo" aria-label="Tank Care Buddy — Home">
              ${LOGO_SVG}
              <span class="site-logo-text">Tank Care Buddy</span>
            </a>
            <p class="footer-tagline">Simple aquarium tracking for every fish keeper.</p>
          </div>
          <nav class="footer-links" aria-label="Footer navigation">
            <a href="support.html">Support</a>
            <a href="privacy.html">Privacy Policy</a>
            <a href="faq.html">FAQ</a>
            <a href="mailto:tankcarebuddy@outlook.com">tankcarebuddy@outlook.com</a>
          </nav>
        </div>
        <div class="footer-copy">
          <p>&copy; ${year} Tank Care Buddy. All rights reserved.</p>
          <p>Made for fish people.</p>
        </div>
      </div>
    </footer>`;

  // ── INJECT ────────────────────────────────────────────────────
  const headerTarget = document.getElementById('header-placeholder');
  const footerTarget = document.getElementById('footer-placeholder');
  if (headerTarget) headerTarget.outerHTML = headerHTML;
  if (footerTarget) footerTarget.outerHTML = footerHTML;

  // ── SCROLL HEADER ─────────────────────────────────────────────
  const siteHeader = document.getElementById('site-header');
  if (siteHeader) {
    window.addEventListener('scroll', () => {
      siteHeader.classList.toggle('scrolled', window.scrollY > 12);
    }, { passive: true });
  }

  // ── MOBILE NAV ────────────────────────────────────────────────
  const navToggle = document.getElementById('nav-toggle');
  const siteNav   = document.getElementById('site-nav');
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const open = siteNav.classList.toggle('open');
      navToggle.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', String(open));
    });
    // Close on nav link click
    siteNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        siteNav.classList.remove('open');
        navToggle.classList.remove('open');
      });
    });
  }

  // ── THEME TOGGLE ─────────────────────────────────────────────
  const html  = document.documentElement;
  const toggle = document.querySelector('[data-theme-toggle]');

  let theme = html.getAttribute('data-theme') ||
    (window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
  html.setAttribute('data-theme', theme);

  const MOON = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  const SUN  = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;

  const syncToggle = () => {
    if (!toggle) return;
    toggle.innerHTML = theme === 'dark' ? SUN : MOON;
    toggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  };
  syncToggle();

  if (toggle) {
    toggle.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', theme);
      syncToggle();
    });
  }

  // ── FAQ ACCORDION (used on faq.html) ─────────────────────────
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(o => o.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

})();
