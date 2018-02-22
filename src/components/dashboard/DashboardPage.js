import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import DashboardDetailsWrapper from './DashboardDetailsWrapper';
import Moment from 'react-moment';
import * as dayTrackerActions from '../../actions/dayTrackerActions';
import * as tradeSettingsActions from '../../actions/tradeSettingsActions';
import TradingAccountService from '../../services/tradingAccountService';
import TradeService from '../../services/tradeService';
import moment from 'moment';
import {refreshTradingAccount} from '../../actions/tradingAccountActions';
import toastr from 'toastr';

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
      purgeConfirmOpen: false,
      reconcileConfirmOpen: false
    };

    this.setDialogVisibility = this.setDialogVisibility.bind(this);
    this.updatePastedTrades = this.updatePastedTrades.bind(this);
    this.submitPastedTrades = this.submitPastedTrades.bind(this);
    this.updateTradeSettings = this.updateTradeSettings.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.tradingAccount.Uuid != nextProps.tradingAccount.Uuid) {
      // Necessary to populate form when existing tradingAccount is loaded directly.
      this.setState({tradingAccount: Object.assign({}, nextProps.tradingAccount)});
    }

    if (this.props.dayTracker.id != nextProps.dayTracker.id || this.props.dayTracker.activeTradeSettings.Uuid != nextProps.dayTracker.activeTradeSettings.Uuid) {
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

  reconcile = (event) => {
    event.preventDefault();
    TradingAccountService.reconcile().then(response => {
      if(response.data.success){
        this.setState({
          reconcileConfirmOpen: false
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

  updateTradeSettings(event) {
    // const field = event.target.name;
    // let activeTradeSettings = Object.assign({}, this.state.dayTracker.activeTradeSettings);
    //
    // switch(event.target.type){
    //   default:
    //     activeTradeSettings[field] = event.target.value;
    //     break;
    // }
    //
    // this.setState(Object.assign({}, this.state.dayTracker, {activeTradeSettings: activeTradeSettings}));
  }

  saveTradeSettings(event) {
    event.preventDefault();
    this.props.tradeSettingsActions.saveTradeSettings(this.state.dayTracker.activeTradeSettings)
      .then(() => {
        toastr.success("Saved trade settings!");
      })
      .catch(error => {
        toastr.error(error);
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
          reconcileConfirmOpen={this.state.reconcileConfirmOpen}
          reconcile={this.reconcile}
          saveTradeSettings={this.saveTradeSettings}
          updateTradeSettings={this.updateTradeSettings}
          marketData={this.props.marketData}
        />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    tradingAccount: state.activeTradingAccount,
    dayTracker: state.dayTracker,
    currentDate: state.currentDate,
    marketData: state.marketData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dayTrackerActions: bindActionCreators(dayTrackerActions, dispatch),
    tradeSettingsActions: bindActionCreators(tradeSettingsActions, dispatch),
    onSubmitCompleted: tradingAccount => {
      dispatch(refreshTradingAccount(tradingAccount));
    }
  };
}

DashboardPage.propTypes = {
  tradingAccount: PropTypes.object.isRequired,
  dayTracker: PropTypes.object.isRequired,
  marketData: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
