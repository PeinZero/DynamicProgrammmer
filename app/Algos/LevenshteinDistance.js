const performance = require('perf_hooks').performance;

function levenshteinDistance(str1, str2) {
  
  let start_time = performance.now();

    const distanceMatrix = Array(str2.length + 1)
      .fill(null)
      .map(() => Array(str1.length + 1).fill(null));
    for (let i = 0; i <= str1.length; i += 1) {
      distanceMatrix[0][i] = i;
    }
    for (let j = 0; j <= str2.length; j += 1) {
      distanceMatrix[j][0] = j;
    }
  
    for (let j = 1; j <= str2.length; j += 1) {
      for (let i = 1; i <= str1.length; i += 1) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        distanceMatrix[j][i] = Math.min(
          distanceMatrix[j][i - 1] + 1,
          distanceMatrix[j - 1][i] + 1,
          distanceMatrix[j - 1][i - 1] + indicator
        );
      }
    }
  
  let result = distanceMatrix[str2.length][str1.length]
  let end_time = performance.now();
  let timeDiff = end_time - start_time;
  timeDiff /= 1000;
  this.time = timeDiff;
  return {
    result: result,
    time: timeDiff
  }
}
  module.exports = { levenshteinDistance }