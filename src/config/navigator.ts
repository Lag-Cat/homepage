const DEFAULT_ROW_LENGTH = 8;
const DEFAULT_DATA: INavigatorItem[] = [
  {
    target: 'https://www.baidu.com/',
    favicon: 'https://www.baidu.com/favicon.ico',
    faviconType: 'url',
  },
  {
    target: 'https://www.bilibili.com/',
    favicon: 'https://www.bilibili.com/favicon.ico',
    faviconType: 'url',
  },
];

export let navigatorConfig: INavigatorConfig = {
  data: DEFAULT_DATA,
  rowLength: DEFAULT_ROW_LENGTH,
};

export default navigatorConfig;
