import React from 'react';
import PropTypes from 'prop-types';
import Tab from '../common/tabs/Tab';
import TabContent from '../common/tabs/TabContent';
import TradesGrid from '../trades/TradesGrid';
import MacroDetails from './MacroDetails';
import DayTrackerComponent from './DayTrackerComponent';

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
          <Tab index={1} activeIndex={this.state.activeTabIndex} display={"Trades"}
               updateIndex={this.updateActiveTabIndex}/>
        </div>
        <TabContent index={0} activeIndex={this.state.activeTabIndex}>
          <div className="ui grid">
            <div className="sixteen column row">
              <div className="sixteen wide column">
                <MacroDetails tradingAccount={this.props.tradingAccount}/>
              </div>
            </div>
            <div className="sixteen column row">
              <div className="ten wide column">
                Perf Charts
              </div>
              <div className="six wide column">
                <DayTrackerComponent
                  dayTracker={this.props.dayTracker}
                  addWin={this.props.addWin}
                  addLoss={this.props.addLoss} />
              </div>
            </div>
          </div>

        </TabContent>
        <TabContent index={1} activeIndex={this.state.activeTabIndex}>
          <TradesGrid trades={this.props.tradingAccount.Trades}/>
        </TabContent>
      </div>
    );
  }
}

DashboardDetailsWrapper.propTypes = {
  tradingAccount: PropTypes.object.isRequired,
  dayTracker: PropTypes.object.isRequired,
  addWin: PropTypes.func.isRequired,
  addLoss: PropTypes.func.isRequired
};

export default DashboardDetailsWrapper;
