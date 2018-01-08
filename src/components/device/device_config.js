import _ from 'lodash';
import angular from 'angular';


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
    this.templates = [];
    this.config.ds18b20 = {};
    this.config.channels = {};
    this.config.relays = [];
    this.config.feeds = [];
    this.config.tags = [];
    this.deviceStatus = 0; // 0 = new, stage 1, 1 = new, adding information stage, 2 = exiting
    this.deviceType = 0; // 1 = Q4, 2 = C2
    this.deviceID = 0;
    this.ignoreChanges = false;




    this.rpmOptions = [{
        value: true,
        label: 'Auto'
      },
      {
        value: false,
        label: 'Manual'
      }
    ];


    this.intervalOptions = [{
        value: 60,
        label: 'Every Minute'
      },
      {
        value: 300,
        label: 'Every 5 Minutes'
      },
      {
        value: 600,
        label: 'Every 10 Minutes'
      },
      {
        value: 1800,
        label: 'Every Half Hour'
      },
      {
        value: 3600,
        label: 'Every Hour'
      },
      {
        value: 14400,
        label: 'Every 4 hours'
      },
      {
        value: 28800,
        label: 'Every 8 Hours'
      },
      {
        value: 86400,
        label: 'Every 24 Hours'
      }
    ];

    this.highResRates = [{
        value: 2500,
        label: '2.5 kSPS'
      },
      {
        value: 5000,
        label: '5 kSPS'
      },
      {
        value: 10000,
        label: '10 kSPS'
      },
      {
        value: 20000,
        label: '20 kSPS'
      },
      {
        value: 31250,
        label: '31.250 kSPS'
      },
      {
        value: 62500,
        label: '62.5 kSPS'
      }
    ];

    this.lowResRates = [{
        value: 3906,
        label: '3.096 kSPS'
      },
      {
        value: 2500,
        label: '2.5 kSPS'
      }
    ];

    this.sampleCountOptions = [{
        value: 8192,
        label: '8,192 samples'
      },
      {
        value: 16384,
        label: '16,384 samples'
      },
      {
        value: 32768,
        label: '32,768 samples'
      },
      {
        value: 65536,
        label: '65,536 samples'
      },
      {
        value: 131072,
        label: '131,072 samples'
      },
      {
        value: 262144,
        label: '262,144 samples'
      }
    ];




    $window.console.log($location.search());
    if ("device" in $location.search()) {
      this.deviceStatus = 2;
      this.deviceID = $location.search().device
      this.loadDevice();
    } else {
      this.deviceStatus = 0;
    }


    self.getTemplates();

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


    var qtype = new RegExp("Q[0-9]*$");
    var ctype = new RegExp("C[0-9]*$");

    if (this.config.uid.match(qtype)) {
      this.config.type = 1;
    } else if (this.config.uid.match(ctype)) {
      this.config.type = 2;
    } else {
      this.alertSrv.set("Invalid UID", "UID should look like 'Q1535235511'", 'error', 5000);
      return;
    }
    this.deviceStatus = 1;
    //this.config.uid.replace(/\D/g,'');// We only want the uid number
    this.config.uid = this.config.uid.substring(1); // We only want the uid number
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
    return this.backendSrv.delete('api/plugin-proxy/flexscada-app/api/v2/db/devices/' + this.deviceID).then((resp) => {
      if (resp.meta.code !== 200) {
        self.alertSrv.set("failed to delete device.", resp.meta.msg, 'error', 10000);
        return self.$q.reject(resp.meta.msg);
      }
      self.$location.path('plugins/flexscada-app/page/devices');
    });
  }

  saveDevice() {

  //  this.config.orgid = this.$rootScope.contextSrv.user.orgId;
  //  this.config.userid = this.$rootScope.contextSrv.user.id;

    if(  this.deviceType == 2 ) { // If Flexs C2, Increment version number
      this.config.version = this.config.version + 1;
    }

    var self = this;
    return this.backendSrv.put('api/plugin-proxy/flexscada-app/api/v2/db/devices/' + this.deviceID + ((this.deviceStatus === 1) ? '/?create=true' : ''), this.config).then((resp) => {
      self.$window.console.log(resp);
      if (resp.meta.code !== 200) {
        self.alertSrv.set("failed to update device.", resp.meta.msg, 'error', 10000);
        return self.$q.reject(resp.meta.msg);
      }
      this.deviceStatus = 2;
      this.$location.url('plugins/flexscada-app/page/devices'); // go back to devices page
    });
  }

  loadDevice() {
    var self = this;
    return this.backendSrv.get('api/plugin-proxy/flexscada-app/api/v2/db/devices/' + this.deviceID).then((resp) => {
      self.$window.console.log(resp);
      if (resp.meta.code !== 200) {
        self.alertSrv.set("failed to update device.", resp.meta.msg, 'error', 10000);
        this.$location.url('plugins/flexscada-app/page/devices'); // go back to devices page
        return self.$q.reject(resp.meta.msg);
      }
      self.config = resp.body;

if( self.config.hasOwnProperty('active_detection')){
        self.deviceType = 2;
      }
      else {
        self.deviceType = 1;
      }



      this.deviceStatus = 2;
    });
  }

  setTemplate(channel, value) {
    console.log(channel);
    console.log(value);
    this.config.channels[channel].template = value.value;
  }

  getTemplates() {
    var self = this;
    return this.backendSrv.get('api/plugin-proxy/flexscada-app/api/v2/available_templates').then((resp) => {
      self.$window.console.log(resp);
      if (resp.meta.code !== 200) {
        self.alertSrv.set("failed to donwload templates.", resp.meta.msg, 'error', 10000);
        return self.$q.reject(resp.meta.msg);
      }
      self.templates = resp.body;
    });
  }

  addFeed() {
    if (!this.config.feeds) {
      this.config.feeds = [];
    }
    this.config.feeds.push({});
  }



  addRelay() {
    if (!this.config.relays) {
      this.config.relays = [];
    }
    this.config.relays.push({});
  }


  deleteItem(_array, id) {
    _array.splice(id, 1);
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
