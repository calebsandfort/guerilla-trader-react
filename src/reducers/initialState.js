export default {
  tradingAccounts: [],
  markets: [],
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
    Trades: []
  },
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
  }
};
