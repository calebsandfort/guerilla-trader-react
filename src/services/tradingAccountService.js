import ServiceBase from './serviceBase';

class TradingAccountService extends ServiceBase {
  static getAllTradingAccounts(){
    return super.api().get('/tradingaccounts');
  }
}

export default TradingAccountService;
