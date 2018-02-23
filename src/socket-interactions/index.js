import openSocket from 'socket.io-client';
import {marketDataReceived, economicIndicatorDataReceived} from '../actions/marketDataActions';
import {streamingDataReceived} from '../actions/streamingDataActions';

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

function subscribeToEconomicIndicatorData(store) {
  socket.on('economicIndicatorData', response => {
    store.dispatch(economicIndicatorDataReceived(response));
  });

  socket.emit('subscribeToEconomicIndicatorData', 600000, store.getState().marketData.economicIndicators.map(x => x.symbol));
}

function subscribeToStreamingData(dispatch, symbols) {
  socket.on('streamingData', response => {
    dispatch(streamingDataReceived(response));
  });

  socket.emit('subscribeToStreamingData', 300000, symbols);
}

export { subscribeToTimer, subscribeToMarketData, subscribeToEconomicIndicatorData, subscribeToStreamingData };
