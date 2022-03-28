const DEFAULT_ROW_LENGTH = 8;
const DEFAULT_DATA: INavigatorItem[] = [
  {
    id: 1,
    target: 'https://www.baidu.com/',
    favicon: 'https://www.baidu.com/favicon.ico',
    faviconType: 'url',
  },
  {
    id: 2,
    target: 'https://www.bilibili.com/',
    favicon: 'https://www.bilibili.com/favicon.ico',
    faviconType: 'url',
  },
];
const DEFAULT_DATA2: INavigatorItem[] = [
  {
    id: 1,
    target: 'https://www.qq.com/',
    favicon: 'https://www.qq.com/favicon.ico',
    faviconType: 'url',
  },
  {
    id: 2,
    target: 'https://blog.csdn.net/',
    favicon: 'https://blog.csdn.net/favicon.ico',
    faviconType: 'url',
  },
];

const DEFAULT_GROUP: INavigatorGroup[] = [
  {
    id: 1,
    name: '默认',
    items: DEFAULT_DATA,
  },
  {
    id: 2,
    name: '默认2',
    items: DEFAULT_DATA2,
  },
];

export let navigatorConfig: INavigatorConfig = {
  data: DEFAULT_GROUP,
  rowLength: DEFAULT_ROW_LENGTH,
};

export default navigatorConfig;
