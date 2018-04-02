import { loop, Cmd } from 'redux-loop';
import {
  BUILD_DECISION_TREE_SUCCESS,
  BUILD_DECISION_TREE_FAILED,
  LOAD_TRADES_SUCCESS
} from '../constants/actionTypes';

import initialState from './initialState';
import {buildDecisionTreeSuccess, buildDecisionTreeFailed} from '../actions/predictionEngineActions';
import {DecisionTree, getDecisionTreeObservationFromTrade, getObservationsFromModels,
  buildTreeAsync, entropy, loadPredictionAlgorithmAsync} from '../MachineLearning';

import _ from 'underscore';

export default function predictionEnginReducer(state = initialState.predictionEngine, action) {
  let newState;

  switch (action.type) {
    case LOAD_TRADES_SUCCESS:
    {
      const [observations, labels] = getObservationsFromModels(action.trades.data, getDecisionTreeObservationFromTrade);

      return loop(
        state,
        Cmd.run(loadPredictionAlgorithmAsync, {
          successActionCreator: buildDecisionTreeSuccess,
          failActionCreator: buildDecisionTreeFailed,
          args: ["DecisionTree", observations, labels, {scoref: entropy}]
        })
      );
    }

    case BUILD_DECISION_TREE_SUCCESS:
    {
      let algorithms = new Map(...state.algorithms);
      algorithms.set(action.algorithm.name, action.algorithm);

      newState = Object.assign({}, state, {
        algorithms: algorithms
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
