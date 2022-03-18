interface INavigatorConfig {
  data: INavigatorItem[];
  rowLength: number;
}

interface INavigatorItem {
  target: string | undefined;
  favicon: string | undefined;
  faviconType: 'url' | 'base64';
}
