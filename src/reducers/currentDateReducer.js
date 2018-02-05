import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function activeTradingAccountReducer(state = initialState.currentDate, action) {
  switch (action.type) {
    case types.UPDATE_CURRENT_DATE:
    {
      return action.currentDate;
    }
    default:
      return state;
  }
}
