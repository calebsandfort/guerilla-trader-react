import { loop, Cmd } from 'redux-loop';
import {
  BUILD_DECISION_TREE_SUCCESS,
  BUILD_DECISION_TREE_FAILED,
  LOAD_TRADES_SUCCESS
} from '../constants/actionTypes';

import initialState from './initialState';
import {buildDecisionTreeSuccess, buildDecisionTreeFailed} from '../actions/predictionEngineActions';
import {DecisionTreeBuilder, getDecisionTreeObservationFromTrade} from '../MachineLearning';

import _ from 'underscore';

export default function predictionEnginReducer(state = initialState.predictionEngine, action) {
  let newState;

  switch (action.type) {
    case LOAD_TRADES_SUCCESS:
    {
      return loop(
        state,
        Cmd.run(DecisionTreeBuilder.buildTreeAsync, {
          successActionCreator: buildDecisionTreeSuccess,
          failActionCreator: buildDecisionTreeFailed,
          args: [action.trades.data.map(x => getDecisionTreeObservationFromTrade(x)), DecisionTreeBuilder.entropy]
        })
      );
    }

    case BUILD_DECISION_TREE_SUCCESS:
    {
      newState = Object.assign({}, state, {
        decisionTree: action.decisionTree
      });

      return newState;
    }

    case BUILD_DECISION_TREE_FAILED:
    {
      console.log(action.error);
      return state;
    }

    default:
      return state;
  }
}
