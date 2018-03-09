import {
  ADD_WIN_TO_DAY_TRACKER,
  ADD_LOSS_TO_DAY_TRACKER,
  LOAD_TRADE_SETTINGS_SUCCESS,
  LOAD_MARKETS_SUCCESS,
  LOAD_TRADING_ACCOUNTS_SUCCESS,
  STREAMING_DATA_RECEIVED,
  CREATE_TRADE_SUCCESS
} from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';
import _ from 'underscore';
import {EconomicIndicator} from '../entities';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function dayTrackerReducer(state = initialState.dayTracker, action) {
  let newState;

  switch (action.type) {
    case ADD_WIN_TO_DAY_TRACKER:
      newState = objectAssign({}, state, {
        id: state.id + 1,
        winningTrades: state.winningTrades + 1,
        totalTrades: state.totalTrades + 1
      });

      reconcileR(newState);
      reconcilePL(newState);
      reconcileWinRate(newState);

      return newState;

    case ADD_LOSS_TO_DAY_TRACKER:
      newState = objectAssign({}, state, {
        id: state.id + 1,
        losingTrades: state.losingTrades + 1,
        totalTrades: state.totalTrades + 1
      });

      reconcileR(newState);
      reconcilePL(newState);
      reconcileWinRate(newState);

      return newState;

    case CREATE_TRADE_SUCCESS:
    {
      let streak = state.quickTrade.Streak;

      if(streak == 0 && action.trade.AdjProfitLoss > 0){
        streak = 1;
      }
      else if(streak == 0 && action.trade.AdjProfitLoss < 0){
        streak = -1;
      }
      else if(streak > 0 && action.trade.AdjProfitLoss > 0){
        streak += 1;
      }
      else if(streak > 0 && action.trade.AdjProfitLoss < 0){
        streak = -1;
      }
      else if(streak < 0 && action.trade.AdjProfitLoss > 0){
        streak = 1;
      }
      else if(streak < 0 && action.trade.AdjProfitLoss < 0){
        streak -= 1;
      }

      const newQuickTrade = Object.assign({}, state.quickTrade, {
        Streak: streak
      });

      newState = objectAssign({}, state, {
        id: state.id + 1,
        quickTrade: newQuickTrade
      });
      addTrade(newState, action.trade.AdjProfitLoss);
      return newState;
    }

    case LOAD_TRADE_SETTINGS_SUCCESS:
    {
      if (action.tradeSettings.length > 0) {
        newState = Object.assign({}, state, {
          activeTradeSettings: Object.assign({}, action.tradeSettings[0]),
          allTradeSettings: [...action.tradeSettings]
        });

        newState = Object.assign(newState, {
          quickTrade: {
            Size: newState.activeTradeSettings.Contracts,
            RewardTicks: newState.activeTradeSettings.RewardTicks,
            RiskTicks: newState.activeTradeSettings.RiskTicks,
            RoundTripCommissions: newState.activeTradeSettings.RoundTripCommissions
          }
        });

        return newState;
      }
      else {
        return state;
      }
    }

    case LOAD_MARKETS_SUCCESS:
    {
      const m = _.find(action.marketData.markets, function (x) {
        return x.Symbol == state.quickTrade.Market.Symbol;
      });

      const newQuickTrade = Object.assign({}, state.quickTrade, {
        Market: m
      });

      newState = Object.assign({}, state, {
        quickTrade: newQuickTrade
      });

      return newState;
    }

    case STREAMING_DATA_RECEIVED:
    {
      const streamingMarket = EconomicIndicator.assignFromStreamingQuote({
        symbol: state.quickTrade.Market.CnbcSymbol,
        last: state.quickTrade.Last
      }, action.quotes.quotes);

      const newQuickTrade = Object.assign({}, state.quickTrade, {
        Last: streamingMarket.last
      });

      newState = Object.assign({}, state, {
        quickTrade: newQuickTrade
      });

      return newState;
    }

    case LOAD_TRADING_ACCOUNTS_SUCCESS:
    {
      const tradingAccount = _.find(action.tradingAccounts, function (x) {
        return x.Active;
      });

      const newQuickTrade = Object.assign({}, state.quickTrade, {
        TradingAccountId: tradingAccount.Id
      });

      newState = Object.assign({}, state, {
        quickTrade: newQuickTrade
      });

      return newState;
    }

    default:
      return state;
  }
}

function addTrade(newState, adjProfitLoss){
  if(adjProfitLoss > 0){
    newState.totalReward += adjProfitLoss;
    newState.winningTrades += 1;
  }
  else{
    newState.totalRisk += Math.abs(adjProfitLoss);
    newState.losingTrades += 1;
  }

  newState.totalTrades += 1;

  newState.r = (newState.totalRisk == 0) ? newState.totalTrades : (newState.totalReward / newState.totalRisk);
  newState.pl += adjProfitLoss;
  newState.winRate = newState.winningTrades / newState.totalTrades;

  newState.rChartItems = [...newState.rChartItems, {
    tradeNumber: newState.id,
    r: newState.r
  }];

  newState.plChartItems = [...newState.plChartItems, {
    tradeNumber: newState.id,
    pl: newState.pl
  }];

  newState.winRateChartItems = [...newState.winRateChartItems, {
    tradeNumber: newState.id,
    winRate: newState.winRate
  }];
}

function reconcileR(dayTracker) {
  const totalReward = (dayTracker.winningTrades * dayTracker.activeTradeSettings.Reward)
    - (dayTracker.winningTrades * dayTracker.activeTradeSettings.TotalCommissions);

  const totalRisk = (dayTracker.losingTrades * dayTracker.activeTradeSettings.Risk)
    - (dayTracker.losingTrades * dayTracker.activeTradeSettings.TotalCommissions);

  if (totalRisk == 0) {
    dayTracker.r = totalReward / ((dayTracker.winningTrades * dayTracker.activeTradeSettings.Reward) / dayTracker.winningTrades);
  }
  else {
    dayTracker.r = totalReward / totalRisk;
  }

  const newRChartItem = {
    tradeNumber: dayTracker.id.toString(),
    r: dayTracker.r
  };

  dayTracker.rChartItems = [...dayTracker.rChartItems];
  dayTracker.rChartItems.push(newRChartItem);
}

function reconcilePL(dayTracker) {
  dayTracker.pl = (dayTracker.winningTrades * dayTracker.activeTradeSettings.Reward)
    - (dayTracker.losingTrades * dayTracker.activeTradeSettings.Risk)
    - (dayTracker.totalTrades * dayTracker.activeTradeSettings.TotalCommissions);

  const newPlChartItem = {
    tradeNumber: dayTracker.id.toString(),
    pl: dayTracker.pl
  };

  dayTracker.plChartItems = [...dayTracker.plChartItems];
  dayTracker.plChartItems.push(newPlChartItem);
}

function reconcileWinRate(dayTracker) {
  dayTracker.winRate = dayTracker.winningTrades / dayTracker.totalTrades;

  const newWinRateChartItem = {
    tradeNumber: dayTracker.id.toString(),
    winRate: dayTracker.winRate
  };

  dayTracker.winRateChartItems = [...dayTracker.winRateChartItems];
  dayTracker.winRateChartItems.push(newWinRateChartItem);
}
