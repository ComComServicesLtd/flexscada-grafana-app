'use strict';

System.register(['./components/config/config', './components/device/device_list', './components/device/device_details', './components/device/device_config', './components/template/template_config', './components/template/template_list', 'app/plugins/sdk', './filters/all', './directives/all'], function (_export, _context) {
  "use strict";

  var ConfigCtrl, DeviceListCtrl, DeviceDetailsCtrl, DeviceConfigCtrl, TemplateConfigCtrl, TemplateListCtrl, loadPluginCss;
  return {
    setters: [function (_componentsConfigConfig) {
      ConfigCtrl = _componentsConfigConfig.ConfigCtrl;
    }, function (_componentsDeviceDevice_list) {
      DeviceListCtrl = _componentsDeviceDevice_list.DeviceListCtrl;
    }, function (_componentsDeviceDevice_details) {
      DeviceDetailsCtrl = _componentsDeviceDevice_details.DeviceDetailsCtrl;
    }, function (_componentsDeviceDevice_config) {
      DeviceConfigCtrl = _componentsDeviceDevice_config.DeviceConfigCtrl;
    }, function (_componentsTemplateTemplate_config) {
      TemplateConfigCtrl = _componentsTemplateTemplate_config.TemplateConfigCtrl;
    }, function (_componentsTemplateTemplate_list) {
      TemplateListCtrl = _componentsTemplateTemplate_list.TemplateListCtrl;
    }, function (_appPluginsSdk) {
      loadPluginCss = _appPluginsSdk.loadPluginCss;
    }, function (_filtersAll) {}, function (_directivesAll) {}],
    execute: function () {

      loadPluginCss({
        dark: 'plugins/flexscada-app/css/flexscada.dark.css',
        light: 'plugins/flexscada-app/css/flexscada.light.css'
      });
      //import {AnalysisCtrl} from './components/analysis/analysis';

      _export('DeviceListCtrl', DeviceListCtrl);

      _export('DeviceDetailsCtrl', DeviceDetailsCtrl);

      _export('DeviceConfigCtrl', DeviceConfigCtrl);

      _export('TemplateConfigCtrl', TemplateConfigCtrl);

      _export('TemplateListCtrl', TemplateListCtrl);

      _export('ConfigCtrl', ConfigCtrl);
    }
  };
});
