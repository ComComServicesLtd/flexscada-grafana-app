'use strict';

System.register(['lodash', 'jquery'], function (_export, _context) {
  "use strict";

  var _, $, _createClass, DeviceListCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_lodash) {
      _ = _lodash.default;
    }, function (_jquery) {
      $ = _jquery.default;
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

      _export('DeviceListCtrl', DeviceListCtrl = function () {

        /** @ngInject */
        function DeviceListCtrl($scope, $injector, $location, $q, backendSrv, contextSrv, alertSrv) {
          _classCallCheck(this, DeviceListCtrl);

          this.isOrgEditor = contextSrv.hasRole('Editor') || contextSrv.hasRole('Admin');
          this.backendSrv = backendSrv;
          this.alertSrv = alertSrv;
          this.$q = $q;
          this.$location = $location;
          this.pageReady = false;
          this.filter = {
            'tag': ''
          };
          this.sort_field = 'name';
          this.devices = [];
          this.refresh();
        }

        _createClass(DeviceListCtrl, [{
          key: 'refresh',
          value: function refresh() {
            this.getdevices();
          }
        }, {
          key: 'deviceTags',
          value: function deviceTags() {
            var map = {};
            _.forEach(this.devices, function (device) {
              _.forEach(device.tags, function (tag) {
                map[tag] = true;
              });
            });
            return Object.keys(map);
          }
        }, {
          key: 'setTagFilter',
          value: function setTagFilter(tag) {
            this.filter.tag = tag;
          }
        }, {
          key: 'getdevices',
          value: function getdevices() {
            var self = this;
            this.backendSrv.get('api/plugin-proxy/flexscada-app/api/v2/devices').then(function (resp) {
              if (resp.meta.code !== 200) {
                self.alertSrv.set("failed to get device list.", resp.meta.msg, 'error', 10000);
                return self.$q.reject(resp.meta.msg);
              }
              self.devices = resp.body;
              self.pageReady = true;
            });
          }
        }, {
          key: 'gotoDeviceConfig',
          value: function gotoDeviceConfig(device) {
            this.$location.url('plugins/flexscada-app/page/device-config?device=' + device.uid);
          }
        }, {
          key: 'gotoDeviceDetails',
          value: function gotoDeviceDetails(device) {
            this.$location.url('plugins/flexscada-app/page/device-details?device=' + device.uid);
          }
        }]);

        return DeviceListCtrl;
      }());

      DeviceListCtrl.templateUrl = 'public/plugins/flexscada-app/components/device/partials/device_list.html';

      _export('DeviceListCtrl', DeviceListCtrl);
    }
  };
});
