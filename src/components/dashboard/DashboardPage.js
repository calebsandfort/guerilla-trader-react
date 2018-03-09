import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import DashboardDetailsWrapper from './DashboardDetailsWrapper';
import Moment from 'react-moment';
import * as dayTrackerActions from '../../actions/dayTrackerActions';
import * as tradeSettingsActions from '../../actions/tradeSettingsActions';
import * as tradeActions from '../../actions/tradeActions';
import TradingAccountService from '../../services/tradingAccountService';
import TradeService from '../../services/tradeService';
import moment from 'moment';
import {refreshTradingAccount} from '../../actions/tradingAccountActions';
import toastr from 'toastr';
import { subscribeToStreamingData } from '../../socket-interactions/index';
import {PerformanceCycleTypes, TradeTypes} from 'wave-trader-enums';

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
      reconcileConfirmOpen: false,
      dailyPerformance: {
        performanceCycleType: PerformanceCycleTypes.Day.ordinal
      },
      quickTrade: this.props.dayTracker.quickTrade
    };

    this.setDialogVisibility = this.setDialogVisibility.bind(this);
    this.updatePastedTrades = this.updatePastedTrades.bind(this);
    this.submitPastedTrades = this.submitPastedTrades.bind(this);
    this.updateTradeSettings = this.updateTradeSettings.bind(this);
    this.updateDailyPerformanceState = this.updateDailyPerformanceState.bind(this);
    this.updateQuickTrade = this.updateQuickTrade.bind(this);
    this.recordQuickTrade = this.recordQuickTrade.bind(this);
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

    if(this.props.dayTracker.quickTrade.Streak != nextProps.dayTracker.quickTrade.Streak){
      this.setState({quickTrade: Object.assign({}, this.state.quickTrade, {Streak: nextProps.dayTracker.quickTrade.Streak})});
    }

    if(this.props.dayTracker.quickTrade.Last != nextProps.dayTracker.quickTrade.Last){
      this.setState({quickTrade: Object.assign({}, this.state.quickTrade, {Last: nextProps.dayTracker.quickTrade.Last})});
    }
  }

  setDialogVisibility(name, visible){
    const fieldName = name + "Open";
    let newState = {};
    newState[fieldName] = visible;
    this.setState(newState);
  }

  updateDailyPerformanceState(event, data){
    let newState = {};
    newState[data.name] = data.value;
    this.setState({
      dailyPerformance: Object.assign({}, this.state.dailyPerformance, newState)
    });
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
    this.reconcileTwo();
  }

  reconcileTwo = () => {
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

  updateQuickTrade(updates) {
    const field = event.target.name;
    let quickTrade = Object.assign({}, this.state.quickTrade);

    for(let i = 0; i < updates.length; i++) {
      quickTrade[updates[i].name] = updates[i].value;
    }

    this.setState({quickTrade: quickTrade});
  }

  recordQuickTrade(win){
    let quickTrade = Object.assign(this.state.quickTrade);

    const tradeTicks = win ? quickTrade.RewardTicks : quickTrade.RiskTicks;

    let newTrade = {
      TradingAccountId: quickTrade.TradingAccountId,
      TradeType: quickTrade.TradeType,
      Trigger: quickTrade.Trigger,
      Trend: quickTrade.Trend,
      Size: quickTrade.Size,
      Commissions: quickTrade.RoundTripCommissions * quickTrade.Size,
      ATR: quickTrade.ATR,
      SmaDiff: quickTrade.SmaDiff,
      Streak: quickTrade.Streak,
      EntryDate: quickTrade.EntryDate,
      EntryPrice: quickTrade.EntryPrice,
      ExitDate: moment().format("M/D/YYYY h:mm:ss a"),
      MarketId: quickTrade.Market.Id
    };

    if(win && newTrade.TradeType == TradeTypes.Long.ordinal){
      newTrade.ExitPrice = newTrade.EntryPrice + (quickTrade.Market.TickSize * tradeTicks);
    }
    else if(win && newTrade.TradeType == TradeTypes.Short.ordinal){
      newTrade.ExitPrice = newTrade.EntryPrice - (quickTrade.Market.TickSize * tradeTicks);
    }
    else if(!win && newTrade.TradeType == TradeTypes.Long.ordinal){
      newTrade.ExitPrice = newTrade.EntryPrice - (quickTrade.Market.TickSize * tradeTicks);
    }
    else if(!win && newTrade.TradeType == TradeTypes.Short.ordinal){
      newTrade.ExitPrice = newTrade.EntryPrice + (quickTrade.Market.TickSize * tradeTicks);
    }

    newTrade.ProfitLoss = quickTrade.Market.TickValue * tradeTicks * newTrade.Size;
    if(!win) newTrade.ProfitLoss *= -1;

    newTrade.AdjProfitLoss = newTrade.ProfitLoss - newTrade.Commissions;
    newTrade.ProfitLossPerContract = newTrade.AdjProfitLoss / newTrade.Size;

    this.props.tradeActions.saveTrade(newTrade)
      .then(() => {
        this.reconcileTwo();
      })
      .catch(error => {
        toastr.error(error);
      });

    this.updateQuickTrade([{
      name: "EntryDate",
      value: ''
    }]);
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
          streamingData={this.props.streamingData}
          openStreamingDataConnection={this.props.openStreamingDataConnection}
          dailyPerformanceState={this.state.dailyPerformance}
          updateDailyPerformanceState={this.updateDailyPerformanceState}
          quickTrade={this.state.quickTrade}
          updateQuickTrade={this.updateQuickTrade}
          recordQuickTrade={this.recordQuickTrade}
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
    marketData: state.marketData,
    streamingData: state.streamingData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dayTrackerActions: bindActionCreators(dayTrackerActions, dispatch),
    tradeActions: bindActionCreators(tradeActions, dispatch),
    tradeSettingsActions: bindActionCreators(tradeSettingsActions, dispatch),
    onSubmitCompleted: tradingAccount => {
      dispatch(refreshTradingAccount(tradingAccount));
    },
    openStreamingDataConnection: symbols => {
      setTimeout(() => {
        subscribeToStreamingData(dispatch, symbols);
      }, 500);
    }
  };
}

DashboardPage.propTypes = {
  tradingAccount: PropTypes.object.isRequired,
  dayTracker: PropTypes.object.isRequired,
  marketData: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
