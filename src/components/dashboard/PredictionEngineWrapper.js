import React, {Component} from 'react';

export class PredictionEngineWrapper extends Component {
  constructor(props, context) {
    super(props, context);
  }

  renderAlgorithms = () => {
    let algorithmRows = [];

    for (let [key, algorithm] of this.props.predictionEngine.algorithms.entries()) {
      algorithmRows.push(<div key={key}>{algorithm.name}</div>);
    }

    return algorithmRows;
  }

  render() {
    return (
      <div>
        {this.renderAlgorithms()}
      </div>
    );
  }
}

export default PredictionEngineWrapper;
