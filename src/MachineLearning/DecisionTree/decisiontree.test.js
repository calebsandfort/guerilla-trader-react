let chai = require('chai');
let should = chai.should();
import _ from 'underscore';
import moment from 'moment';
import {getDecisionTreeObservationFromTrade} from '../utilities';

import {DecisionTree} from '../DecisionTree';

const my_data = [['slashdot', 'USA', 'yes', 18, 'None'],
  ['google', 'France', 'yes', 23, 'Premium'],
  ['digg', 'USA', 'yes', 24, 'Basic'],
  ['kiwitobes', 'France', 'yes', 23, 'Basic'],
  ['google', 'UK', 'no', 21, 'Premium'],
  ['(direct)', 'New Zealand', 'no', 12, 'None'],
  ['(direct)', 'UK', 'no', 21, 'Basic'],
  ['google', 'USA', 'no', 24, 'Premium'],
  ['slashdot', 'France', 'yes', 19, 'None'],
  ['digg', 'USA', 'no', 18, 'None'],
  ['google', 'UK', 'no', 18, 'None'],
  ['kiwitobes', 'UK', 'no', 19, 'None'],
  ['digg', 'New Zealand', 'yes', 12, 'Basic'],
  ['slashdot', 'UK', 'no', 21, 'None'],
  ['google', 'UK', 'yes', 18, 'Basic'],
  ['kiwitobes', 'France', 'yes', 19, 'Basic']];

describe('Decision Trees', () => {
  describe('divideSet', () => {
    it('it should divide a set properly', () => {
      const result = DecisionTree.divideSet(my_data, 2, 'yes');
      result.set1.length.should.be.eql(8);
      result.set2.length.should.be.eql(8);
    });
  });

  describe('divideSet', () => {
    it('it should count unique results properly', () => {
      const result = DecisionTree.uniqueCounts(my_data);
      result["None"].should.be.eql(7);
      result["Basic"].should.be.eql(6);
      result["Premium"].should.be.eql(3);
    });
  });

  describe('entropy', () => {
    it('it should calculate entropy for a set properly', () => {
      const result = DecisionTree.entropy(my_data);
      result.should.be.eql(1.5052408149441479);
    });
  });

  describe('buildTree', () => {
    it('it should properly build a tree', () => {
      const result = DecisionTree.buildTree(my_data, DecisionTree.entropy);
      result.col.should.be.eql(0);
      result.value.should.be.eql('google');
    });
  });

  describe('buildTreeAsync', () => {
    it('it should properly build a tree asynchronously', async() => {
      const result = await DecisionTree.buildTreeAsync(my_data, DecisionTree.entropy);
      result.col.should.be.eql(0);
      result.value.should.be.eql('google');
    });
  });

  describe('classify', () => {
    it('it should properly classify an observation', () => {
      const tree = DecisionTree.buildTree(my_data, DecisionTree.entropy);
      const classification = DecisionTree.classify(['(direct)', 'USA', 'yes', 5], tree);

      classification.should.have.property('Basic');
      classification.Basic.should.be.eql(4);
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

      let expected = ["Long", "Signals", "Bearish", 0, (new Date(trade.EntryDate)).getHours(), 18, 1, "win"];
      
      const actual = getDecisionTreeObservationFromTrade(trade);

      actual.should.be.eql(expected);
    });
  });
});
