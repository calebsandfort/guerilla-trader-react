import React from 'react';
import PropTypes from 'prop-types';
import SimpleLineChart from '../common/charts/simpleLineChart';
import * as SemanticUiColors from '../../constants/SemanticUiColors';
import classNames from 'classnames';
import SimpleWidget from '../common/widgets/SimpleWidget';
import MyDropdown from '../common/MyDropdown';
import {Form} from 'semantic-ui-react';
import {PerformanceCycleTypes} from 'wave-trader-enums';
import _ from 'underscore';

let performanceCycleTypeDropdownItems = [];
performanceCycleTypeDropdownItems.push({
  text: PerformanceCycleTypes.Hour.display,
  value: PerformanceCycleTypes.Hour.ordinal
});
performanceCycleTypeDropdownItems.push({
  text: PerformanceCycleTypes.Day.display,
  value: PerformanceCycleTypes.Day.ordinal
});
performanceCycleTypeDropdownItems.push({
  text: PerformanceCycleTypes.Weekly.display,
  value: PerformanceCycleTypes.Weekly.ordinal
});

export class DailyPerformanceWrapper extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      chartOptions: this.buildAllChartOptions(this.props.dailyPerformanceState.performanceCycleType)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.dailyPerformanceState.performanceCycleType != nextProps.dailyPerformanceState.performanceCycleType) {
      this.setState({
        chartOptions: this.buildAllChartOptions(nextProps.dailyPerformanceState.performanceCycleType)
      });
    }
  }

  buildAllChartOptions(pct) {
    const filteredPerformanceCycles = this.props.performanceCycles.filter(x => x.CycleType === pct);
    const performanceCycleType = PerformanceCycleTypes.enumOrdinalOf(pct);

    let displayKey = "Display";

    switch (pct) {
      case PerformanceCycleTypes.Day.ordinal:
        displayKey = "Position";
        break;
    }

    return [
      this.buildChartOptions(filteredPerformanceCycles, displayKey,
        "EndCapital", performanceCycleType.display, "Net Liq $",
        SemanticUiColors.RED),
      this.buildChartOptions(filteredPerformanceCycles, displayKey,
        "R", performanceCycleType.display, "R",
        SemanticUiColors.ORANGE),
      this.buildChartOptions(filteredPerformanceCycles, displayKey,
        "MaxDrawdown", performanceCycleType.display, "Max DD %",
        SemanticUiColors.YELLOW),
      this.buildChartOptions(filteredPerformanceCycles, displayKey,
        "ProfitLoss", performanceCycleType.display, "P/L $",
        SemanticUiColors.GREEN),
      this.buildChartOptions(filteredPerformanceCycles, displayKey,
        "SuccessRate", performanceCycleType.display, "Win %",
        SemanticUiColors.TEAL),
      this.buildChartOptions(filteredPerformanceCycles, displayKey,
        "PPC", performanceCycleType.display, "PPC $",
        SemanticUiColors.BLUE)
    ];
  }

  buildChartOptions(data, displayKey, valueKey, xLabel, yLabel, color) {
    return {
      data: data,
      height: 200,
      displayKey: displayKey,
      valueKey: valueKey,
      color: color,
      xLabel: xLabel,
      yLabel: yLabel,
    };
  }

  renderChartRows = () => {
    let rows = [];
    for (let i = 0; i < this.state.chartOptions.length; i += 3) {
      let charts = [];
      for (let j = 0; j < 3; j++) {
        const curChartOptions = this.state.chartOptions[i + j];
        charts.push(
          <div key={"column_" + (i + j)} className="column">
            <SimpleWidget key={"widget_" + (i + j)} color={curChartOptions.color.Name}
                          title={curChartOptions.yLabel}>
              <SimpleLineChart key={"chart_" + (i + j)} {...curChartOptions} />
            </SimpleWidget>
          </div>
        );
      }
      rows.push(<div key={"row_" + (i/3)} className="three column row" style={{paddingTop: "0"}}>{charts}</div>);
    }
    return rows;
  }

  render() {
    return (
      <div className="ui grid">
        <div className="one column row" style={{paddingBottom: "0"}}>
          <div className="column">
            <Form>
              <Form.Group widths="equal">
                <MyDropdown
                  name="performanceCycleType"
                  label="Perf Cycle Type"
                  value={this.props.dailyPerformanceState.performanceCycleType}
                  onChange={this.props.updateDailyPerformanceState}
                  items={performanceCycleTypeDropdownItems}/>
              </Form.Group>
            </Form>
            <div className="ui divider"></div>
          </div>
        </div>
        {this.renderChartRows()}
      </div>
    );
  }
}


DailyPerformanceWrapper.propTypes = {
  performanceCycles: PropTypes.array.isRequired
};

export default DailyPerformanceWrapper;
