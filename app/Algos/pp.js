export default function subsetSum(arr, arrLength, total) {
    matrix = Array(arrLength + 1)
      .fill(null)
      .map(() => Array(total + 1).fill(0));
  
    for (let i = 0; i < arrLength + 1; i++) {
      matrix[i][0] = true;
    }
    for (let i = 1; i < arrLength + 1; i++) {
      for (let j = 1; j < total + 1; j++) {
        if (arr[i - 1] > j) {
          matrix[i][j] = matrix[i - 1][j];
        } else {
          matrix[i][j] = matrix[i - 1][j] || matrix[i - 1][j - arr[i - 1]];
        }
      }
    }
    let l1 = [];
    if (matrix[arrLength][total]) {
      let i = arrLength - 1;
      let j = total;
      while (i != 0 || j != 0) {
        if (matrix[i][j]) {
          i -= 1;
        } else {
          l1.push(arr[i]);
          j -= arr[i];
        }
      }
    }
    l2 = arr.filter((n) => !l1.includes(n));
    return {
      List1: l1,
      List2: l2,
    };
  }
  
  function partition(arr) {
    total = arr.reduce((a, b) => a + b, 0);
    return (total & 1) == 0 && subsetSum(arr, arr.length, Math.round(total / 2));
  }
  
  console.log(partition([7, 3, 1, 5, 4, 8]));
  

module.exports = { notSure }