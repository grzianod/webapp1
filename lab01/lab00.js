"use strict";

const arrayString = ["spring", "summer", "winter", "autumn", "cat", "it"];
arrayString
    .map(item => {
        if(item.length < 2) return item + ": " + " ";
        if(item.length == 2) return item + ": " + item.repeat(2);
        if(item.length == 3) return item + ": " + item.slice(0, 1) + item.charAt(1) + item.slice(1,item.length);
        if(item.length > 3) return item + ": " + item.slice(0,2) + item.slice(item.length-2, item.length);})
    .forEach(item => console.log(item));
