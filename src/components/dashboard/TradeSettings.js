import React from 'react';
import PropTypes from 'prop-types';
import CurrencyInput from '../common/CurrencyInput';
import NumberInput from '../common/NumberInput';

// tradeSettings: {
//   tickValue: 5.00,
//     rewardTicks: 8.0,
//     riskTicks: 15.0,
//     roundTripCommissions: 6.88
// }

export class TradeSettings extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <form className="ui form">
        <div className="six fields">
          <CurrencyInput
            name="tickValue"
            label="Tick Value"
            value={this.props.activeTradeSettings.TickValue}
            onChange={this.props.updateTradeSettings}/>
          <NumberInput
            name="contracts"
            label="Contracts"
            value={this.props.activeTradeSettings.Contracts}
            onChange={this.props.updateTradeSettings}/>
          <NumberInput
            name="rewardTicks"
            label="Reward Ticks"
            value={this.props.activeTradeSettings.RewardTicks}
            onChange={this.props.updateTradeSettings}
            postfix={this.props.activeTradeSettings.Reward}/>
          <NumberInput
            name="riskTicks"
            label="Risk Ticks"
            value={this.props.activeTradeSettings.RiskTicks}
            onChange={this.props.updateTradeSettings}
            postfix={this.props.activeTradeSettings.Risk}/>
          <CurrencyInput
            name="roundTripCommissions"
            label="Round Trip"
            value={this.props.activeTradeSettings.TotalCommissions}
            onChange={this.props.updateTradeSettings}/>
          <div className="field" style={{marginTop: "25px"}}>
            <button className="ui button green" onClick={this.props.saveTradeSettings}>Update</button>
          </div>
        </div>
      </form>
    );
  }
}

export default TradeSettings;
