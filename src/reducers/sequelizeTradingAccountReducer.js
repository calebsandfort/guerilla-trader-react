import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function tradingAccountReducer(state = initialState.tradingAccounts, action) {
  switch (action.type) {
    case types.SEQUELIZE_LOAD_TRADING_ACCOUNTS_SUCCESS:
          return action.tradingAccounts;

    case types.SEQUELIZE_CREATE_TRADING_ACCOUNT_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.tradingAccount)
      ];

    case types.SEQUELIZE_UPDATE_TRADING_ACCOUNT_SUCCESS:
      return [
        ...state.filter(tradingAccount => tradingAccount.Id !== action.tradingAccount.Id),
        Object.assign({}, action.tradingAccount)
      ];

    default:
          return state;
  }
}
