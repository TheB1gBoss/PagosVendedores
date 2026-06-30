// app.jsx — Pagos Vendedores · Empresa ↔ Socios (cierre mensual con arrastre)
const { useState, useRef, useEffect } = React;

/* ----------------------------- Icons ----------------------------- */
function Diamond({ size = 30, stroke = 1.5 }) {
  return (
    <svg className="diamond" width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth={stroke} strokeLinejoin="round" strokeLinecap="round">
      <path d="M6 3 H18 L22 9 L12 22 L2 9 Z" />
      <path d="M2 9 H22" /><path d="M6 3 L9 9 L12 22" /><path d="M18 3 L15 9 L12 22" /><path d="M9 9 H15" />
    </svg>
  );
}
const IconPlus = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>);
const IconPencil = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>);
const IconTrash = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6"/></svg>);
const IconCheck = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>);
const IconUndo = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M9 14 4 9l5-5"/><path d="M4 9h11a5 5 0 0 1 0 10h-3"/></svg>);
const IconConfirm = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>);
const IconX = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>);
const IconDownload = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12M7 11l5 4 5-4M5 21h14"/></svg>);
const IconImage = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2.5"/><circle cx="8.5" cy="8.5" r="1.8"/><path d="m21 15-5-5L5 21"/></svg>);
const IconPdf = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>);
const IconLock = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3.5" y="11" width="17" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>);
const IconBack = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>);
const IconArrow = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>);
const IconUserPlus = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/></svg>);
const IconMoon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>);
const IconSun = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8 6 18M18 6l1.8-1.8"/></svg>);
const IconLogout = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/></svg>);
const IconHistory = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/><path d="M12 7v5l3 2"/></svg>);

/* --------------------------- Formatting --------------------------- */
const fmtPlain = new Intl.NumberFormat("es-CL", { maximumFractionDigits: 0 });
const fmt = (n) => "$" + fmtPlain.format(Math.round(Math.abs(n)));
const today = () => new Date().toLocaleDateString("es-CL", { day: "2-digit", month: "long", year: "numeric" });
const uid = () => (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : (Date.now().toString(36) + Math.random().toString(36).slice(2));

const fmtDate = (ts) => ts ? new Date(ts).toLocaleDateString("es-CL", { day: "2-digit", month: "short" }) : "";
const fmtTime = (ts) => ts ? new Date(ts).toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" }) : "";
const fmtDateTime = (ts) => ts ? `${fmtDate(ts)}, ${fmtTime(ts)}` : "";
function relTime(ts) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 45) return "recién";
  const m = Math.floor(s / 60); if (m < 1) return "hace segundos"; if (m < 60) return `hace ${m} min`;
  const h = Math.floor(m / 60); if (h < 24) return `hace ${h} h`;
  const d = Math.floor(h / 24); if (d === 1) return "ayer"; if (d < 7) return `hace ${d} días`;
  return fmtDate(ts);
}

/* ----------------------------- Meses ------------------------------ */
const MESES = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
const pad2 = (n) => String(n).padStart(2, "0");
const curMonthKey = () => { const d = new Date(); return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}`; };
const nextMonth = (key) => { const [y, m] = key.split("-").map(Number); const d = new Date(y, m, 1); return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}`; };
function monthLabel(key) {
  const [y, m] = key.split("-").map(Number);
  const name = MESES[(m - 1 + 12) % 12] || "";
  return `${name.charAt(0).toUpperCase() + name.slice(1)} ${y}`;
}

/* ----------------------------- Firebase --------------------------- */
const fb = (() => {
  try {
    const cfg = window.firebaseConfig;
    const configured = cfg && cfg.apiKey && !String(cfg.apiKey).startsWith("TU_");
    if (!window.firebase || !configured) return null;
    if (!firebase.apps.length) firebase.initializeApp(cfg);
    return { auth: firebase.auth(), db: firebase.firestore() };
  } catch (e) { console.error("[Firebase] No se pudo inicializar:", e); return null; }
})();

function useAuth() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(!fb);
  useEffect(() => {
    if (!fb) return;
    return fb.auth.onAuthStateChanged((u) => { setUser(u); setReady(true); });
  }, []);
  return { user, ready };
}

// Acceso por usuario + contraseña → email sintético interno (hex, siempre válido).
const normalizeUsername = (u) => String(u).trim().replace(/\s+/g, " ");
function usernameToEmail(u) {
  const norm = normalizeUsername(u).toLowerCase();
  let hex = ""; for (const b of new TextEncoder().encode(norm)) hex += b.toString(16).padStart(2, "0");
  return "u" + hex + "@pagosvendedores.app";
}
const padPassword = (p) => { const s = String(p); return s.length >= 6 ? s : s.padEnd(6, "·"); };
async function signInWithUsername(username, password) {
  await fb.auth.signInWithEmailAndPassword(usernameToEmail(username), padPassword(password));
}
async function registerWithUsername(username, password) {
  const cred = await fb.auth.createUserWithEmailAndPassword(usernameToEmail(username), padPassword(password));
  if (cred && cred.user && cred.user.updateProfile) {
    try { await cred.user.updateProfile({ displayName: normalizeUsername(username) }); } catch (e) {}
  }
}
function translateAuthError(e) {
  switch (e && e.code) {
    case "auth/invalid-credential": case "auth/wrong-password": case "auth/user-not-found":
      return "Usuario o contraseña incorrectos.";
    case "auth/email-already-in-use": return "Ese usuario ya existe. Inicia sesión.";
    case "auth/weak-password": return "La contraseña debe tener al menos 6 caracteres.";
    case "auth/invalid-email": return "Usuario inválido. Usa solo letras y números.";
    case "auth/too-many-requests": return "Demasiados intentos. Espera un momento e inténtalo de nuevo.";
    case "auth/operation-not-allowed":
      return "El acceso con usuario y contraseña no está habilitado en Firebase (Authentication → Sign-in method → Email/Password).";
    case "auth/network-request-failed": return "Sin conexión. Revisa tu internet e inténtalo de nuevo.";
    default: return e && e.message ? e.message : "No se pudo iniciar sesión.";
  }
}

/* --------------------------- Datos semilla ------------------------ */
const DAY = 86400000;
const SEED_PARTNERS = ["Cris", "Amanda", "Martín", "Jamin", "Jordan", "Valentina"].map((n, i) => ({ id: "p" + (i + 1), name: n }));

function seedData(withDemo) {
  const month = curMonthKey();
  const ledgers = {};
  SEED_PARTNERS.forEach((p) => { ledgers[p.id] = { opening: 0, items: [] }; });
  if (withDemo) {
    ledgers["p1"] = { opening: 0, items: [
      { id: "s1", desc: "Mercadería entregada", amount: 120000, settled: false, createdAt: Date.now() - 4 * DAY },
      { id: "s2", desc: "Abono en efectivo",    amount: -50000, settled: false, createdAt: Date.now() - 1 * DAY },
    ] };
    ledgers["p2"] = { opening: -30000, items: [
      { id: "s3", desc: "Comisión ventas", amount: -15000, settled: false, createdAt: Date.now() - 2 * DAY },
    ] };
  }
  return { company: "Mi Empresa", partners: SEED_PARTNERS, openMonth: month,
           periods: { [month]: { closed: false, closedAt: null, ledgers } }, history: [] };
}

/* --------------------------- Helpers libro ------------------------ */
function partnerLedger(period, partnerId) {
  const pl = period && period.ledgers && period.ledgers[partnerId];
  return { opening: pl && pl.opening ? pl.opening : 0, items: pl && Array.isArray(pl.items) ? pl.items : [] };
}
function partnerNet(period, partnerId) {
  const { opening, items } = partnerLedger(period, partnerId);
  return opening + items.filter((i) => !i.settled).reduce((s, i) => s + i.amount, 0);
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "showDiamond": true
}/*EDITMODE-END*/;

/* ------------------------------ App ------------------------------- */
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const { user, ready } = useAuth();

  const [theme, setTheme] = useState(() => localStorage.getItem("bc-theme") || "light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("bc-theme", theme);
  }, [theme]);

  const initRef = useRef(null);
  if (!initRef.current) initRef.current = seedData(!fb);
  const INIT = initRef.current;

  const [company, setCompany] = useState(INIT.company);
  const [partners, setPartners] = useState(INIT.partners);
  const [openMonth, setOpenMonth] = useState(INIT.openMonth);
  const [periods, setPeriods] = useState(INIT.periods);
  const [history, setHistory] = useState(INIT.history);
  const [loaded, setLoaded] = useState(false);

  const [selectedMonth, setSelectedMonth] = useState(INIT.openMonth);
  const [view, setView] = useState({ screen: "overview", partnerId: null });
  const [showHistory, setShowHistory] = useState(false);

  // formulario de movimiento (en detalle)
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [side, setSide] = useState("empresa");
  const [newId, setNewId] = useState(null);
  const descRef = useRef(null);
  // edición de movimiento
  const [editId, setEditId] = useState(null);
  const [editDesc, setEditDesc] = useState("");
  const [editAmt, setEditAmt] = useState("");

  const skipSaveRef = useRef(false);
  const lastLocalEditRef = useRef(0);

  /* ---- Sincronización en vivo con Firestore ---- */
  useEffect(() => {
    if (!fb || !user) { setLoaded(false); return; }
    const ref = fb.db.collection("ledgers").doc(user.uid);
    const unsub = ref.onSnapshot((snap) => {
      if (snap.metadata.hasPendingWrites) return;
      if (!snap.exists) { setLoaded(true); return; }
      const data = snap.data();
      if (data.updatedAt && data.updatedAt < lastLocalEditRef.current) { setLoaded(true); return; }
      skipSaveRef.current = true;
      if (data.company) setCompany(data.company);
      if (Array.isArray(data.partners)) setPartners(data.partners);
      if (data.openMonth) setOpenMonth(data.openMonth);
      if (data.periods && typeof data.periods === "object") setPeriods(data.periods);
      setHistory(Array.isArray(data.history) ? data.history : []);
      setLoaded(true);
    }, (err) => { console.error("[Firestore] onSnapshot:", err); setLoaded(true); });
    return unsub;
  }, [user]);

  useEffect(() => {
    if (!fb || !user || !loaded) return;
    if (skipSaveRef.current) { skipSaveRef.current = false; return; }
    const stamp = lastLocalEditRef.current = Date.now();
    const h = setTimeout(() => {
      fb.db.collection("ledgers").doc(user.uid).set(
        { company, partners, openMonth, periods, history, updatedAt: stamp }, { merge: true }
      ).catch((e) => console.error("[Firestore] Error al guardar:", e));
    }, 600);
    return () => clearTimeout(h);
  }, [company, partners, openMonth, periods, history, user, loaded]);

  /* ---- Periodo activo ---- */
  const activeMonth = periods[selectedMonth] ? selectedMonth : openMonth;
  const period = periods[activeMonth] || { closed: false, ledgers: {} };
  const editable = !period.closed;
  const monthsList = Object.keys(periods).sort();

  /* ---- Historial ---- */
  function logEvent(type, text) {
    const entry = { id: uid(), ts: Date.now(), type, text, by: user ? (user.displayName || user.email || null) : null };
    setHistory((h) => [entry, ...h].slice(0, 300));
  }

  /* ---- Acciones de movimientos (sobre el periodo activo) ---- */
  function updateItems(partnerId, updater) {
    setPeriods((prev) => {
      const per = prev[activeMonth] || { closed: false, ledgers: {} };
      if (per.closed) return prev;
      const pl = partnerLedger(per, partnerId);
      return { ...prev, [activeMonth]: { ...per, ledgers: { ...per.ledgers, [partnerId]: { opening: pl.opening, items: updater(pl.items) } } } };
    });
  }
  const parseAmt = (v) => { const n = parseInt(String(v).replace(/[^\d]/g, ""), 10); return isNaN(n) ? 0 : n; };
  const canAdd = desc.trim().length > 0 && parseAmt(amount) > 0;
  const partnerOf = (id) => partners.find((p) => p.id === id);
  const sideName = (s, partnerName) => (s === "empresa" ? company : partnerName);

  function addMovement(partnerId) {
    if (!canAdd || !editable) return;
    const mag = parseAmt(amount);
    const d = desc.trim();
    const id = uid();
    updateItems(partnerId, (items) => [...items, { id, desc: d, amount: side === "empresa" ? mag : -mag, settled: false, createdAt: Date.now() }]);
    const pn = (partnerOf(partnerId) || {}).name || "socio";
    logEvent("add", `${pn} · "${d}" ${fmt(mag)} a favor de ${sideName(side, pn)}`);
    setNewId(id); setDesc(""); setAmount("");
    descRef.current && descRef.current.focus();
    setTimeout(() => setNewId(null), 400);
  }
  function removeMovement(partnerId, id) {
    let removed = null;
    updateItems(partnerId, (items) => items.filter((i) => { if (i.id === id) removed = i; return i.id !== id; }));
    const pn = (partnerOf(partnerId) || {}).name || "socio";
    if (removed) logEvent("delete", `${pn} · eliminó "${removed.desc}" ${fmt(removed.amount)}`);
  }
  function toggleSettled(partnerId, id) {
    let changed = null, willSettle = false;
    updateItems(partnerId, (items) => items.map((i) => {
      if (i.id !== id) return i;
      willSettle = !i.settled; changed = i;
      return { ...i, settled: !i.settled, settledAt: !i.settled ? Date.now() : null };
    }));
    const pn = (partnerOf(partnerId) || {}).name || "socio";
    if (changed) logEvent(willSettle ? "settle" : "reopen", `${pn} · ${willSettle ? "saldó" : "reabrió"} "${changed.desc}" ${fmt(changed.amount)}`);
  }
  function startEdit(it) { setEditId(it.id); setEditDesc(it.desc); setEditAmt(String(Math.abs(it.amount))); }
  function saveEdit(partnerId, it) {
    const mag = parseAmt(editAmt);
    if (!editDesc.trim() || mag <= 0) { setEditId(null); return; }
    const sign = it.amount < 0 ? -1 : 1;
    const nd = editDesc.trim();
    updateItems(partnerId, (items) => items.map((i) => i.id === it.id ? { ...i, desc: nd, amount: mag * sign } : i));
    const pn = (partnerOf(partnerId) || {}).name || "socio";
    if (nd !== it.desc || mag !== Math.abs(it.amount)) logEvent("edit", `${pn} · editó "${it.desc}" → ahora ${fmt(mag)}`);
    setEditId(null);
  }

  /* ---- Socios ---- */
  function addPartner(name) {
    const n = name.trim(); if (!n) return;
    const id = uid();
    setPartners((prev) => [...prev, { id, name: n }]);
    setPeriods((prev) => {
      const per = prev[openMonth] || { closed: false, ledgers: {} };
      return { ...prev, [openMonth]: { ...per, ledgers: { ...per.ledgers, [id]: { opening: 0, items: [] } } } };
    });
    logEvent("partner", `Agregó al socio "${n}"`);
  }
  function removePartner(id) {
    const p = partnerOf(id); if (!p) return;
    if (!window.confirm(`¿Eliminar al socio "${p.name}"? Se quitará de la lista.`)) return;
    setPartners((prev) => prev.filter((x) => x.id !== id));
    logEvent("partner", `Eliminó al socio "${p.name}"`);
    if (view.screen === "detail" && view.partnerId === id) setView({ screen: "overview", partnerId: null });
  }
  function renamePartner(id, name) {
    const n = name.trim(); if (!n) return;
    const prevP = partnerOf(id);
    setPartners((prev) => prev.map((x) => x.id === id ? { ...x, name: n } : x));
    if (prevP && prevP.name !== n) logEvent("rename", `Renombró "${prevP.name}" → "${n}"`);
  }
  function renameCompany(name) {
    const n = name.trim() || "Empresa";
    if (n !== company) { setCompany(n); logEvent("rename", `Renombró la empresa → "${n}"`); }
  }

  /* ---- Cierre de mes (arrastra saldos) ---- */
  function closeMonth() {
    if (activeMonth !== openMonth || period.closed) return;
    if (!window.confirm(`¿Cerrar ${monthLabel(openMonth)}? Los saldos pendientes de cada socio pasarán como saldo inicial a ${monthLabel(nextMonth(openMonth))}.`)) return;
    const next = nextMonth(openMonth);
    setPeriods((prev) => {
      const cur = prev[openMonth];
      const nextLedgers = {};
      partners.forEach((p) => { nextLedgers[p.id] = { opening: partnerNet(cur, p.id), items: [] }; });
      return { ...prev, [openMonth]: { ...cur, closed: true, closedAt: Date.now() }, [next]: { closed: false, closedAt: null, ledgers: nextLedgers } };
    });
    setOpenMonth(next); setSelectedMonth(next);
    setView({ screen: "overview", partnerId: null });
    logEvent("close", `Cerró ${monthLabel(openMonth)} y abrió ${monthLabel(next)}`);
  }

  /* ---- Navegación ---- */
  function openDetail(id) { setEditId(null); setDesc(""); setAmount(""); setSide("empresa"); setView({ screen: "detail", partnerId: id }); }
  function backToOverview() { setEditId(null); setView({ screen: "overview", partnerId: null }); }

  const themeToggle = (
    <button className="util-btn icon-only" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            title={theme === "dark" ? "Modo claro" : "Modo oscuro"}>
      {theme === "dark" ? <IconSun /> : <IconMoon />}
    </button>
  );

  if (fb && !ready) return <FullScreenLoader />;
  if (fb && !user) return <LoginScreen themeToggle={themeToggle} showDiamond={t.showDiamond} />;

  return (
    <div className="app-screen">
      <div className="wrap">
        <div className="util-bar">
          {fb && user && <UserChip user={user} />}
          <button className="util-btn" onClick={() => setShowHistory(true)} title="Ver historial de actividad">
            <IconHistory /> <span className="util-label">Historial</span>
          </button>
          {themeToggle}
          {fb && user && (
            <button className="util-btn icon-only" onClick={() => fb.auth.signOut()} title="Cerrar sesión"><IconLogout /></button>
          )}
        </div>

        {!fb && (
          <div className="local-banner">
            <span className="lb-dot" />
            <span>Modo local — los datos no se guardan. Configura <code>firebase-config.js</code> para activar el inicio de sesión y el guardado en la nube.</span>
          </div>
        )}

        <CompanyHeader company={company} showDiamond={t.showDiamond} onRename={renameCompany} />

        <PeriodBar months={monthsList} activeMonth={activeMonth} openMonth={openMonth} closed={period.closed}
                   onSelect={setSelectedMonth} onClose={closeMonth} />

        {view.screen === "overview" ? (
          <Overview company={company} partners={partners} period={period}
                    onOpen={openDetail} onAddPartner={addPartner} onRemovePartner={removePartner} />
        ) : (
          <PartnerDetail
            company={company} partner={partnerOf(view.partnerId)} period={period} activeMonth={activeMonth}
            editable={editable} onBack={backToOverview} onRename={(n) => renamePartner(view.partnerId, n)}
            desc={desc} setDesc={setDesc} amount={amount} setAmount={setAmount} side={side} setSide={setSide}
            parseAmt={parseAmt} fmtPlain={fmtPlain} canAdd={canAdd} addMovement={() => addMovement(view.partnerId)}
            descRef={descRef} newId={newId}
            editId={editId} startEdit={startEdit} saveEdit={(it) => saveEdit(view.partnerId, it)} setEditId={setEditId}
            editDesc={editDesc} setEditDesc={setEditDesc} editAmt={editAmt} setEditAmt={setEditAmt}
            removeItem={(id) => removeMovement(view.partnerId, id)} toggleSettled={(id) => toggleSettled(view.partnerId, id)} />
        )}

        <TweaksPanel>
          <TweakSection label="Marca" />
          <TweakToggle label="Ícono diamante" value={t.showDiamond} onChange={(v) => setTweak("showDiamond", v)} />
        </TweaksPanel>

        {showHistory && <HistoryModal history={history} onClose={() => setShowHistory(false)} />}
      </div>
    </div>
  );
}

/* ------------------------- Company header ------------------------- */
function CompanyHeader({ company, showDiamond, onRename }) {
  const [editing, setEditing] = useState(false);
  return (
    <header className="topbar">
      {showDiamond && <Diamond size={32} />}
      {editing
        ? <input className="company-input" autoFocus defaultValue={company}
                 onBlur={(e) => { onRename(e.target.value); setEditing(false); }}
                 onKeyDown={(e) => { if (e.key === "Enter") { onRename(e.target.value); setEditing(false); } if (e.key === "Escape") setEditing(false); }} />
        : <h1 className="brand-title" title="Toca para renombrar la empresa" onClick={() => setEditing(true)}>{company}</h1>}
      <div className="brand-sub">Libro de saldos &amp; cuentas</div>
      <div className="brand-rule" />
    </header>
  );
}

/* --------------------------- Period bar --------------------------- */
function PeriodBar({ months, activeMonth, openMonth, closed, onSelect, onClose }) {
  return (
    <div className="period-bar">
      <div className="period-left">
        <span className="period-eyebrow">Periodo</span>
        <div className="period-select-wrap">
          <select className="period-select" value={activeMonth} onChange={(e) => onSelect(e.target.value)}>
            {months.slice().sort().reverse().map((k) => (
              <option key={k} value={k}>{monthLabel(k)}{k === openMonth ? " · abierto" : " · cerrado"}</option>
            ))}
          </select>
        </div>
        {closed && <span className="period-badge">Cerrado</span>}
      </div>
      {activeMonth === openMonth && !closed && (
        <button className="btn-close-month" onClick={onClose} title="Cerrar este mes y comenzar el siguiente">
          <IconLock /> Cerrar mes
        </button>
      )}
    </div>
  );
}

/* ----------------------------- Overview --------------------------- */
function Overview({ company, partners, period, onOpen, onAddPartner, onRemovePartner }) {
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");

  const rows = partners.map((p) => ({ ...p, net: partnerNet(period, p.id) }));
  const totalDebenAEmpresa = rows.filter((r) => r.net > 0).reduce((s, r) => s + r.net, 0);
  const totalEmpresaDebe = rows.filter((r) => r.net < 0).reduce((s, r) => s + Math.abs(r.net), 0);

  function submitAdd() { const n = name.trim(); if (!n) return; onAddPartner(n); setName(""); setAdding(false); }

  return (
    <React.Fragment>
      <div className="totals">
        <div className="total-card">
          <div className="total-lbl">Le deben a {company}</div>
          <div className="total-val num up">{fmt(totalDebenAEmpresa)}</div>
        </div>
        <div className="total-card">
          <div className="total-lbl">{company} debe</div>
          <div className="total-val num down">{fmt(totalEmpresaDebe)}</div>
        </div>
      </div>

      <div className="ov-head">
        <span className="ov-title">Socios</span>
        <span className="ov-count num">{partners.length}</span>
      </div>

      <div className="pcards">
        {rows.length === 0 && <div className="empty">Sin socios. Agrega el primero abajo.</div>}
        {rows.map((r) => {
          const tone = r.net > 0 ? "up" : r.net < 0 ? "down" : "flat";
          const label = r.net > 0 ? `Te debe` : r.net < 0 ? `Le debes` : "Al día";
          return (
            <div className="pcard" key={r.id} onClick={() => onOpen(r.id)}>
              <div className="pcard-main">
                <div className="pcard-name">{r.name}</div>
                <div className={"pcard-status " + tone}>{label}</div>
              </div>
              <div className={"pcard-amount num " + tone}>{r.net === 0 ? "—" : fmt(r.net)}</div>
              <button className="pcard-del icon-btn" title="Eliminar socio"
                      onClick={(e) => { e.stopPropagation(); onRemovePartner(r.id); }}><IconTrash /></button>
              <span className="pcard-arrow"><IconArrow /></span>
            </div>
          );
        })}
      </div>

      <div className="add-partner">
        {adding ? (
          <div className="add-partner-row">
            <input className="input" autoFocus placeholder="Nombre del socio" value={name}
                   onChange={(e) => setName(e.target.value)}
                   onKeyDown={(e) => { if (e.key === "Enter") submitAdd(); if (e.key === "Escape") { setName(""); setAdding(false); } }} />
            <button className="btn-add" onClick={submitAdd}><IconPlus /> Agregar</button>
            <button className="util-btn icon-only" onClick={() => { setName(""); setAdding(false); }} title="Cancelar"><IconX /></button>
          </div>
        ) : (
          <button className="util-btn add-partner-btn" onClick={() => setAdding(true)}><IconUserPlus /> Agregar socio</button>
        )}
      </div>
    </React.Fragment>
  );
}

/* -------------------------- Partner detail ------------------------ */
function PartnerDetail(props) {
  const { company, partner, period, activeMonth, editable, onBack, onRename,
    desc, setDesc, amount, setAmount, side, setSide, parseAmt, fmtPlain, canAdd, addMovement, descRef, newId,
    editId, startEdit, saveEdit, setEditId, editDesc, setEditDesc, editAmt, setEditAmt, removeItem, toggleSettled } = props;

  const [editingName, setEditingName] = useState(false);
  const [busy, setBusy] = useState("");

  if (!partner) return <div className="empty">Socio no encontrado.</div>;

  const pl = partnerLedger(period, partner.id);
  const empresaItems = pl.items.filter((i) => i.amount > 0);
  const socioItems = pl.items.filter((i) => i.amount < 0);
  const empresaTotal = empresaItems.filter((i) => !i.settled).reduce((s, i) => s + i.amount, 0);
  const socioTotal = socioItems.filter((i) => !i.settled).reduce((s, i) => s + Math.abs(i.amount), 0);
  const net = partnerNet(period, partner.id);
  const winner = net > 0 ? "empresa" : net < 0 ? "socio" : "even";

  const rowProps = { editId, startEdit, saveEdit, editDesc, setEditDesc, editAmt, setEditAmt, setEditId, removeItem, toggleSettled, newId, editable };

  async function doExport(kind) {
    setBusy(kind);
    try {
      const base = `Estado ${partner.name} ${monthLabel(activeMonth)}`.replace(/[\\/:*?"<>|]/g, "-");
      await exportStatement(kind, base);
    } finally { setBusy(""); }
  }

  return (
    <React.Fragment>
      <div className="detail-head">
        <button className="util-btn icon-only" onClick={onBack} title="Volver"><IconBack /></button>
        <div className="detail-name-wrap">
          <div className="detail-eyebrow">Cuenta con {company}</div>
          {editingName
            ? <input className="company-input small" autoFocus defaultValue={partner.name}
                     onBlur={(e) => { onRename(e.target.value); setEditingName(false); }}
                     onKeyDown={(e) => { if (e.key === "Enter") { onRename(e.target.value); setEditingName(false); } if (e.key === "Escape") setEditingName(false); }} />
            : <div className="detail-name" title="Toca para renombrar" onClick={() => setEditingName(true)}>{partner.name}</div>}
        </div>
        <div className="export-bar">
          <button className="util-btn" disabled={!!busy} onClick={() => doExport("png")} title="Descargar imagen">
            <IconImage /> <span className="util-label">{busy === "png" ? "…" : "Imagen"}</span>
          </button>
          <button className="util-btn" disabled={!!busy} onClick={() => doExport("pdf")} title="Descargar PDF">
            <IconPdf /> <span className="util-label">{busy === "pdf" ? "…" : "PDF"}</span>
          </button>
        </div>
      </div>

      {!editable && <div className="readonly-note">Mes cerrado · solo lectura. Cámbiate al mes abierto para editar.</div>}

      {pl.opening !== 0 && (
        <div className="opening-line">
          <span>Saldo del mes anterior</span>
          <span className="num">{fmt(pl.opening)} a favor de {pl.opening > 0 ? company : partner.name}</span>
        </div>
      )}

      {editable && (
        <div className="form-card">
          <div className="form-row">
            <div className="field grow">
              <label className="field-label">Descripción</label>
              <input ref={descRef} className="input" value={desc} placeholder="Ej. Mercadería, Abono, Comisión…"
                     onChange={(e) => setDesc(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addMovement()} />
            </div>
            <div className="field money-field">
              <label className="field-label">Monto</label>
              <div className="money-wrap">
                <span className="money-prefix">$</span>
                <input className="input num" inputMode="numeric"
                       value={amount === "" ? "" : fmtPlain.format(parseAmt(amount))} placeholder="0"
                       onChange={(e) => setAmount(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addMovement()} />
              </div>
            </div>
            <div className="field">
              <label className="field-label">A favor de</label>
              <div className="seg" role="tablist">
                <button className={"seg-btn" + (side === "empresa" ? " active" : "")} onClick={() => setSide("empresa")}>
                  <span className="seg-dot fill" />{company}
                </button>
                <button className={"seg-btn" + (side === "socio" ? " active" : "")} onClick={() => setSide("socio")}>
                  <span className="seg-dot hollow" />{partner.name}
                </button>
              </div>
            </div>
            <button className="btn-add" disabled={!canAdd} onClick={addMovement}><IconPlus /> Agregar</button>
          </div>
        </div>
      )}

      <div className="ledger">
        <Column side="empresa" eyebrow="A favor de" name={company} items={empresaItems} total={empresaTotal} {...rowProps} />
        <Column side="socio" eyebrow="A favor de" name={partner.name} items={socioItems} total={socioTotal} {...rowProps} />
      </div>

      <div className="result">
        <div className="result-inner">
          <div className="result-left">
            <div className="result-label">Resultado · {monthLabel(activeMonth)}</div>
            {winner === "even"
              ? <div className="result-name">Cuentas al día</div>
              : <div className="result-name"><span className={"result-tick " + winner} />A favor de {winner === "empresa" ? company : partner.name}</div>}
          </div>
          <div className="result-amount num"><span className="cur">$</span>{fmtPlain.format(Math.abs(net))}</div>
        </div>
      </div>

      {/* Documento off-screen para exportar imagen/PDF */}
      <div id="statement-capture" className="sd-capture">
        <StatementDoc company={company} partner={partner} monthKey={activeMonth} opening={pl.opening} items={pl.items} net={net} />
      </div>
    </React.Fragment>
  );
}

/* ----------------------------- Column ----------------------------- */
function Column(props) {
  const { side, eyebrow, name, items, total, editId, startEdit, saveEdit,
    editDesc, setEditDesc, editAmt, setEditAmt, setEditId, removeItem, toggleSettled, newId, editable } = props;
  const open = items.filter((i) => !i.settled).length;
  return (
    <section className="col">
      <div className={"col-head " + side}>
        <div className="col-name-wrap">
          <span className={"col-tick " + side} />
          <div>
            <div className="col-eyebrow">{eyebrow}</div>
            <div className="col-name col-name-static">{name}</div>
          </div>
        </div>
        <div className="col-count num">{open} ítem{open === 1 ? "" : "s"}</div>
      </div>
      <div className="col-body">
        {items.length === 0
          ? <div className="empty">Sin movimientos</div>
          : items.map((it) => (
            <Row key={it.id} it={it} side={side} isNew={it.id === newId} isEditing={editId === it.id} editable={editable}
                 {...{ startEdit, saveEdit, editDesc, setEditDesc, editAmt, setEditAmt, setEditId, removeItem, toggleSettled }} />
          ))}
      </div>
      <div className="col-foot">
        <span className="lbl">Subtotal</span>
        <span className={"subtotal num " + side}>{fmt(total)}</span>
      </div>
    </section>
  );
}

/* ------------------------------ Row ------------------------------- */
function Row(props) {
  const { it, side, isNew, isEditing, editable, startEdit, saveEdit,
    editDesc, setEditDesc, editAmt, setEditAmt, setEditId, removeItem, toggleSettled } = props;

  if (isEditing) {
    return (
      <div className="ledger-row">
        <div className="edit-fields">
          <input className="edit-input desc" autoFocus value={editDesc}
                 onChange={(e) => setEditDesc(e.target.value)}
                 onKeyDown={(e) => { if (e.key === "Enter") saveEdit(it); if (e.key === "Escape") setEditId(null); }} />
          <input className="edit-input amt num" inputMode="numeric" value={editAmt}
                 onChange={(e) => setEditAmt(e.target.value.replace(/[^\d]/g, ""))}
                 onKeyDown={(e) => { if (e.key === "Enter") saveEdit(it); if (e.key === "Escape") setEditId(null); }} />
        </div>
        <div className="row-actions" style={{ opacity: 1 }}>
          <button className="icon-btn is-on" title="Guardar" onClick={() => saveEdit(it)}><IconConfirm /></button>
          <button className="icon-btn" title="Cancelar" onClick={() => setEditId(null)}><IconX /></button>
        </div>
      </div>
    );
  }

  return (
    <div className={"ledger-row" + (it.settled ? " settled" : "") + (isNew ? " is-new" : "")}>
      <div className="row-main">
        <div className="row-desc">
          {it.desc}
          {it.settled && <span className="saldado-tag">Saldado</span>}
        </div>
        {(it.settled ? it.settledAt : it.createdAt) && (
          <div className="row-date num">{it.settled ? `Saldado · ${fmtDate(it.settledAt)}` : fmtDate(it.createdAt)}</div>
        )}
      </div>
      <span className={"row-amount num " + side}>{fmt(it.amount)}</span>
      {editable && (
        <div className="row-actions">
          <button className={"icon-btn" + (it.settled ? " is-on" : "")} title={it.settled ? "Reabrir" : "Marcar como saldado"} onClick={() => toggleSettled(it.id)}>
            {it.settled ? <IconUndo /> : <IconCheck />}
          </button>
          <button className="icon-btn" title="Editar" onClick={() => startEdit(it)}><IconPencil /></button>
          <button className="icon-btn" title="Eliminar" onClick={() => removeItem(it.id)}><IconTrash /></button>
        </div>
      )}
    </div>
  );
}

/* ----------------------- Statement (export) ----------------------- */
async function exportStatement(kind, fileBase) {
  const node = document.getElementById("statement-capture");
  const target = node && node.firstChild ? node.firstChild : node;
  if (!target || !window.html2canvas) {
    alert("No se pudo generar el respaldo. Revisa tu conexión e inténtalo de nuevo.");
    return;
  }
  const canvas = await window.html2canvas(target, { scale: 2, backgroundColor: "#ffffff", useCORS: true });
  if (kind === "png") {
    const a = document.createElement("a");
    a.download = fileBase + ".png";
    a.href = canvas.toDataURL("image/png");
    a.click();
  } else {
    if (!window.jspdf || !window.jspdf.jsPDF) { alert("No se pudo generar el PDF. Revisa tu conexión."); return; }
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ unit: "pt", format: "a4" });
    const margin = 36;
    const pw = pdf.internal.pageSize.getWidth() - margin * 2;
    const ph = pdf.internal.pageSize.getHeight() - margin * 2;
    let w = pw, h = canvas.height * w / canvas.width;
    if (h > ph) { h = ph; w = canvas.width * h / canvas.height; }
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", margin + (pw - w) / 2, margin, w, h);
    pdf.save(fileBase + ".pdf");
  }
}

function StatementDoc({ company, partner, monthKey, opening, items, net }) {
  const active = items.filter((i) => !i.settled);
  const lines = [];
  if (opening !== 0) lines.push({ concept: "Saldo del mes anterior", date: "", e: opening > 0 ? opening : 0, s: opening < 0 ? -opening : 0 });
  active.forEach((i) => lines.push({ concept: i.desc, date: i.createdAt, e: i.amount > 0 ? i.amount : 0, s: i.amount < 0 ? -i.amount : 0 }));
  const eTotal = lines.reduce((s, l) => s + l.e, 0);
  const sTotal = lines.reduce((s, l) => s + l.s, 0);
  const note = net === 0 ? "No hay saldo pendiente entre las partes."
    : net > 0 ? `${partner.name} debe abonar este monto a ${company}.`
    : `${company} debe abonar este monto a ${partner.name}.`;

  return (
    <div className="sd">
      <div className="sd-head">
        <div className="sd-brand">
          <Diamond size={34} stroke={1.4} />
          <div>
            <div className="sd-title">{company}</div>
            <div className="sd-sub">Estado de cuenta · socio</div>
          </div>
        </div>
        <div className="sd-meta">
          <div className="sd-meta-row"><span>Socio</span><strong>{partner.name}</strong></div>
          <div className="sd-meta-row"><span>Periodo</span><strong>{monthLabel(monthKey)}</strong></div>
          <div className="sd-meta-row"><span>Emitido</span><strong>{today()}</strong></div>
        </div>
      </div>

      <div className="sd-section">Detalle de movimientos</div>
      <table className="sd-table">
        <thead>
          <tr><th className="n">#</th><th>Concepto</th><th className="r">A favor de {company}</th><th className="r">A favor de {partner.name}</th></tr>
        </thead>
        <tbody>
          {lines.map((l, idx) => (
            <tr key={idx}>
              <td className="n">{idx + 1}</td>
              <td className="desc">{l.concept}{l.date ? <span className="sd-date"> · {fmtDate(l.date)}</span> : null}</td>
              <td className="r">{l.e ? fmt(l.e) : "—"}</td>
              <td className="r">{l.s ? fmt(l.s) : "—"}</td>
            </tr>
          ))}
          {lines.length === 0 && <tr><td className="sd-note" colSpan="4">Sin movimientos en el periodo.</td></tr>}
        </tbody>
        <tfoot>
          <tr className="sd-sub-row"><td className="n"></td><td className="lbl">Subtotales</td><td className="r">{fmt(eTotal)}</td><td className="r">{fmt(sTotal)}</td></tr>
        </tfoot>
      </table>

      <div className="sd-net">
        <div>
          <div className="sd-net-lbl">Saldo del periodo</div>
          <div className="sd-net-name">{net === 0 ? "Cuentas al día" : "A favor de " + (net > 0 ? company : partner.name)}</div>
          <div className="sd-net-note">{note}</div>
        </div>
        <div className="sd-net-amount"><span className="cur">$</span>{fmtPlain.format(Math.abs(net))}</div>
      </div>

      <div className="sd-sign">
        <div className="s"><span className="line" /><span className="cap">{company}</span></div>
        <div className="s"><span className="line" /><span className="cap">{partner.name}</span></div>
      </div>
      <div className="sd-foot">Documento de respaldo generado con Pagos Vendedores · {today()}</div>
    </div>
  );
}

/* ------------------------- Auth screens --------------------------- */
function FullScreenLoader() {
  return (<div className="gate"><div className="spinner" /></div>);
}

function LoginScreen({ themeToggle, showDiamond }) {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const isRegister = mode === "register";

  async function submit(e) {
    if (e) e.preventDefault();
    setErr("");
    const u = username.trim();
    if (u.replace(/\s+/g, "").length < 2) { setErr("Escribe tu usuario."); return; }
    if (password.length < 1) { setErr("Escribe tu contraseña."); return; }
    setBusy(true);
    try {
      if (isRegister) await registerWithUsername(u, password);
      else await signInWithUsername(u, password);
    } catch (e2) {
      console.error("[Auth] Error al iniciar sesión:", e2);
      setErr(translateAuthError(e2));
      setBusy(false);
    }
  }

  return (
    <div className="gate gate-auth">
      <div className="gate-theme">{themeToggle}</div>
      <div className="gate-card">
        {showDiamond && <Diamond size={40} stroke={1.4} />}
        <div className="gate-title">Pagos Vendedores</div>
        <div className="gate-sub">Libro de saldos &amp; cuentas</div>
        <div className="gate-rule" />
        <div className="gate-text">
          {isRegister ? "Crea tu cuenta con un usuario y una contraseña." : "Ingresa con tu usuario y contraseña."}
        </div>
        <form className="gate-form" onSubmit={submit}>
          <input className="input" type="text" placeholder="Usuario" value={username}
                 autoComplete="username" autoCorrect="off" spellCheck="false"
                 onChange={(e) => setUsername(e.target.value)} />
          <input className="input" type="password" placeholder="Contraseña" value={password}
                 autoComplete={isRegister ? "new-password" : "current-password"}
                 onChange={(e) => setPassword(e.target.value)} />
          <button className="btn-google" type="submit" disabled={busy}>
            {busy ? "Un momento…" : (isRegister ? "Crear cuenta" : "Iniciar sesión")}
          </button>
        </form>
        <div className="gate-err">{err}</div>
        <button type="button" className="gate-switch" onClick={() => { setErr(""); setMode(isRegister ? "login" : "register"); }}>
          {isRegister ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Crear una"}
        </button>
      </div>
    </div>
  );
}

function UserChip({ user }) {
  const [imgOk, setImgOk] = useState(true);
  const label = user.displayName || (user.email ? user.email.replace(/@pagosvendedores\.app$/, "") : "Cuenta");
  const initial = (label.trim()[0] || "?").toUpperCase();
  return (
    <div className="user-chip" title={label}>
      {user.photoURL && imgOk
        ? <img className="uc-avatar" src={user.photoURL} alt="" referrerPolicy="no-referrer" onError={() => setImgOk(false)} />
        : <span className="uc-avatar fallback">{initial}</span>}
      <span className="uc-name">{label}</span>
    </div>
  );
}

/* -------------------------- History modal ------------------------- */
function HistoryModal({ history, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  const labels = { add: "Agregado", edit: "Editado", settle: "Saldado", reopen: "Reabierto", delete: "Eliminado", rename: "Renombrado", partner: "Socio", close: "Cierre" };
  return (
    <div className="hist-overlay" onClick={onClose}>
      <div className="hist-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Historial de actividad">
        <div className="hist-head">
          <div>
            <div className="hist-title">Historial</div>
            <div className="hist-sub">{history.length} {history.length === 1 ? "movimiento registrado" : "movimientos registrados"}</div>
          </div>
          <button className="icon-btn" title="Cerrar" onClick={onClose}><IconX /></button>
        </div>
        <div className="hist-body">
          {history.length === 0
            ? <div className="hist-empty">Aún no hay actividad. Cada acción quedará registrada aquí con su fecha y hora.</div>
            : history.map((e) => (
                <div className="hist-item" key={e.id}>
                  <span className={"hist-dot " + e.type} title={labels[e.type] || ""} />
                  <div className="hist-main">
                    <div className="hist-text">{e.text}</div>
                    <div className="hist-meta num">{relTime(e.ts)} · {fmtDateTime(e.ts)}{e.by ? " · " + e.by : ""}</div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
