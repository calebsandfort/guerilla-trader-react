import React from 'react';
import PropTypes from 'prop-types';
import {StreamingDataGrid} from '../grids';

export class StreamingDataWrapper extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      streamingConnectionOpened: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.streamingConnectionOpened &&
      this.props.streamingData.markets.length != nextProps.streamingData.markets.length) {
      this.setState({streamingConnectionOpened: false});
      this.props.openStreamingDataConnection([...nextProps.streamingData.markets.map(x => x.symbol), ...nextProps.streamingData.economicIndicators.map(x => x.symbol)]);
    }
  }

  render() {
    return (
      <div>
        <div className="ui raised pink segment">
          <div className="ui top attached pink label">Economic Indicators</div>
          <div>
            <StreamingDataGrid items={this.props.streamingData.economicIndicators}/>
          </div>
        </div>
        <div className="ui raised purple segment">
          <div className="ui top attached purple label">Markets</div>
          <div>
            <StreamingDataGrid items={this.props.streamingData.markets}/>
          </div>
        </div>
      </div>
    );
  }
}

StreamingDataWrapper.propTypes = {
  streamingData: PropTypes.object.isRequired,
};

export default StreamingDataWrapper;
