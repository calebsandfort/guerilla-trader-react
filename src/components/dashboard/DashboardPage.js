import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import DashboardDetailsWrapper from './DashboardDetailsWrapper';
import Moment from 'react-moment';

export class DashboardPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      tradingAccount: Object.assign({}, this.props.tradingAccount)
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
      <div>
        <div>
          This is the current date: <Moment format="MM/DD/YYYY H:mm:ss a">{this.props.currentDate}</Moment>
        </div>
        <DashboardDetailsWrapper
          tradingAccount={this.state.tradingAccount}
          markets={this.props.markets}
        />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    tradingAccount: state.activeTradingAccount,
    currentDate: state.currentDate
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

DashboardPage.propTypes = {
  tradingAccount: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
