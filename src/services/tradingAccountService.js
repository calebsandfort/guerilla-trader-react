import axios from 'axios';
import * as envProperties from '../constants/envProperties';

class TradingAccountService {
  static getAllTradingAccounts(){
    return axios.get(`${envProperties.API_BASE_URL}tradingaccounts`);
  }
}

export default TradingAccountService;
