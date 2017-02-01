import _ from 'lodash';
import angular from 'angular';

var _defaultCheck = {
  settings: {},
  healthSettings: {
    notifications: {},
    num_collectors: 3,
    steps: 3
  },
  route: {
    type: "byIds",
    config: {
      "ids": []
    }
  }
};

class DeviceConfigCtrl {
  /** @ngInject */
  constructor($scope, $injector, $rootScope, $location, $modal, $anchorScroll, $timeout, $window, $q, backendSrv, alertSrv) {
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

    $window.onbeforeunload = function() {
      if (self.ignoreChanges) {
        return;
      }
      if (self.changesPending()) {
        return "There are unsaved changes to this dashboard";
      }
    };

    $scope.$on('$locationChangeStart', function(event, next) {
      if ((!self.ignoreChanges) && (self.changesPending())) {
        event.preventDefault();
        var baseLen = $location.absUrl().length - $location.url().length;
        var nextUrl = next.substring(baseLen);
        var modalScope = $scope.$new();
        modalScope.ignore = function() {
          self.ignoreChanges = true;
          $location.url(nextUrl);
          return;
        };

        modalScope.save = function() {
          self.savePending(nextUrl);
        };

        $rootScope.appEvent('show-modal', {
          src: 'public/app/partials/unsaved-changes.html',
          modalClass: 'confirm-modal',
          scope: modalScope,
        });
      }
    });
  }

  reset() {
    var self = this;
    this.showConfig = false;
    this.config = {};
  }

  cancel() {
    this.reset();
    this.ignoreChanges = true;
    this.$window.history.back();
  }

  addDevice() {
    if (!this.config.uid) {
      return;
    }
    this.deviceStatus = 1;
  }

  addDs18b20() {
    this.config.ds18b20[this.newTempSensorID] = {};
    this.config.ds18b20[this.newTempSensorID].label = "New Sensor (Click to edit)";
    this.newTempSensorID = '';

  }

  delDs18b20(id) {
    delete this.config.ds18b20[id];
    this.$window.console.log(this.config);

  }

  removeDevice() {
    var self = this;
    return this.backendSrv.delete('api/plugin-proxy/flexscada-app/api/vibration/v1/config/' + this.config.uid).then((resp) => {
      if (resp.meta.code !== 200) {
        self.alertSrv.set("failed to delete device.", resp.meta.message, 'error', 10000);
        return self.$q.reject(resp.meta.message);
      }
      self.$location.path('plugins/flexscada-app/page/devices');
    });
  }

  saveDevice() {

    this.config.orgid = this.$rootScope.contextSrv.user.orgId;
    this.config.userid = this.$rootScope.contextSrv.user.id;

    var self = this;
    return this.backendSrv.put('api/plugin-proxy/flexscada-app/api/vibration/v1/config/' + this.config.uid + ((this.deviceStatus === 1) ? '/?create=true' : ''), this.config).then((resp) => {
      self.$window.console.log(resp);
      if (resp.meta.code !== 200) {
        self.alertSrv.set("failed to update device.", resp.meta.message, 'error', 10000);
        return self.$q.reject(resp.meta.message);
      }
      this.deviceStatus = 2;
    });
  }

  loadDevice(uid) {
    var self = this;
    return this.backendSrv.get('api/plugin-proxy/flexscada-app/api/vibration/v1/config/' + uid).then((resp) => {
      self.$window.console.log(resp);
      if (resp.meta.code !== 200) {
        self.alertSrv.set("failed to update device.", resp.meta.message, 'error', 10000);
        return self.$q.reject(resp.meta.message);
      }
      self.config = resp.body;
      this.deviceStatus = 2;
    });
  }

  gotoDashboard() {
    // Load the devices dashboard
  }

  changesPending() {
    var self = this;
    var changes = false;

    return changes;
  }

}

DeviceConfigCtrl.templateUrl = 'public/plugins/flexscada-app/components/device/partials/device_config.html';

export {
  DeviceConfigCtrl
};
