import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import DashboardDetailsWrapper from './DashboardDetailsWrapper';
import Moment from 'react-moment';
import * as dayTrackerActions from '../../actions/dayTrackerActions';

export class DashboardPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      tradingAccount: Object.assign({}, this.props.tradingAccount),
      dayTracker: Object.assign({}, this.props.dayTracker)
    };

  }

  componentWillReceiveProps(nextProps) {
    if (this.props.tradingAccount.Id != nextProps.tradingAccount.Id) {
      // Necessary to populate form when existing tradingAccount is loaded directly.
      this.setState({tradingAccount: Object.assign({}, nextProps.tradingAccount)});
    }

    if (this.props.dayTracker.id != nextProps.dayTracker.id) {
      // Necessary to populate form when existing tradingAccount is loaded directly.
      this.setState({dayTracker: Object.assign({}, nextProps.dayTracker)});
    }
  }

  render() {
    return (
      <div>
        <DashboardDetailsWrapper
          tradingAccount={this.state.tradingAccount}
          dayTracker={this.state.dayTracker}
          markets={this.props.markets}
          addWin={this.props.dayTrackerActions.addWin}
          addLoss={this.props.dayTrackerActions.addLoss}
        />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    tradingAccount: state.activeTradingAccount,
    dayTracker: state.dayTracker,
    currentDate: state.currentDate
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dayTrackerActions: bindActionCreators(dayTrackerActions, dispatch)
  };
}

DashboardPage.propTypes = {
  tradingAccount: PropTypes.object.isRequired,
  dayTracker: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
