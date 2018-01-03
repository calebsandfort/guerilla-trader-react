import axios from 'axios';

class TradingAccountApi {
  static getAllTradingAccounts(){
    return axios.get('http://127.0.0.1:3001/api/tradingaccounts');
  }
}

export default TradingAccountApi;
