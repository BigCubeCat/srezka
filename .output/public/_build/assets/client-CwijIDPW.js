const te = {
  context: void 0,
  registry: void 0,
  effects: void 0,
  done: !1,
  getContextId() {
    return Ru(this.context.count);
  },
  getNextContextId() {
    return Ru(this.context.count++);
  },
};
function Ru(n) {
  const t = String(n),
    e = t.length - 1;
  return te.context.id + (e ? String.fromCharCode(96 + e) : "") + t;
}
function zu(n) {
  te.context = n;
}
function Cc() {
  return { ...te.context, id: te.getNextContextId(), count: 0 };
}
const Fc = (n, t) => n === t,
  Oo = { equals: Fc };
let _a = null,
  jc = wl;
const zr = 1,
  Eo = 2,
  ml = { owned: null, cleanups: null, context: null, owner: null };
var Ne = null;
let Bs = null,
  Oc = null,
  Re = null,
  an = null,
  xr = null,
  Do = 0;
function Ec(n, t) {
  const e = Re,
    i = Ne,
    s = n.length === 0,
    a = t === void 0 ? i : t,
    l = s
      ? ml
      : {
          owned: null,
          cleanups: null,
          context: a ? a.context : null,
          owner: a,
        },
    c = s ? n : () => n(() => $i(() => Ca(l)));
  (Ne = l), (Re = null);
  try {
    return ja(c, !0);
  } finally {
    (Re = e), (Ne = i);
  }
}
function ri(n, t) {
  t = t ? Object.assign({}, Oo, t) : Oo;
  const e = {
      value: n,
      observers: null,
      observerSlots: null,
      comparator: t.equals || void 0,
    },
    i = (s) => (typeof s == "function" && (s = s(e.value)), bl(e, s));
  return [vl.bind(e), i];
}
function Ia(n, t, e) {
  const i = uu(n, t, !1, zr);
  Ro(i);
}
function Mc(n, t, e) {
  e = e ? Object.assign({}, Oo, e) : Oo;
  const i = uu(n, t, !0, 0);
  return (
    (i.observers = null),
    (i.observerSlots = null),
    (i.comparator = e.equals || void 0),
    Ro(i),
    vl.bind(i)
  );
}
function $i(n) {
  if (Re === null) return n();
  const t = Re;
  Re = null;
  try {
    return n();
  } finally {
    Re = t;
  }
}
function Bc(n) {
  return (
    Ne === null ||
      (Ne.cleanups === null ? (Ne.cleanups = [n]) : Ne.cleanups.push(n)),
    n
  );
}
function qc(n, t) {
  _a || (_a = Symbol("error")),
    (Ne = uu(void 0, void 0, !0)),
    (Ne.context = { ...Ne.context, [_a]: [t] });
  try {
    return n();
  } catch (e) {
    zo(e);
  } finally {
    Ne = Ne.owner;
  }
}
function vl() {
  if (this.sources && this.state)
    if (this.state === zr) Ro(this);
    else {
      const n = an;
      (an = null), ja(() => Mo(this), !1), (an = n);
    }
  if (Re) {
    const n = this.observers ? this.observers.length : 0;
    Re.sources
      ? (Re.sources.push(this), Re.sourceSlots.push(n))
      : ((Re.sources = [this]), (Re.sourceSlots = [n])),
      this.observers
        ? (this.observers.push(Re),
          this.observerSlots.push(Re.sources.length - 1))
        : ((this.observers = [Re]),
          (this.observerSlots = [Re.sources.length - 1]));
  }
  return this.value;
}
function bl(n, t, e) {
  let i = n.value;
  return (
    (!n.comparator || !n.comparator(i, t)) &&
      ((n.value = t),
      n.observers &&
        n.observers.length &&
        ja(() => {
          for (let s = 0; s < n.observers.length; s += 1) {
            const a = n.observers[s],
              l = Bs && Bs.running;
            l && Bs.disposed.has(a),
              (l ? !a.tState : !a.state) &&
                (a.pure ? an.push(a) : xr.push(a), a.observers && xl(a)),
              l || (a.state = zr);
          }
          if (an.length > 1e6) throw ((an = []), new Error());
        }, !1)),
    t
  );
}
function Ro(n) {
  if (!n.fn) return;
  Ca(n);
  const t = Do;
  Tc(n, n.value, t);
}
function Tc(n, t, e) {
  let i;
  const s = Ne,
    a = Re;
  Re = Ne = n;
  try {
    i = n.fn(t);
  } catch (l) {
    return (
      n.pure &&
        ((n.state = zr), n.owned && n.owned.forEach(Ca), (n.owned = null)),
      (n.updatedAt = e + 1),
      zo(l)
    );
  } finally {
    (Re = a), (Ne = s);
  }
  (!n.updatedAt || n.updatedAt <= e) &&
    (n.updatedAt != null && "observers" in n ? bl(n, i) : (n.value = i),
    (n.updatedAt = e));
}
function uu(n, t, e, i = zr, s) {
  const a = {
    fn: n,
    state: i,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: Ne,
    context: Ne ? Ne.context : null,
    pure: e,
  };
  return (
    Ne === null ||
      (Ne !== ml && (Ne.owned ? Ne.owned.push(a) : (Ne.owned = [a]))),
    a
  );
}
function yl(n) {
  if (n.state === 0) return;
  if (n.state === Eo) return Mo(n);
  if (n.suspense && $i(n.suspense.inFallback))
    return n.suspense.effects.push(n);
  const t = [n];
  for (; (n = n.owner) && (!n.updatedAt || n.updatedAt < Do); )
    n.state && t.push(n);
  for (let e = t.length - 1; e >= 0; e--)
    if (((n = t[e]), n.state === zr)) Ro(n);
    else if (n.state === Eo) {
      const i = an;
      (an = null), ja(() => Mo(n, t[0]), !1), (an = i);
    }
}
function ja(n, t) {
  if (an) return n();
  let e = !1;
  t || (an = []), xr ? (e = !0) : (xr = []), Do++;
  try {
    const i = n();
    return Dc(e), i;
  } catch (i) {
    e || (xr = null), (an = null), zo(i);
  }
}
function Dc(n) {
  if ((an && (wl(an), (an = null)), n)) return;
  const t = xr;
  (xr = null), t.length && ja(() => jc(t), !1);
}
function wl(n) {
  for (let t = 0; t < n.length; t++) yl(n[t]);
}
function Mo(n, t) {
  n.state = 0;
  for (let e = 0; e < n.sources.length; e += 1) {
    const i = n.sources[e];
    if (i.sources) {
      const s = i.state;
      s === zr
        ? i !== t && (!i.updatedAt || i.updatedAt < Do) && yl(i)
        : s === Eo && Mo(i, t);
    }
  }
}
function xl(n) {
  for (let t = 0; t < n.observers.length; t += 1) {
    const e = n.observers[t];
    e.state ||
      ((e.state = Eo), e.pure ? an.push(e) : xr.push(e), e.observers && xl(e));
  }
}
function Ca(n) {
  let t;
  if (n.sources)
    for (; n.sources.length; ) {
      const e = n.sources.pop(),
        i = n.sourceSlots.pop(),
        s = e.observers;
      if (s && s.length) {
        const a = s.pop(),
          l = e.observerSlots.pop();
        i < s.length &&
          ((a.sourceSlots[l] = i), (s[i] = a), (e.observerSlots[i] = l));
      }
    }
  if (n.tOwned) {
    for (t = n.tOwned.length - 1; t >= 0; t--) Ca(n.tOwned[t]);
    delete n.tOwned;
  }
  if (n.owned) {
    for (t = n.owned.length - 1; t >= 0; t--) Ca(n.owned[t]);
    n.owned = null;
  }
  if (n.cleanups) {
    for (t = n.cleanups.length - 1; t >= 0; t--) n.cleanups[t]();
    n.cleanups = null;
  }
  n.state = 0;
}
function Rc(n) {
  return n instanceof Error
    ? n
    : new Error(typeof n == "string" ? n : "Unknown error", { cause: n });
}
function Uu(n, t, e) {
  try {
    for (const i of t) i(n);
  } catch (i) {
    zo(i, (e && e.owner) || null);
  }
}
function zo(n, t = Ne) {
  const e = _a && t && t.context && t.context[_a],
    i = Rc(n);
  if (!e) throw i;
  xr
    ? xr.push({
        fn() {
          Uu(i, e, t);
        },
        state: zr,
      })
    : Uu(i, e, t);
}
let Al = !1;
function zc() {
  Al = !0;
}
function gn(n, t) {
  if (Al && te.context) {
    const e = te.context;
    zu(Cc());
    const i = $i(() => n(t || {}));
    return zu(e), i;
  }
  return $i(() => n(t || {}));
}
let Lo;
function Uc(n) {
  let t;
  te.context && te.load && (t = te.load(te.getContextId()));
  const [e, i] = ri(t, void 0);
  return (
    Lo || (Lo = new Set()),
    Lo.add(i),
    Bc(() => Lo.delete(i)),
    Mc(
      () => {
        let s;
        if ((s = e())) {
          const a = n.fallback;
          return typeof a == "function" && a.length
            ? $i(() => a(s, () => i()))
            : a;
        }
        return qc(() => n.children, i);
      },
      void 0,
      void 0,
    )
  );
}
function Hc(n, t, e) {
  let i = e.length,
    s = t.length,
    a = i,
    l = 0,
    c = 0,
    h = t[s - 1].nextSibling,
    g = null;
  for (; l < s || c < a; ) {
    if (t[l] === e[c]) {
      l++, c++;
      continue;
    }
    for (; t[s - 1] === e[a - 1]; ) s--, a--;
    if (s === l) {
      const m = a < i ? (c ? e[c - 1].nextSibling : e[a - c]) : h;
      for (; c < a; ) n.insertBefore(e[c++], m);
    } else if (a === c)
      for (; l < s; ) (!g || !g.has(t[l])) && t[l].remove(), l++;
    else if (t[l] === e[a - 1] && e[c] === t[s - 1]) {
      const m = t[--s].nextSibling;
      n.insertBefore(e[c++], t[l++].nextSibling),
        n.insertBefore(e[--a], m),
        (t[s] = e[a]);
    } else {
      if (!g) {
        g = new Map();
        let v = c;
        for (; v < a; ) g.set(e[v], v++);
      }
      const m = g.get(t[l]);
      if (m != null)
        if (c < m && m < a) {
          let v = l,
            N = 1,
            p;
          for (
            ;
            ++v < s && v < a && !((p = g.get(t[v])) == null || p !== m + N);

          )
            N++;
          if (N > m - c) {
            const F = t[l];
            for (; c < m; ) n.insertBefore(e[c++], F);
          } else n.replaceChild(e[c++], t[l++]);
        } else l++;
      else t[l++].remove();
    }
  }
}
const Hu = "_$DX_DELEGATE";
function Wu(n, t, e, i = {}) {
  let s;
  return (
    Ec((a) => {
      (s = a),
        t === document ? n() : Gn(t, n(), t.firstChild ? null : void 0, e);
    }, i.owner),
    () => {
      s(), (t.textContent = "");
    }
  );
}
function ai(n, t, e) {
  let i;
  const s = () => {
      const l = document.createElement("template");
      return (l.innerHTML = n), l.content.firstChild;
    },
    a = () => (i || (i = s())).cloneNode(!0);
  return (a.cloneNode = a), a;
}
function Uo(n, t = window.document) {
  const e = t[Hu] || (t[Hu] = new Set());
  for (let i = 0, s = n.length; i < s; i++) {
    const a = n[i];
    e.has(a) || (e.add(a), t.addEventListener(a, Ll));
  }
}
function Nl(n, t, e) {
  Wo(n) || (n[t] = e);
}
function Wc(n, t, e, i) {
  if (Array.isArray(e)) {
    const s = e[0];
    n.addEventListener(t, (e[0] = (a) => s.call(n, e[1], a)));
  } else n.addEventListener(t, e, typeof e != "function" && e);
}
function Vc(n, t, e) {
  return $i(() => n(t, e));
}
function Gn(n, t, e, i) {
  if ((e !== void 0 && !i && (i = []), typeof t != "function"))
    return Bo(n, t, i, e);
  Ia((s) => Bo(n, t(), s, e), i);
}
function Gc(n, t, e = {}) {
  if (globalThis._$HY.done) return Wu(n, t, [...t.childNodes], e);
  (te.completed = globalThis._$HY.completed),
    (te.events = globalThis._$HY.events),
    (te.load = (i) => globalThis._$HY.r[i]),
    (te.has = (i) => i in globalThis._$HY.r),
    (te.gather = (i) => Gu(t, i)),
    (te.registry = new Map()),
    (te.context = { id: e.renderId || "", count: 0 });
  try {
    return Gu(t, e.renderId), Wu(n, t, [...t.childNodes], e);
  } finally {
    te.context = null;
  }
}
function oi(n) {
  let t, e;
  return !Wo() || !(t = te.registry.get((e = $c())))
    ? n()
    : (te.completed && te.completed.add(t), te.registry.delete(e), t);
}
function Pa(n) {
  let t = n,
    e = 0,
    i = [];
  if (Wo(n))
    for (; t; ) {
      if (t.nodeType === 8) {
        const s = t.nodeValue;
        if (s === "$") e++;
        else if (s === "/") {
          if (e === 0) return [t, i];
          e--;
        }
      }
      i.push(t), (t = t.nextSibling);
    }
  return [t, i];
}
function Ho() {
  te.events &&
    !te.events.queued &&
    (queueMicrotask(() => {
      const { completed: n, events: t } = te;
      if (t) {
        for (t.queued = !1; t.length; ) {
          const [e, i] = t[0];
          if (!n.has(e)) return;
          t.shift(), Ll(i);
        }
        te.done &&
          ((te.events = _$HY.events = null),
          (te.completed = _$HY.completed = null));
      }
    }),
    (te.events.queued = !0));
}
function Wo(n) {
  return !!te.context && !te.done && (!n || n.isConnected);
}
function Ll(n) {
  if (te.registry && te.events && te.events.find(([h, g]) => g === n)) return;
  let t = n.target;
  const e = `$$${n.type}`,
    i = n.target,
    s = n.currentTarget,
    a = (h) =>
      Object.defineProperty(n, "target", { configurable: !0, value: h }),
    l = () => {
      const h = t[e];
      if (h && !t.disabled) {
        const g = t[`${e}Data`];
        if ((g !== void 0 ? h.call(t, g, n) : h.call(t, n), n.cancelBubble))
          return;
      }
      return (
        t.host &&
          typeof t.host != "string" &&
          !t.host._$host &&
          t.contains(n.target) &&
          a(t.host),
        !0
      );
    },
    c = () => {
      for (; l() && (t = t._$host || t.parentNode || t.host); );
    };
  if (
    (Object.defineProperty(n, "currentTarget", {
      configurable: !0,
      get() {
        return t || document;
      },
    }),
    te.registry && !te.done && (te.done = _$HY.done = !0),
    n.composedPath)
  ) {
    const h = n.composedPath();
    a(h[0]);
    for (let g = 0; g < h.length - 2 && ((t = h[g]), !!l()); g++) {
      if (t._$host) {
        (t = t._$host), c();
        break;
      }
      if (t.parentNode === s) break;
    }
  } else c();
  a(i);
}
function Bo(n, t, e, i, s) {
  const a = Wo(n);
  if (a) {
    !e && (e = [...n.childNodes]);
    let h = [];
    for (let g = 0; g < e.length; g++) {
      const m = e[g];
      m.nodeType === 8 && m.data.slice(0, 2) === "!$" ? m.remove() : h.push(m);
    }
    e = h;
  }
  for (; typeof e == "function"; ) e = e();
  if (t === e) return e;
  const l = typeof t,
    c = i !== void 0;
  if (
    ((n = (c && e[0] && e[0].parentNode) || n),
    l === "string" || l === "number")
  ) {
    if (a || (l === "number" && ((t = t.toString()), t === e))) return e;
    if (c) {
      let h = e[0];
      h && h.nodeType === 3
        ? h.data !== t && (h.data = t)
        : (h = document.createTextNode(t)),
        (e = qi(n, e, i, h));
    } else
      e !== "" && typeof e == "string"
        ? (e = n.firstChild.data = t)
        : (e = n.textContent = t);
  } else if (t == null || l === "boolean") {
    if (a) return e;
    e = qi(n, e, i);
  } else {
    if (l === "function")
      return (
        Ia(() => {
          let h = t();
          for (; typeof h == "function"; ) h = h();
          e = Bo(n, h, e, i);
        }),
        () => e
      );
    if (Array.isArray(t)) {
      const h = [],
        g = e && Array.isArray(e);
      if (Ys(h, t, e, s)) return Ia(() => (e = Bo(n, h, e, i, !0))), () => e;
      if (a) {
        if (!h.length) return e;
        if (i === void 0) return (e = [...n.childNodes]);
        let m = h[0];
        if (m.parentNode !== n) return e;
        const v = [m];
        for (; (m = m.nextSibling) !== i; ) v.push(m);
        return (e = v);
      }
      if (h.length === 0) {
        if (((e = qi(n, e, i)), c)) return e;
      } else
        g
          ? e.length === 0
            ? Vu(n, h, i)
            : Hc(n, e, h)
          : (e && qi(n), Vu(n, h));
      e = h;
    } else if (t.nodeType) {
      if (a && t.parentNode) return (e = c ? [t] : t);
      if (Array.isArray(e)) {
        if (c) return (e = qi(n, e, i, t));
        qi(n, e, null, t);
      } else
        e == null || e === "" || !n.firstChild
          ? n.appendChild(t)
          : n.replaceChild(t, n.firstChild);
      e = t;
    }
  }
  return e;
}
function Ys(n, t, e, i) {
  let s = !1;
  for (let a = 0, l = t.length; a < l; a++) {
    let c = t[a],
      h = e && e[n.length],
      g;
    if (!(c == null || c === !0 || c === !1))
      if ((g = typeof c) == "object" && c.nodeType) n.push(c);
      else if (Array.isArray(c)) s = Ys(n, c, h) || s;
      else if (g === "function")
        if (i) {
          for (; typeof c == "function"; ) c = c();
          s =
            Ys(n, Array.isArray(c) ? c : [c], Array.isArray(h) ? h : [h]) || s;
        } else n.push(c), (s = !0);
      else {
        const m = String(c);
        h && h.nodeType === 3 && h.data === m
          ? n.push(h)
          : n.push(document.createTextNode(m));
      }
  }
  return s;
}
function Vu(n, t, e = null) {
  for (let i = 0, s = t.length; i < s; i++) n.insertBefore(t[i], e);
}
function qi(n, t, e, i) {
  if (e === void 0) return (n.textContent = "");
  const s = i || document.createTextNode("");
  if (t.length) {
    let a = !1;
    for (let l = t.length - 1; l >= 0; l--) {
      const c = t[l];
      if (s !== c) {
        const h = c.parentNode === n;
        !a && !l
          ? h
            ? n.replaceChild(s, c)
            : n.insertBefore(s, e)
          : h && c.remove();
      } else a = !0;
    }
  } else n.insertBefore(s, e);
  return [s];
}
function Gu(n, t) {
  const e = n.querySelectorAll("*[data-hk]");
  for (let i = 0; i < e.length; i++) {
    const s = e[i],
      a = s.getAttribute("data-hk");
    (!t || a.startsWith(t)) && !te.registry.has(a) && te.registry.set(a, s);
  }
}
function $c() {
  return te.getNextContextId();
}
const Yc = (...n) => (zc(), Gc(...n)),
  qs = "Invariant Violation",
  {
    setPrototypeOf: Jc = function (n, t) {
      return (n.__proto__ = t), n;
    },
  } = Object;
class lu extends Error {
  framesToPop = 1;
  name = qs;
  constructor(t = qs) {
    super(
      typeof t == "number"
        ? `${qs}: ${t} (see https://github.com/apollographql/invariant-packages)`
        : t,
    ),
      Jc(this, lu.prototype);
  }
}
function Ts(n, t) {
  if (!n) throw new lu(t);
}
const Xc = /^[A-Za-z]:\//;
function Kc(n = "") {
  return n && n.replace(/\\/g, "/").replace(Xc, (t) => t.toUpperCase());
}
const Zc = /^[/\\]{2}/,
  Qc = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/,
  tf = /^[A-Za-z]:$/,
  ef = function (n) {
    if (n.length === 0) return ".";
    n = Kc(n);
    const t = n.match(Zc),
      e = Js(n),
      i = n[n.length - 1] === "/";
    return (
      (n = nf(n, !e)),
      n.length === 0
        ? e
          ? "/"
          : i
            ? "./"
            : "."
        : (i && (n += "/"),
          tf.test(n) && (n += "/"),
          t ? (e ? `//${n}` : `//./${n}`) : e && !Js(n) ? `/${n}` : n)
    );
  },
  Sl = function (...n) {
    if (n.length === 0) return ".";
    let t;
    for (const e of n)
      e && e.length > 0 && (t === void 0 ? (t = e) : (t += `/${e}`));
    return t === void 0 ? "." : ef(t.replace(/\/\/+/g, "/"));
  };
function nf(n, t) {
  let e = "",
    i = 0,
    s = -1,
    a = 0,
    l = null;
  for (let c = 0; c <= n.length; ++c) {
    if (c < n.length) l = n[c];
    else {
      if (l === "/") break;
      l = "/";
    }
    if (l === "/") {
      if (!(s === c - 1 || a === 1))
        if (a === 2) {
          if (
            e.length < 2 ||
            i !== 2 ||
            e[e.length - 1] !== "." ||
            e[e.length - 2] !== "."
          ) {
            if (e.length > 2) {
              const h = e.lastIndexOf("/");
              h === -1
                ? ((e = ""), (i = 0))
                : ((e = e.slice(0, h)),
                  (i = e.length - 1 - e.lastIndexOf("/"))),
                (s = c),
                (a = 0);
              continue;
            } else if (e.length > 0) {
              (e = ""), (i = 0), (s = c), (a = 0);
              continue;
            }
          }
          t && ((e += e.length > 0 ? "/.." : ".."), (i = 2));
        } else
          e.length > 0
            ? (e += `/${n.slice(s + 1, c)}`)
            : (e = n.slice(s + 1, c)),
            (i = c - s - 1);
      (s = c), (a = 0);
    } else l === "." && a !== -1 ? ++a : (a = -1);
  }
  return e;
}
const Js = function (n) {
  return Qc.test(n);
};
function rf(n) {
  return `virtual:${n}`;
}
function af(n) {
  return n.handler?.endsWith(".html")
    ? Js(n.handler)
      ? n.handler
      : Sl(n.root, n.handler)
    : `$vinxi/handler/${n.name}`;
}
const of = new Proxy(
  {},
  {
    get(n, t) {
      return (
        Ts(typeof t == "string", "Bundler name should be a string"),
        {
          name: t,
          type: "client",
          handler: rf(af({ name: t })),
          baseURL: "/_build",
          chunks: new Proxy(
            {},
            {
              get(e, i) {
                Ts(typeof i == "string", "Chunk expected");
                let s = Sl("/_build", i + ".mjs");
                return {
                  import() {
                    return import(s);
                  },
                  output: { path: s },
                };
              },
            },
          ),
          inputs: new Proxy(
            {},
            {
              get(e, i) {
                Ts(typeof i == "string", "Input must be string");
                let s = window.manifest[i].output;
                return {
                  async import() {
                    return import(s);
                  },
                  async assets() {
                    return window.manifest[i].assets;
                  },
                  output: { path: s },
                };
              },
            },
          ),
        }
      );
    },
  },
);
globalThis.MANIFEST = of;
var sf = ai(
  "<div class=Row><div class=Label></div><input class=ColorPicker type=color>",
);
const uf = (n) => {
  const t = (e) => {
    const i = e.target.value;
    n.onChange(i);
  };
  return (() => {
    var e = oi(sf),
      i = e.firstChild,
      s = i.nextSibling;
    return (
      Gn(i, () => n.label),
      (s.$$input = t),
      Ia(() => Nl(s, "value", n.value)),
      Ho(),
      e
    );
  })();
};
Uo(["input"]);
var lf = ai(
  "<div class=Column><div class=Label></div><input class=SpinBox type=number min=1>",
);
const $u = (n) =>
  (() => {
    var t = oi(lf),
      e = t.firstChild,
      i = e.nextSibling;
    return (
      Gn(e, () => n.label),
      (i.$$input = (s) => n.callback(parseInt(s.currentTarget.value))),
      Ia(() => Nl(i, "value", n.value)),
      Ho(),
      t
    );
  })();
Uo(["input"]);
var cf = ai(
  "<div class=Config><div class=Geometry><!$><!/><!$><!/></div><!$><!/>",
);
const ff = (n) =>
  (() => {
    var t = oi(cf),
      e = t.firstChild,
      i = e.firstChild,
      [s, a] = Pa(i.nextSibling),
      l = s.nextSibling,
      [c, h] = Pa(l.nextSibling),
      g = e.nextSibling,
      [m, v] = Pa(g.nextSibling);
    return (
      Gn(
        e,
        gn($u, {
          label: "Строк",
          get value() {
            return n.rows;
          },
          get callback() {
            return n.setRows;
          },
        }),
        s,
        a,
      ),
      Gn(
        e,
        gn($u, {
          label: "Столбцов",
          get value() {
            return n.cols;
          },
          get callback() {
            return n.setCols;
          },
        }),
        c,
        h,
      ),
      Gn(
        t,
        gn(uf, {
          label: "Цвет",
          get onChange() {
            return n.setColor;
          },
          get value() {
            return n.color;
          },
        }),
        m,
        v,
      ),
      t
    );
  })();
var hf = ai(
  '<div class=file-input-container><input type=file accept="image/png, image/jpeg"><button type=button class=file-input-button>',
);
const df = (n) => {
  let t;
  const e = () => {
    t?.click();
  };
  return (() => {
    var i = oi(hf),
      s = i.firstChild,
      a = s.nextSibling;
    Wc(s, "change", n.handleFileChange);
    var l = t;
    return (
      typeof l == "function" ? Vc(l, s) : (t = s),
      s.style.setProperty("display", "none"),
      (a.$$click = e),
      Gn(a, () => n.label || "Выберите файл"),
      Ho(),
      i
    );
  })();
};
Uo(["click"]);
const pf = (n) =>
    gn(df, {
      label: "Файл с картой",
      handleFileChange: (e) => {
        const i = e.target;
        if (i.files && i.files[0]) {
          const s = i.files[0],
            a = new FileReader();
          (a.onload = (l) => {
            n.imageCallback(l.target?.result);
          }),
            a.readAsDataURL(s);
        }
      },
    }),
  gf = (n, t, e, i, s) => {
    const a = [];
    for (let l = 0; l < n; l++)
      for (let c = 0; c < t; c++) {
        const h = document.createElement("canvas");
        (h.width = e), (h.height = i);
        const g = h.getContext("2d");
        g &&
          (g.drawImage(s, c * e, l * i, e, i, 0, 0, e, i),
          a.push(h.toDataURL("image/png")));
      }
    return a;
  },
  mf = 15,
  vf = 12,
  bf = () => {
    const [n, t] = ri(null),
      [e, i] = ri(null),
      [s, a] = ri([]);
    return {
      imageSrc: n,
      setImageSrc: t,
      fullImageDataUrl: e,
      cellDataUrls: s,
      generateGrid: (c, h, g) => {
        if (!n()) return;
        const m = new Image();
        (m.onload = () => {
          const v = document.createElement("canvas"),
            N = v.getContext("2d");
          if (!N) return;
          m.width > m.height
            ? ((v.width = m.height),
              (v.height = m.width),
              N.save(),
              N.translate(v.width, 0),
              N.rotate(Math.PI / 2),
              N.drawImage(m, 0, 0),
              N.restore())
            : ((v.width = m.width),
              (v.height = m.height),
              N.drawImage(m, 0, 0));
          const p = v.width / h,
            F = v.height / c;
          a(gf(c, h, p, F, v)), (N.strokeStyle = g), (N.lineWidth = 2);
          for (let P = 0; P <= h; P++) {
            const M = P * p;
            N.beginPath(), N.moveTo(M, 0), N.lineTo(M, v.height), N.stroke();
          }
          for (let P = 0; P <= c; P++) {
            const M = P * F;
            N.beginPath(), N.moveTo(0, M), N.lineTo(v.width, M), N.stroke();
          }
          (N.font = "20px Arial"),
            (N.fillStyle = g),
            (N.textAlign = "center"),
            (N.textBaseline = "middle");
          for (let P = 0; P < c; P++)
            for (let M = 0; M < h; M++) {
              const _ = `${String.fromCharCode(65 + P)}${M + 1}`,
                E = M * p + mf,
                G = P * F + vf;
              N.fillText(_, E, G);
            }
          i(v.toDataURL("image/png"));
        }),
          (m.src = n());
      },
    };
  },
  yf = (n = 3, t = 3) => {
    const [e, i] = ri(n),
      [s, a] = ri(t),
      [l, c] = ri("#000000");
    return { rows: e, setRows: i, cols: s, setCols: a, color: l, setColor: c };
  },
  wf = "modulepreload",
  xf = function (n) {
    return "/_build/" + n;
  },
  Yu = {},
  Xs = function (t, e, i) {
    let s = Promise.resolve();
    if (e && e.length > 0) {
      document.getElementsByTagName("link");
      const l = document.querySelector("meta[property=csp-nonce]"),
        c = l?.nonce || l?.getAttribute("nonce");
      s = Promise.allSettled(
        e.map((h) => {
          if (((h = xf(h)), h in Yu)) return;
          Yu[h] = !0;
          const g = h.endsWith(".css"),
            m = g ? '[rel="stylesheet"]' : "";
          if (document.querySelector(`link[href="${h}"]${m}`)) return;
          const v = document.createElement("link");
          if (
            ((v.rel = g ? "stylesheet" : wf),
            g || (v.as = "script"),
            (v.crossOrigin = ""),
            (v.href = h),
            c && v.setAttribute("nonce", c),
            document.head.appendChild(v),
            g)
          )
            return new Promise((N, p) => {
              v.addEventListener("load", N),
                v.addEventListener("error", () =>
                  p(new Error(`Unable to preload CSS for ${h}`)),
                );
            });
        }),
      );
    }
    function a(l) {
      const c = new Event("vite:preloadError", { cancelable: !0 });
      if (((c.payload = l), window.dispatchEvent(c), !c.defaultPrevented))
        throw l;
    }
    return s.then((l) => {
      for (const c of l || []) c.status === "rejected" && a(c.reason);
      return t().catch(a);
    });
  };
function de(n) {
  "@babel/helpers - typeof";
  return (
    (de =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    de(n)
  );
}
var rn = Uint8Array,
  An = Uint16Array,
  cu = Int32Array,
  Vo = new rn([
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5,
    5, 5, 5, 0, 0, 0, 0,
  ]),
  Go = new rn([
    0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10,
    11, 11, 12, 12, 13, 13, 0, 0,
  ]),
  Ks = new rn([
    16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
  ]),
  _l = function (n, t) {
    for (var e = new An(31), i = 0; i < 31; ++i) e[i] = t += 1 << n[i - 1];
    for (var s = new cu(e[30]), i = 1; i < 30; ++i)
      for (var a = e[i]; a < e[i + 1]; ++a) s[a] = ((a - e[i]) << 5) | i;
    return { b: e, r: s };
  },
  Pl = _l(Vo, 2),
  kl = Pl.b,
  Zs = Pl.r;
(kl[28] = 258), (Zs[258] = 28);
var Il = _l(Go, 0),
  Af = Il.b,
  Ju = Il.r,
  Qs = new An(32768);
for (var xe = 0; xe < 32768; ++xe) {
  var Br = ((xe & 43690) >> 1) | ((xe & 21845) << 1);
  (Br = ((Br & 52428) >> 2) | ((Br & 13107) << 2)),
    (Br = ((Br & 61680) >> 4) | ((Br & 3855) << 4)),
    (Qs[xe] = (((Br & 65280) >> 8) | ((Br & 255) << 8)) >> 1);
}
var sr = function (n, t, e) {
    for (var i = n.length, s = 0, a = new An(t); s < i; ++s)
      n[s] && ++a[n[s] - 1];
    var l = new An(t);
    for (s = 1; s < t; ++s) l[s] = (l[s - 1] + a[s - 1]) << 1;
    var c;
    if (e) {
      c = new An(1 << t);
      var h = 15 - t;
      for (s = 0; s < i; ++s)
        if (n[s])
          for (
            var g = (s << 4) | n[s],
              m = t - n[s],
              v = l[n[s] - 1]++ << m,
              N = v | ((1 << m) - 1);
            v <= N;
            ++v
          )
            c[Qs[v] >> h] = g;
    } else
      for (c = new An(i), s = 0; s < i; ++s)
        n[s] && (c[s] = Qs[l[n[s] - 1]++] >> (15 - n[s]));
    return c;
  },
  Dr = new rn(288);
for (var xe = 0; xe < 144; ++xe) Dr[xe] = 8;
for (var xe = 144; xe < 256; ++xe) Dr[xe] = 9;
for (var xe = 256; xe < 280; ++xe) Dr[xe] = 7;
for (var xe = 280; xe < 288; ++xe) Dr[xe] = 8;
var Fa = new rn(32);
for (var xe = 0; xe < 32; ++xe) Fa[xe] = 5;
var Nf = sr(Dr, 9, 0),
  Lf = sr(Dr, 9, 1),
  Sf = sr(Fa, 5, 0),
  _f = sr(Fa, 5, 1),
  Ds = function (n) {
    for (var t = n[0], e = 1; e < n.length; ++e) n[e] > t && (t = n[e]);
    return t;
  },
  Un = function (n, t, e) {
    var i = (t / 8) | 0;
    return ((n[i] | (n[i + 1] << 8)) >> (t & 7)) & e;
  },
  Rs = function (n, t) {
    var e = (t / 8) | 0;
    return (n[e] | (n[e + 1] << 8) | (n[e + 2] << 16)) >> (t & 7);
  },
  fu = function (n) {
    return ((n + 7) / 8) | 0;
  },
  Cl = function (n, t, e) {
    return (
      (e == null || e > n.length) && (e = n.length), new rn(n.subarray(t, e))
    );
  },
  Pf = [
    "unexpected EOF",
    "invalid block type",
    "invalid length/literal",
    "invalid distance",
    "stream finished",
    "no stream handler",
    ,
    "no callback",
    "invalid UTF-8 data",
    "extra field too long",
    "date not in range 1980-2099",
    "filename too long",
    "stream finishing",
    "invalid zip data",
  ],
  Vn = function (n, t, e) {
    var i = new Error(t || Pf[n]);
    if (
      ((i.code = n),
      Error.captureStackTrace && Error.captureStackTrace(i, Vn),
      !e)
    )
      throw i;
    return i;
  },
  kf = function (n, t, e, i) {
    var s = n.length,
      a = 0;
    if (!s || (t.f && !t.l)) return e || new rn(0);
    var l = !e,
      c = l || t.i != 2,
      h = t.i;
    l && (e = new rn(s * 3));
    var g = function (At) {
        var It = e.length;
        if (At > It) {
          var _t = new rn(Math.max(It * 2, At));
          _t.set(e), (e = _t);
        }
      },
      m = t.f || 0,
      v = t.p || 0,
      N = t.b || 0,
      p = t.l,
      F = t.d,
      P = t.m,
      M = t.n,
      _ = s * 8;
    do {
      if (!p) {
        m = Un(n, v, 1);
        var E = Un(n, v + 1, 3);
        if (((v += 3), E))
          if (E == 1) (p = Lf), (F = _f), (P = 9), (M = 5);
          else if (E == 2) {
            var wt = Un(n, v, 31) + 257,
              tt = Un(n, v + 10, 15) + 4,
              z = wt + Un(n, v + 5, 31) + 1;
            v += 14;
            for (var it = new rn(z), dt = new rn(19), k = 0; k < tt; ++k)
              dt[Ks[k]] = Un(n, v + k * 3, 7);
            v += tt * 3;
            for (
              var I = Ds(dt), W = (1 << I) - 1, T = sr(dt, I, 1), k = 0;
              k < z;

            ) {
              var ut = T[Un(n, v, W)];
              v += ut & 15;
              var G = ut >> 4;
              if (G < 16) it[k++] = G;
              else {
                var at = 0,
                  ct = 0;
                for (
                  G == 16
                    ? ((ct = 3 + Un(n, v, 3)), (v += 2), (at = it[k - 1]))
                    : G == 17
                      ? ((ct = 3 + Un(n, v, 7)), (v += 3))
                      : G == 18 && ((ct = 11 + Un(n, v, 127)), (v += 7));
                  ct--;

                )
                  it[k++] = at;
              }
            }
            var Z = it.subarray(0, wt),
              ft = it.subarray(wt);
            (P = Ds(Z)), (M = Ds(ft)), (p = sr(Z, P, 1)), (F = sr(ft, M, 1));
          } else Vn(1);
        else {
          var G = fu(v) + 4,
            nt = n[G - 4] | (n[G - 3] << 8),
            st = G + nt;
          if (st > s) {
            h && Vn(0);
            break;
          }
          c && g(N + nt),
            e.set(n.subarray(G, st), N),
            (t.b = N += nt),
            (t.p = v = st * 8),
            (t.f = m);
          continue;
        }
        if (v > _) {
          h && Vn(0);
          break;
        }
      }
      c && g(N + 131072);
      for (var pt = (1 << P) - 1, Ct = (1 << M) - 1, A = v; ; A = v) {
        var at = p[Rs(n, v) & pt],
          j = at >> 4;
        if (((v += at & 15), v > _)) {
          h && Vn(0);
          break;
        }
        if ((at || Vn(2), j < 256)) e[N++] = j;
        else if (j == 256) {
          (A = v), (p = null);
          break;
        } else {
          var B = j - 254;
          if (j > 264) {
            var k = j - 257,
              R = Vo[k];
            (B = Un(n, v, (1 << R) - 1) + kl[k]), (v += R);
          }
          var Y = F[Rs(n, v) & Ct],
            Q = Y >> 4;
          Y || Vn(3), (v += Y & 15);
          var ft = Af[Q];
          if (Q > 3) {
            var R = Go[Q];
            (ft += Rs(n, v) & ((1 << R) - 1)), (v += R);
          }
          if (v > _) {
            h && Vn(0);
            break;
          }
          c && g(N + 131072);
          var et = N + B;
          if (N < ft) {
            var rt = a - ft,
              Nt = Math.min(ft, et);
            for (rt + N < 0 && Vn(3); N < Nt; ++N) e[N] = i[rt + N];
          }
          for (; N < et; ++N) e[N] = e[N - ft];
        }
      }
      (t.l = p),
        (t.p = A),
        (t.b = N),
        (t.f = m),
        p && ((m = 1), (t.m = P), (t.d = F), (t.n = M));
    } while (!m);
    return N != e.length && l ? Cl(e, 0, N) : e.subarray(0, N);
  },
  wr = function (n, t, e) {
    e <<= t & 7;
    var i = (t / 8) | 0;
    (n[i] |= e), (n[i + 1] |= e >> 8);
  },
  La = function (n, t, e) {
    e <<= t & 7;
    var i = (t / 8) | 0;
    (n[i] |= e), (n[i + 1] |= e >> 8), (n[i + 2] |= e >> 16);
  },
  zs = function (n, t) {
    for (var e = [], i = 0; i < n.length; ++i)
      n[i] && e.push({ s: i, f: n[i] });
    var s = e.length,
      a = e.slice();
    if (!s) return { t: jl, l: 0 };
    if (s == 1) {
      var l = new rn(e[0].s + 1);
      return (l[e[0].s] = 1), { t: l, l: 1 };
    }
    e.sort(function (st, wt) {
      return st.f - wt.f;
    }),
      e.push({ s: -1, f: 25001 });
    var c = e[0],
      h = e[1],
      g = 0,
      m = 1,
      v = 2;
    for (e[0] = { s: -1, f: c.f + h.f, l: c, r: h }; m != s - 1; )
      (c = e[e[g].f < e[v].f ? g++ : v++]),
        (h = e[g != m && e[g].f < e[v].f ? g++ : v++]),
        (e[m++] = { s: -1, f: c.f + h.f, l: c, r: h });
    for (var N = a[0].s, i = 1; i < s; ++i) a[i].s > N && (N = a[i].s);
    var p = new An(N + 1),
      F = tu(e[m - 1], p, 0);
    if (F > t) {
      var i = 0,
        P = 0,
        M = F - t,
        _ = 1 << M;
      for (
        a.sort(function (wt, tt) {
          return p[tt.s] - p[wt.s] || wt.f - tt.f;
        });
        i < s;
        ++i
      ) {
        var E = a[i].s;
        if (p[E] > t) (P += _ - (1 << (F - p[E]))), (p[E] = t);
        else break;
      }
      for (P >>= M; P > 0; ) {
        var G = a[i].s;
        p[G] < t ? (P -= 1 << (t - p[G]++ - 1)) : ++i;
      }
      for (; i >= 0 && P; --i) {
        var nt = a[i].s;
        p[nt] == t && (--p[nt], ++P);
      }
      F = t;
    }
    return { t: new rn(p), l: F };
  },
  tu = function (n, t, e) {
    return n.s == -1
      ? Math.max(tu(n.l, t, e + 1), tu(n.r, t, e + 1))
      : (t[n.s] = e);
  },
  Xu = function (n) {
    for (var t = n.length; t && !n[--t]; );
    for (
      var e = new An(++t),
        i = 0,
        s = n[0],
        a = 1,
        l = function (h) {
          e[i++] = h;
        },
        c = 1;
      c <= t;
      ++c
    )
      if (n[c] == s && c != t) ++a;
      else {
        if (!s && a > 2) {
          for (; a > 138; a -= 138) l(32754);
          a > 2 &&
            (l(a > 10 ? ((a - 11) << 5) | 28690 : ((a - 3) << 5) | 12305),
            (a = 0));
        } else if (a > 3) {
          for (l(s), --a; a > 6; a -= 6) l(8304);
          a > 2 && (l(((a - 3) << 5) | 8208), (a = 0));
        }
        for (; a--; ) l(s);
        (a = 1), (s = n[c]);
      }
    return { c: e.subarray(0, i), n: t };
  },
  Sa = function (n, t) {
    for (var e = 0, i = 0; i < t.length; ++i) e += n[i] * t[i];
    return e;
  },
  Fl = function (n, t, e) {
    var i = e.length,
      s = fu(t + 2);
    (n[s] = i & 255),
      (n[s + 1] = i >> 8),
      (n[s + 2] = n[s] ^ 255),
      (n[s + 3] = n[s + 1] ^ 255);
    for (var a = 0; a < i; ++a) n[s + a + 4] = e[a];
    return (s + 4 + i) * 8;
  },
  Ku = function (n, t, e, i, s, a, l, c, h, g, m) {
    wr(t, m++, e), ++s[256];
    for (
      var v = zs(s, 15),
        N = v.t,
        p = v.l,
        F = zs(a, 15),
        P = F.t,
        M = F.l,
        _ = Xu(N),
        E = _.c,
        G = _.n,
        nt = Xu(P),
        st = nt.c,
        wt = nt.n,
        tt = new An(19),
        z = 0;
      z < E.length;
      ++z
    )
      ++tt[E[z] & 31];
    for (var z = 0; z < st.length; ++z) ++tt[st[z] & 31];
    for (
      var it = zs(tt, 7), dt = it.t, k = it.l, I = 19;
      I > 4 && !dt[Ks[I - 1]];
      --I
    );
    var W = (g + 5) << 3,
      T = Sa(s, Dr) + Sa(a, Fa) + l,
      ut =
        Sa(s, N) +
        Sa(a, P) +
        l +
        14 +
        3 * I +
        Sa(tt, dt) +
        2 * tt[16] +
        3 * tt[17] +
        7 * tt[18];
    if (h >= 0 && W <= T && W <= ut) return Fl(t, m, n.subarray(h, h + g));
    var at, ct, Z, ft;
    if ((wr(t, m, 1 + (ut < T)), (m += 2), ut < T)) {
      (at = sr(N, p, 0)), (ct = N), (Z = sr(P, M, 0)), (ft = P);
      var pt = sr(dt, k, 0);
      wr(t, m, G - 257), wr(t, m + 5, wt - 1), wr(t, m + 10, I - 4), (m += 14);
      for (var z = 0; z < I; ++z) wr(t, m + 3 * z, dt[Ks[z]]);
      m += 3 * I;
      for (var Ct = [E, st], A = 0; A < 2; ++A)
        for (var j = Ct[A], z = 0; z < j.length; ++z) {
          var B = j[z] & 31;
          wr(t, m, pt[B]),
            (m += dt[B]),
            B > 15 && (wr(t, m, (j[z] >> 5) & 127), (m += j[z] >> 12));
        }
    } else (at = Nf), (ct = Dr), (Z = Sf), (ft = Fa);
    for (var z = 0; z < c; ++z) {
      var R = i[z];
      if (R > 255) {
        var B = (R >> 18) & 31;
        La(t, m, at[B + 257]),
          (m += ct[B + 257]),
          B > 7 && (wr(t, m, (R >> 23) & 31), (m += Vo[B]));
        var Y = R & 31;
        La(t, m, Z[Y]),
          (m += ft[Y]),
          Y > 3 && (La(t, m, (R >> 5) & 8191), (m += Go[Y]));
      } else La(t, m, at[R]), (m += ct[R]);
    }
    return La(t, m, at[256]), m + ct[256];
  },
  If = new cu([
    65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632,
  ]),
  jl = new rn(0),
  Cf = function (n, t, e, i, s, a) {
    var l = a.z || n.length,
      c = new rn(i + l + 5 * (1 + Math.ceil(l / 7e3)) + s),
      h = c.subarray(i, c.length - s),
      g = a.l,
      m = (a.r || 0) & 7;
    if (t) {
      m && (h[0] = a.r >> 3);
      for (
        var v = If[t - 1],
          N = v >> 13,
          p = v & 8191,
          F = (1 << e) - 1,
          P = a.p || new An(32768),
          M = a.h || new An(F + 1),
          _ = Math.ceil(e / 3),
          E = 2 * _,
          G = function (Ut) {
            return (n[Ut] ^ (n[Ut + 1] << _) ^ (n[Ut + 2] << E)) & F;
          },
          nt = new cu(25e3),
          st = new An(288),
          wt = new An(32),
          tt = 0,
          z = 0,
          it = a.i || 0,
          dt = 0,
          k = a.w || 0,
          I = 0;
        it + 2 < l;
        ++it
      ) {
        var W = G(it),
          T = it & 32767,
          ut = M[W];
        if (((P[T] = ut), (M[W] = T), k <= it)) {
          var at = l - it;
          if ((tt > 7e3 || dt > 24576) && (at > 423 || !g)) {
            (m = Ku(n, h, 0, nt, st, wt, z, dt, I, it - I, m)),
              (dt = tt = z = 0),
              (I = it);
            for (var ct = 0; ct < 286; ++ct) st[ct] = 0;
            for (var ct = 0; ct < 30; ++ct) wt[ct] = 0;
          }
          var Z = 2,
            ft = 0,
            pt = p,
            Ct = (T - ut) & 32767;
          if (at > 2 && W == G(it - Ct))
            for (
              var A = Math.min(N, at) - 1,
                j = Math.min(32767, it),
                B = Math.min(258, at);
              Ct <= j && --pt && T != ut;

            ) {
              if (n[it + Z] == n[it + Z - Ct]) {
                for (var R = 0; R < B && n[it + R] == n[it + R - Ct]; ++R);
                if (R > Z) {
                  if (((Z = R), (ft = Ct), R > A)) break;
                  for (
                    var Y = Math.min(Ct, R - 2), Q = 0, ct = 0;
                    ct < Y;
                    ++ct
                  ) {
                    var et = (it - Ct + ct) & 32767,
                      rt = P[et],
                      Nt = (et - rt) & 32767;
                    Nt > Q && ((Q = Nt), (ut = et));
                  }
                }
              }
              (T = ut), (ut = P[T]), (Ct += (T - ut) & 32767);
            }
          if (ft) {
            nt[dt++] = 268435456 | (Zs[Z] << 18) | Ju[ft];
            var At = Zs[Z] & 31,
              It = Ju[ft] & 31;
            (z += Vo[At] + Go[It]),
              ++st[257 + At],
              ++wt[It],
              (k = it + Z),
              ++tt;
          } else (nt[dt++] = n[it]), ++st[n[it]];
        }
      }
      for (it = Math.max(it, k); it < l; ++it) (nt[dt++] = n[it]), ++st[n[it]];
      (m = Ku(n, h, g, nt, st, wt, z, dt, I, it - I, m)),
        g ||
          ((a.r = (m & 7) | (h[(m / 8) | 0] << 3)),
          (m -= 7),
          (a.h = M),
          (a.p = P),
          (a.i = it),
          (a.w = k));
    } else {
      for (var it = a.w || 0; it < l + g; it += 65535) {
        var _t = it + 65535;
        _t >= l && ((h[(m / 8) | 0] = g), (_t = l)),
          (m = Fl(h, m + 1, n.subarray(it, _t)));
      }
      a.i = l;
    }
    return Cl(c, 0, i + fu(m) + s);
  },
  Ol = function () {
    var n = 1,
      t = 0;
    return {
      p: function (e) {
        for (var i = n, s = t, a = e.length | 0, l = 0; l != a; ) {
          for (var c = Math.min(l + 2655, a); l < c; ++l) s += i += e[l];
          (i = (i & 65535) + 15 * (i >> 16)),
            (s = (s & 65535) + 15 * (s >> 16));
        }
        (n = i), (t = s);
      },
      d: function () {
        return (
          (n %= 65521),
          (t %= 65521),
          ((n & 255) << 24) | ((n & 65280) << 8) | ((t & 255) << 8) | (t >> 8)
        );
      },
    };
  },
  Ff = function (n, t, e, i, s) {
    if (!s && ((s = { l: 1 }), t.dictionary)) {
      var a = t.dictionary.subarray(-32768),
        l = new rn(a.length + n.length);
      l.set(a), l.set(n, a.length), (n = l), (s.w = a.length);
    }
    return Cf(
      n,
      t.level == null ? 6 : t.level,
      t.mem == null
        ? s.l
          ? Math.ceil(Math.max(8, Math.min(13, Math.log(n.length))) * 1.5)
          : 20
        : 12 + t.mem,
      e,
      i,
      s,
    );
  },
  El = function (n, t, e) {
    for (; e; ++t) (n[t] = e), (e >>>= 8);
  },
  jf = function (n, t) {
    var e = t.level,
      i = e == 0 ? 0 : e < 6 ? 1 : e == 9 ? 3 : 2;
    if (
      ((n[0] = 120),
      (n[1] = (i << 6) | (t.dictionary && 32)),
      (n[1] |= 31 - (((n[0] << 8) | n[1]) % 31)),
      t.dictionary)
    ) {
      var s = Ol();
      s.p(t.dictionary), El(n, 2, s.d());
    }
  },
  Of = function (n, t) {
    return (
      ((n[0] & 15) != 8 || n[0] >> 4 > 7 || ((n[0] << 8) | n[1]) % 31) &&
        Vn(6, "invalid zlib data"),
      ((n[1] >> 5) & 1) == 1 &&
        Vn(
          6,
          "invalid zlib data: " +
            (n[1] & 32 ? "need" : "unexpected") +
            " dictionary",
        ),
      ((n[1] >> 3) & 4) + 2
    );
  };
function eu(n, t) {
  t || (t = {});
  var e = Ol();
  e.p(n);
  var i = Ff(n, t, t.dictionary ? 6 : 2, 4);
  return jf(i, t), El(i, i.length - 4, e.d()), i;
}
function Ef(n, t) {
  return kf(n.subarray(Of(n), -4), { i: 2 }, t, t);
}
var Mf = typeof TextDecoder < "u" && new TextDecoder(),
  Bf = 0;
try {
  Mf.decode(jl, { stream: !0 }), (Bf = 1);
} catch {}
var Ht = (function () {
  return typeof window < "u"
    ? window
    : typeof global < "u"
      ? global
      : typeof self < "u"
        ? self
        : this;
})();
function Us() {
  Ht.console &&
    typeof Ht.console.log == "function" &&
    Ht.console.log.apply(Ht.console, arguments);
}
var be = {
  log: Us,
  warn: function (n) {
    Ht.console &&
      (typeof Ht.console.warn == "function"
        ? Ht.console.warn.apply(Ht.console, arguments)
        : Us.call(null, arguments));
  },
  error: function (n) {
    Ht.console &&
      (typeof Ht.console.error == "function"
        ? Ht.console.error.apply(Ht.console, arguments)
        : Us(n));
  },
};
function Hs(n, t, e) {
  var i = new XMLHttpRequest();
  i.open("GET", n),
    (i.responseType = "blob"),
    (i.onload = function () {
      ei(i.response, t, e);
    }),
    (i.onerror = function () {
      be.error("could not download file");
    }),
    i.send();
}
function Zu(n) {
  var t = new XMLHttpRequest();
  t.open("HEAD", n, !1);
  try {
    t.send();
  } catch {}
  return t.status >= 200 && t.status <= 299;
}
function So(n) {
  try {
    n.dispatchEvent(new MouseEvent("click"));
  } catch {
    var t = document.createEvent("MouseEvents");
    t.initMouseEvent(
      "click",
      !0,
      !0,
      window,
      0,
      0,
      0,
      80,
      20,
      !1,
      !1,
      !1,
      !1,
      0,
      null,
    ),
      n.dispatchEvent(t);
  }
}
var ka,
  nu,
  ei =
    Ht.saveAs ||
    ((typeof window > "u" ? "undefined" : de(window)) !== "object" ||
    window !== Ht
      ? function () {}
      : typeof HTMLAnchorElement < "u" &&
          "download" in HTMLAnchorElement.prototype
        ? function (n, t, e) {
            var i = Ht.URL || Ht.webkitURL,
              s = document.createElement("a");
            (t = t || n.name || "download"),
              (s.download = t),
              (s.rel = "noopener"),
              typeof n == "string"
                ? ((s.href = n),
                  s.origin !== location.origin
                    ? Zu(s.href)
                      ? Hs(n, t, e)
                      : So(s, (s.target = "_blank"))
                    : So(s))
                : ((s.href = i.createObjectURL(n)),
                  setTimeout(function () {
                    i.revokeObjectURL(s.href);
                  }, 4e4),
                  setTimeout(function () {
                    So(s);
                  }, 0));
          }
        : "msSaveOrOpenBlob" in navigator
          ? function (n, t, e) {
              if (((t = t || n.name || "download"), typeof n == "string"))
                if (Zu(n)) Hs(n, t, e);
                else {
                  var i = document.createElement("a");
                  (i.href = n),
                    (i.target = "_blank"),
                    setTimeout(function () {
                      So(i);
                    });
                }
              else
                navigator.msSaveOrOpenBlob(
                  (function (s, a) {
                    return (
                      a === void 0
                        ? (a = { autoBom: !1 })
                        : de(a) !== "object" &&
                          (be.warn(
                            "Deprecated: Expected third argument to be a object",
                          ),
                          (a = { autoBom: !a })),
                      a.autoBom &&
                      /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(
                        s.type,
                      )
                        ? new Blob(["\uFEFF", s], { type: s.type })
                        : s
                    );
                  })(n, e),
                  t,
                );
            }
          : function (n, t, e, i) {
              if (
                ((i = i || open("", "_blank")) &&
                  (i.document.title = i.document.body.innerText =
                    "downloading..."),
                typeof n == "string")
              )
                return Hs(n, t, e);
              var s = n.type === "application/octet-stream",
                a = /constructor/i.test(Ht.HTMLElement) || Ht.safari,
                l = /CriOS\/[\d]+/.test(navigator.userAgent);
              if (
                (l || (s && a)) &&
                (typeof FileReader > "u" ? "undefined" : de(FileReader)) ===
                  "object"
              ) {
                var c = new FileReader();
                (c.onloadend = function () {
                  var m = c.result;
                  (m = l
                    ? m
                    : m.replace(/^data:[^;]*;/, "data:attachment/file;")),
                    i ? (i.location.href = m) : (location = m),
                    (i = null);
                }),
                  c.readAsDataURL(n);
              } else {
                var h = Ht.URL || Ht.webkitURL,
                  g = h.createObjectURL(n);
                i ? (i.location = g) : (location.href = g),
                  (i = null),
                  setTimeout(function () {
                    h.revokeObjectURL(g);
                  }, 4e4);
              }
            });
/**
 * A class to parse color values
 * @author Stoyan Stefanov <sstoo@gmail.com>
 * {@link   http://www.phpied.com/rgb-color-parser-in-javascript/}
 * @license Use it if you like it
 */ function Ml(n) {
  var t;
  (n = n || ""),
    (this.ok = !1),
    n.charAt(0) == "#" && (n = n.substr(1, 6)),
    (n =
      {
        aliceblue: "f0f8ff",
        antiquewhite: "faebd7",
        aqua: "00ffff",
        aquamarine: "7fffd4",
        azure: "f0ffff",
        beige: "f5f5dc",
        bisque: "ffe4c4",
        black: "000000",
        blanchedalmond: "ffebcd",
        blue: "0000ff",
        blueviolet: "8a2be2",
        brown: "a52a2a",
        burlywood: "deb887",
        cadetblue: "5f9ea0",
        chartreuse: "7fff00",
        chocolate: "d2691e",
        coral: "ff7f50",
        cornflowerblue: "6495ed",
        cornsilk: "fff8dc",
        crimson: "dc143c",
        cyan: "00ffff",
        darkblue: "00008b",
        darkcyan: "008b8b",
        darkgoldenrod: "b8860b",
        darkgray: "a9a9a9",
        darkgreen: "006400",
        darkkhaki: "bdb76b",
        darkmagenta: "8b008b",
        darkolivegreen: "556b2f",
        darkorange: "ff8c00",
        darkorchid: "9932cc",
        darkred: "8b0000",
        darksalmon: "e9967a",
        darkseagreen: "8fbc8f",
        darkslateblue: "483d8b",
        darkslategray: "2f4f4f",
        darkturquoise: "00ced1",
        darkviolet: "9400d3",
        deeppink: "ff1493",
        deepskyblue: "00bfff",
        dimgray: "696969",
        dodgerblue: "1e90ff",
        feldspar: "d19275",
        firebrick: "b22222",
        floralwhite: "fffaf0",
        forestgreen: "228b22",
        fuchsia: "ff00ff",
        gainsboro: "dcdcdc",
        ghostwhite: "f8f8ff",
        gold: "ffd700",
        goldenrod: "daa520",
        gray: "808080",
        green: "008000",
        greenyellow: "adff2f",
        honeydew: "f0fff0",
        hotpink: "ff69b4",
        indianred: "cd5c5c",
        indigo: "4b0082",
        ivory: "fffff0",
        khaki: "f0e68c",
        lavender: "e6e6fa",
        lavenderblush: "fff0f5",
        lawngreen: "7cfc00",
        lemonchiffon: "fffacd",
        lightblue: "add8e6",
        lightcoral: "f08080",
        lightcyan: "e0ffff",
        lightgoldenrodyellow: "fafad2",
        lightgrey: "d3d3d3",
        lightgreen: "90ee90",
        lightpink: "ffb6c1",
        lightsalmon: "ffa07a",
        lightseagreen: "20b2aa",
        lightskyblue: "87cefa",
        lightslateblue: "8470ff",
        lightslategray: "778899",
        lightsteelblue: "b0c4de",
        lightyellow: "ffffe0",
        lime: "00ff00",
        limegreen: "32cd32",
        linen: "faf0e6",
        magenta: "ff00ff",
        maroon: "800000",
        mediumaquamarine: "66cdaa",
        mediumblue: "0000cd",
        mediumorchid: "ba55d3",
        mediumpurple: "9370d8",
        mediumseagreen: "3cb371",
        mediumslateblue: "7b68ee",
        mediumspringgreen: "00fa9a",
        mediumturquoise: "48d1cc",
        mediumvioletred: "c71585",
        midnightblue: "191970",
        mintcream: "f5fffa",
        mistyrose: "ffe4e1",
        moccasin: "ffe4b5",
        navajowhite: "ffdead",
        navy: "000080",
        oldlace: "fdf5e6",
        olive: "808000",
        olivedrab: "6b8e23",
        orange: "ffa500",
        orangered: "ff4500",
        orchid: "da70d6",
        palegoldenrod: "eee8aa",
        palegreen: "98fb98",
        paleturquoise: "afeeee",
        palevioletred: "d87093",
        papayawhip: "ffefd5",
        peachpuff: "ffdab9",
        peru: "cd853f",
        pink: "ffc0cb",
        plum: "dda0dd",
        powderblue: "b0e0e6",
        purple: "800080",
        red: "ff0000",
        rosybrown: "bc8f8f",
        royalblue: "4169e1",
        saddlebrown: "8b4513",
        salmon: "fa8072",
        sandybrown: "f4a460",
        seagreen: "2e8b57",
        seashell: "fff5ee",
        sienna: "a0522d",
        silver: "c0c0c0",
        skyblue: "87ceeb",
        slateblue: "6a5acd",
        slategray: "708090",
        snow: "fffafa",
        springgreen: "00ff7f",
        steelblue: "4682b4",
        tan: "d2b48c",
        teal: "008080",
        thistle: "d8bfd8",
        tomato: "ff6347",
        turquoise: "40e0d0",
        violet: "ee82ee",
        violetred: "d02090",
        wheat: "f5deb3",
        white: "ffffff",
        whitesmoke: "f5f5f5",
        yellow: "ffff00",
        yellowgreen: "9acd32",
      }[(n = (n = n.replace(/ /g, "")).toLowerCase())] || n);
  for (
    var e = [
        {
          re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
          example: ["rgb(123, 234, 45)", "rgb(255,234,245)"],
          process: function (c) {
            return [parseInt(c[1]), parseInt(c[2]), parseInt(c[3])];
          },
        },
        {
          re: /^(\w{2})(\w{2})(\w{2})$/,
          example: ["#00ff00", "336699"],
          process: function (c) {
            return [parseInt(c[1], 16), parseInt(c[2], 16), parseInt(c[3], 16)];
          },
        },
        {
          re: /^(\w{1})(\w{1})(\w{1})$/,
          example: ["#fb0", "f0f"],
          process: function (c) {
            return [
              parseInt(c[1] + c[1], 16),
              parseInt(c[2] + c[2], 16),
              parseInt(c[3] + c[3], 16),
            ];
          },
        },
      ],
      i = 0;
    i < e.length;
    i++
  ) {
    var s = e[i].re,
      a = e[i].process,
      l = s.exec(n);
    l &&
      ((t = a(l)),
      (this.r = t[0]),
      (this.g = t[1]),
      (this.b = t[2]),
      (this.ok = !0));
  }
  (this.r = this.r < 0 || isNaN(this.r) ? 0 : this.r > 255 ? 255 : this.r),
    (this.g = this.g < 0 || isNaN(this.g) ? 0 : this.g > 255 ? 255 : this.g),
    (this.b = this.b < 0 || isNaN(this.b) ? 0 : this.b > 255 ? 255 : this.b),
    (this.toRGB = function () {
      return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
    }),
    (this.toHex = function () {
      var c = this.r.toString(16),
        h = this.g.toString(16),
        g = this.b.toString(16);
      return (
        c.length == 1 && (c = "0" + c),
        h.length == 1 && (h = "0" + h),
        g.length == 1 && (g = "0" + g),
        "#" + c + h + g
      );
    });
}
/**
 * @license
 * Joseph Myers does not specify a particular license for his work.
 *
 * Author: Joseph Myers
 * Accessed from: http://www.myersdaily.org/joseph/javascript/md5.js
 *
 * Modified by: Owen Leong
 */ function Ws(n, t) {
  var e = n[0],
    i = n[1],
    s = n[2],
    a = n[3];
  (e = Qe(e, i, s, a, t[0], 7, -680876936)),
    (a = Qe(a, e, i, s, t[1], 12, -389564586)),
    (s = Qe(s, a, e, i, t[2], 17, 606105819)),
    (i = Qe(i, s, a, e, t[3], 22, -1044525330)),
    (e = Qe(e, i, s, a, t[4], 7, -176418897)),
    (a = Qe(a, e, i, s, t[5], 12, 1200080426)),
    (s = Qe(s, a, e, i, t[6], 17, -1473231341)),
    (i = Qe(i, s, a, e, t[7], 22, -45705983)),
    (e = Qe(e, i, s, a, t[8], 7, 1770035416)),
    (a = Qe(a, e, i, s, t[9], 12, -1958414417)),
    (s = Qe(s, a, e, i, t[10], 17, -42063)),
    (i = Qe(i, s, a, e, t[11], 22, -1990404162)),
    (e = Qe(e, i, s, a, t[12], 7, 1804603682)),
    (a = Qe(a, e, i, s, t[13], 12, -40341101)),
    (s = Qe(s, a, e, i, t[14], 17, -1502002290)),
    (e = tn(
      e,
      (i = Qe(i, s, a, e, t[15], 22, 1236535329)),
      s,
      a,
      t[1],
      5,
      -165796510,
    )),
    (a = tn(a, e, i, s, t[6], 9, -1069501632)),
    (s = tn(s, a, e, i, t[11], 14, 643717713)),
    (i = tn(i, s, a, e, t[0], 20, -373897302)),
    (e = tn(e, i, s, a, t[5], 5, -701558691)),
    (a = tn(a, e, i, s, t[10], 9, 38016083)),
    (s = tn(s, a, e, i, t[15], 14, -660478335)),
    (i = tn(i, s, a, e, t[4], 20, -405537848)),
    (e = tn(e, i, s, a, t[9], 5, 568446438)),
    (a = tn(a, e, i, s, t[14], 9, -1019803690)),
    (s = tn(s, a, e, i, t[3], 14, -187363961)),
    (i = tn(i, s, a, e, t[8], 20, 1163531501)),
    (e = tn(e, i, s, a, t[13], 5, -1444681467)),
    (a = tn(a, e, i, s, t[2], 9, -51403784)),
    (s = tn(s, a, e, i, t[7], 14, 1735328473)),
    (e = en(
      e,
      (i = tn(i, s, a, e, t[12], 20, -1926607734)),
      s,
      a,
      t[5],
      4,
      -378558,
    )),
    (a = en(a, e, i, s, t[8], 11, -2022574463)),
    (s = en(s, a, e, i, t[11], 16, 1839030562)),
    (i = en(i, s, a, e, t[14], 23, -35309556)),
    (e = en(e, i, s, a, t[1], 4, -1530992060)),
    (a = en(a, e, i, s, t[4], 11, 1272893353)),
    (s = en(s, a, e, i, t[7], 16, -155497632)),
    (i = en(i, s, a, e, t[10], 23, -1094730640)),
    (e = en(e, i, s, a, t[13], 4, 681279174)),
    (a = en(a, e, i, s, t[0], 11, -358537222)),
    (s = en(s, a, e, i, t[3], 16, -722521979)),
    (i = en(i, s, a, e, t[6], 23, 76029189)),
    (e = en(e, i, s, a, t[9], 4, -640364487)),
    (a = en(a, e, i, s, t[12], 11, -421815835)),
    (s = en(s, a, e, i, t[15], 16, 530742520)),
    (e = nn(
      e,
      (i = en(i, s, a, e, t[2], 23, -995338651)),
      s,
      a,
      t[0],
      6,
      -198630844,
    )),
    (a = nn(a, e, i, s, t[7], 10, 1126891415)),
    (s = nn(s, a, e, i, t[14], 15, -1416354905)),
    (i = nn(i, s, a, e, t[5], 21, -57434055)),
    (e = nn(e, i, s, a, t[12], 6, 1700485571)),
    (a = nn(a, e, i, s, t[3], 10, -1894986606)),
    (s = nn(s, a, e, i, t[10], 15, -1051523)),
    (i = nn(i, s, a, e, t[1], 21, -2054922799)),
    (e = nn(e, i, s, a, t[8], 6, 1873313359)),
    (a = nn(a, e, i, s, t[15], 10, -30611744)),
    (s = nn(s, a, e, i, t[6], 15, -1560198380)),
    (i = nn(i, s, a, e, t[13], 21, 1309151649)),
    (e = nn(e, i, s, a, t[4], 6, -145523070)),
    (a = nn(a, e, i, s, t[11], 10, -1120210379)),
    (s = nn(s, a, e, i, t[2], 15, 718787259)),
    (i = nn(i, s, a, e, t[9], 21, -343485551)),
    (n[0] = Tr(e, n[0])),
    (n[1] = Tr(i, n[1])),
    (n[2] = Tr(s, n[2])),
    (n[3] = Tr(a, n[3]));
}
function $o(n, t, e, i, s, a) {
  return (t = Tr(Tr(t, n), Tr(i, a))), Tr((t << s) | (t >>> (32 - s)), e);
}
function Qe(n, t, e, i, s, a, l) {
  return $o((t & e) | (~t & i), n, t, s, a, l);
}
function tn(n, t, e, i, s, a, l) {
  return $o((t & i) | (e & ~i), n, t, s, a, l);
}
function en(n, t, e, i, s, a, l) {
  return $o(t ^ e ^ i, n, t, s, a, l);
}
function nn(n, t, e, i, s, a, l) {
  return $o(e ^ (t | ~i), n, t, s, a, l);
}
function Bl(n) {
  var t,
    e = n.length,
    i = [1732584193, -271733879, -1732584194, 271733878];
  for (t = 64; t <= n.length; t += 64) Ws(i, qf(n.substring(t - 64, t)));
  n = n.substring(t - 64);
  var s = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (t = 0; t < n.length; t++) s[t >> 2] |= n.charCodeAt(t) << (t % 4 << 3);
  if (((s[t >> 2] |= 128 << (t % 4 << 3)), t > 55))
    for (Ws(i, s), t = 0; t < 16; t++) s[t] = 0;
  return (s[14] = 8 * e), Ws(i, s), i;
}
function qf(n) {
  var t,
    e = [];
  for (t = 0; t < 64; t += 4)
    e[t >> 2] =
      n.charCodeAt(t) +
      (n.charCodeAt(t + 1) << 8) +
      (n.charCodeAt(t + 2) << 16) +
      (n.charCodeAt(t + 3) << 24);
  return e;
}
(ka = Ht.atob.bind(Ht)), (nu = Ht.btoa.bind(Ht));
var Qu = "0123456789abcdef".split("");
function Tf(n) {
  for (var t = "", e = 0; e < 4; e++)
    t += Qu[(n >> (8 * e + 4)) & 15] + Qu[(n >> (8 * e)) & 15];
  return t;
}
function Df(n) {
  return String.fromCharCode(
    (255 & n) >> 0,
    (65280 & n) >> 8,
    (16711680 & n) >> 16,
    (4278190080 & n) >> 24,
  );
}
function ru(n) {
  return Bl(n).map(Df).join("");
}
var Rf =
  (function (n) {
    for (var t = 0; t < n.length; t++) n[t] = Tf(n[t]);
    return n.join("");
  })(Bl("hello")) != "5d41402abc4b2a76b9719d911017c592";
function Tr(n, t) {
  if (Rf) {
    var e = (65535 & n) + (65535 & t);
    return (((n >> 16) + (t >> 16) + (e >> 16)) << 16) | (65535 & e);
  }
  return (n + t) & 4294967295;
}
/**
 * @license
 * FPDF is released under a permissive license: there is no usage restriction.
 * You may embed it freely in your application (commercial or not), with or
 * without modifications.
 *
 * Reference: http://www.fpdf.org/en/script/script37.php
 */ function iu(n, t) {
  var e, i, s, a;
  if (n !== e) {
    for (
      var l =
          ((s = n),
          (a = 1 + ((256 / n.length) >> 0)),
          new Array(a + 1).join(s)),
        c = [],
        h = 0;
      h < 256;
      h++
    )
      c[h] = h;
    var g = 0;
    for (h = 0; h < 256; h++) {
      var m = c[h];
      (g = (g + m + l.charCodeAt(h)) % 256), (c[h] = c[g]), (c[g] = m);
    }
    (e = n), (i = c);
  } else c = i;
  var v = t.length,
    N = 0,
    p = 0,
    F = "";
  for (h = 0; h < v; h++)
    (p = (p + (m = c[(N = (N + 1) % 256)])) % 256),
      (c[N] = c[p]),
      (c[p] = m),
      (l = c[(c[N] + c[p]) % 256]),
      (F += String.fromCharCode(t.charCodeAt(h) ^ l));
  return F;
}
/**
 * @license
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 * Author: Owen Leong (@owenl131)
 * Date: 15 Oct 2020
 * References:
 * https://www.cs.cmu.edu/~dst/Adobe/Gallery/anon21jul01-pdf-encryption.txt
 * https://github.com/foliojs/pdfkit/blob/master/lib/security.js
 * http://www.fpdf.org/en/script/script37.php
 */ var tl = { print: 4, modify: 8, copy: 16, "annot-forms": 32 };
function Ri(n, t, e, i) {
  (this.v = 1), (this.r = 2);
  var s = 192;
  n.forEach(function (c) {
    if (tl.perm !== void 0) throw new Error("Invalid permission: " + c);
    s += tl[c];
  }),
    (this.padding = "(¿N^NuAd\0NVÿú\b..\0¶Ðh>/\f©þdSiz");
  var a = (t + this.padding).substr(0, 32),
    l = (e + this.padding).substr(0, 32);
  (this.O = this.processOwnerPassword(a, l)),
    (this.P = -(1 + (255 ^ s))),
    (this.encryptionKey = ru(
      a + this.O + this.lsbFirstWord(this.P) + this.hexToBytes(i),
    ).substr(0, 5)),
    (this.U = iu(this.encryptionKey, this.padding));
}
function zi(n) {
  if (/[^\u0000-\u00ff]/.test(n))
    throw new Error(
      "Invalid PDF Name Object: " + n + ", Only accept ASCII characters.",
    );
  for (var t = "", e = n.length, i = 0; i < e; i++) {
    var s = n.charCodeAt(i);
    s < 33 ||
    s === 35 ||
    s === 37 ||
    s === 40 ||
    s === 41 ||
    s === 47 ||
    s === 60 ||
    s === 62 ||
    s === 91 ||
    s === 93 ||
    s === 123 ||
    s === 125 ||
    s > 126
      ? (t += "#" + ("0" + s.toString(16)).slice(-2))
      : (t += n[i]);
  }
  return t;
}
function el(n) {
  if (de(n) !== "object")
    throw new Error(
      "Invalid Context passed to initialize PubSub (jsPDF-module)",
    );
  var t = {};
  (this.subscribe = function (e, i, s) {
    if (
      ((s = s || !1),
      typeof e != "string" || typeof i != "function" || typeof s != "boolean")
    )
      throw new Error(
        "Invalid arguments passed to PubSub.subscribe (jsPDF-module)",
      );
    t.hasOwnProperty(e) || (t[e] = {});
    var a = Math.random().toString(35);
    return (t[e][a] = [i, !!s]), a;
  }),
    (this.unsubscribe = function (e) {
      for (var i in t)
        if (t[i][e])
          return (
            delete t[i][e], Object.keys(t[i]).length === 0 && delete t[i], !0
          );
      return !1;
    }),
    (this.publish = function (e) {
      if (t.hasOwnProperty(e)) {
        var i = Array.prototype.slice.call(arguments, 1),
          s = [];
        for (var a in t[e]) {
          var l = t[e][a];
          try {
            l[0].apply(n, i);
          } catch (c) {
            Ht.console && be.error("jsPDF PubSub Error", c.message, c);
          }
          l[1] && s.push(a);
        }
        s.length && s.forEach(this.unsubscribe);
      }
    }),
    (this.getTopics = function () {
      return t;
    });
}
function qo(n) {
  if (!(this instanceof qo)) return new qo(n);
  var t = "opacity,stroke-opacity".split(",");
  for (var e in n) n.hasOwnProperty(e) && t.indexOf(e) >= 0 && (this[e] = n[e]);
  (this.id = ""), (this.objectNumber = -1);
}
function ql(n, t) {
  (this.gState = n),
    (this.matrix = t),
    (this.id = ""),
    (this.objectNumber = -1);
}
function ni(n, t, e, i, s) {
  if (!(this instanceof ni)) return new ni(n, t, e, i, s);
  (this.type = n === "axial" ? 2 : 3),
    (this.coords = t),
    (this.colors = e),
    ql.call(this, i, s);
}
function Ui(n, t, e, i, s) {
  if (!(this instanceof Ui)) return new Ui(n, t, e, i, s);
  (this.boundingBox = n),
    (this.xStep = t),
    (this.yStep = e),
    (this.stream = ""),
    (this.cloneIndex = 0),
    ql.call(this, i, s);
}
function zt(n) {
  var t,
    e = typeof arguments[0] == "string" ? arguments[0] : "p",
    i = arguments[1],
    s = arguments[2],
    a = arguments[3],
    l = [],
    c = 1,
    h = 16,
    g = "S",
    m = null;
  de((n = n || {})) === "object" &&
    ((e = n.orientation),
    (i = n.unit || i),
    (s = n.format || s),
    (a = n.compress || n.compressPdf || a),
    (m = n.encryption || null) !== null &&
      ((m.userPassword = m.userPassword || ""),
      (m.ownerPassword = m.ownerPassword || ""),
      (m.userPermissions = m.userPermissions || [])),
    (c = typeof n.userUnit == "number" ? Math.abs(n.userUnit) : 1),
    n.precision !== void 0 && (t = n.precision),
    n.floatPrecision !== void 0 && (h = n.floatPrecision),
    (g = n.defaultPathOperation || "S")),
    (l = n.filters || (a === !0 ? ["FlateEncode"] : l)),
    (i = i || "mm"),
    (e = ("" + (e || "P")).toLowerCase());
  var v = n.putOnlyUsedFonts || !1,
    N = {},
    p = { internal: {}, __private__: {} };
  p.__private__.PubSub = el;
  var F = "1.3",
    P = (p.__private__.getPdfVersion = function () {
      return F;
    });
  p.__private__.setPdfVersion = function (u) {
    F = u;
  };
  var M = {
    a0: [2383.94, 3370.39],
    a1: [1683.78, 2383.94],
    a2: [1190.55, 1683.78],
    a3: [841.89, 1190.55],
    a4: [595.28, 841.89],
    a5: [419.53, 595.28],
    a6: [297.64, 419.53],
    a7: [209.76, 297.64],
    a8: [147.4, 209.76],
    a9: [104.88, 147.4],
    a10: [73.7, 104.88],
    b0: [2834.65, 4008.19],
    b1: [2004.09, 2834.65],
    b2: [1417.32, 2004.09],
    b3: [1000.63, 1417.32],
    b4: [708.66, 1000.63],
    b5: [498.9, 708.66],
    b6: [354.33, 498.9],
    b7: [249.45, 354.33],
    b8: [175.75, 249.45],
    b9: [124.72, 175.75],
    b10: [87.87, 124.72],
    c0: [2599.37, 3676.54],
    c1: [1836.85, 2599.37],
    c2: [1298.27, 1836.85],
    c3: [918.43, 1298.27],
    c4: [649.13, 918.43],
    c5: [459.21, 649.13],
    c6: [323.15, 459.21],
    c7: [229.61, 323.15],
    c8: [161.57, 229.61],
    c9: [113.39, 161.57],
    c10: [79.37, 113.39],
    dl: [311.81, 623.62],
    letter: [612, 792],
    "government-letter": [576, 756],
    legal: [612, 1008],
    "junior-legal": [576, 360],
    ledger: [1224, 792],
    tabloid: [792, 1224],
    "credit-card": [153, 243],
  };
  p.__private__.getPageFormats = function () {
    return M;
  };
  var _ = (p.__private__.getPageFormat = function (u) {
    return M[u];
  });
  s = s || "a4";
  var E = { COMPAT: "compat", ADVANCED: "advanced" },
    G = E.COMPAT;
  function nt() {
    this.saveGraphicsState(),
      q(new Rt(jt, 0, 0, -jt, 0, Lr() * jt).toString() + " cm"),
      this.setFontSize(this.getFontSize() / jt),
      (g = "n"),
      (G = E.ADVANCED);
  }
  function st() {
    this.restoreGraphicsState(), (g = "S"), (G = E.COMPAT);
  }
  var wt = (p.__private__.combineFontStyleAndFontWeight = function (u, y) {
    if (
      (u == "bold" && y == "normal") ||
      (u == "bold" && y == 400) ||
      (u == "normal" && y == "italic") ||
      (u == "bold" && y == "italic")
    )
      throw new Error("Invalid Combination of fontweight and fontstyle");
    return (
      y &&
        (u =
          y == 400 || y === "normal"
            ? u === "italic"
              ? "italic"
              : "normal"
            : (y != 700 && y !== "bold") || u !== "normal"
              ? (y == 700 ? "bold" : y) + "" + u
              : "bold"),
      u
    );
  });
  (p.advancedAPI = function (u) {
    var y = G === E.COMPAT;
    return (
      y && nt.call(this),
      typeof u != "function" || (u(this), y && st.call(this)),
      this
    );
  }),
    (p.compatAPI = function (u) {
      var y = G === E.ADVANCED;
      return (
        y && st.call(this),
        typeof u != "function" || (u(this), y && nt.call(this)),
        this
      );
    }),
    (p.isAdvancedAPI = function () {
      return G === E.ADVANCED;
    });
  var tt,
    z = function (u) {
      if (G !== E.ADVANCED)
        throw new Error(
          u +
            " is only available in 'advanced' API mode. You need to call advancedAPI() first.",
        );
    },
    it =
      (p.roundToPrecision =
      p.__private__.roundToPrecision =
        function (u, y) {
          var O = t || y;
          if (isNaN(u) || isNaN(O))
            throw new Error(
              "Invalid argument passed to jsPDF.roundToPrecision",
            );
          return u.toFixed(O).replace(/0+$/, "");
        });
  tt =
    p.hpf =
    p.__private__.hpf =
      typeof h == "number"
        ? function (u) {
            if (isNaN(u))
              throw new Error("Invalid argument passed to jsPDF.hpf");
            return it(u, h);
          }
        : h === "smart"
          ? function (u) {
              if (isNaN(u))
                throw new Error("Invalid argument passed to jsPDF.hpf");
              return it(u, u > -1 && u < 1 ? 16 : 5);
            }
          : function (u) {
              if (isNaN(u))
                throw new Error("Invalid argument passed to jsPDF.hpf");
              return it(u, 16);
            };
  var dt =
      (p.f2 =
      p.__private__.f2 =
        function (u) {
          if (isNaN(u)) throw new Error("Invalid argument passed to jsPDF.f2");
          return it(u, 2);
        }),
    k = (p.__private__.f3 = function (u) {
      if (isNaN(u)) throw new Error("Invalid argument passed to jsPDF.f3");
      return it(u, 3);
    }),
    I =
      (p.scale =
      p.__private__.scale =
        function (u) {
          if (isNaN(u))
            throw new Error("Invalid argument passed to jsPDF.scale");
          return G === E.COMPAT ? u * jt : G === E.ADVANCED ? u : void 0;
        }),
    W = function (u) {
      return G === E.COMPAT ? Lr() - u : G === E.ADVANCED ? u : void 0;
    },
    T = function (u) {
      return I(W(u));
    };
  p.__private__.setPrecision = p.setPrecision = function (u) {
    typeof parseInt(u, 10) == "number" && (t = parseInt(u, 10));
  };
  var ut,
    at = "00000000000000000000000000000000",
    ct = (p.__private__.getFileId = function () {
      return at;
    }),
    Z = (p.__private__.setFileId = function (u) {
      return (
        (at =
          u !== void 0 && /^[a-fA-F0-9]{32}$/.test(u)
            ? u.toUpperCase()
            : at
                .split("")
                .map(function () {
                  return "ABCDEF0123456789".charAt(
                    Math.floor(16 * Math.random()),
                  );
                })
                .join("")),
        m !== null &&
          (Ke = new Ri(m.userPermissions, m.userPassword, m.ownerPassword, at)),
        at
      );
    });
  (p.setFileId = function (u) {
    return Z(u), this;
  }),
    (p.getFileId = function () {
      return ct();
    });
  var ft = (p.__private__.convertDateToPDFDate = function (u) {
      var y = u.getTimezoneOffset(),
        O = y < 0 ? "+" : "-",
        D = Math.floor(Math.abs(y / 60)),
        J = Math.abs(y % 60),
        lt = [O, B(D), "'", B(J), "'"].join("");
      return [
        "D:",
        u.getFullYear(),
        B(u.getMonth() + 1),
        B(u.getDate()),
        B(u.getHours()),
        B(u.getMinutes()),
        B(u.getSeconds()),
        lt,
      ].join("");
    }),
    pt = (p.__private__.convertPDFDateToDate = function (u) {
      var y = parseInt(u.substr(2, 4), 10),
        O = parseInt(u.substr(6, 2), 10) - 1,
        D = parseInt(u.substr(8, 2), 10),
        J = parseInt(u.substr(10, 2), 10),
        lt = parseInt(u.substr(12, 2), 10),
        yt = parseInt(u.substr(14, 2), 10);
      return new Date(y, O, D, J, lt, yt, 0);
    }),
    Ct = (p.__private__.setCreationDate = function (u) {
      var y;
      if ((u === void 0 && (u = new Date()), u instanceof Date)) y = ft(u);
      else {
        if (
          !/^D:(20[0-2][0-9]|203[0-7]|19[7-9][0-9])(0[0-9]|1[0-2])([0-2][0-9]|3[0-1])(0[0-9]|1[0-9]|2[0-3])(0[0-9]|[1-5][0-9])(0[0-9]|[1-5][0-9])(\+0[0-9]|\+1[0-4]|-0[0-9]|-1[0-1])'(0[0-9]|[1-5][0-9])'?$/.test(
            u,
          )
        )
          throw new Error("Invalid argument passed to jsPDF.setCreationDate");
        y = u;
      }
      return (ut = y);
    }),
    A = (p.__private__.getCreationDate = function (u) {
      var y = ut;
      return u === "jsDate" && (y = pt(ut)), y;
    });
  (p.setCreationDate = function (u) {
    return Ct(u), this;
  }),
    (p.getCreationDate = function (u) {
      return A(u);
    });
  var j,
    B = (p.__private__.padd2 = function (u) {
      return ("0" + parseInt(u)).slice(-2);
    }),
    R = (p.__private__.padd2Hex = function (u) {
      return ("00" + (u = u.toString())).substr(u.length);
    }),
    Y = 0,
    Q = [],
    et = [],
    rt = 0,
    Nt = [],
    At = [],
    It = !1,
    _t = et,
    Ut = function () {
      (Y = 0),
        (rt = 0),
        (et = []),
        (Q = []),
        (Nt = []),
        (cr = Be()),
        (En = Be());
    };
  p.__private__.setCustomOutputDestination = function (u) {
    (It = !0), (_t = u);
  };
  var ht = function (u) {
    It || (_t = u);
  };
  p.__private__.resetCustomOutputDestination = function () {
    (It = !1), (_t = et);
  };
  var q = (p.__private__.out = function (u) {
      return (u = u.toString()), (rt += u.length + 1), _t.push(u), _t;
    }),
    Xt = (p.__private__.write = function (u) {
      return q(
        arguments.length === 1
          ? u.toString()
          : Array.prototype.join.call(arguments, " "),
      );
    }),
    Bt = (p.__private__.getArrayBuffer = function (u) {
      for (
        var y = u.length, O = new ArrayBuffer(y), D = new Uint8Array(O);
        y--;

      )
        D[y] = u.charCodeAt(y);
      return O;
    }),
    xt = [
      ["Helvetica", "helvetica", "normal", "WinAnsiEncoding"],
      ["Helvetica-Bold", "helvetica", "bold", "WinAnsiEncoding"],
      ["Helvetica-Oblique", "helvetica", "italic", "WinAnsiEncoding"],
      ["Helvetica-BoldOblique", "helvetica", "bolditalic", "WinAnsiEncoding"],
      ["Courier", "courier", "normal", "WinAnsiEncoding"],
      ["Courier-Bold", "courier", "bold", "WinAnsiEncoding"],
      ["Courier-Oblique", "courier", "italic", "WinAnsiEncoding"],
      ["Courier-BoldOblique", "courier", "bolditalic", "WinAnsiEncoding"],
      ["Times-Roman", "times", "normal", "WinAnsiEncoding"],
      ["Times-Bold", "times", "bold", "WinAnsiEncoding"],
      ["Times-Italic", "times", "italic", "WinAnsiEncoding"],
      ["Times-BoldItalic", "times", "bolditalic", "WinAnsiEncoding"],
      ["ZapfDingbats", "zapfdingbats", "normal", null],
      ["Symbol", "symbol", "normal", null],
    ];
  p.__private__.getStandardFonts = function () {
    return xt;
  };
  var Lt = n.fontSize || 16;
  p.__private__.setFontSize = p.setFontSize = function (u) {
    return (Lt = G === E.ADVANCED ? u / jt : u), this;
  };
  var Ft,
    kt =
      (p.__private__.getFontSize =
      p.getFontSize =
        function () {
          return G === E.COMPAT ? Lt : Lt * jt;
        }),
    qt = n.R2L || !1;
  (p.__private__.setR2L = p.setR2L =
    function (u) {
      return (qt = u), this;
    }),
    (p.__private__.getR2L = p.getR2L =
      function () {
        return qt;
      });
  var Gt,
    Qt = (p.__private__.setZoomMode = function (u) {
      var y = [void 0, null, "fullwidth", "fullheight", "fullpage", "original"];
      if (/^(?:\d+\.\d*|\d*\.\d+|\d+)%$/.test(u)) Ft = u;
      else if (isNaN(u)) {
        if (y.indexOf(u) === -1)
          throw new Error(
            'zoom must be Integer (e.g. 2), a percentage Value (e.g. 300%) or fullwidth, fullheight, fullpage, original. "' +
              u +
              '" is not recognized.',
          );
        Ft = u;
      } else Ft = parseInt(u, 10);
    });
  p.__private__.getZoomMode = function () {
    return Ft;
  };
  var ee,
    ae = (p.__private__.setPageMode = function (u) {
      if (
        [
          void 0,
          null,
          "UseNone",
          "UseOutlines",
          "UseThumbs",
          "FullScreen",
        ].indexOf(u) == -1
      )
        throw new Error(
          'Page mode must be one of UseNone, UseOutlines, UseThumbs, or FullScreen. "' +
            u +
            '" is not recognized.',
        );
      Gt = u;
    });
  p.__private__.getPageMode = function () {
    return Gt;
  };
  var pe = (p.__private__.setLayoutMode = function (u) {
    if (
      [
        void 0,
        null,
        "continuous",
        "single",
        "twoleft",
        "tworight",
        "two",
      ].indexOf(u) == -1
    )
      throw new Error(
        'Layout mode must be one of continuous, single, twoleft, tworight. "' +
          u +
          '" is not recognized.',
      );
    ee = u;
  });
  (p.__private__.getLayoutMode = function () {
    return ee;
  }),
    (p.__private__.setDisplayMode = p.setDisplayMode =
      function (u, y, O) {
        return Qt(u), pe(y), ae(O), this;
      });
  var Wt = { title: "", subject: "", author: "", keywords: "", creator: "" };
  (p.__private__.getDocumentProperty = function (u) {
    if (Object.keys(Wt).indexOf(u) === -1)
      throw new Error("Invalid argument passed to jsPDF.getDocumentProperty");
    return Wt[u];
  }),
    (p.__private__.getDocumentProperties = function () {
      return Wt;
    }),
    (p.__private__.setDocumentProperties =
      p.setProperties =
      p.setDocumentProperties =
        function (u) {
          for (var y in Wt) Wt.hasOwnProperty(y) && u[y] && (Wt[y] = u[y]);
          return this;
        }),
    (p.__private__.setDocumentProperty = function (u, y) {
      if (Object.keys(Wt).indexOf(u) === -1)
        throw new Error(
          "Invalid arguments passed to jsPDF.setDocumentProperty",
        );
      return (Wt[u] = y);
    });
  var ne,
    jt,
    Xe,
    se,
    Fn,
    me = {},
    Ae = {},
    Jn = [],
    le = {},
    Ur = {},
    Se = {},
    jn = {},
    lr = null,
    _e = 0,
    $t = [],
    ce = new el(p),
    Hr = n.hotfixes || [],
    $e = {},
    Xn = {},
    Kn = [],
    Rt = function u(y, O, D, J, lt, yt) {
      if (!(this instanceof u)) return new u(y, O, D, J, lt, yt);
      isNaN(y) && (y = 1),
        isNaN(O) && (O = 0),
        isNaN(D) && (D = 0),
        isNaN(J) && (J = 1),
        isNaN(lt) && (lt = 0),
        isNaN(yt) && (yt = 0),
        (this._matrix = [y, O, D, J, lt, yt]);
    };
  Object.defineProperty(Rt.prototype, "sx", {
    get: function () {
      return this._matrix[0];
    },
    set: function (u) {
      this._matrix[0] = u;
    },
  }),
    Object.defineProperty(Rt.prototype, "shy", {
      get: function () {
        return this._matrix[1];
      },
      set: function (u) {
        this._matrix[1] = u;
      },
    }),
    Object.defineProperty(Rt.prototype, "shx", {
      get: function () {
        return this._matrix[2];
      },
      set: function (u) {
        this._matrix[2] = u;
      },
    }),
    Object.defineProperty(Rt.prototype, "sy", {
      get: function () {
        return this._matrix[3];
      },
      set: function (u) {
        this._matrix[3] = u;
      },
    }),
    Object.defineProperty(Rt.prototype, "tx", {
      get: function () {
        return this._matrix[4];
      },
      set: function (u) {
        this._matrix[4] = u;
      },
    }),
    Object.defineProperty(Rt.prototype, "ty", {
      get: function () {
        return this._matrix[5];
      },
      set: function (u) {
        this._matrix[5] = u;
      },
    }),
    Object.defineProperty(Rt.prototype, "a", {
      get: function () {
        return this._matrix[0];
      },
      set: function (u) {
        this._matrix[0] = u;
      },
    }),
    Object.defineProperty(Rt.prototype, "b", {
      get: function () {
        return this._matrix[1];
      },
      set: function (u) {
        this._matrix[1] = u;
      },
    }),
    Object.defineProperty(Rt.prototype, "c", {
      get: function () {
        return this._matrix[2];
      },
      set: function (u) {
        this._matrix[2] = u;
      },
    }),
    Object.defineProperty(Rt.prototype, "d", {
      get: function () {
        return this._matrix[3];
      },
      set: function (u) {
        this._matrix[3] = u;
      },
    }),
    Object.defineProperty(Rt.prototype, "e", {
      get: function () {
        return this._matrix[4];
      },
      set: function (u) {
        this._matrix[4] = u;
      },
    }),
    Object.defineProperty(Rt.prototype, "f", {
      get: function () {
        return this._matrix[5];
      },
      set: function (u) {
        this._matrix[5] = u;
      },
    }),
    Object.defineProperty(Rt.prototype, "rotation", {
      get: function () {
        return Math.atan2(this.shx, this.sx);
      },
    }),
    Object.defineProperty(Rt.prototype, "scaleX", {
      get: function () {
        return this.decompose().scale.sx;
      },
    }),
    Object.defineProperty(Rt.prototype, "scaleY", {
      get: function () {
        return this.decompose().scale.sy;
      },
    }),
    Object.defineProperty(Rt.prototype, "isIdentity", {
      get: function () {
        return (
          this.sx === 1 &&
          this.shy === 0 &&
          this.shx === 0 &&
          this.sy === 1 &&
          this.tx === 0 &&
          this.ty === 0
        );
      },
    }),
    (Rt.prototype.join = function (u) {
      return [this.sx, this.shy, this.shx, this.sy, this.tx, this.ty]
        .map(tt)
        .join(u);
    }),
    (Rt.prototype.multiply = function (u) {
      var y = u.sx * this.sx + u.shy * this.shx,
        O = u.sx * this.shy + u.shy * this.sy,
        D = u.shx * this.sx + u.sy * this.shx,
        J = u.shx * this.shy + u.sy * this.sy,
        lt = u.tx * this.sx + u.ty * this.shx + this.tx,
        yt = u.tx * this.shy + u.ty * this.sy + this.ty;
      return new Rt(y, O, D, J, lt, yt);
    }),
    (Rt.prototype.decompose = function () {
      var u = this.sx,
        y = this.shy,
        O = this.shx,
        D = this.sy,
        J = this.tx,
        lt = this.ty,
        yt = Math.sqrt(u * u + y * y),
        Ot = (u /= yt) * O + (y /= yt) * D;
      (O -= u * Ot), (D -= y * Ot);
      var Tt = Math.sqrt(O * O + D * D);
      return (
        (Ot /= Tt),
        u * (D /= Tt) < y * (O /= Tt) &&
          ((u = -u), (y = -y), (Ot = -Ot), (yt = -yt)),
        {
          scale: new Rt(yt, 0, 0, Tt, 0, 0),
          translate: new Rt(1, 0, 0, 1, J, lt),
          rotate: new Rt(u, y, -y, u, 0, 0),
          skew: new Rt(1, 0, Ot, 1, 0, 0),
        }
      );
    }),
    (Rt.prototype.toString = function (u) {
      return this.join(" ");
    }),
    (Rt.prototype.inversed = function () {
      var u = this.sx,
        y = this.shy,
        O = this.shx,
        D = this.sy,
        J = this.tx,
        lt = this.ty,
        yt = 1 / (u * D - y * O),
        Ot = D * yt,
        Tt = -y * yt,
        Kt = -O * yt,
        Yt = u * yt;
      return new Rt(Ot, Tt, Kt, Yt, -Ot * J - Kt * lt, -Tt * J - Yt * lt);
    }),
    (Rt.prototype.applyToPoint = function (u) {
      var y = u.x * this.sx + u.y * this.shx + this.tx,
        O = u.x * this.shy + u.y * this.sy + this.ty;
      return new xi(y, O);
    }),
    (Rt.prototype.applyToRectangle = function (u) {
      var y = this.applyToPoint(u),
        O = this.applyToPoint(new xi(u.x + u.w, u.y + u.h));
      return new ia(y.x, y.y, O.x - y.x, O.y - y.y);
    }),
    (Rt.prototype.clone = function () {
      var u = this.sx,
        y = this.shy,
        O = this.shx,
        D = this.sy,
        J = this.tx,
        lt = this.ty;
      return new Rt(u, y, O, D, J, lt);
    }),
    (p.Matrix = Rt);
  var On = (p.matrixMult = function (u, y) {
      return y.multiply(u);
    }),
    Zn = new Rt(1, 0, 0, 1, 0, 0);
  p.unitMatrix = p.identityMatrix = Zn;
  var ln = function (u, y) {
    if (!Ur[u]) {
      var O =
        (y instanceof ni ? "Sh" : "P") +
        (Object.keys(le).length + 1).toString(10);
      (y.id = O), (Ur[u] = O), (le[O] = y), ce.publish("addPattern", y);
    }
  };
  (p.ShadingPattern = ni),
    (p.TilingPattern = Ui),
    (p.addShadingPattern = function (u, y) {
      return z("addShadingPattern()"), ln(u, y), this;
    }),
    (p.beginTilingPattern = function (u) {
      z("beginTilingPattern()"),
        Ka(
          u.boundingBox[0],
          u.boundingBox[1],
          u.boundingBox[2] - u.boundingBox[0],
          u.boundingBox[3] - u.boundingBox[1],
          u.matrix,
        );
    }),
    (p.endTilingPattern = function (u, y) {
      z("endTilingPattern()"),
        (y.stream = At[j].join(`
`)),
        ln(u, y),
        ce.publish("endTilingPattern", y),
        Kn.pop().restore();
    });
  var ze = (p.__private__.newObject = function () {
      var u = Be();
      return vn(u, !0), u;
    }),
    Be = (p.__private__.newObjectDeferred = function () {
      return (
        Y++,
        (Q[Y] = function () {
          return rt;
        }),
        Y
      );
    }),
    vn = function (u, y) {
      return (
        (y = typeof y == "boolean" && y), (Q[u] = rt), y && q(u + " 0 obj"), u
      );
    },
    ui = (p.__private__.newAdditionalObject = function () {
      var u = { objId: Be(), content: "" };
      return Nt.push(u), u;
    }),
    cr = Be(),
    En = Be(),
    Mn = (p.__private__.decodeColorString = function (u) {
      var y = u.split(" ");
      if (y.length !== 2 || (y[1] !== "g" && y[1] !== "G"))
        y.length === 5 &&
          (y[4] === "k" || y[4] === "K") &&
          (y = [
            (1 - y[0]) * (1 - y[3]),
            (1 - y[1]) * (1 - y[3]),
            (1 - y[2]) * (1 - y[3]),
            "r",
          ]);
      else {
        var O = parseFloat(y[0]);
        y = [O, O, O, "r"];
      }
      for (var D = "#", J = 0; J < 3; J++)
        D += ("0" + Math.floor(255 * parseFloat(y[J])).toString(16)).slice(-2);
      return D;
    }),
    Bn = (p.__private__.encodeColorString = function (u) {
      var y;
      typeof u == "string" && (u = { ch1: u });
      var O = u.ch1,
        D = u.ch2,
        J = u.ch3,
        lt = u.ch4,
        yt = u.pdfColorType === "draw" ? ["G", "RG", "K"] : ["g", "rg", "k"];
      if (typeof O == "string" && O.charAt(0) !== "#") {
        var Ot = new Ml(O);
        if (Ot.ok) O = Ot.toHex();
        else if (!/^\d*\.?\d*$/.test(O))
          throw new Error(
            'Invalid color "' + O + '" passed to jsPDF.encodeColorString.',
          );
      }
      if (
        (typeof O == "string" &&
          /^#[0-9A-Fa-f]{3}$/.test(O) &&
          (O = "#" + O[1] + O[1] + O[2] + O[2] + O[3] + O[3]),
        typeof O == "string" && /^#[0-9A-Fa-f]{6}$/.test(O))
      ) {
        var Tt = parseInt(O.substr(1), 16);
        (O = (Tt >> 16) & 255), (D = (Tt >> 8) & 255), (J = 255 & Tt);
      }
      if (D === void 0 || (lt === void 0 && O === D && D === J))
        if (typeof O == "string") y = O + " " + yt[0];
        else
          switch (u.precision) {
            case 2:
              y = dt(O / 255) + " " + yt[0];
              break;
            case 3:
            default:
              y = k(O / 255) + " " + yt[0];
          }
      else if (lt === void 0 || de(lt) === "object") {
        if (lt && !isNaN(lt.a) && lt.a === 0)
          return (y = ["1.", "1.", "1.", yt[1]].join(" "));
        if (typeof O == "string") y = [O, D, J, yt[1]].join(" ");
        else
          switch (u.precision) {
            case 2:
              y = [dt(O / 255), dt(D / 255), dt(J / 255), yt[1]].join(" ");
              break;
            default:
            case 3:
              y = [k(O / 255), k(D / 255), k(J / 255), yt[1]].join(" ");
          }
      } else if (typeof O == "string") y = [O, D, J, lt, yt[2]].join(" ");
      else
        switch (u.precision) {
          case 2:
            y = [dt(O), dt(D), dt(J), dt(lt), yt[2]].join(" ");
            break;
          case 3:
          default:
            y = [k(O), k(D), k(J), k(lt), yt[2]].join(" ");
        }
      return y;
    }),
    Qn = (p.__private__.getFilters = function () {
      return l;
    }),
    Nn = (p.__private__.putStream = function (u) {
      var y = (u = u || {}).data || "",
        O = u.filters || Qn(),
        D = u.alreadyAppliedFilters || [],
        J = u.addLength1 || !1,
        lt = y.length,
        yt = u.objectId,
        Ot = function (Ze) {
          return Ze;
        };
      if (m !== null && yt === void 0)
        throw new Error(
          "ObjectId must be passed to putStream for file encryption",
        );
      m !== null && (Ot = Ke.encryptor(yt, 0));
      var Tt = {};
      O === !0 && (O = ["FlateEncode"]);
      var Kt = u.additionalKeyValues || [],
        Yt =
          (Tt =
            zt.API.processDataByFilters !== void 0
              ? zt.API.processDataByFilters(y, O)
              : { data: y, reverseChain: [] }).reverseChain +
          (Array.isArray(D) ? D.join(" ") : D.toString());
      if (
        (Tt.data.length !== 0 &&
          (Kt.push({ key: "Length", value: Tt.data.length }),
          J === !0 && Kt.push({ key: "Length1", value: lt })),
        Yt.length != 0)
      )
        if (Yt.split("/").length - 1 == 1)
          Kt.push({ key: "Filter", value: Yt });
        else {
          Kt.push({ key: "Filter", value: "[" + Yt + "]" });
          for (var ie = 0; ie < Kt.length; ie += 1)
            if (Kt[ie].key === "DecodeParms") {
              for (
                var Le = [], Pe = 0;
                Pe < Tt.reverseChain.split("/").length - 1;
                Pe += 1
              )
                Le.push("null");
              Le.push(Kt[ie].value), (Kt[ie].value = "[" + Le.join(" ") + "]");
            }
        }
      q("<<");
      for (var qe = 0; qe < Kt.length; qe++)
        q("/" + Kt[qe].key + " " + Kt[qe].value);
      q(">>"),
        Tt.data.length !== 0 && (q("stream"), q(Ot(Tt.data)), q("endstream"));
    }),
    tr = (p.__private__.putPage = function (u) {
      var y = u.number,
        O = u.data,
        D = u.objId,
        J = u.contentsObjId;
      vn(D, !0),
        q("<</Type /Page"),
        q("/Parent " + u.rootDictionaryObjId + " 0 R"),
        q("/Resources " + u.resourceDictionaryObjId + " 0 R"),
        q(
          "/MediaBox [" +
            parseFloat(tt(u.mediaBox.bottomLeftX)) +
            " " +
            parseFloat(tt(u.mediaBox.bottomLeftY)) +
            " " +
            tt(u.mediaBox.topRightX) +
            " " +
            tt(u.mediaBox.topRightY) +
            "]",
        ),
        u.cropBox !== null &&
          q(
            "/CropBox [" +
              tt(u.cropBox.bottomLeftX) +
              " " +
              tt(u.cropBox.bottomLeftY) +
              " " +
              tt(u.cropBox.topRightX) +
              " " +
              tt(u.cropBox.topRightY) +
              "]",
          ),
        u.bleedBox !== null &&
          q(
            "/BleedBox [" +
              tt(u.bleedBox.bottomLeftX) +
              " " +
              tt(u.bleedBox.bottomLeftY) +
              " " +
              tt(u.bleedBox.topRightX) +
              " " +
              tt(u.bleedBox.topRightY) +
              "]",
          ),
        u.trimBox !== null &&
          q(
            "/TrimBox [" +
              tt(u.trimBox.bottomLeftX) +
              " " +
              tt(u.trimBox.bottomLeftY) +
              " " +
              tt(u.trimBox.topRightX) +
              " " +
              tt(u.trimBox.topRightY) +
              "]",
          ),
        u.artBox !== null &&
          q(
            "/ArtBox [" +
              tt(u.artBox.bottomLeftX) +
              " " +
              tt(u.artBox.bottomLeftY) +
              " " +
              tt(u.artBox.topRightX) +
              " " +
              tt(u.artBox.topRightY) +
              "]",
          ),
        typeof u.userUnit == "number" &&
          u.userUnit !== 1 &&
          q("/UserUnit " + u.userUnit),
        ce.publish("putPage", {
          objId: D,
          pageContext: $t[y],
          pageNumber: y,
          page: O,
        }),
        q("/Contents " + J + " 0 R"),
        q(">>"),
        q("endobj");
      var lt = O.join(`
`);
      return (
        G === E.ADVANCED &&
          (lt += `
Q`),
        vn(J, !0),
        Nn({ data: lt, filters: Qn(), objectId: J }),
        q("endobj"),
        D
      );
    }),
    Wr = (p.__private__.putPages = function () {
      var u,
        y,
        O = [];
      for (u = 1; u <= _e; u++)
        ($t[u].objId = Be()), ($t[u].contentsObjId = Be());
      for (u = 1; u <= _e; u++)
        O.push(
          tr({
            number: u,
            data: At[u],
            objId: $t[u].objId,
            contentsObjId: $t[u].contentsObjId,
            mediaBox: $t[u].mediaBox,
            cropBox: $t[u].cropBox,
            bleedBox: $t[u].bleedBox,
            trimBox: $t[u].trimBox,
            artBox: $t[u].artBox,
            userUnit: $t[u].userUnit,
            rootDictionaryObjId: cr,
            resourceDictionaryObjId: En,
          }),
        );
      vn(cr, !0), q("<</Type /Pages");
      var D = "/Kids [";
      for (y = 0; y < _e; y++) D += O[y] + " 0 R ";
      q(D + "]"),
        q("/Count " + _e),
        q(">>"),
        q("endobj"),
        ce.publish("postPutPages");
    }),
    li = function (u) {
      ce.publish("putFont", { font: u, out: q, newObject: ze, putStream: Nn }),
        u.isAlreadyPutted !== !0 &&
          ((u.objectNumber = ze()),
          q("<<"),
          q("/Type /Font"),
          q("/BaseFont /" + zi(u.postScriptName)),
          q("/Subtype /Type1"),
          typeof u.encoding == "string" && q("/Encoding /" + u.encoding),
          q("/FirstChar 32"),
          q("/LastChar 255"),
          q(">>"),
          q("endobj"));
    },
    ci = function () {
      for (var u in me)
        me.hasOwnProperty(u) &&
          (v === !1 || (v === !0 && N.hasOwnProperty(u))) &&
          li(me[u]);
    },
    fi = function (u) {
      u.objectNumber = ze();
      var y = [];
      y.push({ key: "Type", value: "/XObject" }),
        y.push({ key: "Subtype", value: "/Form" }),
        y.push({
          key: "BBox",
          value:
            "[" +
            [tt(u.x), tt(u.y), tt(u.x + u.width), tt(u.y + u.height)].join(
              " ",
            ) +
            "]",
        }),
        y.push({ key: "Matrix", value: "[" + u.matrix.toString() + "]" });
      var O = u.pages[1].join(`
`);
      Nn({ data: O, additionalKeyValues: y, objectId: u.objectNumber }),
        q("endobj");
    },
    hi = function () {
      for (var u in $e) $e.hasOwnProperty(u) && fi($e[u]);
    },
    Oa = function (u, y) {
      var O,
        D = [],
        J = 1 / (y - 1);
      for (O = 0; O < 1; O += J) D.push(O);
      if ((D.push(1), u[0].offset != 0)) {
        var lt = { offset: 0, color: u[0].color };
        u.unshift(lt);
      }
      if (u[u.length - 1].offset != 1) {
        var yt = { offset: 1, color: u[u.length - 1].color };
        u.push(yt);
      }
      for (var Ot = "", Tt = 0, Kt = 0; Kt < D.length; Kt++) {
        for (O = D[Kt]; O > u[Tt + 1].offset; ) Tt++;
        var Yt = u[Tt].offset,
          ie = (O - Yt) / (u[Tt + 1].offset - Yt),
          Le = u[Tt].color,
          Pe = u[Tt + 1].color;
        Ot +=
          R(Math.round((1 - ie) * Le[0] + ie * Pe[0]).toString(16)) +
          R(Math.round((1 - ie) * Le[1] + ie * Pe[1]).toString(16)) +
          R(Math.round((1 - ie) * Le[2] + ie * Pe[2]).toString(16));
      }
      return Ot.trim();
    },
    Yo = function (u, y) {
      y || (y = 21);
      var O = ze(),
        D = Oa(u.colors, y),
        J = [];
      J.push({ key: "FunctionType", value: "0" }),
        J.push({ key: "Domain", value: "[0.0 1.0]" }),
        J.push({ key: "Size", value: "[" + y + "]" }),
        J.push({ key: "BitsPerSample", value: "8" }),
        J.push({ key: "Range", value: "[0.0 1.0 0.0 1.0 0.0 1.0]" }),
        J.push({ key: "Decode", value: "[0.0 1.0 0.0 1.0 0.0 1.0]" }),
        Nn({
          data: D,
          additionalKeyValues: J,
          alreadyAppliedFilters: ["/ASCIIHexDecode"],
          objectId: O,
        }),
        q("endobj"),
        (u.objectNumber = ze()),
        q("<< /ShadingType " + u.type),
        q("/ColorSpace /DeviceRGB");
      var lt =
        "/Coords [" +
        tt(parseFloat(u.coords[0])) +
        " " +
        tt(parseFloat(u.coords[1])) +
        " ";
      u.type === 2
        ? (lt +=
            tt(parseFloat(u.coords[2])) + " " + tt(parseFloat(u.coords[3])))
        : (lt +=
            tt(parseFloat(u.coords[2])) +
            " " +
            tt(parseFloat(u.coords[3])) +
            " " +
            tt(parseFloat(u.coords[4])) +
            " " +
            tt(parseFloat(u.coords[5]))),
        q((lt += "]")),
        u.matrix && q("/Matrix [" + u.matrix.toString() + "]"),
        q("/Function " + O + " 0 R"),
        q("/Extend [true true]"),
        q(">>"),
        q("endobj");
    },
    Jo = function (u, y) {
      var O = Be(),
        D = ze();
      y.push({ resourcesOid: O, objectOid: D }), (u.objectNumber = D);
      var J = [];
      J.push({ key: "Type", value: "/Pattern" }),
        J.push({ key: "PatternType", value: "1" }),
        J.push({ key: "PaintType", value: "1" }),
        J.push({ key: "TilingType", value: "1" }),
        J.push({
          key: "BBox",
          value: "[" + u.boundingBox.map(tt).join(" ") + "]",
        }),
        J.push({ key: "XStep", value: tt(u.xStep) }),
        J.push({ key: "YStep", value: tt(u.yStep) }),
        J.push({ key: "Resources", value: O + " 0 R" }),
        u.matrix &&
          J.push({ key: "Matrix", value: "[" + u.matrix.toString() + "]" }),
        Nn({
          data: u.stream,
          additionalKeyValues: J,
          objectId: u.objectNumber,
        }),
        q("endobj");
    },
    di = function (u) {
      var y;
      for (y in le)
        le.hasOwnProperty(y) &&
          (le[y] instanceof ni
            ? Yo(le[y])
            : le[y] instanceof Ui && Jo(le[y], u));
    },
    Ea = function (u) {
      for (var y in ((u.objectNumber = ze()), q("<<"), u))
        switch (y) {
          case "opacity":
            q("/ca " + dt(u[y]));
            break;
          case "stroke-opacity":
            q("/CA " + dt(u[y]));
        }
      q(">>"), q("endobj");
    },
    Xo = function () {
      var u;
      for (u in Se) Se.hasOwnProperty(u) && Ea(Se[u]);
    },
    Yi = function () {
      for (var u in (q("/XObject <<"), $e))
        $e.hasOwnProperty(u) &&
          $e[u].objectNumber >= 0 &&
          q("/" + u + " " + $e[u].objectNumber + " 0 R");
      ce.publish("putXobjectDict"), q(">>");
    },
    Ko = function () {
      (Ke.oid = ze()),
        q("<<"),
        q("/Filter /Standard"),
        q("/V " + Ke.v),
        q("/R " + Ke.r),
        q("/U <" + Ke.toHexString(Ke.U) + ">"),
        q("/O <" + Ke.toHexString(Ke.O) + ">"),
        q("/P " + Ke.P),
        q(">>"),
        q("endobj");
    },
    Ma = function () {
      for (var u in (q("/Font <<"), me))
        me.hasOwnProperty(u) &&
          (v === !1 || (v === !0 && N.hasOwnProperty(u))) &&
          q("/" + u + " " + me[u].objectNumber + " 0 R");
      q(">>");
    },
    Zo = function () {
      if (Object.keys(le).length > 0) {
        for (var u in (q("/Shading <<"), le))
          le.hasOwnProperty(u) &&
            le[u] instanceof ni &&
            le[u].objectNumber >= 0 &&
            q("/" + u + " " + le[u].objectNumber + " 0 R");
        ce.publish("putShadingPatternDict"), q(">>");
      }
    },
    pi = function (u) {
      if (Object.keys(le).length > 0) {
        for (var y in (q("/Pattern <<"), le))
          le.hasOwnProperty(y) &&
            le[y] instanceof p.TilingPattern &&
            le[y].objectNumber >= 0 &&
            le[y].objectNumber < u &&
            q("/" + y + " " + le[y].objectNumber + " 0 R");
        ce.publish("putTilingPatternDict"), q(">>");
      }
    },
    Qo = function () {
      if (Object.keys(Se).length > 0) {
        var u;
        for (u in (q("/ExtGState <<"), Se))
          Se.hasOwnProperty(u) &&
            Se[u].objectNumber >= 0 &&
            q("/" + u + " " + Se[u].objectNumber + " 0 R");
        ce.publish("putGStateDict"), q(">>");
      }
    },
    Ce = function (u) {
      vn(u.resourcesOid, !0),
        q("<<"),
        q("/ProcSet [/PDF /Text /ImageB /ImageC /ImageI]"),
        Ma(),
        Zo(),
        pi(u.objectOid),
        Qo(),
        Yi(),
        q(">>"),
        q("endobj");
    },
    Ba = function () {
      var u = [];
      ci(),
        Xo(),
        hi(),
        di(u),
        ce.publish("putResources"),
        u.forEach(Ce),
        Ce({ resourcesOid: En, objectOid: Number.MAX_SAFE_INTEGER }),
        ce.publish("postPutResources");
    },
    qa = function () {
      ce.publish("putAdditionalObjects");
      for (var u = 0; u < Nt.length; u++) {
        var y = Nt[u];
        vn(y.objId, !0), q(y.content), q("endobj");
      }
      ce.publish("postPutAdditionalObjects");
    },
    Ta = function (u) {
      (Ae[u.fontName] = Ae[u.fontName] || {}),
        (Ae[u.fontName][u.fontStyle] = u.id);
    },
    Ji = function (u, y, O, D, J) {
      var lt = {
        id: "F" + (Object.keys(me).length + 1).toString(10),
        postScriptName: u,
        fontName: y,
        fontStyle: O,
        encoding: D,
        isStandardFont: J || !1,
        metadata: {},
      };
      return (
        ce.publish("addFont", { font: lt, instance: this }),
        (me[lt.id] = lt),
        Ta(lt),
        lt.id
      );
    },
    ts = function (u) {
      for (var y = 0, O = xt.length; y < O; y++) {
        var D = Ji.call(this, u[y][0], u[y][1], u[y][2], xt[y][3], !0);
        v === !1 && (N[D] = !0);
        var J = u[y][0].split("-");
        Ta({ id: D, fontName: J[0], fontStyle: J[1] || "" });
      }
      ce.publish("addFonts", { fonts: me, dictionary: Ae });
    },
    qn = function (u) {
      return (
        (u.foo = function () {
          try {
            return u.apply(this, arguments);
          } catch (D) {
            var y = D.stack || "";
            ~y.indexOf(" at ") && (y = y.split(" at ")[1]);
            var O =
              "Error in function " +
              y
                .split(
                  `
`,
                )[0]
                .split("<")[0] +
              ": " +
              D.message;
            if (!Ht.console) throw new Error(O);
            Ht.console.error(O, D), Ht.alert && alert(O);
          }
        }),
        (u.foo.bar = u),
        u.foo
      );
    },
    gi = function (u, y) {
      var O, D, J, lt, yt, Ot, Tt, Kt, Yt;
      if (
        ((J = (y = y || {}).sourceEncoding || "Unicode"),
        (yt = y.outputEncoding),
        (y.autoencode || yt) &&
          me[ne].metadata &&
          me[ne].metadata[J] &&
          me[ne].metadata[J].encoding &&
          ((lt = me[ne].metadata[J].encoding),
          !yt && me[ne].encoding && (yt = me[ne].encoding),
          !yt && lt.codePages && (yt = lt.codePages[0]),
          typeof yt == "string" && (yt = lt[yt]),
          yt))
      ) {
        for (Tt = !1, Ot = [], O = 0, D = u.length; O < D; O++)
          (Kt = yt[u.charCodeAt(O)])
            ? Ot.push(String.fromCharCode(Kt))
            : Ot.push(u[O]),
            Ot[O].charCodeAt(0) >> 8 && (Tt = !0);
        u = Ot.join("");
      }
      for (O = u.length; Tt === void 0 && O !== 0; )
        u.charCodeAt(O - 1) >> 8 && (Tt = !0), O--;
      if (!Tt) return u;
      for (Ot = y.noBOM ? [] : [254, 255], O = 0, D = u.length; O < D; O++) {
        if ((Yt = (Kt = u.charCodeAt(O)) >> 8) >> 8)
          throw new Error(
            "Character at position " +
              O +
              " of string '" +
              u +
              "' exceeds 16bits. Cannot be encoded into UCS-2 BE",
          );
        Ot.push(Yt), Ot.push(Kt - (Yt << 8));
      }
      return String.fromCharCode.apply(void 0, Ot);
    },
    cn =
      (p.__private__.pdfEscape =
      p.pdfEscape =
        function (u, y) {
          return gi(u, y)
            .replace(/\\/g, "\\\\")
            .replace(/\(/g, "\\(")
            .replace(/\)/g, "\\)");
        }),
    Xi = (p.__private__.beginPage = function (u) {
      (At[++_e] = []),
        ($t[_e] = {
          objId: 0,
          contentsObjId: 0,
          userUnit: Number(c),
          artBox: null,
          bleedBox: null,
          cropBox: null,
          trimBox: null,
          mediaBox: {
            bottomLeftX: 0,
            bottomLeftY: 0,
            topRightX: Number(u[0]),
            topRightY: Number(u[1]),
          },
        }),
        Ra(_e),
        ht(At[j]);
    }),
    Da = function (u, y) {
      var O, D, J;
      switch (
        ((e = y || e),
        typeof u == "string" &&
          ((O = _(u.toLowerCase())),
          Array.isArray(O) && ((D = O[0]), (J = O[1]))),
        Array.isArray(u) && ((D = u[0] * jt), (J = u[1] * jt)),
        isNaN(D) && ((D = s[0]), (J = s[1])),
        (D > 14400 || J > 14400) &&
          (be.warn(
            "A page in a PDF can not be wider or taller than 14400 userUnit. jsPDF limits the width/height to 14400",
          ),
          (D = Math.min(14400, D)),
          (J = Math.min(14400, J))),
        (s = [D, J]),
        e.substr(0, 1))
      ) {
        case "l":
          J > D && (s = [J, D]);
          break;
        case "p":
          D > J && (s = [J, D]);
      }
      Xi(s),
        Ga(ta),
        q(Tn),
        na !== 0 && q(na + " J"),
        ra !== 0 && q(ra + " j"),
        ce.publish("addPage", { pageNumber: _e });
    },
    es = function (u) {
      u > 0 &&
        u <= _e &&
        (At.splice(u, 1),
        $t.splice(u, 1),
        _e--,
        j > _e && (j = _e),
        this.setPage(j));
    },
    Ra = function (u) {
      u > 0 && u <= _e && (j = u);
    },
    ns =
      (p.__private__.getNumberOfPages =
      p.getNumberOfPages =
        function () {
          return At.length - 1;
        }),
    za = function (u, y, O) {
      var D,
        J = void 0;
      return (
        (O = O || {}),
        (u = u !== void 0 ? u : me[ne].fontName),
        (y = y !== void 0 ? y : me[ne].fontStyle),
        (D = u.toLowerCase()),
        Ae[D] !== void 0 && Ae[D][y] !== void 0
          ? (J = Ae[D][y])
          : Ae[u] !== void 0 && Ae[u][y] !== void 0
            ? (J = Ae[u][y])
            : O.disableWarning === !1 &&
              be.warn(
                "Unable to look up font label for font '" +
                  u +
                  "', '" +
                  y +
                  "'. Refer to getFontList() for available fonts.",
              ),
        J ||
          O.noFallback ||
          ((J = Ae.times[y]) == null && (J = Ae.times.normal)),
        J
      );
    },
    rs = (p.__private__.putInfo = function () {
      var u = ze(),
        y = function (D) {
          return D;
        };
      for (var O in (m !== null && (y = Ke.encryptor(u, 0)),
      q("<<"),
      q("/Producer (" + cn(y("jsPDF " + zt.version)) + ")"),
      Wt))
        Wt.hasOwnProperty(O) &&
          Wt[O] &&
          q(
            "/" +
              O.substr(0, 1).toUpperCase() +
              O.substr(1) +
              " (" +
              cn(y(Wt[O])) +
              ")",
          );
      q("/CreationDate (" + cn(y(ut)) + ")"), q(">>"), q("endobj");
    }),
    Ki = (p.__private__.putCatalog = function (u) {
      var y = (u = u || {}).rootDictionaryObjId || cr;
      switch (
        (ze(),
        q("<<"),
        q("/Type /Catalog"),
        q("/Pages " + y + " 0 R"),
        Ft || (Ft = "fullwidth"),
        Ft)
      ) {
        case "fullwidth":
          q("/OpenAction [3 0 R /FitH null]");
          break;
        case "fullheight":
          q("/OpenAction [3 0 R /FitV null]");
          break;
        case "fullpage":
          q("/OpenAction [3 0 R /Fit]");
          break;
        case "original":
          q("/OpenAction [3 0 R /XYZ null null 1]");
          break;
        default:
          var O = "" + Ft;
          O.substr(O.length - 1) === "%" && (Ft = parseInt(Ft) / 100),
            typeof Ft == "number" &&
              q("/OpenAction [3 0 R /XYZ null null " + dt(Ft) + "]");
      }
      switch ((ee || (ee = "continuous"), ee)) {
        case "continuous":
          q("/PageLayout /OneColumn");
          break;
        case "single":
          q("/PageLayout /SinglePage");
          break;
        case "two":
        case "twoleft":
          q("/PageLayout /TwoColumnLeft");
          break;
        case "tworight":
          q("/PageLayout /TwoColumnRight");
      }
      Gt && q("/PageMode /" + Gt),
        ce.publish("putCatalog"),
        q(">>"),
        q("endobj");
    }),
    is = (p.__private__.putTrailer = function () {
      q("trailer"),
        q("<<"),
        q("/Size " + (Y + 1)),
        q("/Root " + Y + " 0 R"),
        q("/Info " + (Y - 1) + " 0 R"),
        m !== null && q("/Encrypt " + Ke.oid + " 0 R"),
        q("/ID [ <" + at + "> <" + at + "> ]"),
        q(">>");
    }),
    as = (p.__private__.putHeader = function () {
      q("%PDF-" + F), q("%ºß¬à");
    }),
    os = (p.__private__.putXRef = function () {
      var u = "0000000000";
      q("xref"), q("0 " + (Y + 1)), q("0000000000 65535 f ");
      for (var y = 1; y <= Y; y++)
        typeof Q[y] == "function"
          ? q((u + Q[y]()).slice(-10) + " 00000 n ")
          : Q[y] !== void 0
            ? q((u + Q[y]).slice(-10) + " 00000 n ")
            : q("0000000000 00000 n ");
    }),
    fr = (p.__private__.buildDocument = function () {
      Ut(),
        ht(et),
        ce.publish("buildDocument"),
        as(),
        Wr(),
        qa(),
        Ba(),
        m !== null && Ko(),
        rs(),
        Ki();
      var u = rt;
      return (
        os(),
        is(),
        q("startxref"),
        q("" + u),
        q("%%EOF"),
        ht(At[j]),
        et.join(`
`)
      );
    }),
    mi = (p.__private__.getBlob = function (u) {
      return new Blob([Bt(u)], { type: "application/pdf" });
    }),
    vi =
      (p.output =
      p.__private__.output =
        qn(function (u, y) {
          switch (
            (typeof (y = y || {}) == "string"
              ? (y = { filename: y })
              : (y.filename = y.filename || "generated.pdf"),
            u)
          ) {
            case void 0:
              return fr();
            case "save":
              p.save(y.filename);
              break;
            case "arraybuffer":
              return Bt(fr());
            case "blob":
              return mi(fr());
            case "bloburi":
            case "bloburl":
              if (
                Ht.URL !== void 0 &&
                typeof Ht.URL.createObjectURL == "function"
              )
                return (Ht.URL && Ht.URL.createObjectURL(mi(fr()))) || void 0;
              be.warn(
                "bloburl is not supported by your system, because URL.createObjectURL is not supported by your browser.",
              );
              break;
            case "datauristring":
            case "dataurlstring":
              var O = "",
                D = fr();
              try {
                O = nu(D);
              } catch {
                O = nu(unescape(encodeURIComponent(D)));
              }
              return (
                "data:application/pdf;filename=" + y.filename + ";base64," + O
              );
            case "pdfobjectnewwindow":
              if (Object.prototype.toString.call(Ht) === "[object Window]") {
                var J =
                    "https://cdnjs.cloudflare.com/ajax/libs/pdfobject/2.1.1/pdfobject.min.js",
                  lt =
                    ' integrity="sha512-4ze/a9/4jqu+tX9dfOqJYSvyYd5M6qum/3HpCLr+/Jqf0whc37VUbkpNGHR7/8pSnCFw47T1fmIpwBV7UySh3g==" crossorigin="anonymous"';
                y.pdfObjectUrl && ((J = y.pdfObjectUrl), (lt = ""));
                var yt =
                    '<html><style>html, body { padding: 0; margin: 0; } iframe { width: 100%; height: 100%; border: 0;}  </style><body><script src="' +
                    J +
                    '"' +
                    lt +
                    '><\/script><script >PDFObject.embed("' +
                    this.output("dataurlstring") +
                    '", ' +
                    JSON.stringify(y) +
                    ");<\/script></body></html>",
                  Ot = Ht.open();
                return Ot !== null && Ot.document.write(yt), Ot;
              }
              throw new Error(
                "The option pdfobjectnewwindow just works in a browser-environment.",
              );
            case "pdfjsnewwindow":
              if (Object.prototype.toString.call(Ht) === "[object Window]") {
                var Tt =
                    '<html><style>html, body { padding: 0; margin: 0; } iframe { width: 100%; height: 100%; border: 0;}  </style><body><iframe id="pdfViewer" src="' +
                    (y.pdfJsUrl || "examples/PDF.js/web/viewer.html") +
                    "?file=&downloadName=" +
                    y.filename +
                    '" width="500px" height="400px" /></body></html>',
                  Kt = Ht.open();
                if (Kt !== null) {
                  Kt.document.write(Tt);
                  var Yt = this;
                  Kt.document.documentElement.querySelector(
                    "#pdfViewer",
                  ).onload = function () {
                    (Kt.document.title = y.filename),
                      Kt.document.documentElement
                        .querySelector("#pdfViewer")
                        .contentWindow.PDFViewerApplication.open(
                          Yt.output("bloburl"),
                        );
                  };
                }
                return Kt;
              }
              throw new Error(
                "The option pdfjsnewwindow just works in a browser-environment.",
              );
            case "dataurlnewwindow":
              if (Object.prototype.toString.call(Ht) !== "[object Window]")
                throw new Error(
                  "The option dataurlnewwindow just works in a browser-environment.",
                );
              var ie =
                  '<html><style>html, body { padding: 0; margin: 0; } iframe { width: 100%; height: 100%; border: 0;}  </style><body><iframe src="' +
                  this.output("datauristring", y) +
                  '"></iframe></body></html>',
                Le = Ht.open();
              if (
                (Le !== null &&
                  (Le.document.write(ie), (Le.document.title = y.filename)),
                Le || typeof safari > "u")
              )
                return Le;
              break;
            case "datauri":
            case "dataurl":
              return (Ht.document.location.href = this.output(
                "datauristring",
                y,
              ));
            default:
              return null;
          }
        })),
    Ua = function (u) {
      return Array.isArray(Hr) === !0 && Hr.indexOf(u) > -1;
    };
  switch (i) {
    case "pt":
      jt = 1;
      break;
    case "mm":
      jt = 72 / 25.4;
      break;
    case "cm":
      jt = 72 / 2.54;
      break;
    case "in":
      jt = 72;
      break;
    case "px":
      jt = Ua("px_scaling") == 1 ? 0.75 : 96 / 72;
      break;
    case "pc":
    case "em":
      jt = 12;
      break;
    case "ex":
      jt = 6;
      break;
    default:
      if (typeof i != "number") throw new Error("Invalid unit: " + i);
      jt = i;
  }
  var Ke = null;
  Ct(), Z();
  var ss = function (u) {
      return m !== null
        ? Ke.encryptor(u, 0)
        : function (y) {
            return y;
          };
    },
    Ha =
      (p.__private__.getPageInfo =
      p.getPageInfo =
        function (u) {
          if (isNaN(u) || u % 1 != 0)
            throw new Error("Invalid argument passed to jsPDF.getPageInfo");
          return { objId: $t[u].objId, pageNumber: u, pageContext: $t[u] };
        }),
    Vt = (p.__private__.getPageInfoByObjId = function (u) {
      if (isNaN(u) || u % 1 != 0)
        throw new Error("Invalid argument passed to jsPDF.getPageInfoByObjId");
      for (var y in $t) if ($t[y].objId === u) break;
      return Ha(y);
    }),
    us =
      (p.__private__.getCurrentPageInfo =
      p.getCurrentPageInfo =
        function () {
          return { objId: $t[j].objId, pageNumber: j, pageContext: $t[j] };
        });
  (p.addPage = function () {
    return Da.apply(this, arguments), this;
  }),
    (p.setPage = function () {
      return Ra.apply(this, arguments), ht.call(this, At[j]), this;
    }),
    (p.insertPage = function (u) {
      return this.addPage(), this.movePage(j, u), this;
    }),
    (p.movePage = function (u, y) {
      var O, D;
      if (u > y) {
        (O = At[u]), (D = $t[u]);
        for (var J = u; J > y; J--) (At[J] = At[J - 1]), ($t[J] = $t[J - 1]);
        (At[y] = O), ($t[y] = D), this.setPage(y);
      } else if (u < y) {
        (O = At[u]), (D = $t[u]);
        for (var lt = u; lt < y; lt++)
          (At[lt] = At[lt + 1]), ($t[lt] = $t[lt + 1]);
        (At[y] = O), ($t[y] = D), this.setPage(y);
      }
      return this;
    }),
    (p.deletePage = function () {
      return es.apply(this, arguments), this;
    }),
    (p.__private__.text = p.text =
      function (u, y, O, D, J) {
        var lt,
          yt,
          Ot,
          Tt,
          Kt,
          Yt,
          ie,
          Le,
          Pe,
          qe = (D = D || {}).scope || this;
        if (
          typeof u == "number" &&
          typeof y == "number" &&
          (typeof O == "string" || Array.isArray(O))
        ) {
          var Ze = O;
          (O = y), (y = u), (u = Ze);
        }
        if (
          (arguments[3] instanceof Rt
            ? (z("The transform parameter of text() with a Matrix value"),
              (Pe = J))
            : ((Ot = arguments[4]),
              (Tt = arguments[5]),
              (de((ie = arguments[3])) === "object" && ie !== null) ||
                (typeof Ot == "string" && ((Tt = Ot), (Ot = null)),
                typeof ie == "string" && ((Tt = ie), (ie = null)),
                typeof ie == "number" && ((Ot = ie), (ie = null)),
                (D = { flags: ie, angle: Ot, align: Tt }))),
          isNaN(y) || isNaN(O) || u == null)
        )
          throw new Error("Invalid arguments passed to jsPDF.text");
        if (u.length === 0) return qe;
        var He = "",
          Dn = !1,
          bn = typeof D.lineHeightFactor == "number" ? D.lineHeightFactor : Gr,
          rr = qe.internal.scaleFactor;
        function Za(ye) {
          return (
            (ye = ye.split("	").join(Array(D.TabLen || 9).join(" "))), cn(ye, ie)
          );
        }
        function ua(ye) {
          for (var we, je = ye.concat(), Ue = [], mr = je.length; mr--; )
            typeof (we = je.shift()) == "string"
              ? Ue.push(we)
              : Array.isArray(ye) &&
                  (we.length === 1 || (we[1] === void 0 && we[2] === void 0))
                ? Ue.push(we[0])
                : Ue.push([we[0], we[1], we[2]]);
          return Ue;
        }
        function la(ye, we) {
          var je;
          if (typeof ye == "string") je = we(ye)[0];
          else if (Array.isArray(ye)) {
            for (var Ue, mr, va = ye.concat(), ji = [], ro = va.length; ro--; )
              typeof (Ue = va.shift()) == "string"
                ? ji.push(we(Ue)[0])
                : Array.isArray(Ue) &&
                  typeof Ue[0] == "string" &&
                  ((mr = we(Ue[0], Ue[1], Ue[2])),
                  ji.push([mr[0], mr[1], mr[2]]));
            je = ji;
          }
          return je;
        }
        var Ni = !1,
          ca = !0;
        if (typeof u == "string") Ni = !0;
        else if (Array.isArray(u)) {
          var fa = u.concat();
          yt = [];
          for (var Li, Ye = fa.length; Ye--; )
            (typeof (Li = fa.shift()) != "string" ||
              (Array.isArray(Li) && typeof Li[0] != "string")) &&
              (ca = !1);
          Ni = ca;
        }
        if (Ni === !1)
          throw new Error(
            'Type of text must be string or Array. "' +
              u +
              '" is not recognized.',
          );
        typeof u == "string" &&
          (u = u.match(/[\r?\n]/) ? u.split(/\r\n|\r|\n/g) : [u]);
        var Si = Lt / qe.internal.scaleFactor,
          _i = Si * (bn - 1);
        switch (D.baseline) {
          case "bottom":
            O -= _i;
            break;
          case "top":
            O += Si - _i;
            break;
          case "hanging":
            O += Si - 2 * _i;
            break;
          case "middle":
            O += Si / 2 - _i;
        }
        if (
          ((Yt = D.maxWidth || 0) > 0 &&
            (typeof u == "string"
              ? (u = qe.splitTextToSize(u, Yt))
              : Object.prototype.toString.call(u) === "[object Array]" &&
                (u = u.reduce(function (ye, we) {
                  return ye.concat(qe.splitTextToSize(we, Yt));
                }, []))),
          (lt = {
            text: u,
            x: y,
            y: O,
            options: D,
            mutex: {
              pdfEscape: cn,
              activeFontKey: ne,
              fonts: me,
              activeFontSize: Lt,
            },
          }),
          ce.publish("preProcessText", lt),
          (u = lt.text),
          (Ot = (D = lt.options).angle),
          !(Pe instanceof Rt) && Ot && typeof Ot == "number")
        ) {
          (Ot *= Math.PI / 180),
            D.rotationDirection === 0 && (Ot = -Ot),
            G === E.ADVANCED && (Ot = -Ot);
          var Pi = Math.cos(Ot),
            ha = Math.sin(Ot);
          Pe = new Rt(Pi, ha, -ha, Pi, 0, 0);
        } else Ot && Ot instanceof Rt && (Pe = Ot);
        G !== E.ADVANCED || Pe || (Pe = Zn),
          (Kt = D.charSpace || wi) !== void 0 &&
            ((He +=
              tt(I(Kt)) +
              ` Tc
`),
            this.setCharSpace(this.getCharSpace() || 0)),
          (Le = D.horizontalScale) !== void 0 &&
            (He +=
              tt(100 * Le) +
              ` Tz
`),
          D.lang;
        var fn = -1,
          bs = D.renderingMode !== void 0 ? D.renderingMode : D.stroke,
          da = qe.internal.getCurrentPageInfo().pageContext;
        switch (bs) {
          case 0:
          case !1:
          case "fill":
            fn = 0;
            break;
          case 1:
          case !0:
          case "stroke":
            fn = 1;
            break;
          case 2:
          case "fillThenStroke":
            fn = 2;
            break;
          case 3:
          case "invisible":
            fn = 3;
            break;
          case 4:
          case "fillAndAddForClipping":
            fn = 4;
            break;
          case 5:
          case "strokeAndAddPathForClipping":
            fn = 5;
            break;
          case 6:
          case "fillThenStrokeAndAddToPathForClipping":
            fn = 6;
            break;
          case 7:
          case "addToPathForClipping":
            fn = 7;
        }
        var Qa = da.usedRenderingMode !== void 0 ? da.usedRenderingMode : -1;
        fn !== -1
          ? (He +=
              fn +
              ` Tr
`)
          : Qa !== -1 &&
            (He += `0 Tr
`),
          fn !== -1 && (da.usedRenderingMode = fn),
          (Tt = D.align || "left");
        var Ln,
          ki = Lt * bn,
          to = qe.internal.pageSize.getWidth(),
          eo = me[ne];
        (Kt = D.charSpace || wi),
          (Yt = D.maxWidth || 0),
          (ie = Object.assign({ autoencode: !0, noBOM: !0 }, D.flags));
        var Sr = [],
          Jr = function (ye) {
            return (
              (qe.getStringUnitWidth(ye, {
                font: eo,
                charSpace: Kt,
                fontSize: Lt,
                doKerning: !1,
              }) *
                Lt) /
              rr
            );
          };
        if (Object.prototype.toString.call(u) === "[object Array]") {
          var hn;
          (yt = ua(u)), Tt !== "left" && (Ln = yt.map(Jr));
          var on,
            _r = 0;
          if (Tt === "right") {
            (y -= Ln[0]), (u = []), (Ye = yt.length);
            for (var dr = 0; dr < Ye; dr++)
              dr === 0
                ? ((on = nr(y)), (hn = hr(O)))
                : ((on = I(_r - Ln[dr])), (hn = -ki)),
                u.push([yt[dr], on, hn]),
                (_r = Ln[dr]);
          } else if (Tt === "center") {
            (y -= Ln[0] / 2), (u = []), (Ye = yt.length);
            for (var pr = 0; pr < Ye; pr++)
              pr === 0
                ? ((on = nr(y)), (hn = hr(O)))
                : ((on = I((_r - Ln[pr]) / 2)), (hn = -ki)),
                u.push([yt[pr], on, hn]),
                (_r = Ln[pr]);
          } else if (Tt === "left") {
            (u = []), (Ye = yt.length);
            for (var Ii = 0; Ii < Ye; Ii++) u.push(yt[Ii]);
          } else if (Tt === "justify" && eo.encoding === "Identity-H") {
            (u = []), (Ye = yt.length), (Yt = Yt !== 0 ? Yt : to);
            for (var gr = 0, Fe = 0; Fe < Ye; Fe++)
              if (
                ((hn = Fe === 0 ? hr(O) : -ki),
                (on = Fe === 0 ? nr(y) : gr),
                Fe < Ye - 1)
              ) {
                var pa = I((Yt - Ln[Fe]) / (yt[Fe].split(" ").length - 1)),
                  sn = yt[Fe].split(" ");
                u.push([sn[0] + " ", on, hn]), (gr = 0);
                for (var Sn = 1; Sn < sn.length; Sn++) {
                  var Ci =
                    (Jr(sn[Sn - 1] + " " + sn[Sn]) - Jr(sn[Sn])) * rr + pa;
                  Sn == sn.length - 1
                    ? u.push([sn[Sn], Ci, 0])
                    : u.push([sn[Sn] + " ", Ci, 0]),
                    (gr -= Ci);
                }
              } else u.push([yt[Fe], on, hn]);
            u.push(["", gr, 0]);
          } else {
            if (Tt !== "justify")
              throw new Error(
                'Unrecognized alignment option, use "left", "center", "right" or "justify".',
              );
            for (
              u = [], Ye = yt.length, Yt = Yt !== 0 ? Yt : to, Fe = 0;
              Fe < Ye;
              Fe++
            )
              (hn = Fe === 0 ? hr(O) : -ki),
                (on = Fe === 0 ? nr(y) : 0),
                Fe < Ye - 1
                  ? Sr.push(
                      tt(I((Yt - Ln[Fe]) / (yt[Fe].split(" ").length - 1))),
                    )
                  : Sr.push(0),
                u.push([yt[Fe], on, hn]);
          }
        }
        var no = typeof D.R2L == "boolean" ? D.R2L : qt;
        no === !0 &&
          (u = la(u, function (ye, we, je) {
            return [ye.split("").reverse().join(""), we, je];
          })),
          (lt = {
            text: u,
            x: y,
            y: O,
            options: D,
            mutex: {
              pdfEscape: cn,
              activeFontKey: ne,
              fonts: me,
              activeFontSize: Lt,
            },
          }),
          ce.publish("postProcessText", lt),
          (u = lt.text),
          (Dn = lt.mutex.isHex || !1);
        var ga = me[ne].encoding;
        (ga !== "WinAnsiEncoding" && ga !== "StandardEncoding") ||
          (u = la(u, function (ye, we, je) {
            return [Za(ye), we, je];
          })),
          (yt = ua(u)),
          (u = []);
        for (
          var Xr,
            Kr,
            Pr,
            Zr = 0,
            Fi = 1,
            Qr = Array.isArray(yt[0]) ? Fi : Zr,
            kr = "",
            ma = function (ye, we, je) {
              var Ue = "";
              return (
                je instanceof Rt
                  ? ((je =
                      typeof D.angle == "number"
                        ? On(je, new Rt(1, 0, 0, 1, ye, we))
                        : On(new Rt(1, 0, 0, 1, ye, we), je)),
                    G === E.ADVANCED &&
                      (je = On(new Rt(1, 0, 0, -1, 0, 0), je)),
                    (Ue =
                      je.join(" ") +
                      ` Tm
`))
                  : (Ue =
                      tt(ye) +
                      " " +
                      tt(we) +
                      ` Td
`),
                Ue
              );
            },
            _n = 0;
          _n < yt.length;
          _n++
        ) {
          switch (((kr = ""), Qr)) {
            case Fi:
              (Pr = (Dn ? "<" : "(") + yt[_n][0] + (Dn ? ">" : ")")),
                (Xr = parseFloat(yt[_n][1])),
                (Kr = parseFloat(yt[_n][2]));
              break;
            case Zr:
              (Pr = (Dn ? "<" : "(") + yt[_n] + (Dn ? ">" : ")")),
                (Xr = nr(y)),
                (Kr = hr(O));
          }
          Sr !== void 0 &&
            Sr[_n] !== void 0 &&
            (kr =
              Sr[_n] +
              ` Tw
`),
            _n === 0
              ? u.push(kr + ma(Xr, Kr, Pe) + Pr)
              : Qr === Zr
                ? u.push(kr + Pr)
                : Qr === Fi && u.push(kr + ma(Xr, Kr, Pe) + Pr);
        }
        (u =
          Qr === Zr
            ? u.join(` Tj
T* `)
            : u.join(` Tj
`)),
          (u += ` Tj
`);
        var Pn = `BT
/`;
        return (
          (Pn +=
            ne +
            " " +
            Lt +
            ` Tf
`),
          (Pn +=
            tt(Lt * bn) +
            ` TL
`),
          (Pn +=
            $r +
            `
`),
          (Pn += He),
          (Pn += u),
          q((Pn += "ET")),
          (N[ne] = !0),
          qe
        );
      });
  var ls =
    (p.__private__.clip =
    p.clip =
      function (u) {
        return q(u === "evenodd" ? "W*" : "W"), this;
      });
  (p.clipEvenOdd = function () {
    return ls("evenodd");
  }),
    (p.__private__.discardPath = p.discardPath =
      function () {
        return q("n"), this;
      });
  var er = (p.__private__.isValidStyle = function (u) {
    var y = !1;
    return (
      [
        void 0,
        null,
        "S",
        "D",
        "F",
        "DF",
        "FD",
        "f",
        "f*",
        "B",
        "B*",
        "n",
      ].indexOf(u) !== -1 && (y = !0),
      y
    );
  });
  p.__private__.setDefaultPathOperation = p.setDefaultPathOperation = function (
    u,
  ) {
    return er(u) && (g = u), this;
  };
  var Wa =
      (p.__private__.getStyle =
      p.getStyle =
        function (u) {
          var y = g;
          switch (u) {
            case "D":
            case "S":
              y = "S";
              break;
            case "F":
              y = "f";
              break;
            case "FD":
            case "DF":
              y = "B";
              break;
            case "f":
            case "f*":
            case "B":
            case "B*":
              y = u;
          }
          return y;
        }),
    Va = (p.close = function () {
      return q("h"), this;
    });
  (p.stroke = function () {
    return q("S"), this;
  }),
    (p.fill = function (u) {
      return bi("f", u), this;
    }),
    (p.fillEvenOdd = function (u) {
      return bi("f*", u), this;
    }),
    (p.fillStroke = function (u) {
      return bi("B", u), this;
    }),
    (p.fillStrokeEvenOdd = function (u) {
      return bi("B*", u), this;
    });
  var bi = function (u, y) {
      de(y) === "object" ? fs(y, u) : q(u);
    },
    Zi = function (u) {
      u === null || (G === E.ADVANCED && u === void 0) || ((u = Wa(u)), q(u));
    };
  function cs(u, y, O, D, J) {
    var lt = new Ui(
      y || this.boundingBox,
      O || this.xStep,
      D || this.yStep,
      this.gState,
      J || this.matrix,
    );
    lt.stream = this.stream;
    var yt = u + "$$" + this.cloneIndex++ + "$$";
    return ln(yt, lt), lt;
  }
  var fs = function (u, y) {
      var O = Ur[u.key],
        D = le[O];
      if (D instanceof ni)
        q("q"),
          q(hs(y)),
          D.gState && p.setGState(D.gState),
          q(u.matrix.toString() + " cm"),
          q("/" + O + " sh"),
          q("Q");
      else if (D instanceof Ui) {
        var J = new Rt(1, 0, 0, -1, 0, Lr());
        u.matrix &&
          ((J = J.multiply(u.matrix || Zn)),
          (O = cs.call(D, u.key, u.boundingBox, u.xStep, u.yStep, J).id)),
          q("q"),
          q("/Pattern cs"),
          q("/" + O + " scn"),
          D.gState && p.setGState(D.gState),
          q(y),
          q("Q");
      }
    },
    hs = function (u) {
      switch (u) {
        case "f":
        case "F":
          return "W n";
        case "f*":
          return "W* n";
        case "B":
          return "W S";
        case "B*":
          return "W* S";
        case "S":
          return "W S";
        case "n":
          return "W n";
      }
    },
    Qi = (p.moveTo = function (u, y) {
      return q(tt(I(u)) + " " + tt(T(y)) + " m"), this;
    }),
    Vr = (p.lineTo = function (u, y) {
      return q(tt(I(u)) + " " + tt(T(y)) + " l"), this;
    }),
    Ar = (p.curveTo = function (u, y, O, D, J, lt) {
      return (
        q(
          [
            tt(I(u)),
            tt(T(y)),
            tt(I(O)),
            tt(T(D)),
            tt(I(J)),
            tt(T(lt)),
            "c",
          ].join(" "),
        ),
        this
      );
    });
  (p.__private__.line = p.line =
    function (u, y, O, D, J) {
      if (isNaN(u) || isNaN(y) || isNaN(O) || isNaN(D) || !er(J))
        throw new Error("Invalid arguments passed to jsPDF.line");
      return G === E.COMPAT
        ? this.lines([[O - u, D - y]], u, y, [1, 1], J || "S")
        : this.lines([[O - u, D - y]], u, y, [1, 1]).stroke();
    }),
    (p.__private__.lines = p.lines =
      function (u, y, O, D, J, lt) {
        var yt, Ot, Tt, Kt, Yt, ie, Le, Pe, qe, Ze, He, Dn;
        if (
          (typeof u == "number" && ((Dn = O), (O = y), (y = u), (u = Dn)),
          (D = D || [1, 1]),
          (lt = lt || !1),
          isNaN(y) ||
            isNaN(O) ||
            !Array.isArray(u) ||
            !Array.isArray(D) ||
            !er(J) ||
            typeof lt != "boolean")
        )
          throw new Error("Invalid arguments passed to jsPDF.lines");
        for (
          Qi(y, O), yt = D[0], Ot = D[1], Kt = u.length, Ze = y, He = O, Tt = 0;
          Tt < Kt;
          Tt++
        )
          (Yt = u[Tt]).length === 2
            ? ((Ze = Yt[0] * yt + Ze), (He = Yt[1] * Ot + He), Vr(Ze, He))
            : ((ie = Yt[0] * yt + Ze),
              (Le = Yt[1] * Ot + He),
              (Pe = Yt[2] * yt + Ze),
              (qe = Yt[3] * Ot + He),
              (Ze = Yt[4] * yt + Ze),
              (He = Yt[5] * Ot + He),
              Ar(ie, Le, Pe, qe, Ze, He));
        return lt && Va(), Zi(J), this;
      }),
    (p.path = function (u) {
      for (var y = 0; y < u.length; y++) {
        var O = u[y],
          D = O.c;
        switch (O.op) {
          case "m":
            Qi(D[0], D[1]);
            break;
          case "l":
            Vr(D[0], D[1]);
            break;
          case "c":
            Ar.apply(this, D);
            break;
          case "h":
            Va();
        }
      }
      return this;
    }),
    (p.__private__.rect = p.rect =
      function (u, y, O, D, J) {
        if (isNaN(u) || isNaN(y) || isNaN(O) || isNaN(D) || !er(J))
          throw new Error("Invalid arguments passed to jsPDF.rect");
        return (
          G === E.COMPAT && (D = -D),
          q([tt(I(u)), tt(T(y)), tt(I(O)), tt(I(D)), "re"].join(" ")),
          Zi(J),
          this
        );
      }),
    (p.__private__.triangle = p.triangle =
      function (u, y, O, D, J, lt, yt) {
        if (
          isNaN(u) ||
          isNaN(y) ||
          isNaN(O) ||
          isNaN(D) ||
          isNaN(J) ||
          isNaN(lt) ||
          !er(yt)
        )
          throw new Error("Invalid arguments passed to jsPDF.triangle");
        return (
          this.lines(
            [
              [O - u, D - y],
              [J - O, lt - D],
              [u - J, y - lt],
            ],
            u,
            y,
            [1, 1],
            yt,
            !0,
          ),
          this
        );
      }),
    (p.__private__.roundedRect = p.roundedRect =
      function (u, y, O, D, J, lt, yt) {
        if (
          isNaN(u) ||
          isNaN(y) ||
          isNaN(O) ||
          isNaN(D) ||
          isNaN(J) ||
          isNaN(lt) ||
          !er(yt)
        )
          throw new Error("Invalid arguments passed to jsPDF.roundedRect");
        var Ot = (4 / 3) * (Math.SQRT2 - 1);
        return (
          (J = Math.min(J, 0.5 * O)),
          (lt = Math.min(lt, 0.5 * D)),
          this.lines(
            [
              [O - 2 * J, 0],
              [J * Ot, 0, J, lt - lt * Ot, J, lt],
              [0, D - 2 * lt],
              [0, lt * Ot, -J * Ot, lt, -J, lt],
              [2 * J - O, 0],
              [-J * Ot, 0, -J, -lt * Ot, -J, -lt],
              [0, 2 * lt - D],
              [0, -lt * Ot, J * Ot, -lt, J, -lt],
            ],
            u + J,
            y,
            [1, 1],
            yt,
            !0,
          ),
          this
        );
      }),
    (p.__private__.ellipse = p.ellipse =
      function (u, y, O, D, J) {
        if (isNaN(u) || isNaN(y) || isNaN(O) || isNaN(D) || !er(J))
          throw new Error("Invalid arguments passed to jsPDF.ellipse");
        var lt = (4 / 3) * (Math.SQRT2 - 1) * O,
          yt = (4 / 3) * (Math.SQRT2 - 1) * D;
        return (
          Qi(u + O, y),
          Ar(u + O, y - yt, u + lt, y - D, u, y - D),
          Ar(u - lt, y - D, u - O, y - yt, u - O, y),
          Ar(u - O, y + yt, u - lt, y + D, u, y + D),
          Ar(u + lt, y + D, u + O, y + yt, u + O, y),
          Zi(J),
          this
        );
      }),
    (p.__private__.circle = p.circle =
      function (u, y, O, D) {
        if (isNaN(u) || isNaN(y) || isNaN(O) || !er(D))
          throw new Error("Invalid arguments passed to jsPDF.circle");
        return this.ellipse(u, y, O, O, D);
      }),
    (p.setFont = function (u, y, O) {
      return O && (y = wt(y, O)), (ne = za(u, y, { disableWarning: !1 })), this;
    });
  var ds =
    (p.__private__.getFont =
    p.getFont =
      function () {
        return me[za.apply(p, arguments)];
      });
  (p.__private__.getFontList = p.getFontList =
    function () {
      var u,
        y,
        O = {};
      for (u in Ae)
        if (Ae.hasOwnProperty(u))
          for (y in ((O[u] = []), Ae[u]))
            Ae[u].hasOwnProperty(y) && O[u].push(y);
      return O;
    }),
    (p.addFont = function (u, y, O, D, J) {
      var lt = [
        "StandardEncoding",
        "MacRomanEncoding",
        "Identity-H",
        "WinAnsiEncoding",
      ];
      return (
        arguments[3] && lt.indexOf(arguments[3]) !== -1
          ? (J = arguments[3])
          : arguments[3] && lt.indexOf(arguments[3]) == -1 && (O = wt(O, D)),
        (J = J || "Identity-H"),
        Ji.call(this, u, y, O, J)
      );
    });
  var Gr,
    ta = n.lineWidth || 0.200025,
    yi =
      (p.__private__.getLineWidth =
      p.getLineWidth =
        function () {
          return ta;
        }),
    Ga =
      (p.__private__.setLineWidth =
      p.setLineWidth =
        function (u) {
          return (ta = u), q(tt(I(u)) + " w"), this;
        });
  p.__private__.setLineDash =
    zt.API.setLineDash =
    zt.API.setLineDashPattern =
      function (u, y) {
        if (((u = u || []), (y = y || 0), isNaN(y) || !Array.isArray(u)))
          throw new Error("Invalid arguments passed to jsPDF.setLineDash");
        return (
          (u = u
            .map(function (O) {
              return tt(I(O));
            })
            .join(" ")),
          (y = tt(I(y))),
          q("[" + u + "] " + y + " d"),
          this
        );
      };
  var $a =
    (p.__private__.getLineHeight =
    p.getLineHeight =
      function () {
        return Lt * Gr;
      });
  p.__private__.getLineHeight = p.getLineHeight = function () {
    return Lt * Gr;
  };
  var Ya =
      (p.__private__.setLineHeightFactor =
      p.setLineHeightFactor =
        function (u) {
          return typeof (u = u || 1.15) == "number" && (Gr = u), this;
        }),
    Ja =
      (p.__private__.getLineHeightFactor =
      p.getLineHeightFactor =
        function () {
          return Gr;
        });
  Ya(n.lineHeight);
  var nr = (p.__private__.getHorizontalCoordinate = function (u) {
      return I(u);
    }),
    hr = (p.__private__.getVerticalCoordinate = function (u) {
      return G === E.ADVANCED
        ? u
        : $t[j].mediaBox.topRightY - $t[j].mediaBox.bottomLeftY - I(u);
    }),
    ps =
      (p.__private__.getHorizontalCoordinateString =
      p.getHorizontalCoordinateString =
        function (u) {
          return tt(nr(u));
        }),
    Nr =
      (p.__private__.getVerticalCoordinateString =
      p.getVerticalCoordinateString =
        function (u) {
          return tt(hr(u));
        }),
    Tn = n.strokeColor || "0 G";
  (p.__private__.getStrokeColor = p.getDrawColor =
    function () {
      return Mn(Tn);
    }),
    (p.__private__.setStrokeColor = p.setDrawColor =
      function (u, y, O, D) {
        return (
          (Tn = Bn({
            ch1: u,
            ch2: y,
            ch3: O,
            ch4: D,
            pdfColorType: "draw",
            precision: 2,
          })),
          q(Tn),
          this
        );
      });
  var ea = n.fillColor || "0 g";
  (p.__private__.getFillColor = p.getFillColor =
    function () {
      return Mn(ea);
    }),
    (p.__private__.setFillColor = p.setFillColor =
      function (u, y, O, D) {
        return (
          (ea = Bn({
            ch1: u,
            ch2: y,
            ch3: O,
            ch4: D,
            pdfColorType: "fill",
            precision: 2,
          })),
          q(ea),
          this
        );
      });
  var $r = n.textColor || "0 g",
    gs =
      (p.__private__.getTextColor =
      p.getTextColor =
        function () {
          return Mn($r);
        });
  p.__private__.setTextColor = p.setTextColor = function (u, y, O, D) {
    return (
      ($r = Bn({
        ch1: u,
        ch2: y,
        ch3: O,
        ch4: D,
        pdfColorType: "text",
        precision: 3,
      })),
      this
    );
  };
  var wi = n.charSpace,
    ms =
      (p.__private__.getCharSpace =
      p.getCharSpace =
        function () {
          return parseFloat(wi || 0);
        });
  p.__private__.setCharSpace = p.setCharSpace = function (u) {
    if (isNaN(u))
      throw new Error("Invalid argument passed to jsPDF.setCharSpace");
    return (wi = u), this;
  };
  var na = 0;
  (p.CapJoinStyles = {
    0: 0,
    butt: 0,
    but: 0,
    miter: 0,
    1: 1,
    round: 1,
    rounded: 1,
    circle: 1,
    2: 2,
    projecting: 2,
    project: 2,
    square: 2,
    bevel: 2,
  }),
    (p.__private__.setLineCap = p.setLineCap =
      function (u) {
        var y = p.CapJoinStyles[u];
        if (y === void 0)
          throw new Error(
            "Line cap style of '" +
              u +
              "' is not recognized. See or extend .CapJoinStyles property for valid styles",
          );
        return (na = y), q(y + " J"), this;
      });
  var ra = 0;
  (p.__private__.setLineJoin = p.setLineJoin =
    function (u) {
      var y = p.CapJoinStyles[u];
      if (y === void 0)
        throw new Error(
          "Line join style of '" +
            u +
            "' is not recognized. See or extend .CapJoinStyles property for valid styles",
        );
      return (ra = y), q(y + " j"), this;
    }),
    (p.__private__.setLineMiterLimit =
      p.__private__.setMiterLimit =
      p.setLineMiterLimit =
      p.setMiterLimit =
        function (u) {
          if (((u = u || 0), isNaN(u)))
            throw new Error(
              "Invalid argument passed to jsPDF.setLineMiterLimit",
            );
          return q(tt(I(u)) + " M"), this;
        }),
    (p.GState = qo),
    (p.setGState = function (u) {
      (u = typeof u == "string" ? Se[jn[u]] : Xa(null, u)).equals(lr) ||
        (q("/" + u.id + " gs"), (lr = u));
    });
  var Xa = function (u, y) {
    if (!u || !jn[u]) {
      var O = !1;
      for (var D in Se)
        if (Se.hasOwnProperty(D) && Se[D].equals(y)) {
          O = !0;
          break;
        }
      if (O) y = Se[D];
      else {
        var J = "GS" + (Object.keys(Se).length + 1).toString(10);
        (Se[J] = y), (y.id = J);
      }
      return u && (jn[u] = y.id), ce.publish("addGState", y), y;
    }
  };
  (p.addGState = function (u, y) {
    return Xa(u, y), this;
  }),
    (p.saveGraphicsState = function () {
      return q("q"), Jn.push({ key: ne, size: Lt, color: $r }), this;
    }),
    (p.restoreGraphicsState = function () {
      q("Q");
      var u = Jn.pop();
      return (ne = u.key), (Lt = u.size), ($r = u.color), (lr = null), this;
    }),
    (p.setCurrentTransformationMatrix = function (u) {
      return q(u.toString() + " cm"), this;
    }),
    (p.comment = function (u) {
      return q("#" + u), this;
    });
  var xi = function (u, y) {
      var O = u || 0;
      Object.defineProperty(this, "x", {
        enumerable: !0,
        get: function () {
          return O;
        },
        set: function (lt) {
          isNaN(lt) || (O = parseFloat(lt));
        },
      });
      var D = y || 0;
      Object.defineProperty(this, "y", {
        enumerable: !0,
        get: function () {
          return D;
        },
        set: function (lt) {
          isNaN(lt) || (D = parseFloat(lt));
        },
      });
      var J = "pt";
      return (
        Object.defineProperty(this, "type", {
          enumerable: !0,
          get: function () {
            return J;
          },
          set: function (lt) {
            J = lt.toString();
          },
        }),
        this
      );
    },
    ia = function (u, y, O, D) {
      xi.call(this, u, y), (this.type = "rect");
      var J = O || 0;
      Object.defineProperty(this, "w", {
        enumerable: !0,
        get: function () {
          return J;
        },
        set: function (yt) {
          isNaN(yt) || (J = parseFloat(yt));
        },
      });
      var lt = D || 0;
      return (
        Object.defineProperty(this, "h", {
          enumerable: !0,
          get: function () {
            return lt;
          },
          set: function (yt) {
            isNaN(yt) || (lt = parseFloat(yt));
          },
        }),
        this
      );
    },
    aa = function () {
      (this.page = _e),
        (this.currentPage = j),
        (this.pages = At.slice(0)),
        (this.pagesContext = $t.slice(0)),
        (this.x = Xe),
        (this.y = se),
        (this.matrix = Fn),
        (this.width = Yr(j)),
        (this.height = Lr(j)),
        (this.outputDestination = _t),
        (this.id = ""),
        (this.objectNumber = -1);
    };
  aa.prototype.restore = function () {
    (_e = this.page),
      (j = this.currentPage),
      ($t = this.pagesContext),
      (At = this.pages),
      (Xe = this.x),
      (se = this.y),
      (Fn = this.matrix),
      oa(j, this.width),
      sa(j, this.height),
      (_t = this.outputDestination);
  };
  var Ka = function (u, y, O, D, J) {
      Kn.push(new aa()),
        (_e = j = 0),
        (At = []),
        (Xe = u),
        (se = y),
        (Fn = J),
        Xi([O, D]);
    },
    vs = function (u) {
      if (Xn[u]) Kn.pop().restore();
      else {
        var y = new aa(),
          O = "Xo" + (Object.keys($e).length + 1).toString(10);
        (y.id = O),
          (Xn[u] = O),
          ($e[O] = y),
          ce.publish("addFormObject", y),
          Kn.pop().restore();
      }
    };
  for (var Ai in ((p.beginFormObject = function (u, y, O, D, J) {
    return Ka(u, y, O, D, J), this;
  }),
  (p.endFormObject = function (u) {
    return vs(u), this;
  }),
  (p.doFormObject = function (u, y) {
    var O = $e[Xn[u]];
    return q("q"), q(y.toString() + " cm"), q("/" + O.id + " Do"), q("Q"), this;
  }),
  (p.getFormObject = function (u) {
    var y = $e[Xn[u]];
    return {
      x: y.x,
      y: y.y,
      width: y.width,
      height: y.height,
      matrix: y.matrix,
    };
  }),
  (p.save = function (u, y) {
    return (
      (u = u || "generated.pdf"),
      ((y = y || {}).returnPromise = y.returnPromise || !1),
      y.returnPromise === !1
        ? (ei(mi(fr()), u),
          typeof ei.unload == "function" &&
            Ht.setTimeout &&
            setTimeout(ei.unload, 911),
          this)
        : new Promise(function (O, D) {
            try {
              var J = ei(mi(fr()), u);
              typeof ei.unload == "function" &&
                Ht.setTimeout &&
                setTimeout(ei.unload, 911),
                O(J);
            } catch (lt) {
              D(lt.message);
            }
          })
    );
  }),
  zt.API))
    zt.API.hasOwnProperty(Ai) &&
      (Ai === "events" && zt.API.events.length
        ? (function (u, y) {
            var O, D, J;
            for (J = y.length - 1; J !== -1; J--)
              (O = y[J][0]),
                (D = y[J][1]),
                u.subscribe.apply(
                  u,
                  [O].concat(typeof D == "function" ? [D] : D),
                );
          })(ce, zt.API.events)
        : (p[Ai] = zt.API[Ai]));
  var Yr = (p.getPageWidth = function (u) {
      return (
        ($t[(u = u || j)].mediaBox.topRightX - $t[u].mediaBox.bottomLeftX) / jt
      );
    }),
    oa = (p.setPageWidth = function (u, y) {
      $t[u].mediaBox.topRightX = y * jt + $t[u].mediaBox.bottomLeftX;
    }),
    Lr = (p.getPageHeight = function (u) {
      return (
        ($t[(u = u || j)].mediaBox.topRightY - $t[u].mediaBox.bottomLeftY) / jt
      );
    }),
    sa = (p.setPageHeight = function (u, y) {
      $t[u].mediaBox.topRightY = y * jt + $t[u].mediaBox.bottomLeftY;
    });
  return (
    (p.internal = {
      pdfEscape: cn,
      getStyle: Wa,
      getFont: ds,
      getFontSize: kt,
      getCharSpace: ms,
      getTextColor: gs,
      getLineHeight: $a,
      getLineHeightFactor: Ja,
      getLineWidth: yi,
      write: Xt,
      getHorizontalCoordinate: nr,
      getVerticalCoordinate: hr,
      getCoordinateString: ps,
      getVerticalCoordinateString: Nr,
      collections: {},
      newObject: ze,
      newAdditionalObject: ui,
      newObjectDeferred: Be,
      newObjectDeferredBegin: vn,
      getFilters: Qn,
      putStream: Nn,
      events: ce,
      scaleFactor: jt,
      pageSize: {
        getWidth: function () {
          return Yr(j);
        },
        setWidth: function (u) {
          oa(j, u);
        },
        getHeight: function () {
          return Lr(j);
        },
        setHeight: function (u) {
          sa(j, u);
        },
      },
      encryptionOptions: m,
      encryption: Ke,
      getEncryptor: ss,
      output: vi,
      getNumberOfPages: ns,
      pages: At,
      out: q,
      f2: dt,
      f3: k,
      getPageInfo: Ha,
      getPageInfoByObjId: Vt,
      getCurrentPageInfo: us,
      getPDFVersion: P,
      Point: xi,
      Rectangle: ia,
      Matrix: Rt,
      hasHotfix: Ua,
    }),
    Object.defineProperty(p.internal.pageSize, "width", {
      get: function () {
        return Yr(j);
      },
      set: function (u) {
        oa(j, u);
      },
      enumerable: !0,
      configurable: !0,
    }),
    Object.defineProperty(p.internal.pageSize, "height", {
      get: function () {
        return Lr(j);
      },
      set: function (u) {
        sa(j, u);
      },
      enumerable: !0,
      configurable: !0,
    }),
    ts.call(p, xt),
    (ne = "F1"),
    Da(s, e),
    ce.publish("initialized"),
    p
  );
}
(Ri.prototype.lsbFirstWord = function (n) {
  return String.fromCharCode(
    (n >> 0) & 255,
    (n >> 8) & 255,
    (n >> 16) & 255,
    (n >> 24) & 255,
  );
}),
  (Ri.prototype.toHexString = function (n) {
    return n
      .split("")
      .map(function (t) {
        return ("0" + (255 & t.charCodeAt(0)).toString(16)).slice(-2);
      })
      .join("");
  }),
  (Ri.prototype.hexToBytes = function (n) {
    for (var t = [], e = 0; e < n.length; e += 2)
      t.push(String.fromCharCode(parseInt(n.substr(e, 2), 16)));
    return t.join("");
  }),
  (Ri.prototype.processOwnerPassword = function (n, t) {
    return iu(ru(t).substr(0, 5), n);
  }),
  (Ri.prototype.encryptor = function (n, t) {
    var e = ru(
      this.encryptionKey +
        String.fromCharCode(
          255 & n,
          (n >> 8) & 255,
          (n >> 16) & 255,
          255 & t,
          (t >> 8) & 255,
        ),
    ).substr(0, 10);
    return function (i) {
      return iu(e, i);
    };
  }),
  (qo.prototype.equals = function (n) {
    var t,
      e = "id,objectNumber,equals";
    if (!n || de(n) !== de(this)) return !1;
    var i = 0;
    for (t in this)
      if (!(e.indexOf(t) >= 0)) {
        if (
          (this.hasOwnProperty(t) && !n.hasOwnProperty(t)) ||
          this[t] !== n[t]
        )
          return !1;
        i++;
      }
    for (t in n) n.hasOwnProperty(t) && e.indexOf(t) < 0 && i--;
    return i === 0;
  }),
  (zt.API = { events: [] }),
  (zt.version = "2.5.2");
var Ie = zt.API,
  hu = 1,
  si = function (n) {
    return n.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
  },
  Ti = function (n) {
    return n.replace(/\\\\/g, "\\").replace(/\\\(/g, "(").replace(/\\\)/g, ")");
  },
  Jt = function (n) {
    return n.toFixed(2);
  },
  qr = function (n) {
    return n.toFixed(5);
  };
Ie.__acroform__ = {};
var mn = function (n, t) {
    (n.prototype = Object.create(t.prototype)), (n.prototype.constructor = n);
  },
  nl = function (n) {
    return n * hu;
  },
  ar = function (n) {
    var t = new Dl(),
      e = Mt.internal.getHeight(n) || 0,
      i = Mt.internal.getWidth(n) || 0;
    return (t.BBox = [0, 0, Number(Jt(i)), Number(Jt(e))]), t;
  },
  zf = (Ie.__acroform__.setBit = function (n, t) {
    if (((n = n || 0), (t = t || 0), isNaN(n) || isNaN(t)))
      throw new Error(
        "Invalid arguments passed to jsPDF.API.__acroform__.setBit",
      );
    return (n |= 1 << t);
  }),
  Uf = (Ie.__acroform__.clearBit = function (n, t) {
    if (((n = n || 0), (t = t || 0), isNaN(n) || isNaN(t)))
      throw new Error(
        "Invalid arguments passed to jsPDF.API.__acroform__.clearBit",
      );
    return (n &= ~(1 << t));
  }),
  Hf = (Ie.__acroform__.getBit = function (n, t) {
    if (isNaN(n) || isNaN(t))
      throw new Error(
        "Invalid arguments passed to jsPDF.API.__acroform__.getBit",
      );
    return n & (1 << t) ? 1 : 0;
  }),
  Oe = (Ie.__acroform__.getBitForPdf = function (n, t) {
    if (isNaN(n) || isNaN(t))
      throw new Error(
        "Invalid arguments passed to jsPDF.API.__acroform__.getBitForPdf",
      );
    return Hf(n, t - 1);
  }),
  Ee = (Ie.__acroform__.setBitForPdf = function (n, t) {
    if (isNaN(n) || isNaN(t))
      throw new Error(
        "Invalid arguments passed to jsPDF.API.__acroform__.setBitForPdf",
      );
    return zf(n, t - 1);
  }),
  Me = (Ie.__acroform__.clearBitForPdf = function (n, t) {
    if (isNaN(n) || isNaN(t))
      throw new Error(
        "Invalid arguments passed to jsPDF.API.__acroform__.clearBitForPdf",
      );
    return Uf(n, t - 1);
  }),
  Wf = (Ie.__acroform__.calculateCoordinates = function (n, t) {
    var e = t.internal.getHorizontalCoordinate,
      i = t.internal.getVerticalCoordinate,
      s = n[0],
      a = n[1],
      l = n[2],
      c = n[3],
      h = {};
    return (
      (h.lowerLeft_X = e(s) || 0),
      (h.lowerLeft_Y = i(a + c) || 0),
      (h.upperRight_X = e(s + l) || 0),
      (h.upperRight_Y = i(a) || 0),
      [
        Number(Jt(h.lowerLeft_X)),
        Number(Jt(h.lowerLeft_Y)),
        Number(Jt(h.upperRight_X)),
        Number(Jt(h.upperRight_Y)),
      ]
    );
  }),
  Vf = function (n) {
    if (n.appearanceStreamContent) return n.appearanceStreamContent;
    if (n.V || n.DV) {
      var t = [],
        e = n._V || n.DV,
        i = au(n, e),
        s = n.scope.internal.getFont(n.fontName, n.fontStyle).id;
      t.push("/Tx BMC"),
        t.push("q"),
        t.push("BT"),
        t.push(n.scope.__private__.encodeColorString(n.color)),
        t.push("/" + s + " " + Jt(i.fontSize) + " Tf"),
        t.push("1 0 0 1 0 0 Tm"),
        t.push(i.text),
        t.push("ET"),
        t.push("Q"),
        t.push("EMC");
      var a = ar(n);
      return (
        (a.scope = n.scope),
        (a.stream = t.join(`
`)),
        a
      );
    }
  },
  au = function (n, t) {
    var e = n.fontSize === 0 ? n.maxFontSize : n.fontSize,
      i = { text: "", fontSize: "" },
      s = (t =
        (t = t.substr(0, 1) == "(" ? t.substr(1) : t).substr(t.length - 1) ==
        ")"
          ? t.substr(0, t.length - 1)
          : t).split(" ");
    s = n.multiline
      ? s.map(function (k) {
          return k.split(`
`);
        })
      : s.map(function (k) {
          return [k];
        });
    var a = e,
      l = Mt.internal.getHeight(n) || 0;
    l = l < 0 ? -l : l;
    var c = Mt.internal.getWidth(n) || 0;
    c = c < 0 ? -c : c;
    var h = function (k, I, W) {
      if (k + 1 < s.length) {
        var T = I + " " + s[k + 1][0];
        return _o(T, n, W).width <= c - 4;
      }
      return !1;
    };
    a++;
    t: for (; a > 0; ) {
      (t = ""), a--;
      var g,
        m,
        v = _o("3", n, a).height,
        N = n.multiline ? l - a : (l - v) / 2,
        p = (N += 2),
        F = 0,
        P = 0,
        M = 0;
      if (a <= 0) {
        (t = `(...) Tj
`),
          (t +=
            "% Width of Text: " +
            _o(t, n, (a = 12)).width +
            ", FieldWidth:" +
            c +
            `
`);
        break;
      }
      for (var _ = "", E = 0, G = 0; G < s.length; G++)
        if (s.hasOwnProperty(G)) {
          var nt = !1;
          if (s[G].length !== 1 && M !== s[G].length - 1) {
            if ((v + 2) * (E + 2) + 2 > l) continue t;
            (_ += s[G][M]), (nt = !0), (P = G), G--;
          } else {
            _ =
              (_ += s[G][M] + " ").substr(_.length - 1) == " "
                ? _.substr(0, _.length - 1)
                : _;
            var st = parseInt(G),
              wt = h(st, _, a),
              tt = G >= s.length - 1;
            if (wt && !tt) {
              (_ += " "), (M = 0);
              continue;
            }
            if (wt || tt) {
              if (tt) P = st;
              else if (n.multiline && (v + 2) * (E + 2) + 2 > l) continue t;
            } else {
              if (!n.multiline || (v + 2) * (E + 2) + 2 > l) continue t;
              P = st;
            }
          }
          for (var z = "", it = F; it <= P; it++) {
            var dt = s[it];
            if (n.multiline) {
              if (it === P) {
                (z += dt[M] + " "), (M = (M + 1) % dt.length);
                continue;
              }
              if (it === F) {
                z += dt[dt.length - 1] + " ";
                continue;
              }
            }
            z += dt[0] + " ";
          }
          switch (
            ((z =
              z.substr(z.length - 1) == " " ? z.substr(0, z.length - 1) : z),
            (m = _o(z, n, a).width),
            n.textAlign)
          ) {
            case "right":
              g = c - m - 2;
              break;
            case "center":
              g = (c - m) / 2;
              break;
            case "left":
            default:
              g = 2;
          }
          (t +=
            Jt(g) +
            " " +
            Jt(p) +
            ` Td
`),
            (t +=
              "(" +
              si(z) +
              `) Tj
`),
            (t +=
              -Jt(g) +
              ` 0 Td
`),
            (p = -(a + 2)),
            (m = 0),
            (F = nt ? P : P + 1),
            E++,
            (_ = "");
        }
      break;
    }
    return (i.text = t), (i.fontSize = a), i;
  },
  _o = function (n, t, e) {
    var i = t.scope.internal.getFont(t.fontName, t.fontStyle),
      s =
        t.scope.getStringUnitWidth(n, {
          font: i,
          fontSize: parseFloat(e),
          charSpace: 0,
        }) * parseFloat(e);
    return {
      height:
        t.scope.getStringUnitWidth("3", {
          font: i,
          fontSize: parseFloat(e),
          charSpace: 0,
        }) *
        parseFloat(e) *
        1.5,
      width: s,
    };
  },
  Gf = {
    fields: [],
    xForms: [],
    acroFormDictionaryRoot: null,
    printedOut: !1,
    internal: null,
    isInitialized: !1,
  },
  $f = function (n, t) {
    var e = { type: "reference", object: n };
    t.internal.getPageInfo(n.page).pageContext.annotations.find(function (i) {
      return i.type === e.type && i.object === e.object;
    }) === void 0 &&
      t.internal.getPageInfo(n.page).pageContext.annotations.push(e);
  },
  Yf = function (n, t) {
    for (var e in n)
      if (n.hasOwnProperty(e)) {
        var i = e,
          s = n[e];
        t.internal.newObjectDeferredBegin(s.objId, !0),
          de(s) === "object" &&
            typeof s.putStream == "function" &&
            s.putStream(),
          delete n[i];
      }
  },
  Jf = function (n, t) {
    if (
      ((t.scope = n),
      n.internal !== void 0 &&
        (n.internal.acroformPlugin === void 0 ||
          n.internal.acroformPlugin.isInitialized === !1))
    ) {
      if (
        (($n.FieldNum = 0),
        (n.internal.acroformPlugin = JSON.parse(JSON.stringify(Gf))),
        n.internal.acroformPlugin.acroFormDictionaryRoot)
      )
        throw new Error("Exception while creating AcroformDictionary");
      (hu = n.internal.scaleFactor),
        (n.internal.acroformPlugin.acroFormDictionaryRoot = new Rl()),
        (n.internal.acroformPlugin.acroFormDictionaryRoot.scope = n),
        (n.internal.acroformPlugin.acroFormDictionaryRoot._eventID =
          n.internal.events.subscribe("postPutResources", function () {
            (function (e) {
              e.internal.events.unsubscribe(
                e.internal.acroformPlugin.acroFormDictionaryRoot._eventID,
              ),
                delete e.internal.acroformPlugin.acroFormDictionaryRoot
                  ._eventID,
                (e.internal.acroformPlugin.printedOut = !0);
            })(n);
          })),
        n.internal.events.subscribe("buildDocument", function () {
          (function (e) {
            e.internal.acroformPlugin.acroFormDictionaryRoot.objId = void 0;
            var i = e.internal.acroformPlugin.acroFormDictionaryRoot.Fields;
            for (var s in i)
              if (i.hasOwnProperty(s)) {
                var a = i[s];
                (a.objId = void 0), a.hasAnnotation && $f(a, e);
              }
          })(n);
        }),
        n.internal.events.subscribe("putCatalog", function () {
          (function (e) {
            if (e.internal.acroformPlugin.acroFormDictionaryRoot === void 0)
              throw new Error("putCatalogCallback: Root missing.");
            e.internal.write(
              "/AcroForm " +
                e.internal.acroformPlugin.acroFormDictionaryRoot.objId +
                " 0 R",
            );
          })(n);
        }),
        n.internal.events.subscribe("postPutPages", function (e) {
          (function (i, s) {
            var a = !i;
            for (var l in (i ||
              (s.internal.newObjectDeferredBegin(
                s.internal.acroformPlugin.acroFormDictionaryRoot.objId,
                !0,
              ),
              s.internal.acroformPlugin.acroFormDictionaryRoot.putStream()),
            (i = i || s.internal.acroformPlugin.acroFormDictionaryRoot.Kids)))
              if (i.hasOwnProperty(l)) {
                var c = i[l],
                  h = [],
                  g = c.Rect;
                if (
                  (c.Rect && (c.Rect = Wf(c.Rect, s)),
                  s.internal.newObjectDeferredBegin(c.objId, !0),
                  (c.DA = Mt.createDefaultAppearanceStream(c)),
                  de(c) === "object" &&
                    typeof c.getKeyValueListForStream == "function" &&
                    (h = c.getKeyValueListForStream()),
                  (c.Rect = g),
                  c.hasAppearanceStream && !c.appearanceStreamContent)
                ) {
                  var m = Vf(c);
                  h.push({ key: "AP", value: "<</N " + m + ">>" }),
                    s.internal.acroformPlugin.xForms.push(m);
                }
                if (c.appearanceStreamContent) {
                  var v = "";
                  for (var N in c.appearanceStreamContent)
                    if (c.appearanceStreamContent.hasOwnProperty(N)) {
                      var p = c.appearanceStreamContent[N];
                      if (
                        ((v += "/" + N + " "),
                        (v += "<<"),
                        Object.keys(p).length >= 1 || Array.isArray(p))
                      ) {
                        for (var l in p)
                          if (p.hasOwnProperty(l)) {
                            var F = p[l];
                            typeof F == "function" && (F = F.call(s, c)),
                              (v += "/" + l + " " + F + " "),
                              s.internal.acroformPlugin.xForms.indexOf(F) >=
                                0 || s.internal.acroformPlugin.xForms.push(F);
                          }
                      } else
                        typeof (F = p) == "function" && (F = F.call(s, c)),
                          (v += "/" + l + " " + F),
                          s.internal.acroformPlugin.xForms.indexOf(F) >= 0 ||
                            s.internal.acroformPlugin.xForms.push(F);
                      v += ">>";
                    }
                  h.push({
                    key: "AP",
                    value:
                      `<<
` +
                      v +
                      ">>",
                  });
                }
                s.internal.putStream({
                  additionalKeyValues: h,
                  objectId: c.objId,
                }),
                  s.internal.out("endobj");
              }
            a && Yf(s.internal.acroformPlugin.xForms, s);
          })(e, n);
        }),
        (n.internal.acroformPlugin.isInitialized = !0);
    }
  },
  Tl = (Ie.__acroform__.arrayToPdfArray = function (n, t, e) {
    var i = function (l) {
      return l;
    };
    if (Array.isArray(n)) {
      for (var s = "[", a = 0; a < n.length; a++)
        switch ((a !== 0 && (s += " "), de(n[a]))) {
          case "boolean":
          case "number":
          case "object":
            s += n[a].toString();
            break;
          case "string":
            n[a].substr(0, 1) !== "/"
              ? (t !== void 0 && e && (i = e.internal.getEncryptor(t)),
                (s += "(" + si(i(n[a].toString())) + ")"))
              : (s += n[a].toString());
        }
      return (s += "]");
    }
    throw new Error(
      "Invalid argument passed to jsPDF.__acroform__.arrayToPdfArray",
    );
  }),
  Vs = function (n, t, e) {
    var i = function (s) {
      return s;
    };
    return (
      t !== void 0 && e && (i = e.internal.getEncryptor(t)),
      (n = n || "").toString(),
      (n = "(" + si(i(n)) + ")")
    );
  },
  or = function () {
    (this._objId = void 0),
      (this._scope = void 0),
      Object.defineProperty(this, "objId", {
        get: function () {
          if (this._objId === void 0) {
            if (this.scope === void 0) return;
            this._objId = this.scope.internal.newObjectDeferred();
          }
          return this._objId;
        },
        set: function (n) {
          this._objId = n;
        },
      }),
      Object.defineProperty(this, "scope", {
        value: this._scope,
        writable: !0,
      });
  };
(or.prototype.toString = function () {
  return this.objId + " 0 R";
}),
  (or.prototype.putStream = function () {
    var n = this.getKeyValueListForStream();
    this.scope.internal.putStream({
      data: this.stream,
      additionalKeyValues: n,
      objectId: this.objId,
    }),
      this.scope.internal.out("endobj");
  }),
  (or.prototype.getKeyValueListForStream = function () {
    var n = [],
      t = Object.getOwnPropertyNames(this).filter(function (a) {
        return (
          a != "content" &&
          a != "appearanceStreamContent" &&
          a != "scope" &&
          a != "objId" &&
          a.substring(0, 1) != "_"
        );
      });
    for (var e in t)
      if (Object.getOwnPropertyDescriptor(this, t[e]).configurable === !1) {
        var i = t[e],
          s = this[i];
        s &&
          (Array.isArray(s)
            ? n.push({ key: i, value: Tl(s, this.objId, this.scope) })
            : s instanceof or
              ? ((s.scope = this.scope),
                n.push({ key: i, value: s.objId + " 0 R" }))
              : typeof s != "function" && n.push({ key: i, value: s }));
      }
    return n;
  });
var Dl = function () {
  or.call(this),
    Object.defineProperty(this, "Type", {
      value: "/XObject",
      configurable: !1,
      writable: !0,
    }),
    Object.defineProperty(this, "Subtype", {
      value: "/Form",
      configurable: !1,
      writable: !0,
    }),
    Object.defineProperty(this, "FormType", {
      value: 1,
      configurable: !1,
      writable: !0,
    });
  var n,
    t = [];
  Object.defineProperty(this, "BBox", {
    configurable: !1,
    get: function () {
      return t;
    },
    set: function (e) {
      t = e;
    },
  }),
    Object.defineProperty(this, "Resources", {
      value: "2 0 R",
      configurable: !1,
      writable: !0,
    }),
    Object.defineProperty(this, "stream", {
      enumerable: !1,
      configurable: !0,
      set: function (e) {
        n = e.trim();
      },
      get: function () {
        return n || null;
      },
    });
};
mn(Dl, or);
var Rl = function () {
  or.call(this);
  var n,
    t = [];
  Object.defineProperty(this, "Kids", {
    enumerable: !1,
    configurable: !0,
    get: function () {
      return t.length > 0 ? t : void 0;
    },
  }),
    Object.defineProperty(this, "Fields", {
      enumerable: !1,
      configurable: !1,
      get: function () {
        return t;
      },
    }),
    Object.defineProperty(this, "DA", {
      enumerable: !1,
      configurable: !1,
      get: function () {
        if (n) {
          var e = function (i) {
            return i;
          };
          return (
            this.scope && (e = this.scope.internal.getEncryptor(this.objId)),
            "(" + si(e(n)) + ")"
          );
        }
      },
      set: function (e) {
        n = e;
      },
    });
};
mn(Rl, or);
var $n = function n() {
  or.call(this);
  var t = 4;
  Object.defineProperty(this, "F", {
    enumerable: !1,
    configurable: !1,
    get: function () {
      return t;
    },
    set: function (_) {
      if (isNaN(_))
        throw new Error('Invalid value "' + _ + '" for attribute F supplied.');
      t = _;
    },
  }),
    Object.defineProperty(this, "showWhenPrinted", {
      enumerable: !0,
      configurable: !0,
      get: function () {
        return !!Oe(t, 3);
      },
      set: function (_) {
        _ ? (this.F = Ee(t, 3)) : (this.F = Me(t, 3));
      },
    });
  var e = 0;
  Object.defineProperty(this, "Ff", {
    enumerable: !1,
    configurable: !1,
    get: function () {
      return e;
    },
    set: function (_) {
      if (isNaN(_))
        throw new Error('Invalid value "' + _ + '" for attribute Ff supplied.');
      e = _;
    },
  });
  var i = [];
  Object.defineProperty(this, "Rect", {
    enumerable: !1,
    configurable: !1,
    get: function () {
      if (i.length !== 0) return i;
    },
    set: function (_) {
      i = _ !== void 0 ? _ : [];
    },
  }),
    Object.defineProperty(this, "x", {
      enumerable: !0,
      configurable: !0,
      get: function () {
        return !i || isNaN(i[0]) ? 0 : i[0];
      },
      set: function (_) {
        i[0] = _;
      },
    }),
    Object.defineProperty(this, "y", {
      enumerable: !0,
      configurable: !0,
      get: function () {
        return !i || isNaN(i[1]) ? 0 : i[1];
      },
      set: function (_) {
        i[1] = _;
      },
    }),
    Object.defineProperty(this, "width", {
      enumerable: !0,
      configurable: !0,
      get: function () {
        return !i || isNaN(i[2]) ? 0 : i[2];
      },
      set: function (_) {
        i[2] = _;
      },
    }),
    Object.defineProperty(this, "height", {
      enumerable: !0,
      configurable: !0,
      get: function () {
        return !i || isNaN(i[3]) ? 0 : i[3];
      },
      set: function (_) {
        i[3] = _;
      },
    });
  var s = "";
  Object.defineProperty(this, "FT", {
    enumerable: !0,
    configurable: !1,
    get: function () {
      return s;
    },
    set: function (_) {
      switch (_) {
        case "/Btn":
        case "/Tx":
        case "/Ch":
        case "/Sig":
          s = _;
          break;
        default:
          throw new Error(
            'Invalid value "' + _ + '" for attribute FT supplied.',
          );
      }
    },
  });
  var a = null;
  Object.defineProperty(this, "T", {
    enumerable: !0,
    configurable: !1,
    get: function () {
      if (!a || a.length < 1) {
        if (this instanceof To) return;
        a = "FieldObject" + n.FieldNum++;
      }
      var _ = function (E) {
        return E;
      };
      return (
        this.scope && (_ = this.scope.internal.getEncryptor(this.objId)),
        "(" + si(_(a)) + ")"
      );
    },
    set: function (_) {
      a = _.toString();
    },
  }),
    Object.defineProperty(this, "fieldName", {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return a;
      },
      set: function (_) {
        a = _;
      },
    });
  var l = "helvetica";
  Object.defineProperty(this, "fontName", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return l;
    },
    set: function (_) {
      l = _;
    },
  });
  var c = "normal";
  Object.defineProperty(this, "fontStyle", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return c;
    },
    set: function (_) {
      c = _;
    },
  });
  var h = 0;
  Object.defineProperty(this, "fontSize", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return h;
    },
    set: function (_) {
      h = _;
    },
  });
  var g = void 0;
  Object.defineProperty(this, "maxFontSize", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return g === void 0 ? 50 / hu : g;
    },
    set: function (_) {
      g = _;
    },
  });
  var m = "black";
  Object.defineProperty(this, "color", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return m;
    },
    set: function (_) {
      m = _;
    },
  });
  var v = "/F1 0 Tf 0 g";
  Object.defineProperty(this, "DA", {
    enumerable: !0,
    configurable: !1,
    get: function () {
      if (!(!v || this instanceof To || this instanceof ii))
        return Vs(v, this.objId, this.scope);
    },
    set: function (_) {
      (_ = _.toString()), (v = _);
    },
  });
  var N = null;
  Object.defineProperty(this, "DV", {
    enumerable: !1,
    configurable: !1,
    get: function () {
      if (N) return this instanceof Ge ? N : Vs(N, this.objId, this.scope);
    },
    set: function (_) {
      (_ = _.toString()),
        (N =
          this instanceof Ge
            ? _
            : _.substr(0, 1) === "("
              ? Ti(_.substr(1, _.length - 2))
              : Ti(_));
    },
  }),
    Object.defineProperty(this, "defaultValue", {
      enumerable: !0,
      configurable: !0,
      get: function () {
        return this instanceof Ge ? Ti(N.substr(1, N.length - 1)) : N;
      },
      set: function (_) {
        (_ = _.toString()), (N = this instanceof Ge ? "/" + _ : _);
      },
    });
  var p = null;
  Object.defineProperty(this, "_V", {
    enumerable: !1,
    configurable: !1,
    get: function () {
      if (p) return p;
    },
    set: function (_) {
      this.V = _;
    },
  }),
    Object.defineProperty(this, "V", {
      enumerable: !1,
      configurable: !1,
      get: function () {
        if (p) return this instanceof Ge ? p : Vs(p, this.objId, this.scope);
      },
      set: function (_) {
        (_ = _.toString()),
          (p =
            this instanceof Ge
              ? _
              : _.substr(0, 1) === "("
                ? Ti(_.substr(1, _.length - 2))
                : Ti(_));
      },
    }),
    Object.defineProperty(this, "value", {
      enumerable: !0,
      configurable: !0,
      get: function () {
        return this instanceof Ge ? Ti(p.substr(1, p.length - 1)) : p;
      },
      set: function (_) {
        (_ = _.toString()), (p = this instanceof Ge ? "/" + _ : _);
      },
    }),
    Object.defineProperty(this, "hasAnnotation", {
      enumerable: !0,
      configurable: !0,
      get: function () {
        return this.Rect;
      },
    }),
    Object.defineProperty(this, "Type", {
      enumerable: !0,
      configurable: !1,
      get: function () {
        return this.hasAnnotation ? "/Annot" : null;
      },
    }),
    Object.defineProperty(this, "Subtype", {
      enumerable: !0,
      configurable: !1,
      get: function () {
        return this.hasAnnotation ? "/Widget" : null;
      },
    });
  var F,
    P = !1;
  Object.defineProperty(this, "hasAppearanceStream", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return P;
    },
    set: function (_) {
      (_ = !!_), (P = _);
    },
  }),
    Object.defineProperty(this, "page", {
      enumerable: !0,
      configurable: !0,
      get: function () {
        if (F) return F;
      },
      set: function (_) {
        F = _;
      },
    }),
    Object.defineProperty(this, "readOnly", {
      enumerable: !0,
      configurable: !0,
      get: function () {
        return !!Oe(this.Ff, 1);
      },
      set: function (_) {
        _ ? (this.Ff = Ee(this.Ff, 1)) : (this.Ff = Me(this.Ff, 1));
      },
    }),
    Object.defineProperty(this, "required", {
      enumerable: !0,
      configurable: !0,
      get: function () {
        return !!Oe(this.Ff, 2);
      },
      set: function (_) {
        _ ? (this.Ff = Ee(this.Ff, 2)) : (this.Ff = Me(this.Ff, 2));
      },
    }),
    Object.defineProperty(this, "noExport", {
      enumerable: !0,
      configurable: !0,
      get: function () {
        return !!Oe(this.Ff, 3);
      },
      set: function (_) {
        _ ? (this.Ff = Ee(this.Ff, 3)) : (this.Ff = Me(this.Ff, 3));
      },
    });
  var M = null;
  Object.defineProperty(this, "Q", {
    enumerable: !0,
    configurable: !1,
    get: function () {
      if (M !== null) return M;
    },
    set: function (_) {
      if ([0, 1, 2].indexOf(_) === -1)
        throw new Error('Invalid value "' + _ + '" for attribute Q supplied.');
      M = _;
    },
  }),
    Object.defineProperty(this, "textAlign", {
      get: function () {
        var _;
        switch (M) {
          case 0:
          default:
            _ = "left";
            break;
          case 1:
            _ = "center";
            break;
          case 2:
            _ = "right";
        }
        return _;
      },
      configurable: !0,
      enumerable: !0,
      set: function (_) {
        switch (_) {
          case "right":
          case 2:
            M = 2;
            break;
          case "center":
          case 1:
            M = 1;
            break;
          case "left":
          case 0:
          default:
            M = 0;
        }
      },
    });
};
mn($n, or);
var Hi = function () {
  $n.call(this),
    (this.FT = "/Ch"),
    (this.V = "()"),
    (this.fontName = "zapfdingbats");
  var n = 0;
  Object.defineProperty(this, "TI", {
    enumerable: !0,
    configurable: !1,
    get: function () {
      return n;
    },
    set: function (e) {
      n = e;
    },
  }),
    Object.defineProperty(this, "topIndex", {
      enumerable: !0,
      configurable: !0,
      get: function () {
        return n;
      },
      set: function (e) {
        n = e;
      },
    });
  var t = [];
  Object.defineProperty(this, "Opt", {
    enumerable: !0,
    configurable: !1,
    get: function () {
      return Tl(t, this.objId, this.scope);
    },
    set: function (e) {
      var i, s;
      (s = []),
        typeof (i = e) == "string" &&
          (s = (function (a, l, c) {
            c || (c = 1);
            for (var h, g = []; (h = l.exec(a)); ) g.push(h[c]);
            return g;
          })(i, /\((.*?)\)/g)),
        (t = s);
    },
  }),
    (this.getOptions = function () {
      return t;
    }),
    (this.setOptions = function (e) {
      (t = e), this.sort && t.sort();
    }),
    (this.addOption = function (e) {
      (e = (e = e || "").toString()), t.push(e), this.sort && t.sort();
    }),
    (this.removeOption = function (e, i) {
      for (
        i = i || !1, e = (e = e || "").toString();
        t.indexOf(e) !== -1 && (t.splice(t.indexOf(e), 1), i !== !1);

      );
    }),
    Object.defineProperty(this, "combo", {
      enumerable: !0,
      configurable: !0,
      get: function () {
        return !!Oe(this.Ff, 18);
      },
      set: function (e) {
        e ? (this.Ff = Ee(this.Ff, 18)) : (this.Ff = Me(this.Ff, 18));
      },
    }),
    Object.defineProperty(this, "edit", {
      enumerable: !0,
      configurable: !0,
      get: function () {
        return !!Oe(this.Ff, 19);
      },
      set: function (e) {
        this.combo === !0 &&
          (e ? (this.Ff = Ee(this.Ff, 19)) : (this.Ff = Me(this.Ff, 19)));
      },
    }),
    Object.defineProperty(this, "sort", {
      enumerable: !0,
      configurable: !0,
      get: function () {
        return !!Oe(this.Ff, 20);
      },
      set: function (e) {
        e
          ? ((this.Ff = Ee(this.Ff, 20)), t.sort())
          : (this.Ff = Me(this.Ff, 20));
      },
    }),
    Object.defineProperty(this, "multiSelect", {
      enumerable: !0,
      configurable: !0,
      get: function () {
        return !!Oe(this.Ff, 22);
      },
      set: function (e) {
        e ? (this.Ff = Ee(this.Ff, 22)) : (this.Ff = Me(this.Ff, 22));
      },
    }),
    Object.defineProperty(this, "doNotSpellCheck", {
      enumerable: !0,
      configurable: !0,
      get: function () {
        return !!Oe(this.Ff, 23);
      },
      set: function (e) {
        e ? (this.Ff = Ee(this.Ff, 23)) : (this.Ff = Me(this.Ff, 23));
      },
    }),
    Object.defineProperty(this, "commitOnSelChange", {
      enumerable: !0,
      configurable: !0,
      get: function () {
        return !!Oe(this.Ff, 27);
      },
      set: function (e) {
        e ? (this.Ff = Ee(this.Ff, 27)) : (this.Ff = Me(this.Ff, 27));
      },
    }),
    (this.hasAppearanceStream = !1);
};
mn(Hi, $n);
var Wi = function () {
  Hi.call(this), (this.fontName = "helvetica"), (this.combo = !1);
};
mn(Wi, Hi);
var Vi = function () {
  Wi.call(this), (this.combo = !0);
};
mn(Vi, Wi);
var Io = function () {
  Vi.call(this), (this.edit = !0);
};
mn(Io, Vi);
var Ge = function () {
  $n.call(this),
    (this.FT = "/Btn"),
    Object.defineProperty(this, "noToggleToOff", {
      enumerable: !0,
      configurable: !0,
      get: function () {
        return !!Oe(this.Ff, 15);
      },
      set: function (e) {
        e ? (this.Ff = Ee(this.Ff, 15)) : (this.Ff = Me(this.Ff, 15));
      },
    }),
    Object.defineProperty(this, "radio", {
      enumerable: !0,
      configurable: !0,
      get: function () {
        return !!Oe(this.Ff, 16);
      },
      set: function (e) {
        e ? (this.Ff = Ee(this.Ff, 16)) : (this.Ff = Me(this.Ff, 16));
      },
    }),
    Object.defineProperty(this, "pushButton", {
      enumerable: !0,
      configurable: !0,
      get: function () {
        return !!Oe(this.Ff, 17);
      },
      set: function (e) {
        e ? (this.Ff = Ee(this.Ff, 17)) : (this.Ff = Me(this.Ff, 17));
      },
    }),
    Object.defineProperty(this, "radioIsUnison", {
      enumerable: !0,
      configurable: !0,
      get: function () {
        return !!Oe(this.Ff, 26);
      },
      set: function (e) {
        e ? (this.Ff = Ee(this.Ff, 26)) : (this.Ff = Me(this.Ff, 26));
      },
    });
  var n,
    t = {};
  Object.defineProperty(this, "MK", {
    enumerable: !1,
    configurable: !1,
    get: function () {
      var e = function (a) {
        return a;
      };
      if (
        (this.scope && (e = this.scope.internal.getEncryptor(this.objId)),
        Object.keys(t).length !== 0)
      ) {
        var i,
          s = [];
        for (i in (s.push("<<"), t)) s.push("/" + i + " (" + si(e(t[i])) + ")");
        return (
          s.push(">>"),
          s.join(`
`)
        );
      }
    },
    set: function (e) {
      de(e) === "object" && (t = e);
    },
  }),
    Object.defineProperty(this, "caption", {
      enumerable: !0,
      configurable: !0,
      get: function () {
        return t.CA || "";
      },
      set: function (e) {
        typeof e == "string" && (t.CA = e);
      },
    }),
    Object.defineProperty(this, "AS", {
      enumerable: !1,
      configurable: !1,
      get: function () {
        return n;
      },
      set: function (e) {
        n = e;
      },
    }),
    Object.defineProperty(this, "appearanceState", {
      enumerable: !0,
      configurable: !0,
      get: function () {
        return n.substr(1, n.length - 1);
      },
      set: function (e) {
        n = "/" + e;
      },
    });
};
mn(Ge, $n);
var Co = function () {
  Ge.call(this), (this.pushButton = !0);
};
mn(Co, Ge);
var Gi = function () {
  Ge.call(this), (this.radio = !0), (this.pushButton = !1);
  var n = [];
  Object.defineProperty(this, "Kids", {
    enumerable: !0,
    configurable: !1,
    get: function () {
      return n;
    },
    set: function (t) {
      n = t !== void 0 ? t : [];
    },
  });
};
mn(Gi, Ge);
var To = function () {
  var n, t;
  $n.call(this),
    Object.defineProperty(this, "Parent", {
      enumerable: !1,
      configurable: !1,
      get: function () {
        return n;
      },
      set: function (s) {
        n = s;
      },
    }),
    Object.defineProperty(this, "optionName", {
      enumerable: !1,
      configurable: !0,
      get: function () {
        return t;
      },
      set: function (s) {
        t = s;
      },
    });
  var e,
    i = {};
  Object.defineProperty(this, "MK", {
    enumerable: !1,
    configurable: !1,
    get: function () {
      var s = function (c) {
        return c;
      };
      this.scope && (s = this.scope.internal.getEncryptor(this.objId));
      var a,
        l = [];
      for (a in (l.push("<<"), i)) l.push("/" + a + " (" + si(s(i[a])) + ")");
      return (
        l.push(">>"),
        l.join(`
`)
      );
    },
    set: function (s) {
      de(s) === "object" && (i = s);
    },
  }),
    Object.defineProperty(this, "caption", {
      enumerable: !0,
      configurable: !0,
      get: function () {
        return i.CA || "";
      },
      set: function (s) {
        typeof s == "string" && (i.CA = s);
      },
    }),
    Object.defineProperty(this, "AS", {
      enumerable: !1,
      configurable: !1,
      get: function () {
        return e;
      },
      set: function (s) {
        e = s;
      },
    }),
    Object.defineProperty(this, "appearanceState", {
      enumerable: !0,
      configurable: !0,
      get: function () {
        return e.substr(1, e.length - 1);
      },
      set: function (s) {
        e = "/" + s;
      },
    }),
    (this.caption = "l"),
    (this.appearanceState = "Off"),
    (this._AppearanceType = Mt.RadioButton.Circle),
    (this.appearanceStreamContent = this._AppearanceType.createAppearanceStream(
      this.optionName,
    ));
};
mn(To, $n),
  (Gi.prototype.setAppearance = function (n) {
    if (!("createAppearanceStream" in n) || !("getCA" in n))
      throw new Error(
        "Couldn't assign Appearance to RadioButton. Appearance was Invalid!",
      );
    for (var t in this.Kids)
      if (this.Kids.hasOwnProperty(t)) {
        var e = this.Kids[t];
        (e.appearanceStreamContent = n.createAppearanceStream(e.optionName)),
          (e.caption = n.getCA());
      }
  }),
  (Gi.prototype.createOption = function (n) {
    var t = new To();
    return (
      (t.Parent = this),
      (t.optionName = n),
      this.Kids.push(t),
      Xf.call(this.scope, t),
      t
    );
  });
var Fo = function () {
  Ge.call(this),
    (this.fontName = "zapfdingbats"),
    (this.caption = "3"),
    (this.appearanceState = "On"),
    (this.value = "On"),
    (this.textAlign = "center"),
    (this.appearanceStreamContent = Mt.CheckBox.createAppearanceStream());
};
mn(Fo, Ge);
var ii = function () {
  $n.call(this),
    (this.FT = "/Tx"),
    Object.defineProperty(this, "multiline", {
      enumerable: !0,
      configurable: !0,
      get: function () {
        return !!Oe(this.Ff, 13);
      },
      set: function (t) {
        t ? (this.Ff = Ee(this.Ff, 13)) : (this.Ff = Me(this.Ff, 13));
      },
    }),
    Object.defineProperty(this, "fileSelect", {
      enumerable: !0,
      configurable: !0,
      get: function () {
        return !!Oe(this.Ff, 21);
      },
      set: function (t) {
        t ? (this.Ff = Ee(this.Ff, 21)) : (this.Ff = Me(this.Ff, 21));
      },
    }),
    Object.defineProperty(this, "doNotSpellCheck", {
      enumerable: !0,
      configurable: !0,
      get: function () {
        return !!Oe(this.Ff, 23);
      },
      set: function (t) {
        t ? (this.Ff = Ee(this.Ff, 23)) : (this.Ff = Me(this.Ff, 23));
      },
    }),
    Object.defineProperty(this, "doNotScroll", {
      enumerable: !0,
      configurable: !0,
      get: function () {
        return !!Oe(this.Ff, 24);
      },
      set: function (t) {
        t ? (this.Ff = Ee(this.Ff, 24)) : (this.Ff = Me(this.Ff, 24));
      },
    }),
    Object.defineProperty(this, "comb", {
      enumerable: !0,
      configurable: !0,
      get: function () {
        return !!Oe(this.Ff, 25);
      },
      set: function (t) {
        t ? (this.Ff = Ee(this.Ff, 25)) : (this.Ff = Me(this.Ff, 25));
      },
    }),
    Object.defineProperty(this, "richText", {
      enumerable: !0,
      configurable: !0,
      get: function () {
        return !!Oe(this.Ff, 26);
      },
      set: function (t) {
        t ? (this.Ff = Ee(this.Ff, 26)) : (this.Ff = Me(this.Ff, 26));
      },
    });
  var n = null;
  Object.defineProperty(this, "MaxLen", {
    enumerable: !0,
    configurable: !1,
    get: function () {
      return n;
    },
    set: function (t) {
      n = t;
    },
  }),
    Object.defineProperty(this, "maxLength", {
      enumerable: !0,
      configurable: !0,
      get: function () {
        return n;
      },
      set: function (t) {
        Number.isInteger(t) && (n = t);
      },
    }),
    Object.defineProperty(this, "hasAppearanceStream", {
      enumerable: !0,
      configurable: !0,
      get: function () {
        return this.V || this.DV;
      },
    });
};
mn(ii, $n);
var jo = function () {
  ii.call(this),
    Object.defineProperty(this, "password", {
      enumerable: !0,
      configurable: !0,
      get: function () {
        return !!Oe(this.Ff, 14);
      },
      set: function (n) {
        n ? (this.Ff = Ee(this.Ff, 14)) : (this.Ff = Me(this.Ff, 14));
      },
    }),
    (this.password = !0);
};
mn(jo, ii);
var Mt = {
  CheckBox: {
    createAppearanceStream: function () {
      return {
        N: { On: Mt.CheckBox.YesNormal },
        D: { On: Mt.CheckBox.YesPushDown, Off: Mt.CheckBox.OffPushDown },
      };
    },
    YesPushDown: function (n) {
      var t = ar(n);
      t.scope = n.scope;
      var e = [],
        i = n.scope.internal.getFont(n.fontName, n.fontStyle).id,
        s = n.scope.__private__.encodeColorString(n.color),
        a = au(n, n.caption);
      return (
        e.push("0.749023 g"),
        e.push(
          "0 0 " +
            Jt(Mt.internal.getWidth(n)) +
            " " +
            Jt(Mt.internal.getHeight(n)) +
            " re",
        ),
        e.push("f"),
        e.push("BMC"),
        e.push("q"),
        e.push("0 0 1 rg"),
        e.push("/" + i + " " + Jt(a.fontSize) + " Tf " + s),
        e.push("BT"),
        e.push(a.text),
        e.push("ET"),
        e.push("Q"),
        e.push("EMC"),
        (t.stream = e.join(`
`)),
        t
      );
    },
    YesNormal: function (n) {
      var t = ar(n);
      t.scope = n.scope;
      var e = n.scope.internal.getFont(n.fontName, n.fontStyle).id,
        i = n.scope.__private__.encodeColorString(n.color),
        s = [],
        a = Mt.internal.getHeight(n),
        l = Mt.internal.getWidth(n),
        c = au(n, n.caption);
      return (
        s.push("1 g"),
        s.push("0 0 " + Jt(l) + " " + Jt(a) + " re"),
        s.push("f"),
        s.push("q"),
        s.push("0 0 1 rg"),
        s.push("0 0 " + Jt(l - 1) + " " + Jt(a - 1) + " re"),
        s.push("W"),
        s.push("n"),
        s.push("0 g"),
        s.push("BT"),
        s.push("/" + e + " " + Jt(c.fontSize) + " Tf " + i),
        s.push(c.text),
        s.push("ET"),
        s.push("Q"),
        (t.stream = s.join(`
`)),
        t
      );
    },
    OffPushDown: function (n) {
      var t = ar(n);
      t.scope = n.scope;
      var e = [];
      return (
        e.push("0.749023 g"),
        e.push(
          "0 0 " +
            Jt(Mt.internal.getWidth(n)) +
            " " +
            Jt(Mt.internal.getHeight(n)) +
            " re",
        ),
        e.push("f"),
        (t.stream = e.join(`
`)),
        t
      );
    },
  },
  RadioButton: {
    Circle: {
      createAppearanceStream: function (n) {
        var t = { D: { Off: Mt.RadioButton.Circle.OffPushDown }, N: {} };
        return (
          (t.N[n] = Mt.RadioButton.Circle.YesNormal),
          (t.D[n] = Mt.RadioButton.Circle.YesPushDown),
          t
        );
      },
      getCA: function () {
        return "l";
      },
      YesNormal: function (n) {
        var t = ar(n);
        t.scope = n.scope;
        var e = [],
          i =
            Mt.internal.getWidth(n) <= Mt.internal.getHeight(n)
              ? Mt.internal.getWidth(n) / 4
              : Mt.internal.getHeight(n) / 4;
        i = Number((0.9 * i).toFixed(5));
        var s = Mt.internal.Bezier_C,
          a = Number((i * s).toFixed(5));
        return (
          e.push("q"),
          e.push(
            "1 0 0 1 " +
              qr(Mt.internal.getWidth(n) / 2) +
              " " +
              qr(Mt.internal.getHeight(n) / 2) +
              " cm",
          ),
          e.push(i + " 0 m"),
          e.push(i + " " + a + " " + a + " " + i + " 0 " + i + " c"),
          e.push("-" + a + " " + i + " -" + i + " " + a + " -" + i + " 0 c"),
          e.push("-" + i + " -" + a + " -" + a + " -" + i + " 0 -" + i + " c"),
          e.push(a + " -" + i + " " + i + " -" + a + " " + i + " 0 c"),
          e.push("f"),
          e.push("Q"),
          (t.stream = e.join(`
`)),
          t
        );
      },
      YesPushDown: function (n) {
        var t = ar(n);
        t.scope = n.scope;
        var e = [],
          i =
            Mt.internal.getWidth(n) <= Mt.internal.getHeight(n)
              ? Mt.internal.getWidth(n) / 4
              : Mt.internal.getHeight(n) / 4;
        i = Number((0.9 * i).toFixed(5));
        var s = Number((2 * i).toFixed(5)),
          a = Number((s * Mt.internal.Bezier_C).toFixed(5)),
          l = Number((i * Mt.internal.Bezier_C).toFixed(5));
        return (
          e.push("0.749023 g"),
          e.push("q"),
          e.push(
            "1 0 0 1 " +
              qr(Mt.internal.getWidth(n) / 2) +
              " " +
              qr(Mt.internal.getHeight(n) / 2) +
              " cm",
          ),
          e.push(s + " 0 m"),
          e.push(s + " " + a + " " + a + " " + s + " 0 " + s + " c"),
          e.push("-" + a + " " + s + " -" + s + " " + a + " -" + s + " 0 c"),
          e.push("-" + s + " -" + a + " -" + a + " -" + s + " 0 -" + s + " c"),
          e.push(a + " -" + s + " " + s + " -" + a + " " + s + " 0 c"),
          e.push("f"),
          e.push("Q"),
          e.push("0 g"),
          e.push("q"),
          e.push(
            "1 0 0 1 " +
              qr(Mt.internal.getWidth(n) / 2) +
              " " +
              qr(Mt.internal.getHeight(n) / 2) +
              " cm",
          ),
          e.push(i + " 0 m"),
          e.push(i + " " + l + " " + l + " " + i + " 0 " + i + " c"),
          e.push("-" + l + " " + i + " -" + i + " " + l + " -" + i + " 0 c"),
          e.push("-" + i + " -" + l + " -" + l + " -" + i + " 0 -" + i + " c"),
          e.push(l + " -" + i + " " + i + " -" + l + " " + i + " 0 c"),
          e.push("f"),
          e.push("Q"),
          (t.stream = e.join(`
`)),
          t
        );
      },
      OffPushDown: function (n) {
        var t = ar(n);
        t.scope = n.scope;
        var e = [],
          i =
            Mt.internal.getWidth(n) <= Mt.internal.getHeight(n)
              ? Mt.internal.getWidth(n) / 4
              : Mt.internal.getHeight(n) / 4;
        i = Number((0.9 * i).toFixed(5));
        var s = Number((2 * i).toFixed(5)),
          a = Number((s * Mt.internal.Bezier_C).toFixed(5));
        return (
          e.push("0.749023 g"),
          e.push("q"),
          e.push(
            "1 0 0 1 " +
              qr(Mt.internal.getWidth(n) / 2) +
              " " +
              qr(Mt.internal.getHeight(n) / 2) +
              " cm",
          ),
          e.push(s + " 0 m"),
          e.push(s + " " + a + " " + a + " " + s + " 0 " + s + " c"),
          e.push("-" + a + " " + s + " -" + s + " " + a + " -" + s + " 0 c"),
          e.push("-" + s + " -" + a + " -" + a + " -" + s + " 0 -" + s + " c"),
          e.push(a + " -" + s + " " + s + " -" + a + " " + s + " 0 c"),
          e.push("f"),
          e.push("Q"),
          (t.stream = e.join(`
`)),
          t
        );
      },
    },
    Cross: {
      createAppearanceStream: function (n) {
        var t = { D: { Off: Mt.RadioButton.Cross.OffPushDown }, N: {} };
        return (
          (t.N[n] = Mt.RadioButton.Cross.YesNormal),
          (t.D[n] = Mt.RadioButton.Cross.YesPushDown),
          t
        );
      },
      getCA: function () {
        return "8";
      },
      YesNormal: function (n) {
        var t = ar(n);
        t.scope = n.scope;
        var e = [],
          i = Mt.internal.calculateCross(n);
        return (
          e.push("q"),
          e.push(
            "1 1 " +
              Jt(Mt.internal.getWidth(n) - 2) +
              " " +
              Jt(Mt.internal.getHeight(n) - 2) +
              " re",
          ),
          e.push("W"),
          e.push("n"),
          e.push(Jt(i.x1.x) + " " + Jt(i.x1.y) + " m"),
          e.push(Jt(i.x2.x) + " " + Jt(i.x2.y) + " l"),
          e.push(Jt(i.x4.x) + " " + Jt(i.x4.y) + " m"),
          e.push(Jt(i.x3.x) + " " + Jt(i.x3.y) + " l"),
          e.push("s"),
          e.push("Q"),
          (t.stream = e.join(`
`)),
          t
        );
      },
      YesPushDown: function (n) {
        var t = ar(n);
        t.scope = n.scope;
        var e = Mt.internal.calculateCross(n),
          i = [];
        return (
          i.push("0.749023 g"),
          i.push(
            "0 0 " +
              Jt(Mt.internal.getWidth(n)) +
              " " +
              Jt(Mt.internal.getHeight(n)) +
              " re",
          ),
          i.push("f"),
          i.push("q"),
          i.push(
            "1 1 " +
              Jt(Mt.internal.getWidth(n) - 2) +
              " " +
              Jt(Mt.internal.getHeight(n) - 2) +
              " re",
          ),
          i.push("W"),
          i.push("n"),
          i.push(Jt(e.x1.x) + " " + Jt(e.x1.y) + " m"),
          i.push(Jt(e.x2.x) + " " + Jt(e.x2.y) + " l"),
          i.push(Jt(e.x4.x) + " " + Jt(e.x4.y) + " m"),
          i.push(Jt(e.x3.x) + " " + Jt(e.x3.y) + " l"),
          i.push("s"),
          i.push("Q"),
          (t.stream = i.join(`
`)),
          t
        );
      },
      OffPushDown: function (n) {
        var t = ar(n);
        t.scope = n.scope;
        var e = [];
        return (
          e.push("0.749023 g"),
          e.push(
            "0 0 " +
              Jt(Mt.internal.getWidth(n)) +
              " " +
              Jt(Mt.internal.getHeight(n)) +
              " re",
          ),
          e.push("f"),
          (t.stream = e.join(`
`)),
          t
        );
      },
    },
  },
  createDefaultAppearanceStream: function (n) {
    var t = n.scope.internal.getFont(n.fontName, n.fontStyle).id,
      e = n.scope.__private__.encodeColorString(n.color);
    return "/" + t + " " + n.fontSize + " Tf " + e;
  },
};
(Mt.internal = {
  Bezier_C: 0.551915024494,
  calculateCross: function (n) {
    var t = Mt.internal.getWidth(n),
      e = Mt.internal.getHeight(n),
      i = Math.min(t, e);
    return {
      x1: { x: (t - i) / 2, y: (e - i) / 2 + i },
      x2: { x: (t - i) / 2 + i, y: (e - i) / 2 },
      x3: { x: (t - i) / 2, y: (e - i) / 2 },
      x4: { x: (t - i) / 2 + i, y: (e - i) / 2 + i },
    };
  },
}),
  (Mt.internal.getWidth = function (n) {
    var t = 0;
    return de(n) === "object" && (t = nl(n.Rect[2])), t;
  }),
  (Mt.internal.getHeight = function (n) {
    var t = 0;
    return de(n) === "object" && (t = nl(n.Rect[3])), t;
  });
var Xf = (Ie.addField = function (n) {
  if ((Jf(this, n), !(n instanceof $n)))
    throw new Error("Invalid argument passed to jsPDF.addField.");
  var t;
  return (
    (t = n).scope.internal.acroformPlugin.printedOut &&
      ((t.scope.internal.acroformPlugin.printedOut = !1),
      (t.scope.internal.acroformPlugin.acroFormDictionaryRoot = null)),
    t.scope.internal.acroformPlugin.acroFormDictionaryRoot.Fields.push(t),
    (n.page = n.scope.internal.getCurrentPageInfo().pageNumber),
    this
  );
});
(Ie.AcroFormChoiceField = Hi),
  (Ie.AcroFormListBox = Wi),
  (Ie.AcroFormComboBox = Vi),
  (Ie.AcroFormEditBox = Io),
  (Ie.AcroFormButton = Ge),
  (Ie.AcroFormPushButton = Co),
  (Ie.AcroFormRadioButton = Gi),
  (Ie.AcroFormCheckBox = Fo),
  (Ie.AcroFormTextField = ii),
  (Ie.AcroFormPasswordField = jo),
  (Ie.AcroFormAppearance = Mt),
  (Ie.AcroForm = {
    ChoiceField: Hi,
    ListBox: Wi,
    ComboBox: Vi,
    EditBox: Io,
    Button: Ge,
    PushButton: Co,
    RadioButton: Gi,
    CheckBox: Fo,
    TextField: ii,
    PasswordField: jo,
    Appearance: Mt,
  }),
  (zt.AcroForm = {
    ChoiceField: Hi,
    ListBox: Wi,
    ComboBox: Vi,
    EditBox: Io,
    Button: Ge,
    PushButton: Co,
    RadioButton: Gi,
    CheckBox: Fo,
    TextField: ii,
    PasswordField: jo,
    Appearance: Mt,
  });
zt.AcroForm;
function zl(n) {
  return n.reduce(function (t, e, i) {
    return (t[e] = i), t;
  }, {});
}
(function (n) {
  n.__addimage__ = {};
  var t = "UNKNOWN",
    e = {
      PNG: [[137, 80, 78, 71]],
      TIFF: [
        [77, 77, 0, 42],
        [73, 73, 42, 0],
      ],
      JPEG: [
        [255, 216, 255, 224, void 0, void 0, 74, 70, 73, 70, 0],
        [255, 216, 255, 225, void 0, void 0, 69, 120, 105, 102, 0, 0],
        [255, 216, 255, 219],
        [255, 216, 255, 238],
      ],
      JPEG2000: [[0, 0, 0, 12, 106, 80, 32, 32]],
      GIF87a: [[71, 73, 70, 56, 55, 97]],
      GIF89a: [[71, 73, 70, 56, 57, 97]],
      WEBP: [[82, 73, 70, 70, void 0, void 0, void 0, void 0, 87, 69, 66, 80]],
      BMP: [
        [66, 77],
        [66, 65],
        [67, 73],
        [67, 80],
        [73, 67],
        [80, 84],
      ],
    },
    i = (n.__addimage__.getImageFileTypeByImageData = function (k, I) {
      var W,
        T,
        ut,
        at,
        ct,
        Z = t;
      if (
        (I = I || t) === "RGBA" ||
        (k.data !== void 0 &&
          k.data instanceof Uint8ClampedArray &&
          "height" in k &&
          "width" in k)
      )
        return "RGBA";
      if (wt(k))
        for (ct in e)
          for (ut = e[ct], W = 0; W < ut.length; W += 1) {
            for (at = !0, T = 0; T < ut[W].length; T += 1)
              if (ut[W][T] !== void 0 && ut[W][T] !== k[T]) {
                at = !1;
                break;
              }
            if (at === !0) {
              Z = ct;
              break;
            }
          }
      else
        for (ct in e)
          for (ut = e[ct], W = 0; W < ut.length; W += 1) {
            for (at = !0, T = 0; T < ut[W].length; T += 1)
              if (ut[W][T] !== void 0 && ut[W][T] !== k.charCodeAt(T)) {
                at = !1;
                break;
              }
            if (at === !0) {
              Z = ct;
              break;
            }
          }
      return Z === t && I !== t && (Z = I), Z;
    }),
    s = function k(I) {
      for (
        var W = this.internal.write,
          T = this.internal.putStream,
          ut = (0, this.internal.getFilters)();
        ut.indexOf("FlateEncode") !== -1;

      )
        ut.splice(ut.indexOf("FlateEncode"), 1);
      I.objectId = this.internal.newObject();
      var at = [];
      if (
        (at.push({ key: "Type", value: "/XObject" }),
        at.push({ key: "Subtype", value: "/Image" }),
        at.push({ key: "Width", value: I.width }),
        at.push({ key: "Height", value: I.height }),
        I.colorSpace === M.INDEXED
          ? at.push({
              key: "ColorSpace",
              value:
                "[/Indexed /DeviceRGB " +
                (I.palette.length / 3 - 1) +
                " " +
                ("sMask" in I && I.sMask !== void 0
                  ? I.objectId + 2
                  : I.objectId + 1) +
                " 0 R]",
            })
          : (at.push({ key: "ColorSpace", value: "/" + I.colorSpace }),
            I.colorSpace === M.DEVICE_CMYK &&
              at.push({ key: "Decode", value: "[1 0 1 0 1 0 1 0]" })),
        at.push({ key: "BitsPerComponent", value: I.bitsPerComponent }),
        "decodeParameters" in I &&
          I.decodeParameters !== void 0 &&
          at.push({
            key: "DecodeParms",
            value: "<<" + I.decodeParameters + ">>",
          }),
        "transparency" in I && Array.isArray(I.transparency))
      ) {
        for (var ct = "", Z = 0, ft = I.transparency.length; Z < ft; Z++)
          ct += I.transparency[Z] + " " + I.transparency[Z] + " ";
        at.push({ key: "Mask", value: "[" + ct + "]" });
      }
      I.sMask !== void 0 &&
        at.push({ key: "SMask", value: I.objectId + 1 + " 0 R" });
      var pt = I.filter !== void 0 ? ["/" + I.filter] : void 0;
      if (
        (T({
          data: I.data,
          additionalKeyValues: at,
          alreadyAppliedFilters: pt,
          objectId: I.objectId,
        }),
        W("endobj"),
        "sMask" in I && I.sMask !== void 0)
      ) {
        var Ct =
            "/Predictor " +
            I.predictor +
            " /Colors 1 /BitsPerComponent " +
            I.bitsPerComponent +
            " /Columns " +
            I.width,
          A = {
            width: I.width,
            height: I.height,
            colorSpace: "DeviceGray",
            bitsPerComponent: I.bitsPerComponent,
            decodeParameters: Ct,
            data: I.sMask,
          };
        "filter" in I && (A.filter = I.filter), k.call(this, A);
      }
      if (I.colorSpace === M.INDEXED) {
        var j = this.internal.newObject();
        T({ data: z(new Uint8Array(I.palette)), objectId: j }), W("endobj");
      }
    },
    a = function () {
      var k = this.internal.collections.addImage_images;
      for (var I in k) s.call(this, k[I]);
    },
    l = function () {
      var k,
        I = this.internal.collections.addImage_images,
        W = this.internal.write;
      for (var T in I) W("/I" + (k = I[T]).index, k.objectId, "0", "R");
    },
    c = function () {
      this.internal.collections.addImage_images ||
        ((this.internal.collections.addImage_images = {}),
        this.internal.events.subscribe("putResources", a),
        this.internal.events.subscribe("putXobjectDict", l));
    },
    h = function () {
      var k = this.internal.collections.addImage_images;
      return c.call(this), k;
    },
    g = function () {
      return Object.keys(this.internal.collections.addImage_images).length;
    },
    m = function (k) {
      return typeof n["process" + k.toUpperCase()] == "function";
    },
    v = function (k) {
      return de(k) === "object" && k.nodeType === 1;
    },
    N = function (k, I) {
      if (k.nodeName === "IMG" && k.hasAttribute("src")) {
        var W = "" + k.getAttribute("src");
        if (W.indexOf("data:image/") === 0)
          return ka(unescape(W).split("base64,").pop());
        var T = n.loadFile(W, !0);
        if (T !== void 0) return T;
      }
      if (k.nodeName === "CANVAS") {
        if (k.width === 0 || k.height === 0)
          throw new Error(
            "Given canvas must have data. Canvas width: " +
              k.width +
              ", height: " +
              k.height,
          );
        var ut;
        switch (I) {
          case "PNG":
            ut = "image/png";
            break;
          case "WEBP":
            ut = "image/webp";
            break;
          case "JPEG":
          case "JPG":
          default:
            ut = "image/jpeg";
        }
        return ka(k.toDataURL(ut, 1).split("base64,").pop());
      }
    },
    p = function (k) {
      var I = this.internal.collections.addImage_images;
      if (I) {
        for (var W in I) if (k === I[W].alias) return I[W];
      }
    },
    F = function (k, I, W) {
      return (
        k || I || ((k = -96), (I = -96)),
        k < 0 && (k = (-1 * W.width * 72) / k / this.internal.scaleFactor),
        I < 0 && (I = (-1 * W.height * 72) / I / this.internal.scaleFactor),
        k === 0 && (k = (I * W.width) / W.height),
        I === 0 && (I = (k * W.height) / W.width),
        [k, I]
      );
    },
    P = function (k, I, W, T, ut, at) {
      var ct = F.call(this, W, T, ut),
        Z = this.internal.getCoordinateString,
        ft = this.internal.getVerticalCoordinateString,
        pt = h.call(this);
      if (((W = ct[0]), (T = ct[1]), (pt[ut.index] = ut), at)) {
        at *= Math.PI / 180;
        var Ct = Math.cos(at),
          A = Math.sin(at),
          j = function (R) {
            return R.toFixed(4);
          },
          B = [j(Ct), j(A), j(-1 * A), j(Ct), 0, 0, "cm"];
      }
      this.internal.write("q"),
        at
          ? (this.internal.write(
              [1, "0", "0", 1, Z(k), ft(I + T), "cm"].join(" "),
            ),
            this.internal.write(B.join(" ")),
            this.internal.write(
              [Z(W), "0", "0", Z(T), "0", "0", "cm"].join(" "),
            ))
          : this.internal.write(
              [Z(W), "0", "0", Z(T), Z(k), ft(I + T), "cm"].join(" "),
            ),
        this.isAdvancedAPI() &&
          this.internal.write([1, 0, 0, -1, 0, 0, "cm"].join(" ")),
        this.internal.write("/I" + ut.index + " Do"),
        this.internal.write("Q");
    },
    M = (n.color_spaces = {
      DEVICE_RGB: "DeviceRGB",
      DEVICE_GRAY: "DeviceGray",
      DEVICE_CMYK: "DeviceCMYK",
      CAL_GREY: "CalGray",
      CAL_RGB: "CalRGB",
      LAB: "Lab",
      ICC_BASED: "ICCBased",
      INDEXED: "Indexed",
      PATTERN: "Pattern",
      SEPARATION: "Separation",
      DEVICE_N: "DeviceN",
    });
  n.decode = {
    DCT_DECODE: "DCTDecode",
    FLATE_DECODE: "FlateDecode",
    LZW_DECODE: "LZWDecode",
    JPX_DECODE: "JPXDecode",
    JBIG2_DECODE: "JBIG2Decode",
    ASCII85_DECODE: "ASCII85Decode",
    ASCII_HEX_DECODE: "ASCIIHexDecode",
    RUN_LENGTH_DECODE: "RunLengthDecode",
    CCITT_FAX_DECODE: "CCITTFaxDecode",
  };
  var _ = (n.image_compression = {
      NONE: "NONE",
      FAST: "FAST",
      MEDIUM: "MEDIUM",
      SLOW: "SLOW",
    }),
    E = (n.__addimage__.sHashCode = function (k) {
      var I,
        W,
        T = 0;
      if (typeof k == "string")
        for (W = k.length, I = 0; I < W; I++)
          (T = (T << 5) - T + k.charCodeAt(I)), (T |= 0);
      else if (wt(k))
        for (W = k.byteLength / 2, I = 0; I < W; I++)
          (T = (T << 5) - T + k[I]), (T |= 0);
      return T;
    }),
    G = (n.__addimage__.validateStringAsBase64 = function (k) {
      (k = k || "").toString().trim();
      var I = !0;
      return (
        k.length === 0 && (I = !1),
        k.length % 4 != 0 && (I = !1),
        /^[A-Za-z0-9+/]+$/.test(k.substr(0, k.length - 2)) === !1 && (I = !1),
        /^[A-Za-z0-9/][A-Za-z0-9+/]|[A-Za-z0-9+/]=|==$/.test(k.substr(-2)) ===
          !1 && (I = !1),
        I
      );
    }),
    nt = (n.__addimage__.extractImageFromDataUrl = function (k) {
      var I = (k = k || "").split("base64,"),
        W = null;
      if (I.length === 2) {
        var T = /^data:(\w*\/\w*);*(charset=(?!charset=)[\w=-]*)*;*$/.exec(
          I[0],
        );
        Array.isArray(T) && (W = { mimeType: T[1], charset: T[2], data: I[1] });
      }
      return W;
    }),
    st = (n.__addimage__.supportsArrayBuffer = function () {
      return typeof ArrayBuffer < "u" && typeof Uint8Array < "u";
    });
  n.__addimage__.isArrayBuffer = function (k) {
    return st() && k instanceof ArrayBuffer;
  };
  var wt = (n.__addimage__.isArrayBufferView = function (k) {
      return (
        st() &&
        typeof Uint32Array < "u" &&
        (k instanceof Int8Array ||
          k instanceof Uint8Array ||
          (typeof Uint8ClampedArray < "u" && k instanceof Uint8ClampedArray) ||
          k instanceof Int16Array ||
          k instanceof Uint16Array ||
          k instanceof Int32Array ||
          k instanceof Uint32Array ||
          k instanceof Float32Array ||
          k instanceof Float64Array)
      );
    }),
    tt = (n.__addimage__.binaryStringToUint8Array = function (k) {
      for (var I = k.length, W = new Uint8Array(I), T = 0; T < I; T++)
        W[T] = k.charCodeAt(T);
      return W;
    }),
    z = (n.__addimage__.arrayBufferToBinaryString = function (k) {
      for (
        var I = "", W = wt(k) ? k : new Uint8Array(k), T = 0;
        T < W.length;
        T += 8192
      )
        I += String.fromCharCode.apply(null, W.subarray(T, T + 8192));
      return I;
    });
  n.addImage = function () {
    var k, I, W, T, ut, at, ct, Z, ft;
    if (
      (typeof arguments[1] == "number"
        ? ((I = t),
          (W = arguments[1]),
          (T = arguments[2]),
          (ut = arguments[3]),
          (at = arguments[4]),
          (ct = arguments[5]),
          (Z = arguments[6]),
          (ft = arguments[7]))
        : ((I = arguments[1]),
          (W = arguments[2]),
          (T = arguments[3]),
          (ut = arguments[4]),
          (at = arguments[5]),
          (ct = arguments[6]),
          (Z = arguments[7]),
          (ft = arguments[8])),
      de((k = arguments[0])) === "object" && !v(k) && "imageData" in k)
    ) {
      var pt = k;
      (k = pt.imageData),
        (I = pt.format || I || t),
        (W = pt.x || W || 0),
        (T = pt.y || T || 0),
        (ut = pt.w || pt.width || ut),
        (at = pt.h || pt.height || at),
        (ct = pt.alias || ct),
        (Z = pt.compression || Z),
        (ft = pt.rotation || pt.angle || ft);
    }
    var Ct = this.internal.getFilters();
    if (
      (Z === void 0 && Ct.indexOf("FlateEncode") !== -1 && (Z = "SLOW"),
      isNaN(W) || isNaN(T))
    )
      throw new Error("Invalid coordinates passed to jsPDF.addImage");
    c.call(this);
    var A = it.call(this, k, I, ct, Z);
    return P.call(this, W, T, ut, at, A, ft), this;
  };
  var it = function (k, I, W, T) {
      var ut, at, ct;
      if (typeof k == "string" && i(k) === t) {
        k = unescape(k);
        var Z = dt(k, !1);
        (Z !== "" || (Z = n.loadFile(k, !0)) !== void 0) && (k = Z);
      }
      if ((v(k) && (k = N(k, I)), (I = i(k, I)), !m(I)))
        throw new Error(
          "addImage does not support files of type '" +
            I +
            "', please ensure that a plugin for '" +
            I +
            "' support is added.",
        );
      if (
        (((ct = W) == null || ct.length === 0) &&
          (W = (function (ft) {
            return typeof ft == "string" || wt(ft)
              ? E(ft)
              : wt(ft.data)
                ? E(ft.data)
                : null;
          })(k)),
        (ut = p.call(this, W)) ||
          (st() &&
            (k instanceof Uint8Array ||
              I === "RGBA" ||
              ((at = k), (k = tt(k)))),
          (ut = this["process" + I.toUpperCase()](
            k,
            g.call(this),
            W,
            (function (ft) {
              return (
                ft && typeof ft == "string" && (ft = ft.toUpperCase()),
                ft in n.image_compression ? ft : _.NONE
              );
            })(T),
            at,
          ))),
        !ut)
      )
        throw new Error(
          "An unknown error occurred whilst processing the image.",
        );
      return ut;
    },
    dt = (n.__addimage__.convertBase64ToBinaryString = function (k, I) {
      var W;
      I = typeof I != "boolean" || I;
      var T,
        ut = "";
      if (typeof k == "string") {
        T = (W = nt(k)) !== null ? W.data : k;
        try {
          ut = ka(T);
        } catch (at) {
          if (I)
            throw G(T)
              ? new Error(
                  "atob-Error in jsPDF.convertBase64ToBinaryString " +
                    at.message,
                )
              : new Error(
                  "Supplied Data is not a valid base64-String jsPDF.convertBase64ToBinaryString ",
                );
        }
      }
      return ut;
    });
  n.getImageProperties = function (k) {
    var I,
      W,
      T = "";
    if (
      (v(k) && (k = N(k)),
      typeof k == "string" &&
        i(k) === t &&
        ((T = dt(k, !1)) === "" && (T = n.loadFile(k) || ""), (k = T)),
      (W = i(k)),
      !m(W))
    )
      throw new Error(
        "addImage does not support files of type '" +
          W +
          "', please ensure that a plugin for '" +
          W +
          "' support is added.",
      );
    if (
      (!st() || k instanceof Uint8Array || (k = tt(k)),
      !(I = this["process" + W.toUpperCase()](k)))
    )
      throw new Error("An unknown error occurred whilst processing the image");
    return (I.fileType = W), I;
  };
})(zt.API),
  (function (n) {
    var t = function (e) {
      if (e !== void 0 && e != "") return !0;
    };
    zt.API.events.push([
      "addPage",
      function (e) {
        this.internal.getPageInfo(e.pageNumber).pageContext.annotations = [];
      },
    ]),
      n.events.push([
        "putPage",
        function (e) {
          for (
            var i,
              s,
              a,
              l = this.internal.getCoordinateString,
              c = this.internal.getVerticalCoordinateString,
              h = this.internal.getPageInfoByObjId(e.objId),
              g = e.pageContext.annotations,
              m = !1,
              v = 0;
            v < g.length && !m;
            v++
          )
            switch ((i = g[v]).type) {
              case "link":
                (t(i.options.url) || t(i.options.pageNumber)) && (m = !0);
                break;
              case "reference":
              case "text":
              case "freetext":
                m = !0;
            }
          if (m != 0) {
            this.internal.write("/Annots [");
            for (var N = 0; N < g.length; N++) {
              i = g[N];
              var p = this.internal.pdfEscape,
                F = this.internal.getEncryptor(e.objId);
              switch (i.type) {
                case "reference":
                  this.internal.write(" " + i.object.objId + " 0 R ");
                  break;
                case "text":
                  var P = this.internal.newAdditionalObject(),
                    M = this.internal.newAdditionalObject(),
                    _ = this.internal.getEncryptor(P.objId),
                    E = i.title || "Note";
                  (a =
                    "<</Type /Annot /Subtype /Text " +
                    (s =
                      "/Rect [" +
                      l(i.bounds.x) +
                      " " +
                      c(i.bounds.y + i.bounds.h) +
                      " " +
                      l(i.bounds.x + i.bounds.w) +
                      " " +
                      c(i.bounds.y) +
                      "] ") +
                    "/Contents (" +
                    p(_(i.contents)) +
                    ")"),
                    (a += " /Popup " + M.objId + " 0 R"),
                    (a += " /P " + h.objId + " 0 R"),
                    (a += " /T (" + p(_(E)) + ") >>"),
                    (P.content = a);
                  var G = P.objId + " 0 R";
                  (a =
                    "<</Type /Annot /Subtype /Popup " +
                    (s =
                      "/Rect [" +
                      l(i.bounds.x + 30) +
                      " " +
                      c(i.bounds.y + i.bounds.h) +
                      " " +
                      l(i.bounds.x + i.bounds.w + 30) +
                      " " +
                      c(i.bounds.y) +
                      "] ") +
                    " /Parent " +
                    G),
                    i.open && (a += " /Open true"),
                    (a += " >>"),
                    (M.content = a),
                    this.internal.write(P.objId, "0 R", M.objId, "0 R");
                  break;
                case "freetext":
                  s =
                    "/Rect [" +
                    l(i.bounds.x) +
                    " " +
                    c(i.bounds.y) +
                    " " +
                    l(i.bounds.x + i.bounds.w) +
                    " " +
                    c(i.bounds.y + i.bounds.h) +
                    "] ";
                  var nt = i.color || "#000000";
                  (a =
                    "<</Type /Annot /Subtype /FreeText " +
                    s +
                    "/Contents (" +
                    p(F(i.contents)) +
                    ")"),
                    (a +=
                      " /DS(font: Helvetica,sans-serif 12.0pt; text-align:left; color:#" +
                      nt +
                      ")"),
                    (a += " /Border [0 0 0]"),
                    (a += " >>"),
                    this.internal.write(a);
                  break;
                case "link":
                  if (i.options.name) {
                    var st = this.annotations._nameMap[i.options.name];
                    (i.options.pageNumber = st.page), (i.options.top = st.y);
                  } else i.options.top || (i.options.top = 0);
                  if (
                    ((s =
                      "/Rect [" +
                      i.finalBounds.x +
                      " " +
                      i.finalBounds.y +
                      " " +
                      i.finalBounds.w +
                      " " +
                      i.finalBounds.h +
                      "] "),
                    (a = ""),
                    i.options.url)
                  )
                    a =
                      "<</Type /Annot /Subtype /Link " +
                      s +
                      "/Border [0 0 0] /A <</S /URI /URI (" +
                      p(F(i.options.url)) +
                      ") >>";
                  else if (i.options.pageNumber)
                    switch (
                      ((a =
                        "<</Type /Annot /Subtype /Link " +
                        s +
                        "/Border [0 0 0] /Dest [" +
                        this.internal.getPageInfo(i.options.pageNumber).objId +
                        " 0 R"),
                      (i.options.magFactor = i.options.magFactor || "XYZ"),
                      i.options.magFactor)
                    ) {
                      case "Fit":
                        a += " /Fit]";
                        break;
                      case "FitH":
                        a += " /FitH " + i.options.top + "]";
                        break;
                      case "FitV":
                        (i.options.left = i.options.left || 0),
                          (a += " /FitV " + i.options.left + "]");
                        break;
                      case "XYZ":
                      default:
                        var wt = c(i.options.top);
                        (i.options.left = i.options.left || 0),
                          i.options.zoom === void 0 && (i.options.zoom = 0),
                          (a +=
                            " /XYZ " +
                            i.options.left +
                            " " +
                            wt +
                            " " +
                            i.options.zoom +
                            "]");
                    }
                  a != "" && ((a += " >>"), this.internal.write(a));
              }
            }
            this.internal.write("]");
          }
        },
      ]),
      (n.createAnnotation = function (e) {
        var i = this.internal.getCurrentPageInfo();
        switch (e.type) {
          case "link":
            this.link(e.bounds.x, e.bounds.y, e.bounds.w, e.bounds.h, e);
            break;
          case "text":
          case "freetext":
            i.pageContext.annotations.push(e);
        }
      }),
      (n.link = function (e, i, s, a, l) {
        var c = this.internal.getCurrentPageInfo(),
          h = this.internal.getCoordinateString,
          g = this.internal.getVerticalCoordinateString;
        c.pageContext.annotations.push({
          finalBounds: { x: h(e), y: g(i), w: h(e + s), h: g(i + a) },
          options: l,
          type: "link",
        });
      }),
      (n.textWithLink = function (e, i, s, a) {
        var l,
          c,
          h = this.getTextWidth(e),
          g = this.internal.getLineHeight() / this.internal.scaleFactor;
        if (a.maxWidth !== void 0) {
          c = a.maxWidth;
          var m = this.splitTextToSize(e, c).length;
          l = Math.ceil(g * m);
        } else (c = h), (l = g);
        return (
          this.text(e, i, s, a),
          (s += 0.2 * g),
          a.align === "center" && (i -= h / 2),
          a.align === "right" && (i -= h),
          this.link(i, s - g, c, l, a),
          h
        );
      }),
      (n.getTextWidth = function (e) {
        var i = this.internal.getFontSize();
        return (this.getStringUnitWidth(e) * i) / this.internal.scaleFactor;
      });
  })(zt.API),
  (function (n) {
    var t = {
        1569: [65152],
        1570: [65153, 65154],
        1571: [65155, 65156],
        1572: [65157, 65158],
        1573: [65159, 65160],
        1574: [65161, 65162, 65163, 65164],
        1575: [65165, 65166],
        1576: [65167, 65168, 65169, 65170],
        1577: [65171, 65172],
        1578: [65173, 65174, 65175, 65176],
        1579: [65177, 65178, 65179, 65180],
        1580: [65181, 65182, 65183, 65184],
        1581: [65185, 65186, 65187, 65188],
        1582: [65189, 65190, 65191, 65192],
        1583: [65193, 65194],
        1584: [65195, 65196],
        1585: [65197, 65198],
        1586: [65199, 65200],
        1587: [65201, 65202, 65203, 65204],
        1588: [65205, 65206, 65207, 65208],
        1589: [65209, 65210, 65211, 65212],
        1590: [65213, 65214, 65215, 65216],
        1591: [65217, 65218, 65219, 65220],
        1592: [65221, 65222, 65223, 65224],
        1593: [65225, 65226, 65227, 65228],
        1594: [65229, 65230, 65231, 65232],
        1601: [65233, 65234, 65235, 65236],
        1602: [65237, 65238, 65239, 65240],
        1603: [65241, 65242, 65243, 65244],
        1604: [65245, 65246, 65247, 65248],
        1605: [65249, 65250, 65251, 65252],
        1606: [65253, 65254, 65255, 65256],
        1607: [65257, 65258, 65259, 65260],
        1608: [65261, 65262],
        1609: [65263, 65264, 64488, 64489],
        1610: [65265, 65266, 65267, 65268],
        1649: [64336, 64337],
        1655: [64477],
        1657: [64358, 64359, 64360, 64361],
        1658: [64350, 64351, 64352, 64353],
        1659: [64338, 64339, 64340, 64341],
        1662: [64342, 64343, 64344, 64345],
        1663: [64354, 64355, 64356, 64357],
        1664: [64346, 64347, 64348, 64349],
        1667: [64374, 64375, 64376, 64377],
        1668: [64370, 64371, 64372, 64373],
        1670: [64378, 64379, 64380, 64381],
        1671: [64382, 64383, 64384, 64385],
        1672: [64392, 64393],
        1676: [64388, 64389],
        1677: [64386, 64387],
        1678: [64390, 64391],
        1681: [64396, 64397],
        1688: [64394, 64395],
        1700: [64362, 64363, 64364, 64365],
        1702: [64366, 64367, 64368, 64369],
        1705: [64398, 64399, 64400, 64401],
        1709: [64467, 64468, 64469, 64470],
        1711: [64402, 64403, 64404, 64405],
        1713: [64410, 64411, 64412, 64413],
        1715: [64406, 64407, 64408, 64409],
        1722: [64414, 64415],
        1723: [64416, 64417, 64418, 64419],
        1726: [64426, 64427, 64428, 64429],
        1728: [64420, 64421],
        1729: [64422, 64423, 64424, 64425],
        1733: [64480, 64481],
        1734: [64473, 64474],
        1735: [64471, 64472],
        1736: [64475, 64476],
        1737: [64482, 64483],
        1739: [64478, 64479],
        1740: [64508, 64509, 64510, 64511],
        1744: [64484, 64485, 64486, 64487],
        1746: [64430, 64431],
        1747: [64432, 64433],
      },
      e = {
        65247: { 65154: 65269, 65156: 65271, 65160: 65273, 65166: 65275 },
        65248: { 65154: 65270, 65156: 65272, 65160: 65274, 65166: 65276 },
        65165: { 65247: { 65248: { 65258: 65010 } } },
        1617: {
          1612: 64606,
          1613: 64607,
          1614: 64608,
          1615: 64609,
          1616: 64610,
        },
      },
      i = { 1612: 64606, 1613: 64607, 1614: 64608, 1615: 64609, 1616: 64610 },
      s = [1570, 1571, 1573, 1575];
    n.__arabicParser__ = {};
    var a = (n.__arabicParser__.isInArabicSubstitutionA = function (P) {
        return t[P.charCodeAt(0)] !== void 0;
      }),
      l = (n.__arabicParser__.isArabicLetter = function (P) {
        return (
          typeof P == "string" &&
          /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]+$/.test(
            P,
          )
        );
      }),
      c = (n.__arabicParser__.isArabicEndLetter = function (P) {
        return l(P) && a(P) && t[P.charCodeAt(0)].length <= 2;
      }),
      h = (n.__arabicParser__.isArabicAlfLetter = function (P) {
        return l(P) && s.indexOf(P.charCodeAt(0)) >= 0;
      });
    n.__arabicParser__.arabicLetterHasIsolatedForm = function (P) {
      return l(P) && a(P) && t[P.charCodeAt(0)].length >= 1;
    };
    var g = (n.__arabicParser__.arabicLetterHasFinalForm = function (P) {
      return l(P) && a(P) && t[P.charCodeAt(0)].length >= 2;
    });
    n.__arabicParser__.arabicLetterHasInitialForm = function (P) {
      return l(P) && a(P) && t[P.charCodeAt(0)].length >= 3;
    };
    var m = (n.__arabicParser__.arabicLetterHasMedialForm = function (P) {
        return l(P) && a(P) && t[P.charCodeAt(0)].length == 4;
      }),
      v = (n.__arabicParser__.resolveLigatures = function (P) {
        var M = 0,
          _ = e,
          E = "",
          G = 0;
        for (M = 0; M < P.length; M += 1)
          _[P.charCodeAt(M)] !== void 0
            ? (G++,
              typeof (_ = _[P.charCodeAt(M)]) == "number" &&
                ((E += String.fromCharCode(_)), (_ = e), (G = 0)),
              M === P.length - 1 &&
                ((_ = e), (E += P.charAt(M - (G - 1))), (M -= G - 1), (G = 0)))
            : ((_ = e), (E += P.charAt(M - G)), (M -= G), (G = 0));
        return E;
      });
    n.__arabicParser__.isArabicDiacritic = function (P) {
      return P !== void 0 && i[P.charCodeAt(0)] !== void 0;
    };
    var N = (n.__arabicParser__.getCorrectForm = function (P, M, _) {
        return l(P)
          ? a(P) === !1
            ? -1
            : !g(P) ||
                (!l(M) && !l(_)) ||
                (!l(_) && c(M)) ||
                (c(P) && !l(M)) ||
                (c(P) && h(M)) ||
                (c(P) && c(M))
              ? 0
              : m(P) && l(M) && !c(M) && l(_) && g(_)
                ? 3
                : c(P) || !l(_)
                  ? 1
                  : 2
          : -1;
      }),
      p = function (P) {
        var M = 0,
          _ = 0,
          E = 0,
          G = "",
          nt = "",
          st = "",
          wt = (P = P || "").split("\\s+"),
          tt = [];
        for (M = 0; M < wt.length; M += 1) {
          for (tt.push(""), _ = 0; _ < wt[M].length; _ += 1)
            (G = wt[M][_]),
              (nt = wt[M][_ - 1]),
              (st = wt[M][_ + 1]),
              l(G)
                ? ((E = N(G, nt, st)),
                  (tt[M] +=
                    E !== -1 ? String.fromCharCode(t[G.charCodeAt(0)][E]) : G))
                : (tt[M] += G);
          tt[M] = v(tt[M]);
        }
        return tt.join(" ");
      },
      F =
        (n.__arabicParser__.processArabic =
        n.processArabic =
          function () {
            var P,
              M =
                typeof arguments[0] == "string"
                  ? arguments[0]
                  : arguments[0].text,
              _ = [];
            if (Array.isArray(M)) {
              var E = 0;
              for (_ = [], E = 0; E < M.length; E += 1)
                Array.isArray(M[E])
                  ? _.push([p(M[E][0]), M[E][1], M[E][2]])
                  : _.push([p(M[E])]);
              P = _;
            } else P = p(M);
            return typeof arguments[0] == "string"
              ? P
              : ((arguments[0].text = P), arguments[0]);
          });
    n.events.push(["preProcessText", F]);
  })(zt.API),
  (zt.API.autoPrint = function (n) {
    var t;
    switch ((((n = n || {}).variant = n.variant || "non-conform"), n.variant)) {
      case "javascript":
        this.addJS("print({});");
        break;
      case "non-conform":
      default:
        this.internal.events.subscribe("postPutResources", function () {
          (t = this.internal.newObject()),
            this.internal.out("<<"),
            this.internal.out("/S /Named"),
            this.internal.out("/Type /Action"),
            this.internal.out("/N /Print"),
            this.internal.out(">>"),
            this.internal.out("endobj");
        }),
          this.internal.events.subscribe("putCatalog", function () {
            this.internal.out("/OpenAction " + t + " 0 R");
          });
    }
    return this;
  }),
  (function (n) {
    var t = function () {
      var e = void 0;
      Object.defineProperty(this, "pdf", {
        get: function () {
          return e;
        },
        set: function (c) {
          e = c;
        },
      });
      var i = 150;
      Object.defineProperty(this, "width", {
        get: function () {
          return i;
        },
        set: function (c) {
          (i = isNaN(c) || Number.isInteger(c) === !1 || c < 0 ? 150 : c),
            this.getContext("2d").pageWrapXEnabled &&
              (this.getContext("2d").pageWrapX = i + 1);
        },
      });
      var s = 300;
      Object.defineProperty(this, "height", {
        get: function () {
          return s;
        },
        set: function (c) {
          (s = isNaN(c) || Number.isInteger(c) === !1 || c < 0 ? 300 : c),
            this.getContext("2d").pageWrapYEnabled &&
              (this.getContext("2d").pageWrapY = s + 1);
        },
      });
      var a = [];
      Object.defineProperty(this, "childNodes", {
        get: function () {
          return a;
        },
        set: function (c) {
          a = c;
        },
      });
      var l = {};
      Object.defineProperty(this, "style", {
        get: function () {
          return l;
        },
        set: function (c) {
          l = c;
        },
      }),
        Object.defineProperty(this, "parentNode", {});
    };
    (t.prototype.getContext = function (e, i) {
      var s;
      if ((e = e || "2d") !== "2d") return null;
      for (s in i)
        this.pdf.context2d.hasOwnProperty(s) && (this.pdf.context2d[s] = i[s]);
      return (this.pdf.context2d._canvas = this), this.pdf.context2d;
    }),
      (t.prototype.toDataURL = function () {
        throw new Error("toDataURL is not implemented.");
      }),
      n.events.push([
        "initialized",
        function () {
          (this.canvas = new t()), (this.canvas.pdf = this);
        },
      ]);
  })(zt.API),
  (function (n) {
    var t = { left: 0, top: 0, bottom: 0, right: 0 },
      e = !1,
      i = function () {
        this.internal.__cell__ === void 0 &&
          ((this.internal.__cell__ = {}),
          (this.internal.__cell__.padding = 3),
          (this.internal.__cell__.headerFunction = void 0),
          (this.internal.__cell__.margins = Object.assign({}, t)),
          (this.internal.__cell__.margins.width = this.getPageWidth()),
          s.call(this));
      },
      s = function () {
        (this.internal.__cell__.lastCell = new a()),
          (this.internal.__cell__.pages = 1);
      },
      a = function () {
        var h = arguments[0];
        Object.defineProperty(this, "x", {
          enumerable: !0,
          get: function () {
            return h;
          },
          set: function (P) {
            h = P;
          },
        });
        var g = arguments[1];
        Object.defineProperty(this, "y", {
          enumerable: !0,
          get: function () {
            return g;
          },
          set: function (P) {
            g = P;
          },
        });
        var m = arguments[2];
        Object.defineProperty(this, "width", {
          enumerable: !0,
          get: function () {
            return m;
          },
          set: function (P) {
            m = P;
          },
        });
        var v = arguments[3];
        Object.defineProperty(this, "height", {
          enumerable: !0,
          get: function () {
            return v;
          },
          set: function (P) {
            v = P;
          },
        });
        var N = arguments[4];
        Object.defineProperty(this, "text", {
          enumerable: !0,
          get: function () {
            return N;
          },
          set: function (P) {
            N = P;
          },
        });
        var p = arguments[5];
        Object.defineProperty(this, "lineNumber", {
          enumerable: !0,
          get: function () {
            return p;
          },
          set: function (P) {
            p = P;
          },
        });
        var F = arguments[6];
        return (
          Object.defineProperty(this, "align", {
            enumerable: !0,
            get: function () {
              return F;
            },
            set: function (P) {
              F = P;
            },
          }),
          this
        );
      };
    (a.prototype.clone = function () {
      return new a(
        this.x,
        this.y,
        this.width,
        this.height,
        this.text,
        this.lineNumber,
        this.align,
      );
    }),
      (a.prototype.toArray = function () {
        return [
          this.x,
          this.y,
          this.width,
          this.height,
          this.text,
          this.lineNumber,
          this.align,
        ];
      }),
      (n.setHeaderFunction = function (h) {
        return (
          i.call(this),
          (this.internal.__cell__.headerFunction =
            typeof h == "function" ? h : void 0),
          this
        );
      }),
      (n.getTextDimensions = function (h, g) {
        i.call(this);
        var m = (g = g || {}).fontSize || this.getFontSize(),
          v = g.font || this.getFont(),
          N = g.scaleFactor || this.internal.scaleFactor,
          p = 0,
          F = 0,
          P = 0,
          M = this;
        if (!Array.isArray(h) && typeof h != "string") {
          if (typeof h != "number")
            throw new Error(
              "getTextDimensions expects text-parameter to be of type String or type Number or an Array of Strings.",
            );
          h = String(h);
        }
        var _ = g.maxWidth;
        _ > 0
          ? typeof h == "string"
            ? (h = this.splitTextToSize(h, _))
            : Object.prototype.toString.call(h) === "[object Array]" &&
              (h = h.reduce(function (G, nt) {
                return G.concat(M.splitTextToSize(nt, _));
              }, []))
          : (h = Array.isArray(h) ? h : [h]);
        for (var E = 0; E < h.length; E++)
          p < (P = this.getStringUnitWidth(h[E], { font: v }) * m) && (p = P);
        return (
          p !== 0 && (F = h.length),
          {
            w: (p /= N),
            h: Math.max(
              (F * m * this.getLineHeightFactor() -
                m * (this.getLineHeightFactor() - 1)) /
                N,
              0,
            ),
          }
        );
      }),
      (n.cellAddPage = function () {
        i.call(this), this.addPage();
        var h = this.internal.__cell__.margins || t;
        return (
          (this.internal.__cell__.lastCell = new a(
            h.left,
            h.top,
            void 0,
            void 0,
          )),
          (this.internal.__cell__.pages += 1),
          this
        );
      });
    var l = (n.cell = function () {
      var h;
      (h =
        arguments[0] instanceof a
          ? arguments[0]
          : new a(
              arguments[0],
              arguments[1],
              arguments[2],
              arguments[3],
              arguments[4],
              arguments[5],
            )),
        i.call(this);
      var g = this.internal.__cell__.lastCell,
        m = this.internal.__cell__.padding,
        v = this.internal.__cell__.margins || t,
        N = this.internal.__cell__.tableHeaderRow,
        p = this.internal.__cell__.printHeaders;
      return (
        g.lineNumber !== void 0 &&
          (g.lineNumber === h.lineNumber
            ? ((h.x = (g.x || 0) + (g.width || 0)), (h.y = g.y || 0))
            : g.y + g.height + h.height + v.bottom > this.getPageHeight()
              ? (this.cellAddPage(),
                (h.y = v.top),
                p &&
                  N &&
                  (this.printHeaderRow(h.lineNumber, !0), (h.y += N[0].height)))
              : (h.y = g.y + g.height || h.y)),
        h.text[0] !== void 0 &&
          (this.rect(h.x, h.y, h.width, h.height, e === !0 ? "FD" : void 0),
          h.align === "right"
            ? this.text(h.text, h.x + h.width - m, h.y + m, {
                align: "right",
                baseline: "top",
              })
            : h.align === "center"
              ? this.text(h.text, h.x + h.width / 2, h.y + m, {
                  align: "center",
                  baseline: "top",
                  maxWidth: h.width - m - m,
                })
              : this.text(h.text, h.x + m, h.y + m, {
                  align: "left",
                  baseline: "top",
                  maxWidth: h.width - m - m,
                })),
        (this.internal.__cell__.lastCell = h),
        this
      );
    });
    n.table = function (h, g, m, v, N) {
      if ((i.call(this), !m)) throw new Error("No data for PDF table.");
      var p,
        F,
        P,
        M,
        _ = [],
        E = [],
        G = [],
        nt = {},
        st = {},
        wt = [],
        tt = [],
        z = (N = N || {}).autoSize || !1,
        it = N.printHeaders !== !1,
        dt =
          N.css && N.css["font-size"] !== void 0
            ? 16 * N.css["font-size"]
            : N.fontSize || 12,
        k = N.margins || Object.assign({ width: this.getPageWidth() }, t),
        I = typeof N.padding == "number" ? N.padding : 3,
        W = N.headerBackgroundColor || "#c8c8c8",
        T = N.headerTextColor || "#000";
      if (
        (s.call(this),
        (this.internal.__cell__.printHeaders = it),
        (this.internal.__cell__.margins = k),
        (this.internal.__cell__.table_font_size = dt),
        (this.internal.__cell__.padding = I),
        (this.internal.__cell__.headerBackgroundColor = W),
        (this.internal.__cell__.headerTextColor = T),
        this.setFontSize(dt),
        v == null)
      )
        (E = _ = Object.keys(m[0])),
          (G = _.map(function () {
            return "left";
          }));
      else if (Array.isArray(v) && de(v[0]) === "object")
        for (
          _ = v.map(function (pt) {
            return pt.name;
          }),
            E = v.map(function (pt) {
              return pt.prompt || pt.name || "";
            }),
            G = v.map(function (pt) {
              return pt.align || "left";
            }),
            p = 0;
          p < v.length;
          p += 1
        )
          st[v[p].name] = v[p].width * (19.049976 / 25.4);
      else
        Array.isArray(v) &&
          typeof v[0] == "string" &&
          ((E = _ = v),
          (G = _.map(function () {
            return "left";
          })));
      if (z || (Array.isArray(v) && typeof v[0] == "string"))
        for (p = 0; p < _.length; p += 1) {
          for (
            nt[(M = _[p])] = m.map(function (pt) {
              return pt[M];
            }),
              this.setFont(void 0, "bold"),
              wt.push(
                this.getTextDimensions(E[p], {
                  fontSize: this.internal.__cell__.table_font_size,
                  scaleFactor: this.internal.scaleFactor,
                }).w,
              ),
              F = nt[M],
              this.setFont(void 0, "normal"),
              P = 0;
            P < F.length;
            P += 1
          )
            wt.push(
              this.getTextDimensions(F[P], {
                fontSize: this.internal.__cell__.table_font_size,
                scaleFactor: this.internal.scaleFactor,
              }).w,
            );
          (st[M] = Math.max.apply(null, wt) + I + I), (wt = []);
        }
      if (it) {
        var ut = {};
        for (p = 0; p < _.length; p += 1)
          (ut[_[p]] = {}), (ut[_[p]].text = E[p]), (ut[_[p]].align = G[p]);
        var at = c.call(this, ut, st);
        (tt = _.map(function (pt) {
          return new a(h, g, st[pt], at, ut[pt].text, void 0, ut[pt].align);
        })),
          this.setTableHeaderRow(tt),
          this.printHeaderRow(1, !1);
      }
      var ct = v.reduce(function (pt, Ct) {
        return (pt[Ct.name] = Ct.align), pt;
      }, {});
      for (p = 0; p < m.length; p += 1) {
        "rowStart" in N &&
          N.rowStart instanceof Function &&
          N.rowStart({ row: p, data: m[p] }, this);
        var Z = c.call(this, m[p], st);
        for (P = 0; P < _.length; P += 1) {
          var ft = m[p][_[P]];
          "cellStart" in N &&
            N.cellStart instanceof Function &&
            N.cellStart({ row: p, col: P, data: ft }, this),
            l.call(this, new a(h, g, st[_[P]], Z, ft, p + 2, ct[_[P]]));
        }
      }
      return (
        (this.internal.__cell__.table_x = h),
        (this.internal.__cell__.table_y = g),
        this
      );
    };
    var c = function (h, g) {
      var m = this.internal.__cell__.padding,
        v = this.internal.__cell__.table_font_size,
        N = this.internal.scaleFactor;
      return Object.keys(h)
        .map(function (p) {
          var F = h[p];
          return this.splitTextToSize(
            F.hasOwnProperty("text") ? F.text : F,
            g[p] - m - m,
          );
        }, this)
        .map(function (p) {
          return (this.getLineHeightFactor() * p.length * v) / N + m + m;
        }, this)
        .reduce(function (p, F) {
          return Math.max(p, F);
        }, 0);
    };
    (n.setTableHeaderRow = function (h) {
      i.call(this), (this.internal.__cell__.tableHeaderRow = h);
    }),
      (n.printHeaderRow = function (h, g) {
        if ((i.call(this), !this.internal.__cell__.tableHeaderRow))
          throw new Error("Property tableHeaderRow does not exist.");
        var m;
        if (
          ((e = !0), typeof this.internal.__cell__.headerFunction == "function")
        ) {
          var v = this.internal.__cell__.headerFunction(
            this,
            this.internal.__cell__.pages,
          );
          this.internal.__cell__.lastCell = new a(
            v[0],
            v[1],
            v[2],
            v[3],
            void 0,
            -1,
          );
        }
        this.setFont(void 0, "bold");
        for (
          var N = [], p = 0;
          p < this.internal.__cell__.tableHeaderRow.length;
          p += 1
        ) {
          (m = this.internal.__cell__.tableHeaderRow[p].clone()),
            g && ((m.y = this.internal.__cell__.margins.top || 0), N.push(m)),
            (m.lineNumber = h);
          var F = this.getTextColor();
          this.setTextColor(this.internal.__cell__.headerTextColor),
            this.setFillColor(this.internal.__cell__.headerBackgroundColor),
            l.call(this, m),
            this.setTextColor(F);
        }
        N.length > 0 && this.setTableHeaderRow(N),
          this.setFont(void 0, "normal"),
          (e = !1);
      });
  })(zt.API);
var Ul = {
    italic: ["italic", "oblique", "normal"],
    oblique: ["oblique", "italic", "normal"],
    normal: ["normal", "oblique", "italic"],
  },
  Hl = [
    "ultra-condensed",
    "extra-condensed",
    "condensed",
    "semi-condensed",
    "normal",
    "semi-expanded",
    "expanded",
    "extra-expanded",
    "ultra-expanded",
  ],
  ou = zl(Hl),
  Wl = [100, 200, 300, 400, 500, 600, 700, 800, 900],
  Kf = zl(Wl);
function su(n) {
  var t = n.family.replace(/"|'/g, "").toLowerCase(),
    e = (function (a) {
      return Ul[(a = a || "normal")] ? a : "normal";
    })(n.style),
    i = (function (a) {
      if (!a) return 400;
      if (typeof a == "number")
        return a >= 100 && a <= 900 && a % 100 == 0 ? a : 400;
      if (/^\d00$/.test(a)) return parseInt(a);
      switch (a) {
        case "bold":
          return 700;
        case "normal":
        default:
          return 400;
      }
    })(n.weight),
    s = (function (a) {
      return typeof ou[(a = a || "normal")] == "number" ? a : "normal";
    })(n.stretch);
  return {
    family: t,
    style: e,
    weight: i,
    stretch: s,
    src: n.src || [],
    ref: n.ref || { name: t, style: [s, e, i].join(" ") },
  };
}
function rl(n, t, e, i) {
  var s;
  for (s = e; s >= 0 && s < t.length; s += i) if (n[t[s]]) return n[t[s]];
  for (s = e; s >= 0 && s < t.length; s -= i) if (n[t[s]]) return n[t[s]];
}
var Zf = {
    "sans-serif": "helvetica",
    fixed: "courier",
    monospace: "courier",
    terminal: "courier",
    cursive: "times",
    fantasy: "times",
    serif: "times",
  },
  il = {
    caption: "times",
    icon: "times",
    menu: "times",
    "message-box": "times",
    "small-caption": "times",
    "status-bar": "times",
  };
function al(n) {
  return [n.stretch, n.style, n.weight, n.family].join(" ");
}
function Qf(n, t, e) {
  for (
    var i = (e = e || {}).defaultFontFamily || "times",
      s = Object.assign({}, Zf, e.genericFontFamilies || {}),
      a = null,
      l = null,
      c = 0;
    c < t.length;
    ++c
  )
    if (
      (s[(a = su(t[c])).family] && (a.family = s[a.family]),
      n.hasOwnProperty(a.family))
    ) {
      l = n[a.family];
      break;
    }
  if (!(l = l || n[i]))
    throw new Error(
      "Could not find a font-family for the rule '" +
        al(a) +
        "' and default family '" +
        i +
        "'.",
    );
  if (
    ((l = (function (h, g) {
      if (g[h]) return g[h];
      var m = ou[h],
        v = m <= ou.normal ? -1 : 1,
        N = rl(g, Hl, m, v);
      if (!N)
        throw new Error(
          "Could not find a matching font-stretch value for " + h,
        );
      return N;
    })(a.stretch, l)),
    (l = (function (h, g) {
      if (g[h]) return g[h];
      for (var m = Ul[h], v = 0; v < m.length; ++v) if (g[m[v]]) return g[m[v]];
      throw new Error("Could not find a matching font-style for " + h);
    })(a.style, l)),
    !(l = (function (h, g) {
      if (g[h]) return g[h];
      if (h === 400 && g[500]) return g[500];
      if (h === 500 && g[400]) return g[400];
      var m = Kf[h],
        v = rl(g, Wl, m, h < 400 ? -1 : 1);
      if (!v)
        throw new Error("Could not find a matching font-weight for value " + h);
      return v;
    })(a.weight, l)))
  )
    throw new Error("Failed to resolve a font for the rule '" + al(a) + "'.");
  return l;
}
function ol(n) {
  return n.trimLeft();
}
function th(n, t) {
  for (var e = 0; e < n.length; ) {
    if (n.charAt(e) === t) return [n.substring(0, e), n.substring(e + 1)];
    e += 1;
  }
  return null;
}
function eh(n) {
  var t = n.match(/^(-[a-z_]|[a-z_])[a-z0-9_-]*/i);
  return t === null ? null : [t[0], n.substring(t[0].length)];
}
var Po,
  sl,
  ul,
  Gs = ["times"];
(function (n) {
  var t,
    e,
    i,
    s,
    a,
    l,
    c,
    h,
    g,
    m = function (A) {
      return (
        (A = A || {}),
        (this.isStrokeTransparent = A.isStrokeTransparent || !1),
        (this.strokeOpacity = A.strokeOpacity || 1),
        (this.strokeStyle = A.strokeStyle || "#000000"),
        (this.fillStyle = A.fillStyle || "#000000"),
        (this.isFillTransparent = A.isFillTransparent || !1),
        (this.fillOpacity = A.fillOpacity || 1),
        (this.font = A.font || "10px sans-serif"),
        (this.textBaseline = A.textBaseline || "alphabetic"),
        (this.textAlign = A.textAlign || "left"),
        (this.lineWidth = A.lineWidth || 1),
        (this.lineJoin = A.lineJoin || "miter"),
        (this.lineCap = A.lineCap || "butt"),
        (this.path = A.path || []),
        (this.transform =
          A.transform !== void 0 ? A.transform.clone() : new h()),
        (this.globalCompositeOperation =
          A.globalCompositeOperation || "normal"),
        (this.globalAlpha = A.globalAlpha || 1),
        (this.clip_path = A.clip_path || []),
        (this.currentPoint = A.currentPoint || new l()),
        (this.miterLimit = A.miterLimit || 10),
        (this.lastPoint = A.lastPoint || new l()),
        (this.lineDashOffset = A.lineDashOffset || 0),
        (this.lineDash = A.lineDash || []),
        (this.margin = A.margin || [0, 0, 0, 0]),
        (this.prevPageLastElemOffset = A.prevPageLastElemOffset || 0),
        (this.ignoreClearRect =
          typeof A.ignoreClearRect != "boolean" || A.ignoreClearRect),
        this
      );
    };
  n.events.push([
    "initialized",
    function () {
      (this.context2d = new v(this)),
        (t = this.internal.f2),
        (e = this.internal.getCoordinateString),
        (i = this.internal.getVerticalCoordinateString),
        (s = this.internal.getHorizontalCoordinate),
        (a = this.internal.getVerticalCoordinate),
        (l = this.internal.Point),
        (c = this.internal.Rectangle),
        (h = this.internal.Matrix),
        (g = new m());
    },
  ]);
  var v = function (A) {
    Object.defineProperty(this, "canvas", {
      get: function () {
        return { parentNode: !1, style: !1 };
      },
    });
    var j = A;
    Object.defineProperty(this, "pdf", {
      get: function () {
        return j;
      },
    });
    var B = !1;
    Object.defineProperty(this, "pageWrapXEnabled", {
      get: function () {
        return B;
      },
      set: function (ht) {
        B = !!ht;
      },
    });
    var R = !1;
    Object.defineProperty(this, "pageWrapYEnabled", {
      get: function () {
        return R;
      },
      set: function (ht) {
        R = !!ht;
      },
    });
    var Y = 0;
    Object.defineProperty(this, "posX", {
      get: function () {
        return Y;
      },
      set: function (ht) {
        isNaN(ht) || (Y = ht);
      },
    });
    var Q = 0;
    Object.defineProperty(this, "posY", {
      get: function () {
        return Q;
      },
      set: function (ht) {
        isNaN(ht) || (Q = ht);
      },
    }),
      Object.defineProperty(this, "margin", {
        get: function () {
          return g.margin;
        },
        set: function (ht) {
          var q;
          typeof ht == "number"
            ? (q = [ht, ht, ht, ht])
            : (((q = new Array(4))[0] = ht[0]),
              (q[1] = ht.length >= 2 ? ht[1] : q[0]),
              (q[2] = ht.length >= 3 ? ht[2] : q[0]),
              (q[3] = ht.length >= 4 ? ht[3] : q[1])),
            (g.margin = q);
        },
      });
    var et = !1;
    Object.defineProperty(this, "autoPaging", {
      get: function () {
        return et;
      },
      set: function (ht) {
        et = ht;
      },
    });
    var rt = 0;
    Object.defineProperty(this, "lastBreak", {
      get: function () {
        return rt;
      },
      set: function (ht) {
        rt = ht;
      },
    });
    var Nt = [];
    Object.defineProperty(this, "pageBreaks", {
      get: function () {
        return Nt;
      },
      set: function (ht) {
        Nt = ht;
      },
    }),
      Object.defineProperty(this, "ctx", {
        get: function () {
          return g;
        },
        set: function (ht) {
          ht instanceof m && (g = ht);
        },
      }),
      Object.defineProperty(this, "path", {
        get: function () {
          return g.path;
        },
        set: function (ht) {
          g.path = ht;
        },
      });
    var At = [];
    Object.defineProperty(this, "ctxStack", {
      get: function () {
        return At;
      },
      set: function (ht) {
        At = ht;
      },
    }),
      Object.defineProperty(this, "fillStyle", {
        get: function () {
          return this.ctx.fillStyle;
        },
        set: function (ht) {
          var q;
          (q = N(ht)),
            (this.ctx.fillStyle = q.style),
            (this.ctx.isFillTransparent = q.a === 0),
            (this.ctx.fillOpacity = q.a),
            this.pdf.setFillColor(q.r, q.g, q.b, { a: q.a }),
            this.pdf.setTextColor(q.r, q.g, q.b, { a: q.a });
        },
      }),
      Object.defineProperty(this, "strokeStyle", {
        get: function () {
          return this.ctx.strokeStyle;
        },
        set: function (ht) {
          var q = N(ht);
          (this.ctx.strokeStyle = q.style),
            (this.ctx.isStrokeTransparent = q.a === 0),
            (this.ctx.strokeOpacity = q.a),
            q.a === 0
              ? this.pdf.setDrawColor(255, 255, 255)
              : (q.a, this.pdf.setDrawColor(q.r, q.g, q.b));
        },
      }),
      Object.defineProperty(this, "lineCap", {
        get: function () {
          return this.ctx.lineCap;
        },
        set: function (ht) {
          ["butt", "round", "square"].indexOf(ht) !== -1 &&
            ((this.ctx.lineCap = ht), this.pdf.setLineCap(ht));
        },
      }),
      Object.defineProperty(this, "lineWidth", {
        get: function () {
          return this.ctx.lineWidth;
        },
        set: function (ht) {
          isNaN(ht) || ((this.ctx.lineWidth = ht), this.pdf.setLineWidth(ht));
        },
      }),
      Object.defineProperty(this, "lineJoin", {
        get: function () {
          return this.ctx.lineJoin;
        },
        set: function (ht) {
          ["bevel", "round", "miter"].indexOf(ht) !== -1 &&
            ((this.ctx.lineJoin = ht), this.pdf.setLineJoin(ht));
        },
      }),
      Object.defineProperty(this, "miterLimit", {
        get: function () {
          return this.ctx.miterLimit;
        },
        set: function (ht) {
          isNaN(ht) || ((this.ctx.miterLimit = ht), this.pdf.setMiterLimit(ht));
        },
      }),
      Object.defineProperty(this, "textBaseline", {
        get: function () {
          return this.ctx.textBaseline;
        },
        set: function (ht) {
          this.ctx.textBaseline = ht;
        },
      }),
      Object.defineProperty(this, "textAlign", {
        get: function () {
          return this.ctx.textAlign;
        },
        set: function (ht) {
          ["right", "end", "center", "left", "start"].indexOf(ht) !== -1 &&
            (this.ctx.textAlign = ht);
        },
      });
    var It = null;
    function _t(ht, q) {
      if (It === null) {
        var Xt = (function (Bt) {
          var xt = [];
          return (
            Object.keys(Bt).forEach(function (Lt) {
              Bt[Lt].forEach(function (Ft) {
                var kt = null;
                switch (Ft) {
                  case "bold":
                    kt = { family: Lt, weight: "bold" };
                    break;
                  case "italic":
                    kt = { family: Lt, style: "italic" };
                    break;
                  case "bolditalic":
                    kt = { family: Lt, weight: "bold", style: "italic" };
                    break;
                  case "":
                  case "normal":
                    kt = { family: Lt };
                }
                kt !== null &&
                  ((kt.ref = { name: Lt, style: Ft }), xt.push(kt));
              });
            }),
            xt
          );
        })(ht.getFontList());
        It = (function (Bt) {
          for (var xt = {}, Lt = 0; Lt < Bt.length; ++Lt) {
            var Ft = su(Bt[Lt]),
              kt = Ft.family,
              qt = Ft.stretch,
              Gt = Ft.style,
              Qt = Ft.weight;
            (xt[kt] = xt[kt] || {}),
              (xt[kt][qt] = xt[kt][qt] || {}),
              (xt[kt][qt][Gt] = xt[kt][qt][Gt] || {}),
              (xt[kt][qt][Gt][Qt] = Ft);
          }
          return xt;
        })(Xt.concat(q));
      }
      return It;
    }
    var Ut = null;
    Object.defineProperty(this, "fontFaces", {
      get: function () {
        return Ut;
      },
      set: function (ht) {
        (It = null), (Ut = ht);
      },
    }),
      Object.defineProperty(this, "font", {
        get: function () {
          return this.ctx.font;
        },
        set: function (ht) {
          var q;
          if (
            ((this.ctx.font = ht),
            (q =
              /^\s*(?=(?:(?:[-a-z]+\s*){0,2}(italic|oblique))?)(?=(?:(?:[-a-z]+\s*){0,2}(small-caps))?)(?=(?:(?:[-a-z]+\s*){0,2}(bold(?:er)?|lighter|[1-9]00))?)(?:(?:normal|\1|\2|\3)\s*){0,3}((?:xx?-)?(?:small|large)|medium|smaller|larger|[.\d]+(?:\%|in|[cem]m|ex|p[ctx]))(?:\s*\/\s*(normal|[.\d]+(?:\%|in|[cem]m|ex|p[ctx])))?\s*([-_,\"\'\sa-z]+?)\s*$/i.exec(
                ht,
              )) !== null)
          ) {
            var Xt = q[1],
              Bt = (q[2], q[3]),
              xt = q[4],
              Lt = (q[5], q[6]),
              Ft = /^([.\d]+)((?:%|in|[cem]m|ex|p[ctx]))$/i.exec(xt)[2];
            (xt = Math.floor(
              Ft === "px"
                ? parseFloat(xt) * this.pdf.internal.scaleFactor
                : Ft === "em"
                  ? parseFloat(xt) * this.pdf.getFontSize()
                  : parseFloat(xt) * this.pdf.internal.scaleFactor,
            )),
              this.pdf.setFontSize(xt);
            var kt = (function (Wt) {
              var ne,
                jt,
                Xe = [],
                se = Wt.trim();
              if (se === "") return Gs;
              if (se in il) return [il[se]];
              for (; se !== ""; ) {
                switch (((jt = null), (ne = (se = ol(se)).charAt(0)))) {
                  case '"':
                  case "'":
                    jt = th(se.substring(1), ne);
                    break;
                  default:
                    jt = eh(se);
                }
                if (
                  jt === null ||
                  (Xe.push(jt[0]),
                  (se = ol(jt[1])) !== "" && se.charAt(0) !== ",")
                )
                  return Gs;
                se = se.replace(/^,/, "");
              }
              return Xe;
            })(Lt);
            if (this.fontFaces) {
              var qt = Qf(
                _t(this.pdf, this.fontFaces),
                kt.map(function (Wt) {
                  return {
                    family: Wt,
                    stretch: "normal",
                    weight: Bt,
                    style: Xt,
                  };
                }),
              );
              this.pdf.setFont(qt.ref.name, qt.ref.style);
            } else {
              var Gt = "";
              (Bt === "bold" || parseInt(Bt, 10) >= 700 || Xt === "bold") &&
                (Gt = "bold"),
                Xt === "italic" && (Gt += "italic"),
                Gt.length === 0 && (Gt = "normal");
              for (
                var Qt = "",
                  ee = {
                    arial: "Helvetica",
                    Arial: "Helvetica",
                    verdana: "Helvetica",
                    Verdana: "Helvetica",
                    helvetica: "Helvetica",
                    Helvetica: "Helvetica",
                    "sans-serif": "Helvetica",
                    fixed: "Courier",
                    monospace: "Courier",
                    terminal: "Courier",
                    cursive: "Times",
                    fantasy: "Times",
                    serif: "Times",
                  },
                  ae = 0;
                ae < kt.length;
                ae++
              ) {
                if (
                  this.pdf.internal.getFont(kt[ae], Gt, {
                    noFallback: !0,
                    disableWarning: !0,
                  }) !== void 0
                ) {
                  Qt = kt[ae];
                  break;
                }
                if (
                  Gt === "bolditalic" &&
                  this.pdf.internal.getFont(kt[ae], "bold", {
                    noFallback: !0,
                    disableWarning: !0,
                  }) !== void 0
                )
                  (Qt = kt[ae]), (Gt = "bold");
                else if (
                  this.pdf.internal.getFont(kt[ae], "normal", {
                    noFallback: !0,
                    disableWarning: !0,
                  }) !== void 0
                ) {
                  (Qt = kt[ae]), (Gt = "normal");
                  break;
                }
              }
              if (Qt === "") {
                for (var pe = 0; pe < kt.length; pe++)
                  if (ee[kt[pe]]) {
                    Qt = ee[kt[pe]];
                    break;
                  }
              }
              (Qt = Qt === "" ? "Times" : Qt), this.pdf.setFont(Qt, Gt);
            }
          }
        },
      }),
      Object.defineProperty(this, "globalCompositeOperation", {
        get: function () {
          return this.ctx.globalCompositeOperation;
        },
        set: function (ht) {
          this.ctx.globalCompositeOperation = ht;
        },
      }),
      Object.defineProperty(this, "globalAlpha", {
        get: function () {
          return this.ctx.globalAlpha;
        },
        set: function (ht) {
          this.ctx.globalAlpha = ht;
        },
      }),
      Object.defineProperty(this, "lineDashOffset", {
        get: function () {
          return this.ctx.lineDashOffset;
        },
        set: function (ht) {
          (this.ctx.lineDashOffset = ht), Ct.call(this);
        },
      }),
      Object.defineProperty(this, "lineDash", {
        get: function () {
          return this.ctx.lineDash;
        },
        set: function (ht) {
          (this.ctx.lineDash = ht), Ct.call(this);
        },
      }),
      Object.defineProperty(this, "ignoreClearRect", {
        get: function () {
          return this.ctx.ignoreClearRect;
        },
        set: function (ht) {
          this.ctx.ignoreClearRect = !!ht;
        },
      });
  };
  (v.prototype.setLineDash = function (A) {
    this.lineDash = A;
  }),
    (v.prototype.getLineDash = function () {
      return this.lineDash.length % 2
        ? this.lineDash.concat(this.lineDash)
        : this.lineDash.slice();
    }),
    (v.prototype.fill = function () {
      nt.call(this, "fill", !1);
    }),
    (v.prototype.stroke = function () {
      nt.call(this, "stroke", !1);
    }),
    (v.prototype.beginPath = function () {
      this.path = [{ type: "begin" }];
    }),
    (v.prototype.moveTo = function (A, j) {
      if (isNaN(A) || isNaN(j))
        throw (
          (be.error("jsPDF.context2d.moveTo: Invalid arguments", arguments),
          new Error("Invalid arguments passed to jsPDF.context2d.moveTo"))
        );
      var B = this.ctx.transform.applyToPoint(new l(A, j));
      this.path.push({ type: "mt", x: B.x, y: B.y }),
        (this.ctx.lastPoint = new l(A, j));
    }),
    (v.prototype.closePath = function () {
      var A = new l(0, 0),
        j = 0;
      for (j = this.path.length - 1; j !== -1; j--)
        if (
          this.path[j].type === "begin" &&
          de(this.path[j + 1]) === "object" &&
          typeof this.path[j + 1].x == "number"
        ) {
          A = new l(this.path[j + 1].x, this.path[j + 1].y);
          break;
        }
      this.path.push({ type: "close" }), (this.ctx.lastPoint = new l(A.x, A.y));
    }),
    (v.prototype.lineTo = function (A, j) {
      if (isNaN(A) || isNaN(j))
        throw (
          (be.error("jsPDF.context2d.lineTo: Invalid arguments", arguments),
          new Error("Invalid arguments passed to jsPDF.context2d.lineTo"))
        );
      var B = this.ctx.transform.applyToPoint(new l(A, j));
      this.path.push({ type: "lt", x: B.x, y: B.y }),
        (this.ctx.lastPoint = new l(B.x, B.y));
    }),
    (v.prototype.clip = function () {
      (this.ctx.clip_path = JSON.parse(JSON.stringify(this.path))),
        nt.call(this, null, !0);
    }),
    (v.prototype.quadraticCurveTo = function (A, j, B, R) {
      if (isNaN(B) || isNaN(R) || isNaN(A) || isNaN(j))
        throw (
          (be.error(
            "jsPDF.context2d.quadraticCurveTo: Invalid arguments",
            arguments,
          ),
          new Error(
            "Invalid arguments passed to jsPDF.context2d.quadraticCurveTo",
          ))
        );
      var Y = this.ctx.transform.applyToPoint(new l(B, R)),
        Q = this.ctx.transform.applyToPoint(new l(A, j));
      this.path.push({ type: "qct", x1: Q.x, y1: Q.y, x: Y.x, y: Y.y }),
        (this.ctx.lastPoint = new l(Y.x, Y.y));
    }),
    (v.prototype.bezierCurveTo = function (A, j, B, R, Y, Q) {
      if (isNaN(Y) || isNaN(Q) || isNaN(A) || isNaN(j) || isNaN(B) || isNaN(R))
        throw (
          (be.error(
            "jsPDF.context2d.bezierCurveTo: Invalid arguments",
            arguments,
          ),
          new Error(
            "Invalid arguments passed to jsPDF.context2d.bezierCurveTo",
          ))
        );
      var et = this.ctx.transform.applyToPoint(new l(Y, Q)),
        rt = this.ctx.transform.applyToPoint(new l(A, j)),
        Nt = this.ctx.transform.applyToPoint(new l(B, R));
      this.path.push({
        type: "bct",
        x1: rt.x,
        y1: rt.y,
        x2: Nt.x,
        y2: Nt.y,
        x: et.x,
        y: et.y,
      }),
        (this.ctx.lastPoint = new l(et.x, et.y));
    }),
    (v.prototype.arc = function (A, j, B, R, Y, Q) {
      if (isNaN(A) || isNaN(j) || isNaN(B) || isNaN(R) || isNaN(Y))
        throw (
          (be.error("jsPDF.context2d.arc: Invalid arguments", arguments),
          new Error("Invalid arguments passed to jsPDF.context2d.arc"))
        );
      if (((Q = !!Q), !this.ctx.transform.isIdentity)) {
        var et = this.ctx.transform.applyToPoint(new l(A, j));
        (A = et.x), (j = et.y);
        var rt = this.ctx.transform.applyToPoint(new l(0, B)),
          Nt = this.ctx.transform.applyToPoint(new l(0, 0));
        B = Math.sqrt(Math.pow(rt.x - Nt.x, 2) + Math.pow(rt.y - Nt.y, 2));
      }
      Math.abs(Y - R) >= 2 * Math.PI && ((R = 0), (Y = 2 * Math.PI)),
        this.path.push({
          type: "arc",
          x: A,
          y: j,
          radius: B,
          startAngle: R,
          endAngle: Y,
          counterclockwise: Q,
        });
    }),
    (v.prototype.arcTo = function (A, j, B, R, Y) {
      throw new Error("arcTo not implemented.");
    }),
    (v.prototype.rect = function (A, j, B, R) {
      if (isNaN(A) || isNaN(j) || isNaN(B) || isNaN(R))
        throw (
          (be.error("jsPDF.context2d.rect: Invalid arguments", arguments),
          new Error("Invalid arguments passed to jsPDF.context2d.rect"))
        );
      this.moveTo(A, j),
        this.lineTo(A + B, j),
        this.lineTo(A + B, j + R),
        this.lineTo(A, j + R),
        this.lineTo(A, j),
        this.lineTo(A + B, j),
        this.lineTo(A, j);
    }),
    (v.prototype.fillRect = function (A, j, B, R) {
      if (isNaN(A) || isNaN(j) || isNaN(B) || isNaN(R))
        throw (
          (be.error("jsPDF.context2d.fillRect: Invalid arguments", arguments),
          new Error("Invalid arguments passed to jsPDF.context2d.fillRect"))
        );
      if (!p.call(this)) {
        var Y = {};
        this.lineCap !== "butt" &&
          ((Y.lineCap = this.lineCap), (this.lineCap = "butt")),
          this.lineJoin !== "miter" &&
            ((Y.lineJoin = this.lineJoin), (this.lineJoin = "miter")),
          this.beginPath(),
          this.rect(A, j, B, R),
          this.fill(),
          Y.hasOwnProperty("lineCap") && (this.lineCap = Y.lineCap),
          Y.hasOwnProperty("lineJoin") && (this.lineJoin = Y.lineJoin);
      }
    }),
    (v.prototype.strokeRect = function (A, j, B, R) {
      if (isNaN(A) || isNaN(j) || isNaN(B) || isNaN(R))
        throw (
          (be.error("jsPDF.context2d.strokeRect: Invalid arguments", arguments),
          new Error("Invalid arguments passed to jsPDF.context2d.strokeRect"))
        );
      F.call(this) || (this.beginPath(), this.rect(A, j, B, R), this.stroke());
    }),
    (v.prototype.clearRect = function (A, j, B, R) {
      if (isNaN(A) || isNaN(j) || isNaN(B) || isNaN(R))
        throw (
          (be.error("jsPDF.context2d.clearRect: Invalid arguments", arguments),
          new Error("Invalid arguments passed to jsPDF.context2d.clearRect"))
        );
      this.ignoreClearRect ||
        ((this.fillStyle = "#ffffff"), this.fillRect(A, j, B, R));
    }),
    (v.prototype.save = function (A) {
      A = typeof A != "boolean" || A;
      for (
        var j = this.pdf.internal.getCurrentPageInfo().pageNumber, B = 0;
        B < this.pdf.internal.getNumberOfPages();
        B++
      )
        this.pdf.setPage(B + 1), this.pdf.internal.out("q");
      if ((this.pdf.setPage(j), A)) {
        this.ctx.fontSize = this.pdf.internal.getFontSize();
        var R = new m(this.ctx);
        this.ctxStack.push(this.ctx), (this.ctx = R);
      }
    }),
    (v.prototype.restore = function (A) {
      A = typeof A != "boolean" || A;
      for (
        var j = this.pdf.internal.getCurrentPageInfo().pageNumber, B = 0;
        B < this.pdf.internal.getNumberOfPages();
        B++
      )
        this.pdf.setPage(B + 1), this.pdf.internal.out("Q");
      this.pdf.setPage(j),
        A &&
          this.ctxStack.length !== 0 &&
          ((this.ctx = this.ctxStack.pop()),
          (this.fillStyle = this.ctx.fillStyle),
          (this.strokeStyle = this.ctx.strokeStyle),
          (this.font = this.ctx.font),
          (this.lineCap = this.ctx.lineCap),
          (this.lineWidth = this.ctx.lineWidth),
          (this.lineJoin = this.ctx.lineJoin),
          (this.lineDash = this.ctx.lineDash),
          (this.lineDashOffset = this.ctx.lineDashOffset));
    }),
    (v.prototype.toDataURL = function () {
      throw new Error("toDataUrl not implemented.");
    });
  var N = function (A) {
      var j, B, R, Y;
      if ((A.isCanvasGradient === !0 && (A = A.getColor()), !A))
        return { r: 0, g: 0, b: 0, a: 0, style: A };
      if (
        /transparent|rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*0+\s*\)/.test(
          A,
        )
      )
        (j = 0), (B = 0), (R = 0), (Y = 0);
      else {
        var Q = /rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/.exec(A);
        if (Q !== null)
          (j = parseInt(Q[1])),
            (B = parseInt(Q[2])),
            (R = parseInt(Q[3])),
            (Y = 1);
        else if (
          (Q =
            /rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/.exec(
              A,
            )) !== null
        )
          (j = parseInt(Q[1])),
            (B = parseInt(Q[2])),
            (R = parseInt(Q[3])),
            (Y = parseFloat(Q[4]));
        else {
          if (((Y = 1), typeof A == "string" && A.charAt(0) !== "#")) {
            var et = new Ml(A);
            A = et.ok ? et.toHex() : "#000000";
          }
          A.length === 4
            ? ((j = A.substring(1, 2)),
              (j += j),
              (B = A.substring(2, 3)),
              (B += B),
              (R = A.substring(3, 4)),
              (R += R))
            : ((j = A.substring(1, 3)),
              (B = A.substring(3, 5)),
              (R = A.substring(5, 7))),
            (j = parseInt(j, 16)),
            (B = parseInt(B, 16)),
            (R = parseInt(R, 16));
        }
      }
      return { r: j, g: B, b: R, a: Y, style: A };
    },
    p = function () {
      return this.ctx.isFillTransparent || this.globalAlpha == 0;
    },
    F = function () {
      return !!(this.ctx.isStrokeTransparent || this.globalAlpha == 0);
    };
  (v.prototype.fillText = function (A, j, B, R) {
    if (isNaN(j) || isNaN(B) || typeof A != "string")
      throw (
        (be.error("jsPDF.context2d.fillText: Invalid arguments", arguments),
        new Error("Invalid arguments passed to jsPDF.context2d.fillText"))
      );
    if (((R = isNaN(R) ? void 0 : R), !p.call(this))) {
      var Y = Z(this.ctx.transform.rotation),
        Q = this.ctx.transform.scaleX;
      I.call(this, {
        text: A,
        x: j,
        y: B,
        scale: Q,
        angle: Y,
        align: this.textAlign,
        maxWidth: R,
      });
    }
  }),
    (v.prototype.strokeText = function (A, j, B, R) {
      if (isNaN(j) || isNaN(B) || typeof A != "string")
        throw (
          (be.error("jsPDF.context2d.strokeText: Invalid arguments", arguments),
          new Error("Invalid arguments passed to jsPDF.context2d.strokeText"))
        );
      if (!F.call(this)) {
        R = isNaN(R) ? void 0 : R;
        var Y = Z(this.ctx.transform.rotation),
          Q = this.ctx.transform.scaleX;
        I.call(this, {
          text: A,
          x: j,
          y: B,
          scale: Q,
          renderingMode: "stroke",
          angle: Y,
          align: this.textAlign,
          maxWidth: R,
        });
      }
    }),
    (v.prototype.measureText = function (A) {
      if (typeof A != "string")
        throw (
          (be.error(
            "jsPDF.context2d.measureText: Invalid arguments",
            arguments,
          ),
          new Error("Invalid arguments passed to jsPDF.context2d.measureText"))
        );
      var j = this.pdf,
        B = this.pdf.internal.scaleFactor,
        R = j.internal.getFontSize(),
        Y = (j.getStringUnitWidth(A) * R) / j.internal.scaleFactor,
        Q = function (et) {
          var rt = (et = et || {}).width || 0;
          return (
            Object.defineProperty(this, "width", {
              get: function () {
                return rt;
              },
            }),
            this
          );
        };
      return new Q({ width: (Y *= Math.round(((96 * B) / 72) * 1e4) / 1e4) });
    }),
    (v.prototype.scale = function (A, j) {
      if (isNaN(A) || isNaN(j))
        throw (
          (be.error("jsPDF.context2d.scale: Invalid arguments", arguments),
          new Error("Invalid arguments passed to jsPDF.context2d.scale"))
        );
      var B = new h(A, 0, 0, j, 0, 0);
      this.ctx.transform = this.ctx.transform.multiply(B);
    }),
    (v.prototype.rotate = function (A) {
      if (isNaN(A))
        throw (
          (be.error("jsPDF.context2d.rotate: Invalid arguments", arguments),
          new Error("Invalid arguments passed to jsPDF.context2d.rotate"))
        );
      var j = new h(Math.cos(A), Math.sin(A), -Math.sin(A), Math.cos(A), 0, 0);
      this.ctx.transform = this.ctx.transform.multiply(j);
    }),
    (v.prototype.translate = function (A, j) {
      if (isNaN(A) || isNaN(j))
        throw (
          (be.error("jsPDF.context2d.translate: Invalid arguments", arguments),
          new Error("Invalid arguments passed to jsPDF.context2d.translate"))
        );
      var B = new h(1, 0, 0, 1, A, j);
      this.ctx.transform = this.ctx.transform.multiply(B);
    }),
    (v.prototype.transform = function (A, j, B, R, Y, Q) {
      if (isNaN(A) || isNaN(j) || isNaN(B) || isNaN(R) || isNaN(Y) || isNaN(Q))
        throw (
          (be.error("jsPDF.context2d.transform: Invalid arguments", arguments),
          new Error("Invalid arguments passed to jsPDF.context2d.transform"))
        );
      var et = new h(A, j, B, R, Y, Q);
      this.ctx.transform = this.ctx.transform.multiply(et);
    }),
    (v.prototype.setTransform = function (A, j, B, R, Y, Q) {
      (A = isNaN(A) ? 1 : A),
        (j = isNaN(j) ? 0 : j),
        (B = isNaN(B) ? 0 : B),
        (R = isNaN(R) ? 1 : R),
        (Y = isNaN(Y) ? 0 : Y),
        (Q = isNaN(Q) ? 0 : Q),
        (this.ctx.transform = new h(A, j, B, R, Y, Q));
    });
  var P = function () {
    return (
      this.margin[0] > 0 ||
      this.margin[1] > 0 ||
      this.margin[2] > 0 ||
      this.margin[3] > 0
    );
  };
  v.prototype.drawImage = function (A, j, B, R, Y, Q, et, rt, Nt) {
    var At = this.pdf.getImageProperties(A),
      It = 1,
      _t = 1,
      Ut = 1,
      ht = 1;
    R !== void 0 &&
      rt !== void 0 &&
      ((Ut = rt / R),
      (ht = Nt / Y),
      (It = ((At.width / R) * rt) / R),
      (_t = ((At.height / Y) * Nt) / Y)),
      Q === void 0 && ((Q = j), (et = B), (j = 0), (B = 0)),
      R !== void 0 && rt === void 0 && ((rt = R), (Nt = Y)),
      R === void 0 && rt === void 0 && ((rt = At.width), (Nt = At.height));
    for (
      var q,
        Xt = this.ctx.transform.decompose(),
        Bt = Z(Xt.rotate.shx),
        xt = new h(),
        Lt = (xt = (xt = (xt = xt.multiply(Xt.translate)).multiply(
          Xt.skew,
        )).multiply(Xt.scale)).applyToRectangle(
          new c(Q - j * Ut, et - B * ht, R * It, Y * _t),
        ),
        Ft = M.call(this, Lt),
        kt = [],
        qt = 0;
      qt < Ft.length;
      qt += 1
    )
      kt.indexOf(Ft[qt]) === -1 && kt.push(Ft[qt]);
    if ((G(kt), this.autoPaging))
      for (var Gt = kt[0], Qt = kt[kt.length - 1], ee = Gt; ee < Qt + 1; ee++) {
        this.pdf.setPage(ee);
        var ae =
            this.pdf.internal.pageSize.width - this.margin[3] - this.margin[1],
          pe = ee === 1 ? this.posY + this.margin[0] : this.margin[0],
          Wt =
            this.pdf.internal.pageSize.height -
            this.posY -
            this.margin[0] -
            this.margin[2],
          ne =
            this.pdf.internal.pageSize.height - this.margin[0] - this.margin[2],
          jt = ee === 1 ? 0 : Wt + (ee - 2) * ne;
        if (this.ctx.clip_path.length !== 0) {
          var Xe = this.path;
          (q = JSON.parse(JSON.stringify(this.ctx.clip_path))),
            (this.path = E(
              q,
              this.posX + this.margin[3],
              -jt + pe + this.ctx.prevPageLastElemOffset,
            )),
            st.call(this, "fill", !0),
            (this.path = Xe);
        }
        var se = JSON.parse(JSON.stringify(Lt));
        se = E(
          [se],
          this.posX + this.margin[3],
          -jt + pe + this.ctx.prevPageLastElemOffset,
        )[0];
        var Fn = (ee > Gt || ee < Qt) && P.call(this);
        Fn &&
          (this.pdf.saveGraphicsState(),
          this.pdf
            .rect(this.margin[3], this.margin[0], ae, ne, null)
            .clip()
            .discardPath()),
          this.pdf.addImage(A, "JPEG", se.x, se.y, se.w, se.h, null, null, Bt),
          Fn && this.pdf.restoreGraphicsState();
      }
    else this.pdf.addImage(A, "JPEG", Lt.x, Lt.y, Lt.w, Lt.h, null, null, Bt);
  };
  var M = function (A, j, B) {
      var R = [];
      (j = j || this.pdf.internal.pageSize.width),
        (B =
          B ||
          this.pdf.internal.pageSize.height - this.margin[0] - this.margin[2]);
      var Y = this.posY + this.ctx.prevPageLastElemOffset;
      switch (A.type) {
        default:
        case "mt":
        case "lt":
          R.push(Math.floor((A.y + Y) / B) + 1);
          break;
        case "arc":
          R.push(Math.floor((A.y + Y - A.radius) / B) + 1),
            R.push(Math.floor((A.y + Y + A.radius) / B) + 1);
          break;
        case "qct":
          var Q = ft(
            this.ctx.lastPoint.x,
            this.ctx.lastPoint.y,
            A.x1,
            A.y1,
            A.x,
            A.y,
          );
          R.push(Math.floor((Q.y + Y) / B) + 1),
            R.push(Math.floor((Q.y + Q.h + Y) / B) + 1);
          break;
        case "bct":
          var et = pt(
            this.ctx.lastPoint.x,
            this.ctx.lastPoint.y,
            A.x1,
            A.y1,
            A.x2,
            A.y2,
            A.x,
            A.y,
          );
          R.push(Math.floor((et.y + Y) / B) + 1),
            R.push(Math.floor((et.y + et.h + Y) / B) + 1);
          break;
        case "rect":
          R.push(Math.floor((A.y + Y) / B) + 1),
            R.push(Math.floor((A.y + A.h + Y) / B) + 1);
      }
      for (var rt = 0; rt < R.length; rt += 1)
        for (; this.pdf.internal.getNumberOfPages() < R[rt]; ) _.call(this);
      return R;
    },
    _ = function () {
      var A = this.fillStyle,
        j = this.strokeStyle,
        B = this.font,
        R = this.lineCap,
        Y = this.lineWidth,
        Q = this.lineJoin;
      this.pdf.addPage(),
        (this.fillStyle = A),
        (this.strokeStyle = j),
        (this.font = B),
        (this.lineCap = R),
        (this.lineWidth = Y),
        (this.lineJoin = Q);
    },
    E = function (A, j, B) {
      for (var R = 0; R < A.length; R++)
        switch (A[R].type) {
          case "bct":
            (A[R].x2 += j), (A[R].y2 += B);
          case "qct":
            (A[R].x1 += j), (A[R].y1 += B);
          case "mt":
          case "lt":
          case "arc":
          default:
            (A[R].x += j), (A[R].y += B);
        }
      return A;
    },
    G = function (A) {
      return A.sort(function (j, B) {
        return j - B;
      });
    },
    nt = function (A, j) {
      for (
        var B,
          R,
          Y = this.fillStyle,
          Q = this.strokeStyle,
          et = this.lineCap,
          rt = this.lineWidth,
          Nt = Math.abs(rt * this.ctx.transform.scaleX),
          At = this.lineJoin,
          It = JSON.parse(JSON.stringify(this.path)),
          _t = JSON.parse(JSON.stringify(this.path)),
          Ut = [],
          ht = 0;
        ht < _t.length;
        ht++
      )
        if (_t[ht].x !== void 0)
          for (var q = M.call(this, _t[ht]), Xt = 0; Xt < q.length; Xt += 1)
            Ut.indexOf(q[Xt]) === -1 && Ut.push(q[Xt]);
      for (var Bt = 0; Bt < Ut.length; Bt++)
        for (; this.pdf.internal.getNumberOfPages() < Ut[Bt]; ) _.call(this);
      if ((G(Ut), this.autoPaging))
        for (
          var xt = Ut[0], Lt = Ut[Ut.length - 1], Ft = xt;
          Ft < Lt + 1;
          Ft++
        ) {
          this.pdf.setPage(Ft),
            (this.fillStyle = Y),
            (this.strokeStyle = Q),
            (this.lineCap = et),
            (this.lineWidth = Nt),
            (this.lineJoin = At);
          var kt =
              this.pdf.internal.pageSize.width -
              this.margin[3] -
              this.margin[1],
            qt = Ft === 1 ? this.posY + this.margin[0] : this.margin[0],
            Gt =
              this.pdf.internal.pageSize.height -
              this.posY -
              this.margin[0] -
              this.margin[2],
            Qt =
              this.pdf.internal.pageSize.height -
              this.margin[0] -
              this.margin[2],
            ee = Ft === 1 ? 0 : Gt + (Ft - 2) * Qt;
          if (this.ctx.clip_path.length !== 0) {
            var ae = this.path;
            (B = JSON.parse(JSON.stringify(this.ctx.clip_path))),
              (this.path = E(
                B,
                this.posX + this.margin[3],
                -ee + qt + this.ctx.prevPageLastElemOffset,
              )),
              st.call(this, A, !0),
              (this.path = ae);
          }
          if (
            ((R = JSON.parse(JSON.stringify(It))),
            (this.path = E(
              R,
              this.posX + this.margin[3],
              -ee + qt + this.ctx.prevPageLastElemOffset,
            )),
            j === !1 || Ft === 0)
          ) {
            var pe = (Ft > xt || Ft < Lt) && P.call(this);
            pe &&
              (this.pdf.saveGraphicsState(),
              this.pdf
                .rect(this.margin[3], this.margin[0], kt, Qt, null)
                .clip()
                .discardPath()),
              st.call(this, A, j),
              pe && this.pdf.restoreGraphicsState();
          }
          this.lineWidth = rt;
        }
      else (this.lineWidth = Nt), st.call(this, A, j), (this.lineWidth = rt);
      this.path = It;
    },
    st = function (A, j) {
      if (
        (A !== "stroke" || j || !F.call(this)) &&
        (A === "stroke" || j || !p.call(this))
      ) {
        for (var B, R, Y = [], Q = this.path, et = 0; et < Q.length; et++) {
          var rt = Q[et];
          switch (rt.type) {
            case "begin":
              Y.push({ begin: !0 });
              break;
            case "close":
              Y.push({ close: !0 });
              break;
            case "mt":
              Y.push({ start: rt, deltas: [], abs: [] });
              break;
            case "lt":
              var Nt = Y.length;
              if (
                Q[et - 1] &&
                !isNaN(Q[et - 1].x) &&
                ((B = [rt.x - Q[et - 1].x, rt.y - Q[et - 1].y]), Nt > 0)
              ) {
                for (; Nt >= 0; Nt--)
                  if (Y[Nt - 1].close !== !0 && Y[Nt - 1].begin !== !0) {
                    Y[Nt - 1].deltas.push(B), Y[Nt - 1].abs.push(rt);
                    break;
                  }
              }
              break;
            case "bct":
              (B = [
                rt.x1 - Q[et - 1].x,
                rt.y1 - Q[et - 1].y,
                rt.x2 - Q[et - 1].x,
                rt.y2 - Q[et - 1].y,
                rt.x - Q[et - 1].x,
                rt.y - Q[et - 1].y,
              ]),
                Y[Y.length - 1].deltas.push(B);
              break;
            case "qct":
              var At = Q[et - 1].x + (2 / 3) * (rt.x1 - Q[et - 1].x),
                It = Q[et - 1].y + (2 / 3) * (rt.y1 - Q[et - 1].y),
                _t = rt.x + (2 / 3) * (rt.x1 - rt.x),
                Ut = rt.y + (2 / 3) * (rt.y1 - rt.y),
                ht = rt.x,
                q = rt.y;
              (B = [
                At - Q[et - 1].x,
                It - Q[et - 1].y,
                _t - Q[et - 1].x,
                Ut - Q[et - 1].y,
                ht - Q[et - 1].x,
                q - Q[et - 1].y,
              ]),
                Y[Y.length - 1].deltas.push(B);
              break;
            case "arc":
              Y.push({ deltas: [], abs: [], arc: !0 }),
                Array.isArray(Y[Y.length - 1].abs) &&
                  Y[Y.length - 1].abs.push(rt);
          }
        }
        R = j ? null : A === "stroke" ? "stroke" : "fill";
        for (var Xt = !1, Bt = 0; Bt < Y.length; Bt++)
          if (Y[Bt].arc)
            for (var xt = Y[Bt].abs, Lt = 0; Lt < xt.length; Lt++) {
              var Ft = xt[Lt];
              Ft.type === "arc"
                ? z.call(
                    this,
                    Ft.x,
                    Ft.y,
                    Ft.radius,
                    Ft.startAngle,
                    Ft.endAngle,
                    Ft.counterclockwise,
                    void 0,
                    j,
                    !Xt,
                  )
                : W.call(this, Ft.x, Ft.y),
                (Xt = !0);
            }
          else if (Y[Bt].close === !0) this.pdf.internal.out("h"), (Xt = !1);
          else if (Y[Bt].begin !== !0) {
            var kt = Y[Bt].start.x,
              qt = Y[Bt].start.y;
            T.call(this, Y[Bt].deltas, kt, qt), (Xt = !0);
          }
        R && it.call(this, R), j && dt.call(this);
      }
    },
    wt = function (A) {
      var j = this.pdf.internal.getFontSize() / this.pdf.internal.scaleFactor,
        B = j * (this.pdf.internal.getLineHeightFactor() - 1);
      switch (this.ctx.textBaseline) {
        case "bottom":
          return A - B;
        case "top":
          return A + j - B;
        case "hanging":
          return A + j - 2 * B;
        case "middle":
          return A + j / 2 - B;
        case "ideographic":
          return A;
        case "alphabetic":
        default:
          return A;
      }
    },
    tt = function (A) {
      return (
        A +
        (this.pdf.internal.getFontSize() / this.pdf.internal.scaleFactor) *
          (this.pdf.internal.getLineHeightFactor() - 1)
      );
    };
  (v.prototype.createLinearGradient = function () {
    var A = function () {};
    return (
      (A.colorStops = []),
      (A.addColorStop = function (j, B) {
        this.colorStops.push([j, B]);
      }),
      (A.getColor = function () {
        return this.colorStops.length === 0 ? "#000000" : this.colorStops[0][1];
      }),
      (A.isCanvasGradient = !0),
      A
    );
  }),
    (v.prototype.createPattern = function () {
      return this.createLinearGradient();
    }),
    (v.prototype.createRadialGradient = function () {
      return this.createLinearGradient();
    });
  var z = function (A, j, B, R, Y, Q, et, rt, Nt) {
      for (var At = at.call(this, B, R, Y, Q), It = 0; It < At.length; It++) {
        var _t = At[It];
        It === 0 &&
          (Nt
            ? k.call(this, _t.x1 + A, _t.y1 + j)
            : W.call(this, _t.x1 + A, _t.y1 + j)),
          ut.call(this, A, j, _t.x2, _t.y2, _t.x3, _t.y3, _t.x4, _t.y4);
      }
      rt ? dt.call(this) : it.call(this, et);
    },
    it = function (A) {
      switch (A) {
        case "stroke":
          this.pdf.internal.out("S");
          break;
        case "fill":
          this.pdf.internal.out("f");
      }
    },
    dt = function () {
      this.pdf.clip(), this.pdf.discardPath();
    },
    k = function (A, j) {
      this.pdf.internal.out(e(A) + " " + i(j) + " m");
    },
    I = function (A) {
      var j;
      switch (A.align) {
        case "right":
        case "end":
          j = "right";
          break;
        case "center":
          j = "center";
          break;
        case "left":
        case "start":
        default:
          j = "left";
      }
      var B = this.pdf.getTextDimensions(A.text),
        R = wt.call(this, A.y),
        Y = tt.call(this, R) - B.h,
        Q = this.ctx.transform.applyToPoint(new l(A.x, R)),
        et = this.ctx.transform.decompose(),
        rt = new h();
      rt = (rt = (rt = rt.multiply(et.translate)).multiply(et.skew)).multiply(
        et.scale,
      );
      for (
        var Nt,
          At,
          It,
          _t = this.ctx.transform.applyToRectangle(new c(A.x, R, B.w, B.h)),
          Ut = rt.applyToRectangle(new c(A.x, Y, B.w, B.h)),
          ht = M.call(this, Ut),
          q = [],
          Xt = 0;
        Xt < ht.length;
        Xt += 1
      )
        q.indexOf(ht[Xt]) === -1 && q.push(ht[Xt]);
      if ((G(q), this.autoPaging))
        for (var Bt = q[0], xt = q[q.length - 1], Lt = Bt; Lt < xt + 1; Lt++) {
          this.pdf.setPage(Lt);
          var Ft = Lt === 1 ? this.posY + this.margin[0] : this.margin[0],
            kt =
              this.pdf.internal.pageSize.height -
              this.posY -
              this.margin[0] -
              this.margin[2],
            qt = this.pdf.internal.pageSize.height - this.margin[2],
            Gt = qt - this.margin[0],
            Qt = this.pdf.internal.pageSize.width - this.margin[1],
            ee = Qt - this.margin[3],
            ae = Lt === 1 ? 0 : kt + (Lt - 2) * Gt;
          if (this.ctx.clip_path.length !== 0) {
            var pe = this.path;
            (Nt = JSON.parse(JSON.stringify(this.ctx.clip_path))),
              (this.path = E(Nt, this.posX + this.margin[3], -1 * ae + Ft)),
              st.call(this, "fill", !0),
              (this.path = pe);
          }
          var Wt = E(
            [JSON.parse(JSON.stringify(Ut))],
            this.posX + this.margin[3],
            -ae + Ft + this.ctx.prevPageLastElemOffset,
          )[0];
          A.scale >= 0.01 &&
            ((At = this.pdf.internal.getFontSize()),
            this.pdf.setFontSize(At * A.scale),
            (It = this.lineWidth),
            (this.lineWidth = It * A.scale));
          var ne = this.autoPaging !== "text";
          if (ne || Wt.y + Wt.h <= qt) {
            if (ne || (Wt.y >= Ft && Wt.x <= Qt)) {
              var jt = ne
                  ? A.text
                  : this.pdf.splitTextToSize(
                      A.text,
                      A.maxWidth || Qt - Wt.x,
                    )[0],
                Xe = E(
                  [JSON.parse(JSON.stringify(_t))],
                  this.posX + this.margin[3],
                  -ae + Ft + this.ctx.prevPageLastElemOffset,
                )[0],
                se = ne && (Lt > Bt || Lt < xt) && P.call(this);
              se &&
                (this.pdf.saveGraphicsState(),
                this.pdf
                  .rect(this.margin[3], this.margin[0], ee, Gt, null)
                  .clip()
                  .discardPath()),
                this.pdf.text(jt, Xe.x, Xe.y, {
                  angle: A.angle,
                  align: j,
                  renderingMode: A.renderingMode,
                }),
                se && this.pdf.restoreGraphicsState();
            }
          } else Wt.y < qt && (this.ctx.prevPageLastElemOffset += qt - Wt.y);
          A.scale >= 0.01 && (this.pdf.setFontSize(At), (this.lineWidth = It));
        }
      else
        A.scale >= 0.01 &&
          ((At = this.pdf.internal.getFontSize()),
          this.pdf.setFontSize(At * A.scale),
          (It = this.lineWidth),
          (this.lineWidth = It * A.scale)),
          this.pdf.text(A.text, Q.x + this.posX, Q.y + this.posY, {
            angle: A.angle,
            align: j,
            renderingMode: A.renderingMode,
            maxWidth: A.maxWidth,
          }),
          A.scale >= 0.01 && (this.pdf.setFontSize(At), (this.lineWidth = It));
    },
    W = function (A, j, B, R) {
      (B = B || 0),
        (R = R || 0),
        this.pdf.internal.out(e(A + B) + " " + i(j + R) + " l");
    },
    T = function (A, j, B) {
      return this.pdf.lines(A, j, B, null, null);
    },
    ut = function (A, j, B, R, Y, Q, et, rt) {
      this.pdf.internal.out(
        [
          t(s(B + A)),
          t(a(R + j)),
          t(s(Y + A)),
          t(a(Q + j)),
          t(s(et + A)),
          t(a(rt + j)),
          "c",
        ].join(" "),
      );
    },
    at = function (A, j, B, R) {
      for (var Y = 2 * Math.PI, Q = Math.PI / 2; j > B; ) j -= Y;
      var et = Math.abs(B - j);
      et < Y && R && (et = Y - et);
      for (var rt = [], Nt = R ? -1 : 1, At = j; et > 1e-5; ) {
        var It = At + Nt * Math.min(et, Q);
        rt.push(ct.call(this, A, At, It)), (et -= Math.abs(It - At)), (At = It);
      }
      return rt;
    },
    ct = function (A, j, B) {
      var R = (B - j) / 2,
        Y = A * Math.cos(R),
        Q = A * Math.sin(R),
        et = Y,
        rt = -Q,
        Nt = et * et + rt * rt,
        At = Nt + et * Y + rt * Q,
        It = ((4 / 3) * (Math.sqrt(2 * Nt * At) - At)) / (et * Q - rt * Y),
        _t = et - It * rt,
        Ut = rt + It * et,
        ht = _t,
        q = -Ut,
        Xt = R + j,
        Bt = Math.cos(Xt),
        xt = Math.sin(Xt);
      return {
        x1: A * Math.cos(j),
        y1: A * Math.sin(j),
        x2: _t * Bt - Ut * xt,
        y2: _t * xt + Ut * Bt,
        x3: ht * Bt - q * xt,
        y3: ht * xt + q * Bt,
        x4: A * Math.cos(B),
        y4: A * Math.sin(B),
      };
    },
    Z = function (A) {
      return (180 * A) / Math.PI;
    },
    ft = function (A, j, B, R, Y, Q) {
      var et = A + 0.5 * (B - A),
        rt = j + 0.5 * (R - j),
        Nt = Y + 0.5 * (B - Y),
        At = Q + 0.5 * (R - Q),
        It = Math.min(A, Y, et, Nt),
        _t = Math.max(A, Y, et, Nt),
        Ut = Math.min(j, Q, rt, At),
        ht = Math.max(j, Q, rt, At);
      return new c(It, Ut, _t - It, ht - Ut);
    },
    pt = function (A, j, B, R, Y, Q, et, rt) {
      var Nt,
        At,
        It,
        _t,
        Ut,
        ht,
        q,
        Xt,
        Bt,
        xt,
        Lt,
        Ft,
        kt,
        qt,
        Gt = B - A,
        Qt = R - j,
        ee = Y - B,
        ae = Q - R,
        pe = et - Y,
        Wt = rt - Q;
      for (At = 0; At < 41; At++)
        (Bt =
          (q =
            (It = A + (Nt = At / 40) * Gt) + Nt * ((Ut = B + Nt * ee) - It)) +
          Nt * (Ut + Nt * (Y + Nt * pe - Ut) - q)),
          (xt =
            (Xt = (_t = j + Nt * Qt) + Nt * ((ht = R + Nt * ae) - _t)) +
            Nt * (ht + Nt * (Q + Nt * Wt - ht) - Xt)),
          At == 0
            ? ((Lt = Bt), (Ft = xt), (kt = Bt), (qt = xt))
            : ((Lt = Math.min(Lt, Bt)),
              (Ft = Math.min(Ft, xt)),
              (kt = Math.max(kt, Bt)),
              (qt = Math.max(qt, xt)));
      return new c(
        Math.round(Lt),
        Math.round(Ft),
        Math.round(kt - Lt),
        Math.round(qt - Ft),
      );
    },
    Ct = function () {
      if (
        this.prevLineDash ||
        this.ctx.lineDash.length ||
        this.ctx.lineDashOffset
      ) {
        var A,
          j,
          B =
            ((A = this.ctx.lineDash),
            (j = this.ctx.lineDashOffset),
            JSON.stringify({ lineDash: A, lineDashOffset: j }));
        this.prevLineDash !== B &&
          (this.pdf.setLineDash(this.ctx.lineDash, this.ctx.lineDashOffset),
          (this.prevLineDash = B));
      }
    };
})(zt.API),
  (function (n) {
    var t = function (a) {
        var l, c, h, g, m, v, N, p, F, P;
        for (
          c = [],
            h = 0,
            g = (a += l = "\0\0\0\0".slice(a.length % 4 || 4)).length;
          g > h;
          h += 4
        )
          (m =
            (a.charCodeAt(h) << 24) +
            (a.charCodeAt(h + 1) << 16) +
            (a.charCodeAt(h + 2) << 8) +
            a.charCodeAt(h + 3)) !== 0
            ? ((v =
                (m =
                  ((m =
                    ((m = ((m = (m - (P = m % 85)) / 85) - (F = m % 85)) / 85) -
                      (p = m % 85)) /
                    85) -
                    (N = m % 85)) /
                  85) % 85),
              c.push(v + 33, N + 33, p + 33, F + 33, P + 33))
            : c.push(122);
        return (
          (function (M, _) {
            for (var E = _; E > 0; E--) M.pop();
          })(c, l.length),
          String.fromCharCode.apply(String, c) + "~>"
        );
      },
      e = function (a) {
        var l,
          c,
          h,
          g,
          m,
          v = String,
          N = "length",
          p = 255,
          F = "charCodeAt",
          P = "slice",
          M = "replace";
        for (
          a[P](-2),
            a = a[P](0, -2)[M](/\s/g, "")[M]("z", "!!!!!"),
            h = [],
            g = 0,
            m = (a += l = "uuuuu"[P](a[N] % 5 || 5))[N];
          m > g;
          g += 5
        )
          (c =
            52200625 * (a[F](g) - 33) +
            614125 * (a[F](g + 1) - 33) +
            7225 * (a[F](g + 2) - 33) +
            85 * (a[F](g + 3) - 33) +
            (a[F](g + 4) - 33)),
            h.push(p & (c >> 24), p & (c >> 16), p & (c >> 8), p & c);
        return (
          (function (_, E) {
            for (var G = E; G > 0; G--) _.pop();
          })(h, l[N]),
          v.fromCharCode.apply(v, h)
        );
      },
      i = function (a) {
        var l = new RegExp(/^([0-9A-Fa-f]{2})+$/);
        if (
          ((a = a.replace(/\s/g, "")).indexOf(">") !== -1 &&
            (a = a.substr(0, a.indexOf(">"))),
          a.length % 2 && (a += "0"),
          l.test(a) === !1)
        )
          return "";
        for (var c = "", h = 0; h < a.length; h += 2)
          c += String.fromCharCode("0x" + (a[h] + a[h + 1]));
        return c;
      },
      s = function (a) {
        for (var l = new Uint8Array(a.length), c = a.length; c--; )
          l[c] = a.charCodeAt(c);
        return (a = (l = eu(l)).reduce(function (h, g) {
          return h + String.fromCharCode(g);
        }, ""));
      };
    n.processDataByFilters = function (a, l) {
      var c = 0,
        h = a || "",
        g = [];
      for (
        typeof (l = l || []) == "string" && (l = [l]), c = 0;
        c < l.length;
        c += 1
      )
        switch (l[c]) {
          case "ASCII85Decode":
          case "/ASCII85Decode":
            (h = e(h)), g.push("/ASCII85Encode");
            break;
          case "ASCII85Encode":
          case "/ASCII85Encode":
            (h = t(h)), g.push("/ASCII85Decode");
            break;
          case "ASCIIHexDecode":
          case "/ASCIIHexDecode":
            (h = i(h)), g.push("/ASCIIHexEncode");
            break;
          case "ASCIIHexEncode":
          case "/ASCIIHexEncode":
            (h =
              h
                .split("")
                .map(function (m) {
                  return ("0" + m.charCodeAt().toString(16)).slice(-2);
                })
                .join("") + ">"),
              g.push("/ASCIIHexDecode");
            break;
          case "FlateEncode":
          case "/FlateEncode":
            (h = s(h)), g.push("/FlateDecode");
            break;
          default:
            throw new Error('The filter: "' + l[c] + '" is not implemented');
        }
      return { data: h, reverseChain: g.reverse().join(" ") };
    };
  })(zt.API),
  (function (n) {
    (n.loadFile = function (t, e, i) {
      return (function (s, a, l) {
        (a = a !== !1), (l = typeof l == "function" ? l : function () {});
        var c = void 0;
        try {
          c = (function (h, g, m) {
            var v = new XMLHttpRequest(),
              N = 0,
              p = function (F) {
                var P = F.length,
                  M = [],
                  _ = String.fromCharCode;
                for (N = 0; N < P; N += 1) M.push(_(255 & F.charCodeAt(N)));
                return M.join("");
              };
            if (
              (v.open("GET", h, !g),
              v.overrideMimeType("text/plain; charset=x-user-defined"),
              g === !1 &&
                (v.onload = function () {
                  v.status === 200 ? m(p(this.responseText)) : m(void 0);
                }),
              v.send(null),
              g && v.status === 200)
            )
              return p(v.responseText);
          })(s, a, l);
        } catch {}
        return c;
      })(t, e, i);
    }),
      (n.loadImageFile = n.loadFile);
  })(zt.API),
  (function (n) {
    function t() {
      return (
        Ht.html2canvas
          ? Promise.resolve(Ht.html2canvas)
          : Xs(() => import("./html2canvas.esm-BfxBtG_O.js"), [])
      )
        .catch(function (l) {
          return Promise.reject(new Error("Could not load html2canvas: " + l));
        })
        .then(function (l) {
          return l.default ? l.default : l;
        });
    }
    function e() {
      return (
        Ht.DOMPurify
          ? Promise.resolve(Ht.DOMPurify)
          : Xs(() => import("./purify.es-C_uT9hQ1.js"), [])
      )
        .catch(function (l) {
          return Promise.reject(new Error("Could not load dompurify: " + l));
        })
        .then(function (l) {
          return l.default ? l.default : l;
        });
    }
    var i = function (l) {
        var c = de(l);
        return c === "undefined"
          ? "undefined"
          : c === "string" || l instanceof String
            ? "string"
            : c === "number" || l instanceof Number
              ? "number"
              : c === "function" || l instanceof Function
                ? "function"
                : l && l.constructor === Array
                  ? "array"
                  : l && l.nodeType === 1
                    ? "element"
                    : c === "object"
                      ? "object"
                      : "unknown";
      },
      s = function (l, c) {
        var h = document.createElement(l);
        for (var g in (c.className && (h.className = c.className),
        c.innerHTML &&
          c.dompurify &&
          (h.innerHTML = c.dompurify.sanitize(c.innerHTML)),
        c.style))
          h.style[g] = c.style[g];
        return h;
      },
      a = function l(c) {
        var h = Object.assign(
            l.convert(Promise.resolve()),
            JSON.parse(JSON.stringify(l.template)),
          ),
          g = l.convert(Promise.resolve(), h);
        return (g = (g = g.setProgress(1, l, 1, [l])).set(c));
      };
    ((a.prototype = Object.create(Promise.prototype)).constructor = a),
      (a.convert = function (l, c) {
        return (l.__proto__ = c || a.prototype), l;
      }),
      (a.template = {
        prop: {
          src: null,
          container: null,
          overlay: null,
          canvas: null,
          img: null,
          pdf: null,
          pageSize: null,
          callback: function () {},
        },
        progress: { val: 0, state: null, n: 0, stack: [] },
        opt: {
          filename: "file.pdf",
          margin: [0, 0, 0, 0],
          enableLinks: !0,
          x: 0,
          y: 0,
          html2canvas: {},
          jsPDF: {},
          backgroundColor: "transparent",
        },
      }),
      (a.prototype.from = function (l, c) {
        return this.then(function () {
          switch (
            (c =
              c ||
              (function (h) {
                switch (i(h)) {
                  case "string":
                    return "string";
                  case "element":
                    return h.nodeName.toLowerCase() === "canvas"
                      ? "canvas"
                      : "element";
                  default:
                    return "unknown";
                }
              })(l))
          ) {
            case "string":
              return this.then(e).then(function (h) {
                return this.set({
                  src: s("div", { innerHTML: l, dompurify: h }),
                });
              });
            case "element":
              return this.set({ src: l });
            case "canvas":
              return this.set({ canvas: l });
            case "img":
              return this.set({ img: l });
            default:
              return this.error("Unknown source type.");
          }
        });
      }),
      (a.prototype.to = function (l) {
        switch (l) {
          case "container":
            return this.toContainer();
          case "canvas":
            return this.toCanvas();
          case "img":
            return this.toImg();
          case "pdf":
            return this.toPdf();
          default:
            return this.error("Invalid target.");
        }
      }),
      (a.prototype.toContainer = function () {
        return this.thenList([
          function () {
            return (
              this.prop.src || this.error("Cannot duplicate - no source HTML.")
            );
          },
          function () {
            return this.prop.pageSize || this.setPageSize();
          },
        ]).then(function () {
          var l = {
              position: "relative",
              display: "inline-block",
              width:
                (typeof this.opt.width != "number" ||
                isNaN(this.opt.width) ||
                typeof this.opt.windowWidth != "number" ||
                isNaN(this.opt.windowWidth)
                  ? Math.max(
                      this.prop.src.clientWidth,
                      this.prop.src.scrollWidth,
                      this.prop.src.offsetWidth,
                    )
                  : this.opt.windowWidth) + "px",
              left: 0,
              right: 0,
              top: 0,
              margin: "auto",
              backgroundColor: this.opt.backgroundColor,
            },
            c = (function h(g, m) {
              for (
                var v =
                    g.nodeType === 3
                      ? document.createTextNode(g.nodeValue)
                      : g.cloneNode(!1),
                  N = g.firstChild;
                N;
                N = N.nextSibling
              )
                (m !== !0 && N.nodeType === 1 && N.nodeName === "SCRIPT") ||
                  v.appendChild(h(N, m));
              return (
                g.nodeType === 1 &&
                  (g.nodeName === "CANVAS"
                    ? ((v.width = g.width),
                      (v.height = g.height),
                      v.getContext("2d").drawImage(g, 0, 0))
                    : (g.nodeName !== "TEXTAREA" && g.nodeName !== "SELECT") ||
                      (v.value = g.value),
                  v.addEventListener(
                    "load",
                    function () {
                      (v.scrollTop = g.scrollTop),
                        (v.scrollLeft = g.scrollLeft);
                    },
                    !0,
                  )),
                v
              );
            })(this.prop.src, this.opt.html2canvas.javascriptEnabled);
          c.tagName === "BODY" &&
            (l.height =
              Math.max(
                document.body.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.clientHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight,
              ) + "px"),
            (this.prop.overlay = s("div", {
              className: "html2pdf__overlay",
              style: {
                position: "fixed",
                overflow: "hidden",
                zIndex: 1e3,
                left: "-100000px",
                right: 0,
                bottom: 0,
                top: 0,
              },
            })),
            (this.prop.container = s("div", {
              className: "html2pdf__container",
              style: l,
            })),
            this.prop.container.appendChild(c),
            this.prop.container.firstChild.appendChild(
              s("div", {
                style: {
                  clear: "both",
                  border: "0 none transparent",
                  margin: 0,
                  padding: 0,
                  height: 0,
                },
              }),
            ),
            (this.prop.container.style.float = "none"),
            this.prop.overlay.appendChild(this.prop.container),
            document.body.appendChild(this.prop.overlay),
            (this.prop.container.firstChild.style.position = "relative"),
            (this.prop.container.height =
              Math.max(
                this.prop.container.firstChild.clientHeight,
                this.prop.container.firstChild.scrollHeight,
                this.prop.container.firstChild.offsetHeight,
              ) + "px");
        });
      }),
      (a.prototype.toCanvas = function () {
        var l = [
          function () {
            return (
              document.body.contains(this.prop.container) || this.toContainer()
            );
          },
        ];
        return this.thenList(l)
          .then(t)
          .then(function (c) {
            var h = Object.assign({}, this.opt.html2canvas);
            return delete h.onrendered, c(this.prop.container, h);
          })
          .then(function (c) {
            (this.opt.html2canvas.onrendered || function () {})(c),
              (this.prop.canvas = c),
              document.body.removeChild(this.prop.overlay);
          });
      }),
      (a.prototype.toContext2d = function () {
        var l = [
          function () {
            return (
              document.body.contains(this.prop.container) || this.toContainer()
            );
          },
        ];
        return this.thenList(l)
          .then(t)
          .then(function (c) {
            var h = this.opt.jsPDF,
              g = this.opt.fontFaces,
              m =
                typeof this.opt.width != "number" ||
                isNaN(this.opt.width) ||
                typeof this.opt.windowWidth != "number" ||
                isNaN(this.opt.windowWidth)
                  ? 1
                  : this.opt.width / this.opt.windowWidth,
              v = Object.assign(
                {
                  async: !0,
                  allowTaint: !0,
                  scale: m,
                  scrollX: this.opt.scrollX || 0,
                  scrollY: this.opt.scrollY || 0,
                  backgroundColor: "#ffffff",
                  imageTimeout: 15e3,
                  logging: !0,
                  proxy: null,
                  removeContainer: !0,
                  foreignObjectRendering: !1,
                  useCORS: !1,
                },
                this.opt.html2canvas,
              );
            if (
              (delete v.onrendered,
              (h.context2d.autoPaging =
                this.opt.autoPaging === void 0 || this.opt.autoPaging),
              (h.context2d.posX = this.opt.x),
              (h.context2d.posY = this.opt.y),
              (h.context2d.margin = this.opt.margin),
              (h.context2d.fontFaces = g),
              g)
            )
              for (var N = 0; N < g.length; ++N) {
                var p = g[N],
                  F = p.src.find(function (P) {
                    return P.format === "truetype";
                  });
                F && h.addFont(F.url, p.ref.name, p.ref.style);
              }
            return (
              (v.windowHeight = v.windowHeight || 0),
              (v.windowHeight =
                v.windowHeight == 0
                  ? Math.max(
                      this.prop.container.clientHeight,
                      this.prop.container.scrollHeight,
                      this.prop.container.offsetHeight,
                    )
                  : v.windowHeight),
              h.context2d.save(!0),
              c(this.prop.container, v)
            );
          })
          .then(function (c) {
            this.opt.jsPDF.context2d.restore(!0),
              (this.opt.html2canvas.onrendered || function () {})(c),
              (this.prop.canvas = c),
              document.body.removeChild(this.prop.overlay);
          });
      }),
      (a.prototype.toImg = function () {
        return this.thenList([
          function () {
            return this.prop.canvas || this.toCanvas();
          },
        ]).then(function () {
          var l = this.prop.canvas.toDataURL(
            "image/" + this.opt.image.type,
            this.opt.image.quality,
          );
          (this.prop.img = document.createElement("img")),
            (this.prop.img.src = l);
        });
      }),
      (a.prototype.toPdf = function () {
        return this.thenList([
          function () {
            return this.toContext2d();
          },
        ]).then(function () {
          this.prop.pdf = this.prop.pdf || this.opt.jsPDF;
        });
      }),
      (a.prototype.output = function (l, c, h) {
        return (h = h || "pdf").toLowerCase() === "img" ||
          h.toLowerCase() === "image"
          ? this.outputImg(l, c)
          : this.outputPdf(l, c);
      }),
      (a.prototype.outputPdf = function (l, c) {
        return this.thenList([
          function () {
            return this.prop.pdf || this.toPdf();
          },
        ]).then(function () {
          return this.prop.pdf.output(l, c);
        });
      }),
      (a.prototype.outputImg = function (l) {
        return this.thenList([
          function () {
            return this.prop.img || this.toImg();
          },
        ]).then(function () {
          switch (l) {
            case void 0:
            case "img":
              return this.prop.img;
            case "datauristring":
            case "dataurlstring":
              return this.prop.img.src;
            case "datauri":
            case "dataurl":
              return (document.location.href = this.prop.img.src);
            default:
              throw 'Image output type "' + l + '" is not supported.';
          }
        });
      }),
      (a.prototype.save = function (l) {
        return this.thenList([
          function () {
            return this.prop.pdf || this.toPdf();
          },
        ])
          .set(l ? { filename: l } : null)
          .then(function () {
            this.prop.pdf.save(this.opt.filename);
          });
      }),
      (a.prototype.doCallback = function () {
        return this.thenList([
          function () {
            return this.prop.pdf || this.toPdf();
          },
        ]).then(function () {
          this.prop.callback(this.prop.pdf);
        });
      }),
      (a.prototype.set = function (l) {
        if (i(l) !== "object") return this;
        var c = Object.keys(l || {}).map(function (h) {
          if (h in a.template.prop)
            return function () {
              this.prop[h] = l[h];
            };
          switch (h) {
            case "margin":
              return this.setMargin.bind(this, l.margin);
            case "jsPDF":
              return function () {
                return (this.opt.jsPDF = l.jsPDF), this.setPageSize();
              };
            case "pageSize":
              return this.setPageSize.bind(this, l.pageSize);
            default:
              return function () {
                this.opt[h] = l[h];
              };
          }
        }, this);
        return this.then(function () {
          return this.thenList(c);
        });
      }),
      (a.prototype.get = function (l, c) {
        return this.then(function () {
          var h = l in a.template.prop ? this.prop[l] : this.opt[l];
          return c ? c(h) : h;
        });
      }),
      (a.prototype.setMargin = function (l) {
        return this.then(function () {
          switch (i(l)) {
            case "number":
              l = [l, l, l, l];
            case "array":
              if (
                (l.length === 2 && (l = [l[0], l[1], l[0], l[1]]),
                l.length === 4)
              )
                break;
            default:
              return this.error("Invalid margin array.");
          }
          this.opt.margin = l;
        }).then(this.setPageSize);
      }),
      (a.prototype.setPageSize = function (l) {
        function c(h, g) {
          return Math.floor(((h * g) / 72) * 96);
        }
        return this.then(function () {
          (l = l || zt.getPageSize(this.opt.jsPDF)).hasOwnProperty("inner") ||
            ((l.inner = {
              width: l.width - this.opt.margin[1] - this.opt.margin[3],
              height: l.height - this.opt.margin[0] - this.opt.margin[2],
            }),
            (l.inner.px = {
              width: c(l.inner.width, l.k),
              height: c(l.inner.height, l.k),
            }),
            (l.inner.ratio = l.inner.height / l.inner.width)),
            (this.prop.pageSize = l);
        });
      }),
      (a.prototype.setProgress = function (l, c, h, g) {
        return (
          l != null && (this.progress.val = l),
          c != null && (this.progress.state = c),
          h != null && (this.progress.n = h),
          g != null && (this.progress.stack = g),
          (this.progress.ratio = this.progress.val / this.progress.state),
          this
        );
      }),
      (a.prototype.updateProgress = function (l, c, h, g) {
        return this.setProgress(
          l ? this.progress.val + l : null,
          c || null,
          h ? this.progress.n + h : null,
          g ? this.progress.stack.concat(g) : null,
        );
      }),
      (a.prototype.then = function (l, c) {
        var h = this;
        return this.thenCore(l, c, function (g, m) {
          return (
            h.updateProgress(null, null, 1, [g]),
            Promise.prototype.then
              .call(this, function (v) {
                return h.updateProgress(null, g), v;
              })
              .then(g, m)
              .then(function (v) {
                return h.updateProgress(1), v;
              })
          );
        });
      }),
      (a.prototype.thenCore = function (l, c, h) {
        (h = h || Promise.prototype.then),
          l && (l = l.bind(this)),
          c && (c = c.bind(this));
        var g =
            Promise.toString().indexOf("[native code]") !== -1 &&
            Promise.name === "Promise"
              ? this
              : a.convert(Object.assign({}, this), Promise.prototype),
          m = h.call(g, l, c);
        return a.convert(m, this.__proto__);
      }),
      (a.prototype.thenExternal = function (l, c) {
        return Promise.prototype.then.call(this, l, c);
      }),
      (a.prototype.thenList = function (l) {
        var c = this;
        return (
          l.forEach(function (h) {
            c = c.thenCore(h);
          }),
          c
        );
      }),
      (a.prototype.catch = function (l) {
        l && (l = l.bind(this));
        var c = Promise.prototype.catch.call(this, l);
        return a.convert(c, this);
      }),
      (a.prototype.catchExternal = function (l) {
        return Promise.prototype.catch.call(this, l);
      }),
      (a.prototype.error = function (l) {
        return this.then(function () {
          throw new Error(l);
        });
      }),
      (a.prototype.using = a.prototype.set),
      (a.prototype.saveAs = a.prototype.save),
      (a.prototype.export = a.prototype.output),
      (a.prototype.run = a.prototype.then),
      (zt.getPageSize = function (l, c, h) {
        if (de(l) === "object") {
          var g = l;
          (l = g.orientation), (c = g.unit || c), (h = g.format || h);
        }
        (c = c || "mm"), (h = h || "a4"), (l = ("" + (l || "P")).toLowerCase());
        var m,
          v = ("" + h).toLowerCase(),
          N = {
            a0: [2383.94, 3370.39],
            a1: [1683.78, 2383.94],
            a2: [1190.55, 1683.78],
            a3: [841.89, 1190.55],
            a4: [595.28, 841.89],
            a5: [419.53, 595.28],
            a6: [297.64, 419.53],
            a7: [209.76, 297.64],
            a8: [147.4, 209.76],
            a9: [104.88, 147.4],
            a10: [73.7, 104.88],
            b0: [2834.65, 4008.19],
            b1: [2004.09, 2834.65],
            b2: [1417.32, 2004.09],
            b3: [1000.63, 1417.32],
            b4: [708.66, 1000.63],
            b5: [498.9, 708.66],
            b6: [354.33, 498.9],
            b7: [249.45, 354.33],
            b8: [175.75, 249.45],
            b9: [124.72, 175.75],
            b10: [87.87, 124.72],
            c0: [2599.37, 3676.54],
            c1: [1836.85, 2599.37],
            c2: [1298.27, 1836.85],
            c3: [918.43, 1298.27],
            c4: [649.13, 918.43],
            c5: [459.21, 649.13],
            c6: [323.15, 459.21],
            c7: [229.61, 323.15],
            c8: [161.57, 229.61],
            c9: [113.39, 161.57],
            c10: [79.37, 113.39],
            dl: [311.81, 623.62],
            letter: [612, 792],
            "government-letter": [576, 756],
            legal: [612, 1008],
            "junior-legal": [576, 360],
            ledger: [1224, 792],
            tabloid: [792, 1224],
            "credit-card": [153, 243],
          };
        switch (c) {
          case "pt":
            m = 1;
            break;
          case "mm":
            m = 72 / 25.4;
            break;
          case "cm":
            m = 72 / 2.54;
            break;
          case "in":
            m = 72;
            break;
          case "px":
            m = 0.75;
            break;
          case "pc":
          case "em":
            m = 12;
            break;
          case "ex":
            m = 6;
            break;
          default:
            throw "Invalid unit: " + c;
        }
        var p,
          F = 0,
          P = 0;
        if (N.hasOwnProperty(v)) (F = N[v][1] / m), (P = N[v][0] / m);
        else
          try {
            (F = h[1]), (P = h[0]);
          } catch {
            throw new Error("Invalid format: " + h);
          }
        if (l === "p" || l === "portrait")
          (l = "p"), P > F && ((p = P), (P = F), (F = p));
        else {
          if (l !== "l" && l !== "landscape") throw "Invalid orientation: " + l;
          (l = "l"), F > P && ((p = P), (P = F), (F = p));
        }
        return { width: P, height: F, unit: c, k: m, orientation: l };
      }),
      (n.html = function (l, c) {
        ((c = c || {}).callback = c.callback || function () {}),
          (c.html2canvas = c.html2canvas || {}),
          (c.html2canvas.canvas = c.html2canvas.canvas || this.canvas),
          (c.jsPDF = c.jsPDF || this),
          (c.fontFaces = c.fontFaces ? c.fontFaces.map(su) : null);
        var h = new a(c);
        return c.worker ? h : h.from(l).doCallback();
      });
  })(zt.API),
  (zt.API.addJS = function (n) {
    return (
      (ul = n),
      this.internal.events.subscribe("postPutResources", function () {
        (Po = this.internal.newObject()),
          this.internal.out("<<"),
          this.internal.out("/Names [(EmbeddedJS) " + (Po + 1) + " 0 R]"),
          this.internal.out(">>"),
          this.internal.out("endobj"),
          (sl = this.internal.newObject()),
          this.internal.out("<<"),
          this.internal.out("/S /JavaScript"),
          this.internal.out("/JS (" + ul + ")"),
          this.internal.out(">>"),
          this.internal.out("endobj");
      }),
      this.internal.events.subscribe("putCatalog", function () {
        Po !== void 0 &&
          sl !== void 0 &&
          this.internal.out("/Names <</JavaScript " + Po + " 0 R>>");
      }),
      this
    );
  }),
  (function (n) {
    var t;
    n.events.push([
      "postPutResources",
      function () {
        var e = this,
          i = /^(\d+) 0 obj$/;
        if (this.outline.root.children.length > 0)
          for (
            var s = e.outline.render().split(/\r\n/), a = 0;
            a < s.length;
            a++
          ) {
            var l = s[a],
              c = i.exec(l);
            if (c != null) {
              var h = c[1];
              e.internal.newObjectDeferredBegin(h, !1);
            }
            e.internal.write(l);
          }
        if (this.outline.createNamedDestinations) {
          var g = this.internal.pages.length,
            m = [];
          for (a = 0; a < g; a++) {
            var v = e.internal.newObject();
            m.push(v);
            var N = e.internal.getPageInfo(a + 1);
            e.internal.write(
              "<< /D[" + N.objId + " 0 R /XYZ null null null]>> endobj",
            );
          }
          var p = e.internal.newObject();
          for (e.internal.write("<< /Names [ "), a = 0; a < m.length; a++)
            e.internal.write("(page_" + (a + 1) + ")" + m[a] + " 0 R");
          e.internal.write(" ] >>", "endobj"),
            (t = e.internal.newObject()),
            e.internal.write("<< /Dests " + p + " 0 R"),
            e.internal.write(">>", "endobj");
        }
      },
    ]),
      n.events.push([
        "putCatalog",
        function () {
          this.outline.root.children.length > 0 &&
            (this.internal.write(
              "/Outlines",
              this.outline.makeRef(this.outline.root),
            ),
            this.outline.createNamedDestinations &&
              this.internal.write("/Names " + t + " 0 R"));
        },
      ]),
      n.events.push([
        "initialized",
        function () {
          var e = this;
          (e.outline = { createNamedDestinations: !1, root: { children: [] } }),
            (e.outline.add = function (i, s, a) {
              var l = { title: s, options: a, children: [] };
              return i == null && (i = this.root), i.children.push(l), l;
            }),
            (e.outline.render = function () {
              return (
                (this.ctx = {}),
                (this.ctx.val = ""),
                (this.ctx.pdf = e),
                this.genIds_r(this.root),
                this.renderRoot(this.root),
                this.renderItems(this.root),
                this.ctx.val
              );
            }),
            (e.outline.genIds_r = function (i) {
              i.id = e.internal.newObjectDeferred();
              for (var s = 0; s < i.children.length; s++)
                this.genIds_r(i.children[s]);
            }),
            (e.outline.renderRoot = function (i) {
              this.objStart(i),
                this.line("/Type /Outlines"),
                i.children.length > 0 &&
                  (this.line("/First " + this.makeRef(i.children[0])),
                  this.line(
                    "/Last " + this.makeRef(i.children[i.children.length - 1]),
                  )),
                this.line("/Count " + this.count_r({ count: 0 }, i)),
                this.objEnd();
            }),
            (e.outline.renderItems = function (i) {
              for (
                var s = this.ctx.pdf.internal.getVerticalCoordinateString,
                  a = 0;
                a < i.children.length;
                a++
              ) {
                var l = i.children[a];
                this.objStart(l),
                  this.line("/Title " + this.makeString(l.title)),
                  this.line("/Parent " + this.makeRef(i)),
                  a > 0 &&
                    this.line("/Prev " + this.makeRef(i.children[a - 1])),
                  a < i.children.length - 1 &&
                    this.line("/Next " + this.makeRef(i.children[a + 1])),
                  l.children.length > 0 &&
                    (this.line("/First " + this.makeRef(l.children[0])),
                    this.line(
                      "/Last " +
                        this.makeRef(l.children[l.children.length - 1]),
                    ));
                var c = (this.count = this.count_r({ count: 0 }, l));
                if (
                  (c > 0 && this.line("/Count " + c),
                  l.options && l.options.pageNumber)
                ) {
                  var h = e.internal.getPageInfo(l.options.pageNumber);
                  this.line(
                    "/Dest [" + h.objId + " 0 R /XYZ 0 " + s(0) + " 0]",
                  );
                }
                this.objEnd();
              }
              for (var g = 0; g < i.children.length; g++)
                this.renderItems(i.children[g]);
            }),
            (e.outline.line = function (i) {
              this.ctx.val +=
                i +
                `\r
`;
            }),
            (e.outline.makeRef = function (i) {
              return i.id + " 0 R";
            }),
            (e.outline.makeString = function (i) {
              return "(" + e.internal.pdfEscape(i) + ")";
            }),
            (e.outline.objStart = function (i) {
              this.ctx.val +=
                `\r
` +
                i.id +
                ` 0 obj\r
<<\r
`;
            }),
            (e.outline.objEnd = function () {
              this.ctx.val += `>> \r
endobj\r
`;
            }),
            (e.outline.count_r = function (i, s) {
              for (var a = 0; a < s.children.length; a++)
                i.count++, this.count_r(i, s.children[a]);
              return i.count;
            });
        },
      ]);
  })(zt.API),
  (function (n) {
    var t = [192, 193, 194, 195, 196, 197, 198, 199];
    n.processJPEG = function (e, i, s, a, l, c) {
      var h,
        g = this.decode.DCT_DECODE,
        m = null;
      if (
        typeof e == "string" ||
        this.__addimage__.isArrayBuffer(e) ||
        this.__addimage__.isArrayBufferView(e)
      ) {
        switch (
          ((e = l || e),
          (e = this.__addimage__.isArrayBuffer(e) ? new Uint8Array(e) : e),
          (h = (function (v) {
            for (
              var N,
                p = 256 * v.charCodeAt(4) + v.charCodeAt(5),
                F = v.length,
                P = { width: 0, height: 0, numcomponents: 1 },
                M = 4;
              M < F;
              M += 2
            ) {
              if (((M += p), t.indexOf(v.charCodeAt(M + 1)) !== -1)) {
                (N = 256 * v.charCodeAt(M + 5) + v.charCodeAt(M + 6)),
                  (P = {
                    width: 256 * v.charCodeAt(M + 7) + v.charCodeAt(M + 8),
                    height: N,
                    numcomponents: v.charCodeAt(M + 9),
                  });
                break;
              }
              p = 256 * v.charCodeAt(M + 2) + v.charCodeAt(M + 3);
            }
            return P;
          })(
            (e = this.__addimage__.isArrayBufferView(e)
              ? this.__addimage__.arrayBufferToBinaryString(e)
              : e),
          )).numcomponents)
        ) {
          case 1:
            c = this.color_spaces.DEVICE_GRAY;
            break;
          case 4:
            c = this.color_spaces.DEVICE_CMYK;
            break;
          case 3:
            c = this.color_spaces.DEVICE_RGB;
        }
        m = {
          data: e,
          width: h.width,
          height: h.height,
          colorSpace: c,
          bitsPerComponent: 8,
          filter: g,
          index: i,
          alias: s,
        };
      }
      return m;
    };
  })(zt.API);
var Di,
  ko,
  ll,
  cl,
  fl,
  nh = (function () {
    var n, t, e;
    function i(a) {
      var l, c, h, g, m, v, N, p, F, P, M, _, E, G;
      for (
        this.data = a,
          this.pos = 8,
          this.palette = [],
          this.imgData = [],
          this.transparency = {},
          this.animation = null,
          this.text = {},
          v = null;
        ;

      ) {
        switch (
          ((l = this.readUInt32()),
          (F = function () {
            var nt, st;
            for (st = [], nt = 0; nt < 4; ++nt)
              st.push(String.fromCharCode(this.data[this.pos++]));
            return st;
          }
            .call(this)
            .join("")))
        ) {
          case "IHDR":
            (this.width = this.readUInt32()),
              (this.height = this.readUInt32()),
              (this.bits = this.data[this.pos++]),
              (this.colorType = this.data[this.pos++]),
              (this.compressionMethod = this.data[this.pos++]),
              (this.filterMethod = this.data[this.pos++]),
              (this.interlaceMethod = this.data[this.pos++]);
            break;
          case "acTL":
            this.animation = {
              numFrames: this.readUInt32(),
              numPlays: this.readUInt32() || 1 / 0,
              frames: [],
            };
            break;
          case "PLTE":
            this.palette = this.read(l);
            break;
          case "fcTL":
            v && this.animation.frames.push(v),
              (this.pos += 4),
              (v = {
                width: this.readUInt32(),
                height: this.readUInt32(),
                xOffset: this.readUInt32(),
                yOffset: this.readUInt32(),
              }),
              (m = this.readUInt16()),
              (g = this.readUInt16() || 100),
              (v.delay = (1e3 * m) / g),
              (v.disposeOp = this.data[this.pos++]),
              (v.blendOp = this.data[this.pos++]),
              (v.data = []);
            break;
          case "IDAT":
          case "fdAT":
            for (
              F === "fdAT" && ((this.pos += 4), (l -= 4)),
                a = v?.data || this.imgData,
                _ = 0;
              0 <= l ? _ < l : _ > l;
              0 <= l ? ++_ : --_
            )
              a.push(this.data[this.pos++]);
            break;
          case "tRNS":
            switch (((this.transparency = {}), this.colorType)) {
              case 3:
                if (
                  ((h = this.palette.length / 3),
                  (this.transparency.indexed = this.read(l)),
                  this.transparency.indexed.length > h)
                )
                  throw new Error("More transparent colors than palette size");
                if ((P = h - this.transparency.indexed.length) > 0)
                  for (E = 0; 0 <= P ? E < P : E > P; 0 <= P ? ++E : --E)
                    this.transparency.indexed.push(255);
                break;
              case 0:
                this.transparency.grayscale = this.read(l)[0];
                break;
              case 2:
                this.transparency.rgb = this.read(l);
            }
            break;
          case "tEXt":
            (N = (M = this.read(l)).indexOf(0)),
              (p = String.fromCharCode.apply(String, M.slice(0, N))),
              (this.text[p] = String.fromCharCode.apply(
                String,
                M.slice(N + 1),
              ));
            break;
          case "IEND":
            return (
              v && this.animation.frames.push(v),
              (this.colors = function () {
                switch (this.colorType) {
                  case 0:
                  case 3:
                  case 4:
                    return 1;
                  case 2:
                  case 6:
                    return 3;
                }
              }.call(this)),
              (this.hasAlphaChannel = (G = this.colorType) === 4 || G === 6),
              (c = this.colors + (this.hasAlphaChannel ? 1 : 0)),
              (this.pixelBitlength = this.bits * c),
              (this.colorSpace = function () {
                switch (this.colors) {
                  case 1:
                    return "DeviceGray";
                  case 3:
                    return "DeviceRGB";
                }
              }.call(this)),
              void (this.imgData = new Uint8Array(this.imgData))
            );
          default:
            this.pos += l;
        }
        if (((this.pos += 4), this.pos > this.data.length))
          throw new Error("Incomplete or corrupt PNG file");
      }
    }
    (i.prototype.read = function (a) {
      var l, c;
      for (c = [], l = 0; 0 <= a ? l < a : l > a; 0 <= a ? ++l : --l)
        c.push(this.data[this.pos++]);
      return c;
    }),
      (i.prototype.readUInt32 = function () {
        return (
          (this.data[this.pos++] << 24) |
          (this.data[this.pos++] << 16) |
          (this.data[this.pos++] << 8) |
          this.data[this.pos++]
        );
      }),
      (i.prototype.readUInt16 = function () {
        return (this.data[this.pos++] << 8) | this.data[this.pos++];
      }),
      (i.prototype.decodePixels = function (a) {
        var l = this.pixelBitlength / 8,
          c = new Uint8Array(this.width * this.height * l),
          h = 0,
          g = this;
        if ((a == null && (a = this.imgData), a.length === 0))
          return new Uint8Array(0);
        function m(v, N, p, F) {
          var P,
            M,
            _,
            E,
            G,
            nt,
            st,
            wt,
            tt,
            z,
            it,
            dt,
            k,
            I,
            W,
            T,
            ut,
            at,
            ct,
            Z,
            ft,
            pt = Math.ceil((g.width - v) / p),
            Ct = Math.ceil((g.height - N) / F),
            A = g.width == pt && g.height == Ct;
          for (
            I = l * pt,
              dt = A ? c : new Uint8Array(I * Ct),
              nt = a.length,
              k = 0,
              M = 0;
            k < Ct && h < nt;

          ) {
            switch (a[h++]) {
              case 0:
                for (E = ut = 0; ut < I; E = ut += 1) dt[M++] = a[h++];
                break;
              case 1:
                for (E = at = 0; at < I; E = at += 1)
                  (P = a[h++]),
                    (G = E < l ? 0 : dt[M - l]),
                    (dt[M++] = (P + G) % 256);
                break;
              case 2:
                for (E = ct = 0; ct < I; E = ct += 1)
                  (P = a[h++]),
                    (_ = (E - (E % l)) / l),
                    (W = k && dt[(k - 1) * I + _ * l + (E % l)]),
                    (dt[M++] = (W + P) % 256);
                break;
              case 3:
                for (E = Z = 0; Z < I; E = Z += 1)
                  (P = a[h++]),
                    (_ = (E - (E % l)) / l),
                    (G = E < l ? 0 : dt[M - l]),
                    (W = k && dt[(k - 1) * I + _ * l + (E % l)]),
                    (dt[M++] = (P + Math.floor((G + W) / 2)) % 256);
                break;
              case 4:
                for (E = ft = 0; ft < I; E = ft += 1)
                  (P = a[h++]),
                    (_ = (E - (E % l)) / l),
                    (G = E < l ? 0 : dt[M - l]),
                    k === 0
                      ? (W = T = 0)
                      : ((W = dt[(k - 1) * I + _ * l + (E % l)]),
                        (T = _ && dt[(k - 1) * I + (_ - 1) * l + (E % l)])),
                    (st = G + W - T),
                    (wt = Math.abs(st - G)),
                    (z = Math.abs(st - W)),
                    (it = Math.abs(st - T)),
                    (tt = wt <= z && wt <= it ? G : z <= it ? W : T),
                    (dt[M++] = (P + tt) % 256);
                break;
              default:
                throw new Error("Invalid filter algorithm: " + a[h - 1]);
            }
            if (!A) {
              var j = ((N + k * F) * g.width + v) * l,
                B = k * I;
              for (E = 0; E < pt; E += 1) {
                for (var R = 0; R < l; R += 1) c[j++] = dt[B++];
                j += (p - 1) * l;
              }
            }
            k++;
          }
        }
        return (
          (a = Ef(a)),
          g.interlaceMethod == 1
            ? (m(0, 0, 8, 8),
              m(4, 0, 8, 8),
              m(0, 4, 4, 8),
              m(2, 0, 4, 4),
              m(0, 2, 2, 4),
              m(1, 0, 2, 2),
              m(0, 1, 1, 2))
            : m(0, 0, 1, 1),
          c
        );
      }),
      (i.prototype.decodePalette = function () {
        var a, l, c, h, g, m, v, N, p;
        for (
          c = this.palette,
            m = this.transparency.indexed || [],
            g = new Uint8Array((m.length || 0) + c.length),
            h = 0,
            a = 0,
            l = v = 0,
            N = c.length;
          v < N;
          l = v += 3
        )
          (g[h++] = c[l]),
            (g[h++] = c[l + 1]),
            (g[h++] = c[l + 2]),
            (g[h++] = (p = m[a++]) != null ? p : 255);
        return g;
      }),
      (i.prototype.copyToImageData = function (a, l) {
        var c, h, g, m, v, N, p, F, P, M, _;
        if (
          ((h = this.colors),
          (P = null),
          (c = this.hasAlphaChannel),
          this.palette.length &&
            ((P =
              (_ = this._decodedPalette) != null
                ? _
                : (this._decodedPalette = this.decodePalette())),
            (h = 4),
            (c = !0)),
          (F = (g = a.data || a).length),
          (v = P || l),
          (m = N = 0),
          h === 1)
        )
          for (; m < F; )
            (p = P ? 4 * l[m / 4] : N),
              (M = v[p++]),
              (g[m++] = M),
              (g[m++] = M),
              (g[m++] = M),
              (g[m++] = c ? v[p++] : 255),
              (N = p);
        else
          for (; m < F; )
            (p = P ? 4 * l[m / 4] : N),
              (g[m++] = v[p++]),
              (g[m++] = v[p++]),
              (g[m++] = v[p++]),
              (g[m++] = c ? v[p++] : 255),
              (N = p);
      }),
      (i.prototype.decode = function () {
        var a;
        return (
          (a = new Uint8Array(this.width * this.height * 4)),
          this.copyToImageData(a, this.decodePixels()),
          a
        );
      });
    var s = function () {
      if (Object.prototype.toString.call(Ht) === "[object Window]") {
        try {
          (t = Ht.document.createElement("canvas")), (e = t.getContext("2d"));
        } catch {
          return !1;
        }
        return !0;
      }
      return !1;
    };
    return (
      s(),
      (n = function (a) {
        var l;
        if (s() === !0)
          return (
            (e.width = a.width),
            (e.height = a.height),
            e.clearRect(0, 0, a.width, a.height),
            e.putImageData(a, 0, 0),
            ((l = new Image()).src = t.toDataURL()),
            l
          );
        throw new Error(
          "This method requires a Browser with Canvas-capability.",
        );
      }),
      (i.prototype.decodeFrames = function (a) {
        var l, c, h, g, m, v, N, p;
        if (this.animation) {
          for (
            p = [], c = m = 0, v = (N = this.animation.frames).length;
            m < v;
            c = ++m
          )
            (l = N[c]),
              (h = a.createImageData(l.width, l.height)),
              (g = this.decodePixels(new Uint8Array(l.data))),
              this.copyToImageData(h, g),
              (l.imageData = h),
              p.push((l.image = n(h)));
          return p;
        }
      }),
      (i.prototype.renderFrame = function (a, l) {
        var c, h, g;
        return (
          (c = (h = this.animation.frames)[l]),
          (g = h[l - 1]),
          l === 0 && a.clearRect(0, 0, this.width, this.height),
          g?.disposeOp === 1
            ? a.clearRect(g.xOffset, g.yOffset, g.width, g.height)
            : g?.disposeOp === 2 &&
              a.putImageData(g.imageData, g.xOffset, g.yOffset),
          c.blendOp === 0 &&
            a.clearRect(c.xOffset, c.yOffset, c.width, c.height),
          a.drawImage(c.image, c.xOffset, c.yOffset)
        );
      }),
      (i.prototype.animate = function (a) {
        var l,
          c,
          h,
          g,
          m,
          v,
          N = this;
        return (
          (c = 0),
          (v = this.animation),
          (g = v.numFrames),
          (h = v.frames),
          (m = v.numPlays),
          (l = function () {
            var p, F;
            if (
              ((p = c++ % g),
              (F = h[p]),
              N.renderFrame(a, p),
              g > 1 && c / g < m)
            )
              return (N.animation._timeout = setTimeout(l, F.delay));
          })()
        );
      }),
      (i.prototype.stopAnimation = function () {
        var a;
        return clearTimeout((a = this.animation) != null ? a._timeout : void 0);
      }),
      (i.prototype.render = function (a) {
        var l, c;
        return (
          a._png && a._png.stopAnimation(),
          (a._png = this),
          (a.width = this.width),
          (a.height = this.height),
          (l = a.getContext("2d")),
          this.animation
            ? (this.decodeFrames(l), this.animate(l))
            : ((c = l.createImageData(this.width, this.height)),
              this.copyToImageData(c, this.decodePixels()),
              l.putImageData(c, 0, 0))
        );
      }),
      i
    );
  })();
/**
 * @license
 *
 * Copyright (c) 2014 James Robb, https://github.com/jamesbrobb
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * ====================================================================
 *//**
 * @license
 * (c) Dean McNamee <dean@gmail.com>, 2013.
 *
 * https://github.com/deanm/omggif
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * omggif is a JavaScript implementation of a GIF 89a encoder and decoder,
 * including animation and compression.  It does not rely on any specific
 * underlying system, so should run in the browser, Node, or Plask.
 */ function rh(n) {
  var t = 0;
  if (
    n[t++] !== 71 ||
    n[t++] !== 73 ||
    n[t++] !== 70 ||
    n[t++] !== 56 ||
    ((n[t++] + 1) & 253) != 56 ||
    n[t++] !== 97
  )
    throw new Error("Invalid GIF 87a/89a header.");
  var e = n[t++] | (n[t++] << 8),
    i = n[t++] | (n[t++] << 8),
    s = n[t++],
    a = s >> 7,
    l = 1 << ((7 & s) + 1);
  n[t++], n[t++];
  var c = null,
    h = null;
  a && ((c = t), (h = l), (t += 3 * l));
  var g = !0,
    m = [],
    v = 0,
    N = null,
    p = 0,
    F = null;
  for (this.width = e, this.height = i; g && t < n.length; )
    switch (n[t++]) {
      case 33:
        switch (n[t++]) {
          case 255:
            if (
              n[t] !== 11 ||
              (n[t + 1] == 78 &&
                n[t + 2] == 69 &&
                n[t + 3] == 84 &&
                n[t + 4] == 83 &&
                n[t + 5] == 67 &&
                n[t + 6] == 65 &&
                n[t + 7] == 80 &&
                n[t + 8] == 69 &&
                n[t + 9] == 50 &&
                n[t + 10] == 46 &&
                n[t + 11] == 48 &&
                n[t + 12] == 3 &&
                n[t + 13] == 1 &&
                n[t + 16] == 0)
            )
              (t += 14), (F = n[t++] | (n[t++] << 8)), t++;
            else
              for (t += 12; ; ) {
                if (!((k = n[t++]) >= 0)) throw Error("Invalid block size");
                if (k === 0) break;
                t += k;
              }
            break;
          case 249:
            if (n[t++] !== 4 || n[t + 4] !== 0)
              throw new Error("Invalid graphics extension block.");
            var P = n[t++];
            (v = n[t++] | (n[t++] << 8)),
              (N = n[t++]),
              !(1 & P) && (N = null),
              (p = (P >> 2) & 7),
              t++;
            break;
          case 254:
            for (;;) {
              if (!((k = n[t++]) >= 0)) throw Error("Invalid block size");
              if (k === 0) break;
              t += k;
            }
            break;
          default:
            throw new Error(
              "Unknown graphic control label: 0x" + n[t - 1].toString(16),
            );
        }
        break;
      case 44:
        var M = n[t++] | (n[t++] << 8),
          _ = n[t++] | (n[t++] << 8),
          E = n[t++] | (n[t++] << 8),
          G = n[t++] | (n[t++] << 8),
          nt = n[t++],
          st = (nt >> 6) & 1,
          wt = 1 << ((7 & nt) + 1),
          tt = c,
          z = h,
          it = !1;
        nt >> 7 && ((it = !0), (tt = t), (z = wt), (t += 3 * wt));
        var dt = t;
        for (t++; ; ) {
          var k;
          if (!((k = n[t++]) >= 0)) throw Error("Invalid block size");
          if (k === 0) break;
          t += k;
        }
        m.push({
          x: M,
          y: _,
          width: E,
          height: G,
          has_local_palette: it,
          palette_offset: tt,
          palette_size: z,
          data_offset: dt,
          data_length: t - dt,
          transparent_index: N,
          interlaced: !!st,
          delay: v,
          disposal: p,
        });
        break;
      case 59:
        g = !1;
        break;
      default:
        throw new Error("Unknown gif block: 0x" + n[t - 1].toString(16));
    }
  (this.numFrames = function () {
    return m.length;
  }),
    (this.loopCount = function () {
      return F;
    }),
    (this.frameInfo = function (I) {
      if (I < 0 || I >= m.length) throw new Error("Frame index out of range.");
      return m[I];
    }),
    (this.decodeAndBlitFrameBGRA = function (I, W) {
      var T = this.frameInfo(I),
        ut = T.width * T.height,
        at = new Uint8Array(ut);
      hl(n, T.data_offset, at, ut);
      var ct = T.palette_offset,
        Z = T.transparent_index;
      Z === null && (Z = 256);
      var ft = T.width,
        pt = e - ft,
        Ct = ft,
        A = 4 * (T.y * e + T.x),
        j = 4 * ((T.y + T.height) * e + T.x),
        B = A,
        R = 4 * pt;
      T.interlaced === !0 && (R += 4 * e * 7);
      for (var Y = 8, Q = 0, et = at.length; Q < et; ++Q) {
        var rt = at[Q];
        if (
          (Ct === 0 &&
            ((Ct = ft),
            (B += R) >= j &&
              ((R = 4 * pt + 4 * e * (Y - 1)),
              (B = A + (ft + pt) * (Y << 1)),
              (Y >>= 1))),
          rt === Z)
        )
          B += 4;
        else {
          var Nt = n[ct + 3 * rt],
            At = n[ct + 3 * rt + 1],
            It = n[ct + 3 * rt + 2];
          (W[B++] = It), (W[B++] = At), (W[B++] = Nt), (W[B++] = 255);
        }
        --Ct;
      }
    }),
    (this.decodeAndBlitFrameRGBA = function (I, W) {
      var T = this.frameInfo(I),
        ut = T.width * T.height,
        at = new Uint8Array(ut);
      hl(n, T.data_offset, at, ut);
      var ct = T.palette_offset,
        Z = T.transparent_index;
      Z === null && (Z = 256);
      var ft = T.width,
        pt = e - ft,
        Ct = ft,
        A = 4 * (T.y * e + T.x),
        j = 4 * ((T.y + T.height) * e + T.x),
        B = A,
        R = 4 * pt;
      T.interlaced === !0 && (R += 4 * e * 7);
      for (var Y = 8, Q = 0, et = at.length; Q < et; ++Q) {
        var rt = at[Q];
        if (
          (Ct === 0 &&
            ((Ct = ft),
            (B += R) >= j &&
              ((R = 4 * pt + 4 * e * (Y - 1)),
              (B = A + (ft + pt) * (Y << 1)),
              (Y >>= 1))),
          rt === Z)
        )
          B += 4;
        else {
          var Nt = n[ct + 3 * rt],
            At = n[ct + 3 * rt + 1],
            It = n[ct + 3 * rt + 2];
          (W[B++] = Nt), (W[B++] = At), (W[B++] = It), (W[B++] = 255);
        }
        --Ct;
      }
    });
}
function hl(n, t, e, i) {
  for (
    var s = n[t++],
      a = 1 << s,
      l = a + 1,
      c = l + 1,
      h = s + 1,
      g = (1 << h) - 1,
      m = 0,
      v = 0,
      N = 0,
      p = n[t++],
      F = new Int32Array(4096),
      P = null;
    ;

  ) {
    for (; m < 16 && p !== 0; )
      (v |= n[t++] << m), (m += 8), p === 1 ? (p = n[t++]) : --p;
    if (m < h) break;
    var M = v & g;
    if (((v >>= h), (m -= h), M !== a)) {
      if (M === l) break;
      for (var _ = M < c ? M : P, E = 0, G = _; G > a; ) (G = F[G] >> 8), ++E;
      var nt = G;
      if (N + E + (_ !== M ? 1 : 0) > i)
        return void be.log("Warning, gif stream longer than expected.");
      e[N++] = nt;
      var st = (N += E);
      for (_ !== M && (e[N++] = nt), G = _; E--; )
        (G = F[G]), (e[--st] = 255 & G), (G >>= 8);
      P !== null &&
        c < 4096 &&
        ((F[c++] = (P << 8) | nt),
        c >= g + 1 && h < 12 && (++h, (g = (g << 1) | 1))),
        (P = M);
    } else (c = l + 1), (g = (1 << (h = s + 1)) - 1), (P = null);
  }
  return N !== i && be.log("Warning, gif stream shorter than expected."), e;
}
/**
 * @license
  Copyright (c) 2008, Adobe Systems Incorporated
  All rights reserved.

  Redistribution and use in source and binary forms, with or without 
  modification, are permitted provided that the following conditions are
  met:

  * Redistributions of source code must retain the above copyright notice, 
    this list of conditions and the following disclaimer.
  
  * Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in the 
    documentation and/or other materials provided with the distribution.
  
  * Neither the name of Adobe Systems Incorporated nor the names of its 
    contributors may be used to endorse or promote products derived from 
    this software without specific prior written permission.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
  IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
  THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
  PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR 
  CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
  PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
  SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/ function $s(n) {
  var t,
    e,
    i,
    s,
    a,
    l = Math.floor,
    c = new Array(64),
    h = new Array(64),
    g = new Array(64),
    m = new Array(64),
    v = new Array(65535),
    N = new Array(65535),
    p = new Array(64),
    F = new Array(64),
    P = [],
    M = 0,
    _ = 7,
    E = new Array(64),
    G = new Array(64),
    nt = new Array(64),
    st = new Array(256),
    wt = new Array(2048),
    tt = [
      0, 1, 5, 6, 14, 15, 27, 28, 2, 4, 7, 13, 16, 26, 29, 42, 3, 8, 12, 17, 25,
      30, 41, 43, 9, 11, 18, 24, 31, 40, 44, 53, 10, 19, 23, 32, 39, 45, 52, 54,
      20, 22, 33, 38, 46, 51, 55, 60, 21, 34, 37, 47, 50, 56, 59, 61, 35, 36,
      48, 49, 57, 58, 62, 63,
    ],
    z = [0, 0, 1, 5, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    it = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    dt = [0, 0, 2, 1, 3, 3, 2, 4, 3, 5, 5, 4, 4, 0, 0, 1, 125],
    k = [
      1, 2, 3, 0, 4, 17, 5, 18, 33, 49, 65, 6, 19, 81, 97, 7, 34, 113, 20, 50,
      129, 145, 161, 8, 35, 66, 177, 193, 21, 82, 209, 240, 36, 51, 98, 114,
      130, 9, 10, 22, 23, 24, 25, 26, 37, 38, 39, 40, 41, 42, 52, 53, 54, 55,
      56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89,
      90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120,
      121, 122, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150,
      151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179,
      180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201,
      202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 225, 226, 227, 228, 229,
      230, 231, 232, 233, 234, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250,
    ],
    I = [0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    W = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    T = [0, 0, 2, 1, 2, 4, 4, 3, 4, 7, 5, 4, 4, 0, 1, 2, 119],
    ut = [
      0, 1, 2, 3, 17, 4, 5, 33, 49, 6, 18, 65, 81, 7, 97, 113, 19, 34, 50, 129,
      8, 20, 66, 145, 161, 177, 193, 9, 35, 51, 82, 240, 21, 98, 114, 209, 10,
      22, 36, 52, 225, 37, 241, 23, 24, 25, 26, 38, 39, 40, 41, 42, 53, 54, 55,
      56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89,
      90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120,
      121, 122, 130, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149,
      150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178,
      179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200,
      201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 226, 227, 228, 229,
      230, 231, 232, 233, 234, 242, 243, 244, 245, 246, 247, 248, 249, 250,
    ];
  function at(A, j) {
    for (var B = 0, R = 0, Y = new Array(), Q = 1; Q <= 16; Q++) {
      for (var et = 1; et <= A[Q]; et++)
        (Y[j[R]] = []), (Y[j[R]][0] = B), (Y[j[R]][1] = Q), R++, B++;
      B *= 2;
    }
    return Y;
  }
  function ct(A) {
    for (var j = A[0], B = A[1] - 1; B >= 0; )
      j & (1 << B) && (M |= 1 << _),
        B--,
        --_ < 0 && (M == 255 ? (Z(255), Z(0)) : Z(M), (_ = 7), (M = 0));
  }
  function Z(A) {
    P.push(A);
  }
  function ft(A) {
    Z((A >> 8) & 255), Z(255 & A);
  }
  function pt(A, j, B, R, Y) {
    for (
      var Q,
        et = Y[0],
        rt = Y[240],
        Nt = (function (xt, Lt) {
          var Ft,
            kt,
            qt,
            Gt,
            Qt,
            ee,
            ae,
            pe,
            Wt,
            ne,
            jt = 0;
          for (Wt = 0; Wt < 8; ++Wt) {
            (Ft = xt[jt]),
              (kt = xt[jt + 1]),
              (qt = xt[jt + 2]),
              (Gt = xt[jt + 3]),
              (Qt = xt[jt + 4]),
              (ee = xt[jt + 5]),
              (ae = xt[jt + 6]);
            var Xe = Ft + (pe = xt[jt + 7]),
              se = Ft - pe,
              Fn = kt + ae,
              me = kt - ae,
              Ae = qt + ee,
              Jn = qt - ee,
              le = Gt + Qt,
              Ur = Gt - Qt,
              Se = Xe + le,
              jn = Xe - le,
              lr = Fn + Ae,
              _e = Fn - Ae;
            (xt[jt] = Se + lr), (xt[jt + 4] = Se - lr);
            var $t = 0.707106781 * (_e + jn);
            (xt[jt + 2] = jn + $t), (xt[jt + 6] = jn - $t);
            var ce = 0.382683433 * ((Se = Ur + Jn) - (_e = me + se)),
              Hr = 0.5411961 * Se + ce,
              $e = 1.306562965 * _e + ce,
              Xn = 0.707106781 * (lr = Jn + me),
              Kn = se + Xn,
              Rt = se - Xn;
            (xt[jt + 5] = Rt + Hr),
              (xt[jt + 3] = Rt - Hr),
              (xt[jt + 1] = Kn + $e),
              (xt[jt + 7] = Kn - $e),
              (jt += 8);
          }
          for (jt = 0, Wt = 0; Wt < 8; ++Wt) {
            (Ft = xt[jt]),
              (kt = xt[jt + 8]),
              (qt = xt[jt + 16]),
              (Gt = xt[jt + 24]),
              (Qt = xt[jt + 32]),
              (ee = xt[jt + 40]),
              (ae = xt[jt + 48]);
            var On = Ft + (pe = xt[jt + 56]),
              Zn = Ft - pe,
              ln = kt + ae,
              ze = kt - ae,
              Be = qt + ee,
              vn = qt - ee,
              ui = Gt + Qt,
              cr = Gt - Qt,
              En = On + ui,
              Mn = On - ui,
              Bn = ln + Be,
              Qn = ln - Be;
            (xt[jt] = En + Bn), (xt[jt + 32] = En - Bn);
            var Nn = 0.707106781 * (Qn + Mn);
            (xt[jt + 16] = Mn + Nn), (xt[jt + 48] = Mn - Nn);
            var tr = 0.382683433 * ((En = cr + vn) - (Qn = ze + Zn)),
              Wr = 0.5411961 * En + tr,
              li = 1.306562965 * Qn + tr,
              ci = 0.707106781 * (Bn = vn + ze),
              fi = Zn + ci,
              hi = Zn - ci;
            (xt[jt + 40] = hi + Wr),
              (xt[jt + 24] = hi - Wr),
              (xt[jt + 8] = fi + li),
              (xt[jt + 56] = fi - li),
              jt++;
          }
          for (Wt = 0; Wt < 64; ++Wt)
            (ne = xt[Wt] * Lt[Wt]),
              (p[Wt] = ne > 0 ? (ne + 0.5) | 0 : (ne - 0.5) | 0);
          return p;
        })(A, j),
        At = 0;
      At < 64;
      ++At
    )
      F[tt[At]] = Nt[At];
    var It = F[0] - B;
    (B = F[0]), It == 0 ? ct(R[0]) : (ct(R[N[(Q = 32767 + It)]]), ct(v[Q]));
    for (var _t = 63; _t > 0 && F[_t] == 0; ) _t--;
    if (_t == 0) return ct(et), B;
    for (var Ut, ht = 1; ht <= _t; ) {
      for (var q = ht; F[ht] == 0 && ht <= _t; ) ++ht;
      var Xt = ht - q;
      if (Xt >= 16) {
        Ut = Xt >> 4;
        for (var Bt = 1; Bt <= Ut; ++Bt) ct(rt);
        Xt &= 15;
      }
      (Q = 32767 + F[ht]), ct(Y[(Xt << 4) + N[Q]]), ct(v[Q]), ht++;
    }
    return _t != 63 && ct(et), B;
  }
  function Ct(A) {
    (A = Math.min(Math.max(A, 1), 100)),
      a != A &&
        ((function (j) {
          for (
            var B = [
                16, 11, 10, 16, 24, 40, 51, 61, 12, 12, 14, 19, 26, 58, 60, 55,
                14, 13, 16, 24, 40, 57, 69, 56, 14, 17, 22, 29, 51, 87, 80, 62,
                18, 22, 37, 56, 68, 109, 103, 77, 24, 35, 55, 64, 81, 104, 113,
                92, 49, 64, 78, 87, 103, 121, 120, 101, 72, 92, 95, 98, 112,
                100, 103, 99,
              ],
              R = 0;
            R < 64;
            R++
          ) {
            var Y = l((B[R] * j + 50) / 100);
            (Y = Math.min(Math.max(Y, 1), 255)), (c[tt[R]] = Y);
          }
          for (
            var Q = [
                17, 18, 24, 47, 99, 99, 99, 99, 18, 21, 26, 66, 99, 99, 99, 99,
                24, 26, 56, 99, 99, 99, 99, 99, 47, 66, 99, 99, 99, 99, 99, 99,
                99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99,
                99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99,
              ],
              et = 0;
            et < 64;
            et++
          ) {
            var rt = l((Q[et] * j + 50) / 100);
            (rt = Math.min(Math.max(rt, 1), 255)), (h[tt[et]] = rt);
          }
          for (
            var Nt = [
                1, 1.387039845, 1.306562965, 1.175875602, 1, 0.785694958,
                0.5411961, 0.275899379,
              ],
              At = 0,
              It = 0;
            It < 8;
            It++
          )
            for (var _t = 0; _t < 8; _t++)
              (g[At] = 1 / (c[tt[At]] * Nt[It] * Nt[_t] * 8)),
                (m[At] = 1 / (h[tt[At]] * Nt[It] * Nt[_t] * 8)),
                At++;
        })(A < 50 ? Math.floor(5e3 / A) : Math.floor(200 - 2 * A)),
        (a = A));
  }
  (this.encode = function (A, j) {
    j && Ct(j),
      (P = new Array()),
      (M = 0),
      (_ = 7),
      ft(65496),
      ft(65504),
      ft(16),
      Z(74),
      Z(70),
      Z(73),
      Z(70),
      Z(0),
      Z(1),
      Z(1),
      Z(0),
      ft(1),
      ft(1),
      Z(0),
      Z(0),
      (function () {
        ft(65499), ft(132), Z(0);
        for (var kt = 0; kt < 64; kt++) Z(c[kt]);
        Z(1);
        for (var qt = 0; qt < 64; qt++) Z(h[qt]);
      })(),
      (function (kt, qt) {
        ft(65472),
          ft(17),
          Z(8),
          ft(qt),
          ft(kt),
          Z(3),
          Z(1),
          Z(17),
          Z(0),
          Z(2),
          Z(17),
          Z(1),
          Z(3),
          Z(17),
          Z(1);
      })(A.width, A.height),
      (function () {
        ft(65476), ft(418), Z(0);
        for (var kt = 0; kt < 16; kt++) Z(z[kt + 1]);
        for (var qt = 0; qt <= 11; qt++) Z(it[qt]);
        Z(16);
        for (var Gt = 0; Gt < 16; Gt++) Z(dt[Gt + 1]);
        for (var Qt = 0; Qt <= 161; Qt++) Z(k[Qt]);
        Z(1);
        for (var ee = 0; ee < 16; ee++) Z(I[ee + 1]);
        for (var ae = 0; ae <= 11; ae++) Z(W[ae]);
        Z(17);
        for (var pe = 0; pe < 16; pe++) Z(T[pe + 1]);
        for (var Wt = 0; Wt <= 161; Wt++) Z(ut[Wt]);
      })(),
      ft(65498),
      ft(12),
      Z(3),
      Z(1),
      Z(0),
      Z(2),
      Z(17),
      Z(3),
      Z(17),
      Z(0),
      Z(63),
      Z(0);
    var B = 0,
      R = 0,
      Y = 0;
    (M = 0), (_ = 7), (this.encode.displayName = "_encode_");
    for (
      var Q,
        et,
        rt,
        Nt,
        At,
        It,
        _t,
        Ut,
        ht,
        q = A.data,
        Xt = A.width,
        Bt = A.height,
        xt = 4 * Xt,
        Lt = 0;
      Lt < Bt;

    ) {
      for (Q = 0; Q < xt; ) {
        for (At = xt * Lt + Q, _t = -1, Ut = 0, ht = 0; ht < 64; ht++)
          (It = At + (Ut = ht >> 3) * xt + (_t = 4 * (7 & ht))),
            Lt + Ut >= Bt && (It -= xt * (Lt + 1 + Ut - Bt)),
            Q + _t >= xt && (It -= Q + _t - xt + 4),
            (et = q[It++]),
            (rt = q[It++]),
            (Nt = q[It++]),
            (E[ht] =
              ((wt[et] + wt[(rt + 256) >> 0] + wt[(Nt + 512) >> 0]) >> 16) -
              128),
            (G[ht] =
              ((wt[(et + 768) >> 0] +
                wt[(rt + 1024) >> 0] +
                wt[(Nt + 1280) >> 0]) >>
                16) -
              128),
            (nt[ht] =
              ((wt[(et + 1280) >> 0] +
                wt[(rt + 1536) >> 0] +
                wt[(Nt + 1792) >> 0]) >>
                16) -
              128);
        (B = pt(E, g, B, t, i)),
          (R = pt(G, m, R, e, s)),
          (Y = pt(nt, m, Y, e, s)),
          (Q += 32);
      }
      Lt += 8;
    }
    if (_ >= 0) {
      var Ft = [];
      (Ft[1] = _ + 1), (Ft[0] = (1 << (_ + 1)) - 1), ct(Ft);
    }
    return ft(65497), new Uint8Array(P);
  }),
    (n = n || 50),
    (function () {
      for (var A = String.fromCharCode, j = 0; j < 256; j++) st[j] = A(j);
    })(),
    (t = at(z, it)),
    (e = at(I, W)),
    (i = at(dt, k)),
    (s = at(T, ut)),
    (function () {
      for (var A = 1, j = 2, B = 1; B <= 15; B++) {
        for (var R = A; R < j; R++)
          (N[32767 + R] = B),
            (v[32767 + R] = []),
            (v[32767 + R][1] = B),
            (v[32767 + R][0] = R);
        for (var Y = -(j - 1); Y <= -A; Y++)
          (N[32767 + Y] = B),
            (v[32767 + Y] = []),
            (v[32767 + Y][1] = B),
            (v[32767 + Y][0] = j - 1 + Y);
        (A <<= 1), (j <<= 1);
      }
    })(),
    (function () {
      for (var A = 0; A < 256; A++)
        (wt[A] = 19595 * A),
          (wt[(A + 256) >> 0] = 38470 * A),
          (wt[(A + 512) >> 0] = 7471 * A + 32768),
          (wt[(A + 768) >> 0] = -11059 * A),
          (wt[(A + 1024) >> 0] = -21709 * A),
          (wt[(A + 1280) >> 0] = 32768 * A + 8421375),
          (wt[(A + 1536) >> 0] = -27439 * A),
          (wt[(A + 1792) >> 0] = -5329 * A);
    })(),
    Ct(n);
}
/**
 * @license
 * Copyright (c) 2017 Aras Abbasi
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */ function Hn(n, t) {
  if (
    ((this.pos = 0),
    (this.buffer = n),
    (this.datav = new DataView(n.buffer)),
    (this.is_with_alpha = !!t),
    (this.bottom_up = !0),
    (this.flag =
      String.fromCharCode(this.buffer[0]) +
      String.fromCharCode(this.buffer[1])),
    (this.pos += 2),
    ["BM", "BA", "CI", "CP", "IC", "PT"].indexOf(this.flag) === -1)
  )
    throw new Error("Invalid BMP File");
  this.parseHeader(), this.parseBGR();
}
function dl(n) {
  function t(z) {
    if (!z) throw Error("assert :P");
  }
  function e(z, it, dt) {
    for (var k = 0; 4 > k; k++) if (z[it + k] != dt.charCodeAt(k)) return !0;
    return !1;
  }
  function i(z, it, dt, k, I) {
    for (var W = 0; W < I; W++) z[it + W] = dt[k + W];
  }
  function s(z, it, dt, k) {
    for (var I = 0; I < k; I++) z[it + I] = dt;
  }
  function a(z) {
    return new Int32Array(z);
  }
  function l(z, it) {
    for (var dt = [], k = 0; k < z; k++) dt.push(new it());
    return dt;
  }
  function c(z, it) {
    var dt = [];
    return (
      (function k(I, W, T) {
        for (
          var ut = T[W], at = 0;
          at < ut &&
          (I.push(T.length > W + 1 ? [] : new it()), !(T.length < W + 1));
          at++
        )
          k(I[at], W + 1, T);
      })(dt, 0, z),
      dt
    );
  }
  var h = function () {
    var z = this;
    function it(r, o) {
      for (var f = (1 << (o - 1)) >>> 0; r & f; ) f >>>= 1;
      return f ? (r & (f - 1)) + f : r;
    }
    function dt(r, o, f, d, b) {
      t(!(d % f));
      do r[o + (d -= f)] = b;
      while (0 < d);
    }
    function k(r, o, f, d, b) {
      if ((t(2328 >= b), 512 >= b)) var w = a(512);
      else if ((w = a(b)) == null) return 0;
      return (function (x, L, S, C, U, X) {
        var K,
          $,
          vt = L,
          ot = 1 << S,
          H = a(16),
          V = a(16);
        for (
          t(U != 0), t(C != null), t(x != null), t(0 < S), $ = 0;
          $ < U;
          ++$
        ) {
          if (15 < C[$]) return 0;
          ++H[C[$]];
        }
        if (H[0] == U) return 0;
        for (V[1] = 0, K = 1; 15 > K; ++K) {
          if (H[K] > 1 << K) return 0;
          V[K + 1] = V[K] + H[K];
        }
        for ($ = 0; $ < U; ++$) (K = C[$]), 0 < C[$] && (X[V[K]++] = $);
        if (V[15] == 1)
          return (
            ((C = new I()).g = 0), (C.value = X[0]), dt(x, vt, 1, ot, C), ot
          );
        var gt,
          bt = -1,
          mt = ot - 1,
          Et = 0,
          St = 1,
          Dt = 1,
          Pt = 1 << S;
        for ($ = 0, K = 1, U = 2; K <= S; ++K, U <<= 1) {
          if (((St += Dt <<= 1), 0 > (Dt -= H[K]))) return 0;
          for (; 0 < H[K]; --H[K])
            ((C = new I()).g = K),
              (C.value = X[$++]),
              dt(x, vt + Et, U, Pt, C),
              (Et = it(Et, K));
        }
        for (K = S + 1, U = 2; 15 >= K; ++K, U <<= 1) {
          if (((St += Dt <<= 1), 0 > (Dt -= H[K]))) return 0;
          for (; 0 < H[K]; --H[K]) {
            if (((C = new I()), (Et & mt) != bt)) {
              for (
                vt += Pt, gt = 1 << ((bt = K) - S);
                15 > bt && !(0 >= (gt -= H[bt]));

              )
                ++bt, (gt <<= 1);
              (ot += Pt = 1 << (gt = bt - S)),
                (x[L + (bt = Et & mt)].g = gt + S),
                (x[L + bt].value = vt - L - bt);
            }
            (C.g = K - S),
              (C.value = X[$++]),
              dt(x, vt + (Et >> S), U, Pt, C),
              (Et = it(Et, K));
          }
        }
        return St != 2 * V[15] - 1 ? 0 : ot;
      })(r, o, f, d, b, w);
    }
    function I() {
      this.value = this.g = 0;
    }
    function W() {
      this.value = this.g = 0;
    }
    function T() {
      (this.G = l(5, I)),
        (this.H = a(5)),
        (this.jc = this.Qb = this.qb = this.nd = 0),
        (this.pd = l(Ye, W));
    }
    function ut(r, o, f, d) {
      t(r != null),
        t(o != null),
        t(2147483648 > d),
        (r.Ca = 254),
        (r.I = 0),
        (r.b = -8),
        (r.Ka = 0),
        (r.oa = o),
        (r.pa = f),
        (r.Jd = o),
        (r.Yc = f + d),
        (r.Zc = 4 <= d ? f + d - 4 + 1 : f),
        Q(r);
    }
    function at(r, o) {
      for (var f = 0; 0 < o--; ) f |= rt(r, 128) << o;
      return f;
    }
    function ct(r, o) {
      var f = at(r, o);
      return et(r) ? -f : f;
    }
    function Z(r, o, f, d) {
      var b,
        w = 0;
      for (
        t(r != null),
          t(o != null),
          t(4294967288 > d),
          r.Sb = d,
          r.Ra = 0,
          r.u = 0,
          r.h = 0,
          4 < d && (d = 4),
          b = 0;
        b < d;
        ++b
      )
        w += o[f + b] << (8 * b);
      (r.Ra = w), (r.bb = d), (r.oa = o), (r.pa = f);
    }
    function ft(r) {
      for (; 8 <= r.u && r.bb < r.Sb; )
        (r.Ra >>>= 8),
          (r.Ra += (r.oa[r.pa + r.bb] << (Pi - 8)) >>> 0),
          ++r.bb,
          (r.u -= 8);
      B(r) && ((r.h = 1), (r.u = 0));
    }
    function pt(r, o) {
      if ((t(0 <= o), !r.h && o <= _i)) {
        var f = j(r) & Si[o];
        return (r.u += o), ft(r), f;
      }
      return (r.h = 1), (r.u = 0);
    }
    function Ct() {
      (this.b = this.Ca = this.I = 0),
        (this.oa = []),
        (this.pa = 0),
        (this.Jd = []),
        (this.Yc = 0),
        (this.Zc = []),
        (this.Ka = 0);
    }
    function A() {
      (this.Ra = 0),
        (this.oa = []),
        (this.h = this.u = this.bb = this.Sb = this.pa = 0);
    }
    function j(r) {
      return (r.Ra >>> (r.u & (Pi - 1))) >>> 0;
    }
    function B(r) {
      return t(r.bb <= r.Sb), r.h || (r.bb == r.Sb && r.u > Pi);
    }
    function R(r, o) {
      (r.u = o), (r.h = B(r));
    }
    function Y(r) {
      r.u >= ha && (t(r.u >= ha), ft(r));
    }
    function Q(r) {
      t(r != null && r.oa != null),
        r.pa < r.Zc
          ? ((r.I = (r.oa[r.pa++] | (r.I << 8)) >>> 0), (r.b += 8))
          : (t(r != null && r.oa != null),
            r.pa < r.Yc
              ? ((r.b += 8), (r.I = r.oa[r.pa++] | (r.I << 8)))
              : r.Ka
                ? (r.b = 0)
                : ((r.I <<= 8), (r.b += 8), (r.Ka = 1)));
    }
    function et(r) {
      return at(r, 1);
    }
    function rt(r, o) {
      var f = r.Ca;
      0 > r.b && Q(r);
      var d = r.b,
        b = (f * o) >>> 8,
        w = (r.I >>> d > b) + 0;
      for (
        w ? ((f -= b), (r.I -= ((b + 1) << d) >>> 0)) : (f = b + 1),
          d = f,
          b = 0;
        256 <= d;

      )
        (b += 8), (d >>= 8);
      return (d = 7 ^ (b + fn[d])), (r.b -= d), (r.Ca = (f << d) - 1), w;
    }
    function Nt(r, o, f) {
      (r[o + 0] = (f >> 24) & 255),
        (r[o + 1] = (f >> 16) & 255),
        (r[o + 2] = (f >> 8) & 255),
        (r[o + 3] = (f >> 0) & 255);
    }
    function At(r, o) {
      return (r[o + 0] << 0) | (r[o + 1] << 8);
    }
    function It(r, o) {
      return At(r, o) | (r[o + 2] << 16);
    }
    function _t(r, o) {
      return At(r, o) | (At(r, o + 2) << 16);
    }
    function Ut(r, o) {
      var f = 1 << o;
      return (
        t(r != null),
        t(0 < o),
        (r.X = a(f)),
        r.X == null ? 0 : ((r.Mb = 32 - o), (r.Xa = o), 1)
      );
    }
    function ht(r, o) {
      t(r != null), t(o != null), t(r.Xa == o.Xa), i(o.X, 0, r.X, 0, 1 << o.Xa);
    }
    function q() {
      (this.X = []), (this.Xa = this.Mb = 0);
    }
    function Xt(r, o, f, d) {
      t(f != null), t(d != null);
      var b = f[0],
        w = d[0];
      return (
        b == 0 && (b = (r * w + o / 2) / o),
        w == 0 && (w = (o * b + r / 2) / r),
        0 >= b || 0 >= w ? 0 : ((f[0] = b), (d[0] = w), 1)
      );
    }
    function Bt(r, o) {
      return (r + (1 << o) - 1) >>> o;
    }
    function xt(r, o) {
      return (
        (((((4278255360 & r) + (4278255360 & o)) >>> 0) & 4278255360) +
          ((((16711935 & r) + (16711935 & o)) >>> 0) & 16711935)) >>>
        0
      );
    }
    function Lt(r, o) {
      z[o] = function (f, d, b, w, x, L, S) {
        var C;
        for (C = 0; C < x; ++C) {
          var U = z[r](L[S + C - 1], b, w + C);
          L[S + C] = xt(f[d + C], U);
        }
      };
    }
    function Ft() {
      this.ud = this.hd = this.jd = 0;
    }
    function kt(r, o) {
      return (((4278124286 & (r ^ o)) >>> 1) + (r & o)) >>> 0;
    }
    function qt(r) {
      return 0 <= r && 256 > r ? r : 0 > r ? 0 : 255 < r ? 255 : void 0;
    }
    function Gt(r, o) {
      return qt(r + ((r - o + 0.5) >> 1));
    }
    function Qt(r, o, f) {
      return Math.abs(o - f) - Math.abs(r - f);
    }
    function ee(r, o, f, d, b, w, x) {
      for (d = w[x - 1], f = 0; f < b; ++f) w[x + f] = d = xt(r[o + f], d);
    }
    function ae(r, o, f, d, b) {
      var w;
      for (w = 0; w < f; ++w) {
        var x = r[o + w],
          L = (x >> 8) & 255,
          S = 16711935 & (S = (S = 16711935 & x) + ((L << 16) + L));
        d[b + w] = ((4278255360 & x) + S) >>> 0;
      }
    }
    function pe(r, o) {
      (o.jd = (r >> 0) & 255),
        (o.hd = (r >> 8) & 255),
        (o.ud = (r >> 16) & 255);
    }
    function Wt(r, o, f, d, b, w) {
      var x;
      for (x = 0; x < d; ++x) {
        var L = o[f + x],
          S = L >>> 8,
          C = L,
          U =
            255 &
            (U =
              (U = L >>> 16) +
              ((((r.jd << 24) >> 24) * ((S << 24) >> 24)) >>> 5));
        (C =
          255 &
          (C =
            (C = C + ((((r.hd << 24) >> 24) * ((S << 24) >> 24)) >>> 5)) +
            ((((r.ud << 24) >> 24) * ((U << 24) >> 24)) >>> 5))),
          (b[w + x] = (4278255360 & L) + (U << 16) + C);
      }
    }
    function ne(r, o, f, d, b) {
      (z[o] = function (w, x, L, S, C, U, X, K, $) {
        for (S = X; S < K; ++S)
          for (X = 0; X < $; ++X) C[U++] = b(L[d(w[x++])]);
      }),
        (z[r] = function (w, x, L, S, C, U, X) {
          var K = 8 >> w.b,
            $ = w.Ea,
            vt = w.K[0],
            ot = w.w;
          if (8 > K)
            for (w = (1 << w.b) - 1, ot = (1 << K) - 1; x < L; ++x) {
              var H,
                V = 0;
              for (H = 0; H < $; ++H)
                H & w || (V = d(S[C++])), (U[X++] = b(vt[V & ot])), (V >>= K);
            }
          else z["VP8LMapColor" + f](S, C, vt, ot, U, X, x, L, $);
        });
    }
    function jt(r, o, f, d, b) {
      for (f = o + f; o < f; ) {
        var w = r[o++];
        (d[b++] = (w >> 16) & 255),
          (d[b++] = (w >> 8) & 255),
          (d[b++] = (w >> 0) & 255);
      }
    }
    function Xe(r, o, f, d, b) {
      for (f = o + f; o < f; ) {
        var w = r[o++];
        (d[b++] = (w >> 16) & 255),
          (d[b++] = (w >> 8) & 255),
          (d[b++] = (w >> 0) & 255),
          (d[b++] = (w >> 24) & 255);
      }
    }
    function se(r, o, f, d, b) {
      for (f = o + f; o < f; ) {
        var w = (((x = r[o++]) >> 16) & 240) | ((x >> 12) & 15),
          x = ((x >> 0) & 240) | ((x >> 28) & 15);
        (d[b++] = w), (d[b++] = x);
      }
    }
    function Fn(r, o, f, d, b) {
      for (f = o + f; o < f; ) {
        var w = (((x = r[o++]) >> 16) & 248) | ((x >> 13) & 7),
          x = ((x >> 5) & 224) | ((x >> 3) & 31);
        (d[b++] = w), (d[b++] = x);
      }
    }
    function me(r, o, f, d, b) {
      for (f = o + f; o < f; ) {
        var w = r[o++];
        (d[b++] = (w >> 0) & 255),
          (d[b++] = (w >> 8) & 255),
          (d[b++] = (w >> 16) & 255);
      }
    }
    function Ae(r, o, f, d, b, w) {
      if (w == 0)
        for (f = o + f; o < f; )
          Nt(
            d,
            (((w = r[o++])[0] >> 24) |
              ((w[1] >> 8) & 65280) |
              ((w[2] << 8) & 16711680) |
              (w[3] << 24)) >>>
              0,
          ),
            (b += 32);
      else i(d, b, r, o, f);
    }
    function Jn(r, o) {
      (z[o][0] = z[r + "0"]),
        (z[o][1] = z[r + "1"]),
        (z[o][2] = z[r + "2"]),
        (z[o][3] = z[r + "3"]),
        (z[o][4] = z[r + "4"]),
        (z[o][5] = z[r + "5"]),
        (z[o][6] = z[r + "6"]),
        (z[o][7] = z[r + "7"]),
        (z[o][8] = z[r + "8"]),
        (z[o][9] = z[r + "9"]),
        (z[o][10] = z[r + "10"]),
        (z[o][11] = z[r + "11"]),
        (z[o][12] = z[r + "12"]),
        (z[o][13] = z[r + "13"]),
        (z[o][14] = z[r + "0"]),
        (z[o][15] = z[r + "0"]);
    }
    function le(r) {
      return r == xs || r == As || r == lo || r == Ns;
    }
    function Ur() {
      (this.eb = []), (this.size = this.A = this.fb = 0);
    }
    function Se() {
      (this.y = []),
        (this.f = []),
        (this.ea = []),
        (this.F = []),
        (this.Tc =
          this.Ed =
          this.Cd =
          this.Fd =
          this.lb =
          this.Db =
          this.Ab =
          this.fa =
          this.J =
          this.W =
          this.N =
          this.O =
            0);
    }
    function jn() {
      (this.Rd = this.height = this.width = this.S = 0),
        (this.f = {}),
        (this.f.RGBA = new Ur()),
        (this.f.kb = new Se()),
        (this.sd = null);
    }
    function lr() {
      (this.width = [0]),
        (this.height = [0]),
        (this.Pd = [0]),
        (this.Qd = [0]),
        (this.format = [0]);
    }
    function _e() {
      this.Id =
        this.fd =
        this.Md =
        this.hb =
        this.ib =
        this.da =
        this.bd =
        this.cd =
        this.j =
        this.v =
        this.Da =
        this.Sd =
        this.ob =
          0;
    }
    function $t(r) {
      return alert("todo:WebPSamplerProcessPlane"), r.T;
    }
    function ce(r, o) {
      var f = r.T,
        d = o.ba.f.RGBA,
        b = d.eb,
        w = d.fb + r.ka * d.A,
        x = In[o.ba.S],
        L = r.y,
        S = r.O,
        C = r.f,
        U = r.N,
        X = r.ea,
        K = r.W,
        $ = o.cc,
        vt = o.dc,
        ot = o.Mc,
        H = o.Nc,
        V = r.ka,
        gt = r.ka + r.T,
        bt = r.U,
        mt = (bt + 1) >> 1;
      for (
        V == 0
          ? x(L, S, null, null, C, U, X, K, C, U, X, K, b, w, null, null, bt)
          : (x(
              o.ec,
              o.fc,
              L,
              S,
              $,
              vt,
              ot,
              H,
              C,
              U,
              X,
              K,
              b,
              w - d.A,
              b,
              w,
              bt,
            ),
            ++f);
        V + 2 < gt;
        V += 2
      )
        ($ = C),
          (vt = U),
          (ot = X),
          (H = K),
          (U += r.Rc),
          (K += r.Rc),
          (w += 2 * d.A),
          x(
            L,
            (S += 2 * r.fa) - r.fa,
            L,
            S,
            $,
            vt,
            ot,
            H,
            C,
            U,
            X,
            K,
            b,
            w - d.A,
            b,
            w,
            bt,
          );
      return (
        (S += r.fa),
        r.j + gt < r.o
          ? (i(o.ec, o.fc, L, S, bt),
            i(o.cc, o.dc, C, U, mt),
            i(o.Mc, o.Nc, X, K, mt),
            f--)
          : 1 & gt ||
            x(
              L,
              S,
              null,
              null,
              C,
              U,
              X,
              K,
              C,
              U,
              X,
              K,
              b,
              w + d.A,
              null,
              null,
              bt,
            ),
        f
      );
    }
    function Hr(r, o, f) {
      var d = r.F,
        b = [r.J];
      if (d != null) {
        var w = r.U,
          x = o.ba.S,
          L = x == uo || x == lo;
        o = o.ba.f.RGBA;
        var S = [0],
          C = r.ka;
        (S[0] = r.T),
          r.Kb &&
            (C == 0 ? --S[0] : (--C, (b[0] -= r.width)),
            r.j + r.ka + r.T == r.o && (S[0] = r.o - r.j - C));
        var U = o.eb;
        (C = o.fb + C * o.A),
          (r = we(d, b[0], r.width, w, S, U, C + (L ? 0 : 3), o.A)),
          t(f == S),
          r && le(x) && Pn(U, C, L, w, S, o.A);
      }
      return 0;
    }
    function $e(r) {
      var o = r.ma,
        f = o.ba.S,
        d = 11 > f,
        b = f == oo || f == so || f == uo || f == ws || f == 12 || le(f);
      if (
        ((o.memory = null),
        (o.Ib = null),
        (o.Jb = null),
        (o.Nd = null),
        !ca(o.Oa, r, b ? 11 : 12))
      )
        return 0;
      if ((b && le(f) && yt(), r.da)) alert("todo:use_scaling");
      else {
        if (d) {
          if (((o.Ib = $t), r.Kb)) {
            if (
              ((f = (r.U + 1) >> 1),
              (o.memory = a(r.U + 2 * f)),
              o.memory == null)
            )
              return 0;
            (o.ec = o.memory),
              (o.fc = 0),
              (o.cc = o.ec),
              (o.dc = o.fc + r.U),
              (o.Mc = o.cc),
              (o.Nc = o.dc + f),
              (o.Ib = ce),
              yt();
          }
        } else alert("todo:EmitYUV");
        b && ((o.Jb = Hr), d && J());
      }
      if (d && !Au) {
        for (r = 0; 256 > r; ++r)
          (fc[r] = (89858 * (r - 128) + fo) >> co),
            (pc[r] = -22014 * (r - 128) + fo),
            (dc[r] = -45773 * (r - 128)),
            (hc[r] = (113618 * (r - 128) + fo) >> co);
        for (r = ya; r < _s; ++r)
          (o = (76283 * (r - 16) + fo) >> co),
            (gc[r - ya] = bn(o, 255)),
            (mc[r - ya] = bn((o + 8) >> 4, 15));
        Au = 1;
      }
      return 1;
    }
    function Xn(r) {
      var o = r.ma,
        f = r.U,
        d = r.T;
      return (
        t(!(1 & r.ka)),
        0 >= f || 0 >= d
          ? 0
          : ((f = o.Ib(r, o)), o.Jb != null && o.Jb(r, o, f), (o.Dc += f), 1)
      );
    }
    function Kn(r) {
      r.ma.memory = null;
    }
    function Rt(r, o, f, d) {
      return pt(r, 8) != 47
        ? 0
        : ((o[0] = pt(r, 14) + 1),
          (f[0] = pt(r, 14) + 1),
          (d[0] = pt(r, 1)),
          pt(r, 3) != 0 ? 0 : !r.h);
    }
    function On(r, o) {
      if (4 > r) return r + 1;
      var f = (r - 2) >> 1;
      return ((2 + (1 & r)) << f) + pt(o, f) + 1;
    }
    function Zn(r, o) {
      return 120 < o
        ? o - 120
        : 1 <= (f = ((f = Kl[o - 1]) >> 4) * r + (8 - (15 & f)))
          ? f
          : 1;
      var f;
    }
    function ln(r, o, f) {
      var d = j(f),
        b = r[(o += 255 & d)].g - 8;
      return (
        0 < b &&
          (R(f, f.u + 8),
          (d = j(f)),
          (o += r[o].value),
          (o += d & ((1 << b) - 1))),
        R(f, f.u + r[o].g),
        r[o].value
      );
    }
    function ze(r, o, f) {
      return (f.g += r.g), (f.value += (r.value << o) >>> 0), t(8 >= f.g), r.g;
    }
    function Be(r, o, f) {
      var d = r.xc;
      return (
        t((o = d == 0 ? 0 : r.vc[r.md * (f >> d) + (o >> d)]) < r.Wb), r.Ya[o]
      );
    }
    function vn(r, o, f, d) {
      var b = r.ab,
        w = r.c * o,
        x = r.C;
      o = x + o;
      var L = f,
        S = d;
      for (d = r.Ta, f = r.Ua; 0 < b--; ) {
        var C = r.gc[b],
          U = x,
          X = o,
          K = L,
          $ = S,
          vt = ((S = d), (L = f), C.Ea);
        switch ((t(U < X), t(X <= C.nc), C.hc)) {
          case 2:
            Qa(K, $, (X - U) * vt, S, L);
            break;
          case 0:
            var ot = U,
              H = X,
              V = S,
              gt = L,
              bt = (Pt = C).Ea;
            ot == 0 &&
              (bs(K, $, null, null, 1, V, gt),
              ee(K, $ + 1, 0, 0, bt - 1, V, gt + 1),
              ($ += bt),
              (gt += bt),
              ++ot);
            for (
              var mt = 1 << Pt.b,
                Et = mt - 1,
                St = Bt(bt, Pt.b),
                Dt = Pt.K,
                Pt = Pt.w + (ot >> Pt.b) * St;
              ot < H;

            ) {
              var ue = Dt,
                fe = Pt,
                oe = 1;
              for (da(K, $, V, gt - bt, 1, V, gt); oe < bt; ) {
                var re = (oe & ~Et) + mt;
                re > bt && (re = bt),
                  (0, Sr[(ue[fe++] >> 8) & 15])(
                    K,
                    $ + +oe,
                    V,
                    gt + oe - bt,
                    re - oe,
                    V,
                    gt + oe,
                  ),
                  (oe = re);
              }
              ($ += bt), (gt += bt), ++ot & Et || (Pt += St);
            }
            X != C.nc && i(S, L - vt, S, L + (X - U - 1) * vt, vt);
            break;
          case 1:
            for (
              vt = K,
                H = $,
                bt = (K = C.Ea) - (gt = K & ~(V = ($ = 1 << C.b) - 1)),
                ot = Bt(K, C.b),
                mt = C.K,
                C = C.w + (U >> C.b) * ot;
              U < X;

            ) {
              for (
                Et = mt, St = C, Dt = new Ft(), Pt = H + gt, ue = H + K;
                H < Pt;

              )
                pe(Et[St++], Dt), Jr(Dt, vt, H, $, S, L), (H += $), (L += $);
              H < ue &&
                (pe(Et[St++], Dt),
                Jr(Dt, vt, H, bt, S, L),
                (H += bt),
                (L += bt)),
                ++U & V || (C += ot);
            }
            break;
          case 3:
            if (K == S && $ == L && 0 < C.b) {
              for (
                H = S,
                  K = vt = L + (X - U) * vt - (gt = (X - U) * Bt(C.Ea, C.b)),
                  $ = S,
                  V = L,
                  ot = [],
                  gt = (bt = gt) - 1;
                0 <= gt;
                --gt
              )
                ot[gt] = $[V + gt];
              for (gt = bt - 1; 0 <= gt; --gt) H[K + gt] = ot[gt];
              Ln(C, U, X, S, vt, S, L);
            } else Ln(C, U, X, K, $, S, L);
        }
        (L = d), (S = f);
      }
      S != f && i(d, f, L, S, w);
    }
    function ui(r, o) {
      var f = r.V,
        d = r.Ba + r.c * r.C,
        b = o - r.C;
      if ((t(o <= r.l.o), t(16 >= b), 0 < b)) {
        var w = r.l,
          x = r.Ta,
          L = r.Ua,
          S = w.width;
        if (
          (vn(r, b, f, d),
          (b = L = [L]),
          t((f = r.C) < (d = o)),
          t(w.v < w.va),
          d > w.o && (d = w.o),
          f < w.j)
        ) {
          var C = w.j - f;
          (f = w.j), (b[0] += C * S);
        }
        if (
          (f >= d
            ? (f = 0)
            : ((b[0] += 4 * w.v),
              (w.ka = f - w.j),
              (w.U = w.va - w.v),
              (w.T = d - f),
              (f = 1)),
          f)
        ) {
          if (((L = L[0]), 11 > (f = r.ca).S)) {
            var U = f.f.RGBA,
              X = ((d = f.S), (b = w.U), (w = w.T), (C = U.eb), U.A),
              K = w;
            for (U = U.fb + r.Ma * U.A; 0 < K--; ) {
              var $ = x,
                vt = L,
                ot = b,
                H = C,
                V = U;
              switch (d) {
                case ao:
                  hn($, vt, ot, H, V);
                  break;
                case oo:
                  on($, vt, ot, H, V);
                  break;
                case xs:
                  on($, vt, ot, H, V), Pn(H, V, 0, ot, 1, 0);
                  break;
                case du:
                  pr($, vt, ot, H, V);
                  break;
                case so:
                  Ae($, vt, ot, H, V, 1);
                  break;
                case As:
                  Ae($, vt, ot, H, V, 1), Pn(H, V, 0, ot, 1, 0);
                  break;
                case uo:
                  Ae($, vt, ot, H, V, 0);
                  break;
                case lo:
                  Ae($, vt, ot, H, V, 0), Pn(H, V, 1, ot, 1, 0);
                  break;
                case ws:
                  _r($, vt, ot, H, V);
                  break;
                case Ns:
                  _r($, vt, ot, H, V), ye(H, V, ot, 1, 0);
                  break;
                case pu:
                  dr($, vt, ot, H, V);
                  break;
                default:
                  t(0);
              }
              (L += S), (U += X);
            }
            r.Ma += w;
          } else alert("todo:EmitRescaledRowsYUVA");
          t(r.Ma <= f.height);
        }
      }
      (r.C = o), t(r.C <= r.i);
    }
    function cr(r) {
      var o;
      if (0 < r.ua) return 0;
      for (o = 0; o < r.Wb; ++o) {
        var f = r.Ya[o].G,
          d = r.Ya[o].H;
        if (
          0 < f[1][d[1] + 0].g ||
          0 < f[2][d[2] + 0].g ||
          0 < f[3][d[3] + 0].g
        )
          return 0;
      }
      return 1;
    }
    function En(r, o, f, d, b, w) {
      if (r.Z != 0) {
        var x = r.qd,
          L = r.rd;
        for (t(Cr[r.Z] != null); o < f; ++o)
          Cr[r.Z](x, L, d, b, d, b, w), (x = d), (L = b), (b += w);
        (r.qd = x), (r.rd = L);
      }
    }
    function Mn(r, o) {
      var f = r.l.ma,
        d = f.Z == 0 || f.Z == 1 ? r.l.j : r.C;
      if (((d = r.C < d ? d : r.C), t(o <= r.l.o), o > d)) {
        var b = r.l.width,
          w = f.ca,
          x = f.tb + b * d,
          L = r.V,
          S = r.Ba + r.c * d,
          C = r.gc;
        t(r.ab == 1),
          t(C[0].hc == 3),
          to(C[0], d, o, L, S, w, x),
          En(f, d, o, w, x, b);
      }
      r.C = r.Ma = o;
    }
    function Bn(r, o, f, d, b, w, x) {
      var L = r.$ / d,
        S = r.$ % d,
        C = r.m,
        U = r.s,
        X = f + r.$,
        K = X;
      b = f + d * b;
      var $ = f + d * w,
        vt = 280 + U.ua,
        ot = r.Pb ? L : 16777216,
        H = 0 < U.ua ? U.Wa : null,
        V = U.wc,
        gt = X < $ ? Be(U, S, L) : null;
      t(r.C < w), t($ <= b);
      var bt = !1;
      t: for (;;) {
        for (; bt || X < $; ) {
          var mt = 0;
          if (L >= ot) {
            var Et = X - f;
            t((ot = r).Pb),
              (ot.wd = ot.m),
              (ot.xd = Et),
              0 < ot.s.ua && ht(ot.s.Wa, ot.s.vb),
              (ot = L + Ql);
          }
          if (
            (S & V || (gt = Be(U, S, L)),
            t(gt != null),
            gt.Qb && ((o[X] = gt.qb), (bt = !0)),
            !bt)
          )
            if ((Y(C), gt.jc)) {
              (mt = C), (Et = o);
              var St = X,
                Dt = gt.pd[j(mt) & (Ye - 1)];
              t(gt.jc),
                256 > Dt.g
                  ? (R(mt, mt.u + Dt.g), (Et[St] = Dt.value), (mt = 0))
                  : (R(mt, mt.u + Dt.g - 256),
                    t(256 <= Dt.value),
                    (mt = Dt.value)),
                mt == 0 && (bt = !0);
            } else mt = ln(gt.G[0], gt.H[0], C);
          if (C.h) break;
          if (bt || 256 > mt) {
            if (!bt)
              if (gt.nd) o[X] = (gt.qb | (mt << 8)) >>> 0;
              else {
                if (
                  (Y(C),
                  (bt = ln(gt.G[1], gt.H[1], C)),
                  Y(C),
                  (Et = ln(gt.G[2], gt.H[2], C)),
                  (St = ln(gt.G[3], gt.H[3], C)),
                  C.h)
                )
                  break;
                o[X] = ((St << 24) | (bt << 16) | (mt << 8) | Et) >>> 0;
              }
            if (
              ((bt = !1),
              ++X,
              ++S >= d &&
                ((S = 0),
                ++L,
                x != null && L <= w && !(L % 16) && x(r, L),
                H != null))
            )
              for (; K < X; )
                (mt = o[K++]),
                  (H.X[((506832829 * mt) & 4294967295) >>> H.Mb] = mt);
          } else if (280 > mt) {
            if (
              ((mt = On(mt - 256, C)),
              (Et = ln(gt.G[4], gt.H[4], C)),
              Y(C),
              (Et = Zn(d, (Et = On(Et, C)))),
              C.h)
            )
              break;
            if (X - f < Et || b - X < mt) break t;
            for (St = 0; St < mt; ++St) o[X + St] = o[X + St - Et];
            for (X += mt, S += mt; S >= d; )
              (S -= d), ++L, x != null && L <= w && !(L % 16) && x(r, L);
            if ((t(X <= b), S & V && (gt = Be(U, S, L)), H != null))
              for (; K < X; )
                (mt = o[K++]),
                  (H.X[((506832829 * mt) & 4294967295) >>> H.Mb] = mt);
          } else {
            if (!(mt < vt)) break t;
            for (bt = mt - 280, t(H != null); K < X; )
              (mt = o[K++]),
                (H.X[((506832829 * mt) & 4294967295) >>> H.Mb] = mt);
            (mt = X), t(!(bt >>> (Et = H).Xa)), (o[mt] = Et.X[bt]), (bt = !0);
          }
          bt || t(C.h == B(C));
        }
        if (r.Pb && C.h && X < b)
          t(r.m.h),
            (r.a = 5),
            (r.m = r.wd),
            (r.$ = r.xd),
            0 < r.s.ua && ht(r.s.vb, r.s.Wa);
        else {
          if (C.h) break t;
          x?.(r, L > w ? w : L), (r.a = 0), (r.$ = X - f);
        }
        return 1;
      }
      return (r.a = 3), 0;
    }
    function Qn(r) {
      t(r != null), (r.vc = null), (r.yc = null), (r.Ya = null);
      var o = r.Wa;
      o != null && (o.X = null), (r.vb = null), t(r != null);
    }
    function Nn() {
      var r = new vs();
      return r == null
        ? null
        : ((r.a = 0),
          (r.xb = vu),
          Jn("Predictor", "VP8LPredictors"),
          Jn("Predictor", "VP8LPredictors_C"),
          Jn("PredictorAdd", "VP8LPredictorsAdd"),
          Jn("PredictorAdd", "VP8LPredictorsAdd_C"),
          (Qa = ae),
          (Jr = Wt),
          (hn = jt),
          (on = Xe),
          (_r = se),
          (dr = Fn),
          (pr = me),
          (z.VP8LMapColor32b = ki),
          (z.VP8LMapColor8b = eo),
          r);
    }
    function tr(r, o, f, d, b) {
      var w = 1,
        x = [r],
        L = [o],
        S = d.m,
        C = d.s,
        U = null,
        X = 0;
      t: for (;;) {
        if (f)
          for (; w && pt(S, 1); ) {
            var K = x,
              $ = L,
              vt = d,
              ot = 1,
              H = vt.m,
              V = vt.gc[vt.ab],
              gt = pt(H, 2);
            if (vt.Oc & (1 << gt)) w = 0;
            else {
              switch (
                ((vt.Oc |= 1 << gt),
                (V.hc = gt),
                (V.Ea = K[0]),
                (V.nc = $[0]),
                (V.K = [null]),
                ++vt.ab,
                t(4 >= vt.ab),
                gt)
              ) {
                case 0:
                case 1:
                  (V.b = pt(H, 3) + 2),
                    (ot = tr(Bt(V.Ea, V.b), Bt(V.nc, V.b), 0, vt, V.K)),
                    (V.K = V.K[0]);
                  break;
                case 3:
                  var bt,
                    mt = pt(H, 8) + 1,
                    Et = 16 < mt ? 0 : 4 < mt ? 1 : 2 < mt ? 2 : 3;
                  if (
                    ((K[0] = Bt(V.Ea, Et)),
                    (V.b = Et),
                    (bt = ot = tr(mt, 1, 0, vt, V.K)))
                  ) {
                    var St,
                      Dt = mt,
                      Pt = V,
                      ue = 1 << (8 >> Pt.b),
                      fe = a(ue);
                    if (fe == null) bt = 0;
                    else {
                      var oe = Pt.K[0],
                        re = Pt.w;
                      for (fe[0] = Pt.K[0][0], St = 1; St < 1 * Dt; ++St)
                        fe[St] = xt(oe[re + St], fe[St - 1]);
                      for (; St < 4 * ue; ++St) fe[St] = 0;
                      (Pt.K[0] = null), (Pt.K[0] = fe), (bt = 1);
                    }
                  }
                  ot = bt;
                  break;
                case 2:
                  break;
                default:
                  t(0);
              }
              w = ot;
            }
          }
        if (
          ((x = x[0]),
          (L = L[0]),
          w && pt(S, 1) && !(w = 1 <= (X = pt(S, 4)) && 11 >= X))
        ) {
          d.a = 3;
          break t;
        }
        var ve;
        if ((ve = w))
          e: {
            var ge,
              Zt,
              Te,
              dn = d,
              De = x,
              pn = L,
              he = X,
              wn = f,
              xn = dn.m,
              We = dn.s,
              Je = [null],
              un = 1,
              Cn = 0,
              ir = Zl[he];
            n: for (;;) {
              if (wn && pt(xn, 1)) {
                var Ve = pt(xn, 3) + 2,
                  br = Bt(De, Ve),
                  ti = Bt(pn, Ve),
                  Oi = br * ti;
                if (!tr(br, ti, 0, dn, Je)) break n;
                for (Je = Je[0], We.xc = Ve, ge = 0; ge < Oi; ++ge) {
                  var Fr = (Je[ge] >> 8) & 65535;
                  (Je[ge] = Fr), Fr >= un && (un = Fr + 1);
                }
              }
              if (xn.h) break n;
              for (Zt = 0; 5 > Zt; ++Zt) {
                var ke = gu[Zt];
                !Zt && 0 < he && (ke += 1 << he), Cn < ke && (Cn = ke);
              }
              var Ps = l(un * ir, I),
                Su = un,
                _u = l(Su, T);
              if (_u == null) var po = null;
              else t(65536 >= Su), (po = _u);
              var wa = a(Cn);
              if (po == null || wa == null || Ps == null) {
                dn.a = 1;
                break n;
              }
              var go = Ps;
              for (ge = Te = 0; ge < un; ++ge) {
                var zn = po[ge],
                  Ei = zn.G,
                  Mi = zn.H,
                  Pu = 0,
                  mo = 1,
                  ku = 0;
                for (Zt = 0; 5 > Zt; ++Zt) {
                  (ke = gu[Zt]),
                    (Ei[Zt] = go),
                    (Mi[Zt] = Te),
                    !Zt && 0 < he && (ke += 1 << he);
                  i: {
                    var vo,
                      ks = ke,
                      bo = dn,
                      xa = wa,
                      yc = go,
                      wc = Te,
                      Is = 0,
                      jr = bo.m,
                      xc = pt(jr, 1);
                    if ((s(xa, 0, 0, ks), xc)) {
                      var Ac = pt(jr, 1) + 1,
                        Nc = pt(jr, 1),
                        Iu = pt(jr, Nc == 0 ? 1 : 8);
                      (xa[Iu] = 1), Ac == 2 && (xa[(Iu = pt(jr, 8))] = 1);
                      var yo = 1;
                    } else {
                      var Cu = a(19),
                        Fu = pt(jr, 4) + 4;
                      if (19 < Fu) {
                        bo.a = 3;
                        var wo = 0;
                        break i;
                      }
                      for (vo = 0; vo < Fu; ++vo) Cu[Xl[vo]] = pt(jr, 3);
                      var Cs = void 0,
                        Aa = void 0,
                        ju = bo,
                        Lc = Cu,
                        xo = ks,
                        Ou = xa,
                        Fs = 0,
                        Or = ju.m,
                        Eu = 8,
                        Mu = l(128, I);
                      r: for (; k(Mu, 0, 7, Lc, 19); ) {
                        if (pt(Or, 1)) {
                          var Sc = 2 + 2 * pt(Or, 3);
                          if ((Cs = 2 + pt(Or, Sc)) > xo) break r;
                        } else Cs = xo;
                        for (Aa = 0; Aa < xo && Cs--; ) {
                          Y(Or);
                          var Bu = Mu[0 + (127 & j(Or))];
                          R(Or, Or.u + Bu.g);
                          var Bi = Bu.value;
                          if (16 > Bi) (Ou[Aa++] = Bi), Bi != 0 && (Eu = Bi);
                          else {
                            var _c = Bi == 16,
                              qu = Bi - 16,
                              Pc = Yl[qu],
                              Tu = pt(Or, $l[qu]) + Pc;
                            if (Aa + Tu > xo) break r;
                            for (var kc = _c ? Eu : 0; 0 < Tu--; )
                              Ou[Aa++] = kc;
                          }
                        }
                        Fs = 1;
                        break r;
                      }
                      Fs || (ju.a = 3), (yo = Fs);
                    }
                    (yo = yo && !jr.h) && (Is = k(yc, wc, 8, xa, ks)),
                      yo && Is != 0 ? (wo = Is) : ((bo.a = 3), (wo = 0));
                  }
                  if (wo == 0) break n;
                  if (
                    (mo && Jl[Zt] == 1 && (mo = go[Te].g == 0),
                    (Pu += go[Te].g),
                    (Te += wo),
                    3 >= Zt)
                  ) {
                    var Na,
                      js = wa[0];
                    for (Na = 1; Na < ke; ++Na) wa[Na] > js && (js = wa[Na]);
                    ku += js;
                  }
                }
                if (
                  ((zn.nd = mo),
                  (zn.Qb = 0),
                  mo &&
                    ((zn.qb =
                      ((Ei[3][Mi[3] + 0].value << 24) |
                        (Ei[1][Mi[1] + 0].value << 16) |
                        Ei[2][Mi[2] + 0].value) >>>
                      0),
                    Pu == 0 &&
                      256 > Ei[0][Mi[0] + 0].value &&
                      ((zn.Qb = 1), (zn.qb += Ei[0][Mi[0] + 0].value << 8))),
                  (zn.jc = !zn.Qb && 6 > ku),
                  zn.jc)
                ) {
                  var Ao,
                    yr = zn;
                  for (Ao = 0; Ao < Ye; ++Ao) {
                    var Er = Ao,
                      Mr = yr.pd[Er],
                      No = yr.G[0][yr.H[0] + Er];
                    256 <= No.value
                      ? ((Mr.g = No.g + 256), (Mr.value = No.value))
                      : ((Mr.g = 0),
                        (Mr.value = 0),
                        (Er >>= ze(No, 8, Mr)),
                        (Er >>= ze(yr.G[1][yr.H[1] + Er], 16, Mr)),
                        (Er >>= ze(yr.G[2][yr.H[2] + Er], 0, Mr)),
                        ze(yr.G[3][yr.H[3] + Er], 24, Mr));
                  }
                }
              }
              (We.vc = Je), (We.Wb = un), (We.Ya = po), (We.yc = Ps), (ve = 1);
              break e;
            }
            ve = 0;
          }
        if (!(w = ve)) {
          d.a = 3;
          break t;
        }
        if (0 < X) {
          if (((C.ua = 1 << X), !Ut(C.Wa, X))) {
            (d.a = 1), (w = 0);
            break t;
          }
        } else C.ua = 0;
        var Os = d,
          Du = x,
          Ic = L,
          Es = Os.s,
          Ms = Es.xc;
        if (
          ((Os.c = Du),
          (Os.i = Ic),
          (Es.md = Bt(Du, Ms)),
          (Es.wc = Ms == 0 ? -1 : (1 << Ms) - 1),
          f)
        ) {
          d.xb = oc;
          break t;
        }
        if ((U = a(x * L)) == null) {
          (d.a = 1), (w = 0);
          break t;
        }
        w = (w = Bn(d, U, 0, x, L, L, null)) && !S.h;
        break t;
      }
      return (
        w
          ? (b != null ? (b[0] = U) : (t(U == null), t(f)),
            (d.$ = 0),
            f || Qn(C))
          : Qn(C),
        w
      );
    }
    function Wr(r, o) {
      var f = r.c * r.i,
        d = f + o + 16 * o;
      return (
        t(r.c <= o),
        (r.V = a(d)),
        r.V == null
          ? ((r.Ta = null), (r.Ua = 0), (r.a = 1), 0)
          : ((r.Ta = r.V), (r.Ua = r.Ba + f + o), 1)
      );
    }
    function li(r, o) {
      var f = r.C,
        d = o - f,
        b = r.V,
        w = r.Ba + r.c * f;
      for (t(o <= r.l.o); 0 < d; ) {
        var x = 16 < d ? 16 : d,
          L = r.l.ma,
          S = r.l.width,
          C = S * x,
          U = L.ca,
          X = L.tb + S * f,
          K = r.Ta,
          $ = r.Ua;
        vn(r, x, b, w),
          je(K, $, U, X, C),
          En(L, f, f + x, U, X, S),
          (d -= x),
          (b += x * r.c),
          (f += x);
      }
      t(f == o), (r.C = r.Ma = o);
    }
    function ci() {
      this.ub = this.yd = this.td = this.Rb = 0;
    }
    function fi() {
      this.Kd = this.Ld = this.Ud = this.Td = this.i = this.c = 0;
    }
    function hi() {
      (this.Fb = this.Bb = this.Cb = 0), (this.Zb = a(4)), (this.Lb = a(4));
    }
    function Oa() {
      this.Yb = (function () {
        var r = [];
        return (
          (function o(f, d, b) {
            for (
              var w = b[d], x = 0;
              x < w && (f.push(b.length > d + 1 ? [] : 0), !(b.length < d + 1));
              x++
            )
              o(f[x], d + 1, b);
          })(r, 0, [3, 11]),
          r
        );
      })();
    }
    function Yo() {
      (this.jb = a(3)), (this.Wc = c([4, 8], Oa)), (this.Xc = c([4, 17], Oa));
    }
    function Jo() {
      (this.Pc = this.wb = this.Tb = this.zd = 0),
        (this.vd = new a(4)),
        (this.od = new a(4));
    }
    function di() {
      this.ld = this.La = this.dd = this.tc = 0;
    }
    function Ea() {
      this.Na = this.la = 0;
    }
    function Xo() {
      (this.Sc = [0, 0]),
        (this.Eb = [0, 0]),
        (this.Qc = [0, 0]),
        (this.ia = this.lc = 0);
    }
    function Yi() {
      (this.ad = a(384)),
        (this.Za = 0),
        (this.Ob = a(16)),
        (this.$b = this.Ad = this.ia = this.Gc = this.Hc = this.Dd = 0);
    }
    function Ko() {
      (this.uc = this.M = this.Nb = 0),
        (this.wa = Array(new di())),
        (this.Y = 0),
        (this.ya = Array(new Yi())),
        (this.aa = 0),
        (this.l = new pi());
    }
    function Ma() {
      (this.y = a(16)), (this.f = a(8)), (this.ea = a(8));
    }
    function Zo() {
      (this.cb = this.a = 0),
        (this.sc = ""),
        (this.m = new Ct()),
        (this.Od = new ci()),
        (this.Kc = new fi()),
        (this.ed = new Jo()),
        (this.Qa = new hi()),
        (this.Ic = this.$c = this.Aa = 0),
        (this.D = new Ko()),
        (this.Xb =
          this.Va =
          this.Hb =
          this.zb =
          this.yb =
          this.Ub =
          this.za =
            0),
        (this.Jc = l(8, Ct)),
        (this.ia = 0),
        (this.pb = l(4, Xo)),
        (this.Pa = new Yo()),
        (this.Bd = this.kc = 0),
        (this.Ac = []),
        (this.Bc = 0),
        (this.zc = [0, 0, 0, 0]),
        (this.Gd = Array(new Ma())),
        (this.Hd = 0),
        (this.rb = Array(new Ea())),
        (this.sb = 0),
        (this.wa = Array(new di())),
        (this.Y = 0),
        (this.oc = []),
        (this.pc = 0),
        (this.sa = []),
        (this.ta = 0),
        (this.qa = []),
        (this.ra = 0),
        (this.Ha = []),
        (this.B = this.R = this.Ia = 0),
        (this.Ec = []),
        (this.M = this.ja = this.Vb = this.Fc = 0),
        (this.ya = Array(new Yi())),
        (this.L = this.aa = 0),
        (this.gd = c([4, 2], di)),
        (this.ga = null),
        (this.Fa = []),
        (this.Cc = this.qc = this.P = 0),
        (this.Gb = []),
        (this.Uc = 0),
        (this.mb = []),
        (this.nb = 0),
        (this.rc = []),
        (this.Ga = this.Vc = 0);
    }
    function pi() {
      (this.T = this.U = this.ka = this.height = this.width = 0),
        (this.y = []),
        (this.f = []),
        (this.ea = []),
        (this.Rc = this.fa = this.W = this.N = this.O = 0),
        (this.ma = "void"),
        (this.put = "VP8IoPutHook"),
        (this.ac = "VP8IoSetupHook"),
        (this.bc = "VP8IoTeardownHook"),
        (this.ha = this.Kb = 0),
        (this.data = []),
        (this.hb =
          this.ib =
          this.da =
          this.o =
          this.j =
          this.va =
          this.v =
          this.Da =
          this.ob =
          this.w =
            0),
        (this.F = []),
        (this.J = 0);
    }
    function Qo() {
      var r = new Zo();
      return (
        r != null &&
          ((r.a = 0), (r.sc = "OK"), (r.cb = 0), (r.Xb = 0), ba || (ba = Ta)),
        r
      );
    }
    function Ce(r, o, f) {
      return r.a == 0 && ((r.a = o), (r.sc = f), (r.cb = 0)), 0;
    }
    function Ba(r, o, f) {
      return 3 <= f && r[o + 0] == 157 && r[o + 1] == 1 && r[o + 2] == 42;
    }
    function qa(r, o) {
      if (r == null) return 0;
      if (((r.a = 0), (r.sc = "OK"), o == null))
        return Ce(r, 2, "null VP8Io passed to VP8GetHeaders()");
      var f = o.data,
        d = o.w,
        b = o.ha;
      if (4 > b) return Ce(r, 7, "Truncated header.");
      var w = f[d + 0] | (f[d + 1] << 8) | (f[d + 2] << 16),
        x = r.Od;
      if (
        ((x.Rb = !(1 & w)),
        (x.td = (w >> 1) & 7),
        (x.yd = (w >> 4) & 1),
        (x.ub = w >> 5),
        3 < x.td)
      )
        return Ce(r, 3, "Incorrect keyframe parameters.");
      if (!x.yd) return Ce(r, 4, "Frame not displayable.");
      (d += 3), (b -= 3);
      var L = r.Kc;
      if (x.Rb) {
        if (7 > b) return Ce(r, 7, "cannot parse picture header");
        if (!Ba(f, d, b)) return Ce(r, 3, "Bad code word");
        (L.c = 16383 & ((f[d + 4] << 8) | f[d + 3])),
          (L.Td = f[d + 4] >> 6),
          (L.i = 16383 & ((f[d + 6] << 8) | f[d + 5])),
          (L.Ud = f[d + 6] >> 6),
          (d += 7),
          (b -= 7),
          (r.za = (L.c + 15) >> 4),
          (r.Ub = (L.i + 15) >> 4),
          (o.width = L.c),
          (o.height = L.i),
          (o.Da = 0),
          (o.j = 0),
          (o.v = 0),
          (o.va = o.width),
          (o.o = o.height),
          (o.da = 0),
          (o.ib = o.width),
          (o.hb = o.height),
          (o.U = o.width),
          (o.T = o.height),
          s((w = r.Pa).jb, 0, 255, w.jb.length),
          t((w = r.Qa) != null),
          (w.Cb = 0),
          (w.Bb = 0),
          (w.Fb = 1),
          s(w.Zb, 0, 0, w.Zb.length),
          s(w.Lb, 0, 0, w.Lb);
      }
      if (x.ub > b) return Ce(r, 7, "bad partition length");
      ut((w = r.m), f, d, x.ub),
        (d += x.ub),
        (b -= x.ub),
        x.Rb && ((L.Ld = et(w)), (L.Kd = et(w))),
        (L = r.Qa);
      var S,
        C = r.Pa;
      if ((t(w != null), t(L != null), (L.Cb = et(w)), L.Cb)) {
        if (((L.Bb = et(w)), et(w))) {
          for (L.Fb = et(w), S = 0; 4 > S; ++S) L.Zb[S] = et(w) ? ct(w, 7) : 0;
          for (S = 0; 4 > S; ++S) L.Lb[S] = et(w) ? ct(w, 6) : 0;
        }
        if (L.Bb) for (S = 0; 3 > S; ++S) C.jb[S] = et(w) ? at(w, 8) : 255;
      } else L.Bb = 0;
      if (w.Ka) return Ce(r, 3, "cannot parse segment header");
      if (
        (((L = r.ed).zd = et(w)),
        (L.Tb = at(w, 6)),
        (L.wb = at(w, 3)),
        (L.Pc = et(w)),
        L.Pc && et(w))
      ) {
        for (C = 0; 4 > C; ++C) et(w) && (L.vd[C] = ct(w, 6));
        for (C = 0; 4 > C; ++C) et(w) && (L.od[C] = ct(w, 6));
      }
      if (((r.L = L.Tb == 0 ? 0 : L.zd ? 1 : 2), w.Ka))
        return Ce(r, 3, "cannot parse filter header");
      var U = b;
      if (
        ((b = S = d),
        (d = S + U),
        (L = U),
        (r.Xb = (1 << at(r.m, 2)) - 1),
        U < 3 * (C = r.Xb))
      )
        f = 7;
      else {
        for (S += 3 * C, L -= 3 * C, U = 0; U < C; ++U) {
          var X = f[b + 0] | (f[b + 1] << 8) | (f[b + 2] << 16);
          X > L && (X = L), ut(r.Jc[+U], f, S, X), (S += X), (L -= X), (b += 3);
        }
        ut(r.Jc[+C], f, S, L), (f = S < d ? 0 : 5);
      }
      if (f != 0) return Ce(r, f, "cannot parse partitions");
      for (
        f = at((S = r.m), 7),
          b = et(S) ? ct(S, 4) : 0,
          d = et(S) ? ct(S, 4) : 0,
          L = et(S) ? ct(S, 4) : 0,
          C = et(S) ? ct(S, 4) : 0,
          S = et(S) ? ct(S, 4) : 0,
          U = r.Qa,
          X = 0;
        4 > X;
        ++X
      ) {
        if (U.Cb) {
          var K = U.Zb[X];
          U.Fb || (K += f);
        } else {
          if (0 < X) {
            r.pb[X] = r.pb[0];
            continue;
          }
          K = f;
        }
        var $ = r.pb[X];
        ($.Sc[0] = Ls[bn(K + b, 127)]),
          ($.Sc[1] = Ss[bn(K + 0, 127)]),
          ($.Eb[0] = 2 * Ls[bn(K + d, 127)]),
          ($.Eb[1] = (101581 * Ss[bn(K + L, 127)]) >> 16),
          8 > $.Eb[1] && ($.Eb[1] = 8),
          ($.Qc[0] = Ls[bn(K + C, 117)]),
          ($.Qc[1] = Ss[bn(K + S, 127)]),
          ($.lc = K + S);
      }
      if (!x.Rb) return Ce(r, 4, "Not a key frame.");
      for (et(w), x = r.Pa, f = 0; 4 > f; ++f) {
        for (b = 0; 8 > b; ++b)
          for (d = 0; 3 > d; ++d)
            for (L = 0; 11 > L; ++L)
              (C = rt(w, ic[f][b][d][L]) ? at(w, 8) : nc[f][b][d][L]),
                (x.Wc[f][b].Yb[d][L] = C);
        for (b = 0; 17 > b; ++b) x.Xc[f][b] = x.Wc[f][ac[b]];
      }
      return (r.kc = et(w)), r.kc && (r.Bd = at(w, 8)), (r.cb = 1);
    }
    function Ta(r, o, f, d, b, w, x) {
      var L = o[b].Yb[f];
      for (f = 0; 16 > b; ++b) {
        if (!rt(r, L[f + 0])) return b;
        for (; !rt(r, L[f + 1]); )
          if (((L = o[++b].Yb[0]), (f = 0), b == 16)) return 16;
        var S = o[b + 1].Yb;
        if (rt(r, L[f + 2])) {
          var C = r,
            U = 0;
          if (rt(C, (K = L)[(X = f) + 3]))
            if (rt(C, K[X + 6])) {
              for (
                L = 0,
                  X = 2 * (U = rt(C, K[X + 8])) + (K = rt(C, K[X + 9 + U])),
                  U = 0,
                  K = tc[X];
                K[L];
                ++L
              )
                U += U + rt(C, K[L]);
              U += 3 + (8 << X);
            } else
              rt(C, K[X + 7])
                ? ((U = 7 + 2 * rt(C, 165)), (U += rt(C, 145)))
                : (U = 5 + rt(C, 159));
          else U = rt(C, K[X + 4]) ? 3 + rt(C, K[X + 5]) : 2;
          L = S[2];
        } else (U = 1), (L = S[1]);
        (S = x + ec[b]), 0 > (C = r).b && Q(C);
        var X,
          K = C.b,
          $ = ((X = C.Ca >> 1) - (C.I >> K)) >> 31;
        --C.b,
          (C.Ca += $),
          (C.Ca |= 1),
          (C.I -= ((X + 1) & $) << K),
          (w[S] = ((U ^ $) - $) * d[(0 < b) + 0]);
      }
      return 16;
    }
    function Ji(r) {
      var o = r.rb[r.sb - 1];
      (o.la = 0), (o.Na = 0), s(r.zc, 0, 0, r.zc.length), (r.ja = 0);
    }
    function ts(r, o) {
      if (r == null) return 0;
      if (o == null) return Ce(r, 2, "NULL VP8Io parameter in VP8Decode().");
      if (!r.cb && !qa(r, o)) return 0;
      if ((t(r.cb), o.ac == null || o.ac(o))) {
        o.ob && (r.L = 0);
        var f = ho[r.L];
        if (
          (r.L == 2
            ? ((r.yb = 0), (r.zb = 0))
            : ((r.yb = (o.v - f) >> 4),
              (r.zb = (o.j - f) >> 4),
              0 > r.yb && (r.yb = 0),
              0 > r.zb && (r.zb = 0)),
          (r.Va = (o.o + 15 + f) >> 4),
          (r.Hb = (o.va + 15 + f) >> 4),
          r.Hb > r.za && (r.Hb = r.za),
          r.Va > r.Ub && (r.Va = r.Ub),
          0 < r.L)
        ) {
          var d = r.ed;
          for (f = 0; 4 > f; ++f) {
            var b;
            if (r.Qa.Cb) {
              var w = r.Qa.Lb[f];
              r.Qa.Fb || (w += d.Tb);
            } else w = d.Tb;
            for (b = 0; 1 >= b; ++b) {
              var x = r.gd[f][b],
                L = w;
              if (
                (d.Pc && ((L += d.vd[0]), b && (L += d.od[0])),
                0 < (L = 0 > L ? 0 : 63 < L ? 63 : L))
              ) {
                var S = L;
                0 < d.wb &&
                  (S = 4 < d.wb ? S >> 2 : S >> 1) > 9 - d.wb &&
                  (S = 9 - d.wb),
                  1 > S && (S = 1),
                  (x.dd = S),
                  (x.tc = 2 * L + S),
                  (x.ld = 40 <= L ? 2 : 15 <= L ? 1 : 0);
              } else x.tc = 0;
              x.La = b;
            }
          }
        }
        f = 0;
      } else Ce(r, 6, "Frame setup failed"), (f = r.a);
      if ((f = f == 0)) {
        if (f) {
          (r.$c = 0), 0 < r.Aa || (r.Ic = bc);
          t: {
            (f = r.Ic), (d = 4 * (S = r.za));
            var C = 32 * S,
              U = S + 1,
              X = 0 < r.L ? S * (0 < r.Aa ? 2 : 1) : 0,
              K = (r.Aa == 2 ? 2 : 1) * S;
            if (
              (x =
                d +
                832 +
                (b = ((3 * (16 * f + ho[r.L])) / 2) * C) +
                (w = r.Fa != null && 0 < r.Fa.length ? r.Kc.c * r.Kc.i : 0)) !=
              x
            )
              f = 0;
            else {
              if (x > r.Vb) {
                if (((r.Vb = 0), (r.Ec = a(x)), (r.Fc = 0), r.Ec == null)) {
                  f = Ce(r, 1, "no memory during frame initialization.");
                  break t;
                }
                r.Vb = x;
              }
              (x = r.Ec),
                (L = r.Fc),
                (r.Ac = x),
                (r.Bc = L),
                (L += d),
                (r.Gd = l(C, Ma)),
                (r.Hd = 0),
                (r.rb = l(U + 1, Ea)),
                (r.sb = 1),
                (r.wa = X ? l(X, di) : null),
                (r.Y = 0),
                (r.D.Nb = 0),
                (r.D.wa = r.wa),
                (r.D.Y = r.Y),
                0 < r.Aa && (r.D.Y += S),
                t(!0),
                (r.oc = x),
                (r.pc = L),
                (L += 832),
                (r.ya = l(K, Yi)),
                (r.aa = 0),
                (r.D.ya = r.ya),
                (r.D.aa = r.aa),
                r.Aa == 2 && (r.D.aa += S),
                (r.R = 16 * S),
                (r.B = 8 * S),
                (S = (C = ho[r.L]) * r.R),
                (C = (C / 2) * r.B),
                (r.sa = x),
                (r.ta = L + S),
                (r.qa = r.sa),
                (r.ra = r.ta + 16 * f * r.R + C),
                (r.Ha = r.qa),
                (r.Ia = r.ra + 8 * f * r.B + C),
                (r.$c = 0),
                (L += b),
                (r.mb = w ? x : null),
                (r.nb = w ? L : null),
                t(L + w <= r.Fc + r.Vb),
                Ji(r),
                s(r.Ac, r.Bc, 0, d),
                (f = 1);
            }
          }
          if (f) {
            if (
              ((o.ka = 0),
              (o.y = r.sa),
              (o.O = r.ta),
              (o.f = r.qa),
              (o.N = r.ra),
              (o.ea = r.Ha),
              (o.Vd = r.Ia),
              (o.fa = r.R),
              (o.Rc = r.B),
              (o.F = null),
              (o.J = 0),
              !ro)
            ) {
              for (f = -255; 255 >= f; ++f) Ue[255 + f] = 0 > f ? -f : f;
              for (f = -1020; 1020 >= f; ++f)
                mr[1020 + f] = -128 > f ? -128 : 127 < f ? 127 : f;
              for (f = -112; 112 >= f; ++f)
                va[112 + f] = -16 > f ? -16 : 15 < f ? 15 : f;
              for (f = -255; 510 >= f; ++f)
                ji[255 + f] = 0 > f ? 0 : 255 < f ? 255 : f;
              ro = 1;
            }
            (Ii = rs),
              (gr = es),
              (pa = Ra),
              (sn = ns),
              (Sn = za),
              (Fe = Da),
              (Ci = ea),
              (no = $r),
              (ga = ms),
              (Xr = na),
              (Kr = gs),
              (Pr = wi),
              (Zr = ra),
              (Fi = Xa),
              (Qr = Ja),
              (kr = nr),
              (ma = hr),
              (_n = ps),
              (Rn[0] = er),
              (Rn[1] = is),
              (Rn[2] = us),
              (Rn[3] = ls),
              (Rn[4] = Wa),
              (Rn[5] = bi),
              (Rn[6] = Va),
              (Rn[7] = Zi),
              (Rn[8] = fs),
              (Rn[9] = cs),
              (Ir[0] = Ua),
              (Ir[1] = os),
              (Ir[2] = fr),
              (Ir[3] = mi),
              (Ir[4] = Ke),
              (Ir[5] = ss),
              (Ir[6] = Ha),
              (vr[0] = Ar),
              (vr[1] = as),
              (vr[2] = hs),
              (vr[3] = Qi),
              (vr[4] = Gr),
              (vr[5] = ds),
              (vr[6] = ta),
              (f = 1);
          } else f = 0;
        }
        f &&
          (f = (function ($, vt) {
            for ($.M = 0; $.M < $.Va; ++$.M) {
              var ot,
                H = $.Jc[$.M & $.Xb],
                V = $.m,
                gt = $;
              for (ot = 0; ot < gt.za; ++ot) {
                var bt = V,
                  mt = gt,
                  Et = mt.Ac,
                  St = mt.Bc + 4 * ot,
                  Dt = mt.zc,
                  Pt = mt.ya[mt.aa + ot];
                if (
                  (mt.Qa.Bb
                    ? (Pt.$b = rt(bt, mt.Pa.jb[0])
                        ? 2 + rt(bt, mt.Pa.jb[2])
                        : rt(bt, mt.Pa.jb[1]))
                    : (Pt.$b = 0),
                  mt.kc && (Pt.Ad = rt(bt, mt.Bd)),
                  (Pt.Za = !rt(bt, 145) + 0),
                  Pt.Za)
                ) {
                  var ue = Pt.Ob,
                    fe = 0;
                  for (mt = 0; 4 > mt; ++mt) {
                    var oe,
                      re = Dt[0 + mt];
                    for (oe = 0; 4 > oe; ++oe) {
                      re = rc[Et[St + oe]][re];
                      for (var ve = mu[rt(bt, re[0])]; 0 < ve; )
                        ve = mu[2 * ve + rt(bt, re[ve])];
                      (re = -ve), (Et[St + oe] = re);
                    }
                    i(ue, fe, Et, St, 4), (fe += 4), (Dt[0 + mt] = re);
                  }
                } else
                  (re = rt(bt, 156)
                    ? rt(bt, 128)
                      ? 1
                      : 3
                    : rt(bt, 163)
                      ? 2
                      : 0),
                    (Pt.Ob[0] = re),
                    s(Et, St, re, 4),
                    s(Dt, 0, re, 4);
                Pt.Dd = rt(bt, 142)
                  ? rt(bt, 114)
                    ? rt(bt, 183)
                      ? 1
                      : 3
                    : 2
                  : 0;
              }
              if (gt.m.Ka)
                return Ce($, 7, "Premature end-of-partition0 encountered.");
              for (; $.ja < $.za; ++$.ja) {
                if (
                  ((gt = H),
                  (bt = (V = $).rb[V.sb - 1]),
                  (Et = V.rb[V.sb + V.ja]),
                  (ot = V.ya[V.aa + V.ja]),
                  (St = V.kc ? ot.Ad : 0))
                )
                  (bt.la = Et.la = 0),
                    ot.Za || (bt.Na = Et.Na = 0),
                    (ot.Hc = 0),
                    (ot.Gc = 0),
                    (ot.ia = 0);
                else {
                  var ge, Zt;
                  if (
                    ((bt = Et),
                    (Et = gt),
                    (St = V.Pa.Xc),
                    (Dt = V.ya[V.aa + V.ja]),
                    (Pt = V.pb[Dt.$b]),
                    (mt = Dt.ad),
                    (ue = 0),
                    (fe = V.rb[V.sb - 1]),
                    (re = oe = 0),
                    s(mt, ue, 0, 384),
                    Dt.Za)
                  )
                    var Te = 0,
                      dn = St[3];
                  else {
                    ve = a(16);
                    var De = bt.Na + fe.Na;
                    if (
                      ((De = ba(Et, St[1], De, Pt.Eb, 0, ve, 0)),
                      (bt.Na = fe.Na = (0 < De) + 0),
                      1 < De)
                    )
                      Ii(ve, 0, mt, ue);
                    else {
                      var pn = (ve[0] + 3) >> 3;
                      for (ve = 0; 256 > ve; ve += 16) mt[ue + ve] = pn;
                    }
                    (Te = 1), (dn = St[0]);
                  }
                  var he = 15 & bt.la,
                    wn = 15 & fe.la;
                  for (ve = 0; 4 > ve; ++ve) {
                    var xn = 1 & wn;
                    for (pn = Zt = 0; 4 > pn; ++pn)
                      (he =
                        (he >> 1) |
                        ((xn =
                          (De = ba(
                            Et,
                            dn,
                            (De = xn + (1 & he)),
                            Pt.Sc,
                            Te,
                            mt,
                            ue,
                          )) > Te) <<
                          7)),
                        (Zt =
                          (Zt << 2) |
                          (3 < De ? 3 : 1 < De ? 2 : mt[ue + 0] != 0)),
                        (ue += 16);
                    (he >>= 4),
                      (wn = (wn >> 1) | (xn << 7)),
                      (oe = ((oe << 8) | Zt) >>> 0);
                  }
                  for (dn = he, Te = wn >> 4, ge = 0; 4 > ge; ge += 2) {
                    for (
                      Zt = 0,
                        he = bt.la >> (4 + ge),
                        wn = fe.la >> (4 + ge),
                        ve = 0;
                      2 > ve;
                      ++ve
                    ) {
                      for (xn = 1 & wn, pn = 0; 2 > pn; ++pn)
                        (De = xn + (1 & he)),
                          (he =
                            (he >> 1) |
                            ((xn =
                              0 < (De = ba(Et, St[2], De, Pt.Qc, 0, mt, ue))) <<
                              3)),
                          (Zt =
                            (Zt << 2) |
                            (3 < De ? 3 : 1 < De ? 2 : mt[ue + 0] != 0)),
                          (ue += 16);
                      (he >>= 2), (wn = (wn >> 1) | (xn << 5));
                    }
                    (re |= Zt << (4 * ge)),
                      (dn |= (he << 4) << ge),
                      (Te |= (240 & wn) << ge);
                  }
                  (bt.la = dn),
                    (fe.la = Te),
                    (Dt.Hc = oe),
                    (Dt.Gc = re),
                    (Dt.ia = 43690 & re ? 0 : Pt.ia),
                    (St = !(oe | re));
                }
                if (
                  (0 < V.L &&
                    ((V.wa[V.Y + V.ja] = V.gd[ot.$b][ot.Za]),
                    (V.wa[V.Y + V.ja].La |= !St)),
                  gt.Ka)
                )
                  return Ce($, 7, "Premature end-of-file encountered.");
              }
              if (
                (Ji($),
                (V = vt),
                (gt = 1),
                (ot = (H = $).D),
                (bt = 0 < H.L && H.M >= H.zb && H.M <= H.Va),
                H.Aa == 0)
              )
                t: {
                  if (
                    ((ot.M = H.M),
                    (ot.uc = bt),
                    la(H, ot),
                    (gt = 1),
                    (ot = (Zt = H.D).Nb),
                    (bt = (re = ho[H.L]) * H.R),
                    (Et = (re / 2) * H.B),
                    (ve = 16 * ot * H.R),
                    (pn = 8 * ot * H.B),
                    (St = H.sa),
                    (Dt = H.ta - bt + ve),
                    (Pt = H.qa),
                    (mt = H.ra - Et + pn),
                    (ue = H.Ha),
                    (fe = H.Ia - Et + pn),
                    (wn = (he = Zt.M) == 0),
                    (oe = he >= H.Va - 1),
                    H.Aa == 2 && la(H, Zt),
                    Zt.uc)
                  )
                    for (
                      xn = (De = H).D.M, t(De.D.uc), Zt = De.yb;
                      Zt < De.Hb;
                      ++Zt
                    ) {
                      (Te = Zt), (dn = xn);
                      var We = (Je = (ke = De).D).Nb;
                      ge = ke.R;
                      var Je = Je.wa[Je.Y + Te],
                        un = ke.sa,
                        Cn = ke.ta + 16 * We * ge + 16 * Te,
                        ir = Je.dd,
                        Ve = Je.tc;
                      if (Ve != 0)
                        if ((t(3 <= Ve), ke.L == 1))
                          0 < Te && kr(un, Cn, ge, Ve + 4),
                            Je.La && _n(un, Cn, ge, Ve),
                            0 < dn && Qr(un, Cn, ge, Ve + 4),
                            Je.La && ma(un, Cn, ge, Ve);
                        else {
                          var br = ke.B,
                            ti = ke.qa,
                            Oi = ke.ra + 8 * We * br + 8 * Te,
                            Fr = ke.Ha,
                            ke = ke.Ia + 8 * We * br + 8 * Te;
                          (We = Je.ld),
                            0 < Te &&
                              (no(un, Cn, ge, Ve + 4, ir, We),
                              Xr(ti, Oi, Fr, ke, br, Ve + 4, ir, We)),
                            Je.La &&
                              (Pr(un, Cn, ge, Ve, ir, We),
                              Fi(ti, Oi, Fr, ke, br, Ve, ir, We)),
                            0 < dn &&
                              (Ci(un, Cn, ge, Ve + 4, ir, We),
                              ga(ti, Oi, Fr, ke, br, Ve + 4, ir, We)),
                            Je.La &&
                              (Kr(un, Cn, ge, Ve, ir, We),
                              Zr(ti, Oi, Fr, ke, br, Ve, ir, We));
                        }
                    }
                  if ((H.ia && alert("todo:DitherRow"), V.put != null)) {
                    if (
                      ((Zt = 16 * he),
                      (he = 16 * (he + 1)),
                      wn
                        ? ((V.y = H.sa),
                          (V.O = H.ta + ve),
                          (V.f = H.qa),
                          (V.N = H.ra + pn),
                          (V.ea = H.Ha),
                          (V.W = H.Ia + pn))
                        : ((Zt -= re),
                          (V.y = St),
                          (V.O = Dt),
                          (V.f = Pt),
                          (V.N = mt),
                          (V.ea = ue),
                          (V.W = fe)),
                      oe || (he -= re),
                      he > V.o && (he = V.o),
                      (V.F = null),
                      (V.J = null),
                      H.Fa != null &&
                        0 < H.Fa.length &&
                        Zt < he &&
                        ((V.J = sa(H, V, Zt, he - Zt)),
                        (V.F = H.mb),
                        V.F == null && V.F.length == 0))
                    ) {
                      gt = Ce(H, 3, "Could not decode alpha data.");
                      break t;
                    }
                    Zt < V.j &&
                      ((re = V.j - Zt),
                      (Zt = V.j),
                      t(!(1 & re)),
                      (V.O += H.R * re),
                      (V.N += H.B * (re >> 1)),
                      (V.W += H.B * (re >> 1)),
                      V.F != null && (V.J += V.width * re)),
                      Zt < he &&
                        ((V.O += V.v),
                        (V.N += V.v >> 1),
                        (V.W += V.v >> 1),
                        V.F != null && (V.J += V.v),
                        (V.ka = Zt - V.j),
                        (V.U = V.va - V.v),
                        (V.T = he - Zt),
                        (gt = V.put(V)));
                  }
                  ot + 1 != H.Ic ||
                    oe ||
                    (i(H.sa, H.ta - bt, St, Dt + 16 * H.R, bt),
                    i(H.qa, H.ra - Et, Pt, mt + 8 * H.B, Et),
                    i(H.Ha, H.Ia - Et, ue, fe + 8 * H.B, Et));
                }
              if (!gt) return Ce($, 6, "Output aborted.");
            }
            return 1;
          })(r, o)),
          o.bc != null && o.bc(o),
          (f &= 1);
      }
      return f ? ((r.cb = 0), f) : 0;
    }
    function qn(r, o, f, d, b) {
      (b = r[o + f + 32 * d] + (b >> 3)),
        (r[o + f + 32 * d] = -256 & b ? (0 > b ? 0 : 255) : b);
    }
    function gi(r, o, f, d, b, w) {
      qn(r, o, 0, f, d + b),
        qn(r, o, 1, f, d + w),
        qn(r, o, 2, f, d - w),
        qn(r, o, 3, f, d - b);
    }
    function cn(r) {
      return ((20091 * r) >> 16) + r;
    }
    function Xi(r, o, f, d) {
      var b,
        w = 0,
        x = a(16);
      for (b = 0; 4 > b; ++b) {
        var L = r[o + 0] + r[o + 8],
          S = r[o + 0] - r[o + 8],
          C = ((35468 * r[o + 4]) >> 16) - cn(r[o + 12]),
          U = cn(r[o + 4]) + ((35468 * r[o + 12]) >> 16);
        (x[w + 0] = L + U),
          (x[w + 1] = S + C),
          (x[w + 2] = S - C),
          (x[w + 3] = L - U),
          (w += 4),
          o++;
      }
      for (b = w = 0; 4 > b; ++b)
        (L = (r = x[w + 0] + 4) + x[w + 8]),
          (S = r - x[w + 8]),
          (C = ((35468 * x[w + 4]) >> 16) - cn(x[w + 12])),
          qn(f, d, 0, 0, L + (U = cn(x[w + 4]) + ((35468 * x[w + 12]) >> 16))),
          qn(f, d, 1, 0, S + C),
          qn(f, d, 2, 0, S - C),
          qn(f, d, 3, 0, L - U),
          w++,
          (d += 32);
    }
    function Da(r, o, f, d) {
      var b = r[o + 0] + 4,
        w = (35468 * r[o + 4]) >> 16,
        x = cn(r[o + 4]),
        L = (35468 * r[o + 1]) >> 16;
      gi(f, d, 0, b + x, (r = cn(r[o + 1])), L),
        gi(f, d, 1, b + w, r, L),
        gi(f, d, 2, b - w, r, L),
        gi(f, d, 3, b - x, r, L);
    }
    function es(r, o, f, d, b) {
      Xi(r, o, f, d), b && Xi(r, o + 16, f, d + 4);
    }
    function Ra(r, o, f, d) {
      gr(r, o + 0, f, d, 1), gr(r, o + 32, f, d + 128, 1);
    }
    function ns(r, o, f, d) {
      var b;
      for (r = r[o + 0] + 4, b = 0; 4 > b; ++b)
        for (o = 0; 4 > o; ++o) qn(f, d, o, b, r);
    }
    function za(r, o, f, d) {
      r[o + 0] && sn(r, o + 0, f, d),
        r[o + 16] && sn(r, o + 16, f, d + 4),
        r[o + 32] && sn(r, o + 32, f, d + 128),
        r[o + 48] && sn(r, o + 48, f, d + 128 + 4);
    }
    function rs(r, o, f, d) {
      var b,
        w = a(16);
      for (b = 0; 4 > b; ++b) {
        var x = r[o + 0 + b] + r[o + 12 + b],
          L = r[o + 4 + b] + r[o + 8 + b],
          S = r[o + 4 + b] - r[o + 8 + b],
          C = r[o + 0 + b] - r[o + 12 + b];
        (w[0 + b] = x + L),
          (w[8 + b] = x - L),
          (w[4 + b] = C + S),
          (w[12 + b] = C - S);
      }
      for (b = 0; 4 > b; ++b)
        (x = (r = w[0 + 4 * b] + 3) + w[3 + 4 * b]),
          (L = w[1 + 4 * b] + w[2 + 4 * b]),
          (S = w[1 + 4 * b] - w[2 + 4 * b]),
          (C = r - w[3 + 4 * b]),
          (f[d + 0] = (x + L) >> 3),
          (f[d + 16] = (C + S) >> 3),
          (f[d + 32] = (x - L) >> 3),
          (f[d + 48] = (C - S) >> 3),
          (d += 64);
    }
    function Ki(r, o, f) {
      var d,
        b = o - 32,
        w = yn,
        x = 255 - r[b - 1];
      for (d = 0; d < f; ++d) {
        var L,
          S = w,
          C = x + r[o - 1];
        for (L = 0; L < f; ++L) r[o + L] = S[C + r[b + L]];
        o += 32;
      }
    }
    function is(r, o) {
      Ki(r, o, 4);
    }
    function as(r, o) {
      Ki(r, o, 8);
    }
    function os(r, o) {
      Ki(r, o, 16);
    }
    function fr(r, o) {
      var f;
      for (f = 0; 16 > f; ++f) i(r, o + 32 * f, r, o - 32, 16);
    }
    function mi(r, o) {
      var f;
      for (f = 16; 0 < f; --f) s(r, o, r[o - 1], 16), (o += 32);
    }
    function vi(r, o, f) {
      var d;
      for (d = 0; 16 > d; ++d) s(o, f + 32 * d, r, 16);
    }
    function Ua(r, o) {
      var f,
        d = 16;
      for (f = 0; 16 > f; ++f) d += r[o - 1 + 32 * f] + r[o + f - 32];
      vi(d >> 5, r, o);
    }
    function Ke(r, o) {
      var f,
        d = 8;
      for (f = 0; 16 > f; ++f) d += r[o - 1 + 32 * f];
      vi(d >> 4, r, o);
    }
    function ss(r, o) {
      var f,
        d = 8;
      for (f = 0; 16 > f; ++f) d += r[o + f - 32];
      vi(d >> 4, r, o);
    }
    function Ha(r, o) {
      vi(128, r, o);
    }
    function Vt(r, o, f) {
      return (r + 2 * o + f + 2) >> 2;
    }
    function us(r, o) {
      var f,
        d = o - 32;
      for (
        d = new Uint8Array([
          Vt(r[d - 1], r[d + 0], r[d + 1]),
          Vt(r[d + 0], r[d + 1], r[d + 2]),
          Vt(r[d + 1], r[d + 2], r[d + 3]),
          Vt(r[d + 2], r[d + 3], r[d + 4]),
        ]),
          f = 0;
        4 > f;
        ++f
      )
        i(r, o + 32 * f, d, 0, d.length);
    }
    function ls(r, o) {
      var f = r[o - 1],
        d = r[o - 1 + 32],
        b = r[o - 1 + 64],
        w = r[o - 1 + 96];
      Nt(r, o + 0, 16843009 * Vt(r[o - 1 - 32], f, d)),
        Nt(r, o + 32, 16843009 * Vt(f, d, b)),
        Nt(r, o + 64, 16843009 * Vt(d, b, w)),
        Nt(r, o + 96, 16843009 * Vt(b, w, w));
    }
    function er(r, o) {
      var f,
        d = 4;
      for (f = 0; 4 > f; ++f) d += r[o + f - 32] + r[o - 1 + 32 * f];
      for (d >>= 3, f = 0; 4 > f; ++f) s(r, o + 32 * f, d, 4);
    }
    function Wa(r, o) {
      var f = r[o - 1 + 0],
        d = r[o - 1 + 32],
        b = r[o - 1 + 64],
        w = r[o - 1 - 32],
        x = r[o + 0 - 32],
        L = r[o + 1 - 32],
        S = r[o + 2 - 32],
        C = r[o + 3 - 32];
      (r[o + 0 + 96] = Vt(d, b, r[o - 1 + 96])),
        (r[o + 1 + 96] = r[o + 0 + 64] = Vt(f, d, b)),
        (r[o + 2 + 96] = r[o + 1 + 64] = r[o + 0 + 32] = Vt(w, f, d)),
        (r[o + 3 + 96] =
          r[o + 2 + 64] =
          r[o + 1 + 32] =
          r[o + 0 + 0] =
            Vt(x, w, f)),
        (r[o + 3 + 64] = r[o + 2 + 32] = r[o + 1 + 0] = Vt(L, x, w)),
        (r[o + 3 + 32] = r[o + 2 + 0] = Vt(S, L, x)),
        (r[o + 3 + 0] = Vt(C, S, L));
    }
    function Va(r, o) {
      var f = r[o + 1 - 32],
        d = r[o + 2 - 32],
        b = r[o + 3 - 32],
        w = r[o + 4 - 32],
        x = r[o + 5 - 32],
        L = r[o + 6 - 32],
        S = r[o + 7 - 32];
      (r[o + 0 + 0] = Vt(r[o + 0 - 32], f, d)),
        (r[o + 1 + 0] = r[o + 0 + 32] = Vt(f, d, b)),
        (r[o + 2 + 0] = r[o + 1 + 32] = r[o + 0 + 64] = Vt(d, b, w)),
        (r[o + 3 + 0] =
          r[o + 2 + 32] =
          r[o + 1 + 64] =
          r[o + 0 + 96] =
            Vt(b, w, x)),
        (r[o + 3 + 32] = r[o + 2 + 64] = r[o + 1 + 96] = Vt(w, x, L)),
        (r[o + 3 + 64] = r[o + 2 + 96] = Vt(x, L, S)),
        (r[o + 3 + 96] = Vt(L, S, S));
    }
    function bi(r, o) {
      var f = r[o - 1 + 0],
        d = r[o - 1 + 32],
        b = r[o - 1 + 64],
        w = r[o - 1 - 32],
        x = r[o + 0 - 32],
        L = r[o + 1 - 32],
        S = r[o + 2 - 32],
        C = r[o + 3 - 32];
      (r[o + 0 + 0] = r[o + 1 + 64] = (w + x + 1) >> 1),
        (r[o + 1 + 0] = r[o + 2 + 64] = (x + L + 1) >> 1),
        (r[o + 2 + 0] = r[o + 3 + 64] = (L + S + 1) >> 1),
        (r[o + 3 + 0] = (S + C + 1) >> 1),
        (r[o + 0 + 96] = Vt(b, d, f)),
        (r[o + 0 + 64] = Vt(d, f, w)),
        (r[o + 0 + 32] = r[o + 1 + 96] = Vt(f, w, x)),
        (r[o + 1 + 32] = r[o + 2 + 96] = Vt(w, x, L)),
        (r[o + 2 + 32] = r[o + 3 + 96] = Vt(x, L, S)),
        (r[o + 3 + 32] = Vt(L, S, C));
    }
    function Zi(r, o) {
      var f = r[o + 0 - 32],
        d = r[o + 1 - 32],
        b = r[o + 2 - 32],
        w = r[o + 3 - 32],
        x = r[o + 4 - 32],
        L = r[o + 5 - 32],
        S = r[o + 6 - 32],
        C = r[o + 7 - 32];
      (r[o + 0 + 0] = (f + d + 1) >> 1),
        (r[o + 1 + 0] = r[o + 0 + 64] = (d + b + 1) >> 1),
        (r[o + 2 + 0] = r[o + 1 + 64] = (b + w + 1) >> 1),
        (r[o + 3 + 0] = r[o + 2 + 64] = (w + x + 1) >> 1),
        (r[o + 0 + 32] = Vt(f, d, b)),
        (r[o + 1 + 32] = r[o + 0 + 96] = Vt(d, b, w)),
        (r[o + 2 + 32] = r[o + 1 + 96] = Vt(b, w, x)),
        (r[o + 3 + 32] = r[o + 2 + 96] = Vt(w, x, L)),
        (r[o + 3 + 64] = Vt(x, L, S)),
        (r[o + 3 + 96] = Vt(L, S, C));
    }
    function cs(r, o) {
      var f = r[o - 1 + 0],
        d = r[o - 1 + 32],
        b = r[o - 1 + 64],
        w = r[o - 1 + 96];
      (r[o + 0 + 0] = (f + d + 1) >> 1),
        (r[o + 2 + 0] = r[o + 0 + 32] = (d + b + 1) >> 1),
        (r[o + 2 + 32] = r[o + 0 + 64] = (b + w + 1) >> 1),
        (r[o + 1 + 0] = Vt(f, d, b)),
        (r[o + 3 + 0] = r[o + 1 + 32] = Vt(d, b, w)),
        (r[o + 3 + 32] = r[o + 1 + 64] = Vt(b, w, w)),
        (r[o + 3 + 64] =
          r[o + 2 + 64] =
          r[o + 0 + 96] =
          r[o + 1 + 96] =
          r[o + 2 + 96] =
          r[o + 3 + 96] =
            w);
    }
    function fs(r, o) {
      var f = r[o - 1 + 0],
        d = r[o - 1 + 32],
        b = r[o - 1 + 64],
        w = r[o - 1 + 96],
        x = r[o - 1 - 32],
        L = r[o + 0 - 32],
        S = r[o + 1 - 32],
        C = r[o + 2 - 32];
      (r[o + 0 + 0] = r[o + 2 + 32] = (f + x + 1) >> 1),
        (r[o + 0 + 32] = r[o + 2 + 64] = (d + f + 1) >> 1),
        (r[o + 0 + 64] = r[o + 2 + 96] = (b + d + 1) >> 1),
        (r[o + 0 + 96] = (w + b + 1) >> 1),
        (r[o + 3 + 0] = Vt(L, S, C)),
        (r[o + 2 + 0] = Vt(x, L, S)),
        (r[o + 1 + 0] = r[o + 3 + 32] = Vt(f, x, L)),
        (r[o + 1 + 32] = r[o + 3 + 64] = Vt(d, f, x)),
        (r[o + 1 + 64] = r[o + 3 + 96] = Vt(b, d, f)),
        (r[o + 1 + 96] = Vt(w, b, d));
    }
    function hs(r, o) {
      var f;
      for (f = 0; 8 > f; ++f) i(r, o + 32 * f, r, o - 32, 8);
    }
    function Qi(r, o) {
      var f;
      for (f = 0; 8 > f; ++f) s(r, o, r[o - 1], 8), (o += 32);
    }
    function Vr(r, o, f) {
      var d;
      for (d = 0; 8 > d; ++d) s(o, f + 32 * d, r, 8);
    }
    function Ar(r, o) {
      var f,
        d = 8;
      for (f = 0; 8 > f; ++f) d += r[o + f - 32] + r[o - 1 + 32 * f];
      Vr(d >> 4, r, o);
    }
    function ds(r, o) {
      var f,
        d = 4;
      for (f = 0; 8 > f; ++f) d += r[o + f - 32];
      Vr(d >> 3, r, o);
    }
    function Gr(r, o) {
      var f,
        d = 4;
      for (f = 0; 8 > f; ++f) d += r[o - 1 + 32 * f];
      Vr(d >> 3, r, o);
    }
    function ta(r, o) {
      Vr(128, r, o);
    }
    function yi(r, o, f) {
      var d = r[o - f],
        b = r[o + 0],
        w = 3 * (b - d) + ys[1020 + r[o - 2 * f] - r[o + f]],
        x = io[112 + ((w + 4) >> 3)];
      (r[o - f] = yn[255 + d + io[112 + ((w + 3) >> 3)]]),
        (r[o + 0] = yn[255 + b - x]);
    }
    function Ga(r, o, f, d) {
      var b = r[o + 0],
        w = r[o + f];
      return kn[255 + r[o - 2 * f] - r[o - f]] > d || kn[255 + w - b] > d;
    }
    function $a(r, o, f, d) {
      return (
        4 * kn[255 + r[o - f] - r[o + 0]] + kn[255 + r[o - 2 * f] - r[o + f]] <=
        d
      );
    }
    function Ya(r, o, f, d, b) {
      var w = r[o - 3 * f],
        x = r[o - 2 * f],
        L = r[o - f],
        S = r[o + 0],
        C = r[o + f],
        U = r[o + 2 * f],
        X = r[o + 3 * f];
      return 4 * kn[255 + L - S] + kn[255 + x - C] > d
        ? 0
        : kn[255 + r[o - 4 * f] - w] <= b &&
            kn[255 + w - x] <= b &&
            kn[255 + x - L] <= b &&
            kn[255 + X - U] <= b &&
            kn[255 + U - C] <= b &&
            kn[255 + C - S] <= b;
    }
    function Ja(r, o, f, d) {
      var b = 2 * d + 1;
      for (d = 0; 16 > d; ++d) $a(r, o + d, f, b) && yi(r, o + d, f);
    }
    function nr(r, o, f, d) {
      var b = 2 * d + 1;
      for (d = 0; 16 > d; ++d) $a(r, o + d * f, 1, b) && yi(r, o + d * f, 1);
    }
    function hr(r, o, f, d) {
      var b;
      for (b = 3; 0 < b; --b) Ja(r, (o += 4 * f), f, d);
    }
    function ps(r, o, f, d) {
      var b;
      for (b = 3; 0 < b; --b) nr(r, (o += 4), f, d);
    }
    function Nr(r, o, f, d, b, w, x, L) {
      for (w = 2 * w + 1; 0 < b--; ) {
        if (Ya(r, o, f, w, x))
          if (Ga(r, o, f, L)) yi(r, o, f);
          else {
            var S = r,
              C = o,
              U = f,
              X = S[C - 2 * U],
              K = S[C - U],
              $ = S[C + 0],
              vt = S[C + U],
              ot = S[C + 2 * U],
              H =
                (27 * (gt = ys[1020 + 3 * ($ - K) + ys[1020 + X - vt]]) + 63) >>
                7,
              V = (18 * gt + 63) >> 7,
              gt = (9 * gt + 63) >> 7;
            (S[C - 3 * U] = yn[255 + S[C - 3 * U] + gt]),
              (S[C - 2 * U] = yn[255 + X + V]),
              (S[C - U] = yn[255 + K + H]),
              (S[C + 0] = yn[255 + $ - H]),
              (S[C + U] = yn[255 + vt - V]),
              (S[C + 2 * U] = yn[255 + ot - gt]);
          }
        o += d;
      }
    }
    function Tn(r, o, f, d, b, w, x, L) {
      for (w = 2 * w + 1; 0 < b--; ) {
        if (Ya(r, o, f, w, x))
          if (Ga(r, o, f, L)) yi(r, o, f);
          else {
            var S = r,
              C = o,
              U = f,
              X = S[C - U],
              K = S[C + 0],
              $ = S[C + U],
              vt = io[112 + (((ot = 3 * (K - X)) + 4) >> 3)],
              ot = io[112 + ((ot + 3) >> 3)],
              H = (vt + 1) >> 1;
            (S[C - 2 * U] = yn[255 + S[C - 2 * U] + H]),
              (S[C - U] = yn[255 + X + ot]),
              (S[C + 0] = yn[255 + K - vt]),
              (S[C + U] = yn[255 + $ - H]);
          }
        o += d;
      }
    }
    function ea(r, o, f, d, b, w) {
      Nr(r, o, f, 1, 16, d, b, w);
    }
    function $r(r, o, f, d, b, w) {
      Nr(r, o, 1, f, 16, d, b, w);
    }
    function gs(r, o, f, d, b, w) {
      var x;
      for (x = 3; 0 < x; --x) Tn(r, (o += 4 * f), f, 1, 16, d, b, w);
    }
    function wi(r, o, f, d, b, w) {
      var x;
      for (x = 3; 0 < x; --x) Tn(r, (o += 4), 1, f, 16, d, b, w);
    }
    function ms(r, o, f, d, b, w, x, L) {
      Nr(r, o, b, 1, 8, w, x, L), Nr(f, d, b, 1, 8, w, x, L);
    }
    function na(r, o, f, d, b, w, x, L) {
      Nr(r, o, 1, b, 8, w, x, L), Nr(f, d, 1, b, 8, w, x, L);
    }
    function ra(r, o, f, d, b, w, x, L) {
      Tn(r, o + 4 * b, b, 1, 8, w, x, L), Tn(f, d + 4 * b, b, 1, 8, w, x, L);
    }
    function Xa(r, o, f, d, b, w, x, L) {
      Tn(r, o + 4, 1, b, 8, w, x, L), Tn(f, d + 4, 1, b, 8, w, x, L);
    }
    function xi() {
      (this.ba = new jn()),
        (this.ec = []),
        (this.cc = []),
        (this.Mc = []),
        (this.Dc = this.Nc = this.dc = this.fc = 0),
        (this.Oa = new _e()),
        (this.memory = 0),
        (this.Ib = "OutputFunc"),
        (this.Jb = "OutputAlphaFunc"),
        (this.Nd = "OutputRowFunc");
    }
    function ia() {
      (this.data = []),
        (this.offset = this.kd = this.ha = this.w = 0),
        (this.na = []),
        (this.xa = this.gb = this.Ja = this.Sa = this.P = 0);
    }
    function aa() {
      (this.nc = this.Ea = this.b = this.hc = 0), (this.K = []), (this.w = 0);
    }
    function Ka() {
      (this.ua = 0),
        (this.Wa = new q()),
        (this.vb = new q()),
        (this.md = this.xc = this.wc = 0),
        (this.vc = []),
        (this.Wb = 0),
        (this.Ya = new T()),
        (this.yc = new I());
    }
    function vs() {
      (this.xb = this.a = 0),
        (this.l = new pi()),
        (this.ca = new jn()),
        (this.V = []),
        (this.Ba = 0),
        (this.Ta = []),
        (this.Ua = 0),
        (this.m = new A()),
        (this.Pb = 0),
        (this.wd = new A()),
        (this.Ma = this.$ = this.C = this.i = this.c = this.xd = 0),
        (this.s = new Ka()),
        (this.ab = 0),
        (this.gc = l(4, aa)),
        (this.Oc = 0);
    }
    function Ai() {
      (this.Lc = this.Z = this.$a = this.i = this.c = 0),
        (this.l = new pi()),
        (this.ic = 0),
        (this.ca = []),
        (this.tb = 0),
        (this.qd = null),
        (this.rd = 0);
    }
    function Yr(r, o, f, d, b, w, x) {
      for (r = r == null ? 0 : r[o + 0], o = 0; o < x; ++o)
        (b[w + o] = (r + f[d + o]) & 255), (r = b[w + o]);
    }
    function oa(r, o, f, d, b, w, x) {
      var L;
      if (r == null) Yr(null, null, f, d, b, w, x);
      else for (L = 0; L < x; ++L) b[w + L] = (r[o + L] + f[d + L]) & 255;
    }
    function Lr(r, o, f, d, b, w, x) {
      if (r == null) Yr(null, null, f, d, b, w, x);
      else {
        var L,
          S = r[o + 0],
          C = S,
          U = S;
        for (L = 0; L < x; ++L)
          (C = U + (S = r[o + L]) - C),
            (U = (f[d + L] + (-256 & C ? (0 > C ? 0 : 255) : C)) & 255),
            (C = S),
            (b[w + L] = U);
      }
    }
    function sa(r, o, f, d) {
      var b = o.width,
        w = o.o;
      if ((t(r != null && o != null), 0 > f || 0 >= d || f + d > w))
        return null;
      if (!r.Cc) {
        if (r.ga == null) {
          var x;
          if (
            ((r.ga = new Ai()),
            (x = r.ga == null) ||
              ((x = o.width * o.o),
              t(r.Gb.length == 0),
              (r.Gb = a(x)),
              (r.Uc = 0),
              r.Gb == null
                ? (x = 0)
                : ((r.mb = r.Gb), (r.nb = r.Uc), (r.rc = null), (x = 1)),
              (x = !x)),
            !x)
          ) {
            x = r.ga;
            var L = r.Fa,
              S = r.P,
              C = r.qc,
              U = r.mb,
              X = r.nb,
              K = S + 1,
              $ = C - 1,
              vt = x.l;
            if (
              (t(L != null && U != null && o != null),
              (Cr[0] = null),
              (Cr[1] = Yr),
              (Cr[2] = oa),
              (Cr[3] = Lr),
              (x.ca = U),
              (x.tb = X),
              (x.c = o.width),
              (x.i = o.height),
              t(0 < x.c && 0 < x.i),
              1 >= C)
            )
              o = 0;
            else if (
              ((x.$a = (L[S + 0] >> 0) & 3),
              (x.Z = (L[S + 0] >> 2) & 3),
              (x.Lc = (L[S + 0] >> 4) & 3),
              (S = (L[S + 0] >> 6) & 3),
              0 > x.$a || 1 < x.$a || 4 <= x.Z || 1 < x.Lc || S)
            )
              o = 0;
            else if (
              ((vt.put = Xn),
              (vt.ac = $e),
              (vt.bc = Kn),
              (vt.ma = x),
              (vt.width = o.width),
              (vt.height = o.height),
              (vt.Da = o.Da),
              (vt.v = o.v),
              (vt.va = o.va),
              (vt.j = o.j),
              (vt.o = o.o),
              x.$a)
            )
              t: {
                t(x.$a == 1), (o = Nn());
                e: for (;;) {
                  if (o == null) {
                    o = 0;
                    break t;
                  }
                  if (
                    (t(x != null),
                    (x.mc = o),
                    (o.c = x.c),
                    (o.i = x.i),
                    (o.l = x.l),
                    (o.l.ma = x),
                    (o.l.width = x.c),
                    (o.l.height = x.i),
                    (o.a = 0),
                    Z(o.m, L, K, $),
                    !tr(x.c, x.i, 1, o, null) ||
                      (o.ab == 1 && o.gc[0].hc == 3 && cr(o.s)
                        ? ((x.ic = 1),
                          (L = o.c * o.i),
                          (o.Ta = null),
                          (o.Ua = 0),
                          (o.V = a(L)),
                          (o.Ba = 0),
                          o.V == null ? ((o.a = 1), (o = 0)) : (o = 1))
                        : ((x.ic = 0), (o = Wr(o, x.c))),
                      !o))
                  )
                    break e;
                  o = 1;
                  break t;
                }
                (x.mc = null), (o = 0);
              }
            else o = $ >= x.c * x.i;
            x = !o;
          }
          if (x) return null;
          r.ga.Lc != 1 ? (r.Ga = 0) : (d = w - f);
        }
        t(r.ga != null), t(f + d <= w);
        t: {
          if (((o = (L = r.ga).c), (w = L.l.o), L.$a == 0)) {
            if (
              ((K = r.rc),
              ($ = r.Vc),
              (vt = r.Fa),
              (S = r.P + 1 + f * o),
              (C = r.mb),
              (U = r.nb + f * o),
              t(S <= r.P + r.qc),
              L.Z != 0)
            )
              for (t(Cr[L.Z] != null), x = 0; x < d; ++x)
                Cr[L.Z](K, $, vt, S, C, U, o),
                  (K = C),
                  ($ = U),
                  (U += o),
                  (S += o);
            else
              for (x = 0; x < d; ++x)
                i(C, U, vt, S, o), (K = C), ($ = U), (U += o), (S += o);
            (r.rc = K), (r.Vc = $);
          } else {
            if (
              (t(L.mc != null),
              (o = f + d),
              t((x = L.mc) != null),
              t(o <= x.i),
              x.C >= o)
            )
              o = 1;
            else if ((L.ic || J(), L.ic)) {
              (L = x.V), (K = x.Ba), ($ = x.c);
              var ot = x.i,
                H =
                  ((vt = 1),
                  (S = x.$ / $),
                  (C = x.$ % $),
                  (U = x.m),
                  (X = x.s),
                  x.$),
                V = $ * ot,
                gt = $ * o,
                bt = X.wc,
                mt = H < gt ? Be(X, C, S) : null;
              t(H <= V), t(o <= ot), t(cr(X));
              e: for (;;) {
                for (; !U.h && H < gt; ) {
                  if (
                    (C & bt || (mt = Be(X, C, S)),
                    t(mt != null),
                    Y(U),
                    256 > (ot = ln(mt.G[0], mt.H[0], U)))
                  )
                    (L[K + H] = ot),
                      ++H,
                      ++C >= $ && ((C = 0), ++S <= o && !(S % 16) && Mn(x, S));
                  else {
                    if (!(280 > ot)) {
                      vt = 0;
                      break e;
                    }
                    ot = On(ot - 256, U);
                    var Et,
                      St = ln(mt.G[4], mt.H[4], U);
                    if (
                      (Y(U),
                      !(H >= (St = Zn($, (St = On(St, U)))) && V - H >= ot))
                    ) {
                      vt = 0;
                      break e;
                    }
                    for (Et = 0; Et < ot; ++Et)
                      L[K + H + Et] = L[K + H + Et - St];
                    for (H += ot, C += ot; C >= $; )
                      (C -= $), ++S <= o && !(S % 16) && Mn(x, S);
                    H < gt && C & bt && (mt = Be(X, C, S));
                  }
                  t(U.h == B(U));
                }
                Mn(x, S > o ? o : S);
                break e;
              }
              !vt || (U.h && H < V)
                ? ((vt = 0), (x.a = U.h ? 5 : 3))
                : (x.$ = H),
                (o = vt);
            } else o = Bn(x, x.V, x.Ba, x.c, x.i, o, li);
            if (!o) {
              d = 0;
              break t;
            }
          }
          f + d >= w && (r.Cc = 1), (d = 1);
        }
        if (!d) return null;
        if (
          r.Cc &&
          ((d = r.ga) != null && (d.mc = null), (r.ga = null), 0 < r.Ga)
        )
          return alert("todo:WebPDequantizeLevels"), null;
      }
      return r.nb + f * b;
    }
    function u(r, o, f, d, b, w) {
      for (; 0 < b--; ) {
        var x,
          L = r,
          S = o + (f ? 1 : 0),
          C = r,
          U = o + (f ? 0 : 3);
        for (x = 0; x < d; ++x) {
          var X = C[U + 4 * x];
          X != 255 &&
            ((X *= 32897),
            (L[S + 4 * x + 0] = (L[S + 4 * x + 0] * X) >> 23),
            (L[S + 4 * x + 1] = (L[S + 4 * x + 1] * X) >> 23),
            (L[S + 4 * x + 2] = (L[S + 4 * x + 2] * X) >> 23));
        }
        o += w;
      }
    }
    function y(r, o, f, d, b) {
      for (; 0 < d--; ) {
        var w;
        for (w = 0; w < f; ++w) {
          var x = r[o + 2 * w + 0],
            L = 15 & (C = r[o + 2 * w + 1]),
            S = 4369 * L,
            C = (((240 & C) | (C >> 4)) * S) >> 16;
          (r[o + 2 * w + 0] =
            (((((240 & x) | (x >> 4)) * S) >> 16) & 240) |
            ((((((15 & x) | (x << 4)) * S) >> 16) >> 4) & 15)),
            (r[o + 2 * w + 1] = (240 & C) | L);
        }
        o += b;
      }
    }
    function O(r, o, f, d, b, w, x, L) {
      var S,
        C,
        U = 255;
      for (C = 0; C < b; ++C) {
        for (S = 0; S < d; ++S) {
          var X = r[o + S];
          (w[x + 4 * S] = X), (U &= X);
        }
        (o += f), (x += L);
      }
      return U != 255;
    }
    function D(r, o, f, d, b) {
      var w;
      for (w = 0; w < b; ++w) f[d + w] = r[o + w] >> 8;
    }
    function J() {
      (Pn = u), (ye = y), (we = O), (je = D);
    }
    function lt(r, o, f) {
      z[r] = function (d, b, w, x, L, S, C, U, X, K, $, vt, ot, H, V, gt, bt) {
        var mt,
          Et = (bt - 1) >> 1,
          St = L[S + 0] | (C[U + 0] << 16),
          Dt = X[K + 0] | ($[vt + 0] << 16);
        t(d != null);
        var Pt = (3 * St + Dt + 131074) >> 2;
        for (
          o(d[b + 0], 255 & Pt, Pt >> 16, ot, H),
            w != null &&
              ((Pt = (3 * Dt + St + 131074) >> 2),
              o(w[x + 0], 255 & Pt, Pt >> 16, V, gt)),
            mt = 1;
          mt <= Et;
          ++mt
        ) {
          var ue = L[S + mt] | (C[U + mt] << 16),
            fe = X[K + mt] | ($[vt + mt] << 16),
            oe = St + ue + Dt + fe + 524296,
            re = (oe + 2 * (ue + Dt)) >> 3;
          (Pt = (re + St) >> 1),
            (St = ((oe = (oe + 2 * (St + fe)) >> 3) + ue) >> 1),
            o(d[b + 2 * mt - 1], 255 & Pt, Pt >> 16, ot, H + (2 * mt - 1) * f),
            o(d[b + 2 * mt - 0], 255 & St, St >> 16, ot, H + (2 * mt - 0) * f),
            w != null &&
              ((Pt = (oe + Dt) >> 1),
              (St = (re + fe) >> 1),
              o(
                w[x + 2 * mt - 1],
                255 & Pt,
                Pt >> 16,
                V,
                gt + (2 * mt - 1) * f,
              ),
              o(
                w[x + 2 * mt + 0],
                255 & St,
                St >> 16,
                V,
                gt + (2 * mt + 0) * f,
              )),
            (St = ue),
            (Dt = fe);
        }
        1 & bt ||
          ((Pt = (3 * St + Dt + 131074) >> 2),
          o(d[b + bt - 1], 255 & Pt, Pt >> 16, ot, H + (bt - 1) * f),
          w != null &&
            ((Pt = (3 * Dt + St + 131074) >> 2),
            o(w[x + bt - 1], 255 & Pt, Pt >> 16, V, gt + (bt - 1) * f)));
      };
    }
    function yt() {
      (In[ao] = sc),
        (In[oo] = bu),
        (In[du] = uc),
        (In[so] = yu),
        (In[uo] = wu),
        (In[ws] = xu),
        (In[pu] = lc),
        (In[xs] = bu),
        (In[As] = yu),
        (In[lo] = wu),
        (In[Ns] = xu);
    }
    function Ot(r) {
      return r & -16384 ? (0 > r ? 0 : 255) : r >> cc;
    }
    function Tt(r, o) {
      return Ot(((19077 * r) >> 8) + ((26149 * o) >> 8) - 14234);
    }
    function Kt(r, o, f) {
      return Ot(
        ((19077 * r) >> 8) - ((6419 * o) >> 8) - ((13320 * f) >> 8) + 8708,
      );
    }
    function Yt(r, o) {
      return Ot(((19077 * r) >> 8) + ((33050 * o) >> 8) - 17685);
    }
    function ie(r, o, f, d, b) {
      (d[b + 0] = Tt(r, f)), (d[b + 1] = Kt(r, o, f)), (d[b + 2] = Yt(r, o));
    }
    function Le(r, o, f, d, b) {
      (d[b + 0] = Yt(r, o)), (d[b + 1] = Kt(r, o, f)), (d[b + 2] = Tt(r, f));
    }
    function Pe(r, o, f, d, b) {
      var w = Kt(r, o, f);
      (o = ((w << 3) & 224) | (Yt(r, o) >> 3)),
        (d[b + 0] = (248 & Tt(r, f)) | (w >> 5)),
        (d[b + 1] = o);
    }
    function qe(r, o, f, d, b) {
      var w = (240 & Yt(r, o)) | 15;
      (d[b + 0] = (240 & Tt(r, f)) | (Kt(r, o, f) >> 4)), (d[b + 1] = w);
    }
    function Ze(r, o, f, d, b) {
      (d[b + 0] = 255), ie(r, o, f, d, b + 1);
    }
    function He(r, o, f, d, b) {
      Le(r, o, f, d, b), (d[b + 3] = 255);
    }
    function Dn(r, o, f, d, b) {
      ie(r, o, f, d, b), (d[b + 3] = 255);
    }
    function bn(r, o) {
      return 0 > r ? 0 : r > o ? o : r;
    }
    function rr(r, o, f) {
      z[r] = function (d, b, w, x, L, S, C, U, X) {
        for (var K = U + (-2 & X) * f; U != K; )
          o(d[b + 0], w[x + 0], L[S + 0], C, U),
            o(d[b + 1], w[x + 0], L[S + 0], C, U + f),
            (b += 2),
            ++x,
            ++S,
            (U += 2 * f);
        1 & X && o(d[b + 0], w[x + 0], L[S + 0], C, U);
      };
    }
    function Za(r, o, f) {
      return f == 0 ? (r == 0 ? (o == 0 ? 6 : 5) : o == 0 ? 4 : 0) : f;
    }
    function ua(r, o, f, d, b) {
      switch (r >>> 30) {
        case 3:
          gr(o, f, d, b, 0);
          break;
        case 2:
          Fe(o, f, d, b);
          break;
        case 1:
          sn(o, f, d, b);
      }
    }
    function la(r, o) {
      var f,
        d,
        b = o.M,
        w = o.Nb,
        x = r.oc,
        L = r.pc + 40,
        S = r.oc,
        C = r.pc + 584,
        U = r.oc,
        X = r.pc + 600;
      for (f = 0; 16 > f; ++f) x[L + 32 * f - 1] = 129;
      for (f = 0; 8 > f; ++f)
        (S[C + 32 * f - 1] = 129), (U[X + 32 * f - 1] = 129);
      for (
        0 < b
          ? (x[L - 1 - 32] = S[C - 1 - 32] = U[X - 1 - 32] = 129)
          : (s(x, L - 32 - 1, 127, 21),
            s(S, C - 32 - 1, 127, 9),
            s(U, X - 32 - 1, 127, 9)),
          d = 0;
        d < r.za;
        ++d
      ) {
        var K = o.ya[o.aa + d];
        if (0 < d) {
          for (f = -1; 16 > f; ++f) i(x, L + 32 * f - 4, x, L + 32 * f + 12, 4);
          for (f = -1; 8 > f; ++f)
            i(S, C + 32 * f - 4, S, C + 32 * f + 4, 4),
              i(U, X + 32 * f - 4, U, X + 32 * f + 4, 4);
        }
        var $ = r.Gd,
          vt = r.Hd + d,
          ot = K.ad,
          H = K.Hc;
        if (
          (0 < b &&
            (i(x, L - 32, $[vt].y, 0, 16),
            i(S, C - 32, $[vt].f, 0, 8),
            i(U, X - 32, $[vt].ea, 0, 8)),
          K.Za)
        ) {
          var V = x,
            gt = L - 32 + 16;
          for (
            0 < b &&
              (d >= r.za - 1
                ? s(V, gt, $[vt].y[15], 4)
                : i(V, gt, $[vt + 1].y, 0, 4)),
              f = 0;
            4 > f;
            f++
          )
            V[gt + 128 + f] = V[gt + 256 + f] = V[gt + 384 + f] = V[gt + 0 + f];
          for (f = 0; 16 > f; ++f, H <<= 2)
            (V = x),
              (gt = L + Nu[f]),
              Rn[K.Ob[f]](V, gt),
              ua(H, ot, 16 * +f, V, gt);
        } else if (((V = Za(d, b, K.Ob[0])), Ir[V](x, L), H != 0))
          for (f = 0; 16 > f; ++f, H <<= 2) ua(H, ot, 16 * +f, x, L + Nu[f]);
        for (
          f = K.Gc,
            V = Za(d, b, K.Dd),
            vr[V](S, C),
            vr[V](U, X),
            H = ot,
            V = S,
            gt = C,
            255 & (K = f >> 0) &&
              (170 & K ? pa(H, 256, V, gt) : Sn(H, 256, V, gt)),
            K = U,
            H = X,
            255 & (f >>= 8) &&
              (170 & f ? pa(ot, 320, K, H) : Sn(ot, 320, K, H)),
            b < r.Ub - 1 &&
              (i($[vt].y, 0, x, L + 480, 16),
              i($[vt].f, 0, S, C + 224, 8),
              i($[vt].ea, 0, U, X + 224, 8)),
            f = 8 * w * r.B,
            $ = r.sa,
            vt = r.ta + 16 * d + 16 * w * r.R,
            ot = r.qa,
            K = r.ra + 8 * d + f,
            H = r.Ha,
            V = r.Ia + 8 * d + f,
            f = 0;
          16 > f;
          ++f
        )
          i($, vt + f * r.R, x, L + 32 * f, 16);
        for (f = 0; 8 > f; ++f)
          i(ot, K + f * r.B, S, C + 32 * f, 8),
            i(H, V + f * r.B, U, X + 32 * f, 8);
      }
    }
    function Ni(r, o, f, d, b, w, x, L, S) {
      var C = [0],
        U = [0],
        X = 0,
        K = S != null ? S.kd : 0,
        $ = S ?? new ia();
      if (r == null || 12 > f) return 7;
      ($.data = r),
        ($.w = o),
        ($.ha = f),
        (o = [o]),
        (f = [f]),
        ($.gb = [$.gb]);
      t: {
        var vt = o,
          ot = f,
          H = $.gb;
        if (
          (t(r != null),
          t(ot != null),
          t(H != null),
          (H[0] = 0),
          12 <= ot[0] && !e(r, vt[0], "RIFF"))
        ) {
          if (e(r, vt[0] + 8, "WEBP")) {
            H = 3;
            break t;
          }
          var V = _t(r, vt[0] + 4);
          if (12 > V || 4294967286 < V) {
            H = 3;
            break t;
          }
          if (K && V > ot[0] - 8) {
            H = 7;
            break t;
          }
          (H[0] = V), (vt[0] += 12), (ot[0] -= 12);
        }
        H = 0;
      }
      if (H != 0) return H;
      for (V = 0 < $.gb[0], f = f[0]; ; ) {
        t: {
          var gt = r;
          (ot = o), (H = f);
          var bt = C,
            mt = U,
            Et = (vt = [0]);
          if ((((Pt = X = [X])[0] = 0), 8 > H[0])) H = 7;
          else {
            if (!e(gt, ot[0], "VP8X")) {
              if (_t(gt, ot[0] + 4) != 10) {
                H = 3;
                break t;
              }
              if (18 > H[0]) {
                H = 7;
                break t;
              }
              var St = _t(gt, ot[0] + 8),
                Dt = 1 + It(gt, ot[0] + 12);
              if (2147483648 <= Dt * (gt = 1 + It(gt, ot[0] + 15))) {
                H = 3;
                break t;
              }
              Et != null && (Et[0] = St),
                bt != null && (bt[0] = Dt),
                mt != null && (mt[0] = gt),
                (ot[0] += 18),
                (H[0] -= 18),
                (Pt[0] = 1);
            }
            H = 0;
          }
        }
        if (((X = X[0]), (vt = vt[0]), H != 0)) return H;
        if (((ot = !!(2 & vt)), !V && X)) return 3;
        if (
          (w != null && (w[0] = !!(16 & vt)),
          x != null && (x[0] = ot),
          L != null && (L[0] = 0),
          (x = C[0]),
          (vt = U[0]),
          X && ot && S == null)
        ) {
          H = 0;
          break;
        }
        if (4 > f) {
          H = 7;
          break;
        }
        if ((V && X) || (!V && !X && !e(r, o[0], "ALPH"))) {
          (f = [f]), ($.na = [$.na]), ($.P = [$.P]), ($.Sa = [$.Sa]);
          t: {
            (St = r), (H = o), (V = f);
            var Pt = $.gb;
            (bt = $.na),
              (mt = $.P),
              (Et = $.Sa),
              (Dt = 22),
              t(St != null),
              t(V != null),
              (gt = H[0]);
            var ue = V[0];
            for (
              t(bt != null),
                t(Et != null),
                bt[0] = null,
                mt[0] = null,
                Et[0] = 0;
              ;

            ) {
              if (((H[0] = gt), (V[0] = ue), 8 > ue)) {
                H = 7;
                break t;
              }
              var fe = _t(St, gt + 4);
              if (4294967286 < fe) {
                H = 3;
                break t;
              }
              var oe = (8 + fe + 1) & -2;
              if (((Dt += oe), 0 < Pt && Dt > Pt)) {
                H = 3;
                break t;
              }
              if (!e(St, gt, "VP8 ") || !e(St, gt, "VP8L")) {
                H = 0;
                break t;
              }
              if (ue[0] < oe) {
                H = 7;
                break t;
              }
              e(St, gt, "ALPH") ||
                ((bt[0] = St), (mt[0] = gt + 8), (Et[0] = fe)),
                (gt += oe),
                (ue -= oe);
            }
          }
          if (
            ((f = f[0]),
            ($.na = $.na[0]),
            ($.P = $.P[0]),
            ($.Sa = $.Sa[0]),
            H != 0)
          )
            break;
        }
        (f = [f]), ($.Ja = [$.Ja]), ($.xa = [$.xa]);
        t: if (
          ((Pt = r),
          (H = o),
          (V = f),
          (bt = $.gb[0]),
          (mt = $.Ja),
          (Et = $.xa),
          (St = H[0]),
          (gt = !e(Pt, St, "VP8 ")),
          (Dt = !e(Pt, St, "VP8L")),
          t(Pt != null),
          t(V != null),
          t(mt != null),
          t(Et != null),
          8 > V[0])
        )
          H = 7;
        else {
          if (gt || Dt) {
            if (((Pt = _t(Pt, St + 4)), 12 <= bt && Pt > bt - 12)) {
              H = 3;
              break t;
            }
            if (K && Pt > V[0] - 8) {
              H = 7;
              break t;
            }
            (mt[0] = Pt), (H[0] += 8), (V[0] -= 8), (Et[0] = Dt);
          } else
            (Et[0] = 5 <= V[0] && Pt[St + 0] == 47 && !(Pt[St + 4] >> 5)),
              (mt[0] = V[0]);
          H = 0;
        }
        if (
          ((f = f[0]), ($.Ja = $.Ja[0]), ($.xa = $.xa[0]), (o = o[0]), H != 0)
        )
          break;
        if (4294967286 < $.Ja) return 3;
        if (
          (L == null || ot || (L[0] = $.xa ? 2 : 1),
          (x = [x]),
          (vt = [vt]),
          $.xa)
        ) {
          if (5 > f) {
            H = 7;
            break;
          }
          (L = x),
            (K = vt),
            (ot = w),
            r == null || 5 > f
              ? (r = 0)
              : 5 <= f && r[o + 0] == 47 && !(r[o + 4] >> 5)
                ? ((V = [0]),
                  (Pt = [0]),
                  (bt = [0]),
                  Z((mt = new A()), r, o, f),
                  Rt(mt, V, Pt, bt)
                    ? (L != null && (L[0] = V[0]),
                      K != null && (K[0] = Pt[0]),
                      ot != null && (ot[0] = bt[0]),
                      (r = 1))
                    : (r = 0))
                : (r = 0);
        } else {
          if (10 > f) {
            H = 7;
            break;
          }
          (L = vt),
            r == null || 10 > f || !Ba(r, o + 3, f - 3)
              ? (r = 0)
              : ((K = r[o + 0] | (r[o + 1] << 8) | (r[o + 2] << 16)),
                (ot = 16383 & ((r[o + 7] << 8) | r[o + 6])),
                (r = 16383 & ((r[o + 9] << 8) | r[o + 8])),
                1 & K ||
                3 < ((K >> 1) & 7) ||
                !((K >> 4) & 1) ||
                K >> 5 >= $.Ja ||
                !ot ||
                !r
                  ? (r = 0)
                  : (x && (x[0] = ot), L && (L[0] = r), (r = 1)));
        }
        if (!r || ((x = x[0]), (vt = vt[0]), X && (C[0] != x || U[0] != vt)))
          return 3;
        S != null &&
          ((S[0] = $),
          (S.offset = o - S.w),
          t(4294967286 > o - S.w),
          t(S.offset == S.ha - f));
        break;
      }
      return H == 0 || (H == 7 && X && S == null)
        ? (w != null && (w[0] |= $.na != null && 0 < $.na.length),
          d != null && (d[0] = x),
          b != null && (b[0] = vt),
          0)
        : H;
    }
    function ca(r, o, f) {
      var d = o.width,
        b = o.height,
        w = 0,
        x = 0,
        L = d,
        S = b;
      if (
        ((o.Da = r != null && 0 < r.Da),
        o.Da &&
          ((L = r.cd),
          (S = r.bd),
          (w = r.v),
          (x = r.j),
          11 > f || ((w &= -2), (x &= -2)),
          0 > w || 0 > x || 0 >= L || 0 >= S || w + L > d || x + S > b))
      )
        return 0;
      if (
        ((o.v = w),
        (o.j = x),
        (o.va = w + L),
        (o.o = x + S),
        (o.U = L),
        (o.T = S),
        (o.da = r != null && 0 < r.da),
        o.da)
      ) {
        if (!Xt(L, S, (f = [r.ib]), (w = [r.hb]))) return 0;
        (o.ib = f[0]), (o.hb = w[0]);
      }
      return (
        (o.ob = r != null && r.ob),
        (o.Kb = r == null || !r.Sd),
        o.da && ((o.ob = o.ib < (3 * d) / 4 && o.hb < (3 * b) / 4), (o.Kb = 0)),
        1
      );
    }
    function fa(r) {
      if (r == null) return 2;
      if (11 > r.S) {
        var o = r.f.RGBA;
        (o.fb += (r.height - 1) * o.A), (o.A = -o.A);
      } else
        (o = r.f.kb),
          (r = r.height),
          (o.O += (r - 1) * o.fa),
          (o.fa = -o.fa),
          (o.N += ((r - 1) >> 1) * o.Ab),
          (o.Ab = -o.Ab),
          (o.W += ((r - 1) >> 1) * o.Db),
          (o.Db = -o.Db),
          o.F != null && ((o.J += (r - 1) * o.lb), (o.lb = -o.lb));
      return 0;
    }
    function Li(r, o, f, d) {
      if (d == null || 0 >= r || 0 >= o) return 2;
      if (f != null) {
        if (f.Da) {
          var b = f.cd,
            w = f.bd,
            x = -2 & f.v,
            L = -2 & f.j;
          if (0 > x || 0 > L || 0 >= b || 0 >= w || x + b > r || L + w > o)
            return 2;
          (r = b), (o = w);
        }
        if (f.da) {
          if (!Xt(r, o, (b = [f.ib]), (w = [f.hb]))) return 2;
          (r = b[0]), (o = w[0]);
        }
      }
      (d.width = r), (d.height = o);
      t: {
        var S = d.width,
          C = d.height;
        if (((r = d.S), 0 >= S || 0 >= C || !(r >= ao && 13 > r))) r = 2;
        else {
          if (0 >= d.Rd && d.sd == null) {
            x = w = b = o = 0;
            var U = (L = S * Lu[r]) * C;
            if (
              (11 > r ||
                ((w = ((C + 1) / 2) * (o = (S + 1) / 2)),
                r == 12 && (x = (b = S) * C)),
              (C = a(U + 2 * w + x)) == null)
            ) {
              r = 1;
              break t;
            }
            (d.sd = C),
              11 > r
                ? (((S = d.f.RGBA).eb = C), (S.fb = 0), (S.A = L), (S.size = U))
                : (((S = d.f.kb).y = C),
                  (S.O = 0),
                  (S.fa = L),
                  (S.Fd = U),
                  (S.f = C),
                  (S.N = 0 + U),
                  (S.Ab = o),
                  (S.Cd = w),
                  (S.ea = C),
                  (S.W = 0 + U + w),
                  (S.Db = o),
                  (S.Ed = w),
                  r == 12 && ((S.F = C), (S.J = 0 + U + 2 * w)),
                  (S.Tc = x),
                  (S.lb = b));
          }
          if (
            ((o = 1),
            (b = d.S),
            (w = d.width),
            (x = d.height),
            b >= ao && 13 > b)
          )
            if (11 > b)
              (r = d.f.RGBA),
                (o &= (L = Math.abs(r.A)) * (x - 1) + w <= r.size),
                (o &= L >= w * Lu[b]),
                (o &= r.eb != null);
            else {
              (r = d.f.kb),
                (L = (w + 1) / 2),
                (U = (x + 1) / 2),
                (S = Math.abs(r.fa)),
                (C = Math.abs(r.Ab));
              var X = Math.abs(r.Db),
                K = Math.abs(r.lb),
                $ = K * (x - 1) + w;
              (o &= S * (x - 1) + w <= r.Fd),
                (o &= C * (U - 1) + L <= r.Cd),
                (o =
                  (o &= X * (U - 1) + L <= r.Ed) &
                  (S >= w) &
                  (C >= L) &
                  (X >= L)),
                (o &= r.y != null),
                (o &= r.f != null),
                (o &= r.ea != null),
                b == 12 &&
                  ((o &= K >= w), (o &= $ <= r.Tc), (o &= r.F != null));
            }
          else o = 0;
          r = o ? 0 : 2;
        }
      }
      return r != 0 || (f != null && f.fd && (r = fa(d))), r;
    }
    var Ye = 64,
      Si = [
        0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383,
        32767, 65535, 131071, 262143, 524287, 1048575, 2097151, 4194303,
        8388607, 16777215,
      ],
      _i = 24,
      Pi = 32,
      ha = 8,
      fn = [
        0, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4,
        4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
        5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6,
        6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
        6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
        6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
        7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
        7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
        7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
        7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
        7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
      ];
    Lt("Predictor0", "PredictorAdd0"),
      (z.Predictor0 = function () {
        return 4278190080;
      }),
      (z.Predictor1 = function (r) {
        return r;
      }),
      (z.Predictor2 = function (r, o, f) {
        return o[f + 0];
      }),
      (z.Predictor3 = function (r, o, f) {
        return o[f + 1];
      }),
      (z.Predictor4 = function (r, o, f) {
        return o[f - 1];
      }),
      (z.Predictor5 = function (r, o, f) {
        return kt(kt(r, o[f + 1]), o[f + 0]);
      }),
      (z.Predictor6 = function (r, o, f) {
        return kt(r, o[f - 1]);
      }),
      (z.Predictor7 = function (r, o, f) {
        return kt(r, o[f + 0]);
      }),
      (z.Predictor8 = function (r, o, f) {
        return kt(o[f - 1], o[f + 0]);
      }),
      (z.Predictor9 = function (r, o, f) {
        return kt(o[f + 0], o[f + 1]);
      }),
      (z.Predictor10 = function (r, o, f) {
        return kt(kt(r, o[f - 1]), kt(o[f + 0], o[f + 1]));
      }),
      (z.Predictor11 = function (r, o, f) {
        var d = o[f + 0];
        return 0 >=
          Qt((d >> 24) & 255, (r >> 24) & 255, ((o = o[f - 1]) >> 24) & 255) +
            Qt((d >> 16) & 255, (r >> 16) & 255, (o >> 16) & 255) +
            Qt((d >> 8) & 255, (r >> 8) & 255, (o >> 8) & 255) +
            Qt(255 & d, 255 & r, 255 & o)
          ? d
          : r;
      }),
      (z.Predictor12 = function (r, o, f) {
        var d = o[f + 0];
        return (
          ((qt(
            ((r >> 24) & 255) +
              ((d >> 24) & 255) -
              (((o = o[f - 1]) >> 24) & 255),
          ) <<
            24) |
            (qt(((r >> 16) & 255) + ((d >> 16) & 255) - ((o >> 16) & 255)) <<
              16) |
            (qt(((r >> 8) & 255) + ((d >> 8) & 255) - ((o >> 8) & 255)) << 8) |
            qt((255 & r) + (255 & d) - (255 & o))) >>>
          0
        );
      }),
      (z.Predictor13 = function (r, o, f) {
        var d = o[f - 1];
        return (
          ((Gt(((r = kt(r, o[f + 0])) >> 24) & 255, (d >> 24) & 255) << 24) |
            (Gt((r >> 16) & 255, (d >> 16) & 255) << 16) |
            (Gt((r >> 8) & 255, (d >> 8) & 255) << 8) |
            Gt((r >> 0) & 255, (d >> 0) & 255)) >>>
          0
        );
      });
    var bs = z.PredictorAdd0;
    (z.PredictorAdd1 = ee),
      Lt("Predictor2", "PredictorAdd2"),
      Lt("Predictor3", "PredictorAdd3"),
      Lt("Predictor4", "PredictorAdd4"),
      Lt("Predictor5", "PredictorAdd5"),
      Lt("Predictor6", "PredictorAdd6"),
      Lt("Predictor7", "PredictorAdd7"),
      Lt("Predictor8", "PredictorAdd8"),
      Lt("Predictor9", "PredictorAdd9"),
      Lt("Predictor10", "PredictorAdd10"),
      Lt("Predictor11", "PredictorAdd11"),
      Lt("Predictor12", "PredictorAdd12"),
      Lt("Predictor13", "PredictorAdd13");
    var da = z.PredictorAdd2;
    ne(
      "ColorIndexInverseTransform",
      "MapARGB",
      "32b",
      function (r) {
        return (r >> 8) & 255;
      },
      function (r) {
        return r;
      },
    ),
      ne(
        "VP8LColorIndexInverseTransformAlpha",
        "MapAlpha",
        "8b",
        function (r) {
          return r;
        },
        function (r) {
          return (r >> 8) & 255;
        },
      );
    var Qa,
      Ln = z.ColorIndexInverseTransform,
      ki = z.MapARGB,
      to = z.VP8LColorIndexInverseTransformAlpha,
      eo = z.MapAlpha,
      Sr = (z.VP8LPredictorsAdd = []);
    (Sr.length = 16),
      ((z.VP8LPredictors = []).length = 16),
      ((z.VP8LPredictorsAdd_C = []).length = 16),
      ((z.VP8LPredictors_C = []).length = 16);
    var Jr,
      hn,
      on,
      _r,
      dr,
      pr,
      Ii,
      gr,
      Fe,
      pa,
      sn,
      Sn,
      Ci,
      no,
      ga,
      Xr,
      Kr,
      Pr,
      Zr,
      Fi,
      Qr,
      kr,
      ma,
      _n,
      Pn,
      ye,
      we,
      je,
      Ue = a(511),
      mr = a(2041),
      va = a(225),
      ji = a(767),
      ro = 0,
      ys = mr,
      io = va,
      yn = ji,
      kn = Ue,
      ao = 0,
      oo = 1,
      du = 2,
      so = 3,
      uo = 4,
      ws = 5,
      pu = 6,
      xs = 7,
      As = 8,
      lo = 9,
      Ns = 10,
      $l = [2, 3, 7],
      Yl = [3, 3, 11],
      gu = [280, 256, 256, 256, 40],
      Jl = [0, 1, 1, 1, 0],
      Xl = [17, 18, 0, 1, 2, 3, 4, 5, 16, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      Kl = [
        24, 7, 23, 25, 40, 6, 39, 41, 22, 26, 38, 42, 56, 5, 55, 57, 21, 27, 54,
        58, 37, 43, 72, 4, 71, 73, 20, 28, 53, 59, 70, 74, 36, 44, 88, 69, 75,
        52, 60, 3, 87, 89, 19, 29, 86, 90, 35, 45, 68, 76, 85, 91, 51, 61, 104,
        2, 103, 105, 18, 30, 102, 106, 34, 46, 84, 92, 67, 77, 101, 107, 50, 62,
        120, 1, 119, 121, 83, 93, 17, 31, 100, 108, 66, 78, 118, 122, 33, 47,
        117, 123, 49, 63, 99, 109, 82, 94, 0, 116, 124, 65, 79, 16, 32, 98, 110,
        48, 115, 125, 81, 95, 64, 114, 126, 97, 111, 80, 113, 127, 96, 112,
      ],
      Zl = [
        2954, 2956, 2958, 2962, 2970, 2986, 3018, 3082, 3212, 3468, 3980, 5004,
      ],
      Ql = 8,
      Ls = [
        4, 5, 6, 7, 8, 9, 10, 10, 11, 12, 13, 14, 15, 16, 17, 17, 18, 19, 20,
        20, 21, 21, 22, 22, 23, 23, 24, 25, 25, 26, 27, 28, 29, 30, 31, 32, 33,
        34, 35, 36, 37, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 46, 47, 48, 49,
        50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67,
        68, 69, 70, 71, 72, 73, 74, 75, 76, 76, 77, 78, 79, 80, 81, 82, 83, 84,
        85, 86, 87, 88, 89, 91, 93, 95, 96, 98, 100, 101, 102, 104, 106, 108,
        110, 112, 114, 116, 118, 122, 124, 126, 128, 130, 132, 134, 136, 138,
        140, 143, 145, 148, 151, 154, 157,
      ],
      Ss = [
        4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
        23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58,
        60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94,
        96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 119, 122, 125, 128,
        131, 134, 137, 140, 143, 146, 149, 152, 155, 158, 161, 164, 167, 170,
        173, 177, 181, 185, 189, 193, 197, 201, 205, 209, 213, 217, 221, 225,
        229, 234, 239, 245, 249, 254, 259, 264, 269, 274, 279, 284,
      ],
      ba = null,
      tc = [
        [173, 148, 140, 0],
        [176, 155, 140, 135, 0],
        [180, 157, 141, 134, 130, 0],
        [254, 254, 243, 230, 196, 177, 153, 140, 133, 130, 129, 0],
      ],
      ec = [0, 1, 4, 8, 5, 2, 3, 6, 9, 12, 13, 10, 7, 11, 14, 15],
      mu = [-0, 1, -1, 2, -2, 3, 4, 6, -3, 5, -4, -5, -6, 7, -7, 8, -8, -9],
      nc = [
        [
          [
            [128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128],
            [128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128],
            [128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128],
          ],
          [
            [253, 136, 254, 255, 228, 219, 128, 128, 128, 128, 128],
            [189, 129, 242, 255, 227, 213, 255, 219, 128, 128, 128],
            [106, 126, 227, 252, 214, 209, 255, 255, 128, 128, 128],
          ],
          [
            [1, 98, 248, 255, 236, 226, 255, 255, 128, 128, 128],
            [181, 133, 238, 254, 221, 234, 255, 154, 128, 128, 128],
            [78, 134, 202, 247, 198, 180, 255, 219, 128, 128, 128],
          ],
          [
            [1, 185, 249, 255, 243, 255, 128, 128, 128, 128, 128],
            [184, 150, 247, 255, 236, 224, 128, 128, 128, 128, 128],
            [77, 110, 216, 255, 236, 230, 128, 128, 128, 128, 128],
          ],
          [
            [1, 101, 251, 255, 241, 255, 128, 128, 128, 128, 128],
            [170, 139, 241, 252, 236, 209, 255, 255, 128, 128, 128],
            [37, 116, 196, 243, 228, 255, 255, 255, 128, 128, 128],
          ],
          [
            [1, 204, 254, 255, 245, 255, 128, 128, 128, 128, 128],
            [207, 160, 250, 255, 238, 128, 128, 128, 128, 128, 128],
            [102, 103, 231, 255, 211, 171, 128, 128, 128, 128, 128],
          ],
          [
            [1, 152, 252, 255, 240, 255, 128, 128, 128, 128, 128],
            [177, 135, 243, 255, 234, 225, 128, 128, 128, 128, 128],
            [80, 129, 211, 255, 194, 224, 128, 128, 128, 128, 128],
          ],
          [
            [1, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128],
            [246, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128],
            [255, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128],
          ],
        ],
        [
          [
            [198, 35, 237, 223, 193, 187, 162, 160, 145, 155, 62],
            [131, 45, 198, 221, 172, 176, 220, 157, 252, 221, 1],
            [68, 47, 146, 208, 149, 167, 221, 162, 255, 223, 128],
          ],
          [
            [1, 149, 241, 255, 221, 224, 255, 255, 128, 128, 128],
            [184, 141, 234, 253, 222, 220, 255, 199, 128, 128, 128],
            [81, 99, 181, 242, 176, 190, 249, 202, 255, 255, 128],
          ],
          [
            [1, 129, 232, 253, 214, 197, 242, 196, 255, 255, 128],
            [99, 121, 210, 250, 201, 198, 255, 202, 128, 128, 128],
            [23, 91, 163, 242, 170, 187, 247, 210, 255, 255, 128],
          ],
          [
            [1, 200, 246, 255, 234, 255, 128, 128, 128, 128, 128],
            [109, 178, 241, 255, 231, 245, 255, 255, 128, 128, 128],
            [44, 130, 201, 253, 205, 192, 255, 255, 128, 128, 128],
          ],
          [
            [1, 132, 239, 251, 219, 209, 255, 165, 128, 128, 128],
            [94, 136, 225, 251, 218, 190, 255, 255, 128, 128, 128],
            [22, 100, 174, 245, 186, 161, 255, 199, 128, 128, 128],
          ],
          [
            [1, 182, 249, 255, 232, 235, 128, 128, 128, 128, 128],
            [124, 143, 241, 255, 227, 234, 128, 128, 128, 128, 128],
            [35, 77, 181, 251, 193, 211, 255, 205, 128, 128, 128],
          ],
          [
            [1, 157, 247, 255, 236, 231, 255, 255, 128, 128, 128],
            [121, 141, 235, 255, 225, 227, 255, 255, 128, 128, 128],
            [45, 99, 188, 251, 195, 217, 255, 224, 128, 128, 128],
          ],
          [
            [1, 1, 251, 255, 213, 255, 128, 128, 128, 128, 128],
            [203, 1, 248, 255, 255, 128, 128, 128, 128, 128, 128],
            [137, 1, 177, 255, 224, 255, 128, 128, 128, 128, 128],
          ],
        ],
        [
          [
            [253, 9, 248, 251, 207, 208, 255, 192, 128, 128, 128],
            [175, 13, 224, 243, 193, 185, 249, 198, 255, 255, 128],
            [73, 17, 171, 221, 161, 179, 236, 167, 255, 234, 128],
          ],
          [
            [1, 95, 247, 253, 212, 183, 255, 255, 128, 128, 128],
            [239, 90, 244, 250, 211, 209, 255, 255, 128, 128, 128],
            [155, 77, 195, 248, 188, 195, 255, 255, 128, 128, 128],
          ],
          [
            [1, 24, 239, 251, 218, 219, 255, 205, 128, 128, 128],
            [201, 51, 219, 255, 196, 186, 128, 128, 128, 128, 128],
            [69, 46, 190, 239, 201, 218, 255, 228, 128, 128, 128],
          ],
          [
            [1, 191, 251, 255, 255, 128, 128, 128, 128, 128, 128],
            [223, 165, 249, 255, 213, 255, 128, 128, 128, 128, 128],
            [141, 124, 248, 255, 255, 128, 128, 128, 128, 128, 128],
          ],
          [
            [1, 16, 248, 255, 255, 128, 128, 128, 128, 128, 128],
            [190, 36, 230, 255, 236, 255, 128, 128, 128, 128, 128],
            [149, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128],
          ],
          [
            [1, 226, 255, 128, 128, 128, 128, 128, 128, 128, 128],
            [247, 192, 255, 128, 128, 128, 128, 128, 128, 128, 128],
            [240, 128, 255, 128, 128, 128, 128, 128, 128, 128, 128],
          ],
          [
            [1, 134, 252, 255, 255, 128, 128, 128, 128, 128, 128],
            [213, 62, 250, 255, 255, 128, 128, 128, 128, 128, 128],
            [55, 93, 255, 128, 128, 128, 128, 128, 128, 128, 128],
          ],
          [
            [128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128],
            [128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128],
            [128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128],
          ],
        ],
        [
          [
            [202, 24, 213, 235, 186, 191, 220, 160, 240, 175, 255],
            [126, 38, 182, 232, 169, 184, 228, 174, 255, 187, 128],
            [61, 46, 138, 219, 151, 178, 240, 170, 255, 216, 128],
          ],
          [
            [1, 112, 230, 250, 199, 191, 247, 159, 255, 255, 128],
            [166, 109, 228, 252, 211, 215, 255, 174, 128, 128, 128],
            [39, 77, 162, 232, 172, 180, 245, 178, 255, 255, 128],
          ],
          [
            [1, 52, 220, 246, 198, 199, 249, 220, 255, 255, 128],
            [124, 74, 191, 243, 183, 193, 250, 221, 255, 255, 128],
            [24, 71, 130, 219, 154, 170, 243, 182, 255, 255, 128],
          ],
          [
            [1, 182, 225, 249, 219, 240, 255, 224, 128, 128, 128],
            [149, 150, 226, 252, 216, 205, 255, 171, 128, 128, 128],
            [28, 108, 170, 242, 183, 194, 254, 223, 255, 255, 128],
          ],
          [
            [1, 81, 230, 252, 204, 203, 255, 192, 128, 128, 128],
            [123, 102, 209, 247, 188, 196, 255, 233, 128, 128, 128],
            [20, 95, 153, 243, 164, 173, 255, 203, 128, 128, 128],
          ],
          [
            [1, 222, 248, 255, 216, 213, 128, 128, 128, 128, 128],
            [168, 175, 246, 252, 235, 205, 255, 255, 128, 128, 128],
            [47, 116, 215, 255, 211, 212, 255, 255, 128, 128, 128],
          ],
          [
            [1, 121, 236, 253, 212, 214, 255, 255, 128, 128, 128],
            [141, 84, 213, 252, 201, 202, 255, 219, 128, 128, 128],
            [42, 80, 160, 240, 162, 185, 255, 205, 128, 128, 128],
          ],
          [
            [1, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128],
            [244, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128],
            [238, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128],
          ],
        ],
      ],
      rc = [
        [
          [231, 120, 48, 89, 115, 113, 120, 152, 112],
          [152, 179, 64, 126, 170, 118, 46, 70, 95],
          [175, 69, 143, 80, 85, 82, 72, 155, 103],
          [56, 58, 10, 171, 218, 189, 17, 13, 152],
          [114, 26, 17, 163, 44, 195, 21, 10, 173],
          [121, 24, 80, 195, 26, 62, 44, 64, 85],
          [144, 71, 10, 38, 171, 213, 144, 34, 26],
          [170, 46, 55, 19, 136, 160, 33, 206, 71],
          [63, 20, 8, 114, 114, 208, 12, 9, 226],
          [81, 40, 11, 96, 182, 84, 29, 16, 36],
        ],
        [
          [134, 183, 89, 137, 98, 101, 106, 165, 148],
          [72, 187, 100, 130, 157, 111, 32, 75, 80],
          [66, 102, 167, 99, 74, 62, 40, 234, 128],
          [41, 53, 9, 178, 241, 141, 26, 8, 107],
          [74, 43, 26, 146, 73, 166, 49, 23, 157],
          [65, 38, 105, 160, 51, 52, 31, 115, 128],
          [104, 79, 12, 27, 217, 255, 87, 17, 7],
          [87, 68, 71, 44, 114, 51, 15, 186, 23],
          [47, 41, 14, 110, 182, 183, 21, 17, 194],
          [66, 45, 25, 102, 197, 189, 23, 18, 22],
        ],
        [
          [88, 88, 147, 150, 42, 46, 45, 196, 205],
          [43, 97, 183, 117, 85, 38, 35, 179, 61],
          [39, 53, 200, 87, 26, 21, 43, 232, 171],
          [56, 34, 51, 104, 114, 102, 29, 93, 77],
          [39, 28, 85, 171, 58, 165, 90, 98, 64],
          [34, 22, 116, 206, 23, 34, 43, 166, 73],
          [107, 54, 32, 26, 51, 1, 81, 43, 31],
          [68, 25, 106, 22, 64, 171, 36, 225, 114],
          [34, 19, 21, 102, 132, 188, 16, 76, 124],
          [62, 18, 78, 95, 85, 57, 50, 48, 51],
        ],
        [
          [193, 101, 35, 159, 215, 111, 89, 46, 111],
          [60, 148, 31, 172, 219, 228, 21, 18, 111],
          [112, 113, 77, 85, 179, 255, 38, 120, 114],
          [40, 42, 1, 196, 245, 209, 10, 25, 109],
          [88, 43, 29, 140, 166, 213, 37, 43, 154],
          [61, 63, 30, 155, 67, 45, 68, 1, 209],
          [100, 80, 8, 43, 154, 1, 51, 26, 71],
          [142, 78, 78, 16, 255, 128, 34, 197, 171],
          [41, 40, 5, 102, 211, 183, 4, 1, 221],
          [51, 50, 17, 168, 209, 192, 23, 25, 82],
        ],
        [
          [138, 31, 36, 171, 27, 166, 38, 44, 229],
          [67, 87, 58, 169, 82, 115, 26, 59, 179],
          [63, 59, 90, 180, 59, 166, 93, 73, 154],
          [40, 40, 21, 116, 143, 209, 34, 39, 175],
          [47, 15, 16, 183, 34, 223, 49, 45, 183],
          [46, 17, 33, 183, 6, 98, 15, 32, 183],
          [57, 46, 22, 24, 128, 1, 54, 17, 37],
          [65, 32, 73, 115, 28, 128, 23, 128, 205],
          [40, 3, 9, 115, 51, 192, 18, 6, 223],
          [87, 37, 9, 115, 59, 77, 64, 21, 47],
        ],
        [
          [104, 55, 44, 218, 9, 54, 53, 130, 226],
          [64, 90, 70, 205, 40, 41, 23, 26, 57],
          [54, 57, 112, 184, 5, 41, 38, 166, 213],
          [30, 34, 26, 133, 152, 116, 10, 32, 134],
          [39, 19, 53, 221, 26, 114, 32, 73, 255],
          [31, 9, 65, 234, 2, 15, 1, 118, 73],
          [75, 32, 12, 51, 192, 255, 160, 43, 51],
          [88, 31, 35, 67, 102, 85, 55, 186, 85],
          [56, 21, 23, 111, 59, 205, 45, 37, 192],
          [55, 38, 70, 124, 73, 102, 1, 34, 98],
        ],
        [
          [125, 98, 42, 88, 104, 85, 117, 175, 82],
          [95, 84, 53, 89, 128, 100, 113, 101, 45],
          [75, 79, 123, 47, 51, 128, 81, 171, 1],
          [57, 17, 5, 71, 102, 57, 53, 41, 49],
          [38, 33, 13, 121, 57, 73, 26, 1, 85],
          [41, 10, 67, 138, 77, 110, 90, 47, 114],
          [115, 21, 2, 10, 102, 255, 166, 23, 6],
          [101, 29, 16, 10, 85, 128, 101, 196, 26],
          [57, 18, 10, 102, 102, 213, 34, 20, 43],
          [117, 20, 15, 36, 163, 128, 68, 1, 26],
        ],
        [
          [102, 61, 71, 37, 34, 53, 31, 243, 192],
          [69, 60, 71, 38, 73, 119, 28, 222, 37],
          [68, 45, 128, 34, 1, 47, 11, 245, 171],
          [62, 17, 19, 70, 146, 85, 55, 62, 70],
          [37, 43, 37, 154, 100, 163, 85, 160, 1],
          [63, 9, 92, 136, 28, 64, 32, 201, 85],
          [75, 15, 9, 9, 64, 255, 184, 119, 16],
          [86, 6, 28, 5, 64, 255, 25, 248, 1],
          [56, 8, 17, 132, 137, 255, 55, 116, 128],
          [58, 15, 20, 82, 135, 57, 26, 121, 40],
        ],
        [
          [164, 50, 31, 137, 154, 133, 25, 35, 218],
          [51, 103, 44, 131, 131, 123, 31, 6, 158],
          [86, 40, 64, 135, 148, 224, 45, 183, 128],
          [22, 26, 17, 131, 240, 154, 14, 1, 209],
          [45, 16, 21, 91, 64, 222, 7, 1, 197],
          [56, 21, 39, 155, 60, 138, 23, 102, 213],
          [83, 12, 13, 54, 192, 255, 68, 47, 28],
          [85, 26, 85, 85, 128, 128, 32, 146, 171],
          [18, 11, 7, 63, 144, 171, 4, 4, 246],
          [35, 27, 10, 146, 174, 171, 12, 26, 128],
        ],
        [
          [190, 80, 35, 99, 180, 80, 126, 54, 45],
          [85, 126, 47, 87, 176, 51, 41, 20, 32],
          [101, 75, 128, 139, 118, 146, 116, 128, 85],
          [56, 41, 15, 176, 236, 85, 37, 9, 62],
          [71, 30, 17, 119, 118, 255, 17, 18, 138],
          [101, 38, 60, 138, 55, 70, 43, 26, 142],
          [146, 36, 19, 30, 171, 255, 97, 27, 20],
          [138, 45, 61, 62, 219, 1, 81, 188, 64],
          [32, 41, 20, 117, 151, 142, 20, 21, 163],
          [112, 19, 12, 61, 195, 128, 48, 4, 24],
        ],
      ],
      ic = [
        [
          [
            [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
            [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
            [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
          ],
          [
            [176, 246, 255, 255, 255, 255, 255, 255, 255, 255, 255],
            [223, 241, 252, 255, 255, 255, 255, 255, 255, 255, 255],
            [249, 253, 253, 255, 255, 255, 255, 255, 255, 255, 255],
          ],
          [
            [255, 244, 252, 255, 255, 255, 255, 255, 255, 255, 255],
            [234, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255],
            [253, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
          ],
          [
            [255, 246, 254, 255, 255, 255, 255, 255, 255, 255, 255],
            [239, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255],
            [254, 255, 254, 255, 255, 255, 255, 255, 255, 255, 255],
          ],
          [
            [255, 248, 254, 255, 255, 255, 255, 255, 255, 255, 255],
            [251, 255, 254, 255, 255, 255, 255, 255, 255, 255, 255],
            [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
          ],
          [
            [255, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255],
            [251, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255],
            [254, 255, 254, 255, 255, 255, 255, 255, 255, 255, 255],
          ],
          [
            [255, 254, 253, 255, 254, 255, 255, 255, 255, 255, 255],
            [250, 255, 254, 255, 254, 255, 255, 255, 255, 255, 255],
            [254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
          ],
          [
            [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
            [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
            [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
          ],
        ],
        [
          [
            [217, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
            [225, 252, 241, 253, 255, 255, 254, 255, 255, 255, 255],
            [234, 250, 241, 250, 253, 255, 253, 254, 255, 255, 255],
          ],
          [
            [255, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255],
            [223, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255],
            [238, 253, 254, 254, 255, 255, 255, 255, 255, 255, 255],
          ],
          [
            [255, 248, 254, 255, 255, 255, 255, 255, 255, 255, 255],
            [249, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255],
            [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
          ],
          [
            [255, 253, 255, 255, 255, 255, 255, 255, 255, 255, 255],
            [247, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255],
            [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
          ],
          [
            [255, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255],
            [252, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
            [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
          ],
          [
            [255, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255],
            [253, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
            [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
          ],
          [
            [255, 254, 253, 255, 255, 255, 255, 255, 255, 255, 255],
            [250, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
            [254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
          ],
          [
            [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
            [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
            [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
          ],
        ],
        [
          [
            [186, 251, 250, 255, 255, 255, 255, 255, 255, 255, 255],
            [234, 251, 244, 254, 255, 255, 255, 255, 255, 255, 255],
            [251, 251, 243, 253, 254, 255, 254, 255, 255, 255, 255],
          ],
          [
            [255, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255],
            [236, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255],
            [251, 253, 253, 254, 254, 255, 255, 255, 255, 255, 255],
          ],
          [
            [255, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255],
            [254, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255],
            [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
          ],
          [
            [255, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255],
            [254, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255],
            [254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
          ],
          [
            [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
            [254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
            [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
          ],
          [
            [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
            [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
            [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
          ],
          [
            [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
            [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
            [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
          ],
          [
            [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
            [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
            [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
          ],
        ],
        [
          [
            [248, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
            [250, 254, 252, 254, 255, 255, 255, 255, 255, 255, 255],
            [248, 254, 249, 253, 255, 255, 255, 255, 255, 255, 255],
          ],
          [
            [255, 253, 253, 255, 255, 255, 255, 255, 255, 255, 255],
            [246, 253, 253, 255, 255, 255, 255, 255, 255, 255, 255],
            [252, 254, 251, 254, 254, 255, 255, 255, 255, 255, 255],
          ],
          [
            [255, 254, 252, 255, 255, 255, 255, 255, 255, 255, 255],
            [248, 254, 253, 255, 255, 255, 255, 255, 255, 255, 255],
            [253, 255, 254, 254, 255, 255, 255, 255, 255, 255, 255],
          ],
          [
            [255, 251, 254, 255, 255, 255, 255, 255, 255, 255, 255],
            [245, 251, 254, 255, 255, 255, 255, 255, 255, 255, 255],
            [253, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255],
          ],
          [
            [255, 251, 253, 255, 255, 255, 255, 255, 255, 255, 255],
            [252, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255],
            [255, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255],
          ],
          [
            [255, 252, 255, 255, 255, 255, 255, 255, 255, 255, 255],
            [249, 255, 254, 255, 255, 255, 255, 255, 255, 255, 255],
            [255, 255, 254, 255, 255, 255, 255, 255, 255, 255, 255],
          ],
          [
            [255, 255, 253, 255, 255, 255, 255, 255, 255, 255, 255],
            [250, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
            [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
          ],
          [
            [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
            [254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
            [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
          ],
        ],
      ],
      ac = [0, 1, 2, 3, 6, 4, 5, 6, 6, 6, 6, 6, 6, 6, 6, 7, 0],
      Ir = [],
      Rn = [],
      vr = [],
      oc = 1,
      vu = 2,
      Cr = [],
      In = [];
    lt("UpsampleRgbLinePair", ie, 3),
      lt("UpsampleBgrLinePair", Le, 3),
      lt("UpsampleRgbaLinePair", Dn, 4),
      lt("UpsampleBgraLinePair", He, 4),
      lt("UpsampleArgbLinePair", Ze, 4),
      lt("UpsampleRgba4444LinePair", qe, 2),
      lt("UpsampleRgb565LinePair", Pe, 2);
    var sc = z.UpsampleRgbLinePair,
      uc = z.UpsampleBgrLinePair,
      bu = z.UpsampleRgbaLinePair,
      yu = z.UpsampleBgraLinePair,
      wu = z.UpsampleArgbLinePair,
      xu = z.UpsampleRgba4444LinePair,
      lc = z.UpsampleRgb565LinePair,
      co = 16,
      fo = 1 << (co - 1),
      ya = -227,
      _s = 482,
      cc = 6,
      Au = 0,
      fc = a(256),
      hc = a(256),
      dc = a(256),
      pc = a(256),
      gc = a(_s - ya),
      mc = a(_s - ya);
    rr("YuvToRgbRow", ie, 3),
      rr("YuvToBgrRow", Le, 3),
      rr("YuvToRgbaRow", Dn, 4),
      rr("YuvToBgraRow", He, 4),
      rr("YuvToArgbRow", Ze, 4),
      rr("YuvToRgba4444Row", qe, 2),
      rr("YuvToRgb565Row", Pe, 2);
    var Nu = [
        0, 4, 8, 12, 128, 132, 136, 140, 256, 260, 264, 268, 384, 388, 392, 396,
      ],
      ho = [0, 2, 8],
      vc = [8, 7, 6, 4, 4, 2, 2, 2, 1, 1, 1, 1],
      bc = 1;
    this.WebPDecodeRGBA = function (r, o, f, d, b) {
      var w = oo,
        x = new xi(),
        L = new jn();
      (x.ba = L), (L.S = w), (L.width = [L.width]), (L.height = [L.height]);
      var S = L.width,
        C = L.height,
        U = new lr();
      if (U == null || r == null) var X = 2;
      else
        t(U != null),
          (X = Ni(r, o, f, U.width, U.height, U.Pd, U.Qd, U.format, null));
      if (
        (X != 0
          ? (S = 0)
          : (S != null && (S[0] = U.width[0]),
            C != null && (C[0] = U.height[0]),
            (S = 1)),
        S)
      ) {
        (L.width = L.width[0]),
          (L.height = L.height[0]),
          d != null && (d[0] = L.width),
          b != null && (b[0] = L.height);
        t: {
          if (
            ((d = new pi()),
            ((b = new ia()).data = r),
            (b.w = o),
            (b.ha = f),
            (b.kd = 1),
            (o = [0]),
            t(b != null),
            ((r = Ni(b.data, b.w, b.ha, null, null, null, o, null, b)) == 0 ||
              r == 7) &&
              o[0] &&
              (r = 4),
            (o = r) == 0)
          ) {
            if (
              (t(x != null),
              (d.data = b.data),
              (d.w = b.w + b.offset),
              (d.ha = b.ha - b.offset),
              (d.put = Xn),
              (d.ac = $e),
              (d.bc = Kn),
              (d.ma = x),
              b.xa)
            ) {
              if ((r = Nn()) == null) {
                x = 1;
                break t;
              }
              if (
                (function (K, $) {
                  var vt = [0],
                    ot = [0],
                    H = [0];
                  e: for (;;) {
                    if (K == null) return 0;
                    if ($ == null) return (K.a = 2), 0;
                    if (
                      ((K.l = $),
                      (K.a = 0),
                      Z(K.m, $.data, $.w, $.ha),
                      !Rt(K.m, vt, ot, H))
                    ) {
                      K.a = 3;
                      break e;
                    }
                    if (
                      ((K.xb = vu),
                      ($.width = vt[0]),
                      ($.height = ot[0]),
                      !tr(vt[0], ot[0], 1, K, null))
                    )
                      break e;
                    return 1;
                  }
                  return t(K.a != 0), 0;
                })(r, d)
              ) {
                if ((d = (o = Li(d.width, d.height, x.Oa, x.ba)) == 0)) {
                  e: {
                    d = r;
                    n: for (;;) {
                      if (d == null) {
                        d = 0;
                        break e;
                      }
                      if (
                        (t(d.s.yc != null),
                        t(d.s.Ya != null),
                        t(0 < d.s.Wb),
                        t((f = d.l) != null),
                        t((b = f.ma) != null),
                        d.xb != 0)
                      ) {
                        if (
                          ((d.ca = b.ba),
                          (d.tb = b.tb),
                          t(d.ca != null),
                          !ca(b.Oa, f, so))
                        ) {
                          d.a = 2;
                          break n;
                        }
                        if (!Wr(d, f.width) || f.da) break n;
                        if (
                          ((f.da || le(d.ca.S)) && J(),
                          11 > d.ca.S ||
                            (alert("todo:WebPInitConvertARGBToYUV"),
                            d.ca.f.kb.F != null && J()),
                          d.Pb &&
                            0 < d.s.ua &&
                            d.s.vb.X == null &&
                            !Ut(d.s.vb, d.s.Wa.Xa))
                        ) {
                          d.a = 1;
                          break n;
                        }
                        d.xb = 0;
                      }
                      if (!Bn(d, d.V, d.Ba, d.c, d.i, f.o, ui)) break n;
                      (b.Dc = d.Ma), (d = 1);
                      break e;
                    }
                    t(d.a != 0), (d = 0);
                  }
                  d = !d;
                }
                d && (o = r.a);
              } else o = r.a;
            } else {
              if ((r = new Qo()) == null) {
                x = 1;
                break t;
              }
              if (((r.Fa = b.na), (r.P = b.P), (r.qc = b.Sa), qa(r, d))) {
                if ((o = Li(d.width, d.height, x.Oa, x.ba)) == 0) {
                  if (((r.Aa = 0), (f = x.Oa), t((b = r) != null), f != null)) {
                    if (
                      0 <
                      (S = 0 > (S = f.Md) ? 0 : 100 < S ? 255 : (255 * S) / 100)
                    ) {
                      for (C = U = 0; 4 > C; ++C)
                        12 > (X = b.pb[C]).lc &&
                          (X.ia = (S * vc[0 > X.lc ? 0 : X.lc]) >> 3),
                          (U |= X.ia);
                      U && (alert("todo:VP8InitRandom"), (b.ia = 1));
                    }
                    (b.Ga = f.Id),
                      100 < b.Ga ? (b.Ga = 100) : 0 > b.Ga && (b.Ga = 0);
                  }
                  ts(r, d) || (o = r.a);
                }
              } else o = r.a;
            }
            o == 0 && x.Oa != null && x.Oa.fd && (o = fa(x.ba));
          }
          x = o;
        }
        w = x != 0 ? null : 11 > w ? L.f.RGBA.eb : L.f.kb.y;
      } else w = null;
      return w;
    };
    var Lu = [3, 4, 3, 4, 4, 2, 2, 4, 4, 4, 2, 1, 1];
  };
  function g(z, it) {
    for (var dt = "", k = 0; k < 4; k++) dt += String.fromCharCode(z[it++]);
    return dt;
  }
  function m(z, it) {
    return ((z[it + 0] << 0) | (z[it + 1] << 8) | (z[it + 2] << 16)) >>> 0;
  }
  function v(z, it) {
    return (
      ((z[it + 0] << 0) |
        (z[it + 1] << 8) |
        (z[it + 2] << 16) |
        (z[it + 3] << 24)) >>>
      0
    );
  }
  new h();
  var N = [0],
    p = [0],
    F = [],
    P = new h(),
    M = n,
    _ = (function (z, it) {
      var dt = {},
        k = 0,
        I = !1,
        W = 0,
        T = 0;
      if (
        ((dt.frames = []),
        !(function (j, B, R, Y) {
          for (var Q = 0; Q < Y; Q++)
            if (j[B + Q] != R.charCodeAt(Q)) return !0;
          return !1;
        })(z, it, "RIFF", 4))
      ) {
        var ut, at;
        for (v(z, (it += 4)), it += 8; it < z.length; ) {
          var ct = g(z, it),
            Z = v(z, (it += 4));
          it += 4;
          var ft = Z + (1 & Z);
          switch (ct) {
            case "VP8 ":
            case "VP8L":
              dt.frames[k] === void 0 && (dt.frames[k] = {}),
                ((A = dt.frames[k]).src_off = I ? T : it - 8),
                (A.src_size = W + Z + 8),
                k++,
                I && ((I = !1), (W = 0), (T = 0));
              break;
            case "VP8X":
              (A = dt.header = {}).feature_flags = z[it];
              var pt = it + 4;
              (A.canvas_width = 1 + m(z, pt)),
                (pt += 3),
                (A.canvas_height = 1 + m(z, pt)),
                (pt += 3);
              break;
            case "ALPH":
              (I = !0), (W = ft + 8), (T = it - 8);
              break;
            case "ANIM":
              ((A = dt.header).bgcolor = v(z, it)),
                (pt = it + 4),
                (A.loop_count =
                  ((ut = z)[(at = pt) + 0] << 0) | (ut[at + 1] << 8)),
                (pt += 2);
              break;
            case "ANMF":
              var Ct, A;
              ((A = dt.frames[k] = {}).offset_x = 2 * m(z, it)),
                (it += 3),
                (A.offset_y = 2 * m(z, it)),
                (it += 3),
                (A.width = 1 + m(z, it)),
                (it += 3),
                (A.height = 1 + m(z, it)),
                (it += 3),
                (A.duration = m(z, it)),
                (it += 3),
                (Ct = z[it++]),
                (A.dispose = 1 & Ct),
                (A.blend = (Ct >> 1) & 1);
          }
          ct != "ANMF" && (it += ft);
        }
        return dt;
      }
    })(M, 0);
  (_.response = M), (_.rgbaoutput = !0), (_.dataurl = !1);
  var E = _.header ? _.header : null,
    G = _.frames ? _.frames : null;
  if (E) {
    (E.loop_counter = E.loop_count),
      (N = [E.canvas_height]),
      (p = [E.canvas_width]);
    for (var nt = 0; nt < G.length && G[nt].blend != 0; nt++);
  }
  var st = G[0],
    wt = P.WebPDecodeRGBA(M, st.src_off, st.src_size, p, N);
  (st.rgba = wt), (st.imgwidth = p[0]), (st.imgheight = N[0]);
  for (var tt = 0; tt < p[0] * N[0] * 4; tt++) F[tt] = wt[tt];
  return (this.width = p), (this.height = N), (this.data = F), this;
}
(function (n) {
  var t = function () {
      return typeof eu == "function";
    },
    e = function (N, p, F, P) {
      var M = 4,
        _ = l;
      switch (P) {
        case n.image_compression.FAST:
          (M = 1), (_ = a);
          break;
        case n.image_compression.MEDIUM:
          (M = 6), (_ = c);
          break;
        case n.image_compression.SLOW:
          (M = 9), (_ = h);
      }
      N = i(N, p, F, _);
      var E = eu(N, { level: M });
      return n.__addimage__.arrayBufferToBinaryString(E);
    },
    i = function (N, p, F, P) {
      for (
        var M,
          _,
          E,
          G = N.length / p,
          nt = new Uint8Array(N.length + G),
          st = m(),
          wt = 0;
        wt < G;
        wt += 1
      ) {
        if (((E = wt * p), (M = N.subarray(E, E + p)), P))
          nt.set(P(M, F, _), E + wt);
        else {
          for (var tt, z = st.length, it = []; tt < z; tt += 1)
            it[tt] = st[tt](M, F, _);
          var dt = v(it.concat());
          nt.set(it[dt], E + wt);
        }
        _ = M;
      }
      return nt;
    },
    s = function (N) {
      var p = Array.apply([], N);
      return p.unshift(0), p;
    },
    a = function (N, p) {
      var F,
        P = [],
        M = N.length;
      P[0] = 1;
      for (var _ = 0; _ < M; _ += 1)
        (F = N[_ - p] || 0), (P[_ + 1] = (N[_] - F + 256) & 255);
      return P;
    },
    l = function (N, p, F) {
      var P,
        M = [],
        _ = N.length;
      M[0] = 2;
      for (var E = 0; E < _; E += 1)
        (P = (F && F[E]) || 0), (M[E + 1] = (N[E] - P + 256) & 255);
      return M;
    },
    c = function (N, p, F) {
      var P,
        M,
        _ = [],
        E = N.length;
      _[0] = 3;
      for (var G = 0; G < E; G += 1)
        (P = N[G - p] || 0),
          (M = (F && F[G]) || 0),
          (_[G + 1] = (N[G] + 256 - ((P + M) >>> 1)) & 255);
      return _;
    },
    h = function (N, p, F) {
      var P,
        M,
        _,
        E,
        G = [],
        nt = N.length;
      G[0] = 4;
      for (var st = 0; st < nt; st += 1)
        (P = N[st - p] || 0),
          (M = (F && F[st]) || 0),
          (_ = (F && F[st - p]) || 0),
          (E = g(P, M, _)),
          (G[st + 1] = (N[st] - E + 256) & 255);
      return G;
    },
    g = function (N, p, F) {
      if (N === p && p === F) return N;
      var P = Math.abs(p - F),
        M = Math.abs(N - F),
        _ = Math.abs(N + p - F - F);
      return P <= M && P <= _ ? N : M <= _ ? p : F;
    },
    m = function () {
      return [s, a, l, c, h];
    },
    v = function (N) {
      var p = N.map(function (F) {
        return F.reduce(function (P, M) {
          return P + Math.abs(M);
        }, 0);
      });
      return p.indexOf(Math.min.apply(null, p));
    };
  n.processPNG = function (N, p, F, P) {
    var M,
      _,
      E,
      G,
      nt,
      st,
      wt,
      tt,
      z,
      it,
      dt,
      k,
      I,
      W,
      T,
      ut = this.decode.FLATE_DECODE,
      at = "";
    if (
      (this.__addimage__.isArrayBuffer(N) && (N = new Uint8Array(N)),
      this.__addimage__.isArrayBufferView(N))
    ) {
      if (
        ((N = (E = new nh(N)).imgData),
        (_ = E.bits),
        (M = E.colorSpace),
        (nt = E.colors),
        [4, 6].indexOf(E.colorType) !== -1)
      ) {
        if (E.bits === 8) {
          (z = (tt =
            E.pixelBitlength == 32
              ? new Uint32Array(E.decodePixels().buffer)
              : E.pixelBitlength == 16
                ? new Uint16Array(E.decodePixels().buffer)
                : new Uint8Array(E.decodePixels().buffer)).length),
            (dt = new Uint8Array(z * E.colors)),
            (it = new Uint8Array(z));
          var ct,
            Z = E.pixelBitlength - E.bits;
          for (W = 0, T = 0; W < z; W++) {
            for (I = tt[W], ct = 0; ct < Z; )
              (dt[T++] = (I >>> ct) & 255), (ct += E.bits);
            it[W] = (I >>> ct) & 255;
          }
        }
        if (E.bits === 16) {
          (z = (tt = new Uint32Array(E.decodePixels().buffer)).length),
            (dt = new Uint8Array(z * (32 / E.pixelBitlength) * E.colors)),
            (it = new Uint8Array(z * (32 / E.pixelBitlength))),
            (k = E.colors > 1),
            (W = 0),
            (T = 0);
          for (var ft = 0; W < z; )
            (I = tt[W++]),
              (dt[T++] = (I >>> 0) & 255),
              k &&
                ((dt[T++] = (I >>> 16) & 255),
                (I = tt[W++]),
                (dt[T++] = (I >>> 0) & 255)),
              (it[ft++] = (I >>> 16) & 255);
          _ = 8;
        }
        P !== n.image_compression.NONE && t()
          ? ((N = e(dt, E.width * E.colors, E.colors, P)),
            (wt = e(it, E.width, 1, P)))
          : ((N = dt), (wt = it), (ut = void 0));
      }
      if (
        E.colorType === 3 &&
        ((M = this.color_spaces.INDEXED),
        (st = E.palette),
        E.transparency.indexed)
      ) {
        var pt = E.transparency.indexed,
          Ct = 0;
        for (W = 0, z = pt.length; W < z; ++W) Ct += pt[W];
        if ((Ct /= 255) === z - 1 && pt.indexOf(0) !== -1) G = [pt.indexOf(0)];
        else if (Ct !== z) {
          for (
            tt = E.decodePixels(),
              it = new Uint8Array(tt.length),
              W = 0,
              z = tt.length;
            W < z;
            W++
          )
            it[W] = pt[tt[W]];
          wt = e(it, E.width, 1);
        }
      }
      var A = (function (j) {
        var B;
        switch (j) {
          case n.image_compression.FAST:
            B = 11;
            break;
          case n.image_compression.MEDIUM:
            B = 13;
            break;
          case n.image_compression.SLOW:
            B = 14;
            break;
          default:
            B = 12;
        }
        return B;
      })(P);
      return (
        ut === this.decode.FLATE_DECODE && (at = "/Predictor " + A + " "),
        (at +=
          "/Colors " + nt + " /BitsPerComponent " + _ + " /Columns " + E.width),
        (this.__addimage__.isArrayBuffer(N) ||
          this.__addimage__.isArrayBufferView(N)) &&
          (N = this.__addimage__.arrayBufferToBinaryString(N)),
        ((wt && this.__addimage__.isArrayBuffer(wt)) ||
          this.__addimage__.isArrayBufferView(wt)) &&
          (wt = this.__addimage__.arrayBufferToBinaryString(wt)),
        {
          alias: F,
          data: N,
          index: p,
          filter: ut,
          decodeParameters: at,
          transparency: G,
          palette: st,
          sMask: wt,
          predictor: A,
          width: E.width,
          height: E.height,
          bitsPerComponent: _,
          colorSpace: M,
        }
      );
    }
  };
})(zt.API),
  (function (n) {
    (n.processGIF89A = function (t, e, i, s) {
      var a = new rh(t),
        l = a.width,
        c = a.height,
        h = [];
      a.decodeAndBlitFrameRGBA(0, h);
      var g = { data: h, width: l, height: c },
        m = new $s(100).encode(g, 100);
      return n.processJPEG.call(this, m, e, i, s);
    }),
      (n.processGIF87A = n.processGIF89A);
  })(zt.API),
  (Hn.prototype.parseHeader = function () {
    if (
      ((this.fileSize = this.datav.getUint32(this.pos, !0)),
      (this.pos += 4),
      (this.reserved = this.datav.getUint32(this.pos, !0)),
      (this.pos += 4),
      (this.offset = this.datav.getUint32(this.pos, !0)),
      (this.pos += 4),
      (this.headerSize = this.datav.getUint32(this.pos, !0)),
      (this.pos += 4),
      (this.width = this.datav.getUint32(this.pos, !0)),
      (this.pos += 4),
      (this.height = this.datav.getInt32(this.pos, !0)),
      (this.pos += 4),
      (this.planes = this.datav.getUint16(this.pos, !0)),
      (this.pos += 2),
      (this.bitPP = this.datav.getUint16(this.pos, !0)),
      (this.pos += 2),
      (this.compress = this.datav.getUint32(this.pos, !0)),
      (this.pos += 4),
      (this.rawSize = this.datav.getUint32(this.pos, !0)),
      (this.pos += 4),
      (this.hr = this.datav.getUint32(this.pos, !0)),
      (this.pos += 4),
      (this.vr = this.datav.getUint32(this.pos, !0)),
      (this.pos += 4),
      (this.colors = this.datav.getUint32(this.pos, !0)),
      (this.pos += 4),
      (this.importantColors = this.datav.getUint32(this.pos, !0)),
      (this.pos += 4),
      this.bitPP === 16 && this.is_with_alpha && (this.bitPP = 15),
      this.bitPP < 15)
    ) {
      var n = this.colors === 0 ? 1 << this.bitPP : this.colors;
      this.palette = new Array(n);
      for (var t = 0; t < n; t++) {
        var e = this.datav.getUint8(this.pos++, !0),
          i = this.datav.getUint8(this.pos++, !0),
          s = this.datav.getUint8(this.pos++, !0),
          a = this.datav.getUint8(this.pos++, !0);
        this.palette[t] = { red: s, green: i, blue: e, quad: a };
      }
    }
    this.height < 0 && ((this.height *= -1), (this.bottom_up = !1));
  }),
  (Hn.prototype.parseBGR = function () {
    this.pos = this.offset;
    try {
      var n = "bit" + this.bitPP,
        t = this.width * this.height * 4;
      (this.data = new Uint8Array(t)), this[n]();
    } catch (e) {
      be.log("bit decode error:" + e);
    }
  }),
  (Hn.prototype.bit1 = function () {
    var n,
      t = Math.ceil(this.width / 8),
      e = t % 4;
    for (n = this.height - 1; n >= 0; n--) {
      for (var i = this.bottom_up ? n : this.height - 1 - n, s = 0; s < t; s++)
        for (
          var a = this.datav.getUint8(this.pos++, !0),
            l = i * this.width * 4 + 8 * s * 4,
            c = 0;
          c < 8 && 8 * s + c < this.width;
          c++
        ) {
          var h = this.palette[(a >> (7 - c)) & 1];
          (this.data[l + 4 * c] = h.blue),
            (this.data[l + 4 * c + 1] = h.green),
            (this.data[l + 4 * c + 2] = h.red),
            (this.data[l + 4 * c + 3] = 255);
        }
      e !== 0 && (this.pos += 4 - e);
    }
  }),
  (Hn.prototype.bit4 = function () {
    for (
      var n = Math.ceil(this.width / 2), t = n % 4, e = this.height - 1;
      e >= 0;
      e--
    ) {
      for (
        var i = this.bottom_up ? e : this.height - 1 - e, s = 0;
        s < n;
        s++
      ) {
        var a = this.datav.getUint8(this.pos++, !0),
          l = i * this.width * 4 + 2 * s * 4,
          c = a >> 4,
          h = 15 & a,
          g = this.palette[c];
        if (
          ((this.data[l] = g.blue),
          (this.data[l + 1] = g.green),
          (this.data[l + 2] = g.red),
          (this.data[l + 3] = 255),
          2 * s + 1 >= this.width)
        )
          break;
        (g = this.palette[h]),
          (this.data[l + 4] = g.blue),
          (this.data[l + 4 + 1] = g.green),
          (this.data[l + 4 + 2] = g.red),
          (this.data[l + 4 + 3] = 255);
      }
      t !== 0 && (this.pos += 4 - t);
    }
  }),
  (Hn.prototype.bit8 = function () {
    for (var n = this.width % 4, t = this.height - 1; t >= 0; t--) {
      for (
        var e = this.bottom_up ? t : this.height - 1 - t, i = 0;
        i < this.width;
        i++
      ) {
        var s = this.datav.getUint8(this.pos++, !0),
          a = e * this.width * 4 + 4 * i;
        if (s < this.palette.length) {
          var l = this.palette[s];
          (this.data[a] = l.red),
            (this.data[a + 1] = l.green),
            (this.data[a + 2] = l.blue),
            (this.data[a + 3] = 255);
        } else
          (this.data[a] = 255),
            (this.data[a + 1] = 255),
            (this.data[a + 2] = 255),
            (this.data[a + 3] = 255);
      }
      n !== 0 && (this.pos += 4 - n);
    }
  }),
  (Hn.prototype.bit15 = function () {
    for (
      var n = this.width % 3, t = parseInt("11111", 2), e = this.height - 1;
      e >= 0;
      e--
    ) {
      for (
        var i = this.bottom_up ? e : this.height - 1 - e, s = 0;
        s < this.width;
        s++
      ) {
        var a = this.datav.getUint16(this.pos, !0);
        this.pos += 2;
        var l = (((a & t) / t) * 255) | 0,
          c = ((((a >> 5) & t) / t) * 255) | 0,
          h = ((((a >> 10) & t) / t) * 255) | 0,
          g = a >> 15 ? 255 : 0,
          m = i * this.width * 4 + 4 * s;
        (this.data[m] = h),
          (this.data[m + 1] = c),
          (this.data[m + 2] = l),
          (this.data[m + 3] = g);
      }
      this.pos += n;
    }
  }),
  (Hn.prototype.bit16 = function () {
    for (
      var n = this.width % 3,
        t = parseInt("11111", 2),
        e = parseInt("111111", 2),
        i = this.height - 1;
      i >= 0;
      i--
    ) {
      for (
        var s = this.bottom_up ? i : this.height - 1 - i, a = 0;
        a < this.width;
        a++
      ) {
        var l = this.datav.getUint16(this.pos, !0);
        this.pos += 2;
        var c = (((l & t) / t) * 255) | 0,
          h = ((((l >> 5) & e) / e) * 255) | 0,
          g = (((l >> 11) / t) * 255) | 0,
          m = s * this.width * 4 + 4 * a;
        (this.data[m] = g),
          (this.data[m + 1] = h),
          (this.data[m + 2] = c),
          (this.data[m + 3] = 255);
      }
      this.pos += n;
    }
  }),
  (Hn.prototype.bit24 = function () {
    for (var n = this.height - 1; n >= 0; n--) {
      for (
        var t = this.bottom_up ? n : this.height - 1 - n, e = 0;
        e < this.width;
        e++
      ) {
        var i = this.datav.getUint8(this.pos++, !0),
          s = this.datav.getUint8(this.pos++, !0),
          a = this.datav.getUint8(this.pos++, !0),
          l = t * this.width * 4 + 4 * e;
        (this.data[l] = a),
          (this.data[l + 1] = s),
          (this.data[l + 2] = i),
          (this.data[l + 3] = 255);
      }
      this.pos += this.width % 4;
    }
  }),
  (Hn.prototype.bit32 = function () {
    for (var n = this.height - 1; n >= 0; n--)
      for (
        var t = this.bottom_up ? n : this.height - 1 - n, e = 0;
        e < this.width;
        e++
      ) {
        var i = this.datav.getUint8(this.pos++, !0),
          s = this.datav.getUint8(this.pos++, !0),
          a = this.datav.getUint8(this.pos++, !0),
          l = this.datav.getUint8(this.pos++, !0),
          c = t * this.width * 4 + 4 * e;
        (this.data[c] = a),
          (this.data[c + 1] = s),
          (this.data[c + 2] = i),
          (this.data[c + 3] = l);
      }
  }),
  (Hn.prototype.getData = function () {
    return this.data;
  }),
  (function (n) {
    n.processBMP = function (t, e, i, s) {
      var a = new Hn(t, !1),
        l = a.width,
        c = a.height,
        h = { data: a.getData(), width: l, height: c },
        g = new $s(100).encode(h, 100);
      return n.processJPEG.call(this, g, e, i, s);
    };
  })(zt.API),
  (dl.prototype.getData = function () {
    return this.data;
  }),
  (function (n) {
    n.processWEBP = function (t, e, i, s) {
      var a = new dl(t),
        l = a.width,
        c = a.height,
        h = { data: a.getData(), width: l, height: c },
        g = new $s(100).encode(h, 100);
      return n.processJPEG.call(this, g, e, i, s);
    };
  })(zt.API),
  (zt.API.processRGBA = function (n, t, e) {
    for (
      var i = n.data,
        s = i.length,
        a = new Uint8Array((s / 4) * 3),
        l = new Uint8Array(s / 4),
        c = 0,
        h = 0,
        g = 0;
      g < s;
      g += 4
    ) {
      var m = i[g],
        v = i[g + 1],
        N = i[g + 2],
        p = i[g + 3];
      (a[c++] = m), (a[c++] = v), (a[c++] = N), (l[h++] = p);
    }
    var F = this.__addimage__.arrayBufferToBinaryString(a);
    return {
      alpha: this.__addimage__.arrayBufferToBinaryString(l),
      data: F,
      index: t,
      alias: e,
      colorSpace: "DeviceRGB",
      bitsPerComponent: 8,
      width: n.width,
      height: n.height,
    };
  }),
  (zt.API.setLanguage = function (n) {
    return (
      this.internal.languageSettings === void 0 &&
        ((this.internal.languageSettings = {}),
        (this.internal.languageSettings.isSubscribed = !1)),
      {
        af: "Afrikaans",
        sq: "Albanian",
        ar: "Arabic (Standard)",
        "ar-DZ": "Arabic (Algeria)",
        "ar-BH": "Arabic (Bahrain)",
        "ar-EG": "Arabic (Egypt)",
        "ar-IQ": "Arabic (Iraq)",
        "ar-JO": "Arabic (Jordan)",
        "ar-KW": "Arabic (Kuwait)",
        "ar-LB": "Arabic (Lebanon)",
        "ar-LY": "Arabic (Libya)",
        "ar-MA": "Arabic (Morocco)",
        "ar-OM": "Arabic (Oman)",
        "ar-QA": "Arabic (Qatar)",
        "ar-SA": "Arabic (Saudi Arabia)",
        "ar-SY": "Arabic (Syria)",
        "ar-TN": "Arabic (Tunisia)",
        "ar-AE": "Arabic (U.A.E.)",
        "ar-YE": "Arabic (Yemen)",
        an: "Aragonese",
        hy: "Armenian",
        as: "Assamese",
        ast: "Asturian",
        az: "Azerbaijani",
        eu: "Basque",
        be: "Belarusian",
        bn: "Bengali",
        bs: "Bosnian",
        br: "Breton",
        bg: "Bulgarian",
        my: "Burmese",
        ca: "Catalan",
        ch: "Chamorro",
        ce: "Chechen",
        zh: "Chinese",
        "zh-HK": "Chinese (Hong Kong)",
        "zh-CN": "Chinese (PRC)",
        "zh-SG": "Chinese (Singapore)",
        "zh-TW": "Chinese (Taiwan)",
        cv: "Chuvash",
        co: "Corsican",
        cr: "Cree",
        hr: "Croatian",
        cs: "Czech",
        da: "Danish",
        nl: "Dutch (Standard)",
        "nl-BE": "Dutch (Belgian)",
        en: "English",
        "en-AU": "English (Australia)",
        "en-BZ": "English (Belize)",
        "en-CA": "English (Canada)",
        "en-IE": "English (Ireland)",
        "en-JM": "English (Jamaica)",
        "en-NZ": "English (New Zealand)",
        "en-PH": "English (Philippines)",
        "en-ZA": "English (South Africa)",
        "en-TT": "English (Trinidad & Tobago)",
        "en-GB": "English (United Kingdom)",
        "en-US": "English (United States)",
        "en-ZW": "English (Zimbabwe)",
        eo: "Esperanto",
        et: "Estonian",
        fo: "Faeroese",
        fj: "Fijian",
        fi: "Finnish",
        fr: "French (Standard)",
        "fr-BE": "French (Belgium)",
        "fr-CA": "French (Canada)",
        "fr-FR": "French (France)",
        "fr-LU": "French (Luxembourg)",
        "fr-MC": "French (Monaco)",
        "fr-CH": "French (Switzerland)",
        fy: "Frisian",
        fur: "Friulian",
        gd: "Gaelic (Scots)",
        "gd-IE": "Gaelic (Irish)",
        gl: "Galacian",
        ka: "Georgian",
        de: "German (Standard)",
        "de-AT": "German (Austria)",
        "de-DE": "German (Germany)",
        "de-LI": "German (Liechtenstein)",
        "de-LU": "German (Luxembourg)",
        "de-CH": "German (Switzerland)",
        el: "Greek",
        gu: "Gujurati",
        ht: "Haitian",
        he: "Hebrew",
        hi: "Hindi",
        hu: "Hungarian",
        is: "Icelandic",
        id: "Indonesian",
        iu: "Inuktitut",
        ga: "Irish",
        it: "Italian (Standard)",
        "it-CH": "Italian (Switzerland)",
        ja: "Japanese",
        kn: "Kannada",
        ks: "Kashmiri",
        kk: "Kazakh",
        km: "Khmer",
        ky: "Kirghiz",
        tlh: "Klingon",
        ko: "Korean",
        "ko-KP": "Korean (North Korea)",
        "ko-KR": "Korean (South Korea)",
        la: "Latin",
        lv: "Latvian",
        lt: "Lithuanian",
        lb: "Luxembourgish",
        mk: "North Macedonia",
        ms: "Malay",
        ml: "Malayalam",
        mt: "Maltese",
        mi: "Maori",
        mr: "Marathi",
        mo: "Moldavian",
        nv: "Navajo",
        ng: "Ndonga",
        ne: "Nepali",
        no: "Norwegian",
        nb: "Norwegian (Bokmal)",
        nn: "Norwegian (Nynorsk)",
        oc: "Occitan",
        or: "Oriya",
        om: "Oromo",
        fa: "Persian",
        "fa-IR": "Persian/Iran",
        pl: "Polish",
        pt: "Portuguese",
        "pt-BR": "Portuguese (Brazil)",
        pa: "Punjabi",
        "pa-IN": "Punjabi (India)",
        "pa-PK": "Punjabi (Pakistan)",
        qu: "Quechua",
        rm: "Rhaeto-Romanic",
        ro: "Romanian",
        "ro-MO": "Romanian (Moldavia)",
        ru: "Russian",
        "ru-MO": "Russian (Moldavia)",
        sz: "Sami (Lappish)",
        sg: "Sango",
        sa: "Sanskrit",
        sc: "Sardinian",
        sd: "Sindhi",
        si: "Singhalese",
        sr: "Serbian",
        sk: "Slovak",
        sl: "Slovenian",
        so: "Somani",
        sb: "Sorbian",
        es: "Spanish",
        "es-AR": "Spanish (Argentina)",
        "es-BO": "Spanish (Bolivia)",
        "es-CL": "Spanish (Chile)",
        "es-CO": "Spanish (Colombia)",
        "es-CR": "Spanish (Costa Rica)",
        "es-DO": "Spanish (Dominican Republic)",
        "es-EC": "Spanish (Ecuador)",
        "es-SV": "Spanish (El Salvador)",
        "es-GT": "Spanish (Guatemala)",
        "es-HN": "Spanish (Honduras)",
        "es-MX": "Spanish (Mexico)",
        "es-NI": "Spanish (Nicaragua)",
        "es-PA": "Spanish (Panama)",
        "es-PY": "Spanish (Paraguay)",
        "es-PE": "Spanish (Peru)",
        "es-PR": "Spanish (Puerto Rico)",
        "es-ES": "Spanish (Spain)",
        "es-UY": "Spanish (Uruguay)",
        "es-VE": "Spanish (Venezuela)",
        sx: "Sutu",
        sw: "Swahili",
        sv: "Swedish",
        "sv-FI": "Swedish (Finland)",
        "sv-SV": "Swedish (Sweden)",
        ta: "Tamil",
        tt: "Tatar",
        te: "Teluga",
        th: "Thai",
        tig: "Tigre",
        ts: "Tsonga",
        tn: "Tswana",
        tr: "Turkish",
        tk: "Turkmen",
        uk: "Ukrainian",
        hsb: "Upper Sorbian",
        ur: "Urdu",
        ve: "Venda",
        vi: "Vietnamese",
        vo: "Volapuk",
        wa: "Walloon",
        cy: "Welsh",
        xh: "Xhosa",
        ji: "Yiddish",
        zu: "Zulu",
      }[n] !== void 0 &&
        ((this.internal.languageSettings.languageCode = n),
        this.internal.languageSettings.isSubscribed === !1 &&
          (this.internal.events.subscribe("putCatalog", function () {
            this.internal.write(
              "/Lang (" + this.internal.languageSettings.languageCode + ")",
            );
          }),
          (this.internal.languageSettings.isSubscribed = !0))),
      this
    );
  }),
  (Di = zt.API),
  (ko = Di.getCharWidthsArray =
    function (n, t) {
      var e,
        i,
        s = (t = t || {}).font || this.internal.getFont(),
        a = t.fontSize || this.internal.getFontSize(),
        l = t.charSpace || this.internal.getCharSpace(),
        c = t.widths ? t.widths : s.metadata.Unicode.widths,
        h = c.fof ? c.fof : 1,
        g = t.kerning ? t.kerning : s.metadata.Unicode.kerning,
        m = g.fof ? g.fof : 1,
        v = t.doKerning !== !1,
        N = 0,
        p = n.length,
        F = 0,
        P = c[0] || h,
        M = [];
      for (e = 0; e < p; e++)
        (i = n.charCodeAt(e)),
          typeof s.metadata.widthOfString == "function"
            ? M.push(
                (s.metadata.widthOfGlyph(s.metadata.characterToGlyph(i)) +
                  l * (1e3 / a) || 0) / 1e3,
              )
            : ((N =
                v && de(g[i]) === "object" && !isNaN(parseInt(g[i][F], 10))
                  ? g[i][F] / m
                  : 0),
              M.push((c[i] || P) / h + N)),
          (F = i);
      return M;
    }),
  (ll = Di.getStringUnitWidth =
    function (n, t) {
      var e = (t = t || {}).fontSize || this.internal.getFontSize(),
        i = t.font || this.internal.getFont(),
        s = t.charSpace || this.internal.getCharSpace();
      return (
        Di.processArabic && (n = Di.processArabic(n)),
        typeof i.metadata.widthOfString == "function"
          ? i.metadata.widthOfString(n, e, s) / e
          : ko.apply(this, arguments).reduce(function (a, l) {
              return a + l;
            }, 0)
      );
    }),
  (cl = function (n, t, e, i) {
    for (var s = [], a = 0, l = n.length, c = 0; a !== l && c + t[a] < e; )
      (c += t[a]), a++;
    s.push(n.slice(0, a));
    var h = a;
    for (c = 0; a !== l; )
      c + t[a] > i && (s.push(n.slice(h, a)), (c = 0), (h = a)),
        (c += t[a]),
        a++;
    return h !== a && s.push(n.slice(h, a)), s;
  }),
  (fl = function (n, t, e) {
    e || (e = {});
    var i,
      s,
      a,
      l,
      c,
      h,
      g,
      m = [],
      v = [m],
      N = e.textIndent || 0,
      p = 0,
      F = 0,
      P = n.split(" "),
      M = ko.apply(this, [" ", e])[0];
    if ((h = e.lineIndent === -1 ? P[0].length + 2 : e.lineIndent || 0)) {
      var _ = Array(h).join(" "),
        E = [];
      P.map(function (nt) {
        (nt = nt.split(/\s*\n/)).length > 1
          ? (E = E.concat(
              nt.map(function (st, wt) {
                return (
                  (wt && st.length
                    ? `
`
                    : "") + st
                );
              }),
            ))
          : E.push(nt[0]);
      }),
        (P = E),
        (h = ll.apply(this, [_, e]));
    }
    for (a = 0, l = P.length; a < l; a++) {
      var G = 0;
      if (
        ((i = P[a]),
        h &&
          i[0] ==
            `
` &&
          ((i = i.substr(1)), (G = 1)),
        N +
          p +
          (F = (s = ko.apply(this, [i, e])).reduce(function (nt, st) {
            return nt + st;
          }, 0)) >
          t || G)
      ) {
        if (F > t) {
          for (
            c = cl.apply(this, [i, s, t - (N + p), t]),
              m.push(c.shift()),
              m = [c.pop()];
            c.length;

          )
            v.push([c.shift()]);
          F = s.slice(i.length - (m[0] ? m[0].length : 0)).reduce(function (
            nt,
            st,
          ) {
            return nt + st;
          }, 0);
        } else m = [i];
        v.push(m), (N = F + h), (p = M);
      } else m.push(i), (N += p + F), (p = M);
    }
    return (
      (g = h
        ? function (nt, st) {
            return (st ? _ : "") + nt.join(" ");
          }
        : function (nt) {
            return nt.join(" ");
          }),
      v.map(g)
    );
  }),
  (Di.splitTextToSize = function (n, t, e) {
    var i,
      s = (e = e || {}).fontSize || this.internal.getFontSize(),
      a = function (m) {
        if (m.widths && m.kerning)
          return { widths: m.widths, kerning: m.kerning };
        var v = this.internal.getFont(m.fontName, m.fontStyle);
        return v.metadata.Unicode
          ? {
              widths: v.metadata.Unicode.widths || { 0: 1 },
              kerning: v.metadata.Unicode.kerning || {},
            }
          : {
              font: v.metadata,
              fontSize: this.internal.getFontSize(),
              charSpace: this.internal.getCharSpace(),
            };
      }.call(this, e);
    i = Array.isArray(n) ? n : String(n).split(/\r?\n/);
    var l = (1 * this.internal.scaleFactor * t) / s;
    (a.textIndent = e.textIndent
      ? (1 * e.textIndent * this.internal.scaleFactor) / s
      : 0),
      (a.lineIndent = e.lineIndent);
    var c,
      h,
      g = [];
    for (c = 0, h = i.length; c < h; c++)
      g = g.concat(fl.apply(this, [i[c], l, a]));
    return g;
  }),
  (function (n) {
    n.__fontmetrics__ = n.__fontmetrics__ || {};
    for (var t = "klmnopqrstuvwxyz", e = {}, i = {}, s = 0; s < t.length; s++)
      (e[t[s]] = "0123456789abcdef"[s]), (i["0123456789abcdef"[s]] = t[s]);
    var a = function (v) {
        return "0x" + parseInt(v, 10).toString(16);
      },
      l = (n.__fontmetrics__.compress = function (v) {
        var N,
          p,
          F,
          P,
          M = ["{"];
        for (var _ in v) {
          if (
            ((N = v[_]),
            isNaN(parseInt(_, 10))
              ? (p = "'" + _ + "'")
              : ((_ = parseInt(_, 10)),
                (p = (p = a(_).slice(2)).slice(0, -1) + i[p.slice(-1)])),
            typeof N == "number")
          )
            N < 0
              ? ((F = a(N).slice(3)), (P = "-"))
              : ((F = a(N).slice(2)), (P = "")),
              (F = P + F.slice(0, -1) + i[F.slice(-1)]);
          else {
            if (de(N) !== "object")
              throw new Error(
                "Don't know what to do with value type " + de(N) + ".",
              );
            F = l(N);
          }
          M.push(p + F);
        }
        return M.push("}"), M.join("");
      }),
      c = (n.__fontmetrics__.uncompress = function (v) {
        if (typeof v != "string")
          throw new Error("Invalid argument passed to uncompress.");
        for (
          var N,
            p,
            F,
            P,
            M = {},
            _ = 1,
            E = M,
            G = [],
            nt = "",
            st = "",
            wt = v.length - 1,
            tt = 1;
          tt < wt;
          tt += 1
        )
          (P = v[tt]) == "'"
            ? N
              ? ((F = N.join("")), (N = void 0))
              : (N = [])
            : N
              ? N.push(P)
              : P == "{"
                ? (G.push([E, F]), (E = {}), (F = void 0))
                : P == "}"
                  ? (((p = G.pop())[0][p[1]] = E), (F = void 0), (E = p[0]))
                  : P == "-"
                    ? (_ = -1)
                    : F === void 0
                      ? e.hasOwnProperty(P)
                        ? ((nt += e[P]),
                          (F = parseInt(nt, 16) * _),
                          (_ = 1),
                          (nt = ""))
                        : (nt += P)
                      : e.hasOwnProperty(P)
                        ? ((st += e[P]),
                          (E[F] = parseInt(st, 16) * _),
                          (_ = 1),
                          (F = void 0),
                          (st = ""))
                        : (st += P);
        return M;
      }),
      h = {
        codePages: ["WinAnsiEncoding"],
        WinAnsiEncoding: c(
          "{19m8n201n9q201o9r201s9l201t9m201u8m201w9n201x9o201y8o202k8q202l8r202m9p202q8p20aw8k203k8t203t8v203u9v2cq8s212m9t15m8w15n9w2dw9s16k8u16l9u17s9z17x8y17y9y}",
        ),
      },
      g = {
        Unicode: {
          Courier: h,
          "Courier-Bold": h,
          "Courier-BoldOblique": h,
          "Courier-Oblique": h,
          Helvetica: h,
          "Helvetica-Bold": h,
          "Helvetica-BoldOblique": h,
          "Helvetica-Oblique": h,
          "Times-Roman": h,
          "Times-Bold": h,
          "Times-BoldItalic": h,
          "Times-Italic": h,
        },
      },
      m = {
        Unicode: {
          "Courier-Oblique": c("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),
          "Times-BoldItalic": c(
            "{'widths'{k3o2q4ycx2r201n3m201o6o201s2l201t2l201u2l201w3m201x3m201y3m2k1t2l2r202m2n2n3m2o3m2p5n202q6o2r1w2s2l2t2l2u3m2v3t2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w3t3x3t3y3t3z3m4k5n4l4m4m4m4n4m4o4s4p4m4q4m4r4s4s4y4t2r4u3m4v4m4w3x4x5t4y4s4z4s5k3x5l4s5m4m5n3r5o3x5p4s5q4m5r5t5s4m5t3x5u3x5v2l5w1w5x2l5y3t5z3m6k2l6l3m6m3m6n2w6o3m6p2w6q2l6r3m6s3r6t1w6u1w6v3m6w1w6x4y6y3r6z3m7k3m7l3m7m2r7n2r7o1w7p3r7q2w7r4m7s3m7t2w7u2r7v2n7w1q7x2n7y3t202l3mcl4mal2ram3man3mao3map3mar3mas2lat4uau1uav3maw3way4uaz2lbk2sbl3t'fof'6obo2lbp3tbq3mbr1tbs2lbu1ybv3mbz3mck4m202k3mcm4mcn4mco4mcp4mcq5ycr4mcs4mct4mcu4mcv4mcw2r2m3rcy2rcz2rdl4sdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek3mel3mem3men3meo3mep3meq4ser2wes2wet2weu2wev2wew1wex1wey1wez1wfl3rfm3mfn3mfo3mfp3mfq3mfr3tfs3mft3rfu3rfv3rfw3rfz2w203k6o212m6o2dw2l2cq2l3t3m3u2l17s3x19m3m}'kerning'{cl{4qu5kt5qt5rs17ss5ts}201s{201ss}201t{cks4lscmscnscoscpscls2wu2yu201ts}201x{2wu2yu}2k{201ts}2w{4qx5kx5ou5qx5rs17su5tu}2x{17su5tu5ou}2y{4qx5kx5ou5qx5rs17ss5ts}'fof'-6ofn{17sw5tw5ou5qw5rs}7t{cksclscmscnscoscps4ls}3u{17su5tu5os5qs}3v{17su5tu5os5qs}7p{17su5tu}ck{4qu5kt5qt5rs17ss5ts}4l{4qu5kt5qt5rs17ss5ts}cm{4qu5kt5qt5rs17ss5ts}cn{4qu5kt5qt5rs17ss5ts}co{4qu5kt5qt5rs17ss5ts}cp{4qu5kt5qt5rs17ss5ts}6l{4qu5ou5qw5rt17su5tu}5q{ckuclucmucnucoucpu4lu}5r{ckuclucmucnucoucpu4lu}7q{cksclscmscnscoscps4ls}6p{4qu5ou5qw5rt17sw5tw}ek{4qu5ou5qw5rt17su5tu}el{4qu5ou5qw5rt17su5tu}em{4qu5ou5qw5rt17su5tu}en{4qu5ou5qw5rt17su5tu}eo{4qu5ou5qw5rt17su5tu}ep{4qu5ou5qw5rt17su5tu}es{17ss5ts5qs4qu}et{4qu5ou5qw5rt17sw5tw}eu{4qu5ou5qw5rt17ss5ts}ev{17ss5ts5qs4qu}6z{17sw5tw5ou5qw5rs}fm{17sw5tw5ou5qw5rs}7n{201ts}fo{17sw5tw5ou5qw5rs}fp{17sw5tw5ou5qw5rs}fq{17sw5tw5ou5qw5rs}7r{cksclscmscnscoscps4ls}fs{17sw5tw5ou5qw5rs}ft{17su5tu}fu{17su5tu}fv{17su5tu}fw{17su5tu}fz{cksclscmscnscoscps4ls}}}",
          ),
          "Helvetica-Bold": c(
            "{'widths'{k3s2q4scx1w201n3r201o6o201s1w201t1w201u1w201w3m201x3m201y3m2k1w2l2l202m2n2n3r2o3r2p5t202q6o2r1s2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v2l3w3u3x3u3y3u3z3x4k6l4l4s4m4s4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3r4v4s4w3x4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v2l5w1w5x2l5y3u5z3r6k2l6l3r6m3x6n3r6o3x6p3r6q2l6r3x6s3x6t1w6u1w6v3r6w1w6x5t6y3x6z3x7k3x7l3x7m2r7n3r7o2l7p3x7q3r7r4y7s3r7t3r7u3m7v2r7w1w7x2r7y3u202l3rcl4sal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3xbq3rbr1wbs2lbu2obv3rbz3xck4s202k3rcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw1w2m2zcy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3res3ret3reu3rev3rew1wex1wey1wez1wfl3xfm3xfn3xfo3xfp3xfq3xfr3ufs3xft3xfu3xfv3xfw3xfz3r203k6o212m6o2dw2l2cq2l3t3r3u2l17s4m19m3r}'kerning'{cl{4qs5ku5ot5qs17sv5tv}201t{2ww4wy2yw}201w{2ks}201x{2ww4wy2yw}2k{201ts201xs}2w{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}2x{5ow5qs}2y{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}'fof'-6o7p{17su5tu5ot}ck{4qs5ku5ot5qs17sv5tv}4l{4qs5ku5ot5qs17sv5tv}cm{4qs5ku5ot5qs17sv5tv}cn{4qs5ku5ot5qs17sv5tv}co{4qs5ku5ot5qs17sv5tv}cp{4qs5ku5ot5qs17sv5tv}6l{17st5tt5os}17s{2kwclvcmvcnvcovcpv4lv4wwckv}5o{2kucltcmtcntcotcpt4lt4wtckt}5q{2ksclscmscnscoscps4ls4wvcks}5r{2ks4ws}5t{2kwclvcmvcnvcovcpv4lv4wwckv}eo{17st5tt5os}fu{17su5tu5ot}6p{17ss5ts}ek{17st5tt5os}el{17st5tt5os}em{17st5tt5os}en{17st5tt5os}6o{201ts}ep{17st5tt5os}es{17ss5ts}et{17ss5ts}eu{17ss5ts}ev{17ss5ts}6z{17su5tu5os5qt}fm{17su5tu5os5qt}fn{17su5tu5os5qt}fo{17su5tu5os5qt}fp{17su5tu5os5qt}fq{17su5tu5os5qt}fs{17su5tu5os5qt}ft{17su5tu5ot}7m{5os}fv{17su5tu5ot}fw{17su5tu5ot}}}",
          ),
          Courier: c("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),
          "Courier-BoldOblique": c("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),
          "Times-Bold": c(
            "{'widths'{k3q2q5ncx2r201n3m201o6o201s2l201t2l201u2l201w3m201x3m201y3m2k1t2l2l202m2n2n3m2o3m2p6o202q6o2r1w2s2l2t2l2u3m2v3t2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w3t3x3t3y3t3z3m4k5x4l4s4m4m4n4s4o4s4p4m4q3x4r4y4s4y4t2r4u3m4v4y4w4m4x5y4y4s4z4y5k3x5l4y5m4s5n3r5o4m5p4s5q4s5r6o5s4s5t4s5u4m5v2l5w1w5x2l5y3u5z3m6k2l6l3m6m3r6n2w6o3r6p2w6q2l6r3m6s3r6t1w6u2l6v3r6w1w6x5n6y3r6z3m7k3r7l3r7m2w7n2r7o2l7p3r7q3m7r4s7s3m7t3m7u2w7v2r7w1q7x2r7y3o202l3mcl4sal2lam3man3mao3map3mar3mas2lat4uau1yav3maw3tay4uaz2lbk2sbl3t'fof'6obo2lbp3rbr1tbs2lbu2lbv3mbz3mck4s202k3mcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw2r2m3rcy2rcz2rdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3rek3mel3mem3men3meo3mep3meq4ser2wes2wet2weu2wev2wew1wex1wey1wez1wfl3rfm3mfn3mfo3mfp3mfq3mfr3tfs3mft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3m3u2l17s4s19m3m}'kerning'{cl{4qt5ks5ot5qy5rw17sv5tv}201t{cks4lscmscnscoscpscls4wv}2k{201ts}2w{4qu5ku7mu5os5qx5ru17su5tu}2x{17su5tu5ou5qs}2y{4qv5kv7mu5ot5qz5ru17su5tu}'fof'-6o7t{cksclscmscnscoscps4ls}3u{17su5tu5os5qu}3v{17su5tu5os5qu}fu{17su5tu5ou5qu}7p{17su5tu5ou5qu}ck{4qt5ks5ot5qy5rw17sv5tv}4l{4qt5ks5ot5qy5rw17sv5tv}cm{4qt5ks5ot5qy5rw17sv5tv}cn{4qt5ks5ot5qy5rw17sv5tv}co{4qt5ks5ot5qy5rw17sv5tv}cp{4qt5ks5ot5qy5rw17sv5tv}6l{17st5tt5ou5qu}17s{ckuclucmucnucoucpu4lu4wu}5o{ckuclucmucnucoucpu4lu4wu}5q{ckzclzcmzcnzcozcpz4lz4wu}5r{ckxclxcmxcnxcoxcpx4lx4wu}5t{ckuclucmucnucoucpu4lu4wu}7q{ckuclucmucnucoucpu4lu}6p{17sw5tw5ou5qu}ek{17st5tt5qu}el{17st5tt5ou5qu}em{17st5tt5qu}en{17st5tt5qu}eo{17st5tt5qu}ep{17st5tt5ou5qu}es{17ss5ts5qu}et{17sw5tw5ou5qu}eu{17sw5tw5ou5qu}ev{17ss5ts5qu}6z{17sw5tw5ou5qu5rs}fm{17sw5tw5ou5qu5rs}fn{17sw5tw5ou5qu5rs}fo{17sw5tw5ou5qu5rs}fp{17sw5tw5ou5qu5rs}fq{17sw5tw5ou5qu5rs}7r{cktcltcmtcntcotcpt4lt5os}fs{17sw5tw5ou5qu5rs}ft{17su5tu5ou5qu}7m{5os}fv{17su5tu5ou5qu}fw{17su5tu5ou5qu}fz{cksclscmscnscoscps4ls}}}",
          ),
          Symbol: c(
            "{'widths'{k3uaw4r19m3m2k1t2l2l202m2y2n3m2p5n202q6o3k3m2s2l2t2l2v3r2w1t3m3m2y1t2z1wbk2sbl3r'fof'6o3n3m3o3m3p3m3q3m3r3m3s3m3t3m3u1w3v1w3w3r3x3r3y3r3z2wbp3t3l3m5v2l5x2l5z3m2q4yfr3r7v3k7w1o7x3k}'kerning'{'fof'-6o}}",
          ),
          Helvetica: c(
            "{'widths'{k3p2q4mcx1w201n3r201o6o201s1q201t1q201u1q201w2l201x2l201y2l2k1w2l1w202m2n2n3r2o3r2p5t202q6o2r1n2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v1w3w3u3x3u3y3u3z3r4k6p4l4m4m4m4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3m4v4m4w3r4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v1w5w1w5x1w5y2z5z3r6k2l6l3r6m3r6n3m6o3r6p3r6q1w6r3r6s3r6t1q6u1q6v3m6w1q6x5n6y3r6z3r7k3r7l3r7m2l7n3m7o1w7p3r7q3m7r4s7s3m7t3m7u3m7v2l7w1u7x2l7y3u202l3rcl4mal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3rbr1wbs2lbu2obv3rbz3xck4m202k3rcm4mcn4mco4mcp4mcq6ocr4scs4mct4mcu4mcv4mcw1w2m2ncy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3mes3ret3reu3rev3rew1wex1wey1wez1wfl3rfm3rfn3rfo3rfp3rfq3rfr3ufs3xft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3r3u1w17s4m19m3r}'kerning'{5q{4wv}cl{4qs5kw5ow5qs17sv5tv}201t{2wu4w1k2yu}201x{2wu4wy2yu}17s{2ktclucmucnu4otcpu4lu4wycoucku}2w{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}2x{17sy5ty5oy5qs}2y{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}'fof'-6o7p{17sv5tv5ow}ck{4qs5kw5ow5qs17sv5tv}4l{4qs5kw5ow5qs17sv5tv}cm{4qs5kw5ow5qs17sv5tv}cn{4qs5kw5ow5qs17sv5tv}co{4qs5kw5ow5qs17sv5tv}cp{4qs5kw5ow5qs17sv5tv}6l{17sy5ty5ow}do{17st5tt}4z{17st5tt}7s{fst}dm{17st5tt}dn{17st5tt}5o{ckwclwcmwcnwcowcpw4lw4wv}dp{17st5tt}dq{17st5tt}7t{5ow}ds{17st5tt}5t{2ktclucmucnu4otcpu4lu4wycoucku}fu{17sv5tv5ow}6p{17sy5ty5ow5qs}ek{17sy5ty5ow}el{17sy5ty5ow}em{17sy5ty5ow}en{5ty}eo{17sy5ty5ow}ep{17sy5ty5ow}es{17sy5ty5qs}et{17sy5ty5ow5qs}eu{17sy5ty5ow5qs}ev{17sy5ty5ow5qs}6z{17sy5ty5ow5qs}fm{17sy5ty5ow5qs}fn{17sy5ty5ow5qs}fo{17sy5ty5ow5qs}fp{17sy5ty5qs}fq{17sy5ty5ow5qs}7r{5ow}fs{17sy5ty5ow5qs}ft{17sv5tv5ow}7m{5ow}fv{17sv5tv5ow}fw{17sv5tv5ow}}}",
          ),
          "Helvetica-BoldOblique": c(
            "{'widths'{k3s2q4scx1w201n3r201o6o201s1w201t1w201u1w201w3m201x3m201y3m2k1w2l2l202m2n2n3r2o3r2p5t202q6o2r1s2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v2l3w3u3x3u3y3u3z3x4k6l4l4s4m4s4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3r4v4s4w3x4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v2l5w1w5x2l5y3u5z3r6k2l6l3r6m3x6n3r6o3x6p3r6q2l6r3x6s3x6t1w6u1w6v3r6w1w6x5t6y3x6z3x7k3x7l3x7m2r7n3r7o2l7p3x7q3r7r4y7s3r7t3r7u3m7v2r7w1w7x2r7y3u202l3rcl4sal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3xbq3rbr1wbs2lbu2obv3rbz3xck4s202k3rcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw1w2m2zcy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3res3ret3reu3rev3rew1wex1wey1wez1wfl3xfm3xfn3xfo3xfp3xfq3xfr3ufs3xft3xfu3xfv3xfw3xfz3r203k6o212m6o2dw2l2cq2l3t3r3u2l17s4m19m3r}'kerning'{cl{4qs5ku5ot5qs17sv5tv}201t{2ww4wy2yw}201w{2ks}201x{2ww4wy2yw}2k{201ts201xs}2w{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}2x{5ow5qs}2y{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}'fof'-6o7p{17su5tu5ot}ck{4qs5ku5ot5qs17sv5tv}4l{4qs5ku5ot5qs17sv5tv}cm{4qs5ku5ot5qs17sv5tv}cn{4qs5ku5ot5qs17sv5tv}co{4qs5ku5ot5qs17sv5tv}cp{4qs5ku5ot5qs17sv5tv}6l{17st5tt5os}17s{2kwclvcmvcnvcovcpv4lv4wwckv}5o{2kucltcmtcntcotcpt4lt4wtckt}5q{2ksclscmscnscoscps4ls4wvcks}5r{2ks4ws}5t{2kwclvcmvcnvcovcpv4lv4wwckv}eo{17st5tt5os}fu{17su5tu5ot}6p{17ss5ts}ek{17st5tt5os}el{17st5tt5os}em{17st5tt5os}en{17st5tt5os}6o{201ts}ep{17st5tt5os}es{17ss5ts}et{17ss5ts}eu{17ss5ts}ev{17ss5ts}6z{17su5tu5os5qt}fm{17su5tu5os5qt}fn{17su5tu5os5qt}fo{17su5tu5os5qt}fp{17su5tu5os5qt}fq{17su5tu5os5qt}fs{17su5tu5os5qt}ft{17su5tu5ot}7m{5os}fv{17su5tu5ot}fw{17su5tu5ot}}}",
          ),
          ZapfDingbats: c("{'widths'{k4u2k1w'fof'6o}'kerning'{'fof'-6o}}"),
          "Courier-Bold": c("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),
          "Times-Italic": c(
            "{'widths'{k3n2q4ycx2l201n3m201o5t201s2l201t2l201u2l201w3r201x3r201y3r2k1t2l2l202m2n2n3m2o3m2p5n202q5t2r1p2s2l2t2l2u3m2v4n2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w4n3x4n3y4n3z3m4k5w4l3x4m3x4n4m4o4s4p3x4q3x4r4s4s4s4t2l4u2w4v4m4w3r4x5n4y4m4z4s5k3x5l4s5m3x5n3m5o3r5p4s5q3x5r5n5s3x5t3r5u3r5v2r5w1w5x2r5y2u5z3m6k2l6l3m6m3m6n2w6o3m6p2w6q1w6r3m6s3m6t1w6u1w6v2w6w1w6x4s6y3m6z3m7k3m7l3m7m2r7n2r7o1w7p3m7q2w7r4m7s2w7t2w7u2r7v2s7w1v7x2s7y3q202l3mcl3xal2ram3man3mao3map3mar3mas2lat4wau1vav3maw4nay4waz2lbk2sbl4n'fof'6obo2lbp3mbq3obr1tbs2lbu1zbv3mbz3mck3x202k3mcm3xcn3xco3xcp3xcq5tcr4mcs3xct3xcu3xcv3xcw2l2m2ucy2lcz2ldl4mdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek3mel3mem3men3meo3mep3meq4mer2wes2wet2weu2wev2wew1wex1wey1wez1wfl3mfm3mfn3mfo3mfp3mfq3mfr4nfs3mft3mfu3mfv3mfw3mfz2w203k6o212m6m2dw2l2cq2l3t3m3u2l17s3r19m3m}'kerning'{cl{5kt4qw}201s{201sw}201t{201tw2wy2yy6q-t}201x{2wy2yy}2k{201tw}2w{7qs4qy7rs5ky7mw5os5qx5ru17su5tu}2x{17ss5ts5os}2y{7qs4qy7rs5ky7mw5os5qx5ru17su5tu}'fof'-6o6t{17ss5ts5qs}7t{5os}3v{5qs}7p{17su5tu5qs}ck{5kt4qw}4l{5kt4qw}cm{5kt4qw}cn{5kt4qw}co{5kt4qw}cp{5kt4qw}6l{4qs5ks5ou5qw5ru17su5tu}17s{2ks}5q{ckvclvcmvcnvcovcpv4lv}5r{ckuclucmucnucoucpu4lu}5t{2ks}6p{4qs5ks5ou5qw5ru17su5tu}ek{4qs5ks5ou5qw5ru17su5tu}el{4qs5ks5ou5qw5ru17su5tu}em{4qs5ks5ou5qw5ru17su5tu}en{4qs5ks5ou5qw5ru17su5tu}eo{4qs5ks5ou5qw5ru17su5tu}ep{4qs5ks5ou5qw5ru17su5tu}es{5ks5qs4qs}et{4qs5ks5ou5qw5ru17su5tu}eu{4qs5ks5qw5ru17su5tu}ev{5ks5qs4qs}ex{17ss5ts5qs}6z{4qv5ks5ou5qw5ru17su5tu}fm{4qv5ks5ou5qw5ru17su5tu}fn{4qv5ks5ou5qw5ru17su5tu}fo{4qv5ks5ou5qw5ru17su5tu}fp{4qv5ks5ou5qw5ru17su5tu}fq{4qv5ks5ou5qw5ru17su5tu}7r{5os}fs{4qv5ks5ou5qw5ru17su5tu}ft{17su5tu5qs}fu{17su5tu5qs}fv{17su5tu5qs}fw{17su5tu5qs}}}",
          ),
          "Times-Roman": c(
            "{'widths'{k3n2q4ycx2l201n3m201o6o201s2l201t2l201u2l201w2w201x2w201y2w2k1t2l2l202m2n2n3m2o3m2p5n202q6o2r1m2s2l2t2l2u3m2v3s2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v1w3w3s3x3s3y3s3z2w4k5w4l4s4m4m4n4m4o4s4p3x4q3r4r4s4s4s4t2l4u2r4v4s4w3x4x5t4y4s4z4s5k3r5l4s5m4m5n3r5o3x5p4s5q4s5r5y5s4s5t4s5u3x5v2l5w1w5x2l5y2z5z3m6k2l6l2w6m3m6n2w6o3m6p2w6q2l6r3m6s3m6t1w6u1w6v3m6w1w6x4y6y3m6z3m7k3m7l3m7m2l7n2r7o1w7p3m7q3m7r4s7s3m7t3m7u2w7v3k7w1o7x3k7y3q202l3mcl4sal2lam3man3mao3map3mar3mas2lat4wau1vav3maw3say4waz2lbk2sbl3s'fof'6obo2lbp3mbq2xbr1tbs2lbu1zbv3mbz2wck4s202k3mcm4scn4sco4scp4scq5tcr4mcs3xct3xcu3xcv3xcw2l2m2tcy2lcz2ldl4sdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek2wel2wem2wen2weo2wep2weq4mer2wes2wet2weu2wev2wew1wex1wey1wez1wfl3mfm3mfn3mfo3mfp3mfq3mfr3sfs3mft3mfu3mfv3mfw3mfz3m203k6o212m6m2dw2l2cq2l3t3m3u1w17s4s19m3m}'kerning'{cl{4qs5ku17sw5ou5qy5rw201ss5tw201ws}201s{201ss}201t{ckw4lwcmwcnwcowcpwclw4wu201ts}2k{201ts}2w{4qs5kw5os5qx5ru17sx5tx}2x{17sw5tw5ou5qu}2y{4qs5kw5os5qx5ru17sx5tx}'fof'-6o7t{ckuclucmucnucoucpu4lu5os5rs}3u{17su5tu5qs}3v{17su5tu5qs}7p{17sw5tw5qs}ck{4qs5ku17sw5ou5qy5rw201ss5tw201ws}4l{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cm{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cn{4qs5ku17sw5ou5qy5rw201ss5tw201ws}co{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cp{4qs5ku17sw5ou5qy5rw201ss5tw201ws}6l{17su5tu5os5qw5rs}17s{2ktclvcmvcnvcovcpv4lv4wuckv}5o{ckwclwcmwcnwcowcpw4lw4wu}5q{ckyclycmycnycoycpy4ly4wu5ms}5r{cktcltcmtcntcotcpt4lt4ws}5t{2ktclvcmvcnvcovcpv4lv4wuckv}7q{cksclscmscnscoscps4ls}6p{17su5tu5qw5rs}ek{5qs5rs}el{17su5tu5os5qw5rs}em{17su5tu5os5qs5rs}en{17su5qs5rs}eo{5qs5rs}ep{17su5tu5os5qw5rs}es{5qs}et{17su5tu5qw5rs}eu{17su5tu5qs5rs}ev{5qs}6z{17sv5tv5os5qx5rs}fm{5os5qt5rs}fn{17sv5tv5os5qx5rs}fo{17sv5tv5os5qx5rs}fp{5os5qt5rs}fq{5os5qt5rs}7r{ckuclucmucnucoucpu4lu5os}fs{17sv5tv5os5qx5rs}ft{17ss5ts5qs}fu{17sw5tw5qs}fv{17sw5tw5qs}fw{17ss5ts5qs}fz{ckuclucmucnucoucpu4lu5os5rs}}}",
          ),
          "Helvetica-Oblique": c(
            "{'widths'{k3p2q4mcx1w201n3r201o6o201s1q201t1q201u1q201w2l201x2l201y2l2k1w2l1w202m2n2n3r2o3r2p5t202q6o2r1n2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v1w3w3u3x3u3y3u3z3r4k6p4l4m4m4m4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3m4v4m4w3r4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v1w5w1w5x1w5y2z5z3r6k2l6l3r6m3r6n3m6o3r6p3r6q1w6r3r6s3r6t1q6u1q6v3m6w1q6x5n6y3r6z3r7k3r7l3r7m2l7n3m7o1w7p3r7q3m7r4s7s3m7t3m7u3m7v2l7w1u7x2l7y3u202l3rcl4mal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3rbr1wbs2lbu2obv3rbz3xck4m202k3rcm4mcn4mco4mcp4mcq6ocr4scs4mct4mcu4mcv4mcw1w2m2ncy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3mes3ret3reu3rev3rew1wex1wey1wez1wfl3rfm3rfn3rfo3rfp3rfq3rfr3ufs3xft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3r3u1w17s4m19m3r}'kerning'{5q{4wv}cl{4qs5kw5ow5qs17sv5tv}201t{2wu4w1k2yu}201x{2wu4wy2yu}17s{2ktclucmucnu4otcpu4lu4wycoucku}2w{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}2x{17sy5ty5oy5qs}2y{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}'fof'-6o7p{17sv5tv5ow}ck{4qs5kw5ow5qs17sv5tv}4l{4qs5kw5ow5qs17sv5tv}cm{4qs5kw5ow5qs17sv5tv}cn{4qs5kw5ow5qs17sv5tv}co{4qs5kw5ow5qs17sv5tv}cp{4qs5kw5ow5qs17sv5tv}6l{17sy5ty5ow}do{17st5tt}4z{17st5tt}7s{fst}dm{17st5tt}dn{17st5tt}5o{ckwclwcmwcnwcowcpw4lw4wv}dp{17st5tt}dq{17st5tt}7t{5ow}ds{17st5tt}5t{2ktclucmucnu4otcpu4lu4wycoucku}fu{17sv5tv5ow}6p{17sy5ty5ow5qs}ek{17sy5ty5ow}el{17sy5ty5ow}em{17sy5ty5ow}en{5ty}eo{17sy5ty5ow}ep{17sy5ty5ow}es{17sy5ty5qs}et{17sy5ty5ow5qs}eu{17sy5ty5ow5qs}ev{17sy5ty5ow5qs}6z{17sy5ty5ow5qs}fm{17sy5ty5ow5qs}fn{17sy5ty5ow5qs}fo{17sy5ty5ow5qs}fp{17sy5ty5qs}fq{17sy5ty5ow5qs}7r{5ow}fs{17sy5ty5ow5qs}ft{17sv5tv5ow}7m{5ow}fv{17sv5tv5ow}fw{17sv5tv5ow}}}",
          ),
        },
      };
    n.events.push([
      "addFont",
      function (v) {
        var N = v.font,
          p = m.Unicode[N.postScriptName];
        p &&
          ((N.metadata.Unicode = {}),
          (N.metadata.Unicode.widths = p.widths),
          (N.metadata.Unicode.kerning = p.kerning));
        var F = g.Unicode[N.postScriptName];
        F && ((N.metadata.Unicode.encoding = F), (N.encoding = F.codePages[0]));
      },
    ]);
  })(zt.API),
  (function (n) {
    var t = function (e) {
      for (var i = e.length, s = new Uint8Array(i), a = 0; a < i; a++)
        s[a] = e.charCodeAt(a);
      return s;
    };
    n.API.events.push([
      "addFont",
      function (e) {
        var i = void 0,
          s = e.font,
          a = e.instance;
        if (!s.isStandardFont) {
          if (a === void 0)
            throw new Error(
              "Font does not exist in vFS, import fonts or remove declaration doc.addFont('" +
                s.postScriptName +
                "').",
            );
          if (
            typeof (i =
              a.existsFileInVFS(s.postScriptName) === !1
                ? a.loadFile(s.postScriptName)
                : a.getFileFromVFS(s.postScriptName)) != "string"
          )
            throw new Error(
              "Font is not stored as string-data in vFS, import fonts or remove declaration doc.addFont('" +
                s.postScriptName +
                "').",
            );
          (function (l, c) {
            (c = /^\x00\x01\x00\x00/.test(c) ? t(c) : t(ka(c))),
              (l.metadata = n.API.TTFFont.open(c)),
              (l.metadata.Unicode = l.metadata.Unicode || {
                encoding: {},
                kerning: {},
                widths: [],
              }),
              (l.metadata.glyIdsUsed = [0]);
          })(s, i);
        }
      },
    ]);
  })(zt),
  (function (n) {
    function t() {
      return (
        Ht.canvg
          ? Promise.resolve(Ht.canvg)
          : Xs(() => import("./index.es-BEvXNZU_.js"), [])
      )
        .catch(function (e) {
          return Promise.reject(new Error("Could not load canvg: " + e));
        })
        .then(function (e) {
          return e.default ? e.default : e;
        });
    }
    zt.API.addSvgAsImage = function (e, i, s, a, l, c, h, g) {
      if (isNaN(i) || isNaN(s))
        throw (
          (be.error("jsPDF.addSvgAsImage: Invalid coordinates", arguments),
          new Error("Invalid coordinates passed to jsPDF.addSvgAsImage"))
        );
      if (isNaN(a) || isNaN(l))
        throw (
          (be.error("jsPDF.addSvgAsImage: Invalid measurements", arguments),
          new Error(
            "Invalid measurements (width and/or height) passed to jsPDF.addSvgAsImage",
          ))
        );
      var m = document.createElement("canvas");
      (m.width = a), (m.height = l);
      var v = m.getContext("2d");
      (v.fillStyle = "#fff"), v.fillRect(0, 0, m.width, m.height);
      var N = { ignoreMouse: !0, ignoreAnimation: !0, ignoreDimensions: !0 },
        p = this;
      return t()
        .then(
          function (F) {
            return F.fromString(v, e, N);
          },
          function () {
            return Promise.reject(new Error("Could not load canvg."));
          },
        )
        .then(function (F) {
          return F.render(N);
        })
        .then(function () {
          p.addImage(m.toDataURL("image/jpeg", 1), i, s, a, l, h, g);
        });
    };
  })(),
  (zt.API.putTotalPages = function (n) {
    var t,
      e = 0;
    parseInt(this.internal.getFont().id.substr(1), 10) < 15
      ? ((t = new RegExp(n, "g")), (e = this.internal.getNumberOfPages()))
      : ((t = new RegExp(this.pdfEscape16(n, this.internal.getFont()), "g")),
        (e = this.pdfEscape16(
          this.internal.getNumberOfPages() + "",
          this.internal.getFont(),
        )));
    for (var i = 1; i <= this.internal.getNumberOfPages(); i++)
      for (var s = 0; s < this.internal.pages[i].length; s++)
        this.internal.pages[i][s] = this.internal.pages[i][s].replace(t, e);
    return this;
  }),
  (zt.API.viewerPreferences = function (n, t) {
    var e;
    (n = n || {}), (t = t || !1);
    var i,
      s,
      a,
      l = {
        HideToolbar: {
          defaultValue: !1,
          value: !1,
          type: "boolean",
          explicitSet: !1,
          valueSet: [!0, !1],
          pdfVersion: 1.3,
        },
        HideMenubar: {
          defaultValue: !1,
          value: !1,
          type: "boolean",
          explicitSet: !1,
          valueSet: [!0, !1],
          pdfVersion: 1.3,
        },
        HideWindowUI: {
          defaultValue: !1,
          value: !1,
          type: "boolean",
          explicitSet: !1,
          valueSet: [!0, !1],
          pdfVersion: 1.3,
        },
        FitWindow: {
          defaultValue: !1,
          value: !1,
          type: "boolean",
          explicitSet: !1,
          valueSet: [!0, !1],
          pdfVersion: 1.3,
        },
        CenterWindow: {
          defaultValue: !1,
          value: !1,
          type: "boolean",
          explicitSet: !1,
          valueSet: [!0, !1],
          pdfVersion: 1.3,
        },
        DisplayDocTitle: {
          defaultValue: !1,
          value: !1,
          type: "boolean",
          explicitSet: !1,
          valueSet: [!0, !1],
          pdfVersion: 1.4,
        },
        NonFullScreenPageMode: {
          defaultValue: "UseNone",
          value: "UseNone",
          type: "name",
          explicitSet: !1,
          valueSet: ["UseNone", "UseOutlines", "UseThumbs", "UseOC"],
          pdfVersion: 1.3,
        },
        Direction: {
          defaultValue: "L2R",
          value: "L2R",
          type: "name",
          explicitSet: !1,
          valueSet: ["L2R", "R2L"],
          pdfVersion: 1.3,
        },
        ViewArea: {
          defaultValue: "CropBox",
          value: "CropBox",
          type: "name",
          explicitSet: !1,
          valueSet: ["MediaBox", "CropBox", "TrimBox", "BleedBox", "ArtBox"],
          pdfVersion: 1.4,
        },
        ViewClip: {
          defaultValue: "CropBox",
          value: "CropBox",
          type: "name",
          explicitSet: !1,
          valueSet: ["MediaBox", "CropBox", "TrimBox", "BleedBox", "ArtBox"],
          pdfVersion: 1.4,
        },
        PrintArea: {
          defaultValue: "CropBox",
          value: "CropBox",
          type: "name",
          explicitSet: !1,
          valueSet: ["MediaBox", "CropBox", "TrimBox", "BleedBox", "ArtBox"],
          pdfVersion: 1.4,
        },
        PrintClip: {
          defaultValue: "CropBox",
          value: "CropBox",
          type: "name",
          explicitSet: !1,
          valueSet: ["MediaBox", "CropBox", "TrimBox", "BleedBox", "ArtBox"],
          pdfVersion: 1.4,
        },
        PrintScaling: {
          defaultValue: "AppDefault",
          value: "AppDefault",
          type: "name",
          explicitSet: !1,
          valueSet: ["AppDefault", "None"],
          pdfVersion: 1.6,
        },
        Duplex: {
          defaultValue: "",
          value: "none",
          type: "name",
          explicitSet: !1,
          valueSet: [
            "Simplex",
            "DuplexFlipShortEdge",
            "DuplexFlipLongEdge",
            "none",
          ],
          pdfVersion: 1.7,
        },
        PickTrayByPDFSize: {
          defaultValue: !1,
          value: !1,
          type: "boolean",
          explicitSet: !1,
          valueSet: [!0, !1],
          pdfVersion: 1.7,
        },
        PrintPageRange: {
          defaultValue: "",
          value: "",
          type: "array",
          explicitSet: !1,
          valueSet: null,
          pdfVersion: 1.7,
        },
        NumCopies: {
          defaultValue: 1,
          value: 1,
          type: "integer",
          explicitSet: !1,
          valueSet: null,
          pdfVersion: 1.7,
        },
      },
      c = Object.keys(l),
      h = [],
      g = 0,
      m = 0,
      v = 0;
    function N(F, P) {
      var M,
        _ = !1;
      for (M = 0; M < F.length; M += 1) F[M] === P && (_ = !0);
      return _;
    }
    if (
      (this.internal.viewerpreferences === void 0 &&
        ((this.internal.viewerpreferences = {}),
        (this.internal.viewerpreferences.configuration = JSON.parse(
          JSON.stringify(l),
        )),
        (this.internal.viewerpreferences.isSubscribed = !1)),
      (e = this.internal.viewerpreferences.configuration),
      n === "reset" || t === !0)
    ) {
      var p = c.length;
      for (v = 0; v < p; v += 1)
        (e[c[v]].value = e[c[v]].defaultValue), (e[c[v]].explicitSet = !1);
    }
    if (de(n) === "object") {
      for (s in n)
        if (((a = n[s]), N(c, s) && a !== void 0)) {
          if (e[s].type === "boolean" && typeof a == "boolean") e[s].value = a;
          else if (e[s].type === "name" && N(e[s].valueSet, a)) e[s].value = a;
          else if (e[s].type === "integer" && Number.isInteger(a))
            e[s].value = a;
          else if (e[s].type === "array") {
            for (g = 0; g < a.length; g += 1)
              if (((i = !0), a[g].length === 1 && typeof a[g][0] == "number"))
                h.push(String(a[g] - 1));
              else if (a[g].length > 1) {
                for (m = 0; m < a[g].length; m += 1)
                  typeof a[g][m] != "number" && (i = !1);
                i === !0 && h.push([a[g][0] - 1, a[g][1] - 1].join(" "));
              }
            e[s].value = "[" + h.join(" ") + "]";
          } else e[s].value = e[s].defaultValue;
          e[s].explicitSet = !0;
        }
    }
    return (
      this.internal.viewerpreferences.isSubscribed === !1 &&
        (this.internal.events.subscribe("putCatalog", function () {
          var F,
            P = [];
          for (F in e)
            e[F].explicitSet === !0 &&
              (e[F].type === "name"
                ? P.push("/" + F + " /" + e[F].value)
                : P.push("/" + F + " " + e[F].value));
          P.length !== 0 &&
            this.internal.write(
              `/ViewerPreferences
<<
` +
                P.join(`
`) +
                `
>>`,
            );
        }),
        (this.internal.viewerpreferences.isSubscribed = !0)),
      (this.internal.viewerpreferences.configuration = e),
      this
    );
  }),
  (function (n) {
    var t = function () {
        var i =
            '<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description rdf:about="" xmlns:jspdf="' +
            this.internal.__metadata__.namespaceuri +
            '"><jspdf:metadata>',
          s = unescape(
            encodeURIComponent('<x:xmpmeta xmlns:x="adobe:ns:meta/">'),
          ),
          a = unescape(encodeURIComponent(i)),
          l = unescape(encodeURIComponent(this.internal.__metadata__.metadata)),
          c = unescape(
            encodeURIComponent("</jspdf:metadata></rdf:Description></rdf:RDF>"),
          ),
          h = unescape(encodeURIComponent("</x:xmpmeta>")),
          g = a.length + l.length + c.length + s.length + h.length;
        (this.internal.__metadata__.metadata_object_number =
          this.internal.newObject()),
          this.internal.write(
            "<< /Type /Metadata /Subtype /XML /Length " + g + " >>",
          ),
          this.internal.write("stream"),
          this.internal.write(s + a + l + c + h),
          this.internal.write("endstream"),
          this.internal.write("endobj");
      },
      e = function () {
        this.internal.__metadata__.metadata_object_number &&
          this.internal.write(
            "/Metadata " +
              this.internal.__metadata__.metadata_object_number +
              " 0 R",
          );
      };
    n.addMetadata = function (i, s) {
      return (
        this.internal.__metadata__ === void 0 &&
          ((this.internal.__metadata__ = {
            metadata: i,
            namespaceuri: s || "http://jspdf.default.namespaceuri/",
          }),
          this.internal.events.subscribe("putCatalog", e),
          this.internal.events.subscribe("postPutResources", t)),
        this
      );
    };
  })(zt.API),
  (function (n) {
    var t = n.API,
      e = (t.pdfEscape16 = function (a, l) {
        for (
          var c,
            h = l.metadata.Unicode.widths,
            g = ["", "0", "00", "000", "0000"],
            m = [""],
            v = 0,
            N = a.length;
          v < N;
          ++v
        ) {
          if (
            ((c = l.metadata.characterToGlyph(a.charCodeAt(v))),
            l.metadata.glyIdsUsed.push(c),
            (l.metadata.toUnicode[c] = a.charCodeAt(v)),
            h.indexOf(c) == -1 &&
              (h.push(c), h.push([parseInt(l.metadata.widthOfGlyph(c), 10)])),
            c == "0")
          )
            return m.join("");
          (c = c.toString(16)), m.push(g[4 - c.length], c);
        }
        return m.join("");
      }),
      i = function (a) {
        var l, c, h, g, m, v, N;
        for (
          m = `/CIDInit /ProcSet findresource begin
12 dict begin
begincmap
/CIDSystemInfo <<
  /Registry (Adobe)
  /Ordering (UCS)
  /Supplement 0
>> def
/CMapName /Adobe-Identity-UCS def
/CMapType 2 def
1 begincodespacerange
<0000><ffff>
endcodespacerange`,
            h = [],
            v = 0,
            N = (c = Object.keys(a).sort(function (p, F) {
              return p - F;
            })).length;
          v < N;
          v++
        )
          (l = c[v]),
            h.length >= 100 &&
              ((m +=
                `
` +
                h.length +
                ` beginbfchar
` +
                h.join(`
`) +
                `
endbfchar`),
              (h = [])),
            a[l] !== void 0 &&
              a[l] !== null &&
              typeof a[l].toString == "function" &&
              ((g = ("0000" + a[l].toString(16)).slice(-4)),
              (l = ("0000" + (+l).toString(16)).slice(-4)),
              h.push("<" + l + "><" + g + ">"));
        return (
          h.length &&
            (m +=
              `
` +
              h.length +
              ` beginbfchar
` +
              h.join(`
`) +
              `
endbfchar
`),
          (m += `endcmap
CMapName currentdict /CMap defineresource pop
end
end`)
        );
      };
    t.events.push([
      "putFont",
      function (a) {
        (function (l) {
          var c = l.font,
            h = l.out,
            g = l.newObject,
            m = l.putStream;
          if (
            c.metadata instanceof n.API.TTFFont &&
            c.encoding === "Identity-H"
          ) {
            for (
              var v = c.metadata.Unicode.widths,
                N = c.metadata.subset.encode(c.metadata.glyIdsUsed, 1),
                p = "",
                F = 0;
              F < N.length;
              F++
            )
              p += String.fromCharCode(N[F]);
            var P = g();
            m({ data: p, addLength1: !0, objectId: P }), h("endobj");
            var M = g();
            m({ data: i(c.metadata.toUnicode), addLength1: !0, objectId: M }),
              h("endobj");
            var _ = g();
            h("<<"),
              h("/Type /FontDescriptor"),
              h("/FontName /" + zi(c.fontName)),
              h("/FontFile2 " + P + " 0 R"),
              h("/FontBBox " + n.API.PDFObject.convert(c.metadata.bbox)),
              h("/Flags " + c.metadata.flags),
              h("/StemV " + c.metadata.stemV),
              h("/ItalicAngle " + c.metadata.italicAngle),
              h("/Ascent " + c.metadata.ascender),
              h("/Descent " + c.metadata.decender),
              h("/CapHeight " + c.metadata.capHeight),
              h(">>"),
              h("endobj");
            var E = g();
            h("<<"),
              h("/Type /Font"),
              h("/BaseFont /" + zi(c.fontName)),
              h("/FontDescriptor " + _ + " 0 R"),
              h("/W " + n.API.PDFObject.convert(v)),
              h("/CIDToGIDMap /Identity"),
              h("/DW 1000"),
              h("/Subtype /CIDFontType2"),
              h("/CIDSystemInfo"),
              h("<<"),
              h("/Supplement 0"),
              h("/Registry (Adobe)"),
              h("/Ordering (" + c.encoding + ")"),
              h(">>"),
              h(">>"),
              h("endobj"),
              (c.objectNumber = g()),
              h("<<"),
              h("/Type /Font"),
              h("/Subtype /Type0"),
              h("/ToUnicode " + M + " 0 R"),
              h("/BaseFont /" + zi(c.fontName)),
              h("/Encoding /" + c.encoding),
              h("/DescendantFonts [" + E + " 0 R]"),
              h(">>"),
              h("endobj"),
              (c.isAlreadyPutted = !0);
          }
        })(a);
      },
    ]),
      t.events.push([
        "putFont",
        function (a) {
          (function (l) {
            var c = l.font,
              h = l.out,
              g = l.newObject,
              m = l.putStream;
            if (
              c.metadata instanceof n.API.TTFFont &&
              c.encoding === "WinAnsiEncoding"
            ) {
              for (var v = c.metadata.rawData, N = "", p = 0; p < v.length; p++)
                N += String.fromCharCode(v[p]);
              var F = g();
              m({ data: N, addLength1: !0, objectId: F }), h("endobj");
              var P = g();
              m({ data: i(c.metadata.toUnicode), addLength1: !0, objectId: P }),
                h("endobj");
              var M = g();
              h("<<"),
                h("/Descent " + c.metadata.decender),
                h("/CapHeight " + c.metadata.capHeight),
                h("/StemV " + c.metadata.stemV),
                h("/Type /FontDescriptor"),
                h("/FontFile2 " + F + " 0 R"),
                h("/Flags 96"),
                h("/FontBBox " + n.API.PDFObject.convert(c.metadata.bbox)),
                h("/FontName /" + zi(c.fontName)),
                h("/ItalicAngle " + c.metadata.italicAngle),
                h("/Ascent " + c.metadata.ascender),
                h(">>"),
                h("endobj"),
                (c.objectNumber = g());
              for (var _ = 0; _ < c.metadata.hmtx.widths.length; _++)
                c.metadata.hmtx.widths[_] = parseInt(
                  c.metadata.hmtx.widths[_] *
                    (1e3 / c.metadata.head.unitsPerEm),
                );
              h(
                "<</Subtype/TrueType/Type/Font/ToUnicode " +
                  P +
                  " 0 R/BaseFont/" +
                  zi(c.fontName) +
                  "/FontDescriptor " +
                  M +
                  " 0 R/Encoding/" +
                  c.encoding +
                  " /FirstChar 29 /LastChar 255 /Widths " +
                  n.API.PDFObject.convert(c.metadata.hmtx.widths) +
                  ">>",
              ),
                h("endobj"),
                (c.isAlreadyPutted = !0);
            }
          })(a);
        },
      ]);
    var s = function (a) {
      var l,
        c = a.text || "",
        h = a.x,
        g = a.y,
        m = a.options || {},
        v = a.mutex || {},
        N = v.pdfEscape,
        p = v.activeFontKey,
        F = v.fonts,
        P = p,
        M = "",
        _ = 0,
        E = "",
        G = F[P].encoding;
      if (F[P].encoding !== "Identity-H")
        return { text: c, x: h, y: g, options: m, mutex: v };
      for (
        E = c, P = p, Array.isArray(c) && (E = c[0]), _ = 0;
        _ < E.length;
        _ += 1
      )
        F[P].metadata.hasOwnProperty("cmap") &&
          (l = F[P].metadata.cmap.unicode.codeMap[E[_].charCodeAt(0)]),
          l ||
          (E[_].charCodeAt(0) < 256 && F[P].metadata.hasOwnProperty("Unicode"))
            ? (M += E[_])
            : (M += "");
      var nt = "";
      return (
        parseInt(P.slice(1)) < 14 || G === "WinAnsiEncoding"
          ? (nt = N(M, P)
              .split("")
              .map(function (st) {
                return st.charCodeAt(0).toString(16);
              })
              .join(""))
          : G === "Identity-H" && (nt = e(M, F[P])),
        (v.isHex = !0),
        { text: nt, x: h, y: g, options: m, mutex: v }
      );
    };
    t.events.push([
      "postProcessText",
      function (a) {
        var l = a.text || "",
          c = [],
          h = { text: l, x: a.x, y: a.y, options: a.options, mutex: a.mutex };
        if (Array.isArray(l)) {
          var g = 0;
          for (g = 0; g < l.length; g += 1)
            Array.isArray(l[g]) && l[g].length === 3
              ? c.push([
                  s(Object.assign({}, h, { text: l[g][0] })).text,
                  l[g][1],
                  l[g][2],
                ])
              : c.push(s(Object.assign({}, h, { text: l[g] })).text);
          a.text = c;
        } else a.text = s(Object.assign({}, h, { text: l })).text;
      },
    ]);
  })(zt),
  (function (n) {
    var t = function () {
      return this.internal.vFS === void 0 && (this.internal.vFS = {}), !0;
    };
    (n.existsFileInVFS = function (e) {
      return t.call(this), this.internal.vFS[e] !== void 0;
    }),
      (n.addFileToVFS = function (e, i) {
        return t.call(this), (this.internal.vFS[e] = i), this;
      }),
      (n.getFileFromVFS = function (e) {
        return (
          t.call(this),
          this.internal.vFS[e] !== void 0 ? this.internal.vFS[e] : null
        );
      });
  })(zt.API),
  (function (n) {
    n.__bidiEngine__ = n.prototype.__bidiEngine__ = function (i) {
      var s,
        a,
        l,
        c,
        h,
        g,
        m,
        v = t,
        N = [
          [0, 3, 0, 1, 0, 0, 0],
          [0, 3, 0, 1, 2, 2, 0],
          [0, 3, 0, 17, 2, 0, 1],
          [0, 3, 5, 5, 4, 1, 0],
          [0, 3, 21, 21, 4, 0, 1],
          [0, 3, 5, 5, 4, 2, 0],
        ],
        p = [
          [2, 0, 1, 1, 0, 1, 0],
          [2, 0, 1, 1, 0, 2, 0],
          [2, 0, 2, 1, 3, 2, 0],
          [2, 0, 2, 33, 3, 1, 1],
        ],
        F = { L: 0, R: 1, EN: 2, AN: 3, N: 4, B: 5, S: 6 },
        P = { 0: 0, 5: 1, 6: 2, 7: 3, 32: 4, 251: 5, 254: 6, 255: 7 },
        M = [
          "(",
          ")",
          "(",
          "<",
          ">",
          "<",
          "[",
          "]",
          "[",
          "{",
          "}",
          "{",
          "«",
          "»",
          "«",
          "‹",
          "›",
          "‹",
          "⁅",
          "⁆",
          "⁅",
          "⁽",
          "⁾",
          "⁽",
          "₍",
          "₎",
          "₍",
          "≤",
          "≥",
          "≤",
          "〈",
          "〉",
          "〈",
          "﹙",
          "﹚",
          "﹙",
          "﹛",
          "﹜",
          "﹛",
          "﹝",
          "﹞",
          "﹝",
          "﹤",
          "﹥",
          "﹤",
        ],
        _ = new RegExp(
          /^([1-4|9]|1[0-9]|2[0-9]|3[0168]|4[04589]|5[012]|7[78]|159|16[0-9]|17[0-2]|21[569]|22[03489]|250)$/,
        ),
        E = !1,
        G = 0;
      this.__bidiEngine__ = {};
      var nt = function (k) {
          var I = k.charCodeAt(),
            W = I >> 8,
            T = P[W];
          return T !== void 0
            ? v[256 * T + (255 & I)]
            : W === 252 || W === 253
              ? "AL"
              : _.test(W)
                ? "L"
                : W === 8
                  ? "R"
                  : "N";
        },
        st = function (k) {
          for (var I, W = 0; W < k.length; W++) {
            if ((I = nt(k.charAt(W))) === "L") return !1;
            if (I === "R") return !0;
          }
          return !1;
        },
        wt = function (k, I, W, T) {
          var ut,
            at,
            ct,
            Z,
            ft = I[T];
          switch (ft) {
            case "L":
            case "R":
              E = !1;
              break;
            case "N":
            case "AN":
              break;
            case "EN":
              E && (ft = "AN");
              break;
            case "AL":
              (E = !0), (ft = "R");
              break;
            case "WS":
              ft = "N";
              break;
            case "CS":
              T < 1 ||
              T + 1 >= I.length ||
              ((ut = W[T - 1]) !== "EN" && ut !== "AN") ||
              ((at = I[T + 1]) !== "EN" && at !== "AN")
                ? (ft = "N")
                : E && (at = "AN"),
                (ft = at === ut ? at : "N");
              break;
            case "ES":
              ft =
                (ut = T > 0 ? W[T - 1] : "B") === "EN" &&
                T + 1 < I.length &&
                I[T + 1] === "EN"
                  ? "EN"
                  : "N";
              break;
            case "ET":
              if (T > 0 && W[T - 1] === "EN") {
                ft = "EN";
                break;
              }
              if (E) {
                ft = "N";
                break;
              }
              for (ct = T + 1, Z = I.length; ct < Z && I[ct] === "ET"; ) ct++;
              ft = ct < Z && I[ct] === "EN" ? "EN" : "N";
              break;
            case "NSM":
              if (l && !c) {
                for (Z = I.length, ct = T + 1; ct < Z && I[ct] === "NSM"; )
                  ct++;
                if (ct < Z) {
                  var pt = k[T],
                    Ct = (pt >= 1425 && pt <= 2303) || pt === 64286;
                  if (((ut = I[ct]), Ct && (ut === "R" || ut === "AL"))) {
                    ft = "R";
                    break;
                  }
                }
              }
              ft = T < 1 || (ut = I[T - 1]) === "B" ? "N" : W[T - 1];
              break;
            case "B":
              (E = !1), (s = !0), (ft = G);
              break;
            case "S":
              (a = !0), (ft = "N");
              break;
            case "LRE":
            case "RLE":
            case "LRO":
            case "RLO":
            case "PDF":
              E = !1;
              break;
            case "BN":
              ft = "N";
          }
          return ft;
        },
        tt = function (k, I, W) {
          var T = k.split("");
          return (
            W && z(T, W, { hiLevel: G }),
            T.reverse(),
            I && I.reverse(),
            T.join("")
          );
        },
        z = function (k, I, W) {
          var T,
            ut,
            at,
            ct,
            Z,
            ft = -1,
            pt = k.length,
            Ct = 0,
            A = [],
            j = G ? p : N,
            B = [];
          for (E = !1, s = !1, a = !1, ut = 0; ut < pt; ut++) B[ut] = nt(k[ut]);
          for (at = 0; at < pt; at++) {
            if (
              ((Z = Ct),
              (A[at] = wt(k, B, A, at)),
              (T = 240 & (Ct = j[Z][F[A[at]]])),
              (Ct &= 15),
              (I[at] = ct = j[Ct][5]),
              T > 0)
            )
              if (T === 16) {
                for (ut = ft; ut < at; ut++) I[ut] = 1;
                ft = -1;
              } else ft = -1;
            if (j[Ct][6]) ft === -1 && (ft = at);
            else if (ft > -1) {
              for (ut = ft; ut < at; ut++) I[ut] = ct;
              ft = -1;
            }
            B[at] === "B" && (I[at] = 0), (W.hiLevel |= ct);
          }
          a &&
            (function (R, Y, Q) {
              for (var et = 0; et < Q; et++)
                if (R[et] === "S") {
                  Y[et] = G;
                  for (var rt = et - 1; rt >= 0 && R[rt] === "WS"; rt--)
                    Y[rt] = G;
                }
            })(B, I, pt);
        },
        it = function (k, I, W, T, ut) {
          if (!(ut.hiLevel < k)) {
            if (k === 1 && G === 1 && !s)
              return I.reverse(), void (W && W.reverse());
            for (var at, ct, Z, ft, pt = I.length, Ct = 0; Ct < pt; ) {
              if (T[Ct] >= k) {
                for (Z = Ct + 1; Z < pt && T[Z] >= k; ) Z++;
                for (ft = Ct, ct = Z - 1; ft < ct; ft++, ct--)
                  (at = I[ft]),
                    (I[ft] = I[ct]),
                    (I[ct] = at),
                    W && ((at = W[ft]), (W[ft] = W[ct]), (W[ct] = at));
                Ct = Z;
              }
              Ct++;
            }
          }
        },
        dt = function (k, I, W) {
          var T = k.split(""),
            ut = { hiLevel: G };
          return (
            W || (W = []),
            z(T, W, ut),
            (function (at, ct, Z) {
              if (Z.hiLevel !== 0 && m)
                for (var ft, pt = 0; pt < at.length; pt++)
                  ct[pt] === 1 &&
                    (ft = M.indexOf(at[pt])) >= 0 &&
                    (at[pt] = M[ft + 1]);
            })(T, W, ut),
            it(2, T, I, W, ut),
            it(1, T, I, W, ut),
            T.join("")
          );
        };
      return (
        (this.__bidiEngine__.doBidiReorder = function (k, I, W) {
          if (
            ((function (ut, at) {
              if (at) for (var ct = 0; ct < ut.length; ct++) at[ct] = ct;
              c === void 0 && (c = st(ut)), g === void 0 && (g = st(ut));
            })(k, I),
            l || !h || g)
          )
            if (l && h && c ^ g) (G = c ? 1 : 0), (k = tt(k, I, W));
            else if (!l && h && g)
              (G = c ? 1 : 0), (k = dt(k, I, W)), (k = tt(k, I));
            else if (!l || c || h || g) {
              if (l && !h && c ^ g)
                (k = tt(k, I)),
                  c
                    ? ((G = 0), (k = dt(k, I, W)))
                    : ((G = 1), (k = dt(k, I, W)), (k = tt(k, I)));
              else if (l && c && !h && g)
                (G = 1), (k = dt(k, I, W)), (k = tt(k, I));
              else if (!l && !h && c ^ g) {
                var T = m;
                c
                  ? ((G = 1),
                    (k = dt(k, I, W)),
                    (G = 0),
                    (m = !1),
                    (k = dt(k, I, W)),
                    (m = T))
                  : ((G = 0),
                    (k = dt(k, I, W)),
                    (k = tt(k, I)),
                    (G = 1),
                    (m = !1),
                    (k = dt(k, I, W)),
                    (m = T),
                    (k = tt(k, I)));
              }
            } else (G = 0), (k = dt(k, I, W));
          else (G = c ? 1 : 0), (k = dt(k, I, W));
          return k;
        }),
        (this.__bidiEngine__.setOptions = function (k) {
          k &&
            ((l = k.isInputVisual),
            (h = k.isOutputVisual),
            (c = k.isInputRtl),
            (g = k.isOutputRtl),
            (m = k.isSymmetricSwapping));
        }),
        this.__bidiEngine__.setOptions(i),
        this.__bidiEngine__
      );
    };
    var t = [
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "S",
        "B",
        "S",
        "WS",
        "B",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "B",
        "B",
        "B",
        "S",
        "WS",
        "N",
        "N",
        "ET",
        "ET",
        "ET",
        "N",
        "N",
        "N",
        "N",
        "N",
        "ES",
        "CS",
        "ES",
        "CS",
        "CS",
        "EN",
        "EN",
        "EN",
        "EN",
        "EN",
        "EN",
        "EN",
        "EN",
        "EN",
        "EN",
        "CS",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "N",
        "N",
        "N",
        "N",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "B",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "CS",
        "N",
        "ET",
        "ET",
        "ET",
        "ET",
        "N",
        "N",
        "N",
        "N",
        "L",
        "N",
        "N",
        "BN",
        "N",
        "N",
        "ET",
        "ET",
        "EN",
        "EN",
        "N",
        "L",
        "N",
        "N",
        "N",
        "EN",
        "L",
        "N",
        "N",
        "N",
        "N",
        "N",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "N",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "N",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "N",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "N",
        "N",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "N",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "N",
        "L",
        "N",
        "N",
        "N",
        "N",
        "N",
        "ET",
        "N",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "R",
        "NSM",
        "R",
        "NSM",
        "NSM",
        "R",
        "NSM",
        "NSM",
        "R",
        "NSM",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "N",
        "N",
        "N",
        "N",
        "N",
        "R",
        "R",
        "R",
        "R",
        "R",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "AN",
        "AN",
        "AN",
        "AN",
        "AN",
        "AN",
        "N",
        "N",
        "AL",
        "ET",
        "ET",
        "AL",
        "CS",
        "AL",
        "N",
        "N",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "AL",
        "AL",
        "N",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "AN",
        "AN",
        "AN",
        "AN",
        "AN",
        "AN",
        "AN",
        "AN",
        "AN",
        "AN",
        "ET",
        "AN",
        "AN",
        "AL",
        "AL",
        "AL",
        "NSM",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "AN",
        "N",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "AL",
        "AL",
        "NSM",
        "NSM",
        "N",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "AL",
        "AL",
        "EN",
        "EN",
        "EN",
        "EN",
        "EN",
        "EN",
        "EN",
        "EN",
        "EN",
        "EN",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "N",
        "AL",
        "AL",
        "NSM",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "N",
        "N",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "AL",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "R",
        "R",
        "N",
        "N",
        "N",
        "N",
        "R",
        "N",
        "N",
        "N",
        "N",
        "N",
        "WS",
        "WS",
        "WS",
        "WS",
        "WS",
        "WS",
        "WS",
        "WS",
        "WS",
        "WS",
        "WS",
        "BN",
        "BN",
        "BN",
        "L",
        "R",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "WS",
        "B",
        "LRE",
        "RLE",
        "PDF",
        "LRO",
        "RLO",
        "CS",
        "ET",
        "ET",
        "ET",
        "ET",
        "ET",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "CS",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "WS",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "N",
        "LRI",
        "RLI",
        "FSI",
        "PDI",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "BN",
        "EN",
        "L",
        "N",
        "N",
        "EN",
        "EN",
        "EN",
        "EN",
        "EN",
        "EN",
        "ES",
        "ES",
        "N",
        "N",
        "N",
        "L",
        "EN",
        "EN",
        "EN",
        "EN",
        "EN",
        "EN",
        "EN",
        "EN",
        "EN",
        "EN",
        "ES",
        "ES",
        "N",
        "N",
        "N",
        "N",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "N",
        "N",
        "N",
        "ET",
        "ET",
        "ET",
        "ET",
        "ET",
        "ET",
        "ET",
        "ET",
        "ET",
        "ET",
        "ET",
        "ET",
        "ET",
        "ET",
        "ET",
        "ET",
        "ET",
        "ET",
        "ET",
        "ET",
        "ET",
        "ET",
        "ET",
        "ET",
        "ET",
        "ET",
        "ET",
        "ET",
        "ET",
        "ET",
        "ET",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "L",
        "L",
        "L",
        "L",
        "L",
        "N",
        "N",
        "N",
        "N",
        "N",
        "R",
        "NSM",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "ES",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "N",
        "R",
        "R",
        "R",
        "R",
        "R",
        "N",
        "R",
        "N",
        "R",
        "R",
        "N",
        "R",
        "R",
        "N",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "R",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "NSM",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "CS",
        "N",
        "CS",
        "N",
        "N",
        "CS",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "ET",
        "N",
        "N",
        "ES",
        "ES",
        "N",
        "N",
        "N",
        "N",
        "N",
        "ET",
        "ET",
        "N",
        "N",
        "N",
        "N",
        "N",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "N",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "AL",
        "N",
        "N",
        "BN",
        "N",
        "N",
        "N",
        "ET",
        "ET",
        "ET",
        "N",
        "N",
        "N",
        "N",
        "N",
        "ES",
        "CS",
        "ES",
        "CS",
        "CS",
        "EN",
        "EN",
        "EN",
        "EN",
        "EN",
        "EN",
        "EN",
        "EN",
        "EN",
        "EN",
        "CS",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "N",
        "N",
        "N",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "N",
        "N",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "N",
        "N",
        "L",
        "L",
        "L",
        "L",
        "L",
        "L",
        "N",
        "N",
        "L",
        "L",
        "L",
        "N",
        "N",
        "N",
        "ET",
        "ET",
        "N",
        "N",
        "N",
        "ET",
        "ET",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
      ],
      e = new n.__bidiEngine__({ isInputVisual: !0 });
    n.API.events.push([
      "postProcessText",
      function (i) {
        var s = i.text,
          a = (i.x, i.y, i.options || {}),
          l = (i.mutex, a.lang, []);
        if (
          ((a.isInputVisual =
            typeof a.isInputVisual != "boolean" || a.isInputVisual),
          e.setOptions(a),
          Object.prototype.toString.call(s) === "[object Array]")
        ) {
          var c = 0;
          for (l = [], c = 0; c < s.length; c += 1)
            Object.prototype.toString.call(s[c]) === "[object Array]"
              ? l.push([e.doBidiReorder(s[c][0]), s[c][1], s[c][2]])
              : l.push([e.doBidiReorder(s[c])]);
          i.text = l;
        } else i.text = e.doBidiReorder(s);
        e.setOptions({ isInputVisual: !0 });
      },
    ]);
  })(zt),
  (zt.API.TTFFont = (function () {
    function n(t) {
      var e;
      if (
        ((this.rawData = t),
        (e = this.contents = new Rr(t)),
        (this.contents.pos = 4),
        e.readString(4) === "ttcf")
      )
        throw new Error("TTCF not supported.");
      (e.pos = 0),
        this.parse(),
        (this.subset = new bh(this)),
        this.registerTTF();
    }
    return (
      (n.open = function (t) {
        return new n(t);
      }),
      (n.prototype.parse = function () {
        return (
          (this.directory = new ih(this.contents)),
          (this.head = new oh(this)),
          (this.name = new fh(this)),
          (this.cmap = new Vl(this)),
          (this.toUnicode = {}),
          (this.hhea = new sh(this)),
          (this.maxp = new hh(this)),
          (this.hmtx = new dh(this)),
          (this.post = new lh(this)),
          (this.os2 = new uh(this)),
          (this.loca = new vh(this)),
          (this.glyf = new ph(this)),
          (this.ascender =
            (this.os2.exists && this.os2.ascender) || this.hhea.ascender),
          (this.decender =
            (this.os2.exists && this.os2.decender) || this.hhea.decender),
          (this.lineGap =
            (this.os2.exists && this.os2.lineGap) || this.hhea.lineGap),
          (this.bbox = [
            this.head.xMin,
            this.head.yMin,
            this.head.xMax,
            this.head.yMax,
          ])
        );
      }),
      (n.prototype.registerTTF = function () {
        var t, e, i, s, a;
        if (
          ((this.scaleFactor = 1e3 / this.head.unitsPerEm),
          (this.bbox = function () {
            var l, c, h, g;
            for (g = [], l = 0, c = (h = this.bbox).length; l < c; l++)
              (t = h[l]), g.push(Math.round(t * this.scaleFactor));
            return g;
          }.call(this)),
          (this.stemV = 0),
          this.post.exists
            ? ((i = 255 & (s = this.post.italic_angle)),
              32768 & (e = s >> 16) && (e = -(1 + (65535 ^ e))),
              (this.italicAngle = +(e + "." + i)))
            : (this.italicAngle = 0),
          (this.ascender = Math.round(this.ascender * this.scaleFactor)),
          (this.decender = Math.round(this.decender * this.scaleFactor)),
          (this.lineGap = Math.round(this.lineGap * this.scaleFactor)),
          (this.capHeight =
            (this.os2.exists && this.os2.capHeight) || this.ascender),
          (this.xHeight = (this.os2.exists && this.os2.xHeight) || 0),
          (this.familyClass =
            ((this.os2.exists && this.os2.familyClass) || 0) >> 8),
          (this.isSerif =
            (a = this.familyClass) === 1 ||
            a === 2 ||
            a === 3 ||
            a === 4 ||
            a === 5 ||
            a === 7),
          (this.isScript = this.familyClass === 10),
          (this.flags = 0),
          this.post.isFixedPitch && (this.flags |= 1),
          this.isSerif && (this.flags |= 2),
          this.isScript && (this.flags |= 8),
          this.italicAngle !== 0 && (this.flags |= 64),
          (this.flags |= 32),
          !this.cmap.unicode)
        )
          throw new Error("No unicode cmap for font");
      }),
      (n.prototype.characterToGlyph = function (t) {
        var e;
        return ((e = this.cmap.unicode) != null ? e.codeMap[t] : void 0) || 0;
      }),
      (n.prototype.widthOfGlyph = function (t) {
        var e;
        return (
          (e = 1e3 / this.head.unitsPerEm), this.hmtx.forGlyph(t).advance * e
        );
      }),
      (n.prototype.widthOfString = function (t, e, i) {
        var s, a, l, c;
        for (
          l = 0, a = 0, c = (t = "" + t).length;
          0 <= c ? a < c : a > c;
          a = 0 <= c ? ++a : --a
        )
          (s = t.charCodeAt(a)),
            (l +=
              this.widthOfGlyph(this.characterToGlyph(s)) + i * (1e3 / e) || 0);
        return l * (e / 1e3);
      }),
      (n.prototype.lineHeight = function (t, e) {
        var i;
        return (
          e == null && (e = !1),
          (i = e ? this.lineGap : 0),
          ((this.ascender + i - this.decender) / 1e3) * t
        );
      }),
      n
    );
  })());
var Yn,
  Rr = (function () {
    function n(t) {
      (this.data = t ?? []), (this.pos = 0), (this.length = this.data.length);
    }
    return (
      (n.prototype.readByte = function () {
        return this.data[this.pos++];
      }),
      (n.prototype.writeByte = function (t) {
        return (this.data[this.pos++] = t);
      }),
      (n.prototype.readUInt32 = function () {
        return (
          16777216 * this.readByte() +
          (this.readByte() << 16) +
          (this.readByte() << 8) +
          this.readByte()
        );
      }),
      (n.prototype.writeUInt32 = function (t) {
        return (
          this.writeByte((t >>> 24) & 255),
          this.writeByte((t >> 16) & 255),
          this.writeByte((t >> 8) & 255),
          this.writeByte(255 & t)
        );
      }),
      (n.prototype.readInt32 = function () {
        var t;
        return (t = this.readUInt32()) >= 2147483648 ? t - 4294967296 : t;
      }),
      (n.prototype.writeInt32 = function (t) {
        return t < 0 && (t += 4294967296), this.writeUInt32(t);
      }),
      (n.prototype.readUInt16 = function () {
        return (this.readByte() << 8) | this.readByte();
      }),
      (n.prototype.writeUInt16 = function (t) {
        return this.writeByte((t >> 8) & 255), this.writeByte(255 & t);
      }),
      (n.prototype.readInt16 = function () {
        var t;
        return (t = this.readUInt16()) >= 32768 ? t - 65536 : t;
      }),
      (n.prototype.writeInt16 = function (t) {
        return t < 0 && (t += 65536), this.writeUInt16(t);
      }),
      (n.prototype.readString = function (t) {
        var e, i;
        for (i = [], e = 0; 0 <= t ? e < t : e > t; e = 0 <= t ? ++e : --e)
          i[e] = String.fromCharCode(this.readByte());
        return i.join("");
      }),
      (n.prototype.writeString = function (t) {
        var e, i, s;
        for (
          s = [], e = 0, i = t.length;
          0 <= i ? e < i : e > i;
          e = 0 <= i ? ++e : --e
        )
          s.push(this.writeByte(t.charCodeAt(e)));
        return s;
      }),
      (n.prototype.readShort = function () {
        return this.readInt16();
      }),
      (n.prototype.writeShort = function (t) {
        return this.writeInt16(t);
      }),
      (n.prototype.readLongLong = function () {
        var t, e, i, s, a, l, c, h;
        return (
          (t = this.readByte()),
          (e = this.readByte()),
          (i = this.readByte()),
          (s = this.readByte()),
          (a = this.readByte()),
          (l = this.readByte()),
          (c = this.readByte()),
          (h = this.readByte()),
          128 & t
            ? -1 *
              (72057594037927940 * (255 ^ t) +
                281474976710656 * (255 ^ e) +
                1099511627776 * (255 ^ i) +
                4294967296 * (255 ^ s) +
                16777216 * (255 ^ a) +
                65536 * (255 ^ l) +
                256 * (255 ^ c) +
                (255 ^ h) +
                1)
            : 72057594037927940 * t +
              281474976710656 * e +
              1099511627776 * i +
              4294967296 * s +
              16777216 * a +
              65536 * l +
              256 * c +
              h
        );
      }),
      (n.prototype.writeLongLong = function (t) {
        var e, i;
        return (
          (e = Math.floor(t / 4294967296)),
          (i = 4294967295 & t),
          this.writeByte((e >> 24) & 255),
          this.writeByte((e >> 16) & 255),
          this.writeByte((e >> 8) & 255),
          this.writeByte(255 & e),
          this.writeByte((i >> 24) & 255),
          this.writeByte((i >> 16) & 255),
          this.writeByte((i >> 8) & 255),
          this.writeByte(255 & i)
        );
      }),
      (n.prototype.readInt = function () {
        return this.readInt32();
      }),
      (n.prototype.writeInt = function (t) {
        return this.writeInt32(t);
      }),
      (n.prototype.read = function (t) {
        var e, i;
        for (e = [], i = 0; 0 <= t ? i < t : i > t; i = 0 <= t ? ++i : --i)
          e.push(this.readByte());
        return e;
      }),
      (n.prototype.write = function (t) {
        var e, i, s, a;
        for (a = [], i = 0, s = t.length; i < s; i++)
          (e = t[i]), a.push(this.writeByte(e));
        return a;
      }),
      n
    );
  })(),
  ih = (function () {
    var n;
    function t(e) {
      var i, s, a;
      for (
        this.scalarType = e.readInt(),
          this.tableCount = e.readShort(),
          this.searchRange = e.readShort(),
          this.entrySelector = e.readShort(),
          this.rangeShift = e.readShort(),
          this.tables = {},
          s = 0,
          a = this.tableCount;
        0 <= a ? s < a : s > a;
        s = 0 <= a ? ++s : --s
      )
        (i = {
          tag: e.readString(4),
          checksum: e.readInt(),
          offset: e.readInt(),
          length: e.readInt(),
        }),
          (this.tables[i.tag] = i);
    }
    return (
      (t.prototype.encode = function (e) {
        var i, s, a, l, c, h, g, m, v, N, p, F, P;
        for (P in ((p = Object.keys(e).length),
        (h = Math.log(2)),
        (v = 16 * Math.floor(Math.log(p) / h)),
        (l = Math.floor(v / h)),
        (m = 16 * p - v),
        (s = new Rr()).writeInt(this.scalarType),
        s.writeShort(p),
        s.writeShort(v),
        s.writeShort(l),
        s.writeShort(m),
        (a = 16 * p),
        (g = s.pos + a),
        (c = null),
        (F = []),
        e))
          for (
            N = e[P],
              s.writeString(P),
              s.writeInt(n(N)),
              s.writeInt(g),
              s.writeInt(N.length),
              F = F.concat(N),
              P === "head" && (c = g),
              g += N.length;
            g % 4;

          )
            F.push(0), g++;
        return (
          s.write(F),
          (i = 2981146554 - n(s.data)),
          (s.pos = c + 8),
          s.writeUInt32(i),
          s.data
        );
      }),
      (n = function (e) {
        var i, s, a, l;
        for (e = Gl.call(e); e.length % 4; ) e.push(0);
        for (a = new Rr(e), s = 0, i = 0, l = e.length; i < l; i = i += 4)
          s += a.readUInt32();
        return 4294967295 & s;
      }),
      t
    );
  })(),
  ah = {}.hasOwnProperty,
  ur = function (n, t) {
    for (var e in t) ah.call(t, e) && (n[e] = t[e]);
    function i() {
      this.constructor = n;
    }
    return (
      (i.prototype = t.prototype),
      (n.prototype = new i()),
      (n.__super__ = t.prototype),
      n
    );
  };
Yn = (function () {
  function n(t) {
    var e;
    (this.file = t),
      (e = this.file.directory.tables[this.tag]),
      (this.exists = !!e),
      e &&
        ((this.offset = e.offset),
        (this.length = e.length),
        this.parse(this.file.contents));
  }
  return (
    (n.prototype.parse = function () {}),
    (n.prototype.encode = function () {}),
    (n.prototype.raw = function () {
      return this.exists
        ? ((this.file.contents.pos = this.offset),
          this.file.contents.read(this.length))
        : null;
    }),
    n
  );
})();
var oh = (function (n) {
    function t() {
      return t.__super__.constructor.apply(this, arguments);
    }
    return (
      ur(t, Yn),
      (t.prototype.tag = "head"),
      (t.prototype.parse = function (e) {
        return (
          (e.pos = this.offset),
          (this.version = e.readInt()),
          (this.revision = e.readInt()),
          (this.checkSumAdjustment = e.readInt()),
          (this.magicNumber = e.readInt()),
          (this.flags = e.readShort()),
          (this.unitsPerEm = e.readShort()),
          (this.created = e.readLongLong()),
          (this.modified = e.readLongLong()),
          (this.xMin = e.readShort()),
          (this.yMin = e.readShort()),
          (this.xMax = e.readShort()),
          (this.yMax = e.readShort()),
          (this.macStyle = e.readShort()),
          (this.lowestRecPPEM = e.readShort()),
          (this.fontDirectionHint = e.readShort()),
          (this.indexToLocFormat = e.readShort()),
          (this.glyphDataFormat = e.readShort())
        );
      }),
      (t.prototype.encode = function (e) {
        var i;
        return (
          (i = new Rr()).writeInt(this.version),
          i.writeInt(this.revision),
          i.writeInt(this.checkSumAdjustment),
          i.writeInt(this.magicNumber),
          i.writeShort(this.flags),
          i.writeShort(this.unitsPerEm),
          i.writeLongLong(this.created),
          i.writeLongLong(this.modified),
          i.writeShort(this.xMin),
          i.writeShort(this.yMin),
          i.writeShort(this.xMax),
          i.writeShort(this.yMax),
          i.writeShort(this.macStyle),
          i.writeShort(this.lowestRecPPEM),
          i.writeShort(this.fontDirectionHint),
          i.writeShort(e),
          i.writeShort(this.glyphDataFormat),
          i.data
        );
      }),
      t
    );
  })(),
  pl = (function () {
    function n(t, e) {
      var i, s, a, l, c, h, g, m, v, N, p, F, P, M, _, E, G;
      switch (
        ((this.platformID = t.readUInt16()),
        (this.encodingID = t.readShort()),
        (this.offset = e + t.readInt()),
        (v = t.pos),
        (t.pos = this.offset),
        (this.format = t.readUInt16()),
        (this.length = t.readUInt16()),
        (this.language = t.readUInt16()),
        (this.isUnicode =
          (this.platformID === 3 &&
            this.encodingID === 1 &&
            this.format === 4) ||
          (this.platformID === 0 && this.format === 4)),
        (this.codeMap = {}),
        this.format)
      ) {
        case 0:
          for (h = 0; h < 256; ++h) this.codeMap[h] = t.readByte();
          break;
        case 4:
          for (
            p = t.readUInt16(),
              N = p / 2,
              t.pos += 6,
              a = (function () {
                var nt, st;
                for (
                  st = [], h = nt = 0;
                  0 <= N ? nt < N : nt > N;
                  h = 0 <= N ? ++nt : --nt
                )
                  st.push(t.readUInt16());
                return st;
              })(),
              t.pos += 2,
              P = (function () {
                var nt, st;
                for (
                  st = [], h = nt = 0;
                  0 <= N ? nt < N : nt > N;
                  h = 0 <= N ? ++nt : --nt
                )
                  st.push(t.readUInt16());
                return st;
              })(),
              g = (function () {
                var nt, st;
                for (
                  st = [], h = nt = 0;
                  0 <= N ? nt < N : nt > N;
                  h = 0 <= N ? ++nt : --nt
                )
                  st.push(t.readUInt16());
                return st;
              })(),
              m = (function () {
                var nt, st;
                for (
                  st = [], h = nt = 0;
                  0 <= N ? nt < N : nt > N;
                  h = 0 <= N ? ++nt : --nt
                )
                  st.push(t.readUInt16());
                return st;
              })(),
              s = (this.length - t.pos + this.offset) / 2,
              c = (function () {
                var nt, st;
                for (
                  st = [], h = nt = 0;
                  0 <= s ? nt < s : nt > s;
                  h = 0 <= s ? ++nt : --nt
                )
                  st.push(t.readUInt16());
                return st;
              })(),
              h = _ = 0,
              G = a.length;
            _ < G;
            h = ++_
          )
            for (
              M = a[h], i = E = F = P[h];
              F <= M ? E <= M : E >= M;
              i = F <= M ? ++E : --E
            )
              m[h] === 0
                ? (l = i + g[h])
                : (l = c[m[h] / 2 + (i - F) - (N - h)] || 0) !== 0 &&
                  (l += g[h]),
                (this.codeMap[i] = 65535 & l);
      }
      t.pos = v;
    }
    return (
      (n.encode = function (t, e) {
        var i,
          s,
          a,
          l,
          c,
          h,
          g,
          m,
          v,
          N,
          p,
          F,
          P,
          M,
          _,
          E,
          G,
          nt,
          st,
          wt,
          tt,
          z,
          it,
          dt,
          k,
          I,
          W,
          T,
          ut,
          at,
          ct,
          Z,
          ft,
          pt,
          Ct,
          A,
          j,
          B,
          R,
          Y,
          Q,
          et,
          rt,
          Nt,
          At,
          It;
        switch (
          ((T = new Rr()),
          (l = Object.keys(t).sort(function (_t, Ut) {
            return _t - Ut;
          })),
          e)
        ) {
          case "macroman":
            for (
              P = 0,
                M = (function () {
                  var _t = [];
                  for (F = 0; F < 256; ++F) _t.push(0);
                  return _t;
                })(),
                E = { 0: 0 },
                a = {},
                ut = 0,
                ft = l.length;
              ut < ft;
              ut++
            )
              E[(rt = t[(s = l[ut])])] == null && (E[rt] = ++P),
                (a[s] = { old: t[s], new: E[t[s]] }),
                (M[s] = E[t[s]]);
            return (
              T.writeUInt16(1),
              T.writeUInt16(0),
              T.writeUInt32(12),
              T.writeUInt16(0),
              T.writeUInt16(262),
              T.writeUInt16(0),
              T.write(M),
              { charMap: a, subtable: T.data, maxGlyphID: P + 1 }
            );
          case "unicode":
            for (
              I = [],
                v = [],
                G = 0,
                E = {},
                i = {},
                _ = g = null,
                at = 0,
                pt = l.length;
              at < pt;
              at++
            )
              E[(st = t[(s = l[at])])] == null && (E[st] = ++G),
                (i[s] = { old: st, new: E[st] }),
                (c = E[st] - s),
                (_ != null && c === g) || (_ && v.push(_), I.push(s), (g = c)),
                (_ = s);
            for (
              _ && v.push(_),
                v.push(65535),
                I.push(65535),
                dt = 2 * (it = I.length),
                z = 2 * Math.pow(Math.log(it) / Math.LN2, 2),
                N = Math.log(z / 2) / Math.LN2,
                tt = 2 * it - z,
                h = [],
                wt = [],
                p = [],
                F = ct = 0,
                Ct = I.length;
              ct < Ct;
              F = ++ct
            ) {
              if (((k = I[F]), (m = v[F]), k === 65535)) {
                h.push(0), wt.push(0);
                break;
              }
              if (k - (W = i[k].new) >= 32768)
                for (
                  h.push(0), wt.push(2 * (p.length + it - F)), s = Z = k;
                  k <= m ? Z <= m : Z >= m;
                  s = k <= m ? ++Z : --Z
                )
                  p.push(i[s].new);
              else h.push(W - k), wt.push(0);
            }
            for (
              T.writeUInt16(3),
                T.writeUInt16(1),
                T.writeUInt32(12),
                T.writeUInt16(4),
                T.writeUInt16(16 + 8 * it + 2 * p.length),
                T.writeUInt16(0),
                T.writeUInt16(dt),
                T.writeUInt16(z),
                T.writeUInt16(N),
                T.writeUInt16(tt),
                Q = 0,
                A = v.length;
              Q < A;
              Q++
            )
              (s = v[Q]), T.writeUInt16(s);
            for (T.writeUInt16(0), et = 0, j = I.length; et < j; et++)
              (s = I[et]), T.writeUInt16(s);
            for (Nt = 0, B = h.length; Nt < B; Nt++)
              (c = h[Nt]), T.writeUInt16(c);
            for (At = 0, R = wt.length; At < R; At++)
              (nt = wt[At]), T.writeUInt16(nt);
            for (It = 0, Y = p.length; It < Y; It++)
              (P = p[It]), T.writeUInt16(P);
            return { charMap: i, subtable: T.data, maxGlyphID: G + 1 };
        }
      }),
      n
    );
  })(),
  Vl = (function (n) {
    function t() {
      return t.__super__.constructor.apply(this, arguments);
    }
    return (
      ur(t, Yn),
      (t.prototype.tag = "cmap"),
      (t.prototype.parse = function (e) {
        var i, s, a;
        for (
          e.pos = this.offset,
            this.version = e.readUInt16(),
            a = e.readUInt16(),
            this.tables = [],
            this.unicode = null,
            s = 0;
          0 <= a ? s < a : s > a;
          s = 0 <= a ? ++s : --s
        )
          (i = new pl(e, this.offset)),
            this.tables.push(i),
            i.isUnicode && this.unicode == null && (this.unicode = i);
        return !0;
      }),
      (t.encode = function (e, i) {
        var s, a;
        return (
          i == null && (i = "macroman"),
          (s = pl.encode(e, i)),
          (a = new Rr()).writeUInt16(0),
          a.writeUInt16(1),
          (s.table = a.data.concat(s.subtable)),
          s
        );
      }),
      t
    );
  })(),
  sh = (function (n) {
    function t() {
      return t.__super__.constructor.apply(this, arguments);
    }
    return (
      ur(t, Yn),
      (t.prototype.tag = "hhea"),
      (t.prototype.parse = function (e) {
        return (
          (e.pos = this.offset),
          (this.version = e.readInt()),
          (this.ascender = e.readShort()),
          (this.decender = e.readShort()),
          (this.lineGap = e.readShort()),
          (this.advanceWidthMax = e.readShort()),
          (this.minLeftSideBearing = e.readShort()),
          (this.minRightSideBearing = e.readShort()),
          (this.xMaxExtent = e.readShort()),
          (this.caretSlopeRise = e.readShort()),
          (this.caretSlopeRun = e.readShort()),
          (this.caretOffset = e.readShort()),
          (e.pos += 8),
          (this.metricDataFormat = e.readShort()),
          (this.numberOfMetrics = e.readUInt16())
        );
      }),
      t
    );
  })(),
  uh = (function (n) {
    function t() {
      return t.__super__.constructor.apply(this, arguments);
    }
    return (
      ur(t, Yn),
      (t.prototype.tag = "OS/2"),
      (t.prototype.parse = function (e) {
        if (
          ((e.pos = this.offset),
          (this.version = e.readUInt16()),
          (this.averageCharWidth = e.readShort()),
          (this.weightClass = e.readUInt16()),
          (this.widthClass = e.readUInt16()),
          (this.type = e.readShort()),
          (this.ySubscriptXSize = e.readShort()),
          (this.ySubscriptYSize = e.readShort()),
          (this.ySubscriptXOffset = e.readShort()),
          (this.ySubscriptYOffset = e.readShort()),
          (this.ySuperscriptXSize = e.readShort()),
          (this.ySuperscriptYSize = e.readShort()),
          (this.ySuperscriptXOffset = e.readShort()),
          (this.ySuperscriptYOffset = e.readShort()),
          (this.yStrikeoutSize = e.readShort()),
          (this.yStrikeoutPosition = e.readShort()),
          (this.familyClass = e.readShort()),
          (this.panose = (function () {
            var i, s;
            for (s = [], i = 0; i < 10; ++i) s.push(e.readByte());
            return s;
          })()),
          (this.charRange = (function () {
            var i, s;
            for (s = [], i = 0; i < 4; ++i) s.push(e.readInt());
            return s;
          })()),
          (this.vendorID = e.readString(4)),
          (this.selection = e.readShort()),
          (this.firstCharIndex = e.readShort()),
          (this.lastCharIndex = e.readShort()),
          this.version > 0 &&
            ((this.ascent = e.readShort()),
            (this.descent = e.readShort()),
            (this.lineGap = e.readShort()),
            (this.winAscent = e.readShort()),
            (this.winDescent = e.readShort()),
            (this.codePageRange = (function () {
              var i, s;
              for (s = [], i = 0; i < 2; i = ++i) s.push(e.readInt());
              return s;
            })()),
            this.version > 1))
        )
          return (
            (this.xHeight = e.readShort()),
            (this.capHeight = e.readShort()),
            (this.defaultChar = e.readShort()),
            (this.breakChar = e.readShort()),
            (this.maxContext = e.readShort())
          );
      }),
      t
    );
  })(),
  lh = (function (n) {
    function t() {
      return t.__super__.constructor.apply(this, arguments);
    }
    return (
      ur(t, Yn),
      (t.prototype.tag = "post"),
      (t.prototype.parse = function (e) {
        var i, s, a;
        switch (
          ((e.pos = this.offset),
          (this.format = e.readInt()),
          (this.italicAngle = e.readInt()),
          (this.underlinePosition = e.readShort()),
          (this.underlineThickness = e.readShort()),
          (this.isFixedPitch = e.readInt()),
          (this.minMemType42 = e.readInt()),
          (this.maxMemType42 = e.readInt()),
          (this.minMemType1 = e.readInt()),
          (this.maxMemType1 = e.readInt()),
          this.format)
        ) {
          case 65536:
            break;
          case 131072:
            var l;
            for (
              s = e.readUInt16(), this.glyphNameIndex = [], l = 0;
              0 <= s ? l < s : l > s;
              l = 0 <= s ? ++l : --l
            )
              this.glyphNameIndex.push(e.readUInt16());
            for (this.names = [], a = []; e.pos < this.offset + this.length; )
              (i = e.readByte()), a.push(this.names.push(e.readString(i)));
            return a;
          case 151552:
            return (s = e.readUInt16()), (this.offsets = e.read(s));
          case 196608:
            break;
          case 262144:
            return (this.map = function () {
              var c, h, g;
              for (
                g = [], l = c = 0, h = this.file.maxp.numGlyphs;
                0 <= h ? c < h : c > h;
                l = 0 <= h ? ++c : --c
              )
                g.push(e.readUInt32());
              return g;
            }.call(this));
        }
      }),
      t
    );
  })(),
  ch = function (n, t) {
    (this.raw = n),
      (this.length = n.length),
      (this.platformID = t.platformID),
      (this.encodingID = t.encodingID),
      (this.languageID = t.languageID);
  },
  fh = (function (n) {
    function t() {
      return t.__super__.constructor.apply(this, arguments);
    }
    return (
      ur(t, Yn),
      (t.prototype.tag = "name"),
      (t.prototype.parse = function (e) {
        var i, s, a, l, c, h, g, m, v, N, p;
        for (
          e.pos = this.offset,
            e.readShort(),
            i = e.readShort(),
            h = e.readShort(),
            s = [],
            l = 0;
          0 <= i ? l < i : l > i;
          l = 0 <= i ? ++l : --l
        )
          s.push({
            platformID: e.readShort(),
            encodingID: e.readShort(),
            languageID: e.readShort(),
            nameID: e.readShort(),
            length: e.readShort(),
            offset: this.offset + h + e.readShort(),
          });
        for (g = {}, l = v = 0, N = s.length; v < N; l = ++v)
          (a = s[l]),
            (e.pos = a.offset),
            (m = e.readString(a.length)),
            (c = new ch(m, a)),
            g[(p = a.nameID)] == null && (g[p] = []),
            g[a.nameID].push(c);
        (this.strings = g),
          (this.copyright = g[0]),
          (this.fontFamily = g[1]),
          (this.fontSubfamily = g[2]),
          (this.uniqueSubfamily = g[3]),
          (this.fontName = g[4]),
          (this.version = g[5]);
        try {
          this.postscriptName = g[6][0].raw.replace(
            /[\x00-\x19\x80-\xff]/g,
            "",
          );
        } catch {
          this.postscriptName = g[4][0].raw.replace(
            /[\x00-\x19\x80-\xff]/g,
            "",
          );
        }
        return (
          (this.trademark = g[7]),
          (this.manufacturer = g[8]),
          (this.designer = g[9]),
          (this.description = g[10]),
          (this.vendorUrl = g[11]),
          (this.designerUrl = g[12]),
          (this.license = g[13]),
          (this.licenseUrl = g[14]),
          (this.preferredFamily = g[15]),
          (this.preferredSubfamily = g[17]),
          (this.compatibleFull = g[18]),
          (this.sampleText = g[19])
        );
      }),
      t
    );
  })(),
  hh = (function (n) {
    function t() {
      return t.__super__.constructor.apply(this, arguments);
    }
    return (
      ur(t, Yn),
      (t.prototype.tag = "maxp"),
      (t.prototype.parse = function (e) {
        return (
          (e.pos = this.offset),
          (this.version = e.readInt()),
          (this.numGlyphs = e.readUInt16()),
          (this.maxPoints = e.readUInt16()),
          (this.maxContours = e.readUInt16()),
          (this.maxCompositePoints = e.readUInt16()),
          (this.maxComponentContours = e.readUInt16()),
          (this.maxZones = e.readUInt16()),
          (this.maxTwilightPoints = e.readUInt16()),
          (this.maxStorage = e.readUInt16()),
          (this.maxFunctionDefs = e.readUInt16()),
          (this.maxInstructionDefs = e.readUInt16()),
          (this.maxStackElements = e.readUInt16()),
          (this.maxSizeOfInstructions = e.readUInt16()),
          (this.maxComponentElements = e.readUInt16()),
          (this.maxComponentDepth = e.readUInt16())
        );
      }),
      t
    );
  })(),
  dh = (function (n) {
    function t() {
      return t.__super__.constructor.apply(this, arguments);
    }
    return (
      ur(t, Yn),
      (t.prototype.tag = "hmtx"),
      (t.prototype.parse = function (e) {
        var i, s, a, l, c, h, g;
        for (
          e.pos = this.offset,
            this.metrics = [],
            i = 0,
            h = this.file.hhea.numberOfMetrics;
          0 <= h ? i < h : i > h;
          i = 0 <= h ? ++i : --i
        )
          this.metrics.push({ advance: e.readUInt16(), lsb: e.readInt16() });
        for (
          a = this.file.maxp.numGlyphs - this.file.hhea.numberOfMetrics,
            this.leftSideBearings = (function () {
              var m, v;
              for (
                v = [], i = m = 0;
                0 <= a ? m < a : m > a;
                i = 0 <= a ? ++m : --m
              )
                v.push(e.readInt16());
              return v;
            })(),
            this.widths = function () {
              var m, v, N, p;
              for (p = [], m = 0, v = (N = this.metrics).length; m < v; m++)
                (l = N[m]), p.push(l.advance);
              return p;
            }.call(this),
            s = this.widths[this.widths.length - 1],
            g = [],
            i = c = 0;
          0 <= a ? c < a : c > a;
          i = 0 <= a ? ++c : --c
        )
          g.push(this.widths.push(s));
        return g;
      }),
      (t.prototype.forGlyph = function (e) {
        return e in this.metrics
          ? this.metrics[e]
          : {
              advance: this.metrics[this.metrics.length - 1].advance,
              lsb: this.leftSideBearings[e - this.metrics.length],
            };
      }),
      t
    );
  })(),
  Gl = [].slice,
  ph = (function (n) {
    function t() {
      return t.__super__.constructor.apply(this, arguments);
    }
    return (
      ur(t, Yn),
      (t.prototype.tag = "glyf"),
      (t.prototype.parse = function () {
        return (this.cache = {});
      }),
      (t.prototype.glyphFor = function (e) {
        var i, s, a, l, c, h, g, m, v, N;
        return e in this.cache
          ? this.cache[e]
          : ((l = this.file.loca),
            (i = this.file.contents),
            (s = l.indexOf(e)),
            (a = l.lengthOf(e)) === 0
              ? (this.cache[e] = null)
              : ((i.pos = this.offset + s),
                (c = (h = new Rr(i.read(a))).readShort()),
                (m = h.readShort()),
                (N = h.readShort()),
                (g = h.readShort()),
                (v = h.readShort()),
                (this.cache[e] =
                  c === -1 ? new mh(h, m, N, g, v) : new gh(h, c, m, N, g, v)),
                this.cache[e]));
      }),
      (t.prototype.encode = function (e, i, s) {
        var a, l, c, h, g;
        for (c = [], l = [], h = 0, g = i.length; h < g; h++)
          (a = e[i[h]]), l.push(c.length), a && (c = c.concat(a.encode(s)));
        return l.push(c.length), { table: c, offsets: l };
      }),
      t
    );
  })(),
  gh = (function () {
    function n(t, e, i, s, a, l) {
      (this.raw = t),
        (this.numberOfContours = e),
        (this.xMin = i),
        (this.yMin = s),
        (this.xMax = a),
        (this.yMax = l),
        (this.compound = !1);
    }
    return (
      (n.prototype.encode = function () {
        return this.raw.data;
      }),
      n
    );
  })(),
  mh = (function () {
    function n(t, e, i, s, a) {
      var l, c;
      for (
        this.raw = t,
          this.xMin = e,
          this.yMin = i,
          this.xMax = s,
          this.yMax = a,
          this.compound = !0,
          this.glyphIDs = [],
          this.glyphOffsets = [],
          l = this.raw;
        (c = l.readShort()),
          this.glyphOffsets.push(l.pos),
          this.glyphIDs.push(l.readUInt16()),
          32 & c;

      )
        (l.pos += 1 & c ? 4 : 2),
          128 & c
            ? (l.pos += 8)
            : 64 & c
              ? (l.pos += 4)
              : 8 & c && (l.pos += 2);
    }
    return (
      (n.prototype.encode = function () {
        var t, e, i;
        for (
          e = new Rr(Gl.call(this.raw.data)), t = 0, i = this.glyphIDs.length;
          t < i;
          ++t
        )
          e.pos = this.glyphOffsets[t];
        return e.data;
      }),
      n
    );
  })(),
  vh = (function (n) {
    function t() {
      return t.__super__.constructor.apply(this, arguments);
    }
    return (
      ur(t, Yn),
      (t.prototype.tag = "loca"),
      (t.prototype.parse = function (e) {
        var i, s;
        return (
          (e.pos = this.offset),
          (i = this.file.head.indexToLocFormat),
          (this.offsets =
            i === 0
              ? function () {
                  var a, l;
                  for (l = [], s = 0, a = this.length; s < a; s += 2)
                    l.push(2 * e.readUInt16());
                  return l;
                }.call(this)
              : function () {
                  var a, l;
                  for (l = [], s = 0, a = this.length; s < a; s += 4)
                    l.push(e.readUInt32());
                  return l;
                }.call(this))
        );
      }),
      (t.prototype.indexOf = function (e) {
        return this.offsets[e];
      }),
      (t.prototype.lengthOf = function (e) {
        return this.offsets[e + 1] - this.offsets[e];
      }),
      (t.prototype.encode = function (e, i) {
        for (
          var s = new Uint32Array(this.offsets.length), a = 0, l = 0, c = 0;
          c < s.length;
          ++c
        )
          if (((s[c] = a), l < i.length && i[l] == c)) {
            ++l, (s[c] = a);
            var h = this.offsets[c],
              g = this.offsets[c + 1] - h;
            g > 0 && (a += g);
          }
        for (var m = new Array(4 * s.length), v = 0; v < s.length; ++v)
          (m[4 * v + 3] = 255 & s[v]),
            (m[4 * v + 2] = (65280 & s[v]) >> 8),
            (m[4 * v + 1] = (16711680 & s[v]) >> 16),
            (m[4 * v] = (4278190080 & s[v]) >> 24);
        return m;
      }),
      t
    );
  })(),
  bh = (function () {
    function n(t) {
      (this.font = t),
        (this.subset = {}),
        (this.unicodes = {}),
        (this.next = 33);
    }
    return (
      (n.prototype.generateCmap = function () {
        var t, e, i, s, a;
        for (e in ((s = this.font.cmap.tables[0].codeMap),
        (t = {}),
        (a = this.subset)))
          (i = a[e]), (t[e] = s[i]);
        return t;
      }),
      (n.prototype.glyphsFor = function (t) {
        var e, i, s, a, l, c, h;
        for (s = {}, l = 0, c = t.length; l < c; l++)
          s[(a = t[l])] = this.font.glyf.glyphFor(a);
        for (a in ((e = []), s))
          (i = s[a]) != null && i.compound && e.push.apply(e, i.glyphIDs);
        if (e.length > 0)
          for (a in (h = this.glyphsFor(e))) (i = h[a]), (s[a] = i);
        return s;
      }),
      (n.prototype.encode = function (t, e) {
        var i, s, a, l, c, h, g, m, v, N, p, F, P, M, _;
        for (s in ((i = Vl.encode(this.generateCmap(), "unicode")),
        (l = this.glyphsFor(t)),
        (p = { 0: 0 }),
        (_ = i.charMap)))
          p[(h = _[s]).old] = h.new;
        for (F in ((N = i.maxGlyphID), l)) F in p || (p[F] = N++);
        return (
          (m = (function (E) {
            var G, nt;
            for (G in ((nt = {}), E)) nt[E[G]] = G;
            return nt;
          })(p)),
          (v = Object.keys(m).sort(function (E, G) {
            return E - G;
          })),
          (P = (function () {
            var E, G, nt;
            for (nt = [], E = 0, G = v.length; E < G; E++)
              (c = v[E]), nt.push(m[c]);
            return nt;
          })()),
          (a = this.font.glyf.encode(l, P, p)),
          (g = this.font.loca.encode(a.offsets, P)),
          (M = {
            cmap: this.font.cmap.raw(),
            glyf: a.table,
            loca: g,
            hmtx: this.font.hmtx.raw(),
            hhea: this.font.hhea.raw(),
            maxp: this.font.maxp.raw(),
            post: this.font.post.raw(),
            name: this.font.name.raw(),
            head: this.font.head.encode(e),
          }),
          this.font.os2.exists && (M["OS/2"] = this.font.os2.raw()),
          this.font.directory.encode(M)
        );
      }),
      n
    );
  })();
zt.API.PDFObject = (function () {
  var n;
  function t() {}
  return (
    (n = function (e, i) {
      return (Array(i + 1).join("0") + e).slice(-i);
    }),
    (t.convert = function (e) {
      var i, s, a, l;
      if (Array.isArray(e))
        return (
          "[" +
          (function () {
            var c, h, g;
            for (g = [], c = 0, h = e.length; c < h; c++)
              (i = e[c]), g.push(t.convert(i));
            return g;
          })().join(" ") +
          "]"
        );
      if (typeof e == "string") return "/" + e;
      if (e?.isString) return "(" + e + ")";
      if (e instanceof Date)
        return (
          "(D:" +
          n(e.getUTCFullYear(), 4) +
          n(e.getUTCMonth(), 2) +
          n(e.getUTCDate(), 2) +
          n(e.getUTCHours(), 2) +
          n(e.getUTCMinutes(), 2) +
          n(e.getUTCSeconds(), 2) +
          "Z)"
        );
      if ({}.toString.call(e) === "[object Object]") {
        for (s in ((a = ["<<"]), e))
          (l = e[s]), a.push("/" + s + " " + t.convert(l));
        return (
          a.push(">>"),
          a.join(`
`)
        );
      }
      return "" + e;
    }),
    t
  );
})();
const Wn = 5,
  yh = 210 - 2 * Wn,
  wh = 297 - 2 * Wn,
  xh = (n, t, e, i) => {
    if (!n) {
      alert("Сначала сгенерируйте изображение!");
      return;
    }
    const s = new zt("p", "mm", "a4"),
      a = s.internal.pageSize.getWidth(),
      l = s.internal.pageSize.getHeight(),
      c = 96,
      h = new Image();
    (h.src = n),
      (h.onload = () => {
        const g = (h.width * 25.4) / c,
          m = (h.height * 25.4) / c;
        s.addImage(h, "PNG", Wn, Wn, Math.min(g, yh), Math.min(m, wh)),
          s.addPage();
        const v = g / i,
          N = g / e,
          p = 5,
          F = a - 2 * Wn,
          P = Math.floor((F + p) / (v + p)),
          M = P > 0 ? P : 1;
        for (let nt = t.length - 1; nt > 0; nt--) {
          const st = Math.floor(Math.random() * (nt + 1));
          [t[nt], t[st]] = [t[st], t[nt]];
        }
        let _ = Wn,
          E = Wn,
          G = 0;
        t.forEach((nt) => {
          E + N > l - Wn && (s.addPage(), (_ = Wn), (E = Wn), (G = 0)),
            s.addImage(nt, "PNG", _, E, v, N),
            G++,
            G >= M ? ((G = 0), (_ = Wn), (E += N + p)) : (_ += N + p);
        }),
          s.save("output.pdf");
      });
  };
var Ah = ai(
  "<div class=MainComponent><!$><!/><!$><!/><button type=button class=download-button>Скачать",
);
const Nh = () => {
  const {
      rows: n,
      cols: t,
      color: e,
      setRows: i,
      setCols: s,
      setColor: a,
    } = yf(),
    {
      setImageSrc: l,
      generateGrid: c,
      fullImageDataUrl: h,
      cellDataUrls: g,
    } = bf(),
    m = (F) => {
      l(F), c(n(), t(), e());
    },
    v = (F) => (P) => {
      F(P), c(n(), t(), e());
    },
    N = (F) => {
      a(F), c(n(), t(), e());
    },
    p = () => {
      xh(h() || "", g(), n(), t());
    };
  return (() => {
    var F = oi(Ah),
      P = F.firstChild,
      [M, _] = Pa(P.nextSibling),
      E = M.nextSibling,
      [G, nt] = Pa(E.nextSibling),
      st = G.nextSibling;
    return (
      Gn(
        F,
        gn(ff, {
          get rows() {
            return n();
          },
          get cols() {
            return t();
          },
          get color() {
            return e();
          },
          get setRows() {
            return v(i);
          },
          get setCols() {
            return v(s);
          },
          setColor: N,
        }),
        M,
        _,
      ),
      Gn(
        F,
        gn(pf, {
          imageCallback: m,
          get dataUrl() {
            return h() || "";
          },
        }),
        G,
        nt,
      ),
      (st.$$click = p),
      Ho(),
      F
    );
  })();
};
Uo(["click"]);
var Lh = ai("<div class=app>");
const Sh = () =>
    (() => {
      var n = oi(Lh);
      return Gn(n, gn(Nh, {})), n;
    })(),
  _h = (n) => null;
var Ph = ai(
  "<span style=font-size:1.5em;text-align:center;position:fixed;left:0px;bottom:55%;width:100%;>",
);
const kh = (n) => {
  const t = "Error | Uncaught Client Exception";
  return gn(Uc, {
    fallback: (e) => (
      console.error(e),
      [
        (() => {
          var i = oi(Ph);
          return Gn(i, t), i;
        })(),
        gn(_h, { code: 500 }),
      ]
    ),
    get children() {
      return n.children;
    },
  });
};
function Ih(n, t) {
  return Yc(n, t);
}
function gl(n) {
  return n.children;
}
function Ch() {
  return gn(gl, {
    get children() {
      return gn(gl, {
        get children() {
          return gn(kh, {
            get children() {
              return gn(Sh, {});
            },
          });
        },
      });
    },
  });
}
Ih(() => gn(Ch, {}), document.getElementById("app"));
const Fh = void 0;
export { de as _, Fh as c };
