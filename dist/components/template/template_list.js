'use strict';

System.register(['lodash', 'jquery'], function (_export, _context) {
  "use strict";

  var _, $, _createClass, TemplateListCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_lodash) {
      _ = _lodash.default;
    }, function (_jquery) {
      $ = _jquery.default;
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

      _export('TemplateListCtrl', TemplateListCtrl = function () {

        /** @ngInject */
        function TemplateListCtrl($scope, $injector, $location, $q, backendSrv, contextSrv, alertSrv) {
          _classCallCheck(this, TemplateListCtrl);

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
          this.templates = [];
          this.refresh();
        }

        _createClass(TemplateListCtrl, [{
          key: 'refresh',
          value: function refresh() {
            this.getTemplates();
          }
        }, {
          key: 'getTags',
          value: function getTags() {
            var map = {};
            _.forEach(this.templates, function (config) {
              _.forEach(config.tags, function (tag) {
                map[tag] = true;
              });
            });
            return Object.keys(map);
          }
        }, {
          key: 'setTagFilter',
          value: function setTagFilter(tag) {
            this.filter.tag = tag;
          }
        }, {
          key: 'getTemplates',
          value: function getTemplates() {
            var self = this;
            this.backendSrv.get('api/plugin-proxy/flexscada-app/api/v2/db/templates').then(function (resp) {
              if (resp.meta.code !== 200) {
                self.alertSrv.set("failed to get device list.", resp.meta.msg, 'error', 10000);
                return self.$q.reject(resp.meta.msg);
              }
              self.templates = resp.body;
              self.pageReady = true;
            });
          }
        }, {
          key: 'gotoTemplateConfig',
          value: function gotoTemplateConfig(template) {
            this.$location.url('plugins/flexscada-app/page/template-config?template=' + template.id);
          }
        }, {
          key: 'gotoTemplateDetails',
          value: function gotoTemplateDetails(template) {

            this.$location.url("/dashboard/db/flexsc2").search({
              "var-Tid": template.id,
              "var-Template": template.name
            });
          }
        }]);

        return TemplateListCtrl;
      }());

      TemplateListCtrl.templateUrl = 'public/plugins/flexscada-app/components/template/partials/template_list.html';

      _export('TemplateListCtrl', TemplateListCtrl);
    }
  };
});
