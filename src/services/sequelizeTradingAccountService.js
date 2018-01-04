import axios from 'axios';

const apiBaseUrl = process.env.NODE_ENV === 'production' ? "http://ec2-34-214-87-86.us-west-2.compute.amazonaws.com/api/" : "http://localhost:3000/api/";

class TradingAccountService {
  static getAllTradingAccounts(){
    return axios.get(`${apiBaseUrl}tradingaccounts`);
  }
}

export default TradingAccountService;
