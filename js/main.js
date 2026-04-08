// ── CURSOR
const cursor = document.querySelector('.cursor');
const ring   = document.querySelector('.cursor-ring');
let rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  if(cursor){ cursor.style.left = e.clientX+'px'; cursor.style.top = e.clientY+'px'; }
  rx += (e.clientX - rx) * .18;
  ry += (e.clientY - ry) * .18;
  if(ring){ ring.style.left = e.clientX+'px'; ring.style.top = e.clientY+'px'; }
});
document.querySelectorAll('a,button').forEach(el => {
  el.addEventListener('mouseenter',()=>{ if(ring){ring.style.width='48px';ring.style.height='48px';} });
  el.addEventListener('mouseleave',()=>{ if(ring){ring.style.width='32px';ring.style.height='32px';} });
});

// ── ACTIVE NAV
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(a => {
  const href = a.getAttribute('href').split('/').pop();
  if(href === page) a.classList.add('active');
});

// ── HAMBURGER MENU
const hamburger = document.querySelector('.nav-hamburger');
const drawer    = document.querySelector('.nav-drawer');
if(hamburger && drawer){
  hamburger.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    // prevent body scroll when drawer is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  // Close on drawer link click
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      drawer.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
  // Close on outside click
  document.addEventListener('click', e => {
    if(!hamburger.contains(e.target) && !drawer.contains(e.target)){
      drawer.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

// ── SCROLL REVEAL
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal,.stagger').forEach(el => observer.observe(el));

// ── TERMINAL TYPING
function typeText(el, text, speed=38, cb) {
  let i = 0;
  el.textContent = '';
  const t = setInterval(() => {
    el.textContent += text[i++];
    if(i >= text.length){ clearInterval(t); if(cb) cb(); }
  }, speed);
}

// ── GLITCH TEXT on hover
document.querySelectorAll('.glitch').forEach(el => {
  const orig = el.dataset.text || el.textContent;
  const chars = '!<>-_\\/[]{}—=+*^?#@$%';
  el.addEventListener('mouseenter', () => {
    let iter = 0;
    const interval = setInterval(() => {
      el.textContent = orig.split('').map((c,i) => {
        if(i < iter) return orig[i];
        return chars[Math.floor(Math.random()*chars.length)];
      }).join('');
      if(iter >= orig.length) clearInterval(interval);
      iter += 1/2;
    }, 30);
  });
});

// ── COUNTER ANIMATION
function animateCounters() {
  document.querySelectorAll('.counter').forEach(el => {
    const target = parseInt(el.dataset.target);
    let curr = 0;
    const inc = Math.ceil(target / 50);
    const t = setInterval(() => {
      curr = Math.min(curr + inc, target);
      el.textContent = curr + (el.dataset.suffix || '');
      if(curr >= target) clearInterval(t);
    }, 30);
  });
}
const statsObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting){ animateCounters(); statsObs.disconnect(); } });
});
const statsEl = document.querySelector('.stats-row');
if(statsEl) statsObs.observe(statsEl);
