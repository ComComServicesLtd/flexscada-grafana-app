import '../../filters/all';
import '../../directives/all';
import _ from 'lodash';
import {PanelCtrl} from 'app/plugins/sdk';
import {loadPluginCss} from 'app/plugins/sdk';

loadPluginCss({
  dark: 'plugins/flexscada-app/css/flexscada.dark.css',
  light: 'plugins/flexscada-app/css/flexscada.light.css'
});

class DeviceListCtrl extends PanelCtrl {

  /** @ngInject */
  constructor($scope, $injector, $location, $q, backendSrv, contextSrv, alertSrv) {
    super($scope, $injector);
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

  initEditMode() {
    super.initEditMode();
    this.icon = 'fa fa-text-width';
    this.addEditorTab('Options', 'public/plugins/flexscada-app/panels/device-list/editor.html');
    this.editorTabIndex = 1;
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

// If editing, update /device/device_list.js
  editFeedData(feed) {

    var allTags = this.device.tags.concat(feed.tags);

    allTags.push("uid=" + this.device.uid);

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
  DeviceListCtrl as PanelCtrl
};
