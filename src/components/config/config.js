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

    if (confirm("Are you sure? Resetting will erase everything")) {
      this.appModel.jsonData.apiKeySet = false;
      this.validKey = false;
      this.org = null;
    }

  }


  validateKey() {
    var self = this;
    var p = this.backendSrv.get('/api/plugin-proxy/flexscada-app/api/v2/account');
    p.then((resp) => {
      if (resp.meta.code !== 200) {
        self.alertSrv.set("failed to validate account key", resp.msg, 'error', 10000);
        return self.$q.reject(resp.msg);
      }
      self.validKey = true;
      self.account = resp.body;
    }, (resp) => {
      if (self.appModel.enabled) {
        self.alertSrv.set("failed to verify account key", resp.msg, 'error', 10000);
        self.appModel.enabled = false;
        self.appModel.jsonData.apiKeySet = false;
        self.appModel.secureJsonData.apiKey = "";
        self.errorMsg = "invalid key";
        self.validKey = false;
      }
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
      this.errorMsg = "account key not set";
      this.validKey = false;
      return this.$q.reject("account key not set.");
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
      var foundCxDB = false;
      var foundQxDB = false;
      _.forEach(results, function(ds) {


        if (ds.name === "Flexscada-Site-Monitoring") {
          foundQxDB = true;
        }

        if (ds.name === "Flexscada-Condition-Monitoring") {
          foundCxDB = true;
        }


      });

      var promises = [];

      if (!foundQxDB) {


        // create datasource.
        var flexsQx = {
          name: 'Flexscada-Site-Monitoring',
          type: 'influxdb',
          url: 'http://flexscada.com:9086',
          isDefault: true,
          password: self.account.influxdb.password,
          user: self.account.influxdb.user,
          database: self.account.influxdb.database,
          access: 'proxy',
          jsonData: {}
        };


        promises.push(self.backendSrv.post('/api/datasources', flexsQx));
      }

      if (!foundCxDB) {
        // create datasource.
        var flexsCx = {
          name: 'Flexscada-Condition-Monitoring',
          type: 'flexscada-datasource',
          url: 'api/plugin-proxy/flexscada-app',
          access: 'direct',
          jsonData: {
            APIVersion: "v1"
          }
        };
        promises.push(self.backendSrv.post('/api/datasources', flexsCx));
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
