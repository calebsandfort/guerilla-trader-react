import _ from 'underscore';
import {TradeTypes, TradeTriggers, TrendTypes} from 'wave-trader-enums';


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

export function getObservationsFromModels(models, mappingFunc){
  const observations = [];
  const labels = [];

  let observation = [];
  let label = null;

  for(let model of models){
    [observation, label] = mappingFunc(model);

    observations.push(observation);

    if(label != null){
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
