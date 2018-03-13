import _ from 'underscore';
import DecisionNode from './decisionnode';


// Divides a set on a specific column. Can handle numeric
// or nominal values
export function divideSet(rows, column, value) {
  // Make a function that tells us if a row is in
  // the first group (true) or the second group (false)
  let split_function = null;
  if (typeof value == 'number') {
    split_function = (r) => r[column] >= value;
  }
  else {
    split_function = (r) => r[column] == value;
  }

  const result = {
    set1: [],
    set2: []
  };

  for (let row of rows) {
    if (split_function(row)) {
      result.set1.push(row);
    }
    else {
      result.set2.push(row);
    }
  }

  return result;
}

// Create counts of possible results (the last column of
// each row is the result)
export function uniqueCounts(rows) {
  let results = {};
  let r = null;

  for (let row of rows) {
    r = _.last(row);
    if (!_.has(results, r)) {
      results[r] = 0;
    }
    results[r] += 1;
  }

  return results;
}

// Entropy is the sum of p(x)log(p(x)) across all
// the different possible results
export function entropy(rows) {
  let ent = 0.0, p = 0.0;
  const results = uniqueCounts(rows);

  for (let key of Object.keys(results)) {
    p = results[key] / rows.length;
    ent = ent - (p * Math.log2(p));
  }

  return ent;
}

export function buildTreeAsync(rows, scoref = entropy) {
  return new Promise((resolve, reject) => {
    try {
      const tree = buildTree(rows, scoref);
      resolve(tree);
    }
    catch (error) {
      reject(error);
    }
  });
}

export function buildTree(rows, scoref = entropy) {
  if (rows.length == 0) return new DecisionNode();

  let current_score = scoref(rows);

  // Set up some variables to track the best criteria
  let best_gain = 0.0;
  let best_criteria = {col: null, value: null};
  let best_sets = {set1: [], set2: []};

  let column_values = {};
  let sets = {set1: [], set2: []};

  for (let col = 0; col < (rows[0].length - 1); col++) {
    // Generate the list of different values in this column
    column_values = {};
    for (let row of rows) {
      column_values[row[col]] = 1;
    }

    // Now try dividing the rows up for each value in this column
    for (let value of Object.keys(column_values)) {
      sets = divideSet(rows, col, value);

      // Information gain
      const p = sets.set1.length / rows.length;
      const gain = current_score - p * scoref(sets.set1) - (1 - p) * scoref(sets.set2);
      if (gain > best_gain && sets.set1.length > 0 && sets.set2.length > 0) {
        best_gain = gain;
        best_criteria = {col: col, value: value};
        best_sets = sets;
      }
    }
  }

  // Create the sub branches
  if (best_gain > 0) {
    const trueBranch = buildTree(best_sets.set1);
    const falseBranch = buildTree(best_sets.set2);

    return new DecisionNode(best_criteria.col, best_criteria.value, null, trueBranch, falseBranch);
  }
  else {
    return new DecisionNode(-1, null, uniqueCounts(rows), null, null);
  }
}

export function classify(observation, tree) {
  if (tree.results != null) {
    return tree.results;
  }
  else {
    const v = observation[tree.col];
    let branch = null;
    if (typeof v == 'number') {
      if (v >= tree.value) branch = tree.tb;
      else branch = tree.fb;
    }
    else {
      if (v == tree.value) branch = tree.tb;
      else branch = tree.fb;
    }
    return classify(observation, branch);
  }
}

