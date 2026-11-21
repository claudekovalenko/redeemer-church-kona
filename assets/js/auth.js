/* Member authentication.
 *
 * The site is static, so real sign-in needs a backend. This file defines one small
 * interface (signIn / signUp / signOut / currentUser / resetPassword) and ships with a
 * DEMO provider so the member pages can be built and reviewed now.
 *
 * To go live, replace DemoProvider with a provider backed by a real auth service
 * (e.g. Supabase Auth, Firebase Auth, Auth0, or Planning Center login) and set
 * AUTH_MODE = "live". Nothing else in the members pages needs to change.
 *
 * DEMO MODE IS NOT SECURE: credentials and the session live in the browser only.
 */

const AUTH_MODE = "demo";

const DEMO_ACCOUNTS = [
  { email: "member@demo.church", password: "grace", name: "Demo Member", role: "member" },
  { email: "elder@demo.church", password: "shepherd", name: "Demo Elder", role: "elder" },
];

const SESSION_KEY = "rc-member-session";

function store() {
  try { return window.sessionStorage; } catch { return null; }
}

const DemoProvider = {
  async signIn(email, password) {
    const acct = DEMO_ACCOUNTS.find((a) => a.email === email.trim().toLowerCase() && a.password === password);
    if (!acct) throw new Error("That email and password don't match a member account.");
    const user = { email: acct.email, name: acct.name, role: acct.role };
    store()?.setItem(SESSION_KEY, JSON.stringify(user));
    return user;
  },
  async signUp({ name, email }) {
    // Membership requests go to the elders for approval rather than creating an account directly.
    return { pending: true, name, email };
  },
  async resetPassword(email) {
    return { sent: true, email };
  },
  async signOut() {
    store()?.removeItem(SESSION_KEY);
  },
  currentUser() {
    try { return JSON.parse(store()?.getItem(SESSION_KEY) || "null"); } catch { return null; }
  },
};

window.MemberAuth = Object.assign({ mode: AUTH_MODE }, DemoProvider);

/* Call on protected pages: sends visitors to the login page if nobody is signed in. */
window.requireMember = function (loginPath = "login.html") {
  const user = window.MemberAuth.currentUser();
  if (!user) {
    const next = encodeURIComponent(location.pathname.split("/").pop() + location.hash);
    location.replace(`${loginPath}?next=${next}`);
    return null;
  }
  return user;
};
