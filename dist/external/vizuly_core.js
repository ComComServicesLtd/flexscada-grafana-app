"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var vizuly;
  return {
    setters: [],
    execute: function () {
      vizuly = {};
      vizuly.version = "1.0", vizuly.color = {}, vizuly.color.shift = function (a, b) {
        return a = "0x" + a.replace("#", ""), a = parseInt(a, 16), a += 65793, a |= b, "#" + a.toString(16);
      }, vizuly.format = {}, vizuly.format.YEAR_Mon_MonDay = d3.time.format.multi([[".%L", function (a) {
        return a.getMilliseconds();
      }], [":%S", function (a) {
        return a.getSeconds();
      }], ["%I:%M", function (a) {
        return a.getMinutes();
      }], ["%I %p", function (a) {
        return a.getHours();
      }], ["%a %d", function (a) {
        return a.getDay() && 1 != a.getDate();
      }], ["%b %d", function (a) {
        return 1 != a.getDate();
      }], ["%b", function (a) {
        return a.getMonth();
      }], ["20%y", function (a) {
        return !0;
      }]]), vizuly.util = {}, vizuly.util.size = function (a, b, c) {
        return size = {}, size.width = b - vizuly.util.measure(a.left, b) - vizuly.util.measure(a.right, b), size.height = c - vizuly.util.measure(a.top, c) - vizuly.util.measure(a.bottom, c), size.top = vizuly.util.measure(a.top, c), size.left = vizuly.util.measure(a.left, b), size;
      }, vizuly.util.getTypedScale = function (a) {
        var b;return b = "string" == typeof a ? d3.scale.ordinal() : a instanceof Date ? d3.time.scale() : d3.scale.linear();
      }, vizuly.util.setRange = function (a, b, c) {
        "string" == typeof a.domain()[0] ? a.rangeBands([b, c], 0) : a.range([b, c]);
      }, vizuly.util.measure = function (a, b) {
        if ("string" == typeof a && "%" == a.substr(a.length - 1)) {
          var c = Math.min(Number(a.substr(0, a.length - 1)), 100) / 100;return Math.round(b * c);
        }return a;
      }, vizuly.util.guid = function () {
        return "vzxxxxxxxx".replace(/[xy]/g, function (a) {
          var b = 16 * Math.random() | 0,
              c = "x" === a ? b : 3 & b | 8;return c.toString(16);
        });
      }, vizuly.util.getDefs = function (a) {
        return defs = a.selection().selectAll("svg defs"), defs[0].length < 1 && (defs = a.selection().select("svg").append("defs")), defs;
      }, vizuly.viz = {}, vizuly.viz.create = function (a, b, c, d) {
        b.parent = a, b.selection = d3.select(a).append("div").style("width", "100%").style("height", "100%"), b.properties = c, b.id = vizuly.util.guid();var e = [];e.push("mouseover"), e.push("mouseout"), e.push("mousedown"), e.push("click"), e.push("touch"), e.push("zoom"), e.push("zoomstart"), e.push("zoomend"), e.push("initialize"), e.push("validate"), e.push("measure"), e.push("update"), Object.getOwnPropertyNames(c).forEach(function (a, b, c) {
          e.push(a + "_change");
        }), d && d.length > 0 && d.forEach(function (a) {
          e.push(a);
        }), b.dispatch = d3.dispatch.apply(this, e);var f = function f() {
          return setProps(f, b, b.properties), f;
        };return setProps = function setProps(a, b, c) {
          Object.getOwnPropertyNames(c).forEach(function (d, e, f) {
            "undefined" == typeof b[d] && (b[d] = c[d], a[d] = function (c) {
              if (!arguments.length) return b[d];var e = b[d];return b[d] = c, b[d] !== e && b.dispatch[d + "_change"].apply(this, [b[d], e]), a;
            });
          });
        }, f.id = function () {
          return b.id;
        }, f.selection = function () {
          return b.selection;
        }, f.on = function (a, c) {
          return b.dispatch.on(a, c), f;
        }, f.validate = function () {
          if (!a) {
            var a = [];if (Object.getOwnPropertyNames(c).forEach(function (c) {
              !b[c] && Number(0 != b[c]) && a.push(c);
            }), a.length > 0) throw new Error("vizuly.util.viz.validate(): " + a.concat() + " need to be declared");b.dispatch.validate();
          }
        }, f();
      }, vizuly.svg = {}, vizuly.svg.filter = {}, vizuly.svg.filter.dropShadow = function (a, b, c, d) {
        var e = Math.round(100 * b) + "_" + Math.round(100 * c) + "_" + Math.round(100 * d),
            f = a.id(),
            g = vizuly.util.getDefs(a),
            h = g.selectAll("#vz_filter_" + f + "_" + e).data([e]).enter().append("filter").attr("id", "vz_filter_" + f + "_" + e).attr("class", "vz-svg-filter-dropShadow").attr("width", "300%").attr("height", "300%");h.append("feGaussianBlur").attr("in", "SourceAlpha").attr("stdDeviation", d), h.append("feOffset").attr("dx", b).attr("dy", c), h.append("feComponentTransfer").append("feFuncA").attr("type", "linear").attr("slope", .2);var i = h.append("feMerge");return i.append("feMergeNode"), i.append("feMergeNode").attr("in", "SourceGraphic"), "#vz_filter_" + f + "_" + e;
      }, vizuly.svg.gradient = {}, vizuly.svg.gradient.blend = function (a, b, c, d) {
        var e,
            f,
            g,
            h,
            i = String(b).replace("#", "") + String(c).replace("#", ""),
            j = "vz_gradient_blend_" + a.id() + "_" + i;"horizontal" == d ? (e = "100%", f = "0%", g = "0%", h = "0%") : (e = "0%", f = "0%", g = "100%", h = "0%");var k = vizuly.util.getDefs(a),
            l = k.selectAll("#" + j).data([i]).enter().append("linearGradient").attr("id", j).attr("class", "vz-svg-gradient-blend").attr("x1", e).attr("x2", f).attr("y1", g).attr("y2", h);return l.append("stop").attr("offset", "0%").attr("stop-color", b), l.append("stop").attr("offset", "100%").attr("stop-color", c), l = k.selectAll("#" + j);
      }, vizuly.svg.gradient.fade = function (a, b, c, d, e) {
        e || (e = [0, 1]), d || (d = [.75, .9]);var f,
            g,
            h,
            i,
            j = String(b).replace("#", ""),
            k = "vz_gradient_fade_" + a.id() + "_" + j;"horizontal" == c ? (f = "0%", g = "100%", h = "0%", i = "0%") : (f = "0%", g = "0%", h = "100%", i = "0%");var l = vizuly.util.getDefs(a),
            m = l.selectAll("#" + k).data([j]).enter().append("linearGradient").attr("id", k).attr("class", "vz-svg-gradient-fade").attr("x1", f).attr("x2", g).attr("y1", h).attr("y2", i);return m.append("stop").attr("offset", 100 * e[0] + "%").attr("stop-color", b).attr("stop-opacity", d[0]), m.append("stop").attr("offset", 100 * e[1] + "%").attr("stop-color", b).attr("stop-opacity", d[1]), m = l.selectAll("#" + k);
      }, vizuly.svg.gradient.radialFade = function (a, b, c, d) {
        d || (d = [0, 1]), c || (c = [.75, .9]);var e = String(b).replace("#", ""),
            f = "vz_gradient_radial_fade" + a.id() + "_" + e,
            g = vizuly.util.getDefs(a),
            h = g.selectAll("#" + f).data([e]).enter().append("radialGradient").attr("id", f).attr("class", "vz-svg-gradient-radial-fade");return h.append("stop").attr("offset", 100 * d[0] + "%").attr("stop-color", b).attr("stop-opacity", c[0]), h.append("stop").attr("offset", 100 * d[1] + "%").attr("stop-color", b).attr("stop-opacity", c[1]), h = g.selectAll("#" + f);
      }, vizuly.svg.gradient.darker = function (a, b, c) {
        var d,
            e,
            f,
            g,
            h = String(b).replace("#", ""),
            i = "vz_gradient_darker_" + a.id() + "_" + h;"horizontal" == c ? (d = "100%", e = "0%", f = "0%", g = "0%") : (d = "0%", e = "0%", f = "100%", g = "0%");var j = vizuly.util.getDefs(a),
            k = j.selectAll("#" + i).data([h]).enter().append("linearGradient").attr("class", "vz-gradient-darker").attr("id", i).attr("x1", d).attr("x2", e).attr("y1", f).attr("y2", g);return k.append("stop").attr("offset", "0%").attr("stop-color", b).attr("stop-opacity", .75), k.append("stop").attr("offset", "100%").attr("stop-color", d3.rgb(b).darker()).attr("stop-opacity", .9), k = j.selectAll("#" + i);
      }, vizuly.svg.text = {}, vizuly.svg.text.arcPath = function (a, b) {
        var c = .0174533,
            d = {};d.angle = b, d.startAngle = d.angle - 179 * c, d.endAngle = d.angle + 179 * c;var e = d3.svg.arc().innerRadius(a).outerRadius(a)(d),
            f = /[Mm][\d\.\-e,\s]+[Aa][\d\.\-e,\s]+/,
            g = f.exec(e)[0];return g;
      }, vizuly.component = {}, vizuly.component.layout = {}, vizuly.component.layout.CLUSTERED = "CLUSTERED", vizuly.component.layout.STACKED = "STACKED", vizuly.component.layout.OVERLAP = "OVERLAP", vizuly.component.layout.STREAM = "STREAM", vizuly.theme = {}, vizuly.skin = {}, vizuly.skin.COLUMNBAR_AXIIS = "Axiis", vizuly.skin.COLUMNBAR_NEON = "Neon", vizuly.skin.COLUMNBAR_MATERIALBLUE = "MaterialBlue", vizuly.skin.COLUMNBAR_MATERIALPINK = "MaterialPink", vizuly.theme.column_bar = function (a) {
        function b() {
          j(), "viz.chart.column" == a.type ? (k = ".vz-left-axis", l = ".vz-bottom-axis") : (l = ".vz-left-axis", k = ".vz-bottom-axis");
        }function c() {
          var b = a.width(),
              c = a.selection();m = Math.max(8, Math.round(a.width() / 65)), c.attr("class", q["class"]), c.selectAll(l + " .tick text").style("font-weight", q.ordinalAxis_font_weight).style("fill", q.labelColor).style("fill-opacity", 1).style("font-size", m + "px").style("opacity", function () {
            return b > 399 ? 1 : 0;
          }), c.selectAll(k + " line").style("stroke", q.valueAxis_line_stroke).style("stroke-width", 1).style("opacity", q.valueAxis_line_opacity), c.selectAll(k + " text").style("font-size", m + "px").style("fill", q.labelColor).style("fill-opacity", .8);var d = c.selectAll(".vz-plot .vz-bar").style("stroke", "#FFF");a.layout() == vizuly.component.layout.STACKED ? d.style("stroke-opacity", 1).style("stroke-width", function () {
            return b / 800 + "px";
          }).style("stroke-opacity", .6) : d.style("stroke-opacity", q.bar_stroke_opacity), c.selectAll(".vz-bar-group")[0].forEach(function (a, b) {
            d3.select(a).selectAll("rect.vz-bar").attr("filter", function (a, b) {
              return q.bar_filter(a, b);
            }).style("fill-opacity", function (a, b) {
              return q.bar_fill_opacity(a, b);
            }).style("fill", function (a, b) {
              return q.bar_fill(a, b);
            }).style("rx", q.barRadius);
          }), q.background_transition();
        }function d(b, c, d) {
          d3.select(b).style("fill", q.bar_mouseover_fill).style("fill-opacity", q.bar_mouseover_opacity).style("stroke", q.bar_mouseover_stroke).attr("filter", q.bar_filter_over()), d3.select(a.selection().selectAll(l + " .tick text")[0][getSeriesIndex(c)]).transition().style("font-size", 1.2 * m + "px").style("font-weight", 700).style("fill", q.color).style("text-decoration", "underline").style("fill-opacity", 1).style("opacity", 1);
        }function e(b, c, d) {
          d3.select(b).style("fill", function () {
            return q.bar_fill(c, d);
          }).style("fill-opacity", function () {
            return q.bar_fill_opacity(c, d);
          }).style("stroke", "#FFF").attr("filter", q.bar_filter()), d3.select(a.selection().selectAll(l + " .tick text")[0][getSeriesIndex(c)]).transition().style("font-size", m + "px").style("fill", q.labelColor).style("font-weight", q.ordinalAxis_font_weight).style("text-decoration", null).style("fill-opacity", 1).style("opacity", function () {
            return a.width() > 399 ? 1 : 0;
          });
        }function f() {
          a.selection().selectAll(".vz-tip").remove(), "viz.chart.column" == a.type ? a.yAxis().tickSize(-vizuly.util.size(a.margin(), a.width(), a.height()).width).ticks(5).orient("left") : a.xAxis().tickSize(-vizuly.util.size(a.margin(), a.width(), a.height()).height).ticks(5);
        }function g() {
          var b = a.width();return "url(" + vizuly.svg.filter.dropShadow(a, b / 300, b / 300, b / 200) + ")";
        }function h() {
          var b = a.width();return "url(" + vizuly.svg.filter.dropShadow(a, b / 100, b / 100, 1.5) + ")";
        }function i() {
          a.selection().selectAll(".vz-background").style("fill-opacity", 1), a.selection().selectAll(".vz-background").attr("fill", function () {
            return "url(#" + p.attr("id") + ")";
          }), p.selectAll("stop").transition().duration(500).attr("stop-color", function (a, b) {
            return 0 == b ? q.grad0 : q.grad1;
          });
        }function j() {
          o.forEach(function (b) {
            a.on(b.on, b.callback);
          });
        }var k,
            l,
            m,
            n = { MaterialBlue: { name: "Material Blue", labelColor: "#FFF", color: "#02C3FF", grad0: "#021F51", grad1: "#039FDB", background_transition: i, bar_filter: function bar_filter(a, b) {
              return g();
            }, bar_filter_over: function bar_filter_over(a, b) {
              return h();
            }, bar_fill: function bar_fill(a, b) {
              return "#02C3FF";
            }, bar_fill_opacity: function bar_fill_opacity(a, b) {
              return 1 - b / 4;
            }, bar_mouseover_stroke: "#02C3FF", bar_mouseover_fill: "#FFF", bar_stroke_opacity: 0, bar_mouseover_opacity: 1, ordinalAxis_font_weight: 200, valueAxis_line_stroke: "#FFF", valueAxis_line_opacity: .25, barRadius: function barRadius() {
              return 0;
            }, datatip_class: "vz-material-datatip", "class": "vz-skin-default" }, MaterialPink: { name: "Material Pink", labelColor: "#FFF", color: "#EF309F", grad0: "#540936", grad1: "#EF309F", background_transition: i, bar_filter: function bar_filter(a, b) {
              return g();
            }, bar_filter_over: function bar_filter_over(a, b) {
              return h();
            }, bar_fill: function bar_fill(a, b) {
              return "#FF35BE";
            }, bar_fill_opacity: function bar_fill_opacity(a, b) {
              return 1 - b / 4;
            }, bar_stroke_opacity: 0, bar_mouseover_stroke: "#FF35BE", bar_mouseover_fill: "#FFF", bar_mouseover_opacity: .9, ordinalAxis_font_weight: 200, valueAxis_line_stroke: "#FFF", valueAxis_line_opacity: .25, barRadius: function barRadius() {
              return 0;
            }, datatip_class: "vz-material-datatip", "class": "vz-skin-default" }, Neon: { name: "Neon", labelColor: "#FFF", color: "#D1F704", grad0: "#000000", grad1: "#474747", background_transition: i, bar_filter: function bar_filter(a, b) {
              return null;
            }, bar_filter_over: function bar_filter_over(a, b) {
              return h();
            }, bar_fill: function bar_fill(a, b) {
              return "#D1F704";
            }, bar_fill_opacity: function bar_fill_opacity(a, b) {
              return 1 - b / 6;
            }, bar_stroke_opacity: 0, bar_mouseover_stroke: "#D1F704", bar_mouseover_fill: "#FFF", bar_mouseover_opacity: 1, ordinalAxis_font_weight: 200, valueAxis_line_stroke: "#FFF", valueAxis_line_opacity: .25, barRadius: function barRadius() {
              return a.width() / 150;
            }, datatip_class: "vz-neon-datatip", "class": "vz-skin-default" }, Axiis: { name: "Axiis", labelColor: "#444", color: "#000", colorScale: d3.scale.linear().range(["#DF1133", "#3333DF"]).domain([0, a.data()[0].length]), background_transition: function background_transition() {
              a.selection().select(".vz-background").transition().style("fill-opacity", 0);
            }, bar_filter: function bar_filter(a, b) {
              return null;
            }, bar_filter_over: function bar_filter_over(a, b) {
              return null;
            }, bar_fill: function bar_fill(b, c) {
              var d = vizuly.svg.gradient.fade(a, vizuly.color.shift(this.colorScale(a.xScale().domain().indexOf(a.x().apply(this, [b]))), 2245632 * c));return "url(#" + d.attr("id") + ")";
            }, bar_fill_opacity: function bar_fill_opacity(a, b) {
              return 1 - b / 4;
            }, bar_mouseover_stroke: "#AAA", bar_mouseover_fill: "#000", bar_mouseover_opacity: .8, bar_stroke_opacity: 1, ordinalAxis_font_weight: 400, valueAxis_line_stroke: "#AAA", valueAxis_line_opacity: 1, barRadius: function barRadius() {
              return 0;
            }, datatip_class: "vz-axiis-datatip", "class": "vz-skin-axiis" }, Minimal: { name: "Minimal", labelColor: "#444", color: "#333", grad0: "#F0F0F0", grad1: "#F0F0F0", background_transition: i, bar_filter: function bar_filter(a, b) {
              return null;
            }, bar_filter_over: function bar_filter_over(a, b) {
              return null;
            }, bar_fill: function bar_fill(a, b) {
              return "#555";
            }, bar_fill_opacity: function bar_fill_opacity(a, b) {
              return 1 - b / 4;
            }, bar_stroke_opacity: 0, bar_mouseover_stroke: "#000", bar_mouseover_fill: "#333", bar_mouseover_opacity: 1, ordinalAxis_font_weight: 400, valueAxis_line_stroke: "#AAA", valueAxis_line_opacity: .35, barRadius: function barRadius() {
              return 0;
            }, datatip_class: "vz-minimal-datatip", "class": "vz-skin-default" } },
            a = a,
            o = [{ on: "measure.theme", callback: f }, { on: "update.theme", callback: c }, { on: "mouseover.theme", callback: d }, { on: "mouseout.theme", callback: e }];b();var p = vizuly.svg.gradient.blend(a, "#000", "#000");b.apply = function (a) {
          return arguments.length > 0 && b.skin(a), c(), b;
        }, b.release = function () {
          a && (a.selection().attr("class", null), o.forEach(function (b) {
            a.on(b.on, null);
          }), a = null);
        }, b.viz = function (b) {
          return arguments.length ? (a = b, void j()) : a;
        };var q = null;return b.skin = function (a) {
          if (0 == arguments.length) return q;if (!n[a]) throw new Error("theme/column_bar.js - skin " + a + " does not exist.");return q = n[a], b;
        }, b.skins = function () {
          return n;
        }, b;
      }, vizuly.skin.LINEAREA_AXIIS = "Axiis", vizuly.skin.LINEAREA_NEON = "Neon", vizuly.skin.LINEAREA_FIRE = "Fire", vizuly.skin.LINEAREA_OCEAN = "Ocean", vizuly.skin.LINEAREA_SUNSET = "Sunset", vizuly.skin.LINEAREA_BUSINESS = "Business", vizuly.theme.radial_linearea = function (a) {
        function b() {
          h();
        }function c() {
          if (i) {
            var b = a.selection();b.attr("class", i["class"]), b.selectAll(".vz-background").attr("fill", function () {
              return "url(#" + j.attr("id") + ")";
            }), b.selectAll(".vz-plot-background").style("opacity", 0), b.selectAll(".vz-area").style("fill", function (a, b) {
              return i.area_fill(a, b);
            }).style("fill-opacity", function (b, c) {
              return i.area_fill_opacity.apply(a, [b, c]);
            }), b.selectAll(".vz-line").style("stroke-width", function () {
              return a.outerRadius() / 450;
            }).style("stroke", function (a, b) {
              return i.line_stroke(a, b);
            }).style("opacity", function (b, c) {
              return i.line_opacity.apply(a, [b, c]);
            }), b.selectAll(".vz-data-point").style("opacity", 0), b.selectAll(".vz-radial-x-axis-tick").style("font-weight", i.xAxis_font_weight).style("fill", i.labelColor).style("font-weight", 300).style("fill-opacity", .4).style("font-size", Math.max(8, Math.round(a.outerRadius() / 25)) + "px"), b.selectAll(".vz-y-axis-tick").style("stroke", i.yAxis_line_stroke).style("stroke-width", 1).style("opacity", i.yAxis_line_opacity), b.selectAll(".vz-y-axis-tick-label").style("font-size", Math.max(8, Math.round(a.outerRadius() / 30)) + "px").style("fill", i.labelColor).style("font-weight", 200).style("fill-opacity", function () {
              return i === m.Business ? 1 : .4;
            }), i.background_transition();
          }
        }function d(b, c, d) {
          a.selection().selectAll(".vz-line").transition().style("stroke-width", function () {
            return a.outerRadius() / 270;
          }).style("stroke", function (a, b) {
            return i.line_over_stroke(a, b);
          }).style("opacity", function (a, b) {
            return b == d ? 1 : 0;
          }), a.selection().selectAll(".vz-area").transition().style("opacity", function (a, b) {
            return b == d ? 1 : .35;
          }), a.selection().selectAll(".vz-plot").append("circle").attr("class", "vz-yAxis-mouseover").attr("cx", 0).attr("cy", 0).attr("r", function () {
            return a.radiusScale()(b.y + b.y0);
          }).style("stroke", "#FFF").style("fill", "none").style("stroke-dasharray", function () {
            return a.outerRadius() / 80 + "," + a.outerRadius() / 80;
          }), a.selection().selectAll(".vz-y-axis-tick").style("opacity", .1), a.selection().selectAll(".vz-point-tip").remove();var e = d3.select(this);e.append("circle").attr("class", "vz-point-tip").attr("r", 4).style("fill", "#000").style("stroke", "#FFF").style("stroke-width", 2).style("pointer-events", "none");
        }function e(b, c, d) {
          a.selection().selectAll(".vz-line").transition().style("stroke-width", function () {
            return a.outerRadius() / 450;
          }).style("stroke", function (a, b) {
            return i.line_stroke(a, b);
          }).style("opacity", function (b, c) {
            return i.line_opacity.apply(a, [b, c]);
          }), a.selection().selectAll(".vz-area").transition().style("opacity", 1), a.selection().selectAll(".vz-yAxis-mouseover").remove(), a.selection().selectAll(".vz-point-tip").remove(), a.selection().selectAll(".vz-y-axis-tick").style("opacity", i.yAxis_line_opacity);
        }function f() {
          a.yAxis().tickSize(a.outerRadius()).ticks(a.layout() == vizuly.component.layout.OVERLAP ? 5 : 7).orient("left");
        }function g() {
          a.selection().selectAll(".vz-background").style("fill-opacity", 1), j.selectAll("stop").transition().duration(500).attr("stop-color", function (a, b) {
            return 0 == b ? i.grad0 : i.grad1;
          });
        }function h() {
          l.forEach(function (b) {
            a.on(b.on, b.callback);
          });
        }var a = a,
            i = null,
            j = vizuly.svg.gradient.blend(a, "#000", "#000"),
            k = d3.scale.category20(),
            l = [{ on: "measure.theme", callback: f }, { on: "update.theme", callback: c }, { on: "mouseover.theme", callback: d }, { on: "mouseout.theme", callback: e }];b(), b.apply = function (a) {
          return arguments.length > 0 && b.skin(a), c(), b;
        }, b.release = function () {
          a && (a.selection().attr("class", null), l.forEach(function (b) {
            a.on(b.on, null);
          }), a = null);
        }, b.viz = function (b) {
          return arguments.length ? (a = b, void h()) : a;
        }, b.skin = function (a) {
          if (0 == arguments.length) return i;if (!m[a]) throw new Error("theme/linearea.js - skin " + a + " does not exist.");return i = m[a], b;
        }, b.skins = function () {
          return m;
        };var m = { Fire: { name: "Fire", labelColor: "#FFF", color: "#02C3FF", stroke_colors: ["#FFA000", "#FF5722", "#F57C00", "#FF9800", "#FFEB3B"], fill_colors: ["#C50A0A", "#C2185B", "#F57C00", "#FF9800", "#FFEB3B"], grad0: "#000000", grad1: "#474747", background_transition: g, line_stroke: function line_stroke(a, b) {
              return this.stroke_colors[b % 5];
            }, line_over_stroke: function line_over_stroke(a, b) {
              return d3.rgb(this.stroke_colors[b % 5]).brighter();
            }, line_opacity: function line_opacity(a, b) {
              return this.layout() == vizuly.component.layout.STREAM ? .4 : .6;
            }, area_fill: function area_fill(b, c) {
              return "url(#" + vizuly.svg.gradient.radialFade(a, this.fill_colors[c % 5], [1, .35]).attr("id") + ")";
            }, area_fill_opacity: function area_fill_opacity(a, b) {
              return this.layout() == vizuly.component.layout.OVERLAP ? .7 : .9;
            }, xAxis_font_weight: 200, yAxis_line_stroke: "#FFF", yAxis_line_opacity: .25, "class": "vz-skin-default" }, Sunset: { name: "Sunset", labelColor: "#D8F433", color: "#02C3FF", stroke_colors: ["#CD57A4", "#B236A3", "#FA6F7F", "#FA7C3B", "#E96B6B"], fill_colors: ["#89208F", "#C02690", "#D93256", "#DB3D0C", "#B2180E"], grad1: "#7D1439", grad0: "#000", background_transition: g, line_stroke: function line_stroke(a, b) {
              return this.stroke_colors[b % 5];
            }, line_over_stroke: function line_over_stroke(a, b) {
              return d3.rgb(this.stroke_colors[b % 5]).brighter();
            }, line_opacity: function line_opacity(a, b) {
              return this.layout() == vizuly.component.layout.STREAM ? .4 : .9;
            }, area_fill: function area_fill(b, c) {
              return "url(#" + vizuly.svg.gradient.radialFade(a, this.fill_colors[c % 5], [1, .35]).attr("id") + ")";
            }, area_fill_opacity: function area_fill_opacity(a, b) {
              return this.layout() == vizuly.component.layout.OVERLAP ? .8 : 1;
            }, xAxis_font_weight: 200, yAxis_line_stroke: "#D8F433", yAxis_line_opacity: .25, "class": "vz-skin-default" }, Ocean: { name: "Ocean", labelColor: "#FFF", color: "#02C3FF", stroke_colors: ["#001432", "#001432", "#001432", "#001432", "#001432"], grad1: "#390E1D", grad0: "#92203A", background_transition: function background_transition(b) {
              a.selection().select(".vz-background").transition(1e3).style("fill-opacity", 0);
            }, line_stroke: function line_stroke(a, b) {
              return "#FFF";
            }, line_over_stroke: function line_over_stroke(a, b) {
              return "#FFF";
            }, line_opacity: function line_opacity(a, b) {
              return .3;
            }, area_fill: function area_fill(b, c) {
              return "url(#" + vizuly.svg.gradient.radialFade(a, "#FFF", [1, .35]).attr("id") + ")";
            }, area_fill_opacity: function area_fill_opacity(a, b) {
              return this.layout() == vizuly.component.layout.OVERLAP ? .2 : .7;
            }, xAxis_font_weight: 200, yAxis_line_stroke: "#FFF", yAxis_line_opacity: .25, "class": "vz-skin-ocean" }, Neon: { name: "Neon", labelColor: "#FFF", color: "#02C3FF", stroke_colors: ["#FFA000", "#FF5722", "#F57C00", "#FF9800", "#FFEB3B"], fill_colors: ["#C50A0A", "#C2185B", "#F57C00", "#FF9800", "#FFEB3B"], grad0: "#000000", grad1: "#474747", background_transition: g, line_stroke: function line_stroke(a, b) {
              return "#FFF";
            }, line_over_stroke: function line_over_stroke(a, b) {
              return "#FFF";
            }, line_opacity: function line_opacity(a, b) {
              return this.layout() == vizuly.component.layout.STREAM ? .2 : .4;
            }, area_fill: function area_fill(a, b) {
              return "#D1F704";
            }, area_fill_opacity: function area_fill_opacity(b, c) {
              var d = d3.scale.linear().range([.1, .8]).domain([0, a.data().length])(c);return this.layout() == vizuly.component.layout.OVERLAP ? .8 * d : d;
            }, xAxis_font_weight: 200, yAxis_line_stroke: "#FFF", yAxis_line_opacity: .25, "class": "vz-skin-default" }, Business: { name: "Business", labelColor: "#000", color: "#000", stroke_colors: ["#FFA000", "#FF5722", "#F57C00", "#FF9800", "#FFEB3B"], fill_colors: ["#C50A0A", "#C2185B", "#F57C00", "#FF9800", "#FFEB3B"], grad0: "#CCC", grad1: "#CCC", background_transition: g, line_stroke: function line_stroke(a, b) {
              return d3.rgb(k(b)).darker();
            }, line_over_stroke: function line_over_stroke(a, b) {
              return "#FFF";
            }, line_opacity: function line_opacity(a, b) {
              return .7;
            }, area_fill: function area_fill(a, b) {
              return k(b);
            }, area_fill_opacity: function area_fill_opacity(a, b) {
              return this.layout() == vizuly.component.layout.OVERLAP ? .9 : .95;
            }, xAxis_font_weight: 200, yAxis_line_stroke: "#000", yAxis_line_opacity: .25, "class": "vz-skin-default" } };return b;
      }, vizuly.skin.HALO_FIRE = "Fire", vizuly.skin.HALO_SUNSET = "Sunset", vizuly.skin.HALO_NEON = "Neon", vizuly.skin.HALO_OCEAN = "Ocean", vizuly.theme.halo = function (a) {
        function b() {
          r();
        }function c() {
          if (s && a) {
            var b = a.selection();b.attr("class", s["class"]), b.selectAll(".vz-background").attr("fill", function () {
              return "url(#" + t.attr("id") + ")";
            }), b.selectAll(".vz-plot-background").style("opacity", 0), b.selectAll(".vz-halo-link-path").style("fill", function (a, b) {
              return s.link_fill(a, b);
            }).style("fill-opacity", s.link_fill_opacity).style("stroke", function (a, b) {
              return s.link_stroke(a, b);
            }), b.selectAll(".vz-halo-link-node").style("fill", function (a, b) {
              return s.link_fill(a, b);
            }).style("fill-opacity", s.link_node_fill_opacity), b.selectAll(".vz-halo-node").style("fill", function (a, b) {
              return s.node_fill(a, b);
            }).style("stroke", function (a, b) {
              return s.node_stroke(a, b);
            }).style("stroke-width", function (a, b) {
              return u(a.r);
            }), b.selectAll(".vz-halo-arc-slice").style("fill", function (a, b) {
              return s.arc_fill(a, b);
            }), b.selectAll(".vz-halo-arc").style("fill", function (a, b) {
              return s.arc_fill(a, b);
            }), s.background_transition();
          }
        }function d(b, c, d) {
          h(), n(d3.select(b)), i(a.selection().selectAll(".vz-halo-link-path.halo-key_" + c.data.key)), c.data.values.forEach(function (b) {
            k(a.selection().selectAll(".vz-halo-node.node-key_" + a.nodeKey()(b)));
          });
        }function e(b, c, d) {
          h(), i(d3.select(b.parentNode).selectAll(".vz-halo-link-path")), n(a.selection().selectAll(".vz-halo-arc.halo-key_" + a.haloKey()(c.data))), m(d3.select(b.parentNode).selectAll(".vz-halo-arc-slice")), j(a.selection().selectAll(".vz-halo-node.node-key_" + a.nodeKey()(c.data))), l(d3.select(b.parentNode).selectAll("circle"));
        }function f(b, c, d) {
          h();var e = a.selection().selectAll(".vz-halo-link-path.node-key_" + c.key);e.each(function (b) {
            var c = a.selection().selectAll(".vz-halo-arc.halo-key_" + a.haloKey()(b.data));n(c);
          }), i(e), m(a.selection().selectAll(".vz-halo-arc-slice.node-key_" + c.key)), l(a.selection().selectAll(".vz-halo-node.node-key_" + c.key));
        }function g(a, b, c) {
          o();
        }function h() {
          a.selection().selectAll(".vz-halo-node").style("fill-opacity", .1).style("stroke-opacity", .05), a.selection().selectAll(".vz-halo-link-node").style("fill-opacity", 0), a.selection().selectAll(".vz-halo-link-path").style("fill-opacity", .025);
        }function i(a) {
          a.style("fill-opacity", .6).style("stroke-opacity", .25);
        }function j(a) {
          a.style("stroke-opacity", .8).style("stroke", function (a, b) {
            return s.node_over_stroke(a, b);
          });
        }function k(a) {
          a.style("fill-opacity", .8).style("stroke-opacity", .5).style("stroke", function (a, b) {
            return s.node_over_stroke(a, b);
          });
        }function l(a) {
          a.style("fill-opacity", .5).style("stroke-opacity", .7).style("stroke", function (a, b) {
            return s.node_over_stroke(a, b);
          });
        }function m(a) {
          a.style("fill-opacity", .8).style("stroke-opacity", .8);
        }function n(a) {
          a.style("fill-opacity", .65).style("stroke-opacity", .8).style("fill", function (a, b) {
            return s.arc_over_fill(a, b);
          });
        }function o() {
          a.selection().selectAll(".vz-halo-arc").style("fill-opacity", null).style("stroke-opacity", null).style("fill", function (a, b) {
            return s.arc_fill(a, b);
          }), a.selection().selectAll(".vz-halo-node").style("fill-opacity", null).style("stroke-opacity", null).style("stroke", function (a, b) {
            return s.node_stroke(a, b);
          }), a.selection().selectAll(".vz-halo-link-node").style("fill-opacity", s.link_node_fill_opacity).style("stroke", null), a.selection().selectAll(".vz-halo-link-path").style("fill-opacity", s.link_fill_opacity).style("stroke-opacity", null), a.selection().selectAll(".vz-halo-arc-slice").style("fill-opacity", null).style("stroke-opacity", null);
        }function p() {
          var b = Math.min(a.width(), a.height() / 2);u.domain([0, b / 20]), u.range([0, b / 80]);
        }function q() {
          a.selection().selectAll(".vz-background").style("fill-opacity", 1), t.selectAll("stop").transition().duration(500).attr("stop-color", function (a, b) {
            return 0 == b ? s.grad0 : s.grad1;
          });
        }function r() {
          v.forEach(function (b) {
            a.on(b.on, b.callback);
          });
        }var a = a,
            s = null,
            t = vizuly.svg.gradient.blend(a, "#000", "#000"),
            u = d3.scale.linear(),
            v = [{ on: "measure.theme", callback: p }, { on: "update.theme", callback: c }, { on: "nodeover.theme", callback: f }, { on: "nodeout.theme", callback: g }, { on: "arcover.theme", callback: d }, { on: "arcout.theme", callback: g }, { on: "linkover.theme", callback: e }, { on: "linkout.theme", callback: g }];b(), b.apply = function (a) {
          return arguments.length > 0 && b.skin(a), c(), b;
        }, b.release = function () {
          a && (a.selection().attr("class", null), v.forEach(function (b) {
            a.on(b.on, null);
          }), a = null);
        }, b.viz = function (b) {
          return arguments.length ? (a = b, void r()) : a;
        }, b.skin = function (a) {
          if (0 == arguments.length) return s;if (!w[a]) throw new Error("theme/linearea.js - skin " + a + " does not exist.");return s = w[a], b;
        }, b.skins = function () {
          return w;
        };var w = { Fire: { name: "Fire", labelColor: "#FFF", labelFill: "#C50A0A", stroke_colors: ["#FFA000", "#FF5722", "#F57C00", "#FF9800", "#FFEB3B"], fill_colors: ["#C50A0A", "#C2185B", "#F57C00", "#FF9800", "#FFEB3B"], grad0: "#000000", grad1: "#474747", background_transition: q, link_stroke: function link_stroke(a, b) {
              return this.stroke_colors[b % 5];
            }, link_fill: function link_fill(a, b) {
              return this.fill_colors[b % 5];
            }, link_fill_opacity: .1, link_node_fill_opacity: .1, node_stroke: function node_stroke(a, b) {
              return this.stroke_colors[b % 5];
            }, node_over_stroke: function node_over_stroke(a, b) {
              return "#FFF";
            }, node_fill: function node_fill(a, b) {
              return this.fill_colors[b % 5];
            }, arc_stroke: function arc_stroke(a, b) {
              return "#FFF";
            }, arc_fill: function arc_fill(a, b) {
              return this.fill_colors[b % 5];
            }, arc_over_fill: function arc_over_fill(a, b) {
              return "#FFEB3B";
            }, "class": "vz-skin-fire" }, Sunset: { name: "Sunset", labelColor: "#FFF", labelFill: "#00236C", stroke_colors: ["#CD57A4", "#B236A3", "#FA6F7F", "#FA7C3B", "#E96B6B"], fill_colors: ["#89208F", "#C02690", "#D93256", "#DB3D0C", "#B2180E"], grad0: "#220910", grad1: "#571825", background_transition: q, link_stroke: function link_stroke(a, b) {
              return this.stroke_colors[b % 5];
            }, link_fill: function link_fill(a, b) {
              return this.fill_colors[b % 5];
            }, link_fill_opacity: .2, link_node_fill_opacity: .5, node_stroke: function node_stroke(a, b) {
              return this.stroke_colors[b % 5];
            }, node_over_stroke: function node_over_stroke(a, b) {
              return "#FFF";
            }, node_fill: function node_fill(a, b) {
              return this.fill_colors[b % 5];
            }, arc_stroke: function arc_stroke(a, b) {
              return "#FFF";
            }, arc_fill: function arc_fill(a, b) {
              return this.fill_colors[b % 5];
            }, arc_over_fill: function arc_over_fill(a, b) {
              return "#00236C";
            }, "class": "vz-skin-sunset" }, Neon: { name: "Neon", labelColor: "#FFF", labelFill: "#005", grad0: "#000000", grad1: "#474747", background_transition: q, link_stroke: function link_stroke(a, b) {
              return "#D1F704";
            }, link_fill: function link_fill(a, b) {
              return "#D1F704";
            }, link_fill_opacity: .1, link_node_fill_opacity: .1, node_stroke: function node_stroke(a, b) {
              return "#D1F704";
            }, node_over_stroke: function node_over_stroke(a, b) {
              return "#FFF";
            }, node_fill: function node_fill(a, b) {
              return "#FFF";
            }, arc_stroke: function arc_stroke(a, b) {
              return "#FFF";
            }, arc_fill: function arc_fill(a, b) {
              return "#D1F704";
            }, arc_over_fill: function arc_over_fill(a, b) {
              return "#03F";
            }, "class": "vz-skin-neon" }, Ocean: { name: "Ocean", labelColor: "#FFF", labelFill: "#000", background_transition: function background_transition(b) {
              a.selection().select(".vz-background").transition(1e3).style("fill-opacity", 0);
            }, link_stroke: function link_stroke(a, b) {
              return "#FFF";
            }, link_fill: function link_fill(a, b) {
              return "#FFF";
            }, link_fill_opacity: .075, link_node_fill_opacity: .075, node_stroke: function node_stroke(a, b) {
              return "#FFF";
            }, node_over_stroke: function node_over_stroke(a, b) {
              return "#FFF";
            }, node_fill: function node_fill(a, b) {
              return "#FFF";
            }, arc_stroke: function arc_stroke(a, b) {
              return "#FFF";
            }, arc_fill: function arc_fill(a, b) {
              return "#FFF";
            }, arc_over_fill: function arc_over_fill(a, b) {
              return "#000";
            }, "class": "vz-skin-ocean" } };return b;
      }, vizuly.skin.LINEAREA_AXIIS = "Axiis", vizuly.skin.LINEAREA_NEON = "Neon", vizuly.skin.LINEAREA_FIRE = "Fire", vizuly.skin.LINEAREA_OCEAN = "Ocean", vizuly.skin.LINEAREA_SUNSET = "Sunset", vizuly.skin.LINEAREA_BUSINESS = "Business", vizuly.theme.linearea = function (a) {
        function b() {
          h();
        }function c() {
          if (i && null != i) {
            var b = a.width(),
                c = a.height(),
                d = a.selection();d.attr("class", i["class"]), d.selectAll(".vz-background").attr("fill", function () {
              return "url(#" + j.attr("id") + ")";
            }), d.selectAll(".vz-plot-background").style("opacity", 0), d.selectAll(".vz-area").style("fill", function (a, b) {
              return i.area_fill(a, b);
            }).style("fill-opacity", function (b, c) {
              return i.area_fill_opacity.apply(a, [b, c]);
            }), d.selectAll(".vz-line").style("stroke-width", function () {
              return c / 450;
            }).style("stroke", function (a, b) {
              return i.line_stroke(a, b);
            }).style("opacity", function (b, c) {
              return i.line_opacity.apply(a, [b, c]);
            }), d.selectAll(".vz-data-point").style("opacity", 0), d.selectAll(".vz-bottom-axis").style("font-weight", i.xAxis_font_weight).style("fill", i.labelColor).style("font-weight", 300).style("fill-opacity", .8).style("font-size", Math.max(8, Math.round(b / 65)) + "px").style("opacity", function () {
              return b > 399 ? 1 : 0;
            }), d.selectAll(".vz-left-axis line").style("stroke", i.yAxis_line_stroke).style("stroke-width", 1).style("opacity", i.yAxis_line_opacity), d.selectAll(".vz-left-axis text").style("font-size", Math.max(8, Math.round(b / 65)) + "px").style("fill", i.labelColor).style("fill-opacity", .8), i.background_transition();
          }
        }function d(b, c, d) {
          a.selection().selectAll(".vz-line").transition().style("stroke", function (a, b) {
            return i.line_over_stroke(a, b);
          }).style("opacity", function (a, b) {
            return b == d ? 1 : 0;
          }), a.selection().selectAll(".vz-area").transition().style("opacity", function (a, b) {
            return b == d ? 1 : .35;
          }), a.selection().selectAll(".vz-point-tip").remove();var e = d3.select(this);e.append("circle").attr("class", "vz-point-tip").attr("r", 4).style("fill", "#000").style("stroke", "#FFF").style("stroke-width", 2).style("pointer-events", "none");
        }function e(b, c, d) {
          a.selection().selectAll(".vz-line").transition().style("stroke", function (a, b) {
            return i.line_stroke(a, b);
          }).style("opacity", function (b, c) {
            return i.line_opacity.apply(a, [b, c]);
          }), a.selection().selectAll(".vz-area").transition().style("opacity", 1), a.selection().selectAll(".vz-point-tip").remove();
        }function f() {
          a.yAxis().tickSize(-vizuly.util.size(a.margin(), a.width(), a.height()).width).ticks(5).orient("left"), a.xAxis().tickSize(-vizuly.util.size(a.margin(), a.width(), a.height()).width);
        }function g() {
          a.selection().selectAll(".vz-background").style("fill-opacity", 1), j.selectAll("stop").transition().duration(500).attr("stop-color", function (a, b) {
            return 0 == b ? i.grad0 : i.grad1;
          });
        }function h() {
          l.forEach(function (b) {
            a.on(b.on, b.callback);
          });
        }var a = a,
            i = null,
            j = vizuly.svg.gradient.blend(a, "#000", "#000"),
            k = d3.scale.category20(),
            l = [{ on: "measure.theme", callback: f }, { on: "update.theme", callback: c }, { on: "mouseover.theme", callback: d }, { on: "mouseout.theme", callback: e }];b(), b.apply = function (a) {
          return arguments.length > 0 && b.skin(a), c(), b;
        }, b.release = function () {
          a && (a.selection().attr("class", null), l.forEach(function (b) {
            a.on(b.on, null);
          }), a = null);
        }, b.viz = function (b) {
          return arguments.length ? (a = b, void h()) : a;
        }, b.skin = function (a) {
          if (0 == arguments.length) return i;if (!m[a]) throw new Error("theme/linearea.js - skin " + a + " does not exist.");return i = m[a], b;
        }, b.skins = function () {
          return m;
        };var m = { Fire: { name: "Fire", labelColor: "#FFF", color: "#02C3FF", stroke_colors: ["#FFA000", "#FF5722", "#F57C00", "#FF9800", "#FFEB3B"], fill_colors: ["#C50A0A", "#C2185B", "#F57C00", "#FF9800", "#FFEB3B"], grad0: "#000000", grad1: "#474747", background_transition: g, line_stroke: function line_stroke(a, b) {
              return this.stroke_colors[b % 5];
            }, line_over_stroke: function line_over_stroke(a, b) {
              return d3.rgb(this.stroke_colors[b % 5]).brighter();
            }, line_opacity: function line_opacity(a, b) {
              return this.layout() == vizuly.component.layout.STREAM ? .6 : .8;
            }, area_fill: function area_fill(b, c) {
              return "url(#" + vizuly.svg.gradient.fade(a, this.fill_colors[c % 5], "vertical", [.35, 1]).attr("id") + ")";
            }, area_fill_opacity: function area_fill_opacity(a, b) {
              return this.layout() == vizuly.component.layout.OVERLAP ? .7 : .9;
            }, xAxis_font_weight: 200, yAxis_line_stroke: "#FFF", yAxis_line_opacity: .25,
            data_point_stroke: function data_point_stroke(a, b) {
              return this.stroke_colors[b % 5];
            }, data_point_fill: function data_point_fill(a, b) {
              return "#FFF";
            }, "class": "vz-skin-default" }, Sunset: { name: "Sunset", labelColor: "#D8F433", color: "#02C3FF", stroke_colors: ["#CD57A4", "#B236A3", "#FA6F7F", "#FA7C3B", "#E96B6B"], fill_colors: ["#89208F", "#C02690", "#D93256", "#DB3D0C", "#B2180E"], grad1: "#390E1D", grad0: "#92203A", background_transition: g, line_stroke: function line_stroke(a, b) {
              return this.stroke_colors[b % 5];
            }, line_over_stroke: function line_over_stroke(a, b) {
              return d3.rgb(this.stroke_colors[b % 5]).brighter();
            }, line_opacity: function line_opacity(a, b) {
              return this.layout() == vizuly.component.layout.STREAM ? .4 : .9;
            }, area_fill: function area_fill(b, c) {
              return "url(#" + vizuly.svg.gradient.fade(a, this.fill_colors[c % 5], "vertical", [.5, 1]).attr("id") + ")";
            }, area_fill_opacity: function area_fill_opacity(a, b) {
              return this.layout() == vizuly.component.layout.OVERLAP ? .8 : 1;
            }, xAxis_font_weight: 200, yAxis_line_stroke: "#D8F433", yAxis_line_opacity: .25, "class": "vz-skin-default" }, Ocean: { name: "Ocean", labelColor: "#FFF", color: "#02C3FF", stroke_colors: ["#001432", "#001432", "#001432", "#001432", "#001432"], grad1: "#390E1D", grad0: "#92203A", background_transition: function background_transition(b) {
              a.selection().select(".vz-background").transition(1e3).style("fill-opacity", 0);
            }, line_stroke: function line_stroke(a, b) {
              return "#000";
            }, line_over_stroke: function line_over_stroke(a, b) {
              return "#FFF";
            }, line_opacity: function line_opacity(a, b) {
              return .3;
            }, area_fill: function area_fill(a, b) {
              return "#FFF";
            }, area_fill_opacity: function area_fill_opacity(b, c) {
              return (c + 1) / a.data().length * (this.layout() == vizuly.component.layout.OVERLAP ? .8 : .85);
            }, xAxis_font_weight: 200, yAxis_line_stroke: "#FFF", yAxis_line_opacity: .25, "class": "vz-skin-ocean" }, Neon: { name: "Neon", labelColor: "#FFF", color: "#02C3FF", stroke_colors: ["#FFA000", "#FF5722", "#F57C00", "#FF9800", "#FFEB3B"], fill_colors: ["#C50A0A", "#C2185B", "#F57C00", "#FF9800", "#FFEB3B"], grad0: "#000000", grad1: "#474747", background_transition: g, line_stroke: function line_stroke(a, b) {
              return "#FFF";
            }, line_over_stroke: function line_over_stroke(a, b) {
              return "#FFF";
            }, line_opacity: function line_opacity(a, b) {
              return this.layout() == vizuly.component.layout.STREAM ? .4 : .6;
            }, area_fill: function area_fill(a, b) {
              return "#D1F704";
            }, area_fill_opacity: function area_fill_opacity(a, b) {
              return (b + 1) / this.data().length * (this.layout() == vizuly.component.layout.OVERLAP ? .6 : .8);
            }, xAxis_font_weight: 200, yAxis_line_stroke: "#FFF", yAxis_line_opacity: .25, "class": "vz-skin-default" }, Business: { name: "Business", labelColor: "#000", color: "#000", stroke_colors: ["#FFA000", "#FF5722", "#F57C00", "#FF9800", "#FFEB3B"], fill_colors: ["#C50A0A", "#C2185B", "#F57C00", "#FF9800", "#FFEB3B"], grad0: "#CCC", grad1: "#EEE", background_transition: g, line_stroke: function line_stroke(a, b) {
              return d3.rgb(k(b)).darker();
            }, line_over_stroke: function line_over_stroke(a, b) {
              return "#FFF";
            }, line_opacity: function line_opacity(a, b) {
              return .7;
            }, area_fill: function area_fill(a, b) {
              return k(b);
            }, area_fill_opacity: function area_fill_opacity(a, b) {
              return this.layout() == vizuly.component.layout.OVERLAP ? .8 : .9;
            }, xAxis_font_weight: 200, yAxis_line_stroke: "#000", yAxis_line_opacity: .25, "class": "vz-skin-default" } };return b;
      }, vizuly.theme.radial_progress = function (a) {
        function b() {
          f();
        }function c() {
          if (j) {
            var b = a.selection();b.attr("class", j["class"]), b.selectAll(".vz-radial_progress-arc").style("fill", function (a, b) {
              return j.arc_fill(a, b);
            }).style("fill-opacity", function (a, b) {
              return j.arc_fill_opacity(a, b);
            }).style("stroke", function (a, b) {
              return j.arc_stroke(a, b);
            }), b.selectAll(".vz-radial_progress-track").style("fill", j.track_fill), b.selectAll(".vz-radial_progress-label").style("fill", j.label_color).style("stroke-opacity", 0).style("font-size", .25 * a.radius());
          }
        }function d(b, c, d) {
          a.selection().selectAll(".vz-radial_progress-label").style("font-weight", 700);
        }function e(b, c, d) {
          a.selection().selectAll(".vz-radial_progress-label").style("font-weight", null);
        }function f() {
          i.forEach(function (b) {
            a.on(b.on, b.callback);
          });
        }function g() {
          i.forEach(function (b) {
            a.on(b.on, null);
          });
        }var h = { Alert: { name: "Alert", label_color: "#CCC", track_fill: "#DDDDDD", progress_colors: ["#4CAF50", "#FFC107", "#FF9800", "#E64A19", "#FFEB3B"], arc_fill: function arc_fill(a, b) {
              return this.progress_colors[b % 5];
            }, arc_fill_opacity: function arc_fill_opacity(a, b) {
              return 1;
            }, arc_stroke: function arc_stroke(a, b) {
              return this.progress_colors[b % 5];
            }, "class": "vz-skin-alert" }, Fire: { name: "Fire", label_color: "#F13870", track_fill: "#DDDDDD", progress_colors: ["#C50A0A", "#F57C00", "#FF9800", "#FFEB3B", "#C2185B"], arc_fill: function arc_fill(a, b) {
              return this.progress_colors[b % 5];
            }, arc_fill_opacity: function arc_fill_opacity(a, b) {
              return 1;
            }, arc_stroke: function arc_stroke(a, b) {
              return this.progress_colors[b % 5];
            }, "class": "vz-skin-fire" }, White: { name: "White", label_color: "#FFF", track_fill: null, arc_fill: function arc_fill(a, b) {
              return "#FFF";
            }, arc_fill_opacity: function arc_fill_opacity(a, b) {
              return .85 / Math.exp(.75 * b);
            }, arc_stroke: function arc_stroke(a, b) {
              return "#FFF";
            }, "class": "vz-skin-white" }, Neon: { name: "Neon", label_color: "#D1F704", track_fill: "#000", progress_colors: ["#D1F704", "#A8C102", "#788A04", "#566204", "#383F04"], arc_fill: function arc_fill(a, b) {
              return this.progress_colors[b % 5];
            }, arc_fill_opacity: function arc_fill_opacity(a, b) {
              return 1;
            }, arc_stroke: function arc_stroke(a, b) {
              return this.progress_colors[b % 5];
            }, "class": "vz-skin-neon" }, Business: { name: "Business", label_color: "#EEE", track_fill: "#DDDDDD", progress_colors: d3.scale.category20(), arc_fill: function arc_fill(a, b) {
              return this.progress_colors(b);
            }, arc_fill_opacity: function arc_fill_opacity(a, b) {
              return 1;
            }, arc_stroke: function arc_stroke(a, b) {
              return this.progress_colors(b);
            }, "class": "vz-skin-business" } },
            a = a,
            i = [{ on: "update.theme", callback: c }, { on: "mouseover.theme", callback: d }, { on: "mouseout.theme", callback: e }];b(), b.apply = function (a) {
          return arguments.length > 0 && b.skin(a), c(), b;
        }, b.release = function () {
          a && (a.selection().attr("class", null), g(), a = null);
        }, b.viz = function (b) {
          return arguments.length ? (a && g(), a = b, void f()) : a;
        }, b.skin = function (a) {
          if (0 == arguments.length) return j;if (!h[a]) throw new Error("theme/linearea.js - skin " + a + " does not exist.");return j = h[a], b;
        }, b.skins = function () {
          return h;
        };var j = h[vizuly.skin.RADIAL_PROGRESS_BUSINESS];return b;
      }, vizuly.skin.RADIAL_PROGRESS_FIRE = "Fire", vizuly.skin.RADIAL_PROGRESS_MATERIAL = "Material", vizuly.skin.RADIAL_PROGRESS_NEON = "Neon", vizuly.skin.RADIAL_PROGRESS_OCEAN = "Ocean", vizuly.skin.RADIAL_PROGRESS_ALERT = "Alert", vizuly.skin.RADIAL_PROGRESS_BUSINESS = "Business", vizuly.skin.SCATTER_NEON = "Neon", vizuly.skin.SCATTER_FIRE = "Fire", vizuly.skin.SCATTER_OCEAN = "Ocean", vizuly.skin.SCATTER_SUNSET = "Sunset", vizuly.skin.SCATTER_BUSINESS = "Business", vizuly.theme.scatter = function (a) {
        function b() {
          h();
        }function c() {
          if (i) {
            var b = a.width(),
                c = Math.min(a.width(), a.height()) / 80,
                d = a.selection();d.attr("class", i["class"]), d.selectAll(".vz-background").attr("fill", function () {
              return "url(#" + j.attr("id") + ")";
            }), d.selectAll(".vz-plot-background").style("opacity", 0), d.selectAll(".vz-scatter-bottom-axis").style("font-weight", i.xAxis_font_weight).style("fill", i.labelColor).style("font-size", Math.max(8, Math.round(b / 85)) + "px").style("opacity", function () {
              return b > 399 ? 1 : 0;
            }), d.selectAll(".vz-scatter-left-axis line").style("stroke", i.yAxis_line_stroke).style("stroke-width", 1).style("opacity", i.yAxis_line_opacity), d.selectAll(".vz-scatter-left-axis text").style("font-size", Math.max(8, Math.round(b / 85)) + "px").style("fill", i.labelColor).style("fill-opacity", .6), d.selectAll(".vz-scatter-node").style("stroke-width", c).style("stroke-opacity", 0).style("stroke", function (a, b) {
              return i.node_stroke(a, b);
            }).style("fill", function (a, b) {
              return i.node_fill(a, b);
            }).style("fill-opacity", function (a, b) {
              return i.node_fill_opacity(a, b);
            }), i.background_transition();
          }
        }function d() {
          a.yAxis().tickSize(-vizuly.util.size(a.margin(), a.width(), a.height()).width).orient("left"), a.xAxis().tickSize(-vizuly.util.size(a.margin(), a.width(), a.height()).width);
        }function e(b, c, d) {
          a.selection().selectAll(".vz-scatter-node").style("opacity", .15), d3.select(b).style("opacity", 1).style("stroke-opacity", .5).style("fill-opacity", .9), l.mouseover(b, c, d);
        }function f(b, c, d) {
          d3.select(b).style("opacity", 1).style("fill-opacity", function (a, b) {
            return i.node_fill_opacity(a, b);
          }), a.selection().selectAll(".vz-scatter-node").style("stroke-opacity", 0).style("opacity", 1);
        }function g() {
          a.selection().selectAll(".vz-background").style("fill-opacity", 1), j.selectAll("stop").transition().duration(500).attr("stop-color", function (a, b) {
            return 0 == b ? i.grad0 : i.grad1;
          });
        }function h() {
          k.forEach(function (b) {
            a.on(b.on, b.callback);
          });
        }var a = a,
            i = null,
            j = vizuly.svg.gradient.blend(a, "#000", "#000"),
            k = [{ on: "measure.theme", callback: d }, { on: "update.theme", callback: c }, { on: "mouseover.theme", callback: e }, { on: "mouseout.theme", callback: f }];b(), b.apply = function (a) {
          return arguments.length > 0 && b.skin(a), c(), b;
        }, b.release = function () {
          a && (a.selection().attr("class", null), k.forEach(function (b) {
            a.on(b.on, null);
          }), a = null);
        }, b.viz = function (b) {
          return arguments.length ? (a = b, void h()) : a;
        }, b.skin = function (a) {
          if (0 == arguments.length) return i;if (!m[a]) throw new Error("theme/linearea.js - skin " + a + " does not exist.");return i = m[a], b;
        }, b.skins = function () {
          return m;
        };var l = d3.dispatch("mouseover", "mouseout");b.on = function (a, c) {
          return l.on(a, c), b;
        };var m = { Fire: { name: "Fire", labelColor: "#FFF", labelFill: "#C50A0A", stroke_colors: ["#C50A0A", "#C2185B", "#F57C00", "#FF9800", "#FFEB3B"], fill_colors: ["#C50A0A", "#C2185B", "#F57C00", "#FF9800", "#FFEB3B"], grad0: "#000000", grad1: "#474747", background_transition: g, yAxis_line_stroke: "#FFF", yAxis_line_opacity: .25, node_stroke: function node_stroke(a, b) {
              return this.stroke_colors[b % 5];
            }, node_fill: function node_fill(a, b) {
              return this.fill_colors[b % 5];
            }, node_fill_opacity: function node_fill_opacity(a, b) {
              return .5;
            }, "class": "vz-skin-fire" }, Sunset: { name: "Sunset", labelColor: "#FFF", labelFill: "#00236C", stroke_colors: ["#CD57A4", "#B236A3", "#FA6F7F", "#FA7C3B", "#E96B6B"], fill_colors: ["#89208F", "#C02690", "#D93256", "#DB3D0C", "#B2180E"], grad1: "#390E1D", grad0: "#7C1B31", background_transition: g, yAxis_line_stroke: "#FFF", yAxis_line_opacity: .25, node_stroke: function node_stroke(a, b) {
              return this.stroke_colors[b % 5];
            }, node_fill: function node_fill(a, b) {
              return this.fill_colors[b % 5];
            }, node_fill_opacity: function node_fill_opacity(a, b) {
              return .7;
            }, "class": "vz-skin-sunset" }, Neon: { name: "Neon", labelColor: "#FFF", labelFill: "#005", grad0: "#000000", grad1: "#474747", background_transition: g, yAxis_line_stroke: "#FFF", yAxis_line_opacity: .25, node_stroke: function node_stroke(a, b) {
              return "#FFF";
            }, node_fill: function node_fill(a, b) {
              return "#D1F704";
            }, node_fill_opacity: function node_fill_opacity(a, b) {
              return .6;
            }, "class": "vz-skin-neon" }, Ocean: { name: "Ocean", labelColor: "#FFF", labelFill: "#000", background_transition: function background_transition(b) {
              a.selection().select(".vz-background").transition(1e3).style("fill-opacity", 0);
            }, yAxis_line_stroke: "#FFF", yAxis_line_opacity: .25, node_stroke: function node_stroke(a, b) {
              return "#00F";
            }, node_fill: function node_fill(a, b) {
              return "#FFF";
            }, node_fill_opacity: function node_fill_opacity(a, b) {
              return .4;
            }, "class": "vz-skin-ocean" } };return b;
      };
    }
  };
});
//# sourceMappingURL=vizuly_core.js.map