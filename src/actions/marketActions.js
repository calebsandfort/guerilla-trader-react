import MarketService from '../services/marketService';
import * as types from '../constants/actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadMarketsSuccess(markets) {
  return {type: types.LOAD_MARKETS_SUCCESS, markets};
}

export function createMarketSuccess(market) {
  return {type: types.CREATE_MARKET_SUCCESS, market};
}

export function updateMarketSuccess(market) {
  return {type: types.UPDATE_MARKET_SUCCESS, market};
}
//
// export function updateMarketSuccess(market) {
//   return {type: types.UPDATE_COURSE_SUCCESS, market};
// }

// Functions below handle asynchronous calls.
// Each returns a function that accepts a dispatch.
// These are used by redux-thunk to support asynchronous interactions.
export function loadMarkets() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return MarketService.getMarketsWithCount().then(response => {
      dispatch(loadMarketsSuccess(response[0].data));
    }).catch(response => {
      dispatch(ajaxCallError(response));
      throw(response);
    });
  };
}

// export function saveMarket(market) {
//   return function (dispatch, getState) {
//     dispatch(beginAjaxCall());
//     return MarketApi.saveMarket(market).then(market => {
//       market.id ? dispatch(updateMarketSuccess(market)) : dispatch(createMarketSuccess(market));
//     }).catch(error => {
//       dispatch(ajaxCallError(error));
//       throw(error);
//     });
//   };
// }
