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
          this.config.ds18b20 = {};
          this.config.channels = {};
          this.deviceStatus = 0; // 0 = new, stage 1, 1 = new, adding information stage, 2 = exiting

          this.ignoreChanges = false;

          $window.console.log($location.search());
          if ("device" in $location.search()) {
            this.deviceStatus = 2;
            this.loadDevice($location.search().device);
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
            if (!this.config.uid) {
              return;
            }

            var qtype = new RegExp("Q[0-9]*$");
            var ctype = new RegExp("C[0-9]*$");

            if (this.config.uid.match(qtype)) {
              this.config.type = 1;
            } else if (this.config.uid.match(ctype)) {
              this.config.type = 2;
            } else {
              this.alertSrv.set("Invalid UID", "UID should look like 'Q1535235511'", 'error', 5000);
              return;
            }
            this.deviceStatus = 1;
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
            return this.backendSrv.delete('api/plugin-proxy/flexscada-app/api/v2/config/' + this.config.uid).then(function (resp) {
              if (resp.meta.code !== 200) {
                self.alertSrv.set("failed to delete device.", resp.meta.message, 'error', 10000);
                return self.$q.reject(resp.meta.message);
              }
              self.$location.path('plugins/flexscada-app/page/devices');
            });
          }
        }, {
          key: 'saveDevice',
          value: function saveDevice() {
            var _this = this;

            this.config.orgid = this.$rootScope.contextSrv.user.orgId;
            this.config.userid = this.$rootScope.contextSrv.user.id;

            var self = this;
            return this.backendSrv.put('api/plugin-proxy/flexscada-app/api/v2/config/' + this.config.uid + (this.deviceStatus === 1 ? '/?create=true' : ''), this.config).then(function (resp) {
              self.$window.console.log(resp);
              if (resp.meta.code !== 200) {
                self.alertSrv.set("failed to update device.", resp.meta.message, 'error', 10000);
                return self.$q.reject(resp.meta.message);
              }
              _this.deviceStatus = 2;
            });
          }
        }, {
          key: 'loadDevice',
          value: function loadDevice(uid) {
            var _this2 = this;

            var self = this;
            return this.backendSrv.get('api/plugin-proxy/flexscada-app/api/v2/config/' + uid).then(function (resp) {
              self.$window.console.log(resp);
              if (resp.meta.code !== 200) {
                self.alertSrv.set("failed to update device.", resp.meta.message, 'error', 10000);
                return self.$q.reject(resp.meta.message);
              }
              self.config = resp.body;
              _this2.deviceStatus = 2;
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
