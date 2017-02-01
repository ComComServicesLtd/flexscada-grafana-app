import _ from 'lodash';
import angular from 'angular';
import * as d3 from '../../external/d3.min.js';
import vizuly from '../../external/vizuly_core.min.js';
import '../../external/vizuly_corona.min.js';
import Dygraph from '../../external/dygraph.min.js';
import * as Downsampler from './downsample.js';
import * as Colormap from './colormaps.js';
import * as Testdata from './testdata.js';

//public/plugins/flexscada-app/img/
class AnalysisCtrl {
  /** @ngInject */
  constructor($scope, $injector, $rootScope, $location, $modal, $anchorScroll, $timeout, $window, $q, backendSrv, alertSrv) {
    var self = this;
    this.backendSrv = backendSrv;
    this.$location = $location;
    this.$timeout = $timeout;
    this.$q = $q;
    this.alertSrv = alertSrv;
    this.$window = $window;
    this.$rootScope = $rootScope;
    $window.scope = $scope;
    $window.rootscope = $rootScope;
    this.pageReady = false;
    this.ignoreChanges = false;
    this.config = {};
    this.deviceStatus = 0; // 0 unloaded, 1 loaded

    if ("device" in $location.search()) {
      console.log(location.search().device);
      //  this.loadDevice($location.search().device);
    }

    self.pageReady = true;

    $window.onbeforeunload = function() {
      if (self.ignoreChanges) {
        return;
      }
      if (self.changesPending()) {
        return "There are unsaved changes to this dashboard";
      }
    };
    $scope.$on('$locationChangeStart', function(event, next) {
      if ((!self.ignoreChanges) && (self.changesPending())) {
        event.preventDefault();
        var baseLen = $location.absUrl().length - $location.url().length;
        var nextUrl = next.substring(baseLen);
        var modalScope = $scope.$new();
        modalScope.ignore = function() {
          self.ignoreChanges = true;
          $location.url(nextUrl);
          return;
        };
        modalScope.save = function() {
          self.savePending(nextUrl);
        };
        $rootScope.appEvent('show-modal', {
          src: 'public/app/partials/unsaved-changes.html',
          modalClass: 'confirm-modal',
          scope: modalScope,
        });
      }
    });

    this.radialLayouts = [{
        text: "Stacked",
        value: "STACKED"
      },
      {
        text: "Overlap",
        value: "OVERLAP"
      }
    ];



    //Fire Sunset Neon Ocean Business
    this.radialThemes = [{
        text: "Sunset",
        value: "Sunset"
      },
      {
        text: "Fire",
        value: "Fire"
      },
      {
        text: "Neon",
        value: "Neon"
      },
      {
        text: "Ocean",
        value: "Ocean"
      },
      {
        text: "Light",
        value: "Business"
      }
    ];

    // debugger;
    this.radial_viz = vizuly.component.corona(window.document.getElementById('radial_viz_element'));

    $('.vz-background').remove();

    this.radial_data = []; // data object
    this.radial_viz_element = ''; // html element that holds the viz (d3 selection)
    this.radial_viz_title_element = ''; // title element (d3 selection)
    this.radial_viz_heading_element = ''; // Title elements
    this.radial_viz_theme = ''; // Theme variable to be used by our viz.

    this.screenWidth = window.innerWidth * 0.75;
    this.screenHeight = window.innerHeight;
    // Set the size of our container element.

    this.radial_viz_element = d3.selectAll("#radial_viz_element")
      .style("width", this.screenWidth + "px")
      .style("height", this.screenHeight + "px");
    this.loadData();




    //FFT PLOT



        // Shift one portion out of line.
        var highlight_start = 450;
        var highlight_end = 500;



    // A basic sinusoidal data series.
    var data = [];

    this.fft = new Dygraph(window.document.getElementById("fft"), data, {
      labels: ['Frequency', 'G.'],
      ylabel: 'Amplitude (G)',
      xlabel: 'Frequency (HZ)',
      axes: {
        x: {
          axisLabelFormatter: function(d, gran) {
            return d + 'hz';
          },
          valueFormatter: function(ms) {
            return ms + 'hz';
          }
        },
        y: {
          axisLabelFormatter: function(d, gran) {
            return d + 'G';
          },
          valueFormatter: function(ms) {
            return ms + 'G';
          }
        }
      },
      legend: 'follow',
      //  dateWindow: [0, 9],
      plotter: this.barChartPlotter,
      colorValue: 0.9,
      fillAlpha: 0.2,
      showRoller: false,
      showRangeSelector: false,
      rangeSelectorPlotFillColor: 'MediumSlateBlue',
      rangeSelectorPlotFillGradientColor: 'rgba(123, 104, 238, 0)',
      animatedZooms: true,
      underlayCallback: function(canvas, area, g) {
        var bottom_left = g.toDomCoords(highlight_start, -20);
        var top_right = g.toDomCoords(highlight_end, +20);
        var left = bottom_left[0];
        var right = top_right[0];
        canvas.fillStyle = "rgba(255, 255, 102, 1.0)";
        canvas.fillRect(left, area.y, right - left, area.h);
      }
    });






    // BIN OVER TIME PLOT




    this.rawplot = new Dygraph(window.document.getElementById("bin_amplitude"), data, {
      labels: ['Time', 'Value'],
      ylabel: 'Amplitude (G)',
      xlabel: 'Time (MS)',
      axes: {
        x: {
          axisLabelFormatter: function(d, gran) {
            return d + 'ms';
          },
          valueFormatter: function(ms) {
            return ms + 'ms';
          }
        },
        y: {
          axisLabelFormatter: function(d, gran) {
            return d + 'G';
          },
          valueFormatter: function(ms) {
            return ms + 'G';
          }
        }
      },
      colorValue: 0.9,
      fillAlpha: 0.4,
      showRoller: false,
      legend: 'follow',
      showRangeSelector: false,
      rangeSelectorPlotFillColor: 'MediumSlateBlue',
      rangeSelectorPlotFillGradientColor: 'rgba(123, 104, 238, 0)',
      animatedZooms: true
    });


    this.loadRaw(1, 131072);
    this.loadFFT(1, 131072);
  }







  barChartPlotter(e) {
    var ctx = e.drawingContext;
    var points = e.points;
    var y_bottom = e.dygraph.toDomYCoord(0); // see <a href="http://dygraphs.com/jsdoc/symbols/Dygraph.html#toDomYCoord">jsdoc</a>
    // This should really be based on the minimum gap

    ctx.fillStyle = e.color; // a lighter shade might be more aesthetically pleasing





    points = Downsampler.dygraph_downsample(points, 2048, 'avg');

    var bar_width = 2 / 3 * (points[1].canvasx - points[0].canvasx);


    // Do the actual plotting.
    for (var i = 0; i < points.length; i++) {
      var p = points[i];
      //Colormap.maps

      var colorIndex = (e.plotArea.h - p.canvasy) / e.plotArea.h;
      var color = Colormap.interpolateLinearly(colorIndex, Colormap.jet);
      ctx.strokeStyle = "rgb(" +
        Math.round(255 * color[0]) + "," +
        Math.round(255 * color[1]) + "," +
        Math.round(255 * color[2]) +
        ")";
      ctx.fillStyle = ctx.strokeStyle;

      ctx.fillRect(p.canvasx - bar_width / 2, p.canvasy, bar_width, y_bottom - p.canvasy);
      //  ctx.strokeRect(p.canvasx - bar_width / 2, p.canvasy, bar_width, y_bottom - p.canvasy);
    }
  }




  addRange() {
    if (!this.config.ranges) {
      this.config.ranges = [];
    }

    this.config.ranges.push({
      label: ""
    }) - 1;
  }

  deleteRange(id) {
    this.config.ranges.splice(id, 1);
  }


  loadRaw(id, points) {
    var self = this;

    var options = {
      mode: "raw"
    };

    return this.backendSrv.post('api/plugin-proxy/flexscada-app/api/vibration/v1/fft/' + id, options)
      .then((resp) => {
        self.$window.console.log(resp);
        if (resp.meta.code !== 200) {
          self.alertSrv.set("failed to load fft.", resp.meta.message, 'error', 10000);
          return self.$q.reject(resp.meta.message);
        }

        var data = [];

        for (var i = 0; i < resp.data.length; i++) {
          data.push([i * resp.ms_per_point, resp.data[i]]);
        }

        self.rawplot.updateOptions({
          'file': data
        });

      });
  }



  loadFFT(id, points) {
    var self = this;

    var options = {
      mode: "fft"
    };

    return this.backendSrv.post('api/plugin-proxy/flexscada-app/api/vibration/v1/fft/' + id, options)
      .then((resp) => {
        self.$window.console.log(resp);
        if (resp.meta.code !== 200) {
          self.alertSrv.set("failed to load fft.", resp.meta.message, 'error', 10000);
          return self.$q.reject(resp.meta.message);
        }

        var fftData = [];

        for (var i = 0; i < resp.data.length; i++) {
          fftData.push([i * resp.hzperbin, resp.data[i]]);
        }

        self.fft.updateOptions({
          'file': fftData
        });

      });
  }



  loadDevice(uid) {
    var self = this;
    return this.backendSrv.get('api/plugin-proxy/flexscada-app/api/vibration/v1/config/' + uid).then((resp) => {
      self.$window.console.log(resp);
      if (resp.meta.code !== 200) {
        self.alertSrv.set("failed to update device.", resp.meta.message, 'error', 10000);
        return self.$q.reject(resp.meta.message);
      }
      self.config = resp.body;
      this.deviceStatus = 2;
    });
  }



  changesPending() {
    var changes = false;
    return changes;
  }



  loadData() {
    // Load our data via d3
    var allSeries = [];
    for (var hz = 1; hz < 5; hz++) {
      var series = [];
      var key = hz + 'hz';
      for (var ms = 0; ms < 360; ms++) {
        series.push({
          "key": key,
          "frequency": key,
          "amplitude": Number((Math.sin((ms / 5) + hz / 5) + 2)) / hz,
          "position": String(ms)
        });
      }
      allSeries.push(series);
    }
    this.radial_data = allSeries;
    console.log(this.radial_data);
    // Call our initialize routine
    this.initialize();
  }







  initialize() {
    var self = this;
    //to the corresponding x and y axis within the chart.
    this.radial_viz.data(this.radial_data).margin({
        top: "15%",
        left: "0%",
        right: "0%",
        bottom: "10%"
      }).outerRadius(350).y(function(d, i) {
        return d.amplitude; //Value to use for the radius (y)
      }).x(function(d, i) {
        return d.position; //Value to use fo the angle (x)
      }).interpolate("cardinal-closed") //Vertex type for line and area paths
      .on("validate", function() { // onValidate
        // Set appropriate axis labels after viz validates and automatically creates any public properties.
        self.radial_viz.xAxis().tickFormat(function(d) {
          return d + '°';
        });
        self.radial_viz.yAxis().tickFormat(function(d) {
          return Math.round(d * 100) / 100 + " G";
        });
        self.radial_viz.xAxis().ticks(8);
        self.radial_viz.yAxis().ticks(6);
      }) //Called when all public properties have been set
      .on("mouseover", function(d, i) { //onMouseOver
        // Show UI elements to user based on our specific data.
        var fontSize = Math.round(self.radial_viz.outerRadius() / 20);
        // Get the SVG defs tag
        var defs = self.radial_viz.selection().selectAll("defs");


        // Get the svg plot
        var plot = self.radial_viz.selection().selectAll(".vz-plot");



        // Remove any elements left from last datatip in case mouseout didn't get them.
        defs.selectAll(".vz-tip-path").remove();
        plot.selectAll(".my-tip").remove();


        // Add the arc we need to show the frequency amplitude
        defs.append("path").attr("class", "vz-tip-path").attr("id", function(d, i) {
          return self.radial_viz.id() + "_tip_path_arc_1";
        }).attr("d", function() {
          return vizuly.svg.text.arcPath(self.radial_viz.radiusScale()(d.y + d.y0) * 1.05, self.radial_viz.thetaScale()(self.radial_viz.x()(d)));
        });


        // Show the position
        plot.append("text").attr("class", "my-tip").style("font-size", (fontSize * 0.95) + "px").style("text-transform", "uppercase").style("font-family", "Open Sans").style("fill-opacity", 0.75).style("fill", function() {
          return self.radial_viz_theme.skin().labelColor;
        }).append("textPath").attr("startOffset", "50%").style("overflow", "visible").attr("xlink:href", function(d, i) {
          return "#" + self.radial_viz.id() + "_tip_path_arc_1";
        }).text(function() {
          return self.radial_viz.xAxis().tickFormat()(self.radial_viz.x()(d));
        });


        // Show the frequency amplitude
        plot.append("text").attr("class", "my-tip").attr("y", -fontSize * 1.5).style("font-size", fontSize + "px").style("fill", function() {
          return self.radial_viz_theme.skin().labelColor;
        }).text(function() {
          return self.radial_viz.yAxis().tickFormat()(self.radial_viz.y()(d));
        });
        //Show the frequency
        plot.append("text").attr("class", "my-tip").style("font-size", fontSize + "px").style("fill-opacity", 0.75).style("fill", function() {
          return self.radial_viz_theme.skin().labelColor;
        }).text(function() {
          return d.key;
        });


      }) //Called on each datatip mouseover



      .on("mouseout", function(d, i) { //onMouseOut
        // Remove any elements we have created on mouse over
        self.radial_viz.selection().selectAll(".vz-tip-path").remove();
        self.radial_viz.selection().selectAll(".my-tip").remove();
      }) //Called on each datatip mouseout
      .on("measure", function() {
        //Each time viz measures itself we want to reset some UI elements;

        /*

      self.radial_viz_title_element.attr("x",self.radial_viz.width() / 2).style("font-size", function () {
      return self.radial_viz.height() / 60
    }).style("fill", function () {
    return self.radial_viz_theme.skin().labelColor;
  });


  self.radial_viz_heading_element.attr("x", self.radial_viz.width() / 2)
  .style("font-size", function () {
  return self.radial_viz.height() / 65;
})
.style("fill", function () {
return self.radial_viz_theme.skin().labelColor;
})
.style("fill-opacity", .7);
*/
      }); //Called each time viz measures itself prior to update


    this.radial_viz_theme = vizuly.theme.radial_linearea(this.radial_viz).skin(vizuly.skin.LINEAREA_FIRE);

    /*
    this.radial_viz_title_element = this.radial_viz.selection().select("svg").append("text").attr("class", "title")
    .attr("y", 35).attr("text-anchor", "middle")
    .text("WWW.BRIGHTPOINTINC.COM - PAGE VIEWS BY HOUR");
    this.radial_viz_heading_element = this.radial_viz.selection().select("svg").append("text").attr("class", "heading")
    .attr("y", 55).attr("text-anchor", "middle")
    .text("Google Analytics - Dec 01, 2015");
    */

    this.updateRadialSize();
  }







  updateRadialTheme() {
    // Fire Sunset Neon Ocean Business
    if (!this.config.radialTheme) {
      return;
    }

    this.radial_viz_theme.skin(this.config.radialTheme);
    //   this.radial_viz_title_element.style("fill", this.radial_viz_theme.skin().labelColor)
    //   this.radial_viz_heading_element.style("fill", this.radial_viz_theme.skin().labelColor)
    this.radial_viz_theme.apply();
  }



  updateRadialLayout() {
    // STACKED OVERLAP
    this.radial_viz.layout(this.config.radialLayout).update();
  }



  changeShape(val) {
    console.log(val);
    this.radial_viz.interpolate(val).update();
  }



  updateRadialSize() {
    this.radial_viz_element.transition().style('width', this.screenWidth + 'px').style('height', this.screenHeight + 'px');
    var r = Math.min(Number(this.screenWidth) / 2, Number(this.screenHeight) / 2) * 0.75;
    this.radial_viz.width(this.screenWidth).height(this.screenHeight).outerRadius(r).innerRadius(r * 0.4).update();
  }



}
AnalysisCtrl.templateUrl = 'public/plugins/flexscada-app/components/analysis/partials/analysis.html';
export {
  AnalysisCtrl
};
