import ServiceBase from './serviceBase';
import axios from 'axios';

class MarketService extends ServiceBase {
  static getAllMarkets(){
    return super.api().get('/markets');
  }

  static async getResultsWithTotalCount(){
    const [marketsResponse, countResponse] = await Promise.all([super.api().get('/markets'), super.api().get('/markets/count')]);
    return Promise.resolve({
      results: marketsResponse.data,
      total_count: countResponse.data.count
    });
  }

  // static async getResultsWithTotalCount(){
  //   return new Promise((resolve, reject) => {
  //     super.api().get('/markets/resultsAndTotal')
  //       .then(function(response){
  //         resolve(response.data);
  //       })
  //       .catch(function (error) {
  //         reject(error);
  //       });
  //   });
  // }
}

export default MarketService;
