import LogisticRegression from 'ml-logistic-regression';
import SVM from 'ml-svm';
import {GaussianNB, MultinomialNB} from 'ml-naivebayes';
import Matrix from 'ml-matrix';
import {DecisionTreeClassifier} from 'ml-cart';
import {RandomForestClassifier as RFClassifier} from 'ml-random-forest';
import FeedforwardNeuralNetwork from 'ml-fnn';
const crossValidation = require('./crossValidation');

export class PredictionAlgorithm {
  constructor(name, algorithm) {
    this.name = name;
    this.algorithm = algorithm;
  }
}

export default PredictionAlgorithm;

export function loadPredictionAlgorithmAsync(name, mlDescription, options = {}) {
  return new Promise((resolve, reject) => {

    let predictionAlgorithm = null;
    let algorithm = null;
    const [observations, labels] = mlDescription.getObservations();
    try {
      switch (name) {
        case "LogisticRegression": {
          algorithm = new LogisticRegression(options);
          algorithm.train(new Matrix(observations), Matrix.columnVector(labels));
          break;
        }
        case "SVM": {
          algorithm = new SVM(options);
          algorithm.train(observations, labels);
          break;
        }
        case "GaussianNB": {
          algorithm = new GaussianNB();
          algorithm.train(observations, labels);
          break;
        }
        case "MultinomialNB": {
          algorithm = new MultinomialNB();
          algorithm.train(observations, labels);
          break;
        }
        case "DecisionTreeClassifier": {
          algorithm = new DecisionTreeClassifier(options);
          algorithm.train(observations, labels);
          break;
        }
        case "RandomForestClassifier": {
          algorithm = new RFClassifier(options);
          algorithm.train(observations, labels);
          break;
        }
        case "FNN": {
          algorithm = new FeedforwardNeuralNetwork(options);
          algorithm.train(new Matrix(observations), labels);
          break;
        }
      }

      predictionAlgorithm = new PredictionAlgorithm(name, algorithm);
      resolve(predictionAlgorithm);
    }
    catch (error) {
      reject(error);
    }
  });
}

export function kFoldJTimesAsync(name, Classifier, mlDescription, classifierOptions, k, j, reportItemInfos) {
  return new Promise((resolve, reject) => {
    const [observations, labels] = mlDescription.getObservations();
    try {
      const items = crossValidation.kFoldJTimes(Classifier, observations, labels, classifierOptions, k, j, reportItemInfos);
      let report = {name: name};

      for(let item of items){
        report[item.label] = item.val;
      }

      resolve(report);
    }
    catch (error) {
      reject(error);
    }
  });
}
