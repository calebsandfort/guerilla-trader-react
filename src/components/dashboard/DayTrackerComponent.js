import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import SimpleLineChart from '../common/charts/SimpleLineChart';
import * as SemanticUiColors from '../../constants/SemanticUiColors';
import classNames from 'classnames';

// <div className="sixteen column row" style={{paddingTop: "0"}}>
//   <div className="sixteen wide column">
//     <div className="ui form" style={{display: "inline-block"}}>
//       <div className="fields">
//         <div className="inline field">
//           <label>Risk Mult.:</label>
//           <span>{numeral(this.props.dayTracker.riskMultiple).format('0,0.00')}</span>
//         </div>
//         <div className="inline field">
//           <label>R:</label>
//           <span>{numeral(this.props.dayTracker.r).format('0,0.00')}</span>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

export class DayTrackerComponent extends React.Component {
  constructor(props, context) {
    super(props, context);

    //data, height, displayKey, valueKey, strokeColor
    this.state = {
      chartOptions: this.buildChartOptions(this.props.dayTracker.rChartItems),
      rClass: SemanticUiColors.GREY.Name
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.dayTracker.id != nextProps.dayTracker.id) {
      this.setState({
        chartOptions: this.buildChartOptions(nextProps.dayTracker.rChartItems)
      });
    }
  }

  buildChartOptions(data) {
    return {
      data: data,
      height: 200,
      displayKey: "tradeNumber",
      valueKey: "r",
      strokeColor: "#" + SemanticUiColors.BLUE.Hex,
      xLabel: "Trade #",
      yLabel: "R",
    };
  }

  render() {
    return (
      <div className="ui one column grid">
        <div className="column">
          <div className="ui raised blue segment">
            <div className="ui top attached blue label">Day Tracker</div>
            <div className="ui grid">
              <div className="sixteen column row" style={{paddingTop: "0"}}>
                <div className="sixteen wide column">
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
                  <a className={classNames({
                    'ui': true,
                    'label': true,
                    'grey': this.props.dayTracker.totalTrades <= this.props.dayTracker.maxTrades,
                    'orange': this.props.dayTracker.totalTrades > this.props.dayTracker.maxTrades,
                    'large': this.props.dayTracker.totalTrades <= this.props.dayTracker.maxTrades,
                    'huge': this.props.dayTracker.totalTrades > this.props.dayTracker.maxTrades
                  })}>Total: {this.props.dayTracker.totalTrades}</a>
                  <a className={classNames({
                    'ui': true,
                    'label': true,
                    'large': true,
                    'grey': this.props.dayTracker.id == 0,
                    'green': this.props.dayTracker.id > 0 && this.props.dayTracker.r >= 1.0,
                    'red': this.props.dayTracker.id > 0 && this.props.dayTracker.r < 1.0
                  })}>R: {this.props.dayTracker.r}</a>
                </div>
              </div>
              {this.props.dayTracker.rChartItems.length > 0 &&
              <div className="sixteen column row" style={{paddingTop: "0"}}>
                <div className="sixteen wide column">
                  <SimpleLineChart {...this.state.chartOptions} />
                </div>
              </div>}
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
