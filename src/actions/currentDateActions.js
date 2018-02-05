import * as types from '../constants/actionTypes';

export function updateCurrentDate(currentDate) {
  return {type: types.UPDATE_CURRENT_DATE, currentDate};
}

