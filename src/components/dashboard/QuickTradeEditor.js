import React from 'react';
import PropTypes from 'prop-types';
import CurrencyInput from '../common/CurrencyInput';
import NumberInput from '../common/NumberInput';
import MyDropdown from '../common/MyDropdown';
import {TradeTypes, TradeTriggers, TrendTypes} from 'wave-trader-enums';
import {Button, Icon, Form, Label} from 'semantic-ui-react';
import moment from 'moment';
import numeral from 'numeral';

// quickTrade: {
//   MarketId: 0,
//     TradingAccountId: 0,
//     TradeType: 0,
//     Trigger: 0,
//     Trend: 0,
//     EntryDate: 0,
//     ExitDate: 0,
//     EntryPrice: 0,
//     ExitPrice: 0,
//     Commissions: 0,
//     ProfitLoss: 0,
//     AdjProfitLoss: 0,
//     ProfitLossPerContract: 0,
//     Volatile: false,
//     Size: 0,
//     TickRange: 0
// }

export class QuickTradeEditor extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.updateNormal = this.updateNormal.bind(this);
    this.updateSemantic = this.updateSemantic.bind(this);
    this.startTrade = this.startTrade.bind(this);
    this.toggleVolatile = this.toggleVolatile.bind(this);
    this.recordWin = this.recordWin.bind(this);
    this.recordLoss = this.recordLoss.bind(this);
  }

  updateNormal(event) {
    let value = event.target.value;

    switch (event.target.type) {
      case "number":
        value = parseFloat(value);
        break;
    }

    this.props.updateQuickTrade([{name: event.target.name, value: value}]);
  }

  updateSemantic({name, value}) {
    this.props.updateQuickTrade([{name: name, value: value}]);
  }

  startTrade() {
    this.props.updateQuickTrade([{
      name: "EntryDate",
      value: moment().format("M/D/YYYY h:mm:ss a")
    },
      {
        name: "EntryPrice",
        value: this.props.quickTrade.Last
      }]);
  }

  toggleVolatile(event) {
    event.preventDefault();
    this.props.updateQuickTrade([{name: "Volatile", value: !this.props.quickTrade.Volatile}]);
  }

  recordWin(event) {
    event.preventDefault();
    this.props.recordQuickTrade(true);
  }

  recordLoss(event) {
    event.preventDefault();
    this.props.recordQuickTrade(false);
  }

  render() {
    return (
      <div className="ui grid">
        <div className="ten wide column">
          <form className="ui form">
            <div className="four fields">
              <NumberInput
                name="Size"
                label="Size"
                value={this.props.quickTrade.Size}
                onChange={this.updateNormal}/>
              <MyDropdown
                name="TradeType"
                label="Direction"
                value={this.props.quickTrade.TradeType}
                onChange={this.updateSemantic}
                items={TradeTypes.enumValues.filter(x => x.name !== "None").map(x => Object.assign({}, {text: x.display, value: x.ordinal}))}/>
              <NumberInput
                name="RewardTicks"
                label="Reward Ticks"
                value={this.props.quickTrade.RewardTicks}
                onChange={this.updateNormal}/>
              <NumberInput
                name="RiskTicks"
                label="Risk Ticks"
                value={this.props.quickTrade.RiskTicks}
                onChange={this.updateNormal}/>
            </div>
            <div className="four fields">
              <MyDropdown
                name="Trend"
                label="Trend"
                value={this.props.quickTrade.Trend}
                onChange={this.updateSemantic}
                items={TrendTypes.enumValues.filter(x => x.name !== "None").map(x => Object.assign({}, {text: x.display, value: x.ordinal}))}/>
              <Form.Field>
                <label>Volatile</label>
                <Button fluid onClick={this.toggleVolatile}
                        content={this.props.quickTrade.Volatile ? "Yes" : "No"}></Button>
              </Form.Field>
              <MyDropdown
                name="Trigger"
                label="Trigger"
                value={this.props.quickTrade.Trigger}
                onChange={this.updateSemantic}
                items={TradeTriggers.enumValues.filter(x => x.name !== "None").map(x => Object.assign({}, {text: x.display, value: x.ordinal}))}/>
              <NumberInput
                name="TickRange"
                label="Tick Range"
                value={this.props.quickTrade.TickRange}
                onChange={this.updateNormal}/>
            </div>
          </form>
        </div>
        <div className="four wide column">
          {this.props.quickTrade.EntryDate !== '' && <div>
            <div>
              <label style={{float: "left", width: "80px"}}>Entry Date:</label>
              <Label size="small">{this.props.quickTrade.EntryDate}</Label>
            </div>
            <div style={{paddingTop: "7px"}}>
              <label style={{float: "left", width: "80px"}}>Entry Price:</label>
              <Label size="small">{numeral(this.props.quickTrade.EntryPrice).format('$0,0.00')}</Label>
            </div>
            <div style={{paddingTop: "7px"}}>
              <label style={{float: "left", width: "80px"}}>Reward:</label>
              <Label
                size="small">{numeral(this.props.quickTrade.Market.TickValue * this.props.quickTrade.RewardTicks * this.props.quickTrade.Size).format('$0,0.00')}</Label>
            </div>
            <div style={{paddingTop: "7px"}}>
              <label style={{float: "left", width: "80px"}}>Risk:</label>
              <Label
                size="small">{numeral(this.props.quickTrade.Market.TickValue * this.props.quickTrade.RiskTicks * this.props.quickTrade.Size).format('$0,0.00')}</Label>
            </div>
          </div>}
        </div>
        <div className="two wide column">
          <Button color="blue" icon fluid onClick={this.startTrade}>
            <Icon name="play"/> Start
          </Button>
          <Button color="green" icon fluid disabled={this.props.quickTrade.EntryDate === ''} onClick={this.recordWin}
                  style={{marginTop: "7px"}}>
            <Icon name="thumbs up"/> Win
          </Button>
          <Button color="red" icon fluid disabled={this.props.quickTrade.EntryDate === ''} onClick={this.recordLoss}
                  style={{marginTop: "7px"}}>
            <Icon name="thumbs down"/> Loss
          </Button>
        </div>
      </div>
    );
  }
}

export default QuickTradeEditor;
