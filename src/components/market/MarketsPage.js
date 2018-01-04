import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import * as marketActions from '../../actions/marketActions';
import MarketList from './MarketList';

class MarketsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.redirectToAddMarketPage = this.redirectToAddMarketPage.bind(this);

    this.state = {
      contracts: 1
    };

    this.updateState = this.updateState.bind(this);
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
      <div className="ui grid">
        <div className="row">
          <div className="column">
            <input type="submit"
                   value="Add Market"
                   className="ui primary button"
                   onClick={this.redirectToAddMarketPage}/>
            <div className="ui input">
              <input name="contracts" type="number" placeholder="Contracts..."
                     value={this.state.contracts} onChange={this.updateState} />
            </div>
          </div>
        </div>
        <div className="row" style={{paddingTop: "0"}}>
          <div className="column">
            <MarketList markets={this.props.markets} contracts={this.state.contracts} />
          </div>
        </div>
      </div>
    );
  }
}

MarketsPage.propTypes = {
  actions: PropTypes.object.isRequired,
  markets: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    markets: state.markets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(marketActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketsPage);
