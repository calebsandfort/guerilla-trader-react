import _ from 'underscore';
import { loop, Cmd } from 'redux-loop';
import * as types from '../constants/actionTypes';
import initialState from './initialState';
import TradeService from '../services/tradeService';
import {loadTradesSuccess} from '../actions/tradeActions';

export default function activeTradingAccountReducer(state = initialState.activeTradingAccount, action) {
  let newState;

  switch (action.type) {
    case types.LOAD_TRADING_ACCOUNTS_SUCCESS:
    {
      const activeTradingAccount = _.find(action.tradingAccounts, function (x) {
        return x.Active;
      });
      if (typeof activeTradingAccount != 'undefined') {
        newState = Object.assign({}, activeTradingAccount);

        return loop(
          newState,
          Cmd.run(TradeService.findAllForTradingAccount, {
            successActionCreator: loadTradesSuccess,
            args: [activeTradingAccount.Id]
          })
        );
      }
      return state;
    }
    case types.REFRESH_TRADING_ACCOUNTS_SUCCESS:
    {
      if(state.Id == action.tradingAccount.Id){
        return Object.assign({}, action.tradingAccount);
      }
      else{
        return state;
      }
    }
    default:
      return state;
  }
}
