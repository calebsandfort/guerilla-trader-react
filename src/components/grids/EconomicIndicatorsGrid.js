import React from 'react';
import PropTypes from 'prop-types';
import {Grid} from '@progress/kendo-grid-react-wrapper';
import Moment from 'react-moment';
import kendo from '@progress/kendo-ui';

// {
//   uuid: uuidv1(),
//     name: "US 10-YR",
//   symbol: "US10Y",
//   last_time: "",
//   change_pct: 0.0,
//   change: 0.0,
//   last: 0.0,
//   open: 0.0,
//   high: 0.0,
//   low: 0.0,
//   previous_day_closing: 0.0
// }


export class EconomicIndicatorsGrid extends React.Component {
  constructor(props, context) {
    super(props, context);

  }

  render() {
    return (
      <div>
        EconomicIndicatorsGrid
      </div>
    );
  }
}

EconomicIndicatorsGrid.propTypes = {
  economicIndicators: PropTypes.array.isRequired
};

export default EconomicIndicatorsGrid;
