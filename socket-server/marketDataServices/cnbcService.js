const axios = require('axios');

module.exports = {
  api() {
    const adapter = axios.create({
      baseURL: "https://quote.cnbc.com/quote-html-webservice/"
    });

    return adapter;
  },

  getMarketData(symbols){
    return this.api().get('/quote.htm', {
      params: {
        symbols: symbols.join('|'),
        output: "json"
      }
    });
  }
};
