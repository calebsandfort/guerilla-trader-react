import ServiceBase from './serviceBase';

class TradingAccountService extends ServiceBase {
  static getAllTradingAccounts() {
    return super.api().get('/tradingaccounts');
  }

  static async getResultsWithTotalCount(){
    const [tradingAccountsResponse, countResponse] = await Promise.all([super.api().get('/tradingAccounts'), super.api().get('/tradingAccounts/count')]);
    return Promise.resolve({
      results: tradingAccountsResponse.data,
      total_count: countResponse.data.count
    });
  }

  static getTradingAccount(tradingAccount) {
    return super.api().get(`/tradingaccounts/${tradingAccount.Id}`);
  }

  static saveTradingAccount(tradingAccount) {
    if(tradingAccount.Id) {
      return super.api().put(`/tradingaccounts/${tradingAccount.Id}`, tradingAccount);
    }
    else {
      return super.api().post('/tradingaccounts', tradingAccount);
    }
  }

  static purge(){
    return super.guerillaTraderMvcApi().post('tradingAccount/purge');
  }

  static reconcile(){
    return super.guerillaTraderMvcApi().post('tradingAccount/reconcile');
  }


  // static async getResultsWithTotalCount() {
  //   return new Promise((resolve, reject) => {
  //     super.api().get('/tradingaccounts/resultsAndTotal')
  //       .then(function (response) {
  //         resolve(response.data);
  //       })
  //       .catch(function (error) {
  //         reject(error);
  //       });
  //   });
  // }
}

export default TradingAccountService;
