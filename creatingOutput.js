function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


//---------------------------------------------------Part A, B, C---------------------------------------------------
// let name1 = 'abdullah'
// let name2 = 'mahad'

// samples = []
// let str1 = ""
// let str2 = ""
// let n = 0
// for(let i = 0; i < 10; i++){
//     temp = {str1: [], str2: []}
//     m = Math.floor(Math.random() * 3) + 1;
//     if(m === 1){
//         n = getRandomArbitrary(30, 100)
//         for(let j = 0; j < n; j++){
//             str1 += (name1[getRandomArbitrary(0, name1.length)]);
//         }
//         n = getRandomArbitrary(30, 100)
//         for(let j = 0; j < n; j++){
//             str2 += (name1[getRandomArbitrary(0, name1.length)]);
//         }
//     }
//     else{
//         n = getRandomArbitrary(30, 100)
//         for(let j = 0; j < n; j++){
//             str1 += (name2[getRandomArbitrary(0, name2.length)]);
//         }
//         n = getRandomArbitrary(30, 100)
//         for(let j = 0; j < n; j++){
//             str2 += (name2[getRandomArbitrary(0, name2.length)]);
//         }
//     }

//     temp.str1 = str1;
//     temp.str2 = str2;
//     str1 = ""
//     str2 = ""
//     samples.push(temp)
// }
// samples = JSON.stringify(samples, null, " ")
// console.log(samples)
 
//---------------------------------------------------Part D, E, G---------------------------------------------------
// let samples = []
// let nums = []
// for(let i = 0; i < 10; i++){                    
//     temp = {sample: []}
//     let n = getRandomArbitrary(30, 60)
//     for(let j = 0; j < n; j++){
//         nums.push(getRandomArbitrary(1, 100));
//     }
//     temp.sample = nums;
//     nums = [];
//     samples.push(temp);
// }
// // samples = JSON.stringify(samples, null, " ")
// console.log(samples)


//---------------------------------------------------Part F---------------------------------------------------
// let weight = []
// let value  = []
// let samples = []

// for (let j = 0; j < 10; j++){
//     sample = {value: [], weight: [], maxWeight: 0}
//     n = getRandomArbitrary(10, 60);
//     for (let i = 0; i < n; i++){
//         weight.push(getRandomArbitrary(1, 100))
//         value.push(getRandomArbitrary(1, 100))
//     }
//     sample.value = value
//     sample.weight = weight
//     m = Math.floor(Math.random() * 3) + 1;
//     if(m === 1){
//         sample.maxWeight = 170
//     }
//     else{
//         sample.maxWeight = 187
//     }
//     weight = []
//     value = []
//     samples.push(sample);
// }
// samples = JSON.stringify(samples, null, 1);
// console.log(samples)


//---------------------------------------------------Part H---------------------------------------------------
// let price  = []
// let length = []
// let samples = []

// for (let j = 0; j < 10; j++){
//     sample = {price: [], maxLength: 0}
//     n = getRandomArbitrary(10, 60);
//     for (let i = 0; i < n; i++){
//         length.push(i+1)
//         price.push(getRandomArbitrary(0, 100))
//     }
//     sample.price = price
//     sample.length = length
//     m = Math.floor(Math.random() * 3) + 1;
//     if(m === 1){
//         sample.maxLength = 170
//     }
//     else{
//         sample.maxLength = 187
//     }
//     price = []
//     length = []
//     samples.push(sample);
// }
// // samples = JSON.stringify(samples, null, 1);
// console.log(samples)


//---------------------------------------------------Part I---------------------------------------------------
// let samples = []
// let coins = []
// for(let i = 0; i < 10; i++){                    
//     temp = {coin: [], desiredchange: 0}
//     let n = getRandomArbitrary(30, 60)
//     for(let j = 0; j < n; j++){
//         coins.push(getRandomArbitrary(0, 100));
//     }
//     m = Math.floor(Math.random() * 3) + 1;
//     if(m === 1){
//         temp.desiredchange = 170
//     }
//     else{
//         temp.desiredchange = 187
//     }
//     temp.coin = coins;
//     coins = [];
//     samples.push(temp);
// }
// // samples = JSON.stringify(samples, null, " ")
// console.log(samples)


//---------------------------------------------------Part J---------------------------------------------------
let name1 = 'abdullah'
let name2 = 'mahad'

let samples = []
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 'u', 'v', 'w', 'x', 'y', 'z']

let n = 0
let m = 0
let str = ""

for(let i = 0; i < 10; i++){ //for 10 sets

    n = getRandomArbitrary(10, 20) // min 10 words in set
    sample = {word: [], tarname: ""}

    for(let j = 0; j < n; j++){ //for words in sets

        // --------------------------------This code decides which name to take as target name--------------------------------
        roll = Math.floor(Math.random() * 2) + 1;
        if (roll === 1){
            sample.tarname = name1
        }
        else{
            sample.tarname = name2
        }
        // --------------------------------------------------------------------------------------------------------------------


        // This if basically increases the accuracy of the random letter generator. Reduces randomness
        if(j%2 === 0){ // if even take m random letters from a-z
            m = getRandomArbitrary(1, sample.tarname.length/2 + 1) // min 1 letter word ..... 
            // max length can be name length /2 ...for example mahad so 6 thus 6/3 = 3+1 = 4
            for(let k = 0; k < m; k++){ //for letters in words
                str += letters[getRandomArbitrary(0,25)]
            }
        }
        else{ // if odd take a letter from a name
            if (roll === 1){
                str += name1[getRandomArbitrary(0, name1.length)]
            }
            else{
                str += name2[getRandomArbitrary(0, name2.length)]
            }
        }
        sample.word.push(str)
        str = ""
    }
    samples.push(sample)
}
// samples = JSON.stringify(samples, null, " ")
console.log(samples)