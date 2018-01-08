import TradingAccountService from '../services/tradingAccountService';
import * as types from '../constants/actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadTradingAccountsSuccess(tradingAccounts) {
  return {type: types.LOAD_TRADING_ACCOUNTS_SUCCESS, tradingAccounts};
}

export function createTradingAccountSuccess(tradingAccount) {
  return {type: types.CREATE_TRADING_ACCOUNT_SUCCESS, tradingAccount};
}

export function updateTradingAccountSuccess(tradingAccount) {
  return {type: types.UPDATE_TRADING_ACCOUNT_SUCCESS, tradingAccount};
}
//
// export function updateTradingAccountSuccess(tradingAccount) {
//   return {type: types.UPDATE_COURSE_SUCCESS, tradingAccount};
// }

// Functions below handle asynchronous calls.
// Each returns a function that accepts a dispatch.
// These are used by redux-thunk to support asynchronous interactions.
export function loadTradingAccounts() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return TradingAccountService.getResultsWithTotalCount().then(response => {
      dispatch(loadTradingAccountsSuccess(response.results));
    }).catch(response => {
      dispatch(ajaxCallError(response));
      throw(response);
    });
  };
}

// export function saveTradingAccount(tradingAccount) {
//   return function (dispatch, getState) {
//     dispatch(beginAjaxCall());
//     return TradingAccountApi.saveTradingAccount(tradingAccount).then(tradingAccount => {
//       tradingAccount.id ? dispatch(updateTradingAccountSuccess(tradingAccount)) : dispatch(createTradingAccountSuccess(tradingAccount));
//     }).catch(error => {
//       dispatch(ajaxCallError(error));
//       throw(error);
//     });
//   };
// }
