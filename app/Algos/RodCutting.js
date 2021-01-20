const performance = require('perf_hooks').performance;

function RodCuttingProblem(prices, maxLength) {
  //define base on rod length and its revenue
  
  let start_time = performance.now();

  var r = [];
  r[0] = 0;

  //loop through the different lengths and determine max revenue
  for(var i = 1; i <= maxLength; i++) {
      //define a var to store the current max returned from recursion.
      var currentMaxRevenue = 0;
      for(var j = 1; j <= i; j++) {
          var currentRevenue = prices[j - 1] + r[i - j];
          if (currentRevenue > currentMaxRevenue) {
              currentMaxRevenue = currentRevenue;
          }
      }
      r[i] = currentMaxRevenue;
  }
  //finally return the max rev
  let result = r[maxLength];
  let end_time = performance.now();
  let timeDiff = end_time - start_time;
  timeDiff /= 1000;
  this.time = timeDiff;
  return {
    result: result,
    time: timeDiff
  }
}
module.exports = { RodCuttingProblem }