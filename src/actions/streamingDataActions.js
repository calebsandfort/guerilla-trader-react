import * as types from '../constants/actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function streamingDataReceived(quotes) {
  return {type: types.STREAMING_DATA_RECEIVED, quotes};
}
