import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import SimpleLineChart from '../common/charts/simpleLineChart';
import * as SemanticUiColors from '../../constants/SemanticUiColors';
import classNames from 'classnames';
import TradeSettings from './TradeSettings';

export class DayTrackerComponent extends React.Component {
  constructor(props, context) {
    super(props, context);

    //data, height, displayKey, valueKey, strokeColor
    this.state = {
      rChartOptions: this.buildChartOptions(this.props.dayTracker.rChartItems, "r", "R"),
      plChartOptions: this.buildChartOptions(this.props.dayTracker.plChartItems, "pl", "P/L"),
      rClass: SemanticUiColors.GREY.Name
    };

  }

  componentWillReceiveProps(nextProps) {
    if (this.props.dayTracker.rChartItems.length != nextProps.dayTracker.rChartItems.length) {
      this.setState({
        rChartOptions: this.buildChartOptions(nextProps.dayTracker.rChartItems, "r", "R")
      });
    }

    if (this.props.dayTracker.plChartItems.length != nextProps.dayTracker.plChartItems.length) {
      this.setState({
        plChartOptions: this.buildChartOptions(nextProps.dayTracker.plChartItems, "pl", "P/L")
      });
    }
    
  }

  buildChartOptions(data, valueKey, yLabel) {
    return {
      data: data,
      height: 200,
      displayKey: "tradeNumber",
      valueKey: valueKey,
      strokeColor: "#" + SemanticUiColors.BLUE.Hex,
      xLabel: "Trade #",
      yLabel: yLabel,
    };
  }

  render() {
    return (
      <div className="row">
        <div className="column">
          <div className="ui raised blue segment">
            <div className="ui top attached blue label">Day Tracker</div>
            <div className="ui grid">
              <div className="row" style={{paddingTop: "0"}}>
                <div className="column">
                  <TradeSettings activeTradeSettings={this.props.dayTracker.activeTradeSettings}
                                 updateTradeSettings={this.props.updateTradeSettings}
                                 saveTradeSettings={this.props.saveTradeSettings} />
                  <div className="ui divider"></div>
                </div>
              </div>
              <div className="three column row" style={{paddingTop: "0"}}>
                <div className="column" style={{textAlign: "center"}}>
                  <div className="ui left labeled button">
                    <a className="ui basic green label">
                      {this.props.dayTracker.winningTrades}
                    </a>
                    <div className="ui green button" onClick={this.props.addWin}>
                      <i className="plus icon"></i> Ws
                    </div>
                  </div>
                  <div className="ui left labeled button">
                    <a className="ui basic red label">
                      {this.props.dayTracker.losingTrades}
                    </a>
                    <div className="ui red button" onClick={this.props.addLoss}>
                      <i className="plus icon"></i> Ls
                    </div>
                  </div>
                </div>
                <div className="column" style={{textAlign: "center"}}>
                  <a className={classNames({
                    'ui': true,
                    'label': true,
                    'large': true,
                    'grey': this.props.dayTracker.totalTrades <= this.props.dayTracker.maxTrades,
                    'orange': this.props.dayTracker.totalTrades > this.props.dayTracker.maxTrades && this.props.dayTracker.totalTrades < this.props.dayTracker.maxTrades,
                    'red': this.props.dayTracker.totalTrades >= (this.props.dayTracker.maxTrades * 2)
                  })}>Trades: {this.props.dayTracker.totalTrades}</a>
                  <a className={classNames({
                    'ui': true,
                    'label': true,
                    'large': true,
                    'grey': this.props.dayTracker.id == 0,
                    'green': this.props.dayTracker.id > 0 && this.props.dayTracker.pl > 0,
                    'red': this.props.dayTracker.id > 0 && this.props.dayTracker.pl < 0
                  })}>P/L: {numeral(this.props.dayTracker.pl).format('$0,0.00')}</a>
                  <a className={classNames({
                    'ui': true,
                    'label': true,
                    'large': true,
                    'grey': this.props.dayTracker.id == 0,
                    'green': this.props.dayTracker.id > 0 && this.props.dayTracker.r >= 1.0,
                    'red': this.props.dayTracker.id > 0 && this.props.dayTracker.r < 1.0
                  })}>R: {numeral(this.props.dayTracker.r).format('0,0.00')}</a>
                </div>
                <div className="column" style={{textAlign: "center"}}>
                  Slippage
                </div>
              </div>

              <div className="two column row" style={{paddingTop: "0"}}>
                {this.props.dayTracker.rChartItems.length > 0 &&
                <div className="column">
                  <SimpleLineChart {...this.state.rChartOptions} />
                </div>}
                {this.props.dayTracker.plChartItems.length > 0 &&
                <div className="column">
                  <SimpleLineChart {...this.state.plChartOptions} />
                </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DayTrackerComponent.propTypes = {
  dayTracker: PropTypes.object.isRequired,
  addWin: PropTypes.func.isRequired,
  addLoss: PropTypes.func.isRequired
};

export default DayTrackerComponent;
