const axios = require('axios');

module.exports = {
  api() {
    const adapter = axios.create({
      baseURL: "https://core-api.barchart.com/v1/quotes/"
    });

    return adapter;
  },

  getMarketData(){
    // [{"key":"lists","value":"futures.category.us.all","description":""},{"key":"fields","value":"symbol,contractName,highPrice,lowPrice","description":""}]

    return this.api().get('/get', {
      params: {
        lists: "futures.category.us.all",
        fields: "symbol,contractName,highPrice,lowPrice,lastPrice,openPrice"
      }
    });
  }
};
