import { SettingsModelState } from './settings';

interface IndexModels {
  settings: SettingsModelState;
}

interface IAction<T> {
  type: string;
  payload?: T;
}
