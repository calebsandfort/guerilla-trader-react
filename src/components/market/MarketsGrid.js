import React from 'react';
import PropTypes from 'prop-types';
import {Grid} from '@progress/kendo-grid-react-wrapper';
import Moment from 'react-moment';
import kendo from '@progress/kendo-ui';
import $ from 'jquery';

class MarketsGrid extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.gridOptions = {
      "columns": [{
        "title": "Symbol",
        "headerAttributes": {
          "data-field": "Symbol",
          "data-title": "Symbol"
        },
        "width": "100px",
        "field": "Symbol",
        "encoded": true
      }, {
        "title": "Name",
        "headerAttributes": {
          "data-field": "Name",
          "data-title": "Name"
        },
        "width": "150px",
        "field": "Name",
        "encoded": true
      }, {
        "title": "Tick Value",
        "headerAttributes": {
          "data-field": "TickValue",
          "data-title": "TickValue"
        },
        "width": "100px",
        "field": "TickValue",
        "format": "{0:C2}",
        "encoded": true
      }, {
        "title": "Tick Size",
        "headerAttributes": {
          "data-field": "TickSize",
          "data-title": "TickSize"
        },
        "width": "100px",
        "field": "TickSize",
        "format": "{0:C2}",
        "encoded": true
      }, {
        "title": "Initial Margin",
        "headerAttributes": {
          "data-field": "InitialMargin",
          "data-title": "InitialMargin"
        },
        "width": "100px",
        "field": "InitialMargin",
        "format": "{0:C2}",
        "encoded": true
      },
      //   {
      //   "title": "Last",
      //   "headerAttributes": {
      //     "data-field": "LastPrice",
      //     "data-title": "LastPrice"
      //   },
      //   "width": "100px",
      //   "field": "LastPrice",
      //   "format": "{0:C2}",
      //   "encoded": true
      // }, {
      //   "title": "Open",
      //   "headerAttributes": {
      //     "data-field": "OpenPrice",
      //     "data-title": "OpenPrice"
      //   },
      //   "width": "100px",
      //   "field": "OpenPrice",
      //   "format": "{0:C2}",
      //   "encoded": true
      // },
        {
        "title": "Chg",
        "headerAttributes": {
          "data-field": "Change",
          "data-title": "Change"
        },
        "width": "100px",
        "field": "Change",
        "format": "{0:C2}",
        "encoded": true
      }, {
        "title": "Chg Pct",
        "headerAttributes": {
          "data-field": "ChangePercent",
          "data-title": "ChangePercent"
        },
        "width": "100px",
        "field": "ChangePercent",
        "format": "{0:P2}",
        "encoded": true
      }, {
          "title": "Wave",
          "headerAttributes": {
            "data-field": "Wave",
            "data-title": "Wave"
          },
          "width": "100px",
          "field": "Wave",
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
        "noRecords": "No markets available."
      }
    };

    this.state = {
      dataSource : this.getDataSource([...this.props.marketData.markets])
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.marketData.markets.length == nextProps.marketData.markets.length
    && this.props.marketData.markets.length > 0) {
      const inconsistencies = this.props.marketData.markets.filter(p => nextProps.marketData.markets.filter(np => np.Wave != p.Wave).length > 0);

      if(inconsistencies.length) {
        this.setState({
          dataSource : this.getDataSource([...nextProps.marketData.markets])
        });
      }
    }
  }

  getDataSource(data) {
    return new kendo.data.DataSource({
      "data": data,
      "pageSize": 10,
      "page": 1,
      "total": data.length,
      "serverPaging": false,
      "serverSorting": false,
      "serverFiltering": false,
      "serverGrouping": false,
      "serverAggregates": false,
      "sort": [{
        "field": "Wave",
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
            "Name": {
              "type": "string"
            },
            "TickSize": {
              "type": "number"
            },
            "TickValue": {
              "type": "number"
            },
            "InitialMargin": {
              "type": "number"
            },
            "Wave": {
              "type": "number"
            },
            "LastPrice": {
              "type": "number"
            },
            "OpenPrice": {
              "type": "number"
            },
            "Change": {
              "type": "number"
            },
            "ChangePercent": {
              "type": "number"
            },
            "Id": {
              "editable": false,
              "type": "number"
            }
          }
        }
      }
    });
  }

  render() {
    return (
      <div>
        <Grid ref={(c) => this._grid = c} dataSource={this.state.dataSource} {...this.gridOptions} />
        {this.props.marketData.timestamp && <div className="ui small label right floated" style={{marginTop: "5px"}}>
          Last updated <Moment format="M/D/YY">{this.props.marketData.timestamp}</Moment> at <Moment
          format="h:mm:ss a">{this.props.marketData.timestamp}</Moment>
        </div>}
      </div>
    );
  }
}

MarketsGrid.propTypes = {
  marketData: PropTypes.object.isRequired
};

export default MarketsGrid;
