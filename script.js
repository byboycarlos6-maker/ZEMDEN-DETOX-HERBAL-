/* ============================================================
   ZEMDEN DETOX HERBAL TEA — MAIN JS
   ============================================================ */

/* ---- COUNTDOWN TIMER ---- */
(function () {
  const DURATION_HOURS = 3;

  function getEndTime() {
    const key = 'zemden_cd_end';
    let end = parseInt(localStorage.getItem(key), 10);
    if (!end || end < Date.now()) {
      end = Date.now() + DURATION_HOURS * 60 * 60 * 1000;
      localStorage.setItem(key, end);
    }
    return end;
  }

  const endTime = getEndTime();

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const diff = Math.max(0, endTime - Date.now());
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    const cdH = document.getElementById('cd-hours');
    const cdM = document.getElementById('cd-minutes');
    const cdS = document.getElementById('cd-seconds');

    if (cdH) cdH.textContent = pad(h);
    if (cdM) cdM.textContent = pad(m);
    if (cdS) cdS.textContent = pad(s);

    if (diff === 0) {
      // Reset timer
      localStorage.removeItem('zemden_cd_end');
    }
  }

  tick();
  setInterval(tick, 1000);
})();

/* ---- FAQ ACCORDION ---- */
(function () {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(function (item) {
    const btn = item.querySelector('.faq-question');
    const ans = item.querySelector('.faq-answer');
    if (!btn || !ans) return;

    btn.addEventListener('click', function () {
      const isOpen = item.classList.contains('open');

      // Close all
      items.forEach(function (i) {
        i.classList.remove('open');
        const a = i.querySelector('.faq-answer');
        if (a) a.classList.remove('open');
        const b = i.querySelector('.faq-question');
        if (b) b.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        ans.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();

/* ---- SCROLL REVEAL ---- */
(function () {
  const revealEls = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
    return;
  }

  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealEls.forEach(function (el) { io.observe(el); });
})();

/* ---- ORDER FORM WITH HOTMART REDIRECT ---- */
function submitOrder(e) {
  e.preventDefault();

  var form    = document.getElementById('orderForm');
  var btn     = document.getElementById('submitOrderBtn');
  var loading = document.getElementById('formLoading');
  var nome    = document.getElementById('nome');
  var tel     = document.getElementById('telefone');
  var email   = document.getElementById('email');

  /* Basic validation */
  var emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!nome || nome.value.trim().length < 2) {
    showFieldError(nome, 'Please enter your full name.');
    return;
  }
  if (!tel || tel.value.trim().length < 7) {
    showFieldError(tel, 'Please enter a valid phone number.');
    return;
  }
  if (!email || !emailReg.test(email.value.trim())) {
    showFieldError(email, 'Please enter a valid email address.');
    return;
  }

  /* Show loading on button */
  if (btn) btn.classList.add('loading');

  /* Redirect after 1.5s */
  setTimeout(function () {
    if (form)    form.style.display    = 'none';
    if (loading) loading.classList.add('active');
    
    setTimeout(function() {
      window.location.href = 'https://pay.hotmart.com/I105031712P?checkoutMode=10';
    }, 1000);
  }, 1000);
}

function showFieldError(field, msg) {
  if (!field) return;
  field.style.borderColor = '#ef4444';
  field.focus();

  var existing = field.parentNode.querySelector('.field-error');
  if (existing) existing.remove();

  var err = document.createElement('p');
  err.className = 'field-error';
  err.textContent = msg;
  err.style.cssText = 'color:#ef4444;font-size:0.78rem;margin-top:4px;';
  field.parentNode.appendChild(err);

  field.addEventListener('input', function () {
    field.style.borderColor = '';
    if (err.parentNode) err.remove();
  }, { once: true });
}

/* ---- AUTO-SCROLL TESTIMONIALS ---- */
(function () {
  var feed = document.getElementById('whatsappFeed');
  if (!feed) return;

  var paused = false;
  feed.addEventListener('mouseenter', function () { paused = true; });
  feed.addEventListener('mouseleave', function () { paused = false; });
  feed.addEventListener('touchstart', function () { paused = true; }, { passive: true });

  // Smooth auto-scroll loop
  setInterval(function () {
    if (paused) return;
    if (feed.scrollTop + feed.clientHeight >= feed.scrollHeight - 5) {
      feed.scrollTop = 0;
    } else {
      feed.scrollTop += 1;
    }
  }, 30);
})();
