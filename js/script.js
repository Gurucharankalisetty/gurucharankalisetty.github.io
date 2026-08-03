/* =========================================================
   Kalisetty Guru Charan — Portfolio interactions
   ========================================================= */
(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Loader ---------- */
  const loader = document.getElementById('loader');
  const loaderCmd = document.getElementById('loaderCmd');
  const loaderText = 'connect --db portfolio';
  let li = 0;

  function typeLoader() {
    if (li <= loaderText.length) {
      loaderCmd.textContent = loaderText.slice(0, li);
      li++;
      setTimeout(typeLoader, 35);
    } else {
      setTimeout(() => {
        loader.classList.add('loaded');
        document.body.style.overflow = '';
        startHeroTyping();
      }, 350);
    }
  }
  document.body.style.overflow = 'hidden';
  if (prefersReducedMotion) {
    loader.classList.add('loaded');
    document.body.style.overflow = '';
  } else {
    typeLoader();
  }

  /* ---------- Scroll progress ---------- */
  const scrollProgress = document.getElementById('scrollProgress');
  function updateScrollProgress() {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
  }
  document.addEventListener('scroll', updateScrollProgress, { passive: true });

  /* ---------- Nav scroll state + active link ---------- */
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main .section, .hero');

  function updateNav() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }
  document.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
  sections.forEach(s => navObserver.observe(s));

  /* ---------- Mobile menu ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinksEl = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    const open = navLinksEl.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open);
  });
  navLinksEl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  }));

  /* ---------- Cursor glow ---------- */
  const cursorGlow = document.getElementById('cursorGlow');
  if (!prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      cursorGlow.classList.add('active');
    });
    document.addEventListener('mouseleave', () => cursorGlow.classList.remove('active'));
  }

  /* ---------- Hero terminal typing ---------- */
  const typedQuery = document.getElementById('typedQuery');
  const typeCursor = document.getElementById('typeCursor');
  const terminalResult = document.getElementById('terminalResult');
  const typedStack = document.getElementById('typedStack');
  const queryText = "SELECT * FROM analysts WHERE name = 'Kalisetty Guru Charan';";
  const stackText = 'SQL, Python, Power BI, Excel';

  function startHeroTyping() {
    if (prefersReducedMotion) {
      typedQuery.textContent = queryText;
      typedStack.textContent = stackText;
      terminalResult.classList.add('show');
      typeCursor.style.display = 'none';
      return;
    }
    let i = 0;
    (function type() {
      if (i <= queryText.length) {
        typedQuery.textContent = queryText.slice(0, i);
        i++;
        setTimeout(type, 22);
      } else {
        setTimeout(() => {
          typeCursor.style.display = 'none';
          terminalResult.classList.add('show');
          let j = 0;
          (function typeStack() {
            if (j <= stackText.length) {
              typedStack.textContent = stackText.slice(0, j);
              j++;
              setTimeout(typeStack, 18);
            }
          })();
        }, 400);
      }
    })();
  }
  if (prefersReducedMotion) startHeroTyping();

  /* ---------- Hero particles (lightweight canvas) ---------- */
  const canvas = document.getElementById('particles');
  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let raf;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function initParticles() {
      const count = Math.min(50, Math.floor((canvas.width * canvas.height) / 24000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.6 + 0.6,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        o: Math.random() * 0.5 + 0.2
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${p.o})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }

    resize();
    initParticles();
    draw();
    window.addEventListener('resize', () => { resize(); initParticles(); });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');

        // Animate skill bars within revealed group
        entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.fill + '%';
        });

        // Animate stat counters
        entry.target.querySelectorAll('.stat-num').forEach(animateCounter);

        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  revealEls.forEach(el => revealObserver.observe(el));

  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const isDecimal = el.dataset.decimal === 'true';
    const duration = 1200;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = isDecimal ? value.toFixed(2) : Math.round(value);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = isDecimal ? target.toFixed(2) : target;
    }
    requestAnimationFrame(step);
  }

  /* ---------- Button ripple ---------- */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* ---------- Back to top ---------- */
  document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* =========================================================
     Contact form — validation + EmailJS
     Replace the three placeholders below with your own EmailJS
     Service ID, Template ID and Public Key. See README for setup.
     ========================================================= */
  const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
  const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
  const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
  const EMAILJS_CONFIGURED = ![EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY]
    .some(v => v.startsWith('YOUR_'));

  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('contactSubmit');
  const formStatus = document.getElementById('formStatus');

  const validators = {
    name: v => v.trim().length >= 2 || 'Please enter your name.',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Please enter a valid email address.',
    subject: v => v.trim().length >= 3 || 'Please add a short subject.',
    message: v => v.trim().length >= 10 || 'Message should be at least 10 characters.'
  };

  function validateField(field) {
    const input = form.elements[field];
    const errorEl = document.getElementById('err-' + field);
    const result = validators[field](input.value);
    const valid = result === true;
    input.closest('.form-field').classList.toggle('invalid', !valid);
    errorEl.textContent = valid ? '' : result;
    return valid;
  }

  Object.keys(validators).forEach(field => {
    form.elements[field].addEventListener('blur', () => validateField(field));
    form.elements[field].addEventListener('input', () => {
      if (form.elements[field].closest('.form-field').classList.contains('invalid')) {
        validateField(field);
      }
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fields = Object.keys(validators);
    const allValid = fields.map(validateField).every(Boolean);
    if (!allValid) {
      formStatus.textContent = 'Please fix the highlighted fields.';
      formStatus.className = 'form-status error';
      return;
    }

    submitBtn.classList.add('is-loading');
    submitBtn.disabled = true;
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    const payload = {
      from_name: form.elements.name.value.trim(),
      from_email: form.elements.email.value.trim(),
      subject: form.elements.subject.value.trim(),
      message: form.elements.message.value.trim()
    };

    try {
      if (EMAILJS_CONFIGURED && window.emailjs) {
        await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, payload, EMAILJS_PUBLIC_KEY);
        formStatus.textContent = 'Message sent — thanks for reaching out! I\u2019ll reply soon.';
        formStatus.className = 'form-status success';
        form.reset();
      } else {
        // Fallback: open the user's email client with a pre-filled message
        const mailto = `mailto:gurucharankalisetty@gmail.com?subject=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(payload.message + '\n\n— ' + payload.from_name + ' (' + payload.from_email + ')')}`;
        window.location.href = mailto;
        formStatus.textContent = 'Opening your email app to send this message. (Connect EmailJS to send in-page — see README.)';
        formStatus.className = 'form-status success';
      }
    } catch (err) {
      formStatus.textContent = 'Something went wrong sending your message. Please try emailing directly instead.';
      formStatus.className = 'form-status error';
    } finally {
      submitBtn.classList.remove('is-loading');
      submitBtn.disabled = false;
    }
  });

})();
