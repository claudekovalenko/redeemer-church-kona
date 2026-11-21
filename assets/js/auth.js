/* Member authentication.
 *
 * The site is static, so real sign-in needs a backend. This file defines one small
 * interface (signInWithGoogle / sendSignInLink / signIn / requestAccess / signOut /
 * currentUser) and ships with a DEMO provider so the member pages can be built and
 * reviewed now.
 *
 * To go live, replace DemoProvider with a provider backed by a real auth service
 * (Supabase Auth and Firebase Auth both support Google, emailed sign-in links and
 * passwords) and set AUTH_MODE = "live". Nothing else in the members pages changes.
 *
 * DEMO MODE IS NOT SECURE: accounts are written here and the session lives in the browser.
 */

const AUTH_MODE = "demo";

const DEMO_ACCOUNTS = [
  { email: "member@demo.church", password: "grace", name: "Demo Member", role: "member" },
  { email: "elder@demo.church", password: "shepherd", name: "Demo Elder", role: "elder" },
];

const SESSION_KEY = "rc-member-session";
const store = () => { try { return window.sessionStorage; } catch { return null; } };
const save = (u) => { store()?.setItem(SESSION_KEY, JSON.stringify(u)); return u; };

const DemoProvider = {
  async signInWithGoogle() {
    throw new Error("Google sign-in will work once the member system is connected. In demo mode, use a password instead.");
  },
  async sendSignInLink(email) {
    // A live provider emails a one-time link. The demo just confirms the request.
    return { sent: true, email };
  },
  async signIn(email, password) {
    const a = DEMO_ACCOUNTS.find((x) => x.email === String(email).trim().toLowerCase() && x.password === password);
    if (!a) throw new Error("That email and password don't match a member account.");
    return save({ email: a.email, name: a.name, role: a.role });
  },
  async requestAccess(details) {
    // Access requests go to the elders for approval rather than creating an account directly.
    return { pending: true, ...details };
  },
  async signOut() { store()?.removeItem(SESSION_KEY); },
  currentUser() {
    try { return JSON.parse(store()?.getItem(SESSION_KEY) || "null"); } catch { return null; }
  },
};

window.MemberAuth = Object.assign({ mode: AUTH_MODE }, DemoProvider);

/* Call on protected pages: sends visitors to the sign-in page if nobody is signed in. */
window.requireMember = function (loginPath = "login.html") {
  const user = window.MemberAuth.currentUser();
  if (!user) {
    const next = encodeURIComponent(location.pathname.split("/").pop() + location.hash);
    location.replace(`${loginPath}?next=${next}`);
    return null;
  }
  return user;
};
