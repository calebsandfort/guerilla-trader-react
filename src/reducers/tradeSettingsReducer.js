import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function tradeSettingsReducer(state = initialState.tradeSettings, action) {
  switch (action.type) {
    case types.LOAD_TRADE_SETTINGS_SUCCESS:
          return action.tradeSettingss;

    case types.CREATE_TRADE_SETTINGS_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.tradeSettings)
      ];

    case types.UPDATE_TRADE_SETTINGS_SUCCESS:
    case types.REFRESH_TRADE_SETTINGS_SUCCESS:
      return [
        ...state.filter(tradeSettings => tradeSettings.Id !== action.tradeSettings.Id),
        Object.assign({}, action.tradeSettings)
      ];

    default:
          return state;
  }
}
