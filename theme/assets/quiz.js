/**
 * Divine Arts — Quiz Logic
 * 4-step deity recommendation quiz.
 * Reads deity data from window.DivineArtsDeities (injected by guide-template.liquid).
 */

(function() {
  'use strict';

  var deities = window.DivineArtsDeities || [];
  if (!deities.length) return;

  var step1 = document.getElementById('quiz-step-1');
  var step2 = document.getElementById('quiz-step-2');
  var step3 = document.getElementById('quiz-step-3');
  var step4 = document.getElementById('quiz-step-4');

  if (!step1 || !step2 || !step3 || !step4) return;

  var selectedChakra = '';
  var selectedElement = '';
  var results = [];

  /* ── Helpers ────────────────────────────────────────────────── */

  function showStep(n) {
    [step1, step2, step3, step4].forEach(function(el, i) {
      if (i + 1 === n) {
        el.classList.remove('da-hidden');
        el.classList.add('da-quiz-panel');
        // Re-trigger animation
        el.style.animation = 'none';
        el.offsetHeight; // force reflow
        el.style.animation = '';
      } else {
        el.classList.add('da-hidden');
      }
    });

    // Update progress indicators
    for (var s = 1; s <= 4; s++) {
      var indicator = document.querySelector('[data-step-indicator="' + s + '"]');
      var connector = document.querySelector('[data-connector="' + s + '"]');
      if (indicator) {
        indicator.classList.toggle('is-active', s <= n);
        indicator.classList.toggle('is-done', s < n);
      }
      if (connector) {
        connector.classList.toggle('is-done', s < n);
      }
    }

    // Scroll to top of guide
    var guide = document.getElementById('da-guide');
    if (guide) {
      guide.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function getQuizResults(chakraKey, element) {
    var chakraMatches = deities.filter(function(d) { return d.chakraKey === chakraKey; });
    var elementMatches = deities.filter(function(d) { return d.element === element; });

    // Perfect match: same deity in both
    var perfect = chakraMatches.filter(function(d) {
      return elementMatches.some(function(e) { return e.name === d.name; });
    });
    if (perfect.length > 0) return perfect;

    // Combine unique
    var combined = chakraMatches.slice();
    elementMatches.forEach(function(d) {
      if (!combined.some(function(c) { return c.name === d.name; })) {
        combined.push(d);
      }
    });
    return combined.slice(0, 3);
  }

  function renderResults() {
    var grid = document.getElementById('quiz-results-grid');
    var title = document.getElementById('quiz-results-title');
    var desc = document.getElementById('quiz-results-desc');
    var cta = document.getElementById('quiz-results-cta');

    if (!grid) return;

    if (results.length === 1) {
      title.textContent = 'Your Deity';
      desc.textContent = 'A perfect alignment between your inner need and elemental energy.';
      grid.className = 'da-grid da-mb-3';
      grid.style.maxWidth = '360px';
      grid.style.margin = '0 auto';
    } else {
      title.textContent = 'Your Recommended Deities';
      desc.textContent = 'Your chakra and elemental signals point to multiple forms of sacred energy.';
      grid.className = 'da-grid da-grid--' + Math.min(results.length, 3) + ' da-mb-3';
      grid.style.maxWidth = '';
      grid.style.margin = '';
    }

    var html = '';
    results.forEach(function(deity) {
      // In quiz results, show "Ram" instead of "Ram Darbar"
      var displayName = deity.name === 'Ram Darbar' ? 'Ram' : deity.name;
      html +=
        '<div style="border:1px solid var(--da-border-copper);padding:2rem;background:var(--da-linen);text-align:center;">' +
          '<h3 class="da-display da-display-sm da-text-copper" style="margin-bottom:0.5rem;">' + displayName + '</h3>' +
          '<p style="font-family:var(--da-font-display);font-style:italic;font-size:0.875rem;color:var(--da-text-muted);margin-bottom:0.5rem;">' + deity.tagline + '</p>' +
          '<p style="font-family:var(--da-font-display);font-size:0.75rem;color:var(--da-text-light);margin-bottom:1rem;">' + deity.mantra + '</p>' +
          '<div class="da-body-xs">' +
            '<p>' + deity.chakra + '</p>' +
            '<p>' + deity.element + ' Element</p>' +
          '</div>' +
        '</div>';
    });

    grid.innerHTML = html;

    // Build CTA link with filters
    if (cta) {
      var params = '?chakra=' + encodeURIComponent(selectedChakra);
      if (selectedElement) params += '&element=' + encodeURIComponent(selectedElement);
      cta.href = '/collections/all' + params;
      cta.textContent = results.length === 1 ? 'Find Your Murti' : 'Find Murtis That Fit';
    }
  }

  /* ── Step 1: Intention ──────────────────────────────────────── */

  step1.querySelectorAll('.da-quiz-option').forEach(function(btn) {
    btn.addEventListener('click', function() {
      selectedChakra = btn.dataset.chakra;
      showStep(2);
    });
  });

  /* ── Step 2: Element ────────────────────────────────────────── */

  step2.querySelectorAll('.da-quiz-option').forEach(function(btn) {
    btn.addEventListener('click', function() {
      selectedElement = btn.dataset.element;
      results = getQuizResults(selectedChakra, selectedElement);
      showStep(3);
    });
  });

  var backBtn1 = document.getElementById('quiz-back-1');
  if (backBtn1) {
    backBtn1.addEventListener('click', function() {
      showStep(1);
    });
  }

  /* ── Step 3: Email ──────────────────────────────────────────── */

  var emailForm = document.getElementById('quiz-email-form');
  var emailInput = document.getElementById('quiz-email');
  var emailSubmit = document.getElementById('quiz-email-submit');
  var skipEmail = document.getElementById('quiz-skip-email');

  if (emailForm) {
    emailForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var email = emailInput ? emailInput.value.trim() : '';

      if (email) {
        emailSubmit.textContent = 'Saving…';
        emailSubmit.disabled = true;

        // Subscribe via Shopify customer API
        fetch('/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: 'form_type=customer&utf8=✓&customer[email]=' + encodeURIComponent(email) + '&customer[tags]=quiz-lead'
        }).finally(function() {
          renderResults();
          showStep(4);
        });
      } else {
        renderResults();
        showStep(4);
      }
    });
  }

  if (skipEmail) {
    skipEmail.addEventListener('click', function() {
      renderResults();
      showStep(4);
    });
  }

  /* ── Step 4: Results ────────────────────────────────────────── */

  var retakeBtn = document.getElementById('quiz-retake');
  if (retakeBtn) {
    retakeBtn.addEventListener('click', function() {
      selectedChakra = '';
      selectedElement = '';
      results = [];
      showStep(1);
    });
  }

})();
