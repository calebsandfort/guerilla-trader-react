import React from 'react';
import PropTypes from 'prop-types';
import MarketListRow from './MarketListRow';

const MarketList = ({markets, contracts}) => {
  return (
    <table className="ui celled table">
      <thead>
      <tr>
        <th>Name</th>
        <th>Symbol</th>
        <th>Tick Value</th>
        <th>Tick Size</th>
        <th>Initial Margin</th>
        <th>Contract Margin</th>
        <th>Active</th>
      </tr>
      </thead>
      <tbody>
      {markets.map(market =>
        <MarketListRow key={market.Id} market={market} contracts={contracts} />
      )}
      </tbody>
    </table>
  );
};

MarketList.propTypes = {
  markets: PropTypes.array.isRequired,
  contracts: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

export default MarketList;
