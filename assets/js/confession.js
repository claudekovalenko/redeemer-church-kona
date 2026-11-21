/* 1689 Confession reader: index, search, and chapter view (#chapter-N). */
(function () {
  const DATA = window.CONFESSION_1689 || [];
  const ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI", "XXII", "XXIII", "XXIV", "XXV", "XXVI", "XXVII", "XXVIII", "XXIX", "XXX", "XXXI", "XXXII"];
  const $ = (id) => document.getElementById(id);
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const prefs = { ver: "modernized", proofs: true };
  try { Object.assign(prefs, JSON.parse(localStorage.getItem("rc-1689") || "{}")); } catch {}
  const savePrefs = () => { try { localStorage.setItem("rc-1689", JSON.stringify(prefs)); } catch {} };

  // Index + side nav
  $("ch-index").innerHTML = DATA.map((c) =>
    `<a href="#chapter-${c.n}"><span class="r">${ROMAN[c.n]}</span><span class="t">${esc(c.title)}</span><span class="c">${c.paragraphs.length} ¶</span></a>`).join("");
  $("reader-nav").innerHTML = DATA.map((c) =>
    `<a href="#chapter-${c.n}" data-n="${c.n}"><span>${ROMAN[c.n]}</span><span>${esc(c.title)}</span></a>`).join("");

  const plain = (t) => t.replace(/\{[a-z]+\}/g, "");
  const withMarks = (t) => esc(t).replace(/\{([a-z]+)\}/g, "<sup>$1</sup>");

  function renderChapter(n) {
    const c = DATA[n - 1];
    if (!c) return showIndex();
    $("ch-kicker").textContent = `Chapter ${ROMAN[n]}`;
    $("ch-title").textContent = c.title;
    $("ch-body").innerHTML = c.paragraphs.map((p) => {
      const v = p[prefs.ver] || p.modernized;
      const proofs = Object.entries(v.proofs || {}).map(([k, ref]) => `<li><b>${k}</b>${esc(ref)}</li>`).join("");
      const pid = `p-${p.n.replace(".", "-")}`;
      return `<div class="para" id="${pid}"><a class="pn" href="#chapter-${n}/${pid}">${p.n}</a><div><p class="text">${withMarks(v.text)}</p>${proofs ? `<ol class="proofs">${proofs}</ol>` : ""}</div></div>`;
    }).join("");
    const prev = DATA[n - 2], next = DATA[n];
    $("ch-pager").innerHTML =
      (prev ? `<a href="#chapter-${prev.n}"><small>← Chapter ${ROMAN[prev.n]}</small><span>${esc(prev.title)}</span></a>` : "") +
      (next ? `<a class="next" href="#chapter-${next.n}"><small>Chapter ${ROMAN[next.n]} →</small><span>${esc(next.title)}</span></a>` : "");
    document.querySelectorAll("#reader-nav a").forEach((a) => a.setAttribute("aria-current", String(a.dataset.n === String(n))));
    $("conf-index").hidden = true;
    $("conf-reader").hidden = false;
    document.title = `Chapter ${ROMAN[n]}: ${c.title} · 1689 Confession`;
  }

  function showIndex() {
    $("conf-index").hidden = false;
    $("conf-reader").hidden = true;
    document.title = "The 1689 Confession · Redeemer Church";
  }

  function applyPrefs() {
    $("reader").classList.toggle("no-proofs", !prefs.proofs);
    $("toggle-proofs").setAttribute("aria-pressed", String(prefs.proofs));
    document.querySelectorAll("[data-ver]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.ver === prefs.ver)));
  }

  function route() {
    const m = location.hash.match(/^#chapter-(\d+)(?:\/(p-[\d-]+))?/);
    if (m) {
      renderChapter(Number(m[1]));
      const target = m[2] ? document.getElementById(m[2]) : document.getElementById("conf-reader");
      if (target) target.scrollIntoView({ block: "start" });
    } else {
      showIndex();
      if (location.hash === "#index") $("conf-index").scrollIntoView({ block: "start" });
    }
  }

  document.querySelectorAll("[data-ver]").forEach((b) => b.addEventListener("click", () => {
    prefs.ver = b.dataset.ver; savePrefs(); applyPrefs(); route();
  }));
  $("toggle-proofs").addEventListener("click", () => { prefs.proofs = !prefs.proofs; savePrefs(); applyPrefs(); });

  // Search across every paragraph (modern spelling) and every chapter title
  let t;
  $("conf-q").addEventListener("input", (e) => {
    clearTimeout(t);
    t = setTimeout(() => {
      const q = e.target.value.trim().toLowerCase();
      const box = $("conf-results");
      if (q.length < 3) { box.hidden = true; $("ch-index").hidden = false; return; }
      const hits = [];
      DATA.forEach((c) => c.paragraphs.forEach((p) => {
        const txt = plain(p.modernized.text);
        const i = txt.toLowerCase().indexOf(q);
        if (i > -1 || c.title.toLowerCase().includes(q)) hits.push({ c, p, txt, i: Math.max(i, 0) });
      }));
      const re = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
      box.innerHTML = `<p class="muted small">${hits.length} paragraph${hits.length === 1 ? "" : "s"} found</p>` + hits.slice(0, 60).map(({ c, p, txt, i }) => {
        const start = Math.max(0, i - 90);
        const snip = (start ? "…" : "") + txt.slice(start, i + 180) + (i + 180 < txt.length ? "…" : "");
        return `<div class="hit"><a href="#chapter-${c.n}/p-${p.n.replace(".", "-")}"><small>${p.n} · ${esc(c.title)}</small><div>${esc(snip).replace(re, (m) => `<mark>${m}</mark>`)}</div></a></div>`;
      }).join("");
      box.hidden = false;
      $("ch-index").hidden = true;
    }, 120);
  });

  window.addEventListener("hashchange", route);
  applyPrefs();
  route();
})();
