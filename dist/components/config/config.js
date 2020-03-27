'use strict';

System.register(['./config.html!text', 'app/core/core', 'lodash'], function (_export, _context) {
  "use strict";

  var configTemplate, appEvents, _, _createClass, FlexscadaConfigCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_configHtmlText) {
      configTemplate = _configHtmlText.default;
    }, function (_appCoreCore) {
      appEvents = _appCoreCore.appEvents;
    }, function (_lodash) {
      _ = _lodash.default;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('ConfigCtrl', FlexscadaConfigCtrl = function () {
        function FlexscadaConfigCtrl($scope, $injector, $q, backendSrv, alertSrv, contextSrv, datasourceSrv) {
          _classCallCheck(this, FlexscadaConfigCtrl);

          this.$q = $q;
          this.$q = $q;
          this.$scope = $scope;
          this.backendSrv = backendSrv;
          this.contextSrv = contextSrv;
          this.datasourceSrv = datasourceSrv;
          this.alertSrv = alertSrv;
          this.validKey = false;
          this.errorMsg = "";

          this.newClientAccount = {
            username: "",
            password: "",
            notes: "",
            phone: "",
            email: ""
          };

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

        _createClass(FlexscadaConfigCtrl, [{
          key: 'reset',
          value: function reset() {

            if (confirm("Are you sure? Resetting will erase everything")) {
              this.appModel.jsonData.apiKeySet = false;
              this.validKey = false;
              this.org = null;
            }
          }
        }, {
          key: 'createUser',
          value: function createUser() {

            var self = this;
            var p = this.backendSrv.put('/api/plugin-proxy/flexscada-app/admin/api/v2/account', this.newClientAccount);
            p.then(function (resp) {
              if (resp.meta.code == 200) {
                appEvents.emit('alert-success', ['Account Created Successfully', '']);
                self.errorMsg = "";
              } else {
                //  self.alertSrv.set("failed to create account", resp.meta.msg, 'error', 10000);
                appEvents.emit('alert-error', ['Failed to create account', resp.meta.msg]);
                self.errorMsg = resp.meta.msg;
                return self.$q.reject(resp.meta.msg);
              }
            });
            return p;
          }
        }, {
          key: 'validateKey',
          value: function validateKey() {
            var self = this;
            var p = this.backendSrv.get('/api/plugin-proxy/flexscada-app/api/v2/account');
            p.then(function (resp) {
              if (resp.meta.code !== 200) {
                //self.alertSrv.set("failed to validate account key", resp.msg, 'error', 10000);
                appEvents.emit('alert-error', ['Failed to validate account key', resp.msg]);
                return self.$q.reject(resp.msg);
              }
              self.validKey = true;
              self.account = resp.body;
              self.$scope.$apply();
            }, function (resp) {
              if (self.appModel.enabled) {
                //self.alertSrv.set("failed to verify account key", resp.msg, 'error', 10000);
                appEvents.emit('alert-error', ['Failed to verify account key', resp.msg]);
                self.appModel.enabled = false;
                self.appModel.jsonData.apiKeySet = false;
                self.appModel.secureJsonData.apiKey = "";
                self.errorMsg = "invalid key";
                self.validKey = false;
              }
            });
            return p;
          }
        }, {
          key: 'preUpdate',
          value: function preUpdate() {
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
        }, {
          key: 'postUpdate',
          value: function postUpdate() {
            if (!this.appModel.enabled) {
              return this.$q.resolve();
            }
            var self = this;
            return this.validateKey().then(function () {
              return self.appEditCtrl.importDashboards().then(function () {
                return {
                  url: "dashboard/db/flexscada-home",
                  message: "FlexSCADA app installed!"
                };
              });
            });
          }
        }, {
          key: 'configureDatasource',
          value: function configureDatasource() {
            var _this = this;

            this.appModel.jsonData.datasourceSet = false;
            this.initDatasource().then(function () {
              _this.appModel.jsonData.datasourceSet = true;
            });
          }
        }, {
          key: 'initDatasource',
          value: function initDatasource() {
            var self = this;

            //check for existing datasource.
            var p = self.backendSrv.get('/api/datasources');
            p.then(function (results) {
              var foundCxDB = false;
              var foundQxDB = false;
              _.forEach(results, function (ds) {

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
        }]);

        return FlexscadaConfigCtrl;
      }());

      FlexscadaConfigCtrl.template = configTemplate;

      _export('ConfigCtrl', FlexscadaConfigCtrl);
    }
  };
});
