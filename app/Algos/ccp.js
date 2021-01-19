function makeChange(amount, coins) {
    let cache = {};
    if (!amount) {
      return [];
    }
  
    if (cache[amount]) {
      return cache[amount];
    }
  
    let min = [],
      newMin,
      newAmount;
    for (let i = 0; i < coins.length; i++) {
      let coin = coins[i];
      newAmount = amount - coin;
      if (newAmount >= 0) {
        newMin = makeChange(newAmount, coins);
      }
      if (
        newAmount >= 0 &&
        (newMin.length < min.length - 1 || !min.length) &&
        (newMin.length || !newAmount)
      ) {
        min = [coin].concat(newMin);
      }
    }
  
    return (cache[amount] = min);
  }
  
module.exports = { makeChange }