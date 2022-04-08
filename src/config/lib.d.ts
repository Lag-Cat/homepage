interface INavigatorConfig {
  data: INavigatorGroup[];
  rowLength: number;
}

interface INavigatorItem {
  id: number;
  title?: string;
  target: string | undefined;
  favicon: string | undefined;
  faviconType: 'url' | 'base64';
}

interface INavigatorGroup {
  id: number;
  name: string;
  items: INavigatorItem[];
  itemType?: 'icon' | 'label' | 'text';
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

interface IBackground {
  url: string;
}
