import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import * as tradingAccountActions from '../../actions/tradingAccountActions';
import TradingAccountList from './TradingAccountList';

class TradingAccountsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.redirectToAddTradingAccountPage = this.redirectToAddTradingAccountPage.bind(this);
  }

  redirectToAddTradingAccountPage() {
    browserHistory.push('/tradingAccount');
  }

  render() {
    return (
      <div className="ui grid">
        <div className="row">
          <div className="column">
            <input type="submit"
                   value="Add Trading Account"
                   className="ui primary button"
                   onClick={this.redirectToAddTradingAccountPage}/>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <TradingAccountList tradingAccounts={this.props.tradingAccounts}/>
          </div>
        </div>
      </div>
    );
  }
}

TradingAccountsPage.propTypes = {
  actions: PropTypes.object.isRequired,
  tradingAccounts: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    tradingAccounts: state.tradingAccounts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(tradingAccountActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TradingAccountsPage);
