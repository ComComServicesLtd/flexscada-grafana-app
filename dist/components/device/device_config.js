'use strict';

System.register(['lodash', 'angular'], function (_export, _context) {
  "use strict";

  var _, angular, _createClass, DeviceConfigCtrl;

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

      _export('DeviceConfigCtrl', DeviceConfigCtrl = function () {
        /** @ngInject */
        function DeviceConfigCtrl($scope, $injector, $rootScope, $location, $modal, $anchorScroll, $timeout, $window, $q, backendSrv, alertSrv) {
          _classCallCheck(this, DeviceConfigCtrl);

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
          this.templates = [];
          this.config.ds18b20 = {};
          this.config.channels = {};
          this.config.relays = [];
          this.config.feeds = [];
          this.config.tags = [];
          this.deviceStatus = 0; // 0 = new, stage 1, 1 = new, adding information stage, 2 = exiting
          this.deviceType = 0; // 1 = Q4, 2 = C2
          this.deviceID = '';
          this.ignoreChanges = false;

          this.rpmOptions = [{
            value: true,
            label: 'Auto'
          }, {
            value: false,
            label: 'Manual'
          }];

          this.intervalOptions = [{
            value: 60,
            label: 'Every Minute'
          }, {
            value: 300,
            label: 'Every 5 Minutes'
          }, {
            value: 600,
            label: 'Every 10 Minutes'
          }, {
            value: 1800,
            label: 'Every Half Hour'
          }, {
            value: 3600,
            label: 'Every Hour'
          }, {
            value: 14400,
            label: 'Every 4 hours'
          }, {
            value: 28800,
            label: 'Every 8 Hours'
          }, {
            value: 86400,
            label: 'Every 24 Hours'
          }];

          this.highResRates = [{
            value: 2500,
            label: '2.5 kSPS'
          }, {
            value: 5000,
            label: '5 kSPS'
          }, {
            value: 10000,
            label: '10 kSPS'
          }, {
            value: 20000,
            label: '20 kSPS'
          }, {
            value: 31250,
            label: '31.250 kSPS'
          }, {
            value: 62500,
            label: '62.5 kSPS'
          }];

          this.lowResRates = [{
            value: 3906,
            label: '3.096 kSPS'
          }, {
            value: 2500,
            label: '2.5 kSPS'
          }];

          this.sampleCountOptions = [{
            value: 8192,
            label: '8,192 samples'
          }, {
            value: 16384,
            label: '16,384 samples'
          }, {
            value: 32768,
            label: '32,768 samples'
          }, {
            value: 65536,
            label: '65,536 samples'
          }, {
            value: 131072,
            label: '131,072 samples'
          }, {
            value: 262144,
            label: '262,144 samples'
          }];

          $window.console.log($location.search());
          if ("device" in $location.search()) {
            this.deviceStatus = 2;
            this.deviceID = $location.search().device;
            this.loadDevice();
          } else {
            this.deviceStatus = 0;
          }

          //    self.getTemplates();

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
        }

        _createClass(DeviceConfigCtrl, [{
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
          key: 'addDevice',
          value: function addDevice() {

            if (!this.deviceID) {
              return;
            }

            var qtype = new RegExp("Q[0-9]*$");
            var ctype = new RegExp("C[0-9]*$");

            if (this.deviceID.match(qtype)) {
              this.deviceType = 1;
            } else if (this.deviceID.match(ctype)) {
              this.deviceType = 2;
            } else {
              this.alertSrv.set("Invalid UID", "UID should look like 'Q1535235511'", 'error', 5000);
              return;
            }
            this.deviceStatus = 1;
            //this.config.uid.replace(/\D/g,'');// We only want the uid number
            this.deviceID = this.deviceID.substring(1); // We only want the uid number
          }
        }, {
          key: 'addDs18b20',
          value: function addDs18b20() {
            this.config.ds18b20[this.newTempSensorID] = {};
            this.config.ds18b20[this.newTempSensorID].label = "New Sensor (Click to edit)";
            this.newTempSensorID = '';
          }
        }, {
          key: 'delDs18b20',
          value: function delDs18b20(id) {
            delete this.config.ds18b20[id];
            this.$window.console.log(this.config);
          }
        }, {
          key: 'removeDevice',
          value: function removeDevice() {
            var self = this;
            return this.backendSrv.delete('api/plugin-proxy/flexscada-app/api/v2/db/devices/' + this.deviceID).then(function (resp) {
              if (resp.meta.code !== 200) {
                self.alertSrv.set("failed to delete device.", resp.meta.msg, 'error', 10000);
                return self.$q.reject(resp.meta.msg);
              }
              self.$location.path('plugins/flexscada-app/page/devices');
            });
          }
        }, {
          key: 'saveDevice',
          value: function saveDevice() {
            var _this = this;

            //  this.config.orgid = this.$rootScope.contextSrv.user.orgId;
            //  this.config.userid = this.$rootScope.contextSrv.user.id;

            if (this.deviceType == 2) {
              // If Flexs C2, Increment version number
              this.config.version = this.config.version + 1;
            }

            var self = this;
            return this.backendSrv.put('api/plugin-proxy/flexscada-app/api/v2/db/devices/' + this.deviceID + (this.deviceStatus === 1 ? '/?create=true' : ''), this.config).then(function (resp) {
              self.$window.console.log(resp);
              if (resp.meta.code !== 200) {
                self.alertSrv.set("failed to update device.", resp.meta.msg, 'error', 10000);
                return self.$q.reject(resp.meta.msg);
              }
              _this.deviceStatus = 2;
              _this.$location.url('plugins/flexscada-app/page/devices'); // go back to devices page
            });
          }
        }, {
          key: 'loadDevice',
          value: function loadDevice() {
            var _this2 = this;

            var self = this;
            return this.backendSrv.get('api/plugin-proxy/flexscada-app/api/v2/db/devices/' + this.deviceID).then(function (resp) {
              self.$window.console.log(resp);
              if (resp.meta.code !== 200) {
                self.alertSrv.set("failed to update device.", resp.meta.msg, 'error', 10000);
                _this2.$location.url('plugins/flexscada-app/page/devices'); // go back to devices page
                return self.$q.reject(resp.meta.msg);
              }
              self.config = resp.body;

              if (self.config.hasOwnProperty('active_detection')) {
                self.deviceType = 2;
              } else {
                self.deviceType = 1;
              }

              _this2.deviceStatus = 2;
            });
          }
        }, {
          key: 'setTemplate',
          value: function setTemplate(channel, value) {
            console.log(channel);
            console.log(value);
            this.config.channels[channel].template = value.value;
          }
        }, {
          key: 'getTemplates',
          value: function getTemplates() {
            var self = this;
            return this.backendSrv.get('api/plugin-proxy/flexscada-app/api/v2/available_templates').then(function (resp) {
              self.$window.console.log(resp);
              if (resp.meta.code !== 200) {
                self.alertSrv.set("failed to donwload templates.", resp.meta.msg, 'error', 10000);
                return self.$q.reject(resp.meta.msg);
              }
              self.templates = resp.body;
            });
          }
        }, {
          key: 'addFeed',
          value: function addFeed() {
            if (!this.config.feeds) {
              this.config.feeds = [];
            }
            this.config.feeds.push({});
          }
        }, {
          key: 'addRelay',
          value: function addRelay() {
            if (!this.config.relays) {
              this.config.relays = [];
            }
            this.config.relays.push({});
          }
        }, {
          key: 'deleteItem',
          value: function deleteItem(_array, id) {
            _array.splice(id, 1);
          }
        }, {
          key: 'gotoDashboard',
          value: function gotoDashboard() {
            // Load the devices dashboard
          }
        }, {
          key: 'changesPending',
          value: function changesPending() {
            var self = this;
            var changes = false;

            return changes;
          }
        }]);

        return DeviceConfigCtrl;
      }());

      DeviceConfigCtrl.templateUrl = 'public/plugins/flexscada-app/components/device/partials/device_config.html';

      _export('DeviceConfigCtrl', DeviceConfigCtrl);
    }
  };
});
