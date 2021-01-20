const performance = require('perf_hooks').performance;
function knapSack(values, weights, maxWeight) {
  let start_time = performance.now();
    matrix = Array(values.length + 1)
      .fill(null)
      .map(() => Array(maxWeight + 1).fill(0));
  
    for (let i = 1; i < values.length + 1; i++) {
      for (let j = 0; j < maxWeight + 1; j++) {
        if (weights[i - 1] > j) {
          matrix[i][j] = matrix[i - 1][j];
        } else {
          matrix[i][j] = Math.max(
            matrix[i - 1][j],
            matrix[i - 1][j - weights[i - 1]] + values[i - 1]
          );
        }
      }
    }
    let temp = maxWeight;
    let l1 = [];
    for (let i = values.length; i > 0 && temp > 0; i--) {
      if (matrix[i][temp] == matrix[i - 1][temp]) {
        continue;
      } else {
        l1.push(weights[i - 1]);
        temp -= weights[i - 1];
      }
    }
  
  let result = {
    Length: matrix[values.length][maxWeight],
    List: l1,
  };
  let end_time = performance.now();
  let timeDiff = end_time - start_time;
  timeDiff /= 1000;
  this.time = timeDiff;
  return {
    result: result,
    time: timeDiff
  }
}
  
module.exports = { knapSack }