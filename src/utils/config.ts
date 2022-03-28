import { isNullOrEmpty } from './string';
import { initNavigator, initSearchBox } from './init';

const CONFIG_NAVIGATOR = 'CONFIG_NAVIGATOR';

declare type TConfig = INavigatorConfig;
declare type TConfigName = 'CONFIG_NAVIGATOR' | 'CONFIG_SEARCHBOX';

export const getConfig = (configName: TConfigName) => {
  let configStr = localStorage.getItem(configName);
  if (isNullOrEmpty(configStr)) {
    switch (configName) {
      case 'CONFIG_NAVIGATOR':
        return initNavigator();
      case 'CONFIG_SEARCHBOX':
        return initSearchBox();
      default:
        return {};
    }
  }

  return JSON.parse(configStr ? configStr : '');
};

export const setConfig = (configName: TConfigName, config: any) => {
  localStorage.setItem(configName, JSON.stringify(config));
};

export const saveNavigatorConfig = (navigatorConfig: INavigatorConfig) => {
  setConfig(CONFIG_NAVIGATOR, navigatorConfig);
};

export const getTimestamp: () => number = () => {
  return new Date().getTime();
};
