import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import mockTradingAccounts from './mockTradingAccountReducer';
import tradingAccounts from './tradingAccountReducer';
import activeTradingAccount from './activeTradingAccountReducer';
import marketData from './marketDataReducer';
import currentDate from './currentDateReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  fuelSavings,
  mockTradingAccounts,
  tradingAccounts,
  activeTradingAccount,
  marketData,
  currentDate,
  routing: routerReducer
});

export default rootReducer;
