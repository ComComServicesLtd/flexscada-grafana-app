import _ from 'lodash';

class DeviceDetailsCtrl {

  /** @ngInject */
  constructor($scope, $injector, $location, $q, backendSrv, contextSrv, alertSrv) {
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

  getDevice() {
    var self = this;


    self.backendSrv.get('api/plugin-proxy/flexscada-app/api/v2/db/devices/' + self.deviceID).then(function(resp) {
      if (resp.meta.code !== 200) {
        self.alertSrv.set("failed to get device.", resp.meta.msg, 'error', 10000);
        return self.$q.reject(resp.meta.msg);
      }
      self.device = resp.body;

      if (self.device.hasOwnProperty('active_detection')) {
        self.deviceType = 2;
      } else {
        self.deviceType = 1;
      }



      self.pageReady = true;
    });
  }
  setReg(reg, val) {
    var self = this;
    return this.backendSrv.post('api/plugin-proxy/flexscada-app/api/v2/device/' + self.deviceID + '/setreg', {
        register: reg,
        value: val
      })
      .then((resp) => {
        if (resp.meta.code !== 200) {
          self.alertSrv.set("failed to set relay.", resp.meta.message, 'error', 10000);
          return self.$q.reject(resp.meta.message);
        }
      });
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


  round(i) {
    return Math.round(i * 100000) / 100000;
  }

  getTimeAgo(epoch) {
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
    this.$location.url('plugins/flexscada-app/page/device_details?device=' + id);
  }

  gotoDashboard(device, type) {
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


  editFeedData(feed) {

    var allTags = this.device.tags.concat(feed.tags);

    allTags.push("uid=" + this.deviceID);

    var query = "";

    allTags.forEach(function(tag) {

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
export {
  DeviceDetailsCtrl
};
