"use strict";
const dayjs = require('dayjs');

function Film(id, title, favorites = false, date, rating ) {
    this.id = id;
    this.title = title;
    this.favorites = favorites;
    this.date = date ?? null;
    this.rating = rating ?? 0;

    this.toString = () => `ID: ${this.id} Title: ${this.title} Favorite: ${this.favorites} Watch Date: ${this.date.format("YYYY-MM-DD")} Rating: ${this.rating}`;
}

function FilmLibrary(films) {
    this.films = films ?? [];

    this.addNewFilm = function (film) {
        this.films.push(film);
    }

    this.toString = () => this.films.forEach(item => item.toString());

}

let filmLibrary = new FilmLibrary();
let film1 = new Film(1, "Pulp Fiction", true, dayjs("2023-03-10"), 5);
let film2 = new Film(2, "21 Grams", true, dayjs("2023-03-17"), 4);
let film3 = new Film(3, "Star Wars", false);
let film4 = new Film(4, "Matrix", false);
let film5 = new Film(5, "Shrek", false, dayjs("2023-03-21"), 3);

filmLibrary.addNewFilm(film1);
filmLibrary.addNewFilm(film2);
filmLibrary.addNewFilm(film3);
filmLibrary.addNewFilm(film4);
filmLibrary.addNewFilm(film5);

console.log(filmLibrary.toString());
