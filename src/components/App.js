/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, NavLink, Route } from 'react-router-dom';
import HomePage from './HomePage';
import NotFoundPage from './NotFoundPage';
import TradingAccountsPage from './tradingAccount/TradingAccountsPage';
import ManageTradingAccountPage from './tradingAccount/ManageTradingAccountPage';
import MarketsPage from './market/MarketsPage';
import StocksPage from './stocks/StocksPage';
import DashboardPage from './dashboard/DashboardPage';
import { subscribeToTimer } from '../socket-interactions/index';import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as currentDateActions from '../actions/currentDateActions';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  constructor(props) {
    super(props);
    // subscribeToTimer((err, timestamp) => {
    //   props.actions.updateCurrentDate(timestamp);
    // });
  }

  render() {
    return (
      <div>
        <div className="ui container">
          <div className="ui secondary pointing menu">
            <div className="header item">Guerilla Trader</div>
            <NavLink exact to="/" className="item" activeClassName="active">Dashboard</NavLink>
            <NavLink to="/tradingAccounts" className="item" activeClassName="active">Accounts</NavLink>
            <NavLink to="/markets" className="item" activeClassName="active">Markets</NavLink>
            <NavLink to="/stocks" className="item" activeClassName="active">Stocks</NavLink>
          </div>
        </div>
        <div className="ui container" style={{paddingTop: "10px"}}>
          <Switch>
            <Route exact path="/" component={DashboardPage} />
            <Route path="/tradingAccounts" component={TradingAccountsPage} />
            <Route path="/tradingAccount/:id" component={ManageTradingAccountPage} />
            <Route path="/markets" component={MarketsPage} />
            <Route path="/stocks" component={StocksPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(currentDateActions, dispatch)
  };
}

App.propTypes = {
  children: PropTypes.element
};

// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default App;
