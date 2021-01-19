let a = []
let n 
console.log('[')
for (let x = 1 ; x <= 10 ; x++){
    n = Math.floor(Math.random() * 31) + 30;
    for (let i = 0 ; i < n ; i++){
        a.push(Math.floor(Math.random() * 101))
    }
    console.log('{')
    console.log(`\"sample":[`)
    for (let i = 0 ; i < n ; i++){
        console.log(`${a[i]},`)
        if (i === n-1){
            console.log(`${a[i]}`)
        }
    }
    console.log(']')
    console.log('},')

}
console.log(']')

