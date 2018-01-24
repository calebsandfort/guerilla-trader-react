import React from 'react';
import PropTypes from 'prop-types';
import {Grid} from '@progress/kendo-grid-react-wrapper';
import '@progress/kendo-ui';
import {API_BASE_URL} from '../../constants/envProperties';

// Id: {
// TradingAccountId
//   type: DataTypes.INTEGER,
// TradeType
//   type: DataTypes.INTEGER,
// Size
//   type: DataTypes.INTEGER,
// AdjProfitLoss
//   type: DataTypes.DECIMAL(18, 7),
// EntryDate
//   type: DataTypes.DATE,
// ExitDate
//   type: DataTypes.DATE,
// MarketId
//   type: DataTypes.INTEGER,
// Symbol

class TradesGrid extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      renderGrid: false,
      gridOptions: {}
    };

  }

  componentWillReceiveProps(nextProps) {

    if (this.props.trades.length != nextProps.trades.length) {
      this.setState({
        gridOptions: {
          "columns": [{
            "title": "Symbol",
            "headerAttributes": {
              "data-field": "Symbol",
              "data-title": "Symbol"
            },
            "width": "100px",
            "field": "Symbol",
            "encoded": true
          },{
            "title": "Dir",
            "headerAttributes": {
              "data-field": "TradeType",
              "data-title": "TradeType"
            },
            "width": "75px",
            "template": "#= TradeType == 1 ? 'Long' : 'Short' #",
            "field": "TradeType",
            "encoded": true
          },{
            "title": "EntryDate",
            "headerAttributes": {
              "data-field": "EntryDate",
              "data-title": "EntryDate"
            },
            "width": "100px",
            "field": "EntryDate",
            "template": "#: EntryDateDisplay #",
            "encoded": true
          },{
            "title": "ExitDate",
            "headerAttributes": {
              "data-field": "ExitDate",
              "data-title": "ExitDate"
            },
            "width": "100px",
            "field": "ExitDate",
            "template": "#: ExitDateDisplay #",
            "encoded": true
          }, {
            "title": "Adj P/L",
            "headerAttributes": {
              "data-field": "AdjProfitLoss",
              "data-title": "AdjProfitLoss"
            },
            "width": "100px",
            "field": "AdjProfitLoss",
            "format": "{0:C2}",
            "encoded": true
          },],
          "pageable": {
            "refresh": true,
            "buttonCount": 5
          },
          "sortable": {
            "mode": "multiple",
            "showIndexes": true
          },
          "filterable": true,
          "toolbar": {},
          "messages": {
            "noRecords": "No trades available."
          },
          "dataSource": {
            "data": nextProps.trades,
            "pageSize": 10,
            "page": 1,
            "total": nextProps.trades.length,
            "serverPaging": false,
            "serverSorting": false,
            "serverFiltering": false,
            "serverGrouping": false,
            "serverAggregates": false,
            "sort": [{
              "field": "EntryDate",
              "dir": "desc"
            }],
            "filter": [],
            "schema": {
              // "data": "data",
              // "total": "total",
              // "errors": "Errors",
              "model": {
                "id": "Id",
                "fields": {
                  "Symbol": {
                    "type": "string"
                  },
                  "AdjProfitLoss": {
                    "type": "number"
                  },
                  "Id": {
                    "editable": false,
                    "type": "number"
                  },
                  "EntryDate": {
                    "type": "date"
                  },
                  "ExitDate": {
                    "type": "date"
                  },
                  "TradeType": {
                    "type": "number"
                  }
                }
              }
            }
          }
        }
      });

      this.setState({
        renderGrid: true
      });

      // Necessary to populate form when existing tradingAccount is loaded directly.
      //this.setState({tradingAccount: this.initTradingAccount(nextProps.tradingAccount)});
    }
  }

  render() {
    return (
      <div>
        {this.state.renderGrid && <Grid {...this.state.gridOptions} />}
      </div>
    );
  }
}

TradesGrid.propTypes = {
  trades: PropTypes.array.isRequired
};

export default TradesGrid;
