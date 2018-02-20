import ServiceBase from './serviceBase';

class TradeSettingsService extends ServiceBase {
  static getAllTradeSettings() {
    return super.api().get('/tradeSettings');
  }

  static async getResultsWithTotalCount(){
    const [tradeSettingsResponse, countResponse] = await Promise.all([super.api().get('/tradeSettings'), super.api().get('/tradeSettings/count')]);
    return Promise.resolve({
      results: tradeSettingsResponse.data,
      total_count: countResponse.data.count
    });
  }

  static getTradeSettings(tradeSettings) {
    return super.api().get(`/tradeSettings/${tradeSettings.Id}`);
  }

  static saveTradeSettings(tradeSettings) {
    if(tradeSettings.Id) {
      return super.api().put(`/tradeSettings/${tradeSettings.Id}`, tradeSettings);
    }
    else {
      return super.api().post('/tradeSettings', tradeSettings);
    }
  }

  static purge(){
    return super.guerillaTraderMvcApi().post('tradeSettings/purge');
  }

  static reconcile(){
    return super.guerillaTraderMvcApi().post('tradeSettings/reconcile');
  }


  // static async getResultsWithTotalCount() {
  //   return new Promise((resolve, reject) => {
  //     super.api().get('/tradeSettings/resultsAndTotal')
  //       .then(function (response) {
  //         resolve(response.data);
  //       })
  //       .catch(function (error) {
  //         reject(error);
  //       });
  //   });
  // }
}

export default TradeSettingsService;
