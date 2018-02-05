const io = require('socket.io')();
const BarchartService = require('./barchartService');

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
});

function emitMarketData(client) {
  BarchartService.getMarketData().then(response => {
    client.emit('marketData',
      {
        timestamp: new Date(),
        markets: response.data.data
      });
  });
}

const port = 3002;
io.listen(port);
console.log('listening on port ', port);
