"use strict";

System.register(["lodash"], function (_export, _context) {
  "use strict";

  var _, _typeof, _createClass, DeviceDetailsCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_lodash) {
      _ = _lodash.default;
    }],
    execute: function () {
      _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };

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

      _export("DeviceDetailsCtrl", DeviceDetailsCtrl = function () {

        /** @ngInject */
        function DeviceDetailsCtrl($scope, $injector, $location, $q, backendSrv, contextSrv, alertSrv) {
          _classCallCheck(this, DeviceDetailsCtrl);

          this.isOrgEditor = contextSrv.hasRole("Admin") || contextSrv.hasRole("Editor");
          this.backendSrv = backendSrv;
          this.alertSrv = alertSrv;
          this.$location = $location;
          this.$q = $q;

          this.refreshEnabled = false;

          this.pageReady = false;
          this.device = null;
          this.deviceID = 0;
          this.deviceType = 0;

          if ($location.search().device) {
            this.deviceID = $location.search().device;
            this.getDevice();
          } else {
            this.alertSrv.set("no device id provided.", "", 'error', 10000);
          }
        }

        _createClass(DeviceDetailsCtrl, [{
          key: "getDevice",
          value: function getDevice() {
            var self = this;

            self.backendSrv.get('api/plugin-proxy/flexscada-app/api/v2/db/devices/' + self.deviceID).then(function (resp) {
              if (resp.meta.code !== 200) {
                self.alertSrv.set("failed to get device.", resp.meta.msg, 'error', 10000);
                return self.$q.reject(resp.meta.msg);
              }
              self.device = resp.body;

              if (self.device.hasOwnProperty('active_detection')) {
                self.deviceType = 2;
              } else if (self.device.hasOwnProperty('script')) {
                self.deviceType = 3;
              } else {
                self.deviceType = 1;
              }

              self.pageReady = true;
            });
          }
        }, {
          key: "setReg",
          value: function setReg(reg, val) {
            var self = this;
            return this.backendSrv.post('api/plugin-proxy/flexscada-app/api/v2/device/' + self.deviceID + '/setreg', {
              register: reg,
              value: val
            }).then(function (resp) {
              if (resp.meta.code !== 200) {
                self.alertSrv.set("failed to set relay.", resp.meta.message, 'error', 10000);
                return self.$q.reject(resp.meta.message);
              }
            });
          }
        }, {
          key: "setRelayQ5",
          value: function setRelayQ5(ch, val) {
            var self = this;
            return this.backendSrv.post('api/plugin-proxy/flexscada-app/api/v2/device/' + self.deviceID + '/queue_command', {
              channel: ch,
              value: val
            }).then(function (resp) {
              if (resp.meta.code !== 200) {
                self.alertSrv.set("failed to queue command.", resp.meta.message, 'error', 10000);
                return self.$q.reject(resp.meta.message);
              }
            });
          }
        }, {
          key: "monitorStateTxt",
          value: function monitorStateTxt(type) {
            var mon = this.getMonitorByTypeName(type);
            if ((typeof mon === "undefined" ? "undefined" : _typeof(mon)) !== "object") {
              return "disabled";
            }
            if (!mon.enabled) {
              return "disabled";
            }
            if (mon.state < 0 || mon.state > 2) {
              var sinceUpdate = new Date().getTime() - new Date(mon.updated).getTime();
              if (sinceUpdate < mon.frequency * 5 * 1000) {
                return 'pending';
              }
              return 'nodata';
            }
            var states = ["online", "warn", "critical"];
            return states[mon.state];
          }
        }, {
          key: "monitorStateClass",
          value: function monitorStateClass(type) {
            var mon = this.getMonitorByTypeName(type);
            if ((typeof mon === "undefined" ? "undefined" : _typeof(mon)) !== "object") {
              return "disabled";
            }
            if (!mon.enabled) {
              return "disabled";
            }
            if (mon.state < 0 || mon.state > 2) {
              return 'nodata';
            }
            var states = ["online", "warn", "critical"];
            return states[mon.state];
          }
        }, {
          key: "round",
          value: function round(i) {
            return Math.round(i * 100000) / 100000;
          }
        }, {
          key: "getTimeAgo",
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
        }, {
          key: "stateChangeStr",
          value: function stateChangeStr(type) {
            var mon = this.getMonitorByTypeName(type);
            if ((typeof mon === "undefined" ? "undefined" : _typeof(mon)) !== "object") {
              return "";
            }
            var duration = new Date().getTime() - new Date(mon.stateChange).getTime();
            if (duration < 10000) {
              return "a few seconds ago";
            }
            if (duration < 60000) {
              var secs = Math.floor(duration / 1000);
              return "for " + secs + " seconds";
            }
            if (duration < 3600000) {
              var mins = Math.floor(duration / 1000 / 60);
              return "for " + mins + " minutes";
            }
            if (duration < 86400000) {
              var hours = Math.floor(duration / 1000 / 60 / 60);
              return "for " + hours + " hours";
            }
            var days = Math.floor(duration / 1000 / 60 / 60 / 24);
            return "for " + days + " days";
          }
        }, {
          key: "getProbesForCheck",
          value: function getProbesForCheck(type) {
            var check = this.getMonitorByTypeName(type);
            if ((typeof check === "undefined" ? "undefined" : _typeof(check)) !== "object") {
              return [];
            }
            if (check.route.type === "byIds") {
              return check.route.config.ids;
            } else if (check.route.type === "byTags") {
              var probeList = {};
              _.forEach(this.probes, function (p) {
                _.forEach(check.route.config.tags, function (t) {
                  if (_.indexOf(p.tags, t) !== -1) {
                    probeList[p.id] = true;
                  }
                });
              });
              return _.keys(probeList);
            } else {
              this.alertSrv("check has unknown routing type.", "unknown route type.", "error", 5000);
              return [];
            }
          }
        }, {
          key: "setDevice",
          value: function setDevice(id) {
            this.$location.url('plugins/flexscada-app/page/device_details?device=' + id);
          }
        }, {
          key: "gotoDashboard",
          value: function gotoDashboard(device, type) {
            if (!type) {
              type = 'summary';
            }
            var search = {
              "var-probe": "All",
              "var-device": device.slug
            };
            switch (type.toLowerCase()) {
              case "summary":
                this.$location.path("/dashboard/db/flexscada-device-summary").search(search);
                break;
              case "ping":
                this.$location.path("/dashboard/db/flexscada-device-ping").search(search);
                break;
              case "dns":
                this.$location.path("/dashboard/db/flexscada-device-dns").search(search);
                break;
              case "http":
                search['var-protocol'] = "http";
                this.$location.path("/dashboard/db/flexscada-device-web").search(search);
                break;
              case "https":
                search['var-protocol'] = "https";
                this.$location.path("/dashboard/db/flexscada-device-web").search(search);
                break;
              default:
                this.$location.path("/dashboard/db/flexscada-device-summary").search(search);
                break;
            }
          }
        }, {
          key: "editFeedData",
          value: function editFeedData(feed) {

            var allTags = this.device.tags.concat(feed.tags);

            allTags.push("uid=" + this.deviceID);

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
          key: "getNotificationEmails",
          value: function getNotificationEmails(checkType) {
            var mon = this.getMonitorByTypeName(checkType);
            if (!mon || mon.healthSettings.notifications.addresses === "") {
              return [];
            }
            var addresses = mon.healthSettings.notifications.addresses.split(',');
            var list = [];
            addresses.forEach(function (addr) {
              list.push(addr.trim());
            });
            return list;
          }
        }, {
          key: "getNotificationEmailsAsString",
          value: function getNotificationEmailsAsString(checkType) {
            var emails = this.getNotificationEmails(checkType);
            if (emails.length < 1) {
              return "No recipients specified";
            }
            var list = [];
            emails.forEach(function (email) {
              // if the email in the format `display name <email@address>`
              // then just show the display name.
              var res = email.match(/\"?(.+)\"?\s*<.*@.*>/);
              if (res && res.length === 2) {
                list.push(res[1]);
              } else {
                list.push(email);
              }
            });
            return list.join(", ");
          }
        }]);

        return DeviceDetailsCtrl;
      }());

      DeviceDetailsCtrl.templateUrl = 'public/plugins/flexscada-app/components/device/partials/device_details.html';

      _export("DeviceDetailsCtrl", DeviceDetailsCtrl);
    }
  };
});
