import _ from 'lodash';
import $ from 'jquery';

class TemplateListCtrl {

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
    this.templates = [];
    this.refresh();

  }

  refresh() {
    this.getTemplates();
  }

  getTags() {
    var map = {};
    _.forEach(this.templates, function(config) {
      _.forEach(config.tags, function(tag) {
        map[tag] = true;
      });
    });
    return Object.keys(map);
  }

  setTagFilter(tag) {
    this.filter.tag = tag;
  }

  getTemplates() {
    var self = this;
    this.backendSrv.get('api/plugin-proxy/flexscada-app/api/v2/db/templates').then(function(resp) {
      if (resp.meta.code !== 200) {
        self.alertSrv.set("failed to get device list.", resp.meta.msg, 'error', 10000);
        return self.$q.reject(resp.meta.msg);
      }
      self.templates = resp.body;
      self.pageReady = true;
    });
  }


  gotoTemplateConfig(template) {
    this.$location.url('plugins/flexscada-app/page/template-config?template=' + template.id);
  }


  gotoTemplateDetails(template) {

      this.$location.url("/dashboard/db/flexsc2").search({
        "var-Tid": template.id,
        "var-Template": template.name
      });

  }

}

TemplateListCtrl.templateUrl = 'public/plugins/flexscada-app/components/template/partials/template_list.html';
export {
  TemplateListCtrl
};
