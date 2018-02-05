import openSocket from 'socket.io-client';
import {marketDataReceived} from '../actions/marketDataActions';

const SOCKET_SERVER_URL = process.env.NODE_ENV === 'production' ? "http://ec2-34-214-87-86.us-west-2.compute.amazonaws.com:3002" : "http://localhost:3002";

const  socket = openSocket(SOCKET_SERVER_URL);

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
