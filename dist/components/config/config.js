'use strict';

System.register(['./config.html!text', 'lodash'], function (_export, _context) {
  "use strict";

  var configTemplate, _, _createClass, FlexscadaConfigCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_configHtmlText) {
      configTemplate = _configHtmlText.default;
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
        function FlexscadaConfigCtrl($scope, $injector, $q, backendSrv, alertSrv) {
          _classCallCheck(this, FlexscadaConfigCtrl);

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

        _createClass(FlexscadaConfigCtrl, [{
          key: 'reset',
          value: function reset() {
            this.appModel.jsonData.apiKeySet = false;
            this.validKey = false;
            this.org = null;
          }
        }, {
          key: 'validateKey',
          value: function validateKey() {
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
        }, {
          key: 'getOrgDetails',
          value: function getOrgDetails() {
            return;
            var self = this;
            var p = this.backendSrv.get('api/plugin-proxy/flexscada-app/api/grafana-net/profile/org');
            p.then(function (resp) {
              self.org = resp;

              var millionChecksPerMonth = Math.ceil(parseInt(self.org.checksPerMonth, 10) / 100000) / 10;
              if (millionChecksPerMonth > 1000) {
                self.org.strChecksPerMonth = Math.ceil(millionChecksPerMonth / 1000) + ' Billion';
              } else if (millionChecksPerMonth > 0) {
                self.org.strChecksPerMonth = millionChecksPerMonth + ' Million';
              } else {
                self.org.strChecksPerMonth = 'N/A';
              }
            }, function (resp) {
              self.alertSrv.set("failed to get Org Details", resp.statusText, 'error', 10000);
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
              this.errorMsg = "apiKey not set";
              this.validKey = false;
              return this.$q.reject("apiKey not set.");
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
              var foundFlexscada = false;
              _.forEach(results, function (ds) {
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
        }]);

        return FlexscadaConfigCtrl;
      }());

      FlexscadaConfigCtrl.template = configTemplate;

      _export('ConfigCtrl', FlexscadaConfigCtrl);
    }
  };
});
//# sourceMappingURL=config.js.map
