"use strict";

const myScores = [-12, -3, 18, 10, 4, -1, 0, 14];
const modifiedScores = [...myScores]; //riferimento all'array costante, i valori sono modificabili

modifiedScores.sort( (a,b) => { return a-b; } );

let NN = modifiedScores.findIndex( item => item>=0 );
modifiedScores.splice(0,  NN);

modifiedScores.shift();
modifiedScores.shift();

let avg = 0;
for(const item of modifiedScores)
    avg+=item;
avg = avg/modifiedScores.length;

const addedArray = Array(NN).fill(Math.round(avg));
//const modifiedScores2 = [...modifiedScores, ...addedArray];
modifiedScores.splice(modifiedScores.length, 0, ...addedArray);

console.log(modifiedScores);
