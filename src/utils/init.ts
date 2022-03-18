import path from './path';
import { navigatorConfig } from '@/config/navigator';
import { setConfig } from './config';
import { isNullOrEmpty } from './string';

const initConfig = () => {};

interface IInitNavigatorItem {
  target: string;
  favicon?: string;
}
export const initNavigatorItem: (item: IInitNavigatorItem) => INavigatorItem = (
  item,
) => {
  return {
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
