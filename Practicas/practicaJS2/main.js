
var phrase = 'La mejor forma de predecir el futuro es creándolo';


let words = phrase.split(" ");



console.log(words,length);

let splitStr = phrase.split('')
let countA= 0;

for( let i =0; i<splitStr.length; i++ ){
    if(splitStr[i] === 'a' || splitStr[i] === 'á' || splitStr[i] === 'A'){
        countA++
    }
}

console.log(countA);



let pares='';

for( let j = 0; j<phrase.trim().length; j++ ){
    if(j%2=== 0){
        pares+=phrase.charAt(j)
    }
}

console.log(pares);

let nones = ''; 

for( let j = 0; j<phrase.trim().length; j++ ){
    if(j % 2 === 1){
        nones+=phrase.charAt(j)
    }
}

console.log(nones);