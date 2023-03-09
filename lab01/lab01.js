"use strict";
const dayjs = require('dayjs');

function Film(id, title, favorites = false, date, rating ) {
    this.id = id;
    this.title = title;
    this.favorites = favorites;
    this.date = date ?? null;
    this.rating = rating ?? null;
}

function FilmLibrary(films) {
    this.films = films | [];

    this.addNewFilm = function (film) {
        this.films.push(film);
    }


}

let filmLibrary = new FilmLibrary();
let film1 = new Film(1, "Pulp Fiction", true, dayjs("2023-03-10").format("YYYY-MM-DD"), 5);
let film2 = new Film(2, "21 Grams", true, dayjs("2023-03-17").format("YYYY-MM-DD"), 4);
let film3 = new Film(3, "Star Wars", false);
let film4 = new Film(4, "Matrix", false);
let film5 = new Film(5, "Shrek", false, dayjs("2023-03-21").format("YYYY-MM-DD"), 3);

console.log(film3);
