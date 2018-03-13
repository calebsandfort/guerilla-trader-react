import * as types from '../constants/actionTypes';

export function buildDecisionTreeSuccess(decisionTree) {
  return {type: types.BUILD_DECISION_TREE_SUCCESS, decisionTree};
}

export function buildDecisionTreeFailed(error){
  return {
    type: types.BUILD_DECISION_TREE_FAILED,
    error
  };
}
