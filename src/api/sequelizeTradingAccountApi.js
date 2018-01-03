import axios from 'axios';

class TradingAccountApi {
  static getAllTradingAccounts(){
    return axios.get('http://localhost:3001/api/tradingaccounts');
  }
}

export default TradingAccountApi;
