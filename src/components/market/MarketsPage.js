import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import * as marketDataActions from '../../actions/marketDataActions';
import MarketsGrid from './MarketsGrid';

// <div className="ui grid">
//   <div className="row">
//     <div className="column">
//       <input type="submit"
//              value="Add Market"
//              className="ui primary button"
//              onClick={this.redirectToAddMarketPage}/>
//       <div className="ui input small">
//         <input name="contracts" type="number" placeholder="Contracts..." min="0"
//                value={this.state.contracts} onChange={this.updateState} />
//       </div>
//     </div>
//   </div>
//   <div className="row" style={{paddingTop: "0"}}>
//     <div className="column">
//       <MarketList markets={this.props.markets} contracts={this.state.contracts} />
//     </div>
//   </div>
// </div>

class MarketsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.redirectToAddMarketPage = this.redirectToAddMarketPage.bind(this);

    this.state = {
      contracts: 1,
      showGrid: props.marketData.markets.length > 0
    };

    this.updateState = this.updateState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.marketData.markets.length > 0) {
      this.setState({showGrid: true});
    }
  }

  updateState(event) {
    const field = event.target.name;
    this.setState({contracts: event.target.value});
  }

  redirectToAddMarketPage() {
    browserHistory.push('/market');
  }

  render() {
    return (
      <div>
        {this.state.showGrid && <MarketsGrid marketData={this.props.marketData} />}
      </div>
    );
  }
}

// MarketsPage.propTypes = {
//   actions: PropTypes.object.isRequired,
//   markets: PropTypes.array.isRequired
// };

function mapStateToProps(state, ownProps) {
  return {
    marketData: state.marketData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(marketDataActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketsPage);
