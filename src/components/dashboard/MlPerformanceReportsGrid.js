import React from 'react';
import PropTypes from 'prop-types';
import {Grid} from '@progress/kendo-grid-react-wrapper';
import kendo from '@progress/kendo-ui';
import {getTradeReportItems} from '../../MachineLearning';
import _ from 'underscore';

class MlPerformanceReportsGrid extends React.Component {
  constructor(props, context) {
    super(props, context);

    const reportItems = getTradeReportItems();
    const reportItemsAsColumns = _.filter(reportItems, x => x.label != "name").map(x => {
      return {
        "title": x.label,
        "headerAttributes": {
          "data-field": x.label,
          "data-title": x.label
        },
        "width": "100px",
        "field": x.label,
        "format": x.formatString,
        "encoded": true
      };
    });

    this.gridOptions = {
      "columns": [{
        "title": "Name",
        "headerAttributes": {
          "data-field": "name",
          "data-title": "Name"
        },
        "width": "150px",
        "field": "name",
        "encoded": true
      }, ...reportItemsAsColumns],
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
        "noRecords": "No reports available."
      }
    };

    this.state = {
      dataSource : this.getDataSource([...this.props.performanceReports])
    };
  }

  componentWillReceiveProps(nextProps) {

    if (this.props.performanceReports.length != nextProps.performanceReports.length
        && nextProps.performanceReports.length > 0) {

      this.setState({
        dataSource : this.getDataSource([...nextProps.performanceReports])
      });
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
        "field": "accuracy",
        "dir": "desc"
      }],
      "filter": [],
      "schema": {
        "model": {
          "fields": {
            "name": {
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

MlPerformanceReportsGrid.propTypes = {
  performanceReports: PropTypes.array.isRequired
};

export default MlPerformanceReportsGrid;
