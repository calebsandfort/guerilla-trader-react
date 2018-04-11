import _ from 'underscore';
import {TradeTypes, TradeTriggers, TrendTypes} from 'wave-trader-enums';
import {MlDescription, MlFeatureTypes} from "./index";


// quickTrade: {
//     TradeType: 1,
//     Trigger: 1,
//     Trend: 1,
//     Streak: 0,
//     EntryDate: '',
//     ATR: 18,
//     SmaDiff: 1,
//     AdjProfitLoss
// }

export function getObservationsFromModels(models, mappingFunc) {
  const observations = [];
  const labels = [];

  let observation = [];
  let label = null;

  for (let model of models) {
    [observation, label] = mappingFunc(model);

    observations.push(observation);

    if (label != null) {
      labels.push(label);
    }
  }

  return [observations, labels];
}

export function getDecisionTreeObservationFromTrade(trade) {
  const observation = [];
  let label = null;

  observation.push(TradeTypes.enumOrdinalOf(trade.TradeType).name);
  observation.push(TradeTriggers.enumOrdinalOf(trade.Trigger).name);
  observation.push(TrendTypes.enumOrdinalOf(trade.Trend).name);
  observation.push(trade.Streak);
  observation.push((new Date(trade.EntryDate)).getHours());
  observation.push(trade.ATR);
  observation.push(trade.SmaDiff);

  if (_.has(trade, "AdjProfitLoss")) {
    label = trade.AdjProfitLoss > 0 ? "win" : "loss";
  }

  return [observation, label];
}

export function getTradeMlDescriptions(trades) {
  let mlDescription = new MlDescription(trades);
  mlDescription.addFeature("TradeType", MlFeatureTypes.MultiBinary);
  mlDescription.addFeature("Trigger", MlFeatureTypes.Nominal);
  mlDescription.addFeature("Trend", MlFeatureTypes.MultiBinary);
  mlDescription.addFeature("Streak", MlFeatureTypes.Numeric);
  mlDescription.addFeature("ATR", MlFeatureTypes.Numeric);
  mlDescription.addFeature("SmaDiff", MlFeatureTypes.Numeric);

  mlDescription.addLabel("AdjProfitLoss", MlFeatureTypes.SingleBinary, function (val) {
    return val > 0;
  });

  mlDescription.fillObservations();

  return mlDescription;
}

export function getTradeReportItems() {
  return [{
    label: "accuracy",
    getData: function (cm) {
      return cm.accuracy;
    },
    formatString: "{0:P0}"
  },
    {
      label: "NPV",
      getData: function (cm) {
        const temp = cm.getNegativePredictiveValue(1);
        return isNaN(temp) ? 0 : temp;
      },
      formatString: "{0:P0}"
    },
    {
      label: "specificity",
      getData: function (cm) {
        const temp = cm.getTrueNegativeRate(1);
        return isNaN(temp) ? 0 : temp;
      },
      formatString: "{0:P0}"
    },
    {
      label: "trueNegativeCount",
      getData: function (cm) {
        return cm.getTrueNegativeCount(1);
      },
      formatString: "{0:N0}"
    },
    {
      label: "falseNegativeCount",
      getData: function (cm) {
        return cm.getFalseNegativeCount(1);
      },
      formatString: "{0:N0}"
    }];
}
