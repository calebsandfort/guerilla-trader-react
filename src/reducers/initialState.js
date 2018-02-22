export default {
  tradingAccounts: [],
  marketData: {
    timestamp: new Date(),
    markets: []
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
  fuelSavings: {
    newMpg: '',
    tradeMpg: '',
    newPpg: '',
    tradePpg: '',
    milesDriven: '',
    milesDrivenTimeframe: 'week',
    displayResults: false,
    dateModified: null,
    necessaryDataIsProvidedToCalculateSavings: false,
    savings: {
      monthly: 0,
      annual: 0,
      threeYear: 0
    }
  },
  economicIndicators: [
    {
      name: "US 10-YR",
      symbol: "US10Y",
      last_time: "",
      change_pct: 0.0,
      change: 0.0,
      last: 0.0,
      open: 0.0,
      high: 0.0,
      low: 0.0,
      previous_day_closing: 0.0
    }
  ],
  dayTracker: {
    id: 0,
    allTradeSettings: [],
    activeTradeSettings: {
      Uuid: '',
      TickValue: 5.00,
      RewardTicks: 10.0,
      RiskTicks: 24.0,
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
