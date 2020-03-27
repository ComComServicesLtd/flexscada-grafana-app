'use strict';

System.register(['lodash', 'angular', 'app/core/core'], function (_export, _context) {
  "use strict";

  var _, angular, appEvents, _createClass, NewDeviceCtrl;

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
    }, function (_appCoreCore) {
      appEvents = _appCoreCore.appEvents;
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

      _export('NewDeviceCtrl', NewDeviceCtrl = function () {
        /** @ngInject */
        function NewDeviceCtrl($scope, $injector, $rootScope, $location, $modal, $anchorScroll, $timeout, $window, $q, backendSrv, alertSrv) {
          _classCallCheck(this, NewDeviceCtrl);

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

          this.type = 0; // 1 = Q4, 2 = C2
          this.uid = "";
          this.password = "";

          this.deviceTypes = [{
            value: 3,
            label: 'Flexs Q5'
          }, {
            value: 1,
            label: 'Flexs Q4'
          }, {
            value: 2,
            label: 'Flexs C2'
          }];

          if ("uid" in $location.search()) this.uid = $location.search().uid;

          if ("type" in $location.search()) this.type = $location.search().type;
        }

        _createClass(NewDeviceCtrl, [{
          key: 'addDevice',
          value: function addDevice() {
            var _this = this;

            debugger;

            if (this.uid.length < 4) {
              //  this.alertSrv.set("Invalid UID", "UID should look like '1535235511'", 'error', 5000);
              appEvents.emit('alert-error', ['Invalid UID', "UID should look like '1535235511'"]);
              return;
            }

            if (this.type == 1) {
              // For Flexs Q4 we redirect to the device-config page
              this.$location.url("plugins/flexscada-app/page/device-config").search({
                "device": this.uid,
                "type": this.type,
                "new": "true"
              });
            } else {
              // For Flexs Q5 (Type 3) and Flexs C2 (Type 2) we first check that the device is available for adding, if it is we simply update the password and set the owner

              // If the device is a Q5 or C2 we try to adopt it

              var self = this;
              return this.backendSrv.post('api/plugin-proxy/flexscada-app/api/v2/adopt/' + self.uid, { password: self.password }).then(function (resp) {
                self.$window.console.log(resp);
                if (resp.meta.code !== 200) {
                  //  self.alertSrv.set("failed to adopt device.", resp.meta.msg, 'error', 10000);
                  appEvents.emit('alert-error', ['Failed to adopt device.', resp.meta.msg]);
                  return self.$q.reject(resp.meta.msg);
                }
                //self.alertSrv.set("Success", resp.meta.msg, 'success', 10000);
                appEvents.emit('alert-success', [resp.meta.msg, '']);
                _this.$location.url('plugins/flexscada-app/page/devices'); // go back to devices page
              });
            }
          }
        }]);

        return NewDeviceCtrl;
      }());

      NewDeviceCtrl.templateUrl = 'public/plugins/flexscada-app/components/device/partials/new_device.html';

      _export('NewDeviceCtrl', NewDeviceCtrl);
    }
  };
});
