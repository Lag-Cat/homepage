import path from './path';
import { navigatorConfig } from '@/config/navigator';
import { DEFAULT_SEARCHBOX } from '@/config/searchBox';
import { setConfig, getTimestamp } from './config';
import { isNullOrEmpty } from './string';

const initConfig = () => {};

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

export const initNavigator = (): INavigatorConfig => {
  setConfig('CONFIG_NAVIGATOR', navigatorConfig);
  return navigatorConfig;
};

export const initSearchBox = (): ISearchBox => {
  setConfig('CONFIG_NAVIGATOR', DEFAULT_SEARCHBOX);
  return DEFAULT_SEARCHBOX;
};
