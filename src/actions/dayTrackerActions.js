import * as types from '../constants/actionTypes';

export function addWin() {
  return {type: types.ADD_WIN_TO_DAY_TRACKER};
}

export function addLoss() {
  return {type: types.ADD_LOSS_TO_DAY_TRACKER};
}

