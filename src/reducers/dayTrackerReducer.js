import {ADD_WIN_TO_DAY_TRACKER, ADD_LOSS_TO_DAY_TRACKER} from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function dayTrackerReducer(state = initialState.dayTracker, action) {
  let newState;

  switch (action.type) {
    case ADD_WIN_TO_DAY_TRACKER:
      newState = objectAssign({}, state, {
        id: state.id + 1,
        winningTrades: state.winningTrades + 1,
        totalTrades: state.totalTrades + 1
      });

      reconcileR(newState);
      reconcilePL(newState);

      return newState;

    case ADD_LOSS_TO_DAY_TRACKER:
      newState = objectAssign({}, state, {
        id: state.id + 1,
        losingTrades: state.losingTrades + 1,
        totalTrades: state.totalTrades + 1
      });

      reconcileR(newState);
      reconcilePL(newState);

      return newState;

    // case SAVE_FUEL_SAVINGS:
    //   // For this example, just simulating a save by changing date modified.
    //   // In a real app using Redux, you might use redux-thunk and handle the async call in fuelSavingsActions.js
    //   return objectAssign({}, state, {dateModified: action.dateModified});
    //
    // case CALCULATE_FUEL_SAVINGS:
    //   newState = objectAssign({}, state);
    //   newState[action.fieldName] = action.value;
    //   newState.necessaryDataIsProvidedToCalculateSavings = necessaryDataIsProvidedToCalculateSavings(newState);
    //   newState.dateModified = action.dateModified;
    //
    //   if (newState.necessaryDataIsProvidedToCalculateSavings) {
    //     newState.savings = calculateSavings(newState);
    //   }
    //
    //   return newState;

    default:
      return state;
  }
}

function reconcileR(dayTracker) {
  const totalReward = (dayTracker.winningTrades * dayTracker.tradeSettings.contracts * dayTracker.tradeSettings.reward)
    - (dayTracker.winningTrades * dayTracker.tradeSettings.contracts * dayTracker.tradeSettings.roundTripCommissions);

  const totalRisk = (dayTracker.losingTrades * dayTracker.tradeSettings.contracts * dayTracker.tradeSettings.risk)
    - (dayTracker.losingTrades * dayTracker.tradeSettings.contracts * dayTracker.tradeSettings.roundTripCommissions);

  if(totalRisk == 0){
    dayTracker.r = totalReward / ((dayTracker.winningTrades * dayTracker.tradeSettings.contracts * dayTracker.tradeSettings.reward) / dayTracker.winningTrades);
  }
  else{
    dayTracker.r = totalReward/totalRisk;
  }

  const newRChartItem = {
    tradeNumber: dayTracker.id.toString(),
    r: dayTracker.r
  };

  dayTracker.rChartItems = [...dayTracker.rChartItems];
  dayTracker.rChartItems.push(newRChartItem);
}

function reconcilePL(dayTracker) {
  dayTracker.pl = (dayTracker.winningTrades * dayTracker.tradeSettings.contracts * dayTracker.tradeSettings.reward)
    - (dayTracker.losingTrades * dayTracker.tradeSettings.contracts * dayTracker.tradeSettings.risk)
    - (dayTracker.totalTrades * dayTracker.tradeSettings.contracts * dayTracker.tradeSettings.roundTripCommissions);

  const newPlChartItem = {
    tradeNumber: dayTracker.id.toString(),
    pl: dayTracker.pl
  };

  dayTracker.plChartItems = [...dayTracker.plChartItems];
  dayTracker.plChartItems.push(newPlChartItem);
}
