import { ImmerReducer, Reducer } from 'umi';

export interface SettingsModelState {
  test: string;
}

export interface SettingsModelType {
  namespace: 'settings';
  state: SettingsModelState;
  effects: {};
  reducers: {
    saveBackgroundSettings: ImmerReducer<SettingsModelState>;
  };
  subscriptions: {};
}

const settingsModel: SettingsModelType = {
  namespace: 'settings',
  state: {
    test: 'asd',
  },
  effects: {},
  reducers: {
    saveBackgroundSettings(state, action) {
      return {
        ...state,
        ...{ test: action.payload },
      };
    },
  },
  subscriptions: {},
};

export default settingsModel;
