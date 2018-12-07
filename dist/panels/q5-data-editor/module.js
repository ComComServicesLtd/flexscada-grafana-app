'use strict';

System.register(['lodash', 'app/plugins/sdk', 'jquery', 'moment', 'app/core/utils/datemath', 'app/core/core'], function (_export, _context) {
  "use strict";

  var _, MetricsPanelCtrl, PanelCtrl, loadPluginCss, $, moment, dateMath, appEvents, coreModule, _createClass, _get, Q5DataEditorCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_lodash) {
      _ = _lodash.default;
    }, function (_appPluginsSdk) {
      MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
      PanelCtrl = _appPluginsSdk.PanelCtrl;
      loadPluginCss = _appPluginsSdk.loadPluginCss;
    }, function (_jquery) {
      $ = _jquery;
    }, function (_moment) {
      moment = _moment.default;
    }, function (_appCoreUtilsDatemath) {
      dateMath = _appCoreUtilsDatemath;
    }, function (_appCoreCore) {
      appEvents = _appCoreCore.appEvents;
      coreModule = _appCoreCore.coreModule;
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

      _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;
        var desc = Object.getOwnPropertyDescriptor(object, property);

        if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);

          if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;

          if (getter === undefined) {
            return undefined;
          }

          return getter.call(receiver);
        }
      };

      _export('PanelCtrl', Q5DataEditorCtrl = function (_MetricsPanelCtrl) {
        _inherits(Q5DataEditorCtrl, _MetricsPanelCtrl);

        /** @ngInject */
        function Q5DataEditorCtrl($scope, $injector, $location, $q, backendSrv, alertSrv) {
          _classCallCheck(this, Q5DataEditorCtrl);

          var _this = _possibleConstructorReturn(this, (Q5DataEditorCtrl.__proto__ || Object.getPrototypeOf(Q5DataEditorCtrl)).call(this, $scope, $injector));

          _this.backendSrv = backendSrv;
          _this.alertSrv = alertSrv;
          _this.$location = $location;
          _this.$q = $q;
          _this.window = window;
          _this.scope = $scope;

          _this.isOrgEditor = _this.backendSrv.contextSrv.hasRole('Editor') || _this.backendSrv.contextSrv.hasRole('Admin');

          //  this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
          _this.events.on('refresh', _this.onRefresh.bind(_this));
          _this.events.on('render', _this.onRender.bind(_this));

          _this.events.on('data-received', _this.onDataReceived.bind(_this));
          _this.events.on('data-error', _this.onDataError.bind(_this));

          var self = _this;

          return _this;
        }

        _createClass(Q5DataEditorCtrl, [{
          key: 'onInitEditMode',
          value: function onInitEditMode() {
            //  this.addEditorTab('Options', 'public/app/plugins/panel/text/editor.html');
            //  this.editorTabIndex = 1;
          }
        }, {
          key: 'onRefresh',
          value: function onRefresh() {
            this.render();
          }
        }, {
          key: 'onRender',
          value: function onRender() {
            this.renderingCompleted();
          }
        }, {
          key: 'issueQueries',
          value: function issueQueries(datasource) {
            // this.annotationsPromise = this.annotationsSrv.getAnnotations({
            //   dashboard: this.dashboard,
            //   panel: this.panel,
            //   range: this.range,
            // });
            return _get(Q5DataEditorCtrl.prototype.__proto__ || Object.getPrototypeOf(Q5DataEditorCtrl.prototype), 'issueQueries', this).call(this, datasource);
          }
        }, {
          key: 'onDataReceived',
          value: function onDataReceived(dataList) {

            var triggerRefresh = false;

            if (this.panel.targets[0].hide == false) triggerRefresh = true;

            this.panel.targets[0].query = "";
            this.panel.targets[0].hide = true;

            if (triggerRefresh) this.publishAppEvent('zoom-out', 1.0);
          }
        }, {
          key: 'onDataError',
          value: function onDataError(err) {
            this.panel.targets[0].query = "";
            this.panel.targets[0].hide = true;
          }
        }, {
          key: 'influxDeleteRange',
          value: function influxDeleteRange() {
            var self = this;
          }
        }, {
          key: 'deleteDataRange',
          value: function deleteDataRange() {

            var self = this;

            if (this.isOrgEditor) {

              self.scope.$root.appEvent('confirm-modal', {
                title: 'Confirm Deletion',
                text: 'Are you sure you want to delete all of the data displayed above?',
                text2: 'This will permentaly destroy everything shown on the above graph...',
                icon: 'fa-trash',
                confirmText: "Destroy",
                yesText: "Destroy",
                onConfirm: function onConfirm() {
                  self.panel.targets[0].query = "DELETE FROM /^$measurement$/ WHERE (\"uid\" =~ /^$uid$/ AND \"label\" =~ /^$label$/ AND \"device\" =~ /^$device$/) AND $timeFilter";
                  self.panel.targets[0].hide = false;
                  self.refresh();
                }
              });
            } else {
              self.alertSrv.set("failed to delete dataset", "You do not have adequate permissions to perform this action.", 'error', 10000);
            }
          }
        }]);

        return Q5DataEditorCtrl;
      }(MetricsPanelCtrl));

      Q5DataEditorCtrl.templateUrl = 'public/plugins/flexscada-app/panels/q5-data-editor/module.html';

      _export('PanelCtrl', Q5DataEditorCtrl);
    }
  };
});
