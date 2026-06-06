// app.jsx — Balance Comercial
const { useState, useRef, useEffect } = React;

/* ----------------------------- Icons ----------------------------- */
function Diamond({ size = 30, stroke = 1.5 }) {
  return (
    <svg className="diamond" width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth={stroke} strokeLinejoin="round" strokeLinecap="round">
      <path d="M6 3 H18 L22 9 L12 22 L2 9 Z" />
      <path d="M2 9 H22" />
      <path d="M6 3 L9 9 L12 22" />
      <path d="M18 3 L15 9 L12 22" />
      <path d="M9 9 H15" />
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
const IconMoon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>);
const IconSun = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8 6 18M18 6l1.8-1.8"/></svg>);
const IconLogout = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/></svg>);
const GoogleG = () => (<svg className="g-ico" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>);
const IconHistory = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/><path d="M12 7v5l3 2"/></svg>);

/* --------------------------- Formatting --------------------------- */
const fmtPlain = new Intl.NumberFormat("es-CL", { maximumFractionDigits: 0 });
const fmt = (n) => "$" + fmtPlain.format(Math.round(Math.abs(n)));
const today = () => new Date().toLocaleDateString("es-CL", { day: "2-digit", month: "long", year: "numeric" });

const fmtDate = (ts) => ts ? new Date(ts).toLocaleDateString("es-CL", { day: "2-digit", month: "short" }) : "";
const fmtTime = (ts) => ts ? new Date(ts).toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" }) : "";
const fmtDateTime = (ts) => ts ? `${fmtDate(ts)}, ${fmtTime(ts)}` : "";
// Tiempo relativo legible para el historial ("hace 5 min", "ayer", …).
function relTime(ts) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 45) return "recién";
  const m = Math.floor(s / 60);
  if (m < 1) return "hace segundos";
  if (m < 60) return `hace ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `hace ${h} h`;
  const d = Math.floor(h / 24);
  if (d === 1) return "ayer";
  if (d < 7) return `hace ${d} días`;
  return fmtDate(ts);
}

/* ----------------------------- Firebase --------------------------- */
// Inicializa Firebase solo si firebase-config.js trae credenciales reales.
// Si sigue con los valores "TU_...", `fb` queda null y la app corre en modo
// local (sin login, sin guardado en la nube).
const fb = (() => {
  try {
    const cfg = window.firebaseConfig;
    const configured = cfg && cfg.apiKey && !String(cfg.apiKey).startsWith("TU_");
    if (!window.firebase || !configured) return null;
    if (!firebase.apps.length) firebase.initializeApp(cfg);
    return { auth: firebase.auth(), db: firebase.firestore() };
  } catch (e) {
    console.error("[Firebase] No se pudo inicializar:", e);
    return null;
  }
})();

// Suscripción al estado de sesión.
function useAuth() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(!fb); // sin Firebase: listo de inmediato
  useEffect(() => {
    if (!fb) return;
    return fb.auth.onAuthStateChanged((u) => { setUser(u); setReady(true); });
  }, []);
  return { user, ready };
}

async function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  await fb.auth.signInWithPopup(provider);
}

/* ----------------------------- Seed data -------------------------- */
const DAY = 86400000;
const SEED = [
  { id: 1, desc: "Cadena GF 18K",   amount:   3900, settled: false, createdAt: Date.now() - 5 * DAY },
  { id: 2, desc: "Ventas web",      amount: -200000, settled: false, createdAt: Date.now() - 4 * DAY },
  { id: 3, desc: "Insumos",         amount:  45000, settled: false, createdAt: Date.now() - 3 * DAY },
  { id: 4, desc: "Anticipo socio",  amount: -80000, settled: false, createdAt: Date.now() - 2 * DAY },
  { id: 5, desc: "Dijes plata 925", amount:  12500, settled: false, createdAt: Date.now() - 1 * DAY },
];

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

  // En modo local arrancamos con datos de ejemplo; con Firebase, vacío hasta
  // cargar el libro del usuario desde Firestore.
  const [items, setItems] = useState(fb ? [] : SEED);
  const [history, setHistory] = useState([]);   // registro de actividad
  const [loaded, setLoaded] = useState(false);  // datos de la nube ya cargados
  const [showHistory, setShowHistory] = useState(false);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [side, setSide] = useState("diego");
  const [newId, setNewId] = useState(null);

  const [names, setNames] = useState({ diego: "Diego", socio: "Socio" });
  const [editName, setEditName] = useState(null);

  const [editId, setEditId] = useState(null);
  const [editDesc, setEditDesc] = useState("");
  const [editAmt, setEditAmt] = useState("");

  const nextId = useRef(fb ? 1 : SEED.length + 1);
  const descRef = useRef(null);
  const skipSaveRef = useRef(false);   // evita re-guardar cambios recibidos del servidor
  const lastLocalEditRef = useRef(0);  // marca de tiempo de la última edición local

  /* ---- Sincronización en vivo con Firestore (un libro por usuario) ---- */
  // onSnapshot mantiene la app al día en tiempo real: cualquier cambio (en
  // otra pestaña, otro dispositivo o desde la consola) se refleja sin recargar.
  // skipSaveRef evita que un cambio recibido del servidor se vuelva a escribir
  // (eco) y genere un bucle infinito.
  useEffect(() => {
    if (!fb || !user) { setLoaded(false); return; }
    const ref = fb.db.collection("ledgers").doc(user.uid);
    const unsub = ref.onSnapshot((snap) => {
      // El eco optimista de nuestras propias escrituras llega con
      // hasPendingWrites=true; lo ignoramos (el estado local ya lo refleja).
      if (snap.metadata.hasPendingWrites) return;
      if (!snap.exists) { setLoaded(true); return; }
      const data = snap.data();
      // Ignora la confirmación de un guardado anterior si ya hicimos un cambio
      // local más nuevo (evita que un eco tardío pise datos recién editados).
      if (data.updatedAt && data.updatedAt < lastLocalEditRef.current) { setLoaded(true); return; }
      skipSaveRef.current = true; // viene del servidor → no reenviar
      setItems(Array.isArray(data.items) ? data.items : []);
      setHistory(Array.isArray(data.history) ? data.history : []);
      if (data.names) setNames(data.names);
      const maxId = (data.items || []).reduce((m, i) => Math.max(m, i.id || 0), 0);
      nextId.current = Math.max(nextId.current, maxId + 1);
      setLoaded(true);
    }, (err) => { console.error("[Firestore] onSnapshot:", err); setLoaded(true); });
    return unsub;
  }, [user]);

  // Guardar (con debounce) ante cualquier cambio, una vez cargado.
  useEffect(() => {
    if (!fb || !user || !loaded) return;
    if (skipSaveRef.current) { skipSaveRef.current = false; return; } // cambio remoto: no reescribir
    const stamp = lastLocalEditRef.current = Date.now();
    const h = setTimeout(() => {
      fb.db.collection("ledgers").doc(user.uid).set(
        { items, history, names, updatedAt: stamp }, { merge: true }
      ).catch((e) => console.error("[Firestore] Error al guardar:", e));
    }, 600);
    return () => clearTimeout(h);
  }, [items, history, names, user, loaded]);

  /* derived */
  const diegoItems = items.filter((i) => i.amount > 0);
  const socioItems = items.filter((i) => i.amount < 0);
  const diegoTotal = diegoItems.filter((i) => !i.settled).reduce((s, i) => s + i.amount, 0);
  const socioTotal = socioItems.filter((i) => !i.settled).reduce((s, i) => s + Math.abs(i.amount), 0);
  const net = diegoTotal - socioTotal;
  const winner = net > 0 ? "diego" : net < 0 ? "socio" : "even";
  const winnerName = winner === "diego" ? names.diego : winner === "socio" ? names.socio : null;

  /* actions */
  const parseAmt = (v) => { const n = parseInt(String(v).replace(/[^\d]/g, ""), 10); return isNaN(n) ? 0 : n; };
  const canAdd = desc.trim().length > 0 && parseAmt(amount) > 0;

  const sideName = (s) => (s === "diego" ? names.diego : names.socio);
  // Agrega un evento al historial (más reciente primero; se conservan 200).
  function logEvent(type, text) {
    const entry = {
      id: (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(36).slice(2),
      ts: Date.now(), type, text,
      by: user ? (user.displayName || user.email || null) : null,
    };
    setHistory((h) => [entry, ...h].slice(0, 200));
  }

  function addItem() {
    if (!canAdd) return;
    const mag = parseAmt(amount);
    const id = nextId.current++;
    const d = desc.trim();
    setItems((prev) => [...prev, { id, desc: d, amount: side === "diego" ? mag : -mag, settled: false, createdAt: Date.now() }]);
    logEvent("add", `Agregó "${d}" · ${fmt(mag)} a favor de ${sideName(side)}`);
    setNewId(id);
    setDesc(""); setAmount("");
    descRef.current && descRef.current.focus();
    setTimeout(() => setNewId(null), 400);
  }
  function removeItem(id) {
    const it = items.find((i) => i.id === id);
    setItems((p) => p.filter((i) => i.id !== id));
    if (it) logEvent("delete", `Eliminó "${it.desc}" · ${fmt(it.amount)} a favor de ${it.amount > 0 ? names.diego : names.socio}`);
  }
  function toggleSettled(id) {
    const it = items.find((i) => i.id === id);
    const willSettle = it && !it.settled;
    setItems((p) => p.map((i) => i.id === id
      ? { ...i, settled: !i.settled, settledAt: !i.settled ? Date.now() : null } : i));
    if (it) logEvent(willSettle ? "settle" : "reopen", `${willSettle ? "Saldó" : "Reabrió"} "${it.desc}" · ${fmt(it.amount)}`);
  }

  function startEdit(it) { setEditId(it.id); setEditDesc(it.desc); setEditAmt(String(Math.abs(it.amount))); }
  function saveEdit(it) {
    const mag = parseAmt(editAmt);
    if (!editDesc.trim() || mag <= 0) { setEditId(null); return; }
    const sign = it.amount < 0 ? -1 : 1;
    const newDesc = editDesc.trim();
    setItems((p) => p.map((i) => i.id === it.id ? { ...i, desc: newDesc, amount: mag * sign } : i));
    if (newDesc !== it.desc || mag !== Math.abs(it.amount)) {
      logEvent("edit", `Editó "${it.desc}"${newDesc !== it.desc ? ` → "${newDesc}"` : ""} · ahora ${fmt(mag)}`);
    }
    setEditId(null);
  }
  function commitName(key, val) {
    const v = val.trim();
    const final = v || (key === "diego" ? "Diego" : "Socio");
    const prev = names[key];
    setNames((n) => ({ ...n, [key]: final }));
    if (final !== prev) logEvent("rename", `Renombró "${prev}" → "${final}"`);
    setEditName(null);
  }

  const colProps = { editName, setEditName, commitName, editId, startEdit, saveEdit,
    editDesc, setEditDesc, editAmt, setEditAmt, setEditId, removeItem, toggleSettled, newId };

  const themeToggle = (
    <button className="util-btn icon-only" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            title={theme === "dark" ? "Modo claro" : "Modo oscuro"}>
      {theme === "dark" ? <IconSun /> : <IconMoon />}
    </button>
  );

  // Pantallas de control de sesión (solo cuando Firebase está configurado).
  if (fb && !ready) return <FullScreenLoader />;
  if (fb && !user) return <LoginScreen themeToggle={themeToggle} showDiamond={t.showDiamond} />;

  return (
    <React.Fragment>
      <div className="app-screen">
        <div className="wrap">
          <div className="util-bar">
            {fb && user && <UserChip user={user} />}
            <button className="util-btn" onClick={() => setShowHistory(true)} title="Ver historial de actividad">
              <IconHistory /> Historial
            </button>
            <button className="util-btn" onClick={() => window.print()} title="Exportar como PDF">
              <IconDownload /> Exportar PDF
            </button>
            {themeToggle}
            {fb && user && (
              <button className="util-btn icon-only" onClick={() => fb.auth.signOut()} title="Cerrar sesión">
                <IconLogout />
              </button>
            )}
          </div>

          {!fb && (
            <div className="local-banner">
              <span className="lb-dot" />
              <span>Modo local — los datos no se guardan. Configura <code>firebase-config.js</code> para activar el inicio de sesión y el guardado en la nube.</span>
            </div>
          )}

          <header className="topbar">
            {t.showDiamond && <Diamond size={32} />}
            <h1 className="brand-title">Pagos Vendedores</h1>
            <div className="brand-sub">Libro de saldos &amp; cuentas</div>
            <div className="brand-rule" />
          </header>

          {/* form */}
          <div className="form-card">
            <div className="form-row">
              <div className="field grow">
                <label className="field-label">Descripción</label>
                <input ref={descRef} className="input" value={desc} placeholder="Ej. Insumos, Cadenas, Ventas web…"
                       onChange={(e) => setDesc(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addItem()} />
              </div>
              <div className="field money-field">
                <label className="field-label">Monto</label>
                <div className="money-wrap">
                  <span className="money-prefix">$</span>
                  <input className="input num" inputMode="numeric"
                         value={amount === "" ? "" : fmtPlain.format(parseAmt(amount))} placeholder="0"
                         onChange={(e) => setAmount(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addItem()} />
                </div>
              </div>
              <div className="field">
                <label className="field-label">A favor de</label>
                <div className="seg" role="tablist">
                  <button className={"seg-btn" + (side === "diego" ? " active" : "")} onClick={() => setSide("diego")}>
                    <span className="seg-dot fill" />{names.diego}
                  </button>
                  <button className={"seg-btn" + (side === "socio" ? " active" : "")} onClick={() => setSide("socio")}>
                    <span className="seg-dot hollow" />{names.socio}
                  </button>
                </div>
              </div>
              <button className="btn-add" disabled={!canAdd} onClick={addItem}><IconPlus /> Agregar</button>
            </div>
          </div>

          {/* ledger */}
          <div className="ledger">
            <Column side="diego" eyebrow="A favor de" name={names.diego} items={diegoItems} total={diegoTotal} {...colProps} />
            <Column side="socio" eyebrow="A favor de" name={names.socio} items={socioItems} total={socioTotal} {...colProps} />
          </div>

          {/* result */}
          <div className="result">
            <div className="result-inner">
              <div className="result-left">
                <div className="result-label">Resultado · saldo neto</div>
                {winner === "even"
                  ? <div className="result-name">Cuentas equilibradas</div>
                  : <div className="result-name"><span className={"result-tick " + winner} />A favor de {winnerName}</div>}
              </div>
              <div className="result-amount num"><span className="cur">$</span>{fmtPlain.format(Math.abs(net))}</div>
            </div>
          </div>

          <TweaksPanel>
            <TweakSection label="Marca" />
            <TweakToggle label="Ícono diamante" value={t.showDiamond} onChange={(v) => setTweak("showDiamond", v)} />
          </TweaksPanel>

          {showHistory && <HistoryModal history={history} onClose={() => setShowHistory(false)} />}
        </div>
      </div>

      <PrintStatement names={names} diegoItems={diegoItems} socioItems={socioItems}
                      diegoTotal={diegoTotal} socioTotal={socioTotal} net={net}
                      winner={winner} winnerName={winnerName} showDiamond={t.showDiamond} />
    </React.Fragment>
  );
}

/* ------------------------- Auth screens --------------------------- */
function FullScreenLoader() {
  return (
    <div className="gate">
      <div className="spinner" />
    </div>
  );
}

function LoginScreen({ themeToggle, showDiamond }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function handleSignIn() {
    setErr(""); setBusy(true);
    try {
      await signInWithGoogle();
    } catch (e) {
      // El usuario cierra el popup → no es un error que mostrar.
      if (e && e.code === "auth/popup-closed-by-user") { setBusy(false); return; }
      console.error("[Auth] Error al iniciar sesión:", e);
      setErr(e && e.message ? e.message : "No se pudo iniciar sesión.");
      setBusy(false);
    }
  }

  return (
    <React.Fragment>
      <div className="util-bar" style={{ padding: "20px 24px 0", maxWidth: 1060, margin: "0 auto" }}>
        {themeToggle}
      </div>
      <div className="gate">
        <div className="gate-card">
          {showDiamond && <Diamond size={40} stroke={1.4} />}
          <div className="gate-title">Pagos Vendedores</div>
          <div className="gate-sub">Libro de saldos &amp; cuentas</div>
          <div className="gate-rule" />
          <div className="gate-text">Inicia sesión para acceder a tu libro de saldos y mantenerlo guardado en la nube.</div>
          <button className="btn-google" onClick={handleSignIn} disabled={busy}>
            <GoogleG />{busy ? "Conectando…" : "Continuar con Google"}
          </button>
          <div className="gate-err">{err}</div>
        </div>
      </div>
    </React.Fragment>
  );
}

function UserChip({ user }) {
  const [imgOk, setImgOk] = useState(true);
  const label = user.displayName || user.email || "Cuenta";
  const initial = (label.trim()[0] || "?").toUpperCase();
  return (
    <div className="user-chip" title={user.email || label}>
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

  const labels = { add: "Agregado", edit: "Editado", settle: "Saldado", reopen: "Reabierto", delete: "Eliminado", rename: "Renombrado" };

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
            ? <div className="hist-empty">Aún no hay actividad. Cada acción —agregar, editar, saldar, reabrir o eliminar— quedará registrada aquí con su fecha y hora.</div>
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

/* ----------------------------- Column ----------------------------- */
function Column(props) {
  const { side, eyebrow, name, items, total,
    editName, setEditName, commitName, editId, startEdit, saveEdit,
    editDesc, setEditDesc, editAmt, setEditAmt, setEditId, removeItem, toggleSettled, newId } = props;
  const open = items.filter((i) => !i.settled).length;

  return (
    <section className="col">
      <div className={"col-head " + side}>
        <div className="col-name-wrap">
          <span className={"col-tick " + side} />
          <div>
            <div className="col-eyebrow">{eyebrow}</div>
            {editName === side
              ? <input className="col-name-input" autoFocus defaultValue={name}
                       onBlur={(e) => commitName(side, e.target.value)}
                       onKeyDown={(e) => { if (e.key === "Enter") commitName(side, e.target.value); if (e.key === "Escape") setEditName(null); }} />
              : <div className="col-name" title="Toca para renombrar" onClick={() => setEditName(side)}>{name}</div>}
          </div>
        </div>
        <div className="col-count num">{open} ítem{open === 1 ? "" : "s"}</div>
      </div>

      <div className="col-body">
        {items.length === 0
          ? <div className="empty">Sin movimientos</div>
          : items.map((it) => (
            <Row key={it.id} it={it} side={side} isNew={it.id === newId} isEditing={editId === it.id}
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
  const { it, side, isNew, isEditing, startEdit, saveEdit,
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
          <div className="row-date num">
            {it.settled ? `Saldado · ${fmtDate(it.settledAt)}` : fmtDate(it.createdAt)}
          </div>
        )}
      </div>
      <span className={"row-amount num " + side}>{fmt(it.amount)}</span>
      <div className="row-actions">
        <button className={"icon-btn" + (it.settled ? " is-on" : "")} title={it.settled ? "Reabrir" : "Marcar como saldado"} onClick={() => toggleSettled(it.id)}>
          {it.settled ? <IconUndo /> : <IconCheck />}
        </button>
        <button className="icon-btn" title="Editar" onClick={() => startEdit(it)}><IconPencil /></button>
        <button className="icon-btn" title="Eliminar" onClick={() => removeItem(it.id)}><IconTrash /></button>
      </div>
    </div>
  );
}

/* ----------------------- Print statement ----------------------- */
function PrintStatement({ names, diegoItems, socioItems, diegoTotal, socioTotal, net, winner, winnerName, showDiamond }) {
  const openDiego = diegoItems.filter((i) => !i.settled);
  const openSocio = socioItems.filter((i) => !i.settled);
  const settled = [...diegoItems, ...socioItems].filter((i) => i.settled);
  // interleave so both columns read in order, with a running index
  const rows = Math.max(openDiego.length, openSocio.length);
  const lines = [];
  for (let r = 0; r < rows; r++) {
    if (openDiego[r]) lines.push({ k: "d", it: openDiego[r] });
    if (openSocio[r]) lines.push({ k: "s", it: openSocio[r] });
  }

  const note = winner === "even"
    ? "No hay saldo pendiente entre las partes."
    : (winner === "diego"
        ? `${names.socio} debe abonar este monto a ${names.diego}.`
        : `${names.diego} debe abonar este monto a ${names.socio}.`);

  return (
    <div className="print-statement">
      <div className="ps-head">
        <div className="ps-brand">
          <Diamond size={40} stroke={1.4} />
          <div>
            <div className="ps-title">Pagos Vendedores</div>
            <div className="ps-sub">Estado de cuenta comercial</div>
          </div>
        </div>
        <div className="ps-meta">
          <div className="ps-meta-row"><span>Fecha de emisión</span><strong>{today()}</strong></div>
          <div className="ps-meta-row"><span>Partes</span><strong>{names.diego} · {names.socio}</strong></div>
          <div className="ps-meta-row"><span>Movimientos</span><strong className="num">{openDiego.length + openSocio.length}</strong></div>
        </div>
      </div>

      <div className="ps-section-label">Detalle de movimientos</div>
      <table className="ps-table">
        <thead>
          <tr>
            <th className="n">#</th>
            <th>Concepto</th>
            <th className="r">A favor de {names.diego}</th>
            <th className="r">A favor de {names.socio}</th>
          </tr>
        </thead>
        <tbody>
          {lines.map(({ k, it }, idx) => (
            <tr key={it.id}>
              <td className="n num">{idx + 1}</td>
              <td className="desc">{it.desc}{it.createdAt ? <span className="ps-date"> · {fmtDate(it.createdAt)}</span> : null}</td>
              <td className="r num">{k === "d" ? fmt(it.amount) : "—"}</td>
              <td className="r num">{k === "s" ? fmt(it.amount) : "—"}</td>
            </tr>
          ))}
          {lines.length === 0 && (
            <tr><td className="ps-note" colSpan="4">Sin movimientos pendientes.</td></tr>
          )}
        </tbody>
        <tfoot>
          <tr className="subtotal-row">
            <td className="n"></td>
            <td className="lbl">Subtotales</td>
            <td className="r num">{fmt(diegoTotal)}</td>
            <td className="r num">{fmt(socioTotal)}</td>
          </tr>
        </tfoot>
      </table>

      <div className="ps-net">
        <div className="ps-net-left">
          <div className="ps-net-label">Saldo neto a la fecha</div>
          <div className="ps-net-name">{winner === "even" ? "Cuentas equilibradas" : "A favor de " + winnerName}</div>
          <div className="ps-net-note">{note}</div>
        </div>
        <div className="ps-net-amount num"><span className="cur">$</span>{fmtPlain.format(Math.abs(net))}</div>
      </div>

      {settled.length > 0 && (
        <div className="ps-settled">
          <div className="ps-section-label">Ítems saldados <span className="muted">(no computan en el saldo)</span></div>
          {settled.map((it) => (
            <div className="it" key={it.id}>
              <span>{it.desc} · a favor de {it.amount > 0 ? names.diego : names.socio}{it.settledAt ? ` · saldado ${fmtDate(it.settledAt)}` : ""}</span>
              <span className="num">{fmt(it.amount)}</span>
            </div>
          ))}
        </div>
      )}

      <div className="ps-sign">
        <div className="s"><span className="line" /><span className="cap">{names.diego}</span></div>
        <div className="s"><span className="line" /><span className="cap">{names.socio}</span></div>
      </div>
      <div className="ps-foot">Documento generado con Pagos Vendedores · {today()}</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
