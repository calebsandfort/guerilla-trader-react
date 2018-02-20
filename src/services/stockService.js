import ServiceBase from './serviceBase';

class StockService extends ServiceBase {
  static getAllStocks(){
    return super.api().get('/stocks');
  }

  static async getResultsWithTotalCount(filters={}){
    const response = await super.api().get('/stocks/findAndCountAll', { params: { ...filters } });
    return Promise.resolve({
      results: response.data.rows,
      total_count: response.data.count
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
