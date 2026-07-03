/* ============================================================
   Tank Care Buddy — Waitlist / Launch CTA
   v20260702e

   HOW TO SWITCH MODES LATER:
   ─────────────────────────
   launchCtaMode = "waitlist"  → opens email capture modal (current)
   launchCtaMode = "preorder"  → links to App Store pre-order page
   launchCtaMode = "appstore"  → links to final App Store product page

   When switching to "preorder" or "appstore", set appStoreUrl below
   and the buttons will automatically redirect instead of opening the modal.
   ============================================================ */

(function () {
  'use strict';

  // ── CONFIG ──────────────────────────────────────────────────────
  const launchCtaMode = 'waitlist'; // "waitlist" | "preorder" | "appstore"
  const appStoreUrl   = '';         // Set this when you have a real App Store link

  // Formspree endpoint — replace XXXXXXXX with your real form ID after creating one at formspree.io
  // Until configured, the form falls back to a mailto: link automatically
  const FORMSPREE_ID  = 'mvzjvdrz';

  // ── PUBLIC API ───────────────────────────────────────────────────
  window.TCB = window.TCB || {};

  window.TCB.openWaitlistModal = function () {
    if (launchCtaMode === 'preorder' || launchCtaMode === 'appstore') {
      if (appStoreUrl) window.open(appStoreUrl, '_blank', 'noopener');
      return;
    }
    _openModal();
  };

  // ── MODAL SCAFFOLD ───────────────────────────────────────────────
  let _modalEl = null;

  function _buildModal() {
    if (document.getElementById('tcb-waitlist-modal')) return;

    const el = document.createElement('div');
    el.id = 'tcb-waitlist-modal';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-labelledby', 'wl-heading');
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = `
      <div class="wl-backdrop" id="tcb-wl-backdrop"></div>
      <div class="wl-panel" id="tcb-wl-panel">
        <button class="wl-close" id="tcb-wl-close" aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        <!-- Default state -->
        <div class="wl-body" id="tcb-wl-default">
          <div class="wl-icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <h2 class="wl-heading" id="wl-heading">Get notified when Tank Care Buddy launches</h2>
          <p class="wl-body-text">Enter your email and I'll let you know as soon as it's live on the App Store.</p>
          <form class="wl-form" id="tcb-wl-form" novalidate>
            <div class="wl-field-wrap">
              <input
                type="email"
                id="tcb-wl-email"
                name="email"
                class="wl-input"
                placeholder="you@example.com"
                autocomplete="email"
                inputmode="email"
                required
                aria-label="Email address"
                aria-describedby="tcb-wl-error"
              />
              <p class="wl-error" id="tcb-wl-error" role="alert" aria-live="polite"></p>
            </div>
            <button type="submit" class="wl-submit" id="tcb-wl-submit">
              <span class="wl-submit-text">Notify me</span>
              <span class="wl-submit-spinner" aria-hidden="true"></span>
            </button>
          </form>
          <p class="wl-trust">No spam. Just launch updates.</p>
        </div>

        <!-- Success state -->
        <div class="wl-body wl-success" id="tcb-wl-success" hidden>
          <div class="wl-success-icon" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2 class="wl-heading" id="wl-heading-success">You're on the list</h2>
          <p class="wl-body-text">I'll email you when Tank Care Buddy is available on the App Store.</p>
          <button class="btn btn-ghost" id="tcb-wl-done" style="margin-top:1.5rem">Done</button>
        </div>
      </div>
    `;

    document.body.appendChild(el);
    _modalEl = el;

    // Wire close targets
    document.getElementById('tcb-wl-close').addEventListener('click', _closeModal);
    document.getElementById('tcb-wl-backdrop').addEventListener('click', _closeModal);
    document.getElementById('tcb-wl-done').addEventListener('click', _closeModal);
    document.getElementById('tcb-wl-form').addEventListener('submit', _handleSubmit);

    // Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && _isOpen()) _closeModal();
    });
  }

  function _isOpen() {
    return _modalEl && _modalEl.getAttribute('aria-hidden') === 'false';
  }

  function _openModal() {
    _buildModal();
    _resetForm();
    _modalEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // Focus email input after transition
    setTimeout(function () {
      const input = document.getElementById('tcb-wl-email');
      if (input) input.focus();
    }, 120);
  }

  function _closeModal() {
    if (!_modalEl) return;
    _modalEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Return focus to whichever button opened the modal
    const opener = document.getElementById('hero-notify-btn');
    if (opener) opener.focus();
  }

  function _resetForm() {
    const form    = document.getElementById('tcb-wl-form');
    const def     = document.getElementById('tcb-wl-default');
    const success = document.getElementById('tcb-wl-success');
    const errEl   = document.getElementById('tcb-wl-error');
    const submit  = document.getElementById('tcb-wl-submit');
    if (form)    form.reset();
    if (errEl)   { errEl.textContent = ''; }
    if (def)     { def.hidden = false; }
    if (success) { success.hidden = true; }
    if (submit)  { _setSubmitState(submit, 'idle'); delete submit.dataset.submitted; }
  }

  // ── FORM SUBMISSION ──────────────────────────────────────────────
  async function _handleSubmit(e) {
    e.preventDefault();

    const emailInput = document.getElementById('tcb-wl-email');
    const errEl      = document.getElementById('tcb-wl-error');
    const submit     = document.getElementById('tcb-wl-submit');
    const email      = emailInput ? emailInput.value.trim() : '';

    // Validate
    if (!email || !_validEmail(email)) {
      if (errEl) errEl.textContent = 'Please enter a valid email address.';
      if (emailInput) { emailInput.focus(); emailInput.setAttribute('aria-invalid', 'true'); }
      return;
    }
    if (errEl) errEl.textContent = '';
    if (emailInput) emailInput.removeAttribute('aria-invalid');

    // Lock immediately — prevents double-tap / multiple submissions
    if (submit && submit.dataset.submitted === 'true') return;
    if (submit) submit.dataset.submitted = 'true';
    _setSubmitState(submit, 'loading');

    try {
      // ── Formspree submission ──
      const res = await fetch('https://formspree.io/f/' + FORMSPREE_ID, {
        method:  'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email:    email,
          _subject: 'Email added to waiting list',
          _replyto: email,
          _gotcha:  ''   // honeypot — bots fill this, Formspree discards the submission
        })
      });
      if (!res.ok) throw new Error('Formspree error ' + res.status);

      _setSubmitState(submit, 'idle');
      _showSuccess();
      _showToast('Got it! — You’re on the list ✔️');
      // Auto-close after 2.8 seconds so the modal disappears cleanly
      setTimeout(_closeModal, 2800);

    } catch (err) {
      _setSubmitState(submit, 'idle');
      if (errEl) errEl.textContent = 'Something went wrong. Please try again or email support@tankcarebuddy.com.';
    }
  }

  function _showSuccess() {
    const def     = document.getElementById('tcb-wl-default');
    const success = document.getElementById('tcb-wl-success');
    if (def)     def.hidden = true;
    if (success) {
      success.hidden = false;
      // Update aria-labelledby so screen readers announce new heading
      if (_modalEl) _modalEl.setAttribute('aria-labelledby', 'wl-heading-success');
      const doneBtn = document.getElementById('tcb-wl-done');
      if (doneBtn) doneBtn.focus();
    }
  }

  function _setSubmitState(btn, state) {
    if (!btn) return;
    const text    = btn.querySelector('.wl-submit-text');
    const spinner = btn.querySelector('.wl-submit-spinner');
    if (state === 'loading') {
      btn.disabled = true;
      if (text)    text.style.opacity = '0';
      if (spinner) spinner.style.display = 'block';
    } else {
      btn.disabled = false;
      if (text)    text.style.opacity = '1';
      if (spinner) spinner.style.display = 'none';
    }
  }

  function _validEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  // ── TOAST NOTIFICATION ───────────────────────────────────────────
  function _showToast(msg) {
    // Remove any existing toast
    const old = document.getElementById('tcb-toast');
    if (old) old.remove();

    const toast = document.createElement('div');
    toast.id = 'tcb-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.textContent = msg;
    document.body.appendChild(toast);

    // Trigger fade-in
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        toast.classList.add('tcb-toast--visible');
      });
    });

    // Fade out and remove after 3 seconds
    setTimeout(function () {
      toast.classList.remove('tcb-toast--visible');
      setTimeout(function () { toast.remove(); }, 400);
    }, 3000);
  }

})();
