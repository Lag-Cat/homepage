import { setConfig } from '@/utils/config';
import { initBackground } from '@/utils/init';
import { ImmerReducer, Reducer } from 'umi';
import { IAction } from '.';

export interface SettingsModelState {
  background: IBackground;
}
export interface SettingsModelType {
  namespace: 'settings';
  state: SettingsModelState;
  effects: {};
  reducers: {
    saveBackgroundSettings: ImmerReducer<SettingsModelState>;
    initBackgroundSettings: ImmerReducer<SettingsModelState>;
  };
  subscriptions: {};
}

const settingsModel: SettingsModelType = {
  namespace: 'settings',
  state: {
    background: localStorage.getItem('CONFIG_BACKGROUND')
      ? JSON.parse(localStorage.getItem('CONFIG_BACKGROUND') as string)
      : initBackground(),
  },
  effects: {},
  reducers: {
    saveBackgroundSettings(state, action: IAction<IBackground>) {
      setConfig('CONFIG_BACKGROUND', action.payload);
      return {
        ...state,
        ...{ background: { ...action.payload } },
      };
    },
    initBackgroundSettings(state, action: IAction<IBackground>) {
      return {
        ...state,
        ...{ background: { ...action.payload } },
      };
    },
  },
  subscriptions: {},
};

export default settingsModel;
