const performance = require('perf_hooks').performance;

var wordBreak = function(s, wordDict) {
  var dp = Array(s.length);
  var map = {};
  var res = [];

  let start_time = performance.now();

  for (var i = 0; i < wordDict.length; i++) {
    map[wordDict[i]] = true;
  }

let result = find(s, map, dp, 0);

let end_time = performance.now();
let timeDiff = end_time - start_time;
timeDiff /= 1000;
this.time = timeDiff;

return {
  result: result,
  time: timeDiff
}
};

var find = function (s, map, dp, index) {
  if (dp[index]) return dp[index];

  var str = '';
  var tmp = null;
  var len = s.length;

  dp[index] = [];

  for (var i = index; i < len; i++) {
    str = s.substring(index, i + 1);
    if (!map[str]) continue;
    if (i === len - 1) {
      dp[index].push(str);
      break;
    }
    tmp = find(s, map, dp, i + 1);
    for (var j = 0; j < tmp.length; j++) {
      dp[index].push(str + ' ' + tmp[j]);
    }
  }
  // console.log(dp[index]);
  return dp[index];
};

module.exports = {wordBreak,find}