import React from 'react';
import PropTypes from 'prop-types';
import CurrencyInput from '../common/CurrencyInput';
import NumberInput from '../common/NumberInput';
import MyDropdown from '../common/MyDropdown';
import ToggleButton from '../common/ToggleButton';
import {TradeTypes, TradeTriggers, TrendTypes} from 'wave-trader-enums';
import {Button, Icon, Form, Label} from 'semantic-ui-react';
import moment from 'moment';
import numeral from 'numeral';
import * as SemanticUiColors from '../../constants/SemanticUiColors';

const tradeTypeItems = [
  {display: TradeTypes.Long.display, value: TradeTypes.Long.ordinal, color: SemanticUiColors.GREEN.Name},
  {display: TradeTypes.Short.display, value: TradeTypes.Short.ordinal, color: SemanticUiColors.RED.Name}
];

const trendItems = [
  {display: TrendTypes.Bullish.display, value: TrendTypes.Bullish.ordinal, color: SemanticUiColors.GREEN.Name},
  {display: TrendTypes.Neutral.display, value: TrendTypes.Neutral.ordinal, color: SemanticUiColors.GREY.Name},
  {display: TrendTypes.Bearish.display, value: TrendTypes.Bearish.ordinal, color: SemanticUiColors.RED.Name}
];

const triggerItems = [
  {display: TradeTriggers.Signals.display, value: TradeTriggers.Signals.ordinal, color: SemanticUiColors.GREEN.Name},
  {display: TradeTriggers.Support.display, value: TradeTriggers.Support.ordinal, color: SemanticUiColors.PURPLE.Name},
  {display: TradeTriggers.Resistance.display, value: TradeTriggers.Resistance.ordinal, color: SemanticUiColors.ORANGE.Name},
  {display: TradeTriggers.BullishBreakout.display, value: TradeTriggers.BullishBreakout.ordinal, color: SemanticUiColors.PINK.Name},
  {display: TradeTriggers.BearishBreakout.display, value: TradeTriggers.BearishBreakout.ordinal, color: SemanticUiColors.YELLOW.Name}
];

const bracketGoodItems = [
  {display: "Yes", value: true, color: SemanticUiColors.GREEN.Name},
  {display: "No", value: false, color: SemanticUiColors.RED.Name}
];

export class QuickTradeEditor extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.updateNormal = this.updateNormal.bind(this);
    this.updateSemantic = this.updateSemantic.bind(this);
    this.startTrade = this.startTrade.bind(this);
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
              <ToggleButton name="TradeType" label="Direction" items={tradeTypeItems} change={this.props.updateQuickTrade}></ToggleButton>
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
              <NumberInput
                name="Streak"
                label="Streak"
                value={this.props.quickTrade.Streak}
                onChange={this.updateNormal}/>
            </div>
            <div className="four fields">
              <ToggleButton name="Trend" label="Trend" items={trendItems} change={this.props.updateQuickTrade}></ToggleButton>
              <ToggleButton name="Trigger" label="Trigger" items={triggerItems} change={this.props.updateQuickTrade}></ToggleButton>
              <NumberInput
                name="ATR"
                label="ATR"
                value={this.props.quickTrade.ATR}
                onChange={this.updateNormal}/>
              <NumberInput
                name="SmaDiff"
                label="Sma Diff"
                step=".05"
                value={this.props.quickTrade.SmaDiff}
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
