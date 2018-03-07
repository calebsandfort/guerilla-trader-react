import {EconomicIndicator} from '../entities';
import moment from 'moment';

export default {
  tradingAccounts: [],
  marketData: {
    timestamp: new Date(),
    markets: [],
    economicIndicators: [
      new EconomicIndicator("US10Y"),
      new EconomicIndicator("=USD"),
      new EconomicIndicator(".VIX"),
      new EconomicIndicator(".FTFCNBCA")
    ]
  },
  streamingData:{
    markets: [],
    economicIndicators: [
      new EconomicIndicator("US10Y"),
      new EconomicIndicator("=USD"),
      new EconomicIndicator(".VIX"),
      new EconomicIndicator(".FTFCNBCA")
    ]
  },
  // markets: [],
  activeTradingAccount: {
    Id: 0,
    Name: '',
    InitialCapital: 0.0,
    CurrentCapital: 0.0,
    Commissions: 0.0,
    Active: true,
    InceptionDate: '',
    Snapshots: [],
    PerformanceCycles: [],
    Trades: [],
    AllPerformanceCycle: {
      R: 0.0,
      MaxDrawdown: 0.0
    }
  },
  currentDate: new Date(),
  dayTracker: {
    id: 0,
    allTradeSettings: [],
    activeTradeSettings: {
      Uuid: '',
      TickValue: 5.00,
      RewardTicks: 12.0,
      RiskTicks: 23.0,
      RoundTripCommissions: 6.88,
      Contracts: 3,
      get Reward(){
        return this.TickValue * this.RewardTicks * this.Contracts;
      },
      get Risk(){
        return this.TickValue * this.RiskTicks * this.Contracts;
      },
      get TotalCommissions(){
        return this.RoundTripCommissions * this.Contracts;
      }
    },
    riskMultiple: 2.0,
    winningTrades: 0,
    losingTrades: 0,
    totalTrades: 0,
    totalReward: 0,
    totalRisk: 0,
    r: 0.0,
    pl: 0.0,
    winRate: 0.0,
    rChartItems: [],
    plChartItems: [],
    winRateChartItems: [],
    maxTrades: 10,
    quickTrade: {
      Market: {
        TickValue: 5.00,
        TickSize: .25,
        CnbcSymbol: '@ND.1',
        Symbol: 'NQ'
      },
      Last: 0,
      TradingAccountId: 0,
      TradeType: 1,
      Trigger: 1,
      Trend: 1,
      EntryDate: '',
      BracketGood: true,
      Size: 3,
      ATR: 18,
      SmaDiff: 1,
      EntryPrice: 0,
      RewardTicks: 12.0,
      RiskTicks: 23.0,
      RoundTripCommissions: 6.88,
      get Reward(){
        return this.Market.TickValue * this.RewardTicks * this.Size;
      },
      get Risk(){
        return this.Market.TickValue * this.RiskTicks * this.Size;
      }
    }
  }
};
