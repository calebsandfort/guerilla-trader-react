import TradeService from '../services/tradeService';
import * as types from '../constants/actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadTradesSuccess(trades) {
  return {type: types.LOAD_TRADES_SUCCESS, trades};
}

export function createTradeSuccess(trade) {
  return {type: types.CREATE_TRADE_SUCCESS, trade};
}

export function updateTradeSuccess(trade) {
  return {type: types.UPDATE_TRADE_SUCCESS, trade};
}

export function refreshTradeSuccess(trade) {
  return {type: types.REFRESH_TRADES_SUCCESS, trade};
}
//
// export function updateTradeSuccess(trade) {
//   return {type: types.UPDATE_COURSE_SUCCESS, trade};
// }

// Functions below handle asynchronous calls.
// Each returns a function that accepts a dispatch.
// These are used by redux-thunk to support asynchronous interactions.
export function loadTrades() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return TradeService.getResultsWithTotalCount().then(response => {
      dispatch(loadTradesSuccess(response.results));
    }).catch(response => {
      dispatch(ajaxCallError(response));
      throw(response);
    });
  };
}

export function saveTrade(trade) {
  const creating = typeof(trade.Id) == "undefined";
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return TradeService.saveTrade(trade).then(trade => {
      creating ? dispatch(createTradeSuccess(trade.data)) : dispatch(updateTradeSuccess(trade.data));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function refreshTrade(trade) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return TradeService.getTrade(trade).then(response => {
      dispatch(refreshTradeSuccess(response.data));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
