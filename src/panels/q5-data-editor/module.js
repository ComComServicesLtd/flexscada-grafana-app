import _ from 'lodash';
import {
  MetricsPanelCtrl,
  PanelCtrl
} from 'app/plugins/sdk';
import {
  loadPluginCss
} from 'app/plugins/sdk';
import * as $ from 'jquery';
import moment from 'moment';
import * as dateMath from 'app/core/utils/datemath';
import {
  appEvents,
  coreModule
} from 'app/core/core';



class Q5DataEditorCtrl extends MetricsPanelCtrl {

  /** @ngInject */
  constructor($scope, $injector, $location, $q, backendSrv, contextSrv, alertSrv) {
    super($scope, $injector);

    this.isOrgEditor = contextSrv.hasRole('Editor') || contextSrv.hasRole('Admin');
    this.backendSrv = backendSrv;
    this.alertSrv = alertSrv;
    this.$location = $location;
    this.$q = $q;
    this.window = window;
    this.scope = $scope;



    //  this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
    this.events.on('refresh', this.onRefresh.bind(this));
    this.events.on('render', this.onRender.bind(this));

    this.events.on('data-received', this.onDataReceived.bind(this));
    this.events.on('data-error', this.onDataError.bind(this));

    var self = this;



  }

  onInitEditMode() {
    //  this.addEditorTab('Options', 'public/app/plugins/panel/text/editor.html');
    //  this.editorTabIndex = 1;
  }

  onRefresh() {
    this.render();
  }

  onRender() {
    this.renderingCompleted();
  }


  issueQueries(datasource) {
    // this.annotationsPromise = this.annotationsSrv.getAnnotations({
    //   dashboard: this.dashboard,
    //   panel: this.panel,
    //   range: this.range,
    // });
    return super.issueQueries(datasource);
  }


  onDataReceived(dataList) {


let triggerRefresh = false;

    if(this.panel.targets[0].hide == false)
      triggerRefresh = true;


    this.panel.targets[0].query = "";
    this.panel.targets[0].hide = true;

    if(triggerRefresh)
          this.publishAppEvent('zoom-out', 1.0);

}

onDataError(err) {
  this.panel.targets[0].query = "";
  this.panel.targets[0].hide = true;
}


  influxDeleteRange() {
    var self = this;


  }

  deleteDataRange() {

    var self = this;


if(this.isOrgEditor){

   self.scope.$root.appEvent('confirm-modal', {
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete all of the data displayed above?',
      text2: 'This will permentaly destroy everything shown on the above graph...',
      icon: 'fa-trash',
      confirmText: "Destroy",
      yesText: "Destroy",
      onConfirm: function() {
        self.panel.targets[0].query = "DELETE FROM /^$measurement$/ WHERE (\"uid\" =~ /^$uid$/ AND \"label\" =~ /^$label$/ AND \"device\" =~ /^$device$/) AND $timeFilter";
        self.panel.targets[0].hide = false;
        self.refresh();
      }
    });
  } else {
        //self.alertSrv.set("failed to delete dataset", "You do not have adequate permissions to perform this action.", 'error', 10000);
        appEvents.emit('alert-error', ['failed to delete dataset', "You do not have adequate permissions to perform this action."]);
  }


  }


}


Q5DataEditorCtrl.templateUrl = 'public/plugins/flexscada-app/panels/q5-data-editor/module.html';

export {
  Q5DataEditorCtrl as PanelCtrl
};
