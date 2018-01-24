import React from 'react';
import PropTypes from 'prop-types';
import Tab from '../common/tabs/Tab';
import TabContent from '../common/tabs/TabContent';
import TradesGrid from '../trades/TradesGrid';
import MacroDetails from './MacroDetails';

export class DashboardDetailsWrapper extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      activeTabIndex: 0
    };

    this.updateActiveTabIndex = this.updateActiveTabIndex.bind(this);
  }

  updateActiveTabIndex (newIndex) {
    this.setState({activeTabIndex: newIndex});
  }

  render() {
    return (
      <div>
        <div className="ui tabular secondary pointing menu">
          <Tab index={0} activeIndex={this.state.activeTabIndex} display={"Performance"} updateIndex={this.updateActiveTabIndex} />
          <Tab index={1} activeIndex={this.state.activeTabIndex} display={"Trades"} updateIndex={this.updateActiveTabIndex} />
        </div>
        <TabContent index={0} activeIndex={this.state.activeTabIndex}>
          <MacroDetails tradingAccount={this.props.tradingAccount} />
        </TabContent>
        <TabContent index={1} activeIndex={this.state.activeTabIndex}>
          <TradesGrid trades={this.props.tradingAccount.Trades} />
        </TabContent>
      </div>
    );
  }
}

DashboardDetailsWrapper.propTypes = {
  tradingAccount: PropTypes.object.isRequired
};

export default DashboardDetailsWrapper;
