const performance = require('perf_hooks').performance;

function MatrixChainMultiplication(dimensions, len) {
  let start_time = performance.now();

    matrix = Array(len)
      .fill(null)
      .map(() => Array(len).fill(0));
    for (let i = 1; i < len; i++) {
      matrix[i][i] = 0;
    }
    for (let chain_length = 2; chain_length < len; chain_length++) {
      for (let i = 1; i < len - chain_length + 1; i++) {
        let j = i + chain_length - 1;
        matrix[i][j] = Number.MAX_VALUE;
        for (let k = i; k < j; k++) {
          let q = matrix[i][k] + matrix[k + 1][j] + dimensions[i - 1] * dimensions[k] * dimensions[j];
          if (q < matrix[i][j]) {
            matrix[i][j] = q;
          }
        }
      }
    }
  let result = matrix[1][len - 1];
  let end_time = performance.now();
  let timeDiff = end_time - start_time;
  timeDiff /= 1000;
  this.time = timeDiff;
  return {
    result: result,
    time: timeDiff
  }
  }
module.exports = { MatrixChainMultiplication }