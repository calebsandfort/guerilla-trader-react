import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import mockTradingAccounts from './mockTradingAccountReducer';
import tradingAccounts from './tradingAccountReducer';
import markets from './marketReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  fuelSavings,
  mockTradingAccounts,
  tradingAccounts,
  markets,
  routing: routerReducer
});

export default rootReducer;
