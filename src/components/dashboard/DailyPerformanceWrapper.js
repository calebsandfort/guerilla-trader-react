import React from 'react';
import PropTypes from 'prop-types';
import SimpleLineChart from '../common/charts/simpleLineChart';
import * as SemanticUiColors from '../../constants/SemanticUiColors';
import classNames from 'classnames';
import SimpleWidget from '../common/widgets/SimpleWidget';

export class DailyPerformanceWrapper extends React.Component {
  constructor(props, context) {
    super(props, context);

  }

  render() {
    return (
      <div className="ui grid">
        <div className="three column row">
          <div className="column">
            <SimpleWidget color={SemanticUiColors.ORANGE.Name} title="Chart 1" />
          </div>
        </div>
      </div>
    );
  }
}


DailyPerformanceWrapper.propTypes = {
  performanceCycles: PropTypes.array.isRequired
};

export default DailyPerformanceWrapper;
