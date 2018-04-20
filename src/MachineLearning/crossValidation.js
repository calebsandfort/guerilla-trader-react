/* eslint-disable */
'use strict';

import FeedforwardNeuralNetwork from "ml-fnn";

const ConfusionMatrix = require('ml-confusion-matrix');

const CV = {};
const combinations = require('ml-combinations');
import Matrix from 'ml-matrix';
import _ from 'underscore';
import cTable from 'console.table';
import numeral from 'numeral';

/**
 * Performs a leave-one-out cross-validation (LOO-CV) of the given samples. In LOO-CV, 1 observation is used as the
 * validation set while the rest is used as the training set. This is repeated once for each observation. LOO-CV is a
 * special case of LPO-CV. @see leavePout
 * @param {function} Classifier - The classifier's constructor to use for the cross validation. Expect ml-classifier
 *     api.
 * @param {Array} features - The features for all samples of the data-set
 * @param {Array} labels - The classification class of all samples of the data-set
 * @param {object} classifierOptions - The classifier options with which the classifier should be instantiated.
 * @return {ConfusionMatrix} - The cross-validation confusion matrix
 */
CV.leaveOneOut = function (Classifier, features, labels, classifierOptions) {
  if (typeof labels === 'function') {
    var callback = labels;
    labels = features;
    features = Classifier;
    return CV.leavePOut(features, labels, 1, callback);
  }
  return CV.leavePOut(Classifier, features, labels, classifierOptions, 1);
};


/**
 * Performs a leave-p-out cross-validation (LPO-CV) of the given samples. In LPO-CV, p observations are used as the
 * validation set while the rest is used as the training set. This is repeated as many times as there are possible
 * ways to combine p observations from the set (unordered without replacement). Be aware that for relatively small
 * data-set size this can require a very large number of training and testing to do!
 * @param {function} Classifier - The classifier's constructor to use for the cross validation. Expect ml-classifier
 *     api.
 * @param {Array} features - The features for all samples of the data-set
 * @param {Array} labels - The classification class of all samples of the data-set
 * @param {object} classifierOptions - The classifier options with which the classifier should be instantiated.
 * @param {number} p - The size of the validation sub-samples' set
 * @return {ConfusionMatrix} - The cross-validation confusion matrix
 */
CV.leavePOut = function (Classifier, features, labels, classifierOptions, p) {
  if (typeof classifierOptions === 'function') {
    var callback = classifierOptions;
    p = labels;
    labels = features;
    features = Classifier;
  }
  check(features, labels);
  const distinct = getDistinct(labels);
  const confusionMatrix = initMatrix(distinct.length, distinct.length);

  var N = features.length;
  var gen = combinations(p, N);
  var allIdx = new Array(N);
  for (let i = 0; i < N; i++) {
    allIdx[i] = i;
  }
  for (const testIdx of gen) {
    var trainIdx = allIdx.slice();

    for (let i = testIdx.length - 1; i >= 0; i--) {
      trainIdx.splice(testIdx[i], 1);
    }

    if (callback) {
      validateWithCallback(features, labels, testIdx, trainIdx, confusionMatrix, distinct, callback);
    } else {
      validate(Classifier, features, labels, classifierOptions, testIdx, trainIdx, confusionMatrix, distinct);
    }

  }

  return new ConfusionMatrix(confusionMatrix, distinct);
};

CV.kFoldJTimes = function (Classifier, features, labels, classifierOptions, k, j, reportItemInfos) {
  let report = reportItemInfos.map(x => {
    return {
      label: x.label,
      getData: x.getData,
      data: [],
      average: 0
    }
  });

  for(let i = 0; i < j; i++){
    const confusionMatrix = this.kFold(Classifier, features, labels, classifierOptions, k);

    for(let rii of report){
      rii.data.push(rii.getData(confusionMatrix));
      rii.average = rii.data.reduce((total, score) => total + score) / rii.data.length;
    }
  }

  return report.map(x => {return {"label": x.label, "val": Number.parseFloat(Number.parseFloat(x.average).toFixed(2))}});
}

/**
 * Performs k-fold cross-validation (KF-CV). KF-CV separates the data-set into k random equally sized partitions, and
 * uses each as a validation set, with all other partitions used in the training set. Observations left over from if k
 * does not divide the number of observations are left out of the cross-validation process.
 * @param {function} Classifier - The classifier's to use for the cross validation. Expect ml-classifier api.
 * @param {Array} features - The features for all samples of the data-set
 * @param {Array} labels - The classification class of all samples of the data-set
 * @param {object} classifierOptions - The classifier options with which the classifier should be instantiated.
 * @param {number} k - The number of partitions to create
 * @return {ConfusionMatrix} - The cross-validation confusion matrix
 */
CV.kFold = function (Classifier, features, labels, classifierOptions, k, log = false) {
  if (typeof classifierOptions === 'function') {
    var callback = classifierOptions;
    k = labels;
    labels = features;
    features = Classifier;
  }

  check(features, labels);
  const distinct = getDistinct(labels);

  if(log){
    logPTable("Master:", distinct, labels);
  }

  const confusionMatrix = initMatrix(distinct.length, distinct.length);
  var N = features.length;
  var allIdx = new Array(N);
  for (var i = 0; i < N; i++) {
    allIdx[i] = i;
  }

  var l = Math.floor(N / k);
  // create random k-folds
  var current = [];
  var folds = [];
  while (allIdx.length) {
    var randi = Math.floor(Math.random() * allIdx.length);
    current.push(allIdx[randi]);
    allIdx.splice(randi, 1);
    if (current.length === l) {
      folds.push(current);
      current = [];
    }
  }
  if (current.length) folds.push(current);
  folds = folds.slice(0, k);

  for (i = 0; i < folds.length; i++) {
    var testIdx = folds[i];
    var trainIdx = [];
    for (var j = 0; j < folds.length; j++) {
      if (j !== i) trainIdx = trainIdx.concat(folds[j]);
    }

    if (callback) {
      validateWithCallback(features, labels, testIdx, trainIdx, confusionMatrix, distinct, callback);
    }
    else if(Classifier.name == "LogisticRegression") {
      //classifierOptions.log("yaosdjfals;dkladsf");
      validateLogisticRegression(Classifier, features, labels, classifierOptions, testIdx, trainIdx, confusionMatrix, distinct);
    }
    else if(Classifier.name == "FeedforwardNeuralNetwork") {
      //classifierOptions.log("yaosdjfals;dkladsf");
      validateFnn(Classifier, features, labels, classifierOptions, testIdx, trainIdx, confusionMatrix, distinct);
    }
    else {
      validate(Classifier, features, labels, classifierOptions, testIdx, trainIdx, confusionMatrix, distinct, log);
    }
  }

  return new ConfusionMatrix(confusionMatrix, distinct);
};

CV.sandbox = function (Classifier, features, labels, classifierOptions, k) {
  if (typeof classifierOptions === 'function') {
    var callback = classifierOptions;
    k = labels;
    labels = features;
    features = Classifier;
  }

  return (Classifier.name == "LogisticRegression");
}

function check(features, labels) {
  if (features.length !== labels.length) {
    throw new Error('features and labels should have the same length');
  }
}

function initMatrix(rows, columns) {
  return new Array(rows).fill(0).map(() => new Array(columns).fill(0));
}

function getDistinct(arr) {
  var s = new Set();
  for (let i = 0; i < arr.length; i++) {
    s.add(arr[i]);
  }
  return Array.from(s);
}

function logPTable(name, distinct, labels){
  console.log(name);
  console.table(distinct.map(x => {
    return {
      label: x,
      p: numeral(_.filter(labels, y => y == x).length / labels.length).format('0%')
    };
  }));
}

function validate(Classifier, features, labels, classifierOptions, testIdx, trainIdx, confusionMatrix, distinct, log = false) {
  const {testFeatures, trainFeatures, testLabels, trainLabels} = getTrainTest(features, labels, testIdx, trainIdx);

  if(log){
    logPTable("train:", distinct, trainLabels);
    logPTable("test:", distinct, testLabels);
  }

  var classifier;
  if (Classifier.prototype.train) {
    classifier = new Classifier(classifierOptions);
    classifier.train(trainFeatures, trainLabels);
  } else {
    classifier = new Classifier(trainFeatures, trainLabels, classifierOptions);
  }

  var predictedLabels = classifier.predict(testFeatures);
  updateConfusionMatrix(confusionMatrix, testLabels, predictedLabels, distinct);
}

function validateLogisticRegression(Classifier, features, labels, classifierOptions, testIdx, trainIdx, confusionMatrix, distinct) {
  const {testFeatures, trainFeatures, testLabels, trainLabels} = getTrainTest(features, labels, testIdx, trainIdx);

  var classifier;
  if (Classifier.prototype.train) {
    classifier = new Classifier(classifierOptions);
    classifier.train(new Matrix(trainFeatures), Matrix.columnVector(trainLabels));
  } else {
    classifier = new Classifier(new Matrix(trainFeatures), Matrix.columnVector(trainLabels), classifierOptions);
  }

  var predictedLabels = classifier.predict(new Matrix(testFeatures));
  updateConfusionMatrix(confusionMatrix, testLabels, predictedLabels, distinct);
}

function validateFnn(Classifier, features, labels, classifierOptions, testIdx, trainIdx, confusionMatrix, distinct) {
  const {testFeatures, trainFeatures, testLabels, trainLabels} = getTrainTest(features, labels, testIdx, trainIdx);

  var classifier;
  if (Classifier.prototype.train) {
    classifier = new Classifier(classifierOptions);
    classifier.train(new Matrix(trainFeatures), Matrix.columnVector(trainLabels));
  } else {
    classifier = new Classifier(new Matrix(trainFeatures), trainLabels, classifierOptions);
  }

  var predictedLabels = classifier.predict(new Matrix(testFeatures));
  updateConfusionMatrix(confusionMatrix, testLabels, predictedLabels, distinct);
}

function validateWithCallback(features, labels, testIdx, trainIdx, confusionMatrix, distinct, callback) {
  const {testFeatures, trainFeatures, testLabels, trainLabels} = getTrainTest(features, labels, testIdx, trainIdx);
  const predictedLabels = callback(trainFeatures, trainLabels, testFeatures);
  updateConfusionMatrix(confusionMatrix, testLabels, predictedLabels, distinct);
}

function updateConfusionMatrix(confusionMatrix, testLabels, predictedLabels, distinct) {

  for (var i = 0; i < predictedLabels.length; i++) {
    const actualIdx = distinct.indexOf(testLabels[i]);
    const predictedIdx = distinct.indexOf(predictedLabels[i]);
    if (actualIdx < 0 || predictedIdx < 0) {
      // eslint-disable-next-line no-console
      console.warn(`ignore unknown predicted label ${predictedLabels[i]}`);
    }
    confusionMatrix[actualIdx][predictedIdx]++;
  }
}


function getTrainTest(features, labels, testIdx, trainIdx) {
  return {
    testFeatures: testIdx.map(function (index) {
      return features[index];
    }),
    trainFeatures: trainIdx.map(function (index) {
      return features[index];
    }),
    testLabels: testIdx.map(function (index) {
      return labels[index];
    }),
    trainLabels: trainIdx.map(function (index) {
      return labels[index];
    })
  };
}

module.exports = CV;
