import {EconomicIndicator} from '../entities';

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
    r: 0.0,
    pl: 0.0,
    rChartItems: [],
    plChartItems: [],
    maxTrades: 10
  }
};
