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
  dayTracker: {
    id: 0,
    tradeSettings: {
      tickValue: 5.00,
      rewardTicks: 10.0,
      riskTicks: 24.0,
      roundTripCommissions: 6.88,
      contracts: 1,
      get reward(){
        return this.tickValue * this.rewardTicks;
      },
      get risk(){
        return this.tickValue * this.riskTicks;
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
