import ServiceBase from './serviceBase';
import moment from 'moment';

class TradeService extends ServiceBase {

  static pasteTrades(pastedTradesDto, tradingAccount){
    // Date
    //   :
    //   "2/8/2018"
    // ExitCommissions
    //   :
    //   "0"
    // ExitReason
    //   :
    //   "0"
    // ExitReason_input
    //   :
    //   "None"
    // Trades
    //   :
    //   "2/8/18	09:24:26	TRD	739040770	SOLD -1 /NQH8 @6454.00	-1.19	-2.25		10996.56
    // TradingAccountId
    //   :
    //   "5"
    // TradingAccountId_input
    //   :
    //   "Tick Heiken Ashi"


    const payload = Object.assign({}, pastedTradesDto, {
      ExitCommissions: 0,
      ExitReason: 0,
      TradingAccountId: tradingAccount.Id
    });

    return super.guerillaTraderMvcApi().post('trade/addTradeFromPaste', payload);
  }
}

export default TradeService;
