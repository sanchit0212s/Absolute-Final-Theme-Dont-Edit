/**
 * Divine Arts — Kala Theme JavaScript
 * Handles: dark mode, cart drawer, collection filters, quiz, animations
 */

(function() {
  'use strict';

  /* ═══════════════════════════════════════════════════
     DARK MODE TOGGLE
     ═══════════════════════════════════════════════════ */
  const ThemeToggle = {
    init() {
      const saved = localStorage.getItem('da-theme');
      if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      }
      document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
        btn.addEventListener('click', () => this.toggle());
      });
    },
    toggle() {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('da-theme', isDark ? 'dark' : 'light');
      // Update diya icon
      document.querySelectorAll('[data-diya-flame]').forEach(el => {
        if (isDark) {
          el.setAttribute('fill', 'none');
          el.setAttribute('stroke-dasharray', '2 2');
          el.setAttribute('opacity', '0.4');
        } else {
          el.setAttribute('fill', 'currentColor');
          el.setAttribute('stroke-dasharray', '0');
          el.setAttribute('opacity', '1');
        }
      });
    }
  };


  /* ═══════════════════════════════════════════════════
     MOBILE MENU
     ═══════════════════════════════════════════════════ */
  const MobileMenu = {
    init() {
      const toggle = document.querySelector('[data-menu-toggle]');
      const menu = document.querySelector('[data-mobile-menu]');
      const overlay = document.querySelector('[data-mobile-overlay]');
      if (!toggle || !menu) return;

      toggle.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('translate-x-0');
        menu.classList.toggle('translate-x-full', !isOpen);
        overlay?.classList.toggle('hidden', !isOpen);
        document.body.classList.toggle('overflow-hidden', isOpen);
      });

      overlay?.addEventListener('click', () => {
        menu.classList.remove('translate-x-0');
        menu.classList.add('translate-x-full');
        overlay.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      });
    }
  };


  /* ═══════════════════════════════════════════════════
     NAVBAR SCROLL STATE
     ═══════════════════════════════════════════════════ */
  const NavScroll = {
    init() {
      const nav = document.querySelector('[data-navbar]');
      if (!nav) return;
      let ticking = false;
      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            nav.classList.toggle('shadow-sm', window.scrollY > 20);
            nav.classList.toggle('border-b', window.scrollY > 20);
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
    }
  };


  /* ═══════════════════════════════════════════════════
     CART DRAWER (Shopify AJAX Cart API)
     ═══════════════════════════════════════════════════ */
  const CartDrawer = {
    init() {
      // Open cart
      document.querySelectorAll('[data-cart-open]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.open();
        });
      });

      // Close cart
      document.querySelectorAll('[data-cart-close]').forEach(btn => {
        btn.addEventListener('click', () => this.close());
      });

      // Overlay close
      document.querySelector('[data-cart-overlay]')?.addEventListener('click', () => this.close());

      // Quick add buttons
      document.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-quick-add]');
        if (btn) {
          e.preventDefault();
          e.stopPropagation();
          const variantId = btn.dataset.quickAdd;
          this.addItem(variantId, 1);
        }
      });

      // Quantity buttons
      document.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-cart-qty]');
        if (btn) {
          const key = btn.dataset.cartKey;
          const qty = parseInt(btn.dataset.cartQty);
          this.updateItem(key, qty);
        }
      });

      // Remove buttons
      document.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-cart-remove]');
        if (btn) {
          const key = btn.dataset.cartRemove;
          this.updateItem(key, 0);
        }
      });
    },

    open() {
      const drawer = document.querySelector('[data-cart-drawer]');
      const overlay = document.querySelector('[data-cart-overlay]');
      if (!drawer) return;
      drawer.classList.remove('translate-x-full');
      drawer.classList.add('translate-x-0');
      overlay?.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
      this.refresh();
    },

    close() {
      const drawer = document.querySelector('[data-cart-drawer]');
      const overlay = document.querySelector('[data-cart-overlay]');
      if (!drawer) return;
      drawer.classList.add('translate-x-full');
      drawer.classList.remove('translate-x-0');
      overlay?.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    },

    async addItem(variantId, quantity = 1) {
      try {
        await fetch('/cart/add.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: variantId, quantity })
        });
        this.open();
      } catch (err) {
        console.error('Cart add error:', err);
      }
    },

    async updateItem(key, quantity) {
      try {
        await fetch('/cart/change.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: key, quantity })
        });
        this.refresh();
      } catch (err) {
        console.error('Cart update error:', err);
      }
    },

    async refresh() {
      try {
        const res = await fetch('/cart.js');
        const cart = await res.json();
        this.render(cart);
        this.updateBadge(cart.item_count);
      } catch (err) {
        console.error('Cart refresh error:', err);
      }
    },

    updateBadge(count) {
      document.querySelectorAll('[data-cart-count]').forEach(el => {
        el.textContent = count;
        el.classList.toggle('hidden', count === 0);
      });
    },

    render(cart) {
      const container = document.querySelector('[data-cart-items]');
      const footer = document.querySelector('[data-cart-footer]');
      const empty = document.querySelector('[data-cart-empty]');
      if (!container) return;

      if (cart.items.length === 0) {
        container.innerHTML = '';
        if (empty) empty.classList.remove('hidden');
        if (footer) footer.classList.add('hidden');
        return;
      }

      if (empty) empty.classList.add('hidden');
      if (footer) footer.classList.remove('hidden');

      container.innerHTML = cart.items.map(item => `
        <div class="flex gap-4 pb-4 border-b border-border/50">
          <div class="w-20 h-24 rounded-md overflow-hidden bg-surface-2 flex-shrink-0">
            <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-display text-sm text-on-surface truncate">${item.product_title}</p>
            <p class="font-body text-[11px] text-on-surface-faint mt-0.5">${item.variant_title || ''}</p>
            <p class="font-body text-sm text-accent mt-1">${Shopify.formatMoney ? Shopify.formatMoney(item.price) : '₹' + (item.price / 100).toLocaleString('en-IN')}</p>
            <div class="flex items-center gap-3 mt-2">
              <div class="flex items-center border border-border rounded-md">
                <button data-cart-key="${item.key}" data-cart-qty="${item.quantity - 1}" class="w-7 h-7 flex items-center justify-center text-on-surface-faint hover:text-on-surface transition-colors">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </button>
                <span class="w-8 text-center font-body text-xs text-on-surface">${item.quantity}</span>
                <button data-cart-key="${item.key}" data-cart-qty="${item.quantity + 1}" class="w-7 h-7 flex items-center justify-center text-on-surface-faint hover:text-on-surface transition-colors">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </button>
              </div>
              <button data-cart-remove="${item.key}" class="text-on-surface-faint hover:text-vermilion transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3,6 5,6 21,6"/><path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2v2"/></svg>
              </button>
            </div>
          </div>
        </div>
      `).join('');

      // Update subtotal
      const subtotalEl = document.querySelector('[data-cart-subtotal]');
      if (subtotalEl) {
        subtotalEl.textContent = '₹' + (cart.total_price / 100).toLocaleString('en-IN');
      }
    }
  };


  /* ═══════════════════════════════════════════════════
     ADD TO CART (Product Page)
     ═══════════════════════════════════════════════════ */
  const ProductAddToCart = {
    init() {
      document.querySelectorAll('[data-add-to-cart]').forEach(btn => {
        btn.addEventListener('click', async () => {
          const variantId = btn.dataset.addToCart;
          const originalHTML = btn.innerHTML;
          btn.disabled = true;

          try {
            await fetch('/cart/add.js', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id: parseInt(variantId), quantity: 1 })
            });

            btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20,6 9,17 4,12"/></svg> Added to Altar`;
            btn.classList.remove('btn-primary');
            btn.classList.add('bg-surface-2', 'border', 'border-accent/50', 'text-accent');

            CartDrawer.open();

            setTimeout(() => {
              btn.innerHTML = originalHTML;
              btn.disabled = false;
              btn.classList.add('btn-primary');
              btn.classList.remove('bg-surface-2', 'border', 'border-accent/50', 'text-accent');
            }, 2500);
          } catch (err) {
            console.error('Add to cart error:', err);
            btn.disabled = false;
          }
        });
      });
    }
  };


  /* ═══════════════════════════════════════════════════
     COLLECTION FILTERS
     ═══════════════════════════════════════════════════ */
  const CollectionFilters = {
    state: {
      deities: [],
      chakra: '',
      element: '',
      sort: 'default'
    },

    init() {
      const grid = document.querySelector('[data-product-grid]');
      if (!grid) return;

      // Deity filter chips
      document.querySelectorAll('[data-deity-filter]').forEach(btn => {
        btn.addEventListener('click', () => {
          const deity = btn.dataset.deityFilter;
          if (!deity) {
            this.state.deities = [];
          } else {
            const idx = this.state.deities.indexOf(deity);
            if (idx > -1) this.state.deities.splice(idx, 1);
            else this.state.deities.push(deity);
          }
          this.apply();
          this.updateChips();
        });
      });

      // Chakra filter
      document.querySelectorAll('[data-chakra-filter]').forEach(btn => {
        btn.addEventListener('click', () => {
          const chakra = btn.dataset.chakraFilter;
          this.state.chakra = this.state.chakra === chakra ? '' : chakra;
          this.apply();
          this.updateChips();
        });
      });

      // Element filter
      document.querySelectorAll('[data-element-filter]').forEach(btn => {
        btn.addEventListener('click', () => {
          const el = btn.dataset.elementFilter;
          this.state.element = this.state.element === el ? '' : el;
          this.apply();
          this.updateChips();
        });
      });

      // Sort
      const sortSelect = document.querySelector('[data-sort]');
      if (sortSelect) {
        sortSelect.addEventListener('change', () => {
          this.state.sort = sortSelect.value;
          this.apply();
        });
      }

      // Clear filters
      document.querySelectorAll('[data-clear-filters]').forEach(btn => {
        btn.addEventListener('click', () => {
          this.state = { deities: [], chakra: '', element: '', sort: 'default' };
          this.apply();
          this.updateChips();
        });
      });

      // More filters toggle
      document.querySelectorAll('[data-toggle-filters]').forEach(btn => {
        btn.addEventListener('click', () => {
          const panel = document.querySelector('[data-filter-panel]');
          if (panel) panel.classList.toggle('hidden');
        });
      });

      // Init from URL params
      const params = new URLSearchParams(window.location.search);
      const deityParam = params.get('deity');
      if (deityParam) {
        this.state.deities = deityParam.split(',');
        this.apply();
        this.updateChips();
      }
    },

    apply() {
      const cards = document.querySelectorAll('[data-product-card]');
      let visibleCount = 0;

      cards.forEach(card => {
        const deity = card.dataset.deity || '';
        const chakra = card.dataset.chakra || '';
        const element = card.dataset.element || '';
        let show = true;

        if (this.state.deities.length > 0 && !this.state.deities.includes(deity)) show = false;
        if (this.state.chakra && !chakra.includes(this.state.chakra)) show = false;
        if (this.state.element && element !== this.state.element) show = false;

        card.style.display = show ? '' : 'none';
        if (show) visibleCount++;
      });

      // Sort
      if (this.state.sort !== 'default') {
        const grid = document.querySelector('[data-product-grid]');
        if (grid) {
          const sorted = Array.from(cards).filter(c => c.style.display !== 'none');
          sorted.sort((a, b) => {
            const pa = parseInt(a.dataset.price || '0');
            const pb = parseInt(b.dataset.price || '0');
            return this.state.sort === 'price-asc' ? pa - pb : pb - pa;
          });
          sorted.forEach(el => grid.appendChild(el));
        }
      }

      // Update count
      const countEl = document.querySelector('[data-product-count]');
      if (countEl) countEl.textContent = `${visibleCount} ${visibleCount === 1 ? 'form' : 'forms'}`;

      // Clear filters visibility
      const clearBtn = document.querySelector('[data-clear-filters]');
      const hasFilters = this.state.deities.length > 0 || this.state.chakra || this.state.element;
      if (clearBtn) clearBtn.classList.toggle('hidden', !hasFilters);

      // Empty state
      const emptyState = document.querySelector('[data-empty-state]');
      if (emptyState) emptyState.classList.toggle('hidden', visibleCount > 0);

      // Update URL
      const url = new URL(window.location);
      if (this.state.deities.length > 0) {
        url.searchParams.set('deity', this.state.deities.join(','));
      } else {
        url.searchParams.delete('deity');
      }
      history.replaceState({}, '', url);
    },

    updateChips() {
      document.querySelectorAll('[data-deity-filter]').forEach(btn => {
        const deity = btn.dataset.deityFilter;
        const isActive = !deity
          ? this.state.deities.length === 0
          : this.state.deities.includes(deity);
        btn.className = isActive ? 'filter-chip-active' : 'filter-chip';
      });

      document.querySelectorAll('[data-chakra-filter]').forEach(btn => {
        const active = this.state.chakra === btn.dataset.chakraFilter;
        btn.className = active ? 'filter-chip-active' : 'filter-chip';
      });

      document.querySelectorAll('[data-element-filter]').forEach(btn => {
        const active = this.state.element === btn.dataset.elementFilter;
        btn.className = active ? 'filter-chip-active' : 'filter-chip';
      });
    }
  };


  /* ═══════════════════════════════════════════════════
     PRODUCT IMAGE GALLERY
     ═══════════════════════════════════════════════════ */
  const ProductGallery = {
    init() {
      const main = document.querySelector('[data-main-image]');
      if (!main) return;
      const images = JSON.parse(main.dataset.images || '[]');
      let current = 0;

      // Thumbnail clicks
      document.querySelectorAll('[data-thumb-index]').forEach(thumb => {
        thumb.addEventListener('click', () => {
          current = parseInt(thumb.dataset.thumbIndex);
          this.update(main, images, current);
        });
      });

      // Arrow navigation
      document.querySelector('[data-gallery-prev]')?.addEventListener('click', (e) => {
        e.stopPropagation();
        current = (current - 1 + images.length) % images.length;
        this.update(main, images, current);
      });

      document.querySelector('[data-gallery-next]')?.addEventListener('click', (e) => {
        e.stopPropagation();
        current = (current + 1) % images.length;
        this.update(main, images, current);
      });

      // Lightbox
      main.addEventListener('click', () => {
        const lightbox = document.querySelector('[data-lightbox]');
        if (lightbox) {
          lightbox.classList.remove('hidden');
          document.querySelector('[data-lightbox-img]').src = images[current];
          document.body.classList.add('overflow-hidden');
        }
      });

      // Lightbox close
      document.querySelector('[data-lightbox-close]')?.addEventListener('click', () => {
        document.querySelector('[data-lightbox]')?.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      });

      document.querySelector('[data-lightbox]')?.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
          e.currentTarget.classList.add('hidden');
          document.body.classList.remove('overflow-hidden');
        }
      });

      // Keyboard
      document.addEventListener('keydown', (e) => {
        const lightbox = document.querySelector('[data-lightbox]');
        if (!lightbox || lightbox.classList.contains('hidden')) return;
        if (e.key === 'Escape') {
          lightbox.classList.add('hidden');
          document.body.classList.remove('overflow-hidden');
        }
        if (e.key === 'ArrowRight') {
          current = (current + 1) % images.length;
          this.update(main, images, current);
          document.querySelector('[data-lightbox-img]').src = images[current];
        }
        if (e.key === 'ArrowLeft') {
          current = (current - 1 + images.length) % images.length;
          this.update(main, images, current);
          document.querySelector('[data-lightbox-img]').src = images[current];
        }
      });
    },

    update(main, images, index) {
      main.querySelector('img').src = images[index];
      document.querySelectorAll('[data-thumb-index]').forEach(thumb => {
        const i = parseInt(thumb.dataset.thumbIndex);
        thumb.classList.toggle('border-accent', i === index);
        thumb.classList.toggle('ring-1', i === index);
        thumb.classList.toggle('ring-accent/30', i === index);
        thumb.classList.toggle('opacity-60', i !== index);
      });
    }
  };


  /* ═══════════════════════════════════════════════════
     PRODUCT TABS
     ═══════════════════════════════════════════════════ */
  const ProductTabs = {
    init() {
      document.querySelectorAll('[data-tab-btn]').forEach(btn => {
        btn.addEventListener('click', () => {
          const tab = btn.dataset.tabBtn;

          // Update button states
          document.querySelectorAll('[data-tab-btn]').forEach(b => {
            b.classList.toggle('tab-active', b.dataset.tabBtn === tab);
            b.classList.toggle('tab-inactive', b.dataset.tabBtn !== tab);
          });

          // Update underline
          const underline = document.querySelector('[data-tab-underline]');
          if (underline) {
            const rect = btn.getBoundingClientRect();
            const container = btn.parentElement.getBoundingClientRect();
            underline.style.left = (rect.left - container.left) + 'px';
            underline.style.width = rect.width + 'px';
          }

          // Update content
          document.querySelectorAll('[data-tab-content]').forEach(content => {
            content.classList.toggle('hidden', content.dataset.tabContent !== tab);
          });
        });
      });

      // Init underline position
      const activeBtn = document.querySelector('[data-tab-btn].tab-active');
      if (activeBtn) {
        const underline = document.querySelector('[data-tab-underline]');
        if (underline) {
          const rect = activeBtn.getBoundingClientRect();
          const container = activeBtn.parentElement.getBoundingClientRect();
          underline.style.left = (rect.left - container.left) + 'px';
          underline.style.width = rect.width + 'px';
        }
      }
    }
  };


  /* ═══════════════════════════════════════════════════
     FAQ ACCORDION
     ═══════════════════════════════════════════════════ */
  const Accordion = {
    init() {
      document.querySelectorAll('[data-accordion-toggle]').forEach(btn => {
        btn.addEventListener('click', () => {
          const content = btn.nextElementSibling;
          const icon = btn.querySelector('[data-accordion-icon]');
          const isOpen = !content.classList.contains('hidden');

          // Close all others
          document.querySelectorAll('[data-accordion-toggle]').forEach(other => {
            if (other !== btn) {
              other.nextElementSibling?.classList.add('hidden');
              other.querySelector('[data-accordion-icon]')?.classList.remove('rotate-180');
            }
          });

          content.classList.toggle('hidden');
          icon?.classList.toggle('rotate-180');
        });
      });
    }
  };


  /* ═══════════════════════════════════════════════════
     COUNT UP ANIMATION
     ═══════════════════════════════════════════════════ */
  const CountUp = {
    init() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.countTo);
            const suffix = el.dataset.countSuffix || '';
            this.animate(el, target, suffix);
            observer.unobserve(el);
          }
        });
      }, { threshold: 0.5 });

      document.querySelectorAll('[data-count-to]').forEach(el => observer.observe(el));
    },

    animate(el, target, suffix) {
      const duration = 1500;
      const start = performance.now();
      function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
  };


  /* ═══════════════════════════════════════════════════
     SCROLL ANIMATIONS (Intersection Observer)
     ═══════════════════════════════════════════════════ */
  const ScrollAnimations = {
    init() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

      document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
    }
  };


  /* ═══════════════════════════════════════════════════
     MANTRA SPARKLE EFFECT
     ═══════════════════════════════════════════════════ */
  const MantraSparkle = {
    init() {
      document.querySelectorAll('[data-mantra]').forEach(el => {
        let lastSpawn = 0;
        el.addEventListener('mousemove', (e) => {
          const now = Date.now();
          if (now - lastSpawn < 50) return;
          lastSpawn = now;
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          for (let i = 0; i < 2 + Math.floor(Math.random() * 2); i++) {
            this.spawn(el, x, y);
          }
        });
      });
    },

    spawn(container, x, y) {
      const particle = document.createElement('span');
      const isStar = Math.random() > 0.6;
      particle.className = isStar ? 'sparkle-star' : 'sparkle-particle';
      const size = 3 + Math.random() * 5;
      const offsetX = (Math.random() - 0.5) * 30;
      const offsetY = (Math.random() - 0.5) * 20;
      particle.style.cssText = `left:${x + offsetX}px;top:${y + offsetY}px;width:${size}px;height:${size}px;`;
      container.appendChild(particle);
      setTimeout(() => particle.remove(), 800);
    }
  };


  /* ═══════════════════════════════════════════════════
     INITIALIZE ALL
     ═══════════════════════════════════════════════════ */
  document.addEventListener('DOMContentLoaded', () => {
    ThemeToggle.init();
    MobileMenu.init();
    NavScroll.init();
    CartDrawer.init();
    ProductAddToCart.init();
    CollectionFilters.init();
    ProductGallery.init();
    ProductTabs.init();
    Accordion.init();
    CountUp.init();
    ScrollAnimations.init();
    MantraSparkle.init();

    // Initial cart badge
    fetch('/cart.js').then(r => r.json()).then(cart => {
      CartDrawer.updateBadge(cart.item_count);
    }).catch(() => {});
  });

})();
