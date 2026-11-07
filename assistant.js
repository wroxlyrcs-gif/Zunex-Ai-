(function (root, factory) {
  var KB = typeof module === "object" && module.exports ? require("./knowledge.js") : root.ZunexKB;
  var api = factory(KB);
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.ZunexAssistant = api;
})(typeof self !== "undefined" ? self : this, function (KB) {
  "use strict";

  function norm(s) {
    return String(s).replace(/İ/g, "i").replace(/I/g, "ı").toLowerCase()
      .replace(/ı/g, "i").replace(/ş/g, "s").replace(/ğ/g, "g").replace(/ü/g, "u")
      .replace(/ö/g, "o").replace(/ç/g, "c").replace(/ə/g, "e").replace(/ё/g, "е").replace(/â/g, "a").replace(/î/g, "i").replace(/û/g, "u");
  }
  function toks(s) { var n = norm(s).replace(/[^a-z0-9\u0430-\u044f]+/g, " ").trim(); return n ? n.split(" ") : []; }
  function joined(s) { return toks(s).join(" "); }
  function cap(w) { return w.charAt(0).toLocaleUpperCase("tr-TR") + w.slice(1).toLocaleLowerCase("tr-TR"); }
  function fmt(n) {
    var s = String(+n.toPrecision(12)), th = cur === "en" ? "," : cur === "ru" ? "\u00a0" : ".", dc = cur === "en" ? "." : ",";
    if (/e/.test(s)) return s.replace(".", dc);
    var p = s.split("."), i = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, th);
    return p[1] ? i + dc + p[1] : i;
  }
  function num(s) { return parseFloat(String(s).replace(",", ".")); }
  var DAYS = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
  var MONTHS = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  function pad(n) { return (n < 10 ? "0" : "") + n; }

  /* ---------- Matematik ---------- */
  var FN = {
    cbrt: Math.cbrt,
    sqrt: function (x) { if (x < 0) throw { math: L(["Negatif bir sayının karekökü gerçek sayı değildir.", "Mənfi ədədin kvadrat kökü həqiqi ədəd deyil.", "The square root of a negative number is not a real number.", "Квадратный корень из отрицательного числа не является действительным."]) }; return Math.sqrt(x); },
    abs: Math.abs,
    sin: function (x) { return Math.round(Math.sin(x * Math.PI / 180) * 1e12) / 1e12; },
    cos: function (x) { return Math.round(Math.cos(x * Math.PI / 180) * 1e12) / 1e12; },
    tan: function (x) { return Math.round(Math.tan(x * Math.PI / 180) * 1e12) / 1e12; },
    log: function (x) { if (x <= 0) throw { math: L(["Logaritma yalnızca pozitif sayılar için tanımlıdır.", "Loqarifm yalnız müsbət ədədlər üçün təyin olunub.", "The logarithm is defined only for positive numbers.", "Логарифм определён только для положительных чисел."]) }; return Math.log10(x); },
    ln: function (x) { if (x <= 0) throw { math: L(["Logaritma yalnızca pozitif sayılar için tanımlıdır.", "Loqarifm yalnız müsbət ədədlər üçün təyin olunub.", "The logarithm is defined only for positive numbers.", "Логарифм определён только для положительных чисел."]) }; return Math.log(x); }
  };
  function fact(n) {
    if (n < 0 || n !== Math.floor(n) || n > 170) throw { math: L(["Faktöriyel için 0–170 arası bir tam sayı gerekir.", "Faktorial üçün 0–170 arası tam ədəd lazımdır.", "Factorial needs an integer from 0 to 170.", "Для факториала нужно целое число от 0 до 170."]) };
    var r = 1; for (var i = 2; i <= n; i++) r *= i; return r;
  }
  function rw(s, w, r) { return s.replace(new RegExp("(\\s)(?:" + w + ")(?=\\s)", "g"), "$1" + r); }
  function pre(t) {
    var SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
    t = String(t).replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+/g, function (m) { return "^" + m.split("").map(function (c) { return c === "⁻" ? "-" : SUP.indexOf(c); }).join(""); });
    t = t.replace(/[×∙·⋅]/g, "*").replace(/÷/g, "/").replace(/[−–]/g, "-").replace(/π/g, " pi ").replace(/√/g, " sqrt ");
    if (/\)\s*:|:\s*\(|\s:\s/.test(t) || (/^[\d\s.,()+\-*\/:]+$/.test(t.trim()) && !/^\d{1,2}:\d{2}$/.test(t.trim()))) t = t.replace(/:/g, "/");
    return t;
  }
  function pw(s) {
    return s.replace(/kvadrat\s+kok/g, " sqrt ").replace(/квадратн\w*\s+корень/g, " sqrt ")
      .replace(/(?:[-'’\s]+(?:nin|nun|in|un))?\s*(?:kvadrat\w*|karesi\w*|squared|в квадрате)/g, " ^2 ")
      .replace(/(?:[-'’\s]+(?:nin|nun|in|un))?\s*(?:kupu\w*|kubu\w*|cubed|в кубе)/g, " ^3 ");
  }
  function mathText(t) {
    var s = " " + pw(norm(pre(t))).replace(/(\d),(\d)/g, "$1.$2").replace(/[=?]/g, " ").replace(/(\d)\s*x\s*(\d)/g, "$1*$2").replace(/([-+*\/^()!%])/g, " $1 ").replace(/\s+/g, " ") + " ";
    s = rw(s, "what is|whats|how much is|how much|calculate|compute|equals|please|kac eder|kac yapar|kactir|kac|eder|yapar|hesapla|hesaplar misin|hesap|sonucu|sonuc|nedir|ne kadar|bul|islem|lutfen|bana|nece edir|nece olar|necedir|nece|hesabla|что такое|сколько будет|сколько|будет|вычисли|посчитай|чему равно|равно|результат", " ");
    s = rw(s, "arti|plus|ustegel|плюс", "+"); s = rw(s, "eksi|minus|cixsa|минус", "-");
    s = rw(s, "carpi|kere|times|multiplied by|vur|defe|умножить на|умножить|помножить на", "*");
    s = rw(s, "bolu|divided by|over|bol|bolunsun|разделить на|делить на", "/");
    s = rw(s, "uzeri|ussu|to the power of|power|в степени|степени", "^"); s = rw(s, "mod", "%");
    s = rw(s, "kupkok|kup kok|kubkok|kub kok|cube root of|cube root|кубический корень из|кубический корень", "cbrt");
    s = rw(s, "karekok|kok|square root of|square root|sqrt|корень из|корень", "sqrt");
    return s.trim();
  }
  // null: matematik ifadesi değil. {text}: sonuç. Hesap hatası: {text: hata mesajı}
  function evalMath(src) {
    var s = mathText(src), tk = [], pos = 0, m, re = /\s*(\d+(?:\.\d+)?|[a-z]+|[-+*\/^%()!])/y;
    if (!s) return null;
    while (pos < s.length) {
      re.lastIndex = pos; m = re.exec(s);
      if (!m) { if (/^\s*$/.test(s.slice(pos))) break; return null; }
      tk.push(m[1]); pos = re.lastIndex;
    }
    var okId = { cbrt: 1, pi: 1, e: 1, sqrt: 1, abs: 1, sin: 1, cos: 1, tan: 1, log: 1, ln: 1 };
    for (var i = 0; i < tk.length; i++) if (/^[a-z]+$/.test(tk[i]) && !okId[tk[i]]) return null;
    var hasVal = tk.some(function (x) { return /^\d/.test(x) || x === "pi" || x === "e"; });
    var hasOp = tk.some(function (x) { return /^[-+*\/^%!]$/.test(x) || FN[x]; });
    if (!hasVal || !(hasOp || (tk.length > 1 && tk.indexOf("pi") >= 0))) return null;
    var p = 0, SYN = { syn: 1 };
    function peek() { return tk[p]; }
    function next() { return tk[p++]; }
    function expr() { var v = term(); while (peek() === "+" || peek() === "-") { var o = next(), r = term(); v = o === "+" ? v + r : v - r; } return v; }
    function term() {
      var v = unary();
      while (peek() === "*" || peek() === "/" || peek() === "%" || peek() === "(" || peek() === "pi" || peek() === "e" || FN[peek()]) {
        var imp = peek() !== "*" && peek() !== "/" && peek() !== "%", o = imp ? "*" : next(), r = unary();
        if (o === "*") v *= r; else { if (r === 0) throw { math: L(["Sıfıra bölünemez.", "Sıfıra bölmək olmaz.", "Cannot divide by zero.", "На ноль делить нельзя."]) }; v = o === "/" ? v / r : v % r; }
      }
      return v;
    }
    function unary() { if (peek() === "-") { next(); return -unary(); } if (peek() === "+") { next(); return unary(); } return pow(); }
    function pow() { var b = post(); if (peek() === "^") { next(); return Math.pow(b, unary()); } return b; }
    function post() { var v = atom(); while (peek() === "!") { next(); v = fact(v); } return v; }
    function atom() {
      var t = next();
      if (t === undefined) throw SYN;
      if (/^\d/.test(t)) return parseFloat(t);
      if (t === "(") { var v = expr(); if (next() !== ")") throw SYN; return v; }
      if (t === "pi") return Math.PI;
      if (t === "e") return Math.E;
      if (FN[t]) {
        var a;
        if (peek() === "(") { next(); a = expr(); if (next() !== ")") throw SYN; } else a = unary();
        return FN[t](a);
      }
      throw SYN;
    }
    try {
      var v = expr();
      if (p < tk.length) return null;
      if (!isFinite(v)) return { text: L(["Sonuç çok büyük ya da tanımsız.", "Nəticə çox böyük və ya təyin olunmayıb.", "The result is too large or undefined.", "Результат слишком велик или не определён."]) };
      var hasTrig = /\b(sin|cos|tan)\b/.test(s);
      return { text: fmt(v) + (hasTrig ? L(["  (açılar derece cinsinden)", "  (bucaqlar dərəcə ilə)", "  (angles in degrees)", "  (углы в градусах)"]) : ""), v: v };
    } catch (e) {
      if (e && e.math) return { text: e.math };
      return null;
    }
  }

  var UNITS = { celsius: "c", santigrat: "c", fahrenheit: "f", km: "km", kilometre: "km", mil: "mi", mile: "mi", kg: "kg", kilo: "kg", kilogram: "kg", lb: "lb", pound: "lb", libre: "lb", metre: "m", metres: "m", meters: "m", miles: "mi", kilometers: "km", kilometres: "km", kilograms: "kg", pounds: "lb", m: "m", ft: "ft", feet: "ft", ayak: "ft" };
  var CONV = {
    "c>f": function (v) { return v * 9 / 5 + 32; }, "f>c": function (v) { return (v - 32) * 5 / 9; },
    "km>mi": function (v) { return v * 0.621371; }, "mi>km": function (v) { return v * 1.609344; },
    "kg>lb": function (v) { return v * 2.2046226; }, "lb>kg": function (v) { return v * 0.45359237; },
    "m>ft": function (v) { return v * 3.280839895; }, "ft>m": function (v) { return v * 0.3048; }
  };
  var UNAME = { c: "°C", f: "°F", km: "km", mi: "mil", kg: "kg", lb: "lb", m: "m", ft: "ft" };
  function unitConvert(t) {
    var n = norm(t), nm = n.match(/-?\d+(?:[.,]\d+)?/);
    if (!nm) return null;
    var u = toks(t).filter(function (x) { return UNITS[x]; }).map(function (x) { return UNITS[x]; });
    if (/how many/.test(n) && / in /.test(n)) u.reverse();
    if (u.length < 2 || u[0] === u[1] || !CONV[u[0] + ">" + u[1]]) return null;
    var v = num(nm[0]);
    return fmt(v) + " " + UNAME[u[0]] + " = " + fmt(CONV[u[0] + ">" + u[1]](v)) + " " + UNAME[u[1]];
  }
  function percent(t) {
    var s = norm(t).replace(/(\d),(\d)/g, "$1.$2"), N = "(\\d+(?:\\.\\d+)?)", a, b, m;
    if ((m = s.match(new RegExp(N + "\\W*[a-z]{0,4}\\s+yuzde\\s+" + N)))) { a = m[1]; b = m[2]; }
    else if ((m = s.match(new RegExp(N + "\\s*(?:%|percent|процент\\w*)\\s*(?:of|от)\\s+" + N)))) { a = m[2]; b = m[1]; }
    else if ((m = s.match(new RegExp(N + "\\D{0,6}" + N + "\\s*faiz")))) { a = m[1]; b = m[2]; }
    else return null;
    a = +a; b = +b; var v = fmt(a * b / 100);
    return L([fmt(a) + " sayısının %" + fmt(b) + "’i = " + v, fmt(a) + " ədədinin " + fmt(b) + "%-i = " + v, fmt(b) + "% of " + fmt(a) + " = " + v, fmt(b) + "% от " + fmt(a) + " = " + v]);
  }
  function primeCheck(t) {
    var s = norm(t), m = s.match(/(\d+)\s*(?:sayisi\s*|ededi\s*)?asal\s*(?:mi|midir)/) || s.match(/(\d+)\s*sade\s*eded/) || s.match(/is\s+(\d+)\s+(?:a\s+)?prime|(\d+)\s+is\s+(?:a\s+)?prime/) || s.match(/(\d+)\s*(?:это\s*)?прост/);
    if (!m) return null;
    var n = parseInt(m[1] || m[2], 10);
    if (n > 1e12) return L(["Bu kadar büyük sayılara bakamıyorum (en fazla 1 trilyon).", "Bu qədər böyük ədədlərə baxa bilmirəm (ən çoxu 1 trilyon).", "Numbers that large are beyond me (max 1 trillion).", "Такие большие числа мне не по силам (максимум 1 триллион)."]);
    if (n < 2) return L([n + " asal değildir (asal sayılar 2’den başlar).", n + " sade ədəd deyil (sadə ədədlər 2-dən başlayır).", n + " is not prime (primes start at 2).", n + " не простое (простые числа начинаются с 2)."]);
    for (var d = 2; d * d <= n; d++) if (n % d === 0) return L([n + " asal değildir; " + d + " ile bölünür.", n + " sade ədəd deyil; " + d + "-ə bölünür.", n + " is not prime; it is divisible by " + d + ".", n + " не простое; делится на " + d + "."]);
    return L([n + " asal bir sayıdır.", n + " sade ədəddir.", n + " is prime.", n + " — простое число."]);
  }
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a; }
  function fraction(t) {
    var s = mathText(t).replace(/\s+/g, ""), m = s.match(/^(\d+)\/(\d+)([-+*\/])(\d+)\/(\d+)$/);
    if (!m) return null;
    var a = +m[1], b = +m[2], c = +m[4], d = +m[5], o = m[3], nu, de;
    if (o === "/" && !/(bolu|bolunsun|divided by|разделить на|делить на)/.test(norm(t))) return null;
    if (!b || !d) return L(["Sıfıra bölünemez.", "Sıfıra bölmək olmaz.", "Cannot divide by zero.", "На ноль делить нельзя."]);
    if (o === "/") { if (!c) return L(["Sıfıra bölünemez.", "Sıfıra bölmək olmaz.", "Cannot divide by zero.", "На ноль делить нельзя."]); nu = a * d; de = b * c; }
    else if (o === "*") { nu = a * c; de = b * d; } else { nu = o === "+" ? a * d + c * b : a * d - c * b; de = b * d; }
    var g = gcd(nu, de) || 1; nu /= g; de /= g;
    return de === 1 ? fmt(nu) : nu + "/" + de + "  (≈ " + fmt(nu / de) + ")";
  }
  function ints(s) { return (s.match(/\d+/g) || []).map(Number); }
  function factq(t) {
    var s = norm(t), m = s.match(/(?:factorial|faktoriyel|faktorial|факториал)\w*\D{0,8}(\d+)/) || s.match(/(\d+)\D{0,6}(?:factorial|faktoriyel|faktorial|факториал)/);
    if (!m) return null;
    try { return m[1] + "! = " + fmt(fact(+m[1])); } catch (e) { return e.math || null; }
  }
  function gcdlcm(t) {
    var s = norm(t), nums = ints(s);
    var g = /(^|[^a-z])(ebob|obeb|gcd|hcf)([^a-z]|$)|(^|[^а-я])нод([^а-я]|$)|greatest common|en buyuk ortak|наибольш\w* общ/.test(s);
    var l = /(^|[^a-z])(ekok|okek|ekob|lcm)([^a-z]|$)|(^|[^а-я])нок([^а-я]|$)|least common|lowest common|en kucuk ortak|наименьш\w* общ/.test(s);
    if ((!g && !l) || nums.length < 2 || nums.length > 10 || nums.some(function (x) { return x < 1 || x > 1e12; })) return null;
    var out = [], v;
    if (g) { v = nums.reduce(gcd); out.push(L(["EBOB", "ƏBOB", "GCD", "НОД"]) + "(" + nums.join(", ") + ") = " + fmt(v)); }
    if (l) { v = nums.reduce(function (a, b) { return a / gcd(a, b) * b; }); out.push(v > 1e15 ? L(["Sonuç çok büyük.", "Nəticə çox böyükdür.", "The result is too large.", "Результат слишком велик."]) : L(["EKOK", "ƏKOB", "LCM", "НОК"]) + "(" + nums.join(", ") + ") = " + fmt(v)); }
    return out.join("\n");
  }
  function factorize(t) {
    var s = norm(t), m = s.match(/\d+/);
    if (!/carpan|vuruq|factor(?!ial)|разлож|множител/.test(s) || !m) return null;
    var n = +m[0], out = [], e, d, sup = "⁰¹²³⁴⁵⁶⁷⁸⁹";
    if (n < 2 || n > 1e12) return L(["2 ile 1 trilyon arası bir sayı ver.", "2 ilə 1 trilyon arası ədəd ver.", "Give a number between 2 and 1 trillion.", "Укажи число от 2 до 1 триллиона."]);
    for (d = 2; d * d <= n; d++) { e = 0; while (n % d === 0) { n /= d; e++; } if (e) out.push(d + (e > 1 ? String(e).split("").map(function (c) { return sup.charAt(c); }).join("") : "")); }
    if (n > 1) out.push(String(n));
    return m[0] + " = " + out.join(" × ");
  }
  function comb(t) {
    var s = norm(t), m = s.match(/(?:^|[^a-z])([cp])\s*\(\s*(\d+)\s*[,;]\s*(\d+)\s*\)/), n, k, r = 1, i, nm;
    if (m) { nm = m[1]; n = +m[2]; k = +m[3]; }
    else if ((m = s.match(/(\d+)\s+choose\s+(\d+)/))) { nm = "c"; n = +m[1]; k = +m[2]; }
    else return null;
    if (k > n) return L(["k, n’den büyük olamaz.", "k n-dən böyük ola bilməz.", "k cannot exceed n.", "k не может быть больше n."]);
    if (n > 60) return L(["n en fazla 60 olabilir.", "n ən çoxu 60 ola bilər.", "n can be at most 60.", "n не может быть больше 60."]);
    for (i = 1; i <= k; i++) r = nm === "c" ? r * (n - k + i) / i : r * (n - i + 1);
    return nm.toUpperCase() + "(" + n + "," + k + ") = " + fmt(Math.round(r));
  }
  function pctOf(t) {
    var s = norm(t).replace(/(\d),(\d)/g, "$1.$2"), nums = (s.match(/\d+(?:\.\d+)?/g) || []).map(Number), a, b;
    if (nums.length !== 2 || !/yuzde kac|nece faiz|what percent|сколько процентов|какой процент/.test(s)) return null;
    a = nums[0]; b = nums[1];
    if (/what percent(age)? of/.test(s)) { a = nums[1]; b = nums[0]; }
    if (!b) return L(["Sıfıra bölünemez.", "Sıfıra bölmək olmaz.", "Cannot divide by zero.", "На ноль делить нельзя."]);
    var v = fmt(a / b * 100);
    return fmt(a) + " / " + fmt(b) + " = " + L(["%" + v, "%" + v, v + "%", v + "%"]);
  }
  function stats(t) {
    var s = norm(t).replace(/(\d),(\d)/g, "$1.$2"), nums = (s.match(/-?\d+(?:\.\d+)?/g) || []).map(Number), out = [];
    var mean = /ortalama|(^| )orta( |$)|mean|average|средн/.test(s), med = /medyan|median|медиан/.test(s);
    if ((!mean && !med) || nums.length < 2) return null;
    if (mean) out.push(L(["Ortalama", "Ortalama", "Mean", "Среднее"]) + " = " + fmt(nums.reduce(function (a, b) { return a + b; }, 0) / nums.length));
    if (med) { var q = nums.slice().sort(function (a, b) { return a - b; }), h = q.length >> 1; out.push(L(["Medyan", "Median", "Median", "Медиана"]) + " = " + fmt(q.length % 2 ? q[h] : (q[h - 1] + q[h]) / 2)); }
    return out.join("\n");
  }
  function volume(t) {
    var s = norm(t).replace(/(\d),(\d)/g, "$1.$2"), nums = (s.match(/\d+(?:\.\d+)?/g) || []).map(Number), a = nums[0], b = nums[1], v, f, sh;
    if (!/hacim|hacm|hecm|volume|объем/.test(s) || !nums.length) return null;
    sh = /kure|sphere|(^| )шар/.test(s) ? "sp" : /silindir|cylinder|цилиндр/.test(s) ? "cy" : /(^| )kup|(^| )kub|cube|(^| )куб/.test(s) ? "cu" : null;
    if (!sh) return null;
    if (sh === "cu") { v = a * a * a; f = fmt(a) + "³"; }
    else {
      if (!/yaricap|radius|радиус/.test(s) && /(^| )cap|diameter|диаметр/.test(s)) a /= 2;
      if (sh === "sp") { v = 4 / 3 * Math.PI * a * a * a; f = "4/3 × π × " + fmt(a) + "³"; }
      else { if (b === undefined) return null; v = Math.PI * a * a * b; f = "π × " + fmt(a) + "² × " + fmt(b); }
    }
    return { sp: ["Küre", "Kürə", "Sphere", "Шар"], cy: ["Silindir", "Silindr", "Cylinder", "Цилиндр"], cu: ["Küp", "Kub", "Cube", "Куб"] }[sh][LI[cur]] + " " + L(["hacmi", "həcmi", "volume", "объём"]) + " = " + f + " = " + fmt(v);
  }
  function hyp(t) {
    var s = norm(t).replace(/(\d),(\d)/g, "$1.$2"), nums = (s.match(/\d+(?:\.\d+)?/g) || []).map(Number);
    if (!/hipotenu|hypotenuse|гипотенуз/.test(s) || nums.length < 2) return null;
    return "c = √(" + fmt(nums[0]) + "² + " + fmt(nums[1]) + "²) = " + fmt(Math.sqrt(nums[0] * nums[0] + nums[1] * nums[1]));
  }
  function solveSys(t) {
    var s = norm(t).replace(/(\d),(\d)/g, "$1.$2"), ms = s.match(/[0-9xy+\-*\/^().\s]+=[0-9xy+\-*\/^().\s]+/g), j = ms ? ms.join("") : "";
    if (!ms || ms.length < 2 || j.indexOf("x") < 0 || j.indexOf("y") < 0) return null;
    var E = ms.slice(0, 2).map(function (m) { var p = m.split("="); return ("(" + p[0] + ")-(" + p[1] + ")").replace(/(\d)\s*([xy])/g, "$1*$2"); }), tol = 1e-9;
    var bad = L(["Bu denklem sistemini çözemiyorum (yalnızca x ve y’li iki doğrusal denklem).", "Bu tənliklər sistemini həll edə bilmirəm (yalnız x və y-li iki xətti tənlik).", "I can't solve this system (only two linear equations in x and y).", "Я не могу решить эту систему (только два линейных уравнения с x и y)."]);
    function f(e, x, y) { var r = evalMath(e.replace(/x/g, "(" + x + ")").replace(/y/g, "(" + y + ")")); if (!r || r.v === undefined) throw 0; return r.v; }
    var R = function (x) { return fmt(Math.round(x * 1e9) / 1e9); };
    try {
      var co = E.map(function (e) { var c = f(e, 0, 0), a = f(e, 1, 0) - c, b = f(e, 0, 1) - c; if (Math.abs(f(e, 2, 3) - (2 * a + 3 * b + c)) > tol || Math.abs(f(e, 1, 1) - (a + b + c)) > tol) throw 0; return [a, b, -c]; });
      var d = co[0][0] * co[1][1] - co[1][0] * co[0][1];
      if (Math.abs(d) < tol) return L(["Tek bir çözüm yok (çözümsüz ya da sonsuz çözüm).", "Yeganə həll yoxdur (həllsiz və ya sonsuz həll).", "No unique solution (none or infinitely many).", "Единственного решения нет (нет решений или бесконечно много)."]);
      return "x = " + R((co[0][2] * co[1][1] - co[1][2] * co[0][1]) / d) + ",  y = " + R((co[0][0] * co[1][2] - co[1][0] * co[0][2]) / d);
    } catch (e) { return bad; }
  }

  function solveEq(t) {
    var s = norm(t).replace(/(\d),(\d)/g, "$1.$2"), m = s.match(/[0-9x+\-*\/^().\s]+=[0-9x+\-*\/^().\s]+/);
    if (!m || m[0].indexOf("x") < 0 || /\d\s*x\s*\d/.test(m[0])) return null;
    var p = m[0].split("="), E = ("(" + p[0] + ")-(" + p[1] + ")").replace(/(\d)\s*x/g, "$1*x"), bad = L(["Bu denklemi çözemiyorum (yalnızca birinci ve ikinci dereceden, tek bilinmeyenli x denklemleri).", "Bu tənliyi həll edə bilmirəm (yalnız bir məchullu x-li, birinci və ikinci dərəcəli tənliklər).", "I can't solve this equation (only first- and second-degree equations in x).", "Я не могу решить это уравнение (только уравнения 1-й и 2-й степени с одной переменной x)."]);
    var f = function (v) { var r = evalMath(E.replace(/x/g, "(" + v + ")")); if (!r || r.v === undefined) throw 0; return r.v; };
    var R = function (x) { return fmt(Math.round(x * 1e9) / 1e9); }, tol = 1e-9;
    try {
      var f0 = f(0), f1 = f(1), fm = f(-1), A = (f1 + fm) / 2 - f0, B = (f1 - fm) / 2;
      if (Math.abs(f(2) - (4 * A + 2 * B + f0)) > tol || Math.abs(f(3) - (9 * A + 3 * B + f0)) > tol) return bad;
      if (Math.abs(A) < tol) {
        if (Math.abs(B) < tol) return Math.abs(f0) < tol ? L(["Sonsuz çözüm var (her x için doğru).", "Sonsuz sayda həll var (hər x üçün doğrudur).", "Infinitely many solutions (true for every x).", "Бесконечно много решений (верно для любого x)."]) : L(["Çözüm yok.", "Həll yoxdur.", "No solution.", "Решений нет."]);
        return "x = " + R(-f0 / B);
      }
      var D = B * B - 4 * A * f0;
      if (D < -tol) return L(["Gerçek kök yok (diskriminant < 0).", "Həqiqi kök yoxdur (diskriminant < 0).", "No real roots (discriminant < 0).", "Действительных корней нет (дискриминант < 0)."]);
      if (D <= tol) return "x = " + R(-B / (2 * A));
      var q = Math.sqrt(D), x1 = (-B - q) / (2 * A), x2 = (-B + q) / (2 * A);
      return "x₁ = " + R(Math.min(x1, x2)) + ",  x₂ = " + R(Math.max(x1, x2));
    } catch (e) { return bad; }
  }
  function geometry(t) {
    var s = norm(t).replace(/(\d),(\d)/g, "$1.$2"), nums = (s.match(/\d+(?:\.\d+)?/g) || []).map(Number), sh = null;
    var SHP = [["circle", /daire|circle|круг|окружност/], ["square", /(^| )kare( |$)|kvadrat|square|квадрат/], ["rect", /dikdortgen|duzbucaqli|rectangle|прямоугольник/], ["tri", /ucgen|ucbucaq|triangle|треугольник/]];
    var NM = { circle: ["Daire", "Dairə", "Circle", "Круг"], square: ["Kare", "Kvadrat", "Square", "Квадрат"], rect: ["Dikdörtgen", "Düzbucaqlı", "Rectangle", "Прямоугольник"], tri: ["Üçgen", "Üçbucaq", "Triangle", "Треугольник"] };
    var area = /(^| )alan|sahe|area|площад/.test(s), per = /cevre|perimet|периметр|длина окружност/.test(s);
    SHP.forEach(function (x) { if (!sh && x[1].test(s)) sh = x[0]; });
    if (!sh || !nums.length || (!area && !per)) return null;
    var a = nums[0], b = nums[1], c = nums[2], v, f, P = Math.PI;
    if (sh === "circle") {
      if (!/yaricap|radius|радиус/.test(s) && /(^| )cap|diameter|диаметр/.test(s)) a /= 2;
      v = area ? P * a * a : 2 * P * a; f = area ? "π × " + fmt(a) + "²" : "2 × π × " + fmt(a);
    } else if (sh === "square") { v = area ? a * a : 4 * a; f = area ? fmt(a) + "²" : "4 × " + fmt(a); }
    else if (sh === "rect") { if (b === undefined) return null; v = area ? a * b : 2 * (a + b); f = area ? fmt(a) + " × " + fmt(b) : "2 × (" + fmt(a) + " + " + fmt(b) + ")"; }
    else if (area && c !== undefined) {
      var h = (a + b + c) / 2, q = h * (h - a) * (h - b) * (h - c);
      if (q <= 0) return L(["Bu kenar uzunluklarıyla üçgen oluşmaz.", "Bu tərəf uzunluqları ilə üçbucaq olmur.", "No triangle exists with these side lengths.", "Треугольника с такими сторонами не существует."]);
      v = Math.sqrt(q); f = L(["Heron formülü", "Heron düsturu", "Heron's formula", "формула Герона"]);
    } else if (area && b !== undefined) { v = a * b / 2; f = fmt(a) + " × " + fmt(b) + " / 2"; }
    else if (!area && c !== undefined) { v = a + b + c; f = fmt(a) + " + " + fmt(b) + " + " + fmt(c); }
    else return null;
    return NM[sh][LI[cur]] + " " + (area ? L(["alanı", "sahəsi", "area", "площадь"]) : L(["çevresi", "perimetri", "perimeter", "периметр"])) + " = " + f + " = " + fmt(v);
  }

  /* ---------- Bilgi tabanı ---------- */
  function lev(a, b) {
    var d = [], i, j;
    for (i = 0; i <= a.length; i++) { d[i] = [i]; }
    for (j = 1; j <= b.length; j++) d[0][j] = j;
    for (i = 1; i <= a.length; i++) for (j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1));
    return d[a.length][b.length];
  }
  // Jeton, anahtarla başlıyorsa ya da (uzun anahtarlarda, aynı ilk harfle) 1-2 harf hatayla benziyorsa eşleşir.
  function near(x, k) {
    if (x.indexOf(k) === 0) return true;
    if (k.length < 6 || x.length < (k.length >= 7 ? k.length - 1 : k.length) || x.charAt(0) !== k.charAt(0)) return false;
    var tol = k.length >= 9 ? 2 : 1;
    return Math.min(lev(x.slice(0, k.length), k), lev(x.slice(0, k.length + 1), k)) <= tol;
  }
  function findCountry(t) {
    var tn = " " + joined(t) + " ", keys = Object.keys(KB.capitals).sort(function (a, b) { return b.length - a.length; });
    for (var i = 0; i < keys.length; i++) if (tn.indexOf(" " + keys[i]) >= 0) return KB.capitals[keys[i]];
    var tk = toks(t);
    for (i = 0; i < keys.length; i++) if (keys[i].indexOf(" ") < 0 && keys[i].length >= 6 && tk.some(function (x) { return near(x, keys[i]); })) return KB.capitals[keys[i]];
    return null;
  }
  function matchFact(t) {
    var tk = toks(t), n = " " + tk.join(" ") + " ", best = null, bs = 0;
    KB.facts.forEach(function (f) {
      var sc = 0;
      f.k.forEach(function (k) {
        var w = 1; if (k.charAt(0) === "!") { w = 2; k = k.slice(1); }
        if (k.indexOf(" ") >= 0) { if (n.indexOf(" " + k) >= 0) sc += w + 1; return; }
        var ex = tk.some(function (x) { return k.length <= 3 ? x === k : x.indexOf(k) === 0; });
        if (ex) sc += w; else if (k.length > 3 && tk.some(function (x) { return near(x, k); })) sc += w * 0.75;
      });
      if (sc > bs) { bs = sc; best = f; }
    });
    return { f: best, s: bs };
  }

  /* ---------- Dosyalar ---------- */
  var STOP = "bir bu ve ile icin gibi daha cok olan olarak kadar sonra ancak fakat ama the and for that with this from have are".split(" ");
  function summarizeFile(f) {
    var kb = (f.size / 1024).toFixed(1).replace(".", ",") + " KB";
    if (f.kind === "image") return "📷 " + f.name + ": görüntü dosyası" + (f.width ? ", " + f.width + "×" + f.height + " piksel" : "") + ", " + kb + ". Fotoğrafın içeriğini yorumlayamam: görüntü tanıyan bir modelim yok, yalnızca boyut bilgisini verebilirim.";
    if (f.kind !== "text") return "📦 " + f.name + ": " + kb + ". Bu dosya türünün içeriğini okuyamıyorum.";
    var t = f.text || "", lines = t.split(/\r?\n/), ne = lines.filter(function (l) { return l.trim(); });
    var words = (t.match(/\S+/g) || []).length;
    var out = "📄 " + f.name + ": " + lines.length + " satır (" + ne.length + " dolu), " + words + " kelime, " + t.length + " karakter, " + kb + ".";
    if (f.truncated) out += " (Yalnızca ilk 30.000 karakter okundu.)";
    if (/\.json$/i.test(f.name)) {
      try { var j = JSON.parse(t); out += " Geçerli JSON (" + (Array.isArray(j) ? "dizi, " + j.length + " öğe" : typeof j === "object" && j ? "nesne, " + Object.keys(j).length + " anahtar" : "değer") + ")."; }
      catch (e) { out += " JSON olarak okunamadı."; }
    }
    if (/\.csv$/i.test(f.name)) out += " Tahmini tablo: " + ne.length + " satır × " + (ne[0] || "").split(/[;,\t]/).length + " sütun.";
    var freq = {}; toks(t).forEach(function (w) { if (w.length >= 4 && STOP.indexOf(w) < 0) freq[w] = (freq[w] || 0) + 1; });
    var top = Object.keys(freq).sort(function (a, b) { return freq[b] - freq[a] || (a < b ? -1 : 1); }).slice(0, 5);
    if (top.length) out += "\nEn sık geçen kelimeler: " + top.map(function (w) { return w + " (" + freq[w] + ")"; }).join(", ") + ".";
    if (ne.length) out += "\nİlk satırlar:\n" + ne.slice(0, 2).map(function (l) { return "› " + (l.length > 80 ? l.slice(0, 80) + "…" : l); }).join("\n");
    return out;
  }


  /* ---------- 1.2: Dünya saatleri ---------- */
  var TZ = [
    ["istanbul|ankara|turkiye|стамбул|турци", "Europe/Istanbul", "İstanbul"], ["baku|baki|баку", "Asia/Baku", "Bakı"],
    ["london|londra|лондон|ingiltere", "Europe/London", "London"], ["berlin|берлин|almanya", "Europe/Berlin", "Berlin"],
    ["paris|париж|fransa|france", "Europe/Paris", "Paris"], ["moskova|moskva|moscow|москв|rusya|russia", "Europe/Moscow", "Moskva"],
    ["tokyo|tokio|токио|japon|япони", "Asia/Tokyo", "Tokyo"], ["new york|nyu york|нью йорк", "America/New_York", "New York"],
    ["los angeles|лос анджелес", "America/Los_Angeles", "Los Angeles"], ["dubai|dubay|дубай", "Asia/Dubai", "Dubai"],
    ["pekin|beijing|пекин", "Asia/Shanghai", "Pekin"], ["delhi|дели|hindistan|india", "Asia/Kolkata", "Delhi"],
    ["sydney|sidney|сидней|avustralya", "Australia/Sydney", "Sydney"], ["kahire|cairo|каир|misir|egypt", "Africa/Cairo", "Kahire"],
    ["tiflis|tbilisi|тбилиси|gurcistan", "Asia/Tbilisi", "Tbilisi"], ["taskent|tashkent|ташкент", "Asia/Tashkent", "Taşkent"],
    ["tahran|tehran|тегеран", "Asia/Tehran", "Tehran"], ["seul|seoul|сеул", "Asia/Seoul", "Seul"],
    ["singapur|singapore|сингапур", "Asia/Singapore", "Singapur"], ["brezilya|brazil|бразил|sao paulo", "America/Sao_Paulo", "São Paulo"]
  ];
  function zoneInfo(z, now) {
    var p = {}, f = new Intl.DateTimeFormat("en-US", { timeZone: z, hourCycle: "h23", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
    f.formatToParts(now).forEach(function (x) { p[x.type] = +x.value; });
    var u = Date.UTC(p.year, p.month - 1, p.day, p.hour % 24, p.minute), off = Math.round((u - Math.floor(now.getTime() / 60000) * 60000) / 60000), d = new Date(u), a = Math.abs(off);
    return { h: pad(p.hour % 24) + ":" + pad(p.minute), d: d.getUTCDate() + " " + DT[cur][0][d.getUTCMonth()] + " " + d.getUTCFullYear() + ", " + DT[cur][1][d.getUTCDay()], u: "UTC" + (off < 0 ? "-" : "+") + Math.floor(a / 60) + (a % 60 ? ":" + pad(a % 60) : "") };
  }
  function worldTime(t, now) {
    var n = " " + joined(t), hit = null, i, k;
    if (!/ saat| time( |$)|clock| час| время/.test(n)) return null;
    try {
      if (/ dunya| world| мировое| часовые|butun/.test(n) && !/ ev( |$)/.test(n)) {
        var rows = [1, 0, 2, 3, 5, 7, 9, 6, 12].map(function (j) { var r = zoneInfo(TZ[j][1], now); return "🕒 " + TZ[j][2] + ": " + r.h + "  (" + r.u + ")"; });
        return rows.join("\n") + "\n\n" + L(["Dünya 24 saat dilimine ayrılır; saatler UTC’ye göre +/- farkla hesaplanır. Bakü UTC+4, Türkiye UTC+3 (yaz/kış değişmez). Bir şehri sor: “Tokyo’da saat kaç?”", "Dünya 24 saat qurşağına bölünür; saatlar UTC-yə görə +/- fərqlə hesablanır. Bakı UTC+4, Türkiyə UTC+3. Şəhər soruş: “Tokioda saat neçədir?”", "The world has 24 time zones, each an offset from UTC. Baku is UTC+4, Türkiye UTC+3 (no daylight saving). Ask about a city: “What time is it in Tokyo?”", "Мир делится на 24 часовых пояса относительно UTC. Баку — UTC+4, Турция — UTC+3. Спроси про город: «Который час в Токио?»"]);
      }
      for (i = 0; i < TZ.length && !hit; i++) TZ[i][0].split("|").forEach(function (k) { if (n.indexOf(" " + k) >= 0) hit = TZ[i]; });
      if (!hit) return null;
      var r = zoneInfo(hit[1], now);
      return "🕒 " + hit[2] + ": " + r.h + "\n" + r.d + " (" + r.u + ")";
    } catch (e) { return null; }
  }

  /* ---------- 1.2: Çeviri (yerel söz/cümle defteri + sözlük) ---------- */
  var PB = [
    ["Merhaba", "Salam", "Hello", "Привет"], ["Günaydın", "Sabahınız xeyir", "Good morning", "Доброе утро"], ["İyi akşamlar", "Axşamınız xeyir", "Good evening", "Добрый вечер"],
    ["İyi geceler", "Gecəniz xeyirli olsun", "Good night", "Спокойной ночи"], ["Nasılsın?", "Necəsən?", "How are you?", "Как дела?"], ["Teşekkür ederim", "Təşəkkür edirəm", "Thank you", "Спасибо"],
    ["Rica ederim", "Buyurun", "You are welcome", "Пожалуйста"], ["Lütfen", "Zəhmət olmasa", "Please", "Пожалуйста"], ["Evet", "Bəli", "Yes", "Да"], ["Hayır", "Xeyr", "No", "Нет"],
    ["Özür dilerim", "Üzr istəyirəm", "I am sorry", "Извините"], ["Seni seviyorum", "Səni sevirəm", "I love you", "Я тебя люблю"], ["Adın ne?", "Adın nədir?", "What is your name?", "Как тебя зовут?"],
    ["Görüşürüz", "Görüşərik", "See you later", "Увидимся"], ["Hoş geldin", "Xoş gəlmisən", "Welcome", "Добро пожаловать"], ["Anlamıyorum", "Başa düşmürəm", "I do not understand", "Я не понимаю"],
    ["Bana yardım eder misin?", "Mənə kömək edə bilərsənmi?", "Can you help me?", "Можешь мне помочь?"], ["Bu ne kadar?", "Bu neçəyədir?", "How much is this?", "Сколько это стоит?"],
    ["Tuvalet nerede?", "Tualet haradadır?", "Where is the toilet?", "Где туалет?"], ["Hayat güzeldir", "Həyat gözəldir", "Life is beautiful", "Жизнь прекрасна"],
    ["Bilgi güçtür", "Bilik gücdür", "Knowledge is power", "Знание — сила"], ["Damlaya damlaya göl olur", "Damla-damla göl olar", "Many a little makes a mickle", "Капля по капле — море"],
    ["Ne ekersen onu biçersin", "Nə əkərsən onu biçərsən", "You reap what you sow", "Что посеешь, то и пожнёшь"], ["Birlikten kuvvet doğar", "Birlikdən qüvvət doğar", "Unity is strength", "В единстве — сила"],
    ["Seni özledim", "Səni darıxdım", "I miss you", "Я скучаю по тебе"], ["Doğum günün kutlu olsun", "Ad günün mübarək", "Happy birthday", "С днём рождения"]
  ];
  var WD = [
    ["ev", "ev", "house", "дом"], ["su", "su", "water", "вода"], ["ekmek", "çörək", "bread", "хлеб"], ["kitap", "kitab", "book", "книга"], ["okul", "məktəb", "school", "школа"],
    ["arkadaş", "dost", "friend", "друг"], ["sevgi", "sevgi", "love", "любовь"], ["güzel", "gözəl", "beautiful", "красивый"], ["büyük", "böyük", "big", "большой"], ["küçük", "kiçik", "small", "маленький"],
    ["gün", "gün", "day", "день"], ["gece", "gecə", "night", "ночь"], ["bugün", "bu gün", "today", "сегодня"], ["yarın", "sabah", "tomorrow", "завтра"], ["dün", "dünən", "yesterday", "вчера"],
    ["ben", "mən", "I", "я"], ["sen", "sən", "you", "ты"], ["biz", "biz", "we", "мы"], ["anne", "ana", "mother", "мама"], ["baba", "ata", "father", "папа"], ["kardeş", "qardaş", "brother", "брат"],
    ["çocuk", "uşaq", "child", "ребёнок"], ["insan", "insan", "person", "человек"], ["şehir", "şəhər", "city", "город"], ["ülke", "ölkə", "country", "страна"], ["dünya", "dünya", "world", "мир"],
    ["zaman", "zaman", "time", "время"], ["para", "pul", "money", "деньги"], ["iş", "iş", "work", "работа"], ["yemek", "yemək", "food", "еда"], ["çay", "çay", "tea", "чай"], ["kahve", "qəhvə", "coffee", "кофе"],
    ["araba", "maşın", "car", "машина"], ["yol", "yol", "road", "дорога"], ["deniz", "dəniz", "sea", "море"], ["dağ", "dağ", "mountain", "гора"], ["güneş", "günəş", "sun", "солнце"], ["ay", "ay", "moon", "луна"],
    ["iyi", "yaxşı", "good", "хороший"], ["kötü", "pis", "bad", "плохой"], ["hızlı", "sürətli", "fast", "быстрый"], ["yeni", "yeni", "new", "новый"], ["eski", "köhnə", "old", "старый"],
    ["ve", "və", "and", "и"], ["ile", "ilə", "with", "с"], ["için", "üçün", "for", "для"], ["çok", "çox", "very", "очень"], ["sevmek", "sevmək", "to love", "любить"], ["gitmek", "getmək", "to go", "идти"],
    ["gelmek", "gəlmək", "to come", "приходить"], ["yazmak", "yazmaq", "to write", "писать"], ["okumak", "oxumaq", "to read", "читать"], ["Azerbaycan", "Azərbaycan", "Azerbaijan", "Азербайджан"],
    ["Bakü", "Bakı", "Baku", "Баку"], ["Türkiye", "Türkiyə", "Turkey", "Турция"], ["Rusya", "Rusiya", "Russia", "Россия"], ["anavatan", "ana vətən", "motherland", "родина"], ["vatan", "vətən", "homeland", "отечество"]
  ];
  var LNG = { tr: /turkc|turkish|турецк|turk dil/, az: /azerbaycanc|azerice|azeri|azerbaijani|азербайджанск/, en: /ingilizc|ingilis|english|английск/, ru: /rusc|russian|русск|rus dil/ };
  function translate(t) {
    var q = t.match(/[“"«„](.+?)[”"»“]/), rest = q ? t.replace(q[0], " ") : t, n = joined(rest), tg = null, best = -1, src, i, c, tk, cnt = [0, 0, 0, 0], out = [], miss = 0;
    if (!/(cevir|tercume|translate|переведи|перевод)/.test(n)) return null;
    Object.keys(LNG).forEach(function (k) { var m = n.search(LNG[k]); if (m > best) { best = m; tg = k; } });
    if (!tg) return null;
    if (q) src = joined(q[1]);
    else src = n.replace(/(ingilizc|ingilis|english|английск|rusc|russian|русск|rus dil|azerbaycanc|azerice|azeri|azerbaijani|азербайджанск|turkc|turkish|турецк|turk dil|cevir|tercume|translate|переведи|перевод)\w*/g, " ")
      .replace(/(^| )(yi|yu|ni|nu|ya|ye|den|dan|ten|tan|from|to|into|et|eder misin|the|sentence|word|phrase|cumleyi|cumle|kelimeyi|soz|sozu|sozleri|lutfen|please)(?= |$)/g, " ").replace(/\s+/g, " ").trim();
    var T = LI[tg], bad = L(["Bunu çeviremedim: yerel söz defterimde ve sözlüğümde yok. Kısa söz/cümleleri (selamlaşma, atasözü, günlük ifade) ve temel kelimeleri çevirebiliyorum. Tırnak içinde yaz: “Merhaba” İngilizceye çevir.", "Bunu tərcümə edə bilmədim: yerli söz dəftərimdə və lüğətimdə yoxdur. Qısa söz/cümlələri və əsas sözləri tərcümə edə bilirəm. Dırnaq içində yaz: “Salam” rusca tərcümə et.", "I couldn't translate that: it isn't in my local phrasebook or dictionary. I can translate short phrases, sayings and basic words. Put it in quotes: translate “Hello” to Russian.", "Не смог перевести: этого нет в моём разговорнике и словаре. Я перевожу короткие фразы, поговорки и базовые слова. Напиши в кавычках: переведи «Привет» на английский."]);
    if (!src) return bad;
    for (i = 0; i < PB.length; i++) for (c = 0; c < 4; c++) if (joined(PB[i][c]) === src) return PB[i][T];
    tk = src.split(" ");
    function look(w, col) { for (var j = 0; j < WD.length; j++) { var k = joined(WD[j][col]); if (w === k || (k.length >= 2 && w.length > k.length && w.indexOf(k) === 0 && w.length - k.length <= 3)) return WD[j]; } return null; }
    for (c = 0; c < 4; c++) tk.forEach(function (w) { if (look(w, c)) cnt[c]++; });
    c = cnt.indexOf(Math.max.apply(null, cnt));
    if (!cnt[c]) return bad;
    tk.forEach(function (w) { var e = look(w, c); if (e) out.push(e[T]); else { out.push("?"); miss++; } });
    return out.join(" ") + L(["\n(Kelime kelime çeviri; ek ve dil bilgisi uyarlanmaz, bu yüzden tam doğru olmayabilir.)", "\n(Söz-söz tərcümə; şəkilçilər uyğunlaşdırılmır, tam dəqiq olmaya bilər.)", "\n(Word-by-word translation; grammar isn't adapted, so it may not be exact.)", "\n(Пословный перевод; грамматика не адаптируется, поэтому может быть неточным.)"]);
  }

  /* ---------- 1.2: Türev ve integral (polinom) ---------- */
  function calculus(t) {
    var s = norm(t).replace(/(\d)\s*x/g, "$1x"), d = /turev|derivative|производн/.test(s), g = /integral|inteqral|интеграл/.test(s);
    if (!d && !g) return null;
    var m = s.match(/[0-9x][0-9x+\-*^.]*(?:\s*[+\-]\s*[0-9x][0-9x*^.]*)*/);
    if (!m) return null;
    var c = {}, ok = true, parts = m[0].replace(/\s+/g, "").split(/(?=[+-])/);
    parts.forEach(function (p) {
      var x = p.match(/^([+-]?)(\d*\.?\d*)\*?(x)?(?:\^(\d+))?$/);
      if (!x || (x[2] === "" && !x[3])) { ok = false; return; }
      var v = (x[2] === "" ? 1 : parseFloat(x[2])) * (x[1] === "-" ? -1 : 1), e = x[3] ? (x[4] ? +x[4] : 1) : 0;
      c[e] = (c[e] || 0) + v;
    });
    if (!ok) return null;
    var r = {};
    Object.keys(c).forEach(function (e) { e = +e; if (d) { if (e > 0) r[e - 1] = c[e] * e; } else r[e + 1] = c[e] / (e + 1); });
    var ks = Object.keys(r).map(Number).filter(function (e) { return Math.abs(r[e]) > 1e-12; }).sort(function (a, b) { return b - a; });
    var str = ks.map(function (e, i) {
      var v = r[e], a = Math.abs(v), body = (a === 1 && e > 0 ? "" : fmt(a)) + (e === 0 ? "" : "x" + (e > 1 ? "^" + e : ""));
      return (v < 0 ? (i ? " − " : "−") : (i ? " + " : "")) + body;
    }).join("") || "0";
    return (d ? "f′(x) = " : "∫ f(x) dx = ") + str + (g ? " + C" : "");
  }


  /* ---------- 1.3: Ülke coğrafyası ---------- */
  var HP = function (a, m) { return [a, m]; };
  var GEO = [
    ["turkiye|turkey|турци", "Türkiye|Türkiyə|Türkiye|Турция", 783562, 85, "X", HP("Ağrı Dağı|Ağrı dağı|Mount Ararat|Арарат", 5137)],
    ["azerbaycan|azerbaijan|азербайджан", "Azerbaycan|Azərbaycan|Azerbaijan|Азербайджан", 86600, 10.1, "X", HP("Bazardüzü|Bazardüzü|Bazardüzü|Базардюзю", 4466)],
    ["almanya|germany|almaniya|герман", "Almanya|Almaniya|Germany|Германия", 357600, 84, "E"],
    ["fransa|france|франц", "Fransa|Fransa|France|Франция", 551700, 68, "E", HP("Mont Blanc|Mont Blan|Mont Blanc|Монблан", 4806)],
    ["italya|italy|italiya|итал", "İtalya|İtaliya|Italy|Италия", 301340, 59, "E"],
    ["ispanya|spain|ispaniya|испан", "İspanya|İspaniya|Spain|Испания", 505990, 48, "E"],
    ["birlesik krallik|ingiltere|england|united kingdom|великобритан", "Birleşik Krallık|Birləşmiş Krallıq|United Kingdom|Великобритания", 243610, 68, "E"],
    ["rusya|russia|rusiya|росси", "Rusya|Rusiya|Russia|Россия", 17098242, 144, "X", HP("Elbrus|Elbrus|Mount Elbrus|Эльбрус", 5642)],
    ["polonya|poland|polsa|польш", "Polonya|Polşa|Poland|Польша", 312700, 37.5, "E"],
    ["yunanistan|greece|yunanistan|греци", "Yunanistan|Yunanıstan|Greece|Греция", 131957, 10.4, "E"],
    ["gurcistan|georgia|gurcustan|грузи", "Gürcistan|Gürcüstan|Georgia|Грузия", 69700, 3.7, "X"],
    ["ermenistan|armenia|ermenistan|армени", "Ermenistan|Ermənistan|Armenia|Армения", 29743, 3, "X"],
    ["iran|иран", "İran|İran|Iran|Иран", 1648195, 89, "A"],
    ["irak|iraq|ирак", "Irak|İraq|Iraq|Ирак", 438317, 45, "A"],
    ["suudi arabistan|saudi arabia|seudiyye|саудовск", "Suudi Arabistan|Səudiyyə Ərəbistanı|Saudi Arabia|Саудовская Аравия", 2149690, 35, "A"],
    ["misir|egypt|египет", "Mısır|Misir|Egypt|Египет", 1002450, 114, "F"],
    ["abd|abs|usa|united states|сша|соединенные штаты", "ABD|ABŞ|United States|США", 9833517, 335, "N", HP("Denali|Denali|Denali|Денали", 6190)],
    ["kanada|canada|канад", "Kanada|Kanada|Canada|Канада", 9984670, 40, "N"],
    ["meksika|mexico|мексик", "Meksika|Meksika|Mexico|Мексика", 1964375, 129, "N"],
    ["brezilya|brazil|braziliya|бразил", "Brezilya|Braziliya|Brazil|Бразилия", 8515767, 212, "S"],
    ["arjantin|argentina|аргентин", "Arjantin|Argentina|Argentina|Аргентина", 2780400, 46, "S", HP("Aconcagua|Akonkaqua|Aconcagua|Аконкагуа", 6961)],
    ["sili|chile|cili|чили", "Şili|Çili|Chile|Чили", 756102, 19.6, "S"],
    ["japonya|japan|yaponiya|япони", "Japonya|Yaponiya|Japan|Япония", 377975, 124, "A", HP("Fuji Dağı|Fuji dağı|Mount Fuji|Фудзи", 3776)],
    ["cin|china|chin|китай", "Çin|Çin|China|Китай", 9596961, 1410, "A"],
    ["hindistan|india|indiya|инди", "Hindistan|Hindistan|India|Индия", 3287263, 1430, "A"],
    ["guney kore|south korea|cenubi koreya|южная корея", "Güney Kore|Cənubi Koreya|South Korea|Южная Корея", 100363, 51.7, "A"],
    ["avustralya|australia|avstraliya|австрали", "Avustralya|Avstraliya|Australia|Австралия", 7692024, 27, "O"],
    ["yeni zelanda|new zealand|yeni zelandiya|новая зеландия", "Yeni Zelanda|Yeni Zelandiya|New Zealand|Новая Зеландия", 268021, 5.2, "O"],
    ["kazakistan|kazakhstan|qazaxistan|казахстан", "Kazakistan|Qazaxıstan|Kazakhstan|Казахстан", 2724900, 20, "X"],
    ["ozbekistan|uzbekistan|узбекистан", "Özbekistan|Özbəkistan|Uzbekistan|Узбекистан", 448978, 36, "A"],
    ["nijerya|nigeria|nigeriya|нигери", "Nijerya|Nigeriya|Nigeria|Нигерия", 923768, 224, "F"],
    ["kenya|кения", "Kenya|Keniya|Kenya|Кения", 580367, 55, "F"],
    ["pakistan|пакистан", "Pakistan|Pakistan|Pakistan|Пакистан", 881913, 240, "A"],
    ["isvec|sweden|швеци", "İsveç|İsveç|Sweden|Швеция", 450295, 10.5, "E"],
    ["norvec|norway|норвег", "Norveç|Norveç|Norway|Норвегия", 385207, 5.5, "E"],
    ["finlandiya|finland|финлянд", "Finlandiya|Finlandiya|Finland|Финляндия", 338145, 5.6, "E"],
    ["hollanda|netherlands|niderland|нидерланд|голланд", "Hollanda|Niderland|Netherlands|Нидерланды", 41850, 17.9, "E"],
    ["isvicre|switzerland|isvecre|швейцар", "İsviçre|İsveçrə|Switzerland|Швейцария", 41285, 8.8, "E"],
    ["avusturya|austria|avstriya|австри", "Avusturya|Avstriya|Austria|Австрия", 83879, 9.1, "E"],
    ["portekiz|portugal|portuqaliya|португал", "Portekiz|Portuqaliya|Portugal|Португалия", 92090, 10.4, "E"]
  ];
  var CT = { A: ["Asya", "Asiya", "Asia", "Азия"], E: ["Avrupa", "Avropa", "Europe", "Европа"], F: ["Afrika", "Afrika", "Africa", "Африка"], N: ["Kuzey Amerika", "Şimali Amerika", "North America", "Северная Америка"],
    S: ["Güney Amerika", "Cənubi Amerika", "South America", "Южная Америка"], O: ["Okyanusya", "Okeaniya", "Oceania", "Океания"], X: ["Asya ve Avrupa (Avrasya)", "Asiya və Avropa (Avrasiya)", "Asia and Europe (Eurasia)", "Азия и Европа (Евразия)"] };
  function geoHit(tk, n, k) {
    if (k.indexOf(" ") >= 0) return (" " + n).indexOf(" " + k) >= 0;
    return tk.some(function (x) { return x === k || (k.length >= 5 ? x.indexOf(k) === 0 : x.indexOf(k) === 0 && x.length <= k.length + 2); });
  }
  function geoQ(t) {
    var n = joined(t), tk = n.split(" "), a = /yuzolcum|buyukluk|(^| )alan(i|in|ini)?( |$)|sahesi|(^| )area|how big|площад/.test(n), p = /nufus|ehali|population|населен/.test(n),
      c = /(^| )kita|qite|continent|континент/.test(n), g = /cograf|geograph|географ/.test(n), best = null, bl = 0;
    if (!(a || p || c || g)) return null;
    GEO.forEach(function (r) { r[0].split("|").forEach(function (k) { if (k.length > bl && geoHit(tk, n, k)) { best = r; bl = k.length; } }); });
    if (!best) return null;
    var nm = best[1].split("|")[LI[cur]], all = !(a || p || c), o = [], cn = CT[best[4]][LI[cur]], hp = best[5];
    if (a || all) o.push(L(["yüzölçümü yaklaşık " + fmt(best[2]) + " km²", "sahəsi təxminən " + fmt(best[2]) + " km²", "area about " + fmt(best[2]) + " km²", "площадь около " + fmt(best[2]) + " км²"]));
    if (p || all) o.push(L(["nüfusu yaklaşık " + fmt(best[3]) + " milyon", "əhalisi təxminən " + fmt(best[3]) + " milyon", "population about " + fmt(best[3]) + " million", "население около " + fmt(best[3]) + " млн"]));
    if (c || all) o.push(L(["kıta: ", "qitə: ", "continent: ", "континент: "]) + cn);
    if (hp && all) o.push(L(["en yüksek nokta: ", "ən hündür nöqtə: ", "highest point: ", "высшая точка: "]) + hp[0].split("|")[LI[cur]] + " (" + fmt(hp[1]) + " m)");
    return nm + ": " + o.join("; ") + "." + ((p || all) ? L(["\n(Rakamlar yaklaşık, yuvarlak ve güncel olmayabilir.)", "\n(Rəqəmlər təxmini və yuvarlaqdır, köhnə ola bilər.)", "\n(Figures are approximate and may be out of date.)", "\n(Цифры приблизительные и могут быть устаревшими.)"]) : "");
  }

  /* ---------- Dil katmanı (tr, az, en, ru) ---------- */
  var LI = { tr: 0, az: 1, en: 2, ru: 3 }, cur = "tr";
  function L(a) { return a[LI[cur]]; }
  function detect(t, st) {
    var s = t.toLowerCase(), n = " " + joined(t) + " ";
    if (/[а-яё]/.test(s)) return "ru";
    if (/ə/.test(s) || /\b(salam|paytaxt\w*|nece\w*|hansi|haqqinda|sahe|ededdir|komek|sagol|prezident\w*|olke\w*|tarix\w*|yaranib|qurulub|bilirsen|edirem|deyilem|yaponiya|almaniya|fransa|rusiya|italiya|ispaniya)\b/.test(n)) return "az";
    if (/\b(what|who|how|tell|hello|hi|hey|the|of|is|are|capital|plus|minus|times|divided|solve|area|perimeter|please|thanks|thank|you|your|why|when|where|which|many|much|time|day|date|history|empire|war|union|theorem|world|dynasty|kingdom|republic|european|derivative|equation|fraction|volume|cube|root|prime|percent|roman|history)\b/.test(n)) return "en";
    if (/(merhaba|selam|baskent|neresi|nasil|kac|yuzde|karekok|kimdir|nedir|neler|saat|bugun|(^| )alan|cevre)/.test(n)) return "tr";
    return st.lang || "tr";
  }
  var DT = {
    tr: [MONTHS, DAYS],
    az: ["yanvar|fevral|mart|aprel|may|iyun|iyul|avqust|sentyabr|oktyabr|noyabr|dekabr".split("|"), "Bazar|Bazar ertəsi|Çərşənbə axşamı|Çərşənbə|Cümə axşamı|Cümə|Şənbə".split("|")],
    en: ["January|February|March|April|May|June|July|August|September|October|November|December".split("|"), "Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday".split("|")],
    ru: ["января|февраля|марта|апреля|мая|июня|июля|августа|сентября|октября|ноября|декабря".split("|"), "воскресенье|понедельник|вторник|среда|четверг|пятница|суббота".split("|")]
  };
  var UNKNOWN = [
    "Bunu bilmiyorum. Ben internete bağlı olmayan, sınırlı bir yerel bilgi tabanıyla çalışan bir asistanım; tahmin yürütüp yanlış bilgi vermek istemem.\n\nŞunlarda yardımcı olabilirim: hesaplamalar, denklemler, geometri, birim çevirme, saat ve tarih, ülke başkentleri, bilim–tarih–programlamadan temel bilgiler ve dosya istatistikleri. “Neler biliyorsun?” yazarak konu listesini görebilirsin.",
    "Bunu bilmirəm. Mən internetə qoşulmayan, məhdud yerli bilik bazası ilə işləyən köməkçiyəm; təxmin edib yanlış məlumat vermək istəmirəm. Bu məlumat oflayn bilik bazamda yoxdur.\n\nHesablamalar, tənliklər, həndəsə, vahid çevirmə, saat və tarix, paytaxtlar və bəzi əsas biliklər üzrə kömək edə bilərəm. “Nələr bilirsən?” yaza bilərsən.",
    "I don't know that. It isn't in my offline knowledge base, and I'd rather not guess and give you wrong information.\n\nI can help with calculations, equations, geometry, unit conversion, time and date, capitals and some basic facts. Type “What do you know?” to see the topics.",
    "Я этого не знаю. Этого нет в моей офлайн-базе знаний, и я не хочу гадать и давать неверную информацию.\n\nМогу помочь с вычислениями, уравнениями, геометрией, единицами измерения, временем и датой, столицами и базовыми фактами. Напиши «Что ты знаешь?», чтобы увидеть темы."
  ];
  var YES = /^(evet|olur|tamam|aynen|dogru|he|beli|yes|yeah|yep|ok|да|ага|конечно)$/;
  var FOLLOW = /^(peki|ya|bir de|bes|and|what about|how about|а|а как|а если)(\s|$)/;

  function ans(f) {
    var a = f.a;
    if (typeof a === "string") return (cur === "tr" ? "" : L(["", "(Cavab yalnız türk dilində var.)\n", "(This answer is only available in Turkish.)\n", "(Ответ есть только на турецком.)\n"])) + a;
    return a[cur] || a.tr;
  }
  function capOut(c) {
    var i = { tr: 0, az: 6, en: 2, ru: 4 }[cur]; if (c.length <= i) i = 0;
    return L(["%1 için başkent: %2.", "%1 üçün paytaxt: %2.", "Capital of %1: %2.", "Столица (%1): %2."]).replace("%1", c[i]).replace("%2", c[i + 1]);
  }

  /* ---------- Yönlendirme ---------- */
  function route(t, st, now) {
    var n = joined(t), s = norm(t), r;
    function ok(x, last) { st.last = last || ""; st.pending = null; return { text: x, known: true }; }

    if (st.pending && YES.test(n)) { var f = st.pending; return ok(ans(f)); }
    st.pending = null;
    if ((r = translate(t))) return ok(r);

    // Ad hafızası
    if (/(adim ne|adimi biliyor|ben kimim|adimi hatirl|what s my name|what is my name|who am i|do you know my name|как меня зовут|ты знаешь мое имя)/.test(n))
      return ok(st.name ? L(["Adın ", "Adın ", "Your name is ", "Тебя зовут "]) + st.name + "." : L(["Henüz adını bilmiyorum. “Adım …” yazarsan hatırlarım.", "Hələ adını bilmirəm. “Mənim adım …” yazsan, yadda saxlayaram.", "I don't know your name yet. Say “My name is …” and I'll remember it.", "Я пока не знаю твоего имени. Напиши «Меня зовут …», и я запомню."]));
    var nm = t.match(/(?:adım|adim|ismim|my name is|call me|меня зовут)\s+([^\s.,!?;:]+)/i);
    if (nm && !/^(ne|neydi|nedir|nece|necedir)$/.test(norm(nm[1]))) { st.name = cap(nm[1]); return ok(L(["Memnun oldum " + st.name + "! Adını bu cihazda hatırlayacağım.", "Tanış olduğumuza şadam, " + st.name + "! Adını bu cihazda yadda saxlayacağam.", "Nice to meet you, " + st.name + "! I'll remember your name on this device.", "Приятно познакомиться, " + st.name + "! Я запомню твоё имя на этом устройстве."])); }

    // Sohbet
    if (/(sen kimsin|^kimsin|adin ne|ismin ne|nesin|kendini tanit|yapay zeka misin|gercek misin|insan misin|sen kimsen|kimsen|who are you|what are you|кто ты|ты кто)/.test(n))
      return ok(L(["Ben Zunex AI’ım: tarayıcında yerel çalışan bir asistanım. Büyük bir yapay zekâ modeli değilim; yerleşik bilgi tabanı, hesap makinesi ve kurallarla cevap veririm. Bilmediğim şeyi bilmediğimi söylerim.", "Mən Zunex AI-yam: brauzerində yerli işləyən köməkçiyəm. Böyük süni intellekt modeli deyiləm; daxili bilik bazası, kalkulyator və qaydalarla cavab verirəm. Bilmədiyim şeyi bilmədiyimi deyirəm.", "I'm Zunex AI, an assistant that runs locally on your device. I'm not a large AI model; I answer with a built-in knowledge base, a calculator and rules. When I don't know something, I say so.", "Я Zunex AI — ассистент, работающий локально на твоём устройстве. Я не большая ИИ-модель: отвечаю с помощью встроенной базы знаний, калькулятора и правил. Если чего-то не знаю, говорю об этом."]));
    if (/(internet|интернет)/.test(n) && /(bagli|baglan|var mi|online|connect|calis|подключ|онлайн|работ)/.test(n))
      return ok(L(["Hayır, internete bağlı değilim. Her şey senin tarayıcında, yerel olarak çalışır; yazdıkların hiçbir sunucuya gönderilmez.", "Xeyr, internetə qoşulu deyiləm. Hər şey brauzerində yerli işləyir; yazdıqların heç bir serverə göndərilmir.", "No, I'm not connected to the internet. Everything runs locally on your device; nothing you type is sent to any server.", "Нет, я не подключён к интернету. Всё работает локально на твоём устройстве; ничего из написанного не отправляется на сервер."]));
    if (/(neler yapabilirsin|ne yapabilirsin|yardim|neler biliyorsun|ne biliyorsun|konular|nasil kullan|neler ede|nele?r bilirsen|what can you do|what do you know|help|что ты умеешь|что ты знаешь|помощь)/.test(n))
      return ok(L(["Şunları yapabilirim:\n• Hesap: “(12+8)*3”, “karekök 144”, “200’ün yüzde 15’i”, “7!”, “1/2 + 1/3”\n• Denklem: “2x+5=15”, “x^2-5x+6=0”\n• Geometri: “yarıçapı 5 olan dairenin alanı”\n• Birim: “100 celsius kaç fahrenheit”, “10 km kaç mil”\n• “29 asal mı?”, saat, tarih, zar, yazı-tura\n• Ülke başkentleri (“Fransa’nın başkenti?”)\n• Ülke coğrafyası (“Japonya hangi kıtada?”, “Brezilya’nın yüzölçümü”)\n• Dosya: .txt/.csv/.json gönder, istatistiklerini çıkarayım\n\nBilgi tabanı konuları: " + KB.facts.map(function (x) { return x.t; }).join(", ") + ".",
        "Bunları edə bilərəm:\n• Hesab: “(12+8)*3”, “kök 144”, “200-ün 15 faizi”, “1/2 + 1/3”\n• Tənlik: “2x+5=15”, “x^2-5x+6=0”\n• Həndəsə: “radiusu 5 olan dairənin sahəsi”\n• Vahid çevirmə, “29 sade ededdir?”, saat, tarix\n• Paytaxtlar; tarix, coğrafiya və elmdən bəzi qısa məlumatlar (Nizami, Xalq Cümhuriyyəti, Osmanlı…)",
        "I can do these:\n• Math: “(12+8)*3”, “square root of 144”, “15% of 200”, “1/2 + 1/3”\n• Equations: “2x+5=15”, “x^2-5x+6=0”\n• Geometry: “area of a circle with radius 5”\n• Units, “is 29 prime?”, time and date\n• Capitals and a few short facts (history, geography, science, football)",
        "Вот что я умею:\n• Вычисления: «(12+8)*3», «корень из 144», «15% от 200», «1/2 + 1/3»\n• Уравнения: «2x+5=15», «x^2-5x+6=0»\n• Геометрия: «площадь круга радиус 5»\n• Единицы, «29 простое число?», время и дата\n• Столицы и несколько кратких фактов (история, география, наука, футбол)"]));
    if (/(hatirliyor musun|hafiza|unutur musun|konustuklarimizi)/.test(n)) return ok("Evet, sohbet geçmişin bu tarayıcıda kayıtlı ve adını da hatırlarım. “Sohbeti temizle” ile hepsi silinir.");
    if (/^(tesekkur|tesekkurler|sag ol|eyvallah|saol|cok sag ol|sagol|cox sagol|thanks|thank you|спасибо)/.test(n)) return ok(L(["Rica ederim! Başka bir şey lazım olursa buradayım.", "Buyurun! Başqa sualın olsa, buradayam.", "You're welcome! Ask me anything else.", "Пожалуйста! Спрашивай, если нужно что-то ещё."]));
    if (/^(gorusuruz|hosca kal|bye|bay bay|iyi gunler dilerim|goodbye|see you|до свидания|пока|saq ol)(\s|$)/.test(n)) return ok(L(["Görüşmek üzere!", "Görüşənədək!", "Goodbye!", "До свидания!"]));
    if (/^((merhaba|selam)\w*|hey|alo|gunaydin|iyi gunler|iyi aksamlar|iyi geceler|naber|ne haber|nasilsin|nasil gidiyor|salam|sabahiniz xeyir|necesen|hello|hi|good morning|good evening|how are you|привет|здравствуй\w*|добрый|как дела)(\s|$)/.test(n)) {
      var who = st.name ? " " + st.name : "";
      if (/nasil|naber|haber|necesen|how are|как дела/.test(n)) return ok(L(["İyiyim" + who + ", teşekkürler! (Bir programım ama sorduğun için sağ ol.) Sana nasıl yardımcı olabilirim?", "Yaxşıyam" + who + ", sağ ol! (Proqramam, amma soruşduğuna görə təşəkkür.) Sənə necə kömək edə bilərəm?", "I'm doing well" + who + ", thanks! (I'm a program, but thanks for asking.) How can I help?", "Хорошо" + who + ", спасибо! (Я программа, но приятно, что спросил.) Чем могу помочь?"]));
      return ok(L(["Merhaba" + who + "! Ben Zunex AI. Hesaplama, bilgi soruları ve dosya istatistikleri konusunda yardımcı olabilirim.", "Salam" + who + "! Mən Zunex AI-yam. Hesablama və əsas bilik sualları ilə kömək edə bilərəm.", "Hello" + who + "! I'm Zunex AI. I can help with calculations and basic knowledge questions.", "Привет" + who + "! Я Zunex AI. Могу помочь с вычислениями и базовыми вопросами."]));
    }

    // Saat, tarih, rastgele
    if ((r = worldTime(t, now))) return ok(r);
    if (/saat kac|saati soyle|su an saat|saat nece|what time|time is it|current time|который час|сколько времени/.test(n)) return ok(L(["Şu an saat ", "İndi saat ", "The time is ", "Сейчас "]) + pad(now.getHours()) + ":" + pad(now.getMinutes()) + L([" (cihazının saatine göre).", " (cihazının saatına görə).", " (by your device clock).", " (по часам устройства)."]));
    if (/(bugun.*(gun|tarih)|tarih ne|gunlerden ne|hangi gun|bugunun tarihi|ayin kaci|hangi yil|bu gun hansi|tarix nece|what day|today s date|the date|current date|какое сегодня число|какое число|какой сегодня день)/.test(n)) {
      var D = DT[cur];
      return ok(L(["Bugün ", "Bu gün ", "Today is ", "Сегодня "]) + now.getDate() + " " + D[0][now.getMonth()] + " " + now.getFullYear() + ", " + D[1][now.getDay()] + L([" (cihazının tarihine göre).", " (cihazının tarixinə görə).", " (by your device date).", " (по дате устройства)."]));
    }
    if (/zar at|roll a dice|roll dice|брось кубик/.test(n)) return ok("🎲 " + (Math.floor(Math.random() * 6) + 1));
    if (/yazi tura|flip a coin|heads or tails|орел или решка/.test(n)) return ok(Math.random() < 0.5 ? L(["Yazı", "Yazı", "Heads", "Орёл"]) : L(["Tura", "Tura", "Tails", "Решка"]));
    if (/rastgele sayi|random number|случайное число/.test(n)) {
      var ns = (n.match(/\d+/g) || []).map(Number), lo = 1, hi = 100;
      if (ns.length >= 2) { lo = Math.min(ns[0], ns[1]); hi = Math.max(ns[0], ns[1]); }
      return ok(String(lo + Math.floor(Math.random() * (hi - lo + 1))));
    }

    // Hesap
    if ((r = primeCheck(t))) return ok(r);
    if ((r = factq(t)) || (r = gcdlcm(t)) || (r = factorize(t)) || (r = comb(t)) || (r = pctOf(t)) || (r = stats(t))) return ok(r);
    if ((r = percent(t))) return ok(r);
    if ((r = unitConvert(t))) return ok(r);
    if ((r = calculus(t)) || (r = solveSys(t)) || (r = solveEq(t))) return ok(r);
    if ((r = fraction(t))) return ok(r);
    if ((r = geometry(t)) || (r = hyp(t)) || (r = volume(t))) return ok(r);
    var mr = evalMath(t);
    if (mr) return ok(mr.text);

    if ((r = geoQ(t))) return ok(r);

    // Başkent (+ takip soruları)
    var asksCap = /baskent|paytaxt|capital|столиц/.test(s) || toks(t).some(function (x) { return ["baskent", "paytaxt", "capital", "столиц"].some(function (k) { return near(x, k); }); }) || (st.last === "capital" && FOLLOW.test(n));
    if (asksCap) {
      var c = findCountry(t);
      if (c) return ok(capOut(c), "capital");
      return ok(L(["Hangi ülkeyi sorduğunu anlayamadım ya da o ülke bilgi tabanımda yok.", "Hansı ölkəni soruşduğunu anlamadım ya da o ölkə bilik bazamda yoxdur.", "I couldn't tell which country you mean, or it isn't in my knowledge base.", "Я не понял, о какой стране речь, либо её нет в моей базе знаний."]), "capital");
    }

    // Bilgi tabanı
    var m = matchFact(t);
    if (m.f && m.s >= 1.5) return ok(ans(m.f));
    if (m.f && m.s >= 0.75) { st.pending = m.f; st.last = ""; return { text: L(["Tam emin olamadım. Şunu mu kastettin: “" + m.f.t + "”? “Evet” dersen cevaplarım.", "Tam əmin olmadım. Bunu nəzərdə tutdun: “" + m.f.t + "”? “Bəli” desən cavablayaram.", "I'm not sure. Did you mean: “" + m.f.t + "”? Say “yes” and I'll answer.", "Я не уверен. Ты имел в виду: «" + m.f.t + "»? Скажи «да», и я отвечу."]), known: true }; }

    st.last = "";
    return { text: L(UNKNOWN), known: false };
  }

  function reply(text, opts) {
    opts = opts || {};
    var st = opts.state || (opts.state = {}), files = opts.files || [], t = String(text || "").trim(), parts = [];
    if (st.name === undefined) st.name = "";
    cur = t ? detect(t, st) : (st.lang || "tr"); st.lang = cur;
    if (files.length) parts.push(files.map(summarizeFile).join("\n\n"));
    if (t) { var r = route(t, st, opts.now || new Date()); if (r.known || !files.length) parts.push(r.text); }
    else if (!files.length) parts.push(L(["Bir şey yazar mısın?", "Bir şey yazarsan?", "Could you type something?", "Напиши что-нибудь."]));
    return parts.join("\n\n");
  }

  return { reply: reply, evalMath: evalMath, norm: norm };
});
