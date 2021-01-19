export default function rodCut(price, n) {
    matrix = Array(n + 1).fill(0);
    for (let i=1; i<n+1; i++){
        for (let j=1; j<i+1;j++){
          matrix[i] = Math.max(matrix[i], price[j-1]+matrix[i-j])
        }
    }
    return matrix[n]
  }
module.exports = { rodCut }