import { combineReducers } from 'redux-loop';
import mockTradingAccounts from './mockTradingAccountReducer';
import tradingAccounts from './tradingAccountReducer';
import tradeSettings from './tradeSettingsReducer';
import activeTradingAccount from './activeTradingAccountReducer';
import marketData from './marketDataReducer';
import streamingData from './streamingDataReducer';
import currentDate from './currentDateReducer';
import dayTracker from './dayTrackerReducer';
import predictionEngine from './predictionEngineReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  mockTradingAccounts,
  tradingAccounts,
  // tradeSettings,
  activeTradingAccount,
  marketData,
  streamingData,
  currentDate,
  dayTracker,
  predictionEngine,
  routing: routerReducer
});

export default rootReducer;
