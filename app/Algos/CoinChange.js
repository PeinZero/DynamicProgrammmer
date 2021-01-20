const performance = require('perf_hooks').performance;

function minCoinChange(desired_change, coins) {
  let start_time = performance.now();

  const MinimumCoins = new Array(desired_change + 1).fill(Infinity); 
  MinimumCoins[0] = 0;
  for(let coin of coins) {
    for(let i = 0; i <= desired_change; i += 1) {
      if((i - coin) >= 0) MinimumCoins[i] = Math.min(MinimumCoins[i], MinimumCoins[i - coin] + 1);
    }``
  }
  let result = MinimumCoins[desired_change] !== Infinity ? MinimumCoins[desired_change] : -1;
  let end_time = performance.now();
  let timeDiff = end_time - start_time;
  timeDiff /= 1000;
  this.time = timeDiff;
  return {
    result: result,
    time: timeDiff
  }
}

module.exports = {minCoinChange}