import axios from 'axios';
import * as envProperties from '../constants/envProperties';

class MarketService {
  static getAllMarkets(){
    return axios.get(`${envProperties.API_BASE_URL}markets`);
  }
}

export default MarketService;
