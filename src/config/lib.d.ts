interface INavigatorConfig {
  data: INavigatorGroup[];
  rowLength: number;
}

interface INavigatorItem {
  id: number;
  target: string | undefined;
  favicon: string | undefined;
  faviconType: 'url' | 'base64';
}

interface INavigatorGroup {
  id: number;
  name: string;
  items: INavigatorItem[];
}

interface ISearchBox {
  websites: ISearchBoxWebsite[];
}

interface ISearchBoxWebsite {
  id: number;
  url: string;
  name: string;
  icon: string;
}
