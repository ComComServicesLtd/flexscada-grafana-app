import configTemplate from './config.html!text';

import _ from 'lodash';

class FlexscadaConfigCtrl {
  constructor($scope, $injector, $q, backendSrv, alertSrv) {
    this.$q = $q;
    this.backendSrv = backendSrv;
    this.alertSrv = alertSrv;
    this.validKey = false;
    this.quotas = {};
    this.appEditCtrl.setPreUpdateHook(this.preUpdate.bind(this));
    this.appEditCtrl.setPostUpdateHook(this.postUpdate.bind(this));
    this.org = null;

    if (this.appModel.jsonData === null) {
      this.appModel.jsonData = {};
    }
    if (!this.appModel.secureJsonData) {
      this.appModel.secureJsonData = {};
    }
    if (this.appModel.enabled) {
      this.validateKey();
    }
  }

  reset() {
    this.appModel.jsonData.apiKeySet = false;
    this.validKey = false;
    this.org = null;
  }

  validateKey() {
    var self = this;

    self.validKey = true;

    /*
    self.alertSrv.set("failed to verify apiKey", resp.statusText, 'error', 10000);
    self.appModel.enabled = false;
    self.appModel.jsonData.apiKeySet = false;
    self.appModel.secureJsonData.apiKey = "";
    self.errorMsg = "invalid apiKey";
    self.validKey = false;
    */

  }

  getOrgDetails() {
    return;
    var self = this;
    var p = this.backendSrv.get('api/plugin-proxy/flexscada-app/api/grafana-net/profile/org');
    p.then((resp) => {
      self.org = resp;

      const millionChecksPerMonth = Math.ceil(parseInt(self.org.checksPerMonth, 10) / 100000) / 10;
      if (millionChecksPerMonth > 1000) {
        self.org.strChecksPerMonth = Math.ceil(millionChecksPerMonth / 1000) + ' Billion';
      } else if (millionChecksPerMonth > 0) {
        self.org.strChecksPerMonth = millionChecksPerMonth + ' Million';
      } else {
        self.org.strChecksPerMonth = 'N/A';
      }
    }, (resp) => {
      self.alertSrv.set("failed to get Org Details", resp.statusText, 'error', 10000);
    });
    return p;
  }

  preUpdate() {
    var model = this.appModel;
    if (!model.enabled) {
      return this.$q.resolve();
    }

    if (!model.jsonData.apiKeySet && !model.secureJsonData.apiKey) {
      model.enabled = false;
      this.errorMsg = "apiKey not set";
      this.validKey = false;
      return this.$q.reject("apiKey not set.");
    }
    model.jsonData.apiKeySet = true;
    return this.initDatasource();
  }

  postUpdate() {
    if (!this.appModel.enabled) {
      return this.$q.resolve();
    }
    var self = this;
    return this.validateKey()
      .then(() => {
        return self.appEditCtrl.importDashboards().then(() => {
          return {
            url: "dashboard/db/flexscada-home",
            message: "FlexSCADA app installed!"
          };
        });
      });
  }

  configureDatasource() {
    this.appModel.jsonData.datasourceSet = false;
    this.initDatasource().then(() => {
      this.appModel.jsonData.datasourceSet = true;
    });
  }

  initDatasource() {
    var self = this;

    //check for existing datasource.
    var p = self.backendSrv.get('/api/datasources');
    p.then(function(results) {
      var foundFlexscada = false;
      _.forEach(results, function(ds) {
        if (foundFlexscada) {
          return;
        }
        if (ds.name === "flexscada") {
          foundFlexscada = true;
        }
      });

      var promises = [];
      if (!foundFlexscada) {
        // create datasource.
        var flexscada = {
          name: 'flexscada',
          type: 'flexscada-datasource',
          url: 'api/plugin-proxy/flexscada-app',
          access: 'direct',
          jsonData: {
            APIVersion: "v1"
          }
        };
        promises.push(self.backendSrv.post('/api/datasources', flexscada));
      }
      return self.$q.all(promises);
    });
    return p;
  }
}

FlexscadaConfigCtrl.template = configTemplate;

export {
  FlexscadaConfigCtrl as ConfigCtrl
};
