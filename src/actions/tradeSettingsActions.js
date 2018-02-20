import TradeSettingsService from '../services/tradeSettingsService';
import * as types from '../constants/actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadTradeSettingsSuccess(tradeSettings) {
  return {type: types.LOAD_TRADE_SETTINGS_SUCCESS, tradeSettings};
}

export function createTradeSettingsSuccess(tradeSettings) {
  return {type: types.CREATE_TRADE_SETTINGS_SUCCESS, tradeSettings};
}

export function updateTradeSettingsSuccess(tradeSettings) {
  return {type: types.UPDATE_TRADE_SETTINGS_SUCCESS, tradeSettings};
}

export function refreshTradeSettingsSuccess(tradeSettings) {
  return {type: types.REFRESH_TRADE_SETTINGS_SUCCESS, tradeSettings};
}
//
// export function updateTradeSettingsSuccess(tradeSettings) {
//   return {type: types.UPDATE_COURSE_SUCCESS, tradeSettings};
// }

// Functions below handle asynchronous calls.
// Each returns a function that accepts a dispatch.
// These are used by redux-thunk to support asynchronous interactions.
export function loadTradeSettings() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return TradeSettingsService.getResultsWithTotalCount().then(response => {
      dispatch(loadTradeSettingsSuccess(response.results));
    }).catch(response => {
      dispatch(ajaxCallError(response));
      throw(response);
    });
  };
}

export function saveTradeSettings(tradeSettings) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return TradeSettingsService.saveTradeSettings(tradeSettings).then(tradeSettings => {
      tradeSettings.data.Id ? dispatch(updateTradeSettingsSuccess(tradeSettings.data)) : dispatch(createTradeSettingsSuccess(tradeSettings.data));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function refreshTradeSettings(tradeSettings) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return TradeSettingsService.getTradeSettings(tradeSettings).then(response => {
      dispatch(refreshTradeSettingsSuccess(response.data));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
