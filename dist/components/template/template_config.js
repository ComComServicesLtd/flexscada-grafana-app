'use strict';

System.register(['lodash', 'angular'], function (_export, _context) {
  "use strict";

  var _, angular, _createClass, TemplateConfigCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_lodash) {
      _ = _lodash.default;
    }, function (_angular) {
      angular = _angular.default;
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

      _export('TemplateConfigCtrl', TemplateConfigCtrl = function () {
        /** @ngInject */
        function TemplateConfigCtrl($scope, $injector, $rootScope, $location, $modal, $anchorScroll, $timeout, $window, $q, backendSrv, alertSrv) {
          _classCallCheck(this, TemplateConfigCtrl);

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

          this.config = {};
          this.config.measurements = [];
          this.config.tags = [];
          this.config.parameters = {};

          this.deviceStatus = 0; // 0 = new, stage 1, 1 = new, adding information stage, 2 = existing
          this.templateId = 0;
          this.ignoreChanges = false;
          this.showMeasurement = -1;

          $window.console.log($location.search());
          if ("template" in $location.search()) {
            this.deviceStatus = 2;
            this.templateId = $location.search().template;
            this.loadTemplate();
          } else {
            this.deviceStatus = 0;
          }

          self.pageReady = true;

          $window.onbeforeunload = function () {
            if (self.ignoreChanges) {
              return;
            }
            if (self.changesPending()) {
              return "There are unsaved changes to this dashboard";
            }
          };

          $scope.$on('$locationChangeStart', function (event, next) {
            if (!self.ignoreChanges && self.changesPending()) {
              event.preventDefault();
              var baseLen = $location.absUrl().length - $location.url().length;
              var nextUrl = next.substring(baseLen);
              var modalScope = $scope.$new();
              modalScope.ignore = function () {
                self.ignoreChanges = true;
                $location.url(nextUrl);
                return;
              };

              modalScope.save = function () {
                self.savePending(nextUrl);
              };

              $rootScope.appEvent('show-modal', {
                src: 'public/app/partials/unsaved-changes.html',
                modalClass: 'confirm-modal',
                scope: modalScope
              });
            }
          });

          this.templateTypes = [{
            value: 0,
            label: 'Manual'
          }, {
            value: 1,
            label: 'Bearing (Vendor Supplied Ratios)'
          }, {
            value: 2,
            label: 'Bearing (Manual)'
          }];

          this.measurementAggregationOptions = [{
            value: 0,
            label: 'Average'
          }, {
            value: 1,
            label: 'Peak'
          }];

          this.measurementUnits = [{
            value: false,
            label: 'HZ'
          }, {
            value: true,
            label: 'CPM'
          }];
        }

        _createClass(TemplateConfigCtrl, [{
          key: 'typeChanged',
          value: function typeChanged() {

            this.config.measurements = this.config.measurements.filter(function (obj) {
              return obj.generated !== true;
            });

            // Loop through each generated measurement and delete it
            if (this.config.type > 0) {

              this.config.measurements.push({
                label: "Shaft Alignment",
                frequency: "RPM",
                width_bins: 2,
                generated: true,
                useCPM: true
              });

              this.config.measurements.push({
                label: "Shaft Alignment 1st Harmonic",
                frequency: "RPM * 2",
                width_bins: 2,
                generated: true,
                useCPM: true
              });

              this.config.measurements.push({
                label: "Inner Race Defect",
                frequency: "BPFI * RPM",
                width_bins: 2,
                generated: true,
                useCPM: true
              });

              this.config.measurements.push({
                label: "Inner Race Defect 1st harmonic",
                frequency: "BPFI * RPM * 2",
                width_bins: 2,
                generated: true,
                useCPM: true
              });

              this.config.measurements.push({
                label: "Outer Race Defect",
                frequency: "BPFO * RPM",
                width_bins: 2,
                generated: true,
                useCPM: true
              });

              this.config.measurements.push({
                label: "Outer Race Defect 1st harmonic",
                frequency: "BPFO * RPM * 2",
                width_bins: 2,
                generated: true,
                useCPM: true
              });

              this.config.measurements.push({
                label: "Cage Defect",
                frequency: "BTF * RPM",
                width_bins: 2,
                generated: true,
                useCPM: true
              });

              this.config.measurements.push({
                label: "Cage Defect 1st harmonic",
                frequency: "BTF * RPM * 2",
                width_bins: 2,
                generated: true,
                useCPM: true
              });

              this.config.measurements.push({
                label: "Rolling Element Defect",
                frequency: "BSF * RPM",
                width_bins: 2,
                generated: true,
                useCPM: true
              });

              this.config.measurements.push({
                label: "Rolling Element Defect 1st harmonic",
                frequency: "BTF * RPM * 2",
                width_bins: 2,
                generated: true,
                useCPM: true
              });

              this.config.measurements.push({
                label: "Lubrication",
                frequency: "RPM * 26.6",
                width_bins: 100,
                generated: true,
                useCPM: true
              });
            }
          }
        }, {
          key: 'reset',
          value: function reset() {
            var self = this;
            this.showConfig = false;
            this.config = {};
          }
        }, {
          key: 'cancel',
          value: function cancel() {
            this.reset();
            this.ignoreChanges = true;
            this.$window.history.back();
          }
        }, {
          key: 'toggleEditMeasurement',
          value: function toggleEditMeasurement(index) {
            if (this.showMeasurement == index) {
              this.showMeasurement = -1;
            } else {
              this.showMeasurement = index;
            }
          }
        }, {
          key: 'addMeasurement',
          value: function addMeasurement() {
            if (!this.config.measurements) {
              this.config.measurements = [];
            }

            var index = this.config.measurements.push({
              "frequency": "0",
              "label": "New Measurement, Click to edit",
              "notes": "",
              "width_bins": 2,
              "useCPM": false
            }) - 1;

            this.showMeasurement = index;
          }
        }, {
          key: 'deleteMeasurement',
          value: function deleteMeasurement(index) {
            this.config.measurements.splice(index, 1);
            this.showMeasurement = -1;
          }
        }, {
          key: 'addTemplate',
          value: function addTemplate() {
            if (!this.config.name) {
              return;
            }

            this.deviceStatus = 1;
          }
        }, {
          key: 'removeTemplate',
          value: function removeTemplate() {
            var self = this;
            return this.backendSrv.delete('api/plugin-proxy/flexscada-app/api/v2/db/templates/' + this.templateId).then(function (resp) {
              if (resp.meta.code != 200) {
                self.alertSrv.set("failed to delete device.", resp.meta.msg, 'error', 10000);
                return self.$q.reject(resp.meta.msg);
              }
              self.$location.path('plugins/flexscada-app/page/templates');
            });
          }
        }, {
          key: 'saveTemplate',
          value: function saveTemplate() {
            var _this = this;

            this.config.orgid = this.$rootScope.contextSrv.user.orgId;
            this.config.userid = this.$rootScope.contextSrv.user.id;

            var self = this;
            this.config.version = this.config.version + 1;
            return this.backendSrv.put('api/plugin-proxy/flexscada-app/api/v2/db/templates/' + this.templateId + (this.deviceStatus === 1 ? '/?create=true' : ''), this.config).then(function (resp) {
              self.$window.console.log(resp);
              if (resp.meta.code != 200) {
                self.alertSrv.set("failed to update device.", resp.meta.msg, 'error', 10000);
                return self.$q.reject(resp.meta.msg);
              }

              _this.$location.url('plugins/flexscada-app/page/templates');
            });
          }
        }, {
          key: 'loadTemplate',
          value: function loadTemplate() {
            var _this2 = this;

            var self = this;
            return this.backendSrv.get('api/plugin-proxy/flexscada-app/api/v2/db/templates/' + this.templateId).then(function (resp) {
              self.$window.console.log("Response:");
              self.$window.console.log(resp);
              if (resp.meta.code != 200) {
                self.alertSrv.set("failed to download template.", resp.meta.msg, 'error', 10000);
                _this2.$location.url('plugins/flexscada-app/page/templates');
                return self.$q.reject(resp.meta.msg);
              }
              self.config = resp.body;
              _this2.deviceStatus = 2;
            });
          }
        }, {
          key: 'deleteItem',
          value: function deleteItem(_array, id) {
            _array.splice(id, 1);
          }
        }, {
          key: 'changesPending',
          value: function changesPending() {
            var self = this;
            var changes = false;

            return changes;
          }
        }]);

        return TemplateConfigCtrl;
      }());

      TemplateConfigCtrl.templateUrl = 'public/plugins/flexscada-app/components/template/partials/template_config.html';

      _export('TemplateConfigCtrl', TemplateConfigCtrl);
    }
  };
});
