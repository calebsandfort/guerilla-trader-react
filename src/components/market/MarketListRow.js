import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import numeral from 'numeral';
import Moment from 'react-moment';

const MarketListRow = ({market, contracts}) => {
  return (
    <tr>
      <td><NavLink to={'/market/' + market.Id}>{market.Name}</NavLink></td>
      <td>{market.Symbol}</td>
      <td>{numeral(market.TickSize).format('$0,0.00000')}</td>
      <td>{numeral(market.TickValue).format('$0,0.000')}</td>
      <td>{numeral(market.InitialMargin).format('$0,0.00')}</td>
      <td>{numeral(contracts === "" ? 0 : market.InitialMargin * contracts).format('$0,0.00')}</td>
      <td>{market.Active ? 'Active' : ''}</td>
    </tr>
  );
};

MarketListRow.propTypes = {
  market: PropTypes.object.isRequired,
  contracts: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

export default MarketListRow;
