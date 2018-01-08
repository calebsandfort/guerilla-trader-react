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
