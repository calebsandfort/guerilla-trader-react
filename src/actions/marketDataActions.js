import MarketService from '../services/marketService';
import * as types from '../constants/actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadMarketsSuccess(marketData) {
  return {type: types.LOAD_MARKETS_SUCCESS, marketData};
}

export function marketDataReceived(marketData) {
  return {type: types.MARKET_DATA_RECEIVED, marketData};
}

export function economicIndicatorDataReceived(economicIndicatorData) {
  return {type: types.ECONOMIC_INDICATOR_DATA_RECEIVED, economicIndicatorData};
}

// export function createMarketSuccess(market) {
//   return {type: types.CREATE_MARKET_SUCCESS, market};
// }
//
// export function updateMarketSuccess(market) {
//   return {type: types.UPDATE_MARKET_SUCCESS, market};
// }
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
    return MarketService.getResultsWithTotalCount().then(response => {
      dispatch(loadMarketsSuccess({
        timestamp: new Date(),
        markets: response.results
      }));
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
