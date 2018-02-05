import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function marketDataReducer(state = initialState.marketData, action) {
  switch (action.type) {
    case types.LOAD_MARKETS_SUCCESS:
      return action.marketData;

    case types.MARKET_DATA_RECEIVED:
      return {
        timestamp: action.marketData.timestamp,
        markets: [...state.markets.map(market => calculateWave(market, action.marketData.markets))]
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

function calculateWave(originalMarket, barchartMarkets){
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
