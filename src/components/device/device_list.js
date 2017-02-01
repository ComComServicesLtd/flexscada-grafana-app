import _ from 'lodash';
import $ from 'jquery';

class DeviceListCtrl {

  /** @ngInject */
  constructor($scope, $injector, $location, $q, backendSrv, contextSrv, alertSrv) {
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
    this.devices = {};
    this.refresh();
    this.devicestate = {
      "0": 0,
      "1": 0,
      "2": 0,
      "-1": 0,
    };
  }

  refresh() {
    this.getdevices();
  }

  deviceTags() {
    var map = {};
    _.forEach(this.devices, function(device) {
      _.forEach(device.tags, function(tag) {
        map[tag] = true;
      });
    });
    return Object.keys(map);
  }

  setTagFilter(tag) {
    this.filter.tag = tag;
  }

  getdevices() {
    var self = this;
    this.backendSrv.get('api/plugin-proxy/flexscada-app/api/vibration/v1/org/1/devices').then(function(resp) {
      if (resp.meta.code !== 200) {
        self.alertSrv.set("failed to get device list.", resp.meta.msg, 'error', 10000);
        return self.$q.reject(resp.meta.msg);
      }
      self.devices = resp.body;
      self.pageReady = true;
    });
  }

  monitorStateTxt(device, type) {

    var state = 0;

    if (type === "battery") {
      state = 0;

    } else if (type === "link") {
      state = 0;

    } else if (type === "sensors") {
      state = 0;

    }

    var states = ["online", "warn", "critical"];
    return states[state];
  }

  monitorStateStr(device, type) {

    if (type === "battery") {
      return "Battery at 90% charge level";

    } else if (type === "link") {
      return "14% Signal";

    } else if (type === "sensors") {
      return "4 of 4 Registered sensors online";
    }

    return "Unknown Metric";
  }

  gotoDashboard(device, evt) {
    var clickTargetIsLinkOrHasLinkParents = $(evt.target).closest('a').length > 0;
    if (clickTargetIsLinkOrHasLinkParents === false) {
      this.$location.path("/dashboard/db/flexscada-device-summary").search({
        "var-collector": "All",
        "var-device": device.slug
      });
    }
  }

  gotoDeviceURL(device) {
    this.$location.url('plugins/flexscada-app/page/device-details?device=' + device.id);
  }
}

DeviceListCtrl.templateUrl = 'public/plugins/flexscada-app/components/device/partials/device_list.html';
export {
  DeviceListCtrl
};
