/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore, { history } from './store/configureStore';
import {loadTradingAccounts} from './actions/tradingAccountActions';
import {loadTradeSettings} from './actions/tradeSettingsActions';
import {loadMarkets} from './actions/marketDataActions';
import Root from './components/Root';
import './styles/semantic-ui/semantic.min.css';
import '../node_modules/toastr/build/toastr.min.css';
import './styles/styles.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
// import { subscribeToEconomicIndicatorData } from './socket-interactions/index';
import {connect} from 'react-redux';

require('./favicon.ico'); // Tell webpack to load favicon.ico
const store = configureStore();
store.dispatch(loadTradingAccounts());
store.dispatch(loadMarkets());
// store.dispatch(loadTradeSettings());

// setTimeout(() => {
//   subscribeToEconomicIndicatorData(store);
// }, 500);


render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NewRoot = require('./components/Root').default;
    render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
