'use strict';

System.register(['./components/config/config', './components/device/device_list', './components/device/device_details', './components/device/device_config', './components/alarm/alarm_config', './components/alarm/alarm_list', './components/analysis/analysis', 'app/plugins/sdk', './filters/all', './directives/all'], function (_export, _context) {
  "use strict";

  var ConfigCtrl, DeviceListCtrl, DeviceDetailsCtrl, DeviceConfigCtrl, AlarmConfigCtrl, AlarmListCtrl, AnalysisCtrl, loadPluginCss;
  return {
    setters: [function (_componentsConfigConfig) {
      ConfigCtrl = _componentsConfigConfig.ConfigCtrl;
    }, function (_componentsDeviceDevice_list) {
      DeviceListCtrl = _componentsDeviceDevice_list.DeviceListCtrl;
    }, function (_componentsDeviceDevice_details) {
      DeviceDetailsCtrl = _componentsDeviceDevice_details.DeviceDetailsCtrl;
    }, function (_componentsDeviceDevice_config) {
      DeviceConfigCtrl = _componentsDeviceDevice_config.DeviceConfigCtrl;
    }, function (_componentsAlarmAlarm_config) {
      AlarmConfigCtrl = _componentsAlarmAlarm_config.AlarmConfigCtrl;
    }, function (_componentsAlarmAlarm_list) {
      AlarmListCtrl = _componentsAlarmAlarm_list.AlarmListCtrl;
    }, function (_componentsAnalysisAnalysis) {
      AnalysisCtrl = _componentsAnalysisAnalysis.AnalysisCtrl;
    }, function (_appPluginsSdk) {
      loadPluginCss = _appPluginsSdk.loadPluginCss;
    }, function (_filtersAll) {}, function (_directivesAll) {}],
    execute: function () {

      loadPluginCss({
        dark: 'plugins/flexscada-app/css/flexscada.dark.css',
        light: 'plugins/flexscada-app/css/flexscada.light.css'
      });

      _export('DeviceListCtrl', DeviceListCtrl);

      _export('DeviceDetailsCtrl', DeviceDetailsCtrl);

      _export('DeviceConfigCtrl', DeviceConfigCtrl);

      _export('AlarmConfigCtrl', AlarmConfigCtrl);

      _export('AlarmListCtrl', AlarmListCtrl);

      _export('AnalysisCtrl', AnalysisCtrl);

      _export('ConfigCtrl', ConfigCtrl);
    }
  };
});
//# sourceMappingURL=module.js.map
