/* ============================================================================
   render.js — Turns PORTFOLIO data into DOM. No content lives here; this is
   just the templates. Each section has one small, single-purpose renderer
   (separation of concerns), and shared markup is built once (DRY).

   This file is i18n-aware: it picks the active language tree, exposes a
   small API on window.PORTFOLIO_RENDER, and dispatches a "langchange" event
   on the window when the user toggles languages so effects.js can rebind.
   ========================================================================== */
(function (data) {
  "use strict";

  /* ── tiny helpers ──────────────────────────────────────────────── */
  var attr = function (s) { return String(s).replace(/"/g, "&quot;"); };
  var ext  = function (link) { return link.external ? ' target="_blank" rel="noopener"' : ""; };
  var fill = function (sel, html) { var n = document.querySelector(sel); if (n) n.innerHTML = html; };
  var list = function (items, tpl) { return items.map(tpl).join(""); };

  // a terminal card body of "$ prompt" / "# comment" lines (shared by about + contact)
  var termCard = function (title, lines) {
    return '' +
      '<div class="term reveal">' +
        '<div class="term-bar"><i class="r"></i><i class="y"></i><i class="g"></i>' +
          '<span>' + title + '</span></div>' +
        '<div class="term-body">' +
          list(lines, function (l) {
            return '<p' + (l.muted ? ' class="muted"' : '') + '>' + l.html + '</p>';
          }) +
        '</div>' +
      '</div>';
  };

  // a section header (eyebrow + title) — shared by every section (DRY)
  var header = function (eyebrow, titleHtml) {
    return '<div class="eyebrow">' + eyebrow + '</div>' +
           '<h2 class="title">' + titleHtml + '</h2>';
  };

  /* ── language selection (localStorage-persisted) ──────────────── */
  var STORAGE_KEY = "portfolio.lang";
  var supportedLangs = Object.keys(data.i18n);

  function readLang() {
    try {
      var s = localStorage.getItem(STORAGE_KEY);
      if (s && supportedLangs.indexOf(s) !== -1) return s;
    } catch (e) { /* private mode etc. */ }
    return data.defaultLang;
  }
  function writeLang(l) {
    try { localStorage.setItem(STORAGE_KEY, l); } catch (e) {}
  }

  /* ── full render: rebuilds every section from a language tree ─── */
  function render(t) {
    // <html lang> + document.title from the active tree
    document.documentElement.setAttribute("lang", (t.meta && t.meta.htmlLang) || data.defaultLang);
    if (t.meta && t.meta.title) document.title = t.meta.title;

    // nav: brand + language toggle + section links
    fill('[data-brand]',
      '<span class="dot"></span>' + data.brand.handle +
      '<span class="lvl">' + data.brand.level + '</span>');

    var ltBtn = document.getElementById('langToggle');
    if (ltBtn) {
      ltBtn.innerHTML = '[ ' + t.langSwitch.label + ' ]';
      if (t.langSwitch.aria) ltBtn.setAttribute('aria-label', t.langSwitch.aria);
    }

    fill('#navLinks',
      list(t.nav, function (n) { return '<a href="' + n.href + '">' + n.label + '</a>'; }));

    /* ── hero ──────────────────────────────────────────────────── */
    var h = t.hero;
    fill('[data-render="hero"]', '' +
      '<div class="greet">' + h.greet + '<span class="caret"></span></div>' +
      '<h1 class="glitch" data-text="' + attr(h.name) + '">' + h.name + '</h1>' +
      '<div class="role" id="typed"><span class="cur">_</span></div>' +
      '<p class="blurb">' + h.blurbHtml + '</p>' +
      '<div class="cta">' +
        list(h.ctas, function (c) {
          return '<a href="' + c.href + '" class="btn' + (c.primary ? ' primary' : '') + '">' + c.label + '</a>';
        }) +
      '</div>' +
      '<div class="stats">' +
        list(h.stats, function (s) {
          var bar = s.meter === 'exp'
            ? '<i id="exp" data-fill="' + attr(s.fill) + '"></i>'   // animated after boot
            : '<i style="width:' + attr(s.fill) + '"></i>';
          return '<div class="stat">' +
                   '<label><span>' + s.label + '</span><b>' + s.value + '</b></label>' +
                   '<div class="meter ' + s.meter + '">' + bar + '</div>' +
                 '</div>';
        }) +
      '</div>');

    /* ── about ─────────────────────────────────────────────────── */
    var a = t.about;
    fill('[data-render="about"]', header(a.eyebrow, a.titleHtml) + termCard(a.terminalTitle, a.lines));

    /* ── skills ────────────────────────────────────────────────── */
    var sk = t.skills;
    fill('[data-render="skills"]', header(sk.eyebrow, sk.titleHtml) +
      '<div class="skill-grid">' +
        list(sk.groups, function (g) {
          return '<div class="skill-card reveal"><h3>' + g.name + '</h3><div class="tags">' +
            list(g.tags, function (tag) { return '<span class="tag">' + tag + '</span>'; }) +
            '</div></div>';
        }) +
      '</div>');

    /* ── projects (meta line optional) ─────────────────────────── */
    var pr = t.projects;
    fill('[data-render="projects"]', header(pr.eyebrow, pr.titleHtml) +
      '<div class="proj-grid">' +
        list(pr.items, function (p) {
          // priority: links → note → nothing
          var bottomHtml = '';
          if (p.links && p.links.length) {
            bottomHtml = '<div class="links">' +
              list(p.links, function (l) { return '<a href="' + l.href + '"' + ext(l) + '>' + l.label + '</a>'; }) +
              '</div>';
          } else if (p.note) {
            bottomHtml = '<div class="note">' + p.note + '</div>';
          }
          return '<div class="proj reveal">' +
            '<div class="idx">' + p.idx + '</div>' +
            '<h3><span class="gx">' + p.title + '</span></h3>' +
            (p.meta ? '<div class="meta">' + p.meta + '</div>' : '') +
            '<p>' + p.desc + '</p>' +
            '<div class="stack">' + list(p.stack, function (s) { return '<span>' + s + '</span>'; }) + '</div>' +
            bottomHtml +
          '</div>';
        }) +
      '</div>');

    /* ── contact ───────────────────────────────────────────────── */
    var c = t.contact;
    fill('[data-render="contact"]', header(c.eyebrow, c.titleHtml) +
      termCard(c.terminalTitle, c.lines) +
      '<div class="contact-links">' +
        list(c.links, function (l) { return '<a href="' + l.href + '"' + ext(l) + '>' + l.label + '</a>'; }) +
      '</div>');

    /* ── footer ────────────────────────────────────────────────── */
    var year = new Date().getFullYear();
    fill('[data-render="footer"]',
      t.footer.textHtml.replace('{year}', year).replace('{handle}', data.brand.handle) +
      '<span class="hint">' + t.footer.hint + '</span>');
  }

  /* ── initial render + public API ──────────────────────────────── */
  var currentLang = readLang();
  render(data.i18n[currentLang]);

  window.PORTFOLIO_RENDER = {
    data: data,
    getLang: function () { return currentLang; },
    t: function () { return data.i18n[currentLang]; },
    setLang: function (l) {
      if (!data.i18n[l] || l === currentLang) return;
      currentLang = l;
      writeLang(l);
      render(data.i18n[l]);
      window.dispatchEvent(new CustomEvent('langchange', {
        detail: { lang: l, t: data.i18n[l] }
      }));
    },
    toggle: function () {
      var idx = supportedLangs.indexOf(currentLang);
      this.setLang(supportedLangs[(idx + 1) % supportedLangs.length]);
    },
  };

})(window.PORTFOLIO);
