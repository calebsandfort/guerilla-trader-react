import React from 'react';
import {Grid} from '@progress/kendo-grid-react-wrapper';
import '@progress/kendo-ui';
import {API_BASE_URL} from '../../constants/envProperties';

class StocksPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.gridOptions = {
      "columns": [{
        "title": "Name",
        "headerAttributes": {
          "data-field": "Name",
          "data-title": "Name"
        },
        "width": "200px",
        "template": "\u003ca href=\u0027Stocks/Details/#:Id#\u0027 target=\u0027_blank\u0027\u003e#:Name#\u003c/a\u003e",
        "field": "Name",
        "encoded": true
      }, {
        "title": "Symbol",
        "headerAttributes": {
          "data-field": "Symbol",
          "data-title": "Symbol"
        },
        "width": "100px",
        "field": "Symbol",
        "encoded": true
      }, {
        "title": "Sector",
        "headerAttributes": {
          "data-field": "Sector",
          "data-title": "Sector"
        },
        "width": "200px",
        "field": "Sector",
        "filterable": {
          "multi": true,
          "dataSource": {
            "transport": {
              "read": {
                "url": "/Stocks/FilterMenu_Sectors"
              }
            }
          }
        },
        "encoded": true
      }, {
        "title": "Total Score",
        "headerAttributes": {
          "data-field": "TotalScore",
          "data-title": "Total Score"
        },
        "width": "100px",
        "field": "TotalScore",
        "filterable": {
          "operators": {
            "number": {
              "gte": "\u003e=",
              "lte": "\u003c="
            }
          }
        },
        "encoded": true
      }, {
        "title": "Rec Perf",
        "headerAttributes": {
          "data-field": "RecentPerf",
          "data-title": "Rec Perf"
        },
        "width": "100px",
        "field": "RecentPerf",
        "format": "{0:P2}",
        "encoded": true
      }, {
        "title": "Past Perf",
        "headerAttributes": {
          "data-field": "PastPerf",
          "data-title": "Past Perf"
        },
        "width": "100px",
        "field": "PastPerf",
        "format": "{0:P2}",
        "encoded": true
      }, {
        "title": "Past Succ Rate",
        "headerAttributes": {
          "data-field": "PastPositivePerf",
          "data-title": "Past Succ Rate"
        },
        "width": "100px",
        "field": "PastPositivePerf",
        "format": "{0:P2}",
        "encoded": true
      }, {
        "title": "Price",
        "headerAttributes": {
          "data-field": "Price",
          "data-title": "Price"
        },
        "width": "100px",
        "field": "Price",
        "format": "{0:C2}",
        "encoded": true
      }, {
        "title": "ADV",
        "headerAttributes": {
          "data-field": "ADV",
          "data-title": "ADV"
        },
        "width": "100px",
        "field": "ADV",
        "format": "{0:C0}",
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
        "noRecords": "No records available."
      },
      "dataSource": {
        "transport": {
          "read": {
            "url": `${API_BASE_URL}stocks/findAndCountAll`,
            "dataType": "json"
          }
        },
        "pageSize": 10,
        "page": 1,
        "total": 0,
        "serverPaging": true,
        "serverSorting": true,
        "serverFiltering": true,
        "serverGrouping": true,
        "serverAggregates": true,
        "sort": [{
          "field": "Name",
          "dir": "asc"
        }],
        "filter": [],
        "schema": {
          "data": "data",
          "total": "total",
          "errors": "Errors",
          "model": {
            "id": "Id",
            "fields": {
              "Yield": {
                "type": "number"
              },
              "DividendYieldScore": {
                "type": "number"
              },
              "CashFlowScore": {
                "type": "number"
              },
              "RelativeValueScore": {
                "type": "number"
              },
              "TotalScore": {
                "type": "number"
              },
              "IdealValue": {
                "type": "number"
              },
              "Sector": {
                "type": "string"
              },
              "RecentPerf": {
                "type": "number"
              },
              "PastPerf": {
                "type": "number"
              },
              "PastPositivePerf": {
                "type": "number"
              },
              "FailedToRetrieveBars": {
                "type": "boolean"
              },
              "NextEarningsDate": {
                "type": "date",
                "defaultValue": null
              },
              "ExDividendDate": {
                "type": "date",
                "defaultValue": null
              },
              "TargetPrice": {
                "type": "number",
                "defaultValue": null
              },
              "AvgVolume": {
                "type": "number",
                "defaultValue": null
              },
              "ADV": {
                "type": "number",
                "defaultValue": null
              },
              "StockReports": {
                "type": "object"
              },
              "Name": {
                "type": "string"
              },
              "Symbol": {
                "type": "string"
              },
              "TickValue": {
                "type": "number"
              },
              "TickSize": {
                "type": "number"
              },
              "Price": {
                "type": "number"
              },
              "IsNew": {
                "editable": false,
                "type": "boolean"
              },
              "Id": {
                "editable": false,
                "type": "number"
              }
            }
          }
        }
      }
    };
  }

  render() {
    return (
      <div>
        <Grid {...this.gridOptions} />
      </div>
    );
  }
}

export default StocksPage;
