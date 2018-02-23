import uuidv1 from 'uuid/v1';
import moment from 'moment';

export class EconomicIndicator {
  constructor(symbol) {
    this.symbol = symbol;
    this.uuid = uuidv1();
    this.name = "";
    this.last_time = new Date();
    this.formattedTime = moment(this.last_time).format('M/D/YY h:mm a');
    this.change_pct = 0.0;
    this.change = 0.0;
    this.last = 0.0;
    this.open = 0.0;
    this.high = 0.0;
    this.low = 0.0;
    this.previous_day_closing = 0.0;
  }

  static assign(economicIndicator, quotes){

    let quote = quotes.filter(q => q.symbol === economicIndicator.symbol);
    if(quote.length > 0){
      quote = quote[0];

      return Object.assign({}, economicIndicator, {
        uuid: uuidv1(),
        name: quote.name,
        last_time: quote.last_time,
        formattedTime: moment(quote.last_time).format('M/D/YY h:mm a'),
        change: parseFloat(quote.change),
        last: parseFloat(quote.last),
        open: parseFloat(quote.open),
        high: parseFloat(quote.high),
        low: parseFloat(quote.low),
        previous_day_closing: parseFloat(quote.previous_day_closing),
        change_pct: (parseFloat(quote.last) - parseFloat(quote.previous_day_closing)) / parseFloat(quote.previous_day_closing),
      });
    }
    else{
      return Object.assign({}, economicIndicator);
    }
  }

  // get formattedTime(){
  //   return moment.utc(this.last_time).format('M/D/YY h:mm a');
  // }
}

export default EconomicIndicator;
