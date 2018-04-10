let chai = require('chai');
let should = chai.should();
import _ from 'underscore';
import moment from 'moment';
import TradeService from '../services/tradeService';
import cTable from 'console.table';

const crossValidation = require('./crossValidation');
import LogisticRegression from 'ml-logistic-regression';

import {
  getDecisionTreeObservationFromTrade, DecisionTree, entropy, getObservationsFromModels,
  buildTreeAsync, PredictionAlgorithm, loadPredictionAlgorithmAsync, getTradeMlDescriptions,
  MlDescription, MlFeature, MlFeatureTypes
} from './';

const my_data = [['slashdot', 'USA', 'yes', 18],
  ['google', 'France', 'yes', 23],
  ['digg', 'USA', 'yes', 24],
  ['kiwitobes', 'France', 'yes', 23],
  ['google', 'UK', 'no', 21],
  ['(direct)', 'New Zealand', 'no', 12],
  ['(direct)', 'UK', 'no', 21],
  ['google', 'USA', 'no', 24],
  ['slashdot', 'France', 'yes', 19],
  ['digg', 'USA', 'no', 18],
  ['google', 'UK', 'no', 18],
  ['kiwitobes', 'UK', 'no', 19],
  ['digg', 'New Zealand', 'yes'],
  ['slashdot', 'UK', 'no', 21],
  ['google', 'UK', 'yes', 18],
  ['kiwitobes', 'France', 'yes', 19]];

const my_labels = ['None', 'Premium', 'Basic', 'Basic', 'Premium', 'None', 'Basic', 'Premium', 'None', 'None', 'None', 'None', 'Basic', 'None', 'Basic', 'Basic'];

let trades = [];

describe('Prediction Engine', () => {

  // eslint-disable-next-line no-undef
  before("Prediction Engine", function (done) {
    TradeService.findAllForTradingAccount(5).then(response => {
      trades = response.data;
      done();
    });
  });

  describe('Decision Trees', () => {
    // describe('divideSet', () => {
    //   it('it should divide a set properly', () => {
    //     const result = DecisionTree.divideSet(my_data, 2, 'yes');
    //     result.set1.length.should.be.eql(8);
    //     result.set2.length.should.be.eql(8);
    //   });
    // });
    //
    // describe('divideSet', () => {
    //   it('it should count unique results properly', () => {
    //     const result = DecisionTree.uniqueCounts(my_data);
    //     result["None"].should.be.eql(7);
    //     result["Basic"].should.be.eql(6);
    //     result["Premium"].should.be.eql(3);
    //   });
    // });
    //
    // describe('entropy', () => {
    //   it('it should calculate entropy for a set properly', () => {
    //     const result = DecisionTree.entropy(my_data);
    //     result.should.be.eql(1.5052408149441479);
    //   });
    // });


    describe('train', () => {
      it('it should properly train a tree', () => {
        const decisionTree = new DecisionTree({scoref: entropy});
        decisionTree.train(my_data, my_labels);
        decisionTree.tree.col.should.be.eql(0);
        decisionTree.tree.value.should.be.eql('google');
      });
    });

    // describe('buildTreeAsync', () => {
    //   it('it should properly build a tree asynchronously', async () => {
    //     const decisionTree = await loadPredictionAlgorithmAsync("DecisionTree", my_data, my_labels, {scoref: entropy});
    //     decisionTree.algorithm.tree.col.should.be.eql(0);
    //     decisionTree.algorithm.tree.value.should.be.eql('google');
    //   });
    // });

    describe('predict', () => {
      it('it should properly predict a label given an observation', () => {
        const decisionTree = new DecisionTree({scoref: entropy});
        decisionTree.train(my_data, my_labels);
        const classification = decisionTree.predict(['(direct)', 'USA', 'yes', 5]);

        classification.should.be.eql('Basic');
      });
    });

    describe('crossValidate', () => {
      it('it should properly cross validate a decision tree', async () => {
        const [observations, labels] = getObservationsFromModels(trades, getDecisionTreeObservationFromTrade);

        const confusionMatrix = crossValidation.kFold(DecisionTree, observations, labels, {scoref: entropy}, 10);

        //console.log("accuracy", confusionMatrix.accuracy);
        // console.log("PPV", confusionMatrix.getPositivePredictiveValue("win"));
        // console.log("sensitivity", confusionMatrix.getTruePositiveRate("win"));
        // //What I care about
        // console.log("NPV", confusionMatrix.getNegativePredictiveValue("win"));
        // console.log("specificity", confusionMatrix.getTrueNegativeRate("win"));

        // const decisionTree = await loadPredictionAlgorithmAsync("DecisionTree", observations, labels, {scoref: entropy});
        // decisionTree.algorithm.tree.col.should.be.eql(0);
        // decisionTree.algorithm.tree.value.should.be.eql('google');
      });
    });

    describe('getDecisionTreeObservationFromTrade', () => {
      it('it should properly create an observation from a trade', () => {
        const trade = {
          TradeType: 1,
          Trigger: 1,
          Trend: 1,
          Streak: 0,
          EntryDate: moment().format("M/D/YYYY h:mm:ss a"),
          ATR: 18,
          SmaDiff: 1,
          AdjProfitLoss: 100
        };

        let expected_observation = ["Long", "Signals", "Bearish", 0, (new Date(trade.EntryDate)).getHours(), 18, 1];
        let expected_label = "win";

        const [actual_observation, actual_label] = getDecisionTreeObservationFromTrade(trade);

        actual_observation.should.be.eql(expected_observation);
        actual_label.should.be.eql(expected_label);
      });
    });
  });

  describe('ML Classes', () => {
    describe('ML Feature Factor', () => {
      it('it should properly create a feature with a factor', () => {
        const values = ["a", "a", "a", "a", "a", "a", "b", "b", "b", "b", "b", "c", "c", "c", "c",];
        const feature = new MlFeature("test", MlFeatureTypes.Nominal, null, values);

        const expected = {
          a: 3.5,
          b: 3,
          c: 2.5
        };

        feature.factor.should.be.eql(expected);
      });
    });

    describe('ML Description', () => {
      it('it should properly create a ML Description', () => {
        let mlDescription = getTradeMlDescriptions(trades);

        const [observations, labels] = mlDescription.getObservations();

        mlDescription.features.length.should.be.eql(6);

        //const confusionMatrix = crossValidation.kFold(LogisticRegression, observations, labels, {numSteps: 1000, learningRate: 5e-3}, 10);
        const report = crossValidation.kFoldJTimes(LogisticRegression, observations, labels, {
            numSteps: 1000,
            learningRate: 5e-3
          }, Math.floor(trades.length * .2), 1,
          [{
            label: "accuracy", getData: function (cm) {
              return cm.accuracy;
            }
          },
          {
            label: "NPV", getData: function (cm) {
              return cm.getNegativePredictiveValue(1);
            }
          },
          {
            label: "specificity", getData: function (cm) {
              return cm.getTrueNegativeRate(1);
            }
          }]);

        //console.table(report);

      });
    });
  });
});
