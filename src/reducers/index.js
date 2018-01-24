import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import mockTradingAccounts from './mockTradingAccountReducer';
import tradingAccounts from './tradingAccountReducer';
import activeTradingAccount from './activeTradingAccountReducer';
import markets from './marketReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  fuelSavings,
  mockTradingAccounts,
  tradingAccounts,
  activeTradingAccount,
  markets,
  routing: routerReducer
});

export default rootReducer;
