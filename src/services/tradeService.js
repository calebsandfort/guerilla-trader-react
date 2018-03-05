import ServiceBase from './serviceBase';
import moment from 'moment';

class TradeService extends ServiceBase {

  static saveTrade(trade) {
    if(trade.Id) {
      return super.api().put(`/trades/${trade.Id}`, trade);
    }
    else {
      return super.api().post('/trades', trade);
    }
  }
  
  static pasteTrades(pastedTradesDto, tradingAccount){
    const payload = Object.assign({}, pastedTradesDto, {
      ExitCommissions: 0,
      ExitReason: 0,
      TradingAccountId: tradingAccount.Id
    });

    return super.guerillaTraderMvcApi().post('trade/addTradeFromPaste', payload);
  }
}

export default TradeService;
