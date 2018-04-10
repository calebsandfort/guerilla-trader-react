import React, {Component} from 'react';

export class PredictionEngineWrapper extends Component {
  constructor(props, context) {
    super(props, context);
  }

  renderAlgorithms = () => {
    let algorithmRows = [];

    for (let predictionAlgorithm of this.props.predictionEngine.algorithms) {
      algorithmRows.push(<div key={predictionAlgorithm.name}>{predictionAlgorithm.name}</div>);
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
