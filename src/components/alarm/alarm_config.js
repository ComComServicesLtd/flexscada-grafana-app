import _ from 'lodash';
import angular from 'angular';

class AlarmConfigCtrl {

   /** @ngInject */
  constructor($scope, $injector, $rootScope, $location, $modal, $anchorScroll, $timeout, $window, $q,uiSegmentSrv, backendSrv, alertSrv) {
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
    this.showCondition = [];

    this.pageReady = false;
    this.config = {};
    this.config.ds18b20 = {};
    this.config.channels = {};
    this.deviceStatus = 0; // 0 = new, stage 1, 1 = new, adding information stage, 2 = exiting

    this.ignoreChanges = false;

    this.uiSegmentSrv = uiSegmentSrv;

    this.addNotificationSegment = this.uiSegmentSrv.newPlusButton();

    this.ruleAggregations = [
{text: 'Average Amplitude', value: 0},
{text: 'Peak Amplitude', value: 1},
{text: 'Total Amplitude', value: 2},
{text: 'Any Amplitude', value: 3}
];

    this.conditionOperators = [
        {text: 'Is Greater Than', value: 0},
        {text: 'Is Less Than', value: 1},
        {text: 'Exceeds Average by', value: 2}
        ];

    this.detectionMethods = [
{text: 'Rule Based', value: "rule"},
{text: 'Automatic (Bearing)', value: "gearbox"},
{text: 'Automatic (Gearbox)', value: "bearing"}
];

    this.senitivitySettings = [
{text: 'Low', value: "low"},
{text: 'Medium', value: "medium"},
{text: 'High', value: "high"}
];

    this.averagingSpans = [
{text: 'Last 7 Days', value: 604800},
{text: 'Last 31 Days', value: 2678400},
{text: 'Last 3 Months', value: 7884000},
{text: 'Last 6 Months', value: 15768000},
{text: 'Last 12 Months', value: 31536000}
];

    this.binOptions = [
{text: '1024', value: 1024},
{text: '512', value: 512},
{text: '256', value: 256},
{text: '128', value: 128},
{text: '64', value: 64},
{text: '32', value: 32},
{text: '16', value: 16}
];

    this.aggregationMethods = [
{text: 'Maximum', value: 'max'},
{text: 'Average', value: 'avg'}
];

    // this.addNotificationSegment = new MetricSegment({fake: true, html: '<i class="fa fa-plus "></i>', type: 'plus-button' });

    // build notification model
    this.notifications = []; // object of all available notification channels
    this.alertNotifications = []; // Ui representatin only

    this.backendSrv.get('/api/alert-notifications').then(res => {
      self.notifications = res;

      for (let notification of this.notifications) {
        if (notification.isDefault) {
          notification.iconClass = this.getNotificationIcon(notification.type);
          notification.bgColor = "#00678b";
          this.alertNotifications.push(notification);
        }
      }

      if(!this.config.notifications){
        this.config.notifications = [];
      }

      self.pageReady = true;
    });

    $window.console.log($location.search());
    if ("alarm" in $location.search()) {
      this.alarmStatus = 1;
      this.loadAlarm($location.search().alarm);
    } else {
      this.alarmStatus = 0;
    }

    // loadNotifications();

    $window.onbeforeunload = function() {
      if (self.ignoreChanges) { return; }
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

  forceUnit(unit, value) {
    value = 'test';value.replace(/[^0-9]/g, '') + unit;
  }

  cancel() {
    this.reset();
    this.ignoreChanges = true;
    this.$window.history.back();
  }

  addCondition() {
    if(!this.config.conditions){
      this.config.conditions = [];
    }

    var index = this.config.conditions.push({label: "New Rule, Click to edit"}) - 1;
    this.showCondition[index] = true;
  }

   deleteCondition(id) {
     this.config.conditions.splice(id,1);
     this.showCondition.splice(id,1);
   }

  removeAlarm() {
    var self = this;
    return this.backendSrv.delete('api/plugin-proxy/flexscada-app/api/v2/alarm/' + this.config.id).then((resp) => {
      if (resp.meta.code !== 200) {
        self.alertSrv.set("failed to delete alarm.", resp.meta.message, 'error', 10000);
        return self.$q.reject(resp.meta.message);
      }
      self.$location.path('plugins/flexscada-app/page/alarms');
    });
  }

  addAlarm() {
    this.deviceStatus = 1;
  }

  saveAlarm() {

    this.config.orgid = this.$rootScope.contextSrv.user.orgId;
    this.config.userid = this.$rootScope.contextSrv.user.id;

    var self = this;
    return this.backendSrv.put
    ('api/plugin-proxy/flexscada-app/api/v2/alarm/'
     + this.config.id + ((this.deviceStatus === 1) ? '/?create=true' : ''),
     this.config).then((resp) => {
      self.$window.console.log(resp);
      if (resp.meta.code !== 200) {
        self.alertSrv.set("failed to update alarm.", resp.meta.message, 'error', 10000);
        return self.$q.reject(resp.meta.message);
      }
      this.deviceStatus = 2;
    });
  }

  loadAlarm(uid) {
    var self = this;
    return this.backendSrv.get('api/plugin-proxy/flexscada-app/api/v2/alarm/' + uid).then((resp) => {
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
    var changes = false;

    return changes;
  }

  getNotificationIcon(type) {
    switch (type) {
      case "email": return "fa fa-envelope";
      case "slack": return "fa fa-slack";
      case "victorops": return "fa fa-pagelines";
      case "webhook": return "fa fa-cubes";
      case "pagerduty": return "fa fa-bullhorn";
      case "opsgenie": return "fa fa-bell";
    }
  }

  getNotifications() {
    return Promise.resolve(this.notifications.map(item => {
      return this.uiSegmentSrv.newSegment(item.name);
    }));
  }

  notificationAdded() {
    var model = _.find(this.notifications, {name: this.addNotificationSegment.value});
    if (!model) {
      return;
    }

    this.alertNotifications.push({
      name: model.name,
      iconClass: this.getNotificationIcon(model.type),
      isDefault: false
    });
    this.config.notifications.push({id: model.id});

    // reset plus button
    this.addNotificationSegment.value = this.uiSegmentSrv.newPlusButton().value;
    this.addNotificationSegment.html = this.uiSegmentSrv.newPlusButton().html;
  }

  removeNotification(index) {
    this.config.notifications.splice(index, 1);
    this.alertNotifications.splice(index, 1);
  }

}

AlarmConfigCtrl.templateUrl = 'public/plugins/flexscada-app/components/alarm/partials/alarm_config.html';

export {AlarmConfigCtrl};
