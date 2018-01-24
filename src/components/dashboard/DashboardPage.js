import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import DashboardDetailsWrapper from './DashboardDetailsWrapper';

export class DashboardPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      tradingAccount: Object.assign({}, this.props.tradingAccount),
    };

  }

  componentWillReceiveProps(nextProps) {
    if (this.props.tradingAccount.Id != nextProps.tradingAccount.Id) {
      // Necessary to populate form when existing tradingAccount is loaded directly.
      this.setState({tradingAccount: Object.assign({}, nextProps.tradingAccount)});
    }
  }

  render() {
    return (
      <DashboardDetailsWrapper
        tradingAccount={this.state.tradingAccount}
        markets={this.props.markets}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    tradingAccount: state.activeTradingAccount
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

DashboardPage.propTypes = {
  tradingAccount: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
