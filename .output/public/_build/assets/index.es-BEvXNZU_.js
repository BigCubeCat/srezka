import { _ as Ga } from "./client-CwijIDPW.js";
var Ke =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
      ? window
      : typeof global < "u"
        ? global
        : typeof self < "u"
          ? self
          : {};
function Po(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default")
    ? a.default
    : a;
}
var vt = function (a) {
    return a && a.Math === Math && a;
  },
  V =
    vt(typeof globalThis == "object" && globalThis) ||
    vt(typeof window == "object" && window) ||
    vt(typeof self == "object" && self) ||
    vt(typeof Ke == "object" && Ke) ||
    vt(typeof Ke == "object" && Ke) ||
    (function () {
      return this;
    })() ||
    Function("return this")(),
  $t = {},
  k = function (a) {
    try {
      return !!a();
    } catch {
      return !0;
    }
  },
  Tl = k,
  le = !Tl(function () {
    return (
      Object.defineProperty({}, 1, {
        get: function () {
          return 7;
        },
      })[1] !== 7
    );
  }),
  Ol = k,
  mr = !Ol(function () {
    var a = function () {}.bind();
    return typeof a != "function" || a.hasOwnProperty("prototype");
  }),
  Sl = mr,
  Ut = Function.prototype.call,
  Y = Sl
    ? Ut.bind(Ut)
    : function () {
        return Ut.apply(Ut, arguments);
      },
  Ro = {},
  No = {}.propertyIsEnumerable,
  Io = Object.getOwnPropertyDescriptor,
  El = Io && !No.call({ 1: 2 }, 1);
Ro.f = El
  ? function (e) {
      var t = Io(this, e);
      return !!t && t.enumerable;
    }
  : No;
var bi = function (a, e) {
    return {
      enumerable: !(a & 1),
      configurable: !(a & 2),
      writable: !(a & 4),
      value: e,
    };
  },
  Mo = mr,
  _o = Function.prototype,
  za = _o.call,
  $l = Mo && _o.bind.bind(za, za),
  L = Mo
    ? $l
    : function (a) {
        return function () {
          return za.apply(a, arguments);
        };
      },
  Vo = L,
  wl = Vo({}.toString),
  Cl = Vo("".slice),
  Be = function (a) {
    return Cl(wl(a), 8, -1);
  },
  Al = L,
  Pl = k,
  Rl = Be,
  Qr = Object,
  Nl = Al("".split),
  Do = Pl(function () {
    return !Qr("z").propertyIsEnumerable(0);
  })
    ? function (a) {
        return Rl(a) === "String" ? Nl(a, "") : Qr(a);
      }
    : Qr,
  je = function (a) {
    return a == null;
  },
  Il = je,
  Ml = TypeError,
  he = function (a) {
    if (Il(a)) throw new Ml("Can't call method on " + a);
    return a;
  },
  _l = Do,
  Vl = he,
  wt = function (a) {
    return _l(Vl(a));
  },
  Kr = typeof document == "object" && document.all,
  B =
    typeof Kr > "u" && Kr !== void 0
      ? function (a) {
          return typeof a == "function" || a === Kr;
        }
      : function (a) {
          return typeof a == "function";
        },
  Dl = B,
  ve = function (a) {
    return typeof a == "object" ? a !== null : Dl(a);
  },
  Zr = V,
  kl = B,
  Ll = function (a) {
    return kl(a) ? a : void 0;
  },
  Fe = function (a, e) {
    return arguments.length < 2 ? Ll(Zr[a]) : Zr[a] && Zr[a][e];
  },
  Bl = L,
  br = Bl({}.isPrototypeOf),
  jl = V,
  fn = jl.navigator,
  cn = fn && fn.userAgent,
  Ct = cn ? String(cn) : "",
  ko = V,
  Jr = Ct,
  gn = ko.process,
  dn = ko.Deno,
  pn = (gn && gn.versions) || (dn && dn.version),
  yn = pn && pn.v8,
  ue,
  fr;
yn &&
  ((ue = yn.split(".")), (fr = ue[0] > 0 && ue[0] < 4 ? 1 : +(ue[0] + ue[1])));
!fr &&
  Jr &&
  ((ue = Jr.match(/Edge\/(\d+)/)),
  (!ue || ue[1] >= 74) &&
    ((ue = Jr.match(/Chrome\/(\d+)/)), ue && (fr = +ue[1])));
var xi = fr,
  mn = xi,
  Fl = k,
  Ul = V,
  Gl = Ul.String,
  Lo =
    !!Object.getOwnPropertySymbols &&
    !Fl(function () {
      var a = Symbol("symbol detection");
      return (
        !Gl(a) ||
        !(Object(a) instanceof Symbol) ||
        (!Symbol.sham && mn && mn < 41)
      );
    }),
  zl = Lo,
  Bo = zl && !Symbol.sham && typeof Symbol.iterator == "symbol",
  Hl = Fe,
  Yl = B,
  Xl = br,
  Wl = Bo,
  ql = Object,
  jo = Wl
    ? function (a) {
        return typeof a == "symbol";
      }
    : function (a) {
        var e = Hl("Symbol");
        return Yl(e) && Xl(e.prototype, ql(a));
      },
  Ql = String,
  xr = function (a) {
    try {
      return Ql(a);
    } catch {
      return "Object";
    }
  },
  Kl = B,
  Zl = xr,
  Jl = TypeError,
  Te = function (a) {
    if (Kl(a)) return a;
    throw new Jl(Zl(a) + " is not a function");
  },
  eh = Te,
  th = je,
  ot = function (a, e) {
    var t = a[e];
    return th(t) ? void 0 : eh(t);
  },
  ea = Y,
  ta = B,
  ra = ve,
  rh = TypeError,
  ah = function (a, e) {
    var t, r;
    if (
      (e === "string" && ta((t = a.toString)) && !ra((r = ea(t, a)))) ||
      (ta((t = a.valueOf)) && !ra((r = ea(t, a)))) ||
      (e !== "string" && ta((t = a.toString)) && !ra((r = ea(t, a))))
    )
      return r;
    throw new rh("Can't convert object to primitive value");
  },
  Fo = { exports: {} },
  bn = V,
  ih = Object.defineProperty,
  Ti = function (a, e) {
    try {
      ih(bn, a, { value: e, configurable: !0, writable: !0 });
    } catch {
      bn[a] = e;
    }
    return e;
  },
  nh = V,
  sh = Ti,
  xn = "__core-js_shared__",
  Tn = (Fo.exports = nh[xn] || sh(xn, {}));
(Tn.versions || (Tn.versions = [])).push({
  version: "3.40.0",
  mode: "global",
  copyright: "© 2014-2025 Denis Pushkarev (zloirock.ru)",
  license: "https://github.com/zloirock/core-js/blob/v3.40.0/LICENSE",
  source: "https://github.com/zloirock/core-js",
});
var Oi = Fo.exports,
  On = Oi,
  Si = function (a, e) {
    return On[a] || (On[a] = e || {});
  },
  oh = he,
  uh = Object,
  Tr = function (a) {
    return uh(oh(a));
  },
  lh = L,
  hh = Tr,
  vh = lh({}.hasOwnProperty),
  fe =
    Object.hasOwn ||
    function (e, t) {
      return vh(hh(e), t);
    },
  fh = L,
  ch = 0,
  gh = Math.random(),
  dh = fh((1).toString),
  Uo = function (a) {
    return "Symbol(" + (a === void 0 ? "" : a) + ")_" + dh(++ch + gh, 36);
  },
  ph = V,
  yh = Si,
  Sn = fe,
  mh = Uo,
  bh = Lo,
  xh = Bo,
  Ze = ph.Symbol,
  aa = yh("wks"),
  Th = xh ? Ze.for || Ze : (Ze && Ze.withoutSetter) || mh,
  z = function (a) {
    return (
      Sn(aa, a) || (aa[a] = bh && Sn(Ze, a) ? Ze[a] : Th("Symbol." + a)), aa[a]
    );
  },
  Oh = Y,
  En = ve,
  $n = jo,
  Sh = ot,
  Eh = ah,
  $h = z,
  wh = TypeError,
  Ch = $h("toPrimitive"),
  Ah = function (a, e) {
    if (!En(a) || $n(a)) return a;
    var t = Sh(a, Ch),
      r;
    if (t) {
      if ((e === void 0 && (e = "default"), (r = Oh(t, a, e)), !En(r) || $n(r)))
        return r;
      throw new wh("Can't convert object to primitive value");
    }
    return e === void 0 && (e = "number"), Eh(a, e);
  },
  Ph = Ah,
  Rh = jo,
  Go = function (a) {
    var e = Ph(a, "string");
    return Rh(e) ? e : e + "";
  },
  Nh = V,
  wn = ve,
  Ha = Nh.document,
  Ih = wn(Ha) && wn(Ha.createElement),
  Or = function (a) {
    return Ih ? Ha.createElement(a) : {};
  },
  Mh = le,
  _h = k,
  Vh = Or,
  zo =
    !Mh &&
    !_h(function () {
      return (
        Object.defineProperty(Vh("div"), "a", {
          get: function () {
            return 7;
          },
        }).a !== 7
      );
    }),
  Dh = le,
  kh = Y,
  Lh = Ro,
  Bh = bi,
  jh = wt,
  Fh = Go,
  Uh = fe,
  Gh = zo,
  Cn = Object.getOwnPropertyDescriptor;
$t.f = Dh
  ? Cn
  : function (e, t) {
      if (((e = jh(e)), (t = Fh(t)), Gh))
        try {
          return Cn(e, t);
        } catch {}
      if (Uh(e, t)) return Bh(!kh(Lh.f, e, t), e[t]);
    };
var Oe = {},
  zh = le,
  Hh = k,
  Ho =
    zh &&
    Hh(function () {
      return (
        Object.defineProperty(function () {}, "prototype", {
          value: 42,
          writable: !1,
        }).prototype !== 42
      );
    }),
  Yh = ve,
  Xh = String,
  Wh = TypeError,
  J = function (a) {
    if (Yh(a)) return a;
    throw new Wh(Xh(a) + " is not an object");
  },
  qh = le,
  Qh = zo,
  Kh = Ho,
  Gt = J,
  An = Go,
  Zh = TypeError,
  ia = Object.defineProperty,
  Jh = Object.getOwnPropertyDescriptor,
  na = "enumerable",
  sa = "configurable",
  oa = "writable";
Oe.f = qh
  ? Kh
    ? function (e, t, r) {
        if (
          (Gt(e),
          (t = An(t)),
          Gt(r),
          typeof e == "function" &&
            t === "prototype" &&
            "value" in r &&
            oa in r &&
            !r[oa])
        ) {
          var i = Jh(e, t);
          i &&
            i[oa] &&
            ((e[t] = r.value),
            (r = {
              configurable: sa in r ? r[sa] : i[sa],
              enumerable: na in r ? r[na] : i[na],
              writable: !1,
            }));
        }
        return ia(e, t, r);
      }
    : ia
  : function (e, t, r) {
      if ((Gt(e), (t = An(t)), Gt(r), Qh))
        try {
          return ia(e, t, r);
        } catch {}
      if ("get" in r || "set" in r) throw new Zh("Accessors not supported");
      return "value" in r && (e[t] = r.value), e;
    };
var ev = le,
  tv = Oe,
  rv = bi,
  At = ev
    ? function (a, e, t) {
        return tv.f(a, e, rv(1, t));
      }
    : function (a, e, t) {
        return (a[e] = t), a;
      },
  Yo = { exports: {} },
  Ya = le,
  av = fe,
  Xo = Function.prototype,
  iv = Ya && Object.getOwnPropertyDescriptor,
  Wo = av(Xo, "name"),
  nv = Wo && function () {}.name === "something",
  sv = Wo && (!Ya || (Ya && iv(Xo, "name").configurable)),
  Sr = { PROPER: nv, CONFIGURABLE: sv },
  ov = L,
  uv = B,
  Xa = Oi,
  lv = ov(Function.toString);
uv(Xa.inspectSource) ||
  (Xa.inspectSource = function (a) {
    return lv(a);
  });
var Ei = Xa.inspectSource,
  hv = V,
  vv = B,
  Pn = hv.WeakMap,
  fv = vv(Pn) && /native code/.test(String(Pn)),
  cv = Si,
  gv = Uo,
  Rn = cv("keys"),
  $i = function (a) {
    return Rn[a] || (Rn[a] = gv(a));
  },
  wi = {},
  dv = fv,
  qo = V,
  pv = ve,
  yv = At,
  ua = fe,
  la = Oi,
  mv = $i,
  bv = wi,
  Nn = "Object already initialized",
  Wa = qo.TypeError,
  xv = qo.WeakMap,
  cr,
  Ot,
  gr,
  Tv = function (a) {
    return gr(a) ? Ot(a) : cr(a, {});
  },
  Ov = function (a) {
    return function (e) {
      var t;
      if (!pv(e) || (t = Ot(e)).type !== a)
        throw new Wa("Incompatible receiver, " + a + " required");
      return t;
    };
  };
if (dv || la.state) {
  var de = la.state || (la.state = new xv());
  (de.get = de.get),
    (de.has = de.has),
    (de.set = de.set),
    (cr = function (a, e) {
      if (de.has(a)) throw new Wa(Nn);
      return (e.facade = a), de.set(a, e), e;
    }),
    (Ot = function (a) {
      return de.get(a) || {};
    }),
    (gr = function (a) {
      return de.has(a);
    });
} else {
  var Ye = mv("state");
  (bv[Ye] = !0),
    (cr = function (a, e) {
      if (ua(a, Ye)) throw new Wa(Nn);
      return (e.facade = a), yv(a, Ye, e), e;
    }),
    (Ot = function (a) {
      return ua(a, Ye) ? a[Ye] : {};
    }),
    (gr = function (a) {
      return ua(a, Ye);
    });
}
var Er = { set: cr, get: Ot, has: gr, enforce: Tv, getterFor: Ov },
  Ci = L,
  Sv = k,
  Ev = B,
  zt = fe,
  qa = le,
  $v = Sr.CONFIGURABLE,
  wv = Ei,
  Qo = Er,
  Cv = Qo.enforce,
  Av = Qo.get,
  In = String,
  sr = Object.defineProperty,
  Pv = Ci("".slice),
  Rv = Ci("".replace),
  Nv = Ci([].join),
  Iv =
    qa &&
    !Sv(function () {
      return sr(function () {}, "length", { value: 8 }).length !== 8;
    }),
  Mv = String(String).split("String"),
  _v = (Yo.exports = function (a, e, t) {
    Pv(In(e), 0, 7) === "Symbol(" &&
      (e = "[" + Rv(In(e), /^Symbol\(([^)]*)\).*$/, "$1") + "]"),
      t && t.getter && (e = "get " + e),
      t && t.setter && (e = "set " + e),
      (!zt(a, "name") || ($v && a.name !== e)) &&
        (qa ? sr(a, "name", { value: e, configurable: !0 }) : (a.name = e)),
      Iv &&
        t &&
        zt(t, "arity") &&
        a.length !== t.arity &&
        sr(a, "length", { value: t.arity });
    try {
      t && zt(t, "constructor") && t.constructor
        ? qa && sr(a, "prototype", { writable: !1 })
        : a.prototype && (a.prototype = void 0);
    } catch {}
    var r = Cv(a);
    return (
      zt(r, "source") || (r.source = Nv(Mv, typeof e == "string" ? e : "")), a
    );
  });
Function.prototype.toString = _v(function () {
  return (Ev(this) && Av(this).source) || wv(this);
}, "toString");
var Ko = Yo.exports,
  Vv = B,
  Dv = Oe,
  kv = Ko,
  Lv = Ti,
  Ue = function (a, e, t, r) {
    r || (r = {});
    var i = r.enumerable,
      n = r.name !== void 0 ? r.name : e;
    if ((Vv(t) && kv(t, n, r), r.global)) i ? (a[e] = t) : Lv(e, t);
    else {
      try {
        r.unsafe ? a[e] && (i = !0) : delete a[e];
      } catch {}
      i
        ? (a[e] = t)
        : Dv.f(a, e, {
            value: t,
            enumerable: !1,
            configurable: !r.nonConfigurable,
            writable: !r.nonWritable,
          });
    }
    return a;
  },
  Zo = {},
  Bv = Math.ceil,
  jv = Math.floor,
  Fv =
    Math.trunc ||
    function (e) {
      var t = +e;
      return (t > 0 ? jv : Bv)(t);
    },
  Uv = Fv,
  $r = function (a) {
    var e = +a;
    return e !== e || e === 0 ? 0 : Uv(e);
  },
  Gv = $r,
  zv = Math.max,
  Hv = Math.min,
  Yv = function (a, e) {
    var t = Gv(a);
    return t < 0 ? zv(t + e, 0) : Hv(t, e);
  },
  Xv = $r,
  Wv = Math.min,
  ut = function (a) {
    var e = Xv(a);
    return e > 0 ? Wv(e, 9007199254740991) : 0;
  },
  qv = ut,
  Ai = function (a) {
    return qv(a.length);
  },
  Qv = wt,
  Kv = Yv,
  Zv = Ai,
  Jv = function (a) {
    return function (e, t, r) {
      var i = Qv(e),
        n = Zv(i);
      if (n === 0) return !a && -1;
      var o = Kv(r, n),
        s;
      if (a && t !== t) {
        for (; n > o; ) if (((s = i[o++]), s !== s)) return !0;
      } else
        for (; n > o; o++) if ((a || o in i) && i[o] === t) return a || o || 0;
      return !a && -1;
    };
  },
  Jo = { indexOf: Jv(!1) },
  ef = L,
  ha = fe,
  tf = wt,
  rf = Jo.indexOf,
  af = wi,
  Mn = ef([].push),
  eu = function (a, e) {
    var t = tf(a),
      r = 0,
      i = [],
      n;
    for (n in t) !ha(af, n) && ha(t, n) && Mn(i, n);
    for (; e.length > r; ) ha(t, (n = e[r++])) && (~rf(i, n) || Mn(i, n));
    return i;
  },
  Pi = [
    "constructor",
    "hasOwnProperty",
    "isPrototypeOf",
    "propertyIsEnumerable",
    "toLocaleString",
    "toString",
    "valueOf",
  ],
  nf = eu,
  sf = Pi,
  of = sf.concat("length", "prototype");
Zo.f =
  Object.getOwnPropertyNames ||
  function (e) {
    return nf(e, of);
  };
var tu = {};
tu.f = Object.getOwnPropertySymbols;
var uf = Fe,
  lf = L,
  hf = Zo,
  vf = tu,
  ff = J,
  cf = lf([].concat),
  gf =
    uf("Reflect", "ownKeys") ||
    function (e) {
      var t = hf.f(ff(e)),
        r = vf.f;
      return r ? cf(t, r(e)) : t;
    },
  _n = fe,
  df = gf,
  pf = $t,
  yf = Oe,
  mf = function (a, e, t) {
    for (var r = df(e), i = yf.f, n = pf.f, o = 0; o < r.length; o++) {
      var s = r[o];
      !_n(a, s) && !(t && _n(t, s)) && i(a, s, n(e, s));
    }
  },
  bf = k,
  xf = B,
  Tf = /#|\.prototype\./,
  Pt = function (a, e) {
    var t = Sf[Of(a)];
    return t === $f ? !0 : t === Ef ? !1 : xf(e) ? bf(e) : !!e;
  },
  Of = (Pt.normalize = function (a) {
    return String(a).replace(Tf, ".").toLowerCase();
  }),
  Sf = (Pt.data = {}),
  Ef = (Pt.NATIVE = "N"),
  $f = (Pt.POLYFILL = "P"),
  ru = Pt,
  Ht = V,
  wf = $t.f,
  Cf = At,
  Af = Ue,
  Pf = Ti,
  Rf = mf,
  Nf = ru,
  ee = function (a, e) {
    var t = a.target,
      r = a.global,
      i = a.stat,
      n,
      o,
      s,
      u,
      l,
      h;
    if (
      (r
        ? (o = Ht)
        : i
          ? (o = Ht[t] || Pf(t, {}))
          : (o = Ht[t] && Ht[t].prototype),
      o)
    )
      for (s in e) {
        if (
          ((l = e[s]),
          a.dontCallGetSet ? ((h = wf(o, s)), (u = h && h.value)) : (u = o[s]),
          (n = Nf(r ? s : t + (i ? "." : "#") + s, a.forced)),
          !n && u !== void 0)
        ) {
          if (typeof l == typeof u) continue;
          Rf(l, u);
        }
        (a.sham || (u && u.sham)) && Cf(l, "sham", !0), Af(o, s, l, a);
      }
  },
  ft = V,
  If = Ct,
  Mf = Be,
  Yt = function (a) {
    return If.slice(0, a.length) === a;
  },
  au = (function () {
    return Yt("Bun/")
      ? "BUN"
      : Yt("Cloudflare-Workers")
        ? "CLOUDFLARE"
        : Yt("Deno/")
          ? "DENO"
          : Yt("Node.js/")
            ? "NODE"
            : ft.Bun && typeof Bun.version == "string"
              ? "BUN"
              : ft.Deno && typeof Deno.version == "object"
                ? "DENO"
                : Mf(ft.process) === "process"
                  ? "NODE"
                  : ft.window && ft.document
                    ? "BROWSER"
                    : "REST";
  })(),
  _f = au,
  wr = _f === "NODE",
  Vf = L,
  Df = Te,
  kf = function (a, e, t) {
    try {
      return Vf(Df(Object.getOwnPropertyDescriptor(a, e)[t]));
    } catch {}
  },
  Lf = ve,
  Bf = function (a) {
    return Lf(a) || a === null;
  },
  jf = Bf,
  Ff = String,
  Uf = TypeError,
  Gf = function (a) {
    if (jf(a)) return a;
    throw new Uf("Can't set " + Ff(a) + " as a prototype");
  },
  zf = kf,
  Hf = ve,
  Yf = he,
  Xf = Gf,
  iu =
    Object.setPrototypeOf ||
    ("__proto__" in {}
      ? (function () {
          var a = !1,
            e = {},
            t;
          try {
            (t = zf(Object.prototype, "__proto__", "set")),
              t(e, []),
              (a = e instanceof Array);
          } catch {}
          return function (i, n) {
            return Yf(i), Xf(n), Hf(i) && (a ? t(i, n) : (i.__proto__ = n)), i;
          };
        })()
      : void 0),
  Wf = Oe.f,
  qf = fe,
  Qf = z,
  Vn = Qf("toStringTag"),
  Cr = function (a, e, t) {
    a && !t && (a = a.prototype),
      a && !qf(a, Vn) && Wf(a, Vn, { configurable: !0, value: e });
  },
  Dn = Ko,
  Kf = Oe,
  Zf = function (a, e, t) {
    return (
      t.get && Dn(t.get, e, { getter: !0 }),
      t.set && Dn(t.set, e, { setter: !0 }),
      Kf.f(a, e, t)
    );
  },
  Jf = Fe,
  ec = Zf,
  tc = z,
  rc = le,
  kn = tc("species"),
  ac = function (a) {
    var e = Jf(a);
    rc &&
      e &&
      !e[kn] &&
      ec(e, kn, {
        configurable: !0,
        get: function () {
          return this;
        },
      });
  },
  ic = br,
  nc = TypeError,
  sc = function (a, e) {
    if (ic(e, a)) return a;
    throw new nc("Incorrect invocation");
  },
  oc = z,
  uc = oc("toStringTag"),
  nu = {};
nu[uc] = "z";
var lc = String(nu) === "[object z]",
  hc = lc,
  vc = B,
  or = Be,
  fc = z,
  cc = fc("toStringTag"),
  gc = Object,
  dc =
    or(
      (function () {
        return arguments;
      })(),
    ) === "Arguments",
  pc = function (a, e) {
    try {
      return a[e];
    } catch {}
  },
  Ri = hc
    ? or
    : function (a) {
        var e, t, r;
        return a === void 0
          ? "Undefined"
          : a === null
            ? "Null"
            : typeof (t = pc((e = gc(a)), cc)) == "string"
              ? t
              : dc
                ? or(e)
                : (r = or(e)) === "Object" && vc(e.callee)
                  ? "Arguments"
                  : r;
      },
  yc = L,
  mc = k,
  su = B,
  bc = Ri,
  xc = Fe,
  Tc = Ei,
  ou = function () {},
  uu = xc("Reflect", "construct"),
  Ni = /^\s*(?:class|function)\b/,
  Oc = yc(Ni.exec),
  Sc = !Ni.test(ou),
  ct = function (e) {
    if (!su(e)) return !1;
    try {
      return uu(ou, [], e), !0;
    } catch {
      return !1;
    }
  },
  lu = function (e) {
    if (!su(e)) return !1;
    switch (bc(e)) {
      case "AsyncFunction":
      case "GeneratorFunction":
      case "AsyncGeneratorFunction":
        return !1;
    }
    try {
      return Sc || !!Oc(Ni, Tc(e));
    } catch {
      return !0;
    }
  };
lu.sham = !0;
var Ec =
    !uu ||
    mc(function () {
      var a;
      return (
        ct(ct.call) ||
        !ct(Object) ||
        !ct(function () {
          a = !0;
        }) ||
        a
      );
    })
      ? lu
      : ct,
  $c = Ec,
  wc = xr,
  Cc = TypeError,
  Ac = function (a) {
    if ($c(a)) return a;
    throw new Cc(wc(a) + " is not a constructor");
  },
  Ln = J,
  Pc = Ac,
  Rc = je,
  Nc = z,
  Ic = Nc("species"),
  hu = function (a, e) {
    var t = Ln(a).constructor,
      r;
    return t === void 0 || Rc((r = Ln(t)[Ic])) ? e : Pc(r);
  },
  Mc = mr,
  vu = Function.prototype,
  Bn = vu.apply,
  jn = vu.call,
  fu =
    (typeof Reflect == "object" && Reflect.apply) ||
    (Mc
      ? jn.bind(Bn)
      : function () {
          return jn.apply(Bn, arguments);
        }),
  _c = Be,
  Vc = L,
  Ar = function (a) {
    if (_c(a) === "Function") return Vc(a);
  },
  Fn = Ar,
  Dc = Te,
  kc = mr,
  Lc = Fn(Fn.bind),
  Ii = function (a, e) {
    return (
      Dc(a),
      e === void 0
        ? a
        : kc
          ? Lc(a, e)
          : function () {
              return a.apply(e, arguments);
            }
    );
  },
  Bc = Fe,
  cu = Bc("document", "documentElement"),
  jc = L,
  Fc = jc([].slice),
  Uc = TypeError,
  Gc = function (a, e) {
    if (a < e) throw new Uc("Not enough arguments");
    return a;
  },
  zc = Ct,
  gu = /(?:ipad|iphone|ipod).*applewebkit/i.test(zc),
  ae = V,
  Hc = fu,
  Yc = Ii,
  Un = B,
  Xc = fe,
  du = k,
  Gn = cu,
  Wc = Fc,
  zn = Or,
  qc = Gc,
  Qc = gu,
  Kc = wr,
  Qa = ae.setImmediate,
  Hn = ae.clearImmediate,
  Zc = ae.process,
  va = ae.Dispatch,
  Jc = ae.Function,
  Yn = ae.MessageChannel,
  eg = ae.String,
  fa = 0,
  xt = {},
  Xn = "onreadystatechange",
  St,
  Ie,
  ca,
  ga;
du(function () {
  St = ae.location;
});
var Mi = function (a) {
    if (Xc(xt, a)) {
      var e = xt[a];
      delete xt[a], e();
    }
  },
  da = function (a) {
    return function () {
      Mi(a);
    };
  },
  Wn = function (a) {
    Mi(a.data);
  },
  qn = function (a) {
    ae.postMessage(eg(a), St.protocol + "//" + St.host);
  };
(!Qa || !Hn) &&
  ((Qa = function (e) {
    qc(arguments.length, 1);
    var t = Un(e) ? e : Jc(e),
      r = Wc(arguments, 1);
    return (
      (xt[++fa] = function () {
        Hc(t, void 0, r);
      }),
      Ie(fa),
      fa
    );
  }),
  (Hn = function (e) {
    delete xt[e];
  }),
  Kc
    ? (Ie = function (a) {
        Zc.nextTick(da(a));
      })
    : va && va.now
      ? (Ie = function (a) {
          va.now(da(a));
        })
      : Yn && !Qc
        ? ((ca = new Yn()),
          (ga = ca.port2),
          (ca.port1.onmessage = Wn),
          (Ie = Yc(ga.postMessage, ga)))
        : ae.addEventListener &&
            Un(ae.postMessage) &&
            !ae.importScripts &&
            St &&
            St.protocol !== "file:" &&
            !du(qn)
          ? ((Ie = qn), ae.addEventListener("message", Wn, !1))
          : Xn in zn("script")
            ? (Ie = function (a) {
                Gn.appendChild(zn("script"))[Xn] = function () {
                  Gn.removeChild(this), Mi(a);
                };
              })
            : (Ie = function (a) {
                setTimeout(da(a), 0);
              }));
var pu = { set: Qa },
  Qn = V,
  tg = le,
  rg = Object.getOwnPropertyDescriptor,
  ag = function (a) {
    if (!tg) return Qn[a];
    var e = rg(Qn, a);
    return e && e.value;
  },
  yu = function () {
    (this.head = null), (this.tail = null);
  };
yu.prototype = {
  add: function (a) {
    var e = { item: a, next: null },
      t = this.tail;
    t ? (t.next = e) : (this.head = e), (this.tail = e);
  },
  get: function () {
    var a = this.head;
    if (a) {
      var e = (this.head = a.next);
      return e === null && (this.tail = null), a.item;
    }
  },
};
var mu = yu,
  ig = Ct,
  ng = /ipad|iphone|ipod/i.test(ig) && typeof Pebble < "u",
  sg = Ct,
  og = /web0s(?!.*chrome)/i.test(sg),
  it = V,
  ug = ag,
  Kn = Ii,
  pa = pu.set,
  lg = mu,
  hg = gu,
  vg = ng,
  fg = og,
  ya = wr,
  Zn = it.MutationObserver || it.WebKitMutationObserver,
  Jn = it.document,
  es = it.process,
  Xt = it.Promise,
  Ka = ug("queueMicrotask"),
  Xe,
  ma,
  ba,
  Wt,
  ts;
if (!Ka) {
  var qt = new lg(),
    Qt = function () {
      var a, e;
      for (ya && (a = es.domain) && a.exit(); (e = qt.get()); )
        try {
          e();
        } catch (t) {
          throw (qt.head && Xe(), t);
        }
      a && a.enter();
    };
  !hg && !ya && !fg && Zn && Jn
    ? ((ma = !0),
      (ba = Jn.createTextNode("")),
      new Zn(Qt).observe(ba, { characterData: !0 }),
      (Xe = function () {
        ba.data = ma = !ma;
      }))
    : !vg && Xt && Xt.resolve
      ? ((Wt = Xt.resolve(void 0)),
        (Wt.constructor = Xt),
        (ts = Kn(Wt.then, Wt)),
        (Xe = function () {
          ts(Qt);
        }))
      : ya
        ? (Xe = function () {
            es.nextTick(Qt);
          })
        : ((pa = Kn(pa, it)),
          (Xe = function () {
            pa(Qt);
          })),
    (Ka = function (a) {
      qt.head || Xe(), qt.add(a);
    });
}
var cg = Ka,
  gg = function (a, e) {
    try {
      arguments.length === 1 ? console.error(a) : console.error(a, e);
    } catch {}
  },
  _i = function (a) {
    try {
      return { error: !1, value: a() };
    } catch (e) {
      return { error: !0, value: e };
    }
  },
  dg = V,
  Pr = dg.Promise,
  pg = V,
  Tt = Pr,
  yg = B,
  mg = ru,
  bg = Ei,
  xg = z,
  rs = au,
  xa = xi;
Tt && Tt.prototype;
var Tg = xg("species"),
  Za = !1,
  bu = yg(pg.PromiseRejectionEvent),
  Og = mg("Promise", function () {
    var a = bg(Tt),
      e = a !== String(Tt);
    if (!e && xa === 66) return !0;
    if (!xa || xa < 51 || !/native code/.test(a)) {
      var t = new Tt(function (n) {
          n(1);
        }),
        r = function (n) {
          n(
            function () {},
            function () {},
          );
        },
        i = (t.constructor = {});
      if (((i[Tg] = r), (Za = t.then(function () {}) instanceof r), !Za))
        return !0;
    }
    return !e && (rs === "BROWSER" || rs === "DENO") && !bu;
  }),
  Rt = { CONSTRUCTOR: Og, REJECTION_EVENT: bu, SUBCLASSING: Za },
  lt = {},
  as = Te,
  Sg = TypeError,
  Eg = function (a) {
    var e, t;
    (this.promise = new a(function (r, i) {
      if (e !== void 0 || t !== void 0) throw new Sg("Bad Promise constructor");
      (e = r), (t = i);
    })),
      (this.resolve = as(e)),
      (this.reject = as(t));
  };
lt.f = function (a) {
  return new Eg(a);
};
var $g = ee,
  dr = wr,
  we = V,
  nt = Y,
  is = Ue,
  ns = iu,
  wg = Cr,
  Cg = ac,
  Ag = Te,
  ur = B,
  Pg = ve,
  Rg = sc,
  Ng = hu,
  xu = pu.set,
  Vi = cg,
  Ig = gg,
  Mg = _i,
  _g = mu,
  Tu = Er,
  pr = Pr,
  Di = Rt,
  Ou = lt,
  Rr = "Promise",
  Su = Di.CONSTRUCTOR,
  Vg = Di.REJECTION_EVENT,
  Dg = Di.SUBCLASSING,
  Ta = Tu.getterFor(Rr),
  kg = Tu.set,
  Qe = pr && pr.prototype,
  De = pr,
  Kt = Qe,
  Eu = we.TypeError,
  Ja = we.document,
  ki = we.process,
  ei = Ou.f,
  Lg = ei,
  Bg = !!(Ja && Ja.createEvent && we.dispatchEvent),
  $u = "unhandledrejection",
  jg = "rejectionhandled",
  ss = 0,
  wu = 1,
  Fg = 2,
  Li = 1,
  Cu = 2,
  Zt,
  os,
  Ug,
  us,
  Au = function (a) {
    var e;
    return Pg(a) && ur((e = a.then)) ? e : !1;
  },
  Pu = function (a, e) {
    var t = e.value,
      r = e.state === wu,
      i = r ? a.ok : a.fail,
      n = a.resolve,
      o = a.reject,
      s = a.domain,
      u,
      l,
      h;
    try {
      i
        ? (r || (e.rejection === Cu && zg(e), (e.rejection = Li)),
          i === !0
            ? (u = t)
            : (s && s.enter(), (u = i(t)), s && (s.exit(), (h = !0))),
          u === a.promise
            ? o(new Eu("Promise-chain cycle"))
            : (l = Au(u))
              ? nt(l, u, n, o)
              : n(u))
        : o(t);
    } catch (f) {
      s && !h && s.exit(), o(f);
    }
  },
  Ru = function (a, e) {
    a.notified ||
      ((a.notified = !0),
      Vi(function () {
        for (var t = a.reactions, r; (r = t.get()); ) Pu(r, a);
        (a.notified = !1), e && !a.rejection && Gg(a);
      }));
  },
  Nu = function (a, e, t) {
    var r, i;
    Bg
      ? ((r = Ja.createEvent("Event")),
        (r.promise = e),
        (r.reason = t),
        r.initEvent(a, !1, !0),
        we.dispatchEvent(r))
      : (r = { promise: e, reason: t }),
      !Vg && (i = we["on" + a])
        ? i(r)
        : a === $u && Ig("Unhandled promise rejection", t);
  },
  Gg = function (a) {
    nt(xu, we, function () {
      var e = a.facade,
        t = a.value,
        r = ls(a),
        i;
      if (
        r &&
        ((i = Mg(function () {
          dr ? ki.emit("unhandledRejection", t, e) : Nu($u, e, t);
        })),
        (a.rejection = dr || ls(a) ? Cu : Li),
        i.error)
      )
        throw i.value;
    });
  },
  ls = function (a) {
    return a.rejection !== Li && !a.parent;
  },
  zg = function (a) {
    nt(xu, we, function () {
      var e = a.facade;
      dr ? ki.emit("rejectionHandled", e) : Nu(jg, e, a.value);
    });
  },
  Je = function (a, e, t) {
    return function (r) {
      a(e, r, t);
    };
  },
  tt = function (a, e, t) {
    a.done ||
      ((a.done = !0), t && (a = t), (a.value = e), (a.state = Fg), Ru(a, !0));
  },
  ti = function (a, e, t) {
    if (!a.done) {
      (a.done = !0), t && (a = t);
      try {
        if (a.facade === e) throw new Eu("Promise can't be resolved itself");
        var r = Au(e);
        r
          ? Vi(function () {
              var i = { done: !1 };
              try {
                nt(r, e, Je(ti, i, a), Je(tt, i, a));
              } catch (n) {
                tt(i, n, a);
              }
            })
          : ((a.value = e), (a.state = wu), Ru(a, !1));
      } catch (i) {
        tt({ done: !1 }, i, a);
      }
    }
  };
if (
  Su &&
  ((De = function (e) {
    Rg(this, Kt), Ag(e), nt(Zt, this);
    var t = Ta(this);
    try {
      e(Je(ti, t), Je(tt, t));
    } catch (r) {
      tt(t, r);
    }
  }),
  (Kt = De.prototype),
  (Zt = function (e) {
    kg(this, {
      type: Rr,
      done: !1,
      notified: !1,
      parent: !1,
      reactions: new _g(),
      rejection: !1,
      state: ss,
      value: null,
    });
  }),
  (Zt.prototype = is(Kt, "then", function (e, t) {
    var r = Ta(this),
      i = ei(Ng(this, De));
    return (
      (r.parent = !0),
      (i.ok = ur(e) ? e : !0),
      (i.fail = ur(t) && t),
      (i.domain = dr ? ki.domain : void 0),
      r.state === ss
        ? r.reactions.add(i)
        : Vi(function () {
            Pu(i, r);
          }),
      i.promise
    );
  })),
  (os = function () {
    var a = new Zt(),
      e = Ta(a);
    (this.promise = a), (this.resolve = Je(ti, e)), (this.reject = Je(tt, e));
  }),
  (Ou.f = ei =
    function (a) {
      return a === De || a === Ug ? new os(a) : Lg(a);
    }),
  ur(pr) && Qe !== Object.prototype)
) {
  (us = Qe.then),
    Dg ||
      is(
        Qe,
        "then",
        function (e, t) {
          var r = this;
          return new De(function (i, n) {
            nt(us, r, i, n);
          }).then(e, t);
        },
        { unsafe: !0 },
      );
  try {
    delete Qe.constructor;
  } catch {}
  ns && ns(Qe, Kt);
}
$g({ global: !0, constructor: !0, wrap: !0, forced: Su }, { Promise: De });
wg(De, Rr, !1);
Cg(Rr);
var Nt = {},
  Hg = z,
  Yg = Nt,
  Xg = Hg("iterator"),
  Wg = Array.prototype,
  qg = function (a) {
    return a !== void 0 && (Yg.Array === a || Wg[Xg] === a);
  },
  Qg = Ri,
  hs = ot,
  Kg = je,
  Zg = Nt,
  Jg = z,
  ed = Jg("iterator"),
  Iu = function (a) {
    if (!Kg(a)) return hs(a, ed) || hs(a, "@@iterator") || Zg[Qg(a)];
  },
  td = Y,
  rd = Te,
  ad = J,
  id = xr,
  nd = Iu,
  sd = TypeError,
  od = function (a, e) {
    var t = arguments.length < 2 ? nd(a) : e;
    if (rd(t)) return ad(td(t, a));
    throw new sd(id(a) + " is not iterable");
  },
  ud = Y,
  vs = J,
  ld = ot,
  hd = function (a, e, t) {
    var r, i;
    vs(a);
    try {
      if (((r = ld(a, "return")), !r)) {
        if (e === "throw") throw t;
        return t;
      }
      r = ud(r, a);
    } catch (n) {
      (i = !0), (r = n);
    }
    if (e === "throw") throw t;
    if (i) throw r;
    return vs(r), t;
  },
  vd = Ii,
  fd = Y,
  cd = J,
  gd = xr,
  dd = qg,
  pd = Ai,
  fs = br,
  yd = od,
  md = Iu,
  cs = hd,
  bd = TypeError,
  lr = function (a, e) {
    (this.stopped = a), (this.result = e);
  },
  gs = lr.prototype,
  Mu = function (a, e, t) {
    var r = t && t.that,
      i = !!(t && t.AS_ENTRIES),
      n = !!(t && t.IS_RECORD),
      o = !!(t && t.IS_ITERATOR),
      s = !!(t && t.INTERRUPTED),
      u = vd(e, r),
      l,
      h,
      f,
      c,
      v,
      d,
      g,
      p = function (x) {
        return l && cs(l, "normal", x), new lr(!0, x);
      },
      y = function (x) {
        return i
          ? (cd(x), s ? u(x[0], x[1], p) : u(x[0], x[1]))
          : s
            ? u(x, p)
            : u(x);
      };
    if (n) l = a.iterator;
    else if (o) l = a;
    else {
      if (((h = md(a)), !h)) throw new bd(gd(a) + " is not iterable");
      if (dd(h)) {
        for (f = 0, c = pd(a); c > f; f++)
          if (((v = y(a[f])), v && fs(gs, v))) return v;
        return new lr(!1);
      }
      l = yd(a, h);
    }
    for (d = n ? a.next : l.next; !(g = fd(d, l)).done; ) {
      try {
        v = y(g.value);
      } catch (x) {
        cs(l, "throw", x);
      }
      if (typeof v == "object" && v && fs(gs, v)) return v;
    }
    return new lr(!1);
  },
  xd = z,
  _u = xd("iterator"),
  Vu = !1;
try {
  var Td = 0,
    ds = {
      next: function () {
        return { done: !!Td++ };
      },
      return: function () {
        Vu = !0;
      },
    };
  (ds[_u] = function () {
    return this;
  }),
    Array.from(ds, function () {
      throw 2;
    });
} catch {}
var Od = function (a, e) {
    try {
      if (!e && !Vu) return !1;
    } catch {
      return !1;
    }
    var t = !1;
    try {
      var r = {};
      (r[_u] = function () {
        return {
          next: function () {
            return { done: (t = !0) };
          },
        };
      }),
        a(r);
    } catch {}
    return t;
  },
  Sd = Pr,
  Ed = Od,
  $d = Rt.CONSTRUCTOR,
  Du =
    $d ||
    !Ed(function (a) {
      Sd.all(a).then(void 0, function () {});
    }),
  wd = ee,
  Cd = Y,
  Ad = Te,
  Pd = lt,
  Rd = _i,
  Nd = Mu,
  Id = Du;
wd(
  { target: "Promise", stat: !0, forced: Id },
  {
    all: function (e) {
      var t = this,
        r = Pd.f(t),
        i = r.resolve,
        n = r.reject,
        o = Rd(function () {
          var s = Ad(t.resolve),
            u = [],
            l = 0,
            h = 1;
          Nd(e, function (f) {
            var c = l++,
              v = !1;
            h++,
              Cd(s, t, f).then(function (d) {
                v || ((v = !0), (u[c] = d), --h || i(u));
              }, n);
          }),
            --h || i(u);
        });
      return o.error && n(o.value), r.promise;
    },
  },
);
var Md = ee,
  _d = Rt.CONSTRUCTOR,
  ri = Pr,
  Vd = Fe,
  Dd = B,
  kd = Ue,
  ps = ri && ri.prototype;
Md(
  { target: "Promise", proto: !0, forced: _d, real: !0 },
  {
    catch: function (a) {
      return this.then(void 0, a);
    },
  },
);
if (Dd(ri)) {
  var ys = Vd("Promise").prototype.catch;
  ps.catch !== ys && kd(ps, "catch", ys, { unsafe: !0 });
}
var Ld = ee,
  Bd = Y,
  jd = Te,
  Fd = lt,
  Ud = _i,
  Gd = Mu,
  zd = Du;
Ld(
  { target: "Promise", stat: !0, forced: zd },
  {
    race: function (e) {
      var t = this,
        r = Fd.f(t),
        i = r.reject,
        n = Ud(function () {
          var o = jd(t.resolve);
          Gd(e, function (s) {
            Bd(o, t, s).then(r.resolve, i);
          });
        });
      return n.error && i(n.value), r.promise;
    },
  },
);
var Hd = ee,
  Yd = lt,
  Xd = Rt.CONSTRUCTOR;
Hd(
  { target: "Promise", stat: !0, forced: Xd },
  {
    reject: function (e) {
      var t = Yd.f(this),
        r = t.reject;
      return r(e), t.promise;
    },
  },
);
var Wd = J,
  qd = ve,
  Qd = lt,
  Kd = function (a, e) {
    if ((Wd(a), qd(e) && e.constructor === a)) return e;
    var t = Qd.f(a),
      r = t.resolve;
    return r(e), t.promise;
  },
  Zd = ee,
  Jd = Fe,
  ep = Rt.CONSTRUCTOR,
  tp = Kd;
Jd("Promise");
Zd(
  { target: "Promise", stat: !0, forced: ep },
  {
    resolve: function (e) {
      return tp(this, e);
    },
  },
);
function ms(a, e, t, r, i, n, o) {
  try {
    var s = a[n](o),
      u = s.value;
  } catch (l) {
    return void t(l);
  }
  s.done ? e(u) : Promise.resolve(u).then(r, i);
}
function xe(a) {
  return function () {
    var e = this,
      t = arguments;
    return new Promise(function (r, i) {
      var n = a.apply(e, t);
      function o(u) {
        ms(n, r, i, o, s, "next", u);
      }
      function s(u) {
        ms(n, r, i, o, s, "throw", u);
      }
      o(void 0);
    });
  };
}
var rp = Ri,
  ap = String,
  pe = function (a) {
    if (rp(a) === "Symbol")
      throw new TypeError("Cannot convert a Symbol value to a string");
    return ap(a);
  },
  ip = J,
  ku = function () {
    var a = ip(this),
      e = "";
    return (
      a.hasIndices && (e += "d"),
      a.global && (e += "g"),
      a.ignoreCase && (e += "i"),
      a.multiline && (e += "m"),
      a.dotAll && (e += "s"),
      a.unicode && (e += "u"),
      a.unicodeSets && (e += "v"),
      a.sticky && (e += "y"),
      e
    );
  },
  Bi = k,
  np = V,
  ji = np.RegExp,
  Fi = Bi(function () {
    var a = ji("a", "y");
    return (a.lastIndex = 2), a.exec("abcd") !== null;
  });
Fi ||
  Bi(function () {
    return !ji("a", "y").sticky;
  });
var sp =
    Fi ||
    Bi(function () {
      var a = ji("^r", "gy");
      return (a.lastIndex = 2), a.exec("str") !== null;
    }),
  Lu = { BROKEN_CARET: sp, UNSUPPORTED_Y: Fi },
  Bu = {},
  op = eu,
  up = Pi,
  lp =
    Object.keys ||
    function (e) {
      return op(e, up);
    },
  hp = le,
  vp = Ho,
  fp = Oe,
  cp = J,
  gp = wt,
  dp = lp;
Bu.f =
  hp && !vp
    ? Object.defineProperties
    : function (e, t) {
        cp(e);
        for (var r = gp(t), i = dp(t), n = i.length, o = 0, s; n > o; )
          fp.f(e, (s = i[o++]), r[s]);
        return e;
      };
var pp = J,
  yp = Bu,
  bs = Pi,
  mp = wi,
  bp = cu,
  xp = Or,
  Tp = $i,
  xs = ">",
  Ts = "<",
  ai = "prototype",
  ii = "script",
  ju = Tp("IE_PROTO"),
  Oa = function () {},
  Fu = function (a) {
    return Ts + ii + xs + a + Ts + "/" + ii + xs;
  },
  Os = function (a) {
    a.write(Fu("")), a.close();
    var e = a.parentWindow.Object;
    return (a = null), e;
  },
  Op = function () {
    var a = xp("iframe"),
      e = "java" + ii + ":",
      t;
    return (
      (a.style.display = "none"),
      bp.appendChild(a),
      (a.src = String(e)),
      (t = a.contentWindow.document),
      t.open(),
      t.write(Fu("document.F=Object")),
      t.close(),
      t.F
    );
  },
  Jt,
  hr = function () {
    try {
      Jt = new ActiveXObject("htmlfile");
    } catch {}
    hr =
      typeof document < "u" ? (document.domain && Jt ? Os(Jt) : Op()) : Os(Jt);
    for (var a = bs.length; a--; ) delete hr[ai][bs[a]];
    return hr();
  };
mp[ju] = !0;
var Ui =
    Object.create ||
    function (e, t) {
      var r;
      return (
        e !== null
          ? ((Oa[ai] = pp(e)), (r = new Oa()), (Oa[ai] = null), (r[ju] = e))
          : (r = hr()),
        t === void 0 ? r : yp.f(r, t)
      );
    },
  Sp = k,
  Ep = V,
  $p = Ep.RegExp,
  wp = Sp(function () {
    var a = $p(".", "s");
    return !(
      a.dotAll &&
      a.test(`
`) &&
      a.flags === "s"
    );
  }),
  Cp = k,
  Ap = V,
  Pp = Ap.RegExp,
  Rp = Cp(function () {
    var a = Pp("(?<a>b)", "g");
    return a.exec("b").groups.a !== "b" || "b".replace(a, "$<a>c") !== "bc";
  }),
  et = Y,
  Nr = L,
  Np = pe,
  Ip = ku,
  Mp = Lu,
  _p = Si,
  Vp = Ui,
  Dp = Er.get,
  kp = wp,
  Lp = Rp,
  Bp = _p("native-string-replace", String.prototype.replace),
  yr = RegExp.prototype.exec,
  ni = yr,
  jp = Nr("".charAt),
  Fp = Nr("".indexOf),
  Up = Nr("".replace),
  Sa = Nr("".slice),
  si = (function () {
    var a = /a/,
      e = /b*/g;
    return (
      et(yr, a, "a"), et(yr, e, "a"), a.lastIndex !== 0 || e.lastIndex !== 0
    );
  })(),
  Uu = Mp.BROKEN_CARET,
  oi = /()??/.exec("")[1] !== void 0,
  Gp = si || oi || Uu || kp || Lp;
Gp &&
  (ni = function (e) {
    var t = this,
      r = Dp(t),
      i = Np(e),
      n = r.raw,
      o,
      s,
      u,
      l,
      h,
      f,
      c;
    if (n)
      return (
        (n.lastIndex = t.lastIndex),
        (o = et(ni, n, i)),
        (t.lastIndex = n.lastIndex),
        o
      );
    var v = r.groups,
      d = Uu && t.sticky,
      g = et(Ip, t),
      p = t.source,
      y = 0,
      x = i;
    if (
      (d &&
        ((g = Up(g, "y", "")),
        Fp(g, "g") === -1 && (g += "g"),
        (x = Sa(i, t.lastIndex)),
        t.lastIndex > 0 &&
          (!t.multiline ||
            (t.multiline &&
              jp(i, t.lastIndex - 1) !==
                `
`)) &&
          ((p = "(?: " + p + ")"), (x = " " + x), y++),
        (s = new RegExp("^(?:" + p + ")", g))),
      oi && (s = new RegExp("^" + p + "$(?!\\s)", g)),
      si && (u = t.lastIndex),
      (l = et(yr, d ? s : t, x)),
      d
        ? l
          ? ((l.input = Sa(l.input, y)),
            (l[0] = Sa(l[0], y)),
            (l.index = t.lastIndex),
            (t.lastIndex += l[0].length))
          : (t.lastIndex = 0)
        : si && l && (t.lastIndex = t.global ? l.index + l[0].length : u),
      oi &&
        l &&
        l.length > 1 &&
        et(Bp, l[0], s, function () {
          for (h = 1; h < arguments.length - 2; h++)
            arguments[h] === void 0 && (l[h] = void 0);
        }),
      l && v)
    )
      for (l.groups = f = Vp(null), h = 0; h < v.length; h++)
        (c = v[h]), (f[c[0]] = l[c[1]]);
    return l;
  });
var Gi = ni,
  zp = ee,
  Ss = Gi;
zp({ target: "RegExp", proto: !0, forced: /./.exec !== Ss }, { exec: Ss });
var Es = Y,
  $s = Ue,
  Hp = Gi,
  ws = k,
  Gu = z,
  Yp = At,
  Xp = Gu("species"),
  Ea = RegExp.prototype,
  zi = function (a, e, t, r) {
    var i = Gu(a),
      n = !ws(function () {
        var l = {};
        return (
          (l[i] = function () {
            return 7;
          }),
          ""[a](l) !== 7
        );
      }),
      o =
        n &&
        !ws(function () {
          var l = !1,
            h = /a/;
          return (
            a === "split" &&
              ((h = {}),
              (h.constructor = {}),
              (h.constructor[Xp] = function () {
                return h;
              }),
              (h.flags = ""),
              (h[i] = /./[i])),
            (h.exec = function () {
              return (l = !0), null;
            }),
            h[i](""),
            !l
          );
        });
    if (!n || !o || t) {
      var s = /./[i],
        u = e(i, ""[a], function (l, h, f, c, v) {
          var d = h.exec;
          return d === Hp || d === Ea.exec
            ? n && !v
              ? { done: !0, value: Es(s, h, f, c) }
              : { done: !0, value: Es(l, f, h, c) }
            : { done: !1 };
        });
      $s(String.prototype, a, u[0]), $s(Ea, i, u[1]);
    }
    r && Yp(Ea[i], "sham", !0);
  },
  Hi = L,
  Wp = $r,
  qp = pe,
  Qp = he,
  Kp = Hi("".charAt),
  Cs = Hi("".charCodeAt),
  Zp = Hi("".slice),
  Jp = function (a) {
    return function (e, t) {
      var r = qp(Qp(e)),
        i = Wp(t),
        n = r.length,
        o,
        s;
      return i < 0 || i >= n
        ? a
          ? ""
          : void 0
        : ((o = Cs(r, i)),
          o < 55296 ||
          o > 56319 ||
          i + 1 === n ||
          (s = Cs(r, i + 1)) < 56320 ||
          s > 57343
            ? a
              ? Kp(r, i)
              : o
            : a
              ? Zp(r, i, i + 2)
              : ((o - 55296) << 10) + (s - 56320) + 65536);
    };
  },
  ey = { charAt: Jp(!0) },
  ty = ey.charAt,
  Yi = function (a, e, t) {
    return e + (t ? ty(a, e).length : 1);
  },
  As = Y,
  ry = J,
  ay = B,
  iy = Be,
  ny = Gi,
  sy = TypeError,
  Xi = function (a, e) {
    var t = a.exec;
    if (ay(t)) {
      var r = As(t, a, e);
      return r !== null && ry(r), r;
    }
    if (iy(a) === "RegExp") return As(ny, a, e);
    throw new sy("RegExp#exec called on incompatible receiver");
  },
  oy = Y,
  uy = zi,
  ly = J,
  hy = je,
  vy = ut,
  $a = pe,
  fy = he,
  cy = ot,
  gy = Yi,
  Ps = Xi;
uy("match", function (a, e, t) {
  return [
    function (i) {
      var n = fy(this),
        o = hy(i) ? void 0 : cy(i, a);
      return o ? oy(o, i, n) : new RegExp(i)[a]($a(n));
    },
    function (r) {
      var i = ly(this),
        n = $a(r),
        o = t(e, i, n);
      if (o.done) return o.value;
      if (!i.global) return Ps(i, n);
      var s = i.unicode;
      i.lastIndex = 0;
      for (var u = [], l = 0, h; (h = Ps(i, n)) !== null; ) {
        var f = $a(h[0]);
        (u[l] = f), f === "" && (i.lastIndex = gy(n, vy(i.lastIndex), s)), l++;
      }
      return l === 0 ? null : u;
    },
  ];
});
var Wi = L,
  dy = Tr,
  py = Math.floor,
  wa = Wi("".charAt),
  yy = Wi("".replace),
  Ca = Wi("".slice),
  my = /\$([$&'`]|\d{1,2}|<[^>]*>)/g,
  by = /\$([$&'`]|\d{1,2})/g,
  xy = function (a, e, t, r, i, n) {
    var o = t + a.length,
      s = r.length,
      u = by;
    return (
      i !== void 0 && ((i = dy(i)), (u = my)),
      yy(n, u, function (l, h) {
        var f;
        switch (wa(h, 0)) {
          case "$":
            return "$";
          case "&":
            return a;
          case "`":
            return Ca(e, 0, t);
          case "'":
            return Ca(e, o);
          case "<":
            f = i[Ca(h, 1, -1)];
            break;
          default:
            var c = +h;
            if (c === 0) return l;
            if (c > s) {
              var v = py(c / 10);
              return v === 0
                ? l
                : v <= s
                  ? r[v - 1] === void 0
                    ? wa(h, 1)
                    : r[v - 1] + wa(h, 1)
                  : l;
            }
            f = r[c - 1];
        }
        return f === void 0 ? "" : f;
      })
    );
  },
  Ty = fu,
  Rs = Y,
  Ir = L,
  Oy = zi,
  Sy = k,
  Ey = J,
  $y = B,
  wy = je,
  Cy = $r,
  Ay = ut,
  We = pe,
  Py = he,
  Ry = Yi,
  Ny = ot,
  Iy = xy,
  My = Xi,
  _y = z,
  ui = _y("replace"),
  Vy = Math.max,
  Dy = Math.min,
  ky = Ir([].concat),
  Aa = Ir([].push),
  Ns = Ir("".indexOf),
  Is = Ir("".slice),
  Ly = function (a) {
    return a === void 0 ? a : String(a);
  },
  By = (function () {
    return "a".replace(/./, "$0") === "$0";
  })(),
  Ms = (function () {
    return /./[ui] ? /./[ui]("a", "$0") === "" : !1;
  })(),
  jy = !Sy(function () {
    var a = /./;
    return (
      (a.exec = function () {
        var e = [];
        return (e.groups = { a: "7" }), e;
      }),
      "".replace(a, "$<a>") !== "7"
    );
  });
Oy(
  "replace",
  function (a, e, t) {
    var r = Ms ? "$" : "$0";
    return [
      function (n, o) {
        var s = Py(this),
          u = wy(n) ? void 0 : Ny(n, ui);
        return u ? Rs(u, n, s, o) : Rs(e, We(s), n, o);
      },
      function (i, n) {
        var o = Ey(this),
          s = We(i);
        if (typeof n == "string" && Ns(n, r) === -1 && Ns(n, "$<") === -1) {
          var u = t(e, o, s, n);
          if (u.done) return u.value;
        }
        var l = $y(n);
        l || (n = We(n));
        var h = o.global,
          f;
        h && ((f = o.unicode), (o.lastIndex = 0));
        for (var c = [], v; (v = My(o, s)), !(v === null || (Aa(c, v), !h)); ) {
          var d = We(v[0]);
          d === "" && (o.lastIndex = Ry(s, Ay(o.lastIndex), f));
        }
        for (var g = "", p = 0, y = 0; y < c.length; y++) {
          v = c[y];
          for (
            var x = We(v[0]),
              b = Vy(Dy(Cy(v.index), s.length), 0),
              T = [],
              $,
              E = 1;
            E < v.length;
            E++
          )
            Aa(T, Ly(v[E]));
          var O = v.groups;
          if (l) {
            var C = ky([x], T, b, s);
            O !== void 0 && Aa(C, O), ($ = We(Ty(n, void 0, C)));
          } else $ = Iy(x, s, b, T, O, n);
          b >= p && ((g += Is(s, p, b) + $), (p = b + x.length));
        }
        return g + Is(s, p);
      },
    ];
  },
  !jy || !By || Ms,
);
var Fy = ve,
  Uy = Be,
  Gy = z,
  zy = Gy("match"),
  Hy = function (a) {
    var e;
    return Fy(a) && ((e = a[zy]) !== void 0 ? !!e : Uy(a) === "RegExp");
  },
  Yy = Hy,
  Xy = TypeError,
  qi = function (a) {
    if (Yy(a)) throw new Xy("The method doesn't accept regular expressions");
    return a;
  },
  Wy = z,
  qy = Wy("match"),
  Qi = function (a) {
    var e = /./;
    try {
      "/./"[a](e);
    } catch {
      try {
        return (e[qy] = !1), "/./"[a](e);
      } catch {}
    }
    return !1;
  },
  Qy = ee,
  Ky = Ar,
  Zy = $t.f,
  Jy = ut,
  _s = pe,
  em = qi,
  tm = he,
  rm = Qi,
  am = Ky("".slice),
  im = Math.min,
  zu = rm("startsWith"),
  nm =
    !zu &&
    !!(function () {
      var a = Zy(String.prototype, "startsWith");
      return a && !a.writable;
    })();
Qy(
  { target: "String", proto: !0, forced: !nm && !zu },
  {
    startsWith: function (e) {
      var t = _s(tm(this));
      em(e);
      var r = Jy(im(arguments.length > 1 ? arguments[1] : void 0, t.length)),
        i = _s(e);
      return am(t, r, r + i.length) === i;
    },
  },
);
var sm = z,
  om = Ui,
  um = Oe.f,
  li = sm("unscopables"),
  hi = Array.prototype;
hi[li] === void 0 && um(hi, li, { configurable: !0, value: om(null) });
var lm = function (a) {
    hi[li][a] = !0;
  },
  hm = k,
  vm = !hm(function () {
    function a() {}
    return (
      (a.prototype.constructor = null),
      Object.getPrototypeOf(new a()) !== a.prototype
    );
  }),
  fm = fe,
  cm = B,
  gm = Tr,
  dm = $i,
  pm = vm,
  Vs = dm("IE_PROTO"),
  vi = Object,
  ym = vi.prototype,
  Hu = pm
    ? vi.getPrototypeOf
    : function (a) {
        var e = gm(a);
        if (fm(e, Vs)) return e[Vs];
        var t = e.constructor;
        return cm(t) && e instanceof t
          ? t.prototype
          : e instanceof vi
            ? ym
            : null;
      },
  mm = k,
  bm = B,
  xm = ve,
  Ds = Hu,
  Tm = Ue,
  Om = z,
  fi = Om("iterator"),
  Yu = !1,
  ke,
  Pa,
  Ra;
[].keys &&
  ((Ra = [].keys()),
  "next" in Ra
    ? ((Pa = Ds(Ds(Ra))), Pa !== Object.prototype && (ke = Pa))
    : (Yu = !0));
var Sm =
  !xm(ke) ||
  mm(function () {
    var a = {};
    return ke[fi].call(a) !== a;
  });
Sm && (ke = {});
bm(ke[fi]) ||
  Tm(ke, fi, function () {
    return this;
  });
var Xu = { IteratorPrototype: ke, BUGGY_SAFARI_ITERATORS: Yu },
  Em = Xu.IteratorPrototype,
  $m = Ui,
  wm = bi,
  Cm = Cr,
  Am = Nt,
  Pm = function () {
    return this;
  },
  Rm = function (a, e, t, r) {
    var i = e + " Iterator";
    return (
      (a.prototype = $m(Em, { next: wm(+!r, t) })),
      Cm(a, i, !1),
      (Am[i] = Pm),
      a
    );
  },
  Nm = ee,
  Im = Y,
  Wu = Sr,
  Mm = B,
  _m = Rm,
  ks = Hu,
  Ls = iu,
  Vm = Cr,
  Dm = At,
  Na = Ue,
  km = z,
  Lm = Nt,
  qu = Xu,
  Bm = Wu.PROPER,
  jm = Wu.CONFIGURABLE,
  Bs = qu.IteratorPrototype,
  er = qu.BUGGY_SAFARI_ITERATORS,
  gt = km("iterator"),
  js = "keys",
  dt = "values",
  Fs = "entries",
  Fm = function () {
    return this;
  },
  Um = function (a, e, t, r, i, n, o) {
    _m(t, e, r);
    var s = function (y) {
        if (y === i && c) return c;
        if (!er && y && y in h) return h[y];
        switch (y) {
          case js:
            return function () {
              return new t(this, y);
            };
          case dt:
            return function () {
              return new t(this, y);
            };
          case Fs:
            return function () {
              return new t(this, y);
            };
        }
        return function () {
          return new t(this);
        };
      },
      u = e + " Iterator",
      l = !1,
      h = a.prototype,
      f = h[gt] || h["@@iterator"] || (i && h[i]),
      c = (!er && f) || s(i),
      v = (e === "Array" && h.entries) || f,
      d,
      g,
      p;
    if (
      (v &&
        ((d = ks(v.call(new a()))),
        d !== Object.prototype &&
          d.next &&
          (ks(d) !== Bs && (Ls ? Ls(d, Bs) : Mm(d[gt]) || Na(d, gt, Fm)),
          Vm(d, u, !0))),
      Bm &&
        i === dt &&
        f &&
        f.name !== dt &&
        (jm
          ? Dm(h, "name", dt)
          : ((l = !0),
            (c = function () {
              return Im(f, this);
            }))),
      i)
    )
      if (((g = { values: s(dt), keys: n ? c : s(js), entries: s(Fs) }), o))
        for (p in g) (er || l || !(p in h)) && Na(h, p, g[p]);
      else Nm({ target: e, proto: !0, forced: er || l }, g);
    return h[gt] !== c && Na(h, gt, c, { name: i }), (Lm[e] = c), g;
  },
  Gm = function (a, e) {
    return { value: a, done: e };
  },
  zm = wt,
  Ki = lm,
  Us = Nt,
  Qu = Er,
  Hm = Oe.f,
  Ym = Um,
  tr = Gm,
  Xm = le,
  Ku = "Array Iterator",
  Wm = Qu.set,
  qm = Qu.getterFor(Ku),
  Qm = Ym(
    Array,
    "Array",
    function (a, e) {
      Wm(this, { type: Ku, target: zm(a), index: 0, kind: e });
    },
    function () {
      var a = qm(this),
        e = a.target,
        t = a.index++;
      if (!e || t >= e.length) return (a.target = null), tr(void 0, !0);
      switch (a.kind) {
        case "keys":
          return tr(t, !1);
        case "values":
          return tr(e[t], !1);
      }
      return tr([t, e[t]], !1);
    },
    "values",
  ),
  Gs = (Us.Arguments = Us.Array);
Ki("keys");
Ki("values");
Ki("entries");
if (Xm && Gs.name !== "values")
  try {
    Hm(Gs, "name", { value: "values" });
  } catch {}
var Km = {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0,
  },
  Zm = Or,
  Ia = Zm("span").classList,
  zs = Ia && Ia.constructor && Ia.constructor.prototype,
  Jm = zs === Object.prototype ? void 0 : zs,
  Hs = V,
  Zu = Km,
  e0 = Jm,
  yt = Qm,
  Ys = At,
  t0 = Cr,
  r0 = z,
  Ma = r0("iterator"),
  _a = yt.values,
  Ju = function (a, e) {
    if (a) {
      if (a[Ma] !== _a)
        try {
          Ys(a, Ma, _a);
        } catch {
          a[Ma] = _a;
        }
      if ((t0(a, e, !0), Zu[e])) {
        for (var t in yt)
          if (a[t] !== yt[t])
            try {
              Ys(a, t, yt[t]);
            } catch {
              a[t] = yt[t];
            }
      }
    }
  };
for (var Va in Zu) Ju(Hs[Va] && Hs[Va].prototype, Va);
Ju(e0, "DOMTokenList");
function a0(a, e) {
  if (Ga(a) != "object" || !a) return a;
  var t = a[Symbol.toPrimitive];
  if (t !== void 0) {
    var r = t.call(a, e);
    if (Ga(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(a);
}
function i0(a) {
  var e = a0(a, "string");
  return Ga(e) == "symbol" ? e : e + "";
}
function Zi(a, e, t) {
  return (
    (e = i0(e)) in a
      ? Object.defineProperty(a, e, {
          value: t,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (a[e] = t),
    a
  );
}
var n0 = Te,
  s0 = Tr,
  o0 = Do,
  u0 = Ai,
  Xs = TypeError,
  Ws = "Reduce of empty array with no initial value",
  l0 = function (a) {
    return function (e, t, r, i) {
      var n = s0(e),
        o = o0(n),
        s = u0(n);
      if ((n0(t), s === 0 && r < 2)) throw new Xs(Ws);
      var u = a ? s - 1 : 0,
        l = a ? -1 : 1;
      if (r < 2)
        for (;;) {
          if (u in o) {
            (i = o[u]), (u += l);
            break;
          }
          if (((u += l), a ? u < 0 : s <= u)) throw new Xs(Ws);
        }
      for (; a ? u >= 0 : s > u; u += l) u in o && (i = t(i, o[u], u, n));
      return i;
    };
  },
  h0 = { left: l0(!1) },
  v0 = k,
  el = function (a, e) {
    var t = [][a];
    return (
      !!t &&
      v0(function () {
        t.call(
          null,
          e ||
            function () {
              return 1;
            },
          1,
        );
      })
    );
  },
  f0 = ee,
  c0 = h0.left,
  g0 = el,
  qs = xi,
  d0 = wr,
  p0 = !d0 && qs > 79 && qs < 83,
  y0 = p0 || !g0("reduce");
f0(
  { target: "Array", proto: !0, forced: y0 },
  {
    reduce: function (e) {
      var t = arguments.length;
      return c0(this, e, t, t > 1 ? arguments[1] : void 0);
    },
  },
);
var m0 = ee,
  b0 = Ar,
  x0 = $t.f,
  T0 = ut,
  Qs = pe,
  O0 = qi,
  S0 = he,
  E0 = Qi,
  $0 = b0("".slice),
  w0 = Math.min,
  tl = E0("endsWith"),
  C0 =
    !tl &&
    !!(function () {
      var a = x0(String.prototype, "endsWith");
      return a && !a.writable;
    })();
m0(
  { target: "String", proto: !0, forced: !C0 && !tl },
  {
    endsWith: function (e) {
      var t = Qs(S0(this));
      O0(e);
      var r = arguments.length > 1 ? arguments[1] : void 0,
        i = t.length,
        n = r === void 0 ? i : w0(T0(r), i),
        o = Qs(e);
      return $0(t, n - o.length, n) === o;
    },
  },
);
var Da = Y,
  rl = L,
  A0 = zi,
  P0 = J,
  R0 = je,
  N0 = he,
  I0 = hu,
  M0 = Yi,
  _0 = ut,
  Ks = pe,
  V0 = ot,
  Zs = Xi,
  D0 = Lu,
  k0 = k,
  qe = D0.UNSUPPORTED_Y,
  L0 = 4294967295,
  B0 = Math.min,
  ka = rl([].push),
  La = rl("".slice),
  j0 = !k0(function () {
    var a = /(?:)/,
      e = a.exec;
    a.exec = function () {
      return e.apply(this, arguments);
    };
    var t = "ab".split(a);
    return t.length !== 2 || t[0] !== "a" || t[1] !== "b";
  }),
  Js =
    "abbc".split(/(b)*/)[1] === "c" ||
    "test".split(/(?:)/, -1).length !== 4 ||
    "ab".split(/(?:ab)*/).length !== 2 ||
    ".".split(/(.?)(.?)/).length !== 4 ||
    ".".split(/()()/).length > 1 ||
    "".split(/.?/).length;
A0(
  "split",
  function (a, e, t) {
    var r = "0".split(void 0, 0).length
      ? function (i, n) {
          return i === void 0 && n === 0 ? [] : Da(e, this, i, n);
        }
      : e;
    return [
      function (n, o) {
        var s = N0(this),
          u = R0(n) ? void 0 : V0(n, a);
        return u ? Da(u, n, s, o) : Da(r, Ks(s), n, o);
      },
      function (i, n) {
        var o = P0(this),
          s = Ks(i);
        if (!Js) {
          var u = t(r, o, s, n, r !== e);
          if (u.done) return u.value;
        }
        var l = I0(o, RegExp),
          h = o.unicode,
          f =
            (o.ignoreCase ? "i" : "") +
            (o.multiline ? "m" : "") +
            (o.unicode ? "u" : "") +
            (qe ? "g" : "y"),
          c = new l(qe ? "^(?:" + o.source + ")" : o, f),
          v = n === void 0 ? L0 : n >>> 0;
        if (v === 0) return [];
        if (s.length === 0) return Zs(c, s) === null ? [s] : [];
        for (var d = 0, g = 0, p = []; g < s.length; ) {
          c.lastIndex = qe ? 0 : g;
          var y = Zs(c, qe ? La(s, g) : s),
            x;
          if (
            y === null ||
            (x = B0(_0(c.lastIndex + (qe ? g : 0)), s.length)) === d
          )
            g = M0(s, g, h);
          else {
            if ((ka(p, La(s, d, g)), p.length === v)) return p;
            for (var b = 1; b <= y.length - 1; b++)
              if ((ka(p, y[b]), p.length === v)) return p;
            g = d = x;
          }
        }
        return ka(p, La(s, d)), p;
      },
    ];
  },
  Js || !j0,
  qe,
);
var Mr = { exports: {} },
  mt = { exports: {} };
(function () {
  var a, e, t, r, i, n;
  typeof performance < "u" && performance !== null && performance.now
    ? (mt.exports = function () {
        return performance.now();
      })
    : typeof process < "u" && process !== null && process.hrtime
      ? ((mt.exports = function () {
          return (a() - i) / 1e6;
        }),
        (e = process.hrtime),
        (a = function () {
          var o;
          return (o = e()), o[0] * 1e9 + o[1];
        }),
        (r = a()),
        (n = process.uptime() * 1e9),
        (i = r - n))
      : Date.now
        ? ((mt.exports = function () {
            return Date.now() - t;
          }),
          (t = Date.now()))
        : ((mt.exports = function () {
            return new Date().getTime() - t;
          }),
          (t = new Date().getTime()));
}).call(Ke);
var F0 = mt.exports,
  U0 = F0,
  be = typeof window > "u" ? Ke : window,
  rr = ["moz", "webkit"],
  rt = "AnimationFrame",
  st = be["request" + rt],
  Et = be["cancel" + rt] || be["cancelRequest" + rt];
for (var pt = 0; !st && pt < rr.length; pt++)
  (st = be[rr[pt] + "Request" + rt]),
    (Et = be[rr[pt] + "Cancel" + rt] || be[rr[pt] + "CancelRequest" + rt]);
if (!st || !Et) {
  var Ba = 0,
    eo = 0,
    Me = [],
    G0 = 1e3 / 60;
  (st = function (a) {
    if (Me.length === 0) {
      var e = U0(),
        t = Math.max(0, G0 - (e - Ba));
      (Ba = t + e),
        setTimeout(function () {
          var r = Me.slice(0);
          Me.length = 0;
          for (var i = 0; i < r.length; i++)
            if (!r[i].cancelled)
              try {
                r[i].callback(Ba);
              } catch (n) {
                setTimeout(function () {
                  throw n;
                }, 0);
              }
        }, Math.round(t));
    }
    return Me.push({ handle: ++eo, callback: a, cancelled: !1 }), eo;
  }),
    (Et = function (a) {
      for (var e = 0; e < Me.length; e++)
        Me[e].handle === a && (Me[e].cancelled = !0);
    });
}
Mr.exports = function (a) {
  return st.call(be, a);
};
Mr.exports.cancel = function () {
  Et.apply(be, arguments);
};
Mr.exports.polyfill = function (a) {
  a || (a = be), (a.requestAnimationFrame = st), (a.cancelAnimationFrame = Et);
};
var z0 = Mr.exports;
const ja = Po(z0);
var al = `	
\v\f\r                　\u2028\u2029\uFEFF`,
  H0 = L,
  Y0 = he,
  X0 = pe,
  ci = al,
  to = H0("".replace),
  W0 = RegExp("^[" + ci + "]+"),
  q0 = RegExp("(^|[^" + ci + "])[" + ci + "]+$"),
  Q0 = function (a) {
    return function (e) {
      var t = X0(Y0(e));
      return a & 1 && (t = to(t, W0, "")), a & 2 && (t = to(t, q0, "$1")), t;
    };
  },
  K0 = { trim: Q0(3) },
  Z0 = Sr.PROPER,
  J0 = k,
  ro = al,
  ao = "​᠎",
  eb = function (a) {
    return J0(function () {
      return !!ro[a]() || ao[a]() !== ao || (Z0 && ro[a].name !== a);
    });
  },
  tb = ee,
  rb = K0.trim,
  ab = eb;
tb(
  { target: "String", proto: !0, forced: ab("trim") },
  {
    trim: function () {
      return rb(this);
    },
  },
);
var ib = function (a) {
  (this.ok = !1),
    (this.alpha = 1),
    a.charAt(0) == "#" && (a = a.substr(1, 6)),
    (a = a.replace(/ /g, "")),
    (a = a.toLowerCase());
  var e = {
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
    rebeccapurple: "663399",
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
  };
  a = e[a] || a;
  for (
    var t = [
        {
          re: /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*((?:\d?\.)?\d)\)$/,
          example: ["rgba(123, 234, 45, 0.8)", "rgba(255,234,245,1.0)"],
          process: function (u) {
            return [
              parseInt(u[1]),
              parseInt(u[2]),
              parseInt(u[3]),
              parseFloat(u[4]),
            ];
          },
        },
        {
          re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
          example: ["rgb(123, 234, 45)", "rgb(255,234,245)"],
          process: function (u) {
            return [parseInt(u[1]), parseInt(u[2]), parseInt(u[3])];
          },
        },
        {
          re: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
          example: ["#00ff00", "336699"],
          process: function (u) {
            return [parseInt(u[1], 16), parseInt(u[2], 16), parseInt(u[3], 16)];
          },
        },
        {
          re: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
          example: ["#fb0", "f0f"],
          process: function (u) {
            return [
              parseInt(u[1] + u[1], 16),
              parseInt(u[2] + u[2], 16),
              parseInt(u[3] + u[3], 16),
            ];
          },
        },
      ],
      r = 0;
    r < t.length;
    r++
  ) {
    var i = t[r].re,
      n = t[r].process,
      o = i.exec(a);
    if (o) {
      var s = n(o);
      (this.r = s[0]),
        (this.g = s[1]),
        (this.b = s[2]),
        s.length > 3 && (this.alpha = s[3]),
        (this.ok = !0);
    }
  }
  (this.r = this.r < 0 || isNaN(this.r) ? 0 : this.r > 255 ? 255 : this.r),
    (this.g = this.g < 0 || isNaN(this.g) ? 0 : this.g > 255 ? 255 : this.g),
    (this.b = this.b < 0 || isNaN(this.b) ? 0 : this.b > 255 ? 255 : this.b),
    (this.alpha =
      this.alpha < 0
        ? 0
        : this.alpha > 1 || isNaN(this.alpha)
          ? 1
          : this.alpha),
    (this.toRGB = function () {
      return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
    }),
    (this.toRGBA = function () {
      return (
        "rgba(" +
        this.r +
        ", " +
        this.g +
        ", " +
        this.b +
        ", " +
        this.alpha +
        ")"
      );
    }),
    (this.toHex = function () {
      var u = this.r.toString(16),
        l = this.g.toString(16),
        h = this.b.toString(16);
      return (
        u.length == 1 && (u = "0" + u),
        l.length == 1 && (l = "0" + l),
        h.length == 1 && (h = "0" + h),
        "#" + u + l + h
      );
    }),
    (this.getHelpXML = function () {
      for (var u = new Array(), l = 0; l < t.length; l++)
        for (var h = t[l].example, f = 0; f < h.length; f++) u[u.length] = h[f];
      for (var c in e) u[u.length] = c;
      var v = document.createElement("ul");
      v.setAttribute("id", "rgbcolor-examples");
      for (var l = 0; l < u.length; l++)
        try {
          var d = document.createElement("li"),
            g = new RGBColor(u[l]),
            p = document.createElement("div");
          (p.style.cssText =
            "margin: 3px; border: 1px solid black; background:" +
            g.toHex() +
            "; color:" +
            g.toHex()),
            p.appendChild(document.createTextNode("test"));
          var y = document.createTextNode(
            " " + u[l] + " -> " + g.toRGB() + " -> " + g.toHex(),
          );
          d.appendChild(p), d.appendChild(y), v.appendChild(d);
        } catch {}
      return v;
    });
};
const gi = Po(ib);
var nb = ee,
  sb = Ar,
  ob = Jo.indexOf,
  ub = el,
  di = sb([].indexOf),
  il = !!di && 1 / di([1], 1, -0) < 0,
  lb = il || !ub("indexOf");
nb(
  { target: "Array", proto: !0, forced: lb },
  {
    indexOf: function (e) {
      var t = arguments.length > 1 ? arguments[1] : void 0;
      return il ? di(this, e, t) || 0 : ob(this, e, t);
    },
  },
);
var hb = ee,
  vb = L,
  fb = qi,
  cb = he,
  io = pe,
  gb = Qi,
  db = vb("".indexOf);
hb(
  { target: "String", proto: !0, forced: !gb("includes") },
  {
    includes: function (e) {
      return !!~db(
        io(cb(this)),
        io(fb(e)),
        arguments.length > 1 ? arguments[1] : void 0,
      );
    },
  },
);
var pb = Be,
  yb =
    Array.isArray ||
    function (e) {
      return pb(e) === "Array";
    },
  mb = ee,
  bb = L,
  xb = yb,
  Tb = bb([].reverse),
  no = [1, 2];
mb(
  { target: "Array", proto: !0, forced: String(no) === String(no.reverse()) },
  {
    reverse: function () {
      return xb(this) && (this.length = this.length), Tb(this);
    },
  },
);
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var nl =
  function (a, e) {
    return (nl =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function (t, r) {
          t.__proto__ = r;
        }) ||
      function (t, r) {
        for (var i in r)
          Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]);
      })(a, e);
  };
function sl(a, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError(
      "Class extends value " + String(e) + " is not a constructor or null",
    );
  function t() {
    this.constructor = a;
  }
  nl(a, e),
    (a.prototype =
      e === null ? Object.create(e) : ((t.prototype = e.prototype), new t()));
}
function Ob(a) {
  var e = "";
  Array.isArray(a) || (a = [a]);
  for (var t = 0; t < a.length; t++) {
    var r = a[t];
    if (r.type === m.CLOSE_PATH) e += "z";
    else if (r.type === m.HORIZ_LINE_TO) e += (r.relative ? "h" : "H") + r.x;
    else if (r.type === m.VERT_LINE_TO) e += (r.relative ? "v" : "V") + r.y;
    else if (r.type === m.MOVE_TO)
      e += (r.relative ? "m" : "M") + r.x + " " + r.y;
    else if (r.type === m.LINE_TO)
      e += (r.relative ? "l" : "L") + r.x + " " + r.y;
    else if (r.type === m.CURVE_TO)
      e +=
        (r.relative ? "c" : "C") +
        r.x1 +
        " " +
        r.y1 +
        " " +
        r.x2 +
        " " +
        r.y2 +
        " " +
        r.x +
        " " +
        r.y;
    else if (r.type === m.SMOOTH_CURVE_TO)
      e += (r.relative ? "s" : "S") + r.x2 + " " + r.y2 + " " + r.x + " " + r.y;
    else if (r.type === m.QUAD_TO)
      e += (r.relative ? "q" : "Q") + r.x1 + " " + r.y1 + " " + r.x + " " + r.y;
    else if (r.type === m.SMOOTH_QUAD_TO)
      e += (r.relative ? "t" : "T") + r.x + " " + r.y;
    else {
      if (r.type !== m.ARC)
        throw new Error(
          'Unexpected command type "' + r.type + '" at index ' + t + ".",
        );
      e +=
        (r.relative ? "a" : "A") +
        r.rX +
        " " +
        r.rY +
        " " +
        r.xRot +
        " " +
        +r.lArcFlag +
        " " +
        +r.sweepFlag +
        " " +
        r.x +
        " " +
        r.y;
    }
  }
  return e;
}
function pi(a, e) {
  var t = a[0],
    r = a[1];
  return [t * Math.cos(e) - r * Math.sin(e), t * Math.sin(e) + r * Math.cos(e)];
}
function oe() {
  for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
  for (var t = 0; t < a.length; t++)
    if (typeof a[t] != "number")
      throw new Error(
        "assertNumbers arguments[" +
          t +
          "] is not a number. " +
          typeof a[t] +
          " == typeof " +
          a[t],
      );
  return !0;
}
var Ee = Math.PI;
function Fa(a, e, t) {
  (a.lArcFlag = a.lArcFlag === 0 ? 0 : 1),
    (a.sweepFlag = a.sweepFlag === 0 ? 0 : 1);
  var r = a.rX,
    i = a.rY,
    n = a.x,
    o = a.y;
  (r = Math.abs(a.rX)), (i = Math.abs(a.rY));
  var s = pi([(e - n) / 2, (t - o) / 2], (-a.xRot / 180) * Ee),
    u = s[0],
    l = s[1],
    h = Math.pow(u, 2) / Math.pow(r, 2) + Math.pow(l, 2) / Math.pow(i, 2);
  1 < h && ((r *= Math.sqrt(h)), (i *= Math.sqrt(h))), (a.rX = r), (a.rY = i);
  var f = Math.pow(r, 2) * Math.pow(l, 2) + Math.pow(i, 2) * Math.pow(u, 2),
    c =
      (a.lArcFlag !== a.sweepFlag ? 1 : -1) *
      Math.sqrt(Math.max(0, (Math.pow(r, 2) * Math.pow(i, 2) - f) / f)),
    v = ((r * l) / i) * c,
    d = ((-i * u) / r) * c,
    g = pi([v, d], (a.xRot / 180) * Ee);
  (a.cX = g[0] + (e + n) / 2),
    (a.cY = g[1] + (t + o) / 2),
    (a.phi1 = Math.atan2((l - d) / i, (u - v) / r)),
    (a.phi2 = Math.atan2((-l - d) / i, (-u - v) / r)),
    a.sweepFlag === 0 && a.phi2 > a.phi1 && (a.phi2 -= 2 * Ee),
    a.sweepFlag === 1 && a.phi2 < a.phi1 && (a.phi2 += 2 * Ee),
    (a.phi1 *= 180 / Ee),
    (a.phi2 *= 180 / Ee);
}
function so(a, e, t) {
  oe(a, e, t);
  var r = a * a + e * e - t * t;
  if (0 > r) return [];
  if (r === 0) return [[(a * t) / (a * a + e * e), (e * t) / (a * a + e * e)]];
  var i = Math.sqrt(r);
  return [
    [(a * t + e * i) / (a * a + e * e), (e * t - a * i) / (a * a + e * e)],
    [(a * t - e * i) / (a * a + e * e), (e * t + a * i) / (a * a + e * e)],
  ];
}
var U,
  ye = Math.PI / 180;
function oo(a, e, t) {
  return (1 - t) * a + t * e;
}
function uo(a, e, t, r) {
  return a + Math.cos((r / 180) * Ee) * e + Math.sin((r / 180) * Ee) * t;
}
function lo(a, e, t, r) {
  var i = 1e-6,
    n = e - a,
    o = t - e,
    s = 3 * n + 3 * (r - t) - 6 * o,
    u = 6 * (o - n),
    l = 3 * n;
  return Math.abs(s) < i
    ? [-l / u]
    : (function (h, f, c) {
        var v = (h * h) / 4 - f;
        if (v < -1e-6) return [];
        if (v <= c) return [-h / 2];
        var d = Math.sqrt(v);
        return [-h / 2 - d, -h / 2 + d];
      })(u / s, l / s, i);
}
function ho(a, e, t, r, i) {
  var n = 1 - i;
  return (
    a * (n * n * n) +
    e * (3 * n * n * i) +
    t * (3 * n * i * i) +
    r * (i * i * i)
  );
}
(function (a) {
  function e() {
    return i(function (s, u, l) {
      return (
        s.relative &&
          (s.x1 !== void 0 && (s.x1 += u),
          s.y1 !== void 0 && (s.y1 += l),
          s.x2 !== void 0 && (s.x2 += u),
          s.y2 !== void 0 && (s.y2 += l),
          s.x !== void 0 && (s.x += u),
          s.y !== void 0 && (s.y += l),
          (s.relative = !1)),
        s
      );
    });
  }
  function t() {
    var s = NaN,
      u = NaN,
      l = NaN,
      h = NaN;
    return i(function (f, c, v) {
      return (
        f.type & m.SMOOTH_CURVE_TO &&
          ((f.type = m.CURVE_TO),
          (s = isNaN(s) ? c : s),
          (u = isNaN(u) ? v : u),
          (f.x1 = f.relative ? c - s : 2 * c - s),
          (f.y1 = f.relative ? v - u : 2 * v - u)),
        f.type & m.CURVE_TO
          ? ((s = f.relative ? c + f.x2 : f.x2),
            (u = f.relative ? v + f.y2 : f.y2))
          : ((s = NaN), (u = NaN)),
        f.type & m.SMOOTH_QUAD_TO &&
          ((f.type = m.QUAD_TO),
          (l = isNaN(l) ? c : l),
          (h = isNaN(h) ? v : h),
          (f.x1 = f.relative ? c - l : 2 * c - l),
          (f.y1 = f.relative ? v - h : 2 * v - h)),
        f.type & m.QUAD_TO
          ? ((l = f.relative ? c + f.x1 : f.x1),
            (h = f.relative ? v + f.y1 : f.y1))
          : ((l = NaN), (h = NaN)),
        f
      );
    });
  }
  function r() {
    var s = NaN,
      u = NaN;
    return i(function (l, h, f) {
      if (
        (l.type & m.SMOOTH_QUAD_TO &&
          ((l.type = m.QUAD_TO),
          (s = isNaN(s) ? h : s),
          (u = isNaN(u) ? f : u),
          (l.x1 = l.relative ? h - s : 2 * h - s),
          (l.y1 = l.relative ? f - u : 2 * f - u)),
        l.type & m.QUAD_TO)
      ) {
        (s = l.relative ? h + l.x1 : l.x1), (u = l.relative ? f + l.y1 : l.y1);
        var c = l.x1,
          v = l.y1;
        (l.type = m.CURVE_TO),
          (l.x1 = ((l.relative ? 0 : h) + 2 * c) / 3),
          (l.y1 = ((l.relative ? 0 : f) + 2 * v) / 3),
          (l.x2 = (l.x + 2 * c) / 3),
          (l.y2 = (l.y + 2 * v) / 3);
      } else (s = NaN), (u = NaN);
      return l;
    });
  }
  function i(s) {
    var u = 0,
      l = 0,
      h = NaN,
      f = NaN;
    return function (c) {
      if (isNaN(h) && !(c.type & m.MOVE_TO))
        throw new Error("path must start with moveto");
      var v = s(c, u, l, h, f);
      return (
        c.type & m.CLOSE_PATH && ((u = h), (l = f)),
        c.x !== void 0 && (u = c.relative ? u + c.x : c.x),
        c.y !== void 0 && (l = c.relative ? l + c.y : c.y),
        c.type & m.MOVE_TO && ((h = u), (f = l)),
        v
      );
    };
  }
  function n(s, u, l, h, f, c) {
    return (
      oe(s, u, l, h, f, c),
      i(function (v, d, g, p) {
        var y = v.x1,
          x = v.x2,
          b = v.relative && !isNaN(p),
          T = v.x !== void 0 ? v.x : b ? 0 : d,
          $ = v.y !== void 0 ? v.y : b ? 0 : g;
        function E(ne) {
          return ne * ne;
        }
        v.type & m.HORIZ_LINE_TO &&
          u !== 0 &&
          ((v.type = m.LINE_TO), (v.y = v.relative ? 0 : g)),
          v.type & m.VERT_LINE_TO &&
            l !== 0 &&
            ((v.type = m.LINE_TO), (v.x = v.relative ? 0 : d)),
          v.x !== void 0 && (v.x = v.x * s + $ * l + (b ? 0 : f)),
          v.y !== void 0 && (v.y = T * u + v.y * h + (b ? 0 : c)),
          v.x1 !== void 0 && (v.x1 = v.x1 * s + v.y1 * l + (b ? 0 : f)),
          v.y1 !== void 0 && (v.y1 = y * u + v.y1 * h + (b ? 0 : c)),
          v.x2 !== void 0 && (v.x2 = v.x2 * s + v.y2 * l + (b ? 0 : f)),
          v.y2 !== void 0 && (v.y2 = x * u + v.y2 * h + (b ? 0 : c));
        var O = s * h - u * l;
        if (v.xRot !== void 0 && (s !== 1 || u !== 0 || l !== 0 || h !== 1))
          if (O === 0)
            delete v.rX,
              delete v.rY,
              delete v.xRot,
              delete v.lArcFlag,
              delete v.sweepFlag,
              (v.type = m.LINE_TO);
          else {
            var C = (v.xRot * Math.PI) / 180,
              I = Math.sin(C),
              _ = Math.cos(C),
              j = 1 / E(v.rX),
              P = 1 / E(v.rY),
              X = E(_) * j + E(I) * P,
              W = 2 * I * _ * (j - P),
              G = E(I) * j + E(_) * P,
              q = X * h * h - W * u * h + G * u * u,
              H = W * (s * h + u * l) - 2 * (X * l * h + G * s * u),
              Q = X * l * l - W * s * l + G * s * s,
              R = ((Math.atan2(H, q - Q) + Math.PI) % Math.PI) / 2,
              M = Math.sin(R),
              K = Math.cos(R);
            (v.rX = Math.abs(O) / Math.sqrt(q * E(K) + H * M * K + Q * E(M))),
              (v.rY = Math.abs(O) / Math.sqrt(q * E(M) - H * M * K + Q * E(K))),
              (v.xRot = (180 * R) / Math.PI);
          }
        return (
          v.sweepFlag !== void 0 && 0 > O && (v.sweepFlag = +!v.sweepFlag), v
        );
      })
    );
  }
  function o() {
    return function (s) {
      var u = {};
      for (var l in s) u[l] = s[l];
      return u;
    };
  }
  (a.ROUND = function (s) {
    function u(l) {
      return Math.round(l * s) / s;
    }
    return (
      s === void 0 && (s = 1e13),
      oe(s),
      function (l) {
        return (
          l.x1 !== void 0 && (l.x1 = u(l.x1)),
          l.y1 !== void 0 && (l.y1 = u(l.y1)),
          l.x2 !== void 0 && (l.x2 = u(l.x2)),
          l.y2 !== void 0 && (l.y2 = u(l.y2)),
          l.x !== void 0 && (l.x = u(l.x)),
          l.y !== void 0 && (l.y = u(l.y)),
          l.rX !== void 0 && (l.rX = u(l.rX)),
          l.rY !== void 0 && (l.rY = u(l.rY)),
          l
        );
      }
    );
  }),
    (a.TO_ABS = e),
    (a.TO_REL = function () {
      return i(function (s, u, l) {
        return (
          s.relative ||
            (s.x1 !== void 0 && (s.x1 -= u),
            s.y1 !== void 0 && (s.y1 -= l),
            s.x2 !== void 0 && (s.x2 -= u),
            s.y2 !== void 0 && (s.y2 -= l),
            s.x !== void 0 && (s.x -= u),
            s.y !== void 0 && (s.y -= l),
            (s.relative = !0)),
          s
        );
      });
    }),
    (a.NORMALIZE_HVZ = function (s, u, l) {
      return (
        s === void 0 && (s = !0),
        u === void 0 && (u = !0),
        l === void 0 && (l = !0),
        i(function (h, f, c, v, d) {
          if (isNaN(v) && !(h.type & m.MOVE_TO))
            throw new Error("path must start with moveto");
          return (
            u &&
              h.type & m.HORIZ_LINE_TO &&
              ((h.type = m.LINE_TO), (h.y = h.relative ? 0 : c)),
            l &&
              h.type & m.VERT_LINE_TO &&
              ((h.type = m.LINE_TO), (h.x = h.relative ? 0 : f)),
            s &&
              h.type & m.CLOSE_PATH &&
              ((h.type = m.LINE_TO),
              (h.x = h.relative ? v - f : v),
              (h.y = h.relative ? d - c : d)),
            h.type & m.ARC &&
              (h.rX === 0 || h.rY === 0) &&
              ((h.type = m.LINE_TO),
              delete h.rX,
              delete h.rY,
              delete h.xRot,
              delete h.lArcFlag,
              delete h.sweepFlag),
            h
          );
        })
      );
    }),
    (a.NORMALIZE_ST = t),
    (a.QT_TO_C = r),
    (a.INFO = i),
    (a.SANITIZE = function (s) {
      s === void 0 && (s = 0), oe(s);
      var u = NaN,
        l = NaN,
        h = NaN,
        f = NaN;
      return i(function (c, v, d, g, p) {
        var y = Math.abs,
          x = !1,
          b = 0,
          T = 0;
        if (
          (c.type & m.SMOOTH_CURVE_TO &&
            ((b = isNaN(u) ? 0 : v - u), (T = isNaN(l) ? 0 : d - l)),
          c.type & (m.CURVE_TO | m.SMOOTH_CURVE_TO)
            ? ((u = c.relative ? v + c.x2 : c.x2),
              (l = c.relative ? d + c.y2 : c.y2))
            : ((u = NaN), (l = NaN)),
          c.type & m.SMOOTH_QUAD_TO
            ? ((h = isNaN(h) ? v : 2 * v - h), (f = isNaN(f) ? d : 2 * d - f))
            : c.type & m.QUAD_TO
              ? ((h = c.relative ? v + c.x1 : c.x1),
                (f = c.relative ? d + c.y1 : c.y2))
              : ((h = NaN), (f = NaN)),
          c.type & m.LINE_COMMANDS ||
            (c.type & m.ARC && (c.rX === 0 || c.rY === 0 || !c.lArcFlag)) ||
            c.type & m.CURVE_TO ||
            c.type & m.SMOOTH_CURVE_TO ||
            c.type & m.QUAD_TO ||
            c.type & m.SMOOTH_QUAD_TO)
        ) {
          var $ = c.x === void 0 ? 0 : c.relative ? c.x : c.x - v,
            E = c.y === void 0 ? 0 : c.relative ? c.y : c.y - d;
          (b = isNaN(h)
            ? c.x1 === void 0
              ? b
              : c.relative
                ? c.x
                : c.x1 - v
            : h - v),
            (T = isNaN(f)
              ? c.y1 === void 0
                ? T
                : c.relative
                  ? c.y
                  : c.y1 - d
              : f - d);
          var O = c.x2 === void 0 ? 0 : c.relative ? c.x : c.x2 - v,
            C = c.y2 === void 0 ? 0 : c.relative ? c.y : c.y2 - d;
          y($) <= s &&
            y(E) <= s &&
            y(b) <= s &&
            y(T) <= s &&
            y(O) <= s &&
            y(C) <= s &&
            (x = !0);
        }
        return (
          c.type & m.CLOSE_PATH && y(v - g) <= s && y(d - p) <= s && (x = !0),
          x ? [] : c
        );
      });
    }),
    (a.MATRIX = n),
    (a.ROTATE = function (s, u, l) {
      u === void 0 && (u = 0), l === void 0 && (l = 0), oe(s, u, l);
      var h = Math.sin(s),
        f = Math.cos(s);
      return n(f, h, -h, f, u - u * f + l * h, l - u * h - l * f);
    }),
    (a.TRANSLATE = function (s, u) {
      return u === void 0 && (u = 0), oe(s, u), n(1, 0, 0, 1, s, u);
    }),
    (a.SCALE = function (s, u) {
      return u === void 0 && (u = s), oe(s, u), n(s, 0, 0, u, 0, 0);
    }),
    (a.SKEW_X = function (s) {
      return oe(s), n(1, 0, Math.atan(s), 1, 0, 0);
    }),
    (a.SKEW_Y = function (s) {
      return oe(s), n(1, Math.atan(s), 0, 1, 0, 0);
    }),
    (a.X_AXIS_SYMMETRY = function (s) {
      return s === void 0 && (s = 0), oe(s), n(-1, 0, 0, 1, s, 0);
    }),
    (a.Y_AXIS_SYMMETRY = function (s) {
      return s === void 0 && (s = 0), oe(s), n(1, 0, 0, -1, 0, s);
    }),
    (a.A_TO_C = function () {
      return i(function (s, u, l) {
        return m.ARC === s.type
          ? (function (h, f, c) {
              var v, d, g, p;
              h.cX || Fa(h, f, c);
              for (
                var y = Math.min(h.phi1, h.phi2),
                  x = Math.max(h.phi1, h.phi2) - y,
                  b = Math.ceil(x / 90),
                  T = new Array(b),
                  $ = f,
                  E = c,
                  O = 0;
                O < b;
                O++
              ) {
                var C = oo(h.phi1, h.phi2, O / b),
                  I = oo(h.phi1, h.phi2, (O + 1) / b),
                  _ = I - C,
                  j = (4 / 3) * Math.tan((_ * ye) / 4),
                  P = [
                    Math.cos(C * ye) - j * Math.sin(C * ye),
                    Math.sin(C * ye) + j * Math.cos(C * ye),
                  ],
                  X = P[0],
                  W = P[1],
                  G = [Math.cos(I * ye), Math.sin(I * ye)],
                  q = G[0],
                  H = G[1],
                  Q = [q + j * Math.sin(I * ye), H - j * Math.cos(I * ye)],
                  R = Q[0],
                  M = Q[1];
                T[O] = { relative: h.relative, type: m.CURVE_TO };
                var K = function (ne, ge) {
                  var Se = pi([ne * h.rX, ge * h.rY], h.xRot),
                    ze = Se[0],
                    Mt = Se[1];
                  return [h.cX + ze, h.cY + Mt];
                };
                (v = K(X, W)),
                  (T[O].x1 = v[0]),
                  (T[O].y1 = v[1]),
                  (d = K(R, M)),
                  (T[O].x2 = d[0]),
                  (T[O].y2 = d[1]),
                  (g = K(q, H)),
                  (T[O].x = g[0]),
                  (T[O].y = g[1]),
                  h.relative &&
                    ((T[O].x1 -= $),
                    (T[O].y1 -= E),
                    (T[O].x2 -= $),
                    (T[O].y2 -= E),
                    (T[O].x -= $),
                    (T[O].y -= E)),
                  ($ = (p = [T[O].x, T[O].y])[0]),
                  (E = p[1]);
              }
              return T;
            })(s, s.relative ? 0 : u, s.relative ? 0 : l)
          : s;
      });
    }),
    (a.ANNOTATE_ARCS = function () {
      return i(function (s, u, l) {
        return (
          s.relative && ((u = 0), (l = 0)), m.ARC === s.type && Fa(s, u, l), s
        );
      });
    }),
    (a.CLONE = o),
    (a.CALCULATE_BOUNDS = function () {
      var s = function (c) {
          var v = {};
          for (var d in c) v[d] = c[d];
          return v;
        },
        u = e(),
        l = r(),
        h = t(),
        f = i(function (c, v, d) {
          var g = h(l(u(s(c))));
          function p(M) {
            M > f.maxX && (f.maxX = M), M < f.minX && (f.minX = M);
          }
          function y(M) {
            M > f.maxY && (f.maxY = M), M < f.minY && (f.minY = M);
          }
          if (
            (g.type & m.DRAWING_COMMANDS && (p(v), y(d)),
            g.type & m.HORIZ_LINE_TO && p(g.x),
            g.type & m.VERT_LINE_TO && y(g.y),
            g.type & m.LINE_TO && (p(g.x), y(g.y)),
            g.type & m.CURVE_TO)
          ) {
            p(g.x), y(g.y);
            for (var x = 0, b = lo(v, g.x1, g.x2, g.x); x < b.length; x++)
              0 < (R = b[x]) && 1 > R && p(ho(v, g.x1, g.x2, g.x, R));
            for (var T = 0, $ = lo(d, g.y1, g.y2, g.y); T < $.length; T++)
              0 < (R = $[T]) && 1 > R && y(ho(d, g.y1, g.y2, g.y, R));
          }
          if (g.type & m.ARC) {
            p(g.x), y(g.y), Fa(g, v, d);
            for (
              var E = (g.xRot / 180) * Math.PI,
                O = Math.cos(E) * g.rX,
                C = Math.sin(E) * g.rX,
                I = -Math.sin(E) * g.rY,
                _ = Math.cos(E) * g.rY,
                j =
                  g.phi1 < g.phi2
                    ? [g.phi1, g.phi2]
                    : -180 > g.phi2
                      ? [g.phi2 + 360, g.phi1 + 360]
                      : [g.phi2, g.phi1],
                P = j[0],
                X = j[1],
                W = function (M) {
                  var K = M[0],
                    ne = M[1],
                    ge = (180 * Math.atan2(ne, K)) / Math.PI;
                  return ge < P ? ge + 360 : ge;
                },
                G = 0,
                q = so(I, -O, 0).map(W);
              G < q.length;
              G++
            )
              (R = q[G]) > P && R < X && p(uo(g.cX, O, I, R));
            for (var H = 0, Q = so(_, -C, 0).map(W); H < Q.length; H++) {
              var R;
              (R = Q[H]) > P && R < X && y(uo(g.cY, C, _, R));
            }
          }
          return c;
        });
      return (
        (f.minX = 1 / 0),
        (f.maxX = -1 / 0),
        (f.minY = 1 / 0),
        (f.maxY = -1 / 0),
        f
      );
    });
})(U || (U = {}));
var se,
  ol = (function () {
    function a() {}
    return (
      (a.prototype.round = function (e) {
        return this.transform(U.ROUND(e));
      }),
      (a.prototype.toAbs = function () {
        return this.transform(U.TO_ABS());
      }),
      (a.prototype.toRel = function () {
        return this.transform(U.TO_REL());
      }),
      (a.prototype.normalizeHVZ = function (e, t, r) {
        return this.transform(U.NORMALIZE_HVZ(e, t, r));
      }),
      (a.prototype.normalizeST = function () {
        return this.transform(U.NORMALIZE_ST());
      }),
      (a.prototype.qtToC = function () {
        return this.transform(U.QT_TO_C());
      }),
      (a.prototype.aToC = function () {
        return this.transform(U.A_TO_C());
      }),
      (a.prototype.sanitize = function (e) {
        return this.transform(U.SANITIZE(e));
      }),
      (a.prototype.translate = function (e, t) {
        return this.transform(U.TRANSLATE(e, t));
      }),
      (a.prototype.scale = function (e, t) {
        return this.transform(U.SCALE(e, t));
      }),
      (a.prototype.rotate = function (e, t, r) {
        return this.transform(U.ROTATE(e, t, r));
      }),
      (a.prototype.matrix = function (e, t, r, i, n, o) {
        return this.transform(U.MATRIX(e, t, r, i, n, o));
      }),
      (a.prototype.skewX = function (e) {
        return this.transform(U.SKEW_X(e));
      }),
      (a.prototype.skewY = function (e) {
        return this.transform(U.SKEW_Y(e));
      }),
      (a.prototype.xSymmetry = function (e) {
        return this.transform(U.X_AXIS_SYMMETRY(e));
      }),
      (a.prototype.ySymmetry = function (e) {
        return this.transform(U.Y_AXIS_SYMMETRY(e));
      }),
      (a.prototype.annotateArcs = function () {
        return this.transform(U.ANNOTATE_ARCS());
      }),
      a
    );
  })(),
  Sb = function (a) {
    return (
      a === " " ||
      a === "	" ||
      a === "\r" ||
      a ===
        `
`
    );
  },
  vo = function (a) {
    return 48 <= a.charCodeAt(0) && a.charCodeAt(0) <= 57;
  },
  Eb = (function (a) {
    function e() {
      var t = a.call(this) || this;
      return (
        (t.curNumber = ""),
        (t.curCommandType = -1),
        (t.curCommandRelative = !1),
        (t.canParseCommandOrComma = !0),
        (t.curNumberHasExp = !1),
        (t.curNumberHasExpDigits = !1),
        (t.curNumberHasDecimal = !1),
        (t.curArgs = []),
        t
      );
    }
    return (
      sl(e, a),
      (e.prototype.finish = function (t) {
        if (
          (t === void 0 && (t = []),
          this.parse(" ", t),
          this.curArgs.length !== 0 || !this.canParseCommandOrComma)
        )
          throw new SyntaxError("Unterminated command at the path end.");
        return t;
      }),
      (e.prototype.parse = function (t, r) {
        var i = this;
        r === void 0 && (r = []);
        for (
          var n = function (f) {
              r.push(f),
                (i.curArgs.length = 0),
                (i.canParseCommandOrComma = !0);
            },
            o = 0;
          o < t.length;
          o++
        ) {
          var s = t[o],
            u = !(
              this.curCommandType !== m.ARC ||
              (this.curArgs.length !== 3 && this.curArgs.length !== 4) ||
              this.curNumber.length !== 1 ||
              (this.curNumber !== "0" && this.curNumber !== "1")
            ),
            l = vo(s) && ((this.curNumber === "0" && s === "0") || u);
          if (!vo(s) || l)
            if (s !== "e" && s !== "E")
              if (
                (s !== "-" && s !== "+") ||
                !this.curNumberHasExp ||
                this.curNumberHasExpDigits
              )
                if (
                  s !== "." ||
                  this.curNumberHasExp ||
                  this.curNumberHasDecimal ||
                  u
                ) {
                  if (this.curNumber && this.curCommandType !== -1) {
                    var h = Number(this.curNumber);
                    if (isNaN(h))
                      throw new SyntaxError("Invalid number ending at " + o);
                    if (this.curCommandType === m.ARC) {
                      if (
                        this.curArgs.length === 0 ||
                        this.curArgs.length === 1
                      ) {
                        if (0 > h)
                          throw new SyntaxError(
                            'Expected positive number, got "' +
                              h +
                              '" at index "' +
                              o +
                              '"',
                          );
                      } else if (
                        (this.curArgs.length === 3 ||
                          this.curArgs.length === 4) &&
                        this.curNumber !== "0" &&
                        this.curNumber !== "1"
                      )
                        throw new SyntaxError(
                          'Expected a flag, got "' +
                            this.curNumber +
                            '" at index "' +
                            o +
                            '"',
                        );
                    }
                    this.curArgs.push(h),
                      this.curArgs.length === $b[this.curCommandType] &&
                        (m.HORIZ_LINE_TO === this.curCommandType
                          ? n({
                              type: m.HORIZ_LINE_TO,
                              relative: this.curCommandRelative,
                              x: h,
                            })
                          : m.VERT_LINE_TO === this.curCommandType
                            ? n({
                                type: m.VERT_LINE_TO,
                                relative: this.curCommandRelative,
                                y: h,
                              })
                            : this.curCommandType === m.MOVE_TO ||
                                this.curCommandType === m.LINE_TO ||
                                this.curCommandType === m.SMOOTH_QUAD_TO
                              ? (n({
                                  type: this.curCommandType,
                                  relative: this.curCommandRelative,
                                  x: this.curArgs[0],
                                  y: this.curArgs[1],
                                }),
                                m.MOVE_TO === this.curCommandType &&
                                  (this.curCommandType = m.LINE_TO))
                              : this.curCommandType === m.CURVE_TO
                                ? n({
                                    type: m.CURVE_TO,
                                    relative: this.curCommandRelative,
                                    x1: this.curArgs[0],
                                    y1: this.curArgs[1],
                                    x2: this.curArgs[2],
                                    y2: this.curArgs[3],
                                    x: this.curArgs[4],
                                    y: this.curArgs[5],
                                  })
                                : this.curCommandType === m.SMOOTH_CURVE_TO
                                  ? n({
                                      type: m.SMOOTH_CURVE_TO,
                                      relative: this.curCommandRelative,
                                      x2: this.curArgs[0],
                                      y2: this.curArgs[1],
                                      x: this.curArgs[2],
                                      y: this.curArgs[3],
                                    })
                                  : this.curCommandType === m.QUAD_TO
                                    ? n({
                                        type: m.QUAD_TO,
                                        relative: this.curCommandRelative,
                                        x1: this.curArgs[0],
                                        y1: this.curArgs[1],
                                        x: this.curArgs[2],
                                        y: this.curArgs[3],
                                      })
                                    : this.curCommandType === m.ARC &&
                                      n({
                                        type: m.ARC,
                                        relative: this.curCommandRelative,
                                        rX: this.curArgs[0],
                                        rY: this.curArgs[1],
                                        xRot: this.curArgs[2],
                                        lArcFlag: this.curArgs[3],
                                        sweepFlag: this.curArgs[4],
                                        x: this.curArgs[5],
                                        y: this.curArgs[6],
                                      })),
                      (this.curNumber = ""),
                      (this.curNumberHasExpDigits = !1),
                      (this.curNumberHasExp = !1),
                      (this.curNumberHasDecimal = !1),
                      (this.canParseCommandOrComma = !0);
                  }
                  if (!Sb(s))
                    if (s === "," && this.canParseCommandOrComma)
                      this.canParseCommandOrComma = !1;
                    else if (s !== "+" && s !== "-" && s !== ".")
                      if (l)
                        (this.curNumber = s), (this.curNumberHasDecimal = !1);
                      else {
                        if (this.curArgs.length !== 0)
                          throw new SyntaxError(
                            "Unterminated command at index " + o + ".",
                          );
                        if (!this.canParseCommandOrComma)
                          throw new SyntaxError(
                            'Unexpected character "' +
                              s +
                              '" at index ' +
                              o +
                              ". Command cannot follow comma",
                          );
                        if (
                          ((this.canParseCommandOrComma = !1),
                          s !== "z" && s !== "Z")
                        )
                          if (s === "h" || s === "H")
                            (this.curCommandType = m.HORIZ_LINE_TO),
                              (this.curCommandRelative = s === "h");
                          else if (s === "v" || s === "V")
                            (this.curCommandType = m.VERT_LINE_TO),
                              (this.curCommandRelative = s === "v");
                          else if (s === "m" || s === "M")
                            (this.curCommandType = m.MOVE_TO),
                              (this.curCommandRelative = s === "m");
                          else if (s === "l" || s === "L")
                            (this.curCommandType = m.LINE_TO),
                              (this.curCommandRelative = s === "l");
                          else if (s === "c" || s === "C")
                            (this.curCommandType = m.CURVE_TO),
                              (this.curCommandRelative = s === "c");
                          else if (s === "s" || s === "S")
                            (this.curCommandType = m.SMOOTH_CURVE_TO),
                              (this.curCommandRelative = s === "s");
                          else if (s === "q" || s === "Q")
                            (this.curCommandType = m.QUAD_TO),
                              (this.curCommandRelative = s === "q");
                          else if (s === "t" || s === "T")
                            (this.curCommandType = m.SMOOTH_QUAD_TO),
                              (this.curCommandRelative = s === "t");
                          else {
                            if (s !== "a" && s !== "A")
                              throw new SyntaxError(
                                'Unexpected character "' +
                                  s +
                                  '" at index ' +
                                  o +
                                  ".",
                              );
                            (this.curCommandType = m.ARC),
                              (this.curCommandRelative = s === "a");
                          }
                        else
                          r.push({ type: m.CLOSE_PATH }),
                            (this.canParseCommandOrComma = !0),
                            (this.curCommandType = -1);
                      }
                    else
                      (this.curNumber = s),
                        (this.curNumberHasDecimal = s === ".");
                } else (this.curNumber += s), (this.curNumberHasDecimal = !0);
              else this.curNumber += s;
            else (this.curNumber += s), (this.curNumberHasExp = !0);
          else
            (this.curNumber += s),
              (this.curNumberHasExpDigits = this.curNumberHasExp);
        }
        return r;
      }),
      (e.prototype.transform = function (t) {
        return Object.create(this, {
          parse: {
            value: function (r, i) {
              i === void 0 && (i = []);
              for (
                var n = 0, o = Object.getPrototypeOf(this).parse.call(this, r);
                n < o.length;
                n++
              ) {
                var s = o[n],
                  u = t(s);
                Array.isArray(u) ? i.push.apply(i, u) : i.push(u);
              }
              return i;
            },
          },
        });
      }),
      e
    );
  })(ol),
  m = (function (a) {
    function e(t) {
      var r = a.call(this) || this;
      return (r.commands = typeof t == "string" ? e.parse(t) : t), r;
    }
    return (
      sl(e, a),
      (e.prototype.encode = function () {
        return e.encode(this.commands);
      }),
      (e.prototype.getBounds = function () {
        var t = U.CALCULATE_BOUNDS();
        return this.transform(t), t;
      }),
      (e.prototype.transform = function (t) {
        for (var r = [], i = 0, n = this.commands; i < n.length; i++) {
          var o = t(n[i]);
          Array.isArray(o) ? r.push.apply(r, o) : r.push(o);
        }
        return (this.commands = r), this;
      }),
      (e.encode = function (t) {
        return Ob(t);
      }),
      (e.parse = function (t) {
        var r = new Eb(),
          i = [];
        return r.parse(t, i), r.finish(i), i;
      }),
      (e.CLOSE_PATH = 1),
      (e.MOVE_TO = 2),
      (e.HORIZ_LINE_TO = 4),
      (e.VERT_LINE_TO = 8),
      (e.LINE_TO = 16),
      (e.CURVE_TO = 32),
      (e.SMOOTH_CURVE_TO = 64),
      (e.QUAD_TO = 128),
      (e.SMOOTH_QUAD_TO = 256),
      (e.ARC = 512),
      (e.LINE_COMMANDS = e.LINE_TO | e.HORIZ_LINE_TO | e.VERT_LINE_TO),
      (e.DRAWING_COMMANDS =
        e.HORIZ_LINE_TO |
        e.VERT_LINE_TO |
        e.LINE_TO |
        e.CURVE_TO |
        e.SMOOTH_CURVE_TO |
        e.QUAD_TO |
        e.SMOOTH_QUAD_TO |
        e.ARC),
      e
    );
  })(ol),
  $b =
    (((se = {})[m.MOVE_TO] = 2),
    (se[m.LINE_TO] = 2),
    (se[m.HORIZ_LINE_TO] = 1),
    (se[m.VERT_LINE_TO] = 1),
    (se[m.CLOSE_PATH] = 0),
    (se[m.QUAD_TO] = 4),
    (se[m.SMOOTH_QUAD_TO] = 2),
    (se[m.CURVE_TO] = 6),
    (se[m.SMOOTH_CURVE_TO] = 4),
    (se[m.ARC] = 7),
    se),
  wb = Y,
  Cb = fe,
  Ab = br,
  Pb = ku,
  fo = RegExp.prototype,
  Rb = function (a) {
    var e = a.flags;
    return e === void 0 && !("flags" in fo) && !Cb(a, "flags") && Ab(fo, a)
      ? wb(Pb, a)
      : e;
  },
  Nb = Sr.PROPER,
  Ib = Ue,
  Mb = J,
  co = pe,
  _b = k,
  Vb = Rb,
  Ji = "toString",
  ul = RegExp.prototype,
  ll = ul[Ji],
  Db = _b(function () {
    return ll.call({ source: "a", flags: "b" }) !== "/a/b";
  }),
  kb = Nb && ll.name !== Ji;
(Db || kb) &&
  Ib(
    ul,
    Ji,
    function () {
      var e = Mb(this),
        t = co(e.source),
        r = co(Vb(e));
      return "/" + t + "/" + r;
    },
    { unsafe: !0 },
  );
function vr(a) {
  "@babel/helpers - typeof";
  return (
    typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
      ? (vr = function (e) {
          return typeof e;
        })
      : (vr = function (e) {
          return e &&
            typeof Symbol == "function" &&
            e.constructor === Symbol &&
            e !== Symbol.prototype
            ? "symbol"
            : typeof e;
        }),
    vr(a)
  );
}
function Lb(a, e) {
  if (!(a instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
var Bb = [
    512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292,
    512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292,
    273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259,
    496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292,
    282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373,
    364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259,
    507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381,
    374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292,
    287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461,
    454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373,
    368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309,
    305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259,
    257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442,
    437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381,
    377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332,
    329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292,
    289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259,
  ],
  jb = [
    9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17,
    17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19,
    19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
    20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
    21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22,
    22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
    22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23,
    23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
    23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
    23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24,
    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
    24, 24, 24, 24, 24, 24, 24, 24,
  ];
function Fb(a, e, t, r, i) {
  if (
    (typeof a == "string" && (a = document.getElementById(a)),
    !a || vr(a) !== "object" || !("getContext" in a))
  )
    throw new TypeError(
      "Expecting canvas with `getContext` method in processCanvasRGB(A) calls!",
    );
  var n = a.getContext("2d");
  try {
    return n.getImageData(e, t, r, i);
  } catch (o) {
    throw new Error("unable to access image data: " + o);
  }
}
function Ub(a, e, t, r, i, n) {
  if (!(isNaN(n) || n < 1)) {
    n |= 0;
    var o = Fb(a, e, t, r, i);
    (o = Gb(o, e, t, r, i, n)), a.getContext("2d").putImageData(o, e, t);
  }
}
function Gb(a, e, t, r, i, n) {
  for (
    var o = a.data,
      s = 2 * n + 1,
      u = r - 1,
      l = i - 1,
      h = n + 1,
      f = (h * (h + 1)) / 2,
      c = new go(),
      v = c,
      d,
      g = 1;
    g < s;
    g++
  )
    (v = v.next = new go()), g === h && (d = v);
  v.next = c;
  for (
    var p = null, y = null, x = 0, b = 0, T = Bb[n], $ = jb[n], E = 0;
    E < i;
    E++
  ) {
    v = c;
    for (
      var O = o[b], C = o[b + 1], I = o[b + 2], _ = o[b + 3], j = 0;
      j < h;
      j++
    )
      (v.r = O), (v.g = C), (v.b = I), (v.a = _), (v = v.next);
    for (
      var P = 0,
        X = 0,
        W = 0,
        G = 0,
        q = h * O,
        H = h * C,
        Q = h * I,
        R = h * _,
        M = f * O,
        K = f * C,
        ne = f * I,
        ge = f * _,
        Se = 1;
      Se < h;
      Se++
    ) {
      var ze = b + ((u < Se ? u : Se) << 2),
        Mt = o[ze],
        rn = o[ze + 1],
        an = o[ze + 2],
        nn = o[ze + 3],
        _t = h - Se;
      (M += (v.r = Mt) * _t),
        (K += (v.g = rn) * _t),
        (ne += (v.b = an) * _t),
        (ge += (v.a = nn) * _t),
        (P += Mt),
        (X += rn),
        (W += an),
        (G += nn),
        (v = v.next);
    }
    (p = c), (y = d);
    for (var Lr = 0; Lr < r; Lr++) {
      var Br = (ge * T) >>> $;
      if (((o[b + 3] = Br), Br !== 0)) {
        var jr = 255 / Br;
        (o[b] = ((M * T) >>> $) * jr),
          (o[b + 1] = ((K * T) >>> $) * jr),
          (o[b + 2] = ((ne * T) >>> $) * jr);
      } else o[b] = o[b + 1] = o[b + 2] = 0;
      (M -= q),
        (K -= H),
        (ne -= Q),
        (ge -= R),
        (q -= p.r),
        (H -= p.g),
        (Q -= p.b),
        (R -= p.a);
      var Ae = Lr + n + 1;
      (Ae = (x + (Ae < u ? Ae : u)) << 2),
        (P += p.r = o[Ae]),
        (X += p.g = o[Ae + 1]),
        (W += p.b = o[Ae + 2]),
        (G += p.a = o[Ae + 3]),
        (M += P),
        (K += X),
        (ne += W),
        (ge += G),
        (p = p.next);
      var Vt = y,
        sn = Vt.r,
        on = Vt.g,
        un = Vt.b,
        ln = Vt.a;
      (q += sn),
        (H += on),
        (Q += un),
        (R += ln),
        (P -= sn),
        (X -= on),
        (W -= un),
        (G -= ln),
        (y = y.next),
        (b += 4);
    }
    x += r;
  }
  for (var He = 0; He < r; He++) {
    b = He << 2;
    var Pe = o[b],
      Re = o[b + 1],
      Ne = o[b + 2],
      te = o[b + 3],
      Fr = h * Pe,
      Ur = h * Re,
      Gr = h * Ne,
      zr = h * te,
      Dt = f * Pe,
      kt = f * Re,
      Lt = f * Ne,
      Bt = f * te;
    v = c;
    for (var hn = 0; hn < h; hn++)
      (v.r = Pe), (v.g = Re), (v.b = Ne), (v.a = te), (v = v.next);
    for (var vn = r, Hr = 0, Yr = 0, Xr = 0, Wr = 0, jt = 1; jt <= n; jt++) {
      b = (vn + He) << 2;
      var Ft = h - jt;
      (Dt += (v.r = Pe = o[b]) * Ft),
        (kt += (v.g = Re = o[b + 1]) * Ft),
        (Lt += (v.b = Ne = o[b + 2]) * Ft),
        (Bt += (v.a = te = o[b + 3]) * Ft),
        (Wr += Pe),
        (Hr += Re),
        (Yr += Ne),
        (Xr += te),
        (v = v.next),
        jt < l && (vn += r);
    }
    (b = He), (p = c), (y = d);
    for (var qr = 0; qr < i; qr++) {
      var re = b << 2;
      (o[re + 3] = te = (Bt * T) >>> $),
        te > 0
          ? ((te = 255 / te),
            (o[re] = ((Dt * T) >>> $) * te),
            (o[re + 1] = ((kt * T) >>> $) * te),
            (o[re + 2] = ((Lt * T) >>> $) * te))
          : (o[re] = o[re + 1] = o[re + 2] = 0),
        (Dt -= Fr),
        (kt -= Ur),
        (Lt -= Gr),
        (Bt -= zr),
        (Fr -= p.r),
        (Ur -= p.g),
        (Gr -= p.b),
        (zr -= p.a),
        (re = (He + ((re = qr + h) < l ? re : l) * r) << 2),
        (Dt += Wr += p.r = o[re]),
        (kt += Hr += p.g = o[re + 1]),
        (Lt += Yr += p.b = o[re + 2]),
        (Bt += Xr += p.a = o[re + 3]),
        (p = p.next),
        (Fr += Pe = y.r),
        (Ur += Re = y.g),
        (Gr += Ne = y.b),
        (zr += te = y.a),
        (Wr -= Pe),
        (Hr -= Re),
        (Yr -= Ne),
        (Xr -= te),
        (y = y.next),
        (b += r);
    }
  }
  return a;
}
var go = function a() {
  Lb(this, a),
    (this.r = 0),
    (this.g = 0),
    (this.b = 0),
    (this.a = 0),
    (this.next = null);
};
function zb() {
  var { DOMParser: a } =
      arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
    e = {
      window: null,
      ignoreAnimation: !0,
      ignoreMouse: !0,
      DOMParser: a,
      createCanvas(t, r) {
        return new OffscreenCanvas(t, r);
      },
      createImage(t) {
        return xe(function* () {
          var r = yield fetch(t),
            i = yield r.blob(),
            n = yield createImageBitmap(i);
          return n;
        })();
      },
    };
  return (
    (typeof DOMParser < "u" || typeof a > "u") &&
      Reflect.deleteProperty(e, "DOMParser"),
    e
  );
}
function Hb(a) {
  var { DOMParser: e, canvas: t, fetch: r } = a;
  return {
    window: null,
    ignoreAnimation: !0,
    ignoreMouse: !0,
    DOMParser: e,
    fetch: r,
    createCanvas: t.createCanvas,
    createImage: t.loadImage,
  };
}
var a2 = Object.freeze({ __proto__: null, offscreen: zb, node: Hb });
function ht(a) {
  return a.replace(/(?!\u3000)\s+/gm, " ");
}
function Yb(a) {
  return a.replace(/^[\n \t]+/, "");
}
function Xb(a) {
  return a.replace(/[\n \t]+$/, "");
}
function ie(a) {
  var e =
    (a || "").match(/-?(\d+(?:\.\d*(?:[eE][+-]?\d+)?)?|\.\d+)(?=\D|$)/gm) || [];
  return e.map(parseFloat);
}
var Wb = /^[A-Z-]+$/;
function qb(a) {
  return Wb.test(a) ? a.toLowerCase() : a;
}
function hl(a) {
  var e = /url\(('([^']+)'|"([^"]+)"|([^'")]+))\)/.exec(a) || [];
  return e[2] || e[3] || e[4];
}
function Qb(a) {
  if (!a.startsWith("rgb")) return a;
  var e = 3,
    t = a.replace(/\d+(\.\d+)?/g, (r, i) =>
      e-- && i ? String(Math.round(parseFloat(r))) : r,
    );
  return t;
}
var Kb = /(\[[^\]]+\])/g,
  Zb = /(#[^\s+>~.[:]+)/g,
  Jb = /(\.[^\s+>~.[:]+)/g,
  e1 = /(::[^\s+>~.[:]+|:first-line|:first-letter|:before|:after)/gi,
  t1 = /(:[\w-]+\([^)]*\))/gi,
  r1 = /(:[^\s+>~.[:]+)/g,
  a1 = /([^\s+>~.[:]+)/g;
function _e(a, e) {
  var t = e.exec(a);
  return t ? [a.replace(e, " "), t.length] : [a, 0];
}
function i1(a) {
  var e = [0, 0, 0],
    t = a.replace(/:not\(([^)]*)\)/g, "     $1 ").replace(/{[\s\S]*/gm, " "),
    r = 0;
  return (
    ([t, r] = _e(t, Kb)),
    (e[1] += r),
    ([t, r] = _e(t, Zb)),
    (e[0] += r),
    ([t, r] = _e(t, Jb)),
    (e[1] += r),
    ([t, r] = _e(t, e1)),
    (e[2] += r),
    ([t, r] = _e(t, t1)),
    (e[1] += r),
    ([t, r] = _e(t, r1)),
    (e[1] += r),
    (t = t.replace(/[*\s+>~]/g, " ").replace(/[#.]/g, " ")),
    ([t, r] = _e(t, a1)),
    (e[2] += r),
    e.join("")
  );
}
var at = 1e-8;
function po(a) {
  return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2));
}
function yi(a, e) {
  return (a[0] * e[0] + a[1] * e[1]) / (po(a) * po(e));
}
function yo(a, e) {
  return (a[0] * e[1] < a[1] * e[0] ? -1 : 1) * Math.acos(yi(a, e));
}
function mo(a) {
  return a * a * a;
}
function bo(a) {
  return 3 * a * a * (1 - a);
}
function xo(a) {
  return 3 * a * (1 - a) * (1 - a);
}
function To(a) {
  return (1 - a) * (1 - a) * (1 - a);
}
function Oo(a) {
  return a * a;
}
function So(a) {
  return 2 * a * (1 - a);
}
function Eo(a) {
  return (1 - a) * (1 - a);
}
class S {
  constructor(e, t, r) {
    (this.document = e),
      (this.name = t),
      (this.value = r),
      (this.isNormalizedColor = !1);
  }
  static empty(e) {
    return new S(e, "EMPTY", "");
  }
  split() {
    var e =
        arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : " ",
      { document: t, name: r } = this;
    return ht(this.getString())
      .trim()
      .split(e)
      .map((i) => new S(t, r, i));
  }
  hasValue(e) {
    var { value: t } = this;
    return t !== null && t !== "" && (e || t !== 0) && typeof t < "u";
  }
  isString(e) {
    var { value: t } = this,
      r = typeof t == "string";
    return !r || !e ? r : e.test(t);
  }
  isUrlDefinition() {
    return this.isString(/^url\(/);
  }
  isPixels() {
    if (!this.hasValue()) return !1;
    var e = this.getString();
    switch (!0) {
      case e.endsWith("px"):
      case /^[0-9]+$/.test(e):
        return !0;
      default:
        return !1;
    }
  }
  setValue(e) {
    return (this.value = e), this;
  }
  getValue(e) {
    return typeof e > "u" || this.hasValue() ? this.value : e;
  }
  getNumber(e) {
    if (!this.hasValue()) return typeof e > "u" ? 0 : parseFloat(e);
    var { value: t } = this,
      r = parseFloat(t);
    return this.isString(/%$/) && (r /= 100), r;
  }
  getString(e) {
    return typeof e > "u" || this.hasValue()
      ? typeof this.value > "u"
        ? ""
        : String(this.value)
      : String(e);
  }
  getColor(e) {
    var t = this.getString(e);
    return (
      this.isNormalizedColor ||
        ((this.isNormalizedColor = !0), (t = Qb(t)), (this.value = t)),
      t
    );
  }
  getDpi() {
    return 96;
  }
  getRem() {
    return this.document.rootEmSize;
  }
  getEm() {
    return this.document.emSize;
  }
  getUnits() {
    return this.getString().replace(/[0-9.-]/g, "");
  }
  getPixels(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (!this.hasValue()) return 0;
    var [r, i] = typeof e == "boolean" ? [void 0, e] : [e],
      { viewPort: n } = this.document.screen;
    switch (!0) {
      case this.isString(/vmin$/):
        return (
          (this.getNumber() / 100) *
          Math.min(n.computeSize("x"), n.computeSize("y"))
        );
      case this.isString(/vmax$/):
        return (
          (this.getNumber() / 100) *
          Math.max(n.computeSize("x"), n.computeSize("y"))
        );
      case this.isString(/vw$/):
        return (this.getNumber() / 100) * n.computeSize("x");
      case this.isString(/vh$/):
        return (this.getNumber() / 100) * n.computeSize("y");
      case this.isString(/rem$/):
        return this.getNumber() * this.getRem();
      case this.isString(/em$/):
        return this.getNumber() * this.getEm();
      case this.isString(/ex$/):
        return (this.getNumber() * this.getEm()) / 2;
      case this.isString(/px$/):
        return this.getNumber();
      case this.isString(/pt$/):
        return this.getNumber() * this.getDpi() * (1 / 72);
      case this.isString(/pc$/):
        return this.getNumber() * 15;
      case this.isString(/cm$/):
        return (this.getNumber() * this.getDpi()) / 2.54;
      case this.isString(/mm$/):
        return (this.getNumber() * this.getDpi()) / 25.4;
      case this.isString(/in$/):
        return this.getNumber() * this.getDpi();
      case this.isString(/%$/) && i:
        return this.getNumber() * this.getEm();
      case this.isString(/%$/):
        return this.getNumber() * n.computeSize(r);
      default: {
        var o = this.getNumber();
        return t && o < 1 ? o * n.computeSize(r) : o;
      }
    }
  }
  getMilliseconds() {
    return this.hasValue()
      ? this.isString(/ms$/)
        ? this.getNumber()
        : this.getNumber() * 1e3
      : 0;
  }
  getRadians() {
    if (!this.hasValue()) return 0;
    switch (!0) {
      case this.isString(/deg$/):
        return this.getNumber() * (Math.PI / 180);
      case this.isString(/grad$/):
        return this.getNumber() * (Math.PI / 200);
      case this.isString(/rad$/):
        return this.getNumber();
      default:
        return this.getNumber() * (Math.PI / 180);
    }
  }
  getDefinition() {
    var e = this.getString(),
      t = /#([^)'"]+)/.exec(e);
    return t && (t = t[1]), t || (t = e), this.document.definitions[t];
  }
  getFillStyleDefinition(e, t) {
    var r = this.getDefinition();
    if (!r) return null;
    if (typeof r.createGradient == "function")
      return r.createGradient(this.document.ctx, e, t);
    if (typeof r.createPattern == "function") {
      if (r.getHrefAttribute().hasValue()) {
        var i = r.getAttribute("patternTransform");
        (r = r.getHrefAttribute().getDefinition()),
          i.hasValue() &&
            r.getAttribute("patternTransform", !0).setValue(i.value);
      }
      return r.createPattern(this.document.ctx, e, t);
    }
    return null;
  }
  getTextBaseline() {
    return this.hasValue() ? S.textBaselineMapping[this.getString()] : null;
  }
  addOpacity(e) {
    for (
      var t = this.getColor(), r = t.length, i = 0, n = 0;
      n < r && (t[n] === "," && i++, i !== 3);
      n++
    );
    if (e.hasValue() && this.isString() && i !== 3) {
      var o = new gi(t);
      o.ok && ((o.alpha = e.getNumber()), (t = o.toRGBA()));
    }
    return new S(this.document, this.name, t);
  }
}
S.textBaselineMapping = {
  baseline: "alphabetic",
  "before-edge": "top",
  "text-before-edge": "top",
  middle: "middle",
  central: "middle",
  "after-edge": "bottom",
  "text-after-edge": "bottom",
  ideographic: "ideographic",
  alphabetic: "alphabetic",
  hanging: "hanging",
  mathematical: "alphabetic",
};
class n1 {
  constructor() {
    this.viewPorts = [];
  }
  clear() {
    this.viewPorts = [];
  }
  setCurrent(e, t) {
    this.viewPorts.push({ width: e, height: t });
  }
  removeCurrent() {
    this.viewPorts.pop();
  }
  getCurrent() {
    var { viewPorts: e } = this;
    return e[e.length - 1];
  }
  get width() {
    return this.getCurrent().width;
  }
  get height() {
    return this.getCurrent().height;
  }
  computeSize(e) {
    return typeof e == "number"
      ? e
      : e === "x"
        ? this.width
        : e === "y"
          ? this.height
          : Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2)) /
            Math.sqrt(2);
  }
}
class D {
  constructor(e, t) {
    (this.x = e), (this.y = t);
  }
  static parse(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
      [r = t, i = t] = ie(e);
    return new D(r, i);
  }
  static parseScale(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1,
      [r = t, i = r] = ie(e);
    return new D(r, i);
  }
  static parsePath(e) {
    for (var t = ie(e), r = t.length, i = [], n = 0; n < r; n += 2)
      i.push(new D(t[n], t[n + 1]));
    return i;
  }
  angleTo(e) {
    return Math.atan2(e.y - this.y, e.x - this.x);
  }
  applyTransform(e) {
    var { x: t, y: r } = this,
      i = t * e[0] + r * e[2] + e[4],
      n = t * e[1] + r * e[3] + e[5];
    (this.x = i), (this.y = n);
  }
}
class s1 {
  constructor(e) {
    (this.screen = e),
      (this.working = !1),
      (this.events = []),
      (this.eventElements = []),
      (this.onClick = this.onClick.bind(this)),
      (this.onMouseMove = this.onMouseMove.bind(this));
  }
  isWorking() {
    return this.working;
  }
  start() {
    if (!this.working) {
      var { screen: e, onClick: t, onMouseMove: r } = this,
        i = e.ctx.canvas;
      (i.onclick = t), (i.onmousemove = r), (this.working = !0);
    }
  }
  stop() {
    if (this.working) {
      var e = this.screen.ctx.canvas;
      (this.working = !1), (e.onclick = null), (e.onmousemove = null);
    }
  }
  hasEvents() {
    return this.working && this.events.length > 0;
  }
  runEvents() {
    if (this.working) {
      var { screen: e, events: t, eventElements: r } = this,
        { style: i } = e.ctx.canvas;
      i && (i.cursor = ""),
        t.forEach((n, o) => {
          for (var { run: s } = n, u = r[o]; u; ) s(u), (u = u.parent);
        }),
        (this.events = []),
        (this.eventElements = []);
    }
  }
  checkPath(e, t) {
    if (!(!this.working || !t)) {
      var { events: r, eventElements: i } = this;
      r.forEach((n, o) => {
        var { x: s, y: u } = n;
        !i[o] && t.isPointInPath && t.isPointInPath(s, u) && (i[o] = e);
      });
    }
  }
  checkBoundingBox(e, t) {
    if (!(!this.working || !t)) {
      var { events: r, eventElements: i } = this;
      r.forEach((n, o) => {
        var { x: s, y: u } = n;
        !i[o] && t.isPointInBox(s, u) && (i[o] = e);
      });
    }
  }
  mapXY(e, t) {
    for (
      var { window: r, ctx: i } = this.screen, n = new D(e, t), o = i.canvas;
      o;

    )
      (n.x -= o.offsetLeft), (n.y -= o.offsetTop), (o = o.offsetParent);
    return r.scrollX && (n.x += r.scrollX), r.scrollY && (n.y += r.scrollY), n;
  }
  onClick(e) {
    var { x: t, y: r } = this.mapXY(e.clientX, e.clientY);
    this.events.push({
      type: "onclick",
      x: t,
      y: r,
      run(i) {
        i.onClick && i.onClick();
      },
    });
  }
  onMouseMove(e) {
    var { x: t, y: r } = this.mapXY(e.clientX, e.clientY);
    this.events.push({
      type: "onmousemove",
      x: t,
      y: r,
      run(i) {
        i.onMouseMove && i.onMouseMove();
      },
    });
  }
}
var vl = typeof window < "u" ? window : null,
  fl = typeof fetch < "u" ? fetch.bind(void 0) : null;
class _r {
  constructor(e) {
    var { fetch: t = fl, window: r = vl } =
      arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    (this.ctx = e),
      (this.FRAMERATE = 30),
      (this.MAX_VIRTUAL_PIXELS = 3e4),
      (this.CLIENT_WIDTH = 800),
      (this.CLIENT_HEIGHT = 600),
      (this.viewPort = new n1()),
      (this.mouse = new s1(this)),
      (this.animations = []),
      (this.waits = []),
      (this.frameDuration = 0),
      (this.isReadyLock = !1),
      (this.isFirstRender = !0),
      (this.intervalId = null),
      (this.window = r),
      (this.fetch = t);
  }
  wait(e) {
    this.waits.push(e);
  }
  ready() {
    return this.readyPromise ? this.readyPromise : Promise.resolve();
  }
  isReady() {
    if (this.isReadyLock) return !0;
    var e = this.waits.every((t) => t());
    return (
      e && ((this.waits = []), this.resolveReady && this.resolveReady()),
      (this.isReadyLock = e),
      e
    );
  }
  setDefaults(e) {
    (e.strokeStyle = "rgba(0,0,0,0)"),
      (e.lineCap = "butt"),
      (e.lineJoin = "miter"),
      (e.miterLimit = 4);
  }
  setViewBox(e) {
    var {
        document: t,
        ctx: r,
        aspectRatio: i,
        width: n,
        desiredWidth: o,
        height: s,
        desiredHeight: u,
        minX: l = 0,
        minY: h = 0,
        refX: f,
        refY: c,
        clip: v = !1,
        clipX: d = 0,
        clipY: g = 0,
      } = e,
      p = ht(i).replace(/^defer\s/, ""),
      [y, x] = p.split(" "),
      b = y || "xMidYMid",
      T = x || "meet",
      $ = n / o,
      E = s / u,
      O = Math.min($, E),
      C = Math.max($, E),
      I = o,
      _ = u;
    T === "meet" && ((I *= O), (_ *= O)), T === "slice" && ((I *= C), (_ *= C));
    var j = new S(t, "refX", f),
      P = new S(t, "refY", c),
      X = j.hasValue() && P.hasValue();
    if ((X && r.translate(-O * j.getPixels("x"), -O * P.getPixels("y")), v)) {
      var W = O * d,
        G = O * g;
      r.beginPath(),
        r.moveTo(W, G),
        r.lineTo(n, G),
        r.lineTo(n, s),
        r.lineTo(W, s),
        r.closePath(),
        r.clip();
    }
    if (!X) {
      var q = T === "meet" && O === E,
        H = T === "slice" && C === E,
        Q = T === "meet" && O === $,
        R = T === "slice" && C === $;
      b.startsWith("xMid") && (q || H) && r.translate(n / 2 - I / 2, 0),
        b.endsWith("YMid") && (Q || R) && r.translate(0, s / 2 - _ / 2),
        b.startsWith("xMax") && (q || H) && r.translate(n - I, 0),
        b.endsWith("YMax") && (Q || R) && r.translate(0, s - _);
    }
    switch (!0) {
      case b === "none":
        r.scale($, E);
        break;
      case T === "meet":
        r.scale(O, O);
        break;
      case T === "slice":
        r.scale(C, C);
        break;
    }
    r.translate(-l, -h);
  }
  start(e) {
    var {
        enableRedraw: t = !1,
        ignoreMouse: r = !1,
        ignoreAnimation: i = !1,
        ignoreDimensions: n = !1,
        ignoreClear: o = !1,
        forceRedraw: s,
        scaleWidth: u,
        scaleHeight: l,
        offsetX: h,
        offsetY: f,
      } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      { FRAMERATE: c, mouse: v } = this,
      d = 1e3 / c;
    if (
      ((this.frameDuration = d),
      (this.readyPromise = new Promise((b) => {
        this.resolveReady = b;
      })),
      this.isReady() && this.render(e, n, o, u, l, h, f),
      !!t)
    ) {
      var g = Date.now(),
        p = g,
        y = 0,
        x = () => {
          (g = Date.now()),
            (y = g - p),
            y >= d &&
              ((p = g - (y % d)),
              this.shouldUpdate(i, s) &&
                (this.render(e, n, o, u, l, h, f), v.runEvents())),
            (this.intervalId = ja(x));
        };
      r || v.start(), (this.intervalId = ja(x));
    }
  }
  stop() {
    this.intervalId && (ja.cancel(this.intervalId), (this.intervalId = null)),
      this.mouse.stop();
  }
  shouldUpdate(e, t) {
    if (!e) {
      var { frameDuration: r } = this,
        i = this.animations.reduce((n, o) => o.update(r) || n, !1);
      if (i) return !0;
    }
    return !!(
      (typeof t == "function" && t()) ||
      (!this.isReadyLock && this.isReady()) ||
      this.mouse.hasEvents()
    );
  }
  render(e, t, r, i, n, o, s) {
    var {
        CLIENT_WIDTH: u,
        CLIENT_HEIGHT: l,
        viewPort: h,
        ctx: f,
        isFirstRender: c,
      } = this,
      v = f.canvas;
    h.clear(),
      v.width && v.height
        ? h.setCurrent(v.width, v.height)
        : h.setCurrent(u, l);
    var d = e.getStyle("width"),
      g = e.getStyle("height");
    !t &&
      (c || (typeof i != "number" && typeof n != "number")) &&
      (d.hasValue() &&
        ((v.width = d.getPixels("x")),
        v.style && (v.style.width = "".concat(v.width, "px"))),
      g.hasValue() &&
        ((v.height = g.getPixels("y")),
        v.style && (v.style.height = "".concat(v.height, "px"))));
    var p = v.clientWidth || v.width,
      y = v.clientHeight || v.height;
    if (
      (t &&
        d.hasValue() &&
        g.hasValue() &&
        ((p = d.getPixels("x")), (y = g.getPixels("y"))),
      h.setCurrent(p, y),
      typeof o == "number" && e.getAttribute("x", !0).setValue(o),
      typeof s == "number" && e.getAttribute("y", !0).setValue(s),
      typeof i == "number" || typeof n == "number")
    ) {
      var x = ie(e.getAttribute("viewBox").getString()),
        b = 0,
        T = 0;
      if (typeof i == "number") {
        var $ = e.getStyle("width");
        $.hasValue()
          ? (b = $.getPixels("x") / i)
          : isNaN(x[2]) || (b = x[2] / i);
      }
      if (typeof n == "number") {
        var E = e.getStyle("height");
        E.hasValue()
          ? (T = E.getPixels("y") / n)
          : isNaN(x[3]) || (T = x[3] / n);
      }
      b || (b = T),
        T || (T = b),
        e.getAttribute("width", !0).setValue(i),
        e.getAttribute("height", !0).setValue(n);
      var O = e.getStyle("transform", !0, !0);
      O.setValue(
        ""
          .concat(O.getString(), " scale(")
          .concat(1 / b, ", ")
          .concat(1 / T, ")"),
      );
    }
    r || f.clearRect(0, 0, p, y), e.render(f), c && (this.isFirstRender = !1);
  }
}
_r.defaultWindow = vl;
_r.defaultFetch = fl;
var { defaultFetch: o1 } = _r,
  u1 = typeof DOMParser < "u" ? DOMParser : null;
class Ua {
  constructor() {
    var { fetch: e = o1, DOMParser: t = u1 } =
      arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    (this.fetch = e), (this.DOMParser = t);
  }
  parse(e) {
    var t = this;
    return xe(function* () {
      return e.startsWith("<") ? t.parseFromString(e) : t.load(e);
    })();
  }
  parseFromString(e) {
    var t = new this.DOMParser();
    try {
      return this.checkDocument(t.parseFromString(e, "image/svg+xml"));
    } catch {
      return this.checkDocument(t.parseFromString(e, "text/xml"));
    }
  }
  checkDocument(e) {
    var t = e.getElementsByTagName("parsererror")[0];
    if (t) throw new Error(t.textContent);
    return e;
  }
  load(e) {
    var t = this;
    return xe(function* () {
      var r = yield t.fetch(e),
        i = yield r.text();
      return t.parseFromString(i);
    })();
  }
}
class l1 {
  constructor(e, t) {
    (this.type = "translate"), (this.point = null), (this.point = D.parse(t));
  }
  apply(e) {
    var { x: t, y: r } = this.point;
    e.translate(t || 0, r || 0);
  }
  unapply(e) {
    var { x: t, y: r } = this.point;
    e.translate(-1 * t || 0, -1 * r || 0);
  }
  applyToPoint(e) {
    var { x: t, y: r } = this.point;
    e.applyTransform([1, 0, 0, 1, t || 0, r || 0]);
  }
}
class h1 {
  constructor(e, t, r) {
    (this.type = "rotate"),
      (this.angle = null),
      (this.originX = null),
      (this.originY = null),
      (this.cx = 0),
      (this.cy = 0);
    var i = ie(t);
    (this.angle = new S(e, "angle", i[0])),
      (this.originX = r[0]),
      (this.originY = r[1]),
      (this.cx = i[1] || 0),
      (this.cy = i[2] || 0);
  }
  apply(e) {
    var { cx: t, cy: r, originX: i, originY: n, angle: o } = this,
      s = t + i.getPixels("x"),
      u = r + n.getPixels("y");
    e.translate(s, u), e.rotate(o.getRadians()), e.translate(-s, -u);
  }
  unapply(e) {
    var { cx: t, cy: r, originX: i, originY: n, angle: o } = this,
      s = t + i.getPixels("x"),
      u = r + n.getPixels("y");
    e.translate(s, u), e.rotate(-1 * o.getRadians()), e.translate(-s, -u);
  }
  applyToPoint(e) {
    var { cx: t, cy: r, angle: i } = this,
      n = i.getRadians();
    e.applyTransform([1, 0, 0, 1, t || 0, r || 0]),
      e.applyTransform([
        Math.cos(n),
        Math.sin(n),
        -Math.sin(n),
        Math.cos(n),
        0,
        0,
      ]),
      e.applyTransform([1, 0, 0, 1, -t || 0, -r || 0]);
  }
}
class v1 {
  constructor(e, t, r) {
    (this.type = "scale"),
      (this.scale = null),
      (this.originX = null),
      (this.originY = null);
    var i = D.parseScale(t);
    (i.x === 0 || i.y === 0) && ((i.x = at), (i.y = at)),
      (this.scale = i),
      (this.originX = r[0]),
      (this.originY = r[1]);
  }
  apply(e) {
    var {
        scale: { x: t, y: r },
        originX: i,
        originY: n,
      } = this,
      o = i.getPixels("x"),
      s = n.getPixels("y");
    e.translate(o, s), e.scale(t, r || t), e.translate(-o, -s);
  }
  unapply(e) {
    var {
        scale: { x: t, y: r },
        originX: i,
        originY: n,
      } = this,
      o = i.getPixels("x"),
      s = n.getPixels("y");
    e.translate(o, s), e.scale(1 / t, 1 / r || t), e.translate(-o, -s);
  }
  applyToPoint(e) {
    var { x: t, y: r } = this.scale;
    e.applyTransform([t || 0, 0, 0, r || 0, 0, 0]);
  }
}
class cl {
  constructor(e, t, r) {
    (this.type = "matrix"),
      (this.matrix = []),
      (this.originX = null),
      (this.originY = null),
      (this.matrix = ie(t)),
      (this.originX = r[0]),
      (this.originY = r[1]);
  }
  apply(e) {
    var { originX: t, originY: r, matrix: i } = this,
      n = t.getPixels("x"),
      o = r.getPixels("y");
    e.translate(n, o),
      e.transform(i[0], i[1], i[2], i[3], i[4], i[5]),
      e.translate(-n, -o);
  }
  unapply(e) {
    var { originX: t, originY: r, matrix: i } = this,
      n = i[0],
      o = i[2],
      s = i[4],
      u = i[1],
      l = i[3],
      h = i[5],
      f = 0,
      c = 0,
      v = 1,
      d = 1 / (n * (l * v - h * c) - o * (u * v - h * f) + s * (u * c - l * f)),
      g = t.getPixels("x"),
      p = r.getPixels("y");
    e.translate(g, p),
      e.transform(
        d * (l * v - h * c),
        d * (h * f - u * v),
        d * (s * c - o * v),
        d * (n * v - s * f),
        d * (o * h - s * l),
        d * (s * u - n * h),
      ),
      e.translate(-g, -p);
  }
  applyToPoint(e) {
    e.applyTransform(this.matrix);
  }
}
class gl extends cl {
  constructor(e, t, r) {
    super(e, t, r),
      (this.type = "skew"),
      (this.angle = null),
      (this.angle = new S(e, "angle", t));
  }
}
class f1 extends gl {
  constructor(e, t, r) {
    super(e, t, r),
      (this.type = "skewX"),
      (this.matrix = [1, 0, Math.tan(this.angle.getRadians()), 1, 0, 0]);
  }
}
class c1 extends gl {
  constructor(e, t, r) {
    super(e, t, r),
      (this.type = "skewY"),
      (this.matrix = [1, Math.tan(this.angle.getRadians()), 0, 1, 0, 0]);
  }
}
function g1(a) {
  return ht(a)
    .trim()
    .replace(/\)([a-zA-Z])/g, ") $1")
    .replace(/\)(\s?,\s?)/g, ") ")
    .split(/\s(?=[a-z])/);
}
function d1(a) {
  var [e, t] = a.split("(");
  return [e.trim(), t.trim().replace(")", "")];
}
class Le {
  constructor(e, t, r) {
    (this.document = e), (this.transforms = []);
    var i = g1(t);
    i.forEach((n) => {
      if (n !== "none") {
        var [o, s] = d1(n),
          u = Le.transformTypes[o];
        typeof u < "u" && this.transforms.push(new u(this.document, s, r));
      }
    });
  }
  static fromElement(e, t) {
    var r = t.getStyle("transform", !1, !0),
      [i, n = i] = t.getStyle("transform-origin", !1, !0).split(),
      o = [i, n];
    return r.hasValue() ? new Le(e, r.getString(), o) : null;
  }
  apply(e) {
    for (var { transforms: t } = this, r = t.length, i = 0; i < r; i++)
      t[i].apply(e);
  }
  unapply(e) {
    for (var { transforms: t } = this, r = t.length, i = r - 1; i >= 0; i--)
      t[i].unapply(e);
  }
  applyToPoint(e) {
    for (var { transforms: t } = this, r = t.length, i = 0; i < r; i++)
      t[i].applyToPoint(e);
  }
}
Le.transformTypes = {
  translate: l1,
  rotate: h1,
  scale: v1,
  matrix: cl,
  skewX: f1,
  skewY: c1,
};
class N {
  constructor(e, t) {
    var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
    if (
      ((this.document = e),
      (this.node = t),
      (this.captureTextNodes = r),
      (this.attributes = {}),
      (this.styles = {}),
      (this.stylesSpecificity = {}),
      (this.animationFrozen = !1),
      (this.animationFrozenValue = ""),
      (this.parent = null),
      (this.children = []),
      !(!t || t.nodeType !== 1))
    ) {
      if (
        (Array.from(t.attributes).forEach((s) => {
          var u = qb(s.nodeName);
          this.attributes[u] = new S(e, u, s.value);
        }),
        this.addStylesFromStyleDefinition(),
        this.getAttribute("style").hasValue())
      ) {
        var i = this.getAttribute("style")
          .getString()
          .split(";")
          .map((s) => s.trim());
        i.forEach((s) => {
          if (s) {
            var [u, l] = s.split(":").map((h) => h.trim());
            this.styles[u] = new S(e, u, l);
          }
        });
      }
      var { definitions: n } = e,
        o = this.getAttribute("id");
      o.hasValue() && (n[o.getString()] || (n[o.getString()] = this)),
        Array.from(t.childNodes).forEach((s) => {
          if (s.nodeType === 1) this.addChild(s);
          else if (r && (s.nodeType === 3 || s.nodeType === 4)) {
            var u = e.createTextNode(s);
            u.getText().length > 0 && this.addChild(u);
          }
        });
    }
  }
  getAttribute(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1,
      r = this.attributes[e];
    if (!r && t) {
      var i = new S(this.document, e, "");
      return (this.attributes[e] = i), i;
    }
    return r || S.empty(this.document);
  }
  getHrefAttribute() {
    for (var e in this.attributes)
      if (e === "href" || e.endsWith(":href")) return this.attributes[e];
    return S.empty(this.document);
  }
  getStyle(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1,
      r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1,
      i = this.styles[e];
    if (i) return i;
    var n = this.getAttribute(e);
    if (n != null && n.hasValue()) return (this.styles[e] = n), n;
    if (!r) {
      var { parent: o } = this;
      if (o) {
        var s = o.getStyle(e);
        if (s != null && s.hasValue()) return s;
      }
    }
    if (t) {
      var u = new S(this.document, e, "");
      return (this.styles[e] = u), u;
    }
    return i || S.empty(this.document);
  }
  render(e) {
    if (
      !(
        this.getStyle("display").getString() === "none" ||
        this.getStyle("visibility").getString() === "hidden"
      )
    ) {
      if ((e.save(), this.getStyle("mask").hasValue())) {
        var t = this.getStyle("mask").getDefinition();
        t && (this.applyEffects(e), t.apply(e, this));
      } else if (this.getStyle("filter").getValue("none") !== "none") {
        var r = this.getStyle("filter").getDefinition();
        r && (this.applyEffects(e), r.apply(e, this));
      } else this.setContext(e), this.renderChildren(e), this.clearContext(e);
      e.restore();
    }
  }
  setContext(e) {}
  applyEffects(e) {
    var t = Le.fromElement(this.document, this);
    t && t.apply(e);
    var r = this.getStyle("clip-path", !1, !0);
    if (r.hasValue()) {
      var i = r.getDefinition();
      i && i.apply(e);
    }
  }
  clearContext(e) {}
  renderChildren(e) {
    this.children.forEach((t) => {
      t.render(e);
    });
  }
  addChild(e) {
    var t = e instanceof N ? e : this.document.createElement(e);
    (t.parent = this),
      N.ignoreChildTypes.includes(t.type) || this.children.push(t);
  }
  matchesSelector(e) {
    var t,
      { node: r } = this;
    if (typeof r.matches == "function") return r.matches(e);
    var i =
      (t = r.getAttribute) === null || t === void 0
        ? void 0
        : t.call(r, "class");
    return !i || i === "" ? !1 : i.split(" ").some((n) => ".".concat(n) === e);
  }
  addStylesFromStyleDefinition() {
    var { styles: e, stylesSpecificity: t } = this.document;
    for (var r in e)
      if (!r.startsWith("@") && this.matchesSelector(r)) {
        var i = e[r],
          n = t[r];
        if (i)
          for (var o in i) {
            var s = this.stylesSpecificity[o];
            typeof s > "u" && (s = "000"),
              n >= s &&
                ((this.styles[o] = i[o]), (this.stylesSpecificity[o] = n));
          }
      }
  }
  removeStyles(e, t) {
    var r = t.reduce((i, n) => {
      var o = e.getStyle(n);
      if (!o.hasValue()) return i;
      var s = o.getString();
      return o.setValue(""), [...i, [n, s]];
    }, []);
    return r;
  }
  restoreStyles(e, t) {
    t.forEach((r) => {
      var [i, n] = r;
      e.getStyle(i, !0).setValue(n);
    });
  }
  isFirstChild() {
    var e;
    return (
      ((e = this.parent) === null || e === void 0
        ? void 0
        : e.children.indexOf(this)) === 0
    );
  }
}
N.ignoreChildTypes = ["title"];
class p1 extends N {
  constructor(e, t, r) {
    super(e, t, r);
  }
}
function y1(a) {
  var e = a.trim();
  return /^('|")/.test(e) ? e : '"'.concat(e, '"');
}
function m1(a) {
  return typeof process > "u" ? a : a.trim().split(",").map(y1).join(",");
}
function b1(a) {
  if (!a) return "";
  var e = a.trim().toLowerCase();
  switch (e) {
    case "normal":
    case "italic":
    case "oblique":
    case "inherit":
    case "initial":
    case "unset":
      return e;
    default:
      return /^oblique\s+(-|)\d+deg$/.test(e) ? e : "";
  }
}
function x1(a) {
  if (!a) return "";
  var e = a.trim().toLowerCase();
  switch (e) {
    case "normal":
    case "bold":
    case "lighter":
    case "bolder":
    case "inherit":
    case "initial":
    case "unset":
      return e;
    default:
      return /^[\d.]+$/.test(e) ? e : "";
  }
}
class Z {
  constructor(e, t, r, i, n, o) {
    var s = o ? (typeof o == "string" ? Z.parse(o) : o) : {};
    (this.fontFamily = n || s.fontFamily),
      (this.fontSize = i || s.fontSize),
      (this.fontStyle = e || s.fontStyle),
      (this.fontWeight = r || s.fontWeight),
      (this.fontVariant = t || s.fontVariant);
  }
  static parse() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "",
      t = arguments.length > 1 ? arguments[1] : void 0,
      r = "",
      i = "",
      n = "",
      o = "",
      s = "",
      u = ht(e).trim().split(" "),
      l = { fontSize: !1, fontStyle: !1, fontWeight: !1, fontVariant: !1 };
    return (
      u.forEach((h) => {
        switch (!0) {
          case !l.fontStyle && Z.styles.includes(h):
            h !== "inherit" && (r = h), (l.fontStyle = !0);
            break;
          case !l.fontVariant && Z.variants.includes(h):
            h !== "inherit" && (i = h),
              (l.fontStyle = !0),
              (l.fontVariant = !0);
            break;
          case !l.fontWeight && Z.weights.includes(h):
            h !== "inherit" && (n = h),
              (l.fontStyle = !0),
              (l.fontVariant = !0),
              (l.fontWeight = !0);
            break;
          case !l.fontSize:
            h !== "inherit" && ([o] = h.split("/")),
              (l.fontStyle = !0),
              (l.fontVariant = !0),
              (l.fontWeight = !0),
              (l.fontSize = !0);
            break;
          default:
            h !== "inherit" && (s += h);
        }
      }),
      new Z(r, i, n, o, s, t)
    );
  }
  toString() {
    return [
      b1(this.fontStyle),
      this.fontVariant,
      x1(this.fontWeight),
      this.fontSize,
      m1(this.fontFamily),
    ]
      .join(" ")
      .trim();
  }
}
Z.styles = "normal|italic|oblique|inherit";
Z.variants = "normal|small-caps|inherit";
Z.weights =
  "normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900|inherit";
class ce {
  constructor() {
    var e =
        arguments.length > 0 && arguments[0] !== void 0
          ? arguments[0]
          : Number.NaN,
      t =
        arguments.length > 1 && arguments[1] !== void 0
          ? arguments[1]
          : Number.NaN,
      r =
        arguments.length > 2 && arguments[2] !== void 0
          ? arguments[2]
          : Number.NaN,
      i =
        arguments.length > 3 && arguments[3] !== void 0
          ? arguments[3]
          : Number.NaN;
    (this.x1 = e),
      (this.y1 = t),
      (this.x2 = r),
      (this.y2 = i),
      this.addPoint(e, t),
      this.addPoint(r, i);
  }
  get x() {
    return this.x1;
  }
  get y() {
    return this.y1;
  }
  get width() {
    return this.x2 - this.x1;
  }
  get height() {
    return this.y2 - this.y1;
  }
  addPoint(e, t) {
    typeof e < "u" &&
      ((isNaN(this.x1) || isNaN(this.x2)) && ((this.x1 = e), (this.x2 = e)),
      e < this.x1 && (this.x1 = e),
      e > this.x2 && (this.x2 = e)),
      typeof t < "u" &&
        ((isNaN(this.y1) || isNaN(this.y2)) && ((this.y1 = t), (this.y2 = t)),
        t < this.y1 && (this.y1 = t),
        t > this.y2 && (this.y2 = t));
  }
  addX(e) {
    this.addPoint(e, null);
  }
  addY(e) {
    this.addPoint(null, e);
  }
  addBoundingBox(e) {
    if (e) {
      var { x1: t, y1: r, x2: i, y2: n } = e;
      this.addPoint(t, r), this.addPoint(i, n);
    }
  }
  sumCubic(e, t, r, i, n) {
    return (
      Math.pow(1 - e, 3) * t +
      3 * Math.pow(1 - e, 2) * e * r +
      3 * (1 - e) * Math.pow(e, 2) * i +
      Math.pow(e, 3) * n
    );
  }
  bezierCurveAdd(e, t, r, i, n) {
    var o = 6 * t - 12 * r + 6 * i,
      s = -3 * t + 9 * r - 9 * i + 3 * n,
      u = 3 * r - 3 * t;
    if (s === 0) {
      if (o === 0) return;
      var l = -u / o;
      0 < l &&
        l < 1 &&
        (e
          ? this.addX(this.sumCubic(l, t, r, i, n))
          : this.addY(this.sumCubic(l, t, r, i, n)));
      return;
    }
    var h = Math.pow(o, 2) - 4 * u * s;
    if (!(h < 0)) {
      var f = (-o + Math.sqrt(h)) / (2 * s);
      0 < f &&
        f < 1 &&
        (e
          ? this.addX(this.sumCubic(f, t, r, i, n))
          : this.addY(this.sumCubic(f, t, r, i, n)));
      var c = (-o - Math.sqrt(h)) / (2 * s);
      0 < c &&
        c < 1 &&
        (e
          ? this.addX(this.sumCubic(c, t, r, i, n))
          : this.addY(this.sumCubic(c, t, r, i, n)));
    }
  }
  addBezierCurve(e, t, r, i, n, o, s, u) {
    this.addPoint(e, t),
      this.addPoint(s, u),
      this.bezierCurveAdd(!0, e, r, n, s),
      this.bezierCurveAdd(!1, t, i, o, u);
  }
  addQuadraticCurve(e, t, r, i, n, o) {
    var s = e + 0.6666666666666666 * (r - e),
      u = t + (2 / 3) * (i - t),
      l = s + (1 / 3) * (n - e),
      h = u + (1 / 3) * (o - t);
    this.addBezierCurve(e, t, s, l, u, h, n, o);
  }
  isPointInBox(e, t) {
    var { x1: r, y1: i, x2: n, y2: o } = this;
    return r <= e && e <= n && i <= t && t <= o;
  }
}
class w extends m {
  constructor(e) {
    super(
      e
        .replace(/([+\-.])\s+/gm, "$1")
        .replace(/[^MmZzLlHhVvCcSsQqTtAae\d\s.,+-].*/g, ""),
    ),
      (this.control = null),
      (this.start = null),
      (this.current = null),
      (this.command = null),
      (this.commands = this.commands),
      (this.i = -1),
      (this.previousCommand = null),
      (this.points = []),
      (this.angles = []);
  }
  reset() {
    (this.i = -1),
      (this.command = null),
      (this.previousCommand = null),
      (this.start = new D(0, 0)),
      (this.control = new D(0, 0)),
      (this.current = new D(0, 0)),
      (this.points = []),
      (this.angles = []);
  }
  isEnd() {
    var { i: e, commands: t } = this;
    return e >= t.length - 1;
  }
  next() {
    var e = this.commands[++this.i];
    return (this.previousCommand = this.command), (this.command = e), e;
  }
  getPoint() {
    var e =
        arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "x",
      t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "y",
      r = new D(this.command[e], this.command[t]);
    return this.makeAbsolute(r);
  }
  getAsControlPoint(e, t) {
    var r = this.getPoint(e, t);
    return (this.control = r), r;
  }
  getAsCurrentPoint(e, t) {
    var r = this.getPoint(e, t);
    return (this.current = r), r;
  }
  getReflectedControlPoint() {
    var e = this.previousCommand.type;
    if (
      e !== m.CURVE_TO &&
      e !== m.SMOOTH_CURVE_TO &&
      e !== m.QUAD_TO &&
      e !== m.SMOOTH_QUAD_TO
    )
      return this.current;
    var {
        current: { x: t, y: r },
        control: { x: i, y: n },
      } = this,
      o = new D(2 * t - i, 2 * r - n);
    return o;
  }
  makeAbsolute(e) {
    if (this.command.relative) {
      var { x: t, y: r } = this.current;
      (e.x += t), (e.y += r);
    }
    return e;
  }
  addMarker(e, t, r) {
    var { points: i, angles: n } = this;
    r &&
      n.length > 0 &&
      !n[n.length - 1] &&
      (n[n.length - 1] = i[i.length - 1].angleTo(r)),
      this.addMarkerAngle(e, t ? t.angleTo(e) : null);
  }
  addMarkerAngle(e, t) {
    this.points.push(e), this.angles.push(t);
  }
  getMarkerPoints() {
    return this.points;
  }
  getMarkerAngles() {
    for (var { angles: e } = this, t = e.length, r = 0; r < t; r++)
      if (!e[r]) {
        for (var i = r + 1; i < t; i++)
          if (e[i]) {
            e[r] = e[i];
            break;
          }
      }
    return e;
  }
}
class Ge extends N {
  constructor() {
    super(...arguments), (this.modifiedEmSizeStack = !1);
  }
  calculateOpacity() {
    for (var e = 1, t = this; t; ) {
      var r = t.getStyle("opacity", !1, !0);
      r.hasValue(!0) && (e *= r.getNumber()), (t = t.parent);
    }
    return e;
  }
  setContext(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (!t) {
      var r = this.getStyle("fill"),
        i = this.getStyle("fill-opacity"),
        n = this.getStyle("stroke"),
        o = this.getStyle("stroke-opacity");
      if (r.isUrlDefinition()) {
        var s = r.getFillStyleDefinition(this, i);
        s && (e.fillStyle = s);
      } else if (r.hasValue()) {
        r.getString() === "currentColor" &&
          r.setValue(this.getStyle("color").getColor());
        var u = r.getColor();
        u !== "inherit" && (e.fillStyle = u === "none" ? "rgba(0,0,0,0)" : u);
      }
      if (i.hasValue()) {
        var l = new S(this.document, "fill", e.fillStyle)
          .addOpacity(i)
          .getColor();
        e.fillStyle = l;
      }
      if (n.isUrlDefinition()) {
        var h = n.getFillStyleDefinition(this, o);
        h && (e.strokeStyle = h);
      } else if (n.hasValue()) {
        n.getString() === "currentColor" &&
          n.setValue(this.getStyle("color").getColor());
        var f = n.getString();
        f !== "inherit" && (e.strokeStyle = f === "none" ? "rgba(0,0,0,0)" : f);
      }
      if (o.hasValue()) {
        var c = new S(this.document, "stroke", e.strokeStyle)
          .addOpacity(o)
          .getString();
        e.strokeStyle = c;
      }
      var v = this.getStyle("stroke-width");
      if (v.hasValue()) {
        var d = v.getPixels();
        e.lineWidth = d || at;
      }
      var g = this.getStyle("stroke-linecap"),
        p = this.getStyle("stroke-linejoin"),
        y = this.getStyle("stroke-miterlimit"),
        x = this.getStyle("stroke-dasharray"),
        b = this.getStyle("stroke-dashoffset");
      if (
        (g.hasValue() && (e.lineCap = g.getString()),
        p.hasValue() && (e.lineJoin = p.getString()),
        y.hasValue() && (e.miterLimit = y.getNumber()),
        x.hasValue() && x.getString() !== "none")
      ) {
        var T = ie(x.getString());
        typeof e.setLineDash < "u"
          ? e.setLineDash(T)
          : typeof e.webkitLineDash < "u"
            ? (e.webkitLineDash = T)
            : typeof e.mozDash < "u" &&
              !(T.length === 1 && T[0] === 0) &&
              (e.mozDash = T);
        var $ = b.getPixels();
        typeof e.lineDashOffset < "u"
          ? (e.lineDashOffset = $)
          : typeof e.webkitLineDashOffset < "u"
            ? (e.webkitLineDashOffset = $)
            : typeof e.mozDashOffset < "u" && (e.mozDashOffset = $);
      }
    }
    if (((this.modifiedEmSizeStack = !1), typeof e.font < "u")) {
      var E = this.getStyle("font"),
        O = this.getStyle("font-style"),
        C = this.getStyle("font-variant"),
        I = this.getStyle("font-weight"),
        _ = this.getStyle("font-size"),
        j = this.getStyle("font-family"),
        P = new Z(
          O.getString(),
          C.getString(),
          I.getString(),
          _.hasValue() ? "".concat(_.getPixels(!0), "px") : "",
          j.getString(),
          Z.parse(E.getString(), e.font),
        );
      O.setValue(P.fontStyle),
        C.setValue(P.fontVariant),
        I.setValue(P.fontWeight),
        _.setValue(P.fontSize),
        j.setValue(P.fontFamily),
        (e.font = P.toString()),
        _.isPixels() &&
          ((this.document.emSize = _.getPixels()),
          (this.modifiedEmSizeStack = !0));
    }
    t || (this.applyEffects(e), (e.globalAlpha = this.calculateOpacity()));
  }
  clearContext(e) {
    super.clearContext(e),
      this.modifiedEmSizeStack && this.document.popEmSize();
  }
}
class A extends Ge {
  constructor(e, t, r) {
    super(e, t, r),
      (this.type = "path"),
      (this.pathParser = null),
      (this.pathParser = new w(this.getAttribute("d").getString()));
  }
  path(e) {
    var { pathParser: t } = this,
      r = new ce();
    for (t.reset(), e && e.beginPath(); !t.isEnd(); )
      switch (t.next().type) {
        case w.MOVE_TO:
          this.pathM(e, r);
          break;
        case w.LINE_TO:
          this.pathL(e, r);
          break;
        case w.HORIZ_LINE_TO:
          this.pathH(e, r);
          break;
        case w.VERT_LINE_TO:
          this.pathV(e, r);
          break;
        case w.CURVE_TO:
          this.pathC(e, r);
          break;
        case w.SMOOTH_CURVE_TO:
          this.pathS(e, r);
          break;
        case w.QUAD_TO:
          this.pathQ(e, r);
          break;
        case w.SMOOTH_QUAD_TO:
          this.pathT(e, r);
          break;
        case w.ARC:
          this.pathA(e, r);
          break;
        case w.CLOSE_PATH:
          this.pathZ(e, r);
          break;
      }
    return r;
  }
  getBoundingBox(e) {
    return this.path();
  }
  getMarkers() {
    var { pathParser: e } = this,
      t = e.getMarkerPoints(),
      r = e.getMarkerAngles(),
      i = t.map((n, o) => [n, r[o]]);
    return i;
  }
  renderChildren(e) {
    this.path(e), this.document.screen.mouse.checkPath(this, e);
    var t = this.getStyle("fill-rule");
    e.fillStyle !== "" &&
      (t.getString("inherit") !== "inherit" ? e.fill(t.getString()) : e.fill()),
      e.strokeStyle !== "" &&
        (this.getAttribute("vector-effect").getString() === "non-scaling-stroke"
          ? (e.save(),
            e.setTransform(1, 0, 0, 1, 0, 0),
            e.stroke(),
            e.restore())
          : e.stroke());
    var r = this.getMarkers();
    if (r) {
      var i = r.length - 1,
        n = this.getStyle("marker-start"),
        o = this.getStyle("marker-mid"),
        s = this.getStyle("marker-end");
      if (n.isUrlDefinition()) {
        var u = n.getDefinition(),
          [l, h] = r[0];
        u.render(e, l, h);
      }
      if (o.isUrlDefinition())
        for (var f = o.getDefinition(), c = 1; c < i; c++) {
          var [v, d] = r[c];
          f.render(e, v, d);
        }
      if (s.isUrlDefinition()) {
        var g = s.getDefinition(),
          [p, y] = r[i];
        g.render(e, p, y);
      }
    }
  }
  static pathM(e) {
    var t = e.getAsCurrentPoint();
    return (e.start = e.current), { point: t };
  }
  pathM(e, t) {
    var { pathParser: r } = this,
      { point: i } = A.pathM(r),
      { x: n, y: o } = i;
    r.addMarker(i), t.addPoint(n, o), e && e.moveTo(n, o);
  }
  static pathL(e) {
    var { current: t } = e,
      r = e.getAsCurrentPoint();
    return { current: t, point: r };
  }
  pathL(e, t) {
    var { pathParser: r } = this,
      { current: i, point: n } = A.pathL(r),
      { x: o, y: s } = n;
    r.addMarker(n, i), t.addPoint(o, s), e && e.lineTo(o, s);
  }
  static pathH(e) {
    var { current: t, command: r } = e,
      i = new D((r.relative ? t.x : 0) + r.x, t.y);
    return (e.current = i), { current: t, point: i };
  }
  pathH(e, t) {
    var { pathParser: r } = this,
      { current: i, point: n } = A.pathH(r),
      { x: o, y: s } = n;
    r.addMarker(n, i), t.addPoint(o, s), e && e.lineTo(o, s);
  }
  static pathV(e) {
    var { current: t, command: r } = e,
      i = new D(t.x, (r.relative ? t.y : 0) + r.y);
    return (e.current = i), { current: t, point: i };
  }
  pathV(e, t) {
    var { pathParser: r } = this,
      { current: i, point: n } = A.pathV(r),
      { x: o, y: s } = n;
    r.addMarker(n, i), t.addPoint(o, s), e && e.lineTo(o, s);
  }
  static pathC(e) {
    var { current: t } = e,
      r = e.getPoint("x1", "y1"),
      i = e.getAsControlPoint("x2", "y2"),
      n = e.getAsCurrentPoint();
    return { current: t, point: r, controlPoint: i, currentPoint: n };
  }
  pathC(e, t) {
    var { pathParser: r } = this,
      { current: i, point: n, controlPoint: o, currentPoint: s } = A.pathC(r);
    r.addMarker(s, o, n),
      t.addBezierCurve(i.x, i.y, n.x, n.y, o.x, o.y, s.x, s.y),
      e && e.bezierCurveTo(n.x, n.y, o.x, o.y, s.x, s.y);
  }
  static pathS(e) {
    var { current: t } = e,
      r = e.getReflectedControlPoint(),
      i = e.getAsControlPoint("x2", "y2"),
      n = e.getAsCurrentPoint();
    return { current: t, point: r, controlPoint: i, currentPoint: n };
  }
  pathS(e, t) {
    var { pathParser: r } = this,
      { current: i, point: n, controlPoint: o, currentPoint: s } = A.pathS(r);
    r.addMarker(s, o, n),
      t.addBezierCurve(i.x, i.y, n.x, n.y, o.x, o.y, s.x, s.y),
      e && e.bezierCurveTo(n.x, n.y, o.x, o.y, s.x, s.y);
  }
  static pathQ(e) {
    var { current: t } = e,
      r = e.getAsControlPoint("x1", "y1"),
      i = e.getAsCurrentPoint();
    return { current: t, controlPoint: r, currentPoint: i };
  }
  pathQ(e, t) {
    var { pathParser: r } = this,
      { current: i, controlPoint: n, currentPoint: o } = A.pathQ(r);
    r.addMarker(o, n, n),
      t.addQuadraticCurve(i.x, i.y, n.x, n.y, o.x, o.y),
      e && e.quadraticCurveTo(n.x, n.y, o.x, o.y);
  }
  static pathT(e) {
    var { current: t } = e,
      r = e.getReflectedControlPoint();
    e.control = r;
    var i = e.getAsCurrentPoint();
    return { current: t, controlPoint: r, currentPoint: i };
  }
  pathT(e, t) {
    var { pathParser: r } = this,
      { current: i, controlPoint: n, currentPoint: o } = A.pathT(r);
    r.addMarker(o, n, n),
      t.addQuadraticCurve(i.x, i.y, n.x, n.y, o.x, o.y),
      e && e.quadraticCurveTo(n.x, n.y, o.x, o.y);
  }
  static pathA(e) {
    var { current: t, command: r } = e,
      { rX: i, rY: n, xRot: o, lArcFlag: s, sweepFlag: u } = r,
      l = o * (Math.PI / 180),
      h = e.getAsCurrentPoint(),
      f = new D(
        (Math.cos(l) * (t.x - h.x)) / 2 + (Math.sin(l) * (t.y - h.y)) / 2,
        (-Math.sin(l) * (t.x - h.x)) / 2 + (Math.cos(l) * (t.y - h.y)) / 2,
      ),
      c = Math.pow(f.x, 2) / Math.pow(i, 2) + Math.pow(f.y, 2) / Math.pow(n, 2);
    c > 1 && ((i *= Math.sqrt(c)), (n *= Math.sqrt(c)));
    var v =
      (s === u ? -1 : 1) *
      Math.sqrt(
        (Math.pow(i, 2) * Math.pow(n, 2) -
          Math.pow(i, 2) * Math.pow(f.y, 2) -
          Math.pow(n, 2) * Math.pow(f.x, 2)) /
          (Math.pow(i, 2) * Math.pow(f.y, 2) +
            Math.pow(n, 2) * Math.pow(f.x, 2)),
      );
    isNaN(v) && (v = 0);
    var d = new D((v * i * f.y) / n, (v * -n * f.x) / i),
      g = new D(
        (t.x + h.x) / 2 + Math.cos(l) * d.x - Math.sin(l) * d.y,
        (t.y + h.y) / 2 + Math.sin(l) * d.x + Math.cos(l) * d.y,
      ),
      p = yo([1, 0], [(f.x - d.x) / i, (f.y - d.y) / n]),
      y = [(f.x - d.x) / i, (f.y - d.y) / n],
      x = [(-f.x - d.x) / i, (-f.y - d.y) / n],
      b = yo(y, x);
    return (
      yi(y, x) <= -1 && (b = Math.PI),
      yi(y, x) >= 1 && (b = 0),
      {
        currentPoint: h,
        rX: i,
        rY: n,
        sweepFlag: u,
        xAxisRotation: l,
        centp: g,
        a1: p,
        ad: b,
      }
    );
  }
  pathA(e, t) {
    var { pathParser: r } = this,
      {
        currentPoint: i,
        rX: n,
        rY: o,
        sweepFlag: s,
        xAxisRotation: u,
        centp: l,
        a1: h,
        ad: f,
      } = A.pathA(r),
      c = 1 - s ? 1 : -1,
      v = h + c * (f / 2),
      d = new D(l.x + n * Math.cos(v), l.y + o * Math.sin(v));
    if (
      (r.addMarkerAngle(d, v - (c * Math.PI) / 2),
      r.addMarkerAngle(i, v - c * Math.PI),
      t.addPoint(i.x, i.y),
      e && !isNaN(h) && !isNaN(f))
    ) {
      var g = n > o ? n : o,
        p = n > o ? 1 : n / o,
        y = n > o ? o / n : 1;
      e.translate(l.x, l.y),
        e.rotate(u),
        e.scale(p, y),
        e.arc(0, 0, g, h, h + f, !!(1 - s)),
        e.scale(1 / p, 1 / y),
        e.rotate(-u),
        e.translate(-l.x, -l.y);
    }
  }
  static pathZ(e) {
    e.current = e.start;
  }
  pathZ(e, t) {
    A.pathZ(this.pathParser),
      e && t.x1 !== t.x2 && t.y1 !== t.y2 && e.closePath();
  }
}
class dl extends A {
  constructor(e, t, r) {
    super(e, t, r),
      (this.type = "glyph"),
      (this.horizAdvX = this.getAttribute("horiz-adv-x").getNumber()),
      (this.unicode = this.getAttribute("unicode").getString()),
      (this.arabicForm = this.getAttribute("arabic-form").getString());
  }
}
class Ce extends Ge {
  constructor(e, t, r) {
    super(e, t, new.target === Ce ? !0 : r),
      (this.type = "text"),
      (this.x = 0),
      (this.y = 0),
      (this.measureCache = -1);
  }
  setContext(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    super.setContext(e, t);
    var r =
      this.getStyle("dominant-baseline").getTextBaseline() ||
      this.getStyle("alignment-baseline").getTextBaseline();
    r && (e.textBaseline = r);
  }
  initializeCoordinates() {
    (this.x = 0),
      (this.y = 0),
      (this.leafTexts = []),
      (this.textChunkStart = 0),
      (this.minX = Number.POSITIVE_INFINITY),
      (this.maxX = Number.NEGATIVE_INFINITY);
  }
  getBoundingBox(e) {
    if (this.type !== "text") return this.getTElementBoundingBox(e);
    this.initializeCoordinates(), this.adjustChildCoordinatesRecursive(e);
    var t = null;
    return (
      this.children.forEach((r, i) => {
        var n = this.getChildBoundingBox(e, this, this, i);
        t ? t.addBoundingBox(n) : (t = n);
      }),
      t
    );
  }
  getFontSize() {
    var { document: e, parent: t } = this,
      r = Z.parse(e.ctx.font).fontSize,
      i = t.getStyle("font-size").getNumber(r);
    return i;
  }
  getTElementBoundingBox(e) {
    var t = this.getFontSize();
    return new ce(this.x, this.y - t, this.x + this.measureText(e), this.y);
  }
  getGlyph(e, t, r) {
    var i = t[r],
      n = null;
    if (e.isArabic) {
      var o = t.length,
        s = t[r - 1],
        u = t[r + 1],
        l = "isolated";
      if (
        ((r === 0 || s === " ") && r < o - 1 && u !== " " && (l = "terminal"),
        r > 0 && s !== " " && r < o - 1 && u !== " " && (l = "medial"),
        r > 0 && s !== " " && (r === o - 1 || u === " ") && (l = "initial"),
        typeof e.glyphs[i] < "u")
      ) {
        var h = e.glyphs[i];
        n = h instanceof dl ? h : h[l];
      }
    } else n = e.glyphs[i];
    return n || (n = e.missingGlyph), n;
  }
  getText() {
    return "";
  }
  getTextFromNode(e) {
    var t = e || this.node,
      r = Array.from(t.parentNode.childNodes),
      i = r.indexOf(t),
      n = r.length - 1,
      o = ht(t.textContent || "");
    return i === 0 && (o = Yb(o)), i === n && (o = Xb(o)), o;
  }
  renderChildren(e) {
    if (this.type !== "text") {
      this.renderTElementChildren(e);
      return;
    }
    this.initializeCoordinates(),
      this.adjustChildCoordinatesRecursive(e),
      this.children.forEach((r, i) => {
        this.renderChild(e, this, this, i);
      });
    var { mouse: t } = this.document.screen;
    t.isWorking() && t.checkBoundingBox(this, this.getBoundingBox(e));
  }
  renderTElementChildren(e) {
    var { document: t, parent: r } = this,
      i = this.getText(),
      n = r.getStyle("font-family").getDefinition();
    if (n) {
      for (
        var { unitsPerEm: o } = n.fontFace,
          s = Z.parse(t.ctx.font),
          u = r.getStyle("font-size").getNumber(s.fontSize),
          l = r.getStyle("font-style").getString(s.fontStyle),
          h = u / o,
          f = n.isRTL ? i.split("").reverse().join("") : i,
          c = ie(r.getAttribute("dx").getString()),
          v = f.length,
          d = 0;
        d < v;
        d++
      ) {
        var g = this.getGlyph(n, f, d);
        e.translate(this.x, this.y), e.scale(h, -h);
        var p = e.lineWidth;
        (e.lineWidth = (e.lineWidth * o) / u),
          l === "italic" && e.transform(1, 0, 0.4, 1, 0, 0),
          g.render(e),
          l === "italic" && e.transform(1, 0, -0.4, 1, 0, 0),
          (e.lineWidth = p),
          e.scale(1 / h, -1 / h),
          e.translate(-this.x, -this.y),
          (this.x += (u * (g.horizAdvX || n.horizAdvX)) / o),
          typeof c[d] < "u" && !isNaN(c[d]) && (this.x += c[d]);
      }
      return;
    }
    var { x: y, y: x } = this;
    e.fillStyle && e.fillText(i, y, x), e.strokeStyle && e.strokeText(i, y, x);
  }
  applyAnchoring() {
    if (!(this.textChunkStart >= this.leafTexts.length)) {
      var e = this.leafTexts[this.textChunkStart],
        t = e.getStyle("text-anchor").getString("start"),
        r = !1,
        i = 0;
      t === "start" || (t === "end" && r)
        ? (i = e.x - this.minX)
        : t === "end" || (t === "start" && r)
          ? (i = e.x - this.maxX)
          : (i = e.x - (this.minX + this.maxX) / 2);
      for (var n = this.textChunkStart; n < this.leafTexts.length; n++)
        this.leafTexts[n].x += i;
      (this.minX = Number.POSITIVE_INFINITY),
        (this.maxX = Number.NEGATIVE_INFINITY),
        (this.textChunkStart = this.leafTexts.length);
    }
  }
  adjustChildCoordinatesRecursive(e) {
    this.children.forEach((t, r) => {
      this.adjustChildCoordinatesRecursiveCore(e, this, this, r);
    }),
      this.applyAnchoring();
  }
  adjustChildCoordinatesRecursiveCore(e, t, r, i) {
    var n = r.children[i];
    n.children.length > 0
      ? n.children.forEach((o, s) => {
          t.adjustChildCoordinatesRecursiveCore(e, t, n, s);
        })
      : this.adjustChildCoordinates(e, t, r, i);
  }
  adjustChildCoordinates(e, t, r, i) {
    var n = r.children[i];
    if (typeof n.measureText != "function") return n;
    e.save(), n.setContext(e, !0);
    var o = n.getAttribute("x"),
      s = n.getAttribute("y"),
      u = n.getAttribute("dx"),
      l = n.getAttribute("dy"),
      h = n.getStyle("font-family").getDefinition(),
      f = !!h && h.isRTL;
    i === 0 &&
      (o.hasValue() || o.setValue(n.getInheritedAttribute("x")),
      s.hasValue() || s.setValue(n.getInheritedAttribute("y")),
      u.hasValue() || u.setValue(n.getInheritedAttribute("dx")),
      l.hasValue() || l.setValue(n.getInheritedAttribute("dy")));
    var c = n.measureText(e);
    return (
      f && (t.x -= c),
      o.hasValue()
        ? (t.applyAnchoring(),
          (n.x = o.getPixels("x")),
          u.hasValue() && (n.x += u.getPixels("x")))
        : (u.hasValue() && (t.x += u.getPixels("x")), (n.x = t.x)),
      (t.x = n.x),
      f || (t.x += c),
      s.hasValue()
        ? ((n.y = s.getPixels("y")), l.hasValue() && (n.y += l.getPixels("y")))
        : (l.hasValue() && (t.y += l.getPixels("y")), (n.y = t.y)),
      (t.y = n.y),
      t.leafTexts.push(n),
      (t.minX = Math.min(t.minX, n.x, n.x + c)),
      (t.maxX = Math.max(t.maxX, n.x, n.x + c)),
      n.clearContext(e),
      e.restore(),
      n
    );
  }
  getChildBoundingBox(e, t, r, i) {
    var n = r.children[i];
    if (typeof n.getBoundingBox != "function") return null;
    var o = n.getBoundingBox(e);
    return o
      ? (n.children.forEach((s, u) => {
          var l = t.getChildBoundingBox(e, t, n, u);
          o.addBoundingBox(l);
        }),
        o)
      : null;
  }
  renderChild(e, t, r, i) {
    var n = r.children[i];
    n.render(e),
      n.children.forEach((o, s) => {
        t.renderChild(e, t, n, s);
      });
  }
  measureText(e) {
    var { measureCache: t } = this;
    if (~t) return t;
    var r = this.getText(),
      i = this.measureTargetText(e, r);
    return (this.measureCache = i), i;
  }
  measureTargetText(e, t) {
    if (!t.length) return 0;
    var { parent: r } = this,
      i = r.getStyle("font-family").getDefinition();
    if (i) {
      for (
        var n = this.getFontSize(),
          o = i.isRTL ? t.split("").reverse().join("") : t,
          s = ie(r.getAttribute("dx").getString()),
          u = o.length,
          l = 0,
          h = 0;
        h < u;
        h++
      ) {
        var f = this.getGlyph(i, o, h);
        (l += ((f.horizAdvX || i.horizAdvX) * n) / i.fontFace.unitsPerEm),
          typeof s[h] < "u" && !isNaN(s[h]) && (l += s[h]);
      }
      return l;
    }
    if (!e.measureText) return t.length * 10;
    e.save(), this.setContext(e, !0);
    var { width: c } = e.measureText(t);
    return this.clearContext(e), e.restore(), c;
  }
  getInheritedAttribute(e) {
    for (var t = this; t instanceof Ce && t.isFirstChild(); ) {
      var r = t.parent.getAttribute(e);
      if (r.hasValue(!0)) return r.getValue("0");
      t = t.parent;
    }
    return null;
  }
}
class Vr extends Ce {
  constructor(e, t, r) {
    super(e, t, new.target === Vr ? !0 : r),
      (this.type = "tspan"),
      (this.text = this.children.length > 0 ? "" : this.getTextFromNode());
  }
  getText() {
    return this.text;
  }
}
class T1 extends Vr {
  constructor() {
    super(...arguments), (this.type = "textNode");
  }
}
class It extends Ge {
  constructor() {
    super(...arguments), (this.type = "svg"), (this.root = !1);
  }
  setContext(e) {
    var t,
      { document: r } = this,
      { screen: i, window: n } = r,
      o = e.canvas;
    if (
      (i.setDefaults(e),
      o.style && typeof e.font < "u" && n && typeof n.getComputedStyle < "u")
    ) {
      e.font = n.getComputedStyle(o).getPropertyValue("font");
      var s = new S(r, "fontSize", Z.parse(e.font).fontSize);
      s.hasValue() &&
        ((r.rootEmSize = s.getPixels("y")), (r.emSize = r.rootEmSize));
    }
    this.getAttribute("x").hasValue() || this.getAttribute("x", !0).setValue(0),
      this.getAttribute("y").hasValue() ||
        this.getAttribute("y", !0).setValue(0);
    var { width: u, height: l } = i.viewPort;
    this.getStyle("width").hasValue() ||
      this.getStyle("width", !0).setValue("100%"),
      this.getStyle("height").hasValue() ||
        this.getStyle("height", !0).setValue("100%"),
      this.getStyle("color").hasValue() ||
        this.getStyle("color", !0).setValue("black");
    var h = this.getAttribute("refX"),
      f = this.getAttribute("refY"),
      c = this.getAttribute("viewBox"),
      v = c.hasValue() ? ie(c.getString()) : null,
      d =
        !this.root &&
        this.getStyle("overflow").getValue("hidden") !== "visible",
      g = 0,
      p = 0,
      y = 0,
      x = 0;
    v && ((g = v[0]), (p = v[1])),
      this.root ||
        ((u = this.getStyle("width").getPixels("x")),
        (l = this.getStyle("height").getPixels("y")),
        this.type === "marker" && ((y = g), (x = p), (g = 0), (p = 0))),
      i.viewPort.setCurrent(u, l),
      this.node &&
        (!this.parent ||
          ((t = this.node.parentNode) === null || t === void 0
            ? void 0
            : t.nodeName) === "foreignObject") &&
        this.getStyle("transform", !1, !0).hasValue() &&
        !this.getStyle("transform-origin", !1, !0).hasValue() &&
        this.getStyle("transform-origin", !0, !0).setValue("50% 50%"),
      super.setContext(e),
      e.translate(
        this.getAttribute("x").getPixels("x"),
        this.getAttribute("y").getPixels("y"),
      ),
      v && ((u = v[2]), (l = v[3])),
      r.setViewBox({
        ctx: e,
        aspectRatio: this.getAttribute("preserveAspectRatio").getString(),
        width: i.viewPort.width,
        desiredWidth: u,
        height: i.viewPort.height,
        desiredHeight: l,
        minX: g,
        minY: p,
        refX: h.getValue(),
        refY: f.getValue(),
        clip: d,
        clipX: y,
        clipY: x,
      }),
      v && (i.viewPort.removeCurrent(), i.viewPort.setCurrent(u, l));
  }
  clearContext(e) {
    super.clearContext(e), this.document.screen.viewPort.removeCurrent();
  }
  resize(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e,
      r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1,
      i = this.getAttribute("width", !0),
      n = this.getAttribute("height", !0),
      o = this.getAttribute("viewBox"),
      s = this.getAttribute("style"),
      u = i.getNumber(0),
      l = n.getNumber(0);
    if (r)
      if (typeof r == "string")
        this.getAttribute("preserveAspectRatio", !0).setValue(r);
      else {
        var h = this.getAttribute("preserveAspectRatio");
        h.hasValue() &&
          h.setValue(h.getString().replace(/^\s*(\S.*\S)\s*$/, "$1"));
      }
    if (
      (i.setValue(e),
      n.setValue(t),
      o.hasValue() || o.setValue("0 0 ".concat(u || e, " ").concat(l || t)),
      s.hasValue())
    ) {
      var f = this.getStyle("width"),
        c = this.getStyle("height");
      f.hasValue() && f.setValue("".concat(e, "px")),
        c.hasValue() && c.setValue("".concat(t, "px"));
    }
  }
}
class pl extends A {
  constructor() {
    super(...arguments), (this.type = "rect");
  }
  path(e) {
    var t = this.getAttribute("x").getPixels("x"),
      r = this.getAttribute("y").getPixels("y"),
      i = this.getStyle("width", !1, !0).getPixels("x"),
      n = this.getStyle("height", !1, !0).getPixels("y"),
      o = this.getAttribute("rx"),
      s = this.getAttribute("ry"),
      u = o.getPixels("x"),
      l = s.getPixels("y");
    if (
      (o.hasValue() && !s.hasValue() && (l = u),
      s.hasValue() && !o.hasValue() && (u = l),
      (u = Math.min(u, i / 2)),
      (l = Math.min(l, n / 2)),
      e)
    ) {
      var h = 4 * ((Math.sqrt(2) - 1) / 3);
      e.beginPath(),
        n > 0 &&
          i > 0 &&
          (e.moveTo(t + u, r),
          e.lineTo(t + i - u, r),
          e.bezierCurveTo(
            t + i - u + h * u,
            r,
            t + i,
            r + l - h * l,
            t + i,
            r + l,
          ),
          e.lineTo(t + i, r + n - l),
          e.bezierCurveTo(
            t + i,
            r + n - l + h * l,
            t + i - u + h * u,
            r + n,
            t + i - u,
            r + n,
          ),
          e.lineTo(t + u, r + n),
          e.bezierCurveTo(
            t + u - h * u,
            r + n,
            t,
            r + n - l + h * l,
            t,
            r + n - l,
          ),
          e.lineTo(t, r + l),
          e.bezierCurveTo(t, r + l - h * l, t + u - h * u, r, t + u, r),
          e.closePath());
    }
    return new ce(t, r, t + i, r + n);
  }
  getMarkers() {
    return null;
  }
}
class O1 extends A {
  constructor() {
    super(...arguments), (this.type = "circle");
  }
  path(e) {
    var t = this.getAttribute("cx").getPixels("x"),
      r = this.getAttribute("cy").getPixels("y"),
      i = this.getAttribute("r").getPixels();
    return (
      e &&
        i > 0 &&
        (e.beginPath(), e.arc(t, r, i, 0, Math.PI * 2, !1), e.closePath()),
      new ce(t - i, r - i, t + i, r + i)
    );
  }
  getMarkers() {
    return null;
  }
}
class S1 extends A {
  constructor() {
    super(...arguments), (this.type = "ellipse");
  }
  path(e) {
    var t = 4 * ((Math.sqrt(2) - 1) / 3),
      r = this.getAttribute("rx").getPixels("x"),
      i = this.getAttribute("ry").getPixels("y"),
      n = this.getAttribute("cx").getPixels("x"),
      o = this.getAttribute("cy").getPixels("y");
    return (
      e &&
        r > 0 &&
        i > 0 &&
        (e.beginPath(),
        e.moveTo(n + r, o),
        e.bezierCurveTo(n + r, o + t * i, n + t * r, o + i, n, o + i),
        e.bezierCurveTo(n - t * r, o + i, n - r, o + t * i, n - r, o),
        e.bezierCurveTo(n - r, o - t * i, n - t * r, o - i, n, o - i),
        e.bezierCurveTo(n + t * r, o - i, n + r, o - t * i, n + r, o),
        e.closePath()),
      new ce(n - r, o - i, n + r, o + i)
    );
  }
  getMarkers() {
    return null;
  }
}
class E1 extends A {
  constructor() {
    super(...arguments), (this.type = "line");
  }
  getPoints() {
    return [
      new D(
        this.getAttribute("x1").getPixels("x"),
        this.getAttribute("y1").getPixels("y"),
      ),
      new D(
        this.getAttribute("x2").getPixels("x"),
        this.getAttribute("y2").getPixels("y"),
      ),
    ];
  }
  path(e) {
    var [{ x: t, y: r }, { x: i, y: n }] = this.getPoints();
    return (
      e && (e.beginPath(), e.moveTo(t, r), e.lineTo(i, n)), new ce(t, r, i, n)
    );
  }
  getMarkers() {
    var [e, t] = this.getPoints(),
      r = e.angleTo(t);
    return [
      [e, r],
      [t, r],
    ];
  }
}
class yl extends A {
  constructor(e, t, r) {
    super(e, t, r),
      (this.type = "polyline"),
      (this.points = []),
      (this.points = D.parsePath(this.getAttribute("points").getString()));
  }
  path(e) {
    var { points: t } = this,
      [{ x: r, y: i }] = t,
      n = new ce(r, i);
    return (
      e && (e.beginPath(), e.moveTo(r, i)),
      t.forEach((o) => {
        var { x: s, y: u } = o;
        n.addPoint(s, u), e && e.lineTo(s, u);
      }),
      n
    );
  }
  getMarkers() {
    var { points: e } = this,
      t = e.length - 1,
      r = [];
    return (
      e.forEach((i, n) => {
        n !== t && r.push([i, i.angleTo(e[n + 1])]);
      }),
      r.length > 0 && r.push([e[e.length - 1], r[r.length - 1][1]]),
      r
    );
  }
}
class $1 extends yl {
  constructor() {
    super(...arguments), (this.type = "polygon");
  }
  path(e) {
    var t = super.path(e),
      [{ x: r, y: i }] = this.points;
    return e && (e.lineTo(r, i), e.closePath()), t;
  }
}
class w1 extends N {
  constructor() {
    super(...arguments), (this.type = "pattern");
  }
  createPattern(e, t, r) {
    var i = this.getStyle("width").getPixels("x", !0),
      n = this.getStyle("height").getPixels("y", !0),
      o = new It(this.document, null);
    (o.attributes.viewBox = new S(
      this.document,
      "viewBox",
      this.getAttribute("viewBox").getValue(),
    )),
      (o.attributes.width = new S(this.document, "width", "".concat(i, "px"))),
      (o.attributes.height = new S(
        this.document,
        "height",
        "".concat(n, "px"),
      )),
      (o.attributes.transform = new S(
        this.document,
        "transform",
        this.getAttribute("patternTransform").getValue(),
      )),
      (o.children = this.children);
    var s = this.document.createCanvas(i, n),
      u = s.getContext("2d"),
      l = this.getAttribute("x"),
      h = this.getAttribute("y");
    l.hasValue() &&
      h.hasValue() &&
      u.translate(l.getPixels("x", !0), h.getPixels("y", !0)),
      r.hasValue()
        ? (this.styles["fill-opacity"] = r)
        : Reflect.deleteProperty(this.styles, "fill-opacity");
    for (var f = -1; f <= 1; f++)
      for (var c = -1; c <= 1; c++)
        u.save(),
          (o.attributes.x = new S(this.document, "x", f * s.width)),
          (o.attributes.y = new S(this.document, "y", c * s.height)),
          o.render(u),
          u.restore();
    var v = e.createPattern(s, "repeat");
    return v;
  }
}
class C1 extends N {
  constructor() {
    super(...arguments), (this.type = "marker");
  }
  render(e, t, r) {
    if (t) {
      var { x: i, y: n } = t,
        o = this.getAttribute("orient").getString("auto"),
        s = this.getAttribute("markerUnits").getString("strokeWidth");
      e.translate(i, n),
        o === "auto" && e.rotate(r),
        s === "strokeWidth" && e.scale(e.lineWidth, e.lineWidth),
        e.save();
      var u = new It(this.document, null);
      (u.type = this.type),
        (u.attributes.viewBox = new S(
          this.document,
          "viewBox",
          this.getAttribute("viewBox").getValue(),
        )),
        (u.attributes.refX = new S(
          this.document,
          "refX",
          this.getAttribute("refX").getValue(),
        )),
        (u.attributes.refY = new S(
          this.document,
          "refY",
          this.getAttribute("refY").getValue(),
        )),
        (u.attributes.width = new S(
          this.document,
          "width",
          this.getAttribute("markerWidth").getValue(),
        )),
        (u.attributes.height = new S(
          this.document,
          "height",
          this.getAttribute("markerHeight").getValue(),
        )),
        (u.attributes.overflow = new S(
          this.document,
          "overflow",
          this.getAttribute("overflow").getValue(),
        )),
        (u.attributes.fill = new S(
          this.document,
          "fill",
          this.getAttribute("fill").getColor("black"),
        )),
        (u.attributes.stroke = new S(
          this.document,
          "stroke",
          this.getAttribute("stroke").getValue("none"),
        )),
        (u.children = this.children),
        u.render(e),
        e.restore(),
        s === "strokeWidth" && e.scale(1 / e.lineWidth, 1 / e.lineWidth),
        o === "auto" && e.rotate(-r),
        e.translate(-i, -n);
    }
  }
}
class A1 extends N {
  constructor() {
    super(...arguments), (this.type = "defs");
  }
  render() {}
}
class en extends Ge {
  constructor() {
    super(...arguments), (this.type = "g");
  }
  getBoundingBox(e) {
    var t = new ce();
    return (
      this.children.forEach((r) => {
        t.addBoundingBox(r.getBoundingBox(e));
      }),
      t
    );
  }
}
class ml extends N {
  constructor(e, t, r) {
    super(e, t, r),
      (this.attributesToInherit = ["gradientUnits"]),
      (this.stops = []);
    var { stops: i, children: n } = this;
    n.forEach((o) => {
      o.type === "stop" && i.push(o);
    });
  }
  getGradientUnits() {
    return this.getAttribute("gradientUnits").getString("objectBoundingBox");
  }
  createGradient(e, t, r) {
    var i = this;
    this.getHrefAttribute().hasValue() &&
      ((i = this.getHrefAttribute().getDefinition()),
      this.inheritStopContainer(i));
    var { stops: n } = i,
      o = this.getGradient(e, t);
    if (!o) return this.addParentOpacity(r, n[n.length - 1].color);
    if (
      (n.forEach((p) => {
        o.addColorStop(p.offset, this.addParentOpacity(r, p.color));
      }),
      this.getAttribute("gradientTransform").hasValue())
    ) {
      var { document: s } = this,
        { MAX_VIRTUAL_PIXELS: u, viewPort: l } = s.screen,
        [h] = l.viewPorts,
        f = new pl(s, null);
      (f.attributes.x = new S(s, "x", -u / 3)),
        (f.attributes.y = new S(s, "y", -u / 3)),
        (f.attributes.width = new S(s, "width", u)),
        (f.attributes.height = new S(s, "height", u));
      var c = new en(s, null);
      (c.attributes.transform = new S(
        s,
        "transform",
        this.getAttribute("gradientTransform").getValue(),
      )),
        (c.children = [f]);
      var v = new It(s, null);
      (v.attributes.x = new S(s, "x", 0)),
        (v.attributes.y = new S(s, "y", 0)),
        (v.attributes.width = new S(s, "width", h.width)),
        (v.attributes.height = new S(s, "height", h.height)),
        (v.children = [c]);
      var d = s.createCanvas(h.width, h.height),
        g = d.getContext("2d");
      return (g.fillStyle = o), v.render(g), g.createPattern(d, "no-repeat");
    }
    return o;
  }
  inheritStopContainer(e) {
    this.attributesToInherit.forEach((t) => {
      !this.getAttribute(t).hasValue() &&
        e.getAttribute(t).hasValue() &&
        this.getAttribute(t, !0).setValue(e.getAttribute(t).getValue());
    });
  }
  addParentOpacity(e, t) {
    if (e.hasValue()) {
      var r = new S(this.document, "color", t);
      return r.addOpacity(e).getColor();
    }
    return t;
  }
}
class P1 extends ml {
  constructor(e, t, r) {
    super(e, t, r),
      (this.type = "linearGradient"),
      this.attributesToInherit.push("x1", "y1", "x2", "y2");
  }
  getGradient(e, t) {
    var r = this.getGradientUnits() === "objectBoundingBox",
      i = r ? t.getBoundingBox(e) : null;
    if (r && !i) return null;
    !this.getAttribute("x1").hasValue() &&
      !this.getAttribute("y1").hasValue() &&
      !this.getAttribute("x2").hasValue() &&
      !this.getAttribute("y2").hasValue() &&
      (this.getAttribute("x1", !0).setValue(0),
      this.getAttribute("y1", !0).setValue(0),
      this.getAttribute("x2", !0).setValue(1),
      this.getAttribute("y2", !0).setValue(0));
    var n = r
        ? i.x + i.width * this.getAttribute("x1").getNumber()
        : this.getAttribute("x1").getPixels("x"),
      o = r
        ? i.y + i.height * this.getAttribute("y1").getNumber()
        : this.getAttribute("y1").getPixels("y"),
      s = r
        ? i.x + i.width * this.getAttribute("x2").getNumber()
        : this.getAttribute("x2").getPixels("x"),
      u = r
        ? i.y + i.height * this.getAttribute("y2").getNumber()
        : this.getAttribute("y2").getPixels("y");
    return n === s && o === u ? null : e.createLinearGradient(n, o, s, u);
  }
}
class R1 extends ml {
  constructor(e, t, r) {
    super(e, t, r),
      (this.type = "radialGradient"),
      this.attributesToInherit.push("cx", "cy", "r", "fx", "fy", "fr");
  }
  getGradient(e, t) {
    var r = this.getGradientUnits() === "objectBoundingBox",
      i = t.getBoundingBox(e);
    if (r && !i) return null;
    this.getAttribute("cx").hasValue() ||
      this.getAttribute("cx", !0).setValue("50%"),
      this.getAttribute("cy").hasValue() ||
        this.getAttribute("cy", !0).setValue("50%"),
      this.getAttribute("r").hasValue() ||
        this.getAttribute("r", !0).setValue("50%");
    var n = r
        ? i.x + i.width * this.getAttribute("cx").getNumber()
        : this.getAttribute("cx").getPixels("x"),
      o = r
        ? i.y + i.height * this.getAttribute("cy").getNumber()
        : this.getAttribute("cy").getPixels("y"),
      s = n,
      u = o;
    this.getAttribute("fx").hasValue() &&
      (s = r
        ? i.x + i.width * this.getAttribute("fx").getNumber()
        : this.getAttribute("fx").getPixels("x")),
      this.getAttribute("fy").hasValue() &&
        (u = r
          ? i.y + i.height * this.getAttribute("fy").getNumber()
          : this.getAttribute("fy").getPixels("y"));
    var l = r
        ? ((i.width + i.height) / 2) * this.getAttribute("r").getNumber()
        : this.getAttribute("r").getPixels(),
      h = this.getAttribute("fr").getPixels();
    return e.createRadialGradient(s, u, h, n, o, l);
  }
}
class N1 extends N {
  constructor(e, t, r) {
    super(e, t, r), (this.type = "stop");
    var i = Math.max(0, Math.min(1, this.getAttribute("offset").getNumber())),
      n = this.getStyle("stop-opacity"),
      o = this.getStyle("stop-color", !0);
    o.getString() === "" && o.setValue("#000"),
      n.hasValue() && (o = o.addOpacity(n)),
      (this.offset = i),
      (this.color = o.getColor());
  }
}
class tn extends N {
  constructor(e, t, r) {
    super(e, t, r),
      (this.type = "animate"),
      (this.duration = 0),
      (this.initialValue = null),
      (this.initialUnits = ""),
      (this.removed = !1),
      (this.frozen = !1),
      e.screen.animations.push(this),
      (this.begin = this.getAttribute("begin").getMilliseconds()),
      (this.maxDuration =
        this.begin + this.getAttribute("dur").getMilliseconds()),
      (this.from = this.getAttribute("from")),
      (this.to = this.getAttribute("to")),
      (this.values = new S(e, "values", null));
    var i = this.getAttribute("values");
    i.hasValue() && this.values.setValue(i.getString().split(";"));
  }
  getProperty() {
    var e = this.getAttribute("attributeType").getString(),
      t = this.getAttribute("attributeName").getString();
    return e === "CSS"
      ? this.parent.getStyle(t, !0)
      : this.parent.getAttribute(t, !0);
  }
  calcValue() {
    var { initialUnits: e } = this,
      { progress: t, from: r, to: i } = this.getProgress(),
      n = r.getNumber() + (i.getNumber() - r.getNumber()) * t;
    return e === "%" && (n *= 100), "".concat(n).concat(e);
  }
  update(e) {
    var { parent: t } = this,
      r = this.getProperty();
    if (
      (this.initialValue ||
        ((this.initialValue = r.getString()),
        (this.initialUnits = r.getUnits())),
      this.duration > this.maxDuration)
    ) {
      var i = this.getAttribute("fill").getString("remove");
      if (
        this.getAttribute("repeatCount").getString() === "indefinite" ||
        this.getAttribute("repeatDur").getString() === "indefinite"
      )
        this.duration = 0;
      else if (i === "freeze" && !this.frozen)
        (this.frozen = !0),
          (t.animationFrozen = !0),
          (t.animationFrozenValue = r.getString());
      else if (i === "remove" && !this.removed)
        return (
          (this.removed = !0),
          r.setValue(
            t.animationFrozen ? t.animationFrozenValue : this.initialValue,
          ),
          !0
        );
      return !1;
    }
    this.duration += e;
    var n = !1;
    if (this.begin < this.duration) {
      var o = this.calcValue(),
        s = this.getAttribute("type");
      if (s.hasValue()) {
        var u = s.getString();
        o = "".concat(u, "(").concat(o, ")");
      }
      r.setValue(o), (n = !0);
    }
    return n;
  }
  getProgress() {
    var { document: e, values: t } = this,
      r = {
        progress:
          (this.duration - this.begin) / (this.maxDuration - this.begin),
      };
    if (t.hasValue()) {
      var i = r.progress * (t.getValue().length - 1),
        n = Math.floor(i),
        o = Math.ceil(i);
      (r.from = new S(e, "from", parseFloat(t.getValue()[n]))),
        (r.to = new S(e, "to", parseFloat(t.getValue()[o]))),
        (r.progress = (i - n) / (o - n));
    } else (r.from = this.from), (r.to = this.to);
    return r;
  }
}
class I1 extends tn {
  constructor() {
    super(...arguments), (this.type = "animateColor");
  }
  calcValue() {
    var { progress: e, from: t, to: r } = this.getProgress(),
      i = new gi(t.getColor()),
      n = new gi(r.getColor());
    if (i.ok && n.ok) {
      var o = i.r + (n.r - i.r) * e,
        s = i.g + (n.g - i.g) * e,
        u = i.b + (n.b - i.b) * e;
      return "rgb("
        .concat(Math.floor(o), ", ")
        .concat(Math.floor(s), ", ")
        .concat(Math.floor(u), ")");
    }
    return this.getAttribute("from").getColor();
  }
}
class M1 extends tn {
  constructor() {
    super(...arguments), (this.type = "animateTransform");
  }
  calcValue() {
    var { progress: e, from: t, to: r } = this.getProgress(),
      i = ie(t.getString()),
      n = ie(r.getString()),
      o = i
        .map((s, u) => {
          var l = n[u];
          return s + (l - s) * e;
        })
        .join(" ");
    return o;
  }
}
class _1 extends N {
  constructor(e, t, r) {
    super(e, t, r),
      (this.type = "font"),
      (this.glyphs = {}),
      (this.horizAdvX = this.getAttribute("horiz-adv-x").getNumber());
    var { definitions: i } = e,
      { children: n } = this;
    for (var o of n)
      switch (o.type) {
        case "font-face": {
          this.fontFace = o;
          var s = o.getStyle("font-family");
          s.hasValue() && (i[s.getString()] = this);
          break;
        }
        case "missing-glyph":
          this.missingGlyph = o;
          break;
        case "glyph": {
          var u = o;
          u.arabicForm
            ? ((this.isRTL = !0),
              (this.isArabic = !0),
              typeof this.glyphs[u.unicode] > "u" &&
                (this.glyphs[u.unicode] = {}),
              (this.glyphs[u.unicode][u.arabicForm] = u))
            : (this.glyphs[u.unicode] = u);
          break;
        }
      }
  }
  render() {}
}
class V1 extends N {
  constructor(e, t, r) {
    super(e, t, r),
      (this.type = "font-face"),
      (this.ascent = this.getAttribute("ascent").getNumber()),
      (this.descent = this.getAttribute("descent").getNumber()),
      (this.unitsPerEm = this.getAttribute("units-per-em").getNumber());
  }
}
class D1 extends A {
  constructor() {
    super(...arguments), (this.type = "missing-glyph"), (this.horizAdvX = 0);
  }
}
class k1 extends Ce {
  constructor() {
    super(...arguments), (this.type = "tref");
  }
  getText() {
    var e = this.getHrefAttribute().getDefinition();
    if (e) {
      var t = e.children[0];
      if (t) return t.getText();
    }
    return "";
  }
}
class L1 extends Ce {
  constructor(e, t, r) {
    super(e, t, r), (this.type = "a");
    var { childNodes: i } = t,
      n = i[0],
      o = i.length > 0 && Array.from(i).every((s) => s.nodeType === 3);
    (this.hasText = o), (this.text = o ? this.getTextFromNode(n) : "");
  }
  getText() {
    return this.text;
  }
  renderChildren(e) {
    if (this.hasText) {
      super.renderChildren(e);
      var { document: t, x: r, y: i } = this,
        { mouse: n } = t.screen,
        o = new S(t, "fontSize", Z.parse(t.ctx.font).fontSize);
      n.isWorking() &&
        n.checkBoundingBox(
          this,
          new ce(r, i - o.getPixels("y"), r + this.measureText(e), i),
        );
    } else if (this.children.length > 0) {
      var s = new en(this.document, null);
      (s.children = this.children), (s.parent = this), s.render(e);
    }
  }
  onClick() {
    var { window: e } = this.document;
    e && e.open(this.getHrefAttribute().getString());
  }
  onMouseMove() {
    var e = this.document.ctx;
    e.canvas.style.cursor = "pointer";
  }
}
function $o(a, e) {
  var t = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(a);
    e &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(a, i).enumerable;
      })),
      t.push.apply(t, r);
  }
  return t;
}
function ar(a) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2
      ? $o(Object(t), !0).forEach(function (r) {
          Zi(a, r, t[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(t))
        : $o(Object(t)).forEach(function (r) {
            Object.defineProperty(a, r, Object.getOwnPropertyDescriptor(t, r));
          });
  }
  return a;
}
class B1 extends Ce {
  constructor(e, t, r) {
    super(e, t, r),
      (this.type = "textPath"),
      (this.textWidth = 0),
      (this.textHeight = 0),
      (this.pathLength = -1),
      (this.glyphInfo = null),
      (this.letterSpacingCache = []),
      (this.measuresCache = new Map([["", 0]]));
    var i = this.getHrefAttribute().getDefinition();
    (this.text = this.getTextFromNode()),
      (this.dataArray = this.parsePathData(i));
  }
  getText() {
    return this.text;
  }
  path(e) {
    var { dataArray: t } = this;
    e && e.beginPath(),
      t.forEach((r) => {
        var { type: i, points: n } = r;
        switch (i) {
          case w.LINE_TO:
            e && e.lineTo(n[0], n[1]);
            break;
          case w.MOVE_TO:
            e && e.moveTo(n[0], n[1]);
            break;
          case w.CURVE_TO:
            e && e.bezierCurveTo(n[0], n[1], n[2], n[3], n[4], n[5]);
            break;
          case w.QUAD_TO:
            e && e.quadraticCurveTo(n[0], n[1], n[2], n[3]);
            break;
          case w.ARC: {
            var [o, s, u, l, h, f, c, v] = n,
              d = u > l ? u : l,
              g = u > l ? 1 : u / l,
              p = u > l ? l / u : 1;
            e &&
              (e.translate(o, s),
              e.rotate(c),
              e.scale(g, p),
              e.arc(0, 0, d, h, h + f, !!(1 - v)),
              e.scale(1 / g, 1 / p),
              e.rotate(-c),
              e.translate(-o, -s));
            break;
          }
          case w.CLOSE_PATH:
            e && e.closePath();
            break;
        }
      });
  }
  renderChildren(e) {
    this.setTextData(e), e.save();
    var t = this.parent.getStyle("text-decoration").getString(),
      r = this.getFontSize(),
      { glyphInfo: i } = this,
      n = e.fillStyle;
    t === "underline" && e.beginPath(),
      i.forEach((o, s) => {
        var { p0: u, p1: l, rotation: h, text: f } = o;
        e.save(),
          e.translate(u.x, u.y),
          e.rotate(h),
          e.fillStyle && e.fillText(f, 0, 0),
          e.strokeStyle && e.strokeText(f, 0, 0),
          e.restore(),
          t === "underline" &&
            (s === 0 && e.moveTo(u.x, u.y + r / 8), e.lineTo(l.x, l.y + r / 5));
      }),
      t === "underline" &&
        ((e.lineWidth = r / 20),
        (e.strokeStyle = n),
        e.stroke(),
        e.closePath()),
      e.restore();
  }
  getLetterSpacingAt() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
    return this.letterSpacingCache[e] || 0;
  }
  findSegmentToFitChar(e, t, r, i, n, o, s, u, l) {
    var h = o,
      f = this.measureText(e, u);
    u === " " && t === "justify" && r < i && (f += (i - r) / n),
      l > -1 && (h += this.getLetterSpacingAt(l));
    var c = this.textHeight / 20,
      v = this.getEquidistantPointOnPath(h, c, 0),
      d = this.getEquidistantPointOnPath(h + f, c, 0),
      g = { p0: v, p1: d },
      p = v && d ? Math.atan2(d.y - v.y, d.x - v.x) : 0;
    if (s) {
      var y = Math.cos(Math.PI / 2 + p) * s,
        x = Math.cos(-p) * s;
      (g.p0 = ar(ar({}, v), {}, { x: v.x + y, y: v.y + x })),
        (g.p1 = ar(ar({}, d), {}, { x: d.x + y, y: d.y + x }));
    }
    return (h += f), { offset: h, segment: g, rotation: p };
  }
  measureText(e, t) {
    var { measuresCache: r } = this,
      i = t || this.getText();
    if (r.has(i)) return r.get(i);
    var n = this.measureTargetText(e, i);
    return r.set(i, n), n;
  }
  setTextData(e) {
    if (!this.glyphInfo) {
      var t = this.getText(),
        r = t.split(""),
        i = t.split(" ").length - 1,
        n = this.parent
          .getAttribute("dx")
          .split()
          .map((T) => T.getPixels("x")),
        o = this.parent.getAttribute("dy").getPixels("y"),
        s = this.parent.getStyle("text-anchor").getString("start"),
        u = this.getStyle("letter-spacing"),
        l = this.parent.getStyle("letter-spacing"),
        h = 0;
      !u.hasValue() || u.getValue() === "inherit"
        ? (h = l.getPixels())
        : u.hasValue() &&
          u.getValue() !== "initial" &&
          u.getValue() !== "unset" &&
          (h = u.getPixels());
      var f = [],
        c = t.length;
      this.letterSpacingCache = f;
      for (var v = 0; v < c; v++) f.push(typeof n[v] < "u" ? n[v] : h);
      var d = f.reduce((T, $, E) => (E === 0 ? 0 : T + $ || 0), 0),
        g = this.measureText(e),
        p = Math.max(g + d, 0);
      (this.textWidth = g),
        (this.textHeight = this.getFontSize()),
        (this.glyphInfo = []);
      var y = this.getPathLength(),
        x = this.getStyle("startOffset").getNumber(0) * y,
        b = 0;
      (s === "middle" || s === "center") && (b = -p / 2),
        (s === "end" || s === "right") && (b = -p),
        (b += x),
        r.forEach((T, $) => {
          var {
            offset: E,
            segment: O,
            rotation: C,
          } = this.findSegmentToFitChar(e, s, p, y, i, b, o, T, $);
          (b = E),
            !(!O.p0 || !O.p1) &&
              this.glyphInfo.push({
                text: r[$],
                p0: O.p0,
                p1: O.p1,
                rotation: C,
              });
        });
    }
  }
  parsePathData(e) {
    if (((this.pathLength = -1), !e)) return [];
    var t = [],
      { pathParser: r } = e;
    for (r.reset(); !r.isEnd(); ) {
      var { current: i } = r,
        n = i ? i.x : 0,
        o = i ? i.y : 0,
        s = r.next(),
        u = s.type,
        l = [];
      switch (s.type) {
        case w.MOVE_TO:
          this.pathM(r, l);
          break;
        case w.LINE_TO:
          u = this.pathL(r, l);
          break;
        case w.HORIZ_LINE_TO:
          u = this.pathH(r, l);
          break;
        case w.VERT_LINE_TO:
          u = this.pathV(r, l);
          break;
        case w.CURVE_TO:
          this.pathC(r, l);
          break;
        case w.SMOOTH_CURVE_TO:
          u = this.pathS(r, l);
          break;
        case w.QUAD_TO:
          this.pathQ(r, l);
          break;
        case w.SMOOTH_QUAD_TO:
          u = this.pathT(r, l);
          break;
        case w.ARC:
          l = this.pathA(r);
          break;
        case w.CLOSE_PATH:
          A.pathZ(r);
          break;
      }
      s.type !== w.CLOSE_PATH
        ? t.push({
            type: u,
            points: l,
            start: { x: n, y: o },
            pathLength: this.calcLength(n, o, u, l),
          })
        : t.push({ type: w.CLOSE_PATH, points: [], pathLength: 0 });
    }
    return t;
  }
  pathM(e, t) {
    var { x: r, y: i } = A.pathM(e).point;
    t.push(r, i);
  }
  pathL(e, t) {
    var { x: r, y: i } = A.pathL(e).point;
    return t.push(r, i), w.LINE_TO;
  }
  pathH(e, t) {
    var { x: r, y: i } = A.pathH(e).point;
    return t.push(r, i), w.LINE_TO;
  }
  pathV(e, t) {
    var { x: r, y: i } = A.pathV(e).point;
    return t.push(r, i), w.LINE_TO;
  }
  pathC(e, t) {
    var { point: r, controlPoint: i, currentPoint: n } = A.pathC(e);
    t.push(r.x, r.y, i.x, i.y, n.x, n.y);
  }
  pathS(e, t) {
    var { point: r, controlPoint: i, currentPoint: n } = A.pathS(e);
    return t.push(r.x, r.y, i.x, i.y, n.x, n.y), w.CURVE_TO;
  }
  pathQ(e, t) {
    var { controlPoint: r, currentPoint: i } = A.pathQ(e);
    t.push(r.x, r.y, i.x, i.y);
  }
  pathT(e, t) {
    var { controlPoint: r, currentPoint: i } = A.pathT(e);
    return t.push(r.x, r.y, i.x, i.y), w.QUAD_TO;
  }
  pathA(e) {
    var {
      rX: t,
      rY: r,
      sweepFlag: i,
      xAxisRotation: n,
      centp: o,
      a1: s,
      ad: u,
    } = A.pathA(e);
    return (
      i === 0 && u > 0 && (u -= 2 * Math.PI),
      i === 1 && u < 0 && (u += 2 * Math.PI),
      [o.x, o.y, t, r, s, u, n, i]
    );
  }
  calcLength(e, t, r, i) {
    var n = 0,
      o = null,
      s = null,
      u = 0;
    switch (r) {
      case w.LINE_TO:
        return this.getLineLength(e, t, i[0], i[1]);
      case w.CURVE_TO:
        for (
          n = 0,
            o = this.getPointOnCubicBezier(
              0,
              e,
              t,
              i[0],
              i[1],
              i[2],
              i[3],
              i[4],
              i[5],
            ),
            u = 0.01;
          u <= 1;
          u += 0.01
        )
          (s = this.getPointOnCubicBezier(
            u,
            e,
            t,
            i[0],
            i[1],
            i[2],
            i[3],
            i[4],
            i[5],
          )),
            (n += this.getLineLength(o.x, o.y, s.x, s.y)),
            (o = s);
        return n;
      case w.QUAD_TO:
        for (
          n = 0,
            o = this.getPointOnQuadraticBezier(0, e, t, i[0], i[1], i[2], i[3]),
            u = 0.01;
          u <= 1;
          u += 0.01
        )
          (s = this.getPointOnQuadraticBezier(u, e, t, i[0], i[1], i[2], i[3])),
            (n += this.getLineLength(o.x, o.y, s.x, s.y)),
            (o = s);
        return n;
      case w.ARC: {
        n = 0;
        var l = i[4],
          h = i[5],
          f = i[4] + h,
          c = Math.PI / 180;
        if (
          (Math.abs(l - f) < c && (c = Math.abs(l - f)),
          (o = this.getPointOnEllipticalArc(i[0], i[1], i[2], i[3], l, 0)),
          h < 0)
        )
          for (u = l - c; u > f; u -= c)
            (s = this.getPointOnEllipticalArc(i[0], i[1], i[2], i[3], u, 0)),
              (n += this.getLineLength(o.x, o.y, s.x, s.y)),
              (o = s);
        else
          for (u = l + c; u < f; u += c)
            (s = this.getPointOnEllipticalArc(i[0], i[1], i[2], i[3], u, 0)),
              (n += this.getLineLength(o.x, o.y, s.x, s.y)),
              (o = s);
        return (
          (s = this.getPointOnEllipticalArc(i[0], i[1], i[2], i[3], f, 0)),
          (n += this.getLineLength(o.x, o.y, s.x, s.y)),
          n
        );
      }
    }
    return 0;
  }
  getPointOnLine(e, t, r, i, n) {
    var o = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : t,
      s = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : r,
      u = (n - r) / (i - t + at),
      l = Math.sqrt((e * e) / (1 + u * u));
    i < t && (l *= -1);
    var h = u * l,
      f = null;
    if (i === t) f = { x: o, y: s + h };
    else if ((s - r) / (o - t + at) === u) f = { x: o + l, y: s + h };
    else {
      var c = 0,
        v = 0,
        d = this.getLineLength(t, r, i, n);
      if (d < at) return null;
      var g = (o - t) * (i - t) + (s - r) * (n - r);
      (g /= d * d), (c = t + g * (i - t)), (v = r + g * (n - r));
      var p = this.getLineLength(o, s, c, v),
        y = Math.sqrt(e * e - p * p);
      (l = Math.sqrt((y * y) / (1 + u * u))),
        i < t && (l *= -1),
        (h = u * l),
        (f = { x: c + l, y: v + h });
    }
    return f;
  }
  getPointOnPath(e) {
    var t = this.getPathLength(),
      r = 0,
      i = null;
    if (e < -5e-5 || e - 5e-5 > t) return null;
    var { dataArray: n } = this;
    for (var o of n) {
      if (o && (o.pathLength < 5e-5 || r + o.pathLength + 5e-5 < e)) {
        r += o.pathLength;
        continue;
      }
      var s = e - r,
        u = 0;
      switch (o.type) {
        case w.LINE_TO:
          i = this.getPointOnLine(
            s,
            o.start.x,
            o.start.y,
            o.points[0],
            o.points[1],
            o.start.x,
            o.start.y,
          );
          break;
        case w.ARC: {
          var l = o.points[4],
            h = o.points[5],
            f = o.points[4] + h;
          if (
            ((u = l + (s / o.pathLength) * h),
            (h < 0 && u < f) || (h >= 0 && u > f))
          )
            break;
          i = this.getPointOnEllipticalArc(
            o.points[0],
            o.points[1],
            o.points[2],
            o.points[3],
            u,
            o.points[6],
          );
          break;
        }
        case w.CURVE_TO:
          (u = s / o.pathLength),
            u > 1 && (u = 1),
            (i = this.getPointOnCubicBezier(
              u,
              o.start.x,
              o.start.y,
              o.points[0],
              o.points[1],
              o.points[2],
              o.points[3],
              o.points[4],
              o.points[5],
            ));
          break;
        case w.QUAD_TO:
          (u = s / o.pathLength),
            u > 1 && (u = 1),
            (i = this.getPointOnQuadraticBezier(
              u,
              o.start.x,
              o.start.y,
              o.points[0],
              o.points[1],
              o.points[2],
              o.points[3],
            ));
          break;
      }
      if (i) return i;
      break;
    }
    return null;
  }
  getLineLength(e, t, r, i) {
    return Math.sqrt((r - e) * (r - e) + (i - t) * (i - t));
  }
  getPathLength() {
    return (
      this.pathLength === -1 &&
        (this.pathLength = this.dataArray.reduce(
          (e, t) => (t.pathLength > 0 ? e + t.pathLength : e),
          0,
        )),
      this.pathLength
    );
  }
  getPointOnCubicBezier(e, t, r, i, n, o, s, u, l) {
    var h = u * mo(e) + o * bo(e) + i * xo(e) + t * To(e),
      f = l * mo(e) + s * bo(e) + n * xo(e) + r * To(e);
    return { x: h, y: f };
  }
  getPointOnQuadraticBezier(e, t, r, i, n, o, s) {
    var u = o * Oo(e) + i * So(e) + t * Eo(e),
      l = s * Oo(e) + n * So(e) + r * Eo(e);
    return { x: u, y: l };
  }
  getPointOnEllipticalArc(e, t, r, i, n, o) {
    var s = Math.cos(o),
      u = Math.sin(o),
      l = { x: r * Math.cos(n), y: i * Math.sin(n) };
    return { x: e + (l.x * s - l.y * u), y: t + (l.x * u + l.y * s) };
  }
  buildEquidistantCache(e, t) {
    var r = this.getPathLength(),
      i = t || 0.25,
      n = e || r / 100;
    if (
      !this.equidistantCache ||
      this.equidistantCache.step !== n ||
      this.equidistantCache.precision !== i
    ) {
      this.equidistantCache = { step: n, precision: i, points: [] };
      for (var o = 0, s = 0; s <= r; s += i) {
        var u = this.getPointOnPath(s),
          l = this.getPointOnPath(s + i);
        !u ||
          !l ||
          ((o += this.getLineLength(u.x, u.y, l.x, l.y)),
          o >= n &&
            (this.equidistantCache.points.push({ x: u.x, y: u.y, distance: s }),
            (o -= n)));
      }
    }
  }
  getEquidistantPointOnPath(e, t, r) {
    if (
      (this.buildEquidistantCache(t, r),
      e < 0 || e - this.getPathLength() > 5e-5)
    )
      return null;
    var i = Math.round(
      (e / this.getPathLength()) * (this.equidistantCache.points.length - 1),
    );
    return this.equidistantCache.points[i] || null;
  }
}
var j1 =
  /^\s*data:(([^/,;]+\/[^/,;]+)(?:;([^,;=]+=[^,;=]+))?)?(?:;(base64))?,(.*)$/i;
class F1 extends Ge {
  constructor(e, t, r) {
    super(e, t, r), (this.type = "image"), (this.loaded = !1);
    var i = this.getHrefAttribute().getString();
    if (i) {
      var n = i.endsWith(".svg") || /^\s*data:image\/svg\+xml/i.test(i);
      e.images.push(this),
        n ? this.loadSvg(i) : this.loadImage(i),
        (this.isSvg = n);
    }
  }
  loadImage(e) {
    var t = this;
    return xe(function* () {
      try {
        var r = yield t.document.createImage(e);
        t.image = r;
      } catch (i) {
        console.error('Error while loading image "'.concat(e, '":'), i);
      }
      t.loaded = !0;
    })();
  }
  loadSvg(e) {
    var t = this;
    return xe(function* () {
      var r = j1.exec(e);
      if (r) {
        var i = r[5];
        r[4] === "base64"
          ? (t.image = atob(i))
          : (t.image = decodeURIComponent(i));
      } else
        try {
          var n = yield t.document.fetch(e),
            o = yield n.text();
          t.image = o;
        } catch (s) {
          console.error('Error while loading image "'.concat(e, '":'), s);
        }
      t.loaded = !0;
    })();
  }
  renderChildren(e) {
    var { document: t, image: r, loaded: i } = this,
      n = this.getAttribute("x").getPixels("x"),
      o = this.getAttribute("y").getPixels("y"),
      s = this.getStyle("width").getPixels("x"),
      u = this.getStyle("height").getPixels("y");
    if (!(!i || !r || !s || !u)) {
      if ((e.save(), e.translate(n, o), this.isSvg)) {
        var l = t.canvg.forkString(e, this.image, {
          ignoreMouse: !0,
          ignoreAnimation: !0,
          ignoreDimensions: !0,
          ignoreClear: !0,
          offsetX: 0,
          offsetY: 0,
          scaleWidth: s,
          scaleHeight: u,
        });
        (l.document.documentElement.parent = this), l.render();
      } else {
        var h = this.image;
        t.setViewBox({
          ctx: e,
          aspectRatio: this.getAttribute("preserveAspectRatio").getString(),
          width: s,
          desiredWidth: h.width,
          height: u,
          desiredHeight: h.height,
        }),
          this.loaded &&
            (typeof h.complete > "u" || h.complete) &&
            e.drawImage(h, 0, 0);
      }
      e.restore();
    }
  }
  getBoundingBox() {
    var e = this.getAttribute("x").getPixels("x"),
      t = this.getAttribute("y").getPixels("y"),
      r = this.getStyle("width").getPixels("x"),
      i = this.getStyle("height").getPixels("y");
    return new ce(e, t, e + r, t + i);
  }
}
class U1 extends Ge {
  constructor() {
    super(...arguments), (this.type = "symbol");
  }
  render(e) {}
}
class G1 {
  constructor(e) {
    (this.document = e), (this.loaded = !1), e.fonts.push(this);
  }
  load(e, t) {
    var r = this;
    return xe(function* () {
      try {
        var { document: i } = r,
          n = yield i.canvg.parser.load(t),
          o = n.getElementsByTagName("font");
        Array.from(o).forEach((s) => {
          var u = i.createElement(s);
          i.definitions[e] = u;
        });
      } catch (s) {
        console.error('Error while loading font "'.concat(t, '":'), s);
      }
      r.loaded = !0;
    })();
  }
}
class bl extends N {
  constructor(e, t, r) {
    super(e, t, r), (this.type = "style");
    var i = ht(
        Array.from(t.childNodes)
          .map((o) => o.textContent)
          .join("")
          .replace(
            /(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(^[\s]*\/\/.*)/gm,
            "",
          )
          .replace(/@import.*;/g, ""),
      ),
      n = i.split("}");
    n.forEach((o) => {
      var s = o.trim();
      if (s) {
        var u = s.split("{"),
          l = u[0].split(","),
          h = u[1].split(";");
        l.forEach((f) => {
          var c = f.trim();
          if (c) {
            var v = e.styles[c] || {};
            if (
              (h.forEach((p) => {
                var y = p.indexOf(":"),
                  x = p.substr(0, y).trim(),
                  b = p.substr(y + 1, p.length - y).trim();
                x && b && (v[x] = new S(e, x, b));
              }),
              (e.styles[c] = v),
              (e.stylesSpecificity[c] = i1(c)),
              c === "@font-face")
            ) {
              var d = v["font-family"].getString().replace(/"|'/g, ""),
                g = v.src.getString().split(",");
              g.forEach((p) => {
                if (p.indexOf('format("svg")') > 0) {
                  var y = hl(p);
                  y && new G1(e).load(d, y);
                }
              });
            }
          }
        });
      }
    });
  }
}
bl.parseExternalUrl = hl;
class z1 extends Ge {
  constructor() {
    super(...arguments), (this.type = "use");
  }
  setContext(e) {
    super.setContext(e);
    var t = this.getAttribute("x"),
      r = this.getAttribute("y");
    t.hasValue() && e.translate(t.getPixels("x"), 0),
      r.hasValue() && e.translate(0, r.getPixels("y"));
  }
  path(e) {
    var { element: t } = this;
    t && t.path(e);
  }
  renderChildren(e) {
    var { document: t, element: r } = this;
    if (r) {
      var i = r;
      if (
        (r.type === "symbol" &&
          ((i = new It(t, null)),
          (i.attributes.viewBox = new S(
            t,
            "viewBox",
            r.getAttribute("viewBox").getString(),
          )),
          (i.attributes.preserveAspectRatio = new S(
            t,
            "preserveAspectRatio",
            r.getAttribute("preserveAspectRatio").getString(),
          )),
          (i.attributes.overflow = new S(
            t,
            "overflow",
            r.getAttribute("overflow").getString(),
          )),
          (i.children = r.children),
          (r.styles.opacity = new S(t, "opacity", this.calculateOpacity()))),
        i.type === "svg")
      ) {
        var n = this.getStyle("width", !1, !0),
          o = this.getStyle("height", !1, !0);
        n.hasValue() && (i.attributes.width = new S(t, "width", n.getString())),
          o.hasValue() &&
            (i.attributes.height = new S(t, "height", o.getString()));
      }
      var s = i.parent;
      (i.parent = this), i.render(e), (i.parent = s);
    }
  }
  getBoundingBox(e) {
    var { element: t } = this;
    return t ? t.getBoundingBox(e) : null;
  }
  elementTransform() {
    var { document: e, element: t } = this;
    return Le.fromElement(e, t);
  }
  get element() {
    return (
      this.cachedElement ||
        (this.cachedElement = this.getHrefAttribute().getDefinition()),
      this.cachedElement
    );
  }
}
function ir(a, e, t, r, i, n) {
  return a[t * r * 4 + e * 4 + n];
}
function nr(a, e, t, r, i, n, o) {
  a[t * r * 4 + e * 4 + n] = o;
}
function F(a, e, t) {
  var r = a[e];
  return r * t;
}
function me(a, e, t, r) {
  return e + Math.cos(a) * t + Math.sin(a) * r;
}
class xl extends N {
  constructor(e, t, r) {
    super(e, t, r), (this.type = "feColorMatrix");
    var i = ie(this.getAttribute("values").getString());
    switch (this.getAttribute("type").getString("matrix")) {
      case "saturate": {
        var n = i[0];
        i = [
          0.213 + 0.787 * n,
          0.715 - 0.715 * n,
          0.072 - 0.072 * n,
          0,
          0,
          0.213 - 0.213 * n,
          0.715 + 0.285 * n,
          0.072 - 0.072 * n,
          0,
          0,
          0.213 - 0.213 * n,
          0.715 - 0.715 * n,
          0.072 + 0.928 * n,
          0,
          0,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          0,
          0,
          1,
        ];
        break;
      }
      case "hueRotate": {
        var o = (i[0] * Math.PI) / 180;
        i = [
          me(o, 0.213, 0.787, -0.213),
          me(o, 0.715, -0.715, -0.715),
          me(o, 0.072, -0.072, 0.928),
          0,
          0,
          me(o, 0.213, -0.213, 0.143),
          me(o, 0.715, 0.285, 0.14),
          me(o, 0.072, -0.072, -0.283),
          0,
          0,
          me(o, 0.213, -0.213, -0.787),
          me(o, 0.715, -0.715, 0.715),
          me(o, 0.072, 0.928, 0.072),
          0,
          0,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          0,
          0,
          1,
        ];
        break;
      }
      case "luminanceToAlpha":
        i = [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2125, 0.7154, 0.0721,
          0, 0, 0, 0, 0, 0, 1,
        ];
        break;
    }
    (this.matrix = i),
      (this.includeOpacity = this.getAttribute("includeOpacity").hasValue());
  }
  apply(e, t, r, i, n) {
    for (
      var { includeOpacity: o, matrix: s } = this,
        u = e.getImageData(0, 0, i, n),
        l = 0;
      l < n;
      l++
    )
      for (var h = 0; h < i; h++) {
        var f = ir(u.data, h, l, i, n, 0),
          c = ir(u.data, h, l, i, n, 1),
          v = ir(u.data, h, l, i, n, 2),
          d = ir(u.data, h, l, i, n, 3),
          g = F(s, 0, f) + F(s, 1, c) + F(s, 2, v) + F(s, 3, d) + F(s, 4, 1),
          p = F(s, 5, f) + F(s, 6, c) + F(s, 7, v) + F(s, 8, d) + F(s, 9, 1),
          y =
            F(s, 10, f) + F(s, 11, c) + F(s, 12, v) + F(s, 13, d) + F(s, 14, 1),
          x =
            F(s, 15, f) + F(s, 16, c) + F(s, 17, v) + F(s, 18, d) + F(s, 19, 1);
        o && ((g = 0), (p = 0), (y = 0), (x *= d / 255)),
          nr(u.data, h, l, i, n, 0, g),
          nr(u.data, h, l, i, n, 1, p),
          nr(u.data, h, l, i, n, 2, y),
          nr(u.data, h, l, i, n, 3, x);
      }
    e.clearRect(0, 0, i, n), e.putImageData(u, 0, 0);
  }
}
class Dr extends N {
  constructor() {
    super(...arguments), (this.type = "mask");
  }
  apply(e, t) {
    var { document: r } = this,
      i = this.getAttribute("x").getPixels("x"),
      n = this.getAttribute("y").getPixels("y"),
      o = this.getStyle("width").getPixels("x"),
      s = this.getStyle("height").getPixels("y");
    if (!o && !s) {
      var u = new ce();
      this.children.forEach((d) => {
        u.addBoundingBox(d.getBoundingBox(e));
      }),
        (i = Math.floor(u.x1)),
        (n = Math.floor(u.y1)),
        (o = Math.floor(u.width)),
        (s = Math.floor(u.height));
    }
    var l = this.removeStyles(t, Dr.ignoreStyles),
      h = r.createCanvas(i + o, n + s),
      f = h.getContext("2d");
    r.screen.setDefaults(f),
      this.renderChildren(f),
      new xl(r, {
        nodeType: 1,
        childNodes: [],
        attributes: [
          { nodeName: "type", value: "luminanceToAlpha" },
          { nodeName: "includeOpacity", value: "true" },
        ],
      }).apply(f, 0, 0, i + o, n + s);
    var c = r.createCanvas(i + o, n + s),
      v = c.getContext("2d");
    r.screen.setDefaults(v),
      t.render(v),
      (v.globalCompositeOperation = "destination-in"),
      (v.fillStyle = f.createPattern(h, "no-repeat")),
      v.fillRect(0, 0, i + o, n + s),
      (e.fillStyle = v.createPattern(c, "no-repeat")),
      e.fillRect(0, 0, i + o, n + s),
      this.restoreStyles(t, l);
  }
  render(e) {}
}
Dr.ignoreStyles = ["mask", "transform", "clip-path"];
var wo = () => {};
class H1 extends N {
  constructor() {
    super(...arguments), (this.type = "clipPath");
  }
  apply(e) {
    var { document: t } = this,
      r = Reflect.getPrototypeOf(e),
      { beginPath: i, closePath: n } = e;
    r && ((r.beginPath = wo), (r.closePath = wo)),
      Reflect.apply(i, e, []),
      this.children.forEach((o) => {
        if (!(typeof o.path > "u")) {
          var s = typeof o.elementTransform < "u" ? o.elementTransform() : null;
          s || (s = Le.fromElement(t, o)),
            s && s.apply(e),
            o.path(e),
            r && (r.closePath = n),
            s && s.unapply(e);
        }
      }),
      Reflect.apply(n, e, []),
      e.clip(),
      r && ((r.beginPath = i), (r.closePath = n));
  }
  render(e) {}
}
class kr extends N {
  constructor() {
    super(...arguments), (this.type = "filter");
  }
  apply(e, t) {
    var { document: r, children: i } = this,
      n = t.getBoundingBox(e);
    if (n) {
      var o = 0,
        s = 0;
      i.forEach((y) => {
        var x = y.extraFilterDistance || 0;
        (o = Math.max(o, x)), (s = Math.max(s, x));
      });
      var u = Math.floor(n.width),
        l = Math.floor(n.height),
        h = u + 2 * o,
        f = l + 2 * s;
      if (!(h < 1 || f < 1)) {
        var c = Math.floor(n.x),
          v = Math.floor(n.y),
          d = this.removeStyles(t, kr.ignoreStyles),
          g = r.createCanvas(h, f),
          p = g.getContext("2d");
        r.screen.setDefaults(p),
          p.translate(-c + o, -v + s),
          t.render(p),
          i.forEach((y) => {
            typeof y.apply == "function" && y.apply(p, 0, 0, h, f);
          }),
          e.drawImage(g, 0, 0, h, f, c - o, v - s, h, f),
          this.restoreStyles(t, d);
      }
    }
  }
  render(e) {}
}
kr.ignoreStyles = ["filter", "transform", "clip-path"];
class Y1 extends N {
  constructor(e, t, r) {
    super(e, t, r),
      (this.type = "feDropShadow"),
      this.addStylesFromStyleDefinition();
  }
  apply(e, t, r, i, n) {}
}
class X1 extends N {
  constructor() {
    super(...arguments), (this.type = "feMorphology");
  }
  apply(e, t, r, i, n) {}
}
class W1 extends N {
  constructor() {
    super(...arguments), (this.type = "feComposite");
  }
  apply(e, t, r, i, n) {}
}
class q1 extends N {
  constructor(e, t, r) {
    super(e, t, r),
      (this.type = "feGaussianBlur"),
      (this.blurRadius = Math.floor(
        this.getAttribute("stdDeviation").getNumber(),
      )),
      (this.extraFilterDistance = this.blurRadius);
  }
  apply(e, t, r, i, n) {
    var { document: o, blurRadius: s } = this,
      u = o.window ? o.window.document.body : null,
      l = e.canvas;
    (l.id = o.getUniqueId()),
      u && ((l.style.display = "none"), u.appendChild(l)),
      Ub(l, t, r, i, n, s),
      u && u.removeChild(l);
  }
}
class Q1 extends N {
  constructor() {
    super(...arguments), (this.type = "title");
  }
}
class K1 extends N {
  constructor() {
    super(...arguments), (this.type = "desc");
  }
}
var Z1 = {
  svg: It,
  rect: pl,
  circle: O1,
  ellipse: S1,
  line: E1,
  polyline: yl,
  polygon: $1,
  path: A,
  pattern: w1,
  marker: C1,
  defs: A1,
  linearGradient: P1,
  radialGradient: R1,
  stop: N1,
  animate: tn,
  animateColor: I1,
  animateTransform: M1,
  font: _1,
  "font-face": V1,
  "missing-glyph": D1,
  glyph: dl,
  text: Ce,
  tspan: Vr,
  tref: k1,
  a: L1,
  textPath: B1,
  image: F1,
  g: en,
  symbol: U1,
  style: bl,
  use: z1,
  mask: Dr,
  clipPath: H1,
  filter: kr,
  feDropShadow: Y1,
  feMorphology: X1,
  feComposite: W1,
  feColorMatrix: xl,
  feGaussianBlur: q1,
  title: Q1,
  desc: K1,
};
function Co(a, e) {
  var t = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(a);
    e &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(a, i).enumerable;
      })),
      t.push.apply(t, r);
  }
  return t;
}
function J1(a) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2
      ? Co(Object(t), !0).forEach(function (r) {
          Zi(a, r, t[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(t))
        : Co(Object(t)).forEach(function (r) {
            Object.defineProperty(a, r, Object.getOwnPropertyDescriptor(t, r));
          });
  }
  return a;
}
function e2(a, e) {
  var t = document.createElement("canvas");
  return (t.width = a), (t.height = e), t;
}
function t2(a) {
  return mi.apply(this, arguments);
}
function mi() {
  return (
    (mi = xe(function* (a) {
      var e =
          arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1,
        t = document.createElement("img");
      return (
        e && (t.crossOrigin = "Anonymous"),
        new Promise((r, i) => {
          (t.onload = () => {
            r(t);
          }),
            (t.onerror = (n, o, s, u, l) => {
              i(l);
            }),
            (t.src = a);
        })
      );
    })),
    mi.apply(this, arguments)
  );
}
class $e {
  constructor(e) {
    var {
      rootEmSize: t = 12,
      emSize: r = 12,
      createCanvas: i = $e.createCanvas,
      createImage: n = $e.createImage,
      anonymousCrossOrigin: o,
    } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    (this.canvg = e),
      (this.definitions = {}),
      (this.styles = {}),
      (this.stylesSpecificity = {}),
      (this.images = []),
      (this.fonts = []),
      (this.emSizeStack = []),
      (this.uniqueId = 0),
      (this.screen = e.screen),
      (this.rootEmSize = t),
      (this.emSize = r),
      (this.createCanvas = i),
      (this.createImage = this.bindCreateImage(n, o)),
      this.screen.wait(this.isImagesLoaded.bind(this)),
      this.screen.wait(this.isFontsLoaded.bind(this));
  }
  bindCreateImage(e, t) {
    return typeof t == "boolean"
      ? (r, i) => e(r, typeof i == "boolean" ? i : t)
      : e;
  }
  get window() {
    return this.screen.window;
  }
  get fetch() {
    return this.screen.fetch;
  }
  get ctx() {
    return this.screen.ctx;
  }
  get emSize() {
    var { emSizeStack: e } = this;
    return e[e.length - 1];
  }
  set emSize(e) {
    var { emSizeStack: t } = this;
    t.push(e);
  }
  popEmSize() {
    var { emSizeStack: e } = this;
    e.pop();
  }
  getUniqueId() {
    return "canvg".concat(++this.uniqueId);
  }
  isImagesLoaded() {
    return this.images.every((e) => e.loaded);
  }
  isFontsLoaded() {
    return this.fonts.every((e) => e.loaded);
  }
  createDocumentElement(e) {
    var t = this.createElement(e.documentElement);
    return (
      (t.root = !0),
      t.addStylesFromStyleDefinition(),
      (this.documentElement = t),
      t
    );
  }
  createElement(e) {
    var t = e.nodeName.replace(/^[^:]+:/, ""),
      r = $e.elementTypes[t];
    return typeof r < "u" ? new r(this, e) : new p1(this, e);
  }
  createTextNode(e) {
    return new T1(this, e);
  }
  setViewBox(e) {
    this.screen.setViewBox(J1({ document: this }, e));
  }
}
$e.createCanvas = e2;
$e.createImage = t2;
$e.elementTypes = Z1;
function Ao(a, e) {
  var t = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(a);
    e &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(a, i).enumerable;
      })),
      t.push.apply(t, r);
  }
  return t;
}
function Ve(a) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2
      ? Ao(Object(t), !0).forEach(function (r) {
          Zi(a, r, t[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(t))
        : Ao(Object(t)).forEach(function (r) {
            Object.defineProperty(a, r, Object.getOwnPropertyDescriptor(t, r));
          });
  }
  return a;
}
class bt {
  constructor(e, t) {
    var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    (this.parser = new Ua(r)), (this.screen = new _r(e, r)), (this.options = r);
    var i = new $e(this, r),
      n = i.createDocumentElement(t);
    (this.document = i), (this.documentElement = n);
  }
  static from(e, t) {
    var r = arguments;
    return xe(function* () {
      var i = r.length > 2 && r[2] !== void 0 ? r[2] : {},
        n = new Ua(i),
        o = yield n.parse(t);
      return new bt(e, o, i);
    })();
  }
  static fromString(e, t) {
    var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
      i = new Ua(r),
      n = i.parseFromString(t);
    return new bt(e, n, r);
  }
  fork(e, t) {
    var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return bt.from(e, t, Ve(Ve({}, this.options), r));
  }
  forkString(e, t) {
    var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return bt.fromString(e, t, Ve(Ve({}, this.options), r));
  }
  ready() {
    return this.screen.ready();
  }
  isReady() {
    return this.screen.isReady();
  }
  render() {
    var e = arguments,
      t = this;
    return xe(function* () {
      var r = e.length > 0 && e[0] !== void 0 ? e[0] : {};
      t.start(
        Ve({ enableRedraw: !0, ignoreAnimation: !0, ignoreMouse: !0 }, r),
      ),
        yield t.ready(),
        t.stop();
    })();
  }
  start() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      { documentElement: t, screen: r, options: i } = this;
    r.start(t, Ve(Ve({ enableRedraw: !0 }, i), e));
  }
  stop() {
    this.screen.stop();
  }
  resize(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e,
      r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
    this.documentElement.resize(e, t, r);
  }
}
export {
  L1 as AElement,
  I1 as AnimateColorElement,
  tn as AnimateElement,
  M1 as AnimateTransformElement,
  ce as BoundingBox,
  mo as CB1,
  bo as CB2,
  xo as CB3,
  To as CB4,
  bt as Canvg,
  O1 as CircleElement,
  H1 as ClipPathElement,
  A1 as DefsElement,
  K1 as DescElement,
  $e as Document,
  N as Element,
  S1 as EllipseElement,
  xl as FeColorMatrixElement,
  W1 as FeCompositeElement,
  Y1 as FeDropShadowElement,
  q1 as FeGaussianBlurElement,
  X1 as FeMorphologyElement,
  kr as FilterElement,
  Z as Font,
  _1 as FontElement,
  V1 as FontFaceElement,
  en as GElement,
  dl as GlyphElement,
  ml as GradientElement,
  F1 as ImageElement,
  E1 as LineElement,
  P1 as LinearGradientElement,
  C1 as MarkerElement,
  Dr as MaskElement,
  cl as Matrix,
  D1 as MissingGlyphElement,
  s1 as Mouse,
  at as PSEUDO_ZERO,
  Ua as Parser,
  A as PathElement,
  w as PathParser,
  w1 as PatternElement,
  D as Point,
  $1 as PolygonElement,
  yl as PolylineElement,
  S as Property,
  Oo as QB1,
  So as QB2,
  Eo as QB3,
  R1 as RadialGradientElement,
  pl as RectElement,
  Ge as RenderedElement,
  h1 as Rotate,
  It as SVGElement,
  G1 as SVGFontLoader,
  v1 as Scale,
  _r as Screen,
  gl as Skew,
  f1 as SkewX,
  c1 as SkewY,
  N1 as StopElement,
  bl as StyleElement,
  U1 as SymbolElement,
  k1 as TRefElement,
  Vr as TSpanElement,
  Ce as TextElement,
  B1 as TextPathElement,
  Q1 as TitleElement,
  Le as Transform,
  l1 as Translate,
  p1 as UnknownElement,
  z1 as UseElement,
  n1 as ViewPort,
  ht as compressSpaces,
  bt as default,
  i1 as getSelectorSpecificity,
  qb as normalizeAttributeName,
  Qb as normalizeColor,
  hl as parseExternalUrl,
  a2 as presets,
  ie as toNumbers,
  Yb as trimLeft,
  Xb as trimRight,
  po as vectorMagnitude,
  yo as vectorsAngle,
  yi as vectorsRatio,
};
