/* Shared header, footer and site-wide settings.
   Edit CHURCH below to change the name, times, address or links everywhere at once. */

window.CHURCH = {
  name: "Redeemer Church",
  place: "Kailua-Kona, Hawaiʻi",
  confession: "Second London Baptist Confession of Faith (1689)",
  schedule: [
    { time: "4:00 pm", name: "Lord's Day Worship", desc: "Scripture reading, prayer, singing and preaching" },
    { time: "3:45 pm", name: "Keiki Check-in", desc: "Nursery through 4th grade" },
    { time: "Thu 6:00 pm", name: "Students", desc: "Middle and high school" },
  ],
  address: { street: "77-165 Lako St.", city: "Kailua-Kona, HI 96740" },
  mailing: "PO Box 2963, Kailua-Kona, HI 96745",
  phone: "808.756.9926",
  email: "aloha@shorebreakchurch.com",
  mapsUrl: "https://www.google.com/maps/place/77-165+Lako+St,+Kailua-Kona,+HI+96740",
  givingUrl: "https://shorebreakchurch.churchcenter.com/giving",
  groupsUrl: "https://shorebreakchurch.churchcenter.com/groups/community-groups",
  serveUrl: "https://shorebreakchurch.churchcenter.com/groups/servant-teams",
  youtube: "https://youtu.be/YcZIg3Mv7ls",
  spotify: "https://podcasters.spotify.com/pod/show/shorebreakchurch",
  apple: "https://podcasts.apple.com/ca/podcast/shorebreak-church/id562786242",
  instagram: "https://www.instagram.com/shorebreakchurch",
};

/* The church seal: a ringed emblem with an open Bible beneath the cross. */
window.churchSeal = function (cls = "seal", ringText = true) {
  const ring = ringText
    ? `<defs><path id="sealRing" d="M50 50 m-37 0 a37 37 0 1 1 74 0 a37 37 0 1 1 -74 0"/></defs>
       <text font-family="Cormorant Garamond, Georgia, serif" font-size="9.2" letter-spacing="2.4" fill="currentColor"><textPath href="#sealRing" startOffset="2%">REDEEMER CHURCH · KAILUA-KONA · HAWAII ·</textPath></text>`
    : "";
  return `<svg class="${cls}" viewBox="0 0 100 100" aria-hidden="true">
    <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" stroke-width="1.4"/>
    <circle cx="50" cy="50" r="44.5" fill="none" stroke="currentColor" stroke-width=".5"/>
    ${ring}
    <circle cx="50" cy="50" r="29" fill="none" stroke="currentColor" stroke-width=".8"/>
    <path d="M50 28v24M42 35h16" stroke="currentColor" stroke-width="2.6" stroke-linecap="square" fill="none"/>
    <path d="M30 58c7-3 14-3 20 1 6-4 13-4 20-1v12c-7-3-14-3-20 1-6-4-13-4-20-1z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M50 59v12" stroke="currentColor" stroke-width="1"/>
  </svg>`;
};

(function () {
  const C = window.CHURCH;
  const root = document.documentElement.dataset.root || "";
  const here = location.pathname.split("/").pop() || "index.html";
  const section = document.body.dataset.section || "";

  const brand = `
    <a class="brand" href="${root}index.html" aria-label="${C.name} home">
      ${churchSeal("seal", false)}
      <span class="brand-text">
        <span class="brand-name">${C.name}</span>
        <span class="brand-sub">Kailua-Kona · Hawaiʻi</span>
      </span>
    </a>`;

  const chev = `<svg class="chev" viewBox="0 0 10 10" aria-hidden="true"><path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>`;

  const nav = [
    { key: "visit", label: "Visit", href: "visit.html" },
    { key: "about", label: "About", href: "about.html", children: [
      ["What We Believe", "Scripture, sovereign grace, the solas", "beliefs.html"],
      ["Confession of Faith", "The historic confession we hold", "confession.html"],
      ["Baptist Catechism", "Questions and answers to learn by heart", "catechism.html"],
      ["Our Heritage", "Reformation and Particular Baptist roots", "about.html#heritage"],
      ["Leadership", "Elders, deacons and ministry leaders", "leadership.html"],
    ]},
    { key: "ministries", label: "Ministries", href: "ministries.html", children: [
      ["Keiki", "Children, nursery through 4th grade", "ministries.html#keiki"],
      ["Students", "Middle and high school, Thursdays", "ministries.html#students"],
      ["Community Groups", "Fellowship and Bible study in homes", "ministries.html#groups"],
      ["Serve", "Serving teams", "ministries.html#serve"],
      ["Mercy & Hospitality", "Meal train, kōkua, women's gatherings", "ministries.html#mercy"],
      ["Ministry Partners", "Gospel work near and far", "about.html#partners"],
    ]},
    { key: "sermons", label: "Sermons", href: "sermons.html" },
    { key: "give", label: "Give", href: "give.html" },
    { key: "members", label: "Members", href: "members/index.html", children: [
      ["Member Portal", "Sign-in required", "members/index.html"],
      ["Directory", "Sign-in required", "members/index.html#directory"],
      ["Member Resources", "Documents for members", "members/index.html#documents"],
    ]},
    { key: "contact", label: "Contact", href: "visit.html#contact" },
  ];

  const navHtml = nav.map((item) => {
    const current = (section === item.key || item.href === here) ? ' aria-current="page"' : "";
    if (!item.children) return `<li><a class="nav-link" href="${root}${item.href}"${current}>${item.label}</a></li>`;
    const kids = item.children.map(([l, d, h]) => `<li><a href="${root}${h}"><strong>${l}</strong><span>${d}</span></a></li>`).join("");
    return `<li><a class="nav-link" href="${root}${item.href}"${current}>${item.label}${chev}</a><ul class="dropdown">${kids}</ul></li>`;
  }).join("");

  const header = `
    <a class="skip" href="#main">Skip to content</a>
    <header class="site-header">
      <div class="wrap">
        ${brand}
        <button class="menu-toggle" aria-expanded="false" aria-controls="site-nav">Menu</button>
        <nav class="nav" id="site-nav" aria-label="Main">
          <button class="menu-toggle nav-close" aria-label="Close menu">Close</button>
          <ul>${navHtml}</ul>
          <a class="btn" href="${C.youtube}" target="_blank" rel="noopener">▸ Watch Live</a>
        </nav>
      </div>
    </header>`;

  const times = C.schedule.map((s) => `<li><span>${s.time}</span><span>${s.name}</span></li>`).join("");
  const year = new Date().getFullYear();
  const footer = `
    <footer class="site-footer">
      <div class="wrap">
        <div class="footer-grid">
          <div class="footer-brand">
            ${brand}
            <p>A church rooted in the Scriptures and the historic Reformed faith, gathered each Lord's Day to worship the Triune God.</p>
          </div>
          <div>
            <h4>The Lord's Day</h4>
            <ul class="times">${times}</ul>
          </div>
          <div>
            <h4>Visit</h4>
            <ul>
              <li>${C.address.street}</li>
              <li>${C.address.city}</li>
              <li style="margin-top:10px"><a href="tel:${C.phone.replace(/\D/g, "")}">${C.phone}</a></li>
              <li><a href="mailto:${C.email}">${C.email}</a></li>
              <li><a href="${C.mapsUrl}" target="_blank" rel="noopener">Directions →</a></li>
            </ul>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><a href="${root}beliefs.html">What We Believe</a></li>
              <li><a href="${root}confession.html">Confession of Faith</a></li>
              <li><a href="${root}catechism.html">Baptist Catechism</a></li>
              <li><a href="${root}leadership.html">Leadership</a></li>
              <li><a href="${root}sermons.html">Sermons &amp; Live Stream</a></li>
              <li><a href="${root}members/index.html">🔒 Member Portal</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="wrap footer-bottom">
        <span>© ${year} ${C.name} · ${C.address.street}, ${C.address.city}</span>
        <span class="sdg">Soli Deo Gloria</span>
      </div>
    </footer>`;

  const h = document.getElementById("site-header");
  const f = document.getElementById("site-footer");
  if (h) h.outerHTML = header;
  if (f) f.outerHTML = footer;

  // Seal watermarks and inline seals
  document.querySelectorAll("[data-seal]").forEach((el) => { el.outerHTML = churchSeal(el.dataset.seal || "seal", true); });

  // Header turns solid once you scroll past the photo
  const headerEl = document.querySelector(".site-header");
  if (document.body.classList.contains("has-hero") && headerEl) {
    const onScroll = () => headerEl.classList.toggle("scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Mobile menu
  const navEl = document.getElementById("site-nav");
  document.querySelectorAll(".menu-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const open = !navEl.classList.contains("open");
      navEl.classList.toggle("open", open);
      document.querySelectorAll(".menu-toggle").forEach((b) => b.setAttribute("aria-expanded", String(open)));
    });
  });
  navEl && navEl.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => navEl.classList.remove("open")));
})();
