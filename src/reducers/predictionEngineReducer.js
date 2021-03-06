import {loop, Cmd} from 'redux-loop';
import {
  BUILD_ML_ALGORITHM_SUCCESS,
  BUILD_ML_ALGORITHM_FAILED,
  LOAD_TRADES_SUCCESS, GENERATE_ML_ALGORITHM_REPORT_SUCCESS, GENERATE_ML_ALGORITHM_REPORT_FAILED
} from '../constants/actionTypes';

import initialState from './initialState';
import {buildMlAlgorithmSuccess, buildMlAlgorithmFailed, generateMlAlgorithmReportSuccess, generateMlAlgorithmReportFailed} from '../actions/predictionEngineActions';
import {
  DecisionTree, getDecisionTreeObservationFromTrade, getObservationsFromModels,
  buildTreeAsync, entropy, loadPredictionAlgorithmAsync, getTradeMlDescriptions, getTradeReportItems,
  kFoldJTimesAsync
} from '../MachineLearning';

import LogisticRegression from 'ml-logistic-regression';
import SVM from 'ml-svm';
import {GaussianNB, MultinomialNB} from 'ml-naivebayes';
import {DecisionTreeClassifier} from 'ml-cart';
import {RandomForestClassifier as RFClassifier} from 'ml-random-forest';
import FeedforwardNeuralNetwork from 'ml-fnn';
import xsadd from 'ml-xsadd';
const random = new xsadd(0).random;


import _ from 'underscore';

export default function predictionEnginReducer(state = initialState.predictionEngine, action) {
  let newState;

  switch (action.type) {
    case LOAD_TRADES_SUCCESS: {
      const [observations, labels] = getObservationsFromModels(action.trades.data, getDecisionTreeObservationFromTrade);

      let mlDescription = getTradeMlDescriptions(action.trades.data);
      //const k = Math.floor(action.trades.data.length * .2);
      const k = 5;
      const j = 10;

      const reportItems = getTradeReportItems();

      const logisticRegressionOptions = {
        numSteps: 1000,
        learningRate: 5e-3
      };

      const decisionTreeClassifierOptions = {
        gainFunction: 'gini',
        maxDepth: 10,
        minNumSamples: 3
      };

      const randomForestOptions = {
        seed: 3,
        maxFeatures: 0.8,
        replacement: true,
        nEstimators: 25
      };

      //kFoldJTimesAsync(name, Classifier, mlDescription, classifierOptions, k, j, reportItemInfos)

      return loop(
        state,
        Cmd.list([
          Cmd.run(loadPredictionAlgorithmAsync, {
            successActionCreator: buildMlAlgorithmSuccess,
            failActionCreator: buildMlAlgorithmFailed,
            args: ["LogisticRegression", mlDescription, logisticRegressionOptions]
          }),
          // Cmd.run(loadPredictionAlgorithmAsync, {
          //   successActionCreator: buildMlAlgorithmSuccess,
          //   failActionCreator: buildMlAlgorithmFailed,
          //   args: ["SVM", mlDescription, {random}]
          // }),
          Cmd.run(loadPredictionAlgorithmAsync, {
            successActionCreator: buildMlAlgorithmSuccess,
            failActionCreator: buildMlAlgorithmFailed,
            args: ["GaussianNB", mlDescription]
          }),
          Cmd.run(loadPredictionAlgorithmAsync, {
            successActionCreator: buildMlAlgorithmSuccess,
            failActionCreator: buildMlAlgorithmFailed,
            args: ["MultinomialNB", mlDescription]
          }),
          Cmd.run(loadPredictionAlgorithmAsync, {
            successActionCreator: buildMlAlgorithmSuccess,
            failActionCreator: buildMlAlgorithmFailed,
            args: ["DecisionTreeClassifier", mlDescription, decisionTreeClassifierOptions]
          }),
          Cmd.run(loadPredictionAlgorithmAsync, {
            successActionCreator: buildMlAlgorithmSuccess,
            failActionCreator: buildMlAlgorithmFailed,
            args: ["RandomForestClassifier", mlDescription, randomForestOptions]
          }),
          Cmd.run(loadPredictionAlgorithmAsync, {
            successActionCreator: buildMlAlgorithmSuccess,
            failActionCreator: buildMlAlgorithmFailed,
            args: ["FNN", mlDescription]
          }),

          Cmd.run(kFoldJTimesAsync, {
            successActionCreator: generateMlAlgorithmReportSuccess,
            failActionCreator: generateMlAlgorithmReportFailed,
            args: ["LogisticRegression", LogisticRegression, mlDescription, logisticRegressionOptions, k, j, reportItems]
          }),

          // Cmd.run(kFoldJTimesAsync, {
          //   successActionCreator: generateMlAlgorithmReportSuccess,
          //   failActionCreator: generateMlAlgorithmReportFailed,
          //   args: ["SVM", SVM, mlDescription, {random}, k, j, reportItems]
          // }),
          Cmd.run(kFoldJTimesAsync, {
            successActionCreator: generateMlAlgorithmReportSuccess,
            failActionCreator: generateMlAlgorithmReportFailed,
            args: ["GaussianNB", GaussianNB, mlDescription, null, k, j, reportItems]
          }),
          Cmd.run(kFoldJTimesAsync, {
            successActionCreator: generateMlAlgorithmReportSuccess,
            failActionCreator: generateMlAlgorithmReportFailed,
            args: ["MultinomialNB", MultinomialNB, mlDescription, null, k, j, reportItems]
          }),
          Cmd.run(kFoldJTimesAsync, {
            successActionCreator: generateMlAlgorithmReportSuccess,
            failActionCreator: generateMlAlgorithmReportFailed,
            args: ["DecisionTreeClassifier", DecisionTreeClassifier, mlDescription, decisionTreeClassifierOptions, k, j, reportItems]
          }),
          Cmd.run(kFoldJTimesAsync, {
            successActionCreator: generateMlAlgorithmReportSuccess,
            failActionCreator: generateMlAlgorithmReportFailed,
            args: ["RandomForestClassifier", RFClassifier, mlDescription, randomForestOptions, k, j, reportItems]
          }),
          Cmd.run(kFoldJTimesAsync, {
            successActionCreator: generateMlAlgorithmReportSuccess,
            failActionCreator: generateMlAlgorithmReportFailed,
            args: ["FNN", FeedforwardNeuralNetwork, mlDescription, null, k, j, reportItems]
          })
        ])
      );
    }

    case BUILD_ML_ALGORITHM_SUCCESS: {
      const otherAlgorithms = _.filter(state.algorithms, x => x.name != action.algorithm.name);

      newState = Object.assign({}, state, {
        algorithms: [...otherAlgorithms, action.algorithm]
      });

      return newState;
    }

    case BUILD_ML_ALGORITHM_FAILED: {
      return Object.assign({}, state, {error: action.error});
    }

    case GENERATE_ML_ALGORITHM_REPORT_SUCCESS: {
      const otherReports = _.filter(state.performanceReports, x => x.name != action.report.name);

      newState = Object.assign({}, state, {
        performanceReports: [...otherReports, action.report]
      });

      return newState;
    }

    case GENERATE_ML_ALGORITHM_REPORT_FAILED: {
      return Object.assign({}, state, {error: action.error});
    }

    default:
      return state;
  }
}
