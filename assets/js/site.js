/* Shared header, footer and site-wide settings.
   Edit CHURCH below to change the name, times, address or links everywhere at once. */

window.CHURCH = {
  name: "Redeemer Church",
  place: "Kailua-Kona, Hawaiʻi",
  confession: "Second London Baptist Confession of Faith (1689)",
  service: { day: "Lord's Day", time: "4:00 PM", note: "Keiki check-in opens at 3:45 PM" },
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

(function () {
  const C = window.CHURCH;
  const root = document.documentElement.dataset.root || "";
  const here = location.pathname.split("/").pop() || "index.html";

  const mark = `
    <svg class="brand-mark" viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="22.5" fill="none" stroke="currentColor" stroke-width="1"/>
      <circle cx="24" cy="24" r="19" fill="none" stroke="currentColor" stroke-width=".6" opacity=".6"/>
      <path d="M24 9v30M15 18h18" stroke="currentColor" stroke-width="2.2" stroke-linecap="square"/>
      <path d="M11 33c4-2.2 8.5-2.2 13 0s9 2.2 13 0" fill="none" stroke="currentColor" stroke-width="1.2"/>
    </svg>`;

  const brand = `
    <a class="brand" href="${root}index.html" aria-label="${C.name} home">
      ${mark}
      <span class="brand-text">
        <span class="brand-name">${C.name}</span>
        <span class="brand-sub">Reformed Baptist · Kona</span>
      </span>
    </a>`;

  const nav = [
    { label: "About", href: "about.html", children: [
      ["Who We Are", "about.html"],
      ["Our Confession (1689)", "beliefs.html"],
      ["Elders & Leadership", "leadership.html"],
      ["Ministry Partners", "about.html#partners"],
    ]},
    { label: "Visit", href: "visit.html", children: [
      ["Plan a Visit", "visit.html"],
      ["The Lord's Day", "visit.html#worship"],
      ["Contact", "visit.html#contact"],
    ]},
    { label: "Ministries", href: "ministries.html", children: [
      ["Keiki (Children)", "ministries.html#keiki"],
      ["Students", "ministries.html#students"],
      ["Community Groups", "ministries.html#groups"],
      ["Serve", "ministries.html#serve"],
      ["Hospitality & Mercy", "ministries.html#mercy"],
    ]},
    { label: "Sermons", href: "sermons.html" },
    { label: "Give", href: "give.html" },
  ];

  const isCurrent = (href) => href.split("#")[0] === here;

  const navHtml = nav.map((item) => {
    const current = isCurrent(item.href) ? ' aria-current="page"' : "";
    if (!item.children) return `<li><a class="nav-link" href="${root}${item.href}"${current}>${item.label}</a></li>`;
    const kids = item.children.map(([l, h]) => `<li><a href="${root}${h}">${l}</a></li>`).join("");
    return `<li><a class="nav-link" href="${root}${item.href}"${current}>${item.label}</a><ul class="dropdown">${kids}</ul></li>`;
  }).join("");

  const header = `
    <a class="skip" href="#main">Skip to content</a>
    <div class="topbar">
      <div class="wrap">
        <div class="tb-left">${C.service.day} Worship · ${C.service.time} · ${C.address.street}, Kailua-Kona</div>
        <div class="tb-right">
          <a href="tel:${C.phone.replace(/\D/g, "")}">${C.phone}</a>
          <a class="member-link" href="${root}members/login.html">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="1"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
            Members
          </a>
        </div>
      </div>
    </div>
    <header class="site-header">
      <div class="wrap">
        ${brand}
        <button class="menu-toggle" aria-expanded="false" aria-controls="site-nav">Menu</button>
        <nav class="nav" id="site-nav" aria-label="Main">
          <button class="menu-toggle nav-close" aria-label="Close menu">Close</button>
          <ul>${navHtml}</ul>
          <a class="btn" href="${root}visit.html">Plan a Visit</a>
        </nav>
      </div>
    </header>`;

  const year = new Date().getFullYear();
  const footer = `
    <footer class="site-footer">
      <div class="wrap">
        <div class="footer-grid">
          <div class="footer-brand">
            ${brand}
            <p class="footer-motto">Soli Deo Gloria</p>
            <p class="small">A confessional Reformed Baptist church holding to the ${C.confession}.</p>
          </div>
          <div>
            <h4>Gather</h4>
            <ul>
              <li>${C.service.day}s at ${C.service.time}</li>
              <li>${C.address.street}</li>
              <li>${C.address.city}</li>
              <li><a href="${C.mapsUrl}" target="_blank" rel="noopener">Directions →</a></li>
            </ul>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><a href="${root}beliefs.html">Our Confession</a></li>
              <li><a href="${root}leadership.html">Elders & Leadership</a></li>
              <li><a href="${root}ministries.html">Ministries</a></li>
              <li><a href="${root}sermons.html">Sermons</a></li>
              <li><a href="${root}give.html">Give</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href="tel:${C.phone.replace(/\D/g, "")}">${C.phone}</a></li>
              <li><a href="mailto:${C.email}">${C.email}</a></li>
              <li>${C.mailing}</li>
              <li><a href="${root}members/login.html">Member Login</a></li>
            </ul>
            <div class="socials">
              <a href="${C.instagram}" target="_blank" rel="noopener">Instagram</a>
              <a href="${C.youtube}" target="_blank" rel="noopener">YouTube</a>
            </div>
          </div>
        </div>
      </div>
      <div class="wrap footer-bottom">
        <span>© ${year} ${C.name}, ${C.place}</span>
        <span>Sola Scriptura · Sola Gratia · Sola Fide · Solus Christus · Soli Deo Gloria</span>
      </div>
    </footer>`;

  const h = document.getElementById("site-header");
  const f = document.getElementById("site-footer");
  if (h) h.outerHTML = header;
  if (f) f.outerHTML = footer;

  // Fill any [data-church="path.to.value"] placeholders
  document.querySelectorAll("[data-church]").forEach((el) => {
    const v = el.dataset.church.split(".").reduce((o, k) => (o ? o[k] : undefined), C);
    if (v !== undefined) el.textContent = v;
  });

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
