import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import DashboardDetailsWrapper from './DashboardDetailsWrapper';
import Moment from 'react-moment';
import * as dayTrackerActions from '../../actions/dayTrackerActions';
import TradingAccountService from '../../services/tradingAccountService';
import TradeService from '../../services/tradeService';
import moment from 'moment';
import {refreshTradingAccount} from '../../actions/tradingAccountActions';

export class DashboardPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      tradingAccount: Object.assign({}, this.props.tradingAccount),
      dayTracker: Object.assign({}, this.props.dayTracker),
      pasteTradesModalOpen: false,
      pastedTradesDto: {
        Trades: '',
        Date: moment().format('YYYY-MM-DD')
      },
      purgeConfirmOpen: false
    };

    this.setDialogVisibility = this.setDialogVisibility.bind(this);
    this.updatePastedTrades = this.updatePastedTrades.bind(this);
    this.submitPastedTrades = this.submitPastedTrades.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.tradingAccount.Uuid != nextProps.tradingAccount.Uuid) {
      // Necessary to populate form when existing tradingAccount is loaded directly.
      this.setState({tradingAccount: Object.assign({}, nextProps.tradingAccount)});
    }

    if (this.props.dayTracker.id != nextProps.dayTracker.id) {
      // Necessary to populate form when existing tradingAccount is loaded directly.
      this.setState({dayTracker: Object.assign({}, nextProps.dayTracker)});
    }
  }

  setDialogVisibility(name, visible){
    const fieldName = name + "Open";
    let newState = {};
    newState[fieldName] = visible;
    this.setState(newState);
  }

  updatePastedTrades(event) {
    const field = event.target.name;
    let pastedTradesDto = Object.assign({}, this.state.pastedTradesDto);

    switch(event.target.type){
      default:
        pastedTradesDto[field] = event.target.value;
        break;
    }

    return this.setState({pastedTradesDto: pastedTradesDto});
  }

  purge = (event) => {
    event.preventDefault();
    TradingAccountService.purge().then(response => {
      if(response.data.success){
        this.setState({
          purgeConfirmOpen: false
        });

        this.props.onSubmitCompleted(this.props.tradingAccount);
      }
    }).catch(response => {
      throw(response);
    });
  }

  submitPastedTrades(event) {
    event.preventDefault();
    TradeService.pasteTrades(this.state.pastedTradesDto, this.state.tradingAccount).then(response => {
      if(response.data.success){
        TradingAccountService.reconcile().then(response => {
          if(response.data.success){
            this.setState({
              pasteTradesModalOpen: false,
              pastedTradesDto: {
                Trades: '',
                Date: moment().format('YYYY-MM-DD')
              }
            });

            this.props.onSubmitCompleted(this.props.tradingAccount);
          }
        }).catch(response => {
          throw(response);
        });
      }
    }).catch(response => {
      throw(response);
    });
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
          setDialogVisibility={this.setDialogVisibility}
          pasteTradesModalOpen={this.state.pasteTradesModalOpen}
          pastedTradesDto={this.state.pastedTradesDto}
          updatePastedTrades={this.updatePastedTrades}
          submitPastedTrades={this.submitPastedTrades}
          purgeConfirmOpen={this.state.purgeConfirmOpen}
          purge={this.purge}
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
    dayTrackerActions: bindActionCreators(dayTrackerActions, dispatch),
    onSubmitCompleted: tradingAccount => {
      dispatch(refreshTradingAccount(tradingAccount));
    }
  };
}

DashboardPage.propTypes = {
  tradingAccount: PropTypes.object.isRequired,
  dayTracker: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
