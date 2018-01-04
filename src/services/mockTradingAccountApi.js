import delay from './delay';
import _ from 'underscore';

const tradingAccounts = [
  {
    Id: 1,
    Name: "paperMoney Margin",
    InitialCapital: 8000.0000000,
    CurrentCapital: 8110.0000000,
    Commissions: 13.7600000,
    ProfitLoss: 110.0000000,
    Active: false,
    TotalReturn: 0.0120300,
    CAGR: 77.6296113,
    InceptionDate: "2017-11-29T00:00:00"
  },
  {
    "Id": 2,
    Name: "TD Ameritrade",
    InitialCapital: 24781.5100000,
    CurrentCapital: 24406.6700000,
    Commissions: 47.2700000,
    ProfitLoss: -327.5700000,
    Active: false,
    TotalReturn: -0.0151257,
    CAGR: -0.1801894,
    "InceptionDate": "2017-11-16T00:00:00"
  },
  {
    Id: 3,
    Name: "paperMoney IRA",
    InitialCapital: 50000.0000000,
    CurrentCapital: 51571.9330000,
    Commissions: 243.3500000,
    ProfitLoss: 1571.9330000,
    Active: false,
    TotalReturn: 0.0265716,
    CAGR: 0.7019590,
    InceptionDate: "2017-11-12T00:00:00"
  },
  {
    Id: 4,
    Name: "Aggressive Discipline",
    InitialCapital: 11000.0000000,
    CurrentCapital: 11000.0000000,
    Commissions: 0.0000000,
    ProfitLoss: 0.0000000,
    Active: true,
    TotalReturn: 0.0000000,
    CAGR: 0.0000000,
    InceptionDate: "2017-12-17T00:00:00"
  },
];

const generateId = () => {
  return _.max(tradingAccounts, function(tradingAccount){
    return tradingAccount.Id;
  }).Id + 1;
};

class TradingAccountApi {
  static getAllTradingAccounts(){
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign([], tradingAccounts));
      }, delay);
    });
  }

  static saveTradingAccount(tradingAccount) {
    tradingAccount = Object.assign({}, tradingAccount); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minTradingAccountNameLength= 1;
        if (tradingAccount.Name.length < minTradingAccountNameLength) {
          reject(`Name must be at least ${minTradingAccountNameLength} characters.`);
        }

        if (tradingAccount.Id) {
          const existingTradingAccountIndex = tradingAccounts.findIndex(a => a.Id == tradingAccount.Id);
          tradingAccounts.splice(existingTradingAccountIndex, 1, tradingAccount);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new tradingAccounts in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          tradingAccount.Id = generateId(tradingAccount);
          tradingAccounts.push(tradingAccount);
        }

        resolve(tradingAccount);
      }, delay);
    });
  }
}

export default TradingAccountApi;
