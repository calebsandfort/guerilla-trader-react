import React from 'react';
import PropTypes from 'prop-types';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label} from 'recharts';

const SimpleLineChart = ({data, height, displayKey, valueKey, color, xLabel, yLabel}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}
                 margin={{top: 5, right: 5, left: 0, bottom: 0}}>
        <XAxis dataKey={displayKey}>
          <Label value={xLabel} offset={0} position="insideBottom" />
        </XAxis>
        <YAxis label={{"value": yLabel, "angle": -90, "position": "insideLeft"}} domain={['dataMin', 'auto']}/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Line type="monotone" dataKey={valueKey} stroke={"#" + color.Hex} />
      </LineChart>
    </ResponsiveContainer>
  );
};

// SimpleLineChart.propTypes = {
//   tradingAccount: PropTypes.object.isRequired
// };

export default SimpleLineChart;
