import React from 'react';
import PropTypes from 'prop-types';
import Tab from '../common/tabs/Tab';
import TabContent from '../common/tabs/TabContent';
import TradesGrid from '../trades/TradesGrid';
import MacroDetails from './MacroDetails';
import DayTrackerComponent from './DayTrackerComponent';
import DailyPerformanceWrapper from './DailyPerformanceWrapper';
import MarketDataWrapper from './MarketDataWrapper';

export class DashboardDetailsWrapper extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      activeTabIndex: 0
    };

    this.updateActiveTabIndex = this.updateActiveTabIndex.bind(this);
  }

  updateActiveTabIndex(newIndex) {
    this.setState({activeTabIndex: newIndex});
  }

  render() {
    return (
      <div>
        <div className="ui tabular secondary pointing menu">
          <Tab index={0} activeIndex={this.state.activeTabIndex} display={"At a Glance"}
               updateIndex={this.updateActiveTabIndex}/>
          <Tab index={1} activeIndex={this.state.activeTabIndex} display={"Daily Perf"}
               updateIndex={this.updateActiveTabIndex}/>
          <Tab index={2} activeIndex={this.state.activeTabIndex} display={"Trades"}
               updateIndex={this.updateActiveTabIndex}/>
          <Tab index={3} activeIndex={this.state.activeTabIndex} display={"Market Data"}
               updateIndex={this.updateActiveTabIndex}/>
        </div>
        <TabContent index={0} activeIndex={this.state.activeTabIndex}>
          <div className="ui grid">
            <div className="sixteen column row">
              <div className="sixteen wide column">
                <MacroDetails tradingAccount={this.props.tradingAccount}
                              setDialogVisibility={this.props.setDialogVisibility}
                              pasteTradesModalOpen={this.props.pasteTradesModalOpen}
                              pastedTradesDto={this.props.pastedTradesDto}
                              updatePastedTrades={this.props.updatePastedTrades}
                              submitPastedTrades={this.props.submitPastedTrades}
                              purgeConfirmOpen={this.props.purgeConfirmOpen}
                              purge={this.props.purge}
                              reconcileConfirmOpen={this.props.reconcileConfirmOpen}
                              reconcile={this.props.reconcile}/>
              </div>
            </div>
            <DayTrackerComponent
              dayTracker={this.props.dayTracker}
              addWin={this.props.addWin}
              addLoss={this.props.addLoss}
              saveTradeSettings={this.props.saveTradeSettings}
              updateTradeSettings={this.props.updateTradeSettings} />
          </div>

        </TabContent>
        <TabContent index={1} activeIndex={this.state.activeTabIndex}>
          {this.props.tradingAccount.PerformanceCycles && <DailyPerformanceWrapper performanceCycles={this.props.tradingAccount.PerformanceCycles}/>}
        </TabContent>
        <TabContent index={2} activeIndex={this.state.activeTabIndex}>
          {this.props.tradingAccount.Trades && <TradesGrid trades={this.props.tradingAccount.Trades}/>}
        </TabContent>
        <TabContent index={3} activeIndex={this.state.activeTabIndex}>
          <MarketDataWrapper marketData={this.props.marketData} />
        </TabContent>
      </div>
    );
  }
}

DashboardDetailsWrapper.propTypes = {
  tradingAccount: PropTypes.object.isRequired,
  dayTracker: PropTypes.object.isRequired,
  marketData: PropTypes.object.isRequired,
  addWin: PropTypes.func.isRequired,
  addLoss: PropTypes.func.isRequired
};

export default DashboardDetailsWrapper;
