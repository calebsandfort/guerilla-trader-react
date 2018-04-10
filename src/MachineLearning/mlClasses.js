import _ from 'underscore';
import Matrix from 'ml-matrix';

export class MlDescription {
  constructor(samples){
    this.samples = samples;
    this.features = [];
    this.label = [];
    this.observations = [];
    this.labels = [];
  }

  addFeature(name, featureType, binaryFunc = null){
    this.features.push(new MlFeature(name, featureType, binaryFunc, _.pluck(this.samples, name)));
  }

  addLabel(name, featureType, binaryFunc = null){
    this.label = new MlFeature(name, featureType, binaryFunc, _.pluck(this.samples, name));
  }

  fillObservations(){
    for(let sample of this.samples){
      let observation = [];

      for(let feature of this.features){
        observation = observation.concat(feature.getObservationValue(sample));
      }

      this.observations.push(observation);

      this.labels.push(this.label.getObservationValue(sample)[0]);
    }
  }

  getObservations(){
    return [this.observations, this.labels];
  }

  getObservationsMatrixVector(){
    return [new Matrix(this.observations), Matrix.columnVector(this.labels)];
  }
}

export class MlFeature {
  constructor(name, featureType, binaryFunc, values){
    this.name = name;
    this.featureType = featureType;
    this.binaryFunc = binaryFunc;

    if(featureType == MlFeatureTypes.MultiBinary){
      this.unique = _.uniq(values);
    }

    if(featureType == MlFeatureTypes.Nominal) {
      this.factor = this.generateFactor(values);
    }
  }

  getObservationValue(sample){
    const obsValue = sample[this.name];
    let mlValue = [];

    switch (this.featureType) {
      case MlFeatureTypes.SingleBinary:
        mlValue.push(this.binaryFunc(sample[this.name]) ? 1 : 0);
        break;
      case MlFeatureTypes.MultiBinary:
        for(let u of this.unique){
          mlValue.push(u == obsValue ? 1 : 0);
        }
        break;
      case MlFeatureTypes.Nominal:
        mlValue.push(this.factor[obsValue.toString()]);
        break;
      default:
        mlValue.push(obsValue);
        break;
    }

    return mlValue;
  }

  generateFactor(values){
    const counts = _.countBy(values, function(num){
      return num;
    });

    let factor = {};

    for (let key of Object.keys(counts)) {
      factor[key] = (counts[key] + 1) / 2;
    }

    return factor;
  }
}

export const MlFeatureTypes = {
  SingleBinary: 1,
  MultiBinary: 2,
  Nominal: 3,
  Numeric: 4,
  Ordinal: 5
};
