import * as types from '../constants/actionTypes';

export function buildMlAlgorithmSuccess(algorithm) {
  return {type: types.BUILD_ML_ALGORITHM_SUCCESS, algorithm: algorithm};
}

export function buildMlAlgorithmFailed(error){
  return {
    type: types.BUILD_ML_ALGORITHM_FAILED,
    error
  };
}

export function generateMlAlgorithmReportSuccess(report) {
  return {type: types.GENERATE_ML_ALGORITHM_REPORT_SUCCESS, report: report};
}

export function generateMlAlgorithmReportFailed(error){
  return {
    type: types.GENERATE_ML_ALGORITHM_REPORT_FAILED,
    error
  };
}
