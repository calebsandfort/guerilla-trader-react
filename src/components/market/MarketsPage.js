import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import * as marketDataActions from '../../actions/marketDataActions';
import MarketsGrid from './MarketsGrid';

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
