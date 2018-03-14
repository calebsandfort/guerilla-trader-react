import { loop, Cmd } from 'redux-loop';
import {
  BUILD_DECISION_TREE_SUCCESS,
  BUILD_DECISION_TREE_FAILED,
  LOAD_TRADES_SUCCESS
} from '../constants/actionTypes';

import initialState from './initialState';
import {buildDecisionTreeSuccess, buildDecisionTreeFailed} from '../actions/predictionEngineActions';
import {DecisionTree, getDecisionTreeObservationFromTrade, getObservationsFromModels, buildTreeAsync} from '../MachineLearning';

import _ from 'underscore';

export default function predictionEnginReducer(state = initialState.predictionEngine, action) {
  let newState;

  switch (action.type) {
    case LOAD_TRADES_SUCCESS:
    {
      const [observations, labels] = getObservationsFromModels(action.trades.data, getDecisionTreeObservationFromTrade);

      return loop(
        state,
        Cmd.run(buildTreeAsync, {
          successActionCreator: buildDecisionTreeSuccess,
          failActionCreator: buildDecisionTreeFailed,
          args: [observations, labels, DecisionTree.entropy]
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
      return state;
    }

    default:
      return state;
  }
}
