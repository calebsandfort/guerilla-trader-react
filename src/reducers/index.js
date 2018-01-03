import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import mockTradingAccounts from './mockTradingAccountReducer';
import sequelizeTradingAccounts from './sequelizeTradingAccountReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  fuelSavings,
  mockTradingAccounts,
  sequelizeTradingAccounts,
  routing: routerReducer
});

export default rootReducer;
