import * as types from '../constants/actionTypes';
import initialState from './initialState';
import {EconomicIndicator} from '../entities';

export default function streamingDataReducer(state = initialState.streamingData, action) {
  let newState = {};

  switch (action.type) {
    case types.LOAD_MARKETS_SUCCESS:
    {
      const activeMarkets = action.marketData.markets.filter(ta => ta.Active);
      if (activeMarkets.length) {
        newState = {
          markets: [...activeMarkets.map(x => new EconomicIndicator(x.CnbcSymbol))],
          economicIndicators: [...state.economicIndicators.map(x => Object.assign({}, x))]
        };
      }
      else {
        newState = state;
      }
      break;
    }
    case types.STREAMING_DATA_RECEIVED:
      newState = {
        markets: [...state.markets.map(x => EconomicIndicator.assignFromStreamingQuote(x, action.quotes.quotes))],
        economicIndicators: [...state.economicIndicators.map(x => EconomicIndicator.assignFromStreamingQuote(x, action.quotes.quotes))]
      };
      break;
    default:
      newState = state;
  }

  return newState;
}
