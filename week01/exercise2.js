"use strict";

let names = "Luigi De Russis, Luca Mannella, Fulvio Corno, Juan Pablo Saenz Moreno, Enrico Masala, Antonio Servetti, Eros Fani";
let namesArray = [...names.split(', ')];

let acronymsArray = [];
for(const item of namesArray)
    acronymsArray.push(item.split(' ').reduce( (accumulator, word) => accumulator + word.charAt(0), '' ) + ": " + item);

acronymsArray.sort();
console.log(acronymsArray);

