import {DecisionTree, buildTreeAsync} from './';

export class PredictionAlgorithm {
  constructor(name, algorithm) {
    this.name = name;
    this.algorithm = algorithm;
  }
}

export default PredictionAlgorithm;

export function loadPredictionAlgorithmAsync(name, data, labels, options = {}) {
  return new Promise((resolve, reject) => {

    let predictionAlgorithm = null;

    switch (name) {
      case "DecisionTree":
        try {
          const decisionTree = new DecisionTree(options);
          decisionTree.train(data, labels);
          
          predictionAlgorithm = new PredictionAlgorithm(name, decisionTree);

          resolve(predictionAlgorithm);
        }
        catch (error) {
          reject(error);
        }
        break;
    }
  });
}
