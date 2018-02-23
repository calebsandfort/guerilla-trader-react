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
    this.gridOptions = {
      "columns": [{
        "title": "Name",
        "headerAttributes": {
          "data-field": "name",
          "data-title": "name"
        },
        "width": "150px",
        "field": "name",
        "encoded": true
      }, {
        "title": "Symbol",
        "headerAttributes": {
          "data-field": "symbol",
          "data-title": "symbol"
        },
        "width": "100px",
        "field": "symbol",
        "encoded": true
      }, {
        "title": "Last",
        "headerAttributes": {
          "data-field": "last",
          "data-title": "last"
        },
        "width": "100px",
        "field": "last",
        "format": "{0:C3}",
        "encoded": true
      }, {
        "title": "Chg",
        "headerAttributes": {
          "data-field": "change",
          "data-title": "change"
        },
        "width": "100px",
        "field": "change",
        "format": "{0:C3}",
        "encoded": true
      }, {
        "title": "Chg Pct",
        "headerAttributes": {
          "data-field": "change_pct",
          "data-title": "change_pct"
        },
        "width": "100px",
        "field": "change_pct",
        "format": "{0:P3}",
        "encoded": true
      }, {

        "title": "Time",
        "headerAttributes": {
          "data-field": "last_time",
          "data-title": "last_time"
        },
        "width": "100px",
        "field": "last_time",
        "template": "#:formattedTime#",
        "encoded": true
      }],
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
        "noRecords": "No economic indicators available."
      }
    };

    this.state = {
      dataSource : this.getDataSource([...this.props.economicIndicators])
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.economicIndicators.length == nextProps.economicIndicators.length
      && this.props.economicIndicators.length > 0) {
      const inconsistencies = this.props.economicIndicators.filter(p => nextProps.economicIndicators.filter(np => np.uuid != p.uuid).length > 0);

      if(inconsistencies.length) {
        this.setState({
          dataSource : this.getDataSource([...nextProps.economicIndicators])
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
        "field": "name",
        "dir": "asc"
      }],
      "filter": [],
      "schema": {
        "model": {
          "id": "uuid",
          "fields": {
            "name": {
              "type": "string"
            },
            "symbol": {
              "type": "string"
            },
            "last_time": {
              "type": "date"
            },
            "change_pct": {
              "type": "number"
            },
            "change": {
              "type": "number"
            },
            "last": {
              "type": "number"
            },
            "open": {
              "type": "number"
            },
            "high": {
              "type": "number"
            },
            "low": {
              "type": "number"
            },
            "previous_day_closing": {
              "type": "number"
            },
            "formattedTime": {
              "type": "string"
            },
            "uuid": {
              "editable": false,
              "type": "string"
            }
          }
        }
      }
    });
  }

  render() {
    return (
      <div>
        <Grid dataSource={this.state.dataSource} {...this.gridOptions} />
      </div>
    );
  }
}

EconomicIndicatorsGrid.propTypes = {
  economicIndicators: PropTypes.array.isRequired
};

export default EconomicIndicatorsGrid;
