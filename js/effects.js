/* ============================================================================
   effects.js — All interactive behavior. Runs after render.js, so every
   element it touches already exists.

   i18n contract with render.js:
     · The boot sequence runs ONCE on initial load (using the saved/default
       language) — by the time the user can toggle, boot has finished.
     · After boot, the typewriter, reveal observer, and click handlers all
       rebind on the `langchange` window event, because render.js replaces
       the inner HTML of every section. The achievement observer keeps its
       "seen" state across language switches (no spam).
   ========================================================================== */
(function (R) {
  "use strict";

  // shorthand
  var $ = function (id) { return document.getElementById(id); };
  // active language tree (always fresh)
  var T = function () { return R.t(); };

  /* ── boot sequence (runs once, in the initial language) ───────── */
  var boot = $('boot');
  var bootLines = T().boot.lines.map(function (l, i) {
    return { el: 'b' + i, t: l.text, hl: !!l.highlight };
  });
  var done = false;

  function endBoot() {
    if (done) return;
    done = true;
    $('b3').innerHTML = '<span class="grant">' + T().boot.grant + '</span>';
    $('bbar').style.width = '100%';
    setTimeout(function () {
      boot.classList.add('done');
      setTimeout(function () { boot.remove(); startTyped(); }, 650);
    }, 520);
  }

  function typeLine(i) {
    if (done) return;
    if (i >= bootLines.length) { progress(); return; }
    var L = bootLines[i], node = $(L.el);
    if (L.hl) node.classList.add('hl');
    var j = 0;
    (function step() {
      if (done) return;
      node.textContent = L.t.slice(0, j++);
      if (j <= L.t.length) setTimeout(step, 16);
      else { node.innerHTML += ' <span class="ok">[ok]</span>'; setTimeout(function () { typeLine(i + 1); }, 130); }
    })();
  }

  function progress() {
    var bar = $('bbar'), w = 0;
    var iv = setInterval(function () {
      if (done) { clearInterval(iv); return; }
      w += Math.random() * 16 + 7; if (w > 100) w = 100;
      bar.style.width = w + '%';
      if (w >= 100) { clearInterval(iv); setTimeout(endBoot, 260); }
    }, 120);
  }

  boot.addEventListener('click', endBoot);
  window.addEventListener('keydown', endBoot, { once: true });
  setTimeout(function () { typeLine(0); }, 350);
  setTimeout(endBoot, 9000); // safety: never trap the user

  /* ── typewriter (hero role) + EXP bar fill ─────────────────────── */
  var typeTimer = null;
  var expFilled = false;

  function stopTyped() {
    if (typeTimer) { clearTimeout(typeTimer); typeTimer = null; }
  }

  function startTyped() {
    stopTyped();
    var box = $('typed'); if (!box) return;

    // EXP bar fills once, the first time we start typing after boot
    if (!expFilled) {
      var ex = $('exp');
      if (ex) setTimeout(function () { ex.style.width = ex.dataset.fill || '100%'; }, 450);
      expFilled = true;
    }

    var phrases = T().hero.taglines;
    var p = 0, c = 0, deleting = false;
    (function tick() {
      var word = phrases[p];
      c += deleting ? -1 : 1;
      box.innerHTML = word.slice(0, c) + '<span class="cur">_</span>';
      var d = deleting ? 38 : 78;
      if (!deleting && c === word.length) { d = 1500; deleting = true; }
      else if (deleting && c === 0) { deleting = false; p = (p + 1) % phrases.length; d = 380; }
      typeTimer = setTimeout(tick, d);
    })();
  }

  /* ── nav: solid on scroll + mobile toggle (one-time bindings) ─── */
  var nav = $('nav');
  window.addEventListener('scroll', function () {
    nav.classList.toggle('solid', window.scrollY > 40);
  }, { passive: true });

  var navLinks = $('navLinks'), navToggle = $('navToggle');
  function setMenu(open) {
    navLinks.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  navToggle.addEventListener('click', function () { setMenu(!navLinks.classList.contains('open')); });
  navLinks.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });

  /* ── language toggle button ────────────────────────────────────── */
  var langBtn = $('langToggle');
  if (langBtn) langBtn.addEventListener('click', function () { R.toggle(); });

  /* ── content-bound effects (rebind on each render) ─────────────── */
  var revealObserver = null;
  var achievementObserver = null;
  var seenAch = {};

  function bindContentEffects() {
    // reveal observer — nodes are recreated each render, must reattach
    if (revealObserver) revealObserver.disconnect();
    revealObserver = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); revealObserver.unobserve(e.target); }
      });
    }, { threshold: .14 });
    document.querySelectorAll('.reveal').forEach(function (el) { revealObserver.observe(el); });

    // achievement observer — section elements (#about, #skills, …) are NOT
    // recreated, only their innerHTML. So we observe once and keep the
    // "seen" map so toasts don't refire on language toggle.
    if (!achievementObserver) {
      achievementObserver = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          var ach = T().achievements;
          if (e.isIntersecting && ach[e.target.id] && !seenAch[e.target.id]) {
            seenAch[e.target.id] = 1;
            toast(ach[e.target.id][0], ach[e.target.id][1]);
          }
        });
      }, { threshold: .45 });
      Object.keys(T().achievements).forEach(function (id) {
        var s = $(id); if (s) achievementObserver.observe(s);
      });
    }

    // crit-on-click handlers — rebind because .btn / .proj nodes are recreated
    document.querySelectorAll('.btn, .proj').forEach(function (el) {
      el.addEventListener('click', onCrit);   // duplicate listeners are deduped per node-fn pair
    });
  }
  function onCrit(e) { crit(e.clientX, e.clientY); }

  /* ── toast + crit (DOM helpers) ───────────────────────────────── */
  function toast(title, sub) {
    var t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = '<div class="ic">★</div><div><b>' + title + '</b><span>' + sub + '</span></div>';
    $('toasts').appendChild(t);
    requestAnimationFrame(function () { t.classList.add('show'); });
    setTimeout(function () { t.classList.remove('show'); setTimeout(function () { t.remove(); }, 450); }, 3200);
  }
  function crit(x, y) {
    var d = document.createElement('div');
    d.className = 'dmg'; d.textContent = '+999';
    d.style.left = x + 'px'; d.style.top = y + 'px';
    document.body.appendChild(d);
    setTimeout(function () { d.remove(); }, 900);
  }

  /* initial bind (sections were rendered by render.js before this script ran) */
  bindContentEffects();

  /* ── react to language change ─────────────────────────────────── */
  window.addEventListener('langchange', function (e) {
    bindContentEffects();   // reveal observer + crit handlers on fresh nodes
    startTyped();           // restart typewriter with the new phrases
    var msg = e.detail.t.langChangeToast || ['LANGUAGE PATCHED', ''];
    toast(msg[0], msg[1]);
  });

  /* ── Konami code → DEV MODE (one-time global key listener) ─────── */
  var seq = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65], pos = 0;
  window.addEventListener('keydown', function (e) {
    pos = (e.keyCode === seq[pos]) ? pos + 1 : (e.keyCode === seq[0] ? 1 : 0);
    if (pos === seq.length) {
      pos = 0;
      var on = document.body.classList.toggle('devmode');
      toast('DEV MODE', on ? 'reality.exe patched · aha~' : 'reverted to baseline');
    }
  });

})(window.PORTFOLIO_RENDER);
