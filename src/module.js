import {ConfigCtrl} from './components/config/config';
import {DeviceListCtrl} from './components/device/device_list';
import {DeviceDetailsCtrl} from './components/device/device_details';
import {DeviceConfigCtrl} from './components/device/device_config';
import {AlarmConfigCtrl} from './components/alarm/alarm_config';
import {AlarmListCtrl} from './components/alarm/alarm_list';
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
  AlarmConfigCtrl,
  AlarmListCtrl,
  ConfigCtrl
};
