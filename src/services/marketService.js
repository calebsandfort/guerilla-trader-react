import ServiceBase from './serviceBase';
import axios from 'axios';

class MarketService extends ServiceBase {
  static getAllMarkets(){
    return super.api().get('/markets');
  }

  static async getMarketsWithCount(){
    const [markets, counts] = await Promise.all([super.api().get('/markets'), super.api().get('/markets/count')]);
    console.log(markets, counts);
  }
}

export default MarketService;
