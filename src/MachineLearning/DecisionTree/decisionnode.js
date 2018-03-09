export class DecisionNode {
  constructor(col = -1, value = null, results = null, tb = null, fb = null) {
    this.col = col;
    this.value = value;
    this.results = results;
    this.tb = tb;
    this.fb = fb;
  }
}

export default DecisionNode;
