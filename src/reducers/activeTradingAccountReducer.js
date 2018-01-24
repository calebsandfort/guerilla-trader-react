import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function activeTradingAccountReducer(state = initialState.activeTradingAccount, action) {
  switch (action.type) {
    case types.LOAD_TRADING_ACCOUNTS_SUCCESS:
    {
      const foundTradingAccount = action.tradingAccounts.filter(ta => ta.Active);
      if (foundTradingAccount.length) {
        return Object.assign({}, foundTradingAccount[0]); //since filter returns an array, have to grab the first.
      }
      return state;
    }
    default:
      return state;
  }
}
