import React from 'react';
import PropTypes from 'prop-types';
import TradingAccountListRow from './TradingAccountListRow';

const TradingAccountList = ({tradingAccounts}) => {
  return (
    <table className="ui celled table">
      <thead>
      <tr>
        <th>Name</th>
        <th>Initial Capital</th>
        <th>Current Capital</th>
        <th>Commissions</th>
        <th>P/L</th>
        <th>Total Return</th>
        <th>CAGR</th>
        <th>Inception</th>
        <th>Active</th>
      </tr>
      </thead>
      <tbody>
      {tradingAccounts.map(tradingAccount =>
        <TradingAccountListRow key={tradingAccount.Id} tradingAccount={tradingAccount}/>
      )}
      </tbody>
    </table>
  );
};

TradingAccountList.propTypes = {
  tradingAccounts: PropTypes.array.isRequired
};

export default TradingAccountList;
