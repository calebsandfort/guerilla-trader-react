import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import mockTradingAccounts from './mockTradingAccountReducer';
import tradingAccounts from './tradingAccountReducer';
import tradeSettings from './tradeSettingsReducer';
import activeTradingAccount from './activeTradingAccountReducer';
import marketData from './marketDataReducer';
import currentDate from './currentDateReducer';
import dayTracker from './dayTrackerReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  fuelSavings,
  mockTradingAccounts,
  tradingAccounts,
  // tradeSettings,
  activeTradingAccount,
  marketData,
  currentDate,
  dayTracker,
  routing: routerReducer
});

export default rootReducer;
