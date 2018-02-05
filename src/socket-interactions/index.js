import openSocket from 'socket.io-client';
import {marketDataReceived} from '../actions/marketDataActions';

const  socket = openSocket('http://localhost:3002');

function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}

function subscribeToMarketData(store) {
  socket.on('marketData', response => {
    store.dispatch(marketDataReceived(response));
  });

  socket.emit('subscribeToMarketData', 600000);
}

export { subscribeToTimer, subscribeToMarketData };
