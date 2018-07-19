import {ConfigCtrl} from './components/config/config';
import {DeviceListCtrl} from './components/device/device_list';
import {DeviceDetailsCtrl} from './components/device/device_details';
import {DeviceConfigCtrl} from './components/device/device_config';
import {TemplateConfigCtrl} from './components/template/template_config';
import {TemplateListCtrl} from './components/template/template_list';
//import {AnalysisCtrl} from './components/analysis/analysis';
import {NewDeviceCtrl} from './components/device/new_device';
import {loadPluginCss} from 'app/plugins/sdk';
import './filters/all';
import './directives/all';

loadPluginCss({
  dark: 'plugins/flexscada-app/css/flexscada.dark.css',
  light: 'plugins/flexscada-app/css/flexscada.light.css'
});

export {
  DeviceListCtrl,
  DeviceDetailsCtrl,
  DeviceConfigCtrl,
  TemplateConfigCtrl,
  TemplateListCtrl,
  NewDeviceCtrl,
//  AnalysisCtrl,
  ConfigCtrl
};
