import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import numeral from 'numeral';
import Moment from 'react-moment';

// {
//   Id: 1,
//     Name: "paperMoney Margin",
//   InitialCapital: 8000.0000000,
//   CurrentCapital: 8110.0000000,
//   Commissions: 13.7600000,
//   ProfitLoss: 110.0000000,
//   Active: false,
//   TotalReturn: 0.0120300,
//   CAGR: 77.6296113,
//   InceptionDate: "2017-11-29T00:00:00"
// }

class TradingAccountListRow extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
          <tr>
            <td><NavLink to={'/tradingAccount/' + this.props.tradingAccount.Id}>{this.props.tradingAccount.Name}</NavLink></td>
            <td>{numeral(this.props.tradingAccount.InitialCapital).format('$0,0.00')}</td>
            <td>{numeral(this.props.tradingAccount.CurrentCapital).format('$0,0.00')}</td>
            <td>{numeral(this.props.tradingAccount.Commissions).format('$0,0.00')}</td>
            <td>{numeral(this.props.tradingAccount.ProfitLoss).format('$0,0.00')}</td>
            <td>{numeral(this.props.tradingAccount.TotalReturn).format('$0.00%')}</td>
            <td>{numeral(this.props.tradingAccount.CAGR).format('$0.00%')}</td>
            <td><Moment format="MM/DD/YYYY">{this.props.tradingAccount.InceptionDate}</Moment></td>
            <td>{this.props.tradingAccount.Active ? 'Active' : ''}</td>
          </tr>
        );
    }
}

TradingAccountListRow.propTypes = {
    tradingAccount: PropTypes.object.isRequired
};

export default TradingAccountListRow;
