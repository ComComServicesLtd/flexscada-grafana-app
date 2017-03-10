'use strict';

System.register(['lodash', 'app/plugins/sdk', '../../external/handsontable.full.js', 'jquery', 'moment', 'app/core/utils/datemath', 'app/core/core'], function (_export, _context) {
  "use strict";

  var _, PanelCtrl, loadPluginCss, Handsontable, $, moment, dateMath, appEvents, coreModule, _createClass, DataEditorCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_lodash) {
      _ = _lodash.default;
    }, function (_appPluginsSdk) {
      PanelCtrl = _appPluginsSdk.PanelCtrl;
      loadPluginCss = _appPluginsSdk.loadPluginCss;
    }, function (_externalHandsontableFullJs) {
      Handsontable = _externalHandsontableFullJs.default;
    }, function (_jquery) {
      $ = _jquery;
    }, function (_moment) {
      moment = _moment.default;
    }, function (_appCoreUtilsDatemath) {
      dateMath = _appCoreUtilsDatemath;
    }, function (_appCoreCore) {
      appEvents = _appCoreCore.appEvents;
      coreModule = _appCoreCore.coreModule;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      loadPluginCss({
        dark: 'plugins/flexscada-app/external/handsontable-dark.full.css',
        light: 'plugins/flexscada-app/external/handsontable-light.full.css'
      });

      _export('PanelCtrl', DataEditorCtrl = function (_PanelCtrl) {
        _inherits(DataEditorCtrl, _PanelCtrl);

        /** @ngInject */
        function DataEditorCtrl($scope, $injector, $location, $q, backendSrv, alertSrv) {
          _classCallCheck(this, DataEditorCtrl);

          var _this = _possibleConstructorReturn(this, (DataEditorCtrl.__proto__ || Object.getPrototypeOf(DataEditorCtrl)).call(this, $scope, $injector));

          _this.backendSrv = backendSrv;
          _this.alertSrv = alertSrv;
          _this.$location = $location;
          _this.$q = $q;
          _this.window = window;
          _this.scope = $scope;

          _this.datapoints = [];
          _this.annotations = [];
          _this.newAnnotation = {};

          //  this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
          _this.events.on('refresh', _this.onRefresh.bind(_this));
          _this.events.on('render', _this.onRender.bind(_this));

          var self = _this;

          var p = self.backendSrv.get('/api/datasources');
          p.then(function (results) {
            _.forEach(results, function (ds) {
              if (ds.name === "Flexscada-Site-Monitoring") {
                self.influxDB = ds.database;
                self.influxID = ds.id;
              }
            });
          });

          _this.newAnnotation.tags = $location.search().tags;
          appEvents.on('graph-click', function (evt) {
            self.scope.$apply(function () {
              var t = moment(evt.pos.x1);
              self.newAnnotation.time = t.format('MMMM D YYYY, h:mm:ss a');
            });
          }, $scope);

          return _this;
        }

        _createClass(DataEditorCtrl, [{
          key: 'onInitEditMode',
          value: function onInitEditMode() {
            //  this.addEditorTab('Options', 'public/app/plugins/panel/text/editor.html');
            //  this.editorTabIndex = 1;
          }
        }, {
          key: 'onRefresh',
          value: function onRefresh() {
            this.render();
          }
        }, {
          key: 'onRender',
          value: function onRender() {
            this.updateTable();
            this.renderingCompleted();
          }
        }, {
          key: 'addAnnotation',
          value: function addAnnotation(annotation) {

            var self = this;

            var timestamp = moment(annotation.time);

            if (!timestamp.isValid()) {
              self.alertSrv.set("failed to create annotation.", "Please check that the date/time field is valid", 'error', 10000);
              return;
            }

            var line;

            line = "annotations," + annotation.tags.join(',') + " " + "title=\"" + annotation.title.replace(/[\""]/g, '\\"') + "\"," + "text=\"" + annotation.text.replace(/[\""]/g, '\\"') + "\"," + "tags=\"" + annotation.tags.join(',') + "\"" + " " + timestamp.unix() + "\n";

            var p = self.backendSrv.request(self.getInfluxWrite(line));
            p.then(function (results) {
              console.log(results);
              self.newAnnotation.title = "";
              self.newAnnotation.text = "";
              self.publishAppEvent('zoom-out', 1.0);
            });
          }
        }, {
          key: 'getInfluxQuery',
          value: function getInfluxQuery(query) {

            var self = this;

            return {
              method: 'GET',
              url: '/api/datasources/proxy/' + self.influxID + '/query',
              params: {
                precision: 's',
                epoch: 's',
                db: self.influxDB,
                q: query
              }
            };
          }
        }, {
          key: 'getInfluxWrite',
          value: function getInfluxWrite(payload) {

            var self = this;

            return {
              method: 'POST',
              url: '/api/datasources/proxy/' + self.influxID + '/write',
              params: {
                precision: 's',
                epoch: 's',
                db: self.influxDB
              },
              data: payload
            };
          }
        }, {
          key: 'influxDeleteRange',
          value: function influxDeleteRange(series) {
            var self = this;

            if (!self.dashboard || !self.dashboard.time || !self.dashboard.time.from || !(self.dashboard.time.from.unix() > 0)) {
              self.alertSrv.set("Failed to delete datapoints", "Invalid Range, Zoom to a more specific time range and try again", 'error', 10000);
              return;
            }

            var start = self.dashboard.time.from.unix();
            var end = self.dashboard.time.to.unix();

            var query = "DELETE FROM \"" + series + "\" WHERE " + self.$location.search()['var-query'] + " time > " + start + "s AND time < " + end + 's';

            var p = self.backendSrv.request(self.getInfluxQuery(query));
            p.then(function (results) {
              console.log(results);
              self.alertSrv.set("Delete Successful", "", 'success', 10000);
              self.publishAppEvent('zoom-out', 1.0);
              //  self.alertSrv.set("failed to delete device.", resp.meta.message, 'error', 10000);
            });
          }
        }, {
          key: 'deleteDataRange',
          value: function deleteDataRange() {

            var self = this;

            var start = self.dashboard.time.from.unix();
            var end = self.dashboard.time.to.unix();

            self.alertSrv.showConfirmModal({
              title: "Confirm Deletion",
              text: "Are you sure you want to delete all of the data points shown on the graph?",
              confirmText: "DESTROY",
              altActionText: "Archive",
              onAltAction: function onAltAction() {

                var query = "SELECT * INTO \"feeds_deleted\" FROM feeds WHERE " + self.$location.search()['var-query'] + "time > " + start + "s AND time < " + end + 's';
                var p = self.backendSrv.request(self.getInfluxQuery(query));
                p.then(function (result) {
                  console.log(result);
                  var moved_samples = result.results[0].series[0].values[0][1];
                  if (moved_samples > 0) {
                    console.log("Archived " + moved_samples + "measurements");
                    self.alertSrv.set("Move Complete.", "Successfully archived " + moved_samples + " measurements", 'success', 10000);
                    self.influxDeleteRange("feeds");
                  } else {
                    self.alertSrv.set("Failed to archive measurements", "For some reason we were not able to archive any measurements, All delete operations have been canceled. Please contact us if this error continues", 'error', 10000);
                  }
                });
              },
              yesText: "Destroy",
              onConfirm: function onConfirm() {
                self.influxDeleteRange("feeds");
              }
            });
          }
        }, {
          key: 'deleteAnotationRange',
          value: function deleteAnotationRange() {
            var self = this;

            self.alertSrv.showConfirmModal({
              title: "Confirm Deletion",
              text: "Are you sure you want to delete all of the annotations shown on the graph?",
              text2: "This data CANNOT be recovered.",
              confirmText: "Delete",
              yesText: "Delete",
              onConfirm: function onConfirm() {
                self.influxDeleteRange("annotations");
              }
            });
          }
        }, {
          key: 'uploadTable',
          value: function uploadTable() {

            var self = this;

            this.table.validateCells(function (valid) {

              if (valid) {

                var count = 0;
                var line = "";
                _.forEach(self.datapoints, function (row) {

                  var ts = moment(row.timestamp);
                  if (ts.isValid() && row.value && row.value && !isNaN(parseFloat(row.value))) {
                    line += "feeds," + self.$location.search().tags.join(',') + ",manual=true " + "value=" + row.value + " " + ts.unix() + "\n";
                    count++;
                  }
                });

                var p = self.backendSrv.request(self.getInfluxWrite(line));
                p.then(function (results) {
                  console.log(results);
                  self.publishAppEvent('zoom-out', 1.0);
                  self.alertSrv.set("Upload Successful", "Successfully uploaded " + count + " rows.", 'success', 10000);
                  //  self.alertSrv.set("failed to delete device.", resp.meta.message, 'error', 10000);
                });

                self.datapoints = [];
                self.table.render();
              } else {
                self.alertSrv.set("failed to upload data.", "One or more rows contain invalid timestamps, please check your data and try again", 'error', 10000);
              }
            });
          }
        }, {
          key: 'updateTable',
          value: function updateTable() {

            var self = this;

            var timeValidator = function timeValidator(value, callback) {
              if (!value || value == undefined || value.length <= 0) {
                callback(true);
              } else {
                var t = moment(value);
                if (t.isValid()) {
                  callback(true);
                } else {
                  callback(false);
                }
              }
            };

            /*
            {
                data: 'asOf',
                type: 'date',
                dateFormat: 'MM/DD/YYYY'
            },
            */
            this.tableSettings = {
              data: self.datapoints,
              minSpareRows: 3,
              columns: [{
                data: 'timestamp',
                type: 'text',
                validator: timeValidator,
                allowInvalid: true
              }, {
                data: 'value',
                type: 'numeric',
                format: '0.0000'
              }],
              stretchH: 'all',
              autoWrapRow: true,
              height: 441,
              rowHeaders: true,
              colHeaders: ['Timestamp', 'Value']
            };

            //if( self.window.document.getElementById('datatable') != null){
            self.tableElement = self.window.document.getElementById('datatable');
            self.table = new Handsontable(self.tableElement, self.tableSettings);
            //  }
          }
        }, {
          key: 'getTimeAgo',
          value: function getTimeAgo(epoch) {
            var duration = new Date().getTime() - new Date(epoch * 1000).getTime();
            if (duration < 10000) {
              return "a few seconds ago";
            }
            if (duration < 60000) {
              var secs = Math.floor(duration / 1000);
              return secs + " seconds ago";
            }
            if (duration < 3600000) {
              var mins = Math.floor(duration / 1000 / 60);
              return mins + " minutes ago";
            }
            if (duration < 86400000) {
              var hours = Math.floor(duration / 1000 / 60 / 60);
              return hours + " hours ago";
            }
            var days = Math.floor(duration / 1000 / 60 / 60 / 24);
            return days + " days ago";
          }
        }]);

        return DataEditorCtrl;
      }(PanelCtrl));

      /* Get DATA FROM influxdb
      
      // Query data from server
      var start = self.dashboard.time.from.unix();
      var end = self.dashboard.time.to.unix();
      var query = "SELECT \"value\" FROM \"feeds\" WHERE " + self.$location.search()['var-query'] + " time > " + start + "s AND time < " + end + 's';
      
      var p = self.backendSrv.request(self.getInfluxQuery(query));
      p.then(function(results) {
      
        var time_index = results[0].series[0].columns.indexOf("time");
        var value_index = results[0].series[0].columns.indexOf("value");
      
        var lines = "";
      _.forEach(results[0].series[0].values, function(row) {
      
        var ts = moment(row[time_index]);
        if (ts.isValid() && row.value && row.value && !isNaN(parseFloat(row.value))) {
          lines += "feeds_deleted," + self.$location.search().tags.join(',') + ",deleted=true " +
            "value=" + row[value_index] +
            " " + ts.unix() + "\n";
        }
      });
      */

      DataEditorCtrl.templateUrl = 'public/plugins/flexscada-app/panels/data-editor/module.html';

      _export('PanelCtrl', DataEditorCtrl);
    }
  };
});
