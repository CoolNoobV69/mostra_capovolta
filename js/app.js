/* Logica del sito "La mostra capovolta". Nessuna libreria, nessuna richiesta di rete. */
(function () {
  'use strict';
  var C = window.CONTENT;
  var app = document.getElementById('app');
  var navEl = document.getElementById('nav');
  var keysEl = document.getElementById('keys');
  var toastEl = document.getElementById('toast');
  var quickBtn = document.getElementById('quick');
  var state = { keys: {}, found: {}, quick: false };
  var views = {};
  var order = [];

  try {
    var saved = sessionStorage.getItem('mc_state');
    if (saved) { var s = JSON.parse(saved); if (s && s.keys) { state = s; } }
  } catch (e) {}
  function save() { try { sessionStorage.setItem('mc_state', JSON.stringify(state)); } catch (e) {} }

  function esc(t) {
    return String(t == null ? '' : t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function plain(markup) { return markup.replace(/\{\{\w+\|([^}]+)\}\}/g, '$1'); }
  function keysCount() { var n = 0; for (var k in state.keys) { if (state.keys[k]) n++; } return n; }
  function srcTag(s) { return s ? '<span class="src">[' + esc(s) + ']</span>' : ''; }

  function toast(msg) {
    toastEl.textContent = msg; toastEl.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { toastEl.hidden = true; }, 3200);
  }

  function updateKeys() {
    var out = '';
    for (var i = 1; i <= C.rooms.length; i++) { out += state.keys[i] ? '●' : '○'; }
    keysEl.textContent = 'Chiavi ' + out;
    keysEl.setAttribute('aria-label', 'Chiavi trovate: ' + keysCount() + ' su ' + C.rooms.length);
  }

  function labelsHTML(l) {
    var h = '<dl class="labels">';
    for (var k in l) { h += '<div><dt>' + esc(k) + '</dt><dd>' + esc(l[k]) + '</dd></div>'; }
    return h + '</dl>';
  }
  function factsHTML(f) {
    var h = '<ul class="facts">';
    f.forEach(function (x) { h += '<li>' + esc(x.text) + srcTag(x.src) + '</li>'; });
    return h + '</ul>';
  }
  function head(kick, title, lead) {
    return '<p class="kick">' + esc(kick) + '</p><h1 tabindex="-1">' + esc(title) + '</h1>' + (lead ? '<p class="lead">' + esc(lead) + '</p>' : '');
  }
  function makeView(id, label, html) {
    var v = document.createElement('section');
    v.className = 'view'; v.id = 'v-' + id; v.hidden = true; v.setAttribute('aria-label', label);
    v.innerHTML = '<div class="wrap">' + html + '</div>';
    app.appendChild(v);
    views[id] = v; order.push({ id: id, label: label });
    return v;
  }

  /* ---------- Ingresso ---------- */
  function buildGate() {
    var m = C.meta;
    makeView('gate', 'Ingresso',
      '<div class="gate"><p class="kick">' + esc(m.traccia) + '</p>' +
      '<h1 tabindex="-1">' + esc(m.title) + '</h1><p class="lead">' + esc(m.subtitle) + ' · ' + esc(m.school) + '</p>' +
      '<button type="button" class="door" data-go="stanza" aria-label="Uscita: entra nella Stanza 2027">USCITA</button>' +
      '<p class="note">' + esc(m.gateNote) + '</p></div>');
  }

  /* ---------- Stanza 2027 ---------- */
  function buildStanza() {
    var h = head('Stanza 2027', 'Messaggi bloccati', 'Cinque messaggi, ognuno chiuso da un lucchetto. Per leggerli devi sapere come funzionano. La chiave è nel 1937.') +
      '<p><span class="sim-badge">Simulazione didattica · gruppo inventato</span></p><div class="grid two" id="stanza-cards"></div>' +
      '<p><button type="button" class="primary" data-go="sala0">Torna al 1937</button></p>';
    var v = makeView('stanza', 'Stanza 2027', h);
    v.renderCards = function () {
      var box = v.querySelector('#stanza-cards'); var out = '';
      C.rooms.forEach(function (r) {
        var open = !!state.keys[r.key];
        out += '<article class="card sim ' + (open ? 'open' : 'locked') + '"><span class="tag">Messaggio ' + r.key + '</span>' +
          '<p class="txt"' + (open ? '' : ' aria-hidden="true"') + '>' + esc(plain(r.message)) + '</p>' +
          (open ? '<p class="lockmsg">Decodificato in ' + esc(r.title) + '</p>'
                : '<p class="lockmsg"><span class="sr">Messaggio bloccato. </span>Bloccato. Cerca la chiave n. ' + r.key + ' nella Sala ' + r.key + '.</p>') + '</article>';
      });
      box.innerHTML = out;
    };
    v.renderCards();
  }

  /* ---------- Sala 0 ---------- */
  function buildSala0() {
    var s = C.sala0;
    makeView('sala0', 'Sala 0', head('Contesto', s.title, s.lead) + factsHTML(s.facts) + '<h2>Cosa fa questa mostra</h2>' + labelsHTML(s.labels) +
      '<p><button type="button" class="primary" data-go="sala1">Entra nella Sala 1</button></p>');
  }

  /* ---------- Sale 1-5 ---------- */
  function buildRoom(r, idx) {
    var id = 'sala' + r.key;
    var total = (r.message.match(/\{\{/g) || []).length;
    var msgHTML = r.message.replace(/\{\{(\w+)\|([^}]+)\}\}/g, function (m, key, text) {
      return '<button type="button" class="hl" data-room="' + r.key + '" data-id="' + key + '">' + esc(text) + '</button>';
    }).replace(/^([^<]*)/, function (t) { return esc(t); });
    /* escape anche il testo tra i bottoni */
    msgHTML = r.message.split(/(\{\{\w+\|[^}]+\}\})/).map(function (part) {
      var m = part.match(/^\{\{(\w+)\|([^}]+)\}\}$/);
      if (m) { return '<button type="button" class="hl" data-room="' + r.key + '" data-id="' + m[1] + '">' + esc(m[2]) + '</button>'; }
      return esc(part);
    }).join('');
    var nextId = r.key < C.rooms.length ? 'sala' + (r.key + 1) : 'sala6';
    var h = head('Meccanismo ' + r.key + ' di ' + C.rooms.length, r.title, r.lead) + factsHTML(r.facts) +
      '<h2>Come funziona</h2>' + labelsHTML(r.labels) +
      '<h2>Smaschera il messaggio</h2><p class="col">Clicca sulle parti sottolineate del messaggio simulato: scopri quale meccanismo usano e da dove viene.</p>' +
      '<p><span class="sim-badge">Simulazione didattica · gruppo inventato</span></p><p class="msg">' + msgHTML + '</p>' +
      '<p class="progress" id="prog-' + r.key + '" aria-live="polite"></p><div class="reveals" id="rev-' + r.key + '"></div>' +
      '<div id="keybox-' + r.key + '"></div>' +
      '<p><button type="button" class="primary" data-go="' + nextId + '">' + (r.key < C.rooms.length ? 'Sala ' + (r.key + 1) : 'Confronto 1937 ↔ 2027') + '</button> ' +
      '<button type="button" class="ghost" data-go="stanza">Torna alla Stanza 2027</button></p>';
    var v = makeView(id, 'Sala ' + r.key, h);
    v.total = total;
    refreshRoom(r);
  }

  function refreshRoom(r) {
    var v = views['sala' + r.key]; if (!v) { return; }
    var found = state.found[r.key] || {};
    var n = 0; for (var k in found) { if (found[k]) { n++; } }
    var total = v.total;
    v.querySelector('#prog-' + r.key).textContent = n + ' di ' + total + ' meccanismi trovati';
    var rev = v.querySelector('#rev-' + r.key); var out = '';
    Object.keys(r.reveals).forEach(function (id) {
      if (found[id]) { out += '<div class="reveal">' + esc(r.reveals[id]) + '</div>'; }
    });
    rev.innerHTML = out;
    Array.prototype.forEach.call(v.querySelectorAll('button.hl'), function (b) {
      if (found[b.getAttribute('data-id')]) { b.classList.add('found'); }
    });
    var kb = v.querySelector('#keybox-' + r.key);
    kb.innerHTML = state.keys[r.key]
      ? '<p class="keybox">Chiave ' + r.key + ' ottenuta: il messaggio ' + r.key + ' nella Stanza 2027 è decodificato.</p><p class="col">' + esc(r.then) + '</p><p class="col"><em>' + esc(r.diff) + '</em></p>'
      : '';
  }

  function onHighlight(btn) {
    var key = parseInt(btn.getAttribute('data-room'), 10), id = btn.getAttribute('data-id');
    var r = C.rooms[key - 1];
    state.found[key] = state.found[key] || {}; state.found[key][id] = true;
    var total = views['sala' + key].total, n = 0;
    for (var k in state.found[key]) { if (state.found[key][k]) { n++; } }
    if (n >= total && !state.keys[key]) {
      state.keys[key] = true; toast('Chiave ' + key + ' ottenuta');
      views.stanza.renderCards(); updateKeys();
    }
    save(); refreshRoom(r);
  }

  /* ---------- Sala 6 ---------- */
  function buildSala6() {
    var s = C.sala6;
    var h = head('Confronto', s.title, s.lead);
    h += '<p><label><input type="checkbox" id="stackToggle"> Vista affiancata (senza cursore)</label></p>';
    C.rooms.forEach(function (r) {
      var then = r.facts.map(function (f) { return esc(f.text); }).slice(0, 1).join(' ');
      h += '<h2>' + esc(r.title.replace(/^Sala \d+ · /, '')) + '</h2>' +
        '<div class="cmp" data-cmp="' + r.key + '" style="--x:50%">' +
        '<div class="a"><span class="tag">1937</span><p>' + then + '</p></div>' +
        '<div class="b"><span class="tag">2027 · simulazione</span><p>' + esc(plain(r.message)) + '</p></div></div>' +
        '<input class="rng" type="range" min="0" max="100" value="50" data-cmprng="' + r.key + '" aria-label="Confronta 1937 e 2027: ' + esc(r.title) + '">' +
        '<p class="diff"><em>' + esc(r.diff) + '</em></p>';
    });
    h += '<h2>Cosa NON è uguale</h2><ul class="facts">' + s.notEqual.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
    h += '<h2>' + esc(s.fakesTitle) + '</h2><p class="col">' + esc(s.fakesLead) + '</p><div class="grid two quiz">';
    s.fakes.forEach(function (f, i) {
      h += '<div class="card item"><div>' + (f.img ? '<img src="' + esc(f.img) + '" alt="' + esc(f.caption) + '">' : '<div class="ph">Immagine: ' + esc(f.caption) + '</div>') + '</div>' +
        '<p>' + esc(f.caption) + '</p><div><button type="button" data-fake="' + i + '" data-ans="real">È vera</button> <button type="button" data-fake="' + i + '" data-ans="fake">È falsa</button></div>' +
        '<p class="fb" id="fb-' + i + '" aria-live="polite"></p></div>';
    });
    h += '</div><p><button type="button" class="primary" data-go="uscita">Verso l\'uscita</button></p>';
    makeView('sala6', 'Confronto', h);
  }

  /* ---------- Uscita ---------- */
  function buildUscita() {
    var u = C.uscita;
    var h = head('Uscita', u.title, u.lead) +
      '<div class="pause"><button type="button" class="primary" id="pauseBtn">Fai la Pausa (10 secondi)</button>' +
      '<div class="count" id="count" aria-live="polite" hidden></div>' +
      '<ul class="qs" id="qs" hidden>' + u.questions.map(function (q, i) { return '<li><label><input type="checkbox"> <span>' + esc(q) + '</span></label></li>'; }).join('') + '</ul></div>' +
      '<h2>L\'impegno della classe</h2><p class="col">' + esc(u.pledge) + '</p><h2>Crediti</h2><p class="col">' + esc(u.credits) + '</p>' +
      '<p><button type="button" data-go="fonti">Fonti</button></p>';
    var v = makeView('uscita', 'Uscita', h);
    var timer = null;
    v.querySelector('#pauseBtn').addEventListener('click', function () {
      var cnt = v.querySelector('#count'), qs = v.querySelector('#qs'), n = 10;
      cnt.hidden = false; qs.hidden = true; cnt.textContent = n;
      clearInterval(timer);
      timer = setInterval(function () {
        n--; cnt.textContent = n;
        if (n <= 0) { clearInterval(timer); cnt.hidden = true; qs.hidden = false; qs.querySelector('input').focus(); }
      }, 1000);
    });
  }

  /* ---------- Sala 7 ---------- */
  function buildTerritorio() {
    var t = C.territorio; if (!t || !t.enabled) { return; }
    makeView('territorio', 'Sala 7', head('Il nostro territorio', t.title, t.lead) + t.body.map(function (x) { return '<p class="col">' + esc(x) + '</p>'; }).join(''));
  }

  /* ---------- Fonti ---------- */
  function buildFonti() {
    makeView('fonti', 'Fonti', head('Fonti', 'Fonti e bibliografia', 'Ogni dato del sito rimanda a una di queste fonti. Controllate sempre sulla fonte originale.') +
      '<ol class="srcs">' + C.sources.map(function (s) {
        return '<li><strong>' + esc(s.id) + '</strong> · ' + esc(s.text) + (s.url ? ' <a href="' + esc(s.url) + '" rel="noopener noreferrer" target="_blank">apri</a>' : '') + '</li>';
      }).join('') + '</ol>');
  }

  /* ---------- Navigazione ---------- */
  function buildNav() {
    var out = '';
    order.forEach(function (o) { out += '<button type="button" data-go="' + o.id + '">' + esc(o.label) + '</button>'; });
    navEl.innerHTML = out;
  }
  function show(id) {
    if (!views[id]) { return; }
    for (var k in views) { views[k].hidden = (k !== id); }
    Array.prototype.forEach.call(navEl.querySelectorAll('button'), function (b) {
      if (b.getAttribute('data-go') === id) { b.setAttribute('aria-current', 'page'); b.scrollIntoView && b.scrollIntoView({ block: 'nearest', inline: 'center' }); }
      else { b.removeAttribute('aria-current'); }
    });
    document.title = (C.meta.title) + ' · ' + views[id].getAttribute('aria-label');
    window.scrollTo(0, 0);
    var h = views[id].querySelector('h1'); if (h) { h.focus({ preventScroll: true }); }
  }

  function setQuick(on) {
    state.quick = on;
    document.body.classList.toggle('quick', on);
    quickBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
    if (on) {
      C.rooms.forEach(function (r) {
        state.keys[r.key] = true; state.found[r.key] = {};
        (r.message.match(/\{\{(\w+)\|/g) || []).forEach(function (m) { state.found[r.key][m.replace(/\{\{|\|/g, '')] = true; });
        refreshRoom(r);
      });
      views.stanza.renderCards(); updateKeys(); toast('Lettura rapida: tutto sbloccato');
    }
    save();
  }

  /* ---------- Avvio ---------- */
  buildGate(); buildStanza(); buildSala0();
  C.rooms.forEach(buildRoom);
  buildSala6(); buildUscita(); buildTerritorio(); buildFonti(); buildNav();
  document.getElementById('brand-title').textContent = C.meta.title;
  document.getElementById('brand-sub').textContent = C.meta.subtitle;
  document.getElementById('foot-note').textContent = C.meta.footer;
  updateKeys();

  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-go],button.hl,[data-fake]') : null;
    if (!t) { return; }
    if (t.hasAttribute('data-go')) { show(t.getAttribute('data-go')); }
    else if (t.classList.contains('hl')) { onHighlight(t); }
    else if (t.hasAttribute('data-fake')) {
      var i = parseInt(t.getAttribute('data-fake'), 10), f = C.sala6.fakes[i];
      var ok = (t.getAttribute('data-ans') === 'fake') === !!f.isFake, fb = document.getElementById('fb-' + i);
      fb.className = 'fb ' + (ok ? 'ok' : 'no');
      fb.textContent = (ok ? 'Esatto. ' : 'Non proprio. ') + (f.isFake ? 'È falsa. ' : 'È vera. ') + f.explain;
    }
  });
  document.addEventListener('input', function (e) {
    var t = e.target;
    if (t.matches && t.matches('[data-cmprng]')) {
      var box = document.querySelector('[data-cmp="' + t.getAttribute('data-cmprng') + '"]');
      if (box) { box.style.setProperty('--x', t.value + '%'); }
    }
    if (t.id === 'stackToggle') {
      Array.prototype.forEach.call(document.querySelectorAll('.cmp'), function (c) { c.classList.toggle('stacked', t.checked); });
      Array.prototype.forEach.call(document.querySelectorAll('.rng'), function (r) { r.style.display = t.checked ? 'none' : ''; });
    }
  });
  quickBtn.addEventListener('click', function () { setQuick(!state.quick); });
  if (state.quick) { setQuick(true); }
  C.rooms.forEach(refreshRoom);
  show('gate');
})();
