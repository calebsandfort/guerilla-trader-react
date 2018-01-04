import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function marketReducer(state = initialState.markets, action) {
  switch (action.type) {
    case types.LOAD_MARKETS_SUCCESS:
          return action.markets;

    case types.CREATE_MARKET_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.market)
      ];

    case types.UPDATE_MARKET_SUCCESS:
      return [
        ...state.filter(market => market.Id !== action.market.Id),
        Object.assign({}, action.market)
      ];

    default:
          return state;
  }
}
