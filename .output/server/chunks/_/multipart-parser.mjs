import { n as node$1 } from "../nitro/nitro.mjs";

var toFormData_1;
var N = Object.defineProperty;
var c = (_, a) => N(_, "name", { value: a, configurable: true });
const node = node$1;
let s = 0;
const S = {
  START_BOUNDARY: s++,
  HEADER_FIELD_START: s++,
  HEADER_FIELD: s++,
  HEADER_VALUE_START: s++,
  HEADER_VALUE: s++,
  HEADER_VALUE_ALMOST_DONE: s++,
  HEADERS_ALMOST_DONE: s++,
  PART_DATA_START: s++,
  PART_DATA: s++,
  END: s++,
};
let f = 1;
const F = { PART_BOUNDARY: f, LAST_BOUNDARY: (f *= 2) },
  LF = 10,
  CR = 13,
  SPACE = 32,
  HYPHEN = 45,
  COLON = 58,
  A = 97,
  Z = 122,
  lower = c((_) => _ | 32, "lower"),
  noop = c(() => {}, "noop");
class MultipartParser {
  static {
    c(this, "MultipartParser");
  }
  constructor(a) {
    (this.index = 0),
      (this.flags = 0),
      (this.onHeaderEnd = noop),
      (this.onHeaderField = noop),
      (this.onHeadersEnd = noop),
      (this.onHeaderValue = noop),
      (this.onPartBegin = noop),
      (this.onPartData = noop),
      (this.onPartEnd = noop),
      (this.boundaryChars = {}),
      (a =
        `\r
--` + a);
    const t = new Uint8Array(a.length);
    for (let n = 0; n < a.length; n++)
      (t[n] = a.charCodeAt(n)), (this.boundaryChars[t[n]] = true);
    (this.boundary = t),
      (this.lookbehind = new Uint8Array(this.boundary.length + 8)),
      (this.state = S.START_BOUNDARY);
  }
  write(a) {
    let t = 0;
    const n = a.length;
    let E = this.index,
      {
        lookbehind: d,
        boundary: h,
        boundaryChars: H,
        index: e,
        state: o,
        flags: l,
      } = this;
    const b = this.boundary.length,
      m = b - 1,
      O = a.length;
    let r, P;
    const u = c((D) => {
        this[D + "Mark"] = t;
      }, "mark"),
      i = c((D) => {
        delete this[D + "Mark"];
      }, "clear"),
      T = c((D, p, R, g) => {
        (p === void 0 || p !== R) && this[D](g && g.subarray(p, R));
      }, "callback"),
      L = c((D, p) => {
        const R = D + "Mark";
        R in this &&
          (p
            ? (T(D, this[R], t, a), delete this[R])
            : (T(D, this[R], a.length, a), (this[R] = 0)));
      }, "dataCallback");
    for (t = 0; t < n; t++)
      switch (((r = a[t]), o)) {
        case S.START_BOUNDARY:
          if (e === h.length - 2) {
            if (r === HYPHEN) l |= F.LAST_BOUNDARY;
            else if (r !== CR) return;
            e++;
            break;
          } else if (e - 1 === h.length - 2) {
            if (l & F.LAST_BOUNDARY && r === HYPHEN) (o = S.END), (l = 0);
            else if (!(l & F.LAST_BOUNDARY) && r === LF)
              (e = 0), T("onPartBegin"), (o = S.HEADER_FIELD_START);
            else return;
            break;
          }
          r !== h[e + 2] && (e = -2), r === h[e + 2] && e++;
          break;
        case S.HEADER_FIELD_START:
          (o = S.HEADER_FIELD), u("onHeaderField"), (e = 0);
        case S.HEADER_FIELD:
          if (r === CR) {
            i("onHeaderField"), (o = S.HEADERS_ALMOST_DONE);
            break;
          }
          if ((e++, r === HYPHEN)) break;
          if (r === COLON) {
            if (e === 1) return;
            L("onHeaderField", true), (o = S.HEADER_VALUE_START);
            break;
          }
          if (((P = lower(r)), P < A || P > Z)) return;
          break;
        case S.HEADER_VALUE_START:
          if (r === SPACE) break;
          u("onHeaderValue"), (o = S.HEADER_VALUE);
        case S.HEADER_VALUE:
          r === CR &&
            (L("onHeaderValue", true),
            T("onHeaderEnd"),
            (o = S.HEADER_VALUE_ALMOST_DONE));
          break;
        case S.HEADER_VALUE_ALMOST_DONE:
          if (r !== LF) return;
          o = S.HEADER_FIELD_START;
          break;
        case S.HEADERS_ALMOST_DONE:
          if (r !== LF) return;
          T("onHeadersEnd"), (o = S.PART_DATA_START);
          break;
        case S.PART_DATA_START:
          (o = S.PART_DATA), u("onPartData");
        case S.PART_DATA:
          if (((E = e), e === 0)) {
            for (t += m; t < O && !(a[t] in H); ) t += b;
            (t -= m), (r = a[t]);
          }
          if (e < h.length)
            h[e] === r ? (e === 0 && L("onPartData", true), e++) : (e = 0);
          else if (e === h.length)
            e++,
              r === CR
                ? (l |= F.PART_BOUNDARY)
                : r === HYPHEN
                  ? (l |= F.LAST_BOUNDARY)
                  : (e = 0);
          else if (e - 1 === h.length)
            if (l & F.PART_BOUNDARY) {
              if (((e = 0), r === LF)) {
                (l &= ~F.PART_BOUNDARY),
                  T("onPartEnd"),
                  T("onPartBegin"),
                  (o = S.HEADER_FIELD_START);
                break;
              }
            } else
              l & F.LAST_BOUNDARY && r === HYPHEN
                ? (T("onPartEnd"), (o = S.END), (l = 0))
                : (e = 0);
          if (e > 0) d[e - 1] = r;
          else if (E > 0) {
            const D = new Uint8Array(d.buffer, d.byteOffset, d.byteLength);
            T("onPartData", 0, E, D), (E = 0), u("onPartData"), t--;
          }
          break;
        case S.END:
          break;
        default:
          throw new Error(`Unexpected state entered: ${o}`);
      }
    L("onHeaderField"),
      L("onHeaderValue"),
      L("onPartData"),
      (this.index = e),
      (this.state = o),
      (this.flags = l);
  }
  end() {
    if (
      (this.state === S.HEADER_FIELD_START && this.index === 0) ||
      (this.state === S.PART_DATA && this.index === this.boundary.length)
    )
      this.onPartEnd();
    else if (this.state !== S.END)
      throw new Error("MultipartParser.end(): stream ended unexpectedly");
  }
}
function _fileName(_) {
  const a = _.match(
    /\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i,
  );
  if (!a) return;
  const t = a[2] || a[3] || "";
  let n = t.slice(t.lastIndexOf("\\") + 1);
  return (
    (n = n.replace(/%22/g, '"')),
    (n = n.replace(/&#(\d{4});/g, (E, d) => String.fromCharCode(d))),
    n
  );
}
c(_fileName, "_fileName");
async function toFormData(_, a) {
  if (!/multipart/i.test(a)) throw new TypeError("Failed to fetch");
  const t = a.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!t)
    throw new TypeError("no or bad content-type header, no multipart boundary");
  const n = new MultipartParser(t[1] || t[2]);
  let E, d, h, H, e, o;
  const l = [],
    b = new node.FormData(),
    m = c((i) => {
      h += u.decode(i, { stream: true });
    }, "onPartData"),
    O = c((i) => {
      l.push(i);
    }, "appendToFile"),
    r = c(() => {
      const i = new node.File(l, o, { type: e });
      b.append(H, i);
    }, "appendFileToFormData"),
    P = c(() => {
      b.append(H, h);
    }, "appendEntryToFormData"),
    u = new TextDecoder("utf-8");
  u.decode(),
    (n.onPartBegin = function () {
      (n.onPartData = m),
        (n.onPartEnd = P),
        (E = ""),
        (d = ""),
        (h = ""),
        (H = ""),
        (e = ""),
        (o = null),
        (l.length = 0);
    }),
    (n.onHeaderField = function (i) {
      E += u.decode(i, { stream: true });
    }),
    (n.onHeaderValue = function (i) {
      d += u.decode(i, { stream: true });
    }),
    (n.onHeaderEnd = function () {
      if (
        ((d += u.decode()), (E = E.toLowerCase()), E === "content-disposition")
      ) {
        const i = d.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);
        i && (H = i[2] || i[3] || ""),
          (o = _fileName(d)),
          o && ((n.onPartData = O), (n.onPartEnd = r));
      } else E === "content-type" && (e = d);
      (d = ""), (E = "");
    });
  for await (const i of _) n.write(i);
  return n.end(), b;
}
c(toFormData, "toFormData"), (toFormData_1 = toFormData);

const multipartParser = /*#__PURE__*/ Object.freeze({
  __proto__: null,
  get toFormData() {
    return toFormData_1;
  },
});

export { multipartParser as m };
//# sourceMappingURL=multipart-parser.mjs.map
