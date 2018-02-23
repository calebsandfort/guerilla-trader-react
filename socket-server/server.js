const io = require('socket.io')();
const barchart = require('./marketDataServices').barchart;
const cnbc = require('./marketDataServices').cnbc;


io.on('connection', (client) => {
  client.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  });

  client.on('subscribeToMarketData', (interval) => {
    console.log('client is subscribing to market data with interval ', interval);

    emitMarketData(client);

    setInterval(() => {
      emitMarketData(client);
    }, interval);
  });

  client.on('subscribeToEconomicIndicatorData', (interval, symbols) => {
    console.log('client is subscribing to economic indicator data with interval ' + interval + ' and symbols ' + symbols.join());

    emitEconomicIndicatorData(client, symbols);

    setInterval(() => {
      emitEconomicIndicatorData(client, symbols);
    }, interval);
  });
});

function emitMarketData(client) {
  barchart.getMarketData().then(response => {
    client.emit('marketData',
      {
        timestamp: new Date(),
        markets: response.data.data
      });
  });
}

function emitEconomicIndicatorData(client, symbols) {
  cnbc.getMarketData(symbols).then(response => {
    client.emit('economicIndicatorData',
      {
        quotes: response.data.QuickQuoteResult.QuickQuote
      });
  });
}

const port = 3002;
io.listen(port);
console.log('listening on port ', port);
