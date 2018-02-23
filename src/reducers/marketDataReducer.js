import * as types from '../constants/actionTypes';
import initialState from './initialState';
import {EconomicIndicator} from '../entities';

export default function marketDataReducer(state = initialState.marketData, action) {
  switch (action.type) {
    case types.LOAD_MARKETS_SUCCESS:
      return {
        timestamp: action.marketData.timestamp,
        markets: [...action.marketData.markets],
        economicIndicators: [...state.economicIndicators.map(x => Object.assign({}, x))]
      };

    case types.MARKET_DATA_RECEIVED:
      return {
        timestamp: action.marketData.timestamp,
        markets: [...state.markets.map(market => calculateWave(market, action.marketData.markets))],
        economicIndicators: [...state.economicIndicators.map(x => Object.assign({}, x))]
      };

    case types.ECONOMIC_INDICATOR_DATA_RECEIVED:
      return {
        timestamp: state.timestamp,
        markets: [...state.markets.map(x => Object.assign({}, x))],
        economicIndicators: [...state.economicIndicators.map(x => EconomicIndicator.assignFromStreamingQuote(x, action.economicIndicatorData.quotes))]
      };
    // case types.CREATE_MARKET_SUCCESS:
    //   return [
    //     ...state,
    //     Object.assign({}, action.market)
    //   ];
    //
    // case types.UPDATE_MARKET_SUCCESS:
    //   return [
    //     ...state.filter(market => market.Id !== action.market.Id),
    //     Object.assign({}, action.market)
    //   ];

    default:
      return state;
  }
}

function calculateWave(originalMarket, barchartMarkets) {
  let foundMarket = barchartMarkets.filter(m => m.symbol.startsWith(originalMarket.Symbol));
  if (foundMarket.length) {
    foundMarket = foundMarket[0];

    let updatedMarket = Object.assign({}, originalMarket,
      {
        Wave: ((Number.parseFloat(foundMarket.highPrice.replace(",", "")) - Number.parseFloat(foundMarket.lowPrice.replace(",", ""))) / originalMarket.TickSize) * originalMarket.TickValue,
        OpenPrice: Number.parseFloat(foundMarket.openPrice.replace(",", "")),
        LastPrice: Number.parseFloat(foundMarket.lastPrice.replace(",", ""))
      });

    updatedMarket.Change = updatedMarket.LastPrice - updatedMarket.OpenPrice;
    updatedMarket.ChangePercent = updatedMarket.Change / updatedMarket.OpenPrice;

    return updatedMarket;
  }

  return Object.assign({}, originalMarket);
}
