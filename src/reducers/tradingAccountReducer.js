import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function tradingAccountReducer(state = initialState.tradingAccounts, action) {
  switch (action.type) {
    case types.LOAD_TRADING_ACCOUNTS_SUCCESS:
          return action.tradingAccounts;

    case types.CREATE_TRADING_ACCOUNT_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.tradingAccount)
      ];

    case types.UPDATE_TRADING_ACCOUNT_SUCCESS:
    case types.REFRESH_TRADING_ACCOUNTS_SUCCESS:
      return [
        ...state.filter(tradingAccount => tradingAccount.Id !== action.tradingAccount.Id),
        Object.assign({}, action.tradingAccount)
      ];

    default:
          return state;
  }
}
