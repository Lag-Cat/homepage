import path from './path';
import { navigatorConfig } from '@/config/navigator';
import { DEFAULT_SEARCHBOX } from '@/config/searchBox';
import { setConfig, getTimestamp } from './config';
import { isNullOrEmpty } from './string';
import { DEFAULT_BACKGROUND } from '@/config/background';

export interface IInitNavigatorItem {
  target: string;
  favicon?: string;
}
export const initNavigatorItem: (item: IInitNavigatorItem) => INavigatorItem = (
  item,
) => {
  return {
    id: getTimestamp(),
    target: item.target,
    favicon: isNullOrEmpty(item.favicon)
      ? path.getFavicon(item.target)
      : item.favicon,
    faviconType: 'url',
  };
};

export const intiNavigatorGroup: (groupName: string) => INavigatorGroup = (
  groupName,
) => {
  return {
    id: getTimestamp(),
    name: groupName,
    items: [],
  };
};

export const initNavigator = (): INavigatorConfig => {
  setConfig('CONFIG_NAVIGATOR', navigatorConfig);
  return navigatorConfig;
};

export const initSearchBox = (): ISearchBox => {
  setConfig('CONFIG_NAVIGATOR', DEFAULT_SEARCHBOX);
  return DEFAULT_SEARCHBOX;
};

export const initBackground = ():IBackground=>{
  setConfig("CONFIG_BACKGROUND",DEFAULT_BACKGROUND);
  return DEFAULT_BACKGROUND;
}