"use strict";

System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      /*! vizuly 21-03-2016 */
      vizuly.component.corona = function (a) {
        function b() {
          n = f.selection.append("svg").attr("id", f.id).style("overflow", "visible").attr("class", "vizuly"), s = n.append("rect").attr("class", "vz-background"), v = vizuly.util.getDefs(h), o = n.append("g").attr("class", "vz-corona-viz"), p = o.append("g").attr("class", "vz-xAxis-plot"), q = o.append("g").attr("class", "vz-yAxis-plot"), r = o.append("g").attr("class", "vz-plot").attr("clip-path", "url(#" + f.id + "_plotClipPath)"), t = r.append("rect").attr("class", "vz-plot-background"), u = r.append("g").attr("class", "vz-series"), w = o.append("g").attr("class", "vz-point-areas"), f.yAxis.tickFormat(function (a) {
            return a;
          }), f.xAxis.tickFormat(function (a) {
            return a;
          }), f.dispatch.initialize();
        }function c() {
          h.validate(), i = vizuly.util.size(f.margin, f.width, f.height), k = Math.round(f.data[0].length / f.xAxis.ticks()[0]), l = function () {
            for (var a = [], b = 0; b < f.xAxis.ticks()[0]; b++) {
              a.push(b);
            }return a;
          }.apply(this);var a = f.layout == vizuly.component.layout.STACKED ? "reverse" : "none";if (m = d3.layout.stack().values(function (a) {
            return a;
          }).x(function (a) {
            return String(f.x(a));
          }).y(function (a) {
            return f.y(a);
          }).out(function (b, c, d) {
            b.y0 = "none" == a ? 0 : c, b.y = d;
          }).order("reverse").offset(a), m(f.data), "undefined" == f.thetaScale) {
            var b;"string" == typeof h.x()(f.data[0][0]) ? (b = d3.scale.ordinal(), b.rangeBands([0, 2 * Math.PI])) : h.x()(f.data[0][0]) instanceof Date ? (b = d3.time.scale(), b.range([0, 2 * Math.PI])) : (b = d3.scale.linear(), b.range([0, 2 * Math.PI])), f.thetaScale = b;
          }"string" == typeof h.x()(f.data[0][0]) ? f.thetaScale.domain(f.data[0].map(function (a) {
            return f.x(a);
          })) : f.thetaScale.domain([d3.min(f.data[0], function (a) {
            return f.x(a);
          }), d3.max(f.data[0], function (a) {
            return f.x(a);
          })]), f.radiusScale.range([f.innerRadius, f.outerRadius]), f.radiusScale.domain([0, d3.max(f.data, function (a) {
            return d3.max(a, function (a) {
              return Number(f.y(a) + a.y0);
            });
          })]), y.interpolate(f.interpolate).angle(function (a) {
            return f.thetaScale(f.x(a));
          }).innerRadius(function (a, b) {
            return f.radiusScale(a.y0);
          }).outerRadius(function (a, b) {
            return f.radiusScale(f.y(a) + a.y0);
          }), x.interpolate(f.interpolate).angle(function (a) {
            return f.thetaScale(f.x(a));
          }).radius(function (a, b) {
            return f.radiusScale(f.y(a) + a.y0);
          }), f.yAxis.scale(f.radiusScale).orient("left"), j = Math.min(i.width / 50, i.height / 50), f.dispatch.measure();
        }function d() {
          c(), n.attr("width", f.width).attr("height", f.height), s.attr("width", f.width).attr("height", f.height), r.style("width", i.width).style("height", i.height).attr("transform", "translate(" + (i.left + i.width / 2) + "," + (i.top + i.height / 2) + ")"), w.style("width", i.width).style("height", i.height).attr("transform", "translate(" + i.left + "," + i.top + ")"), p.attr("transform", "translate(" + (i.left + i.width / 2) + "," + (i.height / 2 + i.top + 3) + ")"), q.attr("transform", "translate(" + (i.left + i.width / 2) + "," + (i.height / 2 + i.top + 3) + ")"), t.attr("width", i.width).attr("height", i.height);var a = u.selectAll(".vz-series-plots").data(f.data);a.enter().append("g").attr("class", "vz-series-plots"), a.exit().remove(), a.each(function (a, b) {
            var c = d3.select(this),
                d = c.selectAll(".vz-line").data([a]);d.enter().append("path").attr("class", "vz-line"), d.exit().remove(), d.transition().duration(f.duration).attr("d", function (a, b) {
              return x(a);
            });var e = c.selectAll(".vz-area").data([a]);e.enter().append("path").attr("class", "vz-area"), e.exit().remove(), e.transition().duration(f.duration).attr("d", function (a, b) {
              return y(a);
            });
          }), w.selectAll(".vz-tip").remove(), f.data.forEach(function (a, b) {
            var c = w.selectAll("vz-tip").data(a).enter().append("g").attr("class", "vz-tip").attr("transform", function (a, b) {
              var c = e(f.y(a) + a.y0, f.x(a));return "translate(" + c.x + "," + c.y + ")";
            }).on("mouseover", function (a, c) {
              f.dispatch.mouseover.apply(this, [a, c, b]);
            }).on("touchstart", function (a, c) {
              f.dispatch.mouseover.apply(this, [a, c, b]);
            }).on("mouseout", function (a, c) {
              f.dispatch.mouseout.apply(this, [a, c, b]);
            }).on("mousedown", function (a, c) {
              f.dispatch.mousedown.apply(this, [a, c, b]);
            });c.each(function () {
              var a = d3.select(this);a.append("circle").attr("class", "vz-hit-circle").style("fill", "#FFF").style("stroke", null).style("opacity", .001).transition().attr("r", j);
            });
          }), v.selectAll(".vz-x-axis-arc-path").remove(), v.selectAll(".vz-x-axis-arc-path").data(l).enter().append("path").attr("class", "vz-x-axis-arc-path").attr("id", function (a, b) {
            return f.id + "_x_text_arc_" + b;
          }).attr("d", function (a, b) {
            return vizuly.svg.text.arcPath(1.05 * f.outerRadius, f.thetaScale(f.x(f.data[0][b * k])));
          }), p.selectAll(".vz-radial-x-axis-tick").remove(), p.selectAll(".vz-radial-x-axis-tick").data(l).enter().append("g").attr("class", "vz-radial-x-axis-tick").append("text").append("textPath").attr("text-anchor", "middle").attr("startOffset", "50%").style("overflow", "visible").attr("xlink:href", function (a, b) {
            return "#" + f.id + "_x_text_arc_" + b;
          }).text(function (a, b) {
            return f.xAxis.tickFormat()(f.x(f.data[0][b * k]));
          }), q.selectAll(".vz-label-ticks").remove(), q.append("g").attr("class", "vz-label-ticks").style("display", "none").call(f.yAxis), q.selectAll(".vz-y-axis-tick").remove();var b = q.selectAll(".tick")[0].map(function (a) {
            return d3.select(a).datum();
          });q.selectAll(".vz-y-axis-tick").data(b).enter().append("circle").attr("class", "vz-y-axis-tick").attr("cx", 0).attr("cy", 0).attr("r", function (a) {
            return f.radiusScale(a);
          }).style("fill", "none"), v.selectAll(".vz-y-axis-arc-path").remove(), q.selectAll(".vz-y-axis-tick-label").remove(), b.forEach(function (a, b) {
            v.append("path").attr("class", "vz-y-axis-arc-path").attr("id", function (a, c) {
              return f.id + "_y_text_arc_" + b + "_" + c;
            }).attr("d", function () {
              return vizuly.svg.text.arcPath(1.02 * f.radiusScale(a), 0);
            }), q.append("text").attr("class", "vz-y-axis-tick-label").append("textPath").attr("text-anchor", "middle").attr("startOffset", "50%").style("overflow", "visible").attr("xlink:href", function (a, c) {
              return "#" + f.id + "_y_text_arc_" + b + "_" + c;
            }).text(function () {
              return f.yAxis.tickFormat()(a);
            });
          }), f.dispatch.update();
        }function e(a, b) {
          var c = f.radiusScale(a),
              d = f.thetaScale(b) - Math.PI / 2;return a = c * Math.cos(d) + i.width / 2, b = c * Math.sin(d) + i.height / 2, { x: a, y: b };
        }var f = {},
            g = { data: null, layout: vizuly.component.layout.OVERLAP, margin: { top: "7%", bottom: "7%", left: "8%", right: "7%" }, duration: 500, width: 300, height: 300, innerRadius: 50, outerRadius: 150, radiusScale: d3.scale.linear(), y: null, x: null, yAxis: d3.svg.axis(), xAxis: d3.svg.axis(), thetaScale: "undefined", interpolate: "linear-closed" },
            h = vizuly.viz.create(a, f, g);h.type = "viz.chart.corona";var i,
            j,
            k,
            l,
            m,
            n,
            o,
            p,
            q,
            r,
            s,
            t,
            u,
            v,
            w,
            x = d3.svg.line.radial(),
            y = d3.svg.area.radial();return b(), h.update = function () {
          return d(), h;
        }, h;
      };
    }
  };
});
//# sourceMappingURL=vizuly_corona.js.map
