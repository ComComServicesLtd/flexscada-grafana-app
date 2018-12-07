import _ from 'lodash';
import {
  PanelCtrl
} from 'app/plugins/sdk';
import {
  loadPluginCss
} from 'app/plugins/sdk';
import Handsontable from '../../external/handsontable.full.js';
import * as $ from 'jquery';
import moment from 'moment';
import * as dateMath from 'app/core/utils/datemath';
import {
  appEvents,
  coreModule
} from 'app/core/core';

loadPluginCss({
  dark: 'plugins/flexscada-app/external/handsontable-dark.full.css',
  light: 'plugins/flexscada-app/external/handsontable-light.full.css'
});



class Q4DataEditorCtrl extends PanelCtrl {

  /** @ngInject */
  constructor($scope, $injector, $location, $q, backendSrv, alertSrv) {
    super($scope, $injector);
    this.backendSrv = backendSrv;
    this.alertSrv = alertSrv;
    this.$location = $location;
    this.$q = $q;
    this.window = window;
    this.scope = $scope;

    this.datapoints = [];
    this.annotations = [];
    this.newAnnotation = {};

    //  this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
    this.events.on('refresh', this.onRefresh.bind(this));
    this.events.on('render', this.onRender.bind(this));

    var self = this;

    var p = self.backendSrv.get('/api/datasources');
    p.then(function(results) {
      _.forEach(results, function(ds) {
        if (ds.name === "Flexscada-Site-Monitoring") {
          self.influxDB = ds.database;
          self.influxID = ds.id;
        }
      });
    });

    this.newAnnotation.tags = $location.search().tags;
    appEvents.on('graph-click', function(evt) {
      self.scope.$apply(function() {
        var t = moment(evt.pos.x1);
        self.newAnnotation.time = t.format('MMMM D YYYY, h:mm:ss a');
      });
    }, $scope);


  }

  onInitEditMode() {
    //  this.addEditorTab('Options', 'public/app/plugins/panel/text/editor.html');
    //  this.editorTabIndex = 1;
  }

  onRefresh() {
    this.render();
  }

  onRender() {
    this.updateTable();
    this.renderingCompleted();
  }


  addAnnotation(annotation) {

    var self = this;

    var timestamp = moment(annotation.time);

    if(!timestamp.isValid()){
        self.alertSrv.set("failed to create annotation.", "Please check that the date/time field is valid", 'error', 10000);
        return;
    }


    var line;

    line = "annotations," + annotation.tags.join(',') + " " +
      "title=\"" + annotation.title.replace(/[\""]/g, '\\"') + "\"," +
      "text=\"" + annotation.text.replace(/[\""]/g, '\\"') + "\"," +
      "tags=\"" + annotation.tags.join(',') + "\"" +
      " " + timestamp.unix() + "\n";

    var p = self.backendSrv.request(self.getInfluxWrite(line));
    p.then(function(results) {
      console.log(results);
      self.newAnnotation.title = "";
      self.newAnnotation.text = "";
      self.publishAppEvent('zoom-out', 1.0);
    });
  }



  getInfluxQuery(query) {

    var self = this;

    return {
      method: 'GET',
      url: '/api/datasources/proxy/' + self.influxID + '/query',
      params: {
        precision: 's',
        epoch: 's',
        db: self.influxDB,
        q: query
      }
    };
  }

  getInfluxWrite(payload) {

    var self = this;

    return {
      method: 'POST',
      url: '/api/datasources/proxy/' + self.influxID + '/write',
      params: {
        precision: 's',
        epoch: 's',
        db: self.influxDB
      },
      data: payload
    };
  }

  influxDeleteRange(series) {
    var self = this;

if(!self.dashboard || !self.dashboard.time || !self.dashboard.time.from || !(self.dashboard.time.from.unix() > 0) ){
    self.alertSrv.set("Failed to delete datapoints", "Invalid Range, Zoom to a more specific time range and try again", 'error', 10000);
    return;
}

    var start = self.dashboard.time.from.unix();
    var end = self.dashboard.time.to.unix();

    var query = "DELETE FROM \"" + series + "\" WHERE " + self.$location.search()['var-query'] + " time > " + start + "s AND time < " + end + 's';

    var p = self.backendSrv.request(self.getInfluxQuery(query));
    p.then(function(results) {
      console.log(results);
      self.alertSrv.set("Delete Successful", "", 'success', 10000);
      self.publishAppEvent('zoom-out', 1.0);
      //  self.alertSrv.set("failed to delete device.", resp.meta.message, 'error', 10000);
    });
  }

  deleteDataRange() {

    var self = this;

    var start = self.dashboard.time.from.unix();
    var end = self.dashboard.time.to.unix();

   self.scope.$root.appEvent('confirm-modal', {
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete all of the data displayed above?',
      text2: 'Delete all the data points in value',
      icon: 'fa-trash',
      confirmText: "Destroy",
      altActionText: "Archive",
      onAltAction: function(){

        var query = "SELECT * INTO \"feeds_deleted\" FROM feeds WHERE " + self.$location.search()['var-query'] + "time > " + start + "s AND time < " + end + 's';
              var p = self.backendSrv.request(self.getInfluxQuery(query));
              p.then(function(result) {
                console.log(result);
                var moved_samples = result.results[0].series[0].values[0][1];
                if(moved_samples > 0){
                console.log("Archived " + moved_samples + "measurements");
                self.alertSrv.set("Move Complete.", "Successfully archived " + moved_samples + " measurements", 'success', 10000);
                self.influxDeleteRange("feeds");
              } else {
                  self.alertSrv.set("Failed to archive measurements", "For some reason we were not able to archive any measurements, All delete operations have been canceled. Please contact us if this error continues", 'error', 10000);
              }
              });
      },
      yesText: "Destroy",
      onConfirm: function() {
        self.influxDeleteRange("feeds");
      }
    });
  }

  deleteAnotationRange() {
    var self = this;



   self.scope.$root.appEvent('confirm-modal', {
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete this data?',
      text2: 'Delete all the annotations in view',
      icon: 'fa-trash',
      confirmText: "Destroy",
      yesText: "Destroy",
      onConfirm: function() {
        self.influxDeleteRange("annotations");
      }
    });

  }

  uploadTable() {

    var self = this;

    this.table.validateCells(function(valid) {

      if (valid) {


        var count = 0;
        var line = "";
        _.forEach(self.datapoints, function(row) {

          var ts = moment(row.timestamp);
          if (ts.isValid() && row.value && row.value && !isNaN(parseFloat(row.value))) {
            line += "feeds," + self.$location.search().tags.join(',') + ",manual=true " +
              "value=" + row.value +
              " " + ts.unix() + "\n";
              count++;
          }
        });

        var p = self.backendSrv.request(self.getInfluxWrite(line));
        p.then(function(results) {
          console.log(results);
          self.publishAppEvent('zoom-out', 1.0);
          self.alertSrv.set("Upload Successful","Successfully uploaded " + count + " rows.",  'success', 10000);
          //  self.alertSrv.set("failed to delete device.", resp.meta.message, 'error', 10000);
        });

        self.datapoints = [];
        self.table.render();

      } else {
        self.alertSrv.set("failed to upload data.", "One or more rows contain invalid timestamps, please check your data and try again", 'error', 10000);
      }
    });


  }



  updateTable() {



    var self = this;

    var timeValidator = function(value, callback) {
      if (!value || value == undefined || value.length <= 0) {
        callback(true);
      } else {
        var t = moment(value);
        if (t.isValid()) {
          callback(true);
        } else {
          callback(false);
        }
      }
    };


    /*
    {
        data: 'asOf',
        type: 'date',
        dateFormat: 'MM/DD/YYYY'
    },
    */
    this.tableSettings = {
      data: self.datapoints,
      minSpareRows: 3,
      columns: [{
          data: 'timestamp',
          type: 'text',
          validator: timeValidator,
          allowInvalid: true
        },
        {
          data: 'value',
          type: 'numeric',
          format: '0.0000'
        }
      ],
      stretchH: 'all',
      autoWrapRow: true,
      height: 441,
      rowHeaders: true,
      colHeaders: [
        'Timestamp',
        'Value'
      ]
    };

//if( self.window.document.getElementById('datatable') != null){
    self.tableElement = self.window.document.getElementById('datatable');
    self.table = new Handsontable(self.tableElement, self.tableSettings);
//  }
  }


  getTimeAgo(epoch) {
    var duration = new Date().getTime() - new Date(epoch * 1000).getTime();
    if (duration < 10000) {
      return "a few seconds ago";
    }
    if (duration < 60000) {
      var secs = Math.floor(duration / 1000);
      return secs + " seconds ago";
    }
    if (duration < 3600000) {
      var mins = Math.floor(duration / 1000 / 60);
      return mins + " minutes ago";
    }
    if (duration < 86400000) {
      var hours = Math.floor(duration / 1000 / 60 / 60);
      return hours + " hours ago";
    }
    var days = Math.floor(duration / 1000 / 60 / 60 / 24);
    return days + " days ago";
  }


}

/* Get DATA FROM influxdb

// Query data from server
var start = self.dashboard.time.from.unix();
var end = self.dashboard.time.to.unix();
var query = "SELECT \"value\" FROM \"feeds\" WHERE " + self.$location.search()['var-query'] + " time > " + start + "s AND time < " + end + 's';

var p = self.backendSrv.request(self.getInfluxQuery(query));
p.then(function(results) {

  var time_index = results[0].series[0].columns.indexOf("time");
  var value_index = results[0].series[0].columns.indexOf("value");

  var lines = "";
_.forEach(results[0].series[0].values, function(row) {

  var ts = moment(row[time_index]);
  if (ts.isValid() && row.value && row.value && !isNaN(parseFloat(row.value))) {
    lines += "feeds_deleted," + self.$location.search().tags.join(',') + ",deleted=true " +
      "value=" + row[value_index] +
      " " + ts.unix() + "\n";
  }
});
*/

Q4DataEditorCtrl.templateUrl = 'public/plugins/flexscada-app/panels/q4-data-editor/module.html';

export {
  Q4DataEditorCtrl as PanelCtrl
};
