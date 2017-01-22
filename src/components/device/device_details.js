import _ from 'lodash';

class DeviceDetailsCtrl {

  /** @ngInject */
  constructor($scope, $injector, $location,$q, backendSrv, contextSrv, alertSrv) {
    this.isOrgEditor = contextSrv.hasRole("Admin") || contextSrv.hasRole("Editor");
    this.backendSrv = backendSrv;
    this.alertSrv = alertSrv;
    this.$location = $location;
    this.$q = $q;

    this.pageReady = false;
    this.device = null;

    if ($location.search().device) {
      this.getDevice($location.search().device);
    } else {
      this.alertSrv.set("no device id provided.", "", 'error', 10000);
    }

  }


  getDevice(id) {
    var self = this;

    self.backendSrv.get('api/plugin-proxy/flexscada-app/api/vibration/v1/config/'+id).then(function(resp) {
      if (resp.meta.code !== 200) {
        self.alertSrv.set("failed to get device.", resp.meta.msg, 'error', 10000);
        return self.$q.reject(resp.meta.msg);
      }
      self.device = resp.body;
      var getProbes = false;
      _.forEach(self.device.checks, function(check) {
        if (check.route.type === 'byTags') {
          getProbes = true;
        }
      });
      if (getProbes) {
        self.getProbes().then(() => {
          self.pageReady = true;
        });
      } else {
        self.pageReady = true;
      }
    });
  }

  getProbes() {
    var self = this;
    return self.backendSrv.get('api/plugin-proxy/flexscada-app/api/v2/probes').then(function(resp) {
      if (resp.meta.code !== 200) {
        self.alertSrv.set("failed to get probes.", resp.meta.msg, 'error', 10000);
        return self.$q.reject(resp.meta.msg);
      }
      self.probes = resp.body;
    });
  }

  getMonitorByTypeName(name) {
    var check;
    _.forEach(this.device.checks, function(c) {
      if (c.type.toLowerCase() === name.toLowerCase()) {
        check = c;
      }
    });
    return check;
  }

  monitorStateTxt(type) {
    var mon = this.getMonitorByTypeName(type);
    if (typeof(mon) !== "object") {
      return "disabled";
    }
    if (!mon.enabled) {
      return "disabled";
    }
    if (mon.state < 0 || mon.state > 2) {
      var sinceUpdate = new Date().getTime() - new Date(mon.updated).getTime();
      if (sinceUpdate < (mon.frequency * 5 * 1000)) {
        return 'pending';
      }
      return 'nodata';
    }
    var states = ["online", "warn", "critical"];
    return states[mon.state];
  }

  monitorStateClass(type) {
    var mon = this.getMonitorByTypeName(type);
    if (typeof(mon) !== "object") {
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

  stateChangeStr(type) {
    var mon = this.getMonitorByTypeName(type);
    if (typeof(mon) !== "object") {
      return "";
    }
    var duration = new Date().getTime() - new Date(mon.stateChange).getTime();
    if (duration < 10000) {
      return "a few seconds ago";
    }
    if (duration < 60000) {
      var secs = Math.floor(duration/1000);
      return "for " + secs + " seconds";
    }
    if (duration < 3600000) {
      var mins = Math.floor(duration/1000/60);
      return "for " + mins + " minutes";
    }
    if (duration < 86400000) {
      var hours = Math.floor(duration/1000/60/60);
      return "for " + hours + " hours";
    }
    var days = Math.floor(duration/1000/60/60/24);
    return "for " + days + " days";
  }

  getProbesForCheck(type) {
    var check = this.getMonitorByTypeName(type);
    if (typeof(check) !== "object") {
      return [];
    }
    if (check.route.type === "byIds") {
      return check.route.config.ids;
    } else if (check.route.type === "byTags") {
      var probeList = {};
      _.forEach(this.probes, function(p) {
        _.forEach(check.route.config.tags, function(t) {
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

  setDevice(id) {
    this.$location.url('plugins/flexscada-app/page/device_details?device='+id);
  }

  gotoDashboard(device, type) {
    if (!type) {
      type = 'summary';
    }
    var search = {
      "var-probe": "All",
      "var-device": device.slug
    };
    switch(type.toLowerCase()) {
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

  gotoEventDashboard(device, type) {
    this.$location.url("/dashboard/db/flexscada-events").search({
      "var-probe": "All",
      "var-device": device.slug,
      "var-monitor_type": type.toLowerCase()
    });
  }

  getNotificationEmails(checkType) {
    var mon = this.getMonitorByTypeName(checkType);
    if (!mon || mon.healthSettings.notifications.addresses === "") {
      return [];
    }
    var addresses = mon.healthSettings.notifications.addresses.split(',');
    var list = [];
    addresses.forEach(function(addr) {
      list.push(addr.trim());
    });
    return list;
  }

  getNotificationEmailsAsString(checkType) {
    var emails = this.getNotificationEmails(checkType);
    if (emails.length < 1) {
      return "No recipients specified";
    }
    var list = [];
    emails.forEach(function(email) {
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
}

DeviceDetailsCtrl.templateUrl = 'public/plugins/flexscada-app/components/device/partials/device_details.html';
export {DeviceDetailsCtrl};
