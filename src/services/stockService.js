import ServiceBase from './serviceBase';

class StockService extends ServiceBase {
  static getAllStocks(){
    return super.api().get('/stocks');
  }

  static async getResultsWithTotalCount(filters={}){
    const [stocksResponse, countResponse] = await Promise.all([super.api().get('/stocks', { params: { ...filters } }), super.api().get('/stocks/count')]);
    return Promise.resolve({
      results: stocksResponse.data,
      total_count: countResponse.data.count
    });
  }

  // static async getResultsWithTotalCount() {
  //   return new Promise((resolve, reject) => {
  //     super.api().get('/stocks/resultsAndTotal')
  //       .then(function (response) {
  //         resolve(response.data);
  //       })
  //       .catch(function (error) {
  //         reject(error);
  //       });
  //   });
  // }
}

export default StockService;
