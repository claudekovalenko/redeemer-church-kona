# Redeemer Church · Kailua-Kona

Website for a confessional Reformed Baptist church holding to the
Second London Baptist Confession of Faith (1689). Content and photos were
carried over from shorebreakchurch.com and rewritten in a Reformed voice.

Plain static HTML/CSS/JS — no build step. Open `index.html`, or serve the folder:

    python3 -m http.server 8000

## Pages

| Page | File |
| --- | --- |
| Home | `index.html` |
| About, distinctives, heritage timeline, ministry partners | `about.html` |
| What We Believe (Scripture, confessionalism, doctrines of grace, statement of faith) | `beliefs.html` |
| 1689 Confession reader: all 32 chapters / 160 paragraphs, search, modern or original spelling, Scripture proofs | `confession.html` |
| Baptist Catechism (1693), all 114 questions with practice mode | `catechism.html` |
| Elders, deacons, staff | `leadership.html` |
| Keiki, students, groups, serve, mercy | `ministries.html` |
| Sermons | `sermons.html` |
| Give | `give.html` |
| Plan a visit, order of worship, contact | `visit.html` |
| Member sign-in (Google, emailed link, or password) and access requests | `members/login.html` |
| Member portal (directory, prayer, calendar, documents, giving, elders' room) | `members/index.html` |

## Editing

- Church name, service time, address, phone, email and outside links live in the
  `CHURCH` object at the top of `assets/js/site.js`; the header and footer on every
  page are built from it.
- Styles: `assets/css/site.css` (colors and fonts are variables at the top).
- Photos: `assets/img/people` and `assets/img/photos`.
- Confession and catechism text: `assets/data/confession-1689.js` and
  `assets/data/baptist-catechism.js` (public-domain text; the Confession follows the
  symbolics.dev edition).

## Member login

`assets/js/auth.js` runs in **demo mode**: accounts are hard-coded and the session
lives in the browser, so it is **not secure** and must not hold real member data.
Demo accounts (choose "Use a password instead"): `member@demo.church` / `grace`,
`elder@demo.church` / `shepherd`. Google and emailed sign-in links only work once a real
provider is connected.

To go live, swap `DemoProvider` for a real auth service (Supabase, Firebase, Auth0,
or Planning Center) and set `AUTH_MODE = "live"`. The portal's directory, prayer
requests and documents also need a real data source at that point.

## Still to do

- Upload the constitution, membership covenant, catechism and minutes for the portal.
- Confirm the order of worship and Lord's Supper wording on `visit.html`.
- Update email addresses and Church Center links once the new domain is set up.
