import React from 'react';
import PropTypes from 'prop-types';
import {EconomicIndicatorsGrid} from '../grids';

export class MarketDataWrapper extends React.Component {
  constructor(props, context) {
    super(props, context);

    console.log(this.props.marketData.economicIndicators);
  }

  render() {
    return (
      <div>
        <div className="ui raised pink segment">
          <div className="ui top attached pink label">Markets</div>
          <div>
            Grid
          </div>
        </div>
        <div className="ui raised blue segment">
          <div className="ui top attached blue label">Economic Indicators</div>
          <div>
            <EconomicIndicatorsGrid economicIndicators={this.props.marketData.economicIndicators} />
          </div>
        </div>
      </div>
    );
  }
}

MarketDataWrapper.propTypes = {
  marketData: PropTypes.object.isRequired,
};

export default MarketDataWrapper;
