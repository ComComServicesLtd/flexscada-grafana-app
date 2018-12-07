'use strict';

System.register(['../../filters/all', '../../directives/all', 'lodash', 'app/plugins/sdk'], function (_export, _context) {
  "use strict";

  var _, PanelCtrl, loadPluginCss, _createClass, _get, DeviceListCtrl;

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
    setters: [function (_filtersAll) {}, function (_directivesAll) {}, function (_lodash) {
      _ = _lodash.default;
    }, function (_appPluginsSdk) {
      PanelCtrl = _appPluginsSdk.PanelCtrl;
      loadPluginCss = _appPluginsSdk.loadPluginCss;
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

      _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;
        var desc = Object.getOwnPropertyDescriptor(object, property);

        if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);

          if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;

          if (getter === undefined) {
            return undefined;
          }

          return getter.call(receiver);
        }
      };

      loadPluginCss({
        dark: 'plugins/flexscada-app/css/flexscada.dark.css',
        light: 'plugins/flexscada-app/css/flexscada.light.css'
      });

      _export('PanelCtrl', DeviceListCtrl = function (_PanelCtrl) {
        _inherits(DeviceListCtrl, _PanelCtrl);

        /** @ngInject */
        function DeviceListCtrl($scope, $injector, $location, $q, backendSrv, contextSrv, alertSrv) {
          _classCallCheck(this, DeviceListCtrl);

          var _this = _possibleConstructorReturn(this, (DeviceListCtrl.__proto__ || Object.getPrototypeOf(DeviceListCtrl)).call(this, $scope, $injector));

          _this.isOrgEditor = contextSrv.hasRole('Editor') || contextSrv.hasRole('Admin');
          _this.backendSrv = backendSrv;
          _this.alertSrv = alertSrv;
          _this.$q = $q;
          _this.$location = $location;
          _this.pageReady = false;
          _this.filter = {
            'tag': ''
          };
          _this.sort_field = 'name';
          _this.devices = [];
          _this.refresh();
          return _this;
        }

        _createClass(DeviceListCtrl, [{
          key: 'initEditMode',
          value: function initEditMode() {
            _get(DeviceListCtrl.prototype.__proto__ || Object.getPrototypeOf(DeviceListCtrl.prototype), 'initEditMode', this).call(this);
            this.icon = 'fa fa-text-width';
            this.addEditorTab('Options', 'public/plugins/flexscada-app/panels/device-list/editor.html');
            this.editorTabIndex = 1;
          }
        }, {
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
          key: 'editFeedData',
          value: function editFeedData(feed) {

            var allTags = this.device.tags.concat(feed.tags);

            allTags.push("uid=" + this.device.uid);

            var query = "";

            allTags.forEach(function (tag) {

              var tag_value = tag.split('=');
              var key = tag_value[0];
              var value = tag_value[1];

              query += '"' + key + '" = \'' + value + '\' AND ';
            });

            this.$location.url("/dashboard/db/flexscada-data-edit").search({
              "var-query": query,
              "var-label": this.device.name + " " + feed.label,
              "tags": allTags
            });
          }
        }, {
          key: 'getdevices',
          value: function getdevices() {
            var self = this;
            this.backendSrv.get('api/plugin-proxy/flexscada-app/api/v2/db/devices').then(function (resp) {
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
            this.$location.url('plugins/flexscada-app/page/device-config?device=' + device.id);
          }
        }, {
          key: 'gotoDeviceDetails',
          value: function gotoDeviceDetails(device) {
            var deviceType = 1;

            if (device.hasOwnProperty('active_detection')) {
              deviceType = 2;
            } else if (device.hasOwnProperty('script')) {
              deviceType = 3;
            }

            if (deviceType == 1) {

              this.$location.url('plugins/flexscada-app/page/device-details?device=' + device.id);
            }

            if (deviceType == 2) {
              // Flexs C2

              this.$location.url("/dashboard/db/flexsc2").search({
                "var-Uid": device.id,
                "var-Device": device.name
              });
            }

            if (deviceType == 3) {
              // Flexs Q5

              this.$location.url("/dashboard/db/device-overview").search({
                "var-Uid": device.id,
                "var-Device": device.name
              });
            }
          }
        }]);

        return DeviceListCtrl;
      }(PanelCtrl));

      DeviceListCtrl.templateUrl = 'public/plugins/flexscada-app/components/device/partials/device_list.html';

      _export('PanelCtrl', DeviceListCtrl);
    }
  };
});
