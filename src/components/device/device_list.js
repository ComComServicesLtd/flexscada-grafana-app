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
    this.devices = [];
    this.refresh();

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
    this.backendSrv.get('api/plugin-proxy/flexscada-app/api/v2/db/devices').then(function(resp) {
      if (resp.meta.code !== 200) {
        self.alertSrv.set("failed to get device list.", resp.meta.msg, 'error', 10000);
        return self.$q.reject(resp.meta.msg);
      }
      self.devices = resp.body;
      self.pageReady = true;
    });
  }



  gotoDeviceConfig(device) {
    this.$location.url('plugins/flexscada-app/page/device-config?device=' + device.id);
  }

  gotoDeviceDetails(device) {
    var deviceType = 1;

    if (device.hasOwnProperty('active_detection')) {
      deviceType = 2;
    } else if (device.hasOwnProperty('script')) {
      deviceType = 3;
    }

    if (deviceType == 1) {

      this.$location.url('plugins/flexscada-app/page/device-details?device=' + device.id);
    }


    if (deviceType == 2) { // Flexs C2

      this.$location.url("/dashboard/db/flexsc2").search({
        "var-Uid": device.id,
        "var-Device": device.name
      });

    }

    if (deviceType == 3) { // Flexs Q5

      this.$location.url("/dashboard/db/device-overview").search({
        "var-Uid": device.id,
        "var-Device": device.name
      });

    }






  }

}

DeviceListCtrl.templateUrl = 'public/plugins/flexscada-app/components/device/partials/device_list.html';
export {
  DeviceListCtrl
};
