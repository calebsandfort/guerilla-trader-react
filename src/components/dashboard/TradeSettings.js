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

export class TradeSettings  extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <form className="ui form">
        <div className="five fields">
          <CurrencyInput
            name="tickValue"
            label="Tick Value"
            value={this.props.tradeSettings.tickValue}
            onChange={this.props.onChange}/>
          <NumberInput
            name="contracts"
            label="Contracts"
            value={this.props.tradeSettings.contracts}
            onChange={this.props.onChange}/>
          <NumberInput
            name="rewardTicks"
            label="Reward Ticks"
            value={this.props.tradeSettings.rewardTicks}
            onChange={this.props.onChange}
            postfix={this.props.tradeSettings.reward}/>
          <NumberInput
            name="riskTicks"
            label="Risk Ticks"
            value={this.props.tradeSettings.riskTicks}
            onChange={this.props.onChange}
            postfix={this.props.tradeSettings.risk}/>
          <CurrencyInput
            name="roundTripCommissions"
            label="Round Trip"
            value={this.props.tradeSettings.roundTripCommissions}
            onChange={this.props.onChange}/>
        </div>
      </form>
    );
  }
}

export default TradeSettings;
