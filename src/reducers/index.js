import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import tradingAccounts from './tradingAccountReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  fuelSavings,
  tradingAccounts,
  routing: routerReducer
});

export default rootReducer;
