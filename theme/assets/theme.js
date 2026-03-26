/**
 * Divine Arts — Theme JavaScript
 * Cart drawer (AJAX), header scroll, tabs, filters, add-to-cart.
 */

(function() {
  'use strict';

  /* ── UTILS ──────────────────────────────────────────────────── */

  function formatMoney(cents) {
    var format = window.DivineArts && window.DivineArts.money_format
      ? window.DivineArts.money_format
      : '₹{{amount}}';
    var amount = (cents / 100).toFixed(2);
    var amountNoDecimals = Math.floor(cents / 100).toString();
    // Handle common Shopify money formats
    return format
      .replace('{{amount_with_comma_separator}}', amount.replace('.', ','))
      .replace('{{amount_no_decimals_with_comma_separator}}', amountNoDecimals.replace(/\B(?=(\d{3})+(?!\d))/g, ','))
      .replace('{{amount_no_decimals}}', amountNoDecimals)
      .replace('{{amount}}', amount);
  }

  function fetchJSON(url, options) {
    return fetch(url, Object.assign({ headers: { 'Content-Type': 'application/json', Accept: 'application/json' } }, options))
      .then(function(r) { return r.json(); });
  }


  /* ── HEADER SCROLL ──────────────────────────────────────────── */

  var header = document.getElementById('site-header');
  if (header) {
    var onScroll = function() {
      if (window.scrollY > 50) {
        header.classList.add('da-header--scrolled');
      } else {
        header.classList.remove('da-header--scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }


  /* ── MOBILE NAV ─────────────────────────────────────────────── */

  var mobileToggle = document.getElementById('mobile-menu-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  var mobileClose = document.getElementById('mobile-nav-close');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', function() {
      mobileNav.classList.add('is-open');
      mobileNav.setAttribute('aria-hidden', 'false');
    });
  }
  if (mobileClose && mobileNav) {
    mobileClose.addEventListener('click', function() {
      mobileNav.classList.remove('is-open');
      mobileNav.setAttribute('aria-hidden', 'true');
    });
  }
  // Close mobile nav when clicking a link
  if (mobileNav) {
    mobileNav.querySelectorAll('.da-mobile-nav__link').forEach(function(link) {
      link.addEventListener('click', function() {
        mobileNav.classList.remove('is-open');
      });
    });
  }


  /* ── CART DRAWER ────────────────────────────────────────────── */

  var cartOverlay = document.getElementById('cart-overlay');
  var cartDrawer = document.getElementById('cart-drawer');
  var cartBody = document.getElementById('cart-body');
  var cartFooter = document.getElementById('cart-footer');
  var cartTotal = document.getElementById('cart-total');
  var cartCount = document.getElementById('cart-count');
  var cartCountMobile = document.querySelector('.cart-count-mobile');

  function openCart() {
    if (cartOverlay) cartOverlay.classList.add('is-open');
    if (cartDrawer) cartDrawer.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    refreshCart();
  }

  function closeCart() {
    if (cartOverlay) cartOverlay.classList.remove('is-open');
    if (cartDrawer) cartDrawer.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  // Cart toggle buttons
  ['cart-toggle', 'cart-toggle-mobile'].forEach(function(id) {
    var btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', openCart);
  });
  if (document.getElementById('cart-close')) {
    document.getElementById('cart-close').addEventListener('click', closeCart);
  }
  if (cartOverlay) {
    cartOverlay.addEventListener('click', closeCart);
  }

  function updateCartCount(count) {
    [cartCount, cartCountMobile].forEach(function(el) {
      if (!el) return;
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
    if (window.DivineArts) window.DivineArts.cart_count = count;
  }

  function renderCart(cart) {
    if (!cartBody) return;

    if (!cart.items || cart.items.length === 0) {
      cartBody.innerHTML =
        '<div class="da-cart-drawer__empty">' +
          '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.3">' +
            '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>' +
            '<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>' +
          '</svg>' +
          '<p>Your cart is empty</p>' +
          '<a href="/collections/all" class="da-btn da-btn--outline" style="margin-top:1rem;">Continue Browsing</a>' +
        '</div>';
      if (cartFooter) cartFooter.style.display = 'none';
      updateCartCount(0);
      return;
    }

    var html = '';
    cart.items.forEach(function(item) {
      html +=
        '<div class="da-cart-line" data-line-key="' + item.key + '">' +
          '<div class="da-cart-line__image">' +
            (item.image ? '<img src="' + item.image.replace(/(\.[^.]+)$/, '_128x128$1') + '" alt="' + item.title + '" width="64" height="64" loading="lazy">' : '') +
          '</div>' +
          '<div class="da-cart-line__info">' +
            '<div class="da-cart-line__title">' + item.product_title + '</div>' +
            (item.variant_title && item.variant_title !== 'Default Title' ? '<div style="font-size:0.75rem;color:var(--da-text-light);">' + item.variant_title + '</div>' : '') +
            '<div class="da-cart-line__price">' + formatMoney(item.final_line_price) + '</div>' +
          '</div>' +
          '<div class="da-cart-line__actions">' +
            '<button class="da-cart-line__remove" data-remove-key="' + item.key + '" type="button" aria-label="Remove">' +
              '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14"/></svg>' +
            '</button>' +
            '<div class="da-qty">' +
              '<button class="da-qty__btn" data-qty-change="' + item.key + '" data-qty="' + (item.quantity - 1) + '" type="button">&minus;</button>' +
              '<span class="da-qty__value">' + item.quantity + '</span>' +
              '<button class="da-qty__btn" data-qty-change="' + item.key + '" data-qty="' + (item.quantity + 1) + '" type="button">+</button>' +
            '</div>' +
          '</div>' +
        '</div>';
    });

    cartBody.innerHTML = html;
    if (cartFooter) cartFooter.style.display = '';
    if (cartTotal) cartTotal.textContent = formatMoney(cart.total_price);
    updateCartCount(cart.item_count);

    // Bind remove and qty change events
    cartBody.querySelectorAll('[data-remove-key]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        changeCartItem(btn.dataset.removeKey, 0);
      });
    });

    cartBody.querySelectorAll('[data-qty-change]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var qty = parseInt(btn.dataset.qty, 10);
        if (qty < 1) {
          changeCartItem(btn.dataset.qtyChange, 0);
        } else {
          changeCartItem(btn.dataset.qtyChange, qty);
        }
      });
    });
  }

  function refreshCart() {
    fetchJSON('/cart.js').then(renderCart);
  }

  function changeCartItem(key, quantity) {
    fetchJSON('/cart/change.js', {
      method: 'POST',
      body: JSON.stringify({ id: key, quantity: quantity })
    }).then(renderCart);
  }

  function addToCart(variantId, quantity) {
    quantity = quantity || 1;
    return fetchJSON('/cart/add.js', {
      method: 'POST',
      body: JSON.stringify({ items: [{ id: variantId, quantity: quantity }] })
    }).then(function() {
      openCart();
    });
  }


  /* ── ADD TO CART BUTTONS ────────────────────────────────────── */

  document.addEventListener('click', function(e) {
    var btn = e.target.closest('.da-add-to-cart');
    if (!btn) return;
    e.preventDefault();

    var variantId = btn.dataset.variantId;
    if (!variantId) return;

    var originalText = btn.textContent;
    btn.disabled = true;
    btn.innerHTML = '<span class="da-spinner"></span>';

    addToCart(parseInt(variantId, 10), 1).then(function() {
      btn.textContent = 'Added ✓';
      setTimeout(function() {
        btn.textContent = originalText;
        btn.disabled = false;
      }, 1500);
    }).catch(function() {
      btn.textContent = originalText;
      btn.disabled = false;
    });
  });

  // Intercept product form submissions to use AJAX
  document.addEventListener('submit', function(e) {
    var form = e.target.closest('[data-product-form]');
    if (!form) return;
    e.preventDefault();

    var variantInput = form.querySelector('input[name="id"]');
    if (!variantInput) return;

    var submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      var origText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="da-spinner"></span>';

      addToCart(parseInt(variantInput.value, 10), 1).then(function() {
        submitBtn.textContent = 'Added ✓';
        setTimeout(function() {
          submitBtn.textContent = origText;
          submitBtn.disabled = false;
        }, 1500);
      });
    }
  });


  /* ── PRODUCT IMAGE GALLERY ──────────────────────────────────── */

  var thumbs = document.querySelectorAll('.da-product__thumb');
  var mainImg = document.getElementById('product-main-img');

  thumbs.forEach(function(thumb) {
    thumb.addEventListener('click', function() {
      thumbs.forEach(function(t) { t.classList.remove('is-active'); });
      thumb.classList.add('is-active');
      if (mainImg) {
        mainImg.src = thumb.dataset.imageUrl;
        mainImg.alt = thumb.dataset.imageAlt || '';
      }
    });
  });


  /* ── PRODUCT TABS ───────────────────────────────────────────── */

  var tabContainer = document.getElementById('product-tabs');
  if (tabContainer) {
    tabContainer.querySelectorAll('.da-tabs__btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        // Deactivate all
        tabContainer.querySelectorAll('.da-tabs__btn').forEach(function(b) { b.classList.remove('is-active'); });
        document.querySelectorAll('.da-tabs__panel').forEach(function(p) { p.classList.remove('is-active'); });
        // Activate clicked
        btn.classList.add('is-active');
        var panel = document.querySelector('[data-panel="' + btn.dataset.tab + '"]');
        if (panel) panel.classList.add('is-active');
      });
    });
  }


  /* ── COLLECTION FILTERS ─────────────────────────────────────── */

  var filterDropdowns = document.querySelectorAll('.da-filter-dropdown');
  var collectionGrid = document.getElementById('collection-grid');
  var collectionEmpty = document.getElementById('collection-empty');
  var searchInput = document.getElementById('collection-search');
  var searchClear = document.getElementById('collection-search-clear');

  var activeFilters = { deity: '', chakra: '', element: '' };

  // Toggle dropdown menus
  filterDropdowns.forEach(function(dropdown) {
    var btn = dropdown.querySelector('.da-filter-dropdown__btn');
    var menu = dropdown.querySelector('.da-filter-dropdown__menu');

    if (btn && menu) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        // Close other dropdowns
        filterDropdowns.forEach(function(d) {
          if (d !== dropdown) {
            var m = d.querySelector('.da-filter-dropdown__menu');
            if (m) m.classList.remove('is-open');
          }
        });
        menu.classList.toggle('is-open');
      });
    }

    // Filter item click
    dropdown.querySelectorAll('.da-filter-dropdown__item').forEach(function(item) {
      item.addEventListener('click', function() {
        var filterType = dropdown.dataset.filter;
        activeFilters[filterType] = item.dataset.filterValue;
        btn.querySelector('span').textContent = item.dataset.filterValue;
        btn.classList.add('is-active');
        menu.classList.remove('is-open');
        applyFilters();
      });
    });

    // Clear filter
    var clearBtn = dropdown.querySelector('.da-filter-dropdown__clear');
    if (clearBtn) {
      clearBtn.addEventListener('click', function() {
        var filterType = dropdown.dataset.filter;
        activeFilters[filterType] = '';
        var defaultLabels = { deity: 'By Deity', chakra: 'By Chakra', element: 'By Element' };
        btn.querySelector('span').textContent = defaultLabels[filterType] || 'Filter';
        btn.classList.remove('is-active');
        menu.classList.remove('is-open');
        applyFilters();
      });
    }
  });

  // Close dropdowns on outside click
  document.addEventListener('click', function() {
    filterDropdowns.forEach(function(d) {
      var m = d.querySelector('.da-filter-dropdown__menu');
      if (m) m.classList.remove('is-open');
    });
  });

  // Search
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      if (searchClear) {
        searchClear.classList.toggle('is-visible', searchInput.value.length > 0);
      }
      applyFilters();
    });
  }
  if (searchClear) {
    searchClear.addEventListener('click', function() {
      searchInput.value = '';
      searchClear.classList.remove('is-visible');
      applyFilters();
    });
  }

  function applyFilters() {
    if (!collectionGrid) return;

    var items = collectionGrid.querySelectorAll('.da-collection-item');
    var query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    var visibleCount = 0;

    items.forEach(function(item) {
      var show = true;
      var title = (item.dataset.title || '').toLowerCase();
      var tags = (item.dataset.tags || '').toLowerCase();
      var deity = item.dataset.deity || '';
      var chakra = item.dataset.chakra || '';
      var element = item.dataset.element || '';

      if (activeFilters.deity && deity !== activeFilters.deity) show = false;
      if (activeFilters.chakra && chakra !== activeFilters.chakra) show = false;
      if (activeFilters.element && element !== activeFilters.element) show = false;

      if (query && show) {
        if (title.indexOf(query) === -1 && tags.indexOf(query) === -1 && deity.toLowerCase().indexOf(query) === -1) {
          show = false;
        }
      }

      item.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });

    if (collectionEmpty) {
      collectionEmpty.classList.toggle('da-hidden', visibleCount > 0);
    }
  }


  /* ── SCROLL REVEAL RE-OBSERVER ──────────────────────────────── */
  // Re-observe any newly added elements (e.g. after AJAX)
  window.DivineArts = window.DivineArts || {};
  window.DivineArts.reobserve = function() {
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('da-revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      document.querySelectorAll('.da-reveal:not(.da-revealed)').forEach(function(el) {
        observer.observe(el);
      });
    }
  };

})();
