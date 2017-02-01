"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var _typeof;

  return {
    setters: [],
    execute: function () {
      _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
      /*! @license Copyright 2017 Dan Vanderkam (danvdk@gmail.com) MIT-licensed (http://opensource.org/licenses/MIT) */
      !function (t) {
        if ("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module) module.exports = t();else if ("function" == typeof define && define.amd) define([], t);else {
          var e;e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, e.Dygraph = t();
        }
      }(function () {
        return function t(e, a, i) {
          function n(o, s) {
            if (!a[o]) {
              if (!e[o]) {
                var l = "function" == typeof require && require;if (!s && l) return l(o, !0);if (r) return r(o, !0);var h = new Error("Cannot find module '" + o + "'");throw h.code = "MODULE_NOT_FOUND", h;
              }var u = a[o] = { exports: {} };e[o][0].call(u.exports, function (t) {
                var a = e[o][1][t];return n(a ? a : t);
              }, u, u.exports, t, e, a, i);
            }return a[o].exports;
          }for (var r = "function" == typeof require && require, o = 0; o < i.length; o++) {
            n(i[o]);
          }return n;
        }({ 1: [function (t, e, a) {
            function i(t) {
              return h === setTimeout ? setTimeout(t, 0) : h.call(null, t, 0);
            }function n(t) {
              u === clearTimeout ? clearTimeout(t) : u.call(null, t);
            }function r() {
              g && c && (g = !1, c.length ? p = c.concat(p) : f = -1, p.length && o());
            }function o() {
              if (!g) {
                var t = i(r);g = !0;for (var e = p.length; e;) {
                  for (c = p, p = []; ++f < e;) {
                    c && c[f].run();
                  }f = -1, e = p.length;
                }c = null, g = !1, n(t);
              }
            }function s(t, e) {
              this.fun = t, this.array = e;
            }function l() {}var h,
                u,
                d = e.exports = {};!function () {
              try {
                h = setTimeout;
              } catch (t) {
                h = function h() {
                  throw new Error("setTimeout is not defined");
                };
              }try {
                u = clearTimeout;
              } catch (t) {
                u = function u() {
                  throw new Error("clearTimeout is not defined");
                };
              }
            }();var c,
                p = [],
                g = !1,
                f = -1;d.nextTick = function (t) {
              var e = new Array(arguments.length - 1);if (arguments.length > 1) for (var a = 1; a < arguments.length; a++) {
                e[a - 1] = arguments[a];
              }p.push(new s(t, e)), 1 !== p.length || g || i(o);
            }, s.prototype.run = function () {
              this.fun.apply(null, this.array);
            }, d.title = "browser", d.browser = !0, d.env = {}, d.argv = [], d.version = "", d.versions = {}, d.on = l, d.addListener = l, d.once = l, d.off = l, d.removeListener = l, d.removeAllListeners = l, d.emit = l, d.binding = function (t) {
              throw new Error("process.binding is not supported");
            }, d.cwd = function () {
              return "/";
            }, d.chdir = function (t) {
              throw new Error("process.chdir is not supported");
            }, d.umask = function () {
              return 0;
            };
          }, {}], 2: [function (t, e, a) {
            "use strict";
            function i(t) {
              return t && t.__esModule ? t : { default: t };
            }Object.defineProperty(a, "__esModule", { value: !0 });var n = t("./bars"),
                r = i(n),
                o = function o() {};o.prototype = new r.default(), o.prototype.extractSeries = function (t, e, a) {
              for (var i, n, r, o = [], s = a.get("logscale"), l = 0; l < t.length; l++) {
                i = t[l][0], r = t[l][e], s && null !== r && (r[0] <= 0 || r[1] <= 0 || r[2] <= 0) && (r = null), null !== r ? (n = r[1], null === n || isNaN(n) ? o.push([i, n, [n, n]]) : o.push([i, n, [r[0], r[2]]])) : o.push([i, null, [null, null]]);
              }return o;
            }, o.prototype.rollingAverage = function (t, e, a) {
              e = Math.min(e, t.length);var i,
                  n,
                  r,
                  o,
                  s,
                  l,
                  h,
                  u = [];for (n = 0, o = 0, r = 0, s = 0, l = 0; l < t.length; l++) {
                if (i = t[l][1], h = t[l][2], u[l] = t[l], null === i || isNaN(i) || (n += h[0], o += i, r += h[1], s += 1), l - e >= 0) {
                  var d = t[l - e];null === d[1] || isNaN(d[1]) || (n -= d[2][0], o -= d[1], r -= d[2][1], s -= 1);
                }s ? u[l] = [t[l][0], 1 * o / s, [1 * n / s, 1 * r / s]] : u[l] = [t[l][0], null, [null, null]];
              }return u;
            }, a.default = o, e.exports = a.default;
          }, { "./bars": 5 }], 3: [function (t, e, a) {
            "use strict";
            function i(t) {
              return t && t.__esModule ? t : { default: t };
            }Object.defineProperty(a, "__esModule", { value: !0 });var n = t("./bars"),
                r = i(n),
                o = function o() {};o.prototype = new r.default(), o.prototype.extractSeries = function (t, e, a) {
              for (var i, n, r, o, s = [], l = a.get("sigma"), h = a.get("logscale"), u = 0; u < t.length; u++) {
                i = t[u][0], o = t[u][e], h && null !== o && (o[0] <= 0 || o[0] - l * o[1] <= 0) && (o = null), null !== o ? (n = o[0], null === n || isNaN(n) ? s.push([i, n, [n, n, n]]) : (r = l * o[1], s.push([i, n, [n - r, n + r, o[1]]]))) : s.push([i, null, [null, null, null]]);
              }return s;
            }, o.prototype.rollingAverage = function (t, e, a) {
              e = Math.min(e, t.length);var i,
                  n,
                  r,
                  o,
                  s,
                  l,
                  h,
                  u,
                  d,
                  c = [],
                  p = a.get("sigma");for (i = 0; i < t.length; i++) {
                for (s = 0, u = 0, l = 0, n = Math.max(0, i - e + 1); n < i + 1; n++) {
                  r = t[n][1], null === r || isNaN(r) || (l++, s += r, u += Math.pow(t[n][2][2], 2));
                }l ? (h = Math.sqrt(u) / l, d = s / l, c[i] = [t[i][0], d, [d - p * h, d + p * h]]) : (o = 1 == e ? t[i][1] : null, c[i] = [t[i][0], o, [o, o]]);
              }return c;
            }, a.default = o, e.exports = a.default;
          }, { "./bars": 5 }], 4: [function (t, e, a) {
            "use strict";
            function i(t) {
              return t && t.__esModule ? t : { default: t };
            }Object.defineProperty(a, "__esModule", { value: !0 });var n = t("./bars"),
                r = i(n),
                o = function o() {};o.prototype = new r.default(), o.prototype.extractSeries = function (t, e, a) {
              for (var i, n, r, o, s, l, h, u, d = [], c = 100, p = a.get("sigma"), g = a.get("logscale"), f = 0; f < t.length; f++) {
                i = t[f][0], r = t[f][e], g && null !== r && (r[0] <= 0 || r[1] <= 0) && (r = null), null !== r ? (o = r[0], s = r[1], null === o || isNaN(o) ? d.push([i, o, [o, o, o, s]]) : (l = s ? o / s : 0, h = s ? p * Math.sqrt(l * (1 - l) / s) : 1, u = c * h, n = c * l, d.push([i, n, [n - u, n + u, o, s]]))) : d.push([i, null, [null, null, null, null]]);
              }return d;
            }, o.prototype.rollingAverage = function (t, e, a) {
              e = Math.min(e, t.length);var i,
                  n,
                  r,
                  o,
                  s = [],
                  l = a.get("sigma"),
                  h = a.get("wilsonInterval"),
                  u = 0,
                  d = 0,
                  c = 100;for (r = 0; r < t.length; r++) {
                u += t[r][2][2], d += t[r][2][3], r - e >= 0 && (u -= t[r - e][2][2], d -= t[r - e][2][3]);var p = t[r][0],
                    g = d ? u / d : 0;if (h) {
                  if (d) {
                    var f = g < 0 ? 0 : g,
                        v = d,
                        _ = l * Math.sqrt(f * (1 - f) / v + l * l / (4 * v * v)),
                        y = 1 + l * l / d;i = (f + l * l / (2 * d) - _) / y, n = (f + l * l / (2 * d) + _) / y, s[r] = [p, f * c, [i * c, n * c]];
                  } else s[r] = [p, 0, [0, 0]];
                } else o = d ? l * Math.sqrt(g * (1 - g) / d) : 1, s[r] = [p, c * g, [c * (g - o), c * (g + o)]];
              }return s;
            }, a.default = o, e.exports = a.default;
          }, { "./bars": 5 }], 5: [function (t, e, a) {
            "use strict";
            function i(t) {
              return t && t.__esModule ? t : { default: t };
            }Object.defineProperty(a, "__esModule", { value: !0 });var n = t("./datahandler"),
                r = i(n),
                o = t("../dygraph-layout"),
                s = i(o),
                l = function l() {
              r.default.call(this);
            };l.prototype = new r.default(), l.prototype.extractSeries = function (t, e, a) {}, l.prototype.rollingAverage = function (t, e, a) {}, l.prototype.onPointsCreated_ = function (t, e) {
              for (var a = 0; a < t.length; ++a) {
                var i = t[a],
                    n = e[a];n.y_top = NaN, n.y_bottom = NaN, n.yval_minus = r.default.parseFloat(i[2][0]), n.yval_plus = r.default.parseFloat(i[2][1]);
              }
            }, l.prototype.getExtremeYValues = function (t, e, a) {
              for (var i, n = null, r = null, o = 0, s = t.length - 1, l = o; l <= s; l++) {
                if (i = t[l][1], null !== i && !isNaN(i)) {
                  var h = t[l][2][0],
                      u = t[l][2][1];h > i && (h = i), u < i && (u = i), (null === r || u > r) && (r = u), (null === n || h < n) && (n = h);
                }
              }return [n, r];
            }, l.prototype.onLineEvaluated = function (t, e, a) {
              for (var i, n = 0; n < t.length; n++) {
                i = t[n], i.y_top = s.default.calcYNormal_(e, i.yval_minus, a), i.y_bottom = s.default.calcYNormal_(e, i.yval_plus, a);
              }
            }, a.default = l, e.exports = a.default;
          }, { "../dygraph-layout": 13, "./datahandler": 6 }], 6: [function (t, e, a) {
            "use strict";
            Object.defineProperty(a, "__esModule", { value: !0 });var i = function i() {},
                n = i;n.X = 0, n.Y = 1, n.EXTRAS = 2, n.prototype.extractSeries = function (t, e, a) {}, n.prototype.seriesToPoints = function (t, e, a) {
              for (var i = [], r = 0; r < t.length; ++r) {
                var o = t[r],
                    s = o[1],
                    l = null === s ? null : n.parseFloat(s),
                    h = { x: NaN, y: NaN, xval: n.parseFloat(o[0]), yval: l, name: e, idx: r + a };i.push(h);
              }return this.onPointsCreated_(t, i), i;
            }, n.prototype.onPointsCreated_ = function (t, e) {}, n.prototype.rollingAverage = function (t, e, a) {}, n.prototype.getExtremeYValues = function (t, e, a) {}, n.prototype.onLineEvaluated = function (t, e, a) {}, n.parseFloat = function (t) {
              return null === t ? NaN : t;
            }, a.default = i, e.exports = a.default;
          }, {}], 7: [function (t, e, a) {
            "use strict";
            function i(t) {
              return t && t.__esModule ? t : { default: t };
            }Object.defineProperty(a, "__esModule", { value: !0 });var n = t("./datahandler"),
                r = (i(n), t("./default")),
                o = i(r),
                s = function s() {};s.prototype = new o.default(), s.prototype.extractSeries = function (t, e, a) {
              for (var i, n, r, o, s, l, h = [], u = 100, d = a.get("logscale"), c = 0; c < t.length; c++) {
                i = t[c][0], r = t[c][e], d && null !== r && (r[0] <= 0 || r[1] <= 0) && (r = null), null !== r ? (o = r[0], s = r[1], null === o || isNaN(o) ? h.push([i, o, [o, s]]) : (l = s ? o / s : 0, n = u * l, h.push([i, n, [o, s]]))) : h.push([i, null, [null, null]]);
              }return h;
            }, s.prototype.rollingAverage = function (t, e, a) {
              e = Math.min(e, t.length);var i,
                  n = [],
                  r = 0,
                  o = 0,
                  s = 100;for (i = 0; i < t.length; i++) {
                r += t[i][2][0], o += t[i][2][1], i - e >= 0 && (r -= t[i - e][2][0], o -= t[i - e][2][1]);var l = t[i][0],
                    h = o ? r / o : 0;n[i] = [l, s * h];
              }return n;
            }, a.default = s, e.exports = a.default;
          }, { "./datahandler": 6, "./default": 8 }], 8: [function (t, e, a) {
            "use strict";
            function i(t) {
              return t && t.__esModule ? t : { default: t };
            }Object.defineProperty(a, "__esModule", { value: !0 });var n = t("./datahandler"),
                r = i(n),
                o = function o() {};o.prototype = new r.default(), o.prototype.extractSeries = function (t, e, a) {
              for (var i = [], n = a.get("logscale"), r = 0; r < t.length; r++) {
                var o = t[r][0],
                    s = t[r][e];n && s <= 0 && (s = null), i.push([o, s]);
              }return i;
            }, o.prototype.rollingAverage = function (t, e, a) {
              e = Math.min(e, t.length);var i,
                  n,
                  r,
                  o,
                  s,
                  l = [];if (1 == e) return t;for (i = 0; i < t.length; i++) {
                for (o = 0, s = 0, n = Math.max(0, i - e + 1); n < i + 1; n++) {
                  r = t[n][1], null === r || isNaN(r) || (s++, o += t[n][1]);
                }s ? l[i] = [t[i][0], o / s] : l[i] = [t[i][0], null];
              }return l;
            }, o.prototype.getExtremeYValues = function (t, e, a) {
              for (var i, n = null, r = null, o = 0, s = t.length - 1, l = o; l <= s; l++) {
                i = t[l][1], null === i || isNaN(i) || ((null === r || i > r) && (r = i), (null === n || i < n) && (n = i));
              }return [n, r];
            }, a.default = o, e.exports = a.default;
          }, { "./datahandler": 6 }], 9: [function (t, e, a) {
            "use strict";
            function i(t) {
              return t && t.__esModule ? t : { default: t };
            }function n(t) {
              if (t && t.__esModule) return t;var e = {};if (null != t) for (var a in t) {
                Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
              }return e.default = t, e;
            }Object.defineProperty(a, "__esModule", { value: !0 });var r = t("./dygraph-utils"),
                o = n(r),
                s = t("./dygraph"),
                l = i(s),
                h = function h(t, e, a, i) {
              if (this.dygraph_ = t, this.layout = i, this.element = e, this.elementContext = a, this.height = t.height_, this.width = t.width_, !o.isCanvasSupported(this.element)) throw "Canvas is not supported.";this.area = i.getPlotArea();var n = this.dygraph_.canvas_ctx_;n.beginPath(), n.rect(this.area.x, this.area.y, this.area.w, this.area.h), n.clip(), n = this.dygraph_.hidden_ctx_, n.beginPath(), n.rect(this.area.x, this.area.y, this.area.w, this.area.h), n.clip();
            };h.prototype.clear = function () {
              this.elementContext.clearRect(0, 0, this.width, this.height);
            }, h.prototype.render = function () {
              this._updatePoints(), this._renderLineChart();
            }, h._getIteratorPredicate = function (t) {
              return t ? h._predicateThatSkipsEmptyPoints : null;
            }, h._predicateThatSkipsEmptyPoints = function (t, e) {
              return null !== t[e].yval;
            }, h._drawStyledLine = function (t, e, a, i, n, r, s) {
              var l = t.dygraph,
                  u = l.getBooleanOption("stepPlot", t.setName);o.isArrayLike(i) || (i = null);var d = l.getBooleanOption("drawGapEdgePoints", t.setName),
                  c = t.points,
                  p = t.setName,
                  g = o.createIterator(c, 0, c.length, h._getIteratorPredicate(l.getBooleanOption("connectSeparatedPoints", p))),
                  f = i && i.length >= 2,
                  v = t.drawingContext;v.save(), f && v.setLineDash && v.setLineDash(i);var _ = h._drawSeries(t, g, a, s, n, d, u, e);h._drawPointsOnLine(t, _, r, e, s), f && v.setLineDash && v.setLineDash([]), v.restore();
            }, h._drawSeries = function (t, e, a, i, n, r, o, s) {
              var l,
                  h,
                  u = null,
                  d = null,
                  c = null,
                  p = [],
                  g = !0,
                  f = t.drawingContext;f.beginPath(), f.strokeStyle = s, f.lineWidth = a;for (var v = e.array_, _ = e.end_, y = e.predicate_, x = e.start_; x < _; x++) {
                if (h = v[x], y) {
                  for (; x < _ && !y(v, x);) {
                    x++;
                  }if (x == _) break;h = v[x];
                }if (null === h.canvasy || h.canvasy != h.canvasy) o && null !== u && (f.moveTo(u, d), f.lineTo(h.canvasx, d)), u = d = null;else {
                  if (l = !1, r || null === u) {
                    e.nextIdx_ = x, e.next(), c = e.hasNext ? e.peek.canvasy : null;var m = null === c || c != c;l = null === u && m, r && (!g && null === u || e.hasNext && m) && (l = !0);
                  }null !== u ? a && (o && (f.moveTo(u, d), f.lineTo(h.canvasx, d)), f.lineTo(h.canvasx, h.canvasy)) : f.moveTo(h.canvasx, h.canvasy), (n || l) && p.push([h.canvasx, h.canvasy, h.idx]), u = h.canvasx, d = h.canvasy;
                }g = !1;
              }return f.stroke(), p;
            }, h._drawPointsOnLine = function (t, e, a, i, n) {
              for (var r = t.drawingContext, o = 0; o < e.length; o++) {
                var s = e[o];r.save(), a.call(t.dygraph, t.dygraph, t.setName, r, s[0], s[1], i, n, s[2]), r.restore();
              }
            }, h.prototype._updatePoints = function () {
              for (var t = this.layout.points, e = t.length; e--;) {
                for (var a = t[e], i = a.length; i--;) {
                  var n = a[i];n.canvasx = this.area.w * n.x + this.area.x, n.canvasy = this.area.h * n.y + this.area.y;
                }
              }
            }, h.prototype._renderLineChart = function (t, e) {
              var a,
                  i,
                  n = e || this.elementContext,
                  r = this.layout.points,
                  s = this.layout.setNames;this.colors = this.dygraph_.colorsMap_;var l = this.dygraph_.getOption("plotter"),
                  h = l;o.isArrayLike(h) || (h = [h]);var u = {};for (a = 0; a < s.length; a++) {
                i = s[a];var d = this.dygraph_.getOption("plotter", i);d != l && (u[i] = d);
              }for (a = 0; a < h.length; a++) {
                for (var c = h[a], p = a == h.length - 1, g = 0; g < r.length; g++) {
                  if (i = s[g], !t || i == t) {
                    var f = r[g],
                        v = c;if (i in u) {
                      if (!p) continue;v = u[i];
                    }var _ = this.colors[i],
                        y = this.dygraph_.getOption("strokeWidth", i);n.save(), n.strokeStyle = _, n.lineWidth = y, v({ points: f, setName: i, drawingContext: n, color: _, strokeWidth: y, dygraph: this.dygraph_, axis: this.dygraph_.axisPropertiesForSeries(i), plotArea: this.area, seriesIndex: g, seriesCount: r.length, singleSeriesName: t, allSeriesPoints: r }), n.restore();
                  }
                }
              }
            }, h._Plotters = { linePlotter: function linePlotter(t) {
                h._linePlotter(t);
              }, fillPlotter: function fillPlotter(t) {
                h._fillPlotter(t);
              }, errorPlotter: function errorPlotter(t) {
                h._errorPlotter(t);
              } }, h._linePlotter = function (t) {
              var e = t.dygraph,
                  a = t.setName,
                  i = t.strokeWidth,
                  n = e.getNumericOption("strokeBorderWidth", a),
                  r = e.getOption("drawPointCallback", a) || o.Circles.DEFAULT,
                  s = e.getOption("strokePattern", a),
                  l = e.getBooleanOption("drawPoints", a),
                  u = e.getNumericOption("pointSize", a);n && i && h._drawStyledLine(t, e.getOption("strokeBorderColor", a), i + 2 * n, s, l, r, u), h._drawStyledLine(t, t.color, i, s, l, r, u);
            }, h._errorPlotter = function (t) {
              var e = t.dygraph,
                  a = t.setName,
                  i = e.getBooleanOption("errorBars") || e.getBooleanOption("customBars");if (i) {
                var n = e.getBooleanOption("fillGraph", a);n && console.warn("Can't use fillGraph option with error bars");var r,
                    s = t.drawingContext,
                    l = t.color,
                    u = e.getNumericOption("fillAlpha", a),
                    d = e.getBooleanOption("stepPlot", a),
                    c = t.points,
                    p = o.createIterator(c, 0, c.length, h._getIteratorPredicate(e.getBooleanOption("connectSeparatedPoints", a))),
                    g = NaN,
                    f = NaN,
                    v = [-1, -1],
                    _ = o.toRGB_(l),
                    y = "rgba(" + _.r + "," + _.g + "," + _.b + "," + u + ")";s.fillStyle = y, s.beginPath();for (var x = function x(t) {
                  return null === t || void 0 === t || isNaN(t);
                }; p.hasNext;) {
                  var m = p.next();!d && x(m.y) || d && !isNaN(f) && x(f) ? g = NaN : (r = [m.y_bottom, m.y_top], d && (f = m.y), isNaN(r[0]) && (r[0] = m.y), isNaN(r[1]) && (r[1] = m.y), r[0] = t.plotArea.h * r[0] + t.plotArea.y, r[1] = t.plotArea.h * r[1] + t.plotArea.y, isNaN(g) || (d ? (s.moveTo(g, v[0]), s.lineTo(m.canvasx, v[0]), s.lineTo(m.canvasx, v[1])) : (s.moveTo(g, v[0]), s.lineTo(m.canvasx, r[0]), s.lineTo(m.canvasx, r[1])), s.lineTo(g, v[1]), s.closePath()), v = r, g = m.canvasx);
                }s.fill();
              }
            }, h._fastCanvasProxy = function (t) {
              var e = [],
                  a = null,
                  i = null,
                  n = 1,
                  r = 2,
                  o = 0,
                  s = function s(t) {
                if (!(e.length <= 1)) {
                  for (var a = e.length - 1; a > 0; a--) {
                    var i = e[a];if (i[0] == r) {
                      var o = e[a - 1];o[1] == i[1] && o[2] == i[2] && e.splice(a, 1);
                    }
                  }for (var a = 0; a < e.length - 1;) {
                    var i = e[a];i[0] == r && e[a + 1][0] == r ? e.splice(a, 1) : a++;
                  }if (e.length > 2 && !t) {
                    var s = 0;e[0][0] == r && s++;for (var l = null, h = null, a = s; a < e.length; a++) {
                      var i = e[a];if (i[0] == n) if (null === l && null === h) l = a, h = a;else {
                        var u = i[2];u < e[l][2] ? l = a : u > e[h][2] && (h = a);
                      }
                    }var d = e[l],
                        c = e[h];e.splice(s, e.length - s), l < h ? (e.push(d), e.push(c)) : l > h ? (e.push(c), e.push(d)) : e.push(d);
                  }
                }
              },
                  l = function l(a) {
                s(a);for (var l = 0, h = e.length; l < h; l++) {
                  var u = e[l];u[0] == n ? t.lineTo(u[1], u[2]) : u[0] == r && t.moveTo(u[1], u[2]);
                }e.length && (i = e[e.length - 1][1]), o += e.length, e = [];
              },
                  h = function h(t, n, r) {
                var o = Math.round(n);if (null === a || o != a) {
                  var s = a - i > 1,
                      h = o - a > 1,
                      u = s || h;l(u), a = o;
                }e.push([t, n, r]);
              };return { moveTo: function moveTo(t, e) {
                  h(r, t, e);
                }, lineTo: function lineTo(t, e) {
                  h(n, t, e);
                }, stroke: function stroke() {
                  l(!0), t.stroke();
                }, fill: function fill() {
                  l(!0), t.fill();
                }, beginPath: function beginPath() {
                  l(!0), t.beginPath();
                }, closePath: function closePath() {
                  l(!0), t.closePath();
                }, _count: function _count() {
                  return o;
                } };
            }, h._fillPlotter = function (t) {
              if (!t.singleSeriesName && 0 === t.seriesIndex) {
                for (var e = t.dygraph, a = e.getLabels().slice(1), i = a.length; i >= 0; i--) {
                  e.visibility()[i] || a.splice(i, 1);
                }var n = function () {
                  for (var t = 0; t < a.length; t++) {
                    if (e.getBooleanOption("fillGraph", a[t])) return !0;
                  }return !1;
                }();if (n) for (var r, s, u = t.plotArea, d = t.allSeriesPoints, c = d.length, p = e.getBooleanOption("stackedGraph"), g = e.getColors(), f = {}, v = function v(t, e, a, i) {
                  if (t.lineTo(e, a), p) for (var n = i.length - 1; n >= 0; n--) {
                    var r = i[n];t.lineTo(r[0], r[1]);
                  }
                }, _ = c - 1; _ >= 0; _--) {
                  var y = t.drawingContext,
                      x = a[_];if (e.getBooleanOption("fillGraph", x)) {
                    var m = e.getNumericOption("fillAlpha", x),
                        b = e.getBooleanOption("stepPlot", x),
                        w = g[_],
                        A = e.axisPropertiesForSeries(x),
                        O = 1 + A.minyval * A.yscale;O < 0 ? O = 0 : O > 1 && (O = 1), O = u.h * O + u.y;var T,
                        D = d[_],
                        E = o.createIterator(D, 0, D.length, h._getIteratorPredicate(e.getBooleanOption("connectSeparatedPoints", x))),
                        P = NaN,
                        S = [-1, -1],
                        L = o.toRGB_(w),
                        C = "rgba(" + L.r + "," + L.g + "," + L.b + "," + m + ")";y.fillStyle = C, y.beginPath();var M,
                        N = !0;(D.length > 2 * e.width_ || l.default.FORCE_FAST_PROXY) && (y = h._fastCanvasProxy(y));for (var k, F = []; E.hasNext;) {
                      if (k = E.next(), o.isOK(k.y) || b) {
                        if (p) {
                          if (!N && M == k.xval) continue;N = !1, M = k.xval, r = f[k.canvasx];var R;R = void 0 === r ? O : s ? r[0] : r, T = [k.canvasy, R], b ? S[0] === -1 ? f[k.canvasx] = [k.canvasy, O] : f[k.canvasx] = [k.canvasy, S[0]] : f[k.canvasx] = k.canvasy;
                        } else T = isNaN(k.canvasy) && b ? [u.y + u.h, O] : [k.canvasy, O];isNaN(P) ? (y.moveTo(k.canvasx, T[1]), y.lineTo(k.canvasx, T[0])) : (b ? (y.lineTo(k.canvasx, S[0]), y.lineTo(k.canvasx, T[0])) : y.lineTo(k.canvasx, T[0]), p && (F.push([P, S[1]]), s && r ? F.push([k.canvasx, r[1]]) : F.push([k.canvasx, T[1]]))), S = T, P = k.canvasx;
                      } else v(y, P, S[1], F), F = [], P = NaN, null === k.y_stacked || isNaN(k.y_stacked) || (f[k.canvasx] = u.h * k.y_stacked + u.y);
                    }s = b, T && k && (v(y, k.canvasx, T[1], F), F = []), y.fill();
                  }
                }
              }
            }, a.default = h, e.exports = a.default;
          }, { "./dygraph": 18, "./dygraph-utils": 17 }], 10: [function (t, e, a) {
            "use strict";
            function i(t) {
              return t && t.__esModule ? t : { default: t };
            }function n(t) {
              if (t && t.__esModule) return t;var e = {};if (null != t) for (var a in t) {
                Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
              }return e.default = t, e;
            }Object.defineProperty(a, "__esModule", { value: !0 });var r = t("./dygraph-tickers"),
                o = n(r),
                s = t("./dygraph-interaction-model"),
                l = i(s),
                h = t("./dygraph-canvas"),
                u = i(h),
                d = t("./dygraph-utils"),
                c = n(d),
                p = { highlightCircleSize: 3, highlightSeriesOpts: null, highlightSeriesBackgroundAlpha: .5, highlightSeriesBackgroundColor: "rgb(255, 255, 255)", labelsSeparateLines: !1, labelsShowZeroValues: !0, labelsKMB: !1, labelsKMG2: !1, showLabelsOnHighlight: !0, digitsAfterDecimal: 2, maxNumberWidth: 6, sigFigs: null, strokeWidth: 1, strokeBorderWidth: 0, strokeBorderColor: "white", axisTickSize: 3, axisLabelFontSize: 14, rightGap: 5, showRoller: !1, xValueParser: void 0, delimiter: ",", sigma: 2, errorBars: !1, fractions: !1, wilsonInterval: !0, customBars: !1, fillGraph: !1, fillAlpha: .15, connectSeparatedPoints: !1, stackedGraph: !1, stackedGraphNaNFill: "all", hideOverlayOnMouseOut: !0, legend: "onmouseover", stepPlot: !1, xRangePad: 0, yRangePad: null, drawAxesAtZero: !1, titleHeight: 28, xLabelHeight: 18, yLabelWidth: 18, axisLineColor: "black", axisLineWidth: .3, gridLineWidth: .3, axisLabelWidth: 50, gridLineColor: "rgb(128,128,128)", interactionModel: l.default.defaultModel, animatedZooms: !1, showRangeSelector: !1, rangeSelectorHeight: 40, rangeSelectorPlotStrokeColor: "#808FAB", rangeSelectorPlotFillGradientColor: "white", rangeSelectorPlotFillColor: "#A7B1C4", rangeSelectorBackgroundStrokeColor: "gray", rangeSelectorBackgroundLineWidth: 1, rangeSelectorPlotLineWidth: 1.5, rangeSelectorForegroundStrokeColor: "black", rangeSelectorForegroundLineWidth: 1, rangeSelectorAlpha: .6, showInRangeSelector: null, plotter: [u.default._fillPlotter, u.default._errorPlotter, u.default._linePlotter], plugins: [], axes: { x: { pixelsPerLabel: 70, axisLabelWidth: 60, axisLabelFormatter: c.dateAxisLabelFormatter, valueFormatter: c.dateValueFormatter, drawGrid: !0, drawAxis: !0, independentTicks: !0, ticker: o.dateTicker }, y: { axisLabelWidth: 50, pixelsPerLabel: 30, valueFormatter: c.numberValueFormatter, axisLabelFormatter: c.numberAxisLabelFormatter, drawGrid: !0, drawAxis: !0, independentTicks: !0, ticker: o.numericTicks }, y2: { axisLabelWidth: 50, pixelsPerLabel: 30, valueFormatter: c.numberValueFormatter, axisLabelFormatter: c.numberAxisLabelFormatter, drawAxis: !0, drawGrid: !1, independentTicks: !1, ticker: o.numericTicks } } };a.default = p, e.exports = a.default;
          }, { "./dygraph-canvas": 9, "./dygraph-interaction-model": 12, "./dygraph-tickers": 16, "./dygraph-utils": 17 }], 11: [function (t, e, a) {
            "use strict";
            function i(t) {
              return t && t.__esModule ? t : { default: t };
            }Object.defineProperty(a, "__esModule", { value: !0 });var n = t("./dygraph"),
                r = i(n),
                o = function o(t) {
              this.container = t;
            };o.prototype.draw = function (t, e) {
              this.container.innerHTML = "", "undefined" != typeof this.date_graph && this.date_graph.destroy(), this.date_graph = new r.default(this.container, t, e);
            }, o.prototype.setSelection = function (t) {
              var e = !1;t.length && (e = t[0].row), this.date_graph.setSelection(e);
            }, o.prototype.getSelection = function () {
              var t = [],
                  e = this.date_graph.getSelection();if (e < 0) return t;for (var a = this.date_graph.layout_.points, i = 0; i < a.length; ++i) {
                t.push({ row: e, column: i + 1 });
              }return t;
            }, a.default = o, e.exports = a.default;
          }, { "./dygraph": 18 }], 12: [function (t, e, a) {
            "use strict";
            function i(t) {
              if (t && t.__esModule) return t;var e = {};if (null != t) for (var a in t) {
                Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
              }return e.default = t, e;
            }Object.defineProperty(a, "__esModule", { value: !0 });var n = t("./dygraph-utils"),
                r = i(n),
                o = 100,
                s = {};s.maybeTreatMouseOpAsClick = function (t, e, a) {
              a.dragEndX = r.dragGetX_(t, a), a.dragEndY = r.dragGetY_(t, a);var i = Math.abs(a.dragEndX - a.dragStartX),
                  n = Math.abs(a.dragEndY - a.dragStartY);i < 2 && n < 2 && void 0 !== e.lastx_ && e.lastx_ != -1 && s.treatMouseOpAsClick(e, t, a), a.regionWidth = i, a.regionHeight = n;
            }, s.startPan = function (t, e, a) {
              var i, n;a.isPanning = !0;var o = e.xAxisRange();if (e.getOptionForAxis("logscale", "x") ? (a.initialLeftmostDate = r.log10(o[0]), a.dateRange = r.log10(o[1]) - r.log10(o[0])) : (a.initialLeftmostDate = o[0], a.dateRange = o[1] - o[0]), a.xUnitsPerPixel = a.dateRange / (e.plotter_.area.w - 1), e.getNumericOption("panEdgeFraction")) {
                var s = e.width_ * e.getNumericOption("panEdgeFraction"),
                    l = e.xAxisExtremes(),
                    h = e.toDomXCoord(l[0]) - s,
                    u = e.toDomXCoord(l[1]) + s,
                    d = e.toDataXCoord(h),
                    c = e.toDataXCoord(u);a.boundedDates = [d, c];var p = [],
                    g = e.height_ * e.getNumericOption("panEdgeFraction");for (i = 0; i < e.axes_.length; i++) {
                  n = e.axes_[i];var f = n.extremeRange,
                      v = e.toDomYCoord(f[0], i) + g,
                      _ = e.toDomYCoord(f[1], i) - g,
                      y = e.toDataYCoord(v, i),
                      x = e.toDataYCoord(_, i);p[i] = [y, x];
                }a.boundedValues = p;
              }for (a.is2DPan = !1, a.axes = [], i = 0; i < e.axes_.length; i++) {
                n = e.axes_[i];var m = {},
                    b = e.yAxisRange(i),
                    w = e.attributes_.getForAxis("logscale", i);w ? (m.initialTopValue = r.log10(b[1]), m.dragValueRange = r.log10(b[1]) - r.log10(b[0])) : (m.initialTopValue = b[1], m.dragValueRange = b[1] - b[0]), m.unitsPerPixel = m.dragValueRange / (e.plotter_.area.h - 1), a.axes.push(m), n.valueRange && (a.is2DPan = !0);
              }
            }, s.movePan = function (t, e, a) {
              a.dragEndX = r.dragGetX_(t, a), a.dragEndY = r.dragGetY_(t, a);var i = a.initialLeftmostDate - (a.dragEndX - a.dragStartX) * a.xUnitsPerPixel;a.boundedDates && (i = Math.max(i, a.boundedDates[0]));var n = i + a.dateRange;if (a.boundedDates && n > a.boundedDates[1] && (i -= n - a.boundedDates[1], n = i + a.dateRange), e.getOptionForAxis("logscale", "x") ? e.dateWindow_ = [Math.pow(r.LOG_SCALE, i), Math.pow(r.LOG_SCALE, n)] : e.dateWindow_ = [i, n], a.is2DPan) for (var o = a.dragEndY - a.dragStartY, s = 0; s < e.axes_.length; s++) {
                var l = e.axes_[s],
                    h = a.axes[s],
                    u = o * h.unitsPerPixel,
                    d = a.boundedValues ? a.boundedValues[s] : null,
                    c = h.initialTopValue + u;d && (c = Math.min(c, d[1]));var p = c - h.dragValueRange;d && p < d[0] && (c -= p - d[0], p = c - h.dragValueRange), e.attributes_.getForAxis("logscale", s) ? l.valueRange = [Math.pow(r.LOG_SCALE, p), Math.pow(r.LOG_SCALE, c)] : l.valueRange = [p, c];
              }e.drawGraph_(!1);
            }, s.endPan = s.maybeTreatMouseOpAsClick, s.startZoom = function (t, e, a) {
              a.isZooming = !0, a.zoomMoved = !1;
            }, s.moveZoom = function (t, e, a) {
              a.zoomMoved = !0, a.dragEndX = r.dragGetX_(t, a), a.dragEndY = r.dragGetY_(t, a);var i = Math.abs(a.dragStartX - a.dragEndX),
                  n = Math.abs(a.dragStartY - a.dragEndY);a.dragDirection = i < n / 2 ? r.VERTICAL : r.HORIZONTAL, e.drawZoomRect_(a.dragDirection, a.dragStartX, a.dragEndX, a.dragStartY, a.dragEndY, a.prevDragDirection, a.prevEndX, a.prevEndY), a.prevEndX = a.dragEndX, a.prevEndY = a.dragEndY, a.prevDragDirection = a.dragDirection;
            }, s.treatMouseOpAsClick = function (t, e, a) {
              for (var i = t.getFunctionOption("clickCallback"), n = t.getFunctionOption("pointClickCallback"), r = null, o = -1, s = Number.MAX_VALUE, l = 0; l < t.selPoints_.length; l++) {
                var h = t.selPoints_[l],
                    u = Math.pow(h.canvasx - a.dragEndX, 2) + Math.pow(h.canvasy - a.dragEndY, 2);!isNaN(u) && (o == -1 || u < s) && (s = u, o = l);
              }var d = t.getNumericOption("highlightCircleSize") + 2;if (s <= d * d && (r = t.selPoints_[o]), r) {
                var c = { cancelable: !0, point: r, canvasx: a.dragEndX, canvasy: a.dragEndY },
                    p = t.cascadeEvents_("pointClick", c);if (p) return;n && n.call(t, e, r);
              }var c = { cancelable: !0, xval: t.lastx_, pts: t.selPoints_, canvasx: a.dragEndX, canvasy: a.dragEndY };t.cascadeEvents_("click", c) || i && i.call(t, e, t.lastx_, t.selPoints_);
            }, s.endZoom = function (t, e, a) {
              e.clearZoomRect_(), a.isZooming = !1, s.maybeTreatMouseOpAsClick(t, e, a);var i = e.getArea();if (a.regionWidth >= 10 && a.dragDirection == r.HORIZONTAL) {
                var n = Math.min(a.dragStartX, a.dragEndX),
                    o = Math.max(a.dragStartX, a.dragEndX);n = Math.max(n, i.x), o = Math.min(o, i.x + i.w), n < o && e.doZoomX_(n, o), a.cancelNextDblclick = !0;
              } else if (a.regionHeight >= 10 && a.dragDirection == r.VERTICAL) {
                var l = Math.min(a.dragStartY, a.dragEndY),
                    h = Math.max(a.dragStartY, a.dragEndY);l = Math.max(l, i.y), h = Math.min(h, i.y + i.h), l < h && e.doZoomY_(l, h), a.cancelNextDblclick = !0;
              }a.dragStartX = null, a.dragStartY = null;
            }, s.startTouch = function (t, e, a) {
              t.preventDefault(), t.touches.length > 1 && (a.startTimeForDoubleTapMs = null);for (var i = [], n = 0; n < t.touches.length; n++) {
                var r = t.touches[n];i.push({ pageX: r.pageX, pageY: r.pageY, dataX: e.toDataXCoord(r.pageX), dataY: e.toDataYCoord(r.pageY) });
              }if (a.initialTouches = i, 1 == i.length) a.initialPinchCenter = i[0], a.touchDirections = { x: !0, y: !0 };else if (i.length >= 2) {
                a.initialPinchCenter = { pageX: .5 * (i[0].pageX + i[1].pageX), pageY: .5 * (i[0].pageY + i[1].pageY), dataX: .5 * (i[0].dataX + i[1].dataX), dataY: .5 * (i[0].dataY + i[1].dataY) };var o = 180 / Math.PI * Math.atan2(a.initialPinchCenter.pageY - i[0].pageY, i[0].pageX - a.initialPinchCenter.pageX);o = Math.abs(o), o > 90 && (o = 90 - o), a.touchDirections = { x: o < 67.5, y: o > 22.5 };
              }a.initialRange = { x: e.xAxisRange(), y: e.yAxisRange() };
            }, s.moveTouch = function (t, e, a) {
              a.startTimeForDoubleTapMs = null;var i,
                  n = [];for (i = 0; i < t.touches.length; i++) {
                var r = t.touches[i];n.push({ pageX: r.pageX, pageY: r.pageY });
              }var o,
                  s = a.initialTouches,
                  l = a.initialPinchCenter;o = 1 == n.length ? n[0] : { pageX: .5 * (n[0].pageX + n[1].pageX), pageY: .5 * (n[0].pageY + n[1].pageY) };var h = { pageX: o.pageX - l.pageX, pageY: o.pageY - l.pageY },
                  u = a.initialRange.x[1] - a.initialRange.x[0],
                  d = a.initialRange.y[0] - a.initialRange.y[1];h.dataX = h.pageX / e.plotter_.area.w * u, h.dataY = h.pageY / e.plotter_.area.h * d;var c, p;if (1 == n.length) c = 1, p = 1;else if (n.length >= 2) {
                var g = s[1].pageX - l.pageX;c = (n[1].pageX - o.pageX) / g;var f = s[1].pageY - l.pageY;p = (n[1].pageY - o.pageY) / f;
              }c = Math.min(8, Math.max(.125, c)), p = Math.min(8, Math.max(.125, p));var v = !1;if (a.touchDirections.x && (e.dateWindow_ = [l.dataX - h.dataX + (a.initialRange.x[0] - l.dataX) / c, l.dataX - h.dataX + (a.initialRange.x[1] - l.dataX) / c], v = !0), a.touchDirections.y) for (i = 0; i < 1; i++) {
                var _ = e.axes_[i],
                    y = e.attributes_.getForAxis("logscale", i);y || (_.valueRange = [l.dataY - h.dataY + (a.initialRange.y[0] - l.dataY) / p, l.dataY - h.dataY + (a.initialRange.y[1] - l.dataY) / p], v = !0);
              }if (e.drawGraph_(!1), v && n.length > 1 && e.getFunctionOption("zoomCallback")) {
                var x = e.xAxisRange();e.getFunctionOption("zoomCallback").call(e, x[0], x[1], e.yAxisRanges());
              }
            }, s.endTouch = function (t, e, a) {
              if (0 !== t.touches.length) s.startTouch(t, e, a);else if (1 == t.changedTouches.length) {
                var i = new Date().getTime(),
                    n = t.changedTouches[0];a.startTimeForDoubleTapMs && i - a.startTimeForDoubleTapMs < 500 && a.doubleTapX && Math.abs(a.doubleTapX - n.screenX) < 50 && a.doubleTapY && Math.abs(a.doubleTapY - n.screenY) < 50 ? e.resetZoom() : (a.startTimeForDoubleTapMs = i, a.doubleTapX = n.screenX, a.doubleTapY = n.screenY);
              }
            };var l = function l(t, e, a) {
              return t < e ? e - t : t > a ? t - a : 0;
            },
                h = function h(t, e) {
              var a = r.findPos(e.canvas_),
                  i = { left: a.x, right: a.x + e.canvas_.offsetWidth, top: a.y, bottom: a.y + e.canvas_.offsetHeight },
                  n = { x: r.pageX(t), y: r.pageY(t) },
                  o = l(n.x, i.left, i.right),
                  s = l(n.y, i.top, i.bottom);return Math.max(o, s);
            };s.defaultModel = { mousedown: function mousedown(t, e, a) {
                if (!t.button || 2 != t.button) {
                  a.initializeMouseDown(t, e, a), t.altKey || t.shiftKey ? s.startPan(t, e, a) : s.startZoom(t, e, a);var i = function i(t) {
                    if (a.isZooming) {
                      var i = h(t, e);i < o ? s.moveZoom(t, e, a) : null !== a.dragEndX && (a.dragEndX = null, a.dragEndY = null, e.clearZoomRect_());
                    } else a.isPanning && s.movePan(t, e, a);
                  },
                      n = function t(n) {
                    a.isZooming ? null !== a.dragEndX ? s.endZoom(n, e, a) : s.maybeTreatMouseOpAsClick(n, e, a) : a.isPanning && s.endPan(n, e, a), r.removeEvent(document, "mousemove", i), r.removeEvent(document, "mouseup", t), a.destroy();
                  };e.addAndTrackEvent(document, "mousemove", i), e.addAndTrackEvent(document, "mouseup", n);
                }
              }, willDestroyContextMyself: !0, touchstart: function touchstart(t, e, a) {
                s.startTouch(t, e, a);
              }, touchmove: function touchmove(t, e, a) {
                s.moveTouch(t, e, a);
              }, touchend: function touchend(t, e, a) {
                s.endTouch(t, e, a);
              }, dblclick: function dblclick(t, e, a) {
                if (a.cancelNextDblclick) return void (a.cancelNextDblclick = !1);var i = { canvasx: a.dragEndX, canvasy: a.dragEndY };e.cascadeEvents_("dblclick", i) || t.altKey || t.shiftKey || e.resetZoom();
              } }, s.nonInteractiveModel_ = { mousedown: function mousedown(t, e, a) {
                a.initializeMouseDown(t, e, a);
              }, mouseup: s.maybeTreatMouseOpAsClick }, s.dragIsPanInteractionModel = { mousedown: function mousedown(t, e, a) {
                a.initializeMouseDown(t, e, a), s.startPan(t, e, a);
              }, mousemove: function mousemove(t, e, a) {
                a.isPanning && s.movePan(t, e, a);
              }, mouseup: function mouseup(t, e, a) {
                a.isPanning && s.endPan(t, e, a);
              } }, a.default = s, e.exports = a.default;
          }, { "./dygraph-utils": 17 }], 13: [function (t, e, a) {
            "use strict";
            function i(t) {
              if (t && t.__esModule) return t;var e = {};if (null != t) for (var a in t) {
                Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
              }return e.default = t, e;
            }Object.defineProperty(a, "__esModule", { value: !0 });var n = t("./dygraph-utils"),
                r = i(n),
                o = function o(t) {
              this.dygraph_ = t, this.points = [], this.setNames = [], this.annotations = [], this.yAxes_ = null, this.xTicks_ = null, this.yTicks_ = null;
            };o.prototype.addDataset = function (t, e) {
              this.points.push(e), this.setNames.push(t);
            }, o.prototype.getPlotArea = function () {
              return this.area_;
            }, o.prototype.computePlotArea = function () {
              var t = { x: 0, y: 0 };t.w = this.dygraph_.width_ - t.x - this.dygraph_.getOption("rightGap"), t.h = this.dygraph_.height_;var e = { chart_div: this.dygraph_.graphDiv, reserveSpaceLeft: function reserveSpaceLeft(e) {
                  var a = { x: t.x, y: t.y, w: e, h: t.h };return t.x += e, t.w -= e, a;
                }, reserveSpaceRight: function reserveSpaceRight(e) {
                  var a = { x: t.x + t.w - e, y: t.y, w: e, h: t.h };return t.w -= e, a;
                }, reserveSpaceTop: function reserveSpaceTop(e) {
                  var a = { x: t.x, y: t.y, w: t.w, h: e };return t.y += e, t.h -= e, a;
                }, reserveSpaceBottom: function reserveSpaceBottom(e) {
                  var a = { x: t.x, y: t.y + t.h - e, w: t.w, h: e };return t.h -= e, a;
                }, chartRect: function chartRect() {
                  return { x: t.x, y: t.y, w: t.w, h: t.h };
                } };this.dygraph_.cascadeEvents_("layout", e), this.area_ = t;
            }, o.prototype.setAnnotations = function (t) {
              this.annotations = [];for (var e = this.dygraph_.getOption("xValueParser") || function (t) {
                return t;
              }, a = 0; a < t.length; a++) {
                var i = {};if (!t[a].xval && void 0 === t[a].x) return void console.error("Annotations must have an 'x' property");if (t[a].icon && (!t[a].hasOwnProperty("width") || !t[a].hasOwnProperty("height"))) return void console.error("Must set width and height when setting annotation.icon property");r.update(i, t[a]), i.xval || (i.xval = e(i.x)), this.annotations.push(i);
              }
            }, o.prototype.setXTicks = function (t) {
              this.xTicks_ = t;
            }, o.prototype.setYAxes = function (t) {
              this.yAxes_ = t;
            }, o.prototype.evaluate = function () {
              this._xAxis = {}, this._evaluateLimits(), this._evaluateLineCharts(), this._evaluateLineTicks(), this._evaluateAnnotations();
            }, o.prototype._evaluateLimits = function () {
              var t = this.dygraph_.xAxisRange();this._xAxis.minval = t[0], this._xAxis.maxval = t[1];var e = t[1] - t[0];this._xAxis.scale = 0 !== e ? 1 / e : 1, this.dygraph_.getOptionForAxis("logscale", "x") && (this._xAxis.xlogrange = r.log10(this._xAxis.maxval) - r.log10(this._xAxis.minval), this._xAxis.xlogscale = 0 !== this._xAxis.xlogrange ? 1 / this._xAxis.xlogrange : 1);for (var a = 0; a < this.yAxes_.length; a++) {
                var i = this.yAxes_[a];i.minyval = i.computedValueRange[0], i.maxyval = i.computedValueRange[1], i.yrange = i.maxyval - i.minyval, i.yscale = 0 !== i.yrange ? 1 / i.yrange : 1, this.dygraph_.getOption("logscale") && (i.ylogrange = r.log10(i.maxyval) - r.log10(i.minyval), i.ylogscale = 0 !== i.ylogrange ? 1 / i.ylogrange : 1, isFinite(i.ylogrange) && !isNaN(i.ylogrange) || console.error("axis " + a + " of graph at " + i.g + " can't be displayed in log scale for range [" + i.minyval + " - " + i.maxyval + "]"));
              }
            }, o.calcXNormal_ = function (t, e, a) {
              return a ? (r.log10(t) - r.log10(e.minval)) * e.xlogscale : (t - e.minval) * e.scale;
            }, o.calcYNormal_ = function (t, e, a) {
              if (a) {
                var i = 1 - (r.log10(e) - r.log10(t.minyval)) * t.ylogscale;return isFinite(i) ? i : NaN;
              }return 1 - (e - t.minyval) * t.yscale;
            }, o.prototype._evaluateLineCharts = function () {
              for (var t = this.dygraph_.getOption("stackedGraph"), e = this.dygraph_.getOptionForAxis("logscale", "x"), a = 0; a < this.points.length; a++) {
                for (var i = this.points[a], n = this.setNames[a], r = this.dygraph_.getOption("connectSeparatedPoints", n), s = this.dygraph_.axisPropertiesForSeries(n), l = this.dygraph_.attributes_.getForSeries("logscale", n), h = 0; h < i.length; h++) {
                  var u = i[h];u.x = o.calcXNormal_(u.xval, this._xAxis, e);var d = u.yval;t && (u.y_stacked = o.calcYNormal_(s, u.yval_stacked, l), null === d || isNaN(d) || (d = u.yval_stacked)), null === d && (d = NaN, r || (u.yval = NaN)), u.y = o.calcYNormal_(s, d, l);
                }this.dygraph_.dataHandler_.onLineEvaluated(i, s, l);
              }
            }, o.prototype._evaluateLineTicks = function () {
              var t, e, a, i, n, r;for (this.xticks = [], t = 0; t < this.xTicks_.length; t++) {
                e = this.xTicks_[t], a = e.label, r = !("label_v" in e), n = r ? e.v : e.label_v, i = this.dygraph_.toPercentXCoord(n), i >= 0 && i < 1 && this.xticks.push({
                  pos: i, label: a, has_tick: r });
              }for (this.yticks = [], t = 0; t < this.yAxes_.length; t++) {
                for (var o = this.yAxes_[t], s = 0; s < o.ticks.length; s++) {
                  e = o.ticks[s], a = e.label, r = !("label_v" in e), n = r ? e.v : e.label_v, i = this.dygraph_.toPercentYCoord(n, t), i > 0 && i <= 1 && this.yticks.push({ axis: t, pos: i, label: a, has_tick: r });
                }
              }
            }, o.prototype._evaluateAnnotations = function () {
              var t,
                  e = {};for (t = 0; t < this.annotations.length; t++) {
                var a = this.annotations[t];e[a.xval + "," + a.series] = a;
              }if (this.annotated_points = [], this.annotations && this.annotations.length) for (var i = 0; i < this.points.length; i++) {
                var n = this.points[i];for (t = 0; t < n.length; t++) {
                  var r = n[t],
                      o = r.xval + "," + r.name;o in e && (r.annotation = e[o], this.annotated_points.push(r));
                }
              }
            }, o.prototype.removeAllDatasets = function () {
              delete this.points, delete this.setNames, delete this.setPointsLengths, delete this.setPointsOffsets, this.points = [], this.setNames = [], this.setPointsLengths = [], this.setPointsOffsets = [];
            }, a.default = o, e.exports = a.default;
          }, { "./dygraph-utils": 17 }], 14: [function (t, e, a) {
            (function (t) {
              "use strict";
              Object.defineProperty(a, "__esModule", { value: !0 });var i = null;if ("undefined" != typeof t) ;a.default = i, e.exports = a.default;
            }).call(this, t("_process"));
          }, { _process: 1 }], 15: [function (t, e, a) {
            (function (i) {
              "use strict";
              function n(t) {
                return t && t.__esModule ? t : { default: t };
              }function r(t) {
                if (t && t.__esModule) return t;var e = {};if (null != t) for (var a in t) {
                  Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                }return e.default = t, e;
              }Object.defineProperty(a, "__esModule", { value: !0 });var o = t("./dygraph-utils"),
                  s = r(o),
                  l = t("./dygraph-default-attrs"),
                  h = n(l),
                  u = t("./dygraph-options-reference"),
                  d = (n(u), function (t) {
                this.dygraph_ = t, this.yAxes_ = [], this.xAxis_ = {}, this.series_ = {}, this.global_ = this.dygraph_.attrs_, this.user_ = this.dygraph_.user_attrs_ || {}, this.labels_ = [], this.highlightSeries_ = this.get("highlightSeriesOpts") || {}, this.reparseSeries();
              });if (d.AXIS_STRING_MAPPINGS_ = { y: 0, Y: 0, y1: 0, Y1: 0, y2: 1, Y2: 1 }, d.axisToIndex_ = function (t) {
                if ("string" == typeof t) {
                  if (d.AXIS_STRING_MAPPINGS_.hasOwnProperty(t)) return d.AXIS_STRING_MAPPINGS_[t];throw "Unknown axis : " + t;
                }if ("number" == typeof t) {
                  if (0 === t || 1 === t) return t;throw "Dygraphs only supports two y-axes, indexed from 0-1.";
                }if (t) throw "Unknown axis : " + t;return 0;
              }, d.prototype.reparseSeries = function () {
                var t = this.get("labels");if (t) {
                  this.labels_ = t.slice(1), this.yAxes_ = [{ series: [], options: {} }], this.xAxis_ = { options: {} }, this.series_ = {};for (var e = this.user_.series || {}, a = 0; a < this.labels_.length; a++) {
                    var i = this.labels_[a],
                        n = e[i] || {},
                        r = d.axisToIndex_(n.axis);this.series_[i] = { idx: a, yAxis: r, options: n }, this.yAxes_[r] ? this.yAxes_[r].series.push(i) : this.yAxes_[r] = { series: [i], options: {} };
                  }var o = this.user_.axes || {};s.update(this.yAxes_[0].options, o.y || {}), this.yAxes_.length > 1 && s.update(this.yAxes_[1].options, o.y2 || {}), s.update(this.xAxis_.options, o.x || {});
                }
              }, d.prototype.get = function (t) {
                var e = this.getGlobalUser_(t);return null !== e ? e : this.getGlobalDefault_(t);
              }, d.prototype.getGlobalUser_ = function (t) {
                return this.user_.hasOwnProperty(t) ? this.user_[t] : null;
              }, d.prototype.getGlobalDefault_ = function (t) {
                return this.global_.hasOwnProperty(t) ? this.global_[t] : h.default.hasOwnProperty(t) ? h.default[t] : null;
              }, d.prototype.getForAxis = function (t, e) {
                var a, i;if ("number" == typeof e) a = e, i = 0 === a ? "y" : "y2";else {
                  if ("y1" == e && (e = "y"), "y" == e) a = 0;else if ("y2" == e) a = 1;else {
                    if ("x" != e) throw "Unknown axis " + e;a = -1;
                  }i = e;
                }var n = a == -1 ? this.xAxis_ : this.yAxes_[a];if (n) {
                  var r = n.options;if (r.hasOwnProperty(t)) return r[t];
                }if ("x" !== e || "logscale" !== t) {
                  var o = this.getGlobalUser_(t);if (null !== o) return o;
                }var s = h.default.axes[i];return s.hasOwnProperty(t) ? s[t] : this.getGlobalDefault_(t);
              }, d.prototype.getForSeries = function (t, e) {
                if (e === this.dygraph_.getHighlightSeries() && this.highlightSeries_.hasOwnProperty(t)) return this.highlightSeries_[t];if (!this.series_.hasOwnProperty(e)) throw "Unknown series: " + e;var a = this.series_[e],
                    i = a.options;return i.hasOwnProperty(t) ? i[t] : this.getForAxis(t, a.yAxis);
              }, d.prototype.numAxes = function () {
                return this.yAxes_.length;
              }, d.prototype.axisForSeries = function (t) {
                return this.series_[t].yAxis;
              }, d.prototype.axisOptions = function (t) {
                return this.yAxes_[t].options;
              }, d.prototype.seriesForAxis = function (t) {
                return this.yAxes_[t].series;
              }, d.prototype.seriesNames = function () {
                return this.labels_;
              }, "undefined" != typeof i) ;a.default = d, e.exports = a.default;
            }).call(this, t("_process"));
          }, { "./dygraph-default-attrs": 10, "./dygraph-options-reference": 14, "./dygraph-utils": 17, _process: 1 }], 16: [function (t, e, a) {
            "use strict";
            function i(t) {
              if (t && t.__esModule) return t;var e = {};if (null != t) for (var a in t) {
                Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
              }return e.default = t, e;
            }Object.defineProperty(a, "__esModule", { value: !0 });var n = t("./dygraph-utils"),
                r = i(n),
                o = function o(t, e, a, i, n, r) {
              var o = function o(t) {
                return "logscale" !== t && i(t);
              };return s(t, e, a, o, n, r);
            };a.numericLinearTicks = o;var s = function s(t, e, a, i, n, o) {
              var s,
                  l,
                  h,
                  u,
                  d = i("pixelsPerLabel"),
                  p = [];if (o) for (s = 0; s < o.length; s++) {
                p.push({ v: o[s] });
              } else {
                if (i("logscale")) {
                  u = Math.floor(a / d);var g = r.binarySearch(t, c, 1),
                      f = r.binarySearch(e, c, -1);g == -1 && (g = 0), f == -1 && (f = c.length - 1);var v = null;if (f - g >= u / 4) {
                    for (var _ = f; _ >= g; _--) {
                      var y = c[_],
                          x = Math.log(y / t) / Math.log(e / t) * a,
                          m = { v: y };null === v ? v = { tickValue: y, pixel_coord: x } : Math.abs(x - v.pixel_coord) >= d ? v = { tickValue: y, pixel_coord: x } : m.label = "", p.push(m);
                    }p.reverse();
                  }
                }if (0 === p.length) {
                  var b,
                      w,
                      A = i("labelsKMG2");A ? (b = [1, 2, 4, 8, 16, 32, 64, 128, 256], w = 16) : (b = [1, 2, 5, 10, 20, 50, 100], w = 10);var O,
                      T,
                      D,
                      E,
                      P = Math.ceil(a / d),
                      S = Math.abs(e - t) / P,
                      L = Math.floor(Math.log(S) / Math.log(w)),
                      C = Math.pow(w, L);for (l = 0; l < b.length && (O = C * b[l], T = Math.floor(t / O) * O, D = Math.ceil(e / O) * O, u = Math.abs(D - T) / O, E = a / u, !(E > d)); l++) {}for (T > D && (O *= -1), s = 0; s <= u; s++) {
                    h = T + s * O, p.push({ v: h });
                  }
                }
              }var M = i("axisLabelFormatter");for (s = 0; s < p.length; s++) {
                void 0 === p[s].label && (p[s].label = M.call(n, p[s].v, 0, i, n));
              }return p;
            };a.numericTicks = s;var l = function l(t, e, a, i, n, r) {
              var o = p(t, e, a, i);return o >= 0 ? f(t, e, o, i, n) : [];
            };a.dateTicker = l;var h = { SECONDLY: 0, TWO_SECONDLY: 1, FIVE_SECONDLY: 2, TEN_SECONDLY: 3, THIRTY_SECONDLY: 4, MINUTELY: 5, TWO_MINUTELY: 6, FIVE_MINUTELY: 7, TEN_MINUTELY: 8, THIRTY_MINUTELY: 9, HOURLY: 10, TWO_HOURLY: 11, SIX_HOURLY: 12, DAILY: 13, TWO_DAILY: 14, WEEKLY: 15, MONTHLY: 16, QUARTERLY: 17, BIANNUAL: 18, ANNUAL: 19, DECADAL: 20, CENTENNIAL: 21, NUM_GRANULARITIES: 22 };a.Granularity = h;var u = { DATEFIELD_Y: 0, DATEFIELD_M: 1, DATEFIELD_D: 2, DATEFIELD_HH: 3, DATEFIELD_MM: 4, DATEFIELD_SS: 5, DATEFIELD_MS: 6, NUM_DATEFIELDS: 7 },
                d = [];d[h.SECONDLY] = { datefield: u.DATEFIELD_SS, step: 1, spacing: 1e3 }, d[h.TWO_SECONDLY] = { datefield: u.DATEFIELD_SS, step: 2, spacing: 2e3 }, d[h.FIVE_SECONDLY] = { datefield: u.DATEFIELD_SS, step: 5, spacing: 5e3 }, d[h.TEN_SECONDLY] = { datefield: u.DATEFIELD_SS, step: 10, spacing: 1e4 }, d[h.THIRTY_SECONDLY] = { datefield: u.DATEFIELD_SS, step: 30, spacing: 3e4 }, d[h.MINUTELY] = { datefield: u.DATEFIELD_MM, step: 1, spacing: 6e4 }, d[h.TWO_MINUTELY] = { datefield: u.DATEFIELD_MM, step: 2, spacing: 12e4 }, d[h.FIVE_MINUTELY] = { datefield: u.DATEFIELD_MM, step: 5, spacing: 3e5 }, d[h.TEN_MINUTELY] = { datefield: u.DATEFIELD_MM, step: 10, spacing: 6e5 }, d[h.THIRTY_MINUTELY] = { datefield: u.DATEFIELD_MM, step: 30, spacing: 18e5 }, d[h.HOURLY] = { datefield: u.DATEFIELD_HH, step: 1, spacing: 36e5 }, d[h.TWO_HOURLY] = { datefield: u.DATEFIELD_HH, step: 2, spacing: 72e5 }, d[h.SIX_HOURLY] = { datefield: u.DATEFIELD_HH, step: 6, spacing: 216e5 }, d[h.DAILY] = { datefield: u.DATEFIELD_D, step: 1, spacing: 864e5 }, d[h.TWO_DAILY] = { datefield: u.DATEFIELD_D, step: 2, spacing: 1728e5 }, d[h.WEEKLY] = { datefield: u.DATEFIELD_D, step: 7, spacing: 6048e5 }, d[h.MONTHLY] = { datefield: u.DATEFIELD_M, step: 1, spacing: 2629817280 }, d[h.QUARTERLY] = { datefield: u.DATEFIELD_M, step: 3, spacing: 216e5 * 365.2524 }, d[h.BIANNUAL] = { datefield: u.DATEFIELD_M, step: 6, spacing: 432e5 * 365.2524 }, d[h.ANNUAL] = { datefield: u.DATEFIELD_Y, step: 1, spacing: 864e5 * 365.2524 }, d[h.DECADAL] = { datefield: u.DATEFIELD_Y, step: 10, spacing: 315578073600 }, d[h.CENTENNIAL] = { datefield: u.DATEFIELD_Y, step: 100, spacing: 3155780736e3 };var c = function () {
              for (var t = [], e = -39; e <= 39; e++) {
                for (var a = Math.pow(10, e), i = 1; i <= 9; i++) {
                  var n = a * i;t.push(n);
                }
              }return t;
            }(),
                p = function p(t, e, a, i) {
              for (var n = i("pixelsPerLabel"), r = 0; r < h.NUM_GRANULARITIES; r++) {
                var o = g(t, e, r);if (a / o >= n) return r;
              }return -1;
            },
                g = function g(t, e, a) {
              var i = d[a].spacing;return Math.round(1 * (e - t) / i);
            },
                f = function f(t, e, a, i, n) {
              var o = i("axisLabelFormatter"),
                  s = i("labelsUTC"),
                  l = s ? r.DateAccessorsUTC : r.DateAccessorsLocal,
                  c = d[a].datefield,
                  p = d[a].step,
                  g = d[a].spacing,
                  f = new Date(t),
                  v = [];v[u.DATEFIELD_Y] = l.getFullYear(f), v[u.DATEFIELD_M] = l.getMonth(f), v[u.DATEFIELD_D] = l.getDate(f), v[u.DATEFIELD_HH] = l.getHours(f), v[u.DATEFIELD_MM] = l.getMinutes(f), v[u.DATEFIELD_SS] = l.getSeconds(f), v[u.DATEFIELD_MS] = l.getMilliseconds(f);var _ = v[c] % p;a == h.WEEKLY && (_ = l.getDay(f)), v[c] -= _;for (var y = c + 1; y < u.NUM_DATEFIELDS; y++) {
                v[y] = y === u.DATEFIELD_D ? 1 : 0;
              }var x = [],
                  m = l.makeDate.apply(null, v),
                  b = m.getTime();if (a <= h.HOURLY) for (b < t && (b += g, m = new Date(b)); b <= e;) {
                x.push({ v: b, label: o.call(n, m, a, i, n) }), b += g, m = new Date(b);
              } else for (b < t && (v[c] += p, m = l.makeDate.apply(null, v), b = m.getTime()); b <= e;) {
                (a >= h.DAILY || l.getHours(m) % p === 0) && x.push({ v: b, label: o.call(n, m, a, i, n) }), v[c] += p, m = l.makeDate.apply(null, v), b = m.getTime();
              }return x;
            };a.getDateAxis = f;
          }, { "./dygraph-utils": 17 }], 17: [function (t, e, a) {
            "use strict";
            function i(t) {
              if (t && t.__esModule) return t;var e = {};if (null != t) for (var a in t) {
                Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
              }return e.default = t, e;
            }function n(t, e, a) {
              t.removeEventListener(e, a, !1);
            }function r(t) {
              return t = t ? t : window.event, t.stopPropagation && t.stopPropagation(), t.preventDefault && t.preventDefault(), t.cancelBubble = !0, t.cancel = !0, t.returnValue = !1, !1;
            }function o(t, e, a) {
              var i, n, r;if (0 === e) i = a, n = a, r = a;else {
                var o = Math.floor(6 * t),
                    s = 6 * t - o,
                    l = a * (1 - e),
                    h = a * (1 - e * s),
                    u = a * (1 - e * (1 - s));switch (o) {case 1:
                    i = h, n = a, r = l;break;case 2:
                    i = l, n = a, r = u;break;case 3:
                    i = l, n = h, r = a;break;case 4:
                    i = u, n = l, r = a;break;case 5:
                    i = a, n = l, r = h;break;case 6:case 0:
                    i = a, n = u, r = l;}
              }return i = Math.floor(255 * i + .5), n = Math.floor(255 * n + .5), r = Math.floor(255 * r + .5), "rgb(" + i + "," + n + "," + r + ")";
            }function s(t) {
              var e = t.getBoundingClientRect(),
                  a = window,
                  i = document.documentElement;return { x: e.left + (a.pageXOffset || i.scrollLeft), y: e.top + (a.pageYOffset || i.scrollTop) };
            }function l(t) {
              return !t.pageX || t.pageX < 0 ? 0 : t.pageX;
            }function h(t) {
              return !t.pageY || t.pageY < 0 ? 0 : t.pageY;
            }function u(t, e) {
              return l(t) - e.px;
            }function d(t, e) {
              return h(t) - e.py;
            }function c(t) {
              return !!t && !isNaN(t);
            }function p(t, e) {
              return !!t && null !== t.yval && null !== t.x && void 0 !== t.x && null !== t.y && void 0 !== t.y && !(isNaN(t.x) || !e && isNaN(t.y));
            }function g(t, e) {
              var a = Math.min(Math.max(1, e || 2), 21);return Math.abs(t) < .001 && 0 !== t ? t.toExponential(a - 1) : t.toPrecision(a);
            }function f(t) {
              return t < 10 ? "0" + t : "" + t;
            }function v(t, e, a, i) {
              var n = f(t) + ":" + f(e);if (a && (n += ":" + f(a), i)) {
                var r = "" + i;n += "." + ("000" + r).substring(r.length);
              }return n;
            }function _(t, e) {
              var a = e ? nt : it,
                  i = new Date(t),
                  n = a.getFullYear(i),
                  r = a.getMonth(i),
                  o = a.getDate(i),
                  s = a.getHours(i),
                  l = a.getMinutes(i),
                  h = a.getSeconds(i),
                  u = a.getMilliseconds(i),
                  d = "" + n,
                  c = f(r + 1),
                  p = f(o),
                  g = 3600 * s + 60 * l + h + .001 * u,
                  _ = d + "/" + c + "/" + p;return g && (_ += " " + v(s, l, h, u)), _;
            }function y(t, e) {
              var a = Math.pow(10, e);return Math.round(t * a) / a;
            }function x(t, e, a, i, n) {
              for (var r = !0; r;) {
                var o = t,
                    s = e,
                    l = a,
                    h = i,
                    u = n;if (r = !1, null !== h && void 0 !== h && null !== u && void 0 !== u || (h = 0, u = s.length - 1), h > u) return -1;null !== l && void 0 !== l || (l = 0);var d,
                    c = function c(t) {
                  return t >= 0 && t < s.length;
                },
                    p = parseInt((h + u) / 2, 10),
                    g = s[p];if (g == o) return p;if (g > o) {
                  if (l > 0 && (d = p - 1, c(d) && s[d] < o)) return p;t = o, e = s, a = l, i = h, n = p - 1, r = !0, c = p = g = d = void 0;
                } else {
                  if (!(g < o)) return -1;if (l < 0 && (d = p + 1, c(d) && s[d] > o)) return p;t = o, e = s, a = l, i = p + 1, n = u, r = !0, c = p = g = d = void 0;
                }
              }
            }function m(t) {
              var e, a;if ((t.search("-") == -1 || t.search("T") != -1 || t.search("Z") != -1) && (a = b(t), a && !isNaN(a))) return a;if (t.search("-") != -1) {
                for (e = t.replace("-", "/", "g"); e.search("-") != -1;) {
                  e = e.replace("-", "/");
                }a = b(e);
              } else 8 == t.length ? (e = t.substr(0, 4) + "/" + t.substr(4, 2) + "/" + t.substr(6, 2), a = b(e)) : a = b(t);return a && !isNaN(a) || console.error("Couldn't parse " + t + " as a date"), a;
            }function b(t) {
              return new Date(t).getTime();
            }function w(t, e) {
              if ("undefined" != typeof e && null !== e) for (var a in e) {
                e.hasOwnProperty(a) && (t[a] = e[a]);
              }return t;
            }function A(t, e) {
              function a(t) {
                return "object" == (typeof Node === "undefined" ? "undefined" : _typeof(Node)) ? t instanceof Node : "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && "number" == typeof t.nodeType && "string" == typeof t.nodeName;
              }if ("undefined" != typeof e && null !== e) for (var i in e) {
                e.hasOwnProperty(i) && (null === e[i] ? t[i] = null : O(e[i]) ? t[i] = e[i].slice() : a(e[i]) ? t[i] = e[i] : "object" == _typeof(e[i]) ? ("object" == _typeof(t[i]) && null !== t[i] || (t[i] = {}), A(t[i], e[i])) : t[i] = e[i]);
              }return t;
            }function O(t) {
              var e = typeof t === "undefined" ? "undefined" : _typeof(t);return ("object" == e || "function" == e && "function" == typeof t.item) && null !== t && "number" == typeof t.length && 3 !== t.nodeType;
            }function T(t) {
              return "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && null !== t && "function" == typeof t.getTime;
            }function D(t) {
              for (var e = [], a = 0; a < t.length; a++) {
                O(t[a]) ? e.push(D(t[a])) : e.push(t[a]);
              }return e;
            }function E() {
              return document.createElement("canvas");
            }function P(t) {
              try {
                var e = window.devicePixelRatio,
                    a = t.webkitBackingStorePixelRatio || t.mozBackingStorePixelRatio || t.msBackingStorePixelRatio || t.oBackingStorePixelRatio || t.backingStorePixelRatio || 1;return void 0 !== e ? e / a : 1;
              } catch (t) {
                return 1;
              }
            }function S(t, e, a, i) {
              e = e || 0, a = a || t.length, this.hasNext = !0, this.peek = null, this.start_ = e, this.array_ = t, this.predicate_ = i, this.end_ = Math.min(t.length, e + a), this.nextIdx_ = e - 1, this.next();
            }function L(t, e, a, i) {
              return new S(t, e, a, i);
            }function C(t, e, a, i) {
              var n,
                  r = 0,
                  o = new Date().getTime();if (t(r), 1 == e) return void i();var s = e - 1;!function l() {
                r >= e || rt.call(window, function () {
                  var e = new Date().getTime(),
                      h = e - o;n = r, r = Math.floor(h / a);var u = r - n,
                      d = r + u > s;d || r >= s ? (t(s), i()) : (0 !== u && t(r), l());
                });
              }();
            }function M(t, e) {
              var a = {};if (t) for (var i = 1; i < t.length; i++) {
                a[t[i]] = !0;
              }var n = function n(t) {
                for (var e in t) {
                  if (t.hasOwnProperty(e) && !ot[e]) return !0;
                }return !1;
              };for (var r in e) {
                if (e.hasOwnProperty(r)) if ("highlightSeriesOpts" == r || a[r] && !e.series) {
                  if (n(e[r])) return !0;
                } else if ("series" == r || "axes" == r) {
                  var o = e[r];for (var s in o) {
                    if (o.hasOwnProperty(s) && n(o[s])) return !0;
                  }
                } else if (!ot[r]) return !0;
              }return !1;
            }function N(t) {
              for (var e = 0; e < t.length; e++) {
                var a = t.charAt(e);if ("\r" === a) return e + 1 < t.length && "\n" === t.charAt(e + 1) ? "\r\n" : a;if ("\n" === a) return e + 1 < t.length && "\r" === t.charAt(e + 1) ? "\n\r" : a;
              }return null;
            }function k(t, e) {
              if (null === e || null === t) return !1;for (var a = t; a && a !== e;) {
                a = a.parentNode;
              }return a === e;
            }function F(t, e) {
              return e < 0 ? 1 / Math.pow(t, -e) : Math.pow(t, e);
            }function R(t) {
              var e = lt.exec(t);if (!e) return null;var a = parseInt(e[1], 10),
                  i = parseInt(e[2], 10),
                  n = parseInt(e[3], 10);return e[4] ? { r: a, g: i, b: n, a: parseFloat(e[4]) } : { r: a, g: i, b: n };
            }function I(t) {
              var e = R(t);if (e) return e;var a = document.createElement("div");a.style.backgroundColor = t, a.style.visibility = "hidden", document.body.appendChild(a);var i = window.getComputedStyle(a, null).backgroundColor;return document.body.removeChild(a), R(i);
            }function H(t) {
              try {
                var e = t || document.createElement("canvas");e.getContext("2d");
              } catch (t) {
                return !1;
              }return !0;
            }function Y(t, e, a) {
              var i = parseFloat(t);if (!isNaN(i)) return i;if (/^ *$/.test(t)) return null;if (/^ *nan *$/i.test(t)) return NaN;var n = "Unable to parse '" + t + "' as a number";return void 0 !== a && void 0 !== e && (n += " on line " + (1 + (e || 0)) + " ('" + a + "') of CSV."), console.error(n), null;
            }function X(t, e) {
              var a = e("sigFigs");if (null !== a) return g(t, a);var i,
                  n = e("digitsAfterDecimal"),
                  r = e("maxNumberWidth"),
                  o = e("labelsKMB"),
                  s = e("labelsKMG2");if (i = 0 !== t && (Math.abs(t) >= Math.pow(10, r) || Math.abs(t) < Math.pow(10, -n)) ? t.toExponential(n) : "" + y(t, n), o || s) {
                var l,
                    h = [],
                    u = [];o && (l = 1e3, h = ht), s && (o && console.warn("Setting both labelsKMB and labelsKMG2. Pick one!"), l = 1024, h = ut, u = dt);for (var d = Math.abs(t), c = F(l, h.length), p = h.length - 1; p >= 0; p--, c /= l) {
                  if (d >= c) {
                    i = y(t / c, n) + h[p];break;
                  }
                }if (s) {
                  var f = String(t.toExponential()).split("e-");2 === f.length && f[1] >= 3 && f[1] <= 24 && (i = f[1] % 3 > 0 ? y(f[0] / F(10, f[1] % 3), n) : Number(f[0]).toFixed(2), i += u[Math.floor(f[1] / 3) - 1]);
                }
              }return i;
            }function V(t, e, a) {
              return X.call(this, t, a);
            }function Z(t, e, a) {
              var i = a("labelsUTC"),
                  n = i ? nt : it,
                  r = n.getFullYear(t),
                  o = n.getMonth(t),
                  s = n.getDate(t),
                  l = n.getHours(t),
                  h = n.getMinutes(t),
                  u = n.getSeconds(t),
                  d = n.getMilliseconds(t);if (e >= W.Granularity.DECADAL) return "" + r;if (e >= W.Granularity.MONTHLY) return ct[o] + "&#160;" + r;var c = 3600 * l + 60 * h + u + .001 * d;return 0 === c || e >= W.Granularity.DAILY ? f(s) + "&#160;" + ct[o] : v(l, h, u, d);
            }function B(t, e) {
              return _(t, e("labelsUTC"));
            }Object.defineProperty(a, "__esModule", { value: !0 }), a.removeEvent = n, a.cancelEvent = r, a.hsvToRGB = o, a.findPos = s, a.pageX = l, a.pageY = h, a.dragGetX_ = u, a.dragGetY_ = d, a.isOK = c, a.isValidPoint = p, a.floatFormat = g, a.zeropad = f, a.hmsString_ = v, a.dateString_ = _, a.round_ = y, a.binarySearch = x, a.dateParser = m, a.dateStrToMillis = b, a.update = w, a.updateDeep = A, a.isArrayLike = O, a.isDateLike = T, a.clone = D, a.createCanvas = E, a.getContextPixelRatio = P, a.Iterator = S, a.createIterator = L, a.repeatAndCleanup = C, a.isPixelChangingOptionList = M, a.detectLineDelimiter = N, a.isNodeContainedBy = k, a.pow = F, a.toRGB_ = I, a.isCanvasSupported = H, a.parseFloat_ = Y, a.numberValueFormatter = X, a.numberAxisLabelFormatter = V, a.dateAxisLabelFormatter = Z, a.dateValueFormatter = B;var G = t("./dygraph-tickers"),
                W = i(G),
                U = 10;a.LOG_SCALE = U;var z = Math.log(U);a.LN_TEN = z;var j = function j(t) {
              return Math.log(t) / z;
            };a.log10 = j;var K = function K(t, e, a) {
              var i = j(t),
                  n = j(e),
                  r = i + a * (n - i),
                  o = Math.pow(U, r);return o;
            };a.logRangeFraction = K;var q = [2, 2];a.DOTTED_LINE = q;var Q = [7, 3];a.DASHED_LINE = Q;var J = [7, 2, 2, 2];a.DOT_DASH_LINE = J;var $ = 1;a.HORIZONTAL = $;var tt = 2;a.VERTICAL = tt;var et = function et(t) {
              return t.getContext("2d");
            };a.getContext = et;var at = function at(t, e, a) {
              t.addEventListener(e, a, !1);
            };a.addEvent = at;var it = { getFullYear: function getFullYear(t) {
                return t.getFullYear();
              }, getMonth: function getMonth(t) {
                return t.getMonth();
              }, getDate: function getDate(t) {
                return t.getDate();
              }, getHours: function getHours(t) {
                return t.getHours();
              }, getMinutes: function getMinutes(t) {
                return t.getMinutes();
              }, getSeconds: function getSeconds(t) {
                return t.getSeconds();
              }, getMilliseconds: function getMilliseconds(t) {
                return t.getMilliseconds();
              }, getDay: function getDay(t) {
                return t.getDay();
              }, makeDate: function makeDate(t, e, a, i, n, r, o) {
                return new Date(t, e, a, i, n, r, o);
              } };a.DateAccessorsLocal = it;var nt = { getFullYear: function getFullYear(t) {
                return t.getUTCFullYear();
              }, getMonth: function getMonth(t) {
                return t.getUTCMonth();
              }, getDate: function getDate(t) {
                return t.getUTCDate();
              }, getHours: function getHours(t) {
                return t.getUTCHours();
              }, getMinutes: function getMinutes(t) {
                return t.getUTCMinutes();
              }, getSeconds: function getSeconds(t) {
                return t.getUTCSeconds();
              }, getMilliseconds: function getMilliseconds(t) {
                return t.getUTCMilliseconds();
              }, getDay: function getDay(t) {
                return t.getUTCDay();
              }, makeDate: function makeDate(t, e, a, i, n, r, o) {
                return new Date(Date.UTC(t, e, a, i, n, r, o));
              } };a.DateAccessorsUTC = nt, S.prototype.next = function () {
              if (!this.hasNext) return null;for (var t = this.peek, e = this.nextIdx_ + 1, a = !1; e < this.end_;) {
                if (!this.predicate_ || this.predicate_(this.array_, e)) {
                  this.peek = this.array_[e], a = !0;break;
                }e++;
              }return this.nextIdx_ = e, a || (this.hasNext = !1, this.peek = null), t;
            };var rt = function () {
              return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (t) {
                window.setTimeout(t, 1e3 / 60);
              };
            }();a.requestAnimFrame = rt;var ot = { annotationClickHandler: !0, annotationDblClickHandler: !0, annotationMouseOutHandler: !0, annotationMouseOverHandler: !0, axisLineColor: !0, axisLineWidth: !0, clickCallback: !0, drawCallback: !0, drawHighlightPointCallback: !0, drawPoints: !0, drawPointCallback: !0, drawGrid: !0, fillAlpha: !0, gridLineColor: !0, gridLineWidth: !0, hideOverlayOnMouseOut: !0, highlightCallback: !0, highlightCircleSize: !0, interactionModel: !0, labelsDiv: !0, labelsKMB: !0, labelsKMG2: !0, labelsSeparateLines: !0, labelsShowZeroValues: !0, legend: !0, panEdgeFraction: !0, pixelsPerYLabel: !0, pointClickCallback: !0, pointSize: !0, rangeSelectorPlotFillColor: !0, rangeSelectorPlotFillGradientColor: !0, rangeSelectorPlotStrokeColor: !0, rangeSelectorBackgroundStrokeColor: !0, rangeSelectorBackgroundLineWidth: !0, rangeSelectorPlotLineWidth: !0, rangeSelectorForegroundStrokeColor: !0, rangeSelectorForegroundLineWidth: !0, rangeSelectorAlpha: !0, showLabelsOnHighlight: !0, showRoller: !0, strokeWidth: !0, underlayCallback: !0, unhighlightCallback: !0, zoomCallback: !0 },
                st = { DEFAULT: function DEFAULT(t, e, a, i, n, r, o) {
                a.beginPath(), a.fillStyle = r, a.arc(i, n, o, 0, 2 * Math.PI, !1), a.fill();
              } };a.Circles = st;var lt = /^rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})(?:,\s*([01](?:\.\d+)?))?\)$/,
                ht = ["K", "M", "B", "T", "Q"],
                ut = ["k", "M", "G", "T", "P", "E", "Z", "Y"],
                dt = ["m", "u", "n", "p", "f", "a", "z", "y"],
                ct = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          }, { "./dygraph-tickers": 16 }], 18: [function (t, e, a) {
            (function (i) {
              "use strict";
              function n(t) {
                if (t && t.__esModule) return t;var e = {};if (null != t) for (var a in t) {
                  Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                }return e.default = t, e;
              }function r(t) {
                return t && t.__esModule ? t : { default: t };
              }function o(t) {
                var e = t[0],
                    a = e[0];if ("number" != typeof a && !x.isDateLike(a)) throw new Error("Expected number or date but got " + (typeof a === "undefined" ? "undefined" : _typeof(a)) + ": " + a + ".");for (var i = 1; i < e.length; i++) {
                  var n = e[i];if (null !== n && void 0 !== n && "number" != typeof n && !x.isArrayLike(n)) throw new Error("Expected number or array but got " + (typeof n === "undefined" ? "undefined" : _typeof(n)) + ": " + n + ".");
                }
              }Object.defineProperty(a, "__esModule", { value: !0 });var s = function () {
                function t(t, e) {
                  var a = [],
                      i = !0,
                      n = !1,
                      r = void 0;try {
                    for (var o, s = t[Symbol.iterator](); !(i = (o = s.next()).done) && (a.push(o.value), !e || a.length !== e); i = !0) {}
                  } catch (t) {
                    n = !0, r = t;
                  } finally {
                    try {
                      !i && s.return && s.return();
                    } finally {
                      if (n) throw r;
                    }
                  }return a;
                }return function (e, a) {
                  if (Array.isArray(e)) return e;if (Symbol.iterator in Object(e)) return t(e, a);throw new TypeError("Invalid attempt to destructure non-iterable instance");
                };
              }(),
                  l = t("./dygraph-layout"),
                  h = r(l),
                  u = t("./dygraph-canvas"),
                  d = r(u),
                  c = t("./dygraph-options"),
                  p = r(c),
                  g = t("./dygraph-interaction-model"),
                  f = r(g),
                  v = t("./dygraph-tickers"),
                  _ = n(v),
                  y = t("./dygraph-utils"),
                  x = n(y),
                  m = t("./dygraph-default-attrs"),
                  b = r(m),
                  w = t("./dygraph-options-reference"),
                  A = (r(w), t("./iframe-tarp")),
                  O = r(A),
                  T = t("./datahandler/default"),
                  D = r(T),
                  E = t("./datahandler/bars-error"),
                  P = r(E),
                  S = t("./datahandler/bars-custom"),
                  L = r(S),
                  C = t("./datahandler/default-fractions"),
                  M = r(C),
                  N = t("./datahandler/bars-fractions"),
                  k = r(N),
                  F = t("./datahandler/bars"),
                  R = r(F),
                  I = t("./plugins/annotations"),
                  H = r(I),
                  Y = t("./plugins/axes"),
                  X = r(Y),
                  V = t("./plugins/chart-labels"),
                  Z = r(V),
                  B = t("./plugins/grid"),
                  G = r(B),
                  W = t("./plugins/legend"),
                  U = r(W),
                  z = t("./plugins/range-selector"),
                  j = r(z),
                  K = t("./dygraph-gviz"),
                  q = r(K),
                  Q = function Q(t, e, a) {
                this.__init__(t, e, a);
              };Q.NAME = "Dygraph", Q.VERSION = "2.0.0", Q.DEFAULT_ROLL_PERIOD = 1, Q.DEFAULT_WIDTH = 480, Q.DEFAULT_HEIGHT = 320, Q.ANIMATION_STEPS = 12, Q.ANIMATION_DURATION = 200, Q.Plotters = d.default._Plotters, Q.addedAnnotationCSS = !1, Q.prototype.__init__ = function (t, e, a) {
                if (this.is_initial_draw_ = !0, this.readyFns_ = [], null !== a && void 0 !== a || (a = {}), a = Q.copyUserAttrs_(a), "string" == typeof t && (t = document.getElementById(t)), !t) throw new Error("Constructing dygraph with a non-existent div!");this.maindiv_ = t, this.file_ = e, this.rollPeriod_ = a.rollPeriod || Q.DEFAULT_ROLL_PERIOD, this.previousVerticalX_ = -1, this.fractions_ = a.fractions || !1, this.dateWindow_ = a.dateWindow || null, this.annotations_ = [], t.innerHTML = "", "" === t.style.width && a.width && (t.style.width = a.width + "px"), "" === t.style.height && a.height && (t.style.height = a.height + "px"), "" === t.style.height && 0 === t.clientHeight && (t.style.height = Q.DEFAULT_HEIGHT + "px", "" === t.style.width && (t.style.width = Q.DEFAULT_WIDTH + "px")), this.width_ = t.clientWidth || a.width || 0, this.height_ = t.clientHeight || a.height || 0, a.stackedGraph && (a.fillGraph = !0), this.user_attrs_ = {}, x.update(this.user_attrs_, a), this.attrs_ = {}, x.updateDeep(this.attrs_, b.default), this.boundaryIds_ = [], this.setIndexByName_ = {}, this.datasetIndex_ = [], this.registeredEvents_ = [], this.eventListeners_ = {}, this.attributes_ = new p.default(this), this.createInterface_(), this.plugins_ = [];for (var i = Q.PLUGINS.concat(this.getOption("plugins")), n = 0; n < i.length; n++) {
                  var r,
                      o = i[n];r = "undefined" != typeof o.activate ? o : new o();var s = { plugin: r, events: {}, options: {}, pluginOptions: {} },
                      l = r.activate(this);for (var h in l) {
                    l.hasOwnProperty(h) && (s.events[h] = l[h]);
                  }this.plugins_.push(s);
                }for (var n = 0; n < this.plugins_.length; n++) {
                  var u = this.plugins_[n];for (var h in u.events) {
                    if (u.events.hasOwnProperty(h)) {
                      var d = u.events[h],
                          c = [u.plugin, d];h in this.eventListeners_ ? this.eventListeners_[h].push(c) : this.eventListeners_[h] = [c];
                    }
                  }
                }this.createDragInterface_(), this.start_();
              }, Q.prototype.cascadeEvents_ = function (t, e) {
                if (!(t in this.eventListeners_)) return !1;var a = { dygraph: this, cancelable: !1, defaultPrevented: !1, preventDefault: function preventDefault() {
                    if (!a.cancelable) throw "Cannot call preventDefault on non-cancelable event.";a.defaultPrevented = !0;
                  }, propagationStopped: !1, stopPropagation: function stopPropagation() {
                    a.propagationStopped = !0;
                  } };x.update(a, e);var i = this.eventListeners_[t];if (i) for (var n = i.length - 1; n >= 0; n--) {
                  var r = i[n][0],
                      o = i[n][1];if (o.call(r, a), a.propagationStopped) break;
                }return a.defaultPrevented;
              }, Q.prototype.getPluginInstance_ = function (t) {
                for (var e = 0; e < this.plugins_.length; e++) {
                  var a = this.plugins_[e];if (a.plugin instanceof t) return a.plugin;
                }return null;
              }, Q.prototype.isZoomed = function (t) {
                var e = !!this.dateWindow_;if ("x" === t) return e;var a = this.axes_.map(function (t) {
                  return !!t.valueRange;
                }).indexOf(!0) >= 0;if (null === t || void 0 === t) return e || a;if ("y" === t) return a;throw new Error("axis parameter is [" + t + "] must be null, 'x' or 'y'.");
              }, Q.prototype.toString = function () {
                var t = this.maindiv_,
                    e = t && t.id ? t.id : t;return "[Dygraph " + e + "]";
              }, Q.prototype.attr_ = function (t, e) {
                return e ? this.attributes_.getForSeries(t, e) : this.attributes_.get(t);
              }, Q.prototype.getOption = function (t, e) {
                return this.attr_(t, e);
              }, Q.prototype.getNumericOption = function (t, e) {
                return this.getOption(t, e);
              }, Q.prototype.getStringOption = function (t, e) {
                return this.getOption(t, e);
              }, Q.prototype.getBooleanOption = function (t, e) {
                return this.getOption(t, e);
              }, Q.prototype.getFunctionOption = function (t, e) {
                return this.getOption(t, e);
              }, Q.prototype.getOptionForAxis = function (t, e) {
                return this.attributes_.getForAxis(t, e);
              }, Q.prototype.optionsViewForAxis_ = function (t) {
                var e = this;return function (a) {
                  var i = e.user_attrs_.axes;return i && i[t] && i[t].hasOwnProperty(a) ? i[t][a] : ("x" !== t || "logscale" !== a) && ("undefined" != typeof e.user_attrs_[a] ? e.user_attrs_[a] : (i = e.attrs_.axes, i && i[t] && i[t].hasOwnProperty(a) ? i[t][a] : "y" == t && e.axes_[0].hasOwnProperty(a) ? e.axes_[0][a] : "y2" == t && e.axes_[1].hasOwnProperty(a) ? e.axes_[1][a] : e.attr_(a)));
                };
              }, Q.prototype.rollPeriod = function () {
                return this.rollPeriod_;
              }, Q.prototype.xAxisRange = function () {
                return this.dateWindow_ ? this.dateWindow_ : this.xAxisExtremes();
              }, Q.prototype.xAxisExtremes = function () {
                var t = this.getNumericOption("xRangePad") / this.plotter_.area.w;if (0 === this.numRows()) return [0 - t, 1 + t];var e = this.rawData_[0][0],
                    a = this.rawData_[this.rawData_.length - 1][0];if (t) {
                  var i = a - e;e -= i * t, a += i * t;
                }return [e, a];
              }, Q.prototype.yAxisExtremes = function () {
                var t = this.gatherDatasets_(this.rolledSeries_, null),
                    e = t.extremes,
                    a = this.axes_;this.computeYAxisRanges_(e);var i = this.axes_;return this.axes_ = a, i.map(function (t) {
                  return t.extremeRange;
                });
              }, Q.prototype.yAxisRange = function (t) {
                if ("undefined" == typeof t && (t = 0), t < 0 || t >= this.axes_.length) return null;var e = this.axes_[t];return [e.computedValueRange[0], e.computedValueRange[1]];
              }, Q.prototype.yAxisRanges = function () {
                for (var t = [], e = 0; e < this.axes_.length; e++) {
                  t.push(this.yAxisRange(e));
                }return t;
              }, Q.prototype.toDomCoords = function (t, e, a) {
                return [this.toDomXCoord(t), this.toDomYCoord(e, a)];
              }, Q.prototype.toDomXCoord = function (t) {
                if (null === t) return null;var e = this.plotter_.area,
                    a = this.xAxisRange();return e.x + (t - a[0]) / (a[1] - a[0]) * e.w;
              }, Q.prototype.toDomYCoord = function (t, e) {
                var a = this.toPercentYCoord(t, e);if (null === a) return null;var i = this.plotter_.area;return i.y + a * i.h;
              }, Q.prototype.toDataCoords = function (t, e, a) {
                return [this.toDataXCoord(t), this.toDataYCoord(e, a)];
              }, Q.prototype.toDataXCoord = function (t) {
                if (null === t) return null;var e = this.plotter_.area,
                    a = this.xAxisRange();if (this.attributes_.getForAxis("logscale", "x")) {
                  var i = (t - e.x) / e.w;return x.logRangeFraction(a[0], a[1], i);
                }return a[0] + (t - e.x) / e.w * (a[1] - a[0]);
              }, Q.prototype.toDataYCoord = function (t, e) {
                if (null === t) return null;var a = this.plotter_.area,
                    i = this.yAxisRange(e);if ("undefined" == typeof e && (e = 0), this.attributes_.getForAxis("logscale", e)) {
                  var n = (t - a.y) / a.h;return x.logRangeFraction(i[1], i[0], n);
                }return i[0] + (a.y + a.h - t) / a.h * (i[1] - i[0]);
              }, Q.prototype.toPercentYCoord = function (t, e) {
                if (null === t) return null;"undefined" == typeof e && (e = 0);var a,
                    i = this.yAxisRange(e),
                    n = this.attributes_.getForAxis("logscale", e);if (n) {
                  var r = x.log10(i[0]),
                      o = x.log10(i[1]);a = (o - x.log10(t)) / (o - r);
                } else a = (i[1] - t) / (i[1] - i[0]);return a;
              }, Q.prototype.toPercentXCoord = function (t) {
                if (null === t) return null;var e,
                    a = this.xAxisRange(),
                    i = this.attributes_.getForAxis("logscale", "x");if (i === !0) {
                  var n = x.log10(a[0]),
                      r = x.log10(a[1]);e = (x.log10(t) - n) / (r - n);
                } else e = (t - a[0]) / (a[1] - a[0]);return e;
              }, Q.prototype.numColumns = function () {
                return this.rawData_ ? this.rawData_[0] ? this.rawData_[0].length : this.attr_("labels").length : 0;
              }, Q.prototype.numRows = function () {
                return this.rawData_ ? this.rawData_.length : 0;
              }, Q.prototype.getValue = function (t, e) {
                return t < 0 || t > this.rawData_.length ? null : e < 0 || e > this.rawData_[t].length ? null : this.rawData_[t][e];
              }, Q.prototype.createInterface_ = function () {
                var t = this.maindiv_;this.graphDiv = document.createElement("div"), this.graphDiv.style.textAlign = "left", this.graphDiv.style.position = "relative", t.appendChild(this.graphDiv), this.canvas_ = x.createCanvas(), this.canvas_.style.position = "absolute", this.hidden_ = this.createPlotKitCanvas_(this.canvas_), this.canvas_ctx_ = x.getContext(this.canvas_), this.hidden_ctx_ = x.getContext(this.hidden_), this.resizeElements_(), this.graphDiv.appendChild(this.hidden_), this.graphDiv.appendChild(this.canvas_), this.mouseEventElement_ = this.createMouseEventElement_(), this.layout_ = new h.default(this);var e = this;this.mouseMoveHandler_ = function (t) {
                  e.mouseMove_(t);
                }, this.mouseOutHandler_ = function (t) {
                  var a = t.target || t.fromElement,
                      i = t.relatedTarget || t.toElement;x.isNodeContainedBy(a, e.graphDiv) && !x.isNodeContainedBy(i, e.graphDiv) && e.mouseOut_(t);
                }, this.addAndTrackEvent(window, "mouseout", this.mouseOutHandler_), this.addAndTrackEvent(this.mouseEventElement_, "mousemove", this.mouseMoveHandler_), this.resizeHandler_ || (this.resizeHandler_ = function (t) {
                  e.resize();
                }, this.addAndTrackEvent(window, "resize", this.resizeHandler_));
              }, Q.prototype.resizeElements_ = function () {
                this.graphDiv.style.width = this.width_ + "px", this.graphDiv.style.height = this.height_ + "px";var t = x.getContextPixelRatio(this.canvas_ctx_);this.canvas_.width = this.width_ * t, this.canvas_.height = this.height_ * t, this.canvas_.style.width = this.width_ + "px", this.canvas_.style.height = this.height_ + "px", 1 !== t && this.canvas_ctx_.scale(t, t);var e = x.getContextPixelRatio(this.hidden_ctx_);this.hidden_.width = this.width_ * e, this.hidden_.height = this.height_ * e, this.hidden_.style.width = this.width_ + "px", this.hidden_.style.height = this.height_ + "px", 1 !== e && this.hidden_ctx_.scale(e, e);
              }, Q.prototype.destroy = function () {
                this.canvas_ctx_.restore(), this.hidden_ctx_.restore();for (var t = this.plugins_.length - 1; t >= 0; t--) {
                  var e = this.plugins_.pop();e.plugin.destroy && e.plugin.destroy();
                }var a = function t(e) {
                  for (; e.hasChildNodes();) {
                    t(e.firstChild), e.removeChild(e.firstChild);
                  }
                };this.removeTrackedEvents_(), x.removeEvent(window, "mouseout", this.mouseOutHandler_), x.removeEvent(this.mouseEventElement_, "mousemove", this.mouseMoveHandler_), x.removeEvent(window, "resize", this.resizeHandler_), this.resizeHandler_ = null, a(this.maindiv_);var i = function i(t) {
                  for (var e in t) {
                    "object" == _typeof(t[e]) && (t[e] = null);
                  }
                };i(this.layout_), i(this.plotter_), i(this);
              }, Q.prototype.createPlotKitCanvas_ = function (t) {
                var e = x.createCanvas();return e.style.position = "absolute", e.style.top = t.style.top, e.style.left = t.style.left, e.width = this.width_, e.height = this.height_, e.style.width = this.width_ + "px", e.style.height = this.height_ + "px", e;
              }, Q.prototype.createMouseEventElement_ = function () {
                return this.canvas_;
              }, Q.prototype.setColors_ = function () {
                var t = this.getLabels(),
                    e = t.length - 1;this.colors_ = [], this.colorsMap_ = {};for (var a = this.getNumericOption("colorSaturation") || 1, i = this.getNumericOption("colorValue") || .5, n = Math.ceil(e / 2), r = this.getOption("colors"), o = this.visibility(), s = 0; s < e; s++) {
                  if (o[s]) {
                    var l = t[s + 1],
                        h = this.attributes_.getForSeries("color", l);if (!h) if (r) h = r[s % r.length];else {
                      var u = s % 2 ? n + (s + 1) / 2 : Math.ceil((s + 1) / 2),
                          d = 1 * u / (1 + e);h = x.hsvToRGB(d, a, i);
                    }this.colors_.push(h), this.colorsMap_[l] = h;
                  }
                }
              }, Q.prototype.getColors = function () {
                return this.colors_;
              }, Q.prototype.getPropertiesForSeries = function (t) {
                for (var e = -1, a = this.getLabels(), i = 1; i < a.length; i++) {
                  if (a[i] == t) {
                    e = i;break;
                  }
                }return e == -1 ? null : { name: t, column: e, visible: this.visibility()[e - 1], color: this.colorsMap_[t], axis: 1 + this.attributes_.axisForSeries(t) };
              }, Q.prototype.createRollInterface_ = function () {
                var t = this,
                    e = this.roller_;e || (this.roller_ = e = document.createElement("input"), e.type = "text", e.style.display = "none", e.className = "dygraph-roller", this.graphDiv.appendChild(e));var a = this.getBooleanOption("showRoller") ? "block" : "none",
                    i = this.getArea(),
                    n = { top: i.y + i.h - 25 + "px", left: i.x + 1 + "px", display: a };e.size = "2", e.value = this.rollPeriod_, x.update(e.style, n), e.onchange = function () {
                  return t.adjustRoll(e.value);
                };
              }, Q.prototype.createDragInterface_ = function () {
                var t = { isZooming: !1, isPanning: !1, is2DPan: !1, dragStartX: null, dragStartY: null, dragEndX: null, dragEndY: null, dragDirection: null, prevEndX: null, prevEndY: null, prevDragDirection: null, cancelNextDblclick: !1, initialLeftmostDate: null, xUnitsPerPixel: null, dateRange: null, px: 0, py: 0, boundedDates: null, boundedValues: null, tarp: new O.default(), initializeMouseDown: function initializeMouseDown(t, e, a) {
                    t.preventDefault ? t.preventDefault() : (t.returnValue = !1, t.cancelBubble = !0);var i = x.findPos(e.canvas_);a.px = i.x, a.py = i.y, a.dragStartX = x.dragGetX_(t, a), a.dragStartY = x.dragGetY_(t, a), a.cancelNextDblclick = !1, a.tarp.cover();
                  }, destroy: function destroy() {
                    var t = this;if ((t.isZooming || t.isPanning) && (t.isZooming = !1, t.dragStartX = null, t.dragStartY = null), t.isPanning) {
                      t.isPanning = !1, t.draggingDate = null, t.dateRange = null;for (var e = 0; e < a.axes_.length; e++) {
                        delete a.axes_[e].draggingValue, delete a.axes_[e].dragValueRange;
                      }
                    }t.tarp.uncover();
                  } },
                    e = this.getOption("interactionModel"),
                    a = this,
                    i = function i(e) {
                  return function (i) {
                    e(i, a, t);
                  };
                };for (var n in e) {
                  e.hasOwnProperty(n) && this.addAndTrackEvent(this.mouseEventElement_, n, i(e[n]));
                }if (!e.willDestroyContextMyself) {
                  var r = function r(e) {
                    t.destroy();
                  };this.addAndTrackEvent(document, "mouseup", r);
                }
              }, Q.prototype.drawZoomRect_ = function (t, e, a, i, n, r, o, s) {
                var l = this.canvas_ctx_;r == x.HORIZONTAL ? l.clearRect(Math.min(e, o), this.layout_.getPlotArea().y, Math.abs(e - o), this.layout_.getPlotArea().h) : r == x.VERTICAL && l.clearRect(this.layout_.getPlotArea().x, Math.min(i, s), this.layout_.getPlotArea().w, Math.abs(i - s)), t == x.HORIZONTAL ? a && e && (l.fillStyle = "rgba(128,128,128,0.33)", l.fillRect(Math.min(e, a), this.layout_.getPlotArea().y, Math.abs(a - e), this.layout_.getPlotArea().h)) : t == x.VERTICAL && n && i && (l.fillStyle = "rgba(128,128,128,0.33)", l.fillRect(this.layout_.getPlotArea().x, Math.min(i, n), this.layout_.getPlotArea().w, Math.abs(n - i)));
              }, Q.prototype.clearZoomRect_ = function () {
                this.currentZoomRectArgs_ = null, this.canvas_ctx_.clearRect(0, 0, this.width_, this.height_);
              }, Q.prototype.doZoomX_ = function (t, e) {
                this.currentZoomRectArgs_ = null;var a = this.toDataXCoord(t),
                    i = this.toDataXCoord(e);this.doZoomXDates_(a, i);
              }, Q.prototype.doZoomXDates_ = function (t, e) {
                var a = this,
                    i = this.xAxisRange(),
                    n = [t, e],
                    r = this.getFunctionOption("zoomCallback");this.doAnimatedZoom(i, n, null, null, function () {
                  r && r.call(a, t, e, a.yAxisRanges());
                });
              }, Q.prototype.doZoomY_ = function (t, e) {
                var a = this;this.currentZoomRectArgs_ = null;for (var i = this.yAxisRanges(), n = [], r = 0; r < this.axes_.length; r++) {
                  var o = this.toDataYCoord(t, r),
                      l = this.toDataYCoord(e, r);n.push([l, o]);
                }var h = this.getFunctionOption("zoomCallback");this.doAnimatedZoom(null, null, i, n, function () {
                  if (h) {
                    var t = a.xAxisRange(),
                        e = s(t, 2),
                        i = e[0],
                        n = e[1];h.call(a, i, n, a.yAxisRanges());
                  }
                });
              }, Q.zoomAnimationFunction = function (t, e) {
                var a = 1.5;return (1 - Math.pow(a, -t)) / (1 - Math.pow(a, -e));
              }, Q.prototype.resetZoom = function () {
                var t = this,
                    e = this.isZoomed("x"),
                    a = this.isZoomed("y"),
                    i = e || a;if (this.clearSelection(), i) {
                  var n = this.xAxisExtremes(),
                      r = s(n, 2),
                      o = r[0],
                      l = r[1],
                      h = this.getBooleanOption("animatedZooms"),
                      u = this.getFunctionOption("zoomCallback");if (!h) return this.dateWindow_ = null, this.axes_.forEach(function (t) {
                    t.valueRange && delete t.valueRange;
                  }), this.drawGraph_(), void (u && u.call(this, o, l, this.yAxisRanges()));var d = null,
                      c = null,
                      p = null,
                      g = null;e && (d = this.xAxisRange(), c = [o, l]), a && (p = this.yAxisRanges(), g = this.yAxisExtremes()), this.doAnimatedZoom(d, c, p, g, function () {
                    t.dateWindow_ = null, t.axes_.forEach(function (t) {
                      t.valueRange && delete t.valueRange;
                    }), u && u.call(t, o, l, t.yAxisRanges());
                  });
                }
              }, Q.prototype.doAnimatedZoom = function (t, e, a, i, n) {
                var r,
                    o,
                    s = this,
                    l = this.getBooleanOption("animatedZooms") ? Q.ANIMATION_STEPS : 1,
                    h = [],
                    u = [];if (null !== t && null !== e) for (r = 1; r <= l; r++) {
                  o = Q.zoomAnimationFunction(r, l), h[r - 1] = [t[0] * (1 - o) + o * e[0], t[1] * (1 - o) + o * e[1]];
                }if (null !== a && null !== i) for (r = 1; r <= l; r++) {
                  o = Q.zoomAnimationFunction(r, l);for (var d = [], c = 0; c < this.axes_.length; c++) {
                    d.push([a[c][0] * (1 - o) + o * i[c][0], a[c][1] * (1 - o) + o * i[c][1]]);
                  }u[r - 1] = d;
                }x.repeatAndCleanup(function (t) {
                  if (u.length) for (var e = 0; e < s.axes_.length; e++) {
                    var a = u[t][e];s.axes_[e].valueRange = [a[0], a[1]];
                  }h.length && (s.dateWindow_ = h[t]), s.drawGraph_();
                }, l, Q.ANIMATION_DURATION / l, n);
              }, Q.prototype.getArea = function () {
                return this.plotter_.area;
              }, Q.prototype.eventToDomCoords = function (t) {
                if (t.offsetX && t.offsetY) return [t.offsetX, t.offsetY];var e = x.findPos(this.mouseEventElement_),
                    a = x.pageX(t) - e.x,
                    i = x.pageY(t) - e.y;return [a, i];
              }, Q.prototype.findClosestRow = function (t) {
                for (var e = 1 / 0, a = -1, i = this.layout_.points, n = 0; n < i.length; n++) {
                  for (var r = i[n], o = r.length, s = 0; s < o; s++) {
                    var l = r[s];if (x.isValidPoint(l, !0)) {
                      var h = Math.abs(l.canvasx - t);h < e && (e = h, a = l.idx);
                    }
                  }
                }return a;
              }, Q.prototype.findClosestPoint = function (t, e) {
                for (var a, i, n, r, o, s, l, h = 1 / 0, u = this.layout_.points.length - 1; u >= 0; --u) {
                  for (var d = this.layout_.points[u], c = 0; c < d.length; ++c) {
                    r = d[c], x.isValidPoint(r) && (i = r.canvasx - t, n = r.canvasy - e, a = i * i + n * n, a < h && (h = a, o = r, s = u, l = r.idx));
                  }
                }var p = this.layout_.setNames[s];return { row: l, seriesName: p, point: o };
              }, Q.prototype.findStackedPoint = function (t, e) {
                for (var a, i, n = this.findClosestRow(t), r = 0; r < this.layout_.points.length; ++r) {
                  var o = this.getLeftBoundary_(r),
                      s = n - o,
                      l = this.layout_.points[r];if (!(s >= l.length)) {
                    var h = l[s];if (x.isValidPoint(h)) {
                      var u = h.canvasy;if (t > h.canvasx && s + 1 < l.length) {
                        var d = l[s + 1];if (x.isValidPoint(d)) {
                          var c = d.canvasx - h.canvasx;if (c > 0) {
                            var p = (t - h.canvasx) / c;u += p * (d.canvasy - h.canvasy);
                          }
                        }
                      } else if (t < h.canvasx && s > 0) {
                        var g = l[s - 1];if (x.isValidPoint(g)) {
                          var c = h.canvasx - g.canvasx;if (c > 0) {
                            var p = (h.canvasx - t) / c;u += p * (g.canvasy - h.canvasy);
                          }
                        }
                      }(0 === r || u < e) && (a = h, i = r);
                    }
                  }
                }var f = this.layout_.setNames[i];return { row: n, seriesName: f, point: a };
              }, Q.prototype.mouseMove_ = function (t) {
                var e = this.layout_.points;if (void 0 !== e && null !== e) {
                  var a = this.eventToDomCoords(t),
                      i = a[0],
                      n = a[1],
                      r = this.getOption("highlightSeriesOpts"),
                      o = !1;if (r && !this.isSeriesLocked()) {
                    var s;s = this.getBooleanOption("stackedGraph") ? this.findStackedPoint(i, n) : this.findClosestPoint(i, n), o = this.setSelection(s.row, s.seriesName);
                  } else {
                    var l = this.findClosestRow(i);o = this.setSelection(l);
                  }var h = this.getFunctionOption("highlightCallback");h && o && h.call(this, t, this.lastx_, this.selPoints_, this.lastRow_, this.highlightSet_);
                }
              }, Q.prototype.getLeftBoundary_ = function (t) {
                if (this.boundaryIds_[t]) return this.boundaryIds_[t][0];for (var e = 0; e < this.boundaryIds_.length; e++) {
                  if (void 0 !== this.boundaryIds_[e]) return this.boundaryIds_[e][0];
                }return 0;
              }, Q.prototype.animateSelection_ = function (t) {
                var e = 10,
                    a = 30;void 0 === this.fadeLevel && (this.fadeLevel = 0), void 0 === this.animateId && (this.animateId = 0);var i = this.fadeLevel,
                    n = t < 0 ? i : e - i;if (n <= 0) return void (this.fadeLevel && this.updateSelection_(1));var r = ++this.animateId,
                    o = this,
                    s = function s() {
                  0 !== o.fadeLevel && t < 0 && (o.fadeLevel = 0, o.clearSelection());
                };x.repeatAndCleanup(function (a) {
                  o.animateId == r && (o.fadeLevel += t, 0 === o.fadeLevel ? o.clearSelection() : o.updateSelection_(o.fadeLevel / e));
                }, n, a, s);
              }, Q.prototype.updateSelection_ = function (t) {
                this.cascadeEvents_("select", { selectedRow: this.lastRow_ === -1 ? void 0 : this.lastRow_, selectedX: this.lastx_ === -1 ? void 0 : this.lastx_, selectedPoints: this.selPoints_ });var e,
                    a = this.canvas_ctx_;if (this.getOption("highlightSeriesOpts")) {
                  a.clearRect(0, 0, this.width_, this.height_);var i = 1 - this.getNumericOption("highlightSeriesBackgroundAlpha"),
                      n = x.toRGB_(this.getOption("highlightSeriesBackgroundColor"));if (i) {
                    var r = !0;if (r) {
                      if (void 0 === t) return void this.animateSelection_(1);i *= t;
                    }a.fillStyle = "rgba(" + n.r + "," + n.g + "," + n.b + "," + i + ")", a.fillRect(0, 0, this.width_, this.height_);
                  }this.plotter_._renderLineChart(this.highlightSet_, a);
                } else if (this.previousVerticalX_ >= 0) {
                  var o = 0,
                      s = this.attr_("labels");for (e = 1; e < s.length; e++) {
                    var l = this.getNumericOption("highlightCircleSize", s[e]);l > o && (o = l);
                  }var h = this.previousVerticalX_;a.clearRect(h - o - 1, 0, 2 * o + 2, this.height_);
                }if (this.selPoints_.length > 0) {
                  var u = this.selPoints_[0].canvasx;for (a.save(), e = 0; e < this.selPoints_.length; e++) {
                    var d = this.selPoints_[e];if (!isNaN(d.canvasy)) {
                      var c = this.getNumericOption("highlightCircleSize", d.name),
                          p = this.getFunctionOption("drawHighlightPointCallback", d.name),
                          g = this.plotter_.colors[d.name];p || (p = x.Circles.DEFAULT), a.lineWidth = this.getNumericOption("strokeWidth", d.name), a.strokeStyle = g, a.fillStyle = g, p.call(this, this, d.name, a, u, d.canvasy, g, c, d.idx);
                    }
                  }a.restore(), this.previousVerticalX_ = u;
                }
              }, Q.prototype.setSelection = function (t, e, a) {
                this.selPoints_ = [];var i = !1;if (t !== !1 && t >= 0) {
                  t != this.lastRow_ && (i = !0), this.lastRow_ = t;for (var n = 0; n < this.layout_.points.length; ++n) {
                    var r = this.layout_.points[n],
                        o = t - this.getLeftBoundary_(n);if (o >= 0 && o < r.length && r[o].idx == t) {
                      var s = r[o];null !== s.yval && this.selPoints_.push(s);
                    } else for (var l = 0; l < r.length; ++l) {
                      var s = r[l];if (s.idx == t) {
                        null !== s.yval && this.selPoints_.push(s);break;
                      }
                    }
                  }
                } else this.lastRow_ >= 0 && (i = !0), this.lastRow_ = -1;return this.selPoints_.length ? this.lastx_ = this.selPoints_[0].xval : this.lastx_ = -1, void 0 !== e && (this.highlightSet_ !== e && (i = !0), this.highlightSet_ = e), void 0 !== a && (this.lockedSet_ = a), i && this.updateSelection_(void 0), i;
              }, Q.prototype.mouseOut_ = function (t) {
                this.getFunctionOption("unhighlightCallback") && this.getFunctionOption("unhighlightCallback").call(this, t), this.getBooleanOption("hideOverlayOnMouseOut") && !this.lockedSet_ && this.clearSelection();
              }, Q.prototype.clearSelection = function () {
                return this.cascadeEvents_("deselect", {}), this.lockedSet_ = !1, this.fadeLevel ? void this.animateSelection_(-1) : (this.canvas_ctx_.clearRect(0, 0, this.width_, this.height_), this.fadeLevel = 0, this.selPoints_ = [], this.lastx_ = -1, this.lastRow_ = -1, void (this.highlightSet_ = null));
              }, Q.prototype.getSelection = function () {
                if (!this.selPoints_ || this.selPoints_.length < 1) return -1;for (var t = 0; t < this.layout_.points.length; t++) {
                  for (var e = this.layout_.points[t], a = 0; a < e.length; a++) {
                    if (e[a].x == this.selPoints_[0].x) return e[a].idx;
                  }
                }return -1;
              }, Q.prototype.getHighlightSeries = function () {
                return this.highlightSet_;
              }, Q.prototype.isSeriesLocked = function () {
                return this.lockedSet_;
              }, Q.prototype.loadedEvent_ = function (t) {
                this.rawData_ = this.parseCSV_(t), this.cascadeDataDidUpdateEvent_(), this.predraw_();
              }, Q.prototype.addXTicks_ = function () {
                var t;t = this.dateWindow_ ? [this.dateWindow_[0], this.dateWindow_[1]] : this.xAxisExtremes();var e = this.optionsViewForAxis_("x"),
                    a = e("ticker")(t[0], t[1], this.plotter_.area.w, e, this);this.layout_.setXTicks(a);
              }, Q.prototype.getHandlerClass_ = function () {
                var t;return t = this.attr_("dataHandler") ? this.attr_("dataHandler") : this.fractions_ ? this.getBooleanOption("errorBars") ? k.default : M.default : this.getBooleanOption("customBars") ? L.default : this.getBooleanOption("errorBars") ? P.default : D.default;
              }, Q.prototype.predraw_ = function () {
                var t = new Date();this.dataHandler_ = new (this.getHandlerClass_())(), this.layout_.computePlotArea(), this.computeYAxes_(), this.is_initial_draw_ || (this.canvas_ctx_.restore(), this.hidden_ctx_.restore()), this.canvas_ctx_.save(), this.hidden_ctx_.save(), this.plotter_ = new d.default(this, this.hidden_, this.hidden_ctx_, this.layout_), this.createRollInterface_(), this.cascadeEvents_("predraw"), this.rolledSeries_ = [null];for (var e = 1; e < this.numColumns(); e++) {
                  var a = this.dataHandler_.extractSeries(this.rawData_, e, this.attributes_);this.rollPeriod_ > 1 && (a = this.dataHandler_.rollingAverage(a, this.rollPeriod_, this.attributes_)), this.rolledSeries_.push(a);
                }this.drawGraph_();var i = new Date();this.drawingTimeMs_ = i - t;
              }, Q.PointType = void 0, Q.stackPoints_ = function (t, e, a, i) {
                for (var n = null, r = null, o = null, s = -1, l = function l(e) {
                  if (!(s >= e)) for (var a = e; a < t.length; ++a) {
                    if (o = null, !isNaN(t[a].yval) && null !== t[a].yval) {
                      s = a, o = t[a];break;
                    }
                  }
                }, h = 0; h < t.length; ++h) {
                  var u = t[h],
                      d = u.xval;void 0 === e[d] && (e[d] = 0);var c = u.yval;isNaN(c) || null === c ? "none" == i ? c = 0 : (l(h), c = r && o && "none" != i ? r.yval + (o.yval - r.yval) * ((d - r.xval) / (o.xval - r.xval)) : r && "all" == i ? r.yval : o && "all" == i ? o.yval : 0) : r = u;var p = e[d];n != d && (p += c, e[d] = p), n = d, u.yval_stacked = p, p > a[1] && (a[1] = p), p < a[0] && (a[0] = p);
                }
              }, Q.prototype.gatherDatasets_ = function (t, e) {
                var a,
                    i,
                    n,
                    r,
                    o,
                    s,
                    l = [],
                    h = [],
                    u = [],
                    d = {},
                    c = t.length - 1;for (a = c; a >= 1; a--) {
                  if (this.visibility()[a - 1]) {
                    if (e) {
                      s = t[a];var p = e[0],
                          g = e[1];for (n = null, r = null, i = 0; i < s.length; i++) {
                        s[i][0] >= p && null === n && (n = i), s[i][0] <= g && (r = i);
                      }null === n && (n = 0);for (var f = n, v = !0; v && f > 0;) {
                        f--, v = null === s[f][1];
                      }null === r && (r = s.length - 1);var _ = r;for (v = !0; v && _ < s.length - 1;) {
                        _++, v = null === s[_][1];
                      }f !== n && (n = f), _ !== r && (r = _), l[a - 1] = [n, r], s = s.slice(n, r + 1);
                    } else s = t[a], l[a - 1] = [0, s.length - 1];var y = this.attr_("labels")[a],
                        x = this.dataHandler_.getExtremeYValues(s, e, this.getBooleanOption("stepPlot", y)),
                        m = this.dataHandler_.seriesToPoints(s, y, l[a - 1][0]);this.getBooleanOption("stackedGraph") && (o = this.attributes_.axisForSeries(y), void 0 === u[o] && (u[o] = []), Q.stackPoints_(m, u[o], x, this.getBooleanOption("stackedGraphNaNFill"))), d[y] = x, h[a] = m;
                  }
                }return { points: h, extremes: d, boundaryIds: l };
              }, Q.prototype.drawGraph_ = function () {
                var t = new Date(),
                    e = this.is_initial_draw_;this.is_initial_draw_ = !1, this.layout_.removeAllDatasets(), this.setColors_(), this.attrs_.pointSize = .5 * this.getNumericOption("highlightCircleSize");var a = this.gatherDatasets_(this.rolledSeries_, this.dateWindow_),
                    i = a.points,
                    n = a.extremes;this.boundaryIds_ = a.boundaryIds, this.setIndexByName_ = {};for (var r = this.attr_("labels"), o = 0, s = 1; s < i.length; s++) {
                  this.visibility()[s - 1] && (this.layout_.addDataset(r[s], i[s]), this.datasetIndex_[s] = o++);
                }for (var s = 0; s < r.length; s++) {
                  this.setIndexByName_[r[s]] = s;
                }if (this.computeYAxisRanges_(n), this.layout_.setYAxes(this.axes_), this.addXTicks_(), this.layout_.evaluate(), this.renderGraph_(e), this.getStringOption("timingName")) {
                  var l = new Date();console.log(this.getStringOption("timingName") + " - drawGraph: " + (l - t) + "ms");
                }
              }, Q.prototype.renderGraph_ = function (t) {
                this.cascadeEvents_("clearChart"), this.plotter_.clear();var e = this.getFunctionOption("underlayCallback");e && e.call(this, this.hidden_ctx_, this.layout_.getPlotArea(), this, this);var a = { canvas: this.hidden_, drawingContext: this.hidden_ctx_ };this.cascadeEvents_("willDrawChart", a), this.plotter_.render(), this.cascadeEvents_("didDrawChart", a), this.lastRow_ = -1, this.canvas_.getContext("2d").clearRect(0, 0, this.width_, this.height_);var i = this.getFunctionOption("drawCallback");if (null !== i && i.call(this, this, t), t) for (this.readyFired_ = !0; this.readyFns_.length > 0;) {
                  var n = this.readyFns_.pop();n(this);
                }
              }, Q.prototype.computeYAxes_ = function () {
                var t, e, a;for (this.axes_ = [], t = 0; t < this.attributes_.numAxes(); t++) {
                  e = { g: this }, x.update(e, this.attributes_.axisOptions(t)), this.axes_[t] = e;
                }for (t = 0; t < this.axes_.length; t++) {
                  if (0 === t) e = this.optionsViewForAxis_("y" + (t ? "2" : "")), a = e("valueRange"), a && (this.axes_[t].valueRange = a);else {
                    var i = this.user_attrs_.axes;i && i.y2 && (a = i.y2.valueRange, a && (this.axes_[t].valueRange = a));
                  }
                }
              }, Q.prototype.numAxes = function () {
                return this.attributes_.numAxes();
              }, Q.prototype.axisPropertiesForSeries = function (t) {
                return this.axes_[this.attributes_.axisForSeries(t)];
              }, Q.prototype.computeYAxisRanges_ = function (t) {
                for (var e, a, i, n, r, o = function o(t) {
                  return isNaN(parseFloat(t));
                }, s = this.attributes_.numAxes(), l = 0; l < s; l++) {
                  var h = this.axes_[l],
                      u = this.attributes_.getForAxis("logscale", l),
                      d = this.attributes_.getForAxis("includeZero", l),
                      c = this.attributes_.getForAxis("independentTicks", l);i = this.attributes_.seriesForAxis(l), e = !0, n = .1;var p = this.getNumericOption("yRangePad");if (null !== p && (e = !1, n = p / this.plotter_.area.h), 0 === i.length) h.extremeRange = [0, 1];else {
                    for (var g, f, v = 1 / 0, _ = -(1 / 0), y = 0; y < i.length; y++) {
                      t.hasOwnProperty(i[y]) && (g = t[i[y]][0], null !== g && (v = Math.min(g, v)), f = t[i[y]][1], null !== f && (_ = Math.max(f, _)));
                    }d && !u && (v > 0 && (v = 0), _ < 0 && (_ = 0)), v == 1 / 0 && (v = 0), _ == -(1 / 0) && (_ = 1), a = _ - v, 0 === a && (0 !== _ ? a = Math.abs(_) : (_ = 1, a = 1));var m = _,
                        b = v;e && (u ? (m = _ + n * a, b = v) : (m = _ + n * a, b = v - n * a, b < 0 && v >= 0 && (b = 0), m > 0 && _ <= 0 && (m = 0))), h.extremeRange = [b, m];
                  }if (h.valueRange) {
                    var w = o(h.valueRange[0]) ? h.extremeRange[0] : h.valueRange[0],
                        A = o(h.valueRange[1]) ? h.extremeRange[1] : h.valueRange[1];h.computedValueRange = [w, A];
                  } else h.computedValueRange = h.extremeRange;if (!e) if (u) {
                    w = h.computedValueRange[0], A = h.computedValueRange[1];var O = n / (2 * n - 1),
                        T = (n - 1) / (2 * n - 1);h.computedValueRange[0] = x.logRangeFraction(w, A, O), h.computedValueRange[1] = x.logRangeFraction(w, A, T);
                  } else w = h.computedValueRange[0], A = h.computedValueRange[1], a = A - w, h.computedValueRange[0] = w - a * n, h.computedValueRange[1] = A + a * n;if (c) {
                    h.independentTicks = c;var D = this.optionsViewForAxis_("y" + (l ? "2" : "")),
                        E = D("ticker");h.ticks = E(h.computedValueRange[0], h.computedValueRange[1], this.plotter_.area.h, D, this), r || (r = h);
                  }
                }if (void 0 === r) throw 'Configuration Error: At least one axis has to have the "independentTicks" option activated.';for (var l = 0; l < s; l++) {
                  var h = this.axes_[l];if (!h.independentTicks) {
                    for (var D = this.optionsViewForAxis_("y" + (l ? "2" : "")), E = D("ticker"), P = r.ticks, S = r.computedValueRange[1] - r.computedValueRange[0], L = h.computedValueRange[1] - h.computedValueRange[0], C = [], M = 0; M < P.length; M++) {
                      var N = (P[M].v - r.computedValueRange[0]) / S,
                          k = h.computedValueRange[0] + N * L;C.push(k);
                    }h.ticks = E(h.computedValueRange[0], h.computedValueRange[1], this.plotter_.area.h, D, this, C);
                  }
                }
              }, Q.prototype.detectTypeFromString_ = function (t) {
                var e = !1,
                    a = t.indexOf("-");a > 0 && "e" != t[a - 1] && "E" != t[a - 1] || t.indexOf("/") >= 0 || isNaN(parseFloat(t)) ? e = !0 : 8 == t.length && t > "19700101" && t < "20371231" && (e = !0), this.setXAxisOptions_(e);
              }, Q.prototype.setXAxisOptions_ = function (t) {
                t ? (this.attrs_.xValueParser = x.dateParser, this.attrs_.axes.x.valueFormatter = x.dateValueFormatter, this.attrs_.axes.x.ticker = _.dateTicker, this.attrs_.axes.x.axisLabelFormatter = x.dateAxisLabelFormatter) : (this.attrs_.xValueParser = function (t) {
                  return parseFloat(t);
                }, this.attrs_.axes.x.valueFormatter = function (t) {
                  return t;
                }, this.attrs_.axes.x.ticker = _.numericTicks, this.attrs_.axes.x.axisLabelFormatter = this.attrs_.axes.x.valueFormatter);
              }, Q.prototype.parseCSV_ = function (t) {
                var e,
                    a,
                    i = [],
                    n = x.detectLineDelimiter(t),
                    r = t.split(n || "\n"),
                    o = this.getStringOption("delimiter");r[0].indexOf(o) == -1 && r[0].indexOf("\t") >= 0 && (o = "\t");var s = 0;"labels" in this.user_attrs_ || (s = 1, this.attrs_.labels = r[0].split(o), this.attributes_.reparseSeries());for (var l, h = 0, u = !1, d = this.attr_("labels").length, c = !1, p = s; p < r.length; p++) {
                  var g = r[p];if (h = p, 0 !== g.length && "#" != g[0]) {
                    var f = g.split(o);if (!(f.length < 2)) {
                      var v = [];if (u || (this.detectTypeFromString_(f[0]), l = this.getFunctionOption("xValueParser"), u = !0), v[0] = l(f[0], this), this.fractions_) for (a = 1; a < f.length; a++) {
                        e = f[a].split("/"), 2 != e.length ? (console.error('Expected fractional "num/den" values in CSV data but found a value \'' + f[a] + "' on line " + (1 + p) + " ('" + g + "') which is not of this form."), v[a] = [0, 0]) : v[a] = [x.parseFloat_(e[0], p, g), x.parseFloat_(e[1], p, g)];
                      } else if (this.getBooleanOption("errorBars")) for (f.length % 2 != 1 && console.error("Expected alternating (value, stdev.) pairs in CSV data but line " + (1 + p) + " has an odd number of values (" + (f.length - 1) + "): '" + g + "'"), a = 1; a < f.length; a += 2) {
                        v[(a + 1) / 2] = [x.parseFloat_(f[a], p, g), x.parseFloat_(f[a + 1], p, g)];
                      } else if (this.getBooleanOption("customBars")) for (a = 1; a < f.length; a++) {
                        var _ = f[a];/^ *$/.test(_) ? v[a] = [null, null, null] : (e = _.split(";"), 3 == e.length ? v[a] = [x.parseFloat_(e[0], p, g), x.parseFloat_(e[1], p, g), x.parseFloat_(e[2], p, g)] : console.warn('When using customBars, values must be either blank or "low;center;high" tuples (got "' + _ + '" on line ' + (1 + p)));
                      } else for (a = 1; a < f.length; a++) {
                        v[a] = x.parseFloat_(f[a], p, g);
                      }if (i.length > 0 && v[0] < i[i.length - 1][0] && (c = !0), v.length != d && console.error("Number of columns in line " + p + " (" + v.length + ") does not agree with number of labels (" + d + ") " + g), 0 === p && this.attr_("labels")) {
                        var y = !0;for (a = 0; y && a < v.length; a++) {
                          v[a] && (y = !1);
                        }if (y) {
                          console.warn("The dygraphs 'labels' option is set, but the first row of CSV data ('" + g + "') appears to also contain labels. Will drop the CSV labels and use the option labels.");continue;
                        }
                      }i.push(v);
                    }
                  }
                }return c && (console.warn("CSV is out of order; order it correctly to speed loading."), i.sort(function (t, e) {
                  return t[0] - e[0];
                })), i;
              }, Q.prototype.parseArray_ = function (t) {
                if (0 === t.length) return console.error("Can't plot empty data set"), null;if (0 === t[0].length) return console.error("Data set cannot contain an empty row"), null;o(t);var e;if (null === this.attr_("labels")) {
                  for (console.warn("Using default labels. Set labels explicitly via 'labels' in the options parameter"), this.attrs_.labels = ["X"], e = 1; e < t[0].length; e++) {
                    this.attrs_.labels.push("Y" + e);
                  }this.attributes_.reparseSeries();
                } else {
                  var a = this.attr_("labels");if (a.length != t[0].length) return console.error("Mismatch between number of labels (" + a + ") and number of columns in array (" + t[0].length + ")"), null;
                }if (x.isDateLike(t[0][0])) {
                  this.attrs_.axes.x.valueFormatter = x.dateValueFormatter, this.attrs_.axes.x.ticker = _.dateTicker, this.attrs_.axes.x.axisLabelFormatter = x.dateAxisLabelFormatter;var i = x.clone(t);for (e = 0; e < t.length; e++) {
                    if (0 === i[e].length) return console.error("Row " + (1 + e) + " of data is empty"), null;if (null === i[e][0] || "function" != typeof i[e][0].getTime || isNaN(i[e][0].getTime())) return console.error("x value in row " + (1 + e) + " is not a Date"), null;i[e][0] = i[e][0].getTime();
                  }return i;
                }return this.attrs_.axes.x.valueFormatter = function (t) {
                  return t;
                }, this.attrs_.axes.x.ticker = _.numericTicks, this.attrs_.axes.x.axisLabelFormatter = x.numberAxisLabelFormatter, t;
              }, Q.prototype.parseDataTable_ = function (t) {
                var e = function e(t) {
                  var e = String.fromCharCode(65 + t % 26);for (t = Math.floor(t / 26); t > 0;) {
                    e = String.fromCharCode(65 + (t - 1) % 26) + e.toLowerCase(), t = Math.floor((t - 1) / 26);
                  }return e;
                },
                    a = t.getNumberOfColumns(),
                    i = t.getNumberOfRows(),
                    n = t.getColumnType(0);if ("date" == n || "datetime" == n) this.attrs_.xValueParser = x.dateParser, this.attrs_.axes.x.valueFormatter = x.dateValueFormatter, this.attrs_.axes.x.ticker = _.dateTicker, this.attrs_.axes.x.axisLabelFormatter = x.dateAxisLabelFormatter;else {
                  if ("number" != n) throw new Error("only 'date', 'datetime' and 'number' types are supported for column 1 of DataTable input (Got '" + n + "')");this.attrs_.xValueParser = function (t) {
                    return parseFloat(t);
                  }, this.attrs_.axes.x.valueFormatter = function (t) {
                    return t;
                  }, this.attrs_.axes.x.ticker = _.numericTicks, this.attrs_.axes.x.axisLabelFormatter = this.attrs_.axes.x.valueFormatter;
                }var r,
                    o,
                    s = [],
                    l = {},
                    h = !1;for (r = 1; r < a; r++) {
                  var u = t.getColumnType(r);if ("number" == u) s.push(r);else {
                    if ("string" != u || !this.getBooleanOption("displayAnnotations")) throw new Error("Only 'number' is supported as a dependent type with Gviz. 'string' is only supported if displayAnnotations is true");var d = s[s.length - 1];l.hasOwnProperty(d) ? l[d].push(r) : l[d] = [r], h = !0;
                  }
                }var c = [t.getColumnLabel(0)];for (r = 0; r < s.length; r++) {
                  c.push(t.getColumnLabel(s[r])), this.getBooleanOption("errorBars") && (r += 1);
                }this.attrs_.labels = c, a = c.length;var p = [],
                    g = !1,
                    f = [];for (r = 0; r < i; r++) {
                  var v = [];if ("undefined" != typeof t.getValue(r, 0) && null !== t.getValue(r, 0)) {
                    if ("date" == n || "datetime" == n ? v.push(t.getValue(r, 0).getTime()) : v.push(t.getValue(r, 0)), this.getBooleanOption("errorBars")) for (o = 0; o < a - 1; o++) {
                      v.push([t.getValue(r, 1 + 2 * o), t.getValue(r, 2 + 2 * o)]);
                    } else {
                      for (o = 0; o < s.length; o++) {
                        var y = s[o];if (v.push(t.getValue(r, y)), h && l.hasOwnProperty(y) && null !== t.getValue(r, l[y][0])) {
                          var m = {};m.series = t.getColumnLabel(y), m.xval = v[0], m.shortText = e(f.length), m.text = "";for (var b = 0; b < l[y].length; b++) {
                            b && (m.text += "\n"), m.text += t.getValue(r, l[y][b]);
                          }f.push(m);
                        }
                      }for (o = 0; o < v.length; o++) {
                        isFinite(v[o]) || (v[o] = null);
                      }
                    }p.length > 0 && v[0] < p[p.length - 1][0] && (g = !0), p.push(v);
                  } else console.warn("Ignoring row " + r + " of DataTable because of undefined or null first column.");
                }g && (console.warn("DataTable is out of order; order it correctly to speed loading."), p.sort(function (t, e) {
                  return t[0] - e[0];
                })), this.rawData_ = p, f.length > 0 && this.setAnnotations(f, !0), this.attributes_.reparseSeries();
              }, Q.prototype.cascadeDataDidUpdateEvent_ = function () {
                this.cascadeEvents_("dataDidUpdate", {});
              }, Q.prototype.start_ = function () {
                var t = this.file_;if ("function" == typeof t && (t = t()), x.isArrayLike(t)) this.rawData_ = this.parseArray_(t), this.cascadeDataDidUpdateEvent_(), this.predraw_();else if ("object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && "function" == typeof t.getColumnRange) this.parseDataTable_(t), this.cascadeDataDidUpdateEvent_(), this.predraw_();else if ("string" == typeof t) {
                  var e = x.detectLineDelimiter(t);if (e) this.loadedEvent_(t);else {
                    var a;a = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");var i = this;a.onreadystatechange = function () {
                      4 == a.readyState && (200 !== a.status && 0 !== a.status || i.loadedEvent_(a.responseText));
                    }, a.open("GET", t, !0), a.send(null);
                  }
                } else console.error("Unknown data format: " + (typeof t === "undefined" ? "undefined" : _typeof(t)));
              }, Q.prototype.updateOptions = function (t, e) {
                "undefined" == typeof e && (e = !1);var a = t.file,
                    i = Q.copyUserAttrs_(t);"rollPeriod" in i && (this.rollPeriod_ = i.rollPeriod), "dateWindow" in i && (this.dateWindow_ = i.dateWindow);var n = x.isPixelChangingOptionList(this.attr_("labels"), i);x.updateDeep(this.user_attrs_, i), this.attributes_.reparseSeries(), a ? (this.cascadeEvents_("dataWillUpdate", {}), this.file_ = a, e || this.start_()) : e || (n ? this.predraw_() : this.renderGraph_(!1));
              }, Q.copyUserAttrs_ = function (t) {
                var e = {};for (var a in t) {
                  t.hasOwnProperty(a) && "file" != a && t.hasOwnProperty(a) && (e[a] = t[a]);
                }return e;
              }, Q.prototype.resize = function (t, e) {
                if (!this.resize_lock) {
                  this.resize_lock = !0, null === t != (null === e) && (console.warn("Dygraph.resize() should be called with zero parameters or two non-NULL parameters. Pretending it was zero."), t = e = null);var a = this.width_,
                      i = this.height_;t ? (this.maindiv_.style.width = t + "px", this.maindiv_.style.height = e + "px", this.width_ = t, this.height_ = e) : (this.width_ = this.maindiv_.clientWidth, this.height_ = this.maindiv_.clientHeight), a == this.width_ && i == this.height_ || (this.resizeElements_(), this.predraw_()), this.resize_lock = !1;
                }
              }, Q.prototype.adjustRoll = function (t) {
                this.rollPeriod_ = t, this.predraw_();
              }, Q.prototype.visibility = function () {
                for (this.getOption("visibility") || (this.attrs_.visibility = []); this.getOption("visibility").length < this.numColumns() - 1;) {
                  this.attrs_.visibility.push(!0);
                }return this.getOption("visibility");
              }, Q.prototype.setVisibility = function (t, e) {
                var a = this.visibility(),
                    i = !1;if (Array.isArray(t) || (null !== t && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) ? i = !0 : t = [t]), i) for (var n in t) {
                  t.hasOwnProperty(n) && (n < 0 || n >= a.length ? console.warn("Invalid series number in setVisibility: " + n) : a[n] = t[n]);
                } else for (var n = 0; n < t.length; n++) {
                  "boolean" == typeof t[n] ? n >= a.length ? console.warn("Invalid series number in setVisibility: " + n) : a[n] = t[n] : t[n] < 0 || t[n] >= a.length ? console.warn("Invalid series number in setVisibility: " + t[n]) : a[t[n]] = e;
                }this.predraw_();
              }, Q.prototype.size = function () {
                return { width: this.width_, height: this.height_ };
              }, Q.prototype.setAnnotations = function (t, e) {
                return this.annotations_ = t, this.layout_ ? (this.layout_.setAnnotations(this.annotations_), void (e || this.predraw_())) : void console.warn("Tried to setAnnotations before dygraph was ready. Try setting them in a ready() block. See dygraphs.com/tests/annotation.html");
              }, Q.prototype.annotations = function () {
                return this.annotations_;
              }, Q.prototype.getLabels = function () {
                var t = this.attr_("labels");return t ? t.slice() : null;
              }, Q.prototype.indexFromSetName = function (t) {
                return this.setIndexByName_[t];
              }, Q.prototype.getRowForX = function (t) {
                for (var e = 0, a = this.numRows() - 1; e <= a;) {
                  var i = a + e >> 1,
                      n = this.getValue(i, 0);if (n < t) e = i + 1;else if (n > t) a = i - 1;else {
                    if (e == i) return i;a = i;
                  }
                }return null;
              }, Q.prototype.ready = function (t) {
                this.is_initial_draw_ ? this.readyFns_.push(t) : t.call(this, this);
              }, Q.prototype.addAndTrackEvent = function (t, e, a) {
                x.addEvent(t, e, a), this.registeredEvents_.push({ elem: t, type: e, fn: a });
              }, Q.prototype.removeTrackedEvents_ = function () {
                if (this.registeredEvents_) for (var t = 0; t < this.registeredEvents_.length; t++) {
                  var e = this.registeredEvents_[t];x.removeEvent(e.elem, e.type, e.fn);
                }this.registeredEvents_ = [];
              }, Q.PLUGINS = [U.default, X.default, j.default, Z.default, H.default, G.default], Q.GVizChart = q.default, Q.DASHED_LINE = x.DASHED_LINE, Q.DOT_DASH_LINE = x.DOT_DASH_LINE, Q.dateAxisLabelFormatter = x.dateAxisLabelFormatter, Q.toRGB_ = x.toRGB_, Q.findPos = x.findPos, Q.pageX = x.pageX, Q.pageY = x.pageY, Q.dateString_ = x.dateString_, Q.defaultInteractionModel = f.default.defaultModel, Q.nonInteractiveModel = Q.nonInteractiveModel_ = f.default.nonInteractiveModel_, Q.Circles = x.Circles, Q.Plugins = { Legend: U.default, Axes: X.default, Annotations: H.default, ChartLabels: Z.default, Grid: G.default, RangeSelector: j.default }, Q.DataHandlers = { DefaultHandler: D.default, BarsHandler: R.default, CustomBarsHandler: L.default, DefaultFractionHandler: M.default, ErrorBarsHandler: P.default, FractionsBarsHandler: k.default }, Q.startPan = f.default.startPan, Q.startZoom = f.default.startZoom, Q.movePan = f.default.movePan, Q.moveZoom = f.default.moveZoom, Q.endPan = f.default.endPan, Q.endZoom = f.default.endZoom, Q.numericLinearTicks = _.numericLinearTicks, Q.numericTicks = _.numericTicks, Q.dateTicker = _.dateTicker, Q.Granularity = _.Granularity, Q.getDateAxis = _.getDateAxis, Q.floatFormat = x.floatFormat, a.default = Q, e.exports = a.default;
            }).call(this, t("_process"));
          }, { "./datahandler/bars": 5, "./datahandler/bars-custom": 2, "./datahandler/bars-error": 3, "./datahandler/bars-fractions": 4, "./datahandler/default": 8, "./datahandler/default-fractions": 7, "./dygraph-canvas": 9, "./dygraph-default-attrs": 10, "./dygraph-gviz": 11, "./dygraph-interaction-model": 12, "./dygraph-layout": 13, "./dygraph-options": 15, "./dygraph-options-reference": 14, "./dygraph-tickers": 16, "./dygraph-utils": 17, "./iframe-tarp": 19, "./plugins/annotations": 20, "./plugins/axes": 21, "./plugins/chart-labels": 22, "./plugins/grid": 23, "./plugins/legend": 24, "./plugins/range-selector": 25, _process: 1 }], 19: [function (t, e, a) {
            "use strict";
            function i(t) {
              if (t && t.__esModule) return t;var e = {};if (null != t) for (var a in t) {
                Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
              }return e.default = t, e;
            }function n() {
              this.tarps = [];
            }Object.defineProperty(a, "__esModule", { value: !0 });var r = t("./dygraph-utils"),
                o = i(r);n.prototype.cover = function () {
              for (var t = document.getElementsByTagName("iframe"), e = 0; e < t.length; e++) {
                var a = t[e],
                    i = o.findPos(a),
                    n = i.x,
                    r = i.y,
                    s = a.offsetWidth,
                    l = a.offsetHeight,
                    h = document.createElement("div");h.style.position = "absolute", h.style.left = n + "px", h.style.top = r + "px", h.style.width = s + "px", h.style.height = l + "px", h.style.zIndex = 999, document.body.appendChild(h), this.tarps.push(h);
              }
            }, n.prototype.uncover = function () {
              for (var t = 0; t < this.tarps.length; t++) {
                this.tarps[t].parentNode.removeChild(this.tarps[t]);
              }this.tarps = [];
            }, a.default = n, e.exports = a.default;
          }, { "./dygraph-utils": 17 }], 20: [function (t, e, a) {
            "use strict";
            Object.defineProperty(a, "__esModule", { value: !0 });var i = function i() {
              this.annotations_ = [];
            };i.prototype.toString = function () {
              return "Annotations Plugin";
            }, i.prototype.activate = function (t) {
              return { clearChart: this.clearChart, didDrawChart: this.didDrawChart };
            }, i.prototype.detachLabels = function () {
              for (var t = 0; t < this.annotations_.length; t++) {
                var e = this.annotations_[t];e.parentNode && e.parentNode.removeChild(e), this.annotations_[t] = null;
              }this.annotations_ = [];
            }, i.prototype.clearChart = function (t) {
              this.detachLabels();
            }, i.prototype.didDrawChart = function (t) {
              var e = t.dygraph,
                  a = e.layout_.annotated_points;if (a && 0 !== a.length) for (var i = t.canvas.parentNode, n = function n(t, a, i) {
                return function (n) {
                  var r = i.annotation;r.hasOwnProperty(t) ? r[t](r, i, e, n) : e.getOption(a) && e.getOption(a)(r, i, e, n);
                };
              }, r = t.dygraph.getArea(), o = {}, s = 0; s < a.length; s++) {
                var l = a[s];if (!(l.canvasx < r.x || l.canvasx > r.x + r.w || l.canvasy < r.y || l.canvasy > r.y + r.h)) {
                  var h = l.annotation,
                      u = 6;h.hasOwnProperty("tickHeight") && (u = h.tickHeight);var d = document.createElement("div");d.style.fontSize = e.getOption("axisLabelFontSize") + "px";var c = "dygraph-annotation";h.hasOwnProperty("icon") || (c += " dygraphDefaultAnnotation dygraph-default-annotation"), h.hasOwnProperty("cssClass") && (c += " " + h.cssClass), d.className = c;var p = h.hasOwnProperty("width") ? h.width : 16,
                      g = h.hasOwnProperty("height") ? h.height : 16;if (h.hasOwnProperty("icon")) {
                    var f = document.createElement("img");f.src = h.icon, f.width = p, f.height = g, d.appendChild(f);
                  } else l.annotation.hasOwnProperty("shortText") && d.appendChild(document.createTextNode(l.annotation.shortText));var v = l.canvasx - p / 2;d.style.left = v + "px";var _ = 0;if (h.attachAtBottom) {
                    var y = r.y + r.h - g - u;o[v] ? y -= o[v] : o[v] = 0, o[v] += u + g, _ = y;
                  } else _ = l.canvasy - g - u;d.style.top = _ + "px", d.style.width = p + "px", d.style.height = g + "px", d.title = l.annotation.text, d.style.color = e.colorsMap_[l.name], d.style.borderColor = e.colorsMap_[l.name], h.div = d, e.addAndTrackEvent(d, "click", n("clickHandler", "annotationClickHandler", l, this)), e.addAndTrackEvent(d, "mouseover", n("mouseOverHandler", "annotationMouseOverHandler", l, this)), e.addAndTrackEvent(d, "mouseout", n("mouseOutHandler", "annotationMouseOutHandler", l, this)), e.addAndTrackEvent(d, "dblclick", n("dblClickHandler", "annotationDblClickHandler", l, this)), i.appendChild(d), this.annotations_.push(d);var x = t.drawingContext;if (x.save(), x.strokeStyle = h.hasOwnProperty("tickColor") ? h.tickColor : e.colorsMap_[l.name], x.lineWidth = h.hasOwnProperty("tickWidth") ? h.tickWidth : e.getOption("strokeWidth"), x.beginPath(), h.attachAtBottom) {
                    var y = _ + g;x.moveTo(l.canvasx, y), x.lineTo(l.canvasx, y + u);
                  } else x.moveTo(l.canvasx, l.canvasy), x.lineTo(l.canvasx, l.canvasy - 2 - u);x.closePath(), x.stroke(), x.restore();
                }
              }
            }, i.prototype.destroy = function () {
              this.detachLabels();
            }, a.default = i, e.exports = a.default;
          }, {}], 21: [function (t, e, a) {
            "use strict";
            function i(t) {
              if (t && t.__esModule) return t;var e = {};if (null != t) for (var a in t) {
                Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
              }return e.default = t, e;
            }Object.defineProperty(a, "__esModule", { value: !0 });var n = t("../dygraph-utils"),
                r = i(n),
                o = function o() {
              this.xlabels_ = [], this.ylabels_ = [];
            };o.prototype.toString = function () {
              return "Axes Plugin";
            }, o.prototype.activate = function (t) {
              return { layout: this.layout, clearChart: this.clearChart, willDrawChart: this.willDrawChart };
            }, o.prototype.layout = function (t) {
              var e = t.dygraph;if (e.getOptionForAxis("drawAxis", "y")) {
                var a = e.getOptionForAxis("axisLabelWidth", "y") + 2 * e.getOptionForAxis("axisTickSize", "y");t.reserveSpaceLeft(a);
              }if (e.getOptionForAxis("drawAxis", "x")) {
                var i;i = e.getOption("xAxisHeight") ? e.getOption("xAxisHeight") : e.getOptionForAxis("axisLabelFontSize", "x") + 2 * e.getOptionForAxis("axisTickSize", "x"), t.reserveSpaceBottom(i);
              }if (2 == e.numAxes()) {
                if (e.getOptionForAxis("drawAxis", "y2")) {
                  var a = e.getOptionForAxis("axisLabelWidth", "y2") + 2 * e.getOptionForAxis("axisTickSize", "y2");t.reserveSpaceRight(a);
                }
              } else e.numAxes() > 2 && e.error("Only two y-axes are supported at this time. (Trying to use " + e.numAxes() + ")");
            }, o.prototype.detachLabels = function () {
              function t(t) {
                for (var e = 0; e < t.length; e++) {
                  var a = t[e];a.parentNode && a.parentNode.removeChild(a);
                }
              }t(this.xlabels_), t(this.ylabels_), this.xlabels_ = [], this.ylabels_ = [];
            }, o.prototype.clearChart = function (t) {
              this.detachLabels();
            }, o.prototype.willDrawChart = function (t) {
              function e(t) {
                return Math.round(t) + .5;
              }function a(t) {
                return Math.round(t) - .5;
              }var i = this,
                  n = t.dygraph;if (n.getOptionForAxis("drawAxis", "x") || n.getOptionForAxis("drawAxis", "y") || n.getOptionForAxis("drawAxis", "y2")) {
                var o,
                    s,
                    l,
                    h = t.drawingContext,
                    u = t.canvas.parentNode,
                    d = n.width_,
                    c = n.height_,
                    p = function p(t) {
                  return { position: "absolute", fontSize: n.getOptionForAxis("axisLabelFontSize", t) + "px", width: n.getOptionForAxis("axisLabelWidth", t) + "px" };
                },
                    g = { x: p("x"), y: p("y"), y2: p("y2") },
                    f = function f(t, e, a) {
                  var i = document.createElement("div"),
                      n = g["y2" == a ? "y2" : e];r.update(i.style, n);var o = document.createElement("div");return o.className = "dygraph-axis-label dygraph-axis-label-" + e + (a ? " dygraph-axis-label-" + a : ""), o.innerHTML = t, i.appendChild(o), i;
                };h.save();var v = n.layout_,
                    _ = t.dygraph.plotter_.area,
                    y = function y(t) {
                  return function (e) {
                    return n.getOptionForAxis(e, t);
                  };
                };if (n.getOptionForAxis("drawAxis", "y")) {
                  if (v.yticks && v.yticks.length > 0) {
                    var x = n.numAxes(),
                        m = [y("y"), y("y2")];v.yticks.forEach(function (t) {
                      if (void 0 !== t.label) {
                        s = _.x;var e = 1,
                            a = "y1",
                            n = m[0];1 == t.axis && (s = _.x + _.w, e = -1, a = "y2", n = m[1]);var r = n("axisLabelFontSize");l = _.y + t.pos * _.h, o = f(t.label, "y", 2 == x ? a : null);var h = l - r / 2;h < 0 && (h = 0), h + r + 3 > c ? o.style.bottom = "0" : o.style.top = h + "px", 0 === t.axis ? (o.style.left = _.x - n("axisLabelWidth") - n("axisTickSize") + "px", o.style.textAlign = "right") : 1 == t.axis && (o.style.left = _.x + _.w + n("axisTickSize") + "px", o.style.textAlign = "left"), o.style.width = n("axisLabelWidth") + "px", u.appendChild(o), i.ylabels_.push(o);
                      }
                    });var b = this.ylabels_[0],
                        w = n.getOptionForAxis("axisLabelFontSize", "y"),
                        A = parseInt(b.style.top, 10) + w;A > c - w && (b.style.top = parseInt(b.style.top, 10) - w / 2 + "px");
                  }var O;if (n.getOption("drawAxesAtZero")) {
                    var T = n.toPercentXCoord(0);(T > 1 || T < 0 || isNaN(T)) && (T = 0), O = e(_.x + T * _.w);
                  } else O = e(_.x);h.strokeStyle = n.getOptionForAxis("axisLineColor", "y"), h.lineWidth = n.getOptionForAxis("axisLineWidth", "y"), h.beginPath(), h.moveTo(O, a(_.y)), h.lineTo(O, a(_.y + _.h)), h.closePath(), h.stroke(), 2 == n.numAxes() && (h.strokeStyle = n.getOptionForAxis("axisLineColor", "y2"), h.lineWidth = n.getOptionForAxis("axisLineWidth", "y2"), h.beginPath(), h.moveTo(a(_.x + _.w), a(_.y)), h.lineTo(a(_.x + _.w), a(_.y + _.h)), h.closePath(), h.stroke());
                }if (n.getOptionForAxis("drawAxis", "x")) {
                  if (v.xticks) {
                    var D = y("x");v.xticks.forEach(function (t) {
                      if (void 0 !== t.label) {
                        s = _.x + t.pos * _.w, l = _.y + _.h, o = f(t.label, "x"), o.style.textAlign = "center", o.style.top = l + D("axisTickSize") + "px";var e = s - D("axisLabelWidth") / 2;e + D("axisLabelWidth") > d && (e = d - D("axisLabelWidth"), o.style.textAlign = "right"), e < 0 && (e = 0, o.style.textAlign = "left"), o.style.left = e + "px", o.style.width = D("axisLabelWidth") + "px", u.appendChild(o), i.xlabels_.push(o);
                      }
                    });
                  }h.strokeStyle = n.getOptionForAxis("axisLineColor", "x"), h.lineWidth = n.getOptionForAxis("axisLineWidth", "x"), h.beginPath();var E;if (n.getOption("drawAxesAtZero")) {
                    var T = n.toPercentYCoord(0, 0);(T > 1 || T < 0) && (T = 1), E = a(_.y + T * _.h);
                  } else E = a(_.y + _.h);h.moveTo(e(_.x), E), h.lineTo(e(_.x + _.w), E), h.closePath(), h.stroke();
                }h.restore();
              }
            }, a.default = o, e.exports = a.default;
          }, { "../dygraph-utils": 17 }], 22: [function (t, e, a) {
            "use strict";
            Object.defineProperty(a, "__esModule", { value: !0 });var i = function i() {
              this.title_div_ = null, this.xlabel_div_ = null, this.ylabel_div_ = null, this.y2label_div_ = null;
            };i.prototype.toString = function () {
              return "ChartLabels Plugin";
            }, i.prototype.activate = function (t) {
              return { layout: this.layout, didDrawChart: this.didDrawChart };
            };var n = function n(t) {
              var e = document.createElement("div");return e.style.position = "absolute", e.style.left = t.x + "px", e.style.top = t.y + "px", e.style.width = t.w + "px", e.style.height = t.h + "px", e;
            };i.prototype.detachLabels_ = function () {
              for (var t = [this.title_div_, this.xlabel_div_, this.ylabel_div_, this.y2label_div_], e = 0; e < t.length; e++) {
                var a = t[e];a && a.parentNode && a.parentNode.removeChild(a);
              }this.title_div_ = null, this.xlabel_div_ = null, this.ylabel_div_ = null, this.y2label_div_ = null;
            };var r = function r(t, e, a, i, n) {
              var r = document.createElement("div");r.style.position = "absolute", 1 == a ? r.style.left = "0px" : r.style.left = e.x + "px", r.style.top = e.y + "px", r.style.width = e.w + "px", r.style.height = e.h + "px", r.style.fontSize = t.getOption("yLabelWidth") - 2 + "px";var o = document.createElement("div");o.style.position = "absolute", o.style.width = e.h + "px", o.style.height = e.w + "px", o.style.top = e.h / 2 - e.w / 2 + "px", o.style.left = e.w / 2 - e.h / 2 + "px", o.className = "dygraph-label-rotate-" + (1 == a ? "right" : "left");var s = document.createElement("div");return s.className = i, s.innerHTML = n, o.appendChild(s), r.appendChild(o), r;
            };i.prototype.layout = function (t) {
              this.detachLabels_();var e = t.dygraph,
                  a = t.chart_div;if (e.getOption("title")) {
                var i = t.reserveSpaceTop(e.getOption("titleHeight"));this.title_div_ = n(i), this.title_div_.style.fontSize = e.getOption("titleHeight") - 8 + "px";var o = document.createElement("div");o.className = "dygraph-label dygraph-title", o.innerHTML = e.getOption("title"), this.title_div_.appendChild(o), a.appendChild(this.title_div_);
              }if (e.getOption("xlabel")) {
                var s = t.reserveSpaceBottom(e.getOption("xLabelHeight"));this.xlabel_div_ = n(s), this.xlabel_div_.style.fontSize = e.getOption("xLabelHeight") - 2 + "px";var o = document.createElement("div");o.className = "dygraph-label dygraph-xlabel", o.innerHTML = e.getOption("xlabel"), this.xlabel_div_.appendChild(o), a.appendChild(this.xlabel_div_);
              }if (e.getOption("ylabel")) {
                var l = t.reserveSpaceLeft(0);this.ylabel_div_ = r(e, l, 1, "dygraph-label dygraph-ylabel", e.getOption("ylabel")), a.appendChild(this.ylabel_div_);
              }if (e.getOption("y2label") && 2 == e.numAxes()) {
                var h = t.reserveSpaceRight(0);this.y2label_div_ = r(e, h, 2, "dygraph-label dygraph-y2label", e.getOption("y2label")), a.appendChild(this.y2label_div_);
              }
            }, i.prototype.didDrawChart = function (t) {
              var e = t.dygraph;this.title_div_ && (this.title_div_.children[0].innerHTML = e.getOption("title")), this.xlabel_div_ && (this.xlabel_div_.children[0].innerHTML = e.getOption("xlabel")), this.ylabel_div_ && (this.ylabel_div_.children[0].children[0].innerHTML = e.getOption("ylabel")), this.y2label_div_ && (this.y2label_div_.children[0].children[0].innerHTML = e.getOption("y2label"));
            }, i.prototype.clearChart = function () {}, i.prototype.destroy = function () {
              this.detachLabels_();
            }, a.default = i, e.exports = a.default;
          }, {}], 23: [function (t, e, a) {
            "use strict";
            Object.defineProperty(a, "__esModule", { value: !0 });var i = function i() {};i.prototype.toString = function () {
              return "Gridline Plugin";
            }, i.prototype.activate = function (t) {
              return { willDrawChart: this.willDrawChart };
            }, i.prototype.willDrawChart = function (t) {
              function e(t) {
                return Math.round(t) + .5;
              }function a(t) {
                return Math.round(t) - .5;
              }var i,
                  n,
                  r,
                  o,
                  s = t.dygraph,
                  l = t.drawingContext,
                  h = s.layout_,
                  u = t.dygraph.plotter_.area;if (s.getOptionForAxis("drawGrid", "y")) {
                for (var d = ["y", "y2"], c = [], p = [], g = [], f = [], v = [], r = 0; r < d.length; r++) {
                  g[r] = s.getOptionForAxis("drawGrid", d[r]), g[r] && (c[r] = s.getOptionForAxis("gridLineColor", d[r]), p[r] = s.getOptionForAxis("gridLineWidth", d[r]), v[r] = s.getOptionForAxis("gridLinePattern", d[r]), f[r] = v[r] && v[r].length >= 2);
                }o = h.yticks, l.save(), o.forEach(function (t) {
                  if (t.has_tick) {
                    var r = t.axis;g[r] && (l.save(), f[r] && l.setLineDash && l.setLineDash(v[r]), l.strokeStyle = c[r], l.lineWidth = p[r], i = e(u.x), n = a(u.y + t.pos * u.h), l.beginPath(), l.moveTo(i, n), l.lineTo(i + u.w, n), l.stroke(), l.restore());
                  }
                }), l.restore();
              }if (s.getOptionForAxis("drawGrid", "x")) {
                o = h.xticks, l.save();var v = s.getOptionForAxis("gridLinePattern", "x"),
                    f = v && v.length >= 2;f && l.setLineDash && l.setLineDash(v), l.strokeStyle = s.getOptionForAxis("gridLineColor", "x"), l.lineWidth = s.getOptionForAxis("gridLineWidth", "x"), o.forEach(function (t) {
                  t.has_tick && (i = e(u.x + t.pos * u.w), n = a(u.y + u.h), l.beginPath(), l.moveTo(i, n), l.lineTo(i, u.y), l.closePath(), l.stroke());
                }), f && l.setLineDash && l.setLineDash([]), l.restore();
              }
            }, i.prototype.destroy = function () {}, a.default = i, e.exports = a.default;
          }, {}], 24: [function (t, e, a) {
            "use strict";
            function i(t) {
              if (t && t.__esModule) return t;var e = {};if (null != t) for (var a in t) {
                Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
              }return e.default = t, e;
            }function n(t, e, a) {
              if (!t || t.length <= 1) return '<div class="dygraph-legend-line" style="border-bottom-color: ' + e + ';"></div>';var i,
                  n,
                  r,
                  o,
                  s,
                  l = 0,
                  h = 0,
                  u = [];for (i = 0; i <= t.length; i++) {
                l += t[i % t.length];
              }if (s = Math.floor(a / (l - t[0])), s > 1) {
                for (i = 0; i < t.length; i++) {
                  u[i] = t[i] / a;
                }h = u.length;
              } else {
                for (s = 1, i = 0; i < t.length; i++) {
                  u[i] = t[i] / l;
                }h = u.length + 1;
              }var d = "";for (n = 0; n < s; n++) {
                for (i = 0; i < h; i += 2) {
                  r = u[i % u.length], o = i < t.length ? u[(i + 1) % u.length] : 0, d += '<div class="dygraph-legend-dash" style="margin-right: ' + o + "em; padding-left: " + r + 'em;"></div>';
                }
              }return d;
            }Object.defineProperty(a, "__esModule", { value: !0 });var r = t("../dygraph-utils"),
                o = i(r),
                s = function s() {
              this.legend_div_ = null, this.is_generated_div_ = !1;
            };s.prototype.toString = function () {
              return "Legend Plugin";
            }, s.prototype.activate = function (t) {
              var e,
                  a = t.getOption("labelsDiv");return a && null !== a ? e = "string" == typeof a || a instanceof String ? document.getElementById(a) : a : (e = document.createElement("div"), e.className = "dygraph-legend", t.graphDiv.appendChild(e), this.is_generated_div_ = !0), this.legend_div_ = e, this.one_em_width_ = 10, { select: this.select, deselect: this.deselect, predraw: this.predraw, didDrawChart: this.didDrawChart };
            };var l = function l(t) {
              var e = document.createElement("span");e.setAttribute("style", "margin: 0; padding: 0 0 0 1em; border: 0;"), t.appendChild(e);var a = e.offsetWidth;return t.removeChild(e), a;
            },
                h = function h(t) {
              return t.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            };s.prototype.select = function (t) {
              var e = t.selectedX,
                  a = t.selectedPoints,
                  i = t.selectedRow,
                  n = t.dygraph.getOption("legend");if ("never" === n) return void (this.legend_div_.style.display = "none");if ("follow" === n) {
                var r = t.dygraph.plotter_.area,
                    o = this.legend_div_.offsetWidth,
                    l = t.dygraph.getOptionForAxis("axisLabelWidth", "y"),
                    h = a[0].x * r.w + 50,
                    u = a[0].y * r.h - 50;h + o + 1 > r.w && (h = h - 100 - o - (l - r.x)), t.dygraph.graphDiv.appendChild(this.legend_div_), this.legend_div_.style.left = l + h + "px", this.legend_div_.style.top = u + "px";
              }var d = s.generateLegendHTML(t.dygraph, e, a, this.one_em_width_, i);this.legend_div_.innerHTML = d, this.legend_div_.style.display = "";
            }, s.prototype.deselect = function (t) {
              var e = t.dygraph.getOption("legend");"always" !== e && (this.legend_div_.style.display = "none");var a = l(this.legend_div_);this.one_em_width_ = a;var i = s.generateLegendHTML(t.dygraph, void 0, void 0, a, null);this.legend_div_.innerHTML = i;
            }, s.prototype.didDrawChart = function (t) {
              this.deselect(t);
            }, s.prototype.predraw = function (t) {
              if (this.is_generated_div_) {
                t.dygraph.graphDiv.appendChild(this.legend_div_);var e = t.dygraph.getArea(),
                    a = this.legend_div_.offsetWidth;this.legend_div_.style.left = e.x + e.w - a - 1 + "px", this.legend_div_.style.top = e.y + "px";
              }
            }, s.prototype.destroy = function () {
              this.legend_div_ = null;
            }, s.generateLegendHTML = function (t, e, a, i, r) {
              var l = { dygraph: t, x: e, series: [] },
                  u = {},
                  d = t.getLabels();if (d) for (var c = 1; c < d.length; c++) {
                var p = t.getPropertiesForSeries(d[c]),
                    g = t.getOption("strokePattern", d[c]),
                    f = { dashHTML: n(g, p.color, i), label: d[c], labelHTML: h(d[c]), isVisible: p.visible, color: p.color };l.series.push(f), u[d[c]] = f;
              }if ("undefined" != typeof e) {
                var v = t.optionsViewForAxis_("x"),
                    _ = v("valueFormatter");l.xHTML = _.call(t, e, v, d[0], t, r, 0);for (var y = [], x = t.numAxes(), c = 0; c < x; c++) {
                  y[c] = t.optionsViewForAxis_("y" + (c ? 1 + c : ""));
                }var m = t.getOption("labelsShowZeroValues"),
                    b = t.getHighlightSeries();for (c = 0; c < a.length; c++) {
                  var w = a[c],
                      f = u[w.name];if (f.y = w.yval, 0 === w.yval && !m || isNaN(w.canvasy)) f.isVisible = !1;else {
                    var p = t.getPropertiesForSeries(w.name),
                        A = y[p.axis - 1],
                        O = A("valueFormatter"),
                        T = O.call(t, w.yval, A, w.name, t, r, d.indexOf(w.name));o.update(f, { yHTML: T }), w.name == b && (f.isHighlighted = !0);
                  }
                }
              }var D = t.getOption("legendFormatter") || s.defaultFormatter;return D.call(t, l);
            }, s.defaultFormatter = function (t) {
              var e = t.dygraph;if (e.getOption("showLabelsOnHighlight") !== !0) return "";var a,
                  i = e.getOption("labelsSeparateLines");if ("undefined" == typeof t.x) {
                if ("always" != e.getOption("legend")) return "";a = "";for (var n = 0; n < t.series.length; n++) {
                  var r = t.series[n];r.isVisible && ("" !== a && (a += i ? "<br/>" : " "), a += "<span style='font-weight: bold; color: " + r.color + ";'>" + r.dashHTML + " " + r.labelHTML + "</span>");
                }return a;
              }a = t.xHTML + ":";for (var n = 0; n < t.series.length; n++) {
                var r = t.series[n];if (r.isVisible) {
                  i && (a += "<br>");var o = r.isHighlighted ? ' class="highlight"' : "";a += "<span" + o + "> <b><span style='color: " + r.color + ";'>" + r.labelHTML + "</span></b>:&#160;" + r.yHTML + "</span>";
                }
              }return a;
            }, a.default = s, e.exports = a.default;
          }, { "../dygraph-utils": 17 }], 25: [function (t, e, a) {
            "use strict";
            function i(t) {
              return t && t.__esModule ? t : { default: t };
            }function n(t) {
              if (t && t.__esModule) return t;var e = {};if (null != t) for (var a in t) {
                Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
              }return e.default = t, e;
            }Object.defineProperty(a, "__esModule", { value: !0 });var r = t("../dygraph-utils"),
                o = n(r),
                s = t("../dygraph-interaction-model"),
                l = i(s),
                h = t("../iframe-tarp"),
                u = i(h),
                d = function d() {
              this.hasTouchInterface_ = "undefined" != typeof TouchEvent, this.isMobileDevice_ = /mobile|android/gi.test(navigator.appVersion), this.interfaceCreated_ = !1;
            };d.prototype.toString = function () {
              return "RangeSelector Plugin";
            }, d.prototype.activate = function (t) {
              return this.dygraph_ = t, this.getOption_("showRangeSelector") && this.createInterface_(), { layout: this.reserveSpace_, predraw: this.renderStaticLayer_, didDrawChart: this.renderInteractiveLayer_ };
            }, d.prototype.destroy = function () {
              this.bgcanvas_ = null, this.fgcanvas_ = null, this.leftZoomHandle_ = null, this.rightZoomHandle_ = null;
            }, d.prototype.getOption_ = function (t, e) {
              return this.dygraph_.getOption(t, e);
            }, d.prototype.setDefaultOption_ = function (t, e) {
              this.dygraph_.attrs_[t] = e;
            }, d.prototype.createInterface_ = function () {
              this.createCanvases_(), this.createZoomHandles_(), this.initInteraction_(), this.getOption_("animatedZooms") && (console.warn("Animated zooms and range selector are not compatible; disabling animatedZooms."), this.dygraph_.updateOptions({ animatedZooms: !1 }, !0)), this.interfaceCreated_ = !0, this.addToGraph_();
            }, d.prototype.addToGraph_ = function () {
              var t = this.graphDiv_ = this.dygraph_.graphDiv;t.appendChild(this.bgcanvas_), t.appendChild(this.fgcanvas_), t.appendChild(this.leftZoomHandle_), t.appendChild(this.rightZoomHandle_);
            }, d.prototype.removeFromGraph_ = function () {
              var t = this.graphDiv_;t.removeChild(this.bgcanvas_), t.removeChild(this.fgcanvas_), t.removeChild(this.leftZoomHandle_), t.removeChild(this.rightZoomHandle_), this.graphDiv_ = null;
            }, d.prototype.reserveSpace_ = function (t) {
              this.getOption_("showRangeSelector") && t.reserveSpaceBottom(this.getOption_("rangeSelectorHeight") + 4);
            }, d.prototype.renderStaticLayer_ = function () {
              this.updateVisibility_() && (this.resize_(), this.drawStaticLayer_());
            }, d.prototype.renderInteractiveLayer_ = function () {
              this.updateVisibility_() && !this.isChangingRange_ && (this.placeZoomHandles_(), this.drawInteractiveLayer_());
            }, d.prototype.updateVisibility_ = function () {
              var t = this.getOption_("showRangeSelector");if (t) this.interfaceCreated_ ? this.graphDiv_ && this.graphDiv_.parentNode || this.addToGraph_() : this.createInterface_();else if (this.graphDiv_) {
                this.removeFromGraph_();var e = this.dygraph_;setTimeout(function () {
                  e.width_ = 0, e.resize();
                }, 1);
              }return t;
            }, d.prototype.resize_ = function () {
              function t(t, e, a) {
                var i = o.getContextPixelRatio(e);t.style.top = a.y + "px", t.style.left = a.x + "px", t.width = a.w * i, t.height = a.h * i, t.style.width = a.w + "px", t.style.height = a.h + "px", 1 != i && e.scale(i, i);
              }var e = this.dygraph_.layout_.getPlotArea(),
                  a = 0;this.dygraph_.getOptionForAxis("drawAxis", "x") && (a = this.getOption_("xAxisHeight") || this.getOption_("axisLabelFontSize") + 2 * this.getOption_("axisTickSize")), this.canvasRect_ = { x: e.x, y: e.y + e.h + a + 4, w: e.w, h: this.getOption_("rangeSelectorHeight") }, t(this.bgcanvas_, this.bgcanvas_ctx_, this.canvasRect_), t(this.fgcanvas_, this.fgcanvas_ctx_, this.canvasRect_);
            }, d.prototype.createCanvases_ = function () {
              this.bgcanvas_ = o.createCanvas(), this.bgcanvas_.className = "dygraph-rangesel-bgcanvas", this.bgcanvas_.style.position = "absolute", this.bgcanvas_.style.zIndex = 9, this.bgcanvas_ctx_ = o.getContext(this.bgcanvas_), this.fgcanvas_ = o.createCanvas(), this.fgcanvas_.className = "dygraph-rangesel-fgcanvas", this.fgcanvas_.style.position = "absolute", this.fgcanvas_.style.zIndex = 9, this.fgcanvas_.style.cursor = "default", this.fgcanvas_ctx_ = o.getContext(this.fgcanvas_);
            }, d.prototype.createZoomHandles_ = function () {
              var t = new Image();t.className = "dygraph-rangesel-zoomhandle", t.style.position = "absolute", t.style.zIndex = 10, t.style.visibility = "hidden", t.style.cursor = "col-resize", t.width = 9, t.height = 16, t.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAQCAYAAADESFVDAAAAAXNSR0IArs4c6QAAAAZiS0dEANAAzwDP4Z7KegAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB9sHGw0cMqdt1UwAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAaElEQVQoz+3SsRFAQBCF4Z9WJM8KCDVwownl6YXsTmCUsyKGkZzcl7zkz3YLkypgAnreFmDEpHkIwVOMfpdi9CEEN2nGpFdwD03yEqDtOgCaun7sqSTDH32I1pQA2Pb9sZecAxc5r3IAb21d6878xsAAAAAASUVORK5CYII=", this.isMobileDevice_ && (t.width *= 2, t.height *= 2), this.leftZoomHandle_ = t, this.rightZoomHandle_ = t.cloneNode(!1);
            }, d.prototype.initInteraction_ = function () {
              var t,
                  e,
                  a,
                  _i,
                  n,
                  r,
                  s,
                  h,
                  _d,
                  c,
                  p,
                  g,
                  f,
                  v,
                  _ = this,
                  y = document,
                  x = 0,
                  m = null,
                  b = !1,
                  w = !1,
                  A = !this.isMobileDevice_,
                  O = new u.default();t = function t(_t) {
                var e = _.dygraph_.xAxisExtremes(),
                    a = (e[1] - e[0]) / _.canvasRect_.w,
                    i = e[0] + (_t.leftHandlePos - _.canvasRect_.x) * a,
                    n = e[0] + (_t.rightHandlePos - _.canvasRect_.x) * a;return [i, n];
              }, e = function e(t) {
                return o.cancelEvent(t), b = !0, x = t.clientX, m = t.target ? t.target : t.srcElement, "mousedown" !== t.type && "dragstart" !== t.type || (o.addEvent(y, "mousemove", a), o.addEvent(y, "mouseup", _i)), _.fgcanvas_.style.cursor = "col-resize", O.cover(), !0;
              }, a = function a(t) {
                if (!b) return !1;o.cancelEvent(t);var e = t.clientX - x;if (Math.abs(e) < 4) return !0;x = t.clientX;var a,
                    i = _.getZoomHandleStatus_();m == _.leftZoomHandle_ ? (a = i.leftHandlePos + e, a = Math.min(a, i.rightHandlePos - m.width - 3), a = Math.max(a, _.canvasRect_.x)) : (a = i.rightHandlePos + e, a = Math.min(a, _.canvasRect_.x + _.canvasRect_.w), a = Math.max(a, i.leftHandlePos + m.width + 3));var r = m.width / 2;return m.style.left = a - r + "px", _.drawInteractiveLayer_(), A && n(), !0;
              }, _i = function i(t) {
                return !!b && (b = !1, O.uncover(), o.removeEvent(y, "mousemove", a), o.removeEvent(y, "mouseup", _i), _.fgcanvas_.style.cursor = "default", A || n(), !0);
              }, n = function n() {
                try {
                  var e = _.getZoomHandleStatus_();if (_.isChangingRange_ = !0, e.isZoomed) {
                    var a = t(e);_.dygraph_.doZoomXDates_(a[0], a[1]);
                  } else _.dygraph_.resetZoom();
                } finally {
                  _.isChangingRange_ = !1;
                }
              }, r = function r(t) {
                var e = _.leftZoomHandle_.getBoundingClientRect(),
                    a = e.left + e.width / 2;e = _.rightZoomHandle_.getBoundingClientRect();var i = e.left + e.width / 2;return t.clientX > a && t.clientX < i;
              }, s = function s(t) {
                return !(w || !r(t) || !_.getZoomHandleStatus_().isZoomed) && (o.cancelEvent(t), w = !0, x = t.clientX, "mousedown" === t.type && (o.addEvent(y, "mousemove", h), o.addEvent(y, "mouseup", _d)), !0);
              }, h = function h(t) {
                if (!w) return !1;o.cancelEvent(t);var e = t.clientX - x;if (Math.abs(e) < 4) return !0;x = t.clientX;var a = _.getZoomHandleStatus_(),
                    i = a.leftHandlePos,
                    n = a.rightHandlePos,
                    r = n - i;i + e <= _.canvasRect_.x ? (i = _.canvasRect_.x, n = i + r) : n + e >= _.canvasRect_.x + _.canvasRect_.w ? (n = _.canvasRect_.x + _.canvasRect_.w, i = n - r) : (i += e, n += e);var s = _.leftZoomHandle_.width / 2;return _.leftZoomHandle_.style.left = i - s + "px", _.rightZoomHandle_.style.left = n - s + "px", _.drawInteractiveLayer_(), A && c(), !0;
              }, _d = function d(t) {
                return !!w && (w = !1, o.removeEvent(y, "mousemove", h), o.removeEvent(y, "mouseup", _d), A || c(), !0);
              }, c = function c() {
                try {
                  _.isChangingRange_ = !0, _.dygraph_.dateWindow_ = t(_.getZoomHandleStatus_()), _.dygraph_.drawGraph_(!1);
                } finally {
                  _.isChangingRange_ = !1;
                }
              }, p = function p(t) {
                if (!b && !w) {
                  var e = r(t) ? "move" : "default";e != _.fgcanvas_.style.cursor && (_.fgcanvas_.style.cursor = e);
                }
              }, g = function g(t) {
                "touchstart" == t.type && 1 == t.targetTouches.length ? e(t.targetTouches[0]) && o.cancelEvent(t) : "touchmove" == t.type && 1 == t.targetTouches.length ? a(t.targetTouches[0]) && o.cancelEvent(t) : _i(t);
              }, f = function f(t) {
                "touchstart" == t.type && 1 == t.targetTouches.length ? s(t.targetTouches[0]) && o.cancelEvent(t) : "touchmove" == t.type && 1 == t.targetTouches.length ? h(t.targetTouches[0]) && o.cancelEvent(t) : _d(t);
              }, v = function v(t, e) {
                for (var a = ["touchstart", "touchend", "touchmove", "touchcancel"], i = 0; i < a.length; i++) {
                  _.dygraph_.addAndTrackEvent(t, a[i], e);
                }
              }, this.setDefaultOption_("interactionModel", l.default.dragIsPanInteractionModel), this.setDefaultOption_("panEdgeFraction", 1e-4);var T = window.opera ? "mousedown" : "dragstart";this.dygraph_.addAndTrackEvent(this.leftZoomHandle_, T, e), this.dygraph_.addAndTrackEvent(this.rightZoomHandle_, T, e), this.dygraph_.addAndTrackEvent(this.fgcanvas_, "mousedown", s), this.dygraph_.addAndTrackEvent(this.fgcanvas_, "mousemove", p), this.hasTouchInterface_ && (v(this.leftZoomHandle_, g), v(this.rightZoomHandle_, g), v(this.fgcanvas_, f));
            }, d.prototype.drawStaticLayer_ = function () {
              var t = this.bgcanvas_ctx_;t.clearRect(0, 0, this.canvasRect_.w, this.canvasRect_.h);try {
                this.drawMiniPlot_();
              } catch (t) {
                console.warn(t);
              }var e = .5;this.bgcanvas_ctx_.lineWidth = this.getOption_("rangeSelectorBackgroundLineWidth"), t.strokeStyle = this.getOption_("rangeSelectorBackgroundStrokeColor"), t.beginPath(), t.moveTo(e, e), t.lineTo(e, this.canvasRect_.h - e), t.lineTo(this.canvasRect_.w - e, this.canvasRect_.h - e), t.lineTo(this.canvasRect_.w - e, e), t.stroke();
            }, d.prototype.drawMiniPlot_ = function () {
              var t = this.getOption_("rangeSelectorPlotFillColor"),
                  e = this.getOption_("rangeSelectorPlotFillGradientColor"),
                  a = this.getOption_("rangeSelectorPlotStrokeColor");if (t || a) {
                var i = this.getOption_("stepPlot"),
                    n = this.computeCombinedSeriesAndLimits_(),
                    r = n.yMax - n.yMin,
                    o = this.bgcanvas_ctx_,
                    s = .5,
                    l = this.dygraph_.xAxisExtremes(),
                    h = Math.max(l[1] - l[0], 1e-30),
                    u = (this.canvasRect_.w - s) / h,
                    d = (this.canvasRect_.h - s) / r,
                    c = this.canvasRect_.w - s,
                    p = this.canvasRect_.h - s,
                    g = null,
                    f = null;o.beginPath(), o.moveTo(s, p);for (var v = 0; v < n.data.length; v++) {
                  var _ = n.data[v],
                      y = null !== _[0] ? (_[0] - l[0]) * u : NaN,
                      x = null !== _[1] ? p - (_[1] - n.yMin) * d : NaN;(i || null === g || Math.round(y) != Math.round(g)) && (isFinite(y) && isFinite(x) ? (null === g ? o.lineTo(y, p) : i && o.lineTo(y, f), o.lineTo(y, x), g = y, f = x) : (null !== g && (i ? (o.lineTo(y, f), o.lineTo(y, p)) : o.lineTo(g, p)), g = f = null));
                }if (o.lineTo(c, p), o.closePath(), t) {
                  var m = this.bgcanvas_ctx_.createLinearGradient(0, 0, 0, p);e && m.addColorStop(0, e), m.addColorStop(1, t), this.bgcanvas_ctx_.fillStyle = m, o.fill();
                }a && (this.bgcanvas_ctx_.strokeStyle = a, this.bgcanvas_ctx_.lineWidth = this.getOption_("rangeSelectorPlotLineWidth"), o.stroke());
              }
            }, d.prototype.computeCombinedSeriesAndLimits_ = function () {
              var t,
                  e = this.dygraph_,
                  a = this.getOption_("logscale"),
                  i = e.numColumns(),
                  n = e.getLabels(),
                  r = new Array(i),
                  s = !1,
                  l = e.visibility(),
                  h = [];for (t = 1; t < i; t++) {
                var u = this.getOption_("showInRangeSelector", n[t]);h.push(u), null !== u && (s = !0);
              }if (s) for (t = 1; t < i; t++) {
                r[t] = h[t - 1];
              } else for (t = 1; t < i; t++) {
                r[t] = l[t - 1];
              }var d = [],
                  c = e.dataHandler_,
                  p = e.attributes_;for (t = 1; t < e.numColumns(); t++) {
                if (r[t]) {
                  var g = c.extractSeries(e.rawData_, t, p);e.rollPeriod() > 1 && (g = c.rollingAverage(g, e.rollPeriod(), p)), d.push(g);
                }
              }var f = [];for (t = 0; t < d[0].length; t++) {
                for (var v = 0, _ = 0, y = 0; y < d.length; y++) {
                  var x = d[y][t][1];null === x || isNaN(x) || (_++, v += x);
                }f.push([d[0][t][0], v / _]);
              }var m = Number.MAX_VALUE,
                  b = -Number.MAX_VALUE;for (t = 0; t < f.length; t++) {
                var w = f[t][1];null !== w && isFinite(w) && (!a || w > 0) && (m = Math.min(m, w), b = Math.max(b, w));
              }var A = .25;if (a) for (b = o.log10(b), b += b * A, m = o.log10(m), t = 0; t < f.length; t++) {
                f[t][1] = o.log10(f[t][1]);
              } else {
                var O,
                    T = b - m;O = T <= Number.MIN_VALUE ? b * A : T * A, b += O, m -= O;
              }return { data: f, yMin: m, yMax: b };
            }, d.prototype.placeZoomHandles_ = function () {
              var t = this.dygraph_.xAxisExtremes(),
                  e = this.dygraph_.xAxisRange(),
                  a = t[1] - t[0],
                  i = Math.max(0, (e[0] - t[0]) / a),
                  n = Math.max(0, (t[1] - e[1]) / a),
                  r = this.canvasRect_.x + this.canvasRect_.w * i,
                  o = this.canvasRect_.x + this.canvasRect_.w * (1 - n),
                  s = Math.max(this.canvasRect_.y, this.canvasRect_.y + (this.canvasRect_.h - this.leftZoomHandle_.height) / 2),
                  l = this.leftZoomHandle_.width / 2;this.leftZoomHandle_.style.left = r - l + "px", this.leftZoomHandle_.style.top = s + "px", this.rightZoomHandle_.style.left = o - l + "px", this.rightZoomHandle_.style.top = this.leftZoomHandle_.style.top, this.leftZoomHandle_.style.visibility = "visible", this.rightZoomHandle_.style.visibility = "visible";
            }, d.prototype.drawInteractiveLayer_ = function () {
              var t = this.fgcanvas_ctx_;t.clearRect(0, 0, this.canvasRect_.w, this.canvasRect_.h);var e = 1,
                  a = this.canvasRect_.w - e,
                  i = this.canvasRect_.h - e,
                  n = this.getZoomHandleStatus_();if (t.strokeStyle = this.getOption_("rangeSelectorForegroundStrokeColor"), t.lineWidth = this.getOption_("rangeSelectorForegroundLineWidth"), n.isZoomed) {
                var r = Math.max(e, n.leftHandlePos - this.canvasRect_.x),
                    o = Math.min(a, n.rightHandlePos - this.canvasRect_.x);t.fillStyle = "rgba(240, 240, 240, " + this.getOption_("rangeSelectorAlpha").toString() + ")", t.fillRect(0, 0, r, this.canvasRect_.h), t.fillRect(o, 0, this.canvasRect_.w - o, this.canvasRect_.h), t.beginPath(), t.moveTo(e, e), t.lineTo(r, e), t.lineTo(r, i), t.lineTo(o, i), t.lineTo(o, e), t.lineTo(a, e), t.stroke();
              } else t.beginPath(), t.moveTo(e, e), t.lineTo(e, i), t.lineTo(a, i), t.lineTo(a, e), t.stroke();
            }, d.prototype.getZoomHandleStatus_ = function () {
              var t = this.leftZoomHandle_.width / 2,
                  e = parseFloat(this.leftZoomHandle_.style.left) + t,
                  a = parseFloat(this.rightZoomHandle_.style.left) + t;return { leftHandlePos: e, rightHandlePos: a, isZoomed: e - 1 > this.canvasRect_.x || a + 1 < this.canvasRect_.x + this.canvasRect_.w };
            }, a.default = d, e.exports = a.default;
          }, { "../dygraph-interaction-model": 12, "../dygraph-utils": 17, "../iframe-tarp": 19 }] }, {}, [18])(18);
      });
      //# sourceMappingURL=dist/dygraph.min.js.map
    }
  };
});
//# sourceMappingURL=dygraph.js.map
